<template>
  <div id="app">
    <svg-icon/>
    <x-header/>
    <div class="gn-container">
      <nuxt/>
    </div>
    <x-footer/>
  </div>
</template>
<script>
  import SvgIcon from '../components/svg-icon';
  import XHeader from '../components/x-header';
  import XFooter from '../components/x-footer';
  import {LOGIN_IN, LOGIN_OUT} from '../store/mutation-types';
  import {EventBus, isClient} from '../services/utils';
  import TokenAPI from '../services/token-api';
  import {UPDATE_USER_INFO} from '../store/action-types';
  import {mapState} from 'vuex';

  export default {
    components: {
      SvgIcon,
      XFooter,
      XHeader
    },
    computed: {
      ...mapState(['token'])
    },
    created() {
      EventBus.$on(LOGIN_OUT, () => {
        this.$store.commit(LOGIN_OUT);
      });
      this.$store.subscribe(mutation => {
        if (mutation.type === LOGIN_OUT) {
          if (mutation.payload) { //正常退出
            return this.$router.replace('/');
          }
          const redirectUrl = this.$router.currentRoute.fullPath;
          // 已在登录页面则不跳转
          if (this.$router.currentRoute.path !== '/login') {
            this.$router.push({
              path: '/login', query: {
                redirectUrl
              }
            });
          }
        }
      });
      if (isClient) {
        // 客户端自动登录
        TokenAPI.loginCheck()
          .then(res => {
            if (res.code === '000000') {
              this.$store.commit(LOGIN_IN, TokenAPI.get());
            }
          })
          .catch(err => {
          });
      }
    },
    watch: {
      token: {
        handler(val) {
          // token变化时更新用户信息
          if (val) {
            this.$store.dispatch(UPDATE_USER_INFO);
          }
        },
        immediate: true
      }
    }
  };
</script>

<style scoped>
  @import "../assets/style/common.scss";

  #app {
    min-width: 1200px;
  }

  .gn-container {
    background: #f6f6f6;
    min-height: calc(100vh - 116px - 145px - 15px);
  }
</style>
