import AppConfig from '../config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 发送验证码
 * @param {string} mobile 手机号
 * @param {string} areaCode 区域码,eg.+86
 * @returns {Promise<*>}
 */
const sendVerifyCode = (mobile, areaCode) => API.$post(AppConfig.sendVerifyCode, {
  smsMobile: mobile,
  countryNum: areaCode
});

/**
 * 发送验证码(手机号码/邮箱地址)
 * @param {string} countryNum 国别号码,默认+86
 * @param {string} account 手机号码/邮箱地址
 * @param {string} type 验证码类型 1 登录 2 注册 3 找回密码 4 重置密码 5 绑定邮箱，手机
 * @returns {Promise<*>}
 */
const smsCode = ({countryNum, account, type}) => API.$post(AppConfig.smsCode, {
  countryNum,
  account,
  type
});

/**
 * 登录接口
 * @param {string} mobile 手机号
 * @param {string} verifyCode 验证码
 * @param {string} areaCode 区域码,eg.+86
 * @param {string} inviteCode 邀请码
 * @param {string} channel 渠道号
 * @returns {Promise<*>}
 */
const login = (mobile, verifyCode, areaCode, inviteCode, channel) => API.$post(AppConfig.login, {
  mobile,
  smsCode: verifyCode,
  countryNum: areaCode,
  invitationCode: inviteCode,
  channel: channel
});

/**
 * 用户邀请码信息
 * @returns {Promise<*>}
 */
const inviteCodeInfo = () => TokenAPI.getValid().then(token => API.$post(AppConfig.inviteCodeInfo, {token}));

/**
 * 被邀请人信息
 * @param {number} status 被邀请人状态
 * @param {number} currentPage 获取页码
 * @param {number} pageSize 分页大小,默认为10
 * @returns {Promise<*>}
 */
const inviteeInfo = (status, currentPage, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.inviteeInfo, {
  status,
  currentPage,
  pageSize,
  token
}));

/**
 * 获取用户账户详情信息
 * @returns {Promise<*>}
 */
const balanceInfo = () => TokenAPI.getValid().then(token => API.$post(AppConfig.balanceInfo, {token}));

/**
 * 获取指定批次的奖励详情信息 eg.好友首次下单，最多奖励?元*?台
 * @param {string}  batchNo  批次号
 * @returns {Promise<*>}
 */
const rewardInfo = batchNo => TokenAPI.getValid().then(token => API.$post(AppConfig.rewardInfo, {token, batchNo}));

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
 * 绑定账号：手机号或者邮箱
 * @param {string}  mobile  手机号
 * @param {string}  email  邮箱
 * @param {string}  password  密码(非必须)
 * @param {string}  code  验证码
 * @param {string}  codeToken  验证码token
 * @returns {Promise<*>}
 */
const bindAccount = ({mobile, email, password, code, codeToken}) => TokenAPI.getValid().then(token => API.$post(AppConfig.bindAccount, {
  token,
  mobile,
  email,
  password,
  code,
  codeToken
}));

/**
 * 实名认证
 * @param {string}  name  用户姓名
 * @param {string}  id  身份证号
 * @returns {Promise<*>}
 */
const certify = ({name, id}) => TokenAPI.getValid().then(token => API.$post(AppConfig.certify, {
  token,
  name,
  id
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
 * @param {integer}  curryencyId  用户钱包id
 * @param {string}  address  用户钱包地址
 * @param {string}  note  备注
 * @returns {Promise<*>}
 */
const addWallet = ({curryencyId, address, note}) => TokenAPI.getValid().then(token => API.$post(AppConfig.addWallet, {
  token,
  curryencyId,
  address,
  note
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
 * 余额提现
 * @param {double}  withdrawMoney  提现金额
 * @param {string}  remitName  汇款人姓名
 * @param {string}  remitBankNo  汇款人银行账号
 * @param {string}  remitBankName  开户银行名称
 * @returns {Promise<*>}
 */
const userWithdrawInfo = ({withdrawMoney, remitName, remitBankNo, remitBankName}) => TokenAPI.getValid().then(token => API.$post(AppConfig.userWithdrawInfo, {
  token,
  withdrawMoney,
  remitName,
  remitBankNo,
  remitBankName
}));

/**
 * 用户余额充值
 * @param {integer}  amount  谷歌验证码
 * @returns {Promise<*>}
 */
const recharge = amount => TokenAPI.getValid().then(token => API.$post(AppConfig.recharge, {
  token,
  amount
}));
/**
 * 获取用户邀请信息记录
 * @param {integer}  status  状态
 *  @param {integer}  pageNum  当前页 初始 1
 *  @param {integer}  pageSize  数据条数初始 10
 * @returns {Promise<*>}
 */
const getInviteRecordList = (status, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.getInviteRecordList, {
  token,
  status,
  pageNum,
  pageSize
}));
// 获取算力奖励信息
const getUserEntrustRewardList = (rewardType, rewardStatus, pageNum, pageSize, unit) => TokenAPI.getValid().then(token => API.$post(AppConfig.getUserEntrustRewardList, {
  token,
  rewardType,
  rewardStatus,
  pageNum,
  pageSize,
  unit
}));
// 获取用户奖励信息
const getUserEntrustRewardInfo = (rewardType, unit) => TokenAPI.getValid().then(token => API.$post(AppConfig.getUserEntrustRewardInfo, {
  token,
  rewardType,
  unit
}));
// 获取我的邀请首页算力等信息
const inviteCurrenyList = () => TokenAPI.getValid().then(token => API.$post(AppConfig.inviteCurrenyList, {token}));
// 邀请码详情算力信息
const getcomputingIfor = (computingUnit) => TokenAPI.getValid().then(token => API.$post(AppConfig.getcomputingIfor, {
  token,
  computingUnit
}));
// 邀请码详情ETH/sc等信息
const getCurrencyInfor = (currencyId) => TokenAPI.getValid().then(token => API.$post(AppConfig.getCurrencyInfor, {
  token,
  currencyId
}));

/**
 * 获取订单优惠信息
 * @param {integer} awardType 奖励类型
 * @returns {Promise<*>}
 */
const getAwardOrderInfo = (awardType, token) => TokenAPI.getValid().then(token => API.$post(AppConfig.getAwardOrderInfo, {
  awardType,
  token
}));

/**
 * 获取返现奖励信息
 * @param {integer} status 状态
 * @param {integer} pageNum 页码
 * @param {integer} pageSize 每页条数
 * @returns {Promise<*>}
 */
const getAwardOrderList = (status, pageNum, pageSize, token) => TokenAPI.getValid().then(token => API.$post(AppConfig.getAwardOrderList, {
  status,
  pageNum,
  pageSize,
  token
}));

const UserAPI = {
  sendVerifyCode,
  login,
  inviteCodeInfo,
  inviteeInfo,
  balanceInfo,
  rewardInfo,
  userInfo,
  googleAuth,
  bindGoogleAuth,
  smsCode,
  bindAccount,
  certify,
  verify,
  addWallet,
  passwordByOld,
  userWithdrawInfo,
  recharge,
  getUserEntrustRewardList,
  getInviteRecordList,
  inviteCurrenyList,
  getUserEntrustRewardInfo,
  getcomputingIfor,
  getCurrencyInfor,
  getAwardOrderList,
  getAwardOrderInfo
};

export default UserAPI;

