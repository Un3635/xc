

var api = {
  ip: ip,
  list: '/api/v2.0/exam/list', // 获取题目列表
  validation: '/api/v2.0/exam/validation',// 验证正确性
  finished: '/api/v2.0/exam/validation' // 完成答题
}

var getData = function(url, method, type, data, cb, cb2) {
  var _lg_ = getLg();

  $.ajax({
    url: api.ip + url,
    method: method,
    dataType: type,
    data: data,
    success: function(res) {
      if(res.code === '0') {
        cb(res);
      } else if(res.code === '6018') {
        YDUI.dialog.toast(code[res.code][_lg_], 'error', 5000);
      } else {
        cb2 && cb2(res);
      }
    },
    error: function(error){
      YDUI.dialog.loading.close();
      console.error(lgs.hints[_lg_][2]);
      YDUI.dialog.toast(lgs.hints[_lg_][2], 'error', 5000);
    }
  })
}

/**
 * 获取题目列表
 */

 var list = function(param, cb) {
  getData( api.list,'post', 'json', param || '', function(res) {
    cb(res);
  })
 }

 /**
  * 验证正确性
  * param: csrfToken 测评token
  *         answers  答案
  */

 var validation = function(index, param, cb, cb2) {
  getData(api.validation + '/' + index , 'post', 'json', param || '' , function(res) {
    cb(res);
  }, function(res) {
    cb2(res);
  })
 }

/**
 * 完成之后
 * param: csrfToken 测评tokan
 *        answers 答案数组
 */

 var finished = function(param, cb, cb2) {
  getData(api.finished, 'post', 'json', param || '', function(res) {
    cb(res);
  }, function(){
    cb2();
  })
 }

 /**
  * 答题完成之后的链接
  */

var linkUrl = function(param, cb) {
  $.ajax({
    url: window.location.origin + '/result',
    method: 'post',
    data: param || '',
    success: function(res) {
      cb(res);
    },
    error: function() {
      console.log('error');
    }
  })
 
}
