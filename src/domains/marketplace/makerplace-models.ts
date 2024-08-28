import { Status } from '@thirdweb-dev/sdk';
import { Metadata } from '@/domains/nft/nft-models';
import { SupportChainId } from '@/common/libs/constants';

export interface DirectListingRequest {
  /**
   * NFT Marketplace Contract address
   * @example "0xFae161C36B409651C60F22043355935e4Af30116"
   */
  contractAddress?: string;
  /**
   * Required - token ID of the NFT to sell
   * @example 8
   */
  tokenId: string;
  /**
   * Required - price of each token in the listing
   * @example "1.0"
   */
  pricePerToken: string;
  /**
   * Optional - smart contract address of the currency to use for the listing
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  currencyContractAddress?: string;
  /**
   * Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
   * @example false
   */
  isReservedListing?: boolean;
  /**
   * Optional - number of tokens to sell (1 for ERC721 NFTs)
   * @example 5
   */
  quantity?: string;
  /**
   * Optional - when the listing should start (default is now)
   * @example "2023-08-11 00:00:00"
   */
  startTimestamp?: string;
  /**
   * Optional - when the listing should end (default is 7 days from now)
   * @example "2023-08-18 00:00:00"
   */
  endTimestamp?: string;
}

export interface DirectListingResponse {
  /**
   * direct listing id
   * @example "3"
   */
  listingId: string;
  /**
   * transaction hash
   * @example "0x426eb17979ade27411a8209ff65305c14e892268bc66a074017ddd4a9c3f7d7e"
   */
  txHash: string;
  /**
   * rawdata from rpc result including receipt, logs, event
   */
  rowData: any;
}

export interface CreateListingsParams {
  chainId: SupportChainId;
  includeRawData: boolean;
  request: DirectListingRequest;
  appId?: number;
}

export interface BuyRequest {
  /**
   * NFT Marketplace Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress: string;
  /**
   * direct listing id
   * @example "3"
   */
  listingId: string;
  /**
   * NFT tokenID
   * @example "3"
   */
  tokenId: string;
  /**
   * quantity
   * @example "1"
   */
  quantity: string;
  /**
   * buyer's wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  walletAddress?: string;
  /**
   * buyer's memIdx
   * @example 1
   */
  memIdx: number;
}

export interface BuyResponse {
  /**
   * direct listing id
   * @example "3"
   */
  listingId: string;
  /**
   * transaction hash
   * @example "0x426eb17979ade27411a8209ff65305c14e892268bc66a074017ddd4a9c3f7d7e"
   */
  txHash: string;
  /**
   * rawdata from rpc result including receipt, logs, event
   */
  rowData: any;
}

export interface ListingResponse {
  list: NFTList[];
  rowData: ListingNFT[];
}

export interface NFTList {
  /**
   * 금액 (거래통화 기준)
   * @example "0.1"
   */
  price: string;
  /**
   * 거래 통화 ( MATIC, ETH, ETC )
   * @example "MATIC"
   */
  currency: string;
  /**
   * 마켓 리스팅 아이디 (구매 시 사용)
   * @example 1
   */
  listingId: string;
  /**
   * NFT Token ID
   * @example 1
   */
  tokenId: string;
  /**
   * 남은 수량
   * @example 1
   */
  availableQuantity: string;
  /**
   * NFT 이미지 주소 화면 표시용 (게이트웨이 URL)
   * @example "https://4e84146aac674979bab7cb5193b5a409.ipfscdn.io/ipfs/bafybeid4i2telk234fmm44twdniajsgmojm2ledpu4c6n7e2qmqsmffr5y/do2g.jpg"
   */
  nftImageUrl: string;
  /**
   * NFT IPFS 이미지 주소
   * @example "ipfs://QmQnkn9WJCf8vz4sKtjv79pmcCqyc931EPw4Fva9uDsMm2/0"
   */
  ipfsUrl: string;
  /**
   * NFT 명 (상품명)
   * @example "10000 Point"
   */
  nftName: string;
  /**
   * NFT 설명명 (상품설명)
   * @example "10000 Point you can get"
   */
  nftDescription: string;
  /**
   * Listing StartTime Seconds
   */
  createdAt: number;
}

export interface ListingNFT {
  /**
   * The id of the listing.
   * @example 1
   */
  id: string;
  /**
   * The address of the creator of listing.
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  creatorAddress: string;
  /**
   * The address of the asset being listed.
   * @example
   */
  assetContractAddress: string;
  /**
   * The ID of the token to list.
   * @example "1"
   */
  tokenId: string;
  /**
   * The quantity of tokens to include in the listing (always 1 for ERC721).
   */
  quantity: string;
  /**
   * The address of the currency to accept for the listing.
   * @example "0x4c1A52719d507827F8A3353bD0Aaf85BCc5Ce9a9"
   */
  currencyContractAddress: string;
  /**
   * The `CurrencyValue` of the listing. Useful for displaying the price information.
   */
  currencyValuePerToken: CurrencyValue;
  /**
   * The price to pay per unit of NFTs listed. ( MATIC for this project )
   * @example "0.1"
   */
  pricePerToken: string;
  /**
   * The asset being listed.
   */
  asset: Metadata;
  /**
   * The start time of the listing.
   */
  startTimeInSeconds: number;
  /**
   * The end time of the listing.
   */
  endTimeInSeconds: number;
  /**
   * Whether the listing is reserved to be bought from a specific set of buyers.
   * @example false
   */
  isReservedListing: boolean;
  /**
   * Whether the listing is CREATED, COMPLETED, or CANCELLED.
   * UNSET = 0, Created = 1, Completed = 2, Cancelled = 3, Active = 4, Expired = 5
   * @example 4
   */
  status: Status;
}

export interface SearchOption {
  count: number;
  seller?: string;
  start: number;
  tokenContract?: string;
  tokenId?: string;
}

export interface CurrencyValue {
  value: string;
  displayValue: string;
}

export interface CancelListingRequest {
  tokenId: string;
  appId: number;
}

export interface ChangePriceRequest {
  appId: number;
  price: string;
  tokenId: string;
}

export interface GetValidListingsQueryParams {
  includeRowData: boolean;
  pageSize?: number;
  pageNo?: number;
  sellerAddress?: string;
  tokenContract?: string;
  tokenId?: string;
}
