import {AppConfig} from './config';
import API from './api';

/**
 * 密码登录接口
 * @param {string} account   账户
 * @param {string} password  密码
 * @returns {Promise<*>}
 */
const pwdLogin = (account, password) => API.$post(AppConfig.pwdLogin, {
  account,
  password
});

/**
 * 注册接口
 * @param {string} account 账号
 * @param {string} password 密码
 * @param {string} code 验证码
 * @param {string} codeToken 验证Token
 * @returns {Promise<*>}
 */
const register = (account, password, code, codeToken) => API.$post(AppConfig.register, {
  account,
  password,
  code,
  codeToken
});

/**
 * 重置密码
 * @param {string} account 账号
 * @param {string} password 密码
 * @param {string} code 验证码
 * @param {string} codeToken 验证码的识别码
 * @returns {Promise<*>}
 */
const changePwd = (account, password, code, codeToken) => API.$post(AppConfig.changePassword, {
  account,
  password,
  code,
  codeToken
});

const SignAPI = {
  pwdLogin,
  register,
  password: changePwd
};

export default SignAPI;

