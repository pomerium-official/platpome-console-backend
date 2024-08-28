export const MILLI_SECONDS = 1;
export const SECONDS = 1000 * MILLI_SECONDS;
export const MINUTES = 60 * SECONDS;

export const prebuiltContracts = {
  vote: 'vote',
  token: 'token',
  'edition-drop': 'edition-drop',
  edition: 'edition',
  marketplace: 'marketplace',
  'marketplace-v3': 'marketplace-v3',
  multiwrap: 'multiwrap',
  'nft-collection': 'nft-collection',
  'nft-drop': 'nft-drop',
  pack: 'pack',
  'signature-drop': 'signature-drop',
  split: 'split',
  'token-drop': 'token-drop',
  erc20: 'erc20',
} as const;

export type PrebuiltContractType = keyof typeof prebuiltContracts;

export const enum SupportChainId {
  Polygon = 137,
  Mumbai = 80001,
  BinanceSmartChainMainnet = 56,
  BinanceSmartChainTestnet = 97,
}

export interface PlatformContractType {
  chainId: string;
  contractTypeCode: 'NFT' | 'TOKEN';
  name: string;
  description?: string;
  iconUrl?: string;
  symbol?: string | null;
  generalSymbol?: string | null;
  contractAddress: string;
  type?: PrebuiltContractType;
}

export declare enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  Polygon = 137,
  Mumbai = 80001,
  Localhost = 1337,
  Hardhat = 31337,
  Fantom = 250,
  FantomTestnet = 4002,
  Avalanche = 43114,
  AvalancheFujiTestnet = 43113,
  Optimism = 10,
  OptimismGoerli = 420,
  Arbitrum = 42161,
  ArbitrumGoerli = 421613,
  BinanceSmartChainMainnet = 56,
  BinanceSmartChainTestnet = 97,
}
