import nodemailer, { Transporter } from 'nodemailer';
import { JWTUtil } from '@/common/libs/jwt-util';

export class MailSender {
  //
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'kimsw@blocksmith.xyz',
        pass: 'ikeklezahttajpqo',
      },
    });
  }

  sendInvitationMail = async (
    to: string,
    authorityCode: string,
    invitationId: number
  ) => {
    //
    const tokenObj = new JWTUtil().generate({
      email: to,
      authorityCode,
      invitationId,
    });

    const mailSendResult = await this.transporter.sendMail({
      to,
      subject: 'Invitation',
      html: `
      <div style="text-align: center;">
        <h3>초대 메일 샘플</h3>
        <a href="http://www.naver.com?token=${tokenObj}"><h3>이동하기</h3></a>
      </div>`,
    });
    return !!mailSendResult;
  };
}
