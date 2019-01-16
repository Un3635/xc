<template>
  <div class="inv_reg_download_v130" v-title="'注册成功'">
    <img src="../../assets/inv130/wllogo2.png" alt="" class="inv_reg_download_v130_logo">
    <div class="inv_reg_download_v130_title">点击下载挖链APP，<br> 马上领取你的BTC（ETH/算力）！
    </div>
    <img src="../../assets/qa/invite_zccg_arrow@3x.png" alt="" class="inv_reg_download_v130_dp">
    <a href="javascript:void(0)" class="inv_reg_download_v130_btn" @click="download">下载挖链</a>
  </div>
</template>
<style lang="scss">
  @import "download.scss";
</style>
<script>
  export default {
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
