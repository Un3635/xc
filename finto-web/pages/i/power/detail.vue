<template>
  <div class="page">
    <h2 class="header">マイニング概要</h2>
    <ul class="tabs">
      <li :class="{active:selectedStatus===1}" @click="selectedStatus=1">ご購入済み</li>
      <li :class="{active:selectedStatus===0}" @click="selectedStatus=0" class="tab-contract">
        終了済み
        <!--<span class="tip-contract" v-if="selectedStatus===0">-->
        <!--<el-popover placement="bottom-start" popper-class="compute-contract" trigger="hover"-->
        <!--content="当账户余额、该加密货币账户或者连续10天收益（根据选择的付费方式计算），不足以抵扣耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束。">-->
        <!--<i slot="reference" class="iconfont icon-help"></i>-->
        <!--</el-popover>-->
        <!--</span>-->
      </li>
    </ul>
    <!-- 合约结束 content -->
    <div v-if="selectedStatus===0">
      <div class="no-data" v-if="tableData.length<1">
        <img class="img-contract" src="../../../assets/images/compute-contract.png" alt="契約終了の記録はございません。">
        <p>終了済みのクラウドマイニングはまだございません。</p>
        <button class="go-to-buy" @click="$router.replace('/hash')">今すぐ購入する</button>
      </div>
      <div v-if="tableData.length>0">
        <div class="noTitle">
          クラウドマイニングの契約期間は2年間となります。契約終了後については、再度クラウドマイニングをご購入ください。詳しい内容は000をご参照ください。
        </div>
        <div class="clearfix box-info">
          <div class="left info">
            <h3>マイニング概要</h3>
            <ul>
              <li>
                <span id="endTotal"><i class="icon-point status-3"></i>終了</span>
                <span>{{(info.endPower || 0) | currency}}{{unit}}</span>
              </li>
              <li>
                <span class="total-cost">金額</span>
                <strong>{{(info.totalMoney || 0) | currency}} 円</strong>
              </li>
            </ul>
          </div>
          <div class="left">
            <h3>収支概要</h3>
            <div class="info-income">
              <div class="clearfix">
                <div class="left income-item">
                  <span>産出コイン({{symbol}})</span>
                  <p>{{(info.outputB || 0) | cryptocurrency}}</p>
                </div>
                <div class="left income-item">
                  <span>管理費({{symbol}})</span>
                  <p>{{(info.serviceCharge || 0) | cryptocurrency}}</p>
                </div>
                <div class="left income-item">
                  <span>電気代({{symbol}})</span>
                  <p>{{(info.energyCharge || 0) | cryptocurrency}}</p>
                </div>
                <div class="left income-item">
                  <span>実際({{symbol}})</span>
                  <p class="real">{{(info.realityB || 0) | cryptocurrency}}</p>
                </div>
              </div>
              <div class="income-money">
                <span>収益予測 </span>
                <strong>¥ {{(info.income || 0) | currency}}</strong>
                <el-popover placement="bottom" width="250" popper-class="custom" trigger="hover" content="予測収益は毎日午前8時時点でのBitbankにおける価格を基準とし算出しております。">
                  <i slot="reference" class="iconfont icon-help"></i>
                </el-popover>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="clearfix title-table">
            <h3 class="left">マイリスト</h3>
          </div>
          <table class="table-end">
            <thead>
            <tr>
              <td>クラウドID</td>
              <td>ハッシュ({{unit}})</td>
              <td>金額(円)</td>
              <td>ステータス</td>
              <td>購入日時</td>
              <td>スタート日時</td>
              <td>終了日時</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="tableData.length < 1">
              <td colspan="7" class="nodata">現在表示できるデータはございません</td>
            </tr>
            <tr v-for="item in tableData" :key="item.orderNo">
              <td>
                <span class="data-num"
                      @click="$router.push({path:'/i/power/info',query:{pId: item.orderNo, currencyId, symbol}})">
                {{item.orderNo}}
              </span>
              </td>
              <td>{{item.goodsCount || 0}}</td>
              <td>{{(item.totalAmount || 0)|currency}}</td>
              <td :class="'status-'+3">
                <i class="icon-point" :class="'status-'+3"></i>終了
              </td>
              <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.endTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 合约结束 content -->

    <!-- 购买明细 content -->
    <div v-if="selectedStatus===1">
      <div class="no-data" v-if="tableData.length < 1">
        <img class="img-buy" src="../../../assets/images/compute-buy.png" alt="まだ購入していません。">
        <p>まだクラウドマイニングをご利用頂いておりません。</p>
        <button class="go-to-buy" @click="$router.replace('/hash')">今すぐ購入する</button>
      </div>
      <div class="c-content" v-if="tableData.length>0">
        <div class="hash-summary">
          <h3>クラウドマイニング概要</h3>
          <el-row class="hash-summary-contents">
            <el-col :span="8" class="text-success">
              <div>
                <span>種類</span>
                <span>{{info.machineCurrency}}マイニング</span>
                <i class="icon-point status-1"></i>
                <span>マイニング中</span>
                <span>{{(info.alyPower || 0) | currency}}{{unit}}</span>
              </div>
              <div>
                <span>合計</span>
                <span>{{info.totalMoney | currency}} 円</span>
                <i class="icon-point status-0"></i>
                <span>スタート待ち</span>
                <span>{{(info.penddPower || 0) | currency}}{{unit}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="clearfix title-table">
            <h3 class="left">マイリスト</h3>
          </div>
          <table class="table-normal">
            <thead>
            <tr>
              <td>クラウドID</td>
              <td>ハッシュ({{unit}})</td>
              <td>金額(円)</td>
              <td>ステータス</td>
              <td>購入日時</td>
              <td>スタート日時</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData" :key="item.orderNo" :class="{'color-delivery-wait':item.status === 0}">
              <td>
                <span v-if="item.status === 0">{{item.orderNo}}</span>
                <span :class="{'data-num':item.status > 0}"
                      v-if="item.status > 0"
                      @click="$router.push({path:'/i/power/info',query:{pId: item.orderNo, currencyId, symbol}})">
                    {{item.orderNo}}
                  </span>
              </td>
              <td>{{item.goodsCount || 0}}</td>
              <td>{{(item.totalAmount || 0)|currency}}</td>
              <td :class="'status-'+item.status" v-if="item.status === 0">
                <i class="icon-point" :class="'status-'+item.status"></i>スタート待ち
              </td>
              <td :class="'status-'+item.status" v-if="item.status === 1">
                <i class="icon-point" :class="'status-'+item.status"></i>マイニング中
              </td>
              <!-- <td :class="'status-'+item.detailVo.runStatus" v-else-if="item.status === 1">
                <i class="icon-point" :class="'status-'+item.detailVo.runStatus"></i>{{item.detailVo.runStatus | hashOrderStatus}}
              </td> -->
              <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 购买明细 content -->

    <div v-if="tableData.length>0">
      <div class="pagination" v-if="count > 1">
        <el-pagination
          popper-class="pagination-select"
          class="text-left"
          layout="sizes, prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import PowerApi from '../../../services/power-api';
  import errorHandler from '../../../services/error-handler';

  export default {
    head() {
      return {
        title: 'クラウドマイニング｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    breadcrumb() {
      return {
        label: 'クラウドマイニング明細',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/power',
            label: 'クラウドマイニング'
          }
        ]
      };
    },
    computed: {
      symbol() {
        return this.info.machineCurrency;
      },
      unit() {
        return this.info.computingUnit;
      }
    },
    data() {
      return {
        currencyId: '',
        selectedStatus: 1,
        currentPage: 1,
        pageSize: 10,
        count: 0,
        tableData: [],
        info: {}
      };
    },
    methods: {
      powerDetail() {
        const currencyId = this.$route.query.currencyId;
        let status = this.selectedStatus;
        if (this.selectedStatus === 3) { // 奖励明细（
          status = '3,4'; //（3 -- 邀请奖励  4 -- 买赠）
        }
        PowerApi.powerDetail(currencyId, status)
          .then(res => {
            this.info = res;
          });
      },
      powerDetailList() {
        const currencyId = this.$route.query.currencyId;
        let status = this.selectedStatus;
        if (this.selectedStatus === 3) { // 奖励明细（
          status = '3,4'; //（3 -- 邀请奖励  4 -- 买赠）
        }
        PowerApi.powerDetailList(currencyId, status, this.currentPage, this.pageSize)
          .then(res => {
            if (res.code === '000000') {
              this.count = res.count;
              return res.data || [];
            }
            return Promise.reject(res);
          })
          .then(res => {
            this.tableData = res;
          });
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.powerDetailList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.powerDetailList();
      }
    },
    watch: {
      selectedStatus: {
        handler(val) {
          this.powerDetail();
          this.powerDetailList();
        }
      }
    },
    mounted() {
      this.currencyId = this.$route.query.currencyId;
      this.powerDetail();
      this.powerDetailList();
    }
  };
