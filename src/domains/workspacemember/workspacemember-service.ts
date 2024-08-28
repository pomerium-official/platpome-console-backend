import { BaseService } from '@/base-common/base-service';
import {
  CreateWorkspaceMemberRequest,
  DeleteWorkspaceMemberRequest,
  FindManyWorkspaceMembersResponse,
  InviteWorkspaceMemberRequest,
  UpdateInvitationRequest,
  UpdateWorkspaceMemberRequest,
} from '@/domains/workspacemember/workspacemember-models';
import { context, prisma } from '@/context';
import { Prisma } from '@prisma/client';
import { PageRequest } from '@/common/libs/page-request';
import { MailSender } from '@/common/libs/mail-sender';
import { EventParamsType } from '@/base-common/common-response';
import { ConsoleMemberService } from '@/domains/consolemember/consolemember-service';

const invitationStatuses = {
  // 코드그룹: ACINV_STAT,
  INVITATION_STATUS_PENDING: 'P',
  INVITATION_STATUS_ACCEPTED: 'A',
  INVITATION_STATUS_REJECTED: 'R',
  INVITATION_STATUS_ACCOUNT_CREATED: 'C',
};
export class WorkspaceMemberService extends BaseService {
  //
  private consoleMemberService = new ConsoleMemberService();

  isExist = async (workspaceId: number, memberId: number) => {
    return await prisma.workspaceMember.findFirst({
      where: { workspaceId, memberId },
    });
  };
  //
  createWorkspaceMember = async (
    request: CreateWorkspaceMemberRequest,
    userId: bigint
  ) => {
    //
    const { workspaceId, memberId, authorityCode: authCd } = request;
    if (await this.isExist(workspaceId, memberId)) throw this.alreadyExist();

    const appId = await this.getAppIdByWorkspaceId(workspaceId);
    const member = await this.consoleMemberService.find(memberId);

    const data = await prisma.workspaceMember.create({
      data: {
        memberId,
        workspaceId,
        authCd,
        createdId: Number(userId),
      },
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'invite member',
      appId,
      description: `${member.loginId} has been invited`,
    };
    return { data, events: [event] };
  };
  //
  updateWorkspaceMember = async (
    request: UpdateWorkspaceMemberRequest,
    userId: bigint
  ) => {
    //
    const workspaceMember = await this.isExist(
      request.workspaceId,
      request.memberId
    );
    if (!workspaceMember) {
      throw this.noContent();
    }
    return await prisma.workspaceMember.update({
      where: {
        workspaceMemberId: workspaceMember.workspaceMemberId,
      },
      data: {
        authCd: request.authorityCode,
        updatedId: Number(userId),
        updatedAt: new Date(),
      },
    });
  };

  getAppIdByWorkspaceId = async (workspaceId: number) => {
    const appWorkspace = await prisma.appWorkspace.findFirst({
      where: {
        workspaceId,
      },
    });
    if (!appWorkspace)
      throw this.noContent(`no app with workspaceId > ${workspaceId}`);
    return appWorkspace.appId;
  };
  //
  deleteWorkspaceMember = async (
    request: DeleteWorkspaceMemberRequest,
    userId: bigint
  ) => {
    //
    const { workspaceId, memberId } = request;
    const workspaceMember = await this.isExist(workspaceId, memberId);

    if (!workspaceMember) {
      throw this.noContent(`workspaceMember does not exist.`);
    }

    if (workspaceMember.authCd === 'MASTER')
      throw this.unAuthorized('can not delete Master');

    const workspace = await prisma.workspace.findUnique({
      where: {
        workspaceId,
      },
    });

    if (!workspace)
      throw this.noContent(`no workSpace with workspaceId: ${workspaceId} `);

    if (memberId !== Number(userId)) {
      if (workspace.createdId !== Number(userId)) {
        throw this.unAuthorized('requester is not a master of workspace.');
      }
    }
    const member = await this.consoleMemberService.find(memberId);
    const appId = await this.getAppIdByWorkspaceId(workspaceId);
    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'remove member',
      appId,
      description: `${member.loginId} has been removed `,
    };

    const data = await prisma.workspaceMember.delete({
      where: {
        workspaceMemberId: workspaceMember.workspaceMemberId,
      },
    });
    return { data, events: [event] };
  };

