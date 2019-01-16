<template>
  <div class="my_bill">
    <div class="plugin_title">
      <div class="main_content">
        <div class="account_info_t">
          <span style="display: inline-block;float: left;">我的账单</span>
          <span class="date_box" v-if="back_code!=3001">
            <div class="pic" style="margin-top: 21px;">
              <img src="../../assets/images/my_account_arrow.png" alt="">
            </div>
            <div class="bill_date">
              <span class="bill_day">账单日 每月{{repaymentDay}}号</span>
            </div>
            <!--<el-select v-model="date" placeholder="请选择" @change="searchDate(list,date)">-->
                  <!--<el-option v-for="(allD,idx) in getSearchDate" :key="idx"-->
                             <!--:value="allD.billDate" :label="allD.billDate +allD.text">-->
                  <!--</el-option>-->
            <!--</el-select>-->

            </span>
        </div>
      </div>
      <div class="line"></div>
    </div>


    <div v-if="back_code!=3001">
      <div class="selected">
        <div class="arrow_left" @mouseenter="leftHover" @mouseleave="leftLeave" v-show="arrowLeftType">
          <img src="../../assets/images/icon_left_normol.png" alt="" v-if="left_active">
          <img src="../../assets/images/icon_left_hover.png" alt="" v-if="!left_active">
        </div>
        <div class="big_box">
          <div class="box">
          <span class="small_box" v-for="(item,index) in list" @click="datesStatus(item,index)"
                :class="{active:index==is_active}">
            <span class="dt">{{item.billDate}}</span>
            <span class="status">

              <!--<span class="sts_span" v-if="item.billStatus==2" style="color: #FD7220;">¥{{item.amount|decimals(2)}}</span>-->
              <!--<span class="sts_span" v-else>¥{{item.amount|decimals(2)}}</span>-->
              <span class="sts_span" v-if="item.billStatus==1">已还清</span>
              <span class="sts_span" v-if="item.billStatus==2" style="color: #FD7220;">已逾期</span>
              <span class="sts_span" v-if="item.billStatus==3">未结算</span>
              <span class="sts_span" v-if="item.billStatus==4">未出账</span>
              <span class="sts_span" v-if="item.billStatus==5">无记录</span>
            </span>
          </span>
          </div>
        </div>
        <div class="arrow_right" @mouseenter="rightHover" @mouseleave="rightLeave" v-show="arrowRightType">
          <img src="../../assets/images/icon_right_normol.png" alt="" v-if="right_active">
          <img src="../../assets/images/icon_right_hover.png" alt="" v-if="!right_active">
        </div>
      </div>
      <div class="pic_box" @mouseleave="mxOut">
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
            <span class="w_span">{{myBillInfo.billPendingTotalAmount}}</span>
            <span class="btn_successT"
                  v-if="myBillInfo.billPendingTotalAmount!=0||myBillInfo.billPendingTotalAmount!=0.00"
                  @click="oneKeyRepay(myBillInfo.countBillId)">一键还款</span>
            <!--<span class="btn_successT"-->
            <!--v-if="myBillInfo.billPendingTotalAmount!=0||myBillInfo.billPendingTotalAmount!=0.00"-->
            <!--@click="oneKeyRepay(myBillInfo.countBillId)">还款确认中</span>-->
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
                    <td style="color:#FF7200;font-size: 20px">{{myBillInfo.billPendingTotalAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">=</td>
                    <td class="money_num" style="font-size: 20px;color: #151515;">{{myBillInfo.billTotalAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">+</td>
                    <td class="money_num" style="font-size: 20px;color: #151515;">{{myBillInfo.dueAmount}}</td>
                    <td style="width: 28px;text-align: center;font-size: 20px;color: #151515;">-</td>
                    <td class="money_num" style="font-size: 20px;color: #151515;">
                      {{myBillInfo.billAlredayTotalAmount}}
                    </td>
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
            <th width="180px">子订单号</th>
            <th width="220px">商品名称</th>
            <th>租赁台数</th>
            <th>起租日期</th>
            <th>月租</th>
            <th>期数</th>
            <th>滞纳金</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td width="180px">{{item.orderChildNo}}</td>
            <td class="fix-w">{{item.goodsTitle}}</td>
            <td>{{item.sumCount}}</td>
            <td>
              {{+item.rentBeginTime|date('YYYY-MM-DD')}}
            </td>
            <td>{{item.monthRentMoney}}</td>
            <td>{{item.curPeriod}}/{{item.period}}</td>
            <td>{{item.overdueMoney}}元</td>
            <td>
              <span v-if="item.status==1">
                <el-tooltip placement="bottom">
                  <div slot="content">还款时间：{{+item.rentBeginTime|date('YYYY-MM-DD')}}</div>
                  <span>已还款</span>
                </el-tooltip>
              </span>
              <span v-if="item.status==3">已关闭</span>
              <span v-if="item.status==4">已取消</span>

              <span class="repay" v-if="item.status==0||item.status==2" @click="goToRepay(item.billId)">
                 <el-tooltip placement="bottom">
                  <div slot="content">还款时间：{{+item.rentBeginTime|date('YYYY-MM-DD')}}</div>
                  <span>还款</span>
              </el-tooltip>
              </span>
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
  import Mytools from '../../myjs/my_tools'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import plugin_title from '../plugin_title'
  import moment from 'moment';
  let ListLength, x = 0;
  export default {
    components: {
      pagination: pagination,
      pop: pop,
      plugin_title: plugin_title
    },
    name: 'myBillMore',
    data(){
      return {
        myBillInfo: {},
        minDate: '',
        listIndex: 0,
        currentDate: '',
        differenceValueList: [],
        arrowRightType: true,
        arrowLeftType: false,
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
        getSearchDate: [],
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
    filters: {
      newDate(time, format){
        if (!time || time == '无') {
          return '-';
        }
        return moment(time).format(format);
      }
    },
    methods: {
      initSearchDate(datas){
        datas.forEach((value) => {
          if(value.billStatus == 1){
            value['text'] = ' 未结算'
          }else if(value.billStatus == 2){
            value['text'] = ' 已逾期'
          } if(value.billStatus == 3){
            value['text'] = ' 未结算'
          } if(value.billStatus == 4){
            value['text'] = ' 未出账'
          } if(value.billStatus == 5){
            value['text'] = ' 无记录'
          }
        });
        this.getSearchDate = datas;
      },
      searchDate(res, time) {
        res.forEach((val,index) => {
          var newIndex = index;
          if(val.billDate === time){
            if(newIndex > ListLength -6){
              newIndex = ListLength - 5;
              this.arrowRightType = false;
            }else if(newIndex === 0){
              this.arrowLeftType = false;
            }else {
              this.arrowLeftType = true;
              this.arrowRightType = true;
            }
            $(".box").animate({marginLeft: -165 * newIndex});
            x = index;
            this.datesStatus(val,index);
          }
        })
      },
      getMyBill () {
        this.$http.get('bill/queryMonth', {params: {token: this.token, initTime: new Date().getTime()}}).then((res) => {
          if (Number(res.data.code) === 3001) {
            this.back_code = 3001
          } else if (Number(res.data.code) === 1000) {
            this.list = res.data.data.reponseVo;
            this.repaymentDay = res.data.data.repaymentDay;
            ListLength = this.list.length;
            this.initSearchDate(this.list);
            for (let i = 0; i < ListLength; i++) {
              this.differenceValueList.push(Math.abs(Mytools.millisecond(this.list[i].billDate) - this.currentDate))
            }
            let minNum = (num) => Math.min(...num);
            this.minDate = minNum(this.differenceValueList)
            if (JSON.stringify(this.$route.query) === '{}') {
              for (let i = 0; i < this.differenceValueList.length; i++) {
                if (this.differenceValueList[i] === this.minDate) {
                  if (i < 2) {
                    this.listIndex = i
                    x = 0
                  } else {
                    this.listIndex = i
                    x = i - 2
                  }
                  this.date = this.list[i].billDate
                }
              }
            } else if (this.$route.query.beforeDate !== undefined) {
              for (let i = 0; i < ListLength; i++) {
                if (this.list[i].billDate === this.$route.query.beforeDate) {
                  if (i < 2) {
                    this.listIndex = i
                    x = 0
                  } else if (i === ListLength - 2) {
                    this.listIndex = i
                    x = i - 3
                  } else if (i === ListLength - 1) {
                    this.listIndex = i
                    x = i - 4
                  } else {
                    this.listIndex = i
                    x = i - 2
                  }
                  this.date = this.list[i].billDate
                }
              }
            } else {
              for (let i = 0; i < ListLength; i++) {
                if (this.list[i].billDate === this.$route.query.date) {
                  if (i < 2) {
                    this.listIndex = i
                    x = 0
                  } else if (i === ListLength - 2) {
                    this.listIndex = i
                    x = i - 3
                  } else if (i === ListLength - 1) {
                    this.listIndex = i
                    x = i - 4
                  } else {
                    this.listIndex = i
                    x = i - 2
                  }
                  this.date = this.list[i].billDate
                }
              }
            }
            if (this.listIndex > 2 && this.listIndex < this.list.length - 3) {
              $(".box").css({marginLeft: -165 * (this.listIndex - 2)});
              this.arrowRightType = true;
              this.arrowLeftType = true;
            } else if (this.listIndex >= this.list.length - 3) {
              this.arrowLeftType = true;
              this.arrowRightType = false;
              $(".box").css({marginLeft: -165 * (this.list.length - 5)});
            }
            this.getMyBillDateOrder();
            this.is_active = this.listIndex;
          }
        })
      },
      getMyBillDateOrder () {
        let obj_recorde = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          date: this.date,
          initTime: new Date().getTime()
        };
        let obj = {
          token: this.token,
          date: this.date,
          initTime: new Date().getTime()
        }
        this.$http.get('/bill/currentRecord', {params: obj_recorde}).then((res) => {
          if (Number(res.data.code) === 1000) {
            this.pageData.total = res.data.data.count;
            this.tableData = res.data.data.searchVos;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].monthRentMoney = allMethods.fmoney(this.tableData[i].monthRentMoney, 2);
              this.tableData[i].overdueMoney = allMethods.fmoney(this.tableData[i].overdueMoney, 2);
            }
            if (res.data.data.searchVos.length === 0) {
              this.noRecord = true;
            } else {
              this.noRecord = false;
            }
          } else if (Number(res.data.code) === 3001) {
            this.noRecord = true;
          } else if (Number(res.data.code) !== 7024) {
            this.obj.is_pop = true;
            this.obj.content = res.data.msg;
          }
        })
        this.$http.get('/bill/queryBillInfo', {params: obj}).then((res) => {
          if (Number(res.data.code) === 1000) {
            this.myBillInfo = res.data.data
            this.mainBillId = this.myBillInfo.countBillId
          }
        })
      },
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
        this.getMyBillDateOrder();
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
        this.$router.push('./');
      },
      datesStatus(item, index){
        this.is_active = index;
        this.date = item.billDate;
        this.getMyBillDateOrder();
        this.$router.push({
          path: '/myBillMore',
          query: {
            date: this.date,
            page: this.pageData.currentPage
          }
        })
      }
    },
    created(){
      this.currentDate = Mytools.millisecond(Mytools.currentTime());
      this.token = localStorage.getItem('xckz_mall');
//      var vm = this;
//      bus.$on('error',function () {
//        vm.obj.is_pop = false;
//      })
    },
    mounted(){
      this.getMyBill();
      let vm = this;
      let flag = true;
      $(".arrow_right").click(function () {
        if (flag) {
          flag = false;
          x++;
          vm.arrowLeftType = true;
          if (x > ListLength - 6) {
            x = ListLength - 5;
            vm.arrowRightType = false;
          }
          $(".box").animate({marginLeft: -165 * x}, function () {
            flag = true;
          });
        }
      });
      $(".arrow_left").click(function () {
        if (flag) {
          flag = false;
          x--;
          vm.arrowRightType = true;
          if (x < 1) {
            x = 0;
            vm.arrowLeftType = false;
          }
          $(".box").animate({marginLeft: -165 * x}, function () {
            flag = true;
          });
        }
      })
    },
    watch: {
      $route (val) {
        if (!val.query.date) {
          window.location.href = '/myBillMore';
        }
      }
    }
  }
</script>

<style scoped>
  .account_info_t{
    font-size: 18px !important;
  }
  .no_record {
    font-size: 20px;
    color: #CCCCCC;
    text-align: center;
    margin-top: 20px;
  }

  .el-main {
    overflow: hidden !important;
  }

  .fix-w{
    width: 220px;
    line-height: 1.5;
    padding-bottom: 2px;
    vertical-align: top;
    padding-right: 7px;
    padding-left: 7px;
  }
</style>
