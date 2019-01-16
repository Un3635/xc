<template>
  <div class="pay-result">
    <view-box body-padding-top="46px" body-padding-bottom="0px">
      <x-header slot="header" @on-click-back="go" :left-options="{backText: '',preventGoBack: true}"
                class="custom-header">
        <p>
          <span v-if="isLoading">支付结果</span>
          <span v-else>支付{{paySuccess ? '成功' : '失败'}}</span>
        </p>
      </x-header>
      <div class="order-info">
        <p class="clearfix order-num" v-if="!isRecharge">
        <!--<p class="clearfix order-num">-->
          <span class="left">订单号</span>
          <span class="left">{{orderNo}}</span>
        </p>
        <p class="clearfix order-price">
          <span class="left">支付金额</span>
          <span class="left co">{{amount | currency}}元</span>
        </p>
      </div>
      <div class="pay-status" v-show="!isLoading">
        <img src="../../assets/images/icon_zhifuchenggong_normal@2x.png" alt="" v-if="paySuccess">
        <img src="../../assets/images/icon_zhifushibai_normal@2x.png" alt="" v-else>
        <p class="status">支付{{paySuccess ? '成功' : '失败'}}</p>
        <p class="msg">{{paySuccess ? '您已成功充值' + amount + '元' : '支付遇到问题，请重新尝试支付'}}</p>
        <x-button @click.native="go" type="primary">{{paySuccess ? '支付成功' : '重新支付'}}</x-button>
      </div>
      <div v-transfer-dom>
        <loading :show="isLoading"></loading>
      </div>
    </view-box>
  </div>
</template>
<script>
  import {Loading, debounce, TransferDomDirective as TransferDom} from 'vux';
  import {OrderType} from '../../config/constants';
  import PayAPI from '../../services/pay-api';

  export default {
    data() {
      return {
        amount: 0,
        paySuccess: false,
        orderNo: '',
        redirect: '',
        isLoading: false,
        isRecharge: false,
        start: '',
        end: ''
      };
    },
    directives: {
      TransferDom
    },
    components: {
      Loading
    },
    created() {
      this.isRecharge = Number(this.$route.query.type) === OrderType.RECHARGE;
      this.amount = this.$route.query.amount;
      this.orderNo = this.$route.query.orderNo;
      this.redirectUrl = this.$route.query.redirectUrl;
      this.getResult();
    },
    methods: {
      getResult() {
        this.isLoading = true;
        this.start = new Date();
        this.alipayResult();
      },
      alipayResult() {
        PayAPI.alipayResult(this.orderNo)
          .then(res => {
            if (Number(res.result) === 1) {
              this.isLoading = false;
              this.paySuccess = true;
              this.start = '';
            } else {
              this.end = new Date();
              if (this.end - this.start >= 3000) {
                this.isLoading = false;
                this.paySuccess = false;
                return;
              }
              debounce(this.alipayResult, 400)();
            }
          })
          .catch(() => {
            this.isLoading = false;
            this.paySuccess = false;
          });
      },
      go() {
        if (this.redirectUrl) {
          this.$router.push(this.redirectUrl);
        } else {
          this.$router.push({path: '/account'});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .pay-result {
    background: #f4f4f4;
  }

  .order-info {
    background: #fff;
    padding: 18px 20px;
    font-size: 14px;
    line-height: 14px;
    .order-num {
      margin-bottom: 14px;
    }
    .order-price .co {
      font-size: 18px;
      color: #FD7220;
    }
    .left:first-child {
      width: 87px;
    }
  }

  .pay-status {
    padding: 0px 0 10px;
    text-align: center;
    img {
      width: 73px;
      height: 73px;
      display: block;
      margin: 62px auto 23px;
    }
    .status {
      font-size: 17px;
      margin-bottom: 15px;
    }
    .msg {
      color: #606166;
      font-size: 15px;
      margin-bottom: 44px;
    }
    button {
      width: 240px;
      margin: 0 auto;
    }
  }
</style>
