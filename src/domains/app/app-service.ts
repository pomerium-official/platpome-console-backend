import {
  App,
  ApproveWallet,
  AppWallet,
  AppWorkspace,
  Wallet,
  Workspace,
  WorkspaceMember,
} from '@prisma/client';
import { PageRequest } from '@/common/libs/page-request';
import { BaseService } from '@/base-common/base-service';
import {
  AppDetailResponseType,
  CreateAppApiKeyRequest,
  CreateAppRequest,
  FindMAnyAppsQueryParams,
  FindManyAppsQueryResponse,
  UpdateAppRequest,
} from '@/domains/app/app-models';
import { CryptoUtil } from '@/common/libs/crypto-util';
import {
  createClient,
  getClientInfo,
} from '@/base-common/libs/auth/client-service';
import { Platform, PlatformUrl } from '@/domains/release/release-models';
import { SupportChainId } from '@/common/libs/constants';
import { WalletService } from '@/domains/wallet/wallet-service';
import { getAppSDK } from '@/common/libs/thirdweb-sdk';
import { BizCommonService } from '@/common/biz-common-service';
import { prisma } from '@/context';
import { getErc20ContractListByChainId } from '@/common/libs/blockchain-util';
import { EventParamsType } from '@/base-common/common-response';

// sleep helper method
function sleep(ms: number) {
  return new Promise((resolve) => {
    // we want to unreference this timeout to ensure
    // that it doesn't hold up the process from exiting
    setTimeout(resolve, ms).unref();
  });
}
export const MAX_RETRY = 5;

export class AppService extends BaseService {
  private walletService = new WalletService();
  private bizCommonService = new BizCommonService();
  //
  /**
   * 2999-12-31 23:59:59
   */
  private DEFAULT_API_KEY_EXPIRY_DATE = 253402300799000;

  fetchGenerateClient = async (appId: number, name: string) => {
    //
    let retry = 0;

    const clientId = `${process.env.CONSOLE_CLIENT_PREFIX}${appId}_${name}`;

    const generatedClient = await createClient({
      clientId,
    });

    if (!generatedClient) throw new Error('failed to generate client');

    const fetchGetClientInfo = async () => {
      let response;
      if (retry < MAX_RETRY) {
        retry += 1;
        console.log('getClientInfo process started');
        response = await getClientInfo(clientId);
        if (response) return response;
        else {
          console.log('retry getClientInfo');
          console.log('retryCount >>>', retry);
          await sleep(500);
          await fetchGetClientInfo();
        }
      } else {
        return null;
      }
    };

    const clientInfo = await fetchGetClientInfo();

    if (!clientInfo) throw this.internalServerError('failed to get clientInfo');

    const { secret, id } = clientInfo;
    return { secret, id };
  };
  //
  create = async (request: CreateAppRequest, userId: bigint) => {
    return await prisma.$transaction(
      async (prisma) => {
        //
        const createdApp: App = await prisma.app.create({
          data: {
            ...request,
            createdId: Number(userId),
            createdAt: new Date(),
          },
        });

        console.log('createdApp >> ', createdApp);
        if (!createdApp) throw this.internalServerError('failed to create app');

        const { secret, id } = await this.fetchGenerateClient(
          createdApp.appId,
          'DEFAULT'
        );

        const createdAppApiKeys = await prisma.appApiKey.createMany({
          data: [
            {
              key: id.replaceAll('-', ''),
              appId: createdApp.appId,
              name: 'DEFAULT',
              expireDt: new Date(this.DEFAULT_API_KEY_EXPIRY_DATE),
              apiKeyKindCd: 'CLIENT_ID',
              createdId: Number(userId),
            },
            {
              key: secret,
              appId: createdApp.appId,
              name: 'DEFAULT',
              expireDt: new Date(this.DEFAULT_API_KEY_EXPIRY_DATE),
              apiKeyKindCd: 'CLIENT_SECRET',
              createdId: Number(userId),
            },
          ],
        });

        console.log('createdAppApiKeys >> ', createdAppApiKeys);

        if (!createdAppApiKeys)
          throw this.internalServerError('failed to create AppApiKey');

        const createdWorkspace: Workspace | null =
          await prisma.workspace.create({
            data: {
              name: createdApp.name,
              createdId: Number(userId),
            },
          });

        if (!createdWorkspace)
          throw this.internalServerError('failed to create Workspace');

        const createdAppWorkspace: AppWorkspace =
          await prisma.appWorkspace.create({
            data: {
              workspaceId: createdWorkspace.workspaceId,
              appId: createdApp.appId,
              defaultYn: 'Y',
              createdId: Number(userId),
            },
          });

        if (!createdAppWorkspace)
          throw this.internalServerError('failed to create AppWorkspace');

        const createdWorkspaceMember: WorkspaceMember =
          await prisma.workspaceMember.create({
            data: {
              workspaceId: createdWorkspace.workspaceId,
              memberId: userId,
              createdId: Number(userId),
              authCd: 'MASTER',
            },
          });

        if (!createdWorkspaceMember)
          throw this.internalServerError(
            'failed to create default WorkspaceMember'
          );

        const wallet = await this.walletService.createWallet();

        if (!wallet) throw new Error('failed to create new Wallet');

        const createdWallet: Wallet = await prisma.wallet.create({
          data: {
            walletKindId: '1',
            statusCd: '200',
            createdId: Number(userId),
          },
        });

        const encPrivateKey = new CryptoUtil().cipherString(wallet.privateKey);
        const createdApproveWallet: ApproveWallet =
          await prisma.approveWallet.create({
            data: {
              wallet: {
                connect: {
                  walletId: createdWallet.walletId,
                },
              },
              address: wallet.address,
              encPrivateKey,
              createdId: Number(userId),
            },
          });

        if (!createdApproveWallet)
          throw this.internalServerError(`failed to create ApproveWallet`);

        const createdAppWallet: AppWallet = await prisma.appWallet.create({
          data: {
            app: {
              connect: {
                appId: createdApp.appId,
              },
            },
            wallet: {
              connect: {
                walletId: createdWallet.walletId,
              },
            },
            defaultYn: 'Y',
            poolYn: 'Y',
            createdId: Number(userId),
          },
        });

        if (!createdAppWallet)
          throw this.internalServerError(`failed to create AppWallet`);

        return createdApp;
      },
      { timeout: 30000, maxWait: 30000 }
    );
  };

