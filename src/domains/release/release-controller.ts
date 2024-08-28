import {
  Body,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Request,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import {
  ApplyReleaseRequest,
  FindManyReleaseHistoryResponse,
} from '@/domains/release/release-models';
import { CommonResponse } from '@/base-common/common-response';
import { App } from '@prisma/client';
import { ReleaseService } from '@/domains/release/release-service';
import {
  PaginatorQueryParams,
  PrivateRequest,
} from '@/base-common/common-request';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';

@Route('/release')
@Tags('[출시] Release')
@Middlewares(authorizationMiddleware)
export class ReleaseController extends BaseController {
  private releaseService = new ReleaseService();
  //
  /**
   * 앱 출시 심사 요청 API
   * @param request
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/')
  public async applyRelease(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: ApplyReleaseRequest
  ): Promise<CommonResponse<App>> {
    //
    const { events, data } = await this.releaseService.applyRelease(
      requestBody,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 출시 심사 신청 취소 API
   * @param request
   * @param appId
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/{appId}')
  public async cancelApplyRelease(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path('appId') appId: number
  ): Promise<CommonResponse> {
    const { events, data } = await this.releaseService.cancelApplyRelease(
      appId,
      request.user.consoleMemberInfo.memberId
    );
    //
    return this.successWithEvent(events, data);
  }

  /**
   * 앱 출시 심사 승인 API
   * @param request
   * @param reviewId
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/approve/{reviewId}')
  public async approveRelease(
    @Request() request: PrivateRequest,
    @Path('reviewId') reviewId: number
  ): Promise<CommonResponse<App>> {
    return this.success(await this.releaseService.approveRelease(reviewId));
  }

  /**
   * 앱 심사 내역 목록 조회 API
   * @param request
   * @param appId
   * @param requestParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/{appId}')
  public async getReleaseHistories(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Queries() requestParams: PaginatorQueryParams
  ): Promise<CommonResponse<FindManyReleaseHistoryResponse[]>> {
    const { data, total } = await this.releaseService.getReleaseHistories(
      appId,
      requestParams
    );
    return this.success(data, total);
  }
}
