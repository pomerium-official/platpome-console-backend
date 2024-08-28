import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import { loadErrorHandlers } from '@/common/libs/error-handling';
import { RegisterRoutes } from '@/generated/tsoa/routes';
import Moralis from 'moralis';
import { setContracts, startAssertion } from '@/start-assertion';

// swagger document json을 공유하지 않을 때 파일로 직접 import
// import swaggerDocument from '../public/swagger.json';

const port = parseInt(process.env.PORT!, 10) || 3000;
// const dev = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const main = async () => {
  await startAssertion();
  await setContracts();

  const app = express();

  app.use(
    cors({ origin: process.env.ALLOW_ORIGINS!.split(','), credentials: true })
  );
  app.use(express.static('public'));
  app.use(compression());
  app.use(cookieParser());
  app.use(useragent.express());
  app.set('trust proxy', true);

  // 스웨거 세팅.
  if (process.env.HIDE_API_DOCS !== 'true') {
    //// swagger document json을 공유하지 않을 때 파일로 직접 import
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(
      `/docs`,
      swaggerUi.serveWithOptions({ redirect: false }),
      // swaggerUi.setup(swaggerDocument)
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: `/swagger.json`,
        },
      })
    );
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  RegisterRoutes(app);
  loadErrorHandlers(app);

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});
main().then();
//
// //TODO 노드 배치 추후 별도 배치개발 필요
// // 23시 50분마다 작업 수행
// // 처리 대상을 가져올 때 당일 날짜로 가져와야하기 때문에 23시 50분으로 설정함
// // TODO 테스트를위해 매 분 돌도록 설정했음. 되돌려야함
// nodeCron.schedule('* * * * *', async () => {
//   // nodeCron.schedule('50 23 * * *', async () => {
//   if (process.env.USE_BATCH_PROCESS !== 'true') return;
//
//   try {
//     // 테스트 매 초 실행
//     // nodeCron.schedule('1-59 * * * * *', async () => {
//
//     console.log('[batch][구독결제취소] 시작');
//
//     // TODO 처리중인 경우 또 실행하지 않도록 방어 코드 필요 분리 개발시 필요없음.
//     // TODO 배치 실패시 알림 코드 필요. SNS나 이메일로 관리자에게 알림
//
//     console.log('[batch][구독결제취소] 취소 대상 조회 시작');
//     // 결제 히스토리 테이블에서 구독취소상태이면서 결제일이 오늘인 목록을 가져온다.
//     const targetRows: {
//       customer_uid: string;
//       merchant_uid: string;
//       no: string;
//       member_id: number;
//     }[] = await context.prisma.$queryRaw`
//             SELECT customer_uid, merchant_uid, no, member_id
//             FROM settlement s
//             WHERE schedule_status is null
//             AND subscribe_yn ='N'
//             AND DATE_FORMAT(auto_pay_dt, '%Y-%m-%d') <= CURDATE();
//       `;
//     console.log(
//       `[batch][구독결제취소] 취소 대상 조회 종료 : ${JSON.stringify(
//         targetRows
//       )}`
//     );
//
//     // TODO thread Count limit 기능
//     // 결제 취소 API 호출
//     const jobs = targetRows.map((row) => {
//       return new Promise((resolve, reject) => {
//         const { customer_uid, merchant_uid, no } = row;
//         console.log(`[batch][구독결제취소] 취소 시작 ${JSON.stringify(row)}`);
//
//         axios
//           .post(
//             `${process.env.NEXT_PUBLIC_API_USER_URL}/api/ie/common/settlements/scheduleCancel`,
//             {
//               app: 'IE',
//               customerUid: customer_uid,
//               merchantUid: merchant_uid,
//               no,
//             }
//           )
//           .then((response) => {
//             resolve(response);
//           })
//           .catch((e) => {
//             reject(e);
//           });
//       });
//     });
//
//     const cancelJobResults = await Promise.allSettled(jobs);
//
//     console.log(
//       `[batch][구독결제취소] 취소 종료 ${JSON.stringify(cancelJobResults)}`
//     );
//
//     console.log(`[batch][구독결제취소] 충전중인 장비 충전 종료 처리 시작`);
//
//     const canceledMemberIds: number[] = [];
//     cancelJobResults.forEach((cancelJobResult, index) => {
//       if (cancelJobResult.status === 'fulfilled') {
//         if (targetRows[index]) {
//           canceledMemberIds.push(targetRows[index].member_id);
//         }
//       }
//     });
//     console.log(
//       `[batch][구독결제취소] 충전중인 장비 충전 종료 처리 memberIds ${JSON.stringify(
//         canceledMemberIds
//       )}`
//     );
//
//     if (canceledMemberIds.length > 0) {
//       const chargingMemberEquipmentIds = await context.prisma.memberEquipmentChargeHistory.findMany(
//         {
//           where: {
//             memberId: { in: canceledMemberIds },
//             chargeStatus: { equals: 'Y' },
//           },
//           select: { memberEquipmentId: true },
//         }
//       );
//       console.log(
//         `[batch][구독결제취소] 충전중인 장비 충전 종료 처리 memberEquipmentIds ${JSON.stringify(
//           chargingMemberEquipmentIds
//         )}`
//       );
//       const cancelChargePromises = chargingMemberEquipmentIds.map(
//         ({ memberEquipmentId }) => {
//           return iotBoardClient.stopCharge(memberEquipmentId);
//         }
//       );
//
//       // TODO iotBoard 취소 실패시 처리
//       await Promise.allSettled(cancelChargePromises);
//       // if (cancelChargePromises && cancelChargePromises.length > 0) {
//       //   const cancelJobResults =
//       // }
//     }
//     console.log(`[batch][구독결제취소] 충전중인 장비 충전 종료 처리 완료`);
//
//     console.log('[batch][구독결제취소] 완료');
//   } catch (e) {
//     console.error(`[batch][구독결제취소] Error : ${JSON.stringify(e)}`);
//   }
// });
