import { BaseService } from '@/base-common/base-service';
import { AttachFile, CommonCode, Prisma } from '@prisma/client';
import { prisma } from '@/context';
import {
  CommonCodeGroupQueryResponse,
  FindManyCodeGroupsQueryParams,
  FindManyCodesQueryParams,
  SendCertificationSMSRequest,
} from '@/common/common-models';
import { PageRequest } from '@/common/libs/page-request';
import axios from 'axios';
import { MINUTES } from '@/common/libs/constants';
import { S3Instance } from '@/common/libs/s3-instance';

export class CommonService extends BaseService {
  s3Instance = new S3Instance();

  //
  findManyCodeGroups = async (queryParams: FindManyCodeGroupsQueryParams) => {
    //
    const { pageNo, pageSize, name } = queryParams;

    let skip, take;

    if (pageSize && pageNo) {
      const pageRequest = new PageRequest({ pageSize, pageNo });
      skip = pageRequest.skip;
      take = pageRequest.take;
    }

    const codeGroups: CommonCodeGroupQueryResponse[] =
      await prisma.commonCodeGroup.findMany({
        where: {
          name: { contains: name ?? '' },
        },
        select: {
          codeGroup: true,
          name: true,
          description: true,
          order: true,
        },
        take,
        skip,
        orderBy: {
          order: 'asc',
        },
      });

    if (!codeGroups || codeGroups.length === 0) throw this.noContent();

    return { data: codeGroups, total: codeGroups.length };
  };
  //
  findManyCodes = async (queryParams: FindManyCodesQueryParams) => {
    //
    const { pageNo, pageSize, codeGroup } = queryParams;

    let total = undefined;
    const { skip, take } = new PageRequest({ pageSize, pageNo });

    if (pageSize && pageNo) {
      total = await prisma.commonCode.count({
        where: {
          commonCodeGroup: {
            codeGroup: {
              contains: codeGroup ?? '',
            },
          },
        },
      });
    }

    const codes: CommonCode[] = await prisma.$queryRaw`
    SELECT
      code_group as codeGroup,  
      code,
      name, 
      description,
      \`order\` 
    FROM common_code c
    WHERE 1=1
    ${codeGroup ? Prisma.sql`AND  code_group = ${codeGroup}` : Prisma.empty}
    ORDER BY code_group ,\`order\` ASC
    ${pageNo && pageSize ? Prisma.sql`LIMIT ${skip}, ${take}` : Prisma.empty}
    `;

    if (!codes || codes.length === 0) throw this.noContent();

    return { data: codes, total: total || codes.length };
  };

  //
  uploadS3 = async (file: Express.Multer.File) => {
    //
    const uploadResponse = await this.s3Instance.upload(file);
    return await this.createAttachFile(uploadResponse);
  };

  //
  createAttachFile = async (attachFile: {
    fileName: string;
    fileChgName: string;
    path: string;
    fileExt: string;
    fileSize: number;
    fileUrl: string;
  }) => {
    //
    const createdAttachFile: AttachFile = await prisma.attachFile.create({
      data: {
        ...attachFile,
        createdId: -1,
      },
    });
    return createdAttachFile;
  };

  //
  generateCertificationCode = () => {
    //
    return String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
  };

  //
  sendCertificationSMS = async (request: SendCertificationSMSRequest) => {
    //
    const code = this.generateCertificationCode();
    const { nationCodeNumber, phone: phoneNo, consoleMemberName } = request;
    let phone = phoneNo;
    if (nationCodeNumber === '82' && phone.charAt(0) !== '0') {
      phone = `0${phone}`;
    }

    const messageId = await this.sendSMS(nationCodeNumber, phone, code);
    const presentCertification = await prisma.smsCertification.findFirst({
      where: {
        nationCodeNumber,
        consoleMemberName,
        phone,
      },
    });

    if (
      presentCertification &&
      Number(presentCertification.endTime) - 4 * MINUTES > new Date().getTime()
    )
      throw this.alreadyExist('certification already sent in a minute.');

    if (!messageId)
      throw this.internalServerError('failed to send certification SMS');

    const startTime = new Date().getTime();
    const endTime = startTime + 5 * MINUTES;

    const createdSMSCertification = await prisma.smsCertification.create({
      data: {
        messageId,
        code,
        startTime,
        endTime,
        consoleMemberName,
        nationCodeNumber,
        phone,
        expireYn: 'N',
        createdId: -1,
      },
    });
    return {
      messageId: createdSMSCertification.messageId,
      expiryTime: endTime,
    };
  };

  //
  sendSMS = async (
    nationCode: string,
    phoneNumber: string,
    certificationCode: string
  ) => {
    const sendResponse = await axios.post(
      `${process.env.SEND_SMS_URL}`,
      {
        code: certificationCode,
        phone: `+${nationCode}${phoneNumber.replaceAll('-', '').substring(1)}`,
      },
      {
        headers: {
          'X-API-KEY': `${process.env.SEND_SMS_KEY}`,
        },
      }
    );
    return sendResponse.data;
  };

  //
  certificateCode = async (messageId: string, code: string) => {
    //
    const smsCertification = await prisma.smsCertification.findUnique({
      where: {
        messageId,
      },
    });
    const now = new Date().getTime();
    if (!smsCertification)
      throw this.noContent(`no certification with messageId => ${messageId}`);
    if (Number(smsCertification.endTime) < now)
      throw this.expirationError('certification is already expired.');
    if (smsCertification.code !== code)
      throw this.parameterError('code is invalid.');
    await prisma.smsCertification.delete({
      where: {
        messageId,
      },
    });
  };
}
