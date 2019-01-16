<template>
  <div id="app">
    <svg-icon/>
    <x-header v-show="!isFullScreen"/>
    <div class="main-container" :class="{'is-full':isFullScreen}">
      <router-view/>
    </div>
    <x-footer v-show="!isFullScreen"/>
  </div>
</template>

<script>
  import XHeader from './components/x-header';
  import XFooter from './components/x-footer';
  import {LOGIN_IN, LOGIN_OUT} from './store/mutation-types';
  import {mapState} from 'vuex';
  import TokenAPI from './services/token-api';
  import {UPDATE_USER_INFO} from './store/action-types';
  import SvgIcon from './components/svg-icon';

  export default {
    metaInfo: {
      title: '算立方-专业的云算力交易、矿机托管、算力租赁平台', // set a title
      meta: [
        {                 // set meta
          name: 'keywords',
          content: '算立方,矿机,云算力,算力,矿池,算力交易出租平台,雪豹矿机官网,矿机销售,矿机托管,挖矿矿场'
        },
        {
          name: 'description',
          content: '算立方是全球先进的云算力租赁服务平台。“工业级矿机”雪豹矿机官方销售网站。算立方提供矿机购买、矿机托管、算力租赁及交易等全方位服务，为矿圈人士打造高效灵活、收益强劲、品质可靠的托管平台，让挖矿更简单、让托管更省心！'
        }
      ]
    },
    components: {
      SvgIcon,
      XFooter,
      XHeader
    },
    data() {
      return {
        isFullScreen: false
      };
    },
    computed: {
      ...mapState(['token', 'login'])
    },
    methods: {
      init(matched) {
        // 路由切换回到页面回到顶部
        this.scrollTop();
        // 是否显示header及footer
        matched.some(record => {
          this.isFullScreen = record.meta.full;
        });
        // 判断是否有权限访问目标页面
        const currentUrl = this.$router.currentRoute.fullPath;
        if (matched.some(record => record.meta.auth)) {
          if (this.login) {
            return;
          }
          // 检查token是否可用
          TokenAPI.getValid(true)
            .catch(() => { // 不可用则跳转至登录页面
              if (this.$route.path !== '/sign-in') { // 已在登录页面则不跳转
                this.$router.push({path: '/sign-in', query: {redirectUrl: currentUrl}});
              }
            });
        }
      },
      scrollTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    },
    watch: {
      '$route'(to) {
        this.init(to.matched);
      },
      token(val) {
        // token变化时更新用户信息
        if (val) {
          this.$store.dispatch(UPDATE_USER_INFO);
        }
      }
    },
    created() {
      this.$store.subscribe(mutation => {
        if (mutation.type === LOGIN_OUT) {
          if (mutation.payload) { //正常退出
            this.$router.replace('/');
          } else {
            const redirectUrl = this.$router.currentRoute.fullPath;
            // 已在登录页面则不跳转
            if (this.$router.currentRoute.path !== '/sign-in') {
              this.$router.push({
                path: '/sign-in', query: {
                  redirectUrl
                }
              });
            }
          }
        }
      });

      // 自动登录
      const token = TokenAPI.get();
      TokenAPI.loginCheck(token)
        .then(res => {
          if (res.code === '000000') {
            this.$store.commit(LOGIN_IN, token);
          }
        })
        .catch(err => {
        });
    }
  };
</script>

<style lang="scss">
  @import "style/common.scss";

  #app {
    min-width: 1200px;
  }

  .main-container {
    min-height: calc(100vh - 116px - 145px - 15px);
    &.is-full {
      min-height: 100vh;
    }
  }
</style>
