<template>
  <div class="submit-order">
    <view-box body-padding-top="46px" body-padding-bottom="50px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">确认订单</x-header>
      <div class="address-info">
        <div v-if="hasAddress">
          <router-link to="/select-address">
            <div class="icon-position">
              <img src="../../assets/images/icon_dingwei_normal@2x.png" alt="">
            </div>
            <div class="detail">
              <p><span>陆伟</span>159****2771</p>
              <span>上海市徐汇区云锦路500号绿地汇中心B座913室(周末办公室有人)</span>
            </div>
          </router-link>
        </div>
        <div v-else class="address-none">
          <img src="../../assets/images/icon_tianjiadizhi_normal@2x.png" alt="">
          <span>新建收货地址</span>
        </div>
      </div>
      <div class="product-list">
        <h3 class="vux-1px-b">商品信息</h3>
        <ul>
          <li v-for="(item,index) in productList" :key="index">
            <div class="product-info">
              <div class="img">
                <img :src="item.url" alt="">
              </div>
              <div class="info">
                <p class="title">{{item.title}}</p>
                <p class="des">{{item.des}}</p>
                <div class="clearfix">
                  <p class="left"><strong>{{item.price}}</strong>
                    <small>.00元</small>
                  </p>
                  <span class="right">{{item.num}}台</span>
                </div>
              </div>
            </div>
            <footer>
              <div class="clearfix vux-1px-t">
                <span class="left">发货时间</span>
                <span class="right">{{item.time}}</span>
              </div>
            </footer>
          </li>
        </ul>
      </div>
      <div class="discount">
        <group>
          <cell>
            <p class="discount-money">6,000.00元</p>
            <template slot="title">
              <span class="discount-title">优惠金额<img @click="showDiscountDetail"
                                                    src="../../assets/images/icon_tishi_normal@2x.png" alt=""></span>
            </template>
          </cell>
        </group>
      </div>
      <div class="pay-info">
        <ul>
          <li class="clearfix">
            <p class="left">
              <img src="../../assets/images/icon_jine_normal@2x.png" alt="">
              商品金额
            </p>
            <p class="right">1086,000.00元</p>
          </li>
          <li class="clearfix">
            <p class="left">
              <img src="../../assets/images/icon_youhui_normal@2x.png" alt="">
              优惠抵扣
            </p>
            <p class="right co">-6,000.00元</p>
          </li>
          <li class="clearfix">
            <p class="left">
              <img src="../../assets/images/icon_yunfei_normal@2x.png" alt="">
              运费
            </p>
            <p class="right">0.00元</p>
          </li>
        </ul>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="show" class="order-confirm-dialog" :hide-on-blur="true"
                  :dialog-style="{'padding':'17px 20px','height': '245px'}">
          <header>订单确认</header>
          <div class="order-confirm">
            <p class="phone">
              <span>手机号</span>
              <span>+86</span>
              <span>150****0800</span>
            </p>
            <div class="vcode vux-1px">
              <div class="code">
                <input type="text" placeholder="短信验证码">
              </div>
              <div class="vcode-btn">
                <input type="button" value="获取验证码">
              </div>
              <p class="error-info">提示错误</p>
            </div>
          </div>
          <footer>
            <x-button @click.native="submitOrder" type="primary">确认提交</x-button>
          </footer>
        </x-dialog>
      </div>
      <footer slot="bottom" class="submit-order-footer clearfix">
        <div class="left">
          <p><span>实付款：</span><strong>1080,000</strong>
            <small>.00元</small>
          </p>
        </div>
        <div class="right">
          <x-button type="primary" @click.native="submit">提交订单</x-button>
        </div>
      </footer>
    </view-box>
  </div>
