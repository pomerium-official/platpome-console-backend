import {
  Body,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Query,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { MarketplaceService } from '@/domains/marketplace/marketplace-service';
import {
  CancelListingRequest,
  ChangePriceRequest,
  DirectListingRequest,
  DirectListingResponse,
  GetValidListingsQueryParams,
  ListingResponse,
  SearchOption,
} from '@/domains/marketplace/makerplace-models';
import { SupportChainId } from '@/common/libs/constants';
import { BaseController } from '@/base-common/base-controller';
import { PaginatorQueryParams } from '@/base-common/common-request';
import { activityLogger } from '@/common/libs/middlewares';

@Route('/chains')
@Tags('[Marketplace] Common')
export class MarketplaceController extends BaseController {
  private marketplaceService = new MarketplaceService();

  /**
   * 마켓에 NFT 등록 createDirectListing
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param appId
   * @param includeRawData
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/{chainId}/marketplace/{appId}/direct-listings')
  public async createDirectListing(
    @Path() chainId: SupportChainId,
    @Path() appId: number,
    @Query('includeRawData') includeRawData = false,
    @Body() requestBody: DirectListingRequest
  ): Promise<CommonResponse<DirectListingResponse>> {
    const { data, events } = await this.marketplaceService.createListings({
      chainId,
      includeRawData,
      request: requestBody,
      appId,
    });
    return this.successWithEvent(events, data);
  }

  /**
   * 마켓 플레이스에 등록된 NFT 등록 취소 API
   * @param chainId
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/{chainId}/marketplace/remove-listings')
  public async removeFromListing(
    @Path('chainId') chainId: SupportChainId,
    @Body() requestBody: CancelListingRequest
  ): Promise<CommonResponse<any>> {
    const { data, events } = await this.marketplaceService.removeFromListing(
      chainId,
      requestBody
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 마켓 플레이스에 등록된 NFT의 가격 수정 API
   * @param chainId
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/{chainId}/marketplace/change-price')
  public async changePriceFromListing(
    @Path('chainId') chainId: SupportChainId,
    @Body() requestBody: ChangePriceRequest
  ) {
    const { events, data } = await this.marketplaceService.changePrice(
      chainId,
      requestBody
    );
    return this.successWithEvent(events, data);
  }

  /**
   * 마켓플레이스 컨트랙트에 등록된 NFT 목록 조회
   * @param chainId
   */
  @Get('/{chainId}/marketplace/listings')
  public async getListings(@Path('chainId') chainId: SupportChainId) {
    const { data, total } = await this.marketplaceService.getListings(chainId);
    return this.success(data, total);
  }

  /**
   * NFT 트랜잭션 목록 조회 API
   * @param chainId
   * @param tokenId
   * @param queryParams
   */
  @Get('/{chainId}/marketplace/listings/{tokenId}')
  public async findManyTokenActivities(
    @Path('chainId') chainId: SupportChainId,
    @Path('tokenId') tokenId: string,
    @Queries() queryParams: PaginatorQueryParams
  ) {
    const { pageSize = 10, pageNo = 1 } = queryParams;
    const count = pageSize < 0 ? 10 : pageSize;
    const start = (pageNo - 1) * count < 0 ? 0 : (pageNo - 1) * count;
    const searchOption: SearchOption = {
      count,
      start,
      tokenId,
    };
    const { data, total } =
      await this.marketplaceService.findManyTokenActivities(
        searchOption,
        chainId
      );
    return this.success(data, total);
  }

  // /**
  //  * NFT 구매
  //  *
  //  * @param chainId - 80001:mumbai testnet, 137:polygon mainnet
  //  * @param includeRowData - true: include raw data, false: exclude raw data
  //  * @param requestBody
  //  */
  // @Post('/{chainId}/marketplace/direct-listings/buy')
  // public async buyFromListing(
  //   @Path() chainId = 80001,
  //   @Query('includeRawData') includeRawdata = true,
  //   @Body() requestBody: BuyRequest
  // ): Promise<CommonResponse<any | undefined>> {
  //   const marketplaceService = new MarketplaceService();
  //   return marketplaceService.buy(chainId, includeRawdata, requestBody);
  // }

  /**
   * 마켓플레이스 NFT 목록 조회 - 유효목록 조회
   * [유효조건]
   * 목록이 만료되지 않았습니다(시간이 endTimeInSeconds 이전임).
   * 목록이 취소되지 않았습니다.
   * 목록이 매수되지 않았습니다(모든 수량의 NFT를 구매하지 않았습니다).
   *
   * @param chainId - 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param queryParams
   */
  @Get('/{chainId}/marketplace/direct-listings')
  public async getValidListings(
    @Path() chainId: SupportChainId,
    @Queries() queryParams: GetValidListingsQueryParams
  ): Promise<CommonResponse<ListingResponse>> {
    const {
      pageNo = 1,
      pageSize = 10,
      sellerAddress,
      includeRowData = true,
      tokenContract,
      tokenId,
    } = queryParams;

    const options = {
      count: pageSize || 10,
      seller: sellerAddress,
      start: (pageNo - 1) * pageSize,
      tokenContract: tokenContract,
      tokenId: tokenId,
    };
    return this.success(
      await this.marketplaceService.getAllValid(
        chainId,
        includeRowData,
        options
      )
    );
  }
}
