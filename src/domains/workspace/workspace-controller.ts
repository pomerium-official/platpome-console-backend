import {
  Body,
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
import { CommonResponse } from '@/base-common/common-response';
import { Workspace } from '@prisma/client';
import { WorkspaceService } from '@/domains/workspace/workspace-service';
import {
  CreateWorkspaceRequest,
  FindMAnyWorkspacesQueryParams,
  FindManyWorkspacesResponse,
  UpdateWorkspaceRequest,
} from '@/domains/workspace/workspace-models';
import { PrivateRequest } from '@/base-common/common-request';
import { BaseController } from '@/base-common/base-controller';
import { authorizationMiddleware } from '@/common/libs/middlewares';
import { ConsoleAccessTokenInfo } from '@/base-common/libs/auth/libs/server/verify-jwt';

@Route('/workspaces')
@Tags('[워크 스페이스] Workspace')
@Middlewares([authorizationMiddleware])
export class WorkspaceController extends BaseController {
  private workspaceService = new WorkspaceService();

  /**
   *  ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 **
   *  ** app 생성시 default 워크스페이스 생성 **
   * 워크스페이스 생성 API
   * @param request
   * @param requestBody
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Post('/')
  public async createWorkspace(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Body() requestBody: CreateWorkspaceRequest
  ): Promise<CommonResponse<Workspace>> {
    return this.success(
      await this.workspaceService.create(
        requestBody,
        request.user.consoleMemberInfo.memberId
      )
    );
  }

  /**
   * ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 **
   * 워크스페이스 수정 API
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Put('/{id}')
  public async updateWorkspace(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path() id: number,
    @Body() requestBody: UpdateWorkspaceRequest
  ): Promise<CommonResponse<Workspace>> {
    return this.success(await this.workspaceService.update(id, requestBody));
  }

  /**
   * ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 **
   * 워크스페이스 상세 조회 API
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/{id}')
  public async findWorkspace(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Path() id: number
  ): Promise<CommonResponse<Workspace>> {
    return this.success(await this.workspaceService.find(id));
  }

  /**
   * ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 **
   * 앱 하위 워크스페이스 목록 조회 API
   */
  @Deprecated()
  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/')
  public async findManyWorkspaces(
    @Request() request: PrivateRequest<ConsoleAccessTokenInfo>,
    @Queries() queryParams: FindMAnyWorkspacesQueryParams
  ): Promise<CommonResponse<FindManyWorkspacesResponse[]>> {
    const { appId, pageSize, pageNo } = queryParams;

    const { data, total } = await this.workspaceService.findMany(
      appId,
      pageSize,
      pageNo
    );
    return this.success(data, total);
  }
}
