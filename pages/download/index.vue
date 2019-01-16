<template>
  <div class="page_download">
    <img src="../../assets/img/common_xiazai@3x.png" alt="">
    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl&channel=0002160650432d595942&fromcase=60001">立即下载</a>
  </div>
</template>
<script>
  export default {
    layout: "download"
  };
</script>
<style lang="scss">
  @import "../../other/util.scss";
  .page_download {
    position: relative;
    background-color: #4d87ea;
    height: 100%;
    img {
      width: 100%;
    }
    a {
      width: p2r(343);
      line-height: p2r(44);
      display: block;
      position: fixed;
      bottom: p2r(103);
      left: p2r(16);
      border: 1px solid #ffffff;
      border-radius: p2r(4);
      font-size: p2r(16);
      color: #ffffff;
      text-align: center;
    }
  }
</style>
