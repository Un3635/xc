<template>
  <div class="free_deposit_used">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="surplus">
        <div class="one_part">
          <div class="fl">
            <span class="surplus_quota">剩余免押金额度</span>
            <span class="num">{{restQuota}}</span>
            <span class="yen">元</span>
          </div>
          <div class="fr">
            <span class="btn_successT" @click="promoteQuota">
              提升额度
            </span>
            <span class="btn_start">
              <span class="btn_textT" style="padding-left: 30px;padding-right: 30px;"
                    @click="goToLeaseComputer">去租机</span>
            </span>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="two_part">
          <span class="total_quota">总额度</span>
          <span class="num">{{totalQuota}}元</span>
          <span class="used_quota">已经使用额度  </span>
          <span class="num">{{usedTotalQuota}}元</span>
        </div>
      </div>
      <div class="used_record">
        <span>免押金额度使用记录</span>
      </div>

      <div class="icon_box" v-if="!isOrder">
        <div class="icon_kong">
          <img src="../../assets/images/icon_jilu_kong.png" alt="">
        </div>
        <div class="txt">
          <span>您的免押金额度还没有使用，赶紧去租机吧</span>
        </div>
        <div class="btn_success" style="padding-left: 30px;padding-right: 30px;" @click="goToLeaseComputer">
          去租机
        </div>
      </div>


      <div class="order_list" v-if="isOrder">
        <table>
          <thead>
          <th>订单号</th>
          <th>已使用押金(元)</th>
          <!--<th>订单状态</th>-->
          <th>操作</th>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td>{{item.orderNo}}</td>
            <td>{{item.usedCreditQuota}}</td>
            <!--<td>-->
              <!--<span v-if="item.orderStatus==1">待审核</span>-->
              <!--<span v-if="item.orderStatus==2">待出库</span>-->
              <!--<span v-if="item.orderStatus==3">待收货</span>-->
              <!--<span v-if="item.orderStatus==4">租赁中</span>-->
              <!--<span v-if="item.orderStatus==5">已取消</span>-->
              <!--<span v-if="item.orderStatus==6">待退回</span>-->
              <!--<span v-if="item.orderStatus==7">已退回</span>-->
              <!--<span v-if="item.orderStatus==8">待确认</span>-->
              <!--<span v-if="item.orderStatus==9">租赁完成</span>-->
              <!--<span v-if="item.orderStatus==10">已关闭</span>-->
              <!--</td>-->
            <td class="view" @click="viewDetail">查看详情</td>
          </tr>

          </tbody>
        </table>

        <div class="page">
          <pagination :pageData="pageData" @listenToChild="listenToChild"></pagination>
        </div>


      </div>
    </div>

    <pop :obj="obj"></pop>

  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import pagination from '../x-pagination'
  import pop from './x-pop'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  export default {
    name: 'freeDepositUsed',
    components: {
      plugin_title: plugin_title,
      pagination: pagination,
      pop: pop
    },
    data(){
      return {
        obj: {
          title: '免押金额度',
          content: '',
          is_pop: false
        },
        token: '',
        restQuota: '',
        totalQuota: '',
        usedTotalQuota: '',
        parentMsg: '免押金额度',
        tableData: [],
        pageData: {
          total: 10,
          currentPage: 1,
          pageSizes: 10
        },
        isOrder: false,
      }
    },
    methods: {
      viewDetail(){
//          点击跳转到【我的订单-全部订单】
        this.$router.push({path: './myOrder', query: {from: 'freeDepositUsed'}});
      },
      listenToChild(){
        var vm = this;

        this.getRecord();
      },
      handleCurrentChange(val){

      },
      promoteQuota(){
//          跳到提升额度页面
        this.$emit('proQuota');
      },
      goToLeaseComputer(){
//          去租机，跳到首页
        this.$router.push('./');
      },
      detail(){
//      查看详情  点击跳转到【我的订单-全部订单】
      },
      getRecord(){
        var obj = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/deposit/queryDepositRecord', {params: obj}).then(function (data) {
          var res = data.data;

          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;


            if (res.data.searchVos.length == 0) {
              vm.isOrder = false;
            } else {
              vm.isOrder = true;
              vm.tableData = res.data.searchVos;
              for (var i = 0; i < vm.tableData.length; i++) {
                vm.tableData[i].usedCreditQuota = allMethods.fmoney(vm.tableData[i].usedCreditQuota, 2);
              }
            }


          } else {

            vm.obj.is_pop = true;
            vm.obj.content = res.msg;

          }
        })
      },
      getQuota(){
        var vm = this;
        this.$http.get('/deposit/queryDeposit', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.restQuota = allMethods.fmoney(res.data.restQuota, 2);
            vm.totalQuota = allMethods.fmoney(res.data.totalQuota, 2);
            vm.usedTotalQuota = allMethods.fmoney(res.data.usedTotalQuota, 2);
          } else {


            vm.obj.is_pop = true;
            vm.obj.content = res.msg;

          }
        })
      }
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      this.getRecord();
      this.getQuota();
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  .free_deposit_used {
    .content{
    padding-top: 0 !important;
    }
  }

</style>
