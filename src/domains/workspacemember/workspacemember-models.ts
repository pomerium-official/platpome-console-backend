//
import { PaginatorQueryParams } from '@/base-common/common-request';

export interface CreateWorkspaceMemberRequest {
  /**
   * 워크 스페이스 id
   * @example 1
   */
  workspaceId: number;
  /**
   * 초대할 회원 id
   * @example 1
   */
  memberId: number;
  /**
   * 권한코드. 코드그룹: ACC_AUTH
   * MASTER: 마스터,
   * NORMAL: 일반
   * @example "NORMAL"
   * @default "NORMAL"
   */
  authorityCode: 'MASTER' | 'NORMAL';
}
//
export type UpdateWorkspaceMemberRequest = CreateWorkspaceMemberRequest;

export interface DeleteWorkspaceMemberRequest {
  /**
   * 워크스페이스 id
   */
  workspaceId: number;
  /**
   *  회원 id
   */
  memberId: number;
}
//
export interface FindManyWorkspaceMembersResponse {
  /**
   * 회원 식별자
   */
  consoleMemberId: string;
  /**
   * 닉네임
   */
  nickName: string;
  /**
   * 로그인 아이디
   */
  loginId: string;
  /**
   * 권한코드
   * 코드그룹: ACC_AUTH,
   * MASTER: 마스터,
   * NORMAL: 일반
   * @example "NORMAL"
   */
  authorityCode: string;
}

export interface InviteWorkspaceMemberRequest {
  /**
   * 워크스페이스 id
   * @example 1
   */
  workspaceId: number;
  /**
   * 이메일 주소
   * @example "test@naver.com"
   */
  email: string;
  /**
   * 권한코드
   * 코드그룹: ACC_AUTH,
   * MASTER: 마스터,
   * NORMAL: 일반
   * @example "NORMAL"
   */
  authorityCode: string;
}

export interface UpdateInvitationRequest {
  /**
   * 변경 할 상태 값
   * 코드그룹: ACINV_STAT
   * P: pending,
   * A: accept,
   * R: reject,
   * C: account created
   * @example "A"
   */
  statusCode: string;
}

export interface FindMAnyWorkspaceMembersQueryParams
  extends PaginatorQueryParams {
  appId: number;
}
