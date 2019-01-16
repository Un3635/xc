<template>
  <el-row class="features">
    <el-col :span="6">
      <img src="../assets/images/feature-1.png" alt="">
      <p>算力超群</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature-2.png" alt="">
      <p>效率高超</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature-3.png" alt="">
      <p>经久耐用</p>
    </el-col>
    <el-col :span="6">
      <img src="../assets/images/feature-4.png" alt="">
      <p>品质可靠</p>
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
    height: 45px;
    width: auto;
  }

  p {
    margin-top: 20px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }
</style>
