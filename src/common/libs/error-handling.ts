import { Application, NextFunction, Request, Response } from 'express';
// import { IS_PRODUCTION } from './secrets';
import { ValidateError } from '@tsoa/runtime';
import { ErrorVo, ResponseErrorCode } from '@/base-common/common-response';

export interface CommonError extends Error {
  status: number;
  error?: ErrorVo;
}

//
// const messageForDev = (msg: string) => {
//   if (process.env.DEV_MODE !== 'true') {
//     return msg;
//   } else {
//     return '';
//   }
// };

export function loadErrorHandlers(app: Application) {
  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ): Response | void {
    // TSOA validate Error
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);

      return res.status(422).json({
        data: {
          message: 'Validation Failed',
          details: err?.fields,
        },
        error: new ErrorVo({
          code: ResponseErrorCode.validationFailed,
          message: 'Validation Failed',
        }),
      });
    }

    if (typeof err === 'string') {
      // throw ""로 발생한 에러 혹은 라이브러리에서 낸 string타입의 에러를 처리합니다.
      console.error('internalServerError >> ', err);
      return res.status(500).json({
        error: new ErrorVo({
          code: ResponseErrorCode.internalServerError,
          message: err,
        }),
      });
    }

    // status, message, stack, error 다 옵셔널인 상태임.
    // 공통 에러를 처리해주기 위해 CommonError로 타입 별칭.
    const commErr = err as CommonError;
    const { status, error } = commErr;

    // 프레임워크에서 정의한 ErrorVO 처리
    if (error) {
      // TODO 여기도 로그 찍을지?
      //  -> 안찍는게 낫다고 생각하는 이유는 의도적인 에러 메시지 이기 때문. 이 부분까지 로그로 찍으면 너무 많은 에러 코드가 생길 것 같습니다.
      return res.status(status ?? 200).json({
        error,
      });
    }
    // 그 외 잡지 못한 에러 처리 ex - prisma

    // TODO 운영 로그 관련 상의 필요 출력 범위 정책 필요
    // 왜냐하면 서버쪽에서 로그찍을때, 보안관련 개인정보도 찍을 수 있는데, 이걸 운영로그에 노출이 안되어야하는지?
    // 에러 출력 stack, message 말고 다른 값들도 출력 되도록
    console.error('internalServerError >> ', commErr);

    // const errorMessage = JSON.stringify(err, Object.getOwnPropertyNames(err));
    // "{}" -> 사실 알고보니 stack, message가 있더라.
    // 이유는 err 객체에 stack이랑 message가 enumerable 하지 않기 때문에 열거가 안됨
    // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
    // JSON.stringify(err, whitelist) 로 처리

    return res.status(500).json({
      error: new ErrorVo(
        {
          code: ResponseErrorCode.internalServerError,
          // 공식적으로 ErrorVO의 message는 string이어야하나, 인터널 서버 에러를 좀 더 쉽게 보기위하여 아래와 같이 object로 처리
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message:
            process.env.DEV_MODE === 'true'
              ? {
                  ...commErr,
                  stack: commErr.stack,
                  message: commErr.message,
                }
              : '',
        }
        // messageForDev(errorMessage)
      ),
    });
  });
}
