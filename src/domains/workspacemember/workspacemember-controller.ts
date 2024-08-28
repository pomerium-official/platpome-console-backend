import {
  Body,
  Delete,
  Deprecated,
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
import {
  CreateWorkspaceMemberRequest,
  DeleteWorkspaceMemberRequest,
  FindMAnyWorkspaceMembersQueryParams,
  FindManyWorkspaceMembersResponse,
  InviteWorkspaceMemberRequest,
  UpdateInvitationRequest,
  UpdateWorkspaceMemberRequest,
} from '@/domains/workspacemember/workspacemember-models';
import { WorkspaceMemberService } from '@/domains/workspacemember/workspacemember-service';
import { CommonResponse } from '@/base-common/common-response';
import { WorkspaceInvitation, WorkspaceMember } from '@prisma/client';
import { PrivateRequest } from '@/base-common/common-request';
import {
  activityLogger,
  authorizationMiddleware,
} from '@/common/libs/middlewares';
import { BaseController } from '@/base-common/base-controller';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';

@Route('/workspace-members')
@Tags('[워크 스페이스 팀원] WorkspaceMember')
@Middlewares(authorizationMiddleware)
export class WorkspaceMemberController extends BaseController {
  private workspaceMemberService = new WorkspaceMemberService();
  //
  /**
   * Setting > 팀원 및 권한 > 팀원 목록 조회 API
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/')
  @Tags('[세팅] Setting')
  public async findManyWorkspaceMembers(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Queries() queryParams: FindMAnyWorkspaceMembersQueryParams
  ): Promise<CommonResponse<FindManyWorkspaceMembersResponse[]>> {
    const { appId, pageSize, pageNo } = queryParams;
    const { data, total } =
      await this.workspaceMemberService.findManyWorkspaceMembers(
        appId,
        pageSize,
        pageNo
      );
    return this.success(data, total);
  }

  /**
   * Setting > 팀원 및 권한 > 워크스페이스 소속 팀원 추가 API
   * @param request
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[세팅] Setting')
  @Post('/')
  public async createWorkspaceMember(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: CreateWorkspaceMemberRequest
  ): Promise<CommonResponse<WorkspaceMember>> {
    const { data, events } =
      await this.workspaceMemberService.createWorkspaceMember(
        requestBody,
        request.user.consoleMemberInfo.memberId
      );
    return this.successWithEvent(events, data);
  }

  /**
   * 워크스페이스 소속 팀원 권한 수정 API
   * @param request
   * @param requestBody
   */
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/')
  public async updateWorkspaceMember(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: UpdateWorkspaceMemberRequest
  ): Promise<CommonResponse<WorkspaceMember>> {
    return this.success(
      await this.workspaceMemberService.updateWorkspaceMember(
        requestBody,
        request.user.consoleMemberInfo.memberId
      )
    );
  }

  /**
   * 워크스페이스 소속 팀원 제거 API
   * @param request
   * @param requestBody
   */
  @Middlewares(activityLogger)
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Delete('/')
  public async deleteWorkspaceMember(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: DeleteWorkspaceMemberRequest
  ): Promise<CommonResponse> {
    const { data, events } =
      await this.workspaceMemberService.deleteWorkspaceMember(
        requestBody,
        request.user.consoleMemberInfo.memberId
      );
    return this.successWithEvent(events, data);
  }

  // ============== Deprecated ============== //
  /**
   * ** 0.2버전으로 미뤄짐 **
   * Setting > 팀원 및 권한 > 팀 멤버 추가하기 (초대 메일 발송)
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[세팅] Setting')
  @Post('/invitation')
  public async inviteWorkspaceMember(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: InviteWorkspaceMemberRequest
  ): Promise<CommonResponse> {
    return this.success(
      await this.workspaceMemberService.inviteWorkspaceMember(
        requestBody,
        request.user.consoleMemberInfo.memberId
      )
    );
  }

  /**
   * * ** 0.2버전으로 미뤄짐 **
   * 초대 메일 확인 후 승락/거절 처리 API
   * @param request
   * @param invitationId
   * @param requestBody
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Tags('[세팅] Setting')
  @Put('/invitation/{invitationId}')
  public async updateInvitation(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path('invitationId') invitationId: number,
    @Body() requestBody: UpdateInvitationRequest
  ): Promise<CommonResponse<WorkspaceInvitation>> {
    return this.success(
      await this.workspaceMemberService.updateInvitation(
        invitationId,
        requestBody
      )
    );
  }
}
