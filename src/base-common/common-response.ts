export interface EventParamsType {
  appId?: number;
  eventName: string;
  profile?: string;
  type?: string;
  txId?: string;
  description?: string;
}

export enum ResponseErrorCode {
  success = '00',
  noContent = '204',
  parameterError = '400',
  unAuthorized = '401',
  conflict = '409',
  gone = '410',
  validationFailed = '422',
  internalServerError = '500',
  // TODO 에러 코드 추가해 주세요
}

export class ErrorVo {
  code: string;
  message: string;
  messageCode: string;
  events?: EventParamsType[];

  constructor({
    code = ResponseErrorCode.success,
    message = '',
    messageCode = '',
    events,
  }: {
    code?: ResponseErrorCode;
    message?: string;
    messageCode?: string;
    events?: EventParamsType[];
  }) {
    this.code = code?.toString();
    this.message = message;
    this.messageCode = messageCode;
    this.events = events;
  }
}

export type CommonResponse<T = void> = {
  error: ErrorVo;
  data?: T;
  total?: number;
};

/**
 * 커서방식 페이지네이션 공통 모델
 */
export type CommonPageCursorResponse<T = void> = CommonResponse<T> & {
  /**
   * 다음 페이지가 있는지 여부
   */
  hasNextPage: boolean;

  /**
   * 현재 페이지의 마지막 커서.
   */
  endCursor: string | number | null;

  // 이전 페이지있는지 여부나 시작커서는 백엔드에서 가져올 필요가 없을듯. 나중에 필요시 추가
  // /**
  //  * 현재 페이지의 첫번째 커서
  //  */
  // startCursor: string | number | null;
};
