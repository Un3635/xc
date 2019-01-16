<template>
  <div class="page">
    <h2 class="page-header">我的账户</h2>
    <div class="page-content">
      <section class="c-section">
        <h4 class="c-section__title">
          账户余额
          <nuxt-link class="c-text-btn" :to="{path:'account/balance'}">
            查看明细 &gt;
          </nuxt-link>
        </h4>
        <div class="c-section__content rmb clearfix">
          <div class="left">
            总额<strong>{{(accountInfo.totalMoney + accountInfo.withdrawalFreezeMoney) | currency}}</strong>元
          </div>
          <div class="left">
            可用<strong>{{accountInfo.totalMoney | currency}}</strong>元
          </div>
          <div class="left">
            冻结<strong>{{accountInfo.withdrawalFreezeMoney | currency}}</strong>元
          </div>
          <div class="right text-right">
            <el-button type="primary" size="mini" @click="rechargeDialogVisible=true">充值</el-button>
            <el-button size="mini" @click="normalWithdraw">提现</el-button>
          </div>
        </div>
      </section>
      <section class="c-section" v-for="item in currencyList" :key="item.currencyId">
        <h4 class="c-section__title">
          {{item.currencyName}}账户
          <nuxt-link class="c-text-btn"
                       :to="{path:'/i/account/detail',query:{currencyId:item.currencyId}}">
            查看明细 &gt;
          </nuxt-link>
        </h4>
        <div class="c-section__content clearfix">
          <div class="left">
            总额<strong>{{(item.currencyCount + item.currencyFreezeNumber + item.rewardFreezeNumber)| cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="left">
            可用<strong>{{item.currencyCount| cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="left">
            冻结<strong>{{(item.currencyFreezeNumber + item.rewardFreezeNumber) | cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="right text-right">
            <el-button type="primary" size="mini" @click="cryptoCurrencyWithdraw(item)">提现</el-button>
          </div>
        </div>
      </section>
    </div>
    <el-dialog class="custom" width="420px" title="账户提现" :visible.sync="RMBDialog" @close="errors.clear('RMBForm')"
               top="10vh">
      <form @submit.prevent>
        <dl class="form-group">
          <dt class="label">可提现金额</dt>
          <dd>{{accountInfo.totalMoney | currency}} 元</dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">提现金额</dt>
          <dd>
            <el-input class="padding-horizontal-10" :placeholder="'大于等于'+accountInfo.withdrawalLimit"
                      name="num" v-validate="'required|decimal'" v-model="accountFormInfo.withdrawMoney"
                      @blur="rmbWithdrawInputHandler()" data-vv-scope="RMBForm"
                      @focus="errors.remove('num','RMBForm')">
              <span slot="suffix" class="suffix">元</span>
            </el-input>
            <p class="error" v-show="errors.has('RMBForm.num')">{{errors.first('RMBForm.num')}}</p>
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label">提现手续费</dt>
          <dd>
            {{withdrawFee}} 元/次
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label strong">银行卡信息</dt>
          <dd class="line"></dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">银行名称</dt>
          <dd>
            <el-input name="bank" class="padding-horizontal-10" @focus="errors.remove('bank','RMBForm')"
                      v-validate="'required|bank'" data-vv-scope="RMBForm"
                      placeholder="银行名称" v-model="accountFormInfo.remitBankName"/>
            <p class="error" v-show="errors.has('RMBForm.bank')">{{errors.first('RMBForm.bank')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">银行支行</dt>
          <dd>
            <el-input name="bankBranch" class="padding-horizontal-10" @focus="errors.remove('bankBranch','RMBForm')"
                      v-validate="'required|bank'" data-vv-scope="RMBForm"
                      placeholder="银行支行名称" v-model="accountFormInfo.remitBankBranch"/>
            <p class="error" v-show="errors.has('RMBForm.bankBranch')">{{errors.first('RMBForm.bankBranch')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">银行卡号</dt>
          <dd>
            <el-input name="bankcard" class="padding-horizontal-10" @focus="errors.remove('bankcard','RMBForm')"
                      v-validate="'required|bankcard'" data-vv-scope="RMBForm"
                      placeholder="提现的银行卡号" v-model="accountFormInfo.remitBankNo"/>
            <p class="error" v-show="errors.has('RMBForm.bankcard')">{{errors.first('RMBForm.bankcard')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">提现人姓名</dt>
          <dd>
            <el-input class="padding-horizontal-10" placeholder="您的真实姓名" v-model="accountFormInfo.remitName"/>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">谷歌验证</dt>
          <dd>
            <el-input class="padding-horizontal-10" placeholder="6位数字验证码" data-vv-scope="RMBForm"
                      name="code" v-validate="'required|code'" v-model="accountFormInfo.code"
                      @focus="errors.remove('code','RMBForm')"/>
            <p class="error" v-if="errors.has('RMBForm.code')">{{errors.first('RMBForm.code')}}</p>
          </dd>
        </dl>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="RMBDialog = false">取 消</el-button>
        <el-button type="primary" @click="accountSubmit" :disabled="isWithdrawConfirmDisable"
                   :loading="RMBLoading">提交申请
        </el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" width="420px" :title="currentOperatingAccount.currencyName+'提现'"
               :visible.sync="cryptoDialogVisible" @close="errors.clear('cryptoForm')">
      <form @submit.prevent>
        <dl class="form-group">
          <dt class="label">可提现{{currentOperatingAccount.currencyName}}</dt>
          <dd>{{currentOperatingAccount.currencyCount | cryptocurrency}} {{currentOperatingAccount.currencyName}}</dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">提现数量</dt>
          <dd>
            <el-input class="padding-horizontal-10" :placeholder="'大于等于'+currentOperatingAccount.withdrawalLimit"
                      name="num" v-validate="'required|decimal'" v-model="cryptoWithdraw.num"
                      data-vv-scope="cryptoForm" @blur="withdrawInputHandler()"
                      @focus="errors.remove('num','cryptoForm')">
              <span slot="suffix" class="suffix">{{currentOperatingAccount.currencyName}}</span>
            </el-input>
            <p class="error" v-if="errors.has('cryptoForm.num')">{{errors.first('cryptoForm.num')}}</p>
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label">提现手续费</dt>
          <dd>
            {{cryptoWithdrawFee}} {{currentOperatingAccount.currencyName}}/次
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label">提现到</dt>
          <dd>
            <el-dropdown style="width: 100%;" placement="bottom-start" @command="changeAddress">
              <div class="el-dropdown-link">
                <h3>{{get(currentOperatingAccount,'_selectedAddress.remark')}}<i
                  class="right el-icon-arrow-down el-icon--right"></i></h3>
                <p>{{get(currentOperatingAccount,'_selectedAddress.accountAddress')}}</p>
              </div>
              <el-dropdown-menu slot="dropdown" style="margin-left: -10px;">
                <el-dropdown-item class="dropdown-item el-dropdown-link" :command="item"
                                  v-for="item in get(currentOperatingAccount,'_accountInfo.userAccountAddressList',[])"
                                  :key="item.id" style="width: 300px;">
                  <h3>{{item.remark}}</h3>
                  <p>{{item.accountAddress}}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </dd>
        </dl>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextStep" :disabled="!cryptoWithdraw.num">
          下一步
        </el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" width="420px" title="安全验证" :visible.sync="verifyDialogVisible">
      <form @submit.prevent>
        <dl class="form-group input-group">
          <dt>验证方式</dt>
          <dd>
            <el-select v-model="verifyMethod" placeholder="请选择验证方式" class="drop-down-box" style="width: 100%;">
              <el-option v-for="item in verifyMethodList" :key="item.value"
                         :label="item.label" :value="item.value"/>
            </el-select>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>{{verifyMethod===1?'短信验证':'邮箱验证'}}</dt>
          <dd>
            <el-row :gutter="4">
              <el-col :span="16">
                <el-input class="padding-horizontal-10" :placeholder="verifyMethod===1?'请输入短信验证码':'请输入邮箱验证码'"
                          name="verifyCode" v-validate="'required|code'" v-model="cryptoWithdraw.verifyCode"
                          data-vv-scope="cryptoForm" @focus="errors.remove('verifyCode','cryptoForm')"/>
              </el-col>
              <el-col :span="8">
                <el-button type="text" size="medium" :disabled="sendCodeBtnDisabled"
                           :loading="sendCodeBtnLoading" @click="sendVerifyCode">
                  {{sendCodeBtnText}}
                </el-button>
              </el-col>
            </el-row>
            <p class="error" v-if="errors.has('cryptoForm.verifyCode')">{{errors.first('cryptoForm.verifyCode')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>谷歌验证</dt>
          <dd>
            <el-input class="padding-horizontal-10" placeholder="6位数字验证码"
                      name="code" v-validate="'required|code'" v-model="cryptoWithdraw.code"
                      data-vv-scope="cryptoForm" @focus="errors.remove('code','cryptoForm')"/>
            <p class="error" v-if="errors.has('cryptoForm.code')">{{errors.first('cryptoForm.code')}}</p>
          </dd>
        </dl>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" :disabled="isCryptoFormDisable" :loading="cryptoLoading"
                   @click="cryptoWithdrawSubmit()">
          提交申请
        </el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" width="420px" title="提示" :visible.sync="rechargeDialogVisible"
               @close="rechargeErrorMsg=''">
      <form @submit.prevent>
        <dl class="form-group">
          <dt class="label">充值金额</dt>
          <dd>
            <el-input type="text" name="money" placeholder="充值金额不得小于100元"
                      :loading="rechargeConfirmBtnLoading" v-model="rechargeAmount"
                      @focus="rechargeErrorMsg=''"/>
            <p class="error" v-if="rechargeErrorMsg">{{rechargeErrorMsg}}</p>
          </dd>
        </dl>
      </form>
      <div slot="footer">
        <el-button type="primary" :disabled="rechargeAmount ===''" @click="rechargeConfirm">去付款</el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" width="420px" title="提现" :visible.sync="withdrawErrorDialogVisible">
      <div class="dialog-content">
        <img src="../../../assets/images/common_reminder.png" alt="" class="leftImg">
        <span class="hintInfo">{{withdrawErrorMsg}}</span>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="withdrawErrorDialogVisible=false">知道了</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import AccountApi from '../../../services/account-api';
  import UserApi from '../../../services/user-api';
  import errorHandler from '../../../services/error-handler';
  import {mapState} from 'vuex';
  import {OrderType} from '../../../config/constants';
  import get from 'lodash.get';
  import {hideEmail, replacePos} from '../../../utils';
  import Decimal from 'decimal.js';

  export default {
    breadcrumb() {
      return {
        label: '我的账户',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    computed: {
      ...mapState({userInfo: 'userInfo'}),
      isCryptoFormDisable() {
        return this.cryptoWithdraw.num === '' ||
          this.cryptoWithdraw.verifyCode === '' ||
          this.cryptoWithdraw.code === '';
      },
      isWithdrawConfirmDisable() {
        return this.accountFormInfo.withdrawMoney === '' ||
          this.accountFormInfo.remitName === '' ||
          this.accountFormInfo.remitBankName === '' ||
          this.accountFormInfo.remitBankNo === '' ||
          this.accountFormInfo.remitBankBranch === '' ||
          this.accountFormInfo.code === '';
      },

      cryptoWithdrawFee() {
        const accountInfo = this.currentOperatingAccount._accountInfo || {};
        if (accountInfo.chargeType === 2) { // 手续费类型为百分比
          const fees = new Decimal(accountInfo.fees || 0).mul(this.cryptoWithdraw.num || 0).div(100);
          // 计算的手续费小于手续费最小值，则显示手续费最小值
          return fees.gt(accountInfo.withdrawalMin) ? parseFloat(fees.toFixed(10)) : accountInfo.withdrawalMin;
        } else {
          return accountInfo.fees;
        }
      },
      withdrawFee() {
        const accountInfo = this.accountInfo || {};
        if (accountInfo.chargeType === 2) { // 手续费类型为百分比
          const fees = new Decimal(accountInfo.fees || 0).mul(this.accountFormInfo.withdrawMoney || 0).div(100);
          // 计算的手续费小于手续费最小值，则显示手续费最小值
          return fees.gt(accountInfo.withdrawalMin) ? parseFloat(fees.toFixed(10)) : accountInfo.withdrawalMin;
        } else {
          return accountInfo.fees;
        }
      }
    },
    data() {
      return {
        currencyList: [],
        RMBDialog: false,
        RMBLoading: false,
        cryptoDialogVisible: false,
        cryptoLoading: false,
        cryptoWithdraw: {
          num: '',
          code: '',
          verifyCode: ''
        },
        currentOperatingAccount: {},
        withdrawErrorDialogVisible: false,
        withdrawErrorMsg: '',
        rechargeAmount: '',
        rechargeErrorMsg: '',
        rechargeDialogVisible: false,
        rechargeConfirmBtnLoading: false,
        accountInfo: {
          totalMoney: '',
          withdrawalFreezeMoney: ''
        },
        accountFormInfo: {
          withdrawMoney: '',
          remitName: '',
          remitBankNo: '',
          remitBankName: '',
          code: ''
        },
        verifyMethodList: [],
        verifyMethod: 1,
        sendCodeBtnLoading: false,
        sendCodeBtnDisabled: false,
        sendCodeBtnText: '发送验证码',
        smsCodeToken: '', // 短信验证码识别码
        verifyDialogVisible: false
      };
    },
    mounted() {
      this.getAccountInfo();
      this.getCurrencyList();
    },
    watch: {
      userInfo: {
        handler(val) {
          if (val.mobile || val.mailboxAccount) {
            this.initVerifyMethodList();
          }
        },
        immediate: true
      }
    },
    methods: {
      get,
      normalWithdraw() {
        if (this.accountInfo.totalMoney < this.accountInfo.withdrawalLimit) {
          this.withdrawErrorMsg = '账户余额不足，请联系客服：400 865 6688';
          this.withdrawErrorDialogVisible = true;
          return;
        }
        if (!this.userInfo.googleKey) {
          return this.showGoogleAuthBoundPrompt();
        }
        this.RMBDialog = true;
      },
      accountSubmit() {
        this.$validator
          .validateAll('RMBForm')
          .then(res => {
            if (res) {
              return res;
            }
            this.RMBLoading = true;
            return Promise.reject(null);
          })
          .then(() => {
            if (+this.accountFormInfo.withdrawMoney < this.accountInfo.withdrawalLimit) {
              return Promise.reject({msg: '无效的提现金额'});
            }
            return true;
          })
          .then(() => {
            let params = {
              withdrawMoney: this.accountFormInfo.withdrawMoney,
              remitName: this.accountFormInfo.remitName,
              remitBankNo: this.accountFormInfo.remitBankNo,
              remitBankName: this.accountFormInfo.remitBankName,
              remitBankBranch: this.accountFormInfo.remitBankBranch,
              googleCode: this.accountFormInfo.code
            };
            return UserApi.userWithdrawInfo(params);
          })
          .then(() => {
            this.RMBDialog = false;
            this.RMBLoading = false;
            this.accountFormInfo = {};
            this.getAccountInfo();
            this.$message({
              type: 'success',
              message: '提现申请已提交!'
            });
          })
          .catch(err => {
            this.RMBLoading = false;
            errorHandler(err);
          });
      },
      nextStep() {
        this.cryptoDialogVisible = false;
        setTimeout(() => {
          this.verifyDialogVisible = true;
        }, 300);
      },
      prevStep() {
        this.verifyDialogVisible = false;
        setTimeout(() => {
          this.cryptoDialogVisible = true;
        }, 300);
      },
      cryptoCurrencyWithdraw(item) {
        if (!this.userInfo.googleKey) {
          return this.showGoogleAuthBoundPrompt();
        }
        // 人民币账户为负不允许提币
        if (this.accountInfo.totalMoney < 0) {
          this.withdrawErrorMsg = '账户余额小于0元，请先充值';
          this.withdrawErrorDialogVisible = true;
          return;
        }
        if (item.currencyCount < item.withdrawalLimit) {
          this.withdrawErrorMsg = `${item.currencyName}账户大于等于${item.withdrawalLimit}才可以提现`;
          this.withdrawErrorDialogVisible = true;
          return;
        }
        this.currentOperatingAccount = item;
        const currencyId = item.currencyId;
        AccountApi.userAccountCurrencyInfo(currencyId)
          .then(res => {
            if (!res || !res.userAccountAddressList || res.userAccountAddressList.length < 1) {
              return this.showAddAddressTip(item.currencyName);
            }
            this.$set(item, '_accountInfo', res);
            this.$set(item, '_selectedAddress', res.userAccountAddressList[0]);
            this.cryptoDialogVisible = true;
          })
          .catch(() => {
          });
      },
      cryptoWithdrawSubmit() {
        const account = this.currentOperatingAccount;
        const googleCode = this.cryptoWithdraw.code;
        const smsCode = this.cryptoWithdraw.verifyCode;
        const currencyId = account.currencyId;
        const currencyName = account.currencyName;
        const withdrawNumber = this.cryptoWithdraw.num;
        const userAccountAddressId = get(account, '_selectedAddress.id');
        const smsCodeToken = this.smsCodeToken;
        this.$validator
          .validateAll('cryptoForm')
          .then(res => {
            if (res) {
              return res;
            }
            return Promise.reject(null);
          })
          .then(() => {
            if (withdrawNumber <= 0) {
              return Promise.reject({msg: '无效的提现金额'});
            }
            this.cryptoLoading = true;
            return true;
          })
          .then(() => AccountApi.userAccountCoin({
            currencyId,
            currencyName,
            withdrawNumber,
            userAccountAddressId,
            googleCode,
            smsCode,
            smsCodeToken
          }))
          .then(() => {
            this.cryptoLoading = false;
            this.verifyDialogVisible = false;
            this.cryptoWithdraw = {};
            this.currentOperatingAccount = {};
            this.getCurrencyList();
            this.$message({
              type: 'success',
              message: '提现申请已提交!'
            });
          })
          .catch(err => {
            this.cryptoLoading = false;
            if (err && err.code === '100101') {
              let method = this.verifyMethod === 1 ? '短信' : '邮箱';
              err.msg = method + '验证码错误';
            }
            errorHandler(err);
          });
      },
      rechargeConfirm() {
        if (!/^([0-9]+)$/.test(this.rechargeAmount)) {
          this.rechargeErrorMsg = '请输入正确的金额';
          return;
        }
        if (this.rechargeAmount < 100) {
          this.rechargeErrorMsg = '充值金额不得小于100元';
          return;
        }
        if (this.rechargeAmount > 9999999) {
          this.rechargeErrorMsg = '充值金额过大';
          return;
        }
        this.rechargeConfirmBtnLoading = true;
        UserApi.recharge(this.rechargeAmount)
          .then(res => {
            this.rechargeDialogVisible = false;
            this.rechargeConfirmBtnLoading = false;
            this.$router.push({
              path: '/pay',
              query: {
                orderNo: res.orderNo,
                amount: res.amount,
                type: OrderType.RECHARGE
              }
            });
          })
          .catch(err => {
            this.rechargeDialogVisible = false;
            this.rechargeConfirmBtnLoading = false;
            errorHandler(err);
          });
      },
      getCurrencyList() {
        AccountApi.userAccountCurrencyList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            res.sort((a, b) => a.currencyId - b.currencyId);
            this.currencyList = res;
          })
          .catch(errorHandler);
      },
      getAccountInfo() {
        AccountApi.userMoneyTotal()
          .then(res => {
            this.accountInfo = res || {};
          });
      },
      rmbWithdrawInputHandler() {
        // debounce(() => {
        let max = this.accountInfo.totalMoney;
        let min = this.accountInfo.withdrawalLimit || 0;
        let num = this.accountFormInfo.withdrawMoney;
        if (num === '') {
          return;
        }
        if (!/^\d+(\.\d{0,2})?$/.test(num)) {
          num = min;
        }
        num = +num;
        if (num > max) {
          num = max;
        }
        if (num < min) {
          num = min;
        }
        this.$nextTick(() => {
          this.accountFormInfo.withdrawMoney = num;
        });
        // }, 1000)();
      },
      withdrawInputHandler() {
        const max = +(this.currentOperatingAccount.currencyCount).toFixed(4);
        const min = this.currentOperatingAccount.withdrawalLimit;
        let num = this.cryptoWithdraw.num;
        if (!/^\d+(\.\d+)?$/.test(num)) {
          num = min;
        } else {
          num = (+num).toFixed(4);
        }
        num = +num;
        if (num > max) {
          num = max;
        }
        if (num < min) {
          num = min;
        }
        this.$nextTick(() => {
          this.cryptoWithdraw.num = num;
        });
      },
      showAddAddressTip(currency) {
        const html = `
          <div class="tip-info">
            <p style="font-size: 14px;color: #303137;">请添加${currency}提现地址！</p>
            <span style="font-size: 12px;color: #969699;">添加${currency}地址后才能进行提现操作</span>
          </div>
        `;
        this.$alert(html, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '去添加',
          type: 'warning',
          closeOnClickModal: true
        })
          .then(() => {
            this.$router.push('safety');
          })
          .catch(() => {
          });
      },
      showGoogleAuthBoundPrompt() {
        const html = `
          <div class="tip-info">
            <p style="font-size: 14px;color: #303137;">请绑定谷歌验证器(Google Authenticator)！</p>
            <span style="font-size: 12px;color: #969699;">为了您的交易安全，需要先绑定谷歌验证器</span>
          </div>
        `;
        this.$alert(html, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '去绑定',
          type: 'warning',
          closeOnClickModal: true
        })
          .then(() => {
            this.$router.push('/i/auth');
          })
          .catch(() => {
          });
      },
      sendVerifyCode() {
        const countryNum = this.userInfo.countryNum;
        const account = this.verifyMethod === 1 ? this.userInfo.moblie : this.userInfo.mailboxAccount;
        this.sendCodeBtnLoading = true;
        this.sendCodeBtnDisabled = true;
        const currencyName = this.currentOperatingAccount.currencyName;
        UserApi.smsCode({countryNum, account, type: 8, currencyName})
          .then(res => res || {})
          .then(res => res.result || '')
          .then(codeToken => {
            this.smsCodeToken = codeToken;
            this.$message({
              type: 'success',
              message: '发送成功',
              showClose: true
            });
            this.sendCodeBtnLoading = false;
            let t = 60;
            this.sendCodeBtnText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeBtnText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(error => {
            this.$message({
              type: 'error',
              message: error.msg,
              showClose: true
            });
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeBtnText = '重新发送';
          });
      },
      changeAddress(address) {
        this.$set(this.currentOperatingAccount, '_selectedAddress', address);
      },
      initVerifyMethodList() {
        const arr = [];
        const mobile = this.userInfo.moblie;
        const email = this.userInfo.mailboxAccount;
        if (mobile) {
          arr.push({
            type: '手机验证',
            label: '手机验证   ' + (this.userInfo.countryNum || '') + replacePos(mobile, '*', 3, 7),
            value: 1
          });
        }
        if (email) {
          arr.push({
            type: '邮箱验证',
            label: '邮箱验证   ' + hideEmail(email),
            value: 0
          });
        }
        this.verifyMethod = arr[0].value || '';
        this.verifyMethodList = arr;
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "../../../assets/style/form";

  .c-section {
    margin-top: 30px;
  }

  .c-section__title {
    margin-top: 30px;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 20px;
  }

  .c-text-btn {
    float: right;
    font-size: 12px;
    color: #606166;
    font-weight: normal;
  }

  .c-section__content {
    padding: 30px 20px;
    background-color: #fafafa;
    line-height: 32px;

    font-size: 14px;
    color: #606166;

    strong {
      font-size: 18px;
      color: #303137;
      margin: 0 4px 0 10px;
    }

    & > div {
      padding-left: 2em;
      vertical-align: top;
      height: 32px;
      width: 270px;

      &:first-child {
        padding-left: 0;
        width: 240px;

        strong {
          color: #fd7220;
        }
      }
      &:nth-child(2) {
        border-left: 1px solid #dedee0;
      }
      &:last-child {
        padding-left: 0;
        width: 100px;
      }
    }

    &.rmb {
      & > div {
        &:nth-child(3) {
          width: 180px;
        }
        &:last-child {
          width: 200px;
        }
      }
    }
  }

  .suffix {
    line-height: 34px;
    color: #303137;
    padding-right: 5px;
  }

  .account-info {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #FAFAFA;

    dt {
      color: #969699;
    }
  }

  .strong {
    font-weight: bold;
  }

  .error {
    position: absolute;
    padding-left: 10px;
    font-size: 12px;
    color: #f95453;
  }

  .page-header {
    padding-top: 20px;
    padding-bottom: 17px;
    padding-left: 30px;
    font-size: 24px;
    color: #303137;
    border-bottom: 1px solid #f5f5f7;
  }

  .page-content {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 70px;
  }

  .dialog-content .leftImg {
    float: left;
  }

  .hintInfo {
    display: inline-block;
    width: auto;
    height: 40px;
    line-height: 40px;
    margin-left: 15px;
  }

  .el-dropdown-link {
    margin-left: -10px;
    padding: 8px 10px;
    border: 1px solid #EDEEF0;

    h3 {
      font-size: 14px;
      font-weight: normal;
      line-height: 19px;
    }

    p {
      font-size: 12px;
      line-height: 16px;
      color: #999;
    }
  }

  .dropdown-item {
    margin-left: -10px;
    margin-right: -10px;
    border: 0;
  }

  .form-group {
    padding-left: 100px;
    .label {
      width: 100px;
    }
  }
</style>
