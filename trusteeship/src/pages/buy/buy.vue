<template>
  <div class="container">
    <div class="buy-container">
      <app-breadcrumbs class="breadcrumb"/>
      <el-table :highlight-current-row="false" :data="goodsList" class="tb-order row-hover-disabled">
        <el-table-column label="商品信息" width="500">
          <template slot-scope="scope">
            <div class="product-info">
              <div class="product-img">
                <img :src="scope.row.imageUrl" alt="">
              </div>
              <div class="product-desc">
                <p>{{scope.row.goodsName}}</p>
                <p>{{scope.row.goodsSubTitle}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发货时间" align="left" width="234">
          <template slot-scope="scope">
            <div class="send-time">
              <p>{{scope.row.startSendTime | date('YYYY年M月D日')}}</p>
              <p class="text-center">-</p>
              <p>{{scope.row.endSendTime | date('YYYY年M月D日')}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="count" align="left" width="233"/>
        <el-table-column label="小计" align="right" width="233">
          <template slot-scope="scope">
            <p class="text-right">{{scope.row.subTotal | currency}}元</p>
          </template>
        </el-table-column>
      </el-table>
      <dl class="notes">
        <div class="notes__item">
          <dt class="notes__label">
            <div class="label__inner">选择收货地址</div>
          </dt>
          <dd class="notes__content">
            <el-radio class="radio" name="address" v-model="selectedAddressId"
                      v-for="item in addressList" :label="item.id" :key="item.id">
              <span class="receive-address">{{strToArea(item.revAddress) + strToAddrDetail(item.revAddress)}}</span>
              <span class="receive-name">{{item.revName}}</span>
              <span class="receive-mobile">{{item.revMobile}}</span>
            </el-radio>
            <el-button class="btn-add" type="text" v-if="!addressList||addressList&&addressList.length<10"
                       @click="addressDialogVisible=true">+添加收货地址
            </el-button>
          </dd>
        </div>
        <div class="notes__item">
          <dt class="notes__label">
            <div class="label__inner">备注</div>
          </dt>
          <dd class="notes__content">
            <textarea placeholder="此处填写您对订单的其他要求" v-model="remark"></textarea>
          </dd>
        </div>
      </dl>
      <div class="summary">
        <div class="declaration">
          <h5>请您仔细阅读以下提示:</h5>
          <p>1、您所购买的商品不属于生活消费品，不适用《中华人民共和国消费者权益保护法》、《网络交易管理办法》等规定。</p>
          <p>2、您所购买的商品不同于生活消费类电子产品，而是根据客户需求特殊定制的、用于投资的产品。市场有风险，收益受算力难度、市场币价等多重因素影响，投资需谨慎。</p>
          <p>3、无论当前您的矿机是否发货，您付款后均不能退款、退货、换货。</p>
          <p>在您点击提交订单之前，请您认真阅读并遵守本网站各项条款及上述风险提示。您点击提交订单后，即视为您完全接受本网站各项条款及上述风险提示，能够独立承担法律责任。</p>
        </div>
        <div class="summary__content">
          <dl class="summary-info">
            <div class="summary-info__item">
              <dt>商品总金额</dt>
              <dd>{{summaryInfo.totalAmount | currency}}元</dd>
            </div>
            <div class="summary-info__item">
              <dt>运费</dt>
              <dd>{{0 | currency}}元</dd>
            </div>
            <div class="summary-info__item">
              <dt>优惠金额</dt>
              <dd>
                <template v-if="summaryInfo.reliefAmount!==0">
                  <span class="money">-{{summaryInfo.reliefAmount | currency}}元</span>
                </template>
                <template v-else>
                  <span>暂无优惠</span>
                </template>
              </dd>
            </div>
            <div class="summary-info__item total">
              <dt>应付总金额</dt>
              <dd>{{summaryInfo.actualAmount | currency}}元</dd>
            </div>
            <div class="summary-info__item mall-lines">
              <dt>
                <el-checkbox v-model="isAgree">同意
                  <router-link to="presale-contract" target="_blank">《预售合同》</router-link>
                </el-checkbox>
              </dt>
            </div>
          </dl>
          <el-button class="btn-submit" type="primary" @click="orderSubmitBefore">提交订单</el-button>
        </div>
      </div>
      <el-dialog title="收货地址" :visible.sync="addressDialogVisible" width="600px">
        <div class="address__infos">
          <div class="address__item">
            <span>所在地区</span>
            <div class="area-group">
              <select v-model="selectedProvince" title="">
                <option :value="{}">省份</option>
                <option :value="province" v-for="province in areaData" :key="province.provinceName">
                  {{province.provinceName}}
                </option>
              </select>
              <select v-model="selectedCity" title="">
                <option :value="{}">市</option>
                <option :value="city" v-for="city in selectedProvince.cityList" :key="city.cityCode"
                        v-if="selectedProvince&&selectedProvince.cityList">
                  {{city.cityName}}
                </option>
              </select>
              <select v-model="selectedArea" title="">
                <option :value="{}" selected>市/地级区</option>
                <option :value="area" v-for="area in selectedCity.areaList" :key="area.areaCode"
                        v-if="selectedCity&&selectedCity.areaList">
                  {{area.areaName}}
                </option>
              </select>
            </div>
          </div>
          <div class="address__item">
            <span>详细地址</span>
            <input class="detail" type="text" v-validate="'required'" name="detail" placeholder="填写详细地址"
                   @focus="errors.remove('detail')" v-model="addressInfo.detail"/>
            <p class="error" v-if="errors.has('detail')">{{errors.first('detail')}}</p>
          </div>
          <div class="address__item">
            <span>收货人姓名</span>
            <input type="text" v-validate="'required'" name="name" placeholder="填写收货人姓名"
                   @focus="errors.remove('name')" v-model="addressInfo.name"/>
            <p class="error" v-if="errors.has('name')">{{errors.first('name')}}</p>
          </div>
          <div class="address__item">
            <span>手机号</span>
            <input type="text" v-validate="'required|phone'" name="phone" placeholder="填写手机号"
                   @focus="errors.remove('phone')" v-model="addressInfo.phone"/>
            <p class="error" v-if="errors.has('phone')">{{errors.first('phone')}}</p>
          </div>
          <div class="address__item default">
            <el-checkbox v-model="addressInfo.setDefault">设为默认收货地址</el-checkbox>
          </div>
          <el-button class="btn-save" type="primary" size="medium" @click="save" :loading="isSaving">
            {{isSaving ? '保存中' : '保存'}}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="订单确认" :visible.sync="safeAuthDialog" custom-class="order-confirm custom"
                 width="420px" @close="errors.clear('safeAuthForm')">
        <p class="tips">购买须知：虚拟货币受算力难度、币价等多重因素影响。矿机为特殊定制的、用于投资的产品，不退不换。</p>
        <form class="form-wrap" data-vv-scope="safeAuthForm" @submit.prevent>
          <div class="label">
            <span>验证方式</span>
            <el-select v-model="mode" placeholder="请选择验证方式" class="drop-down-box">
              <el-option
                v-for="item in modeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <label class="clearfix">
            <span>验证码</span>
            <input name="code" v-validate="'required|code'" @focus="errors.remove('code','safeAuthForm')"
                   class="code-ipt left"
                   v-model="safeAuthForm.code" type="text"
                   :placeholder="`输入${mode == 0 ? '邮箱': '短信' }中的验证码`" maxlength="6">
            <el-button class="send-code left" type="text" :disabled="sendCodeBtnDisabled" :loading="sendCodeBtnLoading"
                       @click="sendCode">{{sendCodeBtnText}}
            </el-button>
            <p class="err-info" v-show="errors.has('safeAuthForm.code')">{{errors.first('safeAuthForm.code')}}</p>
          </label>
        </form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="safeAuthForm.code == ''" @click="orderSubmit"
                     :loading="passwordFormBtnLoading">提交</el-button>
        </span>
      </el-dialog>
    </div>
    <x-features/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import AddressAPI from '../../services/address-api';
  import XFeatures from '../../components/x-features';
  import OrderAPI from '../../services/order-api';
  import errorHandler from '../../services/error-handler';
  import CommonAPI from '../../services/common-api';

  export default {
    components: {XFeatures},
    computed: {
      ...mapState({
        preOrderInfos: 'preOrderGoods',
        userInfo: 'userInfo'
      }),
      relief() {
        return (this.preOrderInfos || {}).relief || {};
      },
      goodsList() {
        return (this.preOrderInfos || {}).goods || [];
      },
      summaryInfo() {
        const info = this.preOrderInfos || {};
        return {
          totalAmount: info.total_amount || 0,
          actualAmount: info.actual_amount || 0,
          reliefAmount: info.relief_amount || 0
        };
      }
    },
    data() {
      return {
        selectedAddressId: '',
        addressList: [],
        isAgree: true,
        remark: '',
        areaData: [],
        selectedProvince: {},
        selectedCity: {},
        selectedArea: {},
        addressInfo: {},
        addressDialogVisible: false,
        isSaving: false,
        safeAuthDialog: false,
        //验证方式  0:邮箱 1:短信
        mode: 0,
        modeList: [],
        safeAuthForm: {
          code: ''
        },
        sendCodeBtnDisabled: false,
        sendCodeBtnLoading: false,
        sendCodeBtnText: '发送验证码',
        passwordFormBtnLoading: false,
        timer: null
      };
    },

    methods: {
      strToArea(addressStr) {
        return addressStr.split('#').slice(0, 3).join('');
      },
      strToAddrDetail(addressStr) {
        // 防止用户地址详情中有#号的情况
        return addressStr.split('#').slice(3).join('#');
      },
      initPage() {
        this.loadAddressList();
        CommonAPI.area()
          .then(res => {
            this.areaData = res;
          });
      },
      loadAddressList() {
        AddressAPI.get()
          .then(res => res.result || [])
          .then(res => {
            res.sort((a, b) => a.status - b.status);
            this.addressList = res;
            if (res.length > 0) {
              this.selectedAddressId = res[0].id;
            }
          })
          .catch();
      },
      save() {
        this.$validator.validateAll()
          .then(res => {
            if (res) {
              return res;
            }
            const errMsg = this.errors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            const province = this.selectedProvince.provinceName;
            const city = this.selectedCity.cityName;
            const area = this.selectedArea.areaName;
            const address = this.addressInfo;
            if (!province || !city || !area) {
              return Promise.reject({msg: '无效的地址信息'});
            }
            return {
              address: province + '#' + city + '#' + area + '#' + address.detail,
              name: address.name,
              mobile: address.phone,
              setDefault: address.setDefault
            };
          })
          .then(({address, mobile, name, setDefault}) => {
            this.isSaving = true;
            return AddressAPI.add(address, mobile, name, setDefault);
          })
          .then(() => {
            this.isSaving = false;
            this.addressDialogVisible = false;
            this.clearAddressData();
            this.$message.success('保存成功');
            this.loadAddressList();
          })
          .catch(err => {
            this.isSaving = false;
            errorHandler(err);
          });
      },
      clearAddressData() {
        this.selectedProvince = {};
        this.addressInfo = {};
      },
      orderSubmitBefore() {
        if (!this.selectedAddressId) {
          return this.$message.error('请先选择收货地址');
        }
        if (!this.isAgree) {
          return this.$message.error('请先同意预售合同');
        }
        if (this.modeList.length === 0) {
          this.getModeList();
        }
        this.safeAuthDialog = true;
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
            if (this.goodsList.length < 1) {
              return Promise.reject(null);
            }
            const params = {};
            params.batchGoodsIds = [];
            params.goodsCounts = [];
            this.goodsList.forEach(item => {
              params.batchGoodsIds.push(item.id);
              params.goodsCounts.push(item.count);
            });
            params.addressId = this.selectedAddressId;
            params.remark = this.remark;
            params.authCode = this.safeAuthForm.code;
            params.submitType = this.$route.query.source === 'cart';
            return OrderAPI.submit(params);
          })
          .then(({orderNo}) => {
            this.$router.replace({path: '/pay', query: {orderNo}});
          })
          .catch(errorHandler);
      },
      sendCode() {
        let params = {
          countryNum: '',
          account: ''
        };
        if (this.mode === 1) {
          params.countryNum = this.userInfo.countryNum;
          params.account = this.userInfo.moblie;
        } else {
          params.countryNum = '';
          params.account = this.userInfo.mailboxAccount;
        }
        this['sendCodeBtnLoading'] = true;
        this['sendCodeBtnText'] = '';
        OrderAPI.orderSms(params)
          .then(res => res || {})
          .then(res => res.result || '')
          .then(res => {
            this.$message({
              type: 'success',
              message: '发送成功',
              showClose: true
            });
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = true;
            let t = 60;
            this.sendCodeBtnText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeBtnText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '重新发送';
                clearInterval(this['timer']);
              }
            }, 1000);
          }).catch(error => {
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
      getModeList() {
        this.modeList = [];
        if (this.userInfo.mailboxAccount) {
          this.modeList.push({
            type: '邮箱验证',
            label: '邮箱验证   ' + this.hideEmail(this.userInfo.mailboxAccount, 3),
            value: 0
          });
          this.mode = 0;
        }
        if (this.userInfo.moblie) {
          this.modeList.unshift({
            type: '手机验证',
            label: '手机验证   ' + (this.userInfo.countryNum ? this.userInfo.countryNum + ' ' : '') + this.hidePhone(this.userInfo.moblie, 3, 7),
            value: 1
          });
          this.mode = 1;
        }
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
    },
    watch: {
      selectedProvince() {
        this.selectedCity = {};
      },
      selectedCity() {
        this.selectedArea = {};
      }
    },
    created() {
      this.initPage();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>

<style scoped lang="scss">
  @import "../../style/variables";

  .container {
    height: 100%;
    background-color: #f6f6f6;
  }

  .buy-container {
    max-width: 1200px;
    margin: 0 auto 50px;
    min-height: calc(100vh - 160px - 188px - 114px - 60px);
  }

  .breadcrumb {
    line-height: 36px;
    background-color: #f6f6f6;
  }

  .product-info {
    padding-left: 35%;
    position: relative;
    min-height: 110px;
  }

  .product-img {
    position: absolute;
    border: 1px solid #EDEEF0;
    height: 100px;
    width: 100px;
    line-height: 98px;
    font-size: 0;
    left: 0;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 80%;
      vertical-align: middle;
      display: inline-block;
    }
  }

  /*.product-img {*/
  /*position: absolute;*/
  /*left: 0;*/
  /*max-height: 100px;*/
  /*max-width: 33.3%;*/
  /*}*/

  .product-desc {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    text-align: left;
  }

  .product-desc p:first-child {
    font-weight: bold;
    color: #303030;
  }

  .product-desc p:last-child {
    color: #999;
  }

  .send-time {
    text-align: left;
    float: left;
  }

  .num-box {
    position: relative;
    display: inline-block;
    margin-right: 1em;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 40px;
    border: 1px solid #efefef;
  }

  .num-box span {
    position: absolute;
    top: 0;
    display: inline-block;
    text-align: center;
    width: 40px;
    background-color: #efefef;
    cursor: pointer;
  }

  .num-box span:first-child {
    left: 0;
  }

  .num-box span:last-child {
    right: 0;
  }

  .num-box input {
    width: 80px;
    line-height: 40px;
    border: none;
    padding: 0;
    vertical-align: top;
    text-align: center;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;

  }

  .remove {
    font-size: 18px;
    cursor: pointer;
  }

  .notes {
    padding: 30px;
    background-color: #fff;
    border-bottom: 1px solid #EDEEF0;;
  }

  .notes__item {
    position: relative;
    font-size: 0;

    & + .notes__item {
      margin-top: 30px;
    }
  }

  .notes__item dt,
  .notes__item dd {
    display: inline-block;
    font-size: 16px;
    color: #303137;
  }

  .notes__label {
    position: absolute;
    left: 0;
    top: 0;
    font-weight: bold;
    width: 120px;
    height: 100%;
  }

  .label__inner {
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
  }

  .notes__content {
    margin-left: 120px;
    line-height: 50px;
  }

  .radio {
    display: block;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 20px;
    margin-left: 0;
  }

  .receive-address,
  .receive-name,
  .receive-mobile {
    font-size: 16px;
  }

  .receive-name {
    margin-left: 1em;
  }

  .receive-mobile {
    margin-left: 1em;
  }

  .btn-add {
    font-size: 16px;
    font-weight: bold;
    padding: 0;
    line-height: 20px;
  }

  textarea {
    resize: none;
    border: 1px solid #ececec;
    outline: none;
    padding: 10px;
    line-height: 1.2;
    font-size: 14px;
    width: 600px;
    height: 104px;
    vertical-align: top;
  }

  .summary {
    padding-left: 150px;
    padding-top: 30px;
    padding-bottom: 50px;
    background-color: #fff;
    font-size: 0;
  }

  .declaration {
    display: inline-block;
    padding: 15px 15px 30px;
    width: 600px;
    background-color: #fafafa;

    p {
      font-size: 12px;
      line-height: 20px;
    }
  }

  .summary__content {
    display: inline-block;
    padding-left: 30px;
    vertical-align: top;
  }

  .summary-info {

  }

  .summary-info__item {
    color: #969699;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 19px;
    dt, dd {
      display: inline-block;
      vertical-align: top;
    }
    dt {
      min-width: 7em;
    }
  }

  .money {
    color: #fd7220;
  }

  .total {
    dt {
      color: #303137;
    }
    dd {
      font-size: 18px;
      color: #FD7220;
      font-weight: bold;
    }
  }

  .mall-lines {
    padding-top: 39px;
  }

  .btn-submit {
    width: 168px;
    border-radius: 0;
  }

  .coupon-info {
    padding: 5px 10px;
  }

  .coupon-info__detail {
    font-size: 14px;
    color: #606166;
    line-height: 20px;
  }

  .coupon-info__desc {
    font-size: 12px;
    line-height: 20px;
    color: #969699;
  }

  .show-detail {
    margin-left: 10px;
    cursor: pointer;
  }

  .area-group {
    display: inline-block;
  }

  select {
    width: 135px;
    height: 36px;
    font-size: 14px;
    border: 1px solid #eee;
  }

  select + select {
    margin-left: 7px;
  }

  input[type='text'] {
    width: 200px;
    height: 36px;
    font-size: 14px;
    padding-left: 10px;
    border: 1px solid #eee;
  }

  input[type="text"]::placeholder {
    color: #ccc;
  }

  input.detail {
    width: 425px;
  }

  .address__infos {
    padding: 10px;
  }

  .address__item {
    position: relative;
    margin-bottom: 20px;

    .error {
      position: absolute;
      font-size: 12px;
      line-height: 20px;
      padding-left: 110px;
      color: $danger;
    }
  }

  .address__infos span {
    display: inline-block;
    width: 100px;
    font-size: 14px;
    color: #333;
  }

  .btn-save {
    margin-left: 105px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .default {
    margin-left: 100px;
  }

  .option {
    display: inline-block;
    cursor: pointer;

    &.del {
      color: $danger;
    }
    &.edit {
      color: $info;
    }

    &.default {
      margin-left: 1em;
      color: $info;
    }
  }

  .tips {
    line-height: 20px;
    font-size: 12px;
    color: #999696;
  }

  .form-wrap {
    margin-top: 20px;

    .err-info {
      min-height: 20px;
      font-size: 12px;
      color: #f95453;
      line-height: 20px;
      margin-top: -20px;
      position: relative;
      top: 20px;
    }
    label, .label {
      margin-bottom: 20px;
      display: block;
      position: relative;
      padding-left: 74px;
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
        width: calc(100% - 84px);
      }
      .send-code {
        width: 84px;
        min-width: 84px;
        height: 36px;
      }
    }
  }

</style>
