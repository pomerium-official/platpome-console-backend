import { Get, Request, Route, Security, Tags } from '@tsoa/runtime';
import { context } from '@/context';
import { PrivateRequest } from '@/base-common/common-request';

/**
 * Ping응답
 */
export interface PingResponse {
  /**
   * 메시지
   */
  message: string;
}

@Route('/ping')
@Tags('Sample')
// @Hidden()
export class PingController {
  @Get('/')
  public async getMessage(): Promise<PingResponse> {
    return {
      message: 'pong',
    };
  }

  @Get('/db')
  public async getMessageDB(): Promise<PingResponse> {
    const commonCodeCount = await context.prisma.commonCode.count();
    return {
      message: 'pong commonCodeCount: ' + commonCodeCount,
    };
  }

  @Security('token')
  @Security('cookie')
  @Security('devAuth')
  @Get('/security')
  public async getMessageSecurity(
    @Request() request: PrivateRequest
  ): Promise<PingResponse> {
    console.log(request.user);
    return {
      message: JSON.stringify(request.user),
    };
  }
}
