<template>
    <div v-title="'测测你的区块链知识'" class="qasharedownload">
        <img src="../../assets/qa/qa_zccg@3x.png" alt="">
        <a href="javascript:void(0)" class="btn" @click="download">下载挖链</a>
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
