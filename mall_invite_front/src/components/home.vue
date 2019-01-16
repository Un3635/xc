<template>
  <div class="home">
    <div class="home-title">
      <div class="title">
        <div class="logo"><img src="../../static/image/logo@2x.png" alt=""></div>
        <ul class="home-title-tab">
          <li v-for="(item,ind) in menu" :key="ind" :class="{active: curPath === item.path}">
            <div class="bg-style"><span class="text" @click="$router.push(item.path)">{{item.name}}</span></div>
          </li>
        </ul>
        <div class="home-title-dropdown">
          <span :class="{loginC: !userName || userName === ''}" v-if="!userName || userName === ''" @click="login()">立即登录</span>
         <div v-else>
            <div class="dropdown-img">
              <img src="../../static/image/personal_normal.png" alt="">
            </div>
            <el-menu class="menu" mode="horizontal">
              <el-submenu index="lang" popper-class="lang-popper">
                <template slot="title">
                  {{userName}}
                </template>
                <el-menu-item class="menu-item" index="lang-cn" @click="$router.push('/center');">
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
      <router-view/>
    </div>
    <div class="home-footer">
      <div class="home-content">
        <ul style="margin-top: 42px">
          <li>
            <router-link to="/about">关于我们</router-link>
          </li>
          <li>
            <router-link to="/about">联系方式</router-link>
          </li>
          <li>
            <router-link to="/about">商务合作</router-link>
          </li>
        </ul>
        <!--<span>©沪ICP备12000537号-1 Copyright  © 叽叽喳 版权所有</span>-->
        <!--<span> 算力星球啥啥有限公司</span>-->
        <!--<span>上海市天河区小树路391号顶层大楼上</span>-->
      </div>
    </div>
    <XLogin />
  </div>
</template>
<script>
import {mapState} from 'vuex';
import XLogin from './login/login'
  export default {
    name: 'home',
    data() {
      return {
        curPath: this.$route.path, //this.$route.matched[1] ? this.$route.matched[1].path :
        menu: [
          {name: '首页', path: '/home'},
          {name: '云算力', path: '/calcstar'},
          {name: '联盟须知', path: '/alliance'},
        ],
        skuarr: [],
        userName: ''
      };
    },
    computed: {
      ...mapState(['userNameStore'])
    },
    watch: {
      '$route'(to, from){
        // this.curPath = to.matched[1] ? to.matched[1].path : to.path;
        this.curPath = to.path;
      },
      'userNameStore': {
        handler(val) {
          this.userName = val;
        }
      }
    },
    created() {
      if(localStorage.getItem('userInfo') !== null && localStorage.getItem('userInfo') !== 'undefined')
      {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.userName = userInfo.userName || userInfo.phone;
        this.$store.commit('userNameStore', this.userName);
        return;
      }else{
        //  this.userName = "";
      }
    },
    methods: {
      mytest(index){
        alert(index);
      },
      login() {
        this.$store.commit('SHOW_LOGIN_PAGE', true);
      },
      logOut() {
        // 退出
        getajaxdata(API.logout, 'POST', '', 'JSON', (res) => {
          localStorage.clear();
          this.$router.replace('/');
          this.$store.commit('userNameStore', '');
          if(this.$store.state.safeCenterTologin) {
            this.$store.commit('safeCenterTologin', false);
          }
        })
      }
    },
    components: {
      XLogin
    }
  }
</script>

<style lang="scss" scoped>
.home2 {
  position: absolute;
  top: 82px;
  color: #ffffff;
}
.first-item {
  width: 100%;
  height: 350px;
  background: #000000;
  figure {
    padding: 50px;
    figcaption {
      line-height: 28px;
    }
  }
}
.title {
  text-align: center;
  font-size: 30px;
}
.item-img {
  float: left;
  width: 200px;
  height: 180px;
}
.loginC {
  cursor: pointer;
}
// 底部
.home-footer {
  width: 100%;
  height: 175px;
  background: #010424;
  .home-content {
    text-align: center;
    padding: 32px 0px;
    & > ul {
      font-family: MicrosoftYaHei-Bold;
      padding-bottom: 24px;
      font-size: 12px;
      & > li {
        display: inline-block;
        // border-right: 1px solid rgba(255,255,255,0.32);
        & > a {
          color: #FFFFFF;
          &:active {
            color: #FFFFFF;
          }
        }
        &:nth-of-type(1),
        &:nth-of-type(2) {
          &:after{
            margin: 0 20px;
            content: "";
            display: inline-block;
            width: 2px;
            height: 10px;
            background: rgba(255,255,255,0.32);
          }
        }
      }
    }
    & > span {
      font-family: STHeitiSC-Light;
      display: block;
      padding-top: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.80);
    }
  }
}
</style>
