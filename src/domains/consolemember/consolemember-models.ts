import { PaginatorQueryParams } from '@/base-common/common-request';

export interface CreateConsoleMemberRequest {
  /**
   * @example "test1234"
   * @minLength 8 "최소 8자 이상이어야 합니다"
   */
  loginId: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 닉네임
   * @example "지트북"
   */
  nickname: string;
  /**
   * 이메일 주소
   * @example "test@gmail.com"
   */
  email: string;
  /**
   * 핸드폰 번호
   */
  phone?: string;
  /**
   * 모바일 인증 여부
   */
  phoneCertificateYn?: string;
  /**
   * 복구 이메일
   */
  recoveryEmail?: string;
}

export type UpdateConsoleMemberRequest = Omit<
  CreateConsoleMemberRequest,
  'loginId' | 'platformMemberId'
>;

export interface FindMeResponse {
  memberId: bigint;
  name: string;
  nickname: string;
  loginId: string;
  createdAt: Date;
}

export interface FindManyConsoleMembersQueryParams
  extends PaginatorQueryParams {
  nickName?: string;
  email?: string;
}