</template>
<script>
  import {Group, Cell, XDialog, TransferDom} from 'vux';

  export default {
    data() {
      return {
        productList: [{
          url: require('../../assets/images/kuangji@2x.png'),
          title: '雪豹 A1 49T比特币矿机',
          des: '商品特色介绍，不超过18个字符',
          price: 52430,
          num: 20,
          time: '2018年3月27日 ~ 2018年4月2日'
        }, {
          url: require('../../assets/images/kuangji@2x.png'),
          title: '雪豹以太坊矿机E3 230M',
          des: '商品特色介绍，不超过18个字符',
          price: 52430,
          num: 20,
          time: '2018年3月27日 ~ 2018年4月2日'
        }],
        hasAddress: true,
        show: false
      };
    },
    components: {
      Group,
      Cell,
      XDialog
    },
    directives: {
      TransferDom
    },
    mounted() {

    },
    methods: {
      showDiscountDetail() {
        let html = '<span style=\'color:#FD7220;\'>300元</span> * 20台' +
          '<br />' +
          '抵扣<span style=\'color:#FD7220;\'>6,000元</span>';
        this.$vux.alert.show({
          title: '黄金优惠码优惠',
          content: html,
          buttonText: '我知道了',
          hideOnBlur: true
        });
      },
      submit() {
        if (!this.hasAddress) {
          this.$vux.toast.text('请输入收货地址', 'middle');
        } else {
          this.show = true;
        }
      },
      submitOrder() {
        this.show = false;
        this.$router.push('/cashier-center');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .submit-order {
    background: #f4f4f4;
  }

  .address-info {
    background: #fff;
    margin-bottom: 10px;
    padding: 18px 25px 18px 40px;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      background: url("../../assets/images/dizhifengexian_bg@2x.png") repeat-x center;
    }
    .address-none {
      padding: 20px 0;
      text-align: center;
      font-size: 0;
      span {
        line-height: 24px;
        font-size: 14px;
      }
      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        vertical-align: bottom;
      }
    }
    .icon-position {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      width: 40px;
      img {
        width: 12px;
        height: 15px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .detail {
      &::before {
        content: " ";
        display: inline-block;
        height: 7px;
        width: 7px;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 14px;
        border-width: 1px 1px 0px 0px;
        border-color: #505050;
        border-style: solid;
      }
      > p {
        font-size: 16px;
        color: #222222;
        line-height: 1em;
        margin-bottom: 5px;
        span {
          margin-right: 10px;
        }
      }
      > span {
        display: block;
        color: #505050;
        font-size: 14px;
        line-height: 1.5em;
      }
    }
  }

  .product-list {
    > h3 {
      background: #fff;
      padding: 0 14px;
      font-size: 14px;
      line-height: 40px;
      font-weight: normal;
    }
    li {
      position: relative;
      margin-bottom: 10px;
      background: #fff;
      .product-info {
        min-height: 104px;
        padding: 12px 14px 12px 107px;
        .img {
          position: absolute;
          left: 14px;
          top: 12px;
          width: 80px;
          height: 80px;
          background: #F6F6F6;
          border-radius: 2px;
          img {
            height: 80%;
            width: auto;
            margin: 10% auto;
            display: block;
          }
        }
        .title {
          font-size: 14px;
          line-height: 26px;
        }
        .des {
          font-size: 12px;
          color: #969699;
          line-height: 1.5em;
          margin-bottom: 15px;
        }
        .left {
          font-size: 0;
          strong {
            line-height: 1em;
            color: #FD7220;
            font-size: 18px;
            font-weight: normal;
          }
          small {
            color: #FD7220;
            font-size: 12px;
          }
        }
        .right {
          font-size: 12px;
        }
      }
      footer {
        padding: 0 14px;
        line-height: 44px;
        height: 44px;
        .left {
          color: #606166;
        }
        .right {
          font-size: 12px;
        }
      }
    }

  }

  .discount {
    margin-bottom: 10px;
    .discount-title {
      color: #606166;
      font-size: 14px;
      line-height: 25px;
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    .discount-money {
      line-height: 25px;
      color: #FD7220;
      font-size: 14px;
    }
  }

  .pay-info {
    margin-bottom: 10px;
    background: #fff;
    padding: 10px 14px;
    li {
      line-height: 34px;
      font-size: 14px;
      color: #303137;
      img {
        width: 13px;
        height: 13px;
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -2px;
      }
      .co {
        color: #FD7220;
      }
    }
  }

  .submit-order-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 50px;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.10);
    .left {
      line-height: 50px;
      padding-left: 18px;
      font-size: 0;
      span {
        font-size: 12px;
      }
      strong {
        font-weight: normal;
        color: #FD7220;
        font-size: 18px;
      }
      small {
        color: #FD7220;
        font-size: 12px;
      }
    }
    .right {
      width: 33.33%;
      height: 100%;
      button {
        height: 100%;
        width: 100%;
        border-radius: 0;
      }
    }
  }

  .order-confirm-dialog {
    header {
      font-size: 16px;
      line-height: 26px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .order-confirm {
      .error-info {
        position: absolute;
        top: 45px;
        left: 0;
        line-height: 23px;
        color: #F95453;
        font-size: 12px;
      }
      p.phone {
        text-align: left;
        font-size: 14px;
        padding: 18px 0;
        line-height: 1em;
        span{
          margin-right: 8px;
        }
      }
      .vcode {
        position: relative;
        background: #FAFAFA;
        height: 45px;
        margin-bottom: 30px;
        padding-right: 92px;
        &.vux-1px {
          &::before, &::after {
            border-radius: 2px;
            border-color: #EDEEF0;
          }
        }
        input {
          width: 100%;
          font-size: 14px;
          &::-webkit-input-placeholder {
            color: #CCCDCF;
          }
        }
        .code {
          padding: 13px 12px 0;
          position: relative;
          z-index: 1;
        }
        .vcode-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: 92px;
          height: 45px;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 28px;
            width: 1px;
            background: #eaeaea;
            top: 7px;
          }
          input[type="button"] {
            font-size: 14px;
            color: #303137;
            height: 45px;
            &:disabled{
              color: #969696;
            }
          }
        }
      }
    }
  }
</style>
