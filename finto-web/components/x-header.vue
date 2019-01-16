<template>
  <div class="header">
    <div class="header__inner">
      <a class="logo" href="/">
        <img src="../assets/images/fintocube_34.png" alt="FinTo" title="FinTo">
      </a>
      <el-menu :default-active="activeIndex" active-text-color="#FFE6A1" text-color="#FFF" class="menu"
               mode="horizontal" :router="true">
        <el-menu-item class="menu-item" :index="menuItem.index ? menuItem.index : (menuItem.href || '')" :route="menuItem.path"
                      v-for="menuItem in menuItems" :key="menuItem.index">
          <span v-if="menuItem.path">{{menuItem.label}}</span>
          <a @click.stop target="_blank" :href="menuItem.href" v-else>{{menuItem.label}}</a>
        </el-menu-item>
      </el-menu>
      <div class="right text-right">
        <el-menu class="menu login" mode="horizontal">
          <el-menu-item class="menu-item sign-in" v-show="!isLogin" index="sign-in" @click="$router.push('/login')">
            ログイン
          </el-menu-item>
          <el-menu-item class="menu-item sign-up" v-show="!isLogin" index="sign-up" @click="$router.push('/join')">
            新規登録
          </el-menu-item>
          <el-menu-item class="menu-item cart" index="cart" v-show="isLogin">
            <template slot="title">
              <nuxt-link to="/cart" class="go-cart">
                <span class="badge" v-if="cartGoodsCount">{{cartGoodsCount}}</span>
                <svg width="15" height="13">
                  <use xlink:href="#cart"></use>
                </svg>
              </nuxt-link>
            </template>
          </el-menu-item>
          <el-submenu class="mine" index="user" menu-trigger="hover" v-show="isLogin">
            <template slot="title">
              <span @click="$router.push('/i')">
                <svg class="icon-my-center" width="13" height="13">
                  <use xlink:href="#person"></use>
                </svg>
                My FinTo
              </span>
            </template>
            <el-menu-item index="user" @click="$router.push('/i/account')">アカウント</el-menu-item>
            <el-menu-item index="user-order" @click="$router.push('/i/order')">注文履歴</el-menu-item>
            <el-menu-item index="user-trusteeship" @click="$router.push('/i/trust')">委託情報</el-menu-item>
            <el-menu-item index="user-compute" @click="$router.push('/i/power')">クラウドマイニング</el-menu-item>
            <!--<el-menu-item index="user-invitation" @click="$router.push('/i/invitation')">我的邀请</el-menu-item>-->
            <el-menu-item index="user-address" @click="$router.push('/i/address')">お届け先</el-menu-item>
            <el-menu-item index="user-safety" @click="$router.push('/i/safety')">設定</el-menu-item>
            <el-menu-item index="login-out" @click="loginOut()">ログアウト</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import {LOGIN_OUT} from '../store/mutation-types';
  import {mapGetters} from 'vuex';
  import {mapState} from 'vuex';
  import CartAPI from '../services/cart-api';
  import {isClient} from '../services/utils';

  export default {
    name: 'x-header',
    data() {
      return {
        activeIndex: 'home',
        cartGoodsCount: 0,
        menuItems: [
          {index: 'hash', label: 'クラウドマイニング', path: '/hash'},
          {index: 'product', label: 'マイニング機器', path: '/product'},
          {index: 'hosting', label: 'マイニングサービス', path: '/hosting'},
          {index: null, label: 'お問い合わせ', path: null, href: 'http://www.finto.co.jp/submit.html'}
        ]
      };
    },
    computed: {
      ...mapGetters(['isLogin']),
      ...mapState(['cartNum'])
    },
    methods: {
      loginOut() {
        this.$router.replace('/');
        this.$store.commit(LOGIN_OUT, true);
      },
      loadCartCount() {
        CartAPI.getCartList()
          .then(res => res || {})
          .then(res => res.totalNumber)
          .then(count => {
            this.cartGoodsCount = count > 99 ? '99+' : count;
          });
      }
    },
    watch: {
      '$route': {
        handler(to) {
          this.activeIndex = '';
          this.menuItems.forEach(item => {
            // 静态化后访问"/trusteeship"会自动重定向到"/trusteeship/"
            if (item.path === to.path || item.path + '/' === to.path) {
              this.activeIndex = item.index;
            }
          });
        },
        immediate: true
      },
      cartNum(num) {
        this.cartGoodsCount = num > 99 ? '99+' : num;
      },
      isLogin: {
        handler(val) {
          if (isClient && val) {
            this.loadCartCount();
          }
        },
        immediate: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    background: #102243;
    width: 100%;
    height: 80px;
    padding: 15px 0;
  }

  .header__inner {
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    overflow: hidden;
  }

  .logo {
    cursor: pointer;
    width: 120px;
    margin-top: 9px;
    margin-right: 70px;
    float: left;
    img {
      width: 100%;
    }
  }

  .menu {
    float: left;
    border-bottom: 0;
    height: 50px;
    overflow: hidden;
    background-color: transparent;
    padding: 8px 0;
    &.login {
      .menu-item {
        float: left;
      }
      .menu-item.is-active {
        color: #fff;
        font-weight: normal;
      }
      .menu-item:hover, &.menu-item:focus {
        color: #FFE6A1;
      }
      /*.mine,*/
      /*.cart {*/
      /*display: none;*/
      /*}*/
      .icon-my-center {
        position: relative;
        left: -2px;
        top: -1px;
      }
      /*&.is-login {*/
      /*.mine,*/
      /*.cart {*/
      /*display: inline-block;*/
      /*}*/
      /*.sign-in,*/
      /*.sign-up {*/
      /*display: none;*/
      /*}*/
      /*}*/
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

  .menu-item.sign-in,
  .menu-item.sign-up {
    padding-left: 10px;
    padding-right: 10px;

    &:focus,
    &:hover {
      background-color: transparent !important;
    }
  }

  .service {
    display: inline-block;
    color: #fff;
    line-height: 50px;
    vertical-align: top;
    font-size: 14px;
    margin-left: 2em;
  }

  .go-cart {
    position: relative;
    .badge {
      position: absolute;
      color: #fff;
      font-size: 12px;
      border-radius: 8px;
      background: #EA4D4D;
      line-height: 12px;
      padding: 3px 6px 2px 5px;
      vertical-align: middle;
      top: -10px;
      right: -12px;
    }
  }


</style>