  //
  findManyWorkspaceMembers = async (
    appId: number,
    pageSize?: number,
    pageNo?: number
  ) => {
    //
    let total;
    const { skip, take } = new PageRequest({ pageSize, pageNo });

    if (pageNo && pageSize) {
      const countQueryResult = await prisma.$queryRaw<{ count: number }[]>`
              SELECT count(1) as count
              FROM app_workspace aw 
              INNER JOIN workspace w ON w.workspace_id  = aw.workspace_id 
              INNER JOIN workspace_member wm ON wm.workspace_id = w.workspace_id 
              INNER JOIN console_member cm ON cm.member_id  = wm.member_id
              WHERE aw.app_id = ${appId} AND aw.default_yn ='Y'
              `;

      total = countQueryResult[0].count;
    }

    const workspaceMembers = await context.prisma.$queryRaw<
      FindManyWorkspaceMembersResponse[]
    >`
            SELECT cm.member_id as consoleMemberId,
                   cm.login_id as loginId, 
                   cm.nickname as nickName, 
                   wm.auth_cd as authorityCode
            FROM app_workspace aw 
            INNER JOIN workspace w ON w.workspace_id  = aw.workspace_id 
            INNER JOIN workspace_member wm ON wm.workspace_id = w.workspace_id 
            INNER JOIN console_member cm ON cm.member_id  = wm.member_id
            WHERE aw.app_id = ${appId} AND aw.default_yn ='Y'
            ${
              pageNo && pageSize
                ? Prisma.sql`LIMIT ${skip}, ${take}`
                : Prisma.empty
            }
            `;
    return { data: workspaceMembers, total: total || workspaceMembers.length };
  };

  inviteWorkspaceMember = async (
    request: InviteWorkspaceMemberRequest,
    userId: bigint
  ) => {
    //
    const senderMemberId = Number(userId);
    const member = await this.isMember(request.email);
    if (member) throw this.alreadyExist(`member is already exist.`);
    const createdWorkspaceInvitation = await prisma.workspaceInvitation.create({
      data: {
        workspaceId: request.workspaceId,
        senderMemberId,
        createdId: senderMemberId,
        email: request.email,
        inviteDt: new Date(),
        statusCd: invitationStatuses.INVITATION_STATUS_PENDING,
      },
    });

    const sendMailResult = await new MailSender().sendInvitationMail(
      request.email,
      request.authorityCode,
      createdWorkspaceInvitation.invitationId
    );
    if (!sendMailResult)
      throw this.internalServerError('failed to send invitation email');
  };

  isMember = async (email: string) => {
    return await prisma.consoleMember.findUnique({
      where: {
        loginId: email,
      },
    });
  };

  validateAccountInvitationCode = (statusCode: string) => {
    return Object.values(invitationStatuses).find(
      (code) => statusCode === code
    );
  };

  updateInvitation = async (
    invitationId: number,
    request: UpdateInvitationRequest
  ) => {
    //
    if (!this.validateAccountInvitationCode(request.statusCode))
      throw this.parameterError(
        `statusCode [${request.statusCode}] is invalid.`
      );

    return await prisma.$transaction(async (prisma) => {
      const workspaceInvitation = await prisma.workspaceInvitation.findUnique({
        where: {
          invitationId,
        },
      });
      if (!workspaceInvitation)
        throw this.parameterError(`invitationId is invalid.`);
      return await prisma.workspaceInvitation.update({
        where: { invitationId },
        data: {
          statusCd: request.statusCode,
          acceptDt:
            request.statusCode === invitationStatuses.INVITATION_STATUS_ACCEPTED
              ? new Date()
              : undefined,
          updatedAt: new Date(),
          updatedId: -1,
        },
      });
    });
  };
}
