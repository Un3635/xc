<template>
  <div class="my_bill">

    <div class="plugin_title">
      <div class="main_content">
        <div class="account_info_t">
          <span style="display: inline-block;float: left;">我的账单</span>
          <span class="date_box" v-if="back_code!=3001">
              <div class="pic" style="margin-top: 4px;">
                <img src="../../assets/images/my_account_arrow.png" alt="">
              </div>
              <div class="bill_date">
                <span class="bill_day">账单日 每月{{repaymentDay}}号</span>
              </div>
            </span>
        </div>
      </div>
      <div class="line"></div>
    </div>

    <div v-if="back_code!=3001">
      <div class="selected">
        <div class="arrow_left" @click="leftMove" @mouseenter="leftHover" @mouseleave="leftLeave">
          <img src="../../assets/images/icon_left_normol.png" alt="" v-if="left_active">
          <img src="../../assets/images/icon_left_hover.png" alt="" v-if="!left_active">
        </div>
        <div class="box">
          <span class="small_box" v-for="(item,index) in list" @click="datesStatus(item,index)"
                :class="{active:index==is_active}">
            <span class="dt">{{item.billDate}}</span>
            <span class="status">
              <span class="sts_span" v-if="item.billStatus==1">已还清</span>
              <span class="sts_span" v-if="item.billStatus==2" style="color:#FD7220;">已逾期</span>
              <span class="sts_span" v-if="item.billStatus==3">未结算</span>
              <span class="sts_span" v-if="item.billStatus==4">未出账</span>
              <span class="sts_span" v-if="item.billStatus==5">无记录</span>
            </span>
          </span>
        </div>
        <div class="arrow_right" @click="rightMove" @mouseenter="rightHover" @mouseleave="rightLeave">
          <img src="../../assets/images/icon_right_normol.png" alt="" v-if="right_active">
          <img src="../../assets/images/icon_right_hover.png" alt="" v-if="!right_active">
        </div>
      </div>
      <div class="pic_box" v-for="(item,index) in list" v-if="index==is_active" @mouseleave="mxOut">
        <div class="fl">
          <img src="../../assets/images/bill_pic.png" alt="">
          <div class="content">
            <div class="on_time"><span>按时还款</span></div>
            <div class="free"><span>有助于免押额度提升</span></div>
          </div>
        </div>
        <div class="fr">
          <div class="this_term">
            <span>本期待还金额</span>
          </div>
          <div class="num">
            <span>¥</span>
            <span class="w_span">{{item.billPendingTotalAmount}}</span>
            <span class="btn_successT" v-if="item.billPendingTotalAmount!=0||item.billPendingTotalAmount!=0.00"
                  @click="oneKeyRepay(item.countBillId)">一键还款</span>
          </div>
          <div class="detail">
            <span class="mx" @mouseenter="mxOver">明细</span>
            <transition name="fade">
              <div class="des" v-if="mx_des">
                <table>
                  <tr class="tt">
                    <td>待还</td>
                    <td></td>
                    <td>账单总额</td>
                    <td></td>
                    <td>逾期</td>
                    <td></td>
                    <td>已还</td>
                  </tr>
                  <tr style="height: 15px;">

                  </tr>
                  <tr>
                    <td style="color:#FF7200;font-size: 20px">{{item.billPendingTotalAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">=</td>
                    <td class="money_num">{{item.billTotalAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">+</td>
                    <td class="money_num">{{item.dueAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">-</td>
                    <td class="money_num">{{item.billAlredayTotalAmount}}</td>
                  </tr>
                </table>
                <div class="pic" style="top: -12px;">
                  <img src="../../assets/images/detailed.png" alt="">
                </div>
              </div>
            </transition>

          </div>
        </div>
      </div>
      <div class="list">
        <table border="1">
          <thead>
          <tr>
            <th>SN码</th>
            <th>期数</th>
            <th>月租</th>
            <th>开始租期</th>
            <th>结束租期</th>
            <!--<th>付款日</th>-->
            <th>滞纳金</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody  v-loading="loading">
          <tr v-for="item in tableData">
            <td>{{item.snCode}}</td>
            <td>{{item.curPeriod}}/{{item.period}}</td>
            <td>{{item.monthRentMoney}}元</td>
            <td>{{item.rentBeginTime}}</td>
            <td>{{item.rentEndTime}}</td>
            <!--<td>{{item.repaymentDay }}</td>-->
            <td>{{item.overdueMoney}}元</td>
            <td>
              <span v-if="item.status==1">
                <el-tooltip placement="bottom">
                <div slot="content">还款时间：{{item.rentDate}}</div>
                <span>已还款</span>
              </el-tooltip>
              </span>
              <span v-if="item.status==3">已关闭</span>
              <span v-if="item.status==4">已取消</span>
              <span class="repay" v-if="item.status==0||item.status==2" @click="goToRepay(item.billId)">还款</span>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <div class="page">

        <pagination :pageData="pageData" @listenToChild="listenToChild" v-if="!noRecord"></pagination>

        <!--<div class="no_record" v-if="noRecord">暂无记录</div>-->
        <div class="icon_box" v-if="noRecord">
          <div class="icon_kong">
            <img src="../../assets/images/icon_jilu_kong.png" alt="">
          </div>
          <div class="txt">
            <span>没有相关的结果哦！</span>
          </div>
        </div>
      </div>
    </div>

    <div class="icon_box" v-if="back_code==3001">
      <div class="icon_kong">
        <img src="../../assets/images/icon_jilu_kong.png" alt="">
      </div>
      <div class="txt">
        <span>您还没有账单，赶紧去租机吧</span>
      </div>
      <div class="btn_success" style="padding-left: 30px;padding-right: 30px;" @click="goToIndex">
        去租机
      </div>
    </div>
    <pop :obj="obj"></pop>

  </div>

</template>

<script type="text/ecmascript-6">
  import pagination from '../x-pagination'
  import pop from './x-pop'
  import {allMethods} from '../../assets/js/config'
  export default {
    components: {
      pagination: pagination,
      pop: pop
    },
    name: 'myBill',
    data(){
      return {
        loading:false,
        beforeDate: '',
        beforeIndex: 0,
        left_active: true,
        right_active: true,
        obj: {
          title: '我的账单',
          content: '',
          is_pop: false
        },
        noRecord: false,
        mx_des: false,
        mainBillId: '',
        tableData: [],
        pageData: {
          total: 5,
          currentPage: 1,
          pageSizes: 10
        },
        leftDate: '',
        rightDate: '',
        repaymentDay: '',
        back_code: '',
        date: '',
        token: '',
        left_arrow_status: 1,
        right_arrow_status: 1,
        total: 20,
        time: '还款时间：2017-12-26',
        is_active: 2,
        list: [],
        move_index: 0,
      }
    },
    methods: {
      leftHover(){
        this.left_active = false;
      },
      leftLeave(){
        this.left_active = true;
      },
      rightHover(){
        this.right_active = false;
      },
      rightLeave(){
        this.right_active = true;
      },
      mxOver(){

        this.mx_des = true;
        $('.des').fadeIn();

      },
      mxOut(){
//          alert(2);

        this.mx_des = false;
        $('.des').fadeOut();

      },
      goToRepay(billId){
        this.beforeIndex = this.is_active;
        this.beforeDate = this.date;
        this.$router.push({
          path: '../pay',
          query: {
            countBillId: this.mainBillId,
            billId: billId,
            type: 'repay',
            beforeIndex: this.beforeIndex,
            beforeDate: this.beforeDate
          }
        });
      },
      listenToChild(){


        var vm = this;

        this.getMyBillOrder();
      },
      getMyBillOrder(){
        this.loading=true;
        var obj = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          date: this.date,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/bill/currentRecord', {params: obj}).then(function (data) {
          vm.loading=false;
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;
            vm.tableData = res.data.searchVos;
            for (var i = 0; i < vm.tableData.length; i++) {
              vm.tableData[i].monthRentMoney = allMethods.fmoney(vm.tableData[i].monthRentMoney, 2);
              vm.tableData[i].overdueMoney = allMethods.fmoney(vm.tableData[i].overdueMoney, 2);
            }
            if (res.data.searchVos.length == 0) {
              vm.noRecord = true;
            } else {
              vm.noRecord = false;
            }

          } else if (Number(res.code) === 3001) {
            vm.noRecord = true;
          }else if(Number(res.code) !== 7024) {
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
      oneKeyRepay(countBillId){


        this.beforeIndex = this.is_active;
        this.beforeDate = this.date;
        this.$router.push({
          path: '../pay',
          query: {countBillId: countBillId, type: 'repay', beforeIndex: this.beforeIndex, beforeDate: this.beforeDate}
        });
      },
      goToIndex(){
//          this.$router.push('../');
        this.$router.push('./');
      },
      handleCurrentChange(){

      },

      datesStatus(item, index){

        this.is_active = index;
        this.date = item.billDate;

        this.mainBillId = this.list[index].countBillId;
        this.getMyBillOrder();
      },
      leftMove(){
        this.date = this.leftDate;
        this.getData();
        this.is_active = 2;
        this.mainBillId = this.list[2].countBillId;
        this.getMyBillOrder();

//        console.log(this.move_index);
//        this.move_index--;
//        if (this.move_index == 0) {
//          $('.box').css('margin-left', 0);
//        } else {
//          $('.box').css('margin-left', -(this.move_index) * 165 + 'px');
//        }
//        if (this.move_index <= 0) {
//          this.move_index = 0;
//          $('.box').css('margin-left', 0);
//        }
//        console.log(99);
//        console.log(this.move_index);


      },
      rightMove(){
        this.date = this.rightDate;
        this.getData();
        this.is_active = 2;
        this.mainBillId = this.list[2].countBillId;
        this.getMyBillOrder();

//        this.move_index++;
//        console.log(this.move_index);
//        if (this.move_index == 0) {
//          $('.box').css('margin-left', 0);
//        } else if (this.move_index >= (this.list.length - 5)) {
//          $('.box').css('margin-left', -(this.move_index) * 165 + 'px');
//          this.move_index = this.list.length - 5;
//        } else {
//          $('.box').css('margin-left', -(this.move_index) * 165 + 'px');
//        }
//
//        if (this.move_index == this.list.length - 5) {
//          $('.box').css('margin-left', -(this.move_index) * 165 + 'px');
//        }
//        console.log(this.move_index);

      },
      getData(){
        var vm = this;
        var obj = {
          token: this.token,
          date: this.date,
          initTime: new Date().getTime()
        };
        this.$http.get('/bill/queryAll', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 3001) {
            vm.back_code = 3001;
          } else if (Number(res.code) === 1000) {
            vm.list = res.data.list;
            for (var i = 0; i < vm.list.length; i++) {
              vm.list[i].billPendingTotalAmount = allMethods.fmoney(vm.list[i].billPendingTotalAmount, 2);
              vm.list[i].billTotalAmount = allMethods.fmoney(vm.list[i].billTotalAmount, 2);
              vm.list[i].dueAmount = allMethods.fmoney(vm.list[i].dueAmount, 2);
              vm.list[i].billAlredayTotalAmount = allMethods.fmoney(vm.list[i].billAlredayTotalAmount, 2);
            }
            vm.repaymentDay = res.data.repaymentDay;
            vm.leftDate = vm.list[1].billDate;
            vm.rightDate = vm.list[3].billDate;
            vm.date = vm.list[2].billDate;
            vm.mainBillId = vm.list[2].countBillId;
            vm.getMyBillOrder();
          }else if(Number(res.code) !== 7024) {
//            vm.$alert(res.msg, '我的账单', {
//              confirmButtonText: '我知道了',
//              type: 'warning'
//            })
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
      getDate(){
        var myDate = new Date();
        var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        if (month < 10) {
          month = '0' + month;
        }
        this.date = year + '-' + month;

      }
    },
    created(){

      this.token = localStorage.getItem('xckz_mall');
      this.getDate();
      if (this.$route.query.beforeIndex && this.$route.query.beforeDate) {
        this.date = this.$route.query.beforeDate;
        this.is_active = this.$route.query.beforeIndex;
        var year = Number(this.date.substr(0, 4));
        var month = Number(this.date.substr(5, 7));
        if (this.is_active == 0) {
          var y = year;
          var m = month;
          if (month == 11) {
            m = '01';
            y = y + 1;
          } else if (month == 12) {
            m = '02';
            y = y + 1;
          } else if (month == 10 || month == 9 || month == 8) {
            m = m + 2;
          } else {
            m = m + 2;
            m = '0' + m;
          }
          this.date = y + "-" + m;
        } else if (this.is_active == 1) {
          var y = year;
          var m = month;
          if (month == 12) {
            m = '01';
            y = y + 1;
          } else if (month == 11 || month == 10 || month == 9) {
            m = m + 1;
          } else {
            m = m + 1;
            m = '0' + m;
          }
          this.date = y + "-" + m;

        } else if (this.is_active == 2) {

          var y = year;
          var m = month;
          if (m == 12 || m == 11 || m == 10) {
            m = m;
          } else {
            m = '0' + m;
          }
          this.date = y + '-' + m;

        } else if (this.is_active == 3) {
          var y = year;
          var m = month;
          if (month == 1) {
            m = 12;
            y = y - 1;
          } else if (month == 12 || month == 11) {
            m = m - 1;
          } else {
            m = m - 1;
            m = '0' + m;
          }
          this.date = y + '-' + m;

        } else if (this.is_active == 4) {
          var y = year;
          var m = month;
          if (month == 1) {
            m = 11;
            y = y - 1
          } else if (month == 2) {
            m = 12;
            y = y - 1
          } else if (month == 12) {
            m = m - 2;
          } else {
            m = m - 2;
            m = '0' + m;
          }
          this.date = y + '-' + m;
        }

//          this.getData();

//        this.date = item.billDate;


        var vm = this;
        var obj = {
          token: this.token,
          date: this.date,
          initTime: new Date().getTime()
        };
        this.$http.get('/bill/queryAll', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 3001) {
            vm.back_code = 3001;
          } else if (Number(res.code) === 1000) {
            vm.list = res.data.list;
            for (var i = 0; i < vm.list.length; i++) {
              vm.list[i].billPendingTotalAmount = allMethods.fmoney(vm.list[i].billPendingTotalAmount, 2);
              vm.list[i].billTotalAmount = allMethods.fmoney(vm.list[i].billTotalAmount, 2);
              vm.list[i].dueAmount = allMethods.fmoney(vm.list[i].dueAmount, 2);
              vm.list[i].billAlredayTotalAmount = allMethods.fmoney(vm.list[i].billAlredayTotalAmount, 2);
            }
            vm.repaymentDay = res.data.repaymentDay;
            vm.leftDate = vm.list[1].billDate;
            vm.rightDate = vm.list[3].billDate;
//            vm.date = vm.list[2].billDate;
            vm.mainBillId = vm.list[vm.$route.query.beforeIndex].countBillId;
          }else if(Number(res.code) !== 7024){
//            vm.$alert(res.msg, '我的账单', {
//              confirmButtonText: '我知道了',
//              type: 'warning'
//            })
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })

        vm.loading=true;
        var obj_recorde = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          date: this.$route.query.beforeDate,
          initTime: new Date().getTime()
//          date:this.date
        }
        var vm = this;
        this.$http.get('/bill/currentRecord', {params: obj_recorde}).then(function (data) {
          vm.loading=false;
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;
            vm.tableData = res.data.searchVos;
            for (var i = 0; i < vm.tableData.length; i++) {
              vm.tableData[i].monthRentMoney = allMethods.fmoney(vm.tableData[i].monthRentMoney, 2);
              vm.tableData[i].overdueMoney = allMethods.fmoney(vm.tableData[i].overdueMoney, 2);
            }
            if (res.data.searchVos.length == 0) {
              vm.noRecord = true;
            } else {
              vm.noRecord = false;
            }
          } else if (Number(res.code) === 3001) {
            vm.noRecord = true;
          }else if(Number(res.code) !== 7024) {
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
        this.date = this.$route.query.beforeDate;
      } else {
        this.getData();
      }

    },
    mounted(){


    }

  }
</script>

<style scoped>
  .no_record {
    font-size: 20px;
    color: #CCCCCC;
    text-align: center;
    margin-top: 20px;
  }
  .money_num{
    font-size: 20px !important;
    color: #151515 !important;
  }
</style>
