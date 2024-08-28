import express, { NextFunction } from 'express';
import { BizCommonService } from '@/common/biz-common-service';
import { BaseService } from '@/base-common/base-service';
import { PrivateRequest } from '@/base-common/common-request';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';
import { CreateActivityLogParams } from '@/common/biz-common-models';
import { EventParamsType } from '@/base-common/common-response';

const bizCommonService = new BizCommonService();
export async function authorizationMiddleware(
  req: PrivateRequest,
  res: express.Response,
  next: NextFunction
) {
  // TODO: 임시처리 CHECK
  if (req && req.user) {
    const consoleMember =
      await bizCommonService.getConsoleMemberByPlatformMemberId(req.user.sub);
    if (!consoleMember) {
      res.send(new BaseService().unAuthorized('unAuthorized'));
    } else {
      next();
    }
  } else {
    next();
  }
}

export async function activityLogger(
  req: PrivateRequest<ConsoleAccessTokenInfo>,
  res: express.Response,
  next: NextFunction
) {
  const ipAddress = req.ip;
  const browser = req.useragent?.browser;
  const os = req.useragent?.os;

  const consoleMember = req.user.consoleMemberInfo;
  const oldJson = res.json;
  const requestBody = req.body ? JSON.stringify(req.body) : undefined;
  next();

  res.json = (body) => {
    res.locals.body = body;
    const events: EventParamsType[] = res.locals.body.error.events;

    if (
      os &&
      browser &&
      consoleMember &&
      consoleMember.memberId &&
      consoleMember.loginId
    ) {
      if (res.locals.body.error.code === '00' && events) {
        events.forEach((event) => {
          const {
            appId = -1,
            profile,
            eventName: activity,
            description,
            type,
            txId,
          } = event;

          const createActivityLogRequest: CreateActivityLogParams = {
            appId,
            profile,
            activity,
            description,
            method: 'Console',
            type,
            ipAddress,
            requestBody,
            txId,
            os,
            browser,
            memberId: Number(consoleMember?.memberId ?? -1),
            account: consoleMember?.loginId,
            createdAt: new Date(),
          };
          bizCommonService.createActivityLog(createActivityLogRequest).then();
        });
      }
    }
    return oldJson.call(res, body);
  };
}
