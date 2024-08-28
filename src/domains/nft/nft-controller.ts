import {
  Body,
  FormField,
  Get,
  Middlewares,
  Path,
  Post,
  Queries,
  Request,
  Route,
  Security,
  Tags,
  UploadedFile,
} from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { NftService } from '@/domains/nft/nft-service';
import {
  GetNFTQueryParams,
  GetNFTTransactionsByTokenIdQueryParams,
  IpfsResponse,
  MintAdditionalSupplyRequest,
  MintBatchRequest,
  MintBatchToRequest,
  NftItemDataType,
  NftItemDetailDataType,
  NFTOwnersResponseType,
  NFTTransactionResponseType,
} from '@/domains/nft/nft-models';
import { PrivateRequest } from '@/base-common/common-request';
import { SupportChainId } from '@/common/libs/constants';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';

@Route('/chains')
@Tags('[NFT] Common')
@Middlewares([authorizationMiddleware])
export class NftController extends BaseController {
  private nftService = new NftService();

  /**
   * IPFS 업로드
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param title
   * @param description
   * @param file
   * @param request
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/{chainId}/ipfs/upload')
  public async ipfsUpload(
    @Path() chainId: SupportChainId,
    @Request() request: PrivateRequest,
    @FormField() title: string,
    @FormField() description: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<CommonResponse<IpfsResponse>> {
    return this.success(
      await this.nftService.uploadIpfsWithChainId(
        chainId,
        title,
        description,
        file
      )
    );
  }

  /**
   * NFT 일괄 민팅 (ERC1155)
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param requestBody
   * @param request
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/{chainId}/erc1155/mint-batch')
  @Middlewares([activityLogger])
  public async mintBatch(
    @Path() chainId: SupportChainId,
    @Request() request: PrivateRequest,
    @Body() requestBody: MintBatchRequest
  ): Promise<CommonResponse<any>> {
    const { data, events } = await this.nftService.mintBatch(
      chainId,
      requestBody
    );
    return this.successWithEvent(events, data);
  }

  /**
   * NFT 일괄 민팅 (ERC1155)
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param toAddress NFT 발행될 지갑주소
   * @param requestBody
   * @param request
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/{chainId}/wallets/{toAddress}/erc1155/mint-batch')
  @Middlewares([activityLogger])
  public async mintBatchTo(
    @Path() chainId: SupportChainId,
    @Path() toAddress: string,
    @Request() request: PrivateRequest,
    @Body() requestBody: MintBatchToRequest
  ): Promise<CommonResponse<any>> {
    const { data, events } = await this.nftService.mintBatchTo(
      chainId,
      toAddress,
      requestBody
    );

    return this.successWithEvent(events, data);
  }

  /**
   * NFT 추가 민팅
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param requestBody
   * @param request
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Post('/{chainId}/erc1155/mint-additional')
  public async mintAdditionalSupply(
    @Path() chainId: SupportChainId,
    @Request() request: PrivateRequest,
    @Body() requestBody: MintAdditionalSupplyRequest
  ): Promise<CommonResponse<any>> {
    return this.success(
      await this.nftService.mintAdditionalSupply(chainId, requestBody)
    );
  }

  /**
   * NFT 목록 조회
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/erc1155')
  public async getNFTs(
    @Path() chainId: SupportChainId
  ): Promise<CommonResponse<NftItemDataType[]>> {
    const { data, total } = await this.nftService.getNFTs(chainId);
    return this.success(data, total);
  }

  /**
   * NFT 목록 지갑주소로 조회
   *
   * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
   * @param walletAddress 지갑주소
   */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/wallets/{walletAddress}/erc1155')
  public async getOwnedNFTs(
    @Path() chainId: SupportChainId,
    @Path() walletAddress: string
  ): Promise<CommonResponse<NftItemDataType[]>> {
    const { data, total } = await this.nftService.getOwnedNFTs(
      chainId,
      walletAddress
    );
    return this.success(data, total);
  }

  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/erc1155/{tokenId}')
  public async getNFT(
    @Path() chainId: SupportChainId,
    @Request() request: PrivateRequest,
    @Path() tokenId: number
  ): Promise<CommonResponse<NftItemDetailDataType>> {
    return this.success(await this.nftService.getNFT(chainId, tokenId));
  }

  /**
     전체 발행 된 NFT의 보유 목록 조회
     * @param chainId 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet
     * @param contractAddress
     * @param queryParams
     */
  @Security('cookie')
  @Security('token')
  @Security('devAuth')
  @Get('/{chainId}/erc1155/holders/{contractAddress}')
  public async getNFTOwners(
    @Path() chainId: SupportChainId,
    @Path() contractAddress: string,
    @Queries() queryParams: GetNFTQueryParams
  ): Promise<CommonResponse<any>> {
    const {
      pageSize = 10,
      pageCursor,
      format = 'decimal',
      normalizeMetadata = false,
      mediaItems = false,
    } = queryParams;

    const options = {
      format,
      limit: pageSize,
      cursor: pageCursor,
      normalizeMetadata,
      mediaItems,
    };

    return this.success(
      await this.nftService.getNFTOwners(chainId, contractAddress, options)
    );
  }

  /**
   * 토큰 소유자 목록 호출
   * @param chainId
   * @param contractAddress
   * @param tokenId
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/{chainId}/erc1155/{contractAddress}/{tokenId}/holders')
  public async getNFTOwnersByTokenId(
    @Path('chainId') chainId: SupportChainId,
    @Path() contractAddress: string,
    @Path() tokenId: string,
    @Queries() queryParams: GetNFTQueryParams
  ): Promise<CommonResponse<NFTOwnersResponseType>> {
    const {
      pageSize = 10,
      pageCursor,
      format = 'decimal',
      normalizeMetadata = false,
      mediaItems = false,
    } = queryParams;
    const options = {
      format,
      limit: pageSize,
      cursor: pageCursor,
      normalizeMetadata,
      mediaItems,
    };
    const { data, total } = await this.nftService.getNFTOwnersByTokenId(
      chainId,
      contractAddress,
      tokenId,
      options
    );
    return this.success(data, total);
  }

  /**
   * Token 트랜잭션 목록 호출
   * @param chainId
   * @param contractAddress
   * @param tokenId
   * @param queryParams
   */
  @Get('/{chainId}/erc1155/{contractAddress}/{tokenId}/transactions')
  public async getNFTTransactionsByTokenId(
    @Path('chainId') chainId: SupportChainId,
    @Path('contractAddress') contractAddress: string,
    @Path('tokenId') tokenId: string,
    @Queries() queryParams: GetNFTTransactionsByTokenIdQueryParams
  ): Promise<CommonResponse<NFTTransactionResponseType>> {
    const { pageSize = 10, pageCursor } = queryParams;
    const { data, total } = await this.nftService.getNFTTransactionsByTokenId(
      chainId,
      contractAddress,
      tokenId,
      pageSize,
      pageCursor
    );
    return this.success(data, total);
  }
}
