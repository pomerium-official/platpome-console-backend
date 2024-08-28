//
import { PaginatorQueryParams } from '@/base-common/common-request';

export interface CreateWebhookRequest {
  /**
   * 웹훅명
   */
  name: string;
  /**
   * 웹훅 분류 코드
   * 코드그룹 : APS_WHK
   * 코드 : SWAP(게임재화 스왑) , TOKEN_IN(토큰 입금) , NFT_MINT(NFT 생성) , REVIEW_RESULT(심사결과 전송)
   */
  webhookKindCode: string;
  /**
   * 필수 여부 Y/N
   */
  requireYn: string;
  /**
   * 로그인한 회원 id
   */
  userId: number;
}

//
export interface CreateAppWebhookRequest {
  /**
   *  앱id
   */
  appId: number;
  /**
   * 프로필 : DEV(개발환경,테스트) , PRD(운영)
   */
  profile: string;
  /**
   * 웹훅명
   * @minLength 1 "웹훅명은 최소 1자에서 최대 20자 까지 입력 가능합니다."
   * @maxLength 20 "웹훅명은 최소 1자에서 최대 20자 까지 입력 가능합니다."
   */
  name: string;
  /**
   * 구간암호화 여부 Y/N
   */
  encryptionYn: string;
  /**
   * 엔드포인트 URL
   */
  endpointUrl: string;
  /**
   * 웹훅 id
   */
  webhookId: number;
}

export type UpdateAppWebhookRequest = CreateAppWebhookRequest;

export interface DeleteAppWebhookRequest {
  appId: number;
  profile: 'DEV' | 'PRD';
  webhookId: number;
}

export interface ResendAppWebhookRequest {
  no: number;
  processDt: string;
}

export interface AppWebhookLogsQueryResponse {
  //
  /**
   * 웹훅 로그 번호
   */
  no: string;
  /**
   * 프로필 : DEV | PRD
   */
  profile: string;
  /**
   * 웹훅 분류 코드
   * 코드그룹 : APS_WHK
   * 코드 : SWAP(게임재화 스왑) , TOKEN_IN(토큰 입금) , NFT_MINT(NFT 생성) , REVIEW_RESULT(심사결과 전송)
   */
  webhookKindCode: string;
  /**
   * 웹훅 이름
   */
  webhookName: string;
  /**
   * 엔드포인트 URL
   */
  url: string;
  /**
   * 날짜
   */
  date: string;
  /**
   * 처리 상태
   */
  status: string;
  /**
   * 요청 BODY
   */
  requestBody: string;
  /**
   * 응답 BODY
   */
  responseBody: string;
}

export interface AppWebhookLogsSearchParams
  extends FindManyAppWebhookLogsQueryParams {
  appId: number;
}

export interface WebhookBody {
  appId: number;
  webhookKindCd: string;
  data: any;
}
export interface FindManyAppWebhookLogsQueryParams
  extends PaginatorQueryParams {
  /**
   * YYYY-MM-DD
   */
  from?: string;
  /**
   * YYYY-MM-DD
   */
  to?: string;
  /**
   * 'DEV' | 'PRD'
   */
  profile?: 'DEV' | 'PRD';
  /**
   * 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT'
   */
  webhookKindCd?: 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT';
  /**
   * 'Success'|'Fail'
   */
  logStatus?: 'Success' | 'Fail';
}

export interface FindManyAppWebhooksQueryParams extends PaginatorQueryParams {
  /**
   * 'DEV' | 'PRD'
   */
  profile?: 'DEV' | 'PRD';
}
