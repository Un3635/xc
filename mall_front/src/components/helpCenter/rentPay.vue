<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <ul class="r-pay">
        <li>
          <i></i>
          <p>首月租金在下单时支付。此后您可选择<span>每月10日、15日、25日</span>作为每月租金统一付款日。<span>一经选择，无法修改，请谨慎选择！</span></p>
        </li>
        <li>
          <i></i>
          <p>系统将在统一付款日自动从您的账户余额中扣除每月租金，请保证账户余额充足。</p>
        </li>
        <li>
          <i></i>
          <p>若您的账户余额不足，系统将提前3天发送短信提醒您充值。扣款成功（或失败）后，系统也将发送扣款结果通知短信。</p>
        </li>
      </ul>
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
        parentMsg: '租金缴付'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    min-height: 500px;
    .r-content{
      .r-pay{
        padding: 30px;
        li{
          padding-bottom:20px;
          span{
            color: #FA5C1E;
          }
          i{
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            border: 1px solid #333333;
          }
          p{
            display: inline-block;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 15px;
          }
        }
      }
    }
  }
</style>
