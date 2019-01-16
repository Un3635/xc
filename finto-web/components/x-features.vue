<template>
  <el-row class="features">
    <el-col :span="6">
      <img src="../assets/images/features/feature_superb.png" alt="">
      <p>安定なハッシュパワー</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/features/feature_flexible_trading.png" alt="">
      <p>多様な取引種類</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/features/feature_low_risk.png" alt="">
      <p>安心なサポート体制</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/features/feature_buy_use.png" alt="">
      <p>誰でも簡単にマイニング</p>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'x-features'
  };
</script>

<style scoped>
  .features {
    background-color: #fff;
    text-align: center;
    padding: 50px 120px;
  }

  img {
    width: 65px;
  }

  p {
    margin-top: 20px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }
</style>
