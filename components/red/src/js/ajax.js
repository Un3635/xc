var api = {
  ip: ip,
  getPacketInfo: '/api/v2.0/packet/parent', // 获取红包信息
  getSmsCode: '/api/v2.0/user/getSmsCode', // 获取验证码
  rob: '/api/v2.0/packet/rob', // 领红包
  query: '/api/v2.0/packet/query', // 看朋友手气
  price: '/api/v2.0/assets/price'
}

var getData = function(url, method, type, data, cb, cb2, cb3) {
  $.ajax({
    url: api.ip + url,
    method: method,
    dataType: type,
    data: data,
    success: function(res) {
      if(res.code === '0' || res.code === '7002' || res.code === '7001' || res.code === '7003') {
        cb(res);
      } else {
        cb2 && cb2();
        
        YDUI.dialog.toast(code[res.code][getLg()] || code[res.code], 'error', 5000);
        // YDUI.dialog.loading.open(code[res.code]);
        // YDUI.dialog.alert(code[res.code]);
      }
    },
    error: function(error){
      // cb3 && cb3();
      YDUI.dialog.loading.close();
      YDUI.dialog.toast(lgs.hints[getLg()][4], 'error', 5000);
      // YDUI.dialog.loading.open(['加载失败']);
    }
  })
}

/**
 * 获取红包信息
 * param: id 红包id
 * return: {1: 红包正常领取, 2：红包已经领完, 3: 红包失效}
 */

 var getPacketInfo = function(packetId, param, cb, cb2) {
  getData(api.getPacketInfo + '/' + packetId, 'post', 'json', param || '' , function(res) {
    cb(res);
  }, function(){
    cb2();
  })
 }

 /**
  * 获取验证码
  * param: account 手机号码
  *         type 验证码类型 
  * 1 登录 2 注册 3 找回密码 4 重置密码 5 绑定邮箱 6 绑定手机 7 确定订单验证码
  */

 var getSmsCode = function(param, cb, cb2,cb3) {
  getData(api.getSmsCode, 'post', 'json', param || '' , function(res) {
    cb(res);
  }, function() {
    cb2();
  }, function() {
    // cb3();
  })
 }


 /**
  * 领红包
  * param: parentPacketId 红包id
  *        account 手机号码
  *        smsCode 验证码
  *        codeToken 验证码Token
  */
 var rob = function(param, cb, cb2) {
   getData(api.rob, 'post', 'json', param || '', function(res) {
      cb(res);
   },function() {
      cb2();
   })
 }


 /**
  *  看朋友手气
  * param: parentPacketId	红包ID
  *        userId  用户ID
  *        userMobile 用户手机号
  *        page 页码
  *        pagesize size
  */
 var query = function(param, cb) {
    getData(api.query, 'post', 'json', param || '', function(res) {
      cb(res);
    })
 }

 /**
  * 获取资产币价
  * 
  * param : currency 人民币
  */

var price = function (cb) {
  getData(api.price, 'post', 'json',{currency: 'CNY'}, function(res){
    cb(res);
  })
}