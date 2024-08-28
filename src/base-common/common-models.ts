/**
 * 토큰 사용자 정보
 */
export interface AccessTokenInfo {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: { roles: string[] };
  resource_access: { account: { roles: string[] } };
  scope: string;
  sid: string;
  email_verified: true;
  gender: string;
  nickname: string;
  preferred_username: string;
  email: string;
}

export interface SessionToken {
  refreshToken: string;
}
