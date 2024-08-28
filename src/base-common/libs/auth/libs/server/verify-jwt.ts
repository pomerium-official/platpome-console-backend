// JWK Set URL 설정
import { certUrl } from '../shared/oidc-urls';
import jwt, { JsonWebTokenError, VerifyOptions } from 'jsonwebtoken';
import {
  JwtError,
  JwtErrorCode,
} from '@/base-common/libs/auth/libs/shared/jwt-error';
import { ConsoleMember } from '@prisma/client';
import { fetchJWKs } from '@/base-common/libs/auth/libs/shared/public-key';
import { AccessTokenInfo } from '@/base-common/common-models';

export interface ConsoleAccessTokenInfo extends AccessTokenInfo {
  consoleMemberInfo: ConsoleMember;
}

/**
 * JWT 검증 함수
 * @param token
 * @param option
 * @param scopes
 * @param keyUrl
 */
export async function verifyJwt(
  token: string,
  option?: VerifyOptions,
  scopes?: string[],
  keyUrl = certUrl
) {
  try {
    const jwtParts = token.split('.');

    if (jwtParts.length !== 3) {
      throw new JwtError(JwtErrorCode.MalformedToken);
    }

    const jwks = await fetchJWKs(keyUrl, true);
    if (jwks === null) {
      throw new JwtError(JwtErrorCode.KeyNotFound);
    }

    const header = jsonParse(atob(jwtParts[0]));

    const key = jwks.find((jwk: { kid: string }) => jwk.kid === header.kid);

    if (!key) {
      throw new JwtError(JwtErrorCode.KeyNotFound);
    }
    const publicKey = key.x5c[0];
    const cert = `-----BEGIN CERTIFICATE-----\n${publicKey}\n-----END CERTIFICATE-----`;

    const decoded = jwt.verify(token, cert, option) as ConsoleAccessTokenInfo;

    if (scopes) {
      for (const scope of scopes) {
        if (!decoded.scope.includes(scope)) {
          throw new Error('JWT does not contain required scope.');
        }
      }
    }

    return decoded;
  } catch (e) {
    console.log('>>>>>>>>>keyUrl', keyUrl);
    console.log('>>>>>>>>>verifyJWT error', e);
    if (
      e instanceof JsonWebTokenError ||
      JSON.stringify(e).includes('TokenExpiredError')
    ) {
      return false;
    } else {
      throw e;
    }
  }
}

function jsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    throw new JwtError(JwtErrorCode.MalformedToken);
  }
}
