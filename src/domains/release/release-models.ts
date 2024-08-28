//
export type LanguageOptions = 'ko' | 'en' | 'cn' | 'jp';
//
export type Platform = 'iOS' | 'Android' | 'Steam' | 'Window' | 'macOS';
//
export interface PlatformUrl {
  platform: Platform;
  url: string;
}
//
export interface ApplyReleaseRequest {
  /**
   * 앱 id
   * @example 1
   */
  appId: number;
  /**
   * 소개글
   * @example "소개글"
   */
  promotionalText: string;
  /**
   * 배너 이미지 url
   * @example "http://example.image/banner"
   */
  bannerUrl: string;
  /**
   * 카드 이미지 url
   * @example "http://example.image/card"
   */
  cardUrl: string;
  /**
   * 스크린샷 이미지 url 목록
   * @example ["http://example.image/screenshot1","http://example.image/screenshot2"]
   */
  screenUrls: string[];
  /**
   * 상세 설명
   * @example "상세설명"
   */
  detailDescription: string;
  /**
   * 홈페이지 주소
   * @example "http://example.homepage.com"
   */
  siteUrl: string;
  /**
   * 플랫폼 링크
   * 플랫폼 종류 : "iOS" , "Android" , "Steam" , "Window", "macOS"
   * @example "[{platform:"Android",url:"https://example.com"}]"
   */
  platformUrls: PlatformUrl[];
  /**
   * 지원 언어 "ko" , "en" , "cn" , "jp"
   * @example "["ko","en"]"
   */
  selectedLanguages: LanguageOptions[];
}

export interface FindManyReleaseHistoryResponse {
  /**
   * 출시 히스토리 id
   */
  id: number;
  /**
   * 앱 id
   */
  appId: number;
  /**
   * 출시 심사 id
   */
  reviewId: bigint;
  /**
   * 심사상태코드. 코드그룹(APRV_STAT), REQUEST: 심사요청, IN_REVIEW: 심사중, REJECTED: 반려, RELEASED: 출시, CANCELED: 취소됨
   */
  statusCd: string;
  /**
   * 작성자 id
   */
  createdId: number;
  /**
   * 작성일
   */
  createdAt: Date;
}

export type ReleaseStatusCodeType =
  | 'IN_REVIEW'
  | 'REQUESTED'
  | 'REJECTED'
  | 'CANCELED'
  | 'RELEASED';
