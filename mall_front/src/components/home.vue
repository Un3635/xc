<template>
  <div class="head_all">
    <pagetitle :pageStatus="pageStatus" @listenToChild="changePageStatus"></pagetitle>
    <div style="clear: both;"></div>
    <head_logo :tab="tab"></head_logo>
    <!--<level_bar></level_bar>-->
    <mall v-if="$route.path==='/'"></mall>

    <router-view></router-view>

    <div class="bottom_part">
      <div class="teamwork" v-if="$route.path==='/'">
        <div class="title">合作伙伴</div>
        <div class="com-box">
          <div class="img">
            <img src="../assets/company/haiju.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/jiahe.png" alt="">
          </div>
          <!-- <div class="img">
            <img src="../assets/company/juzi.png" alt="">
          </div> -->
          <div class="img">
            <img src="../assets/company/lingjian.png" alt="">
          </div>
          <!-- <div class="img">
            <img src="../assets/company/yonglibao.png" alt="">
          </div> -->
          <div class="img">
            <img src="../assets/company/zhiyang.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/bifeili.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/wangxin.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/xianfeng_ucf.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/xiangfengzhifu.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/zhangzhong.png" alt="">
          </div>
          <div class="img">
            <img src="../assets/company/zhongxin.png" alt="">
          </div>
        </div>
      </div>
      <bottom_icons v-if="is_bottom_icons"></bottom_icons>

      <div class="super">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="super_icon">
                <img src="../assets/images/save_worry.png" alt="">
                <span>超省心</span>
              </div>
              <div class="super_text">
                <span>超级省心额度一秒审批物流安心便捷</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <div class="super_icon">
                <img src="../assets/images/flexible.png" alt="">
                <span>超灵活</span>
              </div>
              <div class="super_text">
                <span>设备以租代购续换买随心选</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="super_icon">
                <img src="../assets/images/peace_heart.png" alt="">
                <span>超安心</span>
              </div>
              <div class="super_text">
                <span>售后全国联保最长三年上门</span>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>

    </div>

    <div class="footer">
      <div class="footer_top">
        <span>© Copyright Reserved 2017&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"
                                                                                                       href="http://www.miitbeian.gov.cn">沪ICP备17051685</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上海小虫智能科技有限公司</span>
      </div>
      <div class="footer_bottom">
        <span>地址：上海市徐汇区云锦路500号绿地汇中心B座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商务合作 ： bd@xiaochong.com</span>
      </div>
    </div>
    <transition name="fade">
      <login v-if="pageStatus!=='home'" :memory="memory" :pageStatus="pageStatus" @listenToChild="changePageStatus"
             @listenOption="changeOption"></login>
    </transition>
  </div>
</template>


