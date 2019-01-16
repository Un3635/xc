<template>
  <div class="account">
    <div class="page-title">
      <p class="txt">我的账户</p>
      <p class="tip" @click="$router.push('account/finance')">财务记录</p>
    </div>
    <ul class="account-list">
      <li class="account-item" v-for="(item,index) in allAccountCoinBalances" :key="index">
        <div class="tit">
          <img src="../../../assets/image/centerImage/Title_normal.png">
          <span class="txt">{{item.coinAbbreviation}}账户</span>
        </div>
        <ul class="currency-detail">
          <li class="item">
            <span>总额</span> <span class="em">{{item.totalAmount}}</span>
            <span :title="item.coinAbbreviation">{{item.coinAbbreviation}}</span>
          </li>
          <li class="item">
            <div class="name">可用</div>
            <div class="num">
              <span class="num-t" :title="item.availableAmount">{{item.availableAmount}}</span>
              <span class="num-u">{{item.coinAbbreviation}}</span>
            </div>
          </li>
          <li class="item">
            <div class="name">提现冻结</div>
            <div class="num">
              <span class="num-t" :title="item.frozenAmount">{{item.frozenAmount}}</span>
              <span class="num-u">{{item.coinAbbreviation}}</span>
            </div>
          </li>
          <li class="item">
            <div class="name">预挖冻结</div>
            <div class="num">
              <span class="num-t" :title="item.readyAmount">{{item.readyAmount}}</span>
              <span class="num-u">{{item.coinAbbreviation}}</span>
            </div>
          </li>
          <li class="item">
            <div class="withdraw-btn" @click="changeWithdrawBox(index, item)">提现</div>
          </li>
        </ul>
        <transition name="tile">
          <div class="withdraw-box-wrap" v-show="withdrawBoxActive===index">
            <div class="withdraw-box">
              <el-form :model="withdrawData1"
                       label-width="100px"
                       :ref="'formdata'+index"
                       :inline="true"
                       label-position="top"
                       class="withdraw-form">
                <el-form-item label="提币地址" prop="add" :rules="{ required: true, message: '提币地址不能为空'}">
                  <el-input type="text" v-model="withdrawData1.add" disabled></el-input>
                  <p class="end-tip end-tip2" @click="bindAddr(true)">绑定</p>
                </el-form-item>
                <el-form-item label="数量" prop="num" :rules="[
                                  { required: true, message: '必须为数值并且不能小于' + allCoins[item.coinAbbreviation].minWithdrawalQuota + item.coinAbbreviation,  min: Number(allCoins[item.coinAbbreviation].minWithdrawalQuota)},
                                ]" >
                  <el-input v-model="withdrawData1.num" auto-complete="off" @blur="blurNum(item)" @input="changeNum()" ></el-input>
                  <p class="end-tip">{{item.coinAbbreviation}}</p>
                </el-form-item>
                <el-form-item label="手续费">
                  <el-input v-model.number="withdrawData1.fee" disabled></el-input>
                  <p class="end-tip">{{item.coinAbbreviation}}</p>
                </el-form-item>
                <el-form-item label="到账数量">
                  <el-input v-model.number="withdrawData1.quantity" disabled></el-input>
                  <p class="end-tip">{{item.coinAbbreviation}}</p>
                </el-form-item>
                <el-form-item label="手机验证码" prop="goog"  :rules="[
                                  { required: true, message: '请输入正确的手机验证码'}
                                ]" >
                  <el-input v-model="withdrawData1.goog" auto-complete="off" maxLength="6" @input="changeGoole()"></el-input>
                  <!-- <p class="end-tip end-tip2"
                     @click="(bindGoole !== '已绑定') && $router.push({path: '/p-center/verify',query: {page: 'account'}})"
                     :class="{ban: bindGoole === '已绑定'}">{{bindGoole}}</p> -->
                     <p class="end-tip end-tip2" @click="sendPhoneYzCode()" :class="{ban: yzCodeStr.indexOf('s') > -1}">{{yzCodeStr}}</p>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :rules="{ required: true, message: '请输入备注'}">
                  <el-input v-model="withdrawData1.remark" auto-complete="off"></el-input>
                  <!-- <p class="end-tip">{{item.coinAbbreviation}}</p> -->
                </el-form-item>
                <el-form-item>
                  <div class="btn-box">
                    <div class="tip">
                      <span>温馨提示</span><br>
                      最小提现额度为：{{allCoins[item.coinAbbreviation].minWithdrawalQuota}} {{item.coinAbbreviation}} <br>
                      请确保绑定提币地址准确无误，避免经济损失。<br>
                      提币需要人工审核，请耐心等待，若有任何疑问可添加星球官方微信hscs_001
                    </div>
                    <el-button type="primary" @click="submitWithdrawForm(index, item)"
                               class="withdraw-box-submit" :loading="isSubmit">提交
                    </el-button>

                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </transition>
      </li>
      <li class="nodatas" v-if="allAccountCoinBalances&&allAccountCoinBalances.length==0">暂无收益</li>
    </ul>
    <!-- <wallet @walletAddr="walletAddr" :resultHint="resultHint" @changeResultHint = "changeResultHint"/> -->
    <wallet :cid="cid" @changeWalletAddr = "changeWalletAddr"/>
  </div>
