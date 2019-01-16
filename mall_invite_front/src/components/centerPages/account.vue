<template>
    <div class="account">
        <div class="page-title">
            <p class="txt">我的账户</p>
            <p class="tip" @click="$router.push('/center/account/finance')">财务记录</p>
        </div>
        <ul class="account-list">
            <li class="account-item" v-for="(item,index) in allAccountCoinBalances" :key="index">
                    <div class="tit">
                        <img src="../../assets/centerImage/Title_normal.png">
                        <span class="txt">{{item.coinAbbreviation}}账户</span>
                    </div>
                    <ul class="currency-detail">
                        <li class="item">
                            <span>总额</span> <span class="em">{{item.totalAmount}}</span>
                            <span>{{item.coinAbbreviation}}</span>
                        </li>
                        <li class="item">
                            <div class="name">可用</div>
                            <div class="num">{{item.availableAmount}}<span>{{item.coinAbbreviation}}</span></div>
                        </li>
                        <li class="item">
                            <div class="name">提现冻结</div>
                            <div class="num">{{item.frozenAmount}}<span>{{item.coinAbbreviation}}</span></div>
                        </li>
                        <li class="item">
                            <div class="name">预挖冻结</div>
                            <div class="num">{{item.readyAmount}}<span>{{item.coinAbbreviation}}</span></div>
                        </li>
                        <li class="item">
                            <div class="withdraw-btn" @click="changeWithdrawBox(index, item)">提现</div>
                        </li>
                    </ul>
                    <keep-alive>
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
                                      { required: true, message: '请输入数量'},
                                      { type: 'number', message: '必须为数值并且不能小于'+allCoins[item.coinAbbreviation].minWithdrawalQuota + item.coinAbbreviation,  min: Number(allCoins[item.coinAbbreviation].minWithdrawalQuota)},
                                    ]">
                                            <el-input v-model.number="withdrawData1.num" auto-complete="off" @blur="blurNum(item)"></el-input>
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
                                        <el-form-item label="谷歌验证码" prop="goog"  :rules="[
                                      { required: true, message: '请输入正确的谷歌验证码'},
                                      { type: 'number', message: '请输入正确的谷歌验证码'}
                                    ]">
                                            <el-input v-model.number="withdrawData1.goog" auto-complete="off" maxLength="6"></el-input>
                                            <p class="end-tip end-tip2"
                                               @click="(bindGoole !== '已绑定') && $router.push({path: '/center/verify',query: {page: '/center/account'}})"
                                               :class="{ban: bindGoole === '已绑定'}">{{bindGoole}}</p>
                                        </el-form-item>
                                        <el-form-item label="备注" prop="remark" :rules="{ required: true, message: '请输入备注'}">
                                            <el-input v-model="withdrawData1.remark" auto-complete="off"></el-input>
                                            <p class="end-tip">{{item.coinAbbreviation}}</p>
                                        </el-form-item>
                                        <el-form-item>
                                            <div class="btn-box">
                                                <div class="tip">
                                                    <span>温馨提示</span><br>
                                                    最小提现额度为：{{allCoins[item.coinAbbreviation].minWithdrawalQuota}} {{item.coinAbbreviation}} <br>
                                                    请确保绑定提币地址准确无误，避免经济损失。<br>
                                                    提币需要人工审核，请耐心等待，若有任何疑问可拨打客服电话：888888888
                                                </div>
                                                <el-button type="primary" @click="submitWithdrawForm(index, item)"
                                                           class="withdraw-box-submit">提交
                                                </el-button>

                                            </div>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </transition>
                    </keep-alive>
                </li>
            <li class="nodatas" v-if="allAccountCoinBalances&&allAccountCoinBalances.length==0">暂无收益</li>
        </ul>
        <!-- <wallet @walletAddr="walletAddr" :resultHint="resultHint" @changeResultHint = "changeResultHint"/> -->
        <wallet :cid="cid" @changeWalletAddr = "changeWalletAddr"/>
    </div>
</template>

