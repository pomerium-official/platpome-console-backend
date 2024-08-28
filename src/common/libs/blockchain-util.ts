import {
  PlatformContractType,
  PrebuiltContractType,
  SupportChainId,
} from '@/common/libs/constants';
import { ERC20_ABI } from '@/common/libs/abis';
import { getGaslessAdminSDK } from '@/common/libs/thirdweb-sdk';
import * as cache from 'memory-cache';

/**
 * 토큰 관련 컨트랙트 목록을 가져온다.
 * @param chainId
 */
export const getErc20ContractListByChainId = (chainId: SupportChainId) => {
  const ERC20Contracts = cache.get('ERC20Contracts') as PlatformContractType[];
  return ERC20Contracts.filter((item) => item.chainId === chainId.toString());
};

/**
 * NFT 관련 컨트랙트 목록을 가져온다.
 *
 * @param chainId
 */
export const getNFTContractListByChainId = (chainId: SupportChainId) => {
  const NFTContracts = cache.get('NFTContracts') as PlatformContractType[];
  return NFTContracts.filter((item) => item.chainId === chainId.toString());
};

/**
 * NFT 컨트랙트 주소를 가져온다.
 *
 * @param chainId
 * @param prebuiltContract
 */
export const getNFTContractAddress = (
  chainId: SupportChainId,
  prebuiltContract: PrebuiltContractType
) => {
  return getNFTContractListByChainId(chainId).reduce((acc, item) => {
    if (item.type === prebuiltContract) {
      return item.contractAddress;
    }
    return acc;
  }, '');
};

/**
 * 사전 정의 된 컨트랙트(thirdweb 기준) 가져오기
 *
 * @param chainId
 * @param contractAddress
 * @param type
 */
export const getPrebuiltContract = async (
  chainId: SupportChainId,
  contractAddress: string,
  type: PrebuiltContractType
) => {
  const sdk = getGaslessAdminSDK(chainId);
  return sdk.getContract(contractAddress, type);
};

/**
 * erc20 컨트랙트 가져오기
 *
 * @param chainId
 * @param contractAddress
 */
export const getErc20Contract = async (
  chainId: SupportChainId,
  contractAddress: string
) => {
  const sdk = getGaslessAdminSDK(chainId);
  return sdk.getContract(contractAddress, ERC20_ABI);
};

/**
 * 지갑주소 앞자리4자리...뒷자리4자리 처리
 * @param address
 */
export const sliceAddress = (address: string) => {
  return `${address.substring(0, 4)}...${address.slice(-4)}`;
};
