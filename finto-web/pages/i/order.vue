<template>
  <div class="page">
    <h2 class="header">注文履歴</h2>
    <ul class="tabs">
      <li :class="{active:selected===tabItem}" v-for="(tabItem, index) in tabList"
          @click="selected=tabItem" :key="index">
        {{tabItem._label}}
      </li>
    </ul>
    <ul class="tabInnerLists" v-if="selected.type===1||selected.type===2||selected.type===5||selected.type===7">
      <li @click="goodsType=1" :class="{active:goodsType===1}">
        マシン
        <span v-if="selected.type===1">({{waitPayMachine}})</span>
        <span v-if="selected.type===2">({{waitShipMachine}})</span>
      </li>
      <li @click="goodsType=2" :class="{active:goodsType===2}">
        クラウドマイニング
        <span v-if="selected.type===1">({{waitPayPower}})</span>
        <span v-if="selected.type===2">({{waitShipPower}})</span>
      </li>
    </ul>
    <div class="content">
      <table class="order-table">
        <thead>
        <tr>
          <th class="t1 text-center" style="padding-right: 16px">商品</th>
          <th class="t2" v-if="goodsType===1">出荷時期</th>
          <th class="t2" v-if="goodsType===2">受渡し日付</th>
          <th class="t21" v-show="selected.status===0&&goodsType===1">サービスタイプ</th>
          <th class="t3">単価</th>
          <th class="t4 text-center">数量</th>
          <th class="t5 text-center" v-if="goodsType===1">合計</th>
          <th class="t5 text-center" v-if="goodsType===2">小計</th>
          <th class="t6">ステータス</th>
          <th class="t7"></th>
        </tr>
        </thead>
        <tbody v-if="orderList&&orderList.length>0">
        <tr v-for="(order ,index) in orderList" :key="index">
          <td :colspan="selected.status===0?8:7">
            <div class="order-summary-info">
              <dl class="order-summary__list">
                <div class="order-summary__item no">
                  <dt>注文ID</dt>
                  <dd>{{order.orderNo}}</dd>
                </div>
                <div class="order-summary__item">
                  <dt>注文時間</dt>
                  <dd>{{order.createTime | date('YYYY-MM-DD HH:mm:ss')}}</dd>
                </div>
                <div class="order-summary__item">
                  <dt>注文金額</dt>
                  <dd v-if="goodsType===1">{{order.amount | currency}}円</dd>
                  <dd v-if="goodsType===2">{{order.totalAmount | currency}}円</dd>
                </div>
              </dl>
              <!-- <a class="right link pre" target="_blank" :href="order._presellUrl"
                 v-if="(selected.type === 2 && goodsType ===1) || (selected.type === 4 && goodsType ===1) || (selected.type === 5 && goodsType ===1)">
                売買契約書をダウンロード
              </a> -->
              <!-- <a class="right link" target="_blank" :href="order._collUrl"
                 v-if="(selected.type === 6 && goodsType ===1) || (selected.type === 3 && goodsType ===1)">
                保守管理契約書
              </a> -->
            </div>
            <div class="order-goods-info" v-if="order.orderDetailInfos&&order.orderDetailInfos.length>0">
              <table class="goods-table">
                <tr v-for="(goodsItem, index) in order.orderDetailInfos" :key="index">
                  <td class="t1">
                    <div class="goods-detail">
                      <img :src="goodsItem.imageUrl" :alt="goodsItem.goodsName">
                      <p :title="goodsItem.goodsName">{{goodsItem.goodsName}}</p>
                      <p class="text-grey" :title="goodsItem.goodsSubTitle">{{goodsItem.goodsSubTitle}}</p>
                    </div>
                  </td>
                  <td class="t2" v-if="goodsType === 1">
                    <p>{{goodsItem.startSendTime | date('YYYY-MM-DD')}}</p>
                    <p>-</p>
                    <p>{{goodsItem.endSendTime | date('YYYY-MM-DD')}}</p>
                  </td>
                  <td class="t2" v-else-if="goodsType === 2">
                    <p v-if="goodsItem.deliveryTime">{{goodsItem.deliveryTime | date('YYYY-MM-DD')}}</p>
                    <p v-else>即時受渡し</p>
                  </td>
                  <td class="t21" v-show="selected.status===0 && goodsType === 1">{{goodsItem.serviceType | serviceType}}</td>
                  <td class="t3">{{goodsItem.unitPrice | currency}}円</td>
                  <td class="t4">
                    <p v-if="goodsType === 1">{{goodsItem.batchGoodsCount}}台</p>
                    <p v-if="goodsType === 2">{{goodsItem.batchGoodsCount}}{{goodsItem.computingUnit}}</p>
                    <p class="text-grey" v-if="selected.status===1&&selected.type===0&&goodsItem.allowTrust">
                      {{goodsItem.hostingCount}}台を委託しました</p>
                  </td>
                  <td class="t5">{{goodsItem.batchGoodsCount * goodsItem.unitPrice | currency}}円</td>
                  <td v-if="index === 0" :rowspan="order.orderDetailInfos.length" class="t6">
                    {{goodsItem.orderStatusStr}}
                    <el-popover
                      v-if="selected.type===7&&order.remark"
                      placement="bottom"
                      width="180"
                      trigger="hover">
                      <slot>
                        <div>
                          {{order.remark}}
                        </div>
                      </slot>
                      <i slot="reference" class="iconfont icon-help"></i>
                    </el-popover>
                  </td>
                  <td v-if="index === 0" :rowspan="order.orderDetailInfos.length" class="t7">
                    <div v-if="order.status===0&&order.statusPay===0&&goodsType===1">
                      <el-button class="btn-operate" type="primary" size="small"
                                 @click="toPay(order)">
                        お支払いへ
                      </el-button>
                      <p class="cancel-order" @click="showCancel(order)">キャンセルする</p>
                    </div>
                    <div v-else-if="order.statusPay===0&&goodsType===2">
                      <el-button class="btn-operate" type="primary" size="small"
                                 @click="toPay(order)">
                        お支払いへ
                      </el-button>
                      <p class="cancel-order" @click="showCancel(order)">キャンセルする</p>
                    </div>
                    <div
                      v-else-if="goodsItem.serviceType===1&&(goodsItem.status===1||goodsItem.status===2)&&goodsType===1"
                      class="delivery"
                      @click="seeExpress(order)">
                      配送状況のご確認
                    </div>
                    <span v-else>--</span>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <el-pagination
        v-if="orderList&&orderList.length>0"
        class="text-center"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :total="page.total">
      </el-pagination>
      <el-dialog title="キャンセル" :visible.sync="dialogVisible" width="420px" custom-class="custom">
        <span>注文をキャンセルしますか？</span>
        <span slot="footer">
          <el-button @click="dialogVisible = false">いいえ</el-button>
          <el-button type="primary" @click="cancelOrder">はい</el-button>
        </span>
      </el-dialog>
      <el-dialog title="配送状況のご確認" :visible.sync="expressDialogVisible" width="420px" custom-class="line-top">
        <div class="express-content">
          <el-row class="e-header">
            <el-col :span="24">お問い合わせ番号</el-col>
            <!-- <el-col :span="12" class="vl pl20"></el-col> -->
          </el-row>
          <el-row v-for="(item, index) in logList" :key="index">
            <el-col :span="12">{{item}}</el-col>
            <el-col :span="12" class="pl20">
              <a class="el-button--text"
                 :href="'http://www.sf-express.com/jp/ja/dynamic_function/waybill/#search/bill-number/'+item"
                 target="_blank">配送状況を確認する</a>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog title="ご注文情報" :visible.sync="toPayDialog" custom-class="order-confirm custom"
                 width="420px">
        <dl class="pay-info">
          <div class="pay-info__item">
            <dt>商品金額</dt>
            <dd>{{toPayList.goodsAmount | currency}}円</dd>
          </div>
          <div class="pay-info__item">
            <dt>運送費</dt>
            <dd>{{toPayList.freightAmount | currency}}円</dd>
          </div>
          <div class="pay-info__item">
            <dt>セットアップ費</dt>
            <dd>{{toPayList.putAwayAmount | currency}}円</dd>
          </div>
          <div class="pay-info__item">
            <dt>お支払い総額</dt>
            <dd class="total">{{toPayList.amount | currency}}円</dd>
          </div>
        </dl>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="isToPay">お支払いへ</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import OrderAPI from '../../services/order-api';
  import errorHandler from '../../services/error-handler';
  import {mapState} from 'vuex';
  import {AppConfig} from '../../services/config';

  export default {
    head() {
      return {
        title: '注文履歴｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    breadcrumb() {
      return {
        label: '注文履歴',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          }
        ]
      };
    },
    data() {
      return {
        tabList: [
          {label: '未払い', type: 1, status: 0},
          {label: '未出荷/未受渡', type: 2},
          {label: '未受渡', type: 3},
          {label: '未受取', type: 4},
          {label: '受取済み/受渡済み', type: 5},
          {label: '受渡済み', type: 6},
          {label: 'その他', type: 7}
        ],
        selected: {label: '未払い', type: 1},
        orderList: [],
        dialogVisible: false,
        expressDialogVisible: false,
        rulesAgree: true,
        preCancelOrder: null,
        activeNames: '0',
        logList: [],
        toPayDialog: false,
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 1
        },
        goodsType: 1,
        firstType: '',
        toPayList: {
          goodsAmount: 0,
          freightAmount: 0,
          putAwayAmount: 0,
          amount: 0,
          orderNo: ''
        },
        waitPayMachine: 0,
        waitPayPower: 0,
        waitShipMachine: 0,
        waitShipPower: 0
      };
    },
    computed: {
      ...mapState(['token'])
    },
    filters: {
      serviceType(value) {
        switch (value) {
          case 1:
            return '配送';
          case 2:
            return '委託';
        }
      }
    },
    methods: {
      updateTabLabel(data) {
        this.tabList.forEach(item => {
          this.$set(item, '_label', item.label);
          if (item.type === 1) {
            item._label = item.label + '(' + (data.waitPay || 0) + ')';
          }
          if (item.type === 2) {
            item._label = item.label + '(' + (data.waitShip || 0) + ')';
          }
          if (item.type === 3) {
            item._label = item.label + '(' + (data.waitTrust || 0) + ')';
          }
          if (item.type === 4) {
            item._label = item.label + '(' + (data.waitReceiving || 0) + ')';
          }
          item._label = item._label || item.label;
        });
      },
      // 获取各种状态列表
      centerList() {
        OrderAPI.orderSummary()
          .then(res => {
            this.waitPayMachine = res.waitPayMachine;
            this.waitPayPower = res.waitPayPower;
            this.waitShipMachine = res.waitShipMachine;
            this.waitShipPower = res.waitShipPower;
            this.updateTabLabel(res);
          })
          .catch(() => {
          });
        OrderAPI.centerList(this.selected.type, this.goodsType, this.page.currentPage, this.page.pageSize)
          .then(res => {
            this.page.total = res.count || 0;
            return res.data;
          })
          .then(res => res.data)
          .then(res => {
            this.orderList = [];
            res.forEach(item => {
              item.discountAmount = +item.discountAmount;
              item._reason = '';
              item._presellUrl = AppConfig.baseURL + '/api/contract/exportPDF?token=' + this.token + '&orderNo=' + item.orderNo;
              // (item.orderInfoDetails || []).forEach(sOrder => {
              //   sOrder.collUrl = AppConfig.baseURL + '/api/contract/exportAgreement?token=' + this.token + '&orderNo=' + item.orderNo + '&batchGoodsId=' + sOrder.batchGoodsId;
              // });
              item._collUrl = AppConfig.baseURL + '/api/contract/exportAgreement?token=' + this.token + '&orderNo=' + item.orderNo;
            });
            this.orderList = res;
          });
      },
      //物流信息
      seeExpress(data) {
        OrderAPI.getExpressNoList(data.orderNo)
          .then((res) => {
            this.logList = res;
            this.expressDialogVisible = true;
          })
          .catch(res => errorHandler(res));
      },
      // 去支付
      toPay(order) {
        if (this.goodsType === 1) {
          this.toPayList.goodsAmount = order.goodsAmount;
          this.toPayList.freightAmount = order.freightAmount;
          this.toPayList.putAwayAmount = order.putAwayAmount;
          this.toPayList.amount = order.amount;
          this.toPayList.orderNo = order.orderNo;
          this.toPayDialog = true;
        } else if (this.goodsType === 2) {
          this.$router.push({
            path: '/pay',
            query: {
              orderNo: order.orderNo,
              source: 1
            }
          });
        }
      },
      // 确认去支付
      isToPay() {
        this.$router.push({
          path: '/pay',
          query: {
            orderNo: this.toPayList.orderNo,
            source: 0
          }
        });
        this.toPayDialog = false;
      },
      // 取消订单
      cancelOrder() {
        this.dialogVisible = false;
        const orderId = this.preCancelOrder.id;
        const goodsType = this.goodsType;
        OrderAPI.cancel(orderId, goodsType)
          .then(() => {
            this.$message.success('キャンセルしました');
            this.centerList();
          })
          .catch(errorHandler);
      },
      // 展示取消
      showCancel(order) {
        this.preCancelOrder = order;
        this.dialogVisible = true;
      },
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.centerList();
      }
    },
    watch: {
      selected(val) {
        this.goodsType = (this.firstType && this.firstType !== '') ? Number(this.firstType) : 1;
        this.firstType = null;
        this.page = {
          currentPage: 1,
          pageSize: 10,
          total: 1
        };
        this.centerList();
      },
      goodsType(val) {
        this.page = {
          currentPage: 1,
          pageSize: 10,
          total: 1
        };
        this.centerList();
      }
    },
    mounted() {
      this.firstType = this.$route.query.goodsType;
      let selectedIndex = this.$route.query.selected || 0;
      this.selected = this.tabList[selectedIndex];
      this.updateTabLabel({});
    }
  };
