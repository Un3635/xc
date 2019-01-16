<template>
  <div class="cashier-result">
    <div class="cashier-result-content">
      <div class="tip-icon">
        <img src="../../assets/images/icon_success_big.png" v-if="code === 1000">
        <img src="../../assets/images/fail.png" v-if="code !== 1000">
      </div>
      <div class="tip-txt">
        <div class="tip-txt-title">{{title}}</div>
        <div class="tip-txt-tip">{{tip}}</div>
      </div>
      <div class="close-btn" @click="closePage">关闭</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'cashierResult',
      data(){
        return{
          msg: '',
          code: '',
          title: '',
          tip: '',
          outTradeNo: '',
          tradeNo: '',
          totalAmount: '',
          sellerId: '',
          appid: '',
          msgSuccess: {
            charge: '充值成功',
            transfer: '汇款信息已提交',
            orderRepay: '订单付款成功',
            repay: '账单还款成功',
            alipay: '支付成功',
          },
          msgFail: {
            charge: '充值失败',
            transfer: '汇款信息提交失败',
            orderRepay: '订单付款失败',
            repay: '账单还款失败',
          },
        }
      },
      methods:{
        closePage(){
          //解决新版Firefox和Chrome不能关闭当前页面的问题
          window.location.href="/";
          window.close();
        },
        alipayInfo(){
          var dataObj = {
            out_trade_no: this.outTradeNo,
            trade_no: this.tradeNo,
            total_amount: this.totalAmount,
            seller_id: this.sellerId,
            appid: this.appid
          };
          this.$http.post('/pay/zfbInfo', dataObj);
        }
      },
      created(){
        this.msg = this.$route.params.msg || 'alipay';
        this.tip = this.$route.params.data || '';
        this.code = Number(this.$route.params.code) || 1000;
        this.outTradeNo = this.$route.query.out_trade_no;
        this.tradeNo = this.$route.query.trade_no;
        this.totalAmount = this.$route.query.total_amount;
        this.sellerId = this.$route.query.seller_id;
        this.appid = this.$route.query.appid;
        if (!this.appid){
          this.appid = this.$route.query.app_id;
        }
        this.alipayInfo();
        if(this.code === 1000){
          switch(this.msg){
            case 'charge':
              this.title = this.msgSuccess.charge;
              break;
            case 'transfer':
              this.title = this.msgSuccess.transfer;
              break;
            case 'alipay':
              this.title = this.msgSuccess.alipay;
              break;
          }
        }else{
          switch(this.msg){
            case 'charge':
              this.title = this.msgFail.charge;
              break;
            case 'transfer':
              this.title = this.msgFail.transfer;
              break;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .cashier-result{
    margin:29px auto;
    width:1200px;
    height:445px;
    background: #FFFFFF;
    /*line-height: 445px;*/
    text-align:center;
    .cashier-result-content{
      height:186px;
      display: inline-block;
      text-align: center;
      .tip-icon{
        margin-top:81px;
        img{
          width:80px;
          height:80px;
        }
      }
      .tip-txt{
        margin-top:24px;
        .tip-txt-title{
          width:auto;
          height:25px;
          /*margin-left:10px;*/
          font-size: 18px;
          color: #333333;
          font-weight:bold;
        }
        .tip-txt-tip{
          font-size: 14px;
          color: #999999;
          margin-top: 10px;
        }
      }
      .close-btn{
        display: inline-block;
        width: auto;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 18px;
        color: #FFFFFF;
        background: #6ECC66;
        border-radius: 4px;
        cursor: pointer;
        padding-left: 34px;
        padding-right: 34px;
        margin-top:50px;
        &:hover {
          background: #81CC7A;
        }
        &:active {
          background: #50B347;
        }
      }
    }
  }
</style>
