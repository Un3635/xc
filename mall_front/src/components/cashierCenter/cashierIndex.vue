<template>
  <div class="cashier-page">
    <div class="cashier-main">
      <div class="cashier-header">
        <div class="cashier-header-txt">
          <span>{{type}}</span>
          <span class="paid-mark">
          <span>￥</span>
          {{formatMoney}}
        </span>
        </div>
      </div>
      <div class="cashier-content">
        <div class="paid-way-txt">选择支付方式</div>
        <div class="paid-way-note">
          <ul class="clearfix" v-if="!isChargeCurrent">
            <div @click="targetBalance" style="cursor:pointer">
              <li class="paid-way-select">
                <div :class="{'selected': isBalanceEnough, 'unselected': !isBalanceEnough}"></div>
              </li>
              <li
                :class="{'paid-way-chosen': isBalanceEnough, 'paid-way-chosen-un': !isBalanceEnough}">
                余额支付
              </li>
              <li :class="{'paid-way-balance': isBalanceEnough, 'paid-way-balance-un': !isBalanceEnough}">（可用余额
                ￥{{formatBalance}}）
              </li>
            </div>
            <li class="paid-way-active" @click="fleshBalance">刷新</li>
            <li class="paid-way-active" @click="charge" v-if="!isBalanceEnough">立即充值</li>
          </ul>
        </div>
        <div class="line-decoration" v-if="!isChargeCurrent"></div>
        <div class="paid-ways clearfix">
          <ul>
            <li>
              <a href="javascript:void(0)" @click="chosenPayWay(0)">
                <div :class="{isChosen: payWays[0] === payWay || isAlipayDefault}">
                  <img src="../../assets/images/Alipay.png">
                  <span>支付宝</span>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="chosenPayWay(1)">
                <div :class="{isChosen: payWays[1] === payWay}">
                  <img src="../../assets/images/wechatPay.png">
                  <span>微信</span>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="chosenPayWay(2)">
                <div :class="{isChosen: payWays[2] === payWay}">
                  <img src="../../assets/images/public_transfer.png">
                  <span>对公转账</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="public-transfer" v-if="isPublicTransfer">
      <div class="public-transfer-content">
        <div>
          <div class="company-account">
            <span class="account-title">1.打款至小虫快租指定收款账户：</span>
            <div class="company-account-content">
              <div>
                <p>
                  <span>开户名称</span>
                  <span>上海小虫智能科技有限公司</span>
                </p>
                <p>
                  <span>开户银行</span>
                  <span>平安银行股份银行有限公司 上海新天地支行</span>
                </p>
                <p>
                  <span>汇款账号</span>
                  <span>1500 0088 6073 48</span>
                </p>
                <p>
                  <span>汇款金额</span>
                  <span>{{formatMoney}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="user_account">
            <span class="account-title">2. 提交汇款信息：</span>
            <div class="user-account-content">
              <div>
                <span class="user-account-txt">汇款人姓名/公司名称：</span>
                <input type="text" placeholder="请填写汇款人姓名或汇款人公司名称" v-model.trim="remitter" @input="changeRemitter"
                       class="input-remitter">
                <br>
                <span class="tip-remitter">{{tipRemitter}}</span>
              </div>
              <div>
                <span class="user-account-txt">汇款银行账号：</span>
                <input type="text" placeholder="请填写汇款银行账号" maxlength="23" v-model.trim="bankAccount"
                       @input="changeAccount()" class="input-account" @keyup="getBank(bankAccount)">
                <br>
                <span class="tip-account">{{tipAccount}}</span>
              </div>
              <div>
                <span class="user-account-txt">开户银行名称：</span>
                <input type="text" placeholder="请填写开户银行名称" v-model.trim="bankName" @input="changeName"
                       class="input-name">
                <br>
                <span class="tip-name">{{tipName}}</span>
              </div>
              <div>
                <span class="user-account-txt">汇款金额：</span>
                <span style="text-align:left">{{formatMoney}}</span>
              </div>
              <div class="block">
                <span class="demonstration user-account-txt">汇款时间：</span>
                <span class="block-input">
                  <el-date-picker
                    v-model="dateValue"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    :clearable=false
                    :editable="false">
                  </el-date-picker>
                </span>
              </div>
            </div>
          </div>
          <div class="paid_check">
            <span class="account-title">
              3. 汇款核实：
            </span>
            <p>
              提交汇款信息后，
              <span v-if="typeVal !== 'charge'">
                您可以在
                <router-link :to="toProgress">
                  <span style="color:#6ECC66">
                    {{progress}}
                  </span>
                </router-link>
              中查看汇款处理进度，
              </span>
              若有疑问请联系您的商务经理。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="cashier-footer">
      <div v-if="!isPublicTransfer" class="cashier-footer-content">
        <!--<el-button type="primary" :loading="loading" @click="payCharge()" class="el-btn-paid" v-if="isBalanceEnough && typeVal !== 'charge'">立即支付</el-button>-->
        <a @click="ifAlipay">
          <el-button type="primary" :loading="loading" @click="payCharge()" class="el-btn-paid">立即支付</el-button>
        </a>
      </div>
      <div v-if="isPublicTransfer" class="cashier-footer-content">
        <span class="transfer-note">请谨慎填写汇款信息，提交后不可修改</span>
        <!--<span class="paid-btn" @click="payCharge()">-->
        <!--提交汇款信息-->
        <!--</span>-->
        <el-button type="primary" :loading="loading" @click="payCharge()" class="el-btn-submit">提交汇款信息</el-button>
      </div>
    </div>
    <!--充值弹框-->
    <div class="wh" v-if="isCharge">
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
            <span class="charge-input" style="width:306px;height:35px;display:inline-block;">
              <input type="text" class="ipt" v-model.trim="chargeValue" placeholder="请输入您要充值的金额"
                     @keyup="amount(chargeValue)">
            </span>
            <span class="tip">{{chargeTip}}</span>
          </div>
          <div class="line"></div>
          <div class="subm">
            <span class="charge-btn btn_successT" @click="goToPay">去付款</span>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
    <!--提示弹框-->
    <div class="wh" v-if="isNote">
      <div class="wh_box" style="width: 420px;">
        <div class="pop">
          <div class="charge">
            <div class="fl">提示</div>
            <!--<div class="fr" @click="cancelNote">-->
            <!--<img src="../../assets/images/icon_close.png" alt="">-->
            <!--</div>-->
          </div>
          <div style="clear: both"></div>
          <div class="frm frm_withdraw">
            <div class="icon">
              <span><i class="el-icon-warning" style="color: #F7BA2A;font-size: 40px"></i></span>
            </div>
            <div class="des">
              <div class="des_one">请您在新打开的页面上完成付款</div>
              <div class="des_two">
                付款完成前请不要关闭此窗口，完成付款后请根据您的情况点击下面的按钮。
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="line"></div>
          <div class="subm">
            <span class="btn_successT" @click="paidReady('other')">选择其他付款方式</span>
            <span class="btn_textT" @click="paidReady('paid')">已完成付款</span>
          </div>
          <div style="clear: both"></div>
          <div class="note-tip">支付若有问题，请联系客服</div>
        </div>
      </div>
    </div>
    <!--重复提交弹框-->
    <div class="m_modal" id="orderYet">
      <div class="modal" id="orderYetModal" style="width: 420px;height: 192px;">
        <div class="head">
          <h1 style="background-color: #fff;">提示</h1>
          <!--<div class="close_con" @click="closeModal('fixedModal,modalAnmation')">-->
          <!--<img src="../../assets/images/icon_close.png" alt="">-->
          <!--</div>-->
        </div>
        <div class="body">
          <div class="newHint">
            <span><img src="../../assets/images/icon_tishi.png" alt=""></span>
            <div class="errorHintTexts">{{errorText}}</div>
          </div>
        </div>
        <div class="footer" style="text-align: right;padding-bottom: 0;padding-top: 0;">
          <el-button style="width: 118px;margin-top: 12px;" @click="gotoMyHome">去首页</el-button>
          <el-button type="success" style="width: 118px;margin-top: 12px;margin-right: 20px;" @click="gotoMorderList">
            <span v-if="redirect === 'myBillMore'">查看我的账单</span>
            <span v-if="redirect === 'myOrder'">查看我的订单</span>
          </el-button>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="25%"
      @close="handleClose">
      <div style="text-align:center;">
        <p style="font-size:20px;color:#000000">请使用微信扫描二维码进行支付</p>
        <img :src="QRCode" alt="" style="width:160px;height: 160px;margin:20px;">
        <p style="font-size:14px;color:#000000;white-space:nowrap;padding:10px;margin-top:-26px;">请在两小时内完成支付</p>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {allMethods} from '../../assets/js/config'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import QRCode from "qrcode";
  import qs from "qs";

  export default {
    components: {ElButton},
    name: 'cashierIndex',
    data() {
      return {
        money: 0,
        dateValue: new Date(),
        bankAccount: '',
        bankName: '',
        remitter: '',
        tipRemitter: '',
        tipAccount: '',
        tipName: '',
        checkRemitter: false,
        checkAccount: false,
        checkName: false,
        isCharge: false,
        chargeValue: '',
        checkChage: false,
        chargeTip: '',
        payWays: ['ALIPAY', 'WECHAT', 'CORPORATE', 'BALANCE'],
        payWay: '',
        isNote: false,
        type: '充值金额',
        typeVal: 'charge',
        token: '',
        balance: 0,
        isChargeCurrent: true,
        isBalanceEnough: '',
        isAlipayDefault: false,
        isPublicTransfer: false,
        billId: '',
        countBillId: '',
        orderNo: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        prevPath: '',
        beforeIndex: '',
        beforeDate: '',
        loading: false,
        errorText: '',
        redirect: '',
        timer: '',
        payChannel: '',
        alipayOrderNo: '',
        temp: '',
        dialogVisible: false,
        QRCode: '',
        wechatOrderNo: '',
      }
    },
    computed: {
      formatMoney() {
        return allMethods.fmoney(this.money);
      },
      formatBalance() {
        return allMethods.fmoney(this.balance);
      },
      toProgress() {
        if (this.typeVal === 'orderPay') {
          return '/myOrder';
        } else if (this.typeVal === 'repay') {
          return 'myBillMore';
        }
      },
      progress() {
        if (this.typeVal === 'orderPay') {
          return '我的订单';
        } else if (this.typeVal === 'repay') {
          return '我的账单';
        }
      }
    },
    methods: {
      handleClose() {
        let vm = this;
        let data = {payChannel: vm.payChannel, orderNo: vm.wechatOrderNo, t: new Date().getTime()};
        clearTimeout(vm.timer);
        vm.$http.get('/pay/orderSuccess', {params: data}).then(function (result) {
          if (Number(result.data.code) === 1000) {
            if (result.data.data === true) {
              vm.toTargetPage(vm);
            }
          }
        });
      },
      ifAlipay() {
        if(this.payWay === 'ALIPAY') {
          this.temp = window.open();
        }
      },
      gotoMyHome() {
        this.errorText = '';
        $("#orderYetModal").slideUp(120);
        setTimeout(function () {
          $("#orderYet").hide();
        }, 220);
        this.$router.push('/')
      },
      gotoMorderList() {
        this.errorText = '';
        $("#orderYetModal").slideUp(120)
        setTimeout(function () {
          $("#orderYet").hide();
        }, 220);
        if (this.redirect === 'myBillMore') {
          this.goToBill();
        } else if (this.redirect === 'myOrder') {
          this.$router.push({path: '/myOrder', query: {from: 'pay'}});
        }
      },
      getBank(val) {
        this.bankAccount = val.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      },
      //监听对公转账的输入框
      changeRemitter() {
        if (this.remitter === '') {
          $('.input-remitter').css('border-color', '#FF4949');
          this.tipRemitter = '请输入汇款人或公司';
        } else {
          $('.input-remitter').css('border-color', '#6ECC66');
          this.tipRemitter = '';
          this.checkRemitter = true;
        }
      },
      changeAccount() {
        if (this.bankAccount === '') {
          $('.input-account').css('border-color', '#FF4949');
          this.tipAccount = '请输入银行账号';
        } else {
          $('.input-account').css('border-color', '#6ECC66');
          this.tipAccount = '';
          this.checkAccount = true;
        }
      },
      changeName() {
        if (this.bankName === '') {
          $('.input-name').css('border-color', '#FF4949');
          this.tipName = '请输入银行名称';
        } else {
          $('.input-name').css('border-color', '#6ECC66');
          this.tipName = '';
          this.checkName = true;
        }
      },
      //刷新余额
      fleshBalance() {
        var vm = this;
        this.$http.get('/pay/accountBalance', {params: {token: this.token}}).then(function (res) {
          var data = res.data;
          if (Number(data.code) === 1000) {
            vm.balance = data.data;

            if (vm.balance < vm.money || vm.payChannel === 'RECHARGE') {
              vm.isBalanceEnough = false;
              vm.isAlipayDefault = true;
              vm.payWay = 'ALIPAY';
            } else {
              vm.isBalanceEnough = true;
              vm.payWay = 'BALANCE';
              vm.isAlipayDefault = false;
            }
          }
        })
      },
      //充值弹框
      charge() {
        this.isCharge = true;
      },
      cancelCharge() {
        this.isCharge = false;
        this.fleshBalance();
      },
      amount(val) {
        var regStrs = [
          ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
          ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
          ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
          ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
        ];
        for (var i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          this.chargeValue = val.replace(reg, regStrs[i][1]);
        }
        this.checkChage = false;
        if (this.chargeValue === '') {
          $('.ipt').css('border-color', '#FF4949');
          this.chargeTip = "请输入您要充值的金额";
        } else if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(this.chargeValue)) {
          $('.ipt').css('border-color', '#FF4949');
          this.chargeTip = "请输入正确的金额";
        } else if (this.chargeValue === '0.00') {
          this.chargeTip = "请输入正确的金额";
        } else if (Number(this.chargeValue) < 1) {
          this.chargeTip = "请输入金额不少于1";
        } else {
          $('.ipt').css('border-color', '#6ECC66');
          this.chargeTip = '';
          this.checkChage = true;
        }
      },
      goToPay() {
        var txt = $('.charge-btn').text();
        if (txt === '已付款') {
          //todo
          //请求后端是否充值成功，如果是对公转账，无法及时显示是否已经转账充值成功
          this.fleshBalance();
          this.isCharge = false;
          this.isPublicTransfer = false;
        } else if (this.chargeValue === '') {
          $('.ipt').css('border-color', '#FF4949');
          this.chargeTip = "请输入您要充值的金额";
        } else if (this.checkChage) {
          //将按钮的去付款改成已付款，文本框改成文本
          $('.charge-btn').text('已付款');
          var m = allMethods.fmoney(this.chargeValue);
          $('.charge-input').html(m + '元');
          //新开一个充值页面,type: 'payCharge'说明从收银中心充值，type:charge从个人中心充值
          var routeData = this.$router.resolve({
            path: '/pay',
            query: {chargeAmount: this.chargeValue, type: 'charge', prevPath: 'pay'}
          });
          window.open(routeData.href, '_blank');
        }
      },
      //提示弹框
      cancelNote() {
        this.isNote = false;
      },
      paidReady(flag) {
        this.isNote = false;
        let data = {payChannel: this.payChannel, orderNo: this.alipayOrderNo, t: new Date().getTime()};
        let vm = this;
        this.$http.get('/pay/orderSuccess', {params: data}).then(function (result) {
          if (Number(result.data.code) === 1000) {
            if (result.data.data === true) {
              //如果已支付，但用户点击了选择其他付款方式，提示用户已付过款
              if(flag === 'other'){
                allMethods.alertTip(vm, '已支付成功', 'success', '', function () {
                  //支付成功，跳转到相应页面
                  vm.toTargetPage(vm);
                });
              }else if(flag === 'paid'){
                vm.toTargetPage(vm);
              }
            } else if (result.data.data === false) {
              if(flag === 'paid'){
                allMethods.alertTip(vm, '支付失败');
              }
            }
          }
        });
      },
      //立即支付
      payCharge() {
        var vm = this;
        //判断是否已经选择了支付方式
        if (!this.payWay) {
          allMethods.alertTip(vm, '请选择支付方式');
          return;
        }

        var dataObj = {token: this.token, payType: this.payWay};
        if (this.payWay === 'CORPORATE') {
          if (this.remitter === '' || this.bankAccount === '' || this.bankName === '') {
            allMethods.alertTip(vm, '请填写完整信息');
            return;
          }
          dataObj.name = this.remitter;
          dataObj.account = this.bankAccount.split(' ').join('');
          dataObj.bankName = this.bankName;
          dataObj.payTime = this.dateValue.toISOString().slice(0, 10);
        } else if (this.payWay === 'ALIPAY') {
          //是否支付宝支付,需提供支付后页面跳转url
          this.isNote = true;
        }

        //分别调用不同接口
        this.loading = true;
        //充值
        if (this.typeVal === 'charge') {
          this.handleCharge(dataObj);
        }
        //订单支付
        if (this.typeVal === 'orderPay') {
          this.handleOrderPay(dataObj);
        }
        //还款
        if (this.typeVal === 'repay') {
          this.handleRepay(dataObj);
        }
      },
      handleRepay(dataObj) {
        let vm = this;
        dataObj.countBillId = this.countBillId;
        dataObj.billId = this.billId;
        this.$http.post('/pay/billPay', dataObj).then(function (res) {
          vm.loading = false;
          if (Number(res.data.code) === 1000) {
            if (vm.payWay === 'CORPORATE') {
              allMethods.alertTip(vm, '汇款信息提交成功', 'success', '', function () {
                vm.isPublicTransfer = false;
                vm.payWay = '';
                vm.goToBill();
              });
            } else if (vm.payWay === 'BALANCE') {
              allMethods.alertTip(vm, '该账单还款成功', 'success', '', function () {
                vm.goToBill();
              });
            } else if (vm.payWay === 'WECHAT') {
              vm.handleWechat(vm, res);
            } else if (vm.payWay === 'ALIPAY') {
              vm.handleAlipay(vm, res);
            }
          } else if (Number(res.data.code) === 2125) {
            allMethods.alertTip(vm, res.data.msg, 'info', '', function () {
              vm.goToBill();
            });
          } else {
            allMethods.alertTip(vm, '系统繁忙，请稍后重试');
          }
        })

      },
      handleOrderPay(dataObj) {
        let vm = this;
        dataObj.orderNo = this.orderNo;
        this.$http.post('/pay/orderPay', dataObj).then(function (res) {
          vm.loading = false;
          if (Number(res.data.code) === 1000) {
            if (vm.payWay === 'CORPORATE') {
              allMethods.alertTip(vm, '汇款信息提交成功', 'success', '', function () {
                vm.isPublicTransfer = false;
                vm.payWay = '';
                //对公转账提交成功后跳转回个人中心我的订单待支付
                vm.$router.push({path: '/myOrder'});
              });
            } else if (vm.payWay === 'BALANCE') {
              allMethods.alertTip(vm, '该订单支付成功', 'success', '', function () {
                //成功跳转回个人中心我的订单待发货
                vm.$router.push({path: '/myOrder', query: {from: 'pay'}});
              });
            } else if (vm.payWay === 'WECHAT') {
              vm.handleWechat(vm, res);
            } else if (vm.payWay === 'ALIPAY') {
              vm.handleAlipay(vm, res);
            }
          } else {
            allMethods.alertTip(vm, '系统繁忙，请稍后重试', 'warning', '', function () {
              //失败跳转回个人中心我的订单待支付
              vm.$router.push({path: '/myOrder'});
            });
          }
        })
      },
      handleCharge(dataObj) {
        let vm = this;
        dataObj.amount = this.money;
        this.$http.post('/pay/recharge', dataObj).then(function (res) {
          vm.loading = false;
          if (Number(res.data.code) === 1000) {
            if (vm.payWay === 'CORPORATE') {
              allMethods.alertTip(vm, '汇款信息提交成功', 'success', '', function () {
                vm.isPublicTransfer = false;
                vm.payWay = '';
                if (vm.prevPath === 'pay') {
                  //在收银中心点击充值
                  //停留在本页面，让用户继续订单支付或还款
                  vm.$router.push({
                    name: 'result',
                    params: {msg: 'transfer', code: 1000, data: '转账结果正在确认中，若有疑问请联系您的商务经理'}
                  });
                } else {
                  //跳转回个人中心的充值页面
                  vm.$router.push({path: '/i'});
                }
              });
            } else if (vm.payWay === 'WECHAT') {
              vm.handleWechat(vm, res);
            } else if (vm.payWay === 'ALIPAY') {
              vm.handleAlipay(vm, res);
            }
          } else {
            allMethods.alertTip(vm, '系统繁忙，请稍后重试');
          }
        });
      },
      handleAlipay(vm, res) {
        let codeMsg = res.data.data;
        let codeUrl = codeMsg.message;
        vm.alipayOrderNo = codeMsg.orderNo;
        let alipayHtml = $(codeUrl);
        alipayHtml[0] = $(alipayHtml[0]).prop('target', '_self').get(0);
        localStorage.setItem('ali_h', alipayHtml[0].outerHTML);
        vm.temp.location = '/alipay';
        // let alipayHtml = $(codeUrl);
        // alipayHtml[0] = $(alipayHtml[0]).prop('target', '_blank').get(0);
        // $('body').prepend(alipayHtml);
      },
      handleWechat(vm, res) {
        let codeMsg = res.data.data;
        let codeUrl = codeMsg.message;
        vm.wechatOrderNo = codeMsg.orderNo;
        let data = {payChannel: vm.payChannel, orderNo: vm.wechatOrderNo};
        QRCode.toDataURL(codeUrl)
          .then(url => {
            vm.QRCode = url;
            vm.dialogVisible = true;
          })
          .catch(err => {
          });

        //轮询是否支付成功
        var getOrderSuccess = () => {
          vm.$http.get('/pay/orderSuccess', {params: Object.assign({}, data, {t: new Date().getTime()})}).then(function (result) {
            if (Number(result.data.code) === 1000) {
              if (result.data.data === true) {
                clearTimeout(vm.timer);
                //支付成功，跳转到相应页面
                vm.dialogVisible = false;
                vm.toTargetPage(vm);
              } else if (result.data.data === false) {
                //还未支付，继续轮询
                vm.timer = setTimeout(getOrderSuccess, 500);
              }
            }
          });
        }
        vm.timer = setTimeout(getOrderSuccess, 500);
      },

      toTargetPage(vm) {
        if (vm.typeVal === 'orderPay') {
          //成功跳转回个人中心我的订单待发货
          vm.$router.push({path: '/myOrder', query: {from: 'pay'}});
        } else if (vm.typeVal === 'charge') {
          if (vm.prevPath === 'pay') {
            //在收银中心点击充值
            //停留在本页面，让用户继续订单支付或还款
            vm.$router.push({name: 'result', params: {msg: 'charge', code: 1000, data: ''}});
          } else {
            //跳转回个人中心的充值页面
            vm.$router.push({path: '/i'});
          }
        } else if (vm.typeVal === 'repay') {
          vm.goToBill();
        }
      },
      goToBill() {
        if ((this.beforeIndex || this.beforeIndex === 0) && this.beforeDate) {
          //跳转回个人中心的账单页面
          this.$router.push({path: '/myBillMore', query: {beforeIndex: this.beforeIndex, beforeDate: this.beforeDate}});
        } else {
          //跳转回个人中心的账号信息
          this.$router.push({path: '/i'});
        }
      },
      chosenPayWay(val) {
        this.payWay = this.payWays[val];
        this.isAlipayDefault = false;
        this.isBalanceEnough = false;
        if (val === 2) {
          this.isPublicTransfer = true;
        } else {
          this.isPublicTransfer = false;
        }
      },
      compareBalanceWithPay() {
        var vm = this;
        vm.$http.get('/pay/accountBalance', {params: {token: vm.token}}).then(function (res) {
          var val = res.data;
          if (Number(val.code) === 1000) {
            vm.balance = val.data;
            // vm.balance = 1200000000;
            if (vm.balance < vm.money) {
              vm.isBalanceEnough = false;
              vm.chargeValue = vm.money - vm.balance;
              vm.checkChage = true;
              vm.isAlipayDefault = true;
              vm.payWay = 'ALIPAY';
            } else {
              vm.isBalanceEnough = true;
              vm.payWay = 'BALANCE';
              vm.chargeValue = '';
              vm.checkChage = false;
              vm.isAlipayDefault = false;
            }
          }
        })
      },
      getOrderPay() {
        var vm = this;
        this.$http.get('/pay/orderAccount', {
          params: {
            orderNo: String(this.orderNo),
            token: this.token
          }
        }).then(function (res) {
          var data = res.data;
          if (Number(data.code) === 1000) {
            vm.money = data.data;
            vm.compareBalanceWithPay();
          } else if (Number(data.code) === 2125) {
            //提示用户支付正在确认中
            vm.errorText = '已处于支付确认中或成功状态，请勿重复操作';
            vm.redirect = 'myOrder';
            $("#orderYet").show();
            setTimeout(function () {
              $("#orderYetModal").slideDown(120)
            }, 120);
          }
        })
      },
      getRepay() {
        var dataObj = {countBillId: this.countBillId, billId: this.billId, token: this.token};
        var vm = this;
        this.$http.get('pay/billAccount', {params: dataObj}).then(function (res) {
          var data = res.data;
          if (Number(data.code) === 1000) {
            vm.money = data.data;
            vm.compareBalanceWithPay();
          } else if (Number(data.code) === 2125) {
            //提示用户支付正在确认中
            vm.errorText = '已处于支付确认中或成功状态，请勿重复操作';
            vm.redirect = 'myBillMore';
            $("#orderYet").show();
            setTimeout(function () {
              $("#orderYetModal").slideDown(120)
            }, 120);
          }
        })
      },
      getType(typeValue, chargeAmount) {
        switch (typeValue) {
          case 'orderPay':
            this.type = '应付总金额';
            this.isChargeCurrent = false;
            this.payChannel = 'ORDER';
            this.getOrderPay();
            break;
          case 'repay':
            this.type = '应付总金额';
            this.isChargeCurrent = false;
            this.payChannel = 'BILL';
            this.getRepay();
            break;
          case 'charge':
            this.type = '充值金额';
            this.isChargeCurrent = true;//如果是充值金额，就不需要显示剩余余额一栏
            this.payChannel = 'RECHARGE';
            this.money = chargeAmount;
            break;
        }
      },
      //点击余额支付
      targetBalance() {
        this.isPublicTransfer = false;
        this.payWay = '';
        if (this.balance < this.money) {
          this.isBalanceEnough = false;
          this.isAlipayDefault = true;
          this.payWay = 'ALIPAY';
        } else {
          this.isBalanceEnough = true;
          this.payWay = 'BALANCE';
          this.isAlipayDefault = false;
        }
      }
    },
    created() {
      this.payWay = this.payWays[0];
      this.token = localStorage.getItem('xckz_mall');
      var query = this.$route.query;
      this.typeVal = query.type ? query.type : 'charge';
      this.billId = query.billId ? query.billId : '';
      this.countBillId = query.countBillId ? query.countBillId : '';
      this.orderNo = query.id ? query.id : '';
      var chargeAmount = query.chargeAmount ? query.chargeAmount : 0;
      this.prevPath = query.prevPath ? query.prevPath : '';
      this.beforeIndex = query.beforeIndex || query.beforeIndex === 0 ? query.beforeIndex : '';
      this.beforeDate = query.beforeDate ? query.beforeDate : '';
      this.getType(this.typeVal, chargeAmount);
      this.fleshBalance();
    },
  }
