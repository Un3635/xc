<template>
  <div id="app123" class="container">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import TokenAPI from './services/token-api';
  import {MutationTypes} from './store/mutations';
  import {ActionsTypes} from './store/actions';
  import {mapState} from 'vuex';
  import {setSessionStore, getSessionStore} from './plugins/utils';
  import {Channel, WL_CHANNEL} from './config/constants';

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
          this.init(to.matched);
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
        if (matched.some(record => record.meta.auth)) {
          if (this.login) {
            return;
          }
          // 检查token是否可用
          TokenAPI.getValid(true)
            .catch(() => { // 不可用则跳转至登录页面
              if (this.$route.path !== '/sign-in') { // 已在登录页面则不跳转
                this.goSignIn();
              }
            });
        }
      },
      goSignIn() {
        // 删除token，跳转登录页
        let query = this.$route.query;
        delete query.token;
        let url = this.$router.resolve({
          path: this.$route.path,
          query: query
        }).href;
        this.$router.push({path: 'sign-in', query: {redirectUrl: url}});
      }
    },
    created() {
      if (process.env.VUE_ENV === 'client') {
        const urlQueryToken = this.$route.query.token;
        let channel = this.$route.query.channel;
        if (channel) {
          setSessionStore(WL_CHANNEL, channel);
        } else {
          channel = getSessionStore(WL_CHANNEL);
        }
        // 更新平台状态
        this.$store.commit(MutationTypes.UPDATE_PLATFORM_INFO, !!channel);
        const token = urlQueryToken || TokenAPI.get();
        TokenAPI.loginCheck(token, channel || Channel)
          .then(res => {
            if (res.code === '000000') {
              this.$store.commit(MutationTypes.LOGIN_IN, token);
            } else if (urlQueryToken) {
              this.$store.dispatch(ActionsTypes.LOGIN_OUT);
              this.errToast.show(res.msg);
              this.goSignIn();
            }
          })
          .catch(() => {
          });
      }
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
