<template>
  <div class="inv_reg_download" v-title="'注册成功'">
    <h2 class="l1">hi,</h2>
    <h2 class="l2">欢迎加入挖链大陆！</h2>
    <div class="l3">您是在
      <span>第{{day}}日</span>来到挖链大陆的创世居民</div>
    <div class="l4">马上下载挖链APP，WT正在等您！</div>
    <img src="../../assets/qa/invite_zccg_arrow@3x.png" alt="">
    <a href="javascript:void(0)" class="btn" @click="download">下载挖链</a>
  </div>
</template>
<style lang="scss">
  @import "download.scss";
</style>
<script>
  export default {
    data() {
      return {
        day: ""
      };
    },
    mounted() {
      function getOffsetDays(time1, time2) {
        var offsetTime = Math.abs(time1 - time2);
        return Math.floor(offsetTime / (3600 * 24 * 1e3)) + 1;
      }
      this.day = getOffsetDays(
        Date.now(),
        new Date("2018-04-14T00:00:00").getTime()
      );
    },
    methods: {
      download() {
        var in_weibo =
          window.navigator.userAgent.toUpperCase().indexOf("WEIBO") >= 0;
        var in_android =
          window.navigator.userAgent.toUpperCase().indexOf("ANDROID") >= 0;
        if (in_weibo) {
          if (in_android) {
            window.location.href =
              "http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl";
          } else {
            window.location.href = "http://static.h5.walian.cn/appdownload/";
          }
        } else {
          window.location.href =
            "http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl";
        }
      }
    }
  };
</script>
