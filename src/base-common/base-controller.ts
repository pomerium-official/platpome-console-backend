import { Controller } from '@tsoa/runtime';
import { ParseSortError } from '@/common/libs/errors';
import {
  ErrorVo,
  EventParamsType,
  ResponseErrorCode,
} from '@/base-common/common-response';

export class BaseController extends Controller {
  //
  protected success = (data?: any, total?: number) => {
    return {
      data,
      total,
      error: new ErrorVo({
        code: ResponseErrorCode.success,
        message: 'success',
      }),
    };
  };
  //
  protected successWithEvent = (
    events: EventParamsType[],
    data?: any,
    total?: number
  ) => {
    return {
      data,
      error: new ErrorVo({
        code: ResponseErrorCode.success,
        message: 'success',
        events,
      }),
      total,
    };
  };

  parseSort = (sortableFields?: string[], sorts?: string) => {
    return sorts?.split(',').map((s) => {
      const fv = s.split(' ');

      if (fv.length > 2 || fv.length === 1) {
        throw new ParseSortError(`invalid sortOrder`);
      }

      const field = fv[0];
      if (!sortableFields?.some((s) => s === field)) {
        throw new ParseSortError(`wrong sort Field, Field is ${field}`);
      }

      const sort = fv[1];
      if (sort !== 'desc' && sort !== 'asc') {
        throw new ParseSortError(`wrong sort Order, sortOrder is ${sort}`);
      }
      return { field, sort };
    });
  };
}
