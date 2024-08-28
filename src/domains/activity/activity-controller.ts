import { BaseController } from '@/base-common/base-controller';
import {
  Get,
  Middlewares,
  Path,
  Queries,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import { ActivityService } from '@/domains/activity/activity-service';
import { CommonResponse } from '@/base-common/common-response';
import { FindManyActivityLogsQueryParams } from '@/domains/activity/activity-models';
import { authorizationMiddleware } from '@/common/libs/middlewares';

@Tags('[Activity] 활동로그')
@Route('/activities')
@Middlewares([authorizationMiddleware])
export class ActivityController extends BaseController {
  private activityService = new ActivityService();

  /**
   * 앱 관련 활동로그 목록 조회
   * @param appId
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/console/{appId}')
  public async findManyActivities(
    @Path('appId') appId: number,
    @Queries() queryParams: FindManyActivityLogsQueryParams
  ): Promise<CommonResponse<any>> {
    const { data, total } = await this.activityService.findManyActivities(
      appId,
      queryParams
    );
    return this.success(data, total);
  }
}
