<template>
  <div class="shopping-cart">
    <view-box body-padding-top="46px" :body-padding-bottom="bodyPaddingBottom">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">购物车</x-header>
      <router-link to="/sign-in" v-if="!isLogin">
        <div class="go-login clearfix">
          <span class="left">登录后享受更多优惠</span>
          <span class="right">去登录</span>
        </div>
      </router-link>
      <div class="no-data" v-if="productList.length == 0">
        <img src="../../assets/images/icon_gouwuchekong_normal@2x.png" alt="">
        <p>购物车还是空的</p>
        <div>
          <x-button mini type="primary">去逛逛</x-button>
        </div>
      </div>
      <div class="product-list" v-else>
        <ul>
          <li v-for="(product,index) in productList" :key="index">
            <div class="vux-1px-b">
              <div class="checked-box">
                <check-icon :value.sync="product.isChecked"></check-icon>
              </div>
              <div class="product-img">
                <img :src="product.url" alt="">
              </div>
              <div class="product-info">
                <p class="title">{{product.title}}</p>
                <p class="price">
                  <span>售价</span> <strong>{{product.price}}</strong>
                  <small>.00元</small>
                </p>
                <div>
                  <inline-x-number :min="0" :max="100" v-model="product.num" width="35px"></inline-x-number>
                </div>
              </div>
              <div class="delete-btn">
                <img @click="del" src="../../assets/images/icon_shanchu_normal@2x.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <footer class="shopping-cart-footer clearfix" slot="bottom">
        <div class="check-all left">
          <check-icon :value.sync="demo1">
            <span style="font-size: 12px">共1件</span>
          </check-icon>
        </div>
        <p class="total-price left"><span>合计: </span><strong>52,450</strong>
          <small>.00元</small>
        </p>
        <div class="right">
          <x-button type="primary" @click.native="goPay">去结算</x-button>
        </div>
      </footer>
    </view-box>
  </div>
</template>
<script>
  import {CheckIcon, InlineXNumber} from 'vux';

  export default {
    data() {
      return {
        demo1: false,
        isLogin: true,
        productList: [{
          isChecked: false,
          url: require('../../assets/images/kuangji@2x.png'),
          title: '雪豹 A1 49T比特币矿机',
          price: 52430,
          num: 2
        }, {
          isChecked: true,
          url: require('../../assets/images/kuangji@2x.png'),
          title: '雪豹 E3 230M以太坊矿机',
          price: 52430,
          num: 2
        }]
      };
    },
    components: {
      CheckIcon,
      InlineXNumber
    },
    computed: {
      bodyPaddingBottom() {
        if (this.productList.length === 0) {
          return '0px';
        }
        return '50px';
      }
    },
    mounted() {

    },
    methods: {
      del() {
        this.$vux.confirm.show({
          theme: 'ios',
          content: '确定删除该商品吗？',
          closeOnConfirm: true,
          hideOnBlur: true
        });
      },
      goPay() {
        this.$router.push('/submit-order');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .shopping-cart {
    background: #f4f4f4;
  }

  .go-login {
    font-size: 12px;
    background: #FFFAEE;
    padding: 10px 14px;
    position: relative;
    .left {
      color: #F68800;
    }
    .right {
      color: #303137;
      margin-right: 14px;
    }
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
  }

  .no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      display: block;
      margin: 0 auto 20px;
      width: 64px;
    }
    p {
      color: #ACACAC;
      font-size: 14px;
      line-height: 1em;
      margin-bottom: 12px;
    }
    div {
      width: 70px;
      margin: 0 auto;
      button {
        width: 100%;
        border-radius: 0;
        padding: 0;
      }
    }
  }

  .product-list {
    background: #fff;
    li {
      padding-left: 14px;
      position: relative;
      &:active {
        background-color: #ECECEC;
      }
      &:last-child > div:after {
        display: none;
      }
      > div {
        min-height: 104px;
        padding: 12px 48px 12px 126px;
        .checked-box {
          position: absolute;
          left: -12px;
          top: 0;
          width: 46px;
          height: 100%;
          .vux-check-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .product-img {
          position: absolute;
          left: 34px;
          top: 12px;
          width: 80px;
          height: 80px;
          background: #F6F6F6;
          border-radius: 2px;
          img {
            width: auto;
            height: 80%;
            margin: 10% auto;
            display: block;
          }
        }
        .product-info {
          .title {
            font-size: 14px;
            line-height: 1.5em;
          }
          .price {
            color: #7F7F7F;
            font-size: 0;
            margin-bottom: 7px;
            span {
              font-size: 12px;
              margin-right: 4px;
            }
            strong {
              color: #FD7220;
              font-size: 16px;
              font-weight: normal;
            }
            small {
              color: #FD7220;
              font-size: 12px;
            }
          }
          > div {
            font-size: 0;
          }
        }
        .delete-btn {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 48px;
          img {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }

  .shopping-cart-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 50px;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.10);
    .check-all {
      margin-right: 8px;
      height: 50px;
      line-height: 50px;
      .vux-check-icon {
        vertical-align: middle;
      }
    }
    .total-price {
      line-height: 50px;
      font-size: 0;
      span{
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
</style>
