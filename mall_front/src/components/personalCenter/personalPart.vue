<template>
  <div class="personal_part">
    <div class="levelModel">
      <div class="levelBar">
        <app-breadcrumbs></app-breadcrumbs>
      </div>
    </div>
    <div class="main">
      <el-container style="max-width: 1200px;margin: 0 auto;">
        <el-aside width="200px" style="padding-bottom: 162px;background-color: #fff;">
          <div class="left_aside">
            <div class="personal">
              <span>个人中心</span>
            </div>
            <!--<ul>-->
            <!--<a v-for="(item, index) in lis" :key="index" :href="item.path">-->
            <!--<li :class="{active:item.path==is_active}" @click="getPath(item.name,item.path)">{{item.name}}</li>-->
            <!--</a>-->
            <!--</ul>-->
            <ul>
              <router-link v-for="(item, index) in lis" :key="index" :to="{path:item.path,query: {}}">
                <li :class="{active:item.path==is_active}" @click="getPath(item.name,item.path)">{{item.name}}</li>
              </router-link>
            </ul>

          </div>

        </el-aside>
        <el-main style="padding: 0;margin-left: 10px;background-color: #fff;display:inline-block;">

          <router-view></router-view>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'personalPart',
    data() {
      return {
        token: '',
        personal_detail: '账号信息',
        is_active: '',
        levelType: false,
        pathName: '',
        lis: [
          {
            name: '账号信息',
            path: '/i'
          },
          {
            name: '账户余额',
            path: '/balanceDetail'
          },
          {
            name: '免押金额度',
            path: '/freeDeposit'
          },
          {
            name: '我的订单',
            path: '/myOrder'
          },
          {
            name: '我的账单',
            path: '/myBillMore'
          },
          {
            name: '账号认证',
            path: '/companyCertificationFailed'
          },
          {
            name: '我的账号',
            path: '/myAccount'
          },
          {
            name: '企业管理',
            path: '/companyManage'
          },
          {
            name: '资产大盘',
            path: '/assetMarket'
          },
          {
            name: '审批管理',
            path: '/approvalManage'
          },
          {
            name: '在租设备',
            path: '/facilityManager'
          }
        ]
      }
    },
    methods: {
      getPath(name, pt) {
        this.pathName = name;
        let routerList = ['/i', '/freeDeposit', '/myOrder', '/myBillMore', '/companyCertificationFailed', '/myAccount', '/companyManage', '/assetMarket', '/approvalManage'];
        let index = routerList.indexOf(pt);
        if (index != -1 && routerList[index] == this.is_active) {
          location.href = location.href;
        }
      }
    },
    created() {
      this.pathName = this.$route.name;
      this.personal_detail = sessionStorage.getItem('item_storage');
      this.is_active = sessionStorage.getItem('index_storage');
      this.token = localStorage.getItem('xckz_mall');
      this.$router.beforeEach((to, from, next) => {
        this.is_active = to.path;
        next();
      })
    },
    watch: {
      is_active() {
        this.is_active = this.$route.path;
      },
      $route(val) {
        this.pathName = val.name;
        if (val.name !== '账号信息') {
          this.levelType = true;
        } else {
          this.levelType = false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .active {
    color: #6ECC66;
  }
</style>
