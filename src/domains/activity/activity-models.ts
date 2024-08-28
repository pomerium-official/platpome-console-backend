import { PaginatorQueryParams } from '@/base-common/common-request';

type MethodType = 'API' | 'Console';

export interface FindManyActivityLogsQueryParams extends PaginatorQueryParams {
  /**
   * profile : 'DEV' | 'PRD'
   */
  profile: 'DEV' | 'PRD';
  /**
   * YYYY-MM-DD 형식
   * @example 2023-11-30
   */
  from?: string;
  /**
   * YYYY-MM-DD 형식
   * @example 2023-12-31
   */
  to?: string;
  /**
   * 'wallet' | 'NFT'
   */
  types?: string;
  /**
   * 'API' | 'Console'
   * @example 'Console'
   */
  method?: MethodType;
}
