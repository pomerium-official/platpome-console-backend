import aws from 'aws-sdk';
import { randomUUID } from 'crypto';
import FormData from 'form-data';
import { BaseService } from '@/base-common/base-service';

export class S3Instance {
  private s3;

  constructor() {
    aws.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
      region: process.env.NEXT_PUBLIC_S3_REGION,
      signatureVersion: 'v4',
    });
    this.s3 = new aws.S3();
  }

  upload = async (file: Express.Multer.File) => {
    const fileExt = file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1
    );

    const fileChgName = randomUUID() + '.' + fileExt;
    const post = await this.s3.createPresignedPost({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Fields: {
        key: process.env.NEXT_PUBLIC_S3_PATH + fileChgName,
      },
      Expires: 60, // seconds
      // Conditions: [
      //   ['content-length-range', 0, 50000000], // up to 50 MB
      // ],
    });

    const { url, fields } = post;

    const { key } = fields;
    const fileSize = file.size;
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf('.')
    );
    const path = key;
    const fileUrl = `${url}/${key}`;

    const formData = new FormData();

    Object.entries(fields).forEach(([field, value]) =>
      formData.append(field, value)
    );
    formData.append('file', file.buffer);

    await new Promise((resolve, reject) => {
      return formData.submit(url, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    }).catch((e) => {
      throw new BaseService().internalServerError(e);
    });

    return {
      fileName,
      fileChgName,
      path,
      fileExt,
      fileSize,
      fileUrl,
    };
  };
}
