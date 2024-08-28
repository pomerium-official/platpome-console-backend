import {
  Body,
  Delete,
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
import { CommonResponse } from '@/base-common/common-response';
import { App, AppApiKey } from '@prisma/client';
import { AppService } from '@/domains/app/app-service';
import {
  AppDetailResponseType,
  AppWalletBalance,
  CreateAppApiKeyRequest,
  CreateAppRequest,
  FindMAnyAppsQueryParams,
  FindManyAppsQueryResponse,
  UpdateAppRequest,
} from '@/domains/app/app-models';
import { PrivateRequest } from '@/base-common/common-request';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { SupportChainId } from '@/common/libs/constants';
import { BaseController } from '@/base-common/base-controller';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';

@Route('/apps')
@Tags('[앱] App')
@Middlewares([authorizationMiddleware])
export class AppController extends BaseController {
  private appService = new AppService();

  /**
   * 콘솔 메인 홈 > 앱 등록 API
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/')
  public async createApp(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: CreateAppRequest
  ): Promise<CommonResponse<App>> {
    return this.success(
      await this.appService.create(
        requestBody,
        request.user.consoleMemberInfo.memberId
      )
    );
  }

  /**
   * 앱 정보 수정 API
   * @path appId = 앱 아이디
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/{appId}')
  public async updateApp(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path() appId: number,
    @Body() requestBody: UpdateAppRequest
  ): Promise<CommonResponse<App>> {
    const { data, events } = await this.appService.update(
      appId,
      requestBody,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 앱 상세 조회 API
   * @param request = privateRequest
   * @param appId = 앱 아이디
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/{appId}')
  public async findApp(
    @Request() request: PrivateRequest,
    @Path() appId: number
  ): Promise<CommonResponse<AppDetailResponseType>> {
    return this.success(await this.appService.find(appId));
  }

  /**
   * 콘솔 회원이 속한 앱 목록 조회 API
   *
   * @param request privateRequest
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/')
  public async findManyApps(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Queries() queryParams: FindMAnyAppsQueryParams
  ): Promise<CommonResponse<FindManyAppsQueryResponse[]>> {
    const { data, total } = await this.appService.findManyApps(
      request.user.consoleMemberInfo.memberId,
      queryParams
    );
    return this.success(data, total);
  }

  /**
   * 앱 API KEY 발급 API
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[앱 API] AppApi')
  @Post('/api-keys')
  public async createAppApiKeys(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: CreateAppApiKeyRequest
  ): Promise<CommonResponse<AppApiKey>> {
    const { events, data } = await this.appService.createAppApiKeys(
      requestBody,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 앱 API KEY 목록 조회 API
   * @param request
   * @param appId
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[앱 API] AppApi')
  @Get('/api-keys/{appId}')
  public async findManyAppApiKeys(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number
  ): Promise<CommonResponse<AppApiKey[]>> {
    return this.success(await this.appService.findManyAppApiKeys(appId));
  }

  /**
   * 앱 지갑 보유 토큰 조회
   *
   * @param chainId
   * @param appId
   */
  @Get('/{appId}/chains/{chainId}/tokens')
  public async getAppWalletBalance(
    @Path() chainId: SupportChainId = 97,
    @Path('appId') appId: number
  ): Promise<CommonResponse<AppWalletBalance[]>> {
    return this.success(
      await this.appService.getAppWalletBalances(chainId, appId)
    );
  }

  /**
   * 앱 API KEY 삭제 API
   * @param request
   * @param apiKeyId
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[앱 API] AppApi')
  @Delete('/api-keys/{apiKeyId}')
  public async deleteAppApiKey(
    @Request() request: PrivateRequest,
    @Path('apiKeyId') apiKeyId: number
  ): Promise<CommonResponse> {
    const { events, data } = await this.appService.deleteAppApiKey(apiKeyId);
    return this.successWithEvent(events, data);
  }
}
