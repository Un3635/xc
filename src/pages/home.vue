<template>
  <div class="home">
    <view-box body-padding-top="46px" body-padding-bottom="48px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">
        <span>首页</span>
        <div class="header-logo" slot="overwrite-left">
          <img src="../assets/images/dinglan_logo@2x.png" alt="">
        </div>
        <div class="header-shopcart" slot="right">
          <img @click="showPullDown"
               src="../assets/images/icon_gouwuche_normal@2x.png"
               alt="">
        </div>
      </x-header>
      <div class="offLine" v-if="!isOnline">
        <img src="../assets/images/icon_wuwangluo_normal@2x.png" alt="">
        <p>暂无网络，请刷新试试看</p>
        <div>
          <x-button type="primary">刷新</x-button>
        </div>
      </div>
      <div class="product-info" v-if="isOnline" ref="productInfo">
        <swiper :options="swiperOption" ref="mySwiper" v-if="isRender">
          <swiper-slide>
            <div style="padding: 44px 0 20px 0;">
              <h2 class="title">
                雪豹A1 比特币矿机
                <small class="tip">49T</small>
              </h2>
              <p class="des">可挖币种 BTC、BCH、SBTC、UBTC等</p>
              <p class="price">
                单价 <strong>22000元</strong>
              </p>
              <time>2018年5月20日 - 5月30日</time>
              <div class="product-img">
                <img src="../assets/images/kuangji@2x.png" alt="">
              </div>
              <div class="buy-btn">
                <x-button :gradients="['#56DBFF', '#1092FF']">立即购买</x-button>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div style="padding: 44px 0 20px 0;">
              <h2 class="title">
                雪豹E3 以太坊矿机
                <small class="tip">230M</small>
              </h2>
              <p class="des">可挖币种 ETH、ETC、ZCASH、HSR等</p>
              <p class="price">
                单价 <strong>29000元</strong>
              </p>
              <time>2018年5月20日 - 5月30日</time>
              <div class="product-img">
                <img src="../assets/images/e3kuangji@2x.png" alt="">
              </div>
              <div class="buy-btn">
                <x-button :gradients="['#56DBFF', '#1092FF']">立即购买</x-button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <header-pull-down :isShow="shoppingcartIsShow" @close="shoppingcartIsShow=!shoppingcartIsShow">
        <div class="product-list">
          <div class="no-data" v-if="list.length == 0">
            <p>
              <img src="../assets/images/icon_gouwuchekong_normal@2x.png" alt="">
              你的购物车是空的
            </p>
          </div>
          <ul v-else>
            <li v-for="(product,index) in list" :key="index">
              <div :class="{'vux-1px-b': index != list.length -1}">
                <router-link to="/product-detail">
                  <div class="product-img">
                    <img :src="product.url" alt="">
                  </div>
                  <p class="clearfix">
                    <span class="left title">{{product.title}}</span>
                    <span class="right num">{{product.num + '台'}}</span>
                  </p>
                </router-link>
              </div>
            </li>
          </ul>
          <group class="link-list">
            <cell-box is-link link="/cart">
              <img class="icon-shoppingcart" src="../assets/images/icon_dingdangouwuche_normal@2x.png" alt="">
              购物车({{num}})
            </cell-box>
            <cell-box is-link>
              <img class="icon-order" src="../assets/images/icon_dingdan_normal@2x.png" alt="">
              我的订单
            </cell-box>
          </group>
        </div>
      </header-pull-down>
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>

