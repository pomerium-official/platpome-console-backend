import { BaseController } from '@/base-common/base-controller';
import { Put, Route, Tags } from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { setContracts } from '@/start-assertion';
import { BaseService } from '@/base-common/base-service';

@Route('/platform-contracts')
@Tags('[플랫폼 컨트랙트] PlatformContract')
export class ContractController extends BaseController {
  private baseService = new BaseService();

  /**
   * PlatformContract 목록 갱신 API (관리자 사이트 개발 완료 까지 임시 적용 )
   */
  @Put()
  public async reloadPlatformContracts(): Promise<CommonResponse> {
    try {
      await setContracts();
      return this.success();
    } catch (e) {
      throw this.baseService.internalServerError();
    }
  }
}
