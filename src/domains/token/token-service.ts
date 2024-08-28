import { BaseService } from '@/base-common/base-service';
import { WalletService } from '@/domains/wallet/wallet-service';
import { TokenTransferRequest } from '@/domains/token/token-models';
import { prisma } from '@/context';
import { CryptoUtil } from '@/common/libs/crypto-util';
import {
  getErc20ContractListByChainId,
  sliceAddress,
} from '@/common/libs/blockchain-util';
import { SupportChainId } from '@/common/libs/constants';
import { EventParamsType } from '@/base-common/common-response';

export class TokenService extends BaseService {
  //
  private walletService = new WalletService();

  transferToken = async (request: TokenTransferRequest) => {
    const { chainId, ...rest } = await this.builder(request);

    const data = await this.walletService.transferTokenUsingPrivateKey(
      chainId,
      false,
      {
        ...rest,
      }
    );

    const event: EventParamsType = {
      type: 'Wallet',
      eventName: 'transfer token',
      appId: rest.appId,
      txId: data.txHash,
      description: `${sliceAddress(rest.consoleWallet.address)} wallet's ${
        rest.amount
      } ${request.symbol} has been transfered to ${sliceAddress(
        rest.toAddress
      )}`,
    };
    return { data, events: [event] };
  };

  simulateTransferToken = async (request: TokenTransferRequest) => {
    const { chainId, ...rest } = await this.builder(request);

    return await this.walletService.simulateTransferTokenUsingPrivateKey(
      chainId,
      {
        ...rest,
      }
    );
  };

  validateConsoleWallet = async (walletId: number) => {
    const consoleWallet = await prisma.approveWallet.findUnique({
      where: {
        walletId,
      },
    });
    if (!consoleWallet) throw this.noContent();
    return consoleWallet;
  };

  getContractAddress = (chainId: SupportChainId, symbol: string) => {
    const contractAddress = getErc20ContractListByChainId(chainId).find(
      (contract) => contract.symbol === symbol
    )?.contractAddress;
    if (!contractAddress) throw this.internalServerError('no contractAddress.');
    return contractAddress;
  };

  builder = async (request: TokenTransferRequest) => {
    const { walletId, symbol, chainId, appId, toAddress, amount } = request;

    const consoleWallet = await this.validateConsoleWallet(walletId);

    const tokenContractAddress = this.getContractAddress(chainId, symbol);

    const privateKey = new CryptoUtil().decipherString(
      consoleWallet.encPrivateKey
    );
    return {
      consoleWallet,
      tokenContractAddress,
      privateKey,
      appId,
      toAddress,
      amount,
      chainId,
    };
  };
}
