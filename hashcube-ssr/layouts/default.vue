<template>
  <div id="app">
    <svg-icon/>
    <x-header/>
    <div class="main-container">
      <nuxt/>
    </div>
    <x-footer v-if="!isHome"/>
  </div>
</template>

<script>
  import XHeader from '../components/x-header';
  import XFooter from '../components/x-footer';
  import {LOGIN_IN, LOGIN_OUT} from '../store/mutation-types';
  import {mapState} from 'vuex';
  import TokenAPI from '../services/token-api';
  import {UPDATE_USER_INFO} from '../store/action-types';
  import SvgIcon from '../components/svg-icon';
  import {isClient, EventBus, getCookie, setStore} from '../utils';
  import AppConfig from '../config';
  import CommonAPI from '../services/common-api';

  export default {
    components: {
      SvgIcon,
      XFooter,
      XHeader
    },
    data() {
      return {
        isHome: false
      };
    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      scrollTop() {
        if (isClient) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
      },
      autoLogin() {
        // 客户端自动登录
        const token = TokenAPI.get();
        TokenAPI.loginCheck(token)
          .then(res => {
            if (res.code === '000000') {
              this.$store.commit(LOGIN_IN, token);
            }
          })
          .catch(err => {
          });
      },
      trackingUV() {
        const value = btoa(getCookie('Hm_lvt_' + AppConfig.baiduTrackerKey));
        const firChannelId = this.$route.query.firChannelId || '';
        const secChannelId = this.$route.query.secChannelId || '';
        if (!value || !firChannelId) {
          return;
        }
        CommonAPI.statisticPV(value, firChannelId, secChannelId)
          .catch(() => {
          });
      }
    },
    watch: {
      '$route'(to) {
        this.isHome = to.name === 'index';
        this.scrollTop();
      },
      token: {
        handler(val) {
          // token变化时更新用户信息
          if (isClient && val) {
            this.$store.dispatch(UPDATE_USER_INFO);
          }
        },
        immediate: true
      }
    },
    created() {
      this.isHome = this.$route.name === 'index';
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
          if (this.$router.currentRoute.path !== '/sign-in') {
            this.$router.replace({
              path: '/sign-in', query: {
                redirectUrl
              }
            });
          }
        }
      });
    },
    mounted() {
      this.autoLogin();
      this.trackingUV();
      const {firChannelId, secChannelId} = this.$route.query;
      if (firChannelId) {
        sessionStorage.setItem('firChannelId', firChannelId);
      }
      if (secChannelId) {
        sessionStorage.setItem('secChannelId', secChannelId);
      }
    }
  };
</script>

<style lang="scss">
  @import "../assets/style/common.scss";

  #app {
    min-width: 1200px;
  }

  .main-container {
    min-height: calc(100vh - 116px - 145px - 15px);
  }
</style>
