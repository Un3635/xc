<template>
  <div class="order">
    <div class="order-container">
      <div class="breadcrumb">
        <x-breadcrumb></x-breadcrumb>
      </div>
      <div class="order-delivery" v-if="hashOrderList.length>0">
        <h3 class="common-title">ご注文内容</h3>
        <x-order :productList="hashOrderList" :hashOrder="hashorder"></x-order>
      </div>
      <div class="order-detail clearfix">
        <div class="left tip">
          <hash-contract></hash-contract>
        </div>
        <div class="left">
          <dl>
            <dt>小　計</dt>
            <dd>{{goodsSalePrice*count|currency}}円</dd>
          </dl>
          <dl>
            <dt>消費税</dt>
            <dd>{{Math.ceil(goodsSalePrice*count*this.tax/100)|currency}}円</dd>
          </dl>
          <dl class="order-money">
            <dt>合　計</dt>
            <dd>{{Math.ceil(goodsSalePrice*count+goodsSalePrice*count*this.tax/100)|currency}}円</dd>
          </dl>
          <div class="isAgree isAgreeHash"><el-checkbox v-model="isAgree">クラウドマイニング利用規約に同意する</el-checkbox></div>
          <div class="contract">アカウント利用規約は
            <nuxt-link :to="{path:'/rules/register'}" target="_blank"
                       class="nuxtLink">こちらへ
            </nuxt-link>
          </div>
          <el-button type="primary" class="order-btn-confirm" @click="orderSubmitBefore">注文確認</el-button>
        </div>
      </div>
    </div>
    <x-features></x-features>
    <el-dialog title="ご注文確認" :visible.sync="safeAuthDialog" custom-class="order-confirm custom"
               width="420px" @close="errors.clear('safeAuthForm')">
      <form class="form-wrap" data-vv-scope="safeAuthForm" @submit.prevent>
        <div class="label">
          <span>{{mode===0?'メール認証':'携帯認証'}}</span>
          <el-select v-model="mode" placeholder="認証方法を選んでください" class="drop-down-box">
            <el-option
              v-for="item in modeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <label class="clearfix">
          <span>認証コード</span>
          <input name="code" v-validate="'required|code'" @focus="errors.remove('code','safeAuthForm')"
                 class="code-ipt left"
                 v-model="safeAuthForm.code" type="text"
                 placeholder="数字６桁の認証コード" maxlength="6">
          <el-button class="send-code left" type="text" :disabled="sendCodeBtnDisabled" :loading="sendCodeBtnLoading"
                     @click="sendCode">{{sendCodeBtnText}}
          </el-button>
          <p class="err-info" v-show="errors.has('safeAuthForm.code')">{{errors.first('safeAuthForm.code')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="safeAuthForm.code == ''" @click="orderSubmit"
                     :loading="passwordFormBtnLoading">注文を確認する</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import XFeatures from '../../components/x-features';
  import {mapState} from 'vuex';
  import {toPromise, getStore, removeStore} from '../../services/utils';
  import XOrder from '../../components/x-order';
  import errorHandler from '../../services/error-handler';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import UserAPI from '../../services/user-api';
  import HashAPI from '../../services/hash-api';
  import GoodsAPI from '../../services/goods-api';
  import {UPDATE_CARTNUM} from '../../store/mutation-types';
  import HashContract from './hash-contract.vue';

  export default {
    head() {
      return {
        title: '注文照会_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    inject: ['$validator'],
    components: {
      XFeatures,
      XOrder,
      XBreadcrumb,
      HashContract
    },
    breadcrumb() {
      return {
        label: 'ご注文内容の確認',
        parentsList: [
          {
            label: 'クラウドマイニング',
            path: '/hash'
          }
        ]
      };
    },
    computed: {
      ...mapState(['userInfo', 'token', 'cartNum']),
      productListTree() {
        return this.preOrderGoods.trustGoodsVos || [];
      },
      productListDelivery() {
        return this.preOrderGoods.expressGoodsVos || [];
      },
      trustTotalAmount() {
        return this.preOrderGoods.trustTotalAmount || 0;
      },
      expressTotalAmount() {
        return this.preOrderGoods.expressTotalAmount || 0;
      }
    },
    data() {
      return {
        hashorder: false,
        preOrderGoods: {},
        isAgree: true,
        safeAuthDialog: false,
        safeAuthForm: {
          code: ''
        },
        modeList: [],
        mode: 0,
        sendCodeBtnText: '認証コードを送信',
        sendCodeBtnDisabled: false,
        sendCodeBtnLoading: false,
        passwordFormBtnLoading: false,
        codeToken: '',
        hashOrderList: [],
        goodsSalePrice: '',
        count: '',
        tax: 10
      };
    },

    mounted() {
      this.getGoodsTax();
      this.preOrderGoods = JSON.parse(getStore('HASHORDER') || '{}');
      this.goodsSalePrice = this.preOrderGoods.goodsSalePrice;
      this.count = this.preOrderGoods.count;
      this.hashOrderList.push(this.preOrderGoods);
    },
    methods: {
      getGoodsTax() {
        GoodsAPI.getGoodsTax()
          .then(res => {
            this.tax = res.result;
          })
      },
      orderSubmitBefore() {
        if (!this.isAgree) {
          return this.$message.error('アカウント規約への同意をお願い致します。');
        }
        if (this.modeList.length === 0) {
          this.getModeList();
        }
        this.safeAuthDialog = true;
      },
      sendCode() {
        let params = {
          type: 6,
          account: ''
        };
        if (this.mode === 1) {
          params.account = this.userInfo.mobile;
        } else {
          params.account = this.userInfo.mailboxAccount;
        }
        this['sendCodeBtnLoading'] = true;
        this['sendCodeBtnText'] = '';
        UserAPI.smsCode(params)
          .then(res => {
            this.codeToken = res;
          })
          .then(() => {
            this.$message.success('送信しました');
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = true;
            let t = 60;
            this.sendCodeBtnText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeBtnText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '再送信';
                clearInterval(this['timer']);
              }
            }, 1000);
          })
          .catch(err => {
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeBtnText = '再送信';
            errorHandler(err);
          });
      },
      orderSubmit() {
        this.$validator.validateAll('safeAuthForm')
          .then(res => {
            if (res) {
              return res;
            }
            return Promise.reject(null);
          })
          .then(() => {
            if (this.hashOrderList.length < 1) {
              return Promise.reject(null);
            }
            const params = {};
            params.goodsId = this.preOrderGoods.goodsId;
            params.token = this.token;
            params.goodsCount = this.count;
            params.codeToken = this.codeToken;
            params.authCode = this.safeAuthForm.code;
            return HashAPI.hashOrderSubmit(params);
          })
          .then((res) => {
            this.$router.replace({path: '/pay?source=1', query: {orderNo: res.result, c: this.safeAuthForm.code}});
            removeStore('HASHORDER');
          })
          .catch(errorHandler);
      },
      getModeList() {
        this.modeList = [];
        if (this.userInfo.mailboxAccount) {
          this.modeList.push({
            type: 'メールで認証する',
            label:this.hideEmail(this.userInfo.mailboxAccount, 3),
            value: 0
          });
        }
        if (this.userInfo.mobile) {
          this.modeList.unshift({
            type: '携帯認証',
            label:this.hidePhone(this.userInfo.mobile, 3, 7),
            value: 1
          });
        }
        this.mode = this.modeList[0].value;
      },
      hidePhone(str, start, end) {
        let endStr = str.substr(end);
        let startStr = str.substring(0, start);
        return startStr + '*'.repeat(end - start) + endStr;
      },
      hideEmail(str, start) {
        let arr = str.split('@');
        let startStr = str.substring(0, start);
        if (arr[0].length === 1) {
          return str;
        }
        if (arr[0].length - start <= 0) {
          return this.hideEmail(str, arr[0].length - start + 2);
        }
        return startStr + '*'.repeat(arr[0].length - start) + '@' + arr[1];
      }
    }

  };
</script>
<style lang="scss" scoped>
  .order {
    width: 100%;
    background-color: #f6f6f6;
  }

  .order-container {
    max-width: 1200px;
    margin: 0 auto 60px;
    min-height: calc(100vh - 160px - 188px - 114px - 60px);
    .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
    }
  }

  .common-title {
    font-size: 16px;
    color: #303030;
    margin: 30px 0 10px;
    h3 {
      display: inline-block;
      margin-right: 10px;
    }
  }

  .order-textarea {
    background: #fff;
    padding: 20px 20px 20px 30px;
    textarea {
      border: none;
      resize: none;
      width: 600px;
      height: 60px;
      font-size: 14px;
      outline: none;
    }
  }

  .order-detail {
    padding: 24px 0 24px 30px;
    background: #fff;
    .tip {
      padding: 24px 50px 24px 50px;
      background: #FAFAFA;
      width: 730px;
      height: 268px;
      margin-right: 51px;
      overflow-y: scroll;
    }
    .left {
      h3 {
        font-size: 12px;
        line-height: 20px;
      }
      p {
        font-size: 12px;
        color: #303030;
        line-height: 20px;
      }
      dl {
        margin-bottom: 10px;
      }
      dl:first-child {
        padding-top: 10px;
      }
      dd, dt {
        display: inline-block;
        margin-left: 0;
        font-size: 14px;
        color: #969699;
      }
      dt {
        min-width: 100px;
      }
    }
  }

  .isAgree {
    margin-top: 63px;
  }
  .contract{
    font-size:14px;
    padding-left:24px;
    padding-top:5px;
    .nuxtLink{
      color:#4D87EA;
      text-decoration: underline;
    }
  }

  .order-btn {
    width: 168px;
    height: 40px;
    padding: 0;
    text-align: center;
    margin-top: 10px;
  }

  .order-detail .order-money {
    margin-top: 22px;
    dt {
      color: #303137;
    }
    dd {
      font-size: 18px;
      color: #FD7220;
    }
  }

  .order-btn {
    width: 96px;
    height: 36px;
    font-size: 14px;
  }

  .order-btn-confirm {
    width: 168px;
    height: 40px;
    font-size: 14px;
    margin-top: 10px;
  }

  .order-phone button {
    font-size: 14px;
    color: #4D87EA;
    margin-left: 15px;
  }

  .tips {
    line-height: 20px;
    font-size: 12px;
    color: #999696;
  }

  .form-wrap {
    margin-top: 20px;
    padding-bottom: 10px;

    .err-info {
      font-size: 12px;
      color: #f95453;
      line-height: 20px;
      position: absolute;
      top: 36px;
      padding-left: 5px;
    }
    label, .label {
      margin-bottom: 20px;
      display: block;
      position: relative;
      padding-left: 100px;
      .drop-down-box {
        width: 100%;
      }
      > span,
      .drop-tag {
        left: 0;
        top: 0;
        line-height: 36px;
        font-size: 14px;
        color: #303137;
        position: absolute;
      }
      > input {
        height: 36px;
        line-height: 34px;
        border: 1px solid #EDEEF0;
        font-size: 12px;
        padding: 0 10px;
        width: 100%;
        transition: all 0.5s;
        &::-webkit-input-placeholder {
          color: #CCCDCF;
        }
        &:focus,
        &:hover {
          border-color: #ccc;
        }
      }
      .code-ipt {
        width: calc(100% - 120px);
      }
      .send-code {
        width: 112px;
        min-width: 112px;
        height: 36px;
        position: absolute;
        right: 0;
      }
    }
  }
</style>
<style lang="scss">
  .isAgreeHash {
    .el-checkbox__input {
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        border: 1px solid #4185F5;
        &:hover {
          border-color: #2A5CAA;
        }
        &:after {
          left: 5px;
          top: 2px;
        }
      }
      &.is-checked .el-checkbox__inner {
        background: #2A5CAA;
        border-color: #2A5CAA;
      }
    }
  }
</style>

