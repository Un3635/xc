<template>
  <div class="error">
    <div class="img"></div>
    <div class="text">页面掉进在矿池啦，点击返回首页</div>
    <div class="btn">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .error {
    width: 100%;
    height: 800px;
    overflow: hidden;
    .img {
      width: 100%;
      height: 249px;
      margin-top: 200px;
      background-image: url('../../assets/images/img_404.png');
      background-image: -webkit-image-set(url("../../assets/images/img_404.png") 1x, url("../../assets/images/img_404@2x.png") 2x);
      background-repeat: no-repeat;
      background-position: center center;
    }
    .text {
      width: 100%;
      margin-top: 50px;
      text-align: center;
      font-size: 16px;
      color: #333;
    }
    .btn {
      width: 120px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: #fff;
      background: #333;
      margin: 0 auto;
      margin-top: 30px;
      cursor: pointer;
    }
  }
</style>
