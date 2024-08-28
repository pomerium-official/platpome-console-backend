import * as express from 'express';

import { BizCommonService } from '@/common/biz-common-service';
import { ErrorVo, ResponseErrorCode } from '@/base-common/common-response';
import { verifyJwt } from '@/base-common/libs/auth/libs/server/verify-jwt';

const bizCommonService = new BizCommonService();
export async function expressAuthentication(
  request: express.Request,
  /**
   * tsoa.json에 securityDefinitions 아이템 이름
   */
  securityName: string,
  scopes?: string[]
) {
  // tsoa.json에 type은 basic, apiKye, oauth2가 있다. 아래 내용 참고
  // https://swagger.io/docs/specification/2-0/authentication/
  // https://swagger.io/docs/specification/authentication/oauth2/
  // https://tsoa-community.github.io/docs/authentication.html

  // if (securityName === 'basic') {
  //   // 기본 로그인 인증 처리 msa 호출
  //   // console.log('-> request.body', request.body.password);
  //   const auth = request.headers['authorization'];
  //
  //   if (auth === undefined) {
  //     return Promise.reject({});
  //   }
  //
  //   const credentials = atob(auth.replace('Basic ', '')).split(':');
  //   try {
  //     const res = await axios.post(`${process.env.MSA_AUTH_API}/auth/login`, {
  //       password: credentials[1],
  //       username: credentials[0],
  //       service: process.env.MSA_SERVICE_CODE,
  //       provider: 'SELF',
  //     });
  //     const { accessToken } = res.data;
  //     return jwt.decode(accessToken);
  //   } catch (err) {
  //     return Promise.reject({});
  //   }
  // }

  if (securityName === 'cookie') {
    // console.log('>>>request.cookies', request.cookies);
    const accessToken = request.cookies['accessToken'];

    if (accessToken === undefined) {
      // 401
      return Promise.reject({
        status: 401,
        error: new ErrorVo({
          code: ResponseErrorCode.unAuthorized,
          message: 'No AccessToken',
        }),
      });
    }
    const platformMemberInfo = await verifyJwt(accessToken, undefined, scopes);
    if (platformMemberInfo) {
      const consoleMemberInfo =
        await bizCommonService.getConsoleMemberByPlatformMemberId(
          platformMemberInfo.sub
        );
      return {
        ...platformMemberInfo,
        consoleMemberInfo,
      };
    }
  }
  if (securityName === 'token') {
    // authorization 대소문자 상관없이 가져오기
    const authorizationHeaderName = Object.keys(request.headers).find(
      (s) => s.toLowerCase() === 'authorization'
    );

    let accessToken = request.body.access_token || request.query.access_token;
    if (accessToken === undefined && authorizationHeaderName) {
      const authorizeHeader = request.headers[
        authorizationHeaderName
      ] as string;
      if (authorizeHeader.toLowerCase().indexOf('bearer') === -1) {
        return Promise.reject({
          status: 401,
          error: new ErrorVo({
            code: ResponseErrorCode.unAuthorized,
            message: 'No token provided',
          }),
        });
      }
      accessToken = authorizeHeader?.replace(/bearer /i, '');
    }

    if (!accessToken) {
      return Promise.reject({
        status: 401,
        error: new ErrorVo({
          code: ResponseErrorCode.unAuthorized,
          message: 'No token provided',
        }),
      });
    }
    const platformMemberInfo = await verifyJwt(accessToken, undefined, scopes);
    if (platformMemberInfo) {
      const consoleMemberInfo =
        await bizCommonService.getConsoleMemberByPlatformMemberId(
          platformMemberInfo.sub
        );
      return {
        ...platformMemberInfo,
        consoleMemberInfo,
      };
    }
  }

  return Promise.reject({
    status: 401,
    error: new ErrorVo({
      code: ResponseErrorCode.unAuthorized,
      message: 'unAuthorized',
    }),
  });
}