<script>
  import {Group, CellBox} from 'vux';
  import headerPullDown from './components/header-pull-down.vue';
  import footerNav from './components/footer-nav.vue';
  import CartAPI from '../services/cart-api';

  export default {
    name: 'Home',
    title() {
      return {
        title: '算立方-一站式矿机托管、算力出租、矿机购买平台',
        keywords: '算立方,算力交易出租平台,雪豹矿机官网,矿机销售,矿机托管,挖矿矿场',
        description: '算立方提供性价比最高的矿机托管销售，算力出租业务。安全稳定的矿场管理，帮助数字货币爱好者  轻松托管矿机，一站式数字货币挖矿托管首选。'
      };
    },
    data() {
      return {
//        防止虚拟dom不匹配报错
        isRender: false,
        swiperOption: {
          slidesPerView: 'auto',
          paginationClickable: true,
          direction: 'vertical',
          height: 527,
          freeMode: false
        },
        isOnline: true,
        shoppingcartIsShow: false,
        list: [],
        num: 0
      };
    },
    components: {
      Group,
      CellBox,
      headerPullDown,
      footerNav
    },
    mounted() {
      this.isRender = true;
//      小屏手机去除全屏滚动
      if (document.documentElement.clientHeight <= 620) {
        this.swiper.destroy(true, true);
        this.$refs['productInfo'].style['height'] = 'auto';
      }
      this.isOnline = window.navigator.onLine;
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    asyncData({store}) {
    },
    methods: {
      showPullDown() {
        if (this.isOnline) {
          this.shoppingcartIsShow = !this.shoppingcartIsShow;
        }
        if (this.list.length === 0) {
          this.getCartInfo();
        }
      },
      getCartInfo() {
        CartAPI.get().then(res => {
          if (res) {
            res.shoppingCartResponseList.length = 3;
            this.list = res.shoppingCartResponseList;
            this.num = res.totalNumber;
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  img {
    max-width: 100%;
    max-height: 100%;
  }

  .header-logo {
    width: 60px;
    height: 22px;
  }

  .header-shopcart {
    width: 20px;
  }

  .home {
    width: 100%;
    background: url("../assets/images/beijing_bg@2x.png") no-repeat center;
    background-size: 100% 100%;
  }

  .product-info {
    position: relative;
    height: -webkit-calc(100vh - 48px - 46px);
    height: calc(100vh - 48px - 46px);
    overflow: hidden;
    z-index: 1;
    text-align: center;
    color: #FFFFFF;
    font-size: 14px;
    .title {
      font-size: 26px;
      line-height: 38px;
      position: relative;
      margin: 0 auto 10px;
      width: 220px;
      .tip {
        position: absolute;
        right: -44px;
        top: 9px;
        font-size: 12px;
        line-height: 18px;
        padding: 0 5px;
        border: 1px solid #1092FF;
        border-radius: 2px;
        border-image: -webkit-linear-gradient(to left, #70F3F6, #1092FF) 1 1;
        border-image: -moz-linear-gradient(to left, #70F3F6, #1092FF) 1 1;
        border-image: linear-gradient(to left, #70F3F6, #1092FF) 1 1;
        &:before, &:after {
          content: '';
          width: 0;
          height: 0;
          position: absolute;
          border: 6px solid #1092FF;
          border-left-color: transparent;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
          left: -12px;
          top: 4px;
        }
        &:after {
          border: 6px solid #060e1c;
          border-left-color: transparent;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
          left: -10px;
        }
      }
    }
    .des {
      opacity: 0.5;
      font-size: 14px;
      line-height: 15px;
      margin-bottom: 17px;
    }
    .price {
      font-size: 14px;
      strong {
        margin-left: 10px;
        font-size: 24px;
        color: #F08821;
        line-height: 34px;
      }
    }
    time {
      display: block;
      margin-bottom: 20px;
    }
    .product-img {
      height: 228px;
      margin: 0 auto 30px;
    }
    .buy-btn {
      width: 75%;
      margin: 0 auto;
    }
  }

  .product-list {
    background: #fff;
    position: relative;
    z-index: 101;
    .no-data {
      padding: 24px 0;
      text-align: center;
      color: #CCCDCF;
      img {
        width: 32px;
        height: 25px;
        margin-right: 7px;
        vertical-align: middle;
      }
    }
    .link-list {
      .vux-cell-box {
        font-size: 14px;
        line-height: 26px;
      }
      img {
        margin-right: 15px;
        vertical-align: middle;
      }
      .icon-shoppingcart {
        width: 19px;
        height: 20px;
      }
      .icon-order {
        width: 16px;
        height: 18px;
      }
    }
    ul {
      li {
        padding-left: 23px;
        line-height: 60px;
        &:active {
          background-color: #ECECEC;
        }
        > div {
          position: relative;
          height: 84px;
          padding: 12px 12px 12px 70px;
        }
        .product-img {
          position: absolute;
          width: 60px;
          height: 60px;
          top: 12px;
          left: 0;
          background: #F6F6F6;
          border-radius: 4px;
          img {
            width: 80%;
            height: 80%;
            margin: 10%;
            display: block;
          }
        }
      }
    }
  }

  .offLine {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      width: 105px;
      margin-bottom: 28px;
    }
    p {
      font-size: 16px;
      color: #7F7F7F;
      line-height: 16px;
      margin-bottom: 30px;
    }
    div {
      width: 80%;
      margin: 0 auto;
      button.weui-btn {
        border-radius: 2px;
      }
    }
  }
</style>
