import {
  Body,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Request,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import { CommonResponse } from '@/base-common/common-response';
import { ConsoleMemberService } from '@/domains/consolemember/consolemember-service';
import { ConsoleMember } from '@prisma/client';
import {
  CreateConsoleMemberRequest,
  FindManyConsoleMembersQueryParams,
  UpdateConsoleMemberRequest,
} from '@/domains/consolemember/consolemember-models';
import { PrivateRequest } from '@/base-common/common-request';
import { BizCommonService } from '@/common/biz-common-service';
import { authorizationMiddleware } from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';

@Route('/members')
@Tags('[콘솔 회원] ConsoleMember')
export class ConsoleMemberController extends BaseController {
  private consoleMemberService = new ConsoleMemberService();
  private bizCommonService = new BizCommonService();

  /**
   * 회원 가입 여부 확인 API
   * @param request
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/check')
  public async checkMemberExist(@Request() request: PrivateRequest) {
    const userId =
      await this.bizCommonService.getConsoleMemberIdByPlatformMemberId(
        request.user.sub
      );
    if (!userId) throw this.consoleMemberService.unAuthorized();
    return this.success(userId);
  }

  /**
   * 내 정보 조회 API
   * @param request
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/me')
  public async findMe(
    @Request() request: PrivateRequest
  ): Promise<CommonResponse<ConsoleMember>> {
    return this.success(
      await this.consoleMemberService.findMe(request.user.sub)
    );
  }

  /**
   * 개발자 콘솔 회원 등록 API
   * @param request
   * @param requestBody
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/')
  public async createConsoleMember(
    @Request() request: PrivateRequest,
    @Body() requestBody: CreateConsoleMemberRequest
  ): Promise<CommonResponse<ConsoleMember>> {
    return this.success(
      await this.consoleMemberService.create(requestBody, request.user.sub)
    );
  }

  /**
   * 개발자 콘솔 회원 수정 API
   * @param request
   * @param memberId
   * @param requestBody
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/{memberId}')
  @Middlewares(authorizationMiddleware)
  public async updateConsoleMember(
    @Request() request: PrivateRequest,
    @Path() memberId: number,
    @Body() requestBody: UpdateConsoleMemberRequest
  ): Promise<CommonResponse<ConsoleMember>> {
    return this.success(
      await this.consoleMemberService.update(memberId, requestBody)
    );
  }

  /**
   * 개발자 콘솔 회원 상세 조회 API
   * @param request
   * @param memberId
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/{memberId}')
  @Middlewares(authorizationMiddleware)
  public async findConsoleMember(
    @Request() request: PrivateRequest,
    @Path() memberId: number
  ): Promise<CommonResponse<ConsoleMember>> {
    return this.success(await this.consoleMemberService.find(memberId));
  }

  /**
   * 개발자 콘솔 회원 목록 조회 API
   * @param request
   * @param queryParams
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/')
  @Tags('[콘솔 회원] ConsoleMember', '[세팅] Setting')
  @Middlewares(authorizationMiddleware)
  public async findManyConsoleMembers(
    @Request() request: PrivateRequest,
    @Queries() queryParams: FindManyConsoleMembersQueryParams
  ): Promise<CommonResponse<ConsoleMember[]>> {
    const { data, total } = await this.consoleMemberService.findMany(
      queryParams
    );
    return this.success(data, total);
  }
}
