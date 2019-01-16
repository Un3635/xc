<template>
  <div class="page">
    <h2 class="page-header">アカウント</h2>
    <div class="headerContent">
      <h4 class="c-section__title">
        アカウント情報
        <nuxt-link class="c-text-btn" to="account/bill/detail">明細 &gt;</nuxt-link>
      </h4>
      <div class="headerContentInner">
        <div class="headerContentInnerCon">
          <p class="title">未払金</p>
          <div class="headerContentInnerConDown">
            <p class="costPrcie">{{billAmount|currency}}円</p>
            <div class="right text-right">
              <el-button type="primary" size="mini" :disabled="billAmount<=0" @click="billPay">お支払い</el-button>
            </div>
          </div>
          <nuxt-link to="account/bill" class="historyListBtn">取引履歴</nuxt-link>
        </div>
      </div>
    </div>
    <div class="page-content">
      <section class="c-section" v-for="item in currencyList" :key="item.currencyId">
        <h4 class="c-section__title">
          {{item.currencyName}}アカウント
          <nuxt-link class="c-text-btn"
                     :to="{path:'detail',query:{currencyId:item.userAccountCurrencyId,currencyName:item.currencyName},append:true}">
            明細 >
          </nuxt-link>
        </h4>
        <div class="c-section__content clearfix">
          <div class="left">
            可用<strong>{{item.currencyCount| cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="left">
            トータル<strong>{{item.currencyTotal| cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="left">
            凍結<strong>{{item.currencyFreezeNumber| cryptocurrency}}</strong>{{item.currencyName}}
          </div>
          <div class="right text-right">
            <el-button type="primary" size="mini" @click="cryptoCurrencyWithdraw(item)">引出し</el-button>
          </div>
        </div>
      </section>
    </div>

    <el-dialog width="460px" :title="currentOperatingAccount.currencyName+'のお引き出し'"
               :visible.sync="cryptoDialogVisible" @close="errors.clear('cryptoForm')">
      <form @submit.prevent>
        <dl class="form-group">
          <!-- <dt class="label">引出可能額{{currentOperatingAccount.currencyName}}</dt> -->
          <dt class="label">引出可能額</dt>
          <dd>{{currentOperatingAccount.currencyCount | cryptocurrency}} {{currentOperatingAccount.currencyName}}</dd>
        </dl>
        <dl class="form-group input-group">
          <dt class="label">引出し金額</dt>
          <dd>
            <el-input :placeholder="'≥'+currentOperatingAccount.withdrawalLimit"
                      name="num" v-validate="'required|decimal'" v-model="cryptoWithdraw.num"
                      data-vv-scope="cryptoForm" @input="withdrawInputHandler"
                      @blur="withdrawBlurHandler"
                      @focus="errors.remove('num','cryptoForm')">
              <span slot="suffix" class="suffix">{{currentOperatingAccount.currencyName}}</span>
            </el-input>
            <p class="error" v-if="errors.has('cryptoForm.num')">{{errors.first('cryptoForm.num')}}</p>
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label">引出手数料</dt>
          <dd>
            {{cryptoWithdrawFee}} {{currentOperatingAccount.currencyName}}/回
          </dd>
        </dl>
        <dl class="form-group">
          <dt class="label">ウォレット</dt>
          <dd>
            <el-dropdown style="width: 100%;" placement="bottom-start" @command="changeAddress" trigger="click">
              <div class="el-dropdown-link" style="margin-left: -10px;">
                <h3>{{get(currentOperatingAccount,'_selectedAddress.remark')}}<i
                  class="right el-icon-arrow-down el-icon--right"></i></h3>
                <p>{{get(currentOperatingAccount,'_selectedAddress.accountAddress')}}</p>
              </div>
              <el-dropdown-menu slot="dropdown" style="margin-left: -10px;">
                <el-dropdown-item class="dropdown-item el-dropdown-link" :command="item"
                                  v-for="item in get(currentOperatingAccount,'_accountInfo.userAccountAddressList',[])"
                                  :key="item.id" style="width: 264px;">
                  <h3>{{item.remark}}</h3>
                  <p>{{item.accountAddress}}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>{{verifyMethod===1?'SMS認証':'メール認証'}}</dt>
          <dd>
            <el-select v-model="verifyMethod" placeholder="検証方法を選択してください" class="drop-down-box">
              <el-option v-for="(item,index) in verifyMethodLists" :key="index"
                         :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>認証コード</dt>
          <dd class="SmsCodes">
            <el-input placeholder="認証コードをご入力ください" name="verifyCode"
                      v-validate="'required|code'" v-model="cryptoWithdraw.verifyCode"
                      data-vv-scope="cryptoForm" @focus="errors.remove('verifyCode','cryptoForm')"/>
            <div class="buttonBox">
              <el-button type="text" :disabled="sendCodeBtnDisabled" @click="sendVerifyCode">
                {{sendCodeBtnText}}
              </el-button>
            </div>
            <p class="error" v-if="errors.has('cryptoForm.verifyCode')">{{errors.first('cryptoForm.verifyCode')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>google認証</dt>
          <dd>
            <el-input placeholder="6桁の数字検証コード"
                      name="googleCode" v-validate="'required|code'" v-model="cryptoWithdraw.code"
                      data-vv-scope="cryptoForm" @focus="errors.remove('googleCode','cryptoForm')"/>
            <p class="error" v-if="errors.has('cryptoForm.googleCode')">{{errors.first('cryptoForm.googleCode')}}</p>
          </dd>
        </dl>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cryptoDialogVisible=false">キャンセル</el-button>
        <el-button type="primary" :disabled="isCryptoFormDisable" :loading="cryptoLoading"
                   @click="cryptoWithdrawSubmit()">
          引き出す
        </el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" width="420px" title="" :visible.sync="withdrawErrorDialogVisible">
      <div class="dialog-content">
        <img src="../../../assets/images/common_reminder.png" alt="" class="leftImg">
        <span class="hintInfo">{{withdrawErrorMsg}}</span>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="withdrawErrorDialogVisible=false">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import AccountAPI from '../../../services/account-api';
  import errorHandler from '../../../services/error-handler';
  import {mapState} from 'vuex';
  import get from 'lodash.get';
  import UserAPI, {VerifyCodeType} from '../../../services/user-api';
  import {CountDown, hideEmail, replacePos, toPromise} from '../../../services/utils';
  import Decimal from 'decimal.js';

  export default {
    head() {
      return {
        title: 'アカウント｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    breadcrumb() {
      return {
        label: 'アカウント',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
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
      cryptoWithdrawFee() {
        const accountInfo = this.currentOperatingAccount._accountInfo || {};
        if (accountInfo.chargeType === 2) { // 手续费类型为百分比
          const fees = new Decimal(accountInfo.fees || 0).mul(parseFloat(this.cryptoWithdraw.num || 0)).div(100);
          // 计算的手续费小于手续费最小值，则显示手续费最小值
          return fees.gt(accountInfo.withdrawalMin) ? parseFloat(fees.toFixed(10)) : accountInfo.withdrawalMin;
        } else {
          return accountInfo.fees;
        }
      }
    },
    data() {
      return {
        billAmount: 0,
        currencyList: [],
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
        accountInfo: {
          totalMoney: '',
          withdrawalFreezeMoney: ''
        },
        sendCodeBtnLoading: false,
        sendCodeBtnDisabled: false,
        sendCodeBtnText: '認証コードを送信',
        smsCodeToken: '', // 短信验证码识别码
        verifyDialogVisible: false,
        verifyMethod: 1,
        verifyMethodLists: []
      };
    },
    mounted() {
      this.initPage();
    },
    watch: {
      userInfo: {
        handler(val) {
          if (val.mobile || val.mailboxAccount) {
            this.verifyMethodList();
          }
        },
        immediate: true
      }
    },
    methods: {
      get,
      verifyMethodList() {
        const arr = [];
        const mobile = this.userInfo.mobile;
        const email = this.userInfo.mailboxAccount;
        if (mobile) {
          arr.push({
            type: '携帯認証',
            // label: '電話番号認証   ' + (this.userInfo.countryNum + '  ' || '') + replacePos(mobile, '*', 3, 7),
            label: replacePos(mobile, '*', 3, 7),
            value: 1
          });
        }
        if (email) {
          arr.push({
            type: 'メールアドレス認証',
            label: hideEmail(email),
            value: 2
          });
        }
        this.verifyMethod = arr[0].value || '';
        this.verifyMethodLists = arr;
      },
      initPage() {
        AccountAPI.userAccountInfo()
          .then(res => {
            this.billAmount = res.totalMoney || 0;
            this.currencyList = res.currencyInfoVoList || [];
          });
      },
      showBillAmountWarning() {
        const html = `
          <div class="tip-info">
            <p style="font-size: 14px;color: #303137;padding-bottom: 20px;">残高はー${this.billAmount}円となりますのでお引き出しは承りかねます。まずはリチャージしてください！</p>
            <span style="height:1px;background:#F5F5F7;display:block;"></span>
          </div>
        `;
        this.$confirm(html, '', {
          dangerouslyUseHTMLString: true,
          cancelButtonText: '後で',
          confirmButtonText: 'お支払へ',
          closeOnClickModal: true
        })
          .then(() => {
            this.$router.push('/i/account/bill/detail');
          })
          .catch(() => {
          });
      },
      cryptoCurrencyWithdraw(item) {
        if (this.billAmount > 0) {
          return this.showBillAmountWarning();
        }
        if (!this.userInfo.googleKey) {
          return this.showGoogleAuthBoundPrompt();
        }
        // 人民币账户为负不允许提币
        if (this.accountInfo.totalMoney < 0) {
          this.withdrawErrorMsg = '残高が不足しております。恐れ入りますが、再度ご確認ください。';
          this.withdrawErrorDialogVisible = true;
          return;
        }
        if (item.currencyCount < item.withdrawalLimit) {
          // this.withdrawErrorMsg = `${item.currencyName}残高は${item.withdrawalLimit}を上回る場合、引出は可能です`;
          this.withdrawErrorMsg = `残高が不足しております。恐れ入りますが、再度ご確認ください。`;
          this.withdrawErrorDialogVisible = true;
          return;
        }
        this.currentOperatingAccount = item;
        const currencyId = item.currencyId;
        AccountAPI.userAccountCurrencyInfo(currencyId)
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
          .then(toPromise)
          .then(() => {
            if (withdrawNumber <= 0) {
              return Promise.reject({msg: '無効な引出額'});
            }
            this.cryptoLoading = true;
            return true;
          })
          .then(() => AccountAPI.userAccountCoin({
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
            this.cryptoDialogVisible = false;
            this.cryptoWithdraw = {};
            this.currentOperatingAccount = {};
            this.initPage();
            this.$message.success('お引き出しの手続きが完了致しました');
          })
          .catch(err => {
            this.cryptoLoading = false;
            if (err && err.code === '100101') {
              let method = this.verifyMethod === 1 ? 'SNS' : 'メールアドレス';
              err.msg = method + '検証コードは正しくない';
            }
            errorHandler(err);
          });
      },
      withdrawInputHandler() {
        let num = this.cryptoWithdraw.num;

        this.$nextTick(() => {
          this.cryptoWithdraw.num = num.replace(/[^\d.]/g, '').substring(0, num.indexOf('.') + 5);
        });
      },
      withdrawBlurHandler() {
        const max = +(this.currentOperatingAccount.currencyCount).toFixed(4);
        const min = this.currentOperatingAccount.withdrawalLimit;
        let num = this.cryptoWithdraw.num;
        if (isNaN(parseFloat(num))) {
          num = min;
        } else {
          num = parseFloat((+num).toFixed(4));
        }
        if (+num > max) {
          num = max;
        }
        if (+num < min) {
          num = min;
        }
        this.$nextTick(() => {
          this.cryptoWithdraw.num = num;
        });
      },
      showAddAddressTip(currency) {
        const html = `
          <div class="tip-info">
            <p style="font-size: 14px;color: #303137;">引き出しの${currency}アドレスを登録してください！</p>
            <span style="font-size: 12px;color: #969699;">${currency}アドレスを登録してから引き出しができます。</span>
          </div>
        `;
        this.$alert(html, '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '登録へ',
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
            <p style="font-size: 14px;color: #303137;">Google Authenticatorをご設定ください！</p>
            <span style="font-size: 12px;color: #969699;">より安全にお取引をしていただくため、２段階認証の設定をお願い致します。</span>
          </div>
        `;
        this.$alert(html, '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '設定する',
          type: 'warning',
          closeOnClickModal: true
        })
          .then(() => {
            this.$router.push('/i/safety/bind-authenticator');
          })
          .catch(() => {
          });
      },
      // 发送验证码
      sendVerifyCode() {
        const account = this.verifyMethod === 1 ? this.userInfo.mobile : this.userInfo.mailboxAccount;
        this.sendCodeBtnLoading = true;
        this.sendCodeBtnDisabled = true;
        const currencyName = this.currentOperatingAccount.currencyName;
        UserAPI.smsCode({account, type: VerifyCodeType.WITHDRAWAL_CURRENCY, currencyName})
          .then(res => res || {})
          .then(codeToken => {
            this.smsCodeToken = codeToken;
            this.$message.success('認証コードを送信しました');
            CountDown(60)
              .start((t) => {
                this.sendCodeBtnText = t + 's';
              })
              .end(() => {
                this.sendCodeBtnText = '認証コードを送信';
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnLoading = false;
              });
          })
          .catch(err => {
            errorHandler(err);
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeBtnText = '認証コードを送信';
          });
      },
      changeAddress(address) {
        this.$set(this.currentOperatingAccount, '_selectedAddress', address);
      },
      billPay() {
        if (this.billAmount <= 0) {
          return;
        }
        this.$router.push('/pay?amount=' + this.billAmount + '&source=2');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/style/form";

  .el-select {
    width: 100%;
  }

  .SmsCodes {
    position: relative;
    .buttonBox {
      position: absolute;
      right: 3px;
      top: 8px;
      padding-left: 6px;
      border-left: 1px solid #E3EAF1;
      .el-button {
        padding: 0;
      }
    }
  }

  .headerContent {
    padding: 0px 18px 0px 30px;
    position: relative;
    font-size: 14px;
    color: #969699;
    .c-section__title {
      padding-right: 12px;
      color: #303137;
    }
  }

  .headerContentInner {
    padding: 0 30px 0 20px;
    background: #FAFAFA;
  }

  .headerContentInnerCon {
    padding: 30px 0 30px 0;
    .title {
      font-size: 14px;
      color: #606166;
      padding-bottom: 22px;
      line-height: 19px;
    }
    .costPrcie {
      font-size: 30px;
      color: #FD7220;
      line-height: 38px;
      font-weight: bold;
    }
    .historyListBtn {
      font-size: 14px;
      color: #4185F5;
      line-height: 19px;
      font-weight: bold;
      margin-top: 50px;
      cursor: pointer;
      display: block;
    }
  }

  .headerContentInnerConDown {
    display: flex;
    justify-content: space-between;
    .btn {
      min-width: 86px;
      padding-bottom: 7px;
      padding-top: 7px;
    }
  }

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
    line-height: 25px;
    padding-top: 15px;
    margin-left: 15px;
  }

  .el-dropdown-link {
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
    border: 0;
  }
</style>
