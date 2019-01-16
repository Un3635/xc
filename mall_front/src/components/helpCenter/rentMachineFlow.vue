<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <h3>所有过程均可在线完成：</h3>
      <ul class="r-message">
        <li>
          <h3>1.选择机型：</h3>
          <p>在“所有机型”页面选择您所需的机型，点击进入可查看并选择机器详细配置。选择好机型配置后，点击“立即下单”或“加入购物车”结算即可。</p>
        </li>
        <li>
          <h3>2.申请免押金额度：</h3>
          <p>在“个人中心->免押金额度”中提交资料，并在线获得免押金额度。目前仅支持企业申请免押金额度。需提交申请人及企业相关证件照片。</p>
        </li>
        <li>
          <h3>3.提交订单：</h3>
          <p>系统将根据您选择的机型及免押金额度自动生成订单，请确认机型配置、金额、配送地址、<span style="color: #8CD686">企业账单日</span>，并选择支付方式，即可提交订单。</p>
        </li>
        <li>
          <h3>4.支付首期租金：</h3>
          <p>通过支付宝、微信或线下转账支付首期租金。</p>
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
        parentMsg: '租机流程'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 116px;
    .r-content{
      padding: 30px;
      h3{
        font-family: MicrosoftYaHei-Bold;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: bold;
      }
      .r-message{
        li{
          padding-top: 30px;
          p{
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #151515;
            letter-spacing: 0;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
