import { BaseService } from '@/base-common/base-service';
import {
  AppWebhookLogsQueryResponse,
  AppWebhookLogsSearchParams,
  CreateAppWebhookRequest,
  CreateWebhookRequest,
  DeleteAppWebhookRequest,
  FindManyAppWebhookLogsQueryParams,
  FindManyAppWebhooksQueryParams,
  ResendAppWebhookRequest,
  UpdateAppWebhookRequest,
  WebhookBody,
} from '@/domains/webhook/webhook-models';
import { AppWebhook, Prisma, Webhook } from '@prisma/client';
import { prisma } from '@/context';
import { PageRequest } from '@/common/libs/page-request';
import express from 'express';
import dayjs from 'dayjs';
import { ExcelUtil } from '@/common/libs/excel-util';
import axios from 'axios';
import { EventParamsType } from '@/base-common/common-response';

export class WebhookService extends BaseService {
  //
  createWebhook = async (request: CreateWebhookRequest) => {
    const { webhookKindCode: webhookKindCd, userId, ...rest } = request;
    return await prisma.webhook.create({
      data: {
        ...rest,
        webhookKindCd,
        createdId: userId,
      },
    });
  };

  getWebhookKindName = async (webhookId: number) => {
    const result: { webhookKindName: string }[] = await prisma.$queryRaw`
    SELECT cc.description as webhookKindName  
    FROM webhook w INNER JOIN common_code cc ON cc.code = w.webhook_kind_cd 
    WHERE w.webhook_id  = ${webhookId};
    `;
    if (result.length > 0) {
      return result[0].webhookKindName;
    } else {
      throw this.noContent(`webhookId with ${webhookId} has no webhookKindCd.`);
    }
  };
  getWebhook = async (webhookId: number) => {
    return await prisma.webhook.findFirst({
      where: {
        webhookId,
      },
    });
  };

