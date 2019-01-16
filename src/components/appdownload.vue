<template>
  <div class="download">
    <img src="../assets/guanyu_logo@3x.png" alt="">
    <div class="downloadinfo">
      <div class="d1">挖链</div>
      <div class="d2">看区块链资讯,得WT糖果</div>
    </div>
    <button @click="download">下载</button>
  </div>
</template>
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
<style lang="scss" scoped>
  @import "../common/util.scss";
  .download {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: p2r(60);
    background-color: #f8f9fd;
    img {
      width: p2r(40);
      height: p2r(40);
      float: left;
      margin-top: p2r(10);
      margin-left: p2r(15);
    }
    .downloadinfo {
      float: left;
      margin-left: p2r(8);
      margin-top: p2r(13);
      .d1 {
        font-size: p2r(15);
        color: #232426;
        margin-bottom: p2r(4);
      }
      .d2 {
        font-size: p2r(12);
        color: #98999b;
      }
    }
    button {
      float: right;
      width: p2r(65);
      height: p2r(30);
      text-align: center;
      line-height: p2r(30);
      background-color: #4d87ea;
      border-radius: p2r(4);
      color: white;
      font-size: p2r(14);
      margin-top: p2r(15);
      margin-right: p2r(31);
    }
  }
</style>
