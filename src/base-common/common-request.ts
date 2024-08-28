import { AccessTokenInfo } from '@/base-common/common-models';
import express from 'express';

/**
 * private Request, 사용자 정보가 포함되어있습니다.
 */
export interface PrivateRequest<T extends AccessTokenInfo = AccessTokenInfo>
  extends express.Request {
  user: T;
}

export interface CommonPaginatorQueryParams {
  /**
   * 필터 "key:value"[]
   * query param이므로 문자열만 가능
   * 여러 검색 조건에 대해서 파라미터를 넘겨줍니다
   */
  filters?: string[]; //{ key: string; value: string }[];

  /**
   * 정렬 "field:-1|1"[]
   * query param이므로 문자열만 가능
   */
  sorts?: string[];
  //     {
  //   field: string;
  //   /**
  //    * asc: 1, desc:-1
  //    */
  //   value: '1' | '-1';
  // }[];

  /**
   * 검색어
   */
  keyword?: string;
}

export interface CursorPaginatorQueryParams extends CommonPaginatorQueryParams {
  /**
   * 가져올 열 수.
   */
  rows?: number;

  /**
   * cursor. 지난 페이지의 마지막 커서
   */
  cursor?: number | string;
}

export interface PaginatorQueryParams {
  /**
   * 가져올 열 수.
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   */
  pageNo?: number;
}
