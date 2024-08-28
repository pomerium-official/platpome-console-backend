import {
  Body,
  Delete,
  Deprecated,
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
  AppWebhookLogsQueryResponse,
  AppWebhookLogsSearchParams,
  CreateAppWebhookRequest,
  CreateWebhookRequest,
  DeleteAppWebhookRequest,
  FindManyAppWebhookLogsQueryParams,
  FindManyAppWebhooksQueryParams,
  ResendAppWebhookRequest,
  UpdateAppWebhookRequest,
} from '@/domains/webhook/webhook-models';
import { CommonResponse } from '@/base-common/common-response';
import { AppWebhook, AppWebhookLog, Webhook } from '@prisma/client';
import { WebhookService } from '@/domains/webhook/webhook-service';
import express from 'express';
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

@Route('/webhooks')
@Tags('[웹훅] Webhook')
@Middlewares(authorizationMiddleware)
export class WebhookController extends BaseController {
  private webhookService = new WebhookService();

  //
  /**
   *  ** 웹훅 등록은 시스템으로 처리 **
   * 웹훅 등록 API
   * @param requestBody
   */
  @Deprecated()
  @Post('/')
  public async createWebhook(
    @Body() requestBody: CreateWebhookRequest
  ): Promise<CommonResponse<Webhook>> {
    return this.success(await this.webhookService.createWebhook(requestBody));
  }

  /**
   * 웹훅 목록 조회 API
   * @param request
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/')
  public async findManyWebhooks(
    @Request() request: PrivateRequest,
    @Queries() queryParams: PaginatorQueryParams
  ): Promise<CommonResponse<Webhook[]>> {
    const { pageSize, pageNo } = queryParams;
    const { data, total } = await this.webhookService.findManyWebhooks(
      pageSize,
      pageNo
    );
    return this.success(data, total);
  }

  /**
   * 앱 웹훅 등록 API
   * @param request
   * @param requestBody
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/apps')
  @Middlewares(activityLogger)
  public async createAppWebhook(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: CreateAppWebhookRequest
  ): Promise<CommonResponse<AppWebhook>> {
    const { events, data } = await this.webhookService.createAppWebhook(
      requestBody,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 앱 웹훅 수정 API
   * @param request
   * @param requestBody
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/apps')
  @Middlewares(activityLogger)
  public async updateAppWebhook(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: UpdateAppWebhookRequest
  ): Promise<CommonResponse<AppWebhook>> {
    const { events, data } = await this.webhookService.updateAppWebhook(
      requestBody,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 앱 웹훅 목록 조회 API
   * @param request
   * @param appId
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/apps/{appId}')
  public async findManyAppWebhooks(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Queries() queryParams: FindManyAppWebhooksQueryParams
  ): Promise<CommonResponse<AppWebhook[]>> {
    const { data, total } = await this.webhookService.findManyAppWebhooks(
      appId,
      queryParams
    );
    return this.success(data, total);
  }

  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Delete('/apps')
  @Middlewares(activityLogger)
  public async deleteAppWebhook(
    @Request() request: PrivateRequest,
    @Body() requestBody: DeleteAppWebhookRequest
  ): Promise<CommonResponse<AppWebhook>> {
    const { events } = await this.webhookService.deleteAppWebhook(requestBody);
    return this.successWithEvent(events);
  }

  /**
   * 웹훅 로그 목록 조회 API
   * @param request
   * @param appId 앱 id
   * @param queryParams
   */
  //TODO : logStatus 값 type 추가
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/logs/{appId}')
  public async findManyAppWebhookLogs(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Queries() queryParams: FindManyAppWebhookLogsQueryParams
  ): Promise<CommonResponse<AppWebhookLogsQueryResponse[]>> {
    const { data, total } = await this.webhookService.findMayAppWebhookLogs(
      queryParams,
      appId
    );
    return this.success(data, total);
  }

  /**
   * 웹훅 로그 상세 조회 API
   * @param request
   * @param appId
   * @param no
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/logs/{appId}/{no}')
  public async findAppWebhookLog(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Path('no') no: number
  ): Promise<CommonResponse<AppWebhookLog>> {
    //
    return this.success(await this.webhookService.findAppWebhookLog(appId, no));
  }

  /**
   * 웹훅 재전송
   * @param request
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/resend')
  public async resendAppWebhook(
    @Request() request: PrivateRequest,
    @Body() requestBody: ResendAppWebhookRequest
  ): Promise<CommonResponse<any>> {
    const { events, data } = await this.webhookService.resendAppWebhook(
      requestBody
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 웹 훅 목록 엑셀 다운로드 API
   * @param req
   * @param request
   * @param appId
   * @param queryParams
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/excel/logs/{appId}')
  public async downloadAppWebhookLogsExcel(
    @Request() req: express.Request,
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Queries() queryParams: FindManyAppWebhookLogsQueryParams
  ) {
    const params: AppWebhookLogsSearchParams = {
      appId,
      ...queryParams,
    };
    const { events } = await this.webhookService.downloadAppWebhookLogsExcel(
      params,
      req
    );
    return this.successWithEvent(events);
  }
}
