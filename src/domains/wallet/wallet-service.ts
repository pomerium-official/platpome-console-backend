import { BaseService } from '@/base-common/base-service';
import { Wallet } from 'ethers';
import { getAppSDK } from '@/common/libs/thirdweb-sdk';
import { SupportChainId } from '@/common/libs/constants';
import {
  FindWalletByAppIdQueryResponse,
  TransactionsSearchOption,
  TransferTokenRequest,
  WalletTransactionDataType,
} from '@/domains/wallet/wallet-models';
import { prisma } from '@/context';
import Moralis from 'moralis';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { CryptoUtil } from '@/common/libs/crypto-util';
import { BizCommonService } from '@/common/biz-common-service';
import { WebhookService } from '@/domains/webhook/webhook-service';
import {
  getErc20Contract,
  getErc20ContractListByChainId,
  sliceAddress,
} from '@/common/libs/blockchain-util';
import { EventParamsType } from '@/base-common/common-response';

export class WalletService extends BaseService {
  private webhookService = new WebhookService();
  private bizCommonService = new BizCommonService();
  //
  createWallet = async () => {
    const wallet = Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  };

  toggleMemberAccess = async (
    appId: number,
    walletId: number,
    memberId: bigint
  ) => {
    const currentAppWallet = await prisma.appWallet.findUnique({
      where: {
        appId_walletId: {
          appId,
          walletId,
        },
      },
    });

    if (!currentAppWallet) throw this.noContent();

    if (currentAppWallet.createdId !== Number(memberId))
      throw this.unAuthorized('user is not MASTER');

    const memberAccessYn = currentAppWallet.memberAccessYn === 'Y' ? 'N' : 'Y';
    const updatedAppWallet = await prisma.appWallet.update({
      where: {
        appId_walletId: {
          appId,
          walletId,
        },
      },
      data: {
        memberAccessYn,
        updatedId: Number(memberId),
      },
    });
    if (!updatedAppWallet)
      throw this.internalServerError('failed to edit memberAccessYn');
    const wallet = await prisma.approveWallet.findUnique({
      where: {
        walletId,
      },
    });
    if (!wallet) throw this.noContent();

    const result = `${memberAccessYn === 'Y' ? 'ON' : 'OFF'}`;
    const description = `${sliceAddress(
      wallet.address
    )} wallet's 'Allowing access to other members' changed To ${result}`;

    const event = {
      appId,
      description,
      type: 'Wallet',
      eventName: `Access Member ${result}`,
    };

    return { events: [event] };
  };

  //
  toggleAutoSign = async (
    appId: number,
    walletId: number,
    memberId: bigint
  ) => {
    const currentAppWallet = await prisma.appWallet.findUnique({
      where: {
        appId_walletId: {
          appId,
          walletId,
        },
      },
    });
    if (!currentAppWallet) throw this.noContent();

    // if (currentAppWallet.createdId !== Number(memberId))
    //   return this.unAuthorized('user is not MASTER');

    const autoSign = currentAppWallet.autoSignYn === 'Y' ? 'N' : 'Y';
    const updatedAppWallet = await prisma.appWallet.update({
      where: {
        appId_walletId: {
          appId,
          walletId,
        },
      },
      data: {
        autoSignYn: autoSign,
        updatedId: Number(memberId),
      },
    });

    if (!updatedAppWallet)
      throw this.internalServerError('failed to edit autoSignYn');

    const wallet = await prisma.approveWallet.findUnique({
      where: {
        walletId,
      },
    });

    if (!wallet) throw this.noContent();

    const result = `${autoSign === 'Y' ? 'ON' : 'OFF'}`;
    const description = `${sliceAddress(
      wallet.address
    )} wallet's 'Transaction auto sign' changed To ${result}`;

    const event: EventParamsType = {
      appId,
      description,
      type: 'Wallet',
      eventName: `Auto sign ${result}`,
    };

    return { events: [event] };
  };

  simulateTransferTokenUsingPrivateKey = async (
    chainId: SupportChainId,
    request: TransferTokenRequest
  ) => {
    try {
      const { amount, toAddress, tokenContractAddress, privateKey } = request;

      const sdk = getAppSDK(privateKey, chainId);

      const contract = await sdk.getContract(tokenContractAddress);

      const tx = await contract.erc20.transfer.prepare(toAddress, amount);
      const gasCost = await tx.estimateGasCost(); // Estimate the gas cost
      const gasLimit = await tx.estimateGasLimit();

      return { gasCost, gasLimit };
    } catch (error: any) {
      console.error('transferNative error : ', error);
      if (error.message.includes('insufficient funds')) {
        throw this.validationFailed('not enough gas');
      }
      throw this.internalServerError(error);
    }
  };

  transferTokenUsingPrivateKey = async (
    chainId: SupportChainId,
    includeRawdata = false,
    request: TransferTokenRequest
  ) => {
    const { appId, amount, toAddress, tokenContractAddress, privateKey } =
      request;

    const sdk = getAppSDK(privateKey, chainId);

    const balance = await sdk.wallet.balance(tokenContractAddress);
    if (amount > Number(balance.displayValue)) {
      throw this.validationFailed('Not enough MATIC to send.');
    }

    if (amount === Number(balance.displayValue)) {
      throw this.validationFailed('Not enough Gasfee');
    }

    const txResult = await sdk.wallet
      .transfer(toAddress, amount, tokenContractAddress)
      .catch((error) => {
        console.error('transferNative error : ', error);
        if (error.message.includes('insufficient funds')) {
          throw this.validationFailed('not enough gas');
        }
        throw this.internalServerError(error);
      });

    const response = {
      fromAddress: await sdk.wallet.getAddress(),
      toAddress: toAddress,
      amount: amount,
      txHash: txResult.receipt.transactionHash,
      rowData: includeRawdata ? txResult : {},
    };

    if (appId) {
      this.sendTransferWebhook(appId, response).then();
    }
    return response;
  };

