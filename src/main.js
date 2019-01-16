// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./common/rem";
import Vue from "vue";
import App from "./App";
import router from "./router";
import Mint from "mint-ui";
import axios from "./common/http";
import moment from "moment";
import xcqbapp from "./common/jsbridge";
import "mint-ui/lib/style.css";
import VueProgress from "vue-progress";
Vue.use(VueProgress);
Vue.use(Mint);
Vue.directive("title", {
  inserted: function(el, binding) {
    //ios qq浏览器只监听第一次titile
    if (window.navigator.userAgent.indexOf("QQ") >= 0||window.navigator.userAgent.indexOf("DingTalk")>=0) {
      var i = document.createElement("iframe");
      i.src = "https://walian.cn/favicon.ico";
      i.style.display = "none";
      i.onload = function() {
        setTimeout(function() {
          i.remove();
        }, 9);
      };
      document.title = binding.value;
      document.body.appendChild(i);
    } else {
      document.title = binding.value;
    }
  }
});
Vue.filter("fromNow", function(value, locale = "zh-cn") {
  function _(time) {
    var t = Date.now() - time;
    var mill = Math.floor(t / 1000);
    var min = Math.floor(t / 60 / 1000);
    var hour = Math.floor(t / 60 / 60 / 1000);
    var day = Math.floor(t / 24 / 60 / 60 / 1000);
    new Date(1523590321).getFullYear();
    if (new Date(time).getFullYear() != new Date().getFullYear()) {
      return moment(time)
        .locale("zh-cn")
        .format("YYYY-MM-DD");
    } else if (day - 3 >= 0) {
      return moment(time)
        .locale("zh-cn")
        .format("MM-DD");
    } else if (day - 1 >= 0) {
      if (day - 1 >= 1) {
        return "前天";
      } else {
        return "昨天";
      }
    } else if (hour - 1 >= 0) {
      if (hour >= 24) {
        return "昨天";
      } else {
        return hour + "小时前";
      }
    } else if (min - 1 >= 0) {
      if (min == 60) {
        return "1小时前";
      } else {
        return min + "分钟前";
      }
    } else if (mill - 1 >= 0) {
      if (mill == 60) {
        return "1分钟前";
      } else {
        return "1分钟内";
      }
    } else {
      return "1分钟内";
    }
  }
  return _(value);
});
Vue.filter("date", function(
  value,
  format = "YYYY-MM-DD HH:mm:ss",
  locale = "zh-cn"
) {
  return moment(value)
    .locale(locale)
    .format(format);
});
Vue.filter("secondToDate", function(value) {
  if (value) {
    var h = Math.floor(value / 3600);
    var m = Math.floor((value / 60) % 60);
    var s = Math.floor(value % 60);

    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    return m + ":" + s;
  } else {
    return "0:00";
  }
});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$app = xcqbapp;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
document.body.addEventListener("touchstart", function() {});
// export const loadScript = (url, callback) => {
//   const script = document.createElement('script')
//   script.onload = () => callback()
//   script.src = url
//   document.body.appendChild(script)
// }
// loadScript(
//   'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
//   () => {
//     // eslint-disable-next-line
//     new VConsole()
//   })
