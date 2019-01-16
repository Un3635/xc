<template>
  <div class="exchange">
    <div class="exchange-container">
      <img src="../../../static/images/hash-trade.gif" alt="">
      <h1>算力交易即将上线</h1>
      <p>敬请期待</p>
    </div>
    <x-features/>
  </div>
</template>

<script>
  import XFeatures from "../../components/x-features";

  export default {
    components: {XFeatures}
  }
</script>

<style scoped>
  .exchange-container {
    text-align: center;
    padding-top: 100px;
    padding-bottom: 50px;
  }

  h1 {
    margin-top: 40px;
    font-size: 24px;
    line-height: 30px;
  }

  p {
    margin-top: 10px;
    color: #969699;
    font-size: 14px;
    line-height: 20px;
  }
</style>
