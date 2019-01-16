<template>
  <div class="personal_part">
    <div class="levelModel">
      <div class="levelBar">
        <ul>
          <router-link to="/"><li style="padding: 0">首页</li></router-link>
          <li>&gt;</li>
          <router-link to="/helpCenter"><li :class="{current:!levelType}">帮助中心</li></router-link>
          <li v-if="levelType">&gt;</li>
          <li v-if="levelType" class="current">{{ pathName }}</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <el-container style="max-width: 1200px;margin: 0 auto;">
        <el-aside width="200px" style="background-color: #fff;">
          <div class="left_aside" style="padding-bottom: 63px;background-color: #fff;">
            <div class="personal">
              <span>帮助中心</span>
            </div>
            <div class="h-list">
              <h3>租机流程</h3>
              <ul style="margin: 0">
                <router-link v-for="(item, index) in rentlist" :key="index" :to="item.path"><li :class="{active:item.path==is_active}" >{{item.name}}</li></router-link>
              </ul>
            </div>
            <div class="h-list">
              <h3>售后服务</h3>
              <ul style="margin: 0">
                <router-link v-for="(item, index) in afterSalelist" :key="index" :to="item.path"><li :class="{active:item.path==is_active}" >{{item.name}}</li></router-link>
              </ul>
            </div>
            <div class="h-list">
              <h3>常见问题</h3>
              <ul style="margin: 0">
                <router-link v-for="(item, index) in questionList" :key="index" :to="item.path"><li :class="{active:item.path==is_active}" >{{item.name}}</li></router-link>
              </ul>
            </div>
          </div>

        </el-aside>
        <el-main style="padding: 0;margin-left: 10px;background-color: #fff;overflow: hidden">

          <router-view></router-view>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name:'personalPart',
    data(){
      return{
        token:'',
        levelType: false,
        pathName: '',
        personal_detail: '账号信息',
        is_active: '',
        rentlist: [
          {
            name: '什么是免押金额度',
            path: '/helpCenter'
          },
          {
            name: '租机流程',
            path: '/rentMachineFlow'
          },
          {
            name: '租金缴付',
            path: '/rentPay'
          },
          {
            name: '租赁方式',
            path: '/leaseWay'
          },
          {
            name: '取还机',
            path: '/alsoMachine'
          }
        ],
        afterSalelist: [
          {
            name: '签收注意事项',
            path: '/attentionMatters'
          },
          {
            name: '退机、换机流程与费用',
            path: '/proceduresAndExpenses'
          },
          {
            name: '售后服务',
            path: '/afterSales'
          },
          {
            name: '非损害鉴定标准与收费',
            path: '/undamage'
          },
          {
            name: '违约行为',
            path: '/breakAContact'
          }
        ],
        questionList: [
          {
            name: '机器故障怎么办',
            path: '/machineError'
          },
          {
            name: '使用中机器损坏怎么办',
            path: '/machineBreakdown'
          },
          {
            name: '机器丢失怎么办',
            path: '/machineMissing'
          },
          {
            name: '运费怎么收取',
            path: '/freightCollect'
          },
          {
            name: '提前退租怎么办',
            path: '/advancedSurrender'
          },
        ]
      }
    },
    methods:{
    },
    created() {
      this.pathName = this.$route.name;
      this.is_active = sessionStorage.getItem('index_storage');
      this.$router.beforeEach((to, from, next) => {
        this.is_active = to.path;
        next();
      })
    },
    watch: {
      is_active () {
        this.is_active = this.$route.path;
      },
      $route (val) {
        this.pathName = val.name;
        if (val.name !== '什么是免押金额度') {
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
  .main {
    .left_aside {
      .h-list{
        margin-top: 36px;
        h3{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 14px;
        }
        ul {
          list-style: none;
          margin-top: 0px;
          li {
            margin: 24px 0 0 10px;
            font-size: 14px;
            color: #666666;
            cursor: pointer;
          }
          .active {
            color: #6ECC66;
          }
        }
      }
    }
  }
</style>
