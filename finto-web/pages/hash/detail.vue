<template>
  <div class="page">
    <div class="miner-breadcrumb">
      <div class="inner">
        <x-breadcrumb class="x-breadcrumb"/>
      </div>
    </div>
    <div class="hash-content">
      <div class="hash-container">
        <div class="hash-product">
          <el-row>
            <el-col :span="10">
              <div class="hashproductImg">
                <img :src="goodsInfo.imageUrl" alt="">
              </div>
            </el-col>
            <el-col :span="14">
              <div class="hash-name">{{goodsInfo.goodsName}}</div>
              <div class="hash-tip">{{goodsInfo.goodsSubTitle}}</div>
              <div class="hash-infor">
                <div class="infor-item goodsPrice">
                  <dt>税別価格</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1&&goodsInfo.salePrice">{{goodsInfo.salePrice | currency}} 円</span>
                    <span v-else>{{getPrice()}}</span>
                    <span class="msrp"></span>
                    <span class="price" v-if="goodsInfo.status===1&&goodsInfo.price">原価：{{goodsInfo.price | currency}} 円</span>
                  </dd>
                </div>
                <div class="infor-item">
                  <dt>残ハッシュ</dt>
                  <dd v-if="goodsInfo.status === 2 || goodsInfo.status === 3 || goodsInfo.status === 4">0 {{goodsInfo.computingUnit}}</dd>
                  <dd v-else>{{goodsInfo.surplusCube}}{{goodsInfo.computingUnit}}</dd>
                </div>
                <div class="infor-item">
                  <dt>スタート日</dt>
                  <dd>
                    <span v-if="goodsInfo.deliveryTimeType===0">翌日受渡し</span>
                    <span
                      v-else-if="goodsInfo.deliveryTimeType===2">{{goodsInfo.deliveryTime | date('YYYY-MM-DD')}}</span>
                    <span
                      v-else-if="goodsInfo.deliveryTimeType===1">即時受渡し</span>
                  </dd>
                </div>
                <div>
                  <dt>数量</dt>
                  <dd style="width: 534px;overflow: hidden;">
                    <div class="left">
                      <div class="num-box">
                        <span @click="reduce">
                          <svg width="11" height="1">
                            <use xlink:href="#minus"></use>
                          </svg>
                        </span>
                        <input type="number" min="1" v-model="count" @input="inputNum">
                        <span @click="plus">
                          <svg width="11" height="11"><use xlink:href="#add"></use></svg>
                        </span>
                      </div>
                      <span class="pay-compuint">{{goodsInfo.computingUnit}}</span>
                    </div>
                    <div class="left" style="margin-top: 10px;">
                      <span class="pay-limit">
                        <span
                          v-if="goodsInfo.lowestAmount>0">最低購入:{{goodsInfo.lowestAmount}}{{goodsInfo.computingUnit}}</span>
                        <span v-if="goodsInfo.lowestAmount>0&&goodsInfo.singlePenRestrictionType===1">,</span>
                        <span v-if="goodsInfo.singlePenRestriction">
                          １回購入上限:{{goodsInfo.singlePenRestriction}}{{goodsInfo.computingUnit}}
                        </span>
                        <span
                          v-if="goodsInfo.singleRestrictionType===1&&(goodsInfo.singlePenRestrictionType===1||(goodsInfo.lowestAmount>0&&goodsInfo.singlePenRestrictionType===0))">,</span>
                        <span
                          v-if="goodsInfo.singleRestriction">お一人様上限:{{goodsInfo.singleRestriction}}{{goodsInfo.computingUnit}}</span>
                      </span>
                    </div>
                  </dd>
                </div>
                <div class="infor-pay">
                  <dt>合計金額</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1">{{count * goodsInfo.salePrice | currency}} 円</span>
                    <span class="msrp" v-if="goodsInfo.status===1">（税別）</span>
                    <span v-else>--</span>
                  </dd>
                </div>
              </div>
              <div class="hash-pay">
                <el-button class="pay-btn" type="primary" :class="{'btn-disabled':goodsInfo.status!==1}"
                           :disabled="goodsInfo.status!==1||goodsInfo.surplusCube===0||goodsInfo.surplusCube<count" @click="buyNow">
                  <span v-if="goodsInfo.status===0">{{goodsInfo.openSaleTime | date('MM月DD日 HH:mm')}} 発売</span>
                  <span v-if="goodsInfo.status===1">購入する</span>
                  <span v-if="goodsInfo.status===2 || goodsInfo.status===3 || goodsInfo.status===4">売り切れ</span>
                  <!-- <span v-if="goodsInfo.status===3">販売終了</span> -->
                  <span v-if="goodsInfo.status===-1">販売中止</span>
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="hash-intro">
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in summaryList" :key="item.mark">
              <div class="summary-item">
                <img :src="item._icon" alt="">
                <p class="intro-text">{{item.key}}</p>
                <p class="intro-num">{{item.value}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="hash-list">
          <div class="hash-list-tip">{{sourceTime}}</div>
          <ul class="clearfix">
            <li :class="{'active':selectedIndex===0}" @click="selectedIndex=0">紹介</li>
            <li :class="{'active':selectedIndex===1}" @click="selectedIndex=1">詳細</li>
            <li :class="{'active':selectedIndex===2}" @click="selectedIndex=2">Q&A</li>
            <li :class="{'active':selectedIndex===3}" @click="selectedIndex=3">購入履歴</li>
          </ul>
          <div class="hash-list-content">
            <div v-if="selectedIndex===0" v-html="goodsInfo.content"></div>
            <div v-if="selectedIndex===1" class="product-params">
              <div class="product-title">{{goodsInfo.goodsName}}</div>
              <dl>
                <div v-for="(item,index) in productParams" :key="index">
                  <dt>{{item.key}}</dt>
                  <dd>{{item.value}}</dd>
                </div>
              </dl>
            </div>
            <div v-if="selectedIndex===2" class="tabs-pane-question">
              <ul>
                <li v-for="item in questionList" :key="item.id">
                <span @click="questionIndex===item.id ? questionIndex=-1 : questionIndex=item.id">
                  <i :class="[questionIndex===item.id ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  <span class="">{{item.question}}</span>
                </span>
                  <div v-if="questionIndex===item.id">{{item.answer}}</div>
                </li>
              </ul>
            </div>
            <div v-if="selectedIndex===3" class="tabs-pane-history">
              <table>
                <thead>
                <tr>
                  <th>ユーザー</th>
                  <th>ハッシュ({{goodsInfo.computingUnit}})</th>
                  <th>金额(円)</th>
                  <th>購入日時</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,idx) in historyList" :key="idx">
                  <td>{{item.account | phone}}</td>
                  <td>{{item.goodsCount}}</td>
                  <td>{{item.totalAmount}}</td>
                  <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-features style="margin-top: 80px;"/>
  </div>
