<template>
  <div class="icons">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="icon">
            <img src="../../assets/images/free_deposit.png" alt="">
          </div>
          <div class="icon_text">
            <span>企业免押金</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="icon">
            <img src="../../assets/images/leaseSend.png" alt="">
          </div>
          <div class="icon_text">
            <span>租完即送</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="icon">
            <img src="../../assets/images/lightning.png" alt="">
          </div>
          <div class="icon_text">
            <span>闪电租赁</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="icon">
            <img src="../../assets/images/guarantee.png" alt="">
          </div>
          <div class="icon_text">
            <span>全程保修</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name:'bottom_icons',
    }
</script>

<style scoped lang="scss">
  .icons {
    padding-top: 30px;
    padding-bottom: 34px;
    max-width: 1200px;
    margin: 0 auto;
    .icon {
      width: 58px;
      height: 58px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .icon_text {
      font-size: 18px;
      color: #333333;
      margin-top: 28px;
    }
  }
</style>