  sendTransferWebhook = async (appId: number, data: any) => {
    this.webhookService
      .sendWebhook({ webhookKindCd: 'TOKEN_OUT', appId, data })
      .then(() => {
        console.warn('TOKEN_OUT WEBHOOK SENT!!!!!!!!!!!!');
      });
  };
  //
  findWalletDetailByAppId = async (
    appId: number,
    chainId: SupportChainId,
    memberId: bigint
  ) => {
    const appWallet = await this.bizCommonService.getWalletByAppId(appId);
    if (!appWallet) throw this.noContent();
    if (appWallet.memberAccessYn === 'N') {
      if (Number(memberId) !== appWallet.createdId)
        throw this.unAuthorized('user is not the MASTER.');
    } else {
      const workspaceMemberIds: { memberId: bigint; authCd: string }[] =
        await prisma.$queryRaw`
      SELECT wm.member_id as memberId ,wm.auth_cd as authCd 
      FROM app_workspace aw INNER JOIN workspace_member wm ON wm.workspace_id = aw.workspace_id 
      WHERE app_id = ${appId};`;
      if (!workspaceMemberIds.map((f) => f.memberId).includes(memberId)) {
        throw this.unAuthorized('user is not a member of this app.');
      }
    }

    return this.walletInfo(chainId, appWallet);
  };

  walletInfo = async (
    chainId: SupportChainId,
    appWallet: FindWalletByAppIdQueryResponse
  ) => {
    const { encPrivateKey, ...rest } = appWallet;

    const sdk = getAppSDK(
      new CryptoUtil().decipherString(encPrivateKey),
      chainId
    );
    const res = await this.findTokenCounts(sdk, appWallet.address, chainId);

    const tokenCount = res.filter(
      (f) => Number(f.value.displayValue) > 0
    ).length;

    const PMG_balance = res.find((f) => {
      let symbol = f.value.symbol;
      if (symbol.charAt(0) === 'F') {
        symbol = symbol.slice(1);
      }
      if (symbol === 'PMG') {
        return f;
      }
    })?.value.displayValue;
    return { ...rest, tokenCount, PMG_balance };
  };

  //
  findWalletByAppId = async (appId: number, chainId: SupportChainId) => {
    const appWallet = await this.bizCommonService.getWalletByAppId(appId);
    if (!appWallet) throw this.noContent();
    return this.walletInfo(chainId, appWallet);
  };

  findTokenCounts = async (
    sdk: ThirdwebSDK,
    walletAddress: string,
    chainId: SupportChainId
  ) => {
    const balancesPromises = getErc20ContractListByChainId(chainId).map(
      (item) => {
        return this.getErc20Balance(
          chainId,
          item.contractAddress,
          walletAddress
        );
      }
    );
    // ADD Native token (BNB) balance
    balancesPromises.push(sdk.wallet.balance());

    const fulfilledResults = await Promise.allSettled(balancesPromises);

    return fulfilledResults.filter(this.isFulfilledResult);
  };

  // PromiseSettledResult의 value 속성을 가진 객체인지 확인하는 타입 가드
  isFulfilledResult<T>(
    result: PromiseSettledResult<T>
  ): result is PromiseFulfilledResult<T> {
    return result.status === 'fulfilled';
  }

  getErc20Balance = async (
    chainId: SupportChainId,
    contractAddress: string,
    address: string
  ) => {
    const contract = await getErc20Contract(chainId, contractAddress);

    return await contract.erc20.balanceOf(address);
  };

  /**
   * 해당 지갑주소의 transactions 조회
   *
   * @param chainId
   * @param walletAddress
   * @param options
   */
  getTransactions = async (
    chainId: SupportChainId,
    walletAddress: string,
    options: TransactionsSearchOption
  ) => {
    const dataResponse = await Moralis.EvmApi.transaction
      .getWalletTransactionsVerbose({
        address: walletAddress,
        chain: chainId.toString(),
        ...options,
      })
      .catch((error) => {
        console.error('logs error:', error);
        throw this.internalServerError(error);
      });

    const response: WalletTransactionDataType[] =
      dataResponse.raw.result?.map((r) => {
        return {
          blockNumber: r.block_number,
          blockTimestamp: r.block_timestamp,
          fromAddress: r.from_address,
          gas: r.gas,
          gasPrice: r.gas_price,
          nonce: r.nonce,
          receiptStatus: r.receipt_status,
          toAddress: r.to_address,
          txId: r.hash,
          value: r.value,
        };
      }) ?? [];

    return {
      ...dataResponse.raw,
      result: response,
      hasNext: dataResponse.hasNext(),
    };
  };

  getWalletNFTTokens = async (
    walletAddress: string,
    chainId: SupportChainId
  ) => {
    const walletNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
      address: walletAddress,
      chain: chainId,
    });

    return walletNFTs;
  };
}
