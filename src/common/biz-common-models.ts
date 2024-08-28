/**
 * 콘솔 활동로그 기록 Request
 */
export interface CreateActivityLogParams {
  account: string;
  appId: number;
  profile?: string;
  memberId: number;
  ipAddress: string;
  method?: string;
  type?: string;
  txId?: string;
  activity?: string;
  description?: string;
  os: string;
  browser: string;
  requestBody?: string;
  createdAt: Date;
}
