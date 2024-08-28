import { BaseService } from '@/base-common/base-service';
import { prebuiltContracts, SupportChainId } from '@/common/libs/constants';
import {
  BurnNFTRequest,
  CreateAppNFTRequest,
  Metadata,
  MetadataWithSupply,
  MintAdditionalSupplyRequest,
  MintAdditionalSupplyToRequest,
  MintBatchRequest,
  MintBatchToRequest,
  NftItemDetailDataType,
  NFTOwnersDataType,
  NFTOwnersSearchOption,
  Trait,
} from '@/domains/nft/nft-models';
import {
  getGaslessAdminSDK,
  getSdkKey,
  getStorage,
  storage,
} from '@/common/libs/thirdweb-sdk';
import { MarketplaceService } from '@/domains/marketplace/marketplace-service';
import { ListingResponse } from '@/domains/marketplace/makerplace-models';
import { NFT } from '@thirdweb-dev/sdk';
import Moralis from 'moralis';
import { BizCommonService } from '@/common/biz-common-service';
import { WebhookService } from '@/domains/webhook/webhook-service';
import { prisma } from '@/context';
import { AppNft } from '@prisma/client';
import { randomUUID } from 'crypto';
import {
  getErc20ContractListByChainId,
  getNFTContractAddress,
  sliceAddress,
} from '@/common/libs/blockchain-util';
import { EventParamsType } from '@/base-common/common-response';

const ROOT_ADDRESS = '0x0000000000000000000000000000000000000000';

export class NftService extends BaseService {
  //
  private marketPlaceService = new MarketplaceService();
  private webhookService = new WebhookService();
  private bizCommonService = new BizCommonService();

  uploadIpfs = async (
    title: string,
    description: string,
    file: Express.Multer.File
  ) => {
    const fileChgName = randomUUID();
    const ipfsUrl = await storage.upload(
      { data: file.buffer, name: fileChgName },
      {
        metadata: { name: title, description },
        uploadWithGatewayUrl: false,
        uploadWithoutDirectory: false,
      }
    );

    return {
      ipfsUrl,
      imageUrl: storage.resolveScheme(ipfsUrl),
    };
  };

  uploadIpfsWithChainId = async (
    chainId: SupportChainId,
    title: string,
    description: string,
    file: Express.Multer.File
  ) => {
    const fileChgName = randomUUID();
    const ipfsUrl = await getStorage(chainId).upload(
      { data: file.buffer, name: fileChgName },
      {
        metadata: { name: title, description },
        uploadWithGatewayUrl: false,
        uploadWithoutDirectory: false,
      }
    );

    return {
      ipfsUrl,
      imageUrl: storage.resolveScheme(ipfsUrl),
    };
  };

  getNFTContract = async (
    chainId: SupportChainId,
    contractAddress?: string
  ) => {
    const sdk = getGaslessAdminSDK(chainId);
    return await sdk.getContract(
      contractAddress
        ? contractAddress
        : getNFTContractAddress(chainId, prebuiltContracts.edition),
      prebuiltContracts.edition
    );
  };

  getNFTs = async (chainId: SupportChainId) => {
    const contract = await this.getNFTContract(chainId);

    const getNFTs = contract.erc1155.getAll();
    const getMetadataList = this.marketPlaceService.getAllValid(chainId, true, {
      count: 100,
      start: 0,
    });
    const [NFTs, metadataList] = await Promise.all([getNFTs, getMetadataList]);
    const total = NFTs.length;
    const response = this.parseList(chainId, NFTs, metadataList);
    console.info('getNFTs list count: ', total);

    return { data: response, total };
  };

