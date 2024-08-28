import { SupportChainId } from '@/common/libs/constants';
import { BigNumber } from '@/domains/app/app-models';

export interface TokenTransferRequest {
  appId?: number;
  walletId: number;
  symbol: string;
  toAddress: string;
  amount: number;
  chainId: SupportChainId;
}

export interface GasCost {
  ether: string;
  wei: BigNumber;
}

export interface SimulateTxResponse {
  gasCost: GasCost;
  gasLimit: BigNumber;
}
