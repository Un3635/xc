import {AppConfig} from './config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 发送验证码(手机号码/邮箱地址)
 * @param {string} account 账号
 * @param {string|number} type 类型 ：1 登录 2 注册 3 找回密码 4 重置密码 5 绑定手机  6 订单确定 7 提现 8 添加提币地址 9 信用卡支付
 * @returns {Promise<*>}
 */
const smsCode = ({account, type}) => API.$post(AppConfig.smsCode, {
  account,
  type
});

/**
 * 获取用户基本信息
 * @returns {Promise<*>}
 */
const userInfo = () => TokenAPI.getValid().then(token => API.$get(AppConfig.userInfo, {params: {token}}));

/**
 * 谷歌验证页面
 * @returns {Promise<*>}
 */
const googleAuth = () => TokenAPI.getValid().then(token => API.$post(AppConfig.googleAuth, {token}));

/**
 * 绑定谷歌验证
 * @param {string}  secret  秘钥
 * @param {string}  code  验证码
 * @returns {Promise<*>}
 */
const bindGoogleAuth = ({secret, code}) => TokenAPI.getValid().then(token => API.$post(AppConfig.bindGoogleAuth, {
  token,
  secret,
  code
}));


/**
 * 验证谷歌验证码
 * @param {string}  code  谷歌验证码
 * @returns {Promise<*>}
 */
const verify = (code) => TokenAPI.getValid().then(token => API.$post(AppConfig.verify, {
  token,
  code
}));

/**
 * 添加钱包地址
 * @param {string}  userAccountCurrencyId   币种id
 * @param {string}  address      对应币种钱包地址
 * @param {string}  remark         备注
 * @param {string}  smsCode         短信或邮箱验证码
 * @param {string}  googleCode   google验证码
 * @param {string}  smsCodeToken 短信或邮箱验证码识别码
 * @returns {Promise<*>}
 */
const addWallet = (userAccountCurrencyId, address, remark, smsCode, googleCode, smsCodeToken) => TokenAPI.getValid().then(token => API.$post(AppConfig.addWallet, {
  token,
  userAccountCurrencyId,
  address,
  remark,
  smsCode,
  googleCode,
  smsCodeToken
}));

/**
 * 修改密码／找回密码
 * @param {string}  account  手机号码/邮箱账号
 * @param {string}  newPassword  密码
 * @param {string}  password  旧密码
 * @param {string}  code  验证码
 * @param {string}  codeToken  验证码Token
 * @returns {Promise<*>}
 */
const passwordByOld = ({account, newPassword, password, code, codeToken}) => API.$post(AppConfig.passwordByOld, {
  account,
  newPassword,
  password,
  code,
  codeToken
});

/**
 * 实名认证
 * @param {string}  authenticationType  认证类型（1-日本护照认证；2-日本保险卡认证；3-日本驾照认证）
 * @param {string}  picUrl  认证图片地址
 * @returns {Promise<*>}
 */
const certify = ({authenticationType, picUrl}) => TokenAPI.getValid().then(token => API.$post(AppConfig.certify, {
  authenticationType,
  picUrl,
  token
}));

/**
 * 实名认证信息
 * @returns {Promise<*>}
 */
const getCertifyInfo = () => TokenAPI.getValid().then(token => API.$post(AppConfig.certifyInfo, {
  token
}));

/**
 * 获取实名认证图片全路径
 * @param {string}  urlKey  urlKey
 * @returns {Promise<*>}
 */
const getPicUrl = urlKey => API.$post(AppConfig.getPicUrl, {
  urlKey
});

/**
 * 获取用户包含币种列表
 * @param {string}  type  类型 0:算力 1:矿机
 * @returns {Promise<*>}
 */
const getCurrencyListByType = type => TokenAPI.getValid().then(token => API.$post(AppConfig.currencyList, {
  token,
  type
}));

const UserAPI = {
  userInfo,
  googleAuth,
  bindGoogleAuth,
  smsCode,
  verify,
  addWallet,
  passwordByOld,
  certify,
  getCertifyInfo,
  getPicUrl,
  getCurrencyListByType
};

export default UserAPI;

// 发送验证码类型
export const VerifyCodeType = {
  LOGIN: 1,    // 登录
  REGISTER: 2, // 注册
  BACK_PWD: 3, // 找回密码
  RESET_PWD: 4, // 重置密码
  BIND_PHONE: 5, //绑定手机
  WITHDRAWAL_CURRENCY: 7 , //提币
  ADD_WITHDRAWAL_ADDRESS: 8 //添加提现地址
};