</template>

<script>
  import {Input, Select, Option, Button} from 'element-ui'
  import validators from '../../../components/login/rules.js'
  import Wallet from '../../../components/pop';
  import {getStore} from '../../../plugins/utils';
  export default {
    breadcrumb() {
      return {
        label: '我的账户',
        pList: [
          {
            path: '/p-center',
            label: '个人中心'
          }
        ]
      }
    },
    name: 'account',
    components: {
      Wallet
    },
    data() {
      return {
        withdrawBoxActive: -1,
        withdrawData1: {
          add: '',
          num: '',
          fee: '',
          quantity: '',
          goog: '',
          remark: ''
        },
        allAccountCoinBalances: [],
        allCoins: [],
        yzCodeStr: '手机验证码',
        timer: null,
        timing: 60,
        cid: '',
        isSubmit: false
      }
    },
    methods: {
      changeNum() {
        let isNum = /^\d+(\.\d+)?$/;
        if(!this.withdrawData1.num.toString().match(isNum)){
           let newValue = this.withdrawData1.num.toString().match(/^\d+(\.)?(\d+)?/g)
           setTimeout(() => {
             this.withdrawData1.num = newValue ? newValue[0].toString() : '';
           }, 50);
        }else{
          // this.withdrawData1.num = '';
        }
      },
      changeGoole() {
        let isNum = /^\d{6}$/;
        if(!this.withdrawData1.goog.toString().match(isNum)){
           let newValue = this.withdrawData1.goog.toString().match(/^\d+/g)
           setTimeout(() => {
             this.withdrawData1.goog = newValue ? newValue[0].toString() : '';
           }, 50);
        }else{
          // this.withdrawData1.num = '';
        }
      },
      changeWalletAddr(walletAddr) {
        this.withdrawData1.add = walletAddr;
        // 对原数据进行更改
        this.allAccountCoinBalances[this.withdrawBoxActive]['walletAddressStatus'] = 1;
        this.allAccountCoinBalances[this.withdrawBoxActive]['walletAddress'] = walletAddr;

      },
      changeWithdrawBox(index, item) {
        // 呼叫提币下拉
        if (this.withdrawBoxActive !== index) {
          this.withdrawBoxActive = index
        } else {
          this.withdrawBoxActive = -1
        }
        this.$refs['formdata' + index][0].resetFields();
        this.withdrawData1.quantity = '';
        this.withdrawData1.remark = '';
        this.withdrawData1.goog = '';
        // 设置提现地址 walletAddressStatus: 0 -> 地址不存在; 1 - > 地址存在
        if (Number(item.walletAddressStatus)) {
          this.withdrawData1.add = item.walletAddress;
        }
        this.withdrawData1.fee = this.allCoins[item.coinAbbreviation].coinHandlingFee;
      },
      bindAddr(params) {
        // 呼叫修改地址弹出层
        this.$store.commit('walletDialogVisible', params);
        this.cid = this.allAccountCoinBalances[this.withdrawBoxActive].coinId;

      },
      submitWithdrawForm(index, item) {
        // 提币操作
        this.$refs['formdata' + index][0].validate((valid) => {
          if (valid) {
            this.isSubmit = true;
            let param = {
              'code': this.withdrawData1.goog,
              'currencyId': item.coinId,
              'extractCurrencyAddress': this.withdrawData1.add,
              'extractCurrencyAmount': this.withdrawData1.num,
              'remark': this.withdrawData1.remark,
              'initTimes': new Date().getTime()
            }
            getajaxdata_json(
              API.mentionMoney,
              'post',
              JSON.stringify(param),
              'json', (res) => {
                // console.log(res);
                this.isSubmit = false;
                if (Number(res.code) === 1000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                }else if(Number(res.code) !== 3001) {
                   this.$message.error(res.message);
                }
              }, this)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getUserAccountBalanceData() { //我的账户
        let vm = this;
        // 获取所有币种
        getajaxdata(API.getAllCoins, 'GET', {'initTimes': new Date().getTime()}, 'json', (res) => {
          // console.log(res);
          if(res.data === {} || !res.data.length) return;
          res.data.map((item) => {
            this.allCoins[item.coinAbbreviation] = {
              "coinHandlingFee": item.coinHandlingFee,
              "minWithdrawalQuota": item.minWithdrawalQuota
            }
          })
          // 获取账户
          getajaxdata(API.getAllAccountCoinBalances, 'GET', {'initTimes': new Date().getTime()}, 'JSON', function (res) {
            if (res.code == '1000') {
              vm.allAccountCoinBalances = res.data;
            }
          }, this)
        },this)
      },
      blurNum(item) {
       if(!this.withdrawData1.num || isNaN(this.withdrawData1.num) || this.withdrawData1.num < this.allCoins[item.coinAbbreviation].minWithdrawalQuota)
        {
          return;
        }
        this.withdrawData1.quantity = this.withdrawData1.num - this.withdrawData1.fee;
        this.withdrawData1.quantity = this.withdrawData1.quantity.toFixed(8);
      },
      sendPhoneYzCode() {
        // 手机验证码的发送
        if(this.yzCodeStr.indexOf('s') > -1) return;
        getajaxdata(API.sendMentionMoneyCode, 'POST', {'initTimes': new Date().getTime()}, 'json', (res) => {
          if(Number(res.code) !== 1000 && Number(res.code) !== 3001 )
          {
            this.$message.error(res.message);
          }
          else{
            this.timer = setInterval(() => {
              if (this.timing === 1) {
                this.resetYzCode('手机验证码');
              } else {
                this.timing -= 1;
                this.yzCodeStr = this.timing + 's';
              }
            },1000)
            this.yzCodeStr = this.timing + 's';
          }
        }, this)
      },
      resetYzCode(str) {
        clearInterval(this.timer);
        // this.showTiming = false;
        this.yzCodeStr = str || "重新发送";
        this.timing = 60;
      }
    },
    created() {},
    mounted() {
      this.getUserAccountBalanceData()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/public.scss";

  .nodatas{
    text-align: center;
    line-height: 80px;
    font-size: 14px;
    color: #5F5F5F;
  }
  .ban {
    cursor: not-allowed !important;
  }

  .account {
    min-height: 733px;
    @include center-page-title;
    .account-list {
      padding: 30px 30px 0;
      .account-item {
        width: 100%;
        margin: 0 auto 31px;
      }
      .nodatas-my{
        width: 100%;
        height: 76px;
        line-height: 76px;
        text-align: center;
        color: #909399;
        font-size: 14px;
      }
    }
  .account-item {
    .tit {
    @include center-item-tit;
    }
    .currency-detail {
      width: 100%;
      height: 90px;
      border: 1px solid #F0F0F0;
      border-radius: 4px;
    @include clearfix;
  .item {
    float: left;
    height: 46px;
    padding: 22px 20px;
    width:155px;
    max-width: 155px;
    text-align: left;
  @include clearfix;
  .name {
    font-size: 14px;
    color: #9B9B9B;
    text-align: left;
    line-height: 19px;
  }
  .num {
    width:100%;
    text-align:left;
    padding-top: 7px;
    .num-t{
      display:inline-block;
      font-size: 16px;
      line-height: 24px;
      max-width:115px;
      color: #303137;
      font-weight: 800;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num-u {
      display:inline-block;
      vertical-align:top;
      font-size: 14px;
      line-height: 14px;
      padding:8px 0 0 6px;
      font-weight: 400;
      color: #9B9B9B;
  }
  }
  &:first-of-type {
     padding: 0 15px;
     margin-right: 0px;
     width: 230px;
     max-width: 230px;
     height: 90px;
     text-align: left;
     background: #F5F6FA;
  span {
    display: inline-block;
    vertical-align: top;
    margin-top: 33px;
    font-size: 14px;
    padding-left: 6px;
    color: #5F5F5F;
    line-height: 24px;

  }
  .em {
    display:inline-block;
    font-size: 18px;
    color: #E94C4C;
    font-weight: 800;
    max-width:148px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  }
  &:last-of-type {
     float:right;
     padding: 0;
     width: 124px;
  .withdraw-btn {
    width: 64px;
    height: 34px;
    margin: 29px auto 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    background-image: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);
    box-shadow: 0 4px 10px 0 rgba(77, 46, 234, 0.30);
  }
  }
  }
  }
  .withdraw-box-wrap {
    position: relative;
    width: 100%;
    padding: 11px 0 20px;
    border: 1px solid #F0F0F0;
    border-top: 0 none;
    overflow: hidden;
  .withdraw-box {
    width: 929px;
    margin: 0 auto;
    background: url("../../../assets/image/centerImage/account-img-test.png") 50% 0% no-repeat;
    background-size: 929px auto;
  }
  &.tile-enter-active {
     transition: all .4s linear;
  }
  &.tile-leave-active {
     transition: all .3s linear;
  }
  &.tile-enter-to, &.tile-leave {
    height: 538px;
  }
  &.tile-enter, &.tile-leave-to {
    height: 0;
  }

  }
  }
  .withdraw-box {
    .withdraw-form {
      padding: 32px 32px 27px;
    }
    .btn-box {
      width: 100%;
      margin-top: -6px;
    @include clearfix;
    .tip {
      float: left;
      width: 450px;
      line-height: 17px;
      font-size: 12px;
      color: #9B9B9B;
      text-align: left;
    span {
      font-size: 12px;
      color: #333333;
      text-align: left;
      font-weight: 800;
      line-height: 36px;
    }
  }
  .withdraw-box-submit {
    float: right;
    width: 120px;
    height: 40px;
    margin-top: 33px;
    background-image: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);
    box-shadow: 0 4px 10px 0 rgba(77, 46, 234, 0.30);
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
  }
  }
  }
</style>
