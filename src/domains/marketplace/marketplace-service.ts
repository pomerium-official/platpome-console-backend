import { BaseService } from '@/base-common/base-service';
import { prebuiltContracts, SupportChainId } from '@/common/libs/constants';
import {
  getGaslessAdminSDK,
  getGaslessAppSDK,
} from '@/common/libs/thirdweb-sdk';
import {
  CancelListingRequest,
  ChangePriceRequest,
  CreateListingsParams,
  ListingNFT,
  ListingResponse,
  NFTList,
  SearchOption,
} from '@/domains/marketplace/makerplace-models';
import { DirectListingV3, Status } from '@thirdweb-dev/sdk';
import { CryptoUtil } from '@/common/libs/crypto-util';
import { BizCommonService } from '@/common/biz-common-service';
import {
  getErc20ContractListByChainId,
  getNFTContractAddress,
  sliceAddress,
} from '@/common/libs/blockchain-util';
import { prisma } from '@/context';
import { EventParamsType } from '@/base-common/common-response';

export class MarketplaceService extends BaseService {
  private bizCommonService = new BizCommonService();
  private cryptoUtil = new CryptoUtil();
  createListings = async ({
    chainId = SupportChainId.BinanceSmartChainTestnet,
    includeRawData = false,
    request,
    appId,
  }: CreateListingsParams) => {
    let contract;
    let walletAddress;
    const events: EventParamsType[] = [];

    if (appId) {
      const wallet = await this.bizCommonService.getWalletByAppId(appId);
      walletAddress = wallet.address;
      contract = await this.appMarketContract(
        chainId,
        this.cryptoUtil.decipherString(wallet?.encPrivateKey)
      );
    } else {
      contract = await this.marketContract(chainId);
    }
    const currencyContractAddress = getErc20ContractListByChainId(chainId).find(
      (contract) => contract.generalSymbol === 'PMG'
    )?.contractAddress;

    const assetContractAddress = request.contractAddress
      ? request.contractAddress
      : getNFTContractAddress(chainId, prebuiltContracts.edition);

    const result = await contract.directListings.createListing({
      assetContractAddress,
      tokenId: request.tokenId,
      pricePerToken: request.pricePerToken, // Required - price of each token in the listing
      currencyContractAddress, // Optional - smart contract address of the currency to use for the listing
      isReservedListing: request.isReservedListing, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
      quantity: request.quantity ? request.quantity : undefined, // Optional - number of tokens to sell (1 for ERC721 NFTs)
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 3650 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 3650 days from now)
    });

    const appNft = await prisma.appNft.findFirst({
      where: {
        tokenId: Number(request.tokenId),
      },
    });

    const txHash = result.receipt.transactionHash;
    if (appNft) {
      const listingNFTEvent: EventParamsType = {
        type: 'NFT',
        eventName: 'Listing',
        profile:
          chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
        txId: txHash,
        appId: appNft.appId,
        description: `${sliceAddress(walletAddress ?? '')} wallet has changed ${
          appNft.name
        } NFT into 'Put on sale' at ${request.pricePerToken} PMG `,
      };
      events.push(listingNFTEvent);
    }

