import { ConsoleMember } from '@prisma/client';
import { prisma } from '@/context';
import { BaseService } from '@/base-common/base-service';
import {
  CreateConsoleMemberRequest,
  FindManyConsoleMembersQueryParams,
  FindMeResponse,
  UpdateConsoleMemberRequest,
} from '@/domains/consolemember/consolemember-models';
import { PageRequest } from '@/common/libs/page-request';

export class ConsoleMemberService extends BaseService {
  //
  checkExist = async (loginId: string, platformMemberId: string) => {
    const [loginIdExist, memberIdExist] = await Promise.all([
      prisma.consoleMember.count({
        where: {
          loginId: { equals: loginId },
        },
      }),
      prisma.consoleMember.count({
        where: {
          platformMemberId: { equals: platformMemberId },
        },
      }),
    ]);

    if (loginIdExist > 0)
      throw this.alreadyExist(
        `consoleMember with loginId [${loginId}] is already exist`
      );
    if (memberIdExist > 0)
      throw this.alreadyExist(
        `consoleMember with memberId [${platformMemberId}] is already exist`
      );
  };
  //
  findMe = async (platformMemberId: string) => {
    //
    const me: FindMeResponse | null = await prisma.consoleMember.findFirst({
      where: {
        platformMemberId,
      },
      select: {
        memberId: true,
        name: true,
        nickname: true,
        loginId: true,
        createdAt: true,
      },
    });
    if (!me) throw this.noContent();
    return me;
  };

  //
  create = async (
    request: CreateConsoleMemberRequest,
    platformMemberId: string
  ) => {
    //
    await this.checkExist(request.loginId, platformMemberId);

    const createdConsoleMember: ConsoleMember =
      await prisma.consoleMember.create({
        data: {
          ...request,
          platformMemberId,
          createdId: -1,
        },
      });
    if (!createdConsoleMember)
      throw this.internalServerError('failed to create ConsoleMember');

    return createdConsoleMember;
  };

  update = async (id: number, request: UpdateConsoleMemberRequest) => {
    //
    const consoleMember: ConsoleMember | null =
      await prisma.consoleMember.findUnique({
        where: {
          memberId: id,
        },
      });

    if (!consoleMember)
      throw this.noContent(`no consoleMember with id >> ${id}`);

    const updatedConsoleMember = await prisma.consoleMember.update({
      where: {
        memberId: consoleMember.memberId,
      },
      data: {
        ...consoleMember,
        ...request,
      },
    });
    if (!updatedConsoleMember)
      throw this.internalServerError('failed to update consoleMember.');

    return updatedConsoleMember;
  };

  find = async (id: number) => {
    //
    const consoleMember: ConsoleMember | null =
      await prisma.consoleMember.findUnique({
        where: {
          memberId: id,
        },
      });
    if (!consoleMember) {
      throw this.noContent(`There is no ConsoleMember with id =>  ${id}`);
    }
    return consoleMember;
  };

  findMany = async (queryParams: FindManyConsoleMembersQueryParams) => {
    //
    const { pageSize, pageNo, nickName, email } = queryParams;
    const { skip, take } = new PageRequest({ pageSize, pageNo });
    let total;
    if (pageSize && pageNo) {
      total = await prisma.consoleMember.count({
        where: {
          OR: [
            { nickname: { equals: nickName ?? '' } },
            { email: { equals: email ?? '' } },
            { loginId: { equals: email ?? '' } },
          ],
        },
      });
    }

    const consoleMembers: ConsoleMember[] = await prisma.consoleMember.findMany(
      {
        where: {
          OR: [
            { nickname: { equals: nickName ?? '' } },
            { email: { equals: email ?? '' } },
            { loginId: { equals: email ?? '' } },
          ],
        },
        take,
        skip,
      }
    );

    if (!consoleMembers || !consoleMembers.length) throw this.noContent();

    return { data: consoleMembers, total: total || consoleMembers.length };
  };
}
