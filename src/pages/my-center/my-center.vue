<template>
  <div class="my-center">
    <view-box body-padding-top="0px" body-padding-bottom="48px">
      <div class="inner-view-box">
        <div class="content-box">
          <div class="login-temp">
            <div class="name" v-if="!login">亲,  等你很久了哦</div>
            <div class="login-btn" v-if="!login" @click="gotologin">快捷登录</div>
            <div class="img" v-if="login"></div>
          </div>
          <div class="section  cash" @click="gotodetail('account')">
            <!-- <div  class="op-icon">
                <div  class="img">
                    <img  src="../../assets/images/icon_jine1_normal@2x.png"  alt="">
                </div>
            </div> -->
            <div class="op-name">
              账户余额(元)
            </div>
            <div class="op">
              <span v-if="!login">--</span>
              <span v-else>
                        <span class="golden">
                            ￥
                        </span>
                        {{accountInfo.totalMoney + accountInfo.withdrawalFreezeMoney | currency}}
                    </span>
            </div>
          </div>
          <div class="section" v-for="(item,index)  in (!login ? tabList = tabList_default : tabList)" :key="index"
               @click="gotodetail(item)">
            <!-- <div  class="op-icon">
                <div  class="img">
                    <img  :src="item.img"  alt="">
                </div>
            </div> -->
            <div class="op-name  ">
              {{item.currencyName}}账户
            </div>
            <div class="op">
              <span v-if="!login">--</span>
              <span v-else>{{(item.currencyCount || 0) + (item.currencyFreezeNumber || 0) | cryptocurrency}}</span>
            </div>
          </div>
          <div class="section  invite" @click="gotodetail('my-request')">
            <!-- <div  class="op-icon">
                <div  class="img">
                    <img  src="../../assets/images/icon_yaoqing_normal@3x.png"  alt="算立方">
                </div>
            </div> -->
            <div class="op-name  ">
              我的邀请
            </div>
            <div class="op">
            </div>
          </div>
          <div class="section  signout" @click="quit" v-if="login && !$store.state.isOtherPlatform">退出登录</div>
        </div>
        <div class="infos">
          <span>更多服务请用PC访问  www.hc.top</span>
        </div>
      </div>
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>
<script>
  import footerNav from '../components/footer-nav.vue';
  import {Flexbox, FlexboxItem} from 'vux';
  import AccountApi from '../../services/account-api';
  import {mapState} from 'vuex';
  import {ActionsTypes} from '../../store/actions';

  export default {
    data() {
      return {
        accountInfo: '',
        tabList: [],
        tabList_default: [
          {currencyName: 'BTC', currencyCount: 0, currencyFreezeNumber: 0, currencyId: 1},
          {currencyName: 'ETH', currencyCount: 0, currencyFreezeNumber: 0, currencyId: 2},
          {currencyName: 'DCR', currencyCount: 0, currencyFreezeNumber: 0, currencyId: 3},
          {currencyName: 'BTM', currencyCount: 0, currencyFreezeNumber: 0, currencyId: 4}
        ]
      };
    },
    components: {
      footerNav,
      Flexbox,
      FlexboxItem
    },
    computed: {
      ...mapState(['login'])
    },
    watch: {
      login: {
        handler(val) {
          if (val) {
            this.getuserMoneyTotal();
            this.getuserAccountCurrencyList();
          }
        },
        immediate: true
      }
    },
    methods: {
      quit() {
        const _this = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '确定退出登录？',
          onConfirm() {
            _this.$store.dispatch(ActionsTypes.LOGIN_OUT);
          }
        });
      },
      getuserAccountCurrencyList() {
        AccountApi.userAccountCurrencyList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.tabList = res;
          });
      },
      gotologin() {
        this.$parent.goSignIn();
      },
      getuserMoneyTotal() {
        AccountApi.userMoneyTotal().then(res => {
          this.accountInfo = res || {};
        });
      },
      gotodetail(data) {
        if (!this.login) {
          this.gotologin();
          return;
        }
        if (data === 'account') {
          this.$router.push({path: '/account'});
        } else if (data === 'my-request') {
          this.$router.push({path: '/invitation'});
        } else {
          this.$router.push({path: '/account', query: {type: data.currencyId}});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .inner-view-box {
    display: flex;
    flex-direction: column;
  }

  .content-box {
    min-height: calc(100vh - 91px);
  }

  .infos {
    padding: 12px 0;
    width: 100%;
    font-size: 13px;
    color: #969699;
    text-align: center;
  }

  .golden {
    padding-right: 2px !important;
    font-size: 14px;
    color: #F08821;
  }

  .section {
    height: 50px;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
  }

  .section.signout {
    border: none;
    text-align: center;
    margin-top: 10px;
    color: #E94C4C;
    font-size: 15px;
    line-height: 50px;
  }

  .section.cash {
    margin-bottom: 10px;
  }

  .section.invite {
    margin-top: 10px;
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
        text-align: center;
        position: relative;
        img {
          width: 22px;
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
        }
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
      width: auto;
      height: 100%;
      float: right;
      font-size: 15px;
      // color: #969699;
      color: #333333;
      line-height: 50px;
      position: relative;
      span {
        width: auto;
        padding-right: 25px;
        &.golden {
          padding-right: 2px;
          font-size: 14px;
          color: #F08821;
        }
      }
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
      padding-left: 20px;
      font-size: 15px;
      color: #222222;
      line-height: 50px;
      &.indent {
        text-indent: 17px;
      }
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
    background-image: url('../../assets/images/gerenzhongxin_bg@2x.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    .img {
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/gerenzhongxin_logo_bormal.png');
      background-size: 150px auto;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .name {
      text-align: center;
      opacity: 0.8;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0;
      margin-top: 48px;
    }
    .login-btn {
      border: 1px solid #FFFFFF;
      border-radius: 2px;
      width: 110px;
      text-align: center;
      margin: 0 auto;
      margin-top: 18px;
      height: 33px;
      line-height: 33px;
      font-size: 16px;
      color: #fff;
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
