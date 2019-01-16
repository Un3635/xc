(function(){
  var values = []; // 领取红包
  window.getYzCode = function(cb){
    focus();

    var $getCode = $('#yzCodeBtn');
     /* 定义参数 */
    $getCode.sendCode({
        disClass: 'yzCodeBtn-disabled',
      // secs: 60,
        run: false,
        runStr: '{%s}s',
        resetStr: lgs.phonePopup[getLg()][2]
    });
    
    $getCode.on('click', function () {
        /* ajax 成功发送验证码后调用 */
      if(checkPhone()) {
        getSmsCode({'account': values[0], type: 10}, function(res) {
          $getCode.sendCode('start');
          values[2] = true;
        }, function() {
          YDUI.dialog.loading.close();
        }, function() {
          YDUI.dialog.loading.close();
        })
      }
    });
  }
  var focus = function() {
    $(util.getDom('phoneNumIpt')).on("input propertychang", function() {
      values[0] = $(this).val();
    });

    $(util.getDom('yzCodeIpt')).on("input propertychang", function() {
      values[1] = $(this).val();
    });
  }
 
  var checkPhone = function(v) {
    var v = v || values[0];
    if(!regExp.phone.test(v)) {
      YDUI.dialog.toast(lgs.hints[getLg()][1], 'none', 1000);
      return false;
    }
    return true;
  }
  
  var checkYzCode = function(v) {
    var v = v || values[1];
    if(!regExp.yzPwd.test(v)) {
      YDUI.dialog.toast(lgs.hints[getLg()][2], 'none', 1000);
      return false;
    }
    return true;
  }

  var yzClick= function() {
    if(!values[2]) {
      values[1] = null;
      checkYzCode();
      return false;
    }
    return true;
  }

  window.check = function(cb) {
    if(checkPhone() && yzClick()){
      if(checkYzCode()) {
        cb(values);
        return true;
      }
      cb();
      return false;
    }
    cb();
    return false;
  }
  
})();