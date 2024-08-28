import { BaseService } from '@/base-common/base-service';
import { prisma } from '@/context';
import {
  ApplyReleaseRequest,
  FindManyReleaseHistoryResponse,
  Platform,
  PlatformUrl,
} from '@/domains/release/release-models';
import { App, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PaginatorQueryParams } from '@/base-common/common-request';
import { PageRequest } from '@/common/libs/page-request';
import { EventParamsType } from '@/base-common/common-response';

type PrismaType = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

interface AggregateRowType {
  appId: number;
  rowId: string;
  aggregateGroupCd: string;
  aggregateCd: string;
  string?: string;
  number?: number;
}

export class ReleaseService extends BaseService {
  //
  uuid = () => {
    return randomUUID().replaceAll('-', '');
  };
  //
  parseScreenImages = (screenUrls: string[], appId: number) => {
    return screenUrls.map((url) => {
      const rowId = this.uuid();
      return {
        appId,
        rowId,
        aggregateGroupCd: 'APP_DTL_SCRSHT',
        aggregateCd: 'SCREEN_URL',
        string: url,
      };
    });
  };
  //
  parsePlatformUrls = (platformUrls: PlatformUrl[], appId: number) => {
    const aggregateRows: AggregateRowType[] = [];
    platformUrls.map((platformUrl) => {
      const rowId = this.uuid();
      aggregateRows.push({
        appId,
        rowId,
        aggregateGroupCd: 'APP_DTL_PLATFORM',
        aggregateCd: 'PLATFORM',
        string: platformUrl.platform,
      });
      aggregateRows.push({
        appId,
        rowId,
        aggregateGroupCd: 'APP_DTL_PLATFORM',
        aggregateCd: 'INSTALL_URL',
        string: platformUrl.url,
      });
    });
    return aggregateRows;
  };
  //
  parseLanguages = (selectedLanguages: string[], appId: number) => {
    return selectedLanguages.map((language) => {
      const rowId = this.uuid();
      return {
        appId,
        rowId,
        aggregateGroupCd: 'APP_DTL_LANG',
        aggregateCd: 'LANGUAGE',
        string: language,
      };
    });
  };
  //
  cancelApplyRelease = async (appId: number, memberId: bigint) => {
    const releaseReview = await prisma.releaseReview.findFirst({
      where: {
        appId: {
          equals: appId,
        },
      },
      select: {
        reviewId: true,
        app: {
          select: {
            name: true,
          },
        },
      },
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!releaseReview || !releaseReview.app) throw this.noContent();

    const data = await prisma.$transaction(
      async (prisma) => {
        if (await this.validateReleaseStatus(appId, ['IN_REVIEW'], prisma))
          throw this.internalServerError('already in review');

        await prisma.releaseReview.update({
          data: {
            statusCd: 'CANCELED',
          },
          where: {
            reviewId: releaseReview.reviewId,
          },
        });

        await prisma.appReleaseReviewHistory.create({
          data: {
            appId,
            reviewId: releaseReview.reviewId,
            statusCd: 'CANCELED',
            createdId: Number(memberId),
          },
        });

        const releasedApp = await prisma.appRelease.findUnique({
          where: {
            appId,
          },
        });

        if (releasedApp) {
          const {
            promotionalText,
            bannerUrl,
            cardUrl,
            detailDescription,
            siteUrl,
          } = releasedApp;

          await prisma.app.update({
            data: {
              promotionalText,
              bannerUrl,
              cardUrl,
              detailDescription,
              siteUrl,
            },
            where: {
              appId,
            },
          });

          await prisma.appDetailAggregate.deleteMany({
            where: {
              appId,
            },
          });

          await prisma.$executeRaw`
        INSERT INTO app_detail_aggregate
          (app_id,row_id,aggregate_group_cd,aggregate_cd,string,created_id) 
        SELECT 
          app_id,row_id,aggregate_group_cd,aggregate_cd,string,created_id 
        FROM app_release_detail_aggregate arda WHERE app_id = ${appId};
`;
        }
      },
      { timeout: 15000 }
    );
    const event: EventParamsType = {
      type: 'Release',
      eventName: 'Cancel',
      appId: appId,
      description: `${releaseReview.app.name} App’s submission for release has been canceled`,
    };
    return { data, events: [event] };
  };
  //
  validateReleaseStatus = async (
    appId: number,
    statuses: string[],
    prisma: PrismaType
  ) => {
    const invalidateStatuses = await prisma.releaseReview.count({
      where: {
        AND: [{ appId }, { statusCd: { in: statuses } }],
      },
    });
    return invalidateStatuses > 0;
  };

  //
  applyRelease = async (request: ApplyReleaseRequest, userId: bigint) => {
    const { appId, screenUrls, platformUrls, selectedLanguages, ...rest } =
      request;
    return await prisma.$transaction(async (prisma) => {
      if (
        await this.validateReleaseStatus(
          appId,
          ['IN_REVIEW', 'REQUESTED'],
          prisma
        )
      )
        throw this.internalServerError('already requested or in review');

      const createdReleaseReview = await prisma.releaseReview.create({
        data: {
          appId,
          //TODO : 이후 IN_REVIEW 로 변경하는 기획 정의 후 REQUESTED로 처리
          statusCd: 'REQUESTED',
          createdId: Number(userId),
          releaseReviewDetail: {
            // TODO 데이터 추가
            createMany: { data: [] },
          },
        },
      });

      await prisma.appReleaseReviewHistory.create({
        data: {
          app: {
            connect: {
              appId,
            },
          },
          releaseReview: {
            connect: {
              reviewId: createdReleaseReview.reviewId,
            },
          },
          statusCd: 'REQUESTED',
          createdId: Number(userId),
          createdAt: new Date(),
        },
      });
      // await prisma.appReleaseReviewHistory.create({
      //   data: {
      //     app: {
      //       connect: {
      //         appId,
      //       },
      //     },
      //     releaseReview: {
      //       connect: {
      //         reviewId: createdReleaseReview.reviewId,
      //       },
      //     },
      //     statusCd: 'IN_REVIEW',
      //     createdId: Number(userId),
      //     createdAt: new Date(),
      //   },
      // });

      await prisma.appDetailAggregate.deleteMany({
        where: {
          appId,
        },
      });

      const rows: AggregateRowType[] = [
        ...this.parseScreenImages(screenUrls, appId),
        ...this.parsePlatformUrls(platformUrls, appId),
        ...this.parseLanguages(selectedLanguages, appId),
      ];

      await prisma.appDetailAggregate.createMany({
        data: rows,
      });

      const result = await prisma.app.update({
        where: {
          appId,
        },
        data: {
          ...rest,
        },
      });

      const event: EventParamsType = {
        type: 'Release',
        eventName: 'Submission',
        appId,
        description: `${result.name} App has been submitted for release`,
      };
      return { data: result, events: [event] };
    });
  };

  queryAppDetailAggregates = async (prisma: PrismaType, appId: number) => {
    const languages = await this.queryAppLanguages(prisma, appId);
    const screenUrls = await this.queryAppScreenUrls(prisma, appId);
    const platformUrls = await this.queryAppPlatformUrls(prisma, appId);
    return {
      languages,
      screenUrls,
      platformUrls,
    };
  };

  queryAppLanguages = async (prisma: PrismaType, appId: number) => {
    const queryResult: { language: string }[] = await prisma.$queryRaw`
            SELECT
                MAX(CASE WHEN aggregate_cd = 'LANGUAGE' THEN \`string\` ELSE NULL END) AS language
            FROM app_detail_aggregate
            WHERE 1=1 
            and app_id = ${appId}
            and aggregate_group_cd  = 'APP_DTL_LANG'
            GROUP BY row_id;
      `;
    return queryResult.map((result) => result.language);
  };

  queryAppScreenUrls = async (prisma: PrismaType, appId: number) => {
    const queryResult: { screenUrl: string }[] = await prisma.$queryRaw`
            SELECT
                MAX(CASE WHEN aggregate_cd = 'SCREEN_URL' THEN \`string\` ELSE NULL END) AS screenUrl
            FROM app_detail_aggregate
            WHERE 1=1 
            and app_id = ${appId}
            and aggregate_group_cd  = 'APP_DTL_SCRSHT'
            GROUP BY row_id;
      `;
    return queryResult.map((result) => result.screenUrl);
  };

  queryAppPlatformUrls = async (prisma: PrismaType, appId: number) => {
    const queryResult: {
      platform: Platform;
      installUrl: string;
    }[] = await prisma.$queryRaw`
            SELECT
                MAX(CASE WHEN aggregate_cd = 'PLATFORM' THEN \`string\` ELSE NULL END) AS platform,
                MAX(CASE WHEN aggregate_cd = 'INSTALL_URL' THEN \`string\` ELSE NULL END) AS installUrl
            FROM app_detail_aggregate
            WHERE 1=1 
            and app_id = ${appId}
            and aggregate_group_cd  = 'APP_DTL_PLATFORM'
            GROUP BY row_id;
      `;
    return queryResult.map((result) => {
      return { platform: result.platform, url: result.installUrl };
    });
  };

  upsertAppRelease = async (prisma: PrismaType, currentApp: App) => {
    return await prisma.appRelease.upsert({
      create: {
        ...currentApp,
        createdId: -1,
        createdAt: new Date(),
      },
      where: { appId: currentApp.appId },
      update: {
        ...currentApp,
        updatedId: -1,
        updatedAt: new Date(),
      },
    });
  };

  deletePreviousAppReleaseDetailAggregates = async (
    prisma: PrismaType,
    appId: number
  ) => {
    await prisma.appReleaseDetailAggregate.deleteMany({
      where: {
        appId: {
          equals: appId,
        },
      },
    });
  };

  createAppReleaseDetailAggregates = async (
    prisma: PrismaType,
    rows: AggregateRowType[],
    createdId: number
  ) => {
    await prisma.appReleaseDetailAggregate.createMany({
      data: rows.map((row) => {
        return {
          ...row,
          createdId,
        };
      }),
    });
  };

  releaseReleaseReview = async (prisma: PrismaType, reviewId: number) => {
    return await prisma.releaseReview.update({
      where: { reviewId },
      data: {
        statusCd: 'RELEASED',
      },
    });
  };

  createReleasedReviewHistory = async (
    prisma: PrismaType,
    appId: number,
    reviewId: number
  ) => {
    await prisma.appReleaseReviewHistory.create({
      data: {
        app: {
          connect: {
            appId,
          },
        },
        releaseReview: {
          connect: {
            reviewId,
          },
        },
        statusCd: 'RELEASED',
        createdId: -1,
        createdAt: new Date(),
      },
    });
  };

  //
  approveRelease = async (reviewId: number) => {
    //
    return await prisma.$transaction(async (prisma) => {
      //
      const releaseReview = await prisma.releaseReview.findUnique({
        where: { reviewId },
      });

      if (!releaseReview) throw this.noContent('reviewId is invalid.');

      if (!releaseReview.appId)
        throw this.parameterError('releaseReview.appId is missing');

      // if (releaseReview.statusCd !== 'IN_REVIEW')
      //   throw new Error('review status is not IN_REVIEW');

      const { appId } = releaseReview;

      const currentApp = await prisma.app.findUnique({
        where: { appId },
      });

      if (!currentApp) throw this.noContent('releaseReview.appId is invalid');

      await this.releaseReleaseReview(prisma, reviewId);

      await this.createReleasedReviewHistory(prisma, appId, reviewId);

      const appRelease = await this.upsertAppRelease(prisma, currentApp);

      const { languages, screenUrls, platformUrls } =
        await this.queryAppDetailAggregates(prisma, appId);

      const rows = [
        ...this.parsePlatformUrls(platformUrls, appId),
        ...this.parseScreenImages(screenUrls, appId),
        ...this.parseLanguages(languages, appId),
      ];

      await this.deletePreviousAppReleaseDetailAggregates(prisma, appId);

      await this.createAppReleaseDetailAggregates(
        prisma,
        rows,
        currentApp.createdId
      );

      return appRelease;
    });
  };

  //
  getReleaseHistories = async (
    appId: number,
    requestParams: PaginatorQueryParams
  ) => {
    const { pageSize = 10, pageNo = 1 } = requestParams;
    const { skip, take } = new PageRequest({ pageSize, pageNo });

    const [total, releaseHistories] = await Promise.all([
      prisma.appReleaseReviewHistory.count({
        where: {
          appId,
        },
      }),
      prisma.appReleaseReviewHistory.findMany({
        where: {
          appId,
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip,
        take,
      }),
    ]);

    return {
      data: releaseHistories as FindManyReleaseHistoryResponse[],
      total,
    };
  };
}