</template>
<script>
  import {UPDATE_BREADCRUMB} from '../../store/mutation-types';
  import {mapState, mapGetters} from 'vuex';
  import {setStore} from '../../services/utils';
  import get from 'lodash.get';
  import {CommonProblem} from '../../services/config.js';
  import GoodsAPI from '../../services/goods-api';
  import HashAPI from '../../services/hash-api';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import XFeatures from '../../components/x-features';
  import * as debounce from 'lodash.debounce';
  const HASHORDER = 'HASHORDER';

  export default {
    components: {XBreadcrumb, XFeatures},
    head() {
      let hash = this.goodsInfo;
      let hashName = this.goodsInfo.goodsName;
      return {
        title: `${hashName}のクラウドマイニング｜Finto.jp`,
        meta: [
          {
            name: 'keywords',
            content: `${hashName}クラウドマイニング,${hashName}ハッシュトレード`
          },
          {
            name: 'description',
            content: `Fintoは${hashName}のクラウドマイニングトレードを提供しております。${hashName}のハッシュをご購入後、各商品のスタート時間よりクラウドマイニングが開始され、コイン収益が生まれていきます。マイニングのことならFintoへ。`
          }
        ]
      };
    },
    asyncData({route, error}) {
      const goodsId = route.query.goodsId;
      if (!goodsId) {
        return error({statusCode: 404, message: 'Page Not Found'});
      }
      return HashAPI.getJyGoodsInfo(goodsId)
        .then(data => {
          data._minLimit = null;
          data._maxLimit = null;
          return {
            goodsInfo: data
          };
        })
        .catch(() => {
          error({statusCode: 404, message: 'Page Not Found'});
        });
    },
    data() {
      return {
        count: 30,
        sourceTime: '',
        questionList: CommonProblem,
        questionIndex: -1,
        selectedIndex: 0,
        summaryList: [],
        productParams: [],
        historyList: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    breadcrumb() {
      return {
        label: 'クラウドマイニング詳細',
        parentsList: [
          {
            path: '/hash',
            label: `クラウドマイニング `
          }
        ]
      };
    },
    computed: {
      ...mapState({
        token: 'token'
      }),
      ...mapGetters({
        isLogin: 'isLogin'
      })
    },
    mounted() {
      const {min, max} = this.getLimitCount(this.goodsInfo);
      this.goodsInfo._minLimit = min;
      this.goodsInfo._maxLimit = max;
      this.count = min;
      this.getGoodsAttributeList();
      // this.jyGoodsInfo();
      this.initBreadcrumb();
    },
    methods: {
      get,
      plus() {
        const {min, max} = this.getLimitCount(this.goodsInfo);
        this.count = +this.count;
        if (this.count < this.goodsInfo._maxLimit) {
          if (this.goodsInfo.incrementNum > 1) {
            this.count += this.goodsInfo.incrementNum;
            if (this.count > max) {
              this.count = max;
            }
          } else {
            this.count++;
          }
        }
      },
      reduce() {
        const {min, max} = this.getLimitCount(this.goodsInfo);
        this.count = +this.count;
        if (this.count > this.goodsInfo._minLimit) {
          if (this.goodsInfo.incrementNum > 1) {
            this.count -= this.goodsInfo.incrementNum;
            if (this.count < min) {
              this.count = min;
            }
          } else {
            this.count--;
          }
        }
      },
      inputNum() {
        const {min, max} = this.getLimitCount(this.goodsInfo);
        debounce(() => {
          let count = +this.count;
          if (!/^[1-9]\d*$/.test(count + '')) {
            count = min;
          }
          if (count > max) {
            count = max;
          }
          if (count < min) {
            count = min;
          }
          this.count = count;
        }, 1000)();
      },
      getPrice() {
        if (this.goodsInfo.status === 0) {
          if (this.goodsInfo.openSaleType !== 1 && this.goodsInfo.openSalePrice) {
            return this.goodsInfo.openSalePrice;
          } else {
            return '--';
          }
        } else {
          if (this.goodsInfo.soldOutType !==1 && this.goodsInfo.soldOut) {
            return this.goodsInfo.soldOut;
          } else {
            return  '--';
          }
        }
      },
      getLimitCount(goodsInfo = {}) {
        let min = +goodsInfo.lowestAmount;
        let surplusCube = goodsInfo.surplusCube;
        let personLimit, orderLimit, arr = [];
        if (goodsInfo.singlePenRestrictionType === 1) {
          orderLimit = goodsInfo.singlePenRestriction;
          arr.push(+orderLimit);
        }
        if (goodsInfo.singleRestrictionType === 1) {
          personLimit = goodsInfo.singleRestriction;
          arr.push(+personLimit);
        }
        arr.push(+surplusCube);
        let max = Math.min.apply(null, arr);
        return {min, max};
      },
      buyNow() {
        if (!this.isLogin) {
          const redirectUrl = this.$router.currentRoute.fullPath;
          this.$router.push({
            path: '/login', query: {
              redirectUrl
            }
          });
          return;
        }
        const hashoderObj = {};
        hashoderObj.imageUrl = this.goodsInfo.imageUrl;
        hashoderObj.goodsName = this.goodsInfo.goodsName;
        hashoderObj.deliveryTimeType = this.goodsInfo.deliveryTimeType;
        hashoderObj.deliveryTime = this.goodsInfo.deliveryTime;
        hashoderObj.goodsSalePrice = this.goodsInfo.salePrice;
        hashoderObj.goodsId = this.$route.query.goodsId;
        hashoderObj.count = this.count;
        hashoderObj.computingUnit = this.goodsInfo.computingUnit;
        setStore(HASHORDER, hashoderObj)
        this.$router.push({
          path: '/cart/hashorder'
        });
      },
      //矿机功率，电费
      getGoodsAttributeList() {
        const goodsId = this.$route.query.goodsId;
        GoodsAPI.goodsAttribute(goodsId, 2)
          .then(res => res.result || [])
          .then(res => {
            res.forEach(item => {
              if (item.mark === 'ATTR_T') {
                this.sourceTime = item.value;
              }
              if (item.mark === 'ATTR_O') {
                item._icon = require('../../assets/images/hash-detail/icon-output.svg');
              }
              if (item.mark === 'ATTR_P') {
                item._icon = require('../../assets/images/hash-detail/icon-power.svg');
              }
              if (item.mark === 'ATTR_M') {
                item._icon = require('../../assets/images/hash-detail/icon-management-fee.svg');
              }
              if (item.mark === 'ATTR_E') {
                item._icon = require('../../assets/images/hash-detail/icon-electric-fee.svg');
              }
            });
            return res;
          })
          .then(res => {
            this.summaryList = res.filter(item => item.mark !== 'ATTR_T');
          })
          .catch(() => {
          });
      },
      // 详情信息
      // jyGoodsInfo() {
      //   const goodsId = this.$route.query.goodsId;
      //   HashAPI.getJyGoodsInfo(goodsId)
      //     .then(res => {
      //       console.log(res);
      //     });
      // },
      // 购买记录
      getJyOrderList() {
        const goodsId = this.$route.query.goodsId;
        HashAPI.getHashOrderList(goodsId, this.pageNum, this.pageSize)
          .then(res => res.list || [])
          .then(res => {
            this.historyList = res;
          });
      },
      // 矿机参数
      getProductParams() {
        const goodsId = this.goodsInfo.goodsId;
        GoodsAPI.goodsAttribute(goodsId, 3)
          .then(res => {
            this.productParams = res.result;
          });
      },
      initBreadcrumb() {
        const breadcrumb = {
          label: this.goodsInfo.goodsName + 'クラウドマイニング詳細',
          parentsList: [
            {
              path: '/hash',
              label: `クラウドマイニング`
            }
          ]
        };
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      }
    },
    watch: {
      selectedIndex(val) {
        if (val === 1) {
          this.getProductParams();
        } else if (val === 3) {
          this.getJyOrderList();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .num-box {
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 40px;
    height: 40px;
    border: 1px solid #efefef;
    display: inline-block;
  }

  .num-box span {
    position: absolute;
    display: inline-block;
    width: 38px;
    height: 38px;
    background: #EFEFEF;
    top: 0;
    cursor: pointer;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .num-box input {
    width: 75px;
    height: 38px;
    border: none;
    text-align: center;
    vertical-align: top;
  }

  .miner-breadcrumb {
    line-height: 40px;
    background: #f6f6f6;

    .inner {
      width: 1200px;
      margin: 0 auto;
    }

    .x-breadcrumb {
      line-height: 40px;
    }
    /*.miner-breadcrumb-detail {*/
    /**/
    /*}*/
  }
  .page {
    background: #fff;
  }

  .breadcrumb-bar {
    background: #F8F8F8;
  }

  .breadcrumb {
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
  }

  .hash-content {
    padding: 60px 0 50px;
    border-bottom: 50px solid #f8f8f8;
    .hash-container {
      width: 1200px;
      margin: 0 auto;
    }
  }

  .hash-product {
    margin-bottom: 50px;
    .el-col:last-child {
      padding-left: 80px;
    }
  }

  .hashproductImg {
    width: 500px;
    height: 500px;
    background: #F8F8F8;
    position: relative;
    img {
      width: 80%;
      height: 80%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .hash-name {
    font-size: 24px;
    color: #303137;
    font-weight: bold;
  }

  .hash-tip {
    font-size: 14px;
    color: #D7282D;
    margin: 11px 0 10px;
  }

  .hash-shop {
    margin-bottom: 20px;
  }

  .shop-header {
    /*height: 41px;*/
    /*line-height: 41px;*/
    /*background: #D7282D;*/
    /*font-size: 18px;*/
    /*padding-left: 10px;*/
    /*color: #FFFFFF;*/
    /*letter-spacing: 1.5px;*/
    img {
      display: block;
      width: 100%;
    }
  }

  .hash-shop .shop-body {
    font-size: 14px;
    padding: 20px 26px 20px 10px;
    background: #F4F4F4;
  }

  .shop-body p:last-child {
    margin-top: 0;
  }

  .shop-cu {
    margin-bottom: 15px;
    img, span {
      vertical-align: middle;
    }
    img {
      margin-right: 10px;
    }
    & > span:first-child {
      display: inline-block;
      min-width: 153px;
      font-weight: bold;
    }
  }

  .shop-rule {
    color: #4D87EA;
    margin-left: 30px;
    cursor: pointer;
    padding: 0;
  }

  .shop-price {
    margin-top: 25px;
    padding-left: 30px;
  }

  .sale-price {
    font-size: 18px;
    color: #FD7220;
    margin-right: 25px;
  }

  .bold {
    font-weight: bold;
  }

  .source-price {
    color: #969699;
    text-decoration: line-through;
  }

  .hash-infor {
    margin-top: 35px;
    > div {
      margin-bottom: 20px;
    }
    > div:last-child {
      margin-bottom: 0;
    }
    dt, dd {
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      user-select: none;
    }
    dt {
      font-size: 14px;
      color: #969699;
      min-width: 86px;
    }
    .infor-item {
      font-size: 18px;
      color: #303137;
      user-select: none;
    }
    .goodsPrice dd{
      span:first-child {
        font-size: 18px;
        color: #FD7220;
        line-height: 18px;
        font-weight: bold;
      }
      .price {
        font-size: 14px;
        color: #999999;
        line-height: 14px;
        margin-left: 14px;
        text-decoration: line-through;
      }
    }
    .infor-discount dd {
      font-size: 18px;
      color: #969699;
    }
    .infor-pay dd {
      font-size: 24px;
      color: #FD7220;
    }
  }
  .msrp {
    font-size: 14px;
    color: #969699;
    line-height: 14px;
    margin-left: 5px;
  }
  .coupon-without-login {
    font-size: 18px;
    color: #969699;
  }

  .link {
    color: #4D87EA;
    text-decoration: underline;
    cursor: pointer;
  }

  .pay-compuint {
    font-size: 18px;
    color: #303137;
    margin: 0 20px;
  }

  .pay-limit {
    font-size: 14px;
    color: #969699;
  }

  .hash-pay {
    margin-top: 50px;
    width: 272px;
    .pay-btn {
      color: #fff;
      background: #2A5CAA;
      width: 100%;
      margin-bottom: 15px;
      height: 54px;
      font-size: 18px;
    }
    .el-button--primary {
      border-color: none;
    }
  }

  .pay-btn.btn-disabled {
    background-color: #ddd;
    border-color: #ddd;
  }

  .account-money {
    font-size: 14px;
    .money {
      color: #969699;
    }
    .money-num {
      color: #303137;
    }
    .right {
      color: #4D87EA;
      cursor: pointer;
    }
  }

  .summary-item {
    padding: 18px 0 20px;
    background: #F8F8F8;
    text-align: center;
    color: #303137;
    line-height: 70px;

    img {
      max-height: 70px;
      max-width: 65px;
      vertical-align: middle;
    }
    .intro-text {
      font-size: 14px;
      margin: 20px 0 10px;
      line-height: 1;
    }
    .intro-num {
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
    }
  }

  .hash-list-tip {
    padding: 12px 0 22px;
    font-size: 12px;
    color: #969699;
  }

  .hash-list > ul {
    background: #F8F8F8;
    margin-bottom: 40px;
    li {
      font-size: 18px;
      color: #303137;
      width: 132px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      float: left;
      transition: all 0.5s ease;
      cursor: pointer;
      &.active {
        background: #2A5CAA;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .hash-list-content {
    padding-bottom: 40px;
    border: 1px solid #E3E3E3;
  }

  .product-params {
    padding: 40px 225px 0;
    margin: 0 auto;
    .product-title {
      font-size: 24px;
      color: #303030;
      text-align: center;
      margin-bottom: 30px;
    }
    dd, dt {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      margin: 0;
    }
    dt {
      color: #9B9B9B;
      min-width: 100px;
    }
    dd {
      color: #000;
      margin-left: 20px;
    }
    dl > div {
      padding-left: 80px;
      font-size: 14px;
    }
    dl > div:nth-of-type(2n-1) {
      background: #F8F8F8;
    }
  }

  .tabs-pane-question {
    padding-left: 50px;
    padding-top: 40px;
    li {
      margin-bottom: 30px;
    }
    span {
      cursor: pointer;
      &:hover {
        color: #4D87EA;
      }
    }
    i {
      font-size: 10px;
      margin-right: 14px;
    }
    div {
      margin-top: 16px;
      padding: 16px 30px;
      background: #F8F8F8;
      font-size: 14px;
      color: #606166;
      line-height: 21px;
    }
  }

  .tabs-pane-history {
    padding-top: 40px;
    table {
      width: 800px;
      padding-left: 30px;
      color: #303137;
    }
    tr {
      th {
        text-align: left;
        padding-bottom: 30px;
      }
      td {
        font-size: 14px;
        padding: 15px 0;
      }
    }
  }

  .dialog-content {
    position: relative;
    line-height: 40px;
    img {
      vertical-align: middle;
      float: left;
    }
    div {
      margin-left: 15px;
      span {
        color: #303137;
      }
      p {
        font-size: 12px;
        color: #969699;
      }
    }
  }

  .input-bind {
    width: 100%;
    height: 36px;
    border: 1px solid #EDEEF0;
    font-size: 14px;
    text-indent: 15px;
  }

  .input-bind + p {
    line-height: 40px;
    padding-left: 16px;
    color: red;
  }

  .form-item {
    margin-bottom: 20px;

    dt, dd {
      display: inline-block;
      margin: 0;
      padding: 0;
    }
    dt {
      width: 60px;
      line-height: 36px;
    }
    dd {
      float: right;
      width: 300px;
    }
  }

  .drop-down-box {
    width: 100%;
  }

  .code-ipt {
    width: 220px;
  }

  .send-code {
    float: right;
    min-width: 70px;
    height: 36px;
  }

  .error {
    color: #f95453;
    font-size: 12px;
    padding-left: 0.4em;
  }

  .rewardTable {
    width: 300px;
  }

  .tb-rule {
    width: 100%;
    line-height: 28px;
    text-align: center;
    border-spacing: 0;
    border-radius: 5px;
    th, td {
      border-right: 0;
      border-top: 0;
      padding: 0;
      border-bottom: 1px solid #f0f0f0;
      height: 34px;
      line-height: 34px;
    }
    tr:last-child td {
      border-bottom: none;
    }
  }

  .tips {
    line-height: 20px;
    font-size: 12px;
    color: #999696;
  }

  .tips + .form-wrap {
    margin-top: 20px;
  }

  .detail-money {
    display: inline-block;
    width: calc(100% - 90px);
  }

  .error-money {
    position: absolute;
    left: 90px;
    top: 30px;
    color: #f95453;
    font-size: 12px;
  }

  .chooseCoupon {
    color: #4185F5;
    cursor: pointer;
    span {
      color: #FD7220;
    }
  }
</style>
  