  //
  createAppWebhook = async (
    request: CreateAppWebhookRequest,
    userId: bigint
  ) => {
    //
    const { webhookId, profile, appId } = request;
    const webhookKindName = await this.getWebhookKindName(webhookId);

    const createdAppWebhook: AppWebhook = await prisma.appWebhook.create({
      data: {
        ...request,
        createdId: Number(userId),
      },
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'Created AppWebhook',
      profile,
      appId,
      description: `${request.name} webhook has been created (Webhook Type : ${webhookKindName})`,
    };

    return { data: createdAppWebhook, events: [event] };
  };

  updateAppWebhook = async (
    request: UpdateAppWebhookRequest,
    userId: bigint
  ) => {
    const { profile, webhookId, appId, ...rest } = request;
    const webhookKindName = await this.getWebhookKindName(webhookId);
    const previousAppWebhook = await prisma.appWebhook.findUnique({
      where: {
        webhookId_appId_profile: { appId, webhookId, profile },
      },
    });
    if (!previousAppWebhook)
      throw this.noContent(
        `no appWebhook with appId:${appId} , webhookId:${webhookId} , profile:${profile} `
      );

    const updatedAppWebhook = await prisma.appWebhook.update({
      where: {
        webhookId_appId_profile: {
          appId,
          webhookId,
          profile,
        },
      },
      data: {
        ...rest,
        updatedAt: new Date(),
        updatedId: Number(userId),
      },
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'Updated AppWebhook',
      appId,
      profile,
      description: `${updatedAppWebhook.name} webhook has been updated (Webhook Type : ${webhookKindName})`,
    };

    return { data: updatedAppWebhook, events: [event] };
  };

  resendAppWebhook = async (request: ResendAppWebhookRequest) => {
    const { no, processDt } = request;

    const previousAppWebhook = await prisma.appWebhookLog.findUnique({
      where: {
        no_processDt: {
          no,
          // TODO: processDt validation 추가. 현재 반드시 T,Z 포함한 시간 값이 와야 함. 초 소수점도 없어야 함. 예) 2023-09-27T01:20:55Z
          processDt: new Date(Date.parse(processDt.replace(/\.000/gi, ''))),
        },
      },
    });

    if (!previousAppWebhook)
      throw this.noContent(
        `no appWebhook log with no:${no} , processDt:${processDt}`
      );
    const appWebhook = await prisma.appWebhook.findFirst({
      where: {
        appId: previousAppWebhook.appId,
        webhookId: previousAppWebhook.webhookId,
      },
    });
    if (!appWebhook)
      throw this.noContent(
        `no app webhook with appId > ${previousAppWebhook.appId},  webhookId > ${previousAppWebhook.webhookId}`
      );

    const response = await this.sendWebhook({
      appId: previousAppWebhook.appId,
      webhookKindCd: previousAppWebhook.webhookKindCd,
      data: previousAppWebhook.requestBody,
    });
    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'webhook Resend',
      appId: previousAppWebhook.appId,
      profile: previousAppWebhook.profile,
      description: `${appWebhook.name} has been resent (Webhook type : ${previousAppWebhook.webhookKindNm})`,
    };

    console.log('>>>>>>>>>>>>response', response);
    return { data: response, events: [event] };
  };

  sendWebhook = async (request: WebhookBody) => {
    const { appId, webhookKindCd, data } = request;
    const headers = {
      'X-POMERIUMX-KEY': `AAAAA`,
    };
    return axios.post(
      `${process.env.WEBHOOK_ENDPOINT_URL}/pomeriumx/webhook/apps/${appId}`,
      {
        webhookKindCd: webhookKindCd,
        data: JSON.parse(JSON.stringify(data)),
      },
      {
        headers,
        auth: {
          username: process.env.WEBHOOK_BASIC_AUTH_USER!,
          password: process.env.WEBHOOK_BASIC_AUTH_PW!,
        },
      }
    );
  };

  //
  deleteAppWebhook = async (request: DeleteAppWebhookRequest) => {
    const { appId, webhookId, profile } = request;
    const webhookKindName = await this.getWebhookKindName(webhookId);
    const deletedAppWebhook = await prisma.appWebhook.delete({
      where: {
        webhookId_appId_profile: {
          appId,
          webhookId,
          profile,
        },
      },
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'removed AppWebhook',
      profile,
      appId,
      description: `${deletedAppWebhook.name} webhook has been removed (Webhook Type : ${webhookKindName})`,
    };

    return { events: [event] };
  };

  //
  findManyWebhooks = async (pageSize?: number, pageNo?: number) => {
    //
    const { take, skip } = new PageRequest({ pageSize, pageNo });

    let total;
    if (pageSize && pageNo) {
      total = await prisma.webhook.count({
        orderBy: { webhookId: 'asc' },
      });
    }
    const webhooks: Webhook[] = await prisma.webhook.findMany({
      take,
      skip,
      orderBy: { webhookId: 'asc' },
    });
    if (!webhooks || !webhooks.length) throw this.noContent();

    return { data: webhooks, total: total || webhooks.length };
  };
  //
  findManyAppWebhooks = async (
    appId: number,
    queryParams: FindManyAppWebhooksQueryParams
  ) => {
    const { pageSize, pageNo, profile } = queryParams;
    const { take, skip } = new PageRequest({ pageSize, pageNo });

    let total;
    if (pageSize && pageNo) {
      total = await prisma.appWebhook.count({
        where: {
          appId,
          profile,
        },
      });
    }

    const appWebhooks = await prisma.appWebhook.findMany({
      where: {
        appId,
        profile,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take,
      skip,
    });

    return { data: appWebhooks, total: total || appWebhooks.length };
  };

  //
  findMayAppWebhookLogs = async (
    queryParams: FindManyAppWebhookLogsQueryParams,
    appId: number
  ) => {
    const { pageNo, pageSize, from, to, profile, webhookKindCd, logStatus } =
      queryParams;

    //

    const { skip, take } = new PageRequest({ pageSize, pageNo });

    const total: { count: number }[] = await prisma.$queryRaw`
SELECT
   count(1) as count
FROM app_webhook_log awl
WHERE 1=1 
        ${logStatus ? Prisma.sql`AND awl.status = ${logStatus}` : Prisma.empty}
        ${
          webhookKindCd
            ? Prisma.sql`AND awl.webhook_kind_cd = ${webhookKindCd}`
            : Prisma.empty
        }
        ${profile ? Prisma.sql`AND awl.profile = ${profile}` : Prisma.empty}
        ${
          from && to
            ? Prisma.sql`AND awl.process_dt 
            BETWEEN 
            ${`${from} 00:00:00`} 
            AND  
            ${`${to} 23:59:59`}`
            : Prisma.empty
        }
        AND awl.app_id  = ${appId}
        ORDER BY  awl.process_dt DESC
        `;

    const logs: AppWebhookLogsQueryResponse[] = await prisma.$queryRaw`
SELECT
    awl.no, 
    awl.profile, 
    awl.webhook_kind_cd as webhookKindCode,
    awl.webhook_kind_nm as webhookName,
    awl.url as url,
    awl.process_dt as date,
    awl.request_body as requestBody,
    awl.response_body as responseBody,
    awl.status  
FROM app_webhook_log awl
WHERE 1=1 
        ${logStatus ? Prisma.sql`AND awl.status = ${logStatus}` : Prisma.empty}
        ${
          webhookKindCd
            ? Prisma.sql`AND awl.webhook_kind_cd = ${webhookKindCd}`
            : Prisma.empty
        }
        ${profile ? Prisma.sql`AND awl.profile = ${profile}` : Prisma.empty}
        ${
          from && to
            ? Prisma.sql`AND awl.process_dt 
            BETWEEN 
            ${`${from} 00:00:00`}  
            AND 
            ${`${to} 23:59:59`}`
            : Prisma.empty
        }
        AND awl.app_id  = ${appId}
        ORDER BY awl.process_dt desc
        LIMIT ${skip}, ${take}
    `;

    return { data: logs, total: Number(total[0].count) };
  };
  //
  findAppWebhookLog = async (appId: number, no: number) => {
    //
    const appWebhookLog = await prisma.appWebhookLog.findFirst({
      where: {
        AND: [{ no }],
      },
    });
    if (!appWebhookLog) throw this.noContent();
    return appWebhookLog;
  };
  //
  downloadAppWebhookLogsExcel = async (
    params: AppWebhookLogsSearchParams,
    req: express.Request
  ) => {
    const logs: AppWebhookLogsQueryResponse[] = await prisma.$queryRaw`
        SELECT
            awl.no, 
            aw.profile, 
            w.webhook_kind_cd as webhookKindCode,
            w.name as webhookName,
            aw.endpoint_url as url,
            awl.process_dt as date,
            awl.status  
        FROM app_webhook aw 
        INNER JOIN webhook w on w.webhook_id = aw.webhook_id 
        INNER JOIN app_webhook_log awl on awl.webhook_id = aw.webhook_id 
        WHERE  1=1
        ${
          params.logStatus
            ? Prisma.sql`AND awl.status = ${params.logStatus}`
            : Prisma.empty
        }
        ${
          params.webhookKindCd
            ? Prisma.sql`AND w.webhook_kind_cd = ${params.webhookKindCd}`
            : Prisma.empty
        }
        ${
          params.profile
            ? Prisma.sql`AND aw.profile = ${params.profile}`
            : Prisma.empty
        }
        ${
          params.from && params.to
            ? Prisma.sql`AND awl.process_dt 
            BETWEEN 
            ${`${params.from} 00:00:00`}  
            AND 
            ${`${params.to} 23:59:59`}`
            : Prisma.empty
        }
        AND aw.app_id  = ${params.appId}
        ORDER BY  awl.process_dt desc
    `;

    if (req.res && logs) {
      //
      const headers = [
        { header: '번호', key: 'no' },
        { header: '프로필', key: 'profile' },
        { header: '웹훅유형', key: 'webhookKindCode' },
        { header: '웹훅이름', key: 'webhookName' },
        { header: '웹훅URL', key: 'url' },
        { header: '날짜', key: 'date' },
      ];

      const records = logs.map((log) => {
        return {
          no: Number(log.no),
          profile: log.profile,
          webhookKindCode: log.webhookKindCode,
          webhookName: log.webhookName,
          url: log.url,
          date: dayjs(log.date).format('YYYY-MM-DD HH:mm:ss'),
        };
      });

      const fileName = `WebhookLogs_${new Date().getTime()}.xlsx`;
      const sheetName = `webhook_logs`;

      await new ExcelUtil().downLoadExcel(
        req.res,
        headers,
        records,
        fileName,
        sheetName
      );
      const event: EventParamsType = {
        type: 'Settings',
        eventName: 'download CSV',
        appId: params.appId,
        profile: params.profile,
        description: 'Webhook log has been downloaded as CSV',
      };
      return { events: [event] };
    } else {
      throw this.internalServerError();
    }
  };
}
