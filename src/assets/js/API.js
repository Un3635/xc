// const URL = 'http://192.168.50.200:8099'; //nico
// const URL = 'http://192.168.50.157:8099'; //guoliang
const URL = 'http://47.96.37.107:8099'; //测试
var API = {
  login: '/manager/adminUser/login', //登录
  logout: '/manager/adminUser/logout', //注销
  upPwd: '/manager/adminUser/upMyPassword', //修改密码

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


  //订单管理
  rechargeLog: '/manager/order/recharge/read/rechargeLog', //充值订单流水
  rechargeDetail: '/manager/order/recharge/read/logDetail', //充值订单详情 GET
  withdrawLog: '/manager/order/withdraw/read/withdrawLog', //提币订单流水
  withdrawDetail: '/manager/order/withdraw/read/logDetail', //提币订单详情 GET
  withdrawAudit: '/manager/order/withdraw/audit', //订单审核
  rechargeDownLoad: '/manager/order/recharge/read/rechargeLog/outXls', //充值订单导出
  withdrawDownLoad: '/manager/order/withdraw/read/withdrawLog/outXls', //提币订单导出

  //用户管理
  userList: '/manager/user/read/userList', //用户列表
  userStatus: '/manager/user/upAccountStatus', //改变用户状态
  userAssetsInfo: '/manager/user/read/account', //用户资产信息
  userAssetsLog: '/manager/user/read/accountLog', //用户资产流水

  //资产流水
  assetsLog: '/manager/asset/read/log', //资产流水

  //公共币种
  searchCoin: '/manager/pub/coin/read/selectBySymbol', //通过币种名称搜索 GET

  //配置中心
  configList: '/manager/configs/read/getList', // 配置列表
  configDetail: '/manager/configs/read/getInfoByKey', //根据key获取配置信息
  configEdit: '/manager/configs/update', //编辑配置内容



}
export default {URL,API}