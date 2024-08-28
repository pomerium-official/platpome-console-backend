import { PaginatorQueryParams } from '@/base-common/common-request';

export interface CommonCodeGroupQueryResponse {
  //
  codeGroup: string;
  name: string;
  description: string | null;
  order: number | null;
}

export interface SendCertificationSMSRequest {
  /**
   * 콘솔멤버 이름
   * @example "김개발"
   */
  consoleMemberName: string;
  /**
   * 국가번호
   * @example "82"
   */
  nationCodeNumber: string;
  /**
   * 핸드폰 번호
   * @example "01042128867"
   */
  phone: string;
}

export interface CertificateCodeRequest {
  /**
   * 핸드폰 인증 인증번호 6자리
   * @minLength 6 "인증번호는 6자리 여야 합니다."
   * @maxLength 6 "인증번호는 6자리 여야 합니다."
   */
  code: string;
}

export interface SendCertificationSMSResponse {
  /**
   * 문자 전송 업체에서 반환하는 UUID
   */
  messageId: string;
  /**
   * 만료시간 epoch time
   */
  expiryTime: number;
}

export interface FindManyCodesQueryParams extends PaginatorQueryParams {
  codeGroup?: string;
}

export interface FindManyCodeGroupsQueryParams extends PaginatorQueryParams {
  name?: string;
}
