(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
angular.module('apph5', ['ionic', 'oc.lazyLoad', 'mobiscroll-datetime', 'mobiscroll-image', 'mobiscroll-scroller'])
  .run(function ($rootScope, $ionicHistory) {
    var GLOBAL = {
      debug: true,
      userUrl: 'https://www.renrenhua.com/userapi',
      coreUrl: 'https://www.renrenhua.com/coreapi'
    };
    if (window.location.href.indexOf('test')) {
      GLOBAL.debug = true;
    }
    if (GLOBAL.debug) {
      // GLOBAL.userUrl = 'http://testwww.renrenhua.com/userapi';
      // GLOBAL.coreUrl = 'http://testwww.renrenhua.com/coreapi';
      GLOBAL.userUrl = 'http://192.168.50.81:8081';
      GLOBAL.coreUrl = 'http://192.168.50.81:8085';
    }

    $rootScope.GLOBAL = GLOBAL;
    window.GLOBAL = GLOBAL;
    $rootScope.BACK = function () {
      $ionicHistory.goBack();
    }
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
  })
