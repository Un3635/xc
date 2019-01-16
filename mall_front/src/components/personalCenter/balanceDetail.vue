<template>
  <div class="balance-detail">
    <plugin-title :message="tit" :hasLine="true"></plugin-title>
    <div class="account-info">
      <div class="line">
        <div class="fl">
          <div class="text">账户余额</div>
          <h3>{{account_balance}} <span>元</span></h3>
        </div>
        <div class="fr">
          <span class="btn_success" @click="recharge">充值</span>
          <span class="btn_text" @click="withdrawCash">提现</span>
        </div>
      </div>
      <div class="line" v-if="debtAmount>0">
        <div class="fl">
          <div class="text">预充值待还</div>
          <h3>{{debtAmountPrice}} <span>元</span></h3>
        </div>
      </div>
    </div>
    <plugin-title :message="detail"></plugin-title>
    <div class="my-btn-style">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <ul>
          <li>
            <span class="calender-icon begin-icon"></span>
            <span class="calender-icon end-icon"></span>
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              start-placeholder="选择日期"
              end-placeholder="选择日期"
              range-separator="～"
              unlink-panels
              :clearable="false"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              @change="getChooseTime"
            >
            </el-date-picker>
            <el-button type="primary" class="inquire-btn" @click="dateInquire">查询</el-button>
          </li>
          <li>
            <div class="fl">最近:</div>
            <div class="fl date-tags" :class="{'active': tagIndex === 1}" @click="changeTagsIndex(1)">7天</div>
            <div class="fl date-tags" :class="{'active': tagIndex === 2}" @click="changeTagsIndex(2)">30天</div>
            <div class="fl date-tags" :class="{'active': tagIndex === 3}" @click="changeTagsIndex(3)">1年</div>
          </li>
          <li>
              收入: <span class="tag-style"><span class="tag-green">{{income}}</span>元</span> <br>
              支出: <span class="tag-style"><span class="tag-org">{{expend}}</span>元</span>
          </li>
        </ul>
      </el-form>
    </div>

    <div class="account-tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="流水号">
        </el-table-column>
        <el-table-column
          label="时间">
          <template slot-scope="scope">
            {{scope.row.createTime|date('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          label="名称|备注">
          <template slot-scope="scope">
            <!--{{scope.row.createUserName}}<br>-->
            {{scope.row.remark}}
          </template>
        </el-table-column>
        <el-table-column
          label="收支类型">
          <template slot-scope="scope">
            <span v-if="scope.row.operateType == 1" class="green">收入</span>
            <span v-else class="org">支出</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operateAmount "
          label="金额(元)">
          <template slot-scope="scope">
            <span v-if="scope.row.operateType == 1" class="green">{{scope.row.operateAmount}}</span>
            <span v-else class="org">{{scope.row.operateAmount}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="methods"-->
        <!--label="支付方式">-->
        <!--</el-table-column>-->
      </el-table>
      <div class="asset-pagination">
        <el-pagination
          v-if="tableData && tableData.length != 0"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout=" prev, pager, next, sizes,jumper"
          :page-sizes="[10, 100, 200, 300,400]"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize">
        </el-pagination>
      </div>
    </div>
    <!--充值弹框-->
    <transition name="fade">
      <div class="pay wh recharge_pop" v-if="popChange">
        <div class="wh_box">
          <div class="pop">
            <div class="charge">
              <div class="fl">充值</div>
              <div class="fr" @click="cancelCharge">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="frm">
              <span>充值金额</span>
              <input type="text" @focus="chargeFocus" class="ipt" @keyup="amount(ipt_value)" v-model.trim="ipt_value"
                     placeholder="请输入您要充值的金额">
              <span class="tip">{{charge_tip}}</span>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="btn_successT" @click="goToPay">去付款</span>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>

      </div>
    </transition>
    <!--提现-->
    <transition name="fade">
      <div class="wh" v-if="pop_withdraw">
        <div class="wh_box" style="width: 420px;">
          <div class="pop">
            <div class="charge">
              <div class="fl">提现</div>
              <div class="fr" @click="cancelChargeWithdraw">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="frm frm_withdraw">
              <div class="icon">
                <span><i class="el-icon-warning" style="color: #F7BA2A;font-size: 40px"></i></span>
              </div>
              <div class="des">
                <div class="des_one">为了您的资金安全暂不支持线上提现</div>
                <div class="des_two">提现请联系客服：400-836-5566</div>
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="btn_successT" @click="cancelChargeWithdraw">知道了</span>
            </div>
            <div style="clear: both"></div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import pluginTitle from "../plugin_title";
  import {allMethods} from '../../assets/js/config';
  import moment from 'moment'

  export default{
    data() {
      return {
        tit: '账户余额',
        detail: '账户明细',
        ruleForm: '',
        token: '',
        charge_tip: '',
        account_balance: '',
        ipt_value: '',
        income: '',
        expend: '',
        debtAmountPrice: '',
        page: {
          size: 10,
          currentPage: 1,
          total: 0
        },
        tagIndex: 1,
        dateValue: [],
        tableData: [],
        pop_charge: false,
        pop_withdraw: false,
        popChange: false,
        debtAmount: null,
      }
    },
    components: {pluginTitle},
    methods: {
      amount (val) {
        var regStrs = [
          ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
          ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
          ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
          ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
        ];
        for (var i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          this.ipt_value = val.replace(reg, regStrs[i][1]);
        }
        ;
        var vm = this;
        this.checkChage = false;
        if (vm.ipt_value == '') {
          $('.ipt').css('border-color', '#FF4949')
          this.charge_tip = "请输入您要充值的金额"
        } else if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(vm.ipt_value)) {
          $('.ipt').css('border-color', '#FF4949')
          this.charge_tip = "请输入正确的金额"
        } else if (vm.ipt_value == '0.00') {
          this.charge_tip = "请输入正确的金额";
        } else if (Number(vm.ipt_value) < 1) {
          this.charge_tip = "请输入金额不少于1";
        } else {
          $('.ipt').css('border-color', '#6ECC66');
          this.charge_tip = '';
          this.checkChage = true;
        }
      },
      cancelCharge(){
        this.popChange = false;
      },
      chargeFocus(){
        $('.ipt').css('border-color', '#6ECC66');
      },
      goToPay(){
        var vm = this;
        if (vm.ipt_value == '') {
          $('.ipt').css('border-color', '#FF4949');
          this.charge_tip = "请输入您要充值的金额"
        } else if (vm.checkChage) {
          vm.popChange = false;
          this.$router.push({path: '../pay', query: {chargeAmount: vm.ipt_value, type: 'charge'}});
        }
      },
      cancelChargeWithdraw(){
        this.pop_withdraw = false;
      },
      withdrawCash(){
        this.pop_withdraw = true;
      },
      getChooseTime(value) {
        if(value[0] === value[1]){
          value = [];
          this.$message({
            type: 'warning',
            message: '开始时间与结束时间不能相同，请重新选择'
          })
          return false;
        }
        return true;
      },
      recharge(){
        this.popChange = true;
        this.charge_tip = '';
        this.ipt_value = '';
        $('.ipt').css('border-color', '#EEEEEE');
      },
      handleSizeChange(size){
        this.page.size = size;
        this.getQueryAccountBalanceLog();
      },
      handleCurrentChange(size){
        this.page.currentPage = size;
        this.getQueryAccountBalanceLog();
      },
      changeTagsIndex(index){
        this.tagIndex = index;
        this.dateValue = [];
        //获取系统当前时间
        var nowdate = new Date();
        var y = nowdate.getFullYear();
        var yyear = y;
        var m = nowdate.getMonth()+1;
        var myear = m;
        var d = nowdate.getDate();
        var dyear = d;
        var endTime = y+'-'+m+'-'+d;

        //获取系统前一周的时间
        var oneweekdate = new Date(nowdate-7*24*3600*1000);
        var y = oneweekdate.getFullYear();
        var m = oneweekdate.getMonth()+1;
        var d = oneweekdate.getDate();
        var weekTime = y+'-'+m+'-'+d;

        //获取系统前一个月的时间
        nowdate.setMonth(nowdate.getMonth()-1);
        var y = nowdate.getFullYear();
        var m = nowdate.getMonth()+1;
        var d = nowdate.getDate();
        var monthTime = y+'-'+m+'-'+d;

        //获取系统前一年前的的时间
       var  yearTime = (Number(yyear)-1).toString()+'-'+myear+'-'+dyear;

        var beginTime = "";

        switch(index){
          case 1:beginTime = weekTime;break;
          case 2:beginTime = monthTime;break;
          case 3:beginTime = yearTime;break;
        }
        this.dateValue[0] = beginTime;
        this.dateValue[1] = endTime;
        this.page.currentPage = 1;
        this.getQueryAccountBalanceLog();
      },
      dateInquire(){
        if(!this.getChooseTime(this.dateValue)){
          return;
        }
        this.getQueryAccountBalanceLog();
      },
      getWeeksDatas(){
        //获取系统当前时间
        var nowdate = new Date();
        var y = nowdate.getFullYear();
        var yyear = y;
        var m = nowdate.getMonth()+1;
        var myear = m;
        var d = nowdate.getDate();
        var dyear = d;
        var endTime = y+'-'+m+'-'+d;

        //获取系统前一周的时间
        var oneweekdate = new Date(nowdate-7*24*3600*1000);
        var y = oneweekdate.getFullYear();
        var m = oneweekdate.getMonth()+1;
        var d = oneweekdate.getDate();
        var beginTime = y+'-'+m+'-'+d;
        this.dateValue[0] = beginTime;
        this.dateValue[1] = endTime;
        return this.dateValue;
      },
      getQueryAccountBalanceLog() {
        var arr = {
          currentPage: this.page.currentPage,
          pageSize: this.page.size,
          token: this.token,
          beginTime: this.dateValue[0],
          endTime: this.dateValue[1]
        };
        var vm = this;
        this.$http.post('/account/queryAccountBalanceLog', arr).then(res => {
          if (res.data.code == 1000 || res.data.code == 3001) {
            vm.tableData = res.data.data.balanceList;
            vm.page.total = res.data.count;
            if(res.data.data.income){
              vm.income = allMethods.fmoney(res.data.data.income, 2);
              vm.expend = allMethods.fmoney(res.data.data.expend, 2);
            }else{
              vm.income = 0;
              vm.expend = 0;
            }
          }
        })
      },
      getInfo(){
        var vm = this;
        var token = this.token;
        this.$http.get('/account/queryInfo', {
          params: {
            token: token,
            initTime: new Date().getTime()
          }
        }).then(function (data) {
          var res = data.data;
          var msg = res.data;
          if (Number(res.code) === 1000) {
            vm.account_balance = allMethods.fmoney(msg.balance, 2);
            if(isNaN(msg.debtAmount)){
              vm.debtAmount = '0';
            }else{
              vm.debtAmount = msg.debtAmount;
              vm.debtAmountPrice = allMethods.fmoney(msg.debtAmount, 2);
            }
          }
        })
      }
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.getWeeksDatas();
      this.getQueryAccountBalanceLog();
      this.getInfo()
    }
  }
</script>
<style scoped lang="scss">
  .asset-pagination{
    text-align: center;
    margin-top: 38px;
    float: inherit;
  }
  .wh {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .4);

  .wh_box {
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

  .pop {
    padding: 20px 0px 0px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  .charge {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;

  .fl {
    float: left;
  }

  .fr {
    float: right;
    width: 15px;
    height: 15px;
    cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  }
  }
  .frm {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
    position: relative;

  span {
    font-size: 14px;
    color: #333333;
  }

  .ipt {
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    margin-left: 18px;
    width: 306px;
    height: 35px;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  &::-webkit-input-placeholder {
    font-size: 14px;
    color: #CCCCCC;
  }

  &:hover {
    border: 1px solid #DDDDDD;
  }

  &:active {
    border: 1px solid #6ECC66;
  }

  }
  .tip {
    position: absolute;
    top: 45px;
    left: 100px;
    font-size: 12px;
    color: #FF4949;

  }

  }
  .frm_withdraw {

  .icon {
    float: left;
  }

  .des {
    float: left;
    margin-left: 15px;

  .des_one {
    font-size: 14px;
    color: #333333;
  }

  .des_two {
    font-size: 14px;
    color: #999999;
    margin-top: 10px;
  }

  }
  }
  .line {
    margin-top: 46px;
  }

  .subm {
    padding-left: 20px;
    padding-right: 20px;

  /*height: 66px;*/
  /*display: block;*/
  span {
    float: right;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  }
  }
  }
  }
</style>
