import { prisma } from '@/context';
import { ConsoleMember } from '@prisma/client';
import { FindWalletByAppIdQueryResponse } from '@/domains/wallet/wallet-models';
import { CreateActivityLogParams } from '@/common/biz-common-models';

export class BizCommonService {
  getConsoleMemberByPlatformMemberId = async (
    platformMemberId: string
  ): Promise<ConsoleMember | null> => {
    const consoleMember = await prisma.consoleMember.findFirst({
      where: {
        platformMemberId,
      },
    });
    if (!consoleMember) return null;
    return consoleMember;
  };
  getConsoleMemberIdByPlatformMemberId = async (
    platformMemberId: string
  ): Promise<bigint | undefined | null> => {
    const consoleMember = await this.getConsoleMemberByPlatformMemberId(
      platformMemberId
    );

    return consoleMember?.memberId || null;
  };
  getWalletByAppId = async (
    appId: number
  ): Promise<FindWalletByAppIdQueryResponse> => {
    const queryResponses: FindWalletByAppIdQueryResponse[] =
      await prisma.$queryRaw`
    SELECT
          aw.app_id as appId,
          aw.wallet_id as walletId,
          aw2.address as address,
          aw.auto_sign_yn as autoSignYn,
          aw.created_id as createdId,
          aw.created_at as createdAt,
          0 as tokenCount,
          aw2.enc_private_key as encPrivateKey,
          aw.member_access_yn as memberAccessYn
    FROM app_wallet aw 
    INNER JOIN approve_wallet aw2 on aw.wallet_id = aw2.wallet_id 
    WHERE aw.app_id  = ${appId};
    `;
    return queryResponses?.[0];
  };

  createActivityLog = async (
    request: CreateActivityLogParams
  ): Promise<void> => {
    try {
      const {
        requestBody,
        profile = 'GEN',
        os,
        memberId,
        ipAddress,
        browser,
        appId,
        activity,
        account,
        description,
        method,
        createdAt,
        type,
        txId,
      } = request;

      await prisma.$executeRaw`
      INSERT INTO activity_log 
      (app_id,account,profile,member_id,ip_address,method,type,activity,description,os,browser,tx_id,request_body,created_at)
      VALUES(
      ${appId},${account},${profile},${memberId},${ipAddress},${method},${type},${activity},${description},${os},${browser},${txId},${requestBody},${createdAt}
      )`;
    } catch (e) {
      console.error(
        '[createActivityLog] error occurred. >>',
        JSON.stringify(e)
      );
    }
  };

  getWalletByAddress = async (
    walletAddress: string
  ): Promise<FindWalletByAppIdQueryResponse> => {
    const queryResponses: FindWalletByAppIdQueryResponse[] =
      await prisma.$queryRaw`
    SELECT
          aw.app_id as appId,
          aw.wallet_id as walletId,
          aw2.address as address,
          aw.auto_sign_yn as autoSignYn,
          aw.created_id as createdId,
          aw.created_at as createdAt,
          aw2.enc_private_key as encPrivateKey
    FROM app_wallet aw 
    INNER JOIN approve_wallet aw2 on aw.wallet_id = aw2.wallet_id 
    where aw2.address = ${walletAddress}
    `;
    return queryResponses?.[0];
  };
}
