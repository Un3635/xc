<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <p>小虫快租将授予您一定的“免押金额度”，只要您所租赁电脑的总押金价值在免押金额度之内，您将无需为此电脑支付押金，从而帮助您的企业降低资金成本，释放流动性。</p>
      <p>免押金额度将与您所在企业的资质有关，您可进入“个人中心-><router-link to="/freeDeposit"><span>免押金额度</span></router-link>"页面以申请或查看您当前的免押金额度。</p>
      <p>您提供下述任意一项即可提升免押金额度：人民银行征信报告（最近一周内的信息）；经营场所证明（房本、租赁合同、水电煤账单）；企业近半年社保/公积金缴纳记录；公司的对公流水（过往3个月）；近一年的资产负债表；近一年的利润表；近一年的现金流量表。</p>
      <p style="margin-bottom: 0">小虫快租欢迎您提供更多真实信息以获得更高的免押金额度。</p>
      <p>若您希望进一步了解并提高免押金额度，请致电 400-836-5566。</p>
      <h2><span>Step1</span>:申请免押金</h2>
      <img src="../../assets/images/step1.png" alt="">
      <h2><span>Step2</span>:企业认证</h2>
      <img src="../../assets/images/step2.png" alt="">
      <h2><span>Step3</span>:提交资料</h2>
      <img src="../../assets/images/step2.png" alt="">
      <h2><span>Step4</span>:等待审核</h2>
      <img src="../../assets/images/step3.png" alt="">
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
        parentMsg: '什么是免押金额度'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    .r-content{
      width: 930px;
      padding: 0 30px;
      span{
        color: #6ECC66;
      }
      img{
        width: 930px;
        margin-bottom: 30px;
      }
      h2{
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
      }
      p{
        font-size: 14px;
        color: #151515;
        letter-spacing: 0;
        line-height: 30px;
        margin-bottom: 20px;
        a{
          font-size: 14px;
          color: #3F3F3F;
          letter-spacing: 0;
          line-height: 30px;
        }
        a:hover{
          color: #6ECC66;
        }
      }
    }
  }
</style>
