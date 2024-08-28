import { Workspace } from '@prisma/client';
import { PaginatorQueryParams } from '@/base-common/common-request';
//
export interface CreateWorkspaceRequest {
  /**
   * 워크스페이스 이름
   */
  name: string;
  /**
   * 앱 id
   */
  appId: number;
}

export interface UpdateWorkspaceRequest {
  /**
   * 변경할 워크스페이스 이름
   */
  name: string;
}

export interface FindManyWorkspacesResponse {
  /**
   * 워크스페이스 id
   */
  workspaceId: number;
  name: string;
  /**
   * 디폴트 워크스페이스 여부
   */
  isDefault: boolean;
}
export interface FindManyWorkspacesQueryResponse {
  /**
   * 워크 스페이스
   */
  workspace: Workspace;
  /**
   * 디폴트 워크스페이스 여부
   */
  defaultYn: string;
}

export interface FindMAnyWorkspacesQueryParams extends PaginatorQueryParams {
  appId: number;
}
