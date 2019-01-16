<template>
  <div id="gn-header">
    <div class="header__inner">
      <nuxt-link class="logo" to="/"/>
      <el-menu :default-active="activeIndex" active-text-color="#FFE6A1" text-color="#FFF" class="menu"
               mode="horizontal" :router="true">
        <el-menu-item class="menu-item" :index="menuItem.index" :route="menuItem.path"
                      v-for="menuItem in menuItems" :key="menuItem.index">
          {{menuItem.label}}
        </el-menu-item>
      </el-menu>
      <div class="right text-right">
        <el-menu class="menu login" :class="{'is-login':isLogin}" mode="horizontal">
          <el-menu-item class="menu-item sign-in" index="sign-in" @click="$router.replace('/sign-in')">登录</el-menu-item>
          <el-menu-item class="menu-item sign-up" index="sign-up" @click="$router.replace('/sign-up')">注册</el-menu-item>
          <el-menu-item class="menu-item cart" index="cart">
            <template slot="title">
              <nuxt-link to="/cart" class="go-cart">
                <img src="../assets/images/cart.svg" alt="">
                <span v-if="cartGoodsCount>0" class="badge">{{cartGoodsCount>99?'99+':cartGoodsCount}}</span>
              </nuxt-link>
            </template>
          </el-menu-item>
          <no-ssr>
            <el-submenu class="mine" index="user" menu-trigger="hover">
              <template slot="title">
              <span @click="$router.push('/i')">
                 <img class="icon-my-center" src="../assets/images/person.svg" alt="">
                  个人中心
              </span>
              </template>
              <el-menu-item index="user" @click="$router.push('/i/account')">我的账户</el-menu-item>
              <el-menu-item index="user-order" @click="$router.push('/i/order')">我的订单</el-menu-item>
              <el-menu-item index="user-trusteeship" @click="$router.push('/i/trust')">我的托管</el-menu-item>
              <el-menu-item index="user-compute" @click="$router.push('/i/power')">我的云算力</el-menu-item>
              <el-menu-item index="user-compute" @click="$router.push('/i/coupon')">我的优惠券</el-menu-item>
              <el-menu-item index="user-invitation" @click="$router.push('/i/invitation')">我的邀请</el-menu-item>
              <el-menu-item index="user-address" @click="$router.push('/i/address')">收货地址</el-menu-item>
              <el-menu-item index="user-safety" @click="$router.push('/i/safety')">安全中心</el-menu-item>
              <el-menu-item index="login-out" @click="loginOut()">退出登录</el-menu-item>
            </el-submenu>
          </no-ssr>
        </el-menu>
        <el-menu class="menu lang" mode="horizontal">
          <el-submenu index="lang" popper-class="lang-popper">
            <template slot="title">
              <img :src="locale.flag" alt="" width="20px" height="13px" style="margin-top: -2px;margin-right: 10px;">
              {{locale.name}}
            </template>
            <el-menu-item class="menu-item" index="lang-cn" v-for="item in locales"
                          :key="item.lang" @click="changeLang(item)">
              <img :src="item.flag" alt="" width="20px" height="13px"
                   style="margin-top: -2px;margin-right: 10px;">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import {LOGIN_OUT, UPDATE_CARTNUMBER} from '../store/mutation-types';
  import CartAPI from '../services/cart-api';
  import {mapGetters, mapState} from 'vuex';
  import AppConfig from '../config';

  export default {
    name: 'x-header',
    data() {
      return {
        activeIndex: 'home',
        menuItems: [
          {index: 'hash', label: '云算力', path: '/hash'},
          {index: 'product', label: '矿机', path: '/product'},
//          {index: 'contract-product', label: '币盈计划', path: '/contract-product'},
//          {index: 'double11', label: '算力狂欢节', path: '/activity/double11'},
          {index: 'hosting', label: '托管', path: '/hosting'},
          {index: 'pool', label: '矿池', path: '/pool'}
        ],
        locale: AppConfig.locales[0],
        locales: AppConfig.locales
      };
    },
    computed: {
      ...mapGetters({isLogin: 'login'}),
      ...mapState(['cartGoodsCount', 'token'])
    },
    methods: {
      loginOut() {
        this.$router.replace('/');
        this.$store.commit(LOGIN_OUT, true);
      },
      changeLang(item) {
        this.locale = item;
        window.location.href = item.link;
      },
      initActiveMenuItem(route) {
        this.activeIndex = '';
        this.menuItems.forEach(item => {
          if (item.path === route.path) {
            this.activeIndex = item.index;
          }
        });
      },
      loadCartCount() {
        CartAPI.get()
          .then(res => res || {})
          .then(res => res.totalNumber)
          .then(count => {
            this.$store.commit(UPDATE_CARTNUMBER, count);
          });
      }
    },
    watch: {
      '$route': function (to) {
        this.initActiveMenuItem(to);
      },
      isLogin: {
        handler(val) {
          if (val) {
            this.loadCartCount();
          }
        },
        immediate: true
      }
    },
    created() {
      this.activeIndex = '';
      this.menuItems.forEach(item => {
        if (item.path === this.$route.path) {
          this.activeIndex = item.index;
        }
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/style/variables";

  #gn-header {

    background: #303137;
    width: 100%;
    height: 80px;
    padding-top: 12px;
    .header__inner {
      width: 1200px;
      margin: 0 auto;
    }

    .logo {
      cursor: pointer;
      width: 158px;
      height: 61px;
      float: left;
      background-image: url("../assets/images/logo-cn@1x.png");
      background-image: image-set(url("../assets/images/logo-cn@1x.png") 1x, url("../assets/images/logo-cn@2x.png") 2x);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }

    .menu {
      display: inline-block;
      border-bottom: 0;
      height: 50px;
      overflow: hidden;
      /*margin-left: 40px;*/
      background-color: transparent;
      padding-top: 14px;
      &.login {
        .menu-item.is-active {
          color: #fff;
          font-weight: normal;
        }
        .menu-item:hover, &.menu-item:focus {
          color: #FFE6A1;
        }
        .mine,
        .cart {
          display: none;
        }
        .icon-my-center {
          position: relative;
          left: -2px;
          top: -1px;
          width: 13px;
        }
        &.is-login {
          .sign-in,
          .sign-up {
            display: none;
          }
          .mine,
          .cart {
            display: inline-block;
          }
        }
      }

      &.lang {
        margin-left: 0;
      }
    }

    .menu-item {
      height: 34px;
      line-height: 34px;
      color: #fff;
    }

    .menu > .menu-item {
      border-bottom: 0;
      &.is-active {
        font-weight: bold;
      }
      &:focus,
      &:hover {
        border-bottom: 0 !important;
        background-color: transparent;
      }
      &:active {
        border: none;
        color: #fff;
      }
    }

    .menu > .menu-item.cart {
      &:focus,
      &:hover {
        background-color: transparent !important;
      }

      img {
        display: inline-block;
        width: 15px;
        vertical-align: -3px;
      }
    }

    .menu.lang > .menu-item {
      cursor: text;
      &:focus,
      &:hover,
      &:active {
        color: #fff;
      }

      svg {
        vertical-align: -5%;
      }
    }

    .menu-item.sign-in,
    .menu-item.sign-up {
      padding-left: 10px;
      padding-right: 10px;

      &:focus,
      &:hover {
        background-color: transparent !important;
      }
    }

    .email-link {
      line-height: 34px;
      color: #fff;
      display: inline-block;
      padding-left: 1em;
      padding-right: 1em;
      font-size: 14px;
      vertical-align: top;
      padding-top: 14px;
    }

    .flag {
      display: inline-block;
      width: 20px;
      height: 13px;
    }
  }

  .go-cart {
    position: relative;
    .badge {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 50%;
      background-color: #EA4D4D;
      color: #fff;
      font-size: 12px;
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }
</style>

