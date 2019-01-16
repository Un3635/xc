import AppConfig from '../config';
import API from './api';

/**
 * 验证码登录接口
 * @param {string} countryNum 国别号
 * @param {string} phone 手机号
 * @param {string} code 验证码
 * @param {string} inviteCode 邀请码
 * @param {string} codeToken 验证码的识别码
 * @returns {Promise<*>}
 */
const phoneLogin = ({countryNum, phone, code, inviteCode, codeToken}) => API.$post(AppConfig.login, {
  countryNum: countryNum,
  phone: phone,
  code: code,
  invitedCode: inviteCode,
  codeToken: codeToken
});

/**
 * 密码登录接口
 * @param {string} account 账户
 * @param {string} password 密码
 * @param {string} validData 网易图形验证码
 * @returns {Promise<*>}
 */
const pwdLogin = (account, password, validData) => API.$post(AppConfig.pwdLogin, {
  account: account,
  password: password,
  validData: validData
});

/**
 * 发送验证码接口
 * @param {object} params 参数
 * @param {string} params.countryNum 国别号
 * @param {string} params.account 手机号/邮箱地址
 * @param {number} params.type 验证码类型 1 登录 2 注册 3 找回密码 4 重置密码
 * @param {string} params.validData 网易图形验证码
 * @returns {Promise<*>}
 */
const sendCode = params => API.$post(AppConfig.smsCode, {
  countryNum: params.countryNum,
  account: params.account,
  type: params.type,
  validData: params.validData
});

/**
 * 注册接口
 * @param {string} countryNum 国别号
 * @param {string} account 手机号/邮箱地址
 * @param {string} password 密码
 * @param {string} code 验证码
 * @param {string} codeToken 验证Token
 * @param {string} invitedCode 邀请码
 * @returns {Promise<*>}
 */
const register = (countryNum, account, password, code, codeToken, invitedCode) => API.$post(AppConfig.register, {
  countryNum: countryNum,
  account: account,
  password: password,
  code: code,
  codeToken: codeToken,
  invitedCode: invitedCode
});

/**
 * 修改密码接口
 * @param {string} account 手机号码/邮箱账号
 * @param {string} password 密码
 * @param {string} code 验证码
 * @param {string} codeToken 验证码的识别码
 * @returns {Promise<*>}
 */
const changePwd = (account, password, code, codeToken) => API.$post(AppConfig.changePassword, {
  account: account,
  password: password,
  code: code,
  codeToken: codeToken
});

const SignAPI = {
  phoneLogin,
  pwdLogin,
  sendCode,
  register,
  password: changePwd
};

// 发送验证码类型
export const VerifyCodeType = {
  LOGIN: 1,    // 登录
  REGISTER: 2, // 注册
  BACK_PWD: 3, // 找回密码
  RESET_PWD: 4 // 重置密码
};

export default SignAPI;