<script>
import {Input, Select, Option, Button} from 'element-ui'
import validators from '../login/rules.js'
import Wallet from '../pop/wallet';
export default {
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
      bindGoole: '未绑定',
      allAccountCoinBalances: [],
      allCoins: [],
      // resultHint: ''
      cid: '',
    }
  },
  methods: {
    changeWalletAddr(walletAddr) {
      this.withdrawData1.add = walletAddr;
    },
    changeWithdrawBox(index, item) {
      // 呼叫提币下拉
      if (this.withdrawBoxActive !== index) {
        this.withdrawBoxActive = index
      } else {
        this.withdrawBoxActive = -1
      }
      this.$refs['formdata' + index][0].resetFields();
      // this.withdrawData1.fee = '';
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
          let param = {
            'code': this.withdrawData1.goog,
            'currencyId': item.coinId,
            'extractCurrencyAddress': this.withdrawData1.add,
            'extractCurrencyAmount': this.withdrawData1.num,
            'remark': this.withdrawData1.remark
          }
          getajaxdata_json(
              API.mentionMoney,
              'post',
              JSON.stringify(param),
              'json', (res) => {
                // console.log(res);
                if (Number(res.code) === 1000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
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
      getajaxdata(API.getAllCoins, 'GET', {}, 'json', (res) => {
        // console.log(res);
        if(res.data === {} || !res.data.length) return;
        res.data.map((item) => {
          this.allCoins[item.coinAbbreviation] = {
            "coinHandlingFee": item.coinHandlingFee,
            "minWithdrawalQuota": item.minWithdrawalQuota
          }
        })
        // 获取账户
      getajaxdata(API.getAllAccountCoinBalances, 'GET', '', 'JSON', function (res) {
        if (res.code == '1000') {
          vm.allAccountCoinBalances = res.data;
        }
      }, this)
      },this)
    },
    toBindGoole() {
      // 谷歌绑定
      if (this.bindGoole === '已绑定') {
        return;
      }
    },
    blurNum(item) {
      if(!this.withdrawData1.num || isNaN(this.withdrawData1.num) || this.withdrawData1.num < this.allCoins[item.coinAbbreviation].minWithdrawalQuota)
      {
        return;
      }
      this.withdrawData1.quantity = this.withdrawData1.num - this.withdrawData1.fee;
      this.withdrawData1.quantity = this.withdrawData1.quantity.toFixed(8);
    }
  },
  created() {
    this.bindGoole = localStorage.getItem('userInfo') ? Boolean(JSON.parse(localStorage.getItem('userInfo')).isGaSecret) ? '已绑定' : '绑定' : '绑定';
  },
  mounted() {
    this.getUserAccountBalanceData()
  }
}
</script>

<style scoped lang="scss">
    @import "../../../static/css/public.scss";

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
                        font-size: 18px;
                        line-height: 24px;
                        padding-top: 7px;
                        color: #303137;
                        font-weight: 800;
                        span {
                            font-size: 14px;
                            padding-left: 6px;
                            font-weight: 400;
                            color: #9B9B9B;
                            line-height: 14px;
                        }
                    }
                    &:first-of-type {
                        padding: 0;
                        margin-right: 0px;
                        width: 260px;
                        max-width: 260px;
                        height: 90px;
                        text-align: center;
                        background: #F5F6FA;
                        span {
                            display: inline-block;
                            margin-top: 33px;
                            font-size: 14px;
                            padding-left: 6px;
                            color: #5F5F5F;
                            line-height: 24px;

                        }
                        .em {
                            font-size: 18px;
                            margin-top: 33px;
                            line-height: 24px;
                            color: #E94C4C;
                            font-weight: 800;
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
                width: 100%;
                padding: 11px 0 20px;
                border: 1px solid #F0F0F0;
                border-top: 0 none;
                .withdraw-box {
                    width: 929px;
                    height: 507px;
                    margin: 0 auto;
                    background: url("../../assets/centerImage/account-img-test.png") 50% 0% no-repeat;
                    background-size: 929px auto;
                }
                &.tile-enter-active {
                    transition: all .4s linear;
                    .withdraw-box {
                        transition: all .4s linear;
                    }
                }
                &.tile-leave-active {
                    transition: all .3s .15s linear;
                    .withdraw-box {
                        transition: all .3s linear;
                    }
                }
                &.tile-enter-to, &.tile-leave {
                    height: 538px;
                    .withdraw-box {
                        height: 507px;
                        opacity: 1;
                    }
                }
                &.tile-enter, &.tile-leave-to {
                    height: 0;
                    .withdraw-box {
                        height: 0;
                        opacity: 0;
                    }
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
