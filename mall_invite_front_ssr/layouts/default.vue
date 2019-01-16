<template>
  <div id="app" v-cloak>
    <el-scrollbar class="page-component_scroll">
      <!--<p-header/>-->
      <div class="home">
        <div class="home-title">
          <div class="title">
            <div class="logo"><img src="../assets/image/logo@2x.png" alt=""></div>
            <ul class="home-title-tab">
              <li v-for="(item,ind) in menu" :key="ind" :class="{active: curPath === item.path}">
                <div class="bg-style"><span class="text" @click="gotoOthersPages(item.path)">{{item.name}}</span></div>
              </li>
            </ul>
            <div class="home-title-dropdown">
              <!-- <span class="cur" :class="{loginC: !userName}" v-if="userName === '\'\''" @click="login()">立即登录</span> -->
              <span class="cur" :class="{loginC: !userName}" v-if="!userName" @click="login()">立即登录</span>
              <div v-else>
                <div class="dropdown-img">
                  <img src="../assets/image/personal_normal.png" alt="">
                </div>
                <el-menu class="menu" mode="horizontal">
                  <el-submenu index="lang" popper-class="lang-popper">
                    <template slot="title">
                      {{userName}}
                    </template>
                    <el-menu-item class="menu-item" index="lang-cn" @click="$router.push('/p-center');">
                      <!--<span class="tirgon"></span>-->
                      个人中心
                    </el-menu-item>
                    <el-menu-item class="menu-item" index="lang-cn" @click="logOut()">
                      退出
                    </el-menu-item>
                  </el-submenu>
                </el-menu>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <nuxt/>
        </div>
        <div class="home-footer">
          <div class="home-content">
            <ul style="margin-top: 42px">
              <li>
                <span @click="gotoAboutUs">关于我们</span>
              </li>
              <li>
                <span @click="gotoAboutUs">联系方式</span>
              </li>
              <li>
                <span @click="gotoAboutUs">商务合作</span>
              </li>
            </ul>
            <!--<span>©沪ICP备12000537号-1 Copyright  © 叽叽喳 版权所有</span>-->
            <!--<span> 算力星球啥啥有限公司</span>-->
            <!--<span>上海市天河区小树路391号顶层大楼上</span>-->
          </div>
        </div>
        <XLogin/>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import XLogin from '../components/login/login.vue';
  import {getStore, isClient} from '../plugins/utils';
  import phoneInit from '@/filters/initUserInfo';
  export default {
    name: 'home',
    data() {
      return {
        curPath: this.$route.path,
        menu: [
          {name: '首页', path: '/'},
          {name: '云算力', path: '/calcstar'},
          {name: '联盟须知', path: '/alliance'}
        ],
        skuarr: [],
        showLoginPage: {},
        userName: '',
        type: '',
        inviteCode: ''
      };
    },
    computed: {
      ...mapState(['userNameStore'])
    },
    watch: {
      '$route'(to, from){
        this.curPath = to.path;
      },
      'userNameStore': {
        handler(val) {
          this.userName = val;
        }
      }
    },
    mounted() {
      this.showLoginPage['isShow'] = true;
      this.showLoginPage['soureType'] = this.$route.query.type || '';
      this.showLoginPage['soureCode'] = this.$route.query.inviteCode || '';
      if (this.$route.query.type && this.$route.query.inviteCode) {
        this.$store.commit('SHOW_LOGIN_PAGE', this.showLoginPage);
      }
      if (getStore('userInfo')) {
        const userInfo = JSON.parse(getStore('userInfo'));
        this.userName = userInfo.userName || phoneInit(userInfo.phone);
        this.$store.commit('userNameStore', this.userName);
        return;
      } else {
        this.userName = '';
      }
    },
    methods: {
      gotoAboutUs() {
        if(this.$route.query.type && this.$route.query.inviteCode){
          this.$router.push({path: '/aboutUs', query: {type: this.$route.query.type,inviteCode: this.$route.query.inviteCode}})
        }else{
          this.$router.push('/aboutUs');
        }
      },
      gotoOthersPages(path) {
        if(this.$route.query.type && this.$route.query.inviteCode){
          this.$router.push({path: path, query: {type: this.$route.query.type,inviteCode: this.$route.query.inviteCode}})
        }else{
          this.$router.push(path);
        }
      },
      login() {
        if (this.$route.query.type && this.$route.query.inviteCode) {
          this.$store.commit('SHOW_LOGIN_PAGE', this.showLoginPage);
        } else {
          this.$store.commit('SHOW_LOGIN_PAGE', true);
        }
      },
      logOut() {
        // 退出
        getajaxdata(API.logout, 'POST', {'initTimes': new Date().getTime()}, 'JSON', (res) => {
          if (isClient) {
            localStorage.clear();
          }
          this.$router.replace('/');
          this.$store.commit('userNameStore', '');
          if (this.$store.state.safeCenterTologin) {
            this.$store.commit('safeCenterTologin', false);
          }
        });
      }
    },
    components: {
      XLogin
    }
  };
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
    #app {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  .page-component_scroll {
    height: 100%;
  }

  .home-footer {
    min-width: 1200px;
    width: 100%;
    background: #010424;

  .home-content {
    text-align: center;
    padding: 32px 0px;

  &>ul {
    padding-bottom: 24px;
    font-size: 12px;

  &>li {
    display: inline-block;

  /*border-right: 1px solid rgba(255,255,255,0.32);*/
  &>span {
    color: #FFFFFF;
      cursor: pointer;

  &:active {
    color: #FFFFFF;
  }

  }
  &:nth-of-type(1),

  &:nth-of-type(2) {

  &:after {
    margin: 0 20px;
    content: "";
    display: inline-block;
    width: 2px;
    height: 10px;
    background: rgba(255, 255, 255, 0.32);
  }

  }
  }
  }
  &>span {
    display: block;
    padding-top: 12px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.80);
  }

  }
  }
  .cur {
    cursor: pointer;
  }
</style>

