<template>
  <el-row class="features">
    <el-col :span="6">
      <img src="../assets/images/feature_superb.png" alt="">
      <p>算力卓越</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature_flexible_trading.png" alt="">
      <p>灵活交易</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature_low_risk.png" alt="">
      <p>超低风险</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature_buy_use.png" alt="">
      <p>随买随用</p>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'x-features-powershop'
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