</script>

<style scoped lang="scss">

  .page {

  }

  /*.order {*/
  /*position: relative;*/
  /*min-height: 430px;*/
  /*}*/

  /*.order-popover {*/
  /*width: 42px;*/
  /*height: 20px;*/
  /*background: #303137;*/
  /*position: absolute;*/
  /*top: 50px;*/
  /*left: 155px;*/
  /*font-size: 5px;*/
  /*line-height: 20px;*/
  /*text-align: center;*/
  /*color: #fff;*/
  /*}*/

  /*
  .order-popover i {
    display: block;
    border-top: 5px solid #303137;
    border-right: 5px solid #fff;
    border-bottom: 1px solid #fff;
    border-left: 5px solid #fff;
    background: #303137;
    position: absolute;
    bottom: -6px;
    left: 5px;
    font-size: 12px;
  }
  */

  .header {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
  }

  .tabs {
    height: 43px;
    line-height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #F5F5F7;

    li {
      float: left;
      margin: 0 30px;
      font-size: 14px;
      color: #999;
      cursor: pointer;
      user-select: none;

      &.active {
        color: #303137;
        border-bottom: 3px solid #303137;
        font-weight: bold;
      }
    }
  }

  .tabInnerLists {
    overflow: hidden;
    margin-top: 33px;
    margin-bottom: 13px;
    li {
      float: left;
      padding: 0 30px;
      font-size: 14px;
      color: #969699;
      height: 14px;
      line-height: 14px;
      cursor: pointer;
      user-select: none;
      border-left: 1px solid #eee;
      &.active {
        color: #000000;
        font-weight: bold;
      }
    }
    li:first-child {
      border-left: none;
    }
  }

  .content {
    padding: 20px 30px;
  }

  .sub-tabs {
    margin-top: 20px;
    padding-left: 30px;
    padding-right: 30px;

    li {
      display: inline-block;
      margin-left: 2em;
      font-size: 14px;
      color: #999;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.active {
        color: #303137;
        font-weight: bold;
      }
    }
  }

  .order-table {
    border-spacing: 0;
    font-size: 12px;
    width: 100%;
    > thead th {
      height: 55px;
      color: #333;
      border: 1px solid #eee;
      background-color: #fafafa;
      font-weight: normal;
      + th {
        border-left: 0;
      }
    }

    th, td {
      p {
        line-height: 15px;
      }
      &.t21 {
        min-width: 90px;
      }
      &.t1 {
        width: 200px;
        max-width: 200px;
        text-align: left;
        padding-left: 16px;
      }
      &.t2 {
        /*width: 195px;*/
        min-width: 90px;
        text-align: center;
      }
      &.t3 {
        width: 125px;
        text-align: center;
        padding-right: 16px;
      }
      &.t4 {
        width: 90px;
        text-align: center;
      }
      &.t5 {
        min-width: 110px;
        text-align: right;
        padding-right: 16px;
      }
      &.t6 {
        width: 105px;
        text-align: center;
      }
      &.t7 {
        width: 113px;
        text-align: center;
      }
    }

    > tbody > tr > td {
      padding-top: 20px;
    }

  }

  .order-summary-info {
    background-color: #fafafa;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px solid #F5F5F7;
    border-bottom: 0;
    color: #969699;
    .link {
      display: inline-block;
      line-height: 50px;
    }

    .pre {
      padding-left: 30px;
    }
  }

  .order-summary__list {
    display: inline-block;
  }

  .order-summary__item {
    display: inline-block;
    margin-left: 1em;

    &:first-child {
      margin-left: 0;
    }

    &.no {
      min-width: 230px;
    }

    dt, dd {
      display: inline-block;
      margin: 0;
      font-size: 12px;
      line-height: 50px;
    }
    dt {
      color: #999;
    }
    dd {
      margin-left: .5em;
    }
  }

  .goods-table {
    width: 100%;
    border-spacing: 0;

    td {
      padding: 15px 5px 5px;
      border: 1px solid #F5F5F7;
      border-top-width: 0;
      line-height: 20px;
      height: 86px;
      vertical-align: top;
      text-align: center;
      + td {
        border-left: 0;
      }
      &.t4 {
        padding-top: 17px;
      }
    }

    tr:first-child td {
      border-top-width: 1px;
    }
  }

  .goods-detail {
    position: relative;
    padding-left: 50px;
    width: 187px;
    text-align: left;
    padding-top: 5px;
    height: 40px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
    }
    p {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .text-grey {
    color: #969699;
  }

  .link {
    color: #4D87EA;
    cursor: pointer;
  }

  .summary {
    margin-top: -10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    text-align: center;

    h4 {
      font-size: 18px;
      color: #303137;
    }

    p {
      font-size: 12px;
      color: #969699;
    }
  }

  .hosting-info {
    margin-bottom: -10px;
  }

  .hosting-info__item {
    position: relative;
    margin-top: 20px;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #303137;

    dt, dd {
      display: inline-block;
      margin: 0;
    }

    dt {
      position: absolute;
      top: 50%;
      font-size: 14px;
      line-height: 30px;
      color: #969699;
      margin-top: -15px;
    }

    dd {
      float: right;
      text-align: right;
    }

    &.method-desc {
      /*margin-top: 10px;*/

      dd {
        display: block;
        padding: 10px 16px;
        font-size: 12px;
        line-height: 18px;
        background-color: #fafafa;
        color: #606166;
        text-align: left;
      }
    }

  }

  .rules {
    line-height: 40px;

    a {
      color: #4d87ea;
    }
  }

  .pay-method__list {
    height: 39px;
    margin-left: 30px;
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .pay-method__item {
    position: relative;
    display: inline-block;
    margin-left: 1em;
    vertical-align: top;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 25px;
    border: 1px solid #eee;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &.is-active {
      border-color: #4d87ea;

      &:after {
        content: "";
        position: absolute;
        right: -1px;
        bottom: -1px;
        display: inline-block;
        width: 20px;
        height: 20px;
        /*background: url(../../../assets/images/selected.png) no-repeat;*/
        background-size: cover;
      }
    }
  }

  .delivery {
    font-size: 12px;
    color: #4D87EA;
    line-height: 14px;
    cursor: pointer;
  }

  .icon-question {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #969699;
    color: #969699;
    text-align: center;
    line-height: 14px;
    font-style: normal;
    /*margin-left: 10px;*/
    font-size: 12px;
    cursor: pointer;
  }

  /*
  .express-summary {
    font-size: 12px;
    font-weight: normal;
  }

  .express-content {
    margin-top: -10px;
  }

  .express-no {
    display: inline-block;
    font-size: 14px;
    color: #303137;
  }

  .express-date {
    float: right;
    margin-right: 10px;
    font-size: 12px;
    color: #969699;
  }
  */

  .express-content {
    line-height: 34px;
    font-size: 14px;
    margin-top: -30px;

    .e-header {
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      line-height: 50px;
    }

    .vl:before {
      content: '';
      display: inline-block;
      height: 20px;
      width: 1px;
      background-color: #eee;
      vertical-align: middle;
      position: relative;
      left: -20px;
    }

    .pl20 {
      padding-left: 20px;
    }
  }

  .address-info {
    width: 100%;
  }

  .address-info li {
    padding: 20px 20px 0 20px;
    overflow: hidden;
  }

  .address-info strong {
    float: left;
    margin-top: 10px;
    width: 32px;
    height: 18px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    background: #303137;
    border-radius: 2px;
    font-weight: normal;
  }

  .address-info .detail-info {
    float: left;
    margin-left: 10px;
  }

  .address-info .no-new-info {
    float: left;
    margin-left: 42px;
  }

  .address-info .detail-info p:nth-child(1) {
    font-size: 12px;
    color: #969699;
    letter-spacing: 0;
    line-height: 18px;
  }

  .address-info .detail-info p:nth-child(2) {
    width: 270px;
    color: #303137;
  }

  .address-info .not-the-latest {
    margin-left: 42px;
  }

  .address-info .dot {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #303137;
    float: left;
    margin-top: 15px;
    margin-right: 10px;
  }

  .address-info .no-new-dot {
    background: #DEDEE0;
  }

  .btn-operate {
    border-radius: 0;
    min-width: 66px;
    padding: 5px 15px;
    font-size: 12px;
  }

  .num-box {
    float: right;
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 40px;
    border: 1px solid #efefef;
  }

  .num-box span {
    position: absolute;
    font-size: 24px;
    color: #969699;
    top: 0;
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
    height: 40px;
    line-height: 40px;
    border: none;
    padding: 0;
    vertical-align: top;
    text-align: center;
  }

  .cancel-order {
    margin-top: 10px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    color: #999;
  }

  .iconfont.icon-help {
    color: #969699;
    font-size: 15px;
  }

  .pay-info {
    padding-bottom: 30px;

    .pay-info__item {
      font-size: 14px;
      line-height: 1;
      margin-top: 20px;

      dt, dd {
        display: inline-block;
      }

      dt {
        color: #969699;
      }

      dd {
        color: #303137;
        float: right;
      }

      .total {
        color: #fd7220;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>


