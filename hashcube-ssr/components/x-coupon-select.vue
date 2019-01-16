<template>
  <el-dialog @close="couponDialogVisible=false" class="discount-dialog"
             :visible.sync="dialogVisible" @open="openHandler">
    <div slot="title" class="discount-title">
      <ul>
        <li :class="{active:activeTab===1}"
            @click="activeTab=1">
          抵用优惠券({{voucherInfo.count}})
        </li>
        <li :class="{active:activeTab===2}"
            @click="activeTab=2">
          折扣优惠券({{discountCouponInfo.count}})
        </li>
      </ul>
    </div>
    <div class="discount-body">
      <ul v-if="activeTab===1">
        <li v-for="(item,index) in voucherInfo.data" :key="index" @click="selectedVoucher(item)">
          <div>
            <el-checkbox :value="item._checked" @input="selectedVoucher(item)"></el-checkbox>
          </div>
          <div class="coupon-image">
            <img v-if="type===1" src="../assets/images/coupon/miner.png" alt="">
            <img v-if="type===2" src="../assets/images/coupon/hash.png" alt="">
            <div class="coupon-info">
              <p><span>{{item.amount}}</span> 元</p>
              <p>{{type===1?'矿机':'算力'}}抵用券</p>
            </div>
          </div>
          <div>
            <h3>购买{{item.couponRange===2?item.category:(type===1?'矿机':'算力')}}可用</h3>
            <dl>
              <dt>优惠类型 :</dt>
              <dd>{{item.type|couponType}}</dd>
            </dl>
            <dl>
              <dt>限定品类 :</dt>
              <dd>{{item.couponRange===1?'全部'+(type===1?'矿机':'算力'):item.category}}</dd>
            </dl>
            <dl class="last">
              <dt>有效时间 :</dt>
              <dd>{{item.expiryDateStart | date('YYYY-MM-DD')}} 至 {{item.expiryDateEnd | date('YYYY-MM-DD')}}</dd>
            </dl>
          </div>
          <p class="coupon-num">x{{item.couponCount}}张</p>
          <p class="coupon-cal" @click.stop>
            <el-input-number @click="event.cancelBubble=true" v-model="item._count" :min="1"
                             :max="voucherItemMax(item)"></el-input-number>
          </p>
        </li>
      </ul>
      <ul v-if="activeTab===2">
        <li v-for="(item,index) in discountCouponInfo.data" :key="index" @click="selectedDiscount(item)">
          <div>
            <el-checkbox :value="item._checked" @input="selectedDiscount(item)"></el-checkbox>
          </div>
          <div class="coupon-image">
            <img v-if="type===1" src="../assets/images/coupon/miner.png" alt="">
            <img v-if="type===2" src="../assets/images/coupon/hash.png" alt="">
            <div class="coupon-info">
              <p v-html="discountAmount(item)"></p>
              <p>{{type===1?'矿机':'算力'}}折扣券</p>
            </div>
          </div>
          <div>
            <h3>购买{{item.couponRange===2?item.category:(type===1?'矿机':'算力')}}可用</h3>
            <dl>
              <dt>优惠类型 :</dt>
              <dd>{{item.type|couponType}}</dd>
            </dl>
            <dl>
              <dt>限定品类 :</dt>
              <dd>{{item.couponRange===1?'全部'+(type===1?'矿机':'算力'):item.category}}</dd>
            </dl>
            <dl class="last">
              <dt>有效时间 :</dt>
              <dd>{{item.expiryDateStart | date('YYYY-MM-DD')}} 至 {{item.expiryDateEnd | date('YYYY-MM-DD')}}</dd>
            </dl>
          </div>
          <p class="coupon-num">x{{item.couponCount}}张</p>
          <p class="coupon-cal" @click.stop>
            <el-input-number @click="event.cancelBubble=true" v-model="item._count" :min="1" :max="1"/>
          </p>
        </li>
      </ul>
      <div class="tips" v-if="showTips" @click="showTips=false">
        <p v-if="activeTab===1">
          <span v-if="voucherDisabled">抵用优惠券和折扣优惠券不能同时使用</span>
          <span v-else><em>{{count}}{{type===1?'台':unit}}</em>{{type===1?'矿机':'算力'}}，最多可用<em>{{max}}</em>张抵用优惠券</span>
        </p>
        <p v-if="activeTab===2">
          <span v-if="discountCouponDisabled">折扣优惠券和抵用优惠券不能同时使用</span>
          <span v-else>最多可用<em>1</em>张折扣优惠券</span>
        </p>
      </div>
    </div>
    <div slot="footer" class="discount-footer clearfix">
      <div>已选 <span>{{discountInfo.count}}</span> 张优惠券减 <span>{{discountInfo.actual|currency}}</span> 元</div>
      <div>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import CouponAPI from '../services/coupon-api';
  import {Decimal} from 'decimal.js';

  const CouponType = CouponAPI.CouponType;
  const isCouponEquals = CouponAPI.isEquals;

  export default {
    name: 'x-coupon-select',
    props: {
      data: {
        type: Array,
        default: () => ([])
      },
      max: {
        type: Number
      },
      value: {
        type: Object,
        default: () => ({
          count: 0, // 优惠券数量
          amount: 0, // 优惠券总折扣金额
          actual: 0, // 优惠券实际折扣金额
          data: []  // 选中的优惠券
        })
      },
      type: {
        type: Number,
        default: 1 // 1 - 矿机 2 - 算力
      },
      amount: 0,
      visible: false,
      unit: {
        type: String,
        default: ''
      },
      count: 0
    },
    computed: {
      discountCouponDisabled() {
        return this.singleType && this.voucherInfo.data.some(item => item._checked);
      },
      voucherDisabled() {
        return this.singleType && this.discountCouponInfo.data.some(item => item._checked);
      },
      discountInfo() {
        let amount = 0;
        let count = 0;
        this.voucherInfo.data.forEach(item => {
          if (item._checked) {
            amount += item._count * item.amount;
            count += item._count;
          }
        });
        this.discountCouponInfo.data.forEach(item => {
          if (item._checked) {
            amount += new Decimal(this.amount).sub(new Decimal(this.amount).mul(item.amount).mul(100).ceil().div(100)).toNumber();
            count = 1;
          }
        });
        const actual = this.amount - amount > 0 ? amount : this.amount;
        return {
          amount,
          actual,
          count
        };
      }
    },
    data() {
      return {
        CouponType,
        voucherInfo: {
          count: 0,
          data: []
        },
        discountCouponInfo: {
          count: 0,
          data: []
        },
        dialogVisible: false,
        activeTab: 1,
        singleType: true, // 限制单一类型
        showTips: false
      };
    },
    methods: {
      discountAmount(item) {
        let val = item.amount * 10;
        let arr = (val + '').split('.');
        let decimal = +arr[1] > 0 ? arr[1] : '';
        return `<b style="font-size: 48px;">${arr[0]}</b>${decimal ? ('.' + decimal) : ''}折`;
      },
      selectedVoucher(item) {
        if (this.isVoucherItemDisabled(item)) {
          this.showTips = true;
          return;
        }
        item._checked = !item._checked;
      },
      isVoucherItemDisabled(couponItem) {
        let otherSelectedCount = 0;
        this.voucherInfo.data.forEach(coupon => {
          if (coupon._checked && !isCouponEquals(coupon, couponItem)) {
            otherSelectedCount += coupon._count;
          }
        });
        let valid = this.max - otherSelectedCount;
        return this.voucherDisabled || couponItem._count > valid;
      },
      selectedDiscount(item) {
        if (this.isDiscountItemDisabled(item)) {
          this.showTips = true;
          return;
        }
        item._checked = !item._checked;
      },
      isDiscountItemDisabled(couponItem) {
        const isOtherSelected = this.discountCouponInfo.data.some(item => item._checked && !isCouponEquals(item, couponItem));
        return this.discountCouponDisabled || isOtherSelected;
      },
      voucherItemMax(item) {
        if (!item._checked) {
          return item.couponCount;
        }
        let otherSelectedCount = 0;
        this.voucherInfo.data.forEach(coupon => {
          if (coupon._checked && !isCouponEquals(coupon, item)) {
            otherSelectedCount += coupon._count;
          }
        });
        let valid = this.max - otherSelectedCount;
        return valid < item.couponCount ? valid : item.couponCount;
      },
      confirm() {
        const selectedItem = [];
        this.couponList.forEach(item => {
          if (item._checked) {
            selectedItem.push({
              couponInfoId: item.id,
              count: item._count,
              startTime: item.expiryDateStart,
              endTime: item.expiryDateEnd
            });
          }
        });
        const data = {
          count: this.discountInfo.count,
          amount: this.discountInfo.amount,
          actual: this.discountInfo.actual,
          data: selectedItem
        };
        console.log('选中优惠券为:', data);
        this.$emit('input', data);
        this.dialogVisible = false;
      },
      openHandler() {
        let selectedItem = this.value.data;
        this.couponList.forEach(item => {
          item._checked = false;
          item._count = 1;
          item.couponInfoId = item.couponInfoId || item.id;
          selectedItem.forEach(obj => {
            if (isCouponEquals(item, obj)) {
              item._checked = true;
              item._count = obj.count;
            }
          });
        });
      }
    },
    watch: {
      data: {
        handler(val) {
          const couponList = JSON.parse(JSON.stringify(val));
          this.discountCouponInfo = {
            count: 0,
            data: []
          };
          this.voucherInfo = {
            count: 0,
            data: []
          };
          let selectedItem = this.value.data;
          couponList
            .filter(item => item.couponCount - (item._otherLock || 0) > 0)
            .forEach(item => {
              item.couponCount -= (item._otherLock || 0);
              item._checked = false;
              item._count = 1;
              item.couponInfoId = item.couponInfoId || item.id;
              item.startTime = item.expiryDateStart || item.startTime;
              item.endTime = item.expiryDateEnd || item.endTime;
              //根据选中项初始化选则的券
              selectedItem.forEach(obj => {
                if (isCouponEquals(item, obj)) {
                  item._checked = true;
                  item._count = obj.count;
                }
              });
              if ([CouponType.HASH_VOUCHER, CouponType.MINER_VOUCHER].indexOf(item.type) > -1) {
                this.voucherInfo.data.push(item);
                this.voucherInfo.count += item.couponCount;
              }
              if ([CouponType.HASH_DISCOUNT, CouponType.MINER_DISCOUNT].indexOf(item.type) > -1) {
                this.discountCouponInfo.data.push(item);
                this.discountCouponInfo.count += item.couponCount;
              }
            });
          this.couponList = couponList;
        },
        immediate: true,
        deep: true
      },
      visible: {
        handler(val) {
          this.dialogVisible = val;
        },
        immediate: true
      },
      dialogVisible(val) {
        this.$emit('update:visible', val);
      },
      showTips(val) {
        if (val) {
          setTimeout(() => {
            this.showTips = false;
          }, 2000);
        }
      }
    },
    filters: {
      couponType(value) {
        switch (value) {
          case CouponType.MINER_VOUCHER:
            return '矿机抵用券';
          case CouponType.HASH_VOUCHER:
            return '算力抵用券';
          case CouponType.MINER_DISCOUNT:
            return '矿机折扣券';
          case CouponType.HASH_DISCOUNT:
            return '算力折扣券';
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .discount-title {
    padding-right: 40px;

    ul {
      height: 55px;
      line-height: 55px;
      border-bottom: 2px solid #F5F5F7;
      font-size: 16px;
      color: #999;
    }

    ul > li {
      cursor: pointer;
      float: left;

      &:first-child {
        margin-right: 30px;
        margin-left: 298px;
        max-width: 110px;
        font-weight: bold;
      }

      &.active {
        color: #4185F5;
        line-height: 53px;
        border-bottom: 2px solid #4185F5;
      }
    }
  }

  .discount-body {
    position: relative;
    max-height: 478px;
    min-height: 186px;
    width: 100%;
    overflow-y: scroll;
    padding-left: 20px;
    padding-right: 31px;

    li {
      position: relative;
      padding: 20px 0;
      height: 186px;
      border-bottom: 1px solid #F5F5F7;

      &:last-child {
        border-bottom: 0;
      }

      > div {
        float: left;

        &:first-child {
          padding-top: 63px;
        }

      }
    }
    .coupon-image {
      position: relative;
      width: 268px;
      height: 100%;
      /*background:#499DF2;*/
      margin: 0 20px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;

      img {
        display: block;
        width: 100%;
      }

      .coupon-info {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
      }

      p:first-child {
        margin: 20px 0 10px;
        span {
          font-size: 48px;
        }
      }
    }
    h3 {
      font-size: 16px;
      color: #303137;
      margin-bottom: 25px;
    }

    dl {
      font-size: 14px;
      margin-bottom: 10px;

      &.last {
        margin-bottom: 0;
      }

      dd, dt {
        display: inline-block;
        margin-left: 0;
      }

      dt {
        color: #000019;
        margin-right: 10px;
      }

      dd {
        color: #999;
      }

    }
  }

  .discount-footer {

    div:first-child {
      float: left;
      font-size: 16px;
      color: #303137;
      font-weight: 700;
      line-height: 35px;

      span {
        color: #FD8944;
      }

    }
    div:last-child {
      float: right;
    }

  }

  .coupon-num {
    font-size: 14px;
    color: #303137;
    font-weight: bold;
    position: absolute;
    top: 22px;
    right: 0;
  }

  .coupon-cal {
    position: absolute;
    bottom: 22px;
    right: 0;
  }

  .tips {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 1.5em 2em;
    background-color: rgba(48, 49, 55, 0.95);
    font-size: 14px;
    color: #fff;
    transform: translate(-50%, -50%);

    em {
      font-style: normal;
      color: #F95453;
    }
  }
</style>
