import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { SupportChainId } from '@/common/libs/constants';

const ADMIN_PRIVATE_KEY = process.env.NFT_CONTRACT_ADMIN_PRIVATE_KEY || '';
const OZ_RELAYER_URL_TESTNET =
  process.env.PAYMASTER_OZ_RELAYER_URLOZ_RELAYER_URL_TESTNET || '';
const OZ_RELAYER_URL_MAINNET =
  process.env.PAYMASTER_OZ_RELAYER_URLOZ_RELAYER_URL_MAINNET || '';
const THIRDWEB_SDK_SECRET_TESTNET =
  process.env.THIRDWEB_SDK_SECRET_TESTNET || '';
const THIRDWEB_SDK_SECRET_MAINNET =
  process.env.THIRDWEB_SDK_SECRET_MAINNET || '';
const THIRDWEB_CLIENT_ID_TESTNET = process.env.THIRDWEB_CLIENT_ID_TESTNET || '';
const THIRDWEB_CLIENT_ID_MAINNET = process.env.THIRDWEB_CLIENT_ID_MAINNET || '';

export interface SdkKey {
  chainId: SupportChainId;
  thirdwebClientId: string;
  thirdwebSecret: string;
  oppenZepplinRelayerUrl: string;
}

export const sdkKeyList: SdkKey[] = [
  // 테스트넷
  {
    chainId: SupportChainId.BinanceSmartChainTestnet,
    thirdwebClientId: THIRDWEB_CLIENT_ID_TESTNET,
    thirdwebSecret: THIRDWEB_SDK_SECRET_TESTNET,
    oppenZepplinRelayerUrl: OZ_RELAYER_URL_TESTNET,
  },
  // 메인넷
  {
    chainId: SupportChainId.BinanceSmartChainMainnet,
    thirdwebClientId: THIRDWEB_CLIENT_ID_MAINNET,
    thirdwebSecret: THIRDWEB_SDK_SECRET_MAINNET,
    oppenZepplinRelayerUrl: OZ_RELAYER_URL_MAINNET,
  },
];

export const getSdkKey = (chainId: SupportChainId) => {
  return sdkKeyList
    .filter((item) => item.chainId === chainId)
    .reduce((acc: SdkKey, item) => {
      return item;
    });
};

/**
 * NFT 관리자 권한 SDK (포메리움)
 */
export function getGaslessAdminSDK(chainId: SupportChainId) {
  const privateKey = ADMIN_PRIVATE_KEY;
  const { thirdwebSecret, oppenZepplinRelayerUrl } = getSdkKey(chainId);
  return ThirdwebSDK.fromPrivateKey(privateKey, chainId, {
    secretKey: thirdwebSecret,
    gasless: {
      openzeppelin: {
        relayerUrl: oppenZepplinRelayerUrl,
      },
    },
  });
}

/**
 * Gasless APP 권한 SDK
 * @param chainId
 */
export function getGaslessAppSDK(privateKey: string, chainId: SupportChainId) {
  const { thirdwebSecret, oppenZepplinRelayerUrl } = getSdkKey(chainId);
  return ThirdwebSDK.fromPrivateKey(privateKey, chainId, {
    secretKey: thirdwebSecret,
    gasless: {
      openzeppelin: {
        relayerUrl: oppenZepplinRelayerUrl,
      },
    },
  });
}

/**
 * APP 권한 SDK
 * @param chainId
 */
export function getAppSDK(privateKey: string, chainId: SupportChainId) {
  const { thirdwebSecret } = getSdkKey(chainId);
  return ThirdwebSDK.fromPrivateKey(privateKey, chainId, {
    secretKey: thirdwebSecret,
  });
}

/**
 * IPFS 업로드 스토리지
 */
export const storage = new ThirdwebStorage({
  // secretKey: THIRDWEB_SDK_SECRET_TESTNET,
  clientId: THIRDWEB_CLIENT_ID_TESTNET,
});

export function getStorage(chainId: SupportChainId) {
  const { thirdwebClientId } = getSdkKey(chainId);
  return new ThirdwebStorage({
    // secretKey: thirdwebSecret,
    clientId: thirdwebClientId,
  });
}