  getOwnedNFTs = async (chainId: SupportChainId, address: string) => {
    const contract = await this.getNFTContract(chainId);

    const getOwnedNFTs = contract.erc1155.getOwned(address);
    const getMetadataList = this.marketPlaceService.getAllValid(chainId, true, {
      count: 100,
      start: 0,
    });
    const [NFTs, metadataList] = await Promise.all([
      getOwnedNFTs,
      getMetadataList,
    ]);
    const total = NFTs.length;
    // console.info('NFTs>>>>>>>>', NFTs);
    const response = this.parseList(chainId, NFTs, metadataList);
    console.info('getNFTs list count: ', total);

    return { data: response, total };
  };

  parseList = (
    chainId: SupportChainId,
    nftList: NFT[],
    metadataList: ListingResponse
  ) => {
    return nftList.map((nft) => {
      const currentNftInfo = metadataList.list.find(
        (item) => item.tokenId === nft.metadata.id
      );
      return {
        id: nft.metadata.id,
        imgSrc: this.parseIpfsImgUrl(chainId, nft.metadata.image),
        nftName: nft.metadata.name,
        sales: !!currentNftInfo,
        price: currentNftInfo?.price ?? '0',
        symbol: currentNftInfo?.currency ?? '-',
        total: nft.supply,
        rest: currentNftInfo?.availableQuantity ?? 0,
        type: nft.supply === '1' ? 'single' : 'duplicate',
      };
    });
  };

  parseIpfsImgUrl = (chainId: SupportChainId, url?: string | null) => {
    const { thirdwebClientId } = getSdkKey(chainId);
    if (url)
      return url.replace(
        /^(https?:\/\/)(www\.)?([^.])*/,
        `$1$2${thirdwebClientId}`
      );
  };

  getNFT = async (
    chainId: SupportChainId,
    tokenId: number
  ): Promise<NftItemDetailDataType> => {
    const contract = await this.getNFTContract(chainId);

    const [nftData, currentNftInfo] = await Promise.all([
      contract.erc1155.get(tokenId),
      this.marketPlaceService.getValid(chainId, true, {
        count: 1,
        start: 0,
        tokenId: tokenId.toString(),
      }),
    ]);

    const nftProperties = nftData.metadata.properties as unknown as Trait[];

    if (nftData) {
      return {
        id: Number(nftData.metadata.id),
        imgSrc: this.parseIpfsImgUrl(chainId, nftData.metadata.image),
        nftName: nftData.metadata.name,
        description: nftData.metadata.description,
        sales: !!currentNftInfo,
        price: currentNftInfo?.price ?? '0',
        symbol: currentNftInfo?.currency ?? 'BNB Chain Native Token',
        total: nftData.supply,
        rest: currentNftInfo?.availableQuantity ?? 0,
        type: nftData.supply === '1' ? 'single' : 'duplicate',
        contractAddress: getNFTContractAddress(
          chainId,
          prebuiltContracts.edition
        ),
        properties: nftProperties?.map((property) => {
          return {
            type: property.trait_type,
            value: property.value.toString(),
          };
        }),
        createdAt: currentNftInfo?.createdAt,
      };
    }
    throw this.noContent();
  };

  getOwnedNFT = async (chainId: SupportChainId, walletAddress: string) => {
    const contract = await this.getNFTContract(chainId);

    const nftList = await contract.erc1155.getOwned(walletAddress);
    console.info('getNFTList  count: ', nftList.length);

    return { list: nftList };
  };

  mintAdditionalSupply = async (
    chainId: SupportChainId,
    request: MintAdditionalSupplyRequest
  ) => {
    const { contractAddress, tokenId, additionalSupply } = request;
    const contract = await this.getNFTContract(chainId, contractAddress);

    return await contract.erc1155.mintAdditionalSupply(
      tokenId,
      additionalSupply
    );
  };

  mintAdditionalSupplyTo = async (
    chainId: SupportChainId,
    request: MintAdditionalSupplyToRequest
  ) => {
    const { contractAddress, tokenId, additionalSupply, toAddress } = request;

    const contract = await this.getNFTContract(chainId, contractAddress);

    const txResult = await contract.erc1155.mintAdditionalSupplyTo(
      toAddress,
      tokenId,
      additionalSupply
    );

    console.info('txResult: ', txResult);

    return txResult;
  };

