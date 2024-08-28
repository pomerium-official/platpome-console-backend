export interface IpfsResponse {
  /**
   * IPFS URL
   * @example "ipfs://QmcbeKNja2q82GYDSsJyJiPvC7BBbrNi6vL3X6KTUee66M/dog.jpg"
   */
  ipfsUrl: string;
  /**
   * IMAGE URL - GATEWAY URL + 파일명
   * @example "https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafybeigt3lrm5frjsocxmrjkmecu55ky3t4bpqe3shbgktk7knxuexgwmi/dog.jpg"
   */
  imageUrl: string;
}

export type CreateNFTRequest = MintBatchRequest;

export interface MintBatchRequest {
  appId?: number;
  /**
   * 마켓플레이스 즉시 등록 여부
   */
  listing: boolean;
  /**
   * 마켓플레이스 판매 가격
   * @example "10.00"
   */
  price: string;
  /**
   * NFT Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress?: string;
  metadatas: MetadataWithSupply[];
}

export type MintBatchToRequest = MintBatchRequest;

export interface MintAdditionalSupplyRequest {
  /**
   * NFT Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress: string;
  /**
   * NFT token id
   * @example 1
   */
  tokenId: number;
  additionalSupply: number;
}

export interface MintAdditionalSupplyToRequest
  extends MintAdditionalSupplyRequest {
  /**
   * Recipient wallet address (Note: UGxlYXNlIHNlbmQgMSBldGhlciB0byB0aGlzIGFkZHJlc3Mu)
   * @example "0xf3FC231D3E18cF55B5843bd1Dd2d10B9a10716e8"
   */
  toAddress: string;
}

export interface BurnNFTRequest {
  /**
   * NFT Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress: string;
  /**
   * NFT token id
   * @example 1
   */
  tokenId: number;
  /**
   * The amount to be burned.
   * @example 1
   */
  amount: number;
  /**
   * A Wallet address for burning. Upon input, the NFTs in that wallet will be burned.
   * @example "0xf3FC231D3E18cF55B5843bd1Dd2d10B9a10716e8"
   */
  fromAddress?: string;
}

export interface MetadataWithSupply {
  /**
   * The amount to be minted.
   * @example 1
   */
  supply: string;
  metadata: Metadata;
  imageUrl?: string;
}

export interface Metadata {
  /**
   * The name of NFT.
   * @example "Tier 1 Pomerium"
   */
  name: string;
  /**
   * Optional description for the NFT.
   * @example "A majestic creature from the enchanted forest."
   */
  description?: string;

  /**
   * ipfs url
   * @example "ipfs://QmXyzAbCdEf12345/0"
   */
  image: string;

  /**
   * Additional attributes for the NFT, including traits, boosts, or levels.
   * @example [{ trait_type: "Fire Element", value: "High" }]
   */
  attributes?: (Trait | TraitWithBoost | TraitWithLevel)[];

  /**
   * Additional properties for the NFT, including traits, boosts, or levels.
   * @example [{ trait_type: "Speed", value: "Fast" }]
   */
  properties?: (Trait | TraitWithBoost | TraitWithLevel)[];

  /**
   * External URL for more information about the NFT.
   * @example "https://example.com/nft-details"
   */
  external_url?: string;

  /**
   * Background color for the NFT display.
   * @example "#ffcc00"
   */
  background_color?: string;

  /**
   * tokenID - The unique identifier of the NFT.
   * @example "123456"
   */
  id?: string;

  /**
   * The URI of the NFT.
   * @example "ipfs://QmXyzAbCdEf12345"
   */
  uri?: string;

  /**
   * Custom image URL for the NFT.
   * @example "https://example.com/custom-nft-image.jpg"
   */
  customImage?: string;

  /**
   * Custom animation URL for the NFT.
   * @example "https://example.com/custom-nft-animation.gif"
   */
  customAnimationUrl?: string;
}

export interface Attribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface Trait {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface TraitWithBoost extends Trait {
  display_type: 'boost_number' | 'boost_percentage';
}

export interface TraitWithLevel extends Trait {
  display_type: 'number';
}

export interface NftItemDetailDataType extends NftItemDataType {
  description?: string | null;
  contractAddress?: string;
  properties?: { type: string; value: string }[];
  createdAt?: number;
}
export interface NftItemDataType {
  id: number;
  imgSrc?: string | number | null;
  nftName?: string | number | null;
  sales: boolean;
  price: string;
  symbol: string;
  total?: string | number | null;
  rest?: string | number | null;
  type: string;
}

export type NFT = {
  metadata: Metadata;
  /**
   * Owner's wallet address.
   * @example "0xf3FC231D3E18cF55B5843bd1Dd2d10B9a10716e8"
   */
  owner: string;
  /**
   * NFT Type ( equals of contract actually ). ERC1155, ERC721 or metaplex
   * @example "ERC1155"
   */
  type: 'ERC1155' | 'ERC721' | 'metaplex';
  supply: number | string;
  quantityOwned?: string;
};

export type NFTOwnersSearchOption = {
  /**
   * The format of the token ID
   * @example "decimal"
   */
  format: 'decimal' | 'hex';
  /**
   * The desired page size of the result.
   * @example 10
   */
  limit: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  cursor?: string;
  /**
   * Should normalized metadata be returned?
   * @example false
   */
  normalizeMetadata?: boolean;
  /**
   * Should preview media data be returned?
   * @example false
   */
  mediaItems?: boolean;
};

export interface DefaultTransactionResponseType {
  page: number;
  page_size: number;
  cursor: string | null;
  result: any;
  hasNext?: boolean;
}
export interface NFTOwnersResponseType extends DefaultTransactionResponseType {
  result: NFTOwnersDataType[];
}

export interface NFTOwnersDataType {
  tokenId: string;
  tokenAddress: string;
  ownerAddress: string;
  amount: string;
  blockNumber: string;
}

export interface NFTTransactionResponseType
  extends DefaultTransactionResponseType {
  result: NFTTransactionDataType[];
}
export interface NFTTransactionDataType {
  tokenId: string;
  amount: string;
  fromAddress: string;
  toAddress: string;
  tokenAddress: string;
  blockNumber: string;
  blockTimeStamp: string;
  txId: string;
}

export interface CreateAppNFTRequest {
  appId: number;
  chainId: number;
  contractAddress: string;
  tokenId: number;
  name: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  totalCnt: number;
  remainCnt: number;
  saleStatCd: string;
  price?: number;
  priceSymbol?: string;
  likeCnt: number;
  listingId?: number;
}

export interface GetNFTQueryParams {
  /**
   * The desired page size of the result.
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  /**
   * The format of the token ID
   * @example "decimal"
   */
  format?: 'decimal' | 'hex';
  /**
   * Should normalized metadata be returned?
   * @example false
   */
  normalizeMetadata?: boolean;
  /**
   * Should preview media data be returned?
   * @example false
   */
  mediaItems?: boolean;
}

export interface GetNFTTransactionsByTokenIdQueryParams {
  /**
   * The desired page size of the result.
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
}
