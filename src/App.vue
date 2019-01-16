<template>
  <div id="app" class="container">
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  //  import TokenAPI from './services/token-api';
  //  import {MutationTypes} from './store/mutations';
  import {ActionsTypes} from './store/actions';
  import {mapState} from 'vuex';

  export default {
    name: 'App',
    data() {
      return {};
    },
    computed: {
      ...mapState(['token', 'login'])
    },
    watch: {
      '$route': {
        handler(to) {
//          this.init(to.matched);
        },
        immediate: true
      },
      token(val) {
        // token变化时更新用户信息
        if (val) {
          this.$store.dispatch(ActionsTypes.UPDATE_USER_INFO);
        }
      }
    },
    mounted() {
    },
    methods: {
      init(matched) {
        // 判断是否有权限访问目标页面
//        const currentUrl = this.$router.currentRoute.fullPath;
        if (matched.some(record => record.meta.auth)) {
          if (this.login) {
            return;
          }
          // 检查token是否可用
//          TokenAPI.getValid(true)
//            .catch(() => { // 不可用则跳转至登录页面
//              if (this.$route.path !== '/sign-in') { // 已在登录页面则不跳转
//                this.$router.replace({path: '/sign-in', query: {redirectUrl: currentUrl}});
//              }
//            });
        }
      }
    },
    created() {
      if (process.env.VUE_ENV === 'client') {
//        const token = TokenAPI.get();
//        TokenAPI.loginCheck(token)
//          .then(res => {
//            if (res.code === '000000') {
//              this.$store.commit(MutationTypes.LOGIN_IN, token);
//            }
//          })
//          .catch(() => {
//          });
      }
    },
    activated() {
      this.$nextTick(() => {
        this.init();
      });
    }
  };
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
</style>
<style lang="scss">
  @import 'assets/css/nprogress.css';
  @import 'assets/css/swiper.min.css';
  @import 'assets/scss/common';

  .container, .view {
    height: 100%;
    width: 100%;
  }
</style>
