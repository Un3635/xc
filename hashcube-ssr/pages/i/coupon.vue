<template>
  <div class="page page-coupon">
    <h2 class="header">我的优惠券</h2>
    <div class="coupon-container">
      <div class="coupon-filters">
        <span class="coupon-filters-label">筛选:</span>
        <el-popover placement="bottom" width="130" trigger="click" v-model="statusPopoverActive">
          <ul class="filter-options">
            <li class="filter-options-item" v-for="item in statusList" :key="item.value"
                :class="{'active':filters.status.value===item.value}"
                @click="filters.status=item;statusPopoverActive=false">
              {{item.label}}
            </li>
          </ul>
          <span class="filters pointer" slot="reference" :class="{'active':statusPopoverActive}">
            {{filters.status.label}}<i class="el-icon-arrow-down"></i>
          </span>
        </el-popover>
        <el-popover placement="bottom" width="110" trigger="click"
                    v-model="typePopoverActive">
          <ul class="filter-options">
            <li class="filter-options-item" v-for="item in typeList"
                :key="item.value" :class="{'active':filters.type.value===item.value}"
                @click="filters.type=item;typePopoverActive=false">
              {{item.label}}
            </li>
          </ul>
          <span class="filters pointer" slot="reference" :class="{'active':typePopoverActive}">
            {{filters.type.label}}<i class="el-icon-arrow-down"></i></span>
        </el-popover>
        <div class="sub-filters-wrapper" v-if="filters.status.value===1">
          <span class="split-line">|</span>
          <ul class="sub-filters">
            <li class="sub-filters-item" :class="{active:filters.subFilter===0}" @click="filters.subFilter=0">新到账</li>
            <li class="sub-filters-item" :class="{active:filters.subFilter===2}" @click="filters.subFilter=2">即将到期</li>
            <li class="sub-filters-item" :class="{active:filters.subFilter===1}" @click="filters.subFilter=1">可转出</li>
          </ul>
        </div>
      </div>
      <ul class="coupon-list" v-if="couponList.length>0">
        <li class="coupon-item" v-for="(item,idx) in couponList" :key="idx">
          <div class="coupon-img">
            <div v-if="item.status>2">
              <img src="../../assets/images/coupon/default.png" alt="">
            </div>
            <div v-else>
              <img v-if="item.goodsType===1" src="../../assets/images/coupon/miner.png" alt="">
              <img v-if="item.goodsType===2" src="../../assets/images/coupon/hash.png" alt="">
            </div>
            <div class="coupon-info">
              <div class="coupon-status" :class="{'smaller':isCouponNotValid(item)||isCloseExpired(item)}">
                <img v-if="item.status===3" src="../../assets/images/coupon/label-used.png" alt="">
                <img v-if="item.status===4" src="../../assets/images/coupon/label-past.png" alt="">
                <img v-if="item.status===5" src="../../assets/images/coupon/label-roll-out.png" alt="">
                <img v-else-if="isCloseExpired(item)" src="../../assets/images/coupon/label-expire.png" alt="">
                <img v-else-if="isCouponNotValid(item)" src="../../assets/images/coupon/label-not-valid.png" alt="">
              </div>
              <h2 class="coupon-info-title" v-html="discountInfo(item)"></h2>
              <p class="coupon-info-type">{{item.type|couponType}}
                <el-popover :ref="uuid()" placement="bottom" width="440" trigger="click" @show="showSource(item)">
                  <div class="coupon-source">
                    <h2 class="coupon-source-title">转入信息</h2>
                    <table class="coupon-source-table">
                      <thead>
                      <tr>
                        <th>账号</th>
                        <th class="text-center">转入张数</th>
                        <th class="text-center">时间</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(sourceItem,si) in sourceList" :key="si">
                        <td>{{sourceItem.account}}</td>
                        <td class="text-center">{{sourceItem.count}}</td>
                        <td class="text-center">{{sourceItem.transferTime|date('YYYY-M-DD HH:mm:ss')}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <span class="coupon-info-label" slot="reference" v-if="item.source===1">转入</span>
                </el-popover>
              </p>
              <!--<p class="coupon-info-limit">满100元可用</p>-->
            </div>
          </div>
          <div class="coupon-details">
            <h2 class="coupon-title">购买{{item.couponRange===2?item.category:(item.goodsType===1?'矿机':'算力')}}可用
              <span class="right">×{{item.count}}张</span></h2>
            <el-row>
              <el-col :span="20">
                <p class="coupon-prop">
                  <span class="coupon-prop-key">优惠类型:</span>
                  <span class="coupon-prop-value">{{item.type|couponType}}</span>
                </p>
                <p class="coupon-prop">
                  <span class="coupon-prop-key">限定品类:</span>
                  <span class="coupon-prop-value">{{item.couponRange===1?'全部'+(item.goodsType===1?'矿机':'算力'):item.category}}
                    <el-popover placement="bottom" trigger="click" :key="uuid()">
                      <div class="coupon-limit">
                        <h4 class="coupon-limit-title">可使用该优惠券的{{item.goodsType===1?'矿机':'算力'}}</h4>
                        <ul class="coupon-limit-list">
                          <li class="coupon-limit-item">
                            <span class="limit-item-type">{{item.category}}</span>
                            <span class="limit-item-title">{{item.goodName}}</span>
                            <nuxt-link class="limit-item-link" :to="couponGoodsLink(item)">点击查看 ></nuxt-link>
                          </li>
                        </ul>
                      </div>
                      <i class="iconfont icon-help pointer" slot="reference" v-if="item.couponRange===2"></i>
                    </el-popover>
                  </span>
                </p>
                <!--<p class="coupon-prop">-->
                <!--<span class="coupon-prop-key">可叠加性:</span>-->
                <!--<span class="coupon-prop-value">不可叠加使用</span>-->
                <!--</p>-->
                <p class="coupon-prop">
                  <span class="coupon-prop-key">有效时间:</span>
                  <span class="coupon-prop-value">{{item.expiryDateStart.split(' ')[0]}} 至 {{item.expiryDateEnd.split(' ')[0]}}</span>
                </p>
              </el-col>
              <el-col :span="4" class="coupon-options">
                <p v-if="item.status===1">
                  <el-button type="primary" @click="use(item)">立即使用</el-button>
                </p>
                <p v-if="item.status===5||(item.assignment===1&&item.status===1)">
                  <el-button v-if="item.assignment===1&&item.status===1" @click="transfer(item)">立即转出</el-button>
                  <el-popover v-else placement="bottom" width="440" trigger="click" :key="idx+'-p2'"
                              @show="transferInfo(item)">
                    <div class="coupon-source">
                      <h2 class="coupon-source-title">转出信息</h2>
                      <table class="coupon-source-table">
                        <thead>
                        <tr>
                          <th>账号</th>
                          <th class="text-center">转出张数</th>
                          <th class="text-center">时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(transferItem,si) in transferList" :key="si">
                          <td>{{transferItem.account}}</td>
                          <td class="text-center">{{transferItem.count}}</td>
                          <td class="text-center">{{transferItem.transferTime|date('YYYY-M-DD HH:mm:ss')}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <span class="coupon-transfer-label pointer" slot="reference" v-if="item.status===5">转出信息</span>
                  </el-popover>
                </p>
              </el-col>
            </el-row>
          </div>
        </li>
      </ul>
      <div class="no-data" v-else>
        <img src="../../assets/images/compute-contract.png" alt="">
        <p>暂无该类型优惠券</p>
      </div>
    </div>
    <el-dialog width="420px" title="转出优惠券" custom-class="custom" :visible.sync="transferDialogVisible">
      <form>
        <dl class="form-group input-group">
          <dt>接受方账号</dt>
          <dd>
            <el-input placeholder="对方账号" class="padding-horizontal-10"
                      name="receiver" v-validate="'required|account'" v-model="transferForm.receiver"
                      data-vv-scope="transferForm" @focus="errors.remove('transferForm.receiver')"/>
            <p class="error" v-if="errors.has('transferForm.receiver')">
              {{errors.first('transferForm.receiver')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>数量</dt>
          <dd>
            <el-input-number v-model="transferForm.count" :min="1" :step="1"
                             :max="currentOperatingItem.count"></el-input-number>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>验证方式</dt>
          <dd>
            <el-select v-model="verifyMethod" placeholder="请选择验证方式" class="drop-down-box" style="width: 100%;" value="">
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
                          name="verifyCode" v-validate="'required|code'" v-model="transferForm.verifyCode"
                          data-vv-scope="transferForm" @focus="errors.remove('verifyCode','transferForm')"/>
              </el-col>
              <el-col :span="8">
                <el-button type="text" size="medium" :disabled="btnVerifyCode.disabled"
                           :loading="btnVerifyCode.loading" @click="sendVerifyCode">
                  {{btnVerifyCode.text}}
                </el-button>
              </el-col>
            </el-row>
            <p class="error" v-if="errors.has('transferForm.verifyCode')">
              {{errors.first('transferForm.verifyCode')}}</p>
          </dd>
        </dl>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferDialogVisible=false">取消</el-button>
        <el-button type="primary" :disabled="isTransferFormDisable" :loading="transferLoading"
                   @click="transferConfirm()">
          转出
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {hideEmail, replacePos, toPromise} from '../../utils';
  import UserAPI from '../../services/user-api';
  import errorHandler from '../../services/error-handler';
  import CouponAPI from '../../services/coupon-api';
  import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
  import differenceInMilliSeconds from 'date-fns/difference_in_milliseconds';

  const uuid = require('uuid/v4');

  export default {
    breadcrumb() {
      return {
        label: '我的优惠券',
        parentsList: [
          {label: '个人中心', path: '/i'}
        ]
      };
    },
    computed: {
      ...mapState(['userInfo']),
      verifyMethodList() {
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
        return arr;
      },
      isTransferFormDisable() {
        return !this.transferForm.receiver || !this.transferForm.verifyCode;
      }
    },
    data() {
      return {
        typeList: [
          {label: '全部类型', value: 0},
          {label: '算力折扣券', value: 4},
          {label: '矿机折扣券', value: 3},
          {label: '算力抵用券', value: 2},
          {label: '矿机抵用券', value: 1}
        ],
        statusList: [
          {label: '可用优惠券', value: 1},
          {label: '暂不可用优惠券', value: 0},
          {label: '已用优惠券', value: 3},
          {label: '已过期优惠券', value: 4},
          {label: '已转出优惠券', value: 5}
        ],
        filters: {
          status: {label: '可用优惠券', value: 1},
          type: {label: '全部类型', value: 0},
          subFilter: 0
        },
        typePopoverActive: false,
        statusPopoverActive: false,
        couponList: [],
        sourceList: [],
        transferList: [],
        transferDialogVisible: false,
        verifyMethod: null,
        transferForm: {
          receiver: '',
          verifyCode: '',
          count: 1
        },
        btnVerifyCode: {
          loading: false,
          disabled: false,
          text: '发送验证码'
        },
        smsCodeToken: '', // 短信验证码识别码
        transferLoading: false,
        currentOperatingItem: {}
      };
    },
    methods: {
      uuid,
      isCouponNotValid(item) { //优惠券是否为暂不可用
        return item.status === 0 || item.status === 2 || (item.status === 1 && differenceInMilliSeconds(new Date(item.expiryDateStart), new Date()) > 0);
      },
      isCloseExpired(item) {
        return item.status === 1 && differenceInCalendarDays(new Date(item.expiryDateEnd), new Date()) < 4;
      },
      loadCouponList() {
        const {status, type, subFilter} = this.filters;
        let filter = status.value === CouponAPI.CouponStatus.AVAILABLE ? subFilter : '';
        CouponAPI.couponList(status.value, type.value, filter)
          .then(res => {
            this.couponList = res.result;
          })
          .catch(errorHandler);
      },
      sendVerifyCode() {
        const countryNum = this.userInfo.countryNum;
        const account = this.verifyMethod === 1 ? this.userInfo.moblie : this.userInfo.mailboxAccount;
        let btn = this.btnVerifyCode;
        btn.loading = true;
        btn.disabled = true;
        this.$validator.validate('transferForm.receiver')
          .then(toPromise)
          .then(() => UserAPI.smsCode({countryNum, account, type: 10}))
          .then(res => res || {})
          .then(res => res.result || '')
          .then(codeToken => {
            this.smsCodeToken = codeToken;
            this.$message.success('发送成功');
            btn.loading = false;
            let t = 60;
            btn.text = t + 's';
            this.timer = setInterval(() => {
              t--;
              btn.text = t + 's';
              if (t < 0) {
                btn.disabled = false;
                btn.text = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(error => {
            btn.loading = false;
            btn.disabled = false;
            if (error) {
              btn.text = '重新发送';
              errorHandler(error);
            }
          });
      },
      transfer(item) {
        this.currentOperatingItem = item;
        this.transferDialogVisible = true;
      },
      transferConfirm() {
        const {receiver, count, verifyCode} = this.transferForm;
        const {couponInfoId, expiryDateStart, expiryDateEnd} = this.currentOperatingItem;

        const params = {
          account: receiver,
          count,
          couponInfoId,
          expiryDateStart,
          expiryDateEnd,
          code: verifyCode,
          codeToken: this.smsCodeToken
        };
        this.$validator.validateAll('transferForm')
          .then(toPromise)
          .then(() => CouponAPI.couponTransfer(params))
          .then(() => {
            this.$message.success('转出成功');
            this.transferDialogVisible = false;
            this.smsCodeToken = '';
            this.transferForm = {
              receiver: '',
              verifyCode: '',
              count: 1
            };
            this.btnVerifyCode.text = '发送验证码';
            setTimeout(() => {
              this.loadCouponList();
            }, 300);
          })
          .catch(errorHandler);
      },
      showSource(item) {
        const {couponInfoId, expiryDateStart, expiryDateEnd} = item;
        CouponAPI.couponShiftList(couponInfoId, expiryDateStart, expiryDateEnd)
          .then(res => {
            this.sourceList = res.result;
          });
      },
      transferInfo(item) {
        const {couponInfoId, expiryDateStart, expiryDateEnd} = item;
        CouponAPI.couponOutList(couponInfoId, expiryDateStart, expiryDateEnd)
          .then(res => {
            this.transferList = res.result;
          });
      },
      use(item) {
        if (item.couponRange === 1) {
          if (item.goodsType === 1) {
            return this.$router.push('/product');
          }
          return this.$router.push('/hash');
        } else {
          if (item.goodsType === 1) {
            return this.$router.push('/product/detail?pId=' + item.batchGoodsId);
          }
          return this.$router.push('/hash/detail?goodsId=' + item.batchGoodsId);
        }
      },
      couponGoodsLink(item) {
        if (item.goodsType === 1) {
          return '/product/detail?pId=' + item.batchGoodsId;
        }
        return '/hash/detail?goodsId=' + item.batchGoodsId;
      },
      discountInfo(item) {
        // 是否为折扣券
        const isDiscount = [3, 4].indexOf(item.type) > -1;
        const unit = isDiscount ? '折' : '元';
        if (isDiscount) {
          let val = item.amount * 10;
          let arr = (val + '').split('.');
          let decimal = +arr[1] > 0 ? arr[1] : '';
          return `<b style="font-size: 48px;">${arr[0]}</b>${decimal ? ('.' + decimal) : ''}${unit}`;
        } else {
          return `<b style="font-size: 48px;">${item.amount}</b>${unit}`;
        }
      }
    },
    watch: {
      verifyMethodList: {
        handler(val) {
          this.verifyMethod = (val[0] || {}).value || null;
        },
        immediate: true,
        deep: true
      },
      filters: {
        handler() {
          this.loadCouponList();
        },
        immediate: true,
        deep: true
      }
    },
    filters: {
      couponType(value) {
        switch (value) {
          case 1:
            return '矿机抵用券';
          case 2:
            return '算力抵用券';
          case 3:
            return '矿机折扣券';
          case 4:
            return '算力折扣券';
        }
      }
    },
    mounted() {
      // this.initPage();
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/style/form";

  .page {
    min-height: 430px;
  }

  .page-coupon {

    .header {
      font-size: 24px;
      line-height: 24px;
      color: #303137;
      padding: 20px 30px;
    }
  }

  .coupon-container {
    padding: 20px 30px;
  }

  .coupon-filters {
    height: 50px;
    background-color: #f9f9f9;
    padding: 15px 20px;
    font-size: 14px;
    color: #303137;
  }

  .coupon-filters-label {
    color: #999;
  }

  .filters {
    margin-left: 1.5em;

    i {
      margin-left: .2em;
      transition: transform .2s;
    }
    &.active {
      color: #4185F5;

      i {
        transform: rotate(180deg);
      }
    }
  }

  .split-line {
    display: inline-block;
    color: #999;
  }

  .sub-filters-wrapper {
    display: inline-block;
    padding-left: 1.5em;
  }

  .sub-filters {
    display: inline-block;
  }

  .sub-filters-item {
    display: inline-block;
    margin-left: 1.5em;
    cursor: pointer;
    &.active {
      color: #4d87ea;
    }
  }

  .coupon-list {
    margin-left: -30px;
    margin-right: -30px;
  }

  .coupon-item {
    position: relative;
    padding: 20px 30px 20px 298px;
    height: 186px;
    border-bottom: 1px solid #f5f5f9;
    user-select: none;
  }

  .coupon-img {
    position: absolute;
    width: 268px;
    left: 30px;
    top: 20px;
    display: inline-block;
    height: 146px;
    & > div {
      width: 100%;
      height: 100%;
    }

    img {
      height: 100%;
    }
  }

  .coupon-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
  }

  .coupon-status {
    position: absolute;
    left: 20px;
    top: 0;
    width: 48px;
    &.smaller {
      width: 36px;
    }

    img {
      width: 100%;
    }
  }

  .coupon-info-title {
    margin-top: 25px;
    font-size: 18px;
    line-height: 61px;
    height: 61px;
  }

  .coupon-info-type {
    font-size: 18px;
    line-height: 24px;
  }

  .coupon-info-label {
    display: inline-block;
    font-size: 12px;
    color: #fd7220;
    line-height: 12px;
    border: 1px solid #fd7220;
    border-radius: 2px;
    padding: 2px 4px;
    vertical-align: middle;
    cursor: pointer;
  }

  /*.coupon-info-limit {*/
  /*margin-top: 15px;*/
  /*font-size: 14px;*/
  /*}*/

  .coupon-details {
    padding-left: 30px;
  }

  .coupon-title {
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 20px;
    color: #303137;
  }

  .coupon-prop {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 10px;
  }

  .coupon-prop-key {
    color: #999;
  }

  .coupon-prop-value {
    color: #303137;
    margin-left: .3em;
  }

  .orange {
    color: #fd7220;
  }

  .coupon-options {
    margin-top: -5px;
    text-align: right;

    p {
      &:last-child {
        margin-top: 15px;
      }

      &:first-child:last-child {
        margin-top: 40px;
      }
    }
  }

  .coupon-limit {
    padding: 5px;
  }

  .coupon-limit-title {
    font-size: 16px;
    line-height: 20px;
    color: #303137;
  }

  .coupon-limit-list {
    margin-top: 10px;
  }

  .coupon-limit-item {
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 19px;
  }

  .limit-item-type {
    display: inline-block;
    font-size: 12px;
    line-height: 12px;
    color: #333;
    padding: 4px;
    border-radius: 2px;
    border: 1px solid #E0E0E0;
  }

  .limit-item-title {
    color: #333;
    margin-left: .5em;
  }

  .limit-item-link {
    margin-left: .5em;
    color: #4d87ea;
  }

  .filter-options {

  }

  .filter-options-item {
    font-size: 14px;
    line-height: 34px;
    color: #606166;
    cursor: pointer;

    &.active {
      color: #303137;
      font-weight: bold;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .coupon-source {
    padding: 10px;
  }

  .coupon-source-title {
    font-size: 16px;
    line-height: 20px;
    color: #303137;
  }

  .coupon-source-table {
    margin-top: 18px;
    border-spacing: 0;
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    width: 400px;

    th, td {
      border-right: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      height: 36px;
      padding-left: 1em;
      padding-right: 1em;
      font-size: 12px;
      font-weight: normal;
      color: #333;
    }

    th {
      color: #666;
      background-color: #f9f9f9;
    }
  }

  .coupon-transfer-label {
    display: inline-block;
    vertical-align: bottom;
    margin-top: 11px;
    font-size: 14px;
    line-height: 40px;
    color: #4D87EA;
  }

  .error {
    line-height: 20px;
  }

  .no-data {
    text-align: center;
    color: #969699;
    padding: 120px 0;
    img {
      width: 120px;
      margin-bottom: 30px;
    }
  }
</style>
