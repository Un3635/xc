<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <h2>第一步：</h2>
      <p>与小虫快租客服进行联系<span>【400-836-5566】</span></p>
      <h2>第二步：</h2>
      <p>小虫快租客服指导您进行赔偿流程</p>
      <h2>第三步：</h2>
      <p>请您充值赔偿金到账户</p>
      <h2>第四步：</h2>
      <p>小虫快租扣除赔偿金</p>
      <h2>第五步：</h2>
      <p>小虫快租取消丢失机器的账单</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    components: {
      plugin_title: plugin_title
    },
    data () {
      return {
        parentMsg: '机器丢失怎么办'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 120px;
    .r-content{
      padding: 30px;
      h2{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
        font-weight:bold;
      }
      p{
        font-size: 14px;
        color: #151515;
        letter-spacing: 0;
        line-height: 30px;
        margin-bottom:30px;
        span{
          color: #FA5C1E;
        }
      }
    }
  }
</style>
