import {
  Body,
  Get,
  Path,
  Post,
  Queries,
  Route,
  Tags,
  UploadedFile,
} from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { AttachFile, CommonCode } from '@prisma/client';
import { CommonService } from '@/common/common-service';
import {
  CertificateCodeRequest,
  CommonCodeGroupQueryResponse,
  FindManyCodeGroupsQueryParams,
  FindManyCodesQueryParams,
  SendCertificationSMSRequest,
  SendCertificationSMSResponse,
} from '@/common/common-models';
import { BaseController } from '@/base-common/base-controller';

@Route('/common')
@Tags('[공통] Common')
export class CommonController extends BaseController {
  private commonService = new CommonService();

  //
  /**
   * 공통 코드 그룹 목록 조회 API
   * @param queryParams
   */
  @Get('/code-groups')
  public async findManyCodeGroups(
    @Queries() queryParams: FindManyCodeGroupsQueryParams
  ): Promise<CommonResponse<CommonCodeGroupQueryResponse[]>> {
    const { data, total } = await this.commonService.findManyCodeGroups(
      queryParams
    );
    return this.success(data, total);
  }

  /**
   * 공통 코드 목록 조회 API
   * @param queryParams
   */
  @Get('/codes')
  public async findManyCodes(
    @Queries() queryParams: FindManyCodesQueryParams
  ): Promise<CommonResponse<CommonCode[]>> {
    const { data, total } = await this.commonService.findManyCodes(queryParams);
    return this.success(data, total);
  }

  /**
   * S3 파일 업로드 및 파일정보 DB 저장 API
   * @param file
   */
  @Post('/s3')
  public async createAttachFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<CommonResponse<AttachFile>> {
    return this.success(await this.commonService.uploadS3(file));
  }

  /**
   * 핸드폰 인증 > 문자 발송 API
   * @param requestBody
   */
  @Tags('[콘솔 회원] ConsoleMember')
  @Post('/sms/certification')
  public async sendCertificationSMS(
    @Body() requestBody: SendCertificationSMSRequest
  ): Promise<CommonResponse<SendCertificationSMSResponse>> {
    //
    return this.success(
      await this.commonService.sendCertificationSMS(requestBody)
    );
  }

  /**
   * 핸드폰 인증 > 번호 인증 API
   * @param requestBody
   * @param messageId
   */
  @Tags('[콘솔 회원] ConsoleMember')
  @Post('/sms/certification/{messageId}')
  public async certificateCode(
    @Body() requestBody: CertificateCodeRequest,
    @Path('messageId') messageId: string
  ): Promise<CommonResponse> {
    return this.success(
      await this.commonService.certificateCode(messageId, requestBody.code)
    );
  }
}
