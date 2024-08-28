export const regexKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
export const regExpPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~^()$@!%*#?&])[A-Za-z\d~^()$@!%*#?&]{8,20}$/i;
export const regExpResidentRegistrationNumber =
  /(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
export const regExpPhoneNumber = /^01([016789])([0-9]{3,4})([0-9]{4})$/;
export const regExpUserName = /[^a-zA-Zㄱ-ㅎ가-힣 ]/g;
