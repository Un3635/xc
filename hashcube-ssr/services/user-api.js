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
 * @param {string|number} type 验证码类型 1 登录 2 注册 3 找回密码 4 重置密码 5 绑定邮箱，6 绑定手机 8 提币 9 绑定地址 10 优惠券转出
 * @param {string} currencyName 验证码类型 1 登录 2 注册 3 找回密码 4 重置密码 5 绑定邮箱，6 绑定手机 8 提币 9 绑定地址
 * @returns {Promise<*>}
 */
const smsCode = ({countryNum, account, type, currencyName = ''}) => API.$post(AppConfig.smsCode, {
  countryNum,
  account,
  type,
  currencyName
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
 * 用户消费额信息
 * @returns {Promise<*>}
 */
const minerInfo = () => TokenAPI.getValid().then(token => API.$post(AppConfig.minerInfo, {token}));
/**
 * 全部被邀请人信息
 * @param {number} status 被邀请人状态
 * @param {number} pageNum 获取页码 默认为1
 * @param {number} pageSize 分页大小,默认为10
 * @returns {Promise<*>}
 */
const allInviteeInfo = (status, pageNum, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.allInviteeInfo, {
  status,
  pageNum,
  pageSize,
  token
}));
/**
 * 被邀请人信息
 * @param {number} status 被邀请人状态
 * @param {number} currentPage 获取页码 默认为1
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
 * 获取返现信息
 * @param {number} status 状态(0:未奖励 1:已奖励)
 * @param {number} pageNum 获取页码
 * @param {number} pageSize 分页大小,默认为10
 * @returns {Promise<*>}
 */
const awardList = (status, pageNum, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.awardList, {
  status,
  pageNum,
  pageSize,
  token
}));
/**
 * 获取算力奖励信息
 * @param {number} rewardType 奖励类型  1算力(T) 2 BTC 3 ETH
 * @param {number} rewardStatus:奖励状态 0未奖励 1已奖励
 * @param {number} pageNum:页码 默认为1
 * @param {number} pageSize:每页条数 默认为10
 * @returns {Promise<*>}
 */
const rewardInviteeInfo = (rewardType, rewardStatus, pageNum, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.rewardInviteeInfo, {
  rewardType,
  rewardStatus,
  pageNum,
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
 * @param {string}  currencyId   币种id
 * @param {string}  address      对应币种钱包地址
 * @param {string}  note         备注
 * @param {string}  code         短信或邮箱验证码
 * @param {string}  googleCode   google验证码
 * @param {string}  smsCodeToken 短信或邮箱验证码识别码
 * @returns {Promise<*>}
 */
const addWallet = (currencyId, address, note, code, googleCode, smsCodeToken) => TokenAPI.getValid().then(token => API.$post(AppConfig.addWallet, {
  token,
  currencyId,
  address,
  note,
  code,
  googleCode,
  smsCodeToken
}));

/**
 * 钱包地址检查
 * @param {string} currencyId   币种ID
 * @param {string} address      钱包地址
 * @returns {Promise<any>}
 */
const walletAddressCheck = (currencyId, address) => TokenAPI.getValid().then(token => API.$get(AppConfig.walletAddressCheck, {
  params: {
    currencyId,
    address,
    token
  }
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
 * @param {object}  params
 * @param {string|number}  params.withdrawMoney  提现金额
 * @param {string}  params.remitName        汇款人姓名
 * @param {string}  params.remitBankNo      汇款人银行账号
 * @param {string}  params.remitBankName    开户银行名称
 * @param {string}  params.remitBankBranch  提现银行支行
 * @param {string}  params.googleCode       谷歌验证码
 * @returns {Promise<*>}
 */
const userWithdrawInfo = (params) => TokenAPI.getValid().then(token => API.$post(AppConfig.userWithdrawInfo, {
  ...params,
  token
}));

/**
 * 用户余额充值
 * @param {string|number}  amount  充值金额
 * @returns {Promise<*>}
 */
const recharge = amount => TokenAPI.getValid().then(token => API.$post(AppConfig.recharge, {
  token,
  amount
}));


/**
 * 用户风险评估分数上报
 * @param {string|number} riskScore 风险评分
 * @returns {Promise<*>}
 */
const riskScore = (riskScore) => TokenAPI.getValid().then(token => API.$post(AppConfig.userRiskScore, {
  token,
  riskScore
}));

/**
 * 算力币种列表
 * @param {number} type 类型  0--算力 1--矿机
 * @returns {Promise<any>}
 */
const getCurrencyListByType = (type) => TokenAPI.getValid().then(token => API.$post(AppConfig.currencyList, {
  token,
  type
}, null, AppConfig.apiEndpoint3));

const UserAPI = {
  sendVerifyCode,
  login,
  minerInfo,
  inviteCodeInfo,
  allInviteeInfo,
  inviteeInfo,
  balanceInfo,
  rewardInfo,
  rewardInviteeInfo,
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
  riskScore,
  getCurrencyListByType,
  awardList,
  walletAddressCheck
};

export default UserAPI;

