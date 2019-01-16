<template>
  <div class="error">
    <div class="img" v-if="error.statusCode===404">
      <img src="../assets/images/404.png" alt="">
      <p class="text">ページはマイニングプールに落ちました！クリックしホームページに戻ります</p>
    </div>
    <div class="img" v-if="error.statusCode===500">
      <p class="text">ポート請求は間違いました</p>
      {{error}}
    </div>
    <div class="btn">
      <nuxt-link to="/">ホームページに戻ります</nuxt-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'full'
  };
</script>
<style lang="scss" scoped>
  .error {
    width: 100%;
    overflow: hidden;
    padding-top: 100px;

    .img {
      width: 50%;
      margin: 0 auto;

      img {
        width: 100%;
        display: block;
      }
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
