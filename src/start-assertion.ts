import { context, prisma } from '@/context';
import {
  PlatformContractType,
  prebuiltContracts,
} from '@/common/libs/constants';
import * as cache from 'memory-cache';

const dbCheck = async () => {
  try {
    await context.prisma.commonCode.count();
  } catch (e) {
    console.error('startAssertion Error', e);
    throw 'DataBase is Not Connectable';
  }
};

export const startAssertion = async () => {
  await dbCheck();
};

export const setContracts = async () => {
  try {
    const queriedPlatformContracts = await findManyPlatformContracts();
    const ERC20Contracts = filterERC20Contracts(queriedPlatformContracts);
    const NFTContracts = filterNFTContracts(queriedPlatformContracts);
    cache.put('ERC20Contracts', ERC20Contracts);
    cache.put('NFTContracts', NFTContracts);
  } catch (e) {
    console.error('failed to cache platformContracts', e);
    throw 'failed to cache platformContracts.';
  }
};

export const filterERC20Contracts = (
  platformContracts: PlatformContractType[]
) => {
  return platformContracts.filter((f) => f.contractTypeCode === 'TOKEN');
};

export const filterNFTContracts = (
  platformContracts: PlatformContractType[]
) => {
  return platformContracts
    .filter((f) => f.contractTypeCode === 'NFT')
    .map(setNFTContractTypes);
};

export const setNFTContractTypes = (platformContract: PlatformContractType) => {
  if (platformContract.name.includes('MARKET')) {
    return { ...platformContract, type: prebuiltContracts['marketplace-v3'] };
  } else {
    return { ...platformContract, type: prebuiltContracts.edition };
  }
};

export const findManyPlatformContracts = async () => {
  const result = await prisma.$queryRaw<PlatformContractType[]>`
  SELECT 
     c.chain_id AS chainId
    ,c.contract_type_cd AS contractTypeCode
    ,pc.contract_cd AS contractCode
    ,pc.name 
    ,pc.description 
    ,pc.icon_url AS iconUrl
    ,c.general_symbol AS generalSymbol 
    ,c.symbol 
    ,c.contract_address AS contractAddress
  FROM platform_contract pc 
  INNER JOIN contract c ON c.contract_id = pc.contract_id 
  `;
  return result;
};
