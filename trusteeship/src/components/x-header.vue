<template>
  <div class="header">
    <div class="header__inner">
      <router-link class="logo" to="/">
        <!--<img src="../assets/images/logo.png" alt="">-->
      </router-link>
      <el-menu :default-active="activeIndex" active-text-color="#FFE6A1" text-color="#FFF" class="menu"
               mode="horizontal" :router="true">
        <el-menu-item class="menu-item" :index="menuItem.index" :route="menuItem.path"
                      v-for="menuItem in menuItems" :key="menuItem.index">
          {{menuItem.label}}
        </el-menu-item>
      </el-menu>
      <div class="right text-right">
        <el-menu class="menu login" :class="{'is-login':isLogin}" mode="horizontal">
          <el-menu-item class="menu-item sign-in" index="sign-in" @click="$router.push('/sign-in')">登录</el-menu-item>
          <el-menu-item class="menu-item sign-up" index="sign-up" @click="$router.push('/sign-up')">注册</el-menu-item>
          <el-menu-item class="menu-item cart" index="cart">
            <template slot="title">
              <router-link to="/cart">
                <img src="../assets/images/cart.svg" alt="">
              </router-link>
            </template>
          </el-menu-item>
          <el-submenu class="mine" index="user" menu-trigger="hover">
            <template slot="title">
              <span @click="$router.push('/i')">
                 <img class="icon-my-center" src="../assets/images/person.svg" alt="">
                  个人中心
              </span>
            </template>
            <el-menu-item index="user" @click="$router.push('/i/account')">我的账户</el-menu-item>
            <el-menu-item index="user-order" @click="$router.push('/i/order')">我的订单</el-menu-item>
            <el-menu-item index="user-trusteeship" @click="$router.push('/i/trusteeship')">我的托管</el-menu-item>
            <el-menu-item index="user-compute" @click="$router.push('/i/power')">我的云算力</el-menu-item>
            <el-menu-item index="user-invitation" @click="$router.push('/i/invitation')">我的邀请</el-menu-item>
            <el-menu-item index="user-address" @click="$router.push('/i/address')">收货地址</el-menu-item>
            <el-menu-item index="user-safety" @click="$router.push('/i/safety')">安全中心</el-menu-item>
            <el-menu-item index="login-out" @click="loginOut()">退出登录</el-menu-item>
          </el-submenu>
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
  import {LOGIN_OUT} from '../store/mutation-types';
  import {mapState, mapMutations} from 'vuex';
  import AppConfig from '../config';

  export default {
    name: 'x-header',
    data() {
      return {
        activeIndex: 'home',
        menuItems: [
          {index: 'hash', label: '云算力', path: '/hash'},
          {index: 'product', label: '矿机', path: '/product'},
          {index: 'hosting', label: '托管', path: '/hosting'},
          {index: 'pool', label: '矿池', path: '/pool'}
        ],
        locale: AppConfig.locales[0],
        locales: AppConfig.locales
      };
    },
    computed: {
      ...mapState({isLogin: 'login'})
    },
    methods: {
      loginOut() {
        this.$router.replace('/');
        this.$store.commit(LOGIN_OUT, true);
      },
      changeLang(item) {
        this.locale = item;
        window.location.href = item.link;
      }
    },
    watch: {
      '$route': function (to) {
        this.activeIndex = '';
        this.menuItems.forEach(item => {
          // 静态化后访问"/trusteeship"会自动重定向到"/trusteeship/"
          if (item.path === to.path || item.path + '/' === to.path) {
            this.activeIndex = item.index;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../style/variables";

  .header {
    background: #303137;
    width: 100%;
    height: 80px;
    padding-top: 12px;
  }

  .header__inner {
    width: 1200px;
    margin: 0 auto;
  }

  .logo {
    cursor: pointer;
    width: 158px;
    height: 61px;
    float: left;
    background: url("../assets/images/logo-cn@1x.png") no-repeat center;
    background-image: -webkit-image-set(url("../assets/images/logo-cn@1x.png") 1x, url("../assets/images/logo-cn@2x.png") 2x);
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
      /*color: #FFE6A1;*/
      font-weight: bold;
    }
    &:focus,
    &:hover {
      /*color: #FFE6A1;*/
      border-bottom: 0 !important;
      background-color: transparent;
    }
    &:active {
      border: none;
      /*background-color: #1A1B1E;*/
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

  .menu-item.sign-in {
    /*position: relative;*/
    /*
    &:after {
      position: absolute;
      content: '';
      display: inline-block;
      width: 1px;
      right: -.5px;
      background: #fff;
      height: 50%;
      top: 25%;
    }
    */
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
</style>

