import {
  Body,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import {
  FindWalletByAppIdQueryResponse,
  GetTransactionsQueryParams,
  TransactionsSearchOption,
  TransferTokenRequest,
  TransferTokenResponse,
  WalletTransactionsResponseType,
} from '@/domains/wallet/wallet-models';
import { WalletService } from '@/domains/wallet/wallet-service';
import { PrivateRequest } from '@/base-common/common-request';
import { SupportChainId } from '@/common/libs/constants';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';

@Route('/wallets')
@Tags('[Wallet] Common')
@Middlewares([authorizationMiddleware])
export class WalletController extends BaseController {
  private walletService = new WalletService();
  /**
   * 지갑 설정 및 기능 마스터 외 멤버 접근 허용/비허용 처리 API
   * @param appId
   * @param walletId
   * @param request
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Put('/{appId}/member-access/{walletId}')
  @Middlewares([activityLogger])
  public async toggleMemberAccess(
    @Path('appId') appId: number,
    @Path('walletId') walletId: number,
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>
  ): Promise<CommonResponse<any>> {
    const { events } = await this.walletService.toggleMemberAccess(
      appId,
      walletId,
      request.user.consoleMemberInfo.memberId
    );
    return this.successWithEvent(events);
  }

  /**
   *  지갑 자동서명 허용/비허용 처리 API
   * @param appId
   * @param walletId
   * @param request
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Put('/{appId}/auto-sign/{walletId}')
  @Middlewares([activityLogger])
  public async toggleAutoSign(
    @Path('appId') appId: number,
    @Path('walletId') walletId: number,
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>
  ) {
    const { events } = await this.walletService.toggleAutoSign(
      appId,
      walletId,
      request.user.consoleMemberInfo.memberId
    );

    return this.successWithEvent(events);
  }

  /**
   * ERC20 토큰 전송 샘플
   *
   * @param chainId - 80001:mumbai testnet, 137:polygon mainnet
   * @param includeRawdata - true: include raw data, false: exclude raw data
   * @param requestBody
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Post('/{chainId}/wallets/transfer-token')
  public async transferToken(
    @Path() chainId = 80001,
    @Query('includeRawData') includeRawdata = true,
    @Body() requestBody: TransferTokenRequest
  ): Promise<CommonResponse<TransferTokenResponse>> {
    return this.success(
      await this.walletService.transferTokenUsingPrivateKey(
        chainId,
        includeRawdata,
        requestBody
      )
    );
  }

  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/wallets/{appId}/detail')
  public async findWalletDetailByAppId(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path('appId') appId: number,
    @Path('chainId') chainId: SupportChainId
  ): Promise<CommonResponse<FindWalletByAppIdQueryResponse>> {
    return this.success(
      await this.walletService.findWalletDetailByAppId(
        appId,
        chainId,
        request.user.consoleMemberInfo.memberId
      )
    );
  }

  /**
   * 지갑 정보 조회 API
   * @param request
   * @param appId
   * @param chainId
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/wallets/{appId}/address')
  public async findWalletByAppId(
    @Request() request: PrivateRequest,
    @Path('appId') appId: number,
    @Path('chainId') chainId: SupportChainId
  ): Promise<CommonResponse<FindWalletByAppIdQueryResponse>> {
    return this.success(
      await this.walletService.findWalletByAppId(appId, chainId)
    );
  }

  /**
   * 지갑 transaction 내역 조회
   * docs: https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-wallet-transaction?address=0xd8da6bf26964af9d7eed9e03e53415d37aa96045&chain=eth&include=internal_transactions
   * TODO: fromDate, toDate, include 옵션 추가
   * @param chainId - 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param walletAddress - wallet address
   * @param queryParams
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/wallets/{walletAddress}/transactions')
  public async getTransactions(
    @Path() chainId: SupportChainId = 97,
    @Path() walletAddress: string,
    @Queries() queryParams: GetTransactionsQueryParams
  ): Promise<CommonResponse<WalletTransactionsResponseType>> {
    const { pageSize = 10, pageCursor = '', fromDate, toDate } = queryParams;

    const options: TransactionsSearchOption = {
      limit: pageSize,
      cursor: pageCursor,
      fromDate,
      toDate,
    };
    return this.success(
      await this.walletService.getTransactions(chainId, walletAddress, options)
    );
  }

  /**
   * 지갑이 보유한 NFT 목록 조회 API
   *
   * @param chainId
   * @param walletAddress
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/{walletAddress}/balances')
  public async getWalletNFTTokens(
    @Path('chainId') chainId: SupportChainId,
    @Path('walletAddress') walletAddress: string
  ) {
    return this.success(
      await this.walletService.getWalletNFTTokens(walletAddress, chainId)
    );
  }
}
