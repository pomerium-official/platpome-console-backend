import jwt, { sign } from 'jsonwebtoken';
import { SECONDS } from '@/common/libs/constants';

export class JWTUtil {
  //
  readonly #JWTSalt;
  readonly #expiryTime;
  #DEFAULT_EXPIRY_TIME = 1800 * SECONDS;

  constructor(expirationTime?: number) {
    this.#JWTSalt = process.env.JWT_VERIFY_SALT!;
    this.#expiryTime = expirationTime ?? this.#DEFAULT_EXPIRY_TIME;
  }

  generate = (dataObj: any) => {
    return sign(
      { ...dataObj, exp: new Date().getTime() + this.#expiryTime },
      this.#JWTSalt
    );
  };

  verify = (tokenObj: any) => {
    const obj = jwt.decode(tokenObj);
    if (!obj) return false;
    const verifyResult = jwt.verify(
      sign(obj, this.#JWTSalt),
      this.#JWTSalt,
      { algorithms: ['HS256'] },
      function (error, result) {
        if (error) {
          console.log('[jwtVerifyError]', error);
          return undefined;
        } else {
          return result;
        }
      }
    );
    if (verifyResult !== undefined) {
      const { exp } = verifyResult;
      if (exp < new Date().getTime()) {
        console.log('[jwtExpiredError]');
        throw new Error('jwt expired');
      }
    }
    return verifyResult !== undefined;
  };
}
