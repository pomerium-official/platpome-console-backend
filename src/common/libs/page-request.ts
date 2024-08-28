import { PaginatorQueryParams } from '@/base-common/common-request';

export class PageRequest {
  //
  constructor({ pageSize, pageNo }: PaginatorQueryParams) {
    const defaultPageSize = 20;
    const defaultPageNo = 0;
    this.take = pageSize && pageSize > 0 ? pageSize : defaultPageSize;
    this.skip = this.take * (pageNo && pageNo > 0 ? pageNo - 1 : defaultPageNo);
  }
  skip: number;
  take: number;
}
