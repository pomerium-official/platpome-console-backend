import {
  ErrorVo,
  EventParamsType,
  ResponseErrorCode,
} from '@/base-common/common-response';

export class BaseService {
  //
  internalServerError = (message?: any) => {
    return {
      status: 200,
      error: this.error(
        ResponseErrorCode.internalServerError,
        message || 'internal server error'
      ),
    };
  };
  //
  unAuthorized = (message?: string) => {
    return {
      status: 200,
      error: this.error(
        ResponseErrorCode.unAuthorized,
        message || 'unAuthorized'
      ),
    };
  };
  //
  expirationError = (message?: string) => {
    return {
      status: 200,
      error: this.error(ResponseErrorCode.gone, message || 'gone'),
    };
  };
  //
  parameterError = (message?: string) => {
    return {
      status: 200,
      error: this.error(
        ResponseErrorCode.parameterError,
        message || 'parameter error'
      ),
    };
  };
  //
  validationFailed = (message?: string) => {
    return {
      status: 200,
      error: this.error(
        ResponseErrorCode.validationFailed,
        message || 'validationFailed'
      ),
    };
  };
  //
  noContent = (message?: string) => {
    return {
      status: 200,
      error: this.error(ResponseErrorCode.noContent, message || 'no content'),
    };
  };
  //
  alreadyExist = (message?: string) => {
    return {
      status: 200,
      error: this.error(
        ResponseErrorCode.conflict,
        message || 'duplicate or conflict'
      ),
    };
  };
  //
  error = (code: ResponseErrorCode, message: string) => {
    return new ErrorVo({ code, message });
  };
  //
  errorWithEvent = (
    code: ResponseErrorCode,
    message: string,
    events: EventParamsType[]
  ) => {
    return new ErrorVo({ code, message, events });
  };
}
