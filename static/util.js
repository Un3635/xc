/**
 * author: heleen
 * creatTime: 2018.09.06
 */

;(function(win) {
  function util() {
    const doms = {};

    var hidePhone = function(phone) {
      if(!phone){
        return '';
      }
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    var getDom = function(domId) {
      if(!doms[domId]) {
        doms[domId] = document.getElementById(domId);
        return doms[domId];
      } 
      return doms[domId];
    }
    var getParam = function(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)
        return unescape(r[2]);
      return null;
    }
    var setCookie = function(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    var getCookie = function(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    }
    
    var delCookie = function(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }

    return {
      hidePhone: hidePhone,
      getDom: getDom,
      getParam: getParam,
      cookie: {
        set: setCookie,
        get: getCookie,
        del: delCookie
      }
    }
  }
  win.util = new util();
})(window);