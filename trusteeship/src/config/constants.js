export const ErrorMapping = {
  '500000': '系统错误',
  '000001': '新增失败',
  '000002': '删除失败',
  '000003': '更新失败',
  '000004': '该账号未注册',
  '000005': '参数为空',
  '000006': '参数错误',
  '100008': 'token已过期',
  '100009': '提现金额小于最低限制',
  '100010': '无效的提现金额',
  '100011': '账户余额不足',
  '100101': '验证码错误',
  '100102': '验证码请求过于频繁',
  '100103': '手机号有误',
  '100104': '账号或密码错误',
  '100105': '验证码已失效，请重新获取',
  '100106': '验证码发送失败',
  '100107': '账户已冻结',
  '100108': '账户存在',
  '200001': '视频资源不存在',
  '200002': 'oss上传失败',
  '200003': '该商品已售罄',
  '200004': '该商品超过最大购买限制',
  '200005': '邀请码不存在',
  '200006': '注册成功',
  '200007': '该商品暂未在售',
  '200008': '未绑定谷歌验证器',
  '200009': '重复认证',
  '200010': '未设置密码',
  '200101': '订单已过期',
  '200102': '订单已释放',
  '200103': '订单已拒绝',
  '200104': '订单支付处理中',
  '200105': '订单已支付',
  '200107': '该订单已在支付处理中,请勿重复提交',
  '300008': '托管时间已截止',
  '300009': '购买数量不能低于最低购买量',
  '300010': '单笔购买数量超过最大上限',
  '300011': '单人购买数量超过最大上限',
  '300012': '剩余算力不足',
  '200112': '该批次已不在售',
  '200113': '请勿重复提交'
};

export const BalanceType = {
  COIN: 0, // 以币抵扣
  BALANCE: 1// 余额支付

};

export const OrderType = {
  ORDER: 0,
  RECHARGE: 1
};

export const CommonProblem = [
  {
    id: 1,
    question: '云算力购买后何时产生收益？',
    answer: '云算力成功购买后,到交割时间时，开始产生挖矿收益。'
  }, {
    id: 2,
    question: '云算力收益是如何计算发放的？',
    answer: '标准的一份算立方云算力为1T，算力收益通过PPS（Pay Per Share）模式结算。在收益结算时根据实时价格扣除电费，根据产出的一定比例收取管理费。收益每天定时发放。'
  }, {
    id: 3,
    question: '云算力计算收益扣除哪些费用，有哪些付费模式？',
    answer: '每日计算收益时，需扣除电费和管理费，电费可以有2种付费模式：1、优先余额付费，2、优先以币抵费。可在个人中心-我的云算力中进行修改付费方式。'
  }, {
    id: 4,
    question: '云算力计算电费时，加密货币价格如何确定？',
    answer: '在每天结算收益的时候依据交易平台（默认使用火币）北京时间上午8:00左右的价格进行自动结算，如果默认的平台存在技术或者网络问题，算立方有权力更换交易平台而不再另行通知。'
  }, {
    id: 5,
    question: '云算力的运行期限？',
    answer: '云算力连续 10 天实际收益、加密货币余额、账户余额不足以抵扣电费，则合约终止。'
  }, {
    id: 6,
    question: '如何提取收益?',
    answer: '当您的云算力实际产出的加密货币≥0.1时，您可以后台添加您的个人加密钱包地址，输入您想提取的数量，点击申请提币，即可将您所需要的加密货币提取到您的私人钱包地址。该地址可以是全球任何地方任何人的加密货币地址。算立方只对您的申请负责，不会核实加密货币地址的身份，提币操作您需要承担一定的手续费，会从您的提币数量中扣除。'
  }, {
    id: 7,
    question: '购买使用云算力挖矿遇到问题怎么办？',
    answer: '请您微信搜索关注我们的微信公众号：算立方（或扫描网站底部的二维码关注），直接联系我们的客服微信，将您遇到的问题反馈给我们，我们的客服人员会在第一时间回复您。'
  }, {
    id: 8,
    question: '云算力是否开启交易市场？',
    answer: '不日将开启算力交易市场，敬请期待！'
  }
];

export const BankInfo = [
  {
    code: 'ABC',
    name: '中国农业银行',
    logo: require('../assets/images/icon/ABC@2x.jpg'),
    singleLimit: 2000,
    dailyLimit: 10000
  },
  {
    code: 'BankofShanghai',
    name: '上海银行',
    logo: require('../assets/images/icon/BankofShanghai@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {code: 'BC', name: '中国银行', logo: require('../assets/images/icon/BC@2x.jpg'), singleLimit: 20000, dailyLimit: 30000},
  {code: 'BCB', name: '北京银行', logo: require('../assets/images/icon/BCB@2x.jpg'), singleLimit: 5000, dailyLimit: 5000},
  {code: 'BCM', name: '交通银行', logo: require('../assets/images/icon/BCM@2x.jpg'), singleLimit: 20000, dailyLimit: 20000},
  {
    code: 'CCB',
    name: '中国建设银行',
    logo: require('../assets/images/icon/CCB@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {
    code: 'CEB',
    name: '中国光大银行',
    logo: require('../assets/images/icon/CEB@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {
    code: 'CITICIB',
    name: '中信银行',
    logo: require('../assets/images/icon/CITICIB@2x.jpg'),
    singleLimit: 5000,
    dailyLimit: 10000
  },
  {code: 'CIB', name: '兴业银行', logo: require('../assets/images/icon/CIB@2x.jpg'), singleLimit: 20000, dailyLimit: 50000},
  {code: 'CMB', name: '招商银行', logo: require('../assets/images/icon/CMB@2x.jpg'), singleLimit: 5000, dailyLimit: 5000},
  {
    code: 'CMBC',
    name: '中国民生银行',
    logo: require('../assets/images/icon/CMBC@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {
    code: 'GDB',
    name: '广东发展银行',
    logo: require('../assets/images/icon/GDB@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {code: 'HB', name: '华夏银行', logo: require('../assets/images/icon/HB@2x.jpg'), singleLimit: 2000, dailyLimit: 2000},
  {
    code: 'ICBC',
    name: '中国工商银行',
    logo: require('../assets/images/icon/ICBC@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  },
  {
    code: 'PABC',
    name: '平安银行',
    logo: require('../assets/images/icon/PABC@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 20000
  },
  {code: 'PSBC', name: '中国邮政', logo: require('../assets/images/icon/PSBC@2x.jpg'), singleLimit: 5000, dailyLimit: 5000},
  {
    code: 'SPDB', name: '浦发银行', logo: require('../assets/images/icon/ShanghaiPudongDevelopmentBank@2x.jpg'),
    singleLimit: 20000,
    dailyLimit: 50000
  }
];

export default {
  ErrorMapping,
  BalanceType,
  CommonProblem,
  OrderType,
  BankInfo
};
