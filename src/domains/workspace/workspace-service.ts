import { BaseService } from '@/base-common/base-service';
import { Workspace } from '@prisma/client';
import { prisma } from '@/context';
import {
  CreateWorkspaceRequest,
  FindManyWorkspacesQueryResponse,
  UpdateWorkspaceRequest,
} from '@/domains/workspace/workspace-models';
import { PageRequest } from '@/common/libs/page-request';

export class WorkspaceService extends BaseService {
  //
  create = async (request: CreateWorkspaceRequest, userId: bigint) => {
    //
    const { name, appId } = request;
    const memberId = Number(userId);

    return await prisma.$transaction(async (prisma) => {
      const app = await prisma.app.findUnique({
        where: {
          appId,
        },
      });
      if (!app) throw this.noContent('appId is in valid');
      if (app.createdId !== memberId)
        throw this.unAuthorized('not a master of this app.');

      const createdWorkspace: Workspace | null = await prisma.workspace.create({
        data: {
          name,
          createdId: memberId,
        },
      });
      if (!createdWorkspace) throw this.internalServerError();

      const appWorkspaces = await prisma.appWorkspace.count({
        where: {
          appId,
        },
      });

      await prisma.appWorkspace.create({
        data: {
          workspaceId: createdWorkspace.workspaceId,
          appId,
          defaultYn: appWorkspaces === 0 ? 'Y' : 'N',
          createdId: memberId,
        },
      });
      return createdWorkspace;
    });
  };

  //
  find = async (workspaceId: number) => {
    const workspace: Workspace | null = await prisma.workspace.findUnique({
      where: {
        workspaceId,
      },
    });
    if (!workspace) return this.noContent();

    return workspace;
  };

  //
  findMany = async (appId: number, pageSize?: number, pageNo?: number) => {
    //
    let total;
    const { skip, take } = new PageRequest({ pageSize, pageNo });
    if (pageNo && pageSize) {
      total = await prisma.appWorkspace.count({
        where: {
          appId,
        },
      });
    }
    const workspaces: FindManyWorkspacesQueryResponse[] =
      await prisma.appWorkspace.findMany({
        where: {
          appId,
        },
        select: {
          defaultYn: true,
          workspace: true,
        },
        skip,
        take,
      });

    const data = workspaces.map((result) => {
      return {
        workspaceId: result.workspace.workspaceId,
        name: result.workspace.name,
        isDefault: result.defaultYn === 'Y',
      };
    });

    return { data, total: total || workspaces.length };
  };
  //
  update = async (workspaceId: number, request: UpdateWorkspaceRequest) => {
    const { name } = request;
    const workspace: Workspace | null = await prisma.workspace.findUnique({
      where: {
        workspaceId,
      },
    });
    if (!workspace) throw this.noContent();
    const updatedWorkspace = await prisma.workspace.update({
      where: {
        workspaceId,
      },
      data: {
        name,
      },
    });
    if (!updatedWorkspace) throw this.internalServerError();
    return updatedWorkspace;
  };
}
