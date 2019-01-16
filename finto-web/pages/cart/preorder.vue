<template>
  <div class="order">
    <div class="order-container">
      <div class="breadcrumb">
        <x-breadcrumb></x-breadcrumb>
      </div>
      <div class="order-trusteeship" v-if="productListTree.length>0">
        <div class="common-title">
          <h3>ご注文内容の確認（マイニングサービス）</h3>
        </div>
        <x-order :productList="productListTree"></x-order>
      </div>
      <div class="order-delivery" v-if="productListDelivery.length>0">
        <h3 class="common-title">ご注文内容の確認（配送）</h3>
        <x-order :productList="productListDelivery"></x-order>
      </div>
      <div class="delivery-address" v-if="productListDelivery.length>0">
        <h3 class="common-title">お届け先を選択</h3>
        <div class="address-list">
          <el-radio v-for="(address,index) in addressList"
                    :key="index"
                    v-model="selectedAddress"
                    :label="address.id"
                    class="radio">
            <span class="receive-revPostcode">{{strAddress(address.revPostcode)}}</span>
            <span class="receive-revPrefecture">{{address.revPrefecture}}</span>
            <span class="receive-revAddress">{{address.revAddress}}</span>
            <span class="receive-revName">{{address.revName}}</span>
            <span class="receive-mobile">{{address.revMobile}}</span>
          </el-radio>
          <el-button type="text" class="addAddress" @click="addressDialog=true">+新しいお届け先を登録する</el-button>
        </div>
      </div>
      <div class="order-remark">
        <h3 class="common-title">備考</h3>
        <div class="order-textarea">
          <textarea v-model="orderReamrk" placeholder="その他ご要望などございましたら、ご入力ください。"></textarea>
        </div>
      </div>
      <div class="order-detail clearfix">
        <div class="left tip">
          <contract></contract>
        </div>
        <div class="left">
          <dl>
            <dt>合計金額</dt>
            <dd>{{preOrderGoods.goodsTotalAmount|currency}}円</dd>
          </dl>
          <dl v-if="productListDelivery.length>0">
            <dt>送料</dt>
            <dd>{{expressTotalAmount|currency}}円</dd>
          </dl>
          <dl v-if="productListTree.length>0">
            <dt>委託費用</dt>
            <dd>{{trustTotalAmount|currency}}円</dd>
          </dl>
          <dl class="order-money">
            <dt>支払い総額</dt>
            <dd>{{preOrderGoods.allTotalAmount|currency}}円</dd>
          </dl>
          <div class="isAgree isAgreePreorder">
            <el-checkbox v-model="isAgree" >マイニング規約に同意する</el-checkbox>
          </div>
          <div class="contract">アカウント規約は
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
          <span>{{mode===0?'メール認証':'SMS認証'}}</span>
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
    <x-address title="新しいお届け先を登録する" :visible="addressDialog" @close="closeDialog" @addSuccess="addSuccess"></x-address>
  </div>
