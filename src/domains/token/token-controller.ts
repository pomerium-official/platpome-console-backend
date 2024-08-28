import { Body, Middlewares, Post, Route, Security, Tags } from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { TokenService } from '@/domains/token/token-service';
import {
  SimulateTxResponse,
  TokenTransferRequest,
} from '@/domains/token/token-models';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';

@Route('/tokens')
@Tags('[토큰] Token')
@Middlewares([authorizationMiddleware])
export class TokenController extends BaseController {
  private tokenService = new TokenService();
  /**
   * ERC20 토큰 전송 API 시뮬레이션
   * @param requestBody
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Post('/simulates')
  public async simulatesTransferToken(
    @Body() requestBody: TokenTransferRequest
  ): Promise<CommonResponse<SimulateTxResponse>> {
    return this.success(
      await this.tokenService.simulateTransferToken(requestBody)
    );
  }

  /**
   * ERC20 토큰 전송 API
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Post('/')
  public async transferToken(
    @Body() requestBody: TokenTransferRequest
  ): Promise<CommonResponse> {
    const { data, events } = await this.tokenService.transferToken(requestBody);
    return this.successWithEvent(events, data);
  }
}
