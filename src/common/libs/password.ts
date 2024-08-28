import bcrypt from 'bcryptjs';

/**
 * 비밀번호를 암호화합니다.
 * @param password
 */
export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password + process.env.PASSWORD_APPEND_SALT, salt);
};
/**
 * 비밀번호를 비교합니다.
 * @param encryptedPassword 암호화한 비밀번호 (hash)
 * @param plainPassword 암호화 되지 않은 비밀번호
 */
export const comparePassword = (
  plainPassword: string,
  encryptedPassword: string
) => {
  return bcrypt.compareSync(
    plainPassword + process.env.PASSWORD_APPEND_SALT,
    encryptedPassword
  ); // false
};
