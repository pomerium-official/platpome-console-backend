import { BaseService } from '@/base-common/base-service';
import { context } from '@/context';
import { BlockChainResponseType } from '@/domains/blockchain/blockchain-models';

export class BlockChainService extends BaseService {
  //
  findManyBlockChains = async () => {
    const blockChains: BlockChainResponseType[] =
      await context.prisma.blockchain.findMany({
        select: {
          blockchainId: true,
          name: true,
          symbolImageUrl: true,
        },
      });
    return blockChains;
  };
}
