import { BaseService } from '@/base-common/base-service';
import { prisma } from '@/context';
import { PageRequest } from '@/common/libs/page-request';
import { FindManyActivityLogsQueryParams } from '@/domains/activity/activity-models';
import { Prisma, ActivityLog } from '@prisma/client';

export class ActivityService extends BaseService {
  //
  findManyActivities = async (
    appId: number,
    queryParams: FindManyActivityLogsQueryParams
  ) => {
    const {
      pageNo,
      pageSize,
      from,
      to,
      profile = 'DEV',
      method,
      types,
    } = queryParams;
    const { skip, take } = new PageRequest({ pageSize, pageNo });

    const totalQuery = prisma.$queryRaw<{ count: string }[]>`
    SELECT 
        count(1) as count
      FROM activity_log al 
      WHERE 1=1 
      AND 
        CASE 
            WHEN al.type = 'NFT' 
            THEN profile = ${profile} 
            ELSE profile = 'GEN' 
        END
      ${
        from && to
          ? Prisma.sql`AND al.created_at BETWEEN ${`${from} 00:00:00`} AND ${`${to} 23:59:59`}`
          : Prisma.empty
      }
      ${method ? Prisma.sql`AND al.method = ${method}` : Prisma.empty}
      ${
        types && types.length > 0
          ? Prisma.sql`AND al.type IN (${Prisma.join(types.split(','))})`
          : Prisma.empty
      } 
    `;

    const dataQuery = prisma.$queryRaw<Omit<ActivityLog, 'requestBody'>[]>`
    SELECT 
        id
        ,app_id AS appId
        ,profile
        ,account
        ,\`method\`
        ,member_id AS memberId
        ,\`type\` 
        ,activity
        ,browser 
        ,tx_id AS txId
        ,description 
        ,os
        ,ip_address AS ipAddress
        ,created_at AS createdAt
      FROM activity_log al 
      WHERE 1=1 
      AND 
        CASE 
            WHEN al.type = 'NFT' 
            THEN profile = ${profile} 
            ELSE profile = 'GEN' 
        END 
      ${
        from && to
          ? Prisma.sql`AND al.created_at BETWEEN ${`${from} 00:00:00`} AND ${`${to} 23:59:59`}`
          : Prisma.empty
      }
      ${method ? Prisma.sql`AND al.method = ${method}` : Prisma.empty}
      ${
        types && types.length > 0
          ? Prisma.sql`AND al.type IN (${Prisma.join(types.split(','))})`
          : Prisma.empty
      }
      ORDER BY al.id DESC
      LIMIT ${skip}, ${take}
    `;

    const [data, total] = await Promise.all([dataQuery, totalQuery]);

    return {
      data,
      total: Number(total[0].count),
    };
  };
}
