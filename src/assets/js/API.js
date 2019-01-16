// const URL = 'http://192.168.50.73:8100'; //guoqi
// const URL = 'http://47.97.166.210:8100'; //测试
const URL = 'http://47.96.37.107:8100'; //测试更改

var API = {
  login: '/manager/adminUser/login', //登录
  logout: '/manager/adminUser/logout', //注销
  upPwd: '/manager/adminUser/upMyPassword', //修改密码
  tencentSig: '/manager/tencent/TencentSig/getCosPutSignature', //腾讯签名服务 GET
  indexData: '/manager/index/read/indexData', //首页数据总览 GET

  //权限管理 - 账户管理
  accountInfo: '/manager/permissionManage/adminUser/read/', //获取登录的用户信息 GET
  accountList: '/manager/permissionManage/adminUser/read/userList', //获取账户管理列表
  accountEdit: '/manager/permissionManage/adminUser/', //获取账户编辑信息
  accountAdd: '/manager/permissionManage/adminUser', //新增账户
  allRoles: '/manager/permissionManage/adminUser/read/roleList', //获取所有角色

  //权限管理 - 角色管理
  roleList: '/manager/permissionManage/roleManage/read/roleList', //获取角色列表
  roleAdd: '/manager/permissionManage/roleManage', //新增角色
  roleDetail: '/manager/permissionManage/roleManage/read/', //角色详情
  roleEdit: '/manager/permissionManage/roleManage/', //角色编辑
  rolePermission: '/manager/permissionManage/roleManage/read/getRolePermission', //获取角色权限
  setRolePermission: '/manager/permissionManage/roleManage/setPermission', //设置角色权限

  //用户中心
  userList: '/manager/userCenter/userManager/read/userList', //用户列表 GET
  userDetail: '/manager/userCenter/userManager/read/userDetail/', //用户详情 GET

  meetList: '/manager/userCenter/msManager/read/msList', //Meets列表 GET
  meetDetail: '/manager/userCenter/msManager/read/msDetail/', //Meets详情 GET
  meetEdit: '/manager/userCenter/msManager/msEdit', //Meets编辑 POST
  meetReward: '/manager/userCenter/msManager/getRewardScaleList', //Meets机构分成 POST

  costRate: '/manager/userCenter/consumeLevel/read/consumeLevelList', //用户消费等级 GET
  costRateDetail: '/manager/userCenter/consumeLevel/read/consumeLevelDetail/', //用户消费等级详情 GET
  costRateRecord: '/manager/userCenter/consumeLevel/consumeRecordList/', //用户消费记录 GET

  benefitRate: '/manager/userCenter/msIncomeLevel/read/msIncomeLevelList', //Ms收益等级 GET
  benefitRateDetail: '/manager/userCenter/msIncomeLevel/read/msIncomeLevelDetail/', //Ms收益等级详情 GET
  benefitRateRecord: '/manager/userCenter/msIncomeLevel/incomeRecordList/', //Ms收益记录 GET

  balanceList: '/manager/userCenter/accountBalanceManager/read/accountBalanceList', //账户余额列表 GET
  balanceDetail: '/manager/userCenter/accountBalanceManager/read/accountBalanceDetail/', //账户余额详情 GET
  balanceRecord: '/manager/userCenter/accountBalanceManager/balanceRecordList/', //账户余额记录 GET

  //运营中心
  bannerList: '/manager/operationCenter/bannerManager/read/bannerList', //Banner列表 GET
  bannerDetail: '/manager/operationCenter/bannerManager/read/bannerDetail/', //Banner详情 GET
  bannerUpOrAdd: '/manager/operationCenter/bannerManager/bannerUpOrAdd', //Banner修改或增加 POST
  bannerStatus: '/manager/operationCenter/bannerManager/changeBannerStatus', //Banner状态修改 POST

  giftList: '/manager/operationCenter/giftManager/read/giftList', //礼物列表 GET
  giftDetail: '/manager/operationCenter/giftManager/read/giftDetail/', //礼物详情 GET
  giftEdit: '/manager/operationCenter/giftManager/giftUpOrAdd', //礼物编辑 POST

  redPacketSceneList: '/manager/operationCenter/redPacketManager/read/redPacketSceneList', //红包场景列表 GET
  redPacketList: '/manager/operationCenter/redPacketManager/read/redPacketList', //预设红包列表 GET
  redPacketDetail: '/manager/operationCenter/redPacketManager/read/redPacketDetail/', //预设红包详情 GET
  redPacketEdit: '/manager/operationCenter/redPacketManager/redPacketUpOrAdd', //预设红包编辑 POST
  redPacketSceneDetail: '/manager/operationCenter/redPacketManager/read/redPacketSceneDetail/', //红包场景详情 GET
  redPacketSceneEdit: '/manager/operationCenter/redPacketManager/redPacketSceneUp', //红包场景编辑 POST

  interestList: '/manager/operationCenter/interestManager/read/interestList', //兴趣列表 GET
  interestDetail: '/manager/operationCenter/interestManager/read/interestDetail/', //兴趣详情 GET
  interestEdit: '/manager/operationCenter/interestManager/interestUpOrAdd', //兴趣编辑 POST

  labelList: '/manager/operationCenter/labelManager/read/labelList', //标签列表 GET
  labelDetail: '/manager/operationCenter/labelManager/read/labelDetail/', //标签详情 GET
  labelEdit: '/manager/operationCenter/labelManager/labelUpOrAdd', //标签编辑 POST

  noticeList: '/manager/operationCenter/noticeManager/read/noticeList', //通知列表 GET
  noticeDetail: '/manager/operationCenter/noticeManager/read/noticeDetail/', //通知详情 GET
  noticeEdit: '/manager/operationCenter/noticeManager/noticeAdd', //编辑通知 POST
  noticeToBePreview: '/manager/operationCenter/noticeManager/read/toBeNoticeUserList', //待通知名单 GET
  noticePreview: '/manager/operationCenter/noticeManager/read/noticeUserDetail/', //已通知名单 GET

  qaList: '/manager/operationCenter/qaManager/read/qaList', //Q&A列表 GET
  qaDetail: '/manager/operationCenter/qaManager/read/qaDetail/', //Q&A详情 GET
  qaEdit: '/manager/operationCenter/qaManager/qaUpOrAdd', //Q&A编辑 POST

  wordList: '/manager/operationCenter/illegalWordManager/read/illegalWordList', //禁词列表 GET
  wordDetail: '/manager/operationCenter/illegalWordManager/read/illegalWordDetail/', //禁词详情 GET
  wordEdit: '/manager/operationCenter/illegalWordManager/illegalWordUpOrAdd', //禁词编辑 POST

  mstypeList: '/manager/operationCenter/msTypeManager/read/msTypeList', //Ms类型列表 GET
  mstypeDetail: '/manager/operationCenter/msTypeManager/read/msTypeDetail/', //Ms类型详情 GET
  mstypeEdit: '/manager/operationCenter/msTypeManager/msTypeUpOrAdd', //Ms类型编辑 POST
  mstypePricingList: '/manager/operationCenter/msTypeManager/read/getMsTypePricingTypeList', //Ms类型价格类型 GET

  agencyList: '/manager/operationCenter/agencyManager/read/agencyList', //机构列表 GET
  agencyDetail: '/manager/operationCenter/agencyManager/read/agencyDetail/', //机构详情 GET
  agencyEdit: '/manager/operationCenter/agencyManager/agencyUpOrAdd', //机构编辑 POST

  inviteList: '/manager/operationCenter/inviteManager/read/inviteList', //用户邀请列表 GET

  // 审核中心
  serviceCertificationList: '/manager/auditCenter/serviceCertificationManager/read/serviceCertificationList', // 服务认证列表
  serviceCertificationDetail: '/manager/auditCenter/serviceCertificationManager/read/serviceCertificationDetail', // 服务认证详情
  doAuthenticate: '/manager/auditCenter/serviceCertificationManager/doAuthenticate', // 服务认证审核

  homeNewsList: '/manager/auditCenter/homeNewsManager/read/homeNewsList', // 主页动态
  homeNewsDetail: '/manager/auditCenter/homeNewsManager/read/homeNewsDetail', // 主页详情
  homeNewsReview: '/manager/auditCenter/homeNewsManager/doReview', // 主页复核

  homePhotoList: '/manager/auditCenter/homePhotoManager/read/homePhotoList', // 照片列表
  homePhotoDetail: '/manager/auditCenter/homePhotoManager/read/homePhotoDetail', // 照片详情
  homePhotoReview: '/manager/auditCenter/homePhotoManager/doReview', // 照片复核

  homeVideoList: '/manager/auditCenter/homeVideoManager/read/homeVideoList', // 视频列表
  homeVideoDetail: '/manager/auditCenter/homeVideoManager/read/homeVideoDetail', // 视频详情
  homeVideoReview: '/manager/auditCenter/homeVideoManager/doReview', // 视频复核

  homeVoiceList: '/manager/auditCenter/homeVoiceManager/read/homeVoiceList', // 语音列表
  homeVoiceDetail: '/manager/auditCenter/homeVoiceManager/read/homeVoiceDetail', // 语音详情
  homeVoiceReview: '/manager/auditCenter/homeVoiceManager/doReview', // 语音复核

  reportList: '/manager/auditCenter/reportManager/read/reportList', // 举报列表 GET
  reportDetail: '/manager/auditCenter/reportManager/read/reportDetail/', // 举报详情 GET
  reportHandle: '/manager/auditCenter/reportManager/doHandleReport', // 举报处理 POST
  feedbackList: '/manager/auditCenter/feedbackManager/read/feedbackList', // 反馈列表 GET
  feedbackDetail: '/manager/auditCenter/feedbackManager/read/feedbackDetail/', // 反馈详情 GET
  feedbackHandle: '/manager/auditCenter/feedbackManager/feedbackReply', // 反馈回复 POST

  // 财务中心
  rechargeList: '/manager/financeCenter/rechargeManager/read/rechargeList', // 充值管理 GET
  withdrawList: '/manager/financeCenter/withdrawManager/read/withdrawList', // 提现管理 GET
  exchangeList: '/manager/financeCenter/exchangeManager/read/exchangeList', // 兑换管理 GET
  diamondBillList: '/manager/financeCenter/diamondBillManager/read/diamondBillList', // 钻石流水明细 GET
  gemBillList: '/manager/financeCenter/gemBillManager/read/gemBillList', // 宝石流水详情 GET
  agencyIncomeList: '/manager/financeCenter/agencyIncomeManager/read/agencyIncomeList', // 机构收益
  agencyIncomeDetail: '/manager/financeCenter/agencyIncomeManager/read/agencyIncomeDetail', // 机构收益详情
  agencyGrantMoney: '/manager/financeCenter/agencyIncomeManager/agencyGrantMoney', // 机构收益发放

  // 风控中心
  getNormList:"/manager/riskcontrolCenter/platformRuleManager/read/getNormList", // 平台规则 (视频规范，meets规范，用户规范)
  getGradeBase:"/manager/riskcontrolCenter/platformRuleManager/read/getGradeBase", // 平台规则 （消费等级，收益等级）
  whitelistList:"/manager/riskcontrolCenter/whitelistManager/read/whitelistList", // 黑白名单
  editList: '/manager/riskcontrolCenter/whitelistManager/editList', // 编辑黑白名单
  
  addedList: '/manager/riskcontrolCenter/addedManager/read/addedList', // 附加值管理
  item:'/manager/riskcontrolCenter/addedManager/read/item', // 查看
  mScore:'/manager/riskcontrolCenter/addedManager/read/mScore', // 查看当前ms分
  add:'/manager/riskcontrolCenter/addedManager/add', // 新增附加值
  addedAlarmList: '/manager/riskcontrolCenter/livePornSegmentsManager/read/list', // 聊天警报列表 
  updateStatus: '/manager/riskcontrolCenter/livePornSegmentsManager/updateStatus', // 聊天警报列表 POST


  //签约管理
  signList: '/manager/agencycenter/signManager/read/list', // 签约列表 GET
  signDetail: '/manager/agencycenter/signManager/read/item/', // 签约详情 GET
  signUpdate: '/manager/agencycenter/signManager/updateStatus', // 签约 POST
  signCancel: '/manager/agencycenter/signManager/cancelSign', // 取消签约 POST
  signEdit: '/manager/agencycenter/signManager/edit', // 编辑 POST

}
export default {URL,API}