</script>

<style scoped lang="scss">
  .cashier-page {
    margin: 29px auto 0;
    width: 1200px;
    font-size: 14px;
    .cashier-main {
      width: 100%;
      height: 326px;
    }
    .cashier-header {
      border: 1px solid #EDEDED;
      width: 100%;
      height: 84px;
      background: #EDEDED;
      .cashier-header-txt {
        margin-top: 21px;
        margin-left: 49px;
        span:first-child {
          display: inline-block;
          font-size: 18px;
          color: #585858;
        }
        .paid-mark {
          font-size: 30px;
          color: #FD7220;
          margin-left: 95px;
          span {
            color: #FD7220;
            font-size: 25px;
          }
        }
      }
    }
    .cashier-content {
      width: 100%;
      height: 241.9px;
      border: 1px solid #ffffff;
      background: #ffffff;
      position: relative;
      .paid-way-txt {
        width: 115px;
        height: 24px;
        font-size: 18px;
        color: #585858;
        font-weight: bold;
        display: inline-block;
        position: absolute;
        top: 29.9px;
        left: 49px;
      }
      .paid-way-note {
        margin-top: 29.9px;
        margin-left: 49px;
        ul {
          margin-left: 184px;
          text-align: center;
          height: 24px;
          line-height: 24px;
          li {
            float: left;
          }
          .selected {
            width: 20px;
            height: 20px;
            background: url('../../assets/images/selected.png');
          }
          .unselected {
            width: 20px;
            height: 20px;
            background: url('../../assets/images/unselected.png');
          }
        }
      }

      .paid-way-select {
        margin-right: 17px;
        color: #666666;
        display: inline-block;
        margin-top: 3px;
      }

      .paid-way-chosen {
        font-size: 18px;
        color: #666666;
        margin-right: 7px;
      }
      .paid-way-balance {
        font-size: 16px;
        color: #666666;
        margin-right: 32px;
      }
      .paid-way-chosen-un {
        font-size: 18px;
        color: #CCCCCC;
        margin-right: 7px;
      }
      .paid-way-balance-un {
        font-size: 16px;
        color: #CCCCCC;
        margin-right: 32px;
      }
      .paid-way-active {
        font-size: 14px;
        color: #6ECC66;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: #81CC7A;
        }
        &:active {
          color: #50B347;
        }
      }
    }

    .line-decoration {
      border: 1px solid #EEEEEE;
      margin-left: 229px;
      margin-top: 39px;
      margin-bottom: 29px;
    }

    .paid-ways {
      ul {
        margin-left: 232px;
        li {
          float: left;
          margin-right: 21.1px;
          div {
            width: 203px;
            height: 55px;
            /*width:180px;*/
            border: 1px solid #EEEEEE;
            font-size: 18px;
            color: #585858;
            text-align: center;
            line-height: 55px;
            img, span {
              vertical-align: middle;
            }
          }
        }
      }
    }

    .public-transfer {
      width: 100%;
      margin-top: 14px;
      background: #fff;
      border: 1px solid #fff;
      .public-transfer-content {
        margin-top: 35px;
        margin-left: 59px;
        overflow: hidden;
        p {
          font-size: 14px;
          color: #666666;
          line-height: 2em;
        }
        .account-title {
          font-size: 18px;
          color: #585858;
          display: inline-block;
          margin-bottom: 25px;
          .my-bill {
            color: #6ECC66;
          }
        }
        .company-account-content {
          width: 496px;
          height: 163px;
          background: #FAFAFA;
          overflow: hidden;
          div {
            margin-top: 22px;
            margin-left: 27px;
          }
          span {
            margin-right: 47px;
          }
        }
        .user_account {
          font-size: 14px;
          color: #666666;
          line-height: 2em;
          margin-top: 44px;
          overflow: hidden;
          .user-account-content {
            .user-account-txt {
              width: 147px;
              text-align: right;
              display: inline-block;
            }
            position: relative;
            .tip-remitter {
              font-size: 14px;
              color: #FF4949;
              position: absolute;
              left: 140px;
              top: 26px;
            }
            .tip-account {
              font-size: 14px;
              color: #FF4949;
              position: absolute;
              left: 112px;
              top: 82px;
            }
            .tip-name {
              font-size: 14px;
              color: #FF4949;
              position: absolute;
              left: 112px;
              top: 140px;
            }
            span {
              display: inline-block;
              width: 146px;
              text-align: right;
              margin-right: 7px;
            }
            div {
              line-height: 4em;
            }
            input {
              width: 346px;
              height: 36px;
              background: #FFFFFF;
              border: 1px solid #EEEEEE;
              border-radius: 4px;
              padding-left: 15px;
              padding-right: 15px;
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
              &:focus {
                border: 1px solid #6ECC66;
              }
            }
            .block {
              .block-input {
                width: 162px;
                height: 36px;
              }
            }
          }
        }
        .paid_check {
          margin-top: 40px;
          margin-bottom: 35px;
        }
      }

    }

    .cashier-footer {
      width: 100%;
      height: 155px;
      .cashier-footer-content {
        margin-top: 30px;
        .paid-btn {
          display: inline-block;
          width: auto;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          color: #FFFFFF;
          background: #6ECC66;
          border-radius: 4px;
          cursor: pointer;
          padding-left: 56px;
          padding-right: 56px;
          margin-left: 990px;
          /*margin-top:30px;*/
          &:hover {
            background: #81CC7A;
          }
          &:active {
            background: #50B347;
          }
        }
        .el-btn-paid {
          margin-left: 1085px;
        }
        .el-btn-submit {
          margin-left: 1055px;
        }
        .transfer-note {
          display: inline-block;
          font-size: 14px;
          color: #CCCCCC;
          margin-left: 962px;
          margin-bottom: 10px;
        }
      }

    }

    .clearfix:after {
      clear: both;
      display: block;
      content: "";
      height: 0;
      line-height: 0;
      visibility: hidden;
    }

    .clearfix {
      zoom: 1;
    }

    .wh {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, .6);
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
              width: 308px;
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
                line-height: 2em;
              }
            }
          }
          .line {
            margin-top: 46px;
          }
          .subm {
            padding-left: 20px;
            padding-right: 20px;
            span {
              float: right;
              margin-top: 15px;
              margin-bottom: 15px;
              margin-left: 11px;
            }
          }
        }
        .pop_withdraw {

        }
        .note-tip {
          font-size: 12px;
          color: #DDDDDD;
          text-align: right;
          margin-right: 20px;
          margin-top: 0.8px;
          margin-bottom: 13.8px;
        }
      }
    }

    .m_modal {
      display: none;
      z-index: 999;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      .modal {
        display: none;
        width: 420px;
        height: 192px;
        color: #333333;
        background-color: #FFFFFF;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .head {
          width: auto;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          margin-top: 14px;
          margin-left: 20px;
          position: relative;
          h1 {
            color: #333333;
            font-size: 16px;
            font-weight: bold;
          }
          .close_con {
            cursor: pointer;
            width: 15px;
            height: 15px;
            position: absolute;
            top: 0;
            right: 20px;
            img {
              width: 100%;
              height: 100%;
              position: absolute;
            }
          }
        }
        .body {
          width: auto;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          margin-top: 23px;
          margin-left: 20px;
          margin-right: 20px;
          .newHint {
            width: auto;
            height: 40px;
            line-height: 40px;
            position: relative;
            span {
              display: block;
              width: 40px;
              height: 40px;
              position: absolute;
              left: 0;
            }
            .errorHintTexts {
              font-size: 14px;
              color: #333333;
              margin-left: 50px;
            }
          }
          .error_body {
            //margin-left: 38px;
            .error_img {
              display: inline-block;
              width: 40px;
              height: 40px;
              float: left;
              margin-right: 15px;
            }
          }
        }
        .footer {
          width: 100%;
          height: 65px;
          line-height: 65px;
          text-align: right;
          border-top: 1px solid #eeeeee;
          position: absolute;
          bottom: 0;
        }

      }
    }

    .isChosen {
      border: none;
      background-image: url("../../assets/images/pay_chosen.png");
    }
    .isAlipay {
      border: none;
      background-image: url("../../assets/images/pay_chosen.png");
    }

    .wechatCode {
      text-align: center;
      img {
        width: 160px;
        height: 160px;
        margin: 20px;
      }
      .wechat-tip-one {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }
      .wechat-tip-two {
        font-size: 14px;
        color: #333333;
        margin-bottom: 30px;
      }

    }
  }


</style>