</script>

<style scoped lang="scss">

  .noTitle {
    width: 970px;
    height: 74px;
    margin: 20px auto 0;
    padding: 12px 18px;
    font-size: 12px;
    color: #868688;
    letter-spacing: 0;
    line-height: 24px;
    background: #FAFAFA;
  }

  .box-info {
    padding: 30px;
    color: #303137;
    font-size: 14px;

    .info {
      margin-right: 20px;
    }

    .modify {
      display: inline-block;
      margin-left: 45px;
      color: #4D87EA;
      cursor: pointer;
    }

    ul {
      width: 290px;
      height: 150px;
      background: #FAFAFA;
      padding-top: 30px;
      padding-left: 30px;

      li {
        margin-bottom: 20px;
      }
    }

    .powerid-hover {
      display: inline-block;
      cursor: default;
      color: #303137;
    }

    span:nth-child(1) {
      display: inline-block;
      width: 75px;
      color: #999999;
    }

    .info-income {
      width: 658px;
      height: 150px;
      padding-top: 30px;
      padding-left: 30px;
      background: #FAFAFA;

      .income-item {
        width: 25%;
        span {
          width: 100%;
          color: #999;
        }
        p {
          margin-top: 6px;
          margin-bottom: 10px;
        }
        .real {
          color: #F95453;
          font-weight: bold;
        }
      }

      .income-money {
        margin-top: 20px;
        strong {
          font-size: 18px;
          color: #303137;
          letter-spacing: -0.23px;
          font-weight: bold;
        }
      }
    }
  }

  .header {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
  }

  .tabs {
    width: 100%;
    height: 43px;
    line-height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
  }

  .tabs li {
    float: left;
    font-size: 16px;
    color: #969699;
    margin: 0 30px;
    cursor: pointer;
  }

  .tabs .active {
    color: #2A5CAA;
    border-bottom: 3px solid #2A5CAA;
    font-weight: bold;
  }

  .tab-contract {
    position: relative;
  }

  .tip-contract {
    position: absolute;
    left: 70px;
    top: 0;
    .tip-content {
      font-size: 12px;
      color: red;
    }
  }

  .icon-help {
    width: 15px;
    height: 15px;
    font-size: 15px;
    color: #999;
    font-weight: normal;
    margin-left: 10px;
  }

  .no-data {
    width: 1030px;
    height: 455px;
    text-align: center;
    color: #969699;

    img {
      width: 120px;
      height: 120px;
    }

    p {
      margin-top: 30px;
    }

    .go-to-buy {
      margin-top: 30px;
      width: 124px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      background: #2A5CAA;
      border: 1px solid #2A5CAA;
      cursor: pointer;
    }

    .img-buy {
      margin-top: 66px;
    }

    .img-contract {
      margin-top: 94px;
    }
  }

  .icon-point {
    display: inline-block;
    font-style: normal;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 10px;
    color: #606166;
    background-color: #606166;
    &.status-0 {
      background-color: #ffbd2d;
    }
    &.status-1 {
      background-color: #2db66f;
    }
    &.status-3 {
      background-color: #f85453;
    }
    &.status-2 {
      background-color: #606166;
    }
  }

  .status-0 {
    color: #ffbd2d;
  }

  .status-1 {
    color: #2db66f;
  }

  .status-3 {
    color: #f85453;
  }

  .status-2 {
    color: #606166;
  }

  #endTotal {
    color: #f85453;
  }

  h3 {
    font-size: 16px;
    color: #303137;
    margin-bottom: 12px;
  }

  .title-table {
    margin: 12px 30px;
    font-size: 14px;
    h3 {
      margin-bottom: 0;
    }
    span {
      vertical-align: bottom;
      display: inline-block;
      color: #f85453;
      &:nth-child(1) {
        margin-right: 20px;
      }
    }
    .total-cost {
      color: #606166;
      margin-left: 50px;
    }
  }

  .tb {
    width: 970px;
    margin-left: 30px;
  }

  .data-num {
    color: #2A5CAA;
    cursor: pointer;
  }

  table {
    width: 970px;
    table-layout: fixed;
    border-collapse: collapse;
    margin-left: 30px;
    font-size: 14px;
  }

  tr {
    min-height: 50px;
  }

  .nodata {
    height: 60px;
    text-align: center;
    color: #969699;
  }

  thead tr {
    background: #fafafa;
    color: #606166;
  }

  thead td {
    color: #5e5f64;
  }

  tr:nth-child(2n) {
    background: #fafafa;
  }

  td {
    border: 1px solid #f5f5f7;
    padding: 16px 10px;
    word-wrap: break-word;
    word-break: normal;
    line-height: 20px;
  }

  .color-delivery-wait {
    color: #999;
  }

  .table-normal {
    tr td:nth-child(1) {
      width: 212px;
    }
    tr td:nth-child(2) {
      width: 102px;
    }
    tr td:nth-child(3) {
      width: 137px;
      // text-align: right;
    }
    tr td:nth-child(4) {
      width: 145px;
    }
    tr td:nth-child(5) {
      width: 196px;
    }
    tr td:nth-child(6) {
      width: 190px;
    }
  }

  .table-end {
    tr td:nth-child(1) {
      width: 206px;
    }
    tr td:nth-child(2) {
      width: 95px;
    }
    tr td:nth-child(3) {
      width: 126px;
      // text-align: right;
    }
    tr td:nth-child(4) {
      width: 140px;
    }
    tr td:nth-child(5),
    tr td:nth-child(6) {
      width: 124px;
    }
    tr td:nth-child(7) {
      width: 142px;
    }
  }

  .pagination {
    padding-left: 30px;
    margin-top: 20px;
    text-align: center;
  }

  .hash-summary {
    padding: 30px;
  }

  .hash-summary-content{
    padding: 30px 40px;
    background-color: #fafafa;

    & > div {
      padding-left: 100px;
      &:nth-child(2) {
        border-left: 1px solid #e5e5e5;
        /*border-right: 1px solid #e5e5e5;*/
      }
      &:first-child {
        padding-left: 0;
      }
    }

    p {
      font-size: 14px;
      line-height: 20px;
      position: relative;
    }

    h3 {
      font-size: 24px;
      color: inherit;
      margin: 15px 0 0;
      line-height: 1;
    }

    .icon-point {
      position: absolute;
      left: -10px;
      top: 7px;
    }

    .text-success {
      color: #2bb56f;
    }

    .text-warning {
      color: #ffbd2d;
    }
  }
  
  .hash-summary-contents {
    width: 465px;
    height: 133px;
    padding: 30px 40px;
    background-color: #fafafa;
    div {
      width: 100%;
      height: 30px;
      font-size: 14px;
      span {
        display: inline-block;
      }
      span:first-child {
        width: 60px;
        color: #999;
      }
      span:nth-child(2) {
        width: 140px;
        color: #303137;
      }
      span:nth-child(4) {
        color: #999;
        width: 90px;
      }
      span:last-child {
        color: #303137;
      }
    }
    div:first-child {
      margin-bottom: 15px;
    }
  }

  .c-content {
    padding-bottom: 30px;
  }
</style>
