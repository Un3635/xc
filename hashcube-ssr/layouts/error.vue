<template>
  <div class="error">
    <div class="img"></div>
    <div class="text">页面掉进在矿池啦，点击返回首页</div>
    <div class="btn">
      <nuxt-link to="/">返回首页</nuxt-link>
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
      background: url('../assets/images/img_404.png') no-repeat center;
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
      margin: 30px auto 0;
      cursor: pointer;
    }
  }
</style>