<script type="text/ecmascript-6">

  import pagetitle from "./x-pagetitle"
  import login from "./x-login"
  import head_logo from "./x-headlogo"
  import level_bar from './levelBar.vue'
  import bottom_icons from './x-bottomicons'

  import mall from "./mall"
  import {bus} from '../assets/js/config'

  export default {
    name: 'home',
    data() {
      return {
        is_bottom_icons: true,
        tab: 1,
        memory: '',
        title: null,
        personal_detail: '账号信息',
        inputSearch: '',
        loginStatus: 2,
        pageStatus: 'home',
        searchType: [
          'T420', 'W350', 'DELL', '苹果笔记本', '打印机', 'iPad', '二手', '分期付款', '戴尔台式机'
        ],
        lis: [
          '账号信息', '免押金额度', '我的订单', '我的账单', '帮助中心', '账号认证', '我的账号', '商品详情'
        ]
      }
    },


    components: {
      pagetitle: pagetitle,
      login: login,
      head_logo: head_logo,
      level_bar: level_bar,
      mall: mall,
      bottom_icons: bottom_icons
    },
    methods: {
      changeOption(text) {
        if (this.memory) {
          if (this.memory === 'returnHome') {
            this.$router.push({path: '/'})
          } else {
            this.$router.push({path: this.memory})
          }
        }


        bus.$emit('logout')
        this.pageStatus = 'home'

      },
      changePageStatus(text) {
//        console.log('999999999999999999999999',this.memory)

        this.pageStatus = text

      },
      sureComputer(item) {
        this.inputSearch = item;
      },
//      getList () {
//        let matched = this.$route.matched.filter(item => item.name)
//        let first = matched[0]
//        let second = matched[1]
//        if (first && (first.name === '首页' || first.path === '')) {
//          matched[0] = {name: '首页', path: '/'}
//        }
//        if (second && (second.path === '/freeDeposit'
//          || second.path === '/myOrder'
//          || second.path === '/myBill'
//          || second.path === '/myBillMore'
//          || second.path === '/accountVerify'
//          || second.path === '/companyCertificationFailed'
//          || second.path === '/myAccount')) {
//          matched = [matched[0], {name: '个人中心', path: '/i'}, matched[1]]
//        }
//        if (second && (second.path === '/i/')) {
//          matched[1].name = '个人中心'
//        }
//        if (second && (second.path === '/whatFreeDeposit'
//          || second.path === '/rentPay'
//          || second.path === '/leaseWay'
//          || second.path === '/alsoMachine'
//          || second.path === '/attentionMatters'
//          || second.path === '/proceduresAndExpenses'
//          || second.path === '/afterSales'
//          || second.path === '/undamage'
//          || second.path === '/breakAContact'
//          || second.path === '/machineError'
//          || second.path === '/rentMachineFlow'
//          || second.path === '/machineMissing'
//          || second.path === '/machineBreakdown'
//          || second.path === '/freightCollect'
//          || second.path === '/advancedSurrender')) {
//          matched = [matched[0], {name: '帮助中心', path: '/helpCenter'}, matched[1]]
//        }
//        if (second && second.path === '/helpCenter/') {
//          matched[1].name = '帮助中心'
//        }
//        this.$store.state.menu = matched
//      },
      loginOption(text, memory) {
        this.memory = ''
        this.pageStatus = text
        if (memory) {
          this.memory = memory
        }
      },
      logOut(text) {

        this.memory = '';

        if (text) {
          this.memory = text
        }
        this.loginStatus = 2
        this.pageStatus = 'login'

      },
      gotoerror() {
        this.$router.push({path: '/error'})
        this.pageStatus = 'home'

      },
      getLogo() {

        var p = this.$route.path;
        if (p == '/' || p == '/list' || p == '/detail' || p == '/cart' || p == '/buy' || p == '/preference' || p == '/shoppingStreet') {
          this.tab = 2;
        } else if (p == '/i' || p == '/myBill' || p == '/myBillMore' || p == '/myOrder' || p == '/freeDeposit' || p == '/myAccount' || p == 'companyCertificationFailed') {
          this.tab = 1;
        } else if (p == '/pay' || p == '/result') {
          this.tab = 3;
        } else if (p == '/resetPassword') {
          this.tab = 4;
        } else {
          this.tab = 1;
        }

        if (p == '/detail') {
          this.is_bottom_icons = false;
        } else {
          this.is_bottom_icons = true;
        }
//        window.pageYOffset = 0;
//        document.documentElement.scrollTop = 0;
//        document.body.scrollTop = 0;

      },
    },
    created() {
      this.getLogo();
//      this.getList();
      bus.$on('islogin', this.loginOption)
      bus.$on('logout', this.logOut)
      bus.$on('error', this.gotoerror)

    },
    watch: {
//      "$route": "getLogo",
      $route() {
//        window.pageYOffset = 0
//        document.documentElement.scrollTop = 0
//        document.body.scrollTop = 0
//        this.getList();
        this.getLogo();
      },
//      "$route": "getLogo"
//      '$route' (to, from) {
//
////        this.getList();
//      },

    }
  }
</script>

<style scoped lang="scss">
  /*@import "../assets/css/public.scss";*/
  .el-aside {
    background-color: #FFFFFF;
  }

  .el-main {
    background-color: #FFFFFF;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .teamwork {
    height: 266px;
    width: 1200px;
    background: #fff;
    margin: 0 auto;
    border-bottom: 1px solid #EEEEEE;
    overflow: hidden;
    .title {
      font-size: 22px;
      color: #333333;
      letter-spacing: 0;
      line-height: 22px;
      margin-top: 30px;
      margin-bottom: 15px;
      text-align: left;
    }
    .com-box {
      width: 100%;
      height: auto;
      .img {
        width: 200px;
        height: 66px;
        float: left;
        text-align: center;
        vertical-align: middle;
        line-height: 66px;
        margin-bottom: 20px;
        img {
          vertical-align: middle;

        }
      }
    }
  }

  /*要删*/

  /*.bg-purple-dark {*/
  /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
  /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
  /*background: #e5e9f2;*/
  /*}*/
</style>
