<template>

  <div>

    <div class="accoun_info_box">

      <plugin_title :message="parentMsg"></plugin_title>
      <div class="account_balance">
        <span class="account_balance_text">账户余额</span>
        <span class="balance">
          {{account_balance}}
        </span>
        <span class="yen">元</span>
        <span class="btn_success" @click="recharge">充值</span>
        <span class="btn_text" @click="withdrawCash">提现</span>
        <div class="on_lease">
          <div class="on_lease_device" @click="onLeaseDevice" style="cursor: pointer;">在租设备</div>
          <div class="how_many"><span class="num" style="font-weight: bold">{{rentNum}}</span>台</div>
        </div>
      </div>

      <div class="my_data">
        <div class="account_info_t">
          <span>我的数据</span>

        </div>
      </div>
      <div class="my_data_box">
        <el-row type="flex" class="row-bg" justify="space-between" style="background-color: #FAFAFA;">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="this_month"><span>本月待付款(元)</span></div>
              <div class="num"><span>{{pendingPaymentMoney}}</span></div>
              <span class="btn_success" @click="goToPayoff"
                    v-if="this.pendingPaymentMoney!=0||this.pendingPaymentMoney!=0.00">去支付</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <div class="this_month"><span>可用免押金额度(元)</span></div>
              <div class="num"><span>{{usableQuota}}</span></div>
              <span class="btn_success" style="width: auto;padding-left: 15px;padding-right: 15px;" @click="freeDeposit"
                    v-if="this.next_flag==0">
              申请免押金
            </span>
              <span class="my_apply" v-if="this.next_flag==1">
                  申请中
              </span>
              <span class="btn_text" @click="promoteQuota" v-if="this.next_flag!=0&&this.next_flag!=1">
              提升额度
            </span>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="this_month"><span>免押金总额度(元)</span></div>
              <div class="num"><span>{{totalQuota}}</span></div>

              <span class="btn_text" style="width: auto; padding-left: 15px;padding-right: 15px;" @click="freeDeposit"
                    v-if="this.next_flag==0">
              申请免押金
            </span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="my_data_box my_data_box_second">
        <el-row type="flex" class="row-bg" justify="space-between" style="background-color: #FAFAFA;">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="this_month"><span>冻结押金(元)</span></div>
              <div class="num"><span>{{freezeQuota}}</span></div>
              <span class="btn_text" @click="onLeaseDevice">详情</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <div class="this_month"><span>我的还款日(每月)</span></div>
              <div class="num"><span>{{repaymentDay}}日</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" v-if="Number(debtAmount) > 0">
              <div class="this_month"><span>预充值待还金额(元)</span></div>
              <div class="num"><span>{{debtAmountPrice}}</span></div>
              <span class="btn_text" @click="$router.push('/balanceDetail')">详情</span>
            </div>
          </el-col>
        </el-row>
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

    <!--提现弹框-->
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
              <span class="btn_successT" @click="iKnow">知道了</span>
            </div>
            <div style="clear: both"></div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import plugin_title from '../plugin_title'
  import pop from './x-pop'
  export default {
    components: {
      plugin_title: plugin_title,
      pop: pop,
    },
    name: 'accountInfo',
    data(){
      return {
        next_flag: '',
        obj: {
          title: '账号信息',
          content: '',
          is_pop: false
        },
        id: '',
        account_balance: '',
        freezeQuota: '',
        pendingPaymentMoney: '',
        rentNum: '',
        repaymentDay: '',
        totalQuota: '',
        usableQuota: '',
        token: '',
        parentMsg: '账号信息',
        charge_tip: '',
        ipt_value: '',
        debtAmountPrice: '',
        checkChage: false,
        pop_withdraw: false,
        pop_charge: false,
        debtAmount: null,
        popChange: false
      }
    },
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
      onLeaseDevice(){
        this.$router.push({path: './myOrder', query: {from: 'accountinfo'}});
      },
      goToPayoff(){
//            去支付
        var vm = this;
        this.$router.push({path: '../pay', query: {type: 'repay', countBillId: vm.id}});
      },
      promoteQuota(){
//            跳转到提升额度页面
        this.$router.push({path: './freeDeposit', query: {to: 'promoteQuota'}});
//        this.sts=true;
      },
      freeDeposit(){
        var that = this;
        that.$router.push('./freeDeposit');
      },
//      chargeInput(){
//        var vm = this;
//        this.checkChage = false;
//        if (vm.ipt_value == '') {
//          $('.ipt').css('border-color', '#FF4949')
//          this.charge_tip = "请输入您要充值的金额"
//        } else if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(vm.ipt_value)) {
//          $('.ipt').css('border-color', '#FF4949')
//          this.charge_tip = "请输入正确的金额"
//        } else {
//          $('.ipt').css('border-color', '#6ECC66');
//          this.charge_tip = '';
//          this.checkChage = true;
//        }
//      },
      cancelChargeWithdraw(){
        this.pop_withdraw = false;
      },
      iKnow(){
        this.pop_withdraw = false;
      },
      withdrawCash(){
        this.pop_withdraw = true;
      },
      recharge(){
        this.popChange = true;
        this.charge_tip = '';
        this.ipt_value = '';
        $('.ipt').css('border-color', '#EEEEEE');
      },
      getInfo(){
        var that = this;
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
            that.account_balance = allMethods.fmoney(msg.balance, 2);
            that.freezeQuota = allMethods.fmoney(msg.freezeQuota, 2);
            that.pendingPaymentMoney = allMethods.fmoney(msg.pendingPaymentMoney, 2);
            that.rentNum = msg.rentNum;
            that.repaymentDay = msg.repaymentDay;
            that.totalQuota = allMethods.fmoney(msg.totalQuota, 2);
            that.usableQuota = allMethods.fmoney(msg.usableQuota, 2);
            that.next_flag = msg.flag;
            that.id = msg.countBillRecordId;
            if(isNaN(msg.debtAmount)){
              that.debtAmount = '0';
            }else{
              that.debtAmount = msg.debtAmount;
              that.debtAmountPrice = allMethods.fmoney(msg.debtAmount, 2);
            }
          } else if (Number(res.code) !== 7024) {
            that.obj.is_pop = true;
            that.obj.content = res.msg;
          }
        })
      }
    },
    created(){
      this.xckz_mall_status = localStorage.getItem('xckz_mall_status');
      this.token = localStorage.getItem('xckz_mall');
      this.getInfo();
      var vm = this;
      bus.$on('error', function () {
        vm.obj.is_pop = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  * {
    font-family: 'microsoft Yahei';
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


</style>
