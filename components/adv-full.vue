<template>
  <el-row class="adv-full">
    <el-col :span="24" v-for="(i,idx) in list" :key="idx">
      <a :href="i.link" target="_blank">
        <img :src="i.picture" alt="">
      </a>
    </el-col>
  </el-row>
</template>
<style lang="scss">
  .adv-full {
    &.newsdetail {
      margin-top: 56px;
      .el-col {
        margin-bottom: 16px;
      }
    }
    &.tagRightBottom {
      margin-top: 26px;
      .el-col {
        margin-bottom: 16px;
      }
    }
    .el-col {
      margin-bottom: 7px;
      img {
        height: 100px;
        width: 100%;
      }
    }
  }
</style>
<script>
  export default {
    name: "adv-full",
    props: {
      list: {
        type: Array
      }
    }
  };
</script>