</template>
<script>
  import XFeatures from '../../components/x-features';
  import XAddress from '../../components/x-address.vue';
  import {mapState} from 'vuex';
  import {toPromise, getStore} from '../../services/utils';
  import XOrder from '../../components/x-order';
  import errorHandler from '../../services/error-handler';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import AddressApi from '../../services/address';
  import UserAPI from '../../services/user-api';
  import OrderAPI from '../../services/order-api';
  import {UPDATE_CARTNUM, UPDATE_TRACKER_GOODS_ITEM} from '../../store/mutation-types';
  import Contract from './contract.vue';

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
      XAddress,
      XBreadcrumb,
      Contract
    },
    breadcrumb() {
      return {
        label: 'ご注文内容の確認',
        parentsList: [
          {
            label: 'マイニング機器',
            path: ''
          },
          {
            label: 'カート',
            path: '/cart'
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
        addressList: [],
        preOrderGoods: {},
        addressDialog: false,
        selectedAddress: '',
        orderReamrk: '',
        isAgree: true,
        safeAuthDialog: false,
        addressInfor: {
          code: '',
          codeNum: '',
          province: '',
          address: '',
          name: '',
          phone: ''
        },
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
        trackerGoodsItems: []
      };
    },

    mounted() {
      this.preOrderGoods = JSON.parse(getStore('pre_order_goods') || '{}');
      this.initPge();
    },
    methods: {
      addSuccess() {
        this.loadAddressList();
      },
      initPge() {
        this.loadAddressList();
      },
      loadAddressList() {
        AddressApi.getAddressList()
          .then(res => res.result || [])
          .then(result => {
            result.sort((a, b) => a.status - b.status);
            this.addressList = result;
            if (result.length > 0) {
              this.selectedAddress = result[0].id;
            }
          })
          .catch(errorHandler);
      },
      strAddress(address) {
        return address.substring(0, 3) + '-' + address.substr(3);
      },
      closeDialog(val) {
        this.addressDialog = val;
      },
      orderSubmitBefore() {
        if (!this.selectedAddress && this.productListDelivery.length > 0) {
            return this.$message.error('お届け先を選んでください');
        }
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
            if (this.productListTree.length < 1 && this.productListDelivery < 1) {
              return Promise.reject(null);
            }
            const params = {};
            params.orderGoodsVos = [];
            params.remark = this.orderReamrk;
            params.token = this.token;
            params.addressId = this.selectedAddress === '' ? 0 : this.selectedAddress;
            params.authCode = this.safeAuthForm.code;
            params.codeToken = this.codeToken;
            this.trackerGoodsItems = [];
            this.productListTree.forEach(item => {
              params.orderGoodsVos.push({
                batchGoodsId: item.id,
                serviceType: 2,
                goodsCount: item.count
              });
              this.trackerGoodsItems.push({
                skuId: item.id,
                skuName: item.goodsName,
                category: '矿机',
                Price: item.smallAmount + item.serviceSmallAmount,
                Quantity: item.count
              });
            });
            this.productListDelivery.forEach(item => {
              params.orderGoodsVos.push({
                batchGoodsId: item.id,
                serviceType: 1,
                goodsCount: item.count
              });
              this.trackerGoodsItems.push({
                skuId: item.id,
                skuName: item.goodsName,
                category: '矿机',
                Price: item.smallAmount + item.serviceSmallAmount,
                Quantity: item.count
              });
            });
            params.orderSubmitSource = 2;

            return OrderAPI.submitOrderVertify(params);
          })
          .then((res) => {
            this.$store.commit(UPDATE_CARTNUM, 0);
            this.$store.commit(UPDATE_TRACKER_GOODS_ITEM, {
              id: res.result,
              items: this.trackerGoodsItems
            });
            // todo： 算力加判断source传1
            this.$router.replace({path: '/pay', query: {orderNo: res.result, source: 0, c: this.safeAuthForm.code}});
          })
          .catch(errorHandler);
      },
      getModeList() {
        this.modeList = [];
        if (this.userInfo.mailboxAccount) {
          this.modeList.push({
            type: 'メールで認証する',
            label: this.hideEmail(this.userInfo.mailboxAccount, 3),
            value: 0
          });
        }
        if (this.userInfo.mobile) {
          this.modeList.unshift({
            type: '携帯認証',
            label: this.hidePhone(this.userInfo.mobile, 3, 7),
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

  .address-list {
    padding: 20px 0 20px 30px;
    background: #fff;
  }

  .delivery-address .radio {
    display: block;
    font-size: 16px;
    color: #303030;
    margin-left: 0;
    margin-bottom: 20px;
    .receive-revName {
      margin-right: 20px;
      margin-left: 40px;
    }
    .receive-revAddress, .receive-revPrefecture, .receive-revPostcode {
      margin-left: 10px;
    }
  }

  .addAddress {
    font-size: 16px;
    color: #4D87EA;
    font-weight: bold;
    padding: 0;
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
    margin-top: 30px;
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

  .contract {
    font-size: 14px;
    padding-left: 24px;
    padding-top: 5px;
    .nuxtLink {
      color: #4D87EA;
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
  .isAgreePreorder {
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

