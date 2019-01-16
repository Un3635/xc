var config_contextPath = "http://center.hashstar.net";//开发
// var config_contextPath = "http://47.75.69.56:8099";//测试环境

var token = localStorage.getItem('X-Auth-Token') || '';

var API = {
  register: config_contextPath + '/api/gate/register',
  login: config_contextPath + '/api/gate/login',
  logout:  config_contextPath + '/api/gate/logout',
  forgetPwd: config_contextPath + '/api/gate/forgetPwd',
  sendRegisterCode: config_contextPath + '/api/gate/sendRegisterCode',
  sendForgetPwdCode: config_contextPath + '/api/gate/sendForgetPwdCode',
  checkPhoneIsBindGa : config_contextPath + '/api/gate/checkPhoneIsBindGa',
  goodsList: config_contextPath + '/api/goodsApi/list',
  goodsDetail: config_contextPath + '/api/goodsApi/details',
  listPowerType: config_contextPath + '/api/goodsApi/list_power_type',
  allianceList: config_contextPath + '/api/announce/list',
  accountOverviewInfo: config_contextPath + '/api/personCenterApi/getAccountOverview',
  getAllCoins: config_contextPath + '/api/personCenterApi/getAllCoins', // 获取所有币种
  getAllAccountCoinBalances: config_contextPath + '/api/personCenterApi/getAllAccountCoinBalances',  //我的账户
  getAllAccountCoinBalancesDetail: config_contextPath + '/api/personCenterApi/getAllAccountCoinBalancesDetail', //算力明细
  mentionMoney: config_contextPath + '/api/personCenterApi/mentionMoney',
  changeWalletAddress: config_contextPath + '/api/personCenterApi/changeWalletAddress',
  getRevenueDetailsByComputing: config_contextPath + '/api/personCenterApi/getRevenueDetailsByComputing',
  getQuantizationDetail: config_contextPath + '/api/personCenterApi/getQuantizationDetail',
  getInviteList: config_contextPath + '/api/personCenterApi/getInviteList',
  getInviteInfo: config_contextPath + '/api/personCenterApi/getInviteInfo',
  getComputingGain: config_contextPath + '/api/personCenterApi/getComputingGain',
  getComputingDetail: config_contextPath + '/api/personCenterApi/getComputingDetail',
  getGAuthentication: config_contextPath + '/api/personCenterApi/getGAuthentication',
  setData: config_contextPath + '/api/personCenterApi/setData',
  bindCoinWalletAddress: config_contextPath + '/api/personCenterApi/bindCoinWalletAddress',
  extractWalletAddressList: config_contextPath + '/api/personCenterApi/extractWalletAddressList',
  sendBindCoinAddressCode: config_contextPath + '/api/personCenterApi/sendBindCoinAddressCode',
  sendMentionMoneyCode : config_contextPath + '/api/personCenterApi/sendMentionMoneyCode',
  setGAuthentication: config_contextPath + '/api/personCenterApi/setGAuthentication',
  contactus : config_contextPath +  '/api/config/contactus',
  getOwnerAllCoins: config_contextPath + '/api/personCenterApi/getOwnerAllCoins',
};

var refreshParam = false;
// 设置content-type的提交方式
function getajaxdata_json(url, method, data, datatype, callback,obj) {
  $.ajax({
    url: url,
    beforeSend: function (request) {
      request.setRequestHeader('X-Auth-Token', token || '');
      request.setRequestHeader('Content-Type', 'application/json');
    },
    method: method,
    data: data,
    dataType: datatype
  }).done(function (data) {
    if (Number(data.code) === 3001 && obj !== 'LOGIN') {
      token = '';
      localStorage.removeItem('X-Auth-Token');
      if(obj && !refreshParam)
      {
        obj.$store.commit('SHOW_LOGIN_PAGE', true);
      }
      refreshParam = true;
    }
    if(obj === 'LOGIN') {
      callback(data,refreshParam);
      refreshParam = false;
    }else{
      callback(data)
    }
  }).fail(function () {
    // alert("请求数据错误，请稍后再试")
  })
}

function getajaxdata(url, method, dataParam, datatype, callback, obj) {
  // obj === 'LOGIN' 此时是登录在调用接口
  $.ajax({
    url: url,
    beforeSend: function (request) {
      request.setRequestHeader('X-Auth-Token', token || '');
    },
    method: method,
    data: dataParam,
    dataType: datatype
  }).done(function (data) {
    if (Number(data.code) === 3001 && obj !== 'LOGIN') {
      token = '';
      localStorage.removeItem('X-Auth-Token');
      if(obj && !refreshParam)
      {
        obj.$store.commit('SHOW_LOGIN_PAGE', true);
      }
      refreshParam = true;
    }
    if(obj === 'LOGIN') {
      callback(data,refreshParam);
      refreshParam = false;
    }else{
      callback(data)
    }
  }).fail(function () {
    // alert("请求数据错误，请稍后再试")
  })
}
// 将数据存入本地
function setDataToLocal(k, v) {
  localStorage.setItem(k, v);
}