    const data = {
      listingId: `${parseInt(result.id._hex, 16)}`,
      txHash: result.receipt.transactionHash,
      resultCode: result.receipt.status,
      rowData: includeRawData ? result : {},
    };
    return { data, events };
  };

  marketContract = async (chainId: SupportChainId) => {
    const sdk = getGaslessAdminSDK(chainId);
    return await sdk.getContract(
      getNFTContractAddress(chainId, prebuiltContracts['marketplace-v3']),
      prebuiltContracts['marketplace-v3']
    );
  };

  appMarketContract = async (chainId: SupportChainId, privateKey: string) => {
    const sdk = getGaslessAppSDK(privateKey, chainId);
    return await sdk.getContract(
      getNFTContractAddress(chainId, prebuiltContracts['marketplace-v3']),
      prebuiltContracts['marketplace-v3']
    );
  };

  getBasicInfo = async ({
    appId,
    chainId,
    tokenId,
  }: {
    appId: number;
    chainId: SupportChainId;
    tokenId: number;
  }) => {
    const appNft = await this.getAppNft(appId, tokenId);

    const wallet = await this.bizCommonService.getWalletByAppId(appId);
    const contract = await this.appMarketContract(
      chainId,
      this.cryptoUtil.decipherString(wallet?.encPrivateKey)
    );
    return { appNft, wallet, contract };
  };

  removeFromListing = async (
    chainId: SupportChainId,
    request: CancelListingRequest
  ) => {
    const { tokenId, appId } = request;

    const { appNft, wallet, contract } = await this.getBasicInfo({
      appId,
      tokenId: Number(tokenId),
      chainId,
    });
    const listings = await contract.directListings.getAll();

    const listing = listings.find(
      (f) => f.tokenId === tokenId && f.status === Status.Active
    );

    if (listing) {
      const result = await contract.directListings.cancelListing(listing.id);
      const data = { result, listings };
      //0xf3…214D wallet has changed 테스트 NFT into ‘Not for sale’

      const removedNFTEvent: EventParamsType = {
        type: 'NFT',
        eventName: 'Remove',
        profile:
          chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
        txId: result.receipt.transactionHash,
        appId,
        description: `${sliceAddress(wallet.address)} wallet has changed ${
          appNft.name
        } NFT into 'Not for sale'`,
      };
      return { data, events: [removedNFTEvent] };
    } else {
      throw this.internalServerError('failed to removeFromListing.');
    }
  };

  getAppNft = async (appId: number, tokenId: number) => {
    const appNft = await prisma.appNft.findFirst({
      where: {
        tokenId,
        appId,
      },
    });
    if (!appNft) throw this.noContent(`no nft with tokenId [${tokenId}]`);
    return appNft;
  };
  changePrice = async (
    chainId: SupportChainId,
    request: ChangePriceRequest
  ) => {
    const { tokenId, appId, price } = request;

    const { appNft, wallet, contract } = await this.getBasicInfo({
      appId,
      tokenId: Number(tokenId),
      chainId,
    });

    const listings = await contract.directListings.getAll();

    const listing = listings.find(
      (f) => f.tokenId === tokenId && f.status === Status.Active
    );

    if (listing) {
      await contract.directListings.cancelListing(listing.id);
      const result = await contract.directListings.createListing({
        ...listing,
        pricePerToken: price,
      });
      const changePriceEvent: EventParamsType = {
        type: 'NFT',
        eventName: 'Change Price',
        profile:
          chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
        txId: result.receipt.transactionHash,
        appId: appNft.appId,
        description: `${sliceAddress(
          wallet.address ?? ''
        )} wallet has changed ${appNft.name} NFT's price to ${price} PMG `,
      };
      return { events: [changePriceEvent], data: result };
    } else {
      throw this.internalServerError('failed to changePrice.');
    }
  };

  getListings = async (chainId: SupportChainId) => {
    const listings = await this.fetchListing(chainId);
    return { data: listings, total: listings.length };
  };

  fetchListing = async (chainId: SupportChainId) => {
    const contract = await this.marketContract(chainId);
    return await contract.directListings.getAll();
  };

  /**
   * Marketplace에서 모든 유효한 직접 목록을 가져옵니다.
   * 목록은 다음과 같은 경우 유효한 것으로 간주됩니다.
   * 판매자는 여전히 NFT를 소유하고 있습니다.
   * 목록이 만료되지 않았습니다(시간이 endTimeInSeconds 이전임).
   * 목록이 취소되지 않았습니다.
   * 목록이 매수되지 않았습니다(모든 수량의 NFT를 구매하지 않았습니다).
   *
   * @param chainId SupportChainId
   * @param includeRawData rawdata 포함여부
   * @param options
   */
  getAllValid = async (
    chainId: SupportChainId,
    includeRawData: boolean,
    options: SearchOption
  ): Promise<ListingResponse> => {
    const contract = await this.marketContract(chainId);

    const rowData = await contract.directListings.getAllValid(options);

    return {
      rowData: (includeRawData ? rowData : []) as unknown as ListingNFT[],
      list: this.toListData(rowData) as unknown as NFTList[],
    };
  };

  toListData = (items: DirectListingV3[]) => {
    return items.map((item) => {
      return {
        price: item.currencyValuePerToken.displayValue,
        currency: item.currencyValuePerToken.symbol,
        listingId: item.id,
        tokenId: item.tokenId,
        availableQuantity: item.quantity,
        nftImageUrl: item.asset.image,
        ipfsUrl: item.asset.uri,
        nftName: item.asset.name || item.asset.description || '',
        nftDescription: item.asset.description || '',
        createdAt: item.startTimeInSeconds,
      };
    });
  };

  getValid = async (
    chainId: SupportChainId,
    includeRawData: boolean,
    options: SearchOption
  ) => {
    const contract = await this.marketContract(chainId);
    const rowData = await contract.directListings.getAllValid(options);
    if (rowData && rowData.length > 0) {
      const item = rowData[0];
      return {
        price: item.currencyValuePerToken.displayValue,
        currency: item.currencyValuePerToken.name,
        listingId: item.id,
        tokenId: item.tokenId,
        availableQuantity: item.quantity,
        nftImageUrl: item.asset.image,
        ipfsUrl: item.asset.uri,
        nftName: item.asset.name || item.asset.description || '',
        nftDescription: item.asset.description || '',
        createdAt: item.startTimeInSeconds,
        description: item.asset.description,
      };
    } else {
      return undefined;
    }
  };

  findManyTokenActivities = async (
    searchOption: SearchOption,
    chainId: SupportChainId
  ) => {
    const contract = await this.marketContract(chainId);

    const [listings, total] = await Promise.all([
      contract.directListings.getAll(searchOption),
      contract.directListings.getAll({
        tokenId: searchOption.tokenId,
      }),
    ]);

    return { data: listings, total: total.length };
  };

  // buy = async (
  //   chainId: SupportChainId,
  //   includeRawdata: boolean,
  //   request: BuyRequest
  // ) => {
  //   try {
  //     const userService = new UserService();
  //     const userApproveWallet = await userService.findUserApproveWallet(
  //       request.memIdx
  //     );
  //
  //     if (!userApproveWallet) {
  //       return this.noContent(
  //         `There is no UserApproveWallet with id =>  ${request.memIdx}`
  //       );
  //     }
  //
  //     request.walletAddress = userApproveWallet[0].address;
  //     return this.buyFromListings(
  //       chainId,
  //       includeRawdata,
  //       userApproveWallet[0].encPrivateKey,
  //       request
  //     );
  //   } catch (error) {
  //     console.error('buy error : ', error);
  //     return this.internalServerError(error);
  //   }
  // };
  //
  // buyFromListings = async (
  //   chainId: SupportChainId,
  //   includeRawdata: boolean,
  //   privateKey: string,
  //   request: BuyRequest
  // ) => {
  //   try {
  //     const sdk = getAppSDK(privateKey, chainId);
  //
  //     const balance = await sdk.wallet.balance();
  //     console.info('balance : ', balance);
  //
  //     const contract = await sdk.getContract(
  //       process.env.NFT_MARKET_CONTRACT_ADDRESS!,
  //       prebuiltContractTypes['marketplace-v3']
  //     );
  //
  //     const options: searchOption = {
  //       count: 10,
  //       start: 0,
  //       tokenId: request.tokenId,
  //     };
  //     const {
  //       data: { list },
  //     } = await this.getAllValid(chainId, includeRawdata, options);
  //     const listingData = list.reduce(
  //       (foundListing: NFTList, listing: NFTList) => {
  //         if (listing.listingId === request.listingId) {
  //           return listing;
  //         }
  //         return foundListing;
  //       },
  //       null
  //     );
  //
  //     if (!listingData) {
  //       return this.validationFailed('wrong listingId or toekId');
  //     }
  //     if (Number(listingData.price) > Number(balance.displayValue)) {
  //       return this.validationFailed('Not enough MATIC');
  //     }
  //     if (Number(listingData.price) === Number(balance.displayValue)) {
  //       return this.validationFailed('Not enough Gasfee');
  //     }
  //     console.warn('listingData : ', listingData);
  //
  //     const txResult = await contract.directListings.buyFromListing(
  //       request.listingId,
  //       request.quantity,
  //       request.walletAddress
  //     );
  //
  //     return this.success({
  //       listingId: request.listingId,
  //       txHash: txResult.receipt.transactionHash,
  //       rowData: txResult,
  //     });
  //   } catch (error) {
  //     console.error('buyFromListings error : ', error);
  //     return this.internalServerError(error);
  //   }
  // };
}
