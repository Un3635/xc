<template>
  <div class="my-center">
    <view-box>
      <div class="login-temp">
        <div class="act">
          <div class="img"></div>
        </div>
        <div class="name">快捷登录</div>
      </div>
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="account line" @click="gotodetail(1)">
            <div class="balancetext ">现金账户(元)</div>
            <div class="balance">100.100</div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="account line" @click="gotodetail(2)">
            <div class="balancetext ">BTC账户(BTC)</div>
            <div class="balance">100.100</div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="account" @click="gotodetail(3)">
            <div class="balancetext ">ETH账户(ETH)</div>
            <div class="balance">100.100</div>
          </div>
        </flexbox-item>
      </flexbox>
      <div class="section order">
        <div class="op-icon">
          <div class="img"></div>
        </div>
        <div class="op-name">
          我的订单
        </div>
        <div class="op" @click="gotoOrder">
          查看全部
        </div>
      </div>
      <div class="section cart" @click="gotoCart">
        <div class="op-icon">
          <div class="img"></div>
        </div>
        <div class="op-name">
          购物车
        </div>
        <div class="op">
          查看全部
        </div>
      </div>
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>
<script>
  import footerNav from '../components/footer-nav.vue';
  import {Flexbox, FlexboxItem, Divider} from 'vux';

  export default {
    data() {
      return {};
    },
    components: {
      footerNav,
      Flexbox,
      FlexboxItem,
      Divider
    },
    mounted() {
    },
    methods: {
      gotoCart() {
        this.$router.push({path: '/shopping-cart'});
      },
      gotodetail(type) {
        this.$router.push({path: '/account', query: {type: type}});
      },
      gotoOrder() {
        this.$router.push({path: '/order'});
      }
    }
  };
</script>
<style lang="scss" scoped>
  .section {
    height: 50px;
    margin-top: 10px;
    background: #fff;
    width: 100%;
  }

  .section {
    .op-icon {
      width: 50px;
      height: 100%;
      position: relative;
      float: left;
      .img {
        width: 100%;
        height: 100%;

      }
    }
    &.order .op-icon .img {
      background-position: center center;
      background-image: url('../../assets/images/wodedingdan_normal@2x.png');
      background-size: 16px auto;
      background-repeat: no-repeat;
    }
    &.cart .op-icon .img {
      background-position: center center;
      background-image: url('../../assets/images/gerenzhongxin_gouwuche_normal@2x.png');
      background-size: 16px auto;
      background-repeat: no-repeat;
    }
    .op {
      width: 80px;
      height: 100%;
      float: right;
      font-size: 13px;
      color: #969699;
      line-height: 50px;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 6px;
        height: 11px;
        background-image: url('../../assets/images/icon_cengji_normal@2x.png');
        background-size: 6px 11px;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
      }
    }
    .op-name {
      float: left;
      font-size: 15px;
      color: #222222;
      line-height: 50px;
    }

  }

  .my-center {
    background: #f4f4f4;
    width: 100%;
    height: 100%;
  }

  .login-temp {
    /*width: 100%;*/
    height: 144px;
    background: #19202D;
    overflow: hidden;
    .act {
      width: 62px;
      height: 100%;
      float: left;
      margin-left: 6.9%;
      position: relative;
      .img {
        width: 62px;
        height: 62px;
        background: pink;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .name {
      float: left;
      font-size: 20px;
      line-height: 144px;
      color: #fff;
      text-indent: 10px;
    }
  }

  .account {
    height: 78px;
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  .account.line::after {
    content: '';
    background: #EEEEEE;
    display: block;
    width: 1px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .balancetext {
    text-align: center;
    font-size: 13px;
    margin-top: 18px;
    color: #969699;
  }

  .balance {
    color: #222222;
    font-size: 15px;
    margin-top: 9px;
    text-align: center;
  }

  .vux-flexbox-item {
    margin-left: 0;
  }
</style>
