import CryptoJS from 'crypto-js';

export class CryptoUtil {
  //
  readonly #cipherKey;

  constructor() {
    this.#cipherKey = process.env.CIPHER_KEY!;
  }

  cipherString = (value: string) => {
    try {
      return CryptoJS.AES.encrypt(value, this.#cipherKey).toString();
    } catch (e: any) {
      return e;
    }
  };

  decipherString = (cipherText: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.#cipherKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e: any) {
      return e;
    }
  };

  cipherObject = (obj: any) => {
    return this.cipherString(JSON.stringify(obj));
  };

  decipherObject = (cipherText: string) => {
    return JSON.parse(this.decipherString(cipherText));
  };
}
