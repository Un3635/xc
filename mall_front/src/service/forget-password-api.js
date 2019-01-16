import api from './api';
import {AppConfig} from "../config";

export const sendResetPassword = (phone, newPwd, captcha) => api.$post(AppConfig.forgetPwd, null, {
  phone: phone,
  newPwd: newPwd,
  captcha: captcha
});
// export const register = (phone, password, captcha, company) => api.$post(AppConfig.forgetPwd, null, {
//   phone: phone,
//   password: password,
//   captcha: captcha,
//   company: company
// });
// export const judgeCompany = (companyName) => api.$post(AppConfig.forgetPwd, null, {
//   companyName: companyName
// });
// export const login = (phone, password, validate) => api.$post(AppConfig.forgetPwd, null, {
//   phone: phone,
//   password: password,
//   validate: validate
// });
// export const sendSms = (phone,validate, sendType) => api.$post(AppConfig.forgetPwd, null, {
//   phone: phone,
//   validate: validate,
//   sendType:sendType
// });
