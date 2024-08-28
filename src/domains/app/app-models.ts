import {
  PlatformUrl,
  ReleaseStatusCodeType,
} from '@/domains/release/release-models';
import { PaginatorQueryParams } from '@/base-common/common-request';
//
export interface CreateAppRequest {
  /**
   * 앱 이름
   * @example "appName"
   * @minLength 1 "최소 3글자 이상 이어야 합니다."
   * @maxLength 50 "최대 50글자 까지 입력 가능합니다."
   */
  name: string;
  /**
   * @pattern [^(?:/(?:\*{1,2}|\w+\*{0,2}))+/?$] "iconUrl pattern does not match"
   * @example "https://example.com/example/exampleexample"
   */
  iconUrl: string;
  /**
   * 체인
   * @example "ETH"
   */
  blockChainId: string;
}

export type UpdateAppRequest = Omit<CreateAppRequest, 'blockChainId'>;

export interface CreateAppApiKeyRequest {
  /**
   * 앱 식별자
   * @example 1
   * @isInt
   */
  appId: number;
  /**
   * 앱 API KEY 이름
   * @minLength 1 "웹훅명은 최소 1자에서 최대 50자 까지 입력 가능합니다."
   * @maxLength 50 "웹훅명은 최소 1자에서 최대 50자 까지 입력 가능합니다."
   */
  name: string;
  /**
   * 코드그룹명 : [API_KEY]
   * 키유형코드 =>
   * SIGN_SECRET: 서명 시크릿
   * REST_API: REST API 키
   * OAUTH2_CLIENT: oauth2클라이언트
   * ENC_PUBLIC: 암호화 공개키
   * ENC_PRIVATE: 암호화 비공개키
   * CLIENT_ID : 클라이언트 ID
   * CLIENT_SECRET : 클라이언트 시크릿
   * @example "REST_API"
   *
   */
  apiKeyKindCode: string;
}
export interface FindManyAppsQueryResponse {
  /**
   * 앱 id
   */
  appId: number;
  /**
   * 앱 이름
   */
  name: string;
  /**
   * 앱 아이콘 url
   */
  iconUrl: string | null;
  /**
   * 앱 하위 워크 스페이스 목록
   */
  appWorkspace: {
    /**
     * 워크스페이스 id
     */
    workspaceId: number;
    /**
     * 디폴트 워크스페이스 여부
     */
    defaultYn: string;
  }[];
  appWallet: any;
}

export interface AppDetailResponseType {
  appId: number;
  name: string;
  iconUrl: string | null;
  blockChainId: string;
  cardUrl: string | null;
  promotionalText: string | null;
  bannerUrl: string | null;
  screenUrls: string[];
  detailDescription: string | null;
  siteUrl: string | null;
  platformUrls?: PlatformUrl[];
  languages?: string[];
  createdId: number;
  createdAt: Date;
  /**
   * 심사상태코드. 코드그룹(APRV_STAT), REQUEST: 심사요청, IN_REVIEW: 심사중, REJECTED: 반려, RELEASED: 출시, CANCELED: 취소됨
   */
  status: ReleaseStatusCodeResponseType;
}

export type ReleaseStatusCodeResponseType =
  | ReleaseStatusCodeType
  | 'Preparation';

export interface BigNumber {
  type: string;
  hex: string;
}

export interface AppWalletBalance {
  symbol: string;
  name: string;
  decimals: number;
  value: BigNumber;
  displayValue: string;
  iconUrl: string;
  contractAddress: string;
}

export interface FindMAnyAppsQueryParams extends PaginatorQueryParams {
  /**
   * 앱 이름 검색 값 (포함 검색)
   */
  name?: string;
}
