const apiConfig = {
  // ip: "http://47.97.166.210:9099",
  ip: "http://47.96.37.107:9099",
  exchange: "/exchange/detail/list", // 兑换记录
  withdrawal: "/user/gemstone/forward/list", // 提现记录
  diamondDetail: "/finance/diamond/list", // 宝石收支明细
  gemDetail: "/finance/gemstone/list", // 钻石收支明细
  question: "/homeAndConfig/helpQuestion", // 帮助与反馈
  bagReceive: "/gift/bag/receive", // 接收礼包
  bagInfo: "/gift/bag/info", // 接收礼包
  insertGemsPutForward: "/invitation/insertGemsPutForward", // 邀请提现
  inviteForwardList: "/invitation/gemstonesPutForward/list", // 邀请提现明细
  myRecordList: "/invitation/myRecordList", // 我的战绩列表
  register: "/invitation/register", // 邀请注册
  gainSms: "/user/gainSms", // 获取验证码
  getReviewState: "/version/review/state", // 获取审核版本
  details: {
    '61': '支付宝',
    '62': '微信',

    '1': '发送礼包',
    '2': '返还礼包',
    '3': '接收礼包',

    '11': '发送礼物',
    '12': '接收礼物',
    
    '21': '打开图片',

    '31': '打开视频',
    '32': '实时视频',

    '41': '打开语音',
    '42': '实时语音',

    '51': '阅读文章',
    
    '6': '提现',
    '7': '兑换'
  },
  pic: {
    '1': require('../assets/images/outcome/up_Gift bag_dis.png'),
    '2': require('../assets/images/outcome/up_Gift bag_dis.png'),
    '3': require('../assets/images/outcome/up_Gift bag_dis.png'),
    '21': require('../assets/images/outcome/Publish_pic.png'),
    '41': require('../assets/images/outcome/Publish_voice.png'),
    '42': require('../assets/images/outcome/Publish_voice.png'),
    '11': require('../assets/images/outcome/up_gift_dis.png'),
    '12': require('../assets/images/outcome/up_gift_dis.png'),
    '31': require('../assets/images/outcome/up_chat_dis.png'),
    '32': require('../assets/images/outcome/up_chat_dis.png')
  },
  codes: {
    '000003': '用户身份不匹配',
    '100200': '礼包不存在',
    '100201': '礼包已过期',
    '100202': '礼包已领取',
    '100203': '礼物不存在',
    '100204': '礼包发送者和接收者冲突',
    '000007': '验证码失效',
    '100102': '请求频繁, 请稍后操作',
    '100101': '手机验证码错误',
    '100101': '手机号格式错误',
    '100105': '验证码发送失败',
    '100123': '该账号已注册', 
    '200001': '操作金额过低',
    '200002': '余额不足',
    '300004': '支付宝账号与姓名不一致',
    '500000': '系统异常'
  }
};

export default  apiConfig;
