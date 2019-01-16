// require('./src/store');
var debug_text = false;
var config_contextPath = "http://47.96.37.107:8099";//测试环境
// var config_contextPath = "http://192.168.50.73:8099";//测试环境 guoqi
// var config_contextPath = "http://192.168.50.73:8099";//测试环境
// var config_contextPath = "kingflag.vicp.io:33836"; // 本地测试环境

var token = localStorage.getItem('loan_token') || '';

var API = {

  // 登录 注册 
  register: config_contextPath + '/api/gate/register',
  login: config_contextPath + '/api/gate/login',
  logout:  config_contextPath + '/api/gate/logout',
  forgetPwd: config_contextPath + '/api/gate/forgetPwd',
  sendRegisterCode: config_contextPath + '/api/gate/sendRegisterCode',
  sendForgetPwdCode: config_contextPath + '/api/gate/sendForgetPwdCode',
  checkPhoneIsBindGa : config_contextPath + '/api/gate/checkPhoneIsBindGa',

  // 云算力 - 商品中心
  goodsList: config_contextPath + '/api/goodsApi/list',
  goodsDetail: config_contextPath + '/api/goodsApi/details',
  listPowerType: config_contextPath + '/api/goodsApi/list_power_type',
  // 联盟须知
  allianceList: config_contextPath + '/api/announce/list',
  //个人中心 - 账户概况
  accountOverviewInfo: config_contextPath + '/api/personCenterApi/getAccountOverview',

  // 个人中心 - 我的账户
  getAllCoins: config_contextPath + '/api/personCenterApi/getAllCoins', // 获取所有币种
  getAllAccountCoinBalances: config_contextPath + '/api/personCenterApi/getAllAccountCoinBalances',  //我的账户
  getAllAccountCoinBalancesDetail: config_contextPath + '/api/personCenterApi/getAllAccountCoinBalancesDetail', //算力明细
  mentionMoney: config_contextPath + '/api/personCenterApi/mentionMoney',
  changeWalletAddress: config_contextPath + '/api/personCenterApi/changeWalletAddress',

  getRevenueDetailsByComputing: config_contextPath + '/api/personCenterApi/getRevenueDetailsByComputing',

  //个人中心 - 量化收益
  getQuantizationDetail: config_contextPath + '/api/personCenterApi/getQuantizationDetail',
  getOwnerAllCoins: config_contextPath + '/api/personCenterApi/getOwnerAllCoins',
  //个人中心 - 邀请列表
  getInviteList: config_contextPath + '/api/personCenterApi/getInviteList',
  getInviteInfo: config_contextPath + '/api/personCenterApi/getInviteInfo',

  //个人中心 - 云算力收益
  getComputingGain: config_contextPath + '/api/personCenterApi/getComputingGain',
  getComputingDetail: config_contextPath + '/api/personCenterApi/getComputingDetail',
  getGAuthentication: config_contextPath + '/api/personCenterApi/getGAuthentication',

  // 个人中心 - 资料修改
  setData: config_contextPath + '/api/personCenterApi/setData',
  bindCoinWalletAddress: config_contextPath + '/api/personCenterApi/bindCoinWalletAddress',
  extractWalletAddressList: config_contextPath + '/api/personCenterApi/extractWalletAddressList',
  sendBindCoinAddressCode: config_contextPath + '/api/personCenterApi/sendBindCoinAddressCode',
  setGAuthentication: config_contextPath + '/api/personCenterApi/setGAuthentication',

  // 底部 - 关于我们
  contactus : config_contextPath +  '/api/config/contactus'
};

let refreshParam = false;
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
      localStorage.removeItem('loan_tokne');
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
      localStorage.removeItem('loan_tokne');
      if(obj && !refreshParam)
      {
        obj.$store.commit('SHOW_LOGIN_PAGE', true);  
      }
      
      // if(!obj.$store.state.showLoginPage){
      //   // getajaxdata(url, method, data, datatype, callback, obj);
      // }
    //  let  _param_ = {
    //     "url":url, 
    //     "method": method, 
    //     "data": dataParam, 
    //     "datatype": datatype, 
    //     "callback": callback,
    //     "obj":obj
    //   };
    //   refreshParam.push(_param_);
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




function printmsg(a, b) {
  if (debug_text) {
    console.log(a, b)
  }
}


function invalidJump() {
  localStorage.removeItem('loan_tokne');
  localStorage.removeItem('loan_companyName');
  localStorage.removeItem('loan_username');
  var url = 'http://' + window.location.host + '/login.html';
  window.location.replace(url)
}


function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

//输入框的非空判断,为空返回true,否则返回false;
function checkIsNull(eleId, tipMsg) {
  var value = $('#' + eleId + '').val();
  if (value == null || value == '') {
    alert(tipMsg);
    $('#' + eleId + '').focus();
    return true;
  } else {
    return false;
  }

}

function getTokenByLocal() {
  if (localStorage.getItem('loan_token')) {
    token = localStorage.getItem('loan_token')
  } else {
    invalidJump();
  }
}

// 将数据存入本地
function setDataToLocal(k, v) {
  localStorage.setItem(k, v);
}

function getRealLen(arr) {
  var l = 0;
  var str = arr.split('');
  for (var i = 0; i < str.length; i++) {
    if (str[i].charCodeAt(0) < 299) {
      l++;
    } else {
      l += 2;
    }
  }
  printmsg('getRealLen len is', l)
  return l;
}


function getLimitNamebyName(itemname, num) {
  var name = itemname.slice(0, itemname.lastIndexOf('.'));
  var type = itemname.slice(itemname.lastIndexOf('.'));
  var l = 0;
  var str = name.split('');
  var newname = '';
  for (var i = 0; i < str.length; i++) {
    // printmsg('[str i is]',str[i])

    if (str[i].charCodeAt(0) < 299) {
      l++;
    } else {
      l = l + 2;
    }
    if (l > num) {
      printmsg('l is' + l, 'num is ' + num)
      return newname + '...' + type
    }
    newname = newname + str[i]

  }
  return newname + type
}

function getStatusByrate(num) {
  var num = Number(num)
  printmsg('num is', num)

  if (!(typeof num === 'number') || num < 0.01) {
    printmsg('not number or least', num)
    return false
  }
  if (String(num).indexOf('.') !== -1 && String(num).split('.')[1].length > 2) {
    printmsg('bigger than 2', num)
    return false
  }
  return true

}

function gettimestr(str) {
  var y = str.slice(0, 4) + '年';
  var m = str.slice(5, 7) + '月';
  var d = str.slice(8, 10) + '日';
  var t = str.slice(11, 19);

  return y + m + d + ' ' + t
}