  update = async (appId: number, request: UpdateAppRequest, userId: bigint) => {
    const app: App | null = await prisma.app.findUnique({
      where: {
        appId,
      },
    });

    if (!app) throw this.noContent('appId is invalid');
    const invalidStatus =
      (await prisma.releaseReview.count({
        where: {
          appId,
          statusCd: { in: ['REQUESTED', 'IN_REVIEW'] },
        },
      })) > 0;
    if (invalidStatus) throw this.alreadyExist('app is already in review');

    if (app.createdId != Number(userId))
      throw this.unAuthorized(`userId no matches with app.createdId`);

    const newApp = {
      ...app,
      ...request,
    };

    const data = await prisma.app.update({
      where: { appId },
      data: newApp,
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'app information changed',
      appId,
      description: `${app.name}'s information has been changed`,
    };
    return { data, events: [event] };
  };

  find = async (appId: number) => {
    const app = await prisma.app.findUnique({
      select: {
        appId: true,
        name: true,
        iconUrl: true,
        blockChainId: true,
        promotionalText: true,
        detailDescription: true,
        bannerUrl: true,
        siteUrl: true,
        cardUrl: true,
        createdAt: true,
        createdId: true,
      },
      where: {
        appId,
      },
    });

    const appStatusHistories = await prisma.appReleaseReviewHistory.findMany({
      where: {
        appId: appId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    let status;
    if (appStatusHistories?.length > 0) {
      const isReleased = appStatusHistories.find(
        (status) => status.statusCd === 'RELEASED'
      );
      if (appStatusHistories[0].statusCd === 'CANCELED') {
        if (isReleased) status = 'RELEASED';
        else status = 'Preparation';
      } else status = appStatusHistories[0].statusCd;
    } else status = 'Preparation';

    const { languages, platformUrls, screenUrls } =
      await this.getAppDynamicFields(appId);

    if (!app) throw this.noContent();

    return {
      ...app,
      languages,
      platformUrls,
      screenUrls,
      status,
    } as AppDetailResponseType;
  };

  getAppDynamicFields = async (appId: number) => {
    const languagesQueryResult: { language: string }[] = await prisma.$queryRaw`
            SELECT
                MAX(CASE WHEN aggregate_cd = 'LANGUAGE' THEN \`string\` ELSE NULL END) AS language
            FROM app_detail_aggregate
            WHERE 1=1 
            and app_id = ${appId}
            and aggregate_group_cd  = 'APP_DTL_LANG'
            GROUP BY row_id;
      `;
    const platformUrlsQueryResult: {
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
    const screenUrlsQueryResult: { screenUrl: string }[] =
      await prisma.$queryRaw`
            SELECT
                MAX(CASE WHEN aggregate_cd = 'SCREEN_URL' THEN \`string\` ELSE NULL END) AS screenUrl
            FROM app_detail_aggregate
            WHERE 1=1 
            and app_id = ${appId}
            and aggregate_group_cd  = 'APP_DTL_SCRSHT'
            GROUP BY row_id;
      `;
    const languages = languagesQueryResult.map((result) => result.language);
    const screenUrls = screenUrlsQueryResult.map((result) => result.screenUrl);

    const platformUrls: PlatformUrl[] = platformUrlsQueryResult.map(
      (result) => {
        return {
          platform: result.platform,
          url: result.installUrl,
        };
      }
    );
    return { languages, screenUrls, platformUrls };
  };

  findManyApps = async (
    userId: bigint,
    queryParams: FindMAnyAppsQueryParams
  ) => {
    const { pageSize, pageNo, name } = queryParams;
    const { take, skip } = new PageRequest({ pageSize, pageNo });

    const queryResult: { appId: number }[] = await prisma.$queryRaw`
    SELECT aw.app_id as appId
    FROM workspace_member wm 
    INNER JOIN app_workspace aw on aw.workspace_id  = wm.workspace_id 
    WHERE wm.member_id = ${userId};`;

    const appIds = queryResult.map((f) => f.appId);
    let total;

    if (pageSize && pageNo) {
      total = await prisma.app.count({
        where: {
          AND: [{ appId: { in: appIds } }, { name: { contains: name ?? '' } }],
        },
        orderBy: { appId: 'asc' },
      });
    }

    const apps: FindManyAppsQueryResponse[] = await prisma.app.findMany({
      where: {
        AND: [{ appId: { in: appIds } }, { name: { contains: name ?? '' } }],
      },
      select: {
        appId: true,
        name: true,
        iconUrl: true,
        appWorkspace: {
          select: {
            workspaceId: true,
            defaultYn: true,
          },
        },
        appWallet: {
          select: {
            wallet: {
              select: {
                approveWallet: {
                  select: { address: true },
                },
              },
            },
          },
        },
      },
      orderBy: { appId: 'asc' },
      take,
      skip,
    });

    if (!apps || !apps.length) throw this.noContent();

    return { data: apps, total: total || apps.length };
  };

  createAppApiKeys = async (
    request: CreateAppApiKeyRequest,
    userId: bigint
  ) => {
    //
    const { appId, name } = request;

    if (name === 'DEFAULT')
      throw this.parameterError('DEFAULT is not allowed for name.');

    const { secret, id } = await this.fetchGenerateClient(appId, name);

    const data = await prisma.appApiKey.createMany({
      data: [
        {
          key: id.replaceAll('-', ''),
          appId,
          name,
          expireDt: new Date(this.DEFAULT_API_KEY_EXPIRY_DATE),
          apiKeyKindCd: 'CLIENT_ID',
          createdId: Number(userId),
        },
        {
          key: secret,
          appId,
          name,
          expireDt: new Date(this.DEFAULT_API_KEY_EXPIRY_DATE),
          apiKeyKindCd: 'CLIENT_SECRET',
          createdId: Number(userId),
        },
      ],
    });
    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'API Key created',
      appId,
      description: `${name} API Key has been created.`,
    };
    return { data, events: [event] };
  };
  //
  findManyAppApiKeys = async (appId: number) => {
    //
    const appApiKeys = await prisma.appApiKey.findMany({
      where: {
        appId,
      },
      select: {
        appId: true,
        apiKeyId: true,
        key: true,
        name: true,
        apiKeyKindCd: true,
        expireDt: true,
      },
    });

    if (!appApiKeys || !appApiKeys.length) throw this.noContent();

    return appApiKeys.map((apiKey) => {
      return {
        ...apiKey,
        name: `${apiKey.apiKeyKindCd}_${apiKey.name}`,
        key: this.convertToUUID(apiKey.key),
      };
    });
  };

  convertToUUID = (value: string) => {
    if (value.length === 32) {
      return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(
        12,
        16
      )}-${value.slice(16, 20)}-${value.slice(20)}`;
    } else {
      return value;
    }
  };
  //
  deleteAppApiKey = async (apiKeyId: number) => {
    //
    const data = await prisma.appApiKey.delete({
      where: {
        apiKeyId,
      },
    });

    const event: EventParamsType = {
      type: 'Settings',
      eventName: 'API Key removed',
      appId: data.appId,
      description: `${data.name} API Key has been removed`,
    };
    return { data, events: [event] };
  };

  getAppWalletBalances = async (chainId: SupportChainId, appId: number) => {
    const wallet = await this.bizCommonService.getWalletByAppId(appId);

    if (!wallet) throw this.noContent('app wallet does not exist.');
    console.time('async-promiseAll');
    if (wallet) {
      const { address, encPrivateKey } = wallet;

      const sdk = getAppSDK(
        new CryptoUtil().decipherString(encPrivateKey),
        chainId
      );

      // ADD ERC20 token (PMG, PMR, PME) balances
      const balancesPromises = getErc20ContractListByChainId(chainId).map(
        (item) =>
          this.walletService.getErc20Balance(
            chainId,
            item.contractAddress,
            address
          )
      );

      // ADD Native token (BNB) balance
      // TODO: CHECK native token address zero
      balancesPromises.push(sdk.wallet.balance());

      const fulfilledResults = await Promise.allSettled(balancesPromises);
      const result = fulfilledResults
        .filter(this.isFulfilledResult)
        .map((data) => {
          const contract = this.getContract(chainId, data.value.symbol);
          return {
            ...data.value,
            iconUrl: contract?.iconUrl,
            contractAddress: contract?.contractAddress,
          };
        });

      console.timeEnd('async-promiseAll');

      return result;
    }
  };

  // PromiseSettledResult의 value 속성을 가진 객체인지 확인하는 타입 가드
  isFulfilledResult<T>(
    result: PromiseSettledResult<T>
  ): result is PromiseFulfilledResult<T> {
    return result.status === 'fulfilled';
  }

  getContract = (chainId: SupportChainId, symbol: string) => {
    return getErc20ContractListByChainId(chainId).find(
      (contract) => contract.symbol === symbol
    );
  };
}
