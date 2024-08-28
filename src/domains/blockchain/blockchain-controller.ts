import { Get, Route, Tags } from '@tsoa/runtime';
import { BlockChainService } from '@/domains/blockchain/blockchain-service';
import { CommonResponse } from '@/base-common/common-response';
import { BlockChainResponseType } from '@/domains/blockchain/blockchain-models';
import { BaseController } from '@/base-common/base-controller';

@Route('/common/blockchains')
@Tags('[공통] Blockchain')
export class BlockchainController extends BaseController {
  private blockChainService = new BlockChainService();
  /**
   * 콘솔에서 취급하는 블록체인 목록 조회
   */
  @Get()
  public async findManyBlockChains(): Promise<
    CommonResponse<BlockChainResponseType[]>
  > {
    return this.success(await this.blockChainService.findManyBlockChains());
  }
}
