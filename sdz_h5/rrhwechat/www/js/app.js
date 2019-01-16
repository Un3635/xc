angular.module('app', ['ionic', 'mobiscroll-datetime', 'mobiscroll-image', 'mobiscroll-scroller', 'ngclipboard'])
  .run(function ($rootScope, $ionicHistory, $state) {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
    ///渠道注册跳转过来的///
    if (GetQueryString('token') && location.href.indexOf('homechannel') >= 0) {
      localStorage.token = GetQueryString('token');
    }
    var GLOBAL = {
      userUrl: 'https://www.renrenhua.com/userapi',
      coreUrl: 'https://www.renrenhua.com/coreapi',
      payUrl: 'https://www.renrenhua.com/payapi',
      version: '2.3.0',
      client: 'web',
      iframeurl: "",
      lianlianiframeurl: '//app.renrenhua.com/wechat/lianlianiframe.html',//连连内嵌iframe
      lianliancb: '//app.renrenhua.com/wechat/lianliancb.html',//连连绑卡回调，
      lianliancb1: '//app.renrenhua.com/wechat/lianliancb.html'//连连充值回调
    };


    if (location.href.indexOf('test') >= 0) {
      GLOBAL.debug = true;
      GLOBAL.userUrl = '//testwww.renrenhua.com/userapi';
      GLOBAL.coreUrl = '//testwww.renrenhua.com/coreapi';
      GLOBAL.payUrl = '//testwww.renrenhua.com/payapi';
      GLOBAL.lianlianiframeurl = '//testm.renrenhua.com/wechat/lianlianiframe.html';//连连内嵌iframe
      GLOBAL.lianliancb = '//testm.renrenhua.com/wechat/lianliancb.html'//连连绑卡回调
      GLOBAL.lianliancb1 = '//testm.renrenhua.com/wechat/lianliancb1.html'//连连充值回调
    }
    $rootScope.GLOBAL = GLOBAL;
    window.GLOBAL = GLOBAL;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if ($rootScope.loginmodal && $rootScope.loginmodal._isShown) {
        $rootScope.loginmodal.remove()
      }
      if ($rootScope.goWithAuthionicPopup) {
        $rootScope.goWithAuthionicPopup.close();
        $rootScope.goWithAuthionicPopup = undefined;
      }
      var mbscfr = document.getElementsByClassName('mbsc-fr');
      if (mbscfr.length > 0) {
        Array.prototype.forEach.call(mbscfr, function (div) {
          div.remove();
        });
      }
    })
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.swipeBackEnabled(false);
  })