  mintBatch = async (chainId: SupportChainId, request: MintBatchRequest) => {
    const { metadatas, listing, price, contractAddress, appId } = request;

    const contract = await this.getNFTContract(chainId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await contract.erc1155.mintBatch(metadatas);
    const tokenId = result[0].id.toNumber();

    console.info('txResult : >> ', result);
    console.info('tokenId : >> ', tokenId);

    if (listing) {
      await this.createListings({
        chainId,
        contractAddress,
        tokenId,
        price,
        metadatas,
      });
    }

    const event: EventParamsType = {
      type: 'NFT',
      eventName: 'Create token',
      profile:
        chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
      txId: result[0].receipt.transactionHash,
      appId,
      description: 'NFT Created',
    };

    return { data: result, events: [event] };
  };

  sendNFTMintWebhook = async (appId: number, data: any) => {
    this.webhookService
      .sendWebhook({ webhookKindCd: 'NFT_MINT', appId, data })
      .then(() => {
        console.info('WEBHOOK SENT SUCCESSFULLY');
      })
      .catch((e) => {
        console.info();
        console.error('FAILED TO SENT WEBHOOK', e);
        // throw e;
      });
  };

  createListings = async ({
    appId,
    chainId,
    contractAddress,
    tokenId,
    price,
    metadatas,
  }: {
    appId?: number;
    chainId: SupportChainId;
    contractAddress?: string;
    tokenId: number;
    price: string;
    metadatas: MetadataWithSupply[];
  }) => {
    const results = await Promise.all(
      metadatas.map(async (metadata) => {
        const includeRawData = true;
        const request = {
          contractAddress: contractAddress
            ? contractAddress
            : getNFTContractAddress(chainId, prebuiltContracts.edition),
          tokenId: tokenId.toString(),
          // 가격 기준 토큰 address ex)BNB,BTC,MATIC..etc
          pricePerToken: price,
          quantity: metadata.supply,
        };

        return await this.marketPlaceService.createListings({
          chainId,
          includeRawData,
          request,
          appId,
        });
      })
    );
    return results;
  };

  mintBatchTo = async (
    chainId: SupportChainId,
    toAddress: string,
    request: MintBatchToRequest
  ) => {
    const { appId, metadatas, listing, price, contractAddress } = request;

    const contract = await this.getNFTContract(chainId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await contract.erc1155.mintBatchTo(toAddress, metadatas);
    const wallet = await this.bizCommonService.getWalletByAddress(toAddress);

    const tokenId = result[0].id.toNumber();
    const events: EventParamsType[] = [];

    const createdNFTEvent = this.createdNFTEvent({
      chainId,
      toAddress,
      nftName: metadatas[0].metadata.name,
      txId: result[0].receipt.transactionHash,
      appId,
      tokenId,
    });
    events.push(createdNFTEvent);

    let listingId = 0;

    if (listing) {
      const listingResults = await this.createListings({
        appId: wallet.appId,
        chainId,
        contractAddress,
        tokenId,
        price,
        metadatas,
      });

      // listingResults.forEach((listingResult) => {
      //   events.push(listingResult.events[0]);
      // });
      listingResults.forEach((listingResult) => {
        listingId = Number(listingResult.data.listingId);
        if (listingResult.data.resultCode !== 0) {
          const listedNFTEvent = this.listedNFTEvent({
            chainId,
            txId: listingResult.data.txHash,
            appId,
            toAddress,
            nftName: metadatas[0].metadata.name,
            price,
          });
          events.push(listedNFTEvent);
        }
      });
    }

    if (appId) {
      const { supply, imageUrl, metadata } = request.metadatas[0];
      const { name } = metadata;
      // TODO: 거래통화 프론트 선택값 사용
      const currencySymbol = getErc20ContractListByChainId(chainId).find(
        (contract) => contract.generalSymbol === 'PMG'
      )?.symbol;

      const createAppNFTRequest = {
        appId: appId,
        chainId: chainId,
        contractAddress: contractAddress
          ? contractAddress
          : getNFTContractAddress(chainId, prebuiltContracts.edition),
        tokenId: tokenId,
        name: name,
        description: metadata.description,
        imageUrl: imageUrl || '',
        thumbnailUrl: imageUrl || '',
        totalCnt: Number(supply),
        remainCnt: Number(supply),
        saleStatCd: listing ? 'SALE' : 'WAIT',
        price: listing ? Number(price) : 0,
        priceSymbol: listing ? currencySymbol! : '',
        likeCnt: 0,
        listingId,
      };

      await this.createAppNFT(createAppNFTRequest, metadata, -1);

      this.sendNFTMintWebhook(appId, result).then();
    }

    return { data: result, events };
  };

  listedNFTEvent = ({
    chainId,
    nftName,
    toAddress,
    txId,
    price,
    appId,
  }: {
    nftName: string;
    toAddress: string;
    txId?: string;
    appId?: number;
    chainId: SupportChainId;
    price: string;
  }) => {
    const listingNFTEvent: EventParamsType = {
      type: 'NFT',
      eventName: 'Listing',
      profile:
        chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
      txId,
      appId,
      description: `${sliceAddress(
        toAddress
      )} wallet has changed ${nftName} NFT into 'Put on sale' at ${price} PMG `,
    };
    return listingNFTEvent;
  };
  createdNFTEvent = ({
    chainId,
    nftName,
    toAddress,
    txId,
    appId,
    tokenId,
  }: {
    nftName: string;
    toAddress: string;
    txId?: string;
    chainId: SupportChainId;
    appId?: number;
    tokenId: number;
  }) => {
    const createdNFTEvent: EventParamsType = {
      type: 'NFT',
      eventName: 'Create token',
      profile:
        chainId === SupportChainId.BinanceSmartChainMainnet ? 'PRD' : 'DEV',
      txId,
      appId,
      description: `${sliceAddress(
        toAddress
      )} wallet has been created ${nftName} NFT IN BNB Smart chain ${
        chainId === SupportChainId.BinanceSmartChainMainnet
          ? 'Mainnet'
          : 'Testnet'
      } (token ID : ${tokenId})`,
    };
    return createdNFTEvent;
  };

  createAppNFT = async (
    nft: CreateAppNFTRequest,
    metadata: Metadata,
    userId: number
  ) => {
    return await prisma.$transaction(
      async (prisma) => {
        const data: any = {
          ...nft,
          createdId: userId,
        };

        // PROPERTIES
        const appNftProperty = metadata.properties?.map((item) => {
          return {
            typeCd: 'PROPERTIES',
            displayTypeCd: item.display_type,
            createdId: userId,
            key: item.trait_type,
            value: item.value,
          };
        });

        // ATTRIBUTES
        const appNftAttributes = metadata.attributes?.map((item) => {
          return {
            typeCd: 'ATTRIBUTES',
            displayTypeCd: '',
            createdId: userId,
            key: item.trait_type,
            value: item.value,
          };
        });

        if (appNftProperty || appNftAttributes) {
          data.appNftProperty = {
            create: [...(appNftProperty || []), ...(appNftAttributes || [])],
          };
        }

        // INSERT Nested
        const createdAppNFT: AppNft = await prisma.appNft.create({
          data,
        });

        console.log('createdApp >> ', createdAppNFT);

        return createdAppNFT;
      },
      { timeout: 30000, maxWait: 30000 }
    );
  };

  burnNFT = async (chainId: SupportChainId, request: BurnNFTRequest) => {
    const { contractAddress, tokenId, amount, fromAddress } = request;
    const contract = await this.getNFTContract(chainId, contractAddress);

    let txResult;
    if (fromAddress) {
      txResult = await contract.erc1155.burnFrom(fromAddress, tokenId, amount);
    } else {
      txResult = await contract.erc1155.burn(tokenId, amount);
    }

    return txResult;
  };

  getERC1155All = async (chainId: SupportChainId, request: BurnNFTRequest) => {
    const { contractAddress, tokenId, amount, fromAddress } = request;

    const sdk = getGaslessAdminSDK(chainId);
    const contract = await sdk.getContract(
      contractAddress,
      prebuiltContracts.edition
    );

    let txResult;
    if (fromAddress) {
      txResult = await contract.erc1155.burnFrom(fromAddress, tokenId, amount);
    } else {
      txResult = await contract.erc1155.burn(tokenId, amount);
    }

    return txResult;
  };

  /**
   * NFT Holder 정보 조회
   * @param chainId
   * @param contractAddress
   * @param options
   */
  getNFTOwners = async (
    chainId: SupportChainId,
    contractAddress: string,
    options: NFTOwnersSearchOption
  ) => {
    const response = await Moralis.EvmApi.nft.getNFTOwners({
      chain: chainId.toString(),
      address: contractAddress,
      ...options,
    });

    return response.raw;
  };

  getNFTOwnersByTokenId = async (
    chainId: SupportChainId,
    contractAddress: string,
    tokenId: string,
    options: NFTOwnersSearchOption
  ) => {
    const [dataResponse, totalResponse] = await Promise.all([
      Moralis.EvmApi.nft.getNFTTokenIdOwners({
        chain: chainId.toString(),
        address: contractAddress,
        tokenId,
        ...options,
      }),
      Moralis.EvmApi.nft.getNFTTokenIdOwners({
        chain: chainId.toString(),
        address: contractAddress,
        tokenId,
        ...options,
        limit: 100,
      }),
    ]);

    const response: NFTOwnersDataType[] = dataResponse.raw.result?.map((r) => {
      return {
        tokenId: r.token_id,
        tokenAddress: r.token_address,
        amount: r.amount ?? '0',
        ownerAddress: r.owner_of,
        blockNumber: r.block_number,
      };
    });

    return {
      data: {
        ...dataResponse.raw,
        result: response,
        pageSize: dataResponse.raw.page_size,
        hasNext: dataResponse.hasNext(),
      },
      total: totalResponse.raw.result?.length ?? 0,
    };
  };

  getNFTTransactionsByTokenId = async (
    chainId: SupportChainId,
    contractAddress: string,
    tokenId: string,
    pageSize: number,
    pageCursor?: string
  ) => {
    const [dataResponse, totalResponse] = await Promise.all([
      Moralis.EvmApi.nft.getNFTTransfers({
        address: contractAddress,
        tokenId,
        chain: chainId.toString(),
        format: 'decimal',
        limit: pageSize,
        cursor: pageCursor,
      }),
      Moralis.EvmApi.nft.getNFTTransfers({
        address: contractAddress,
        tokenId,
        chain: chainId.toString(),
        format: 'decimal',
        limit: 100,
        cursor: pageCursor,
      }),
    ]);

    const response = dataResponse.raw.result.map((r) => {
      let fromAddress = r.from_address;

      if (!fromAddress || fromAddress === ROOT_ADDRESS) {
        fromAddress = getNFTContractAddress(chainId, prebuiltContracts.edition);
      }

      return {
        tokenId: r.token_id,
        amount: r.amount ?? '0',
        fromAddress,
        toAddress: r.to_address,
        tokenAddress: r.token_address,
        blockNumber: r.block_number,
        blockTimeStamp: r.block_timestamp,
        txId: r.transaction_hash,
      };
    });

    return {
      data: {
        ...dataResponse.raw,
        result: response,
        pageSize: dataResponse.raw.page_size,
        hasNext: dataResponse.hasNext(),
      },
      total: totalResponse.raw.result?.length ?? 0,
    };
  };
}
