<template>
  <div class="pagetitle">
    <el-popover
      ref="popover1"
      placement="bottom"
      width="50"
      :disabled="popoverType"
      trigger="hover">
      <template>
        <router-link to="/myOrder"><h4>我的订单</h4></router-link>
        <router-link to="/myBillMore"><h4>我的账单</h4></router-link>
        <router-link to="/freeDeposit"><h4>免押金额</h4></router-link>
        <h4 @click="personalLogOut">退出登录</h4>
      </template>
    </el-popover>
    <!--登录-已申请企业押金-->
    <div class="head" v-if="loginStatus===0">
      <div class="head_box">
        <div class="fl">
          <span>您好，{{companyName}}!</span>
        </div>
        <div class="fr">
          <span @click="gotoPerson" class="pointer" v-popover:popover1>个人中心</span>
          <span @click="gotoHelp" class="pointer">帮助中心</span>
          <span>客服热线：400-836-5566</span>
        </div>
      </div>
    </div>
    <!--登录-未申请企业押金-->
    <div class="head" v-if="loginStatus===1">
      <div class="head_box">
        <div class="fl">
          <span>您好，{{companyName}}!</span>
          <span class="no">您还没有申请免押金</span>
          <span class="right_now_apply" @click="pagefreeDeposit">立即申请</span>
        </div>
        <div class="fr">
          <span @click="gotoPerson" class="pointer" v-popover:popover1>个人中心</span>
          <span @click="gotoHelp" class="pointer">帮助中心</span>
          <span>客服热线：400-836-5566</span>
        </div>
      </div>
    </div>
    <!--未登录-->
    <div class="head" v-if="loginStatus===2">
      <div class="head_box">
        <div class="fl">
          <span>您好，欢迎来到小虫快租!</span>
          <span class="login" @click="pageOption('login')">登录</span>
          <span class="register" @click="pageOption('reg')">注册</span>
        </div>
        <div class="fr">
          <span @click="gotoPerson" class="pointer" v-popover:popover1>个人中心</span>
          <span @click="gotoHelp" class="pointer">帮助中心</span>
          <span>客服热线：400-836-5566</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {bus} from '../../assets/js/config'
  import {allMethods} from '../../assets/js/config'

  export default {
    name: 'pagetitle',
    props: {
      pageStatus: String
    },
    data () {
      return {
        companyName: '',
        mallStatus: '',
        loginStatus: 2,
        popoverType: true
      }
    },
    methods: {
      personalLogOut () {
        let token = window.localStorage.getItem('xckz_mall');
        this.$http.get('user/loginOut', {params: {token: token}}).then((res) => {
          if (res.data.code === '1000') {
            window.localStorage.removeItem('xckz_mall');
            window.localStorage.removeItem('xckz_mall_companyName');
            window.localStorage.removeItem('xckz_mall_status');
            window.location.href = '/';
          }
        })
      },
      pagefreeDeposit(){
        this.$router.push({path: '/freeDeposit'})
      },
      gotoHelp(){
        this.$router.push({path: '/helpCenter'})
      },
      gotoPerson(){
        if (this.loginStatus === 2) {
          bus.$emit('islogin', 'login', '/i')
        } else {
          this.$router.push({path: '/i'})
        }
      },
      pageOption (text) {
        this.$emit('listenToChild', text)
      },

      updateStatus(){
        if (!localStorage.getItem('xckz_mall')) {
          this.loginStatus = 2
        } else {
          this.companyName = localStorage.getItem('xckz_mall_companyName')
          this.mallStatus = localStorage.getItem('xckz_mall_status')
          if (this.mallStatus == 'false') {
            this.loginStatus = 1
          } else if (this.mallStatus == 'true') {
            this.loginStatus = 0
          }

        }
      }
    },
    created(){
      this.updateStatus()
      bus.$on('logout', this.updateStatus)
      bus.$on('updatetitle', this.updateStatus)


    },
    watch: {
      loginStatus () {
        if (window.localStorage.getItem('xckz_mall') !== null) {
          this.popoverType = false;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-popover h4{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 5px 0;
    cursor: pointer;
    color: #666666;
  }
  .el-popover h4:hover{
    color: #6ECC66;
  }
  .head {
    width: 100%;
    height: 39px;
    line-height: 39px;
    background: #F5F5F5;
    .head_box {
      max-width: 1200px;
      margin: 0 auto;
      .fl {
        float: left;
        span {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #666666;
          margin-right: 30px;
        }
        .no{
          margin-right: 20px;
        }
        .register, .login {
          cursor: pointer;
          margin-right: 20px;
        }
        .right_now_apply {
          cursor: pointer;
          color: #6ECC66;
        }
      }
      .fr {
        float: right;
        span {
          margin-left: 30px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #666666;
        }

      }
    }
    & {
      content: '';
      display: block;
      clear: both;
    }
  }

</style>
