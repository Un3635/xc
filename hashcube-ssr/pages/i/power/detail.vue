<template>
  <div class="page">
    <h2 class="header">算力明细</h2>
    <ul class="tabs">
      <li :class="{active:selectedStatus===1}" @click="selectedStatus=1">购买明细</li>
      <!--<li :class="{active:selectedStatus===2}" @click="selectedStatus=2">交易明细</li>-->
      <li :class="{active:selectedStatus===3}" @click="selectedStatus=3">奖励明细</li>
      <li :class="{active:selectedStatus===0}" @click="selectedStatus=0" class="tab-contract">
        合约结束
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
        <img class="img-contract" src="../../../assets/images/compute-contract.png" alt="无合约结束记录">
        <p>您的收益很棒，暂无合约结束的云算力！</p>
      </div>
      <div v-if="tableData.length>0">
        <div class="hash-summary" v-if="selectedStatus!==0">
          <h3>算力概况</h3>
          <el-row class="hash-summary-content">
            <el-col :span="8" class="text-success">
              <p><i class="icon-point status-1"></i>已交割</p>
              <h3>{{info.alyPower || 0}}{{unit}}</h3>
            </el-col>
            <el-col :span="8" class="text-warning">
              <p><i class="icon-point status-0"></i>待交割</p>
              <h3>{{info.penddPower || 0}}{{unit}}</h3>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="clearfix title-table">
            <h3 class="left">算力详情</h3>
            <div class="right">
              <span><i class="icon-point status--1"></i>已结束</span>
              <span>{{info.endPower || 0}}{{unit}}</span>
              <span class="total-cost">总费用：</span>
              <strong>{{(info.totalMoney || 0) | currency}}元</strong>
            </div>
          </div>
          <table class="table-end">
            <thead>
            <tr>
              <td>算力ID</td>
              <td>算力({{unit}})</td>
              <td>算力费用(CNY)</td>
              <td>实际币量({{symbol}})</td>
              <td>购买时间</td>
              <td>交割时间</td>
              <td>合约结束时间</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="tableData.length < 1">
              <td colspan="7" class="nodata">暂无数据</td>
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
              <td>{{item.outB || 0}}</td>
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

    <!-- 奖励明细 content -->
    <div v-if="selectedStatus===3">
      <div class="no-data" v-if="tableData.length < 1">
        <img class="img-contract" src="../../../assets/images/compute-contract.png" alt="无奖励记录">
        <p>暂无奖励的算力！</p>
      </div>
      <div class="c-content" v-if="tableData.length>0">
        <div class="hash-summary">
          <h3>算力概况</h3>
          <el-row class="hash-summary-content">
            <el-col :span="8" class="text-success">
              <p><i class="icon-point status-1"></i>已交割</p>
              <h3>{{info.alyPower || 0}}{{unit}}</h3>
            </el-col>
            <el-col :span="8" class="text-warning">
              <p><i class="icon-point status-0"></i>待交割</p>
              <h3>{{info.penddPower || 0}}{{unit}}</h3>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="clearfix title-table">
            <h3 class="left">算力详情</h3>
          </div>
          <table class="table-normal">
            <thead>
            <tr>
              <td>算力ID</td>
              <td>算力({{unit}})</td>
              <td>算力费用(CNY)</td>
              <td>状态</td>
              <td>购买时间</td>
              <td>交割时间</td>
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
              <td :class="'status-'+item.status">
                <i class="icon-point" :class="'status-'+item.status"></i>{{item.status | hashOrderStatus}}
              </td>
              <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 奖励明细 content -->

    <!-- 购买明细 content -->
    <div v-if="selectedStatus===1">
      <div class="no-data" v-if="tableData.length < 1">
        <img class="img-buy" src="../../../assets/images/compute-buy.png" alt="无购买记录">
        <p>您还没有购买过云算力呢！</p>
        <button class="go-to-buy" @click="$router.replace('/hash')">去选购</button>
      </div>
      <div class="c-content" v-if="tableData.length>0">
        <div class="hash-summary">
          <h3>算力概况</h3>
          <el-row class="hash-summary-content">
            <el-col :span="8" class="text-success">
              <p><i class="icon-point status-1"></i>已交割</p>
              <h3>{{info.alyPower || 0}}{{unit}}</h3>
            </el-col>
            <el-col :span="8" class="text-warning">
              <p><i class="icon-point status-0"></i>待交割</p>
              <h3>{{info.penddPower || 0}}{{unit}}</h3>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="clearfix title-table">
            <h3 class="left">算力详情</h3>
          </div>
          <table class="table-normal">
            <thead>
            <tr>
              <td>算力ID</td>
              <td>算力({{unit}})</td>
              <td>算力费用(CNY)</td>
              <td>状态</td>
              <td>购买时间</td>
              <td>交割时间</td>
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
              <td :class="'status-'+item.status">
                <i class="icon-point" :class="'status-'+item.status"></i>{{item.status | hashOrderStatus}}
              </td>
              <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 购买明细 content -->

    <!-- 交易明细 content -->
    <div v-if="selectedStatus===2">
      <div class="no-data" v-if="tableData.length < 1">
        <img class="img-contract" src="../../../assets/images/compute-contract.png" alt="无交易记录">
        <p>您的收益很棒，暂无交易明细数据！</p>
      </div>
      <div class="c-content" v-if="tableData.length>0">
        <div class="hash-summary">
          <h3>算力概况</h3>
          <el-row class="hash-summary-content">
            <el-col :span="8" class="text-success">
              <p><i class="icon-point status-1"></i>已交割</p>
              <h3>{{info.alyPower || 0}}{{unit}}</h3>
            </el-col>
            <el-col :span="8" class="text-warning">
              <p><i class="icon-point status-0"></i>待交割</p>
              <h3>{{info.penddPower || 0}}{{unit}}</h3>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="clearfix title-table">
            <h3 class="left">算力详情</h3>
          </div>
          <table class="table-normal">
            <thead>
            <tr>
              <td>算力ID</td>
              <td>算力({{unit}})</td>
              <td>算力费用(CNY)</td>
              <td>状态</td>
              <td>购买时间</td>
              <td>交割时间</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData" :key="item.orderNo" :class="{'color-delivery-wait':item.status === 0}">
              <td>
                <span v-if="item.status === 0">{{item.orderNo}}</span>
                <span :class="{'data-num':item.status > 0}"
                      v-if="item.status > 0"
                      @click="$router.push({path:'/i/power/info',query:{pId: item.orderNo,currencyId,symbol}})">
                    {{item.orderNo}}
                  </span>
              </td>
              <td>{{item.goodsCount || 0}}</td>
              <td>{{(item.totalAmount || 0)|currency}}</td>
              <td :class="'status-'+item.status">
                <i class="icon-point" :class="'status-'+item.status"></i>{{item.status | hashOrderStatus}}
              </td>
              <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 交易明细 content -->

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
    breadcrumb() {
      return {
        label: '算力明细',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          },
          {
            path: '/i/power',
            label: '我的云算力'
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
            if (res.code === '000000') {
              return res.data;
            }
            return Promise.reject(res);
          })
          .then(res => {
            this.info = res;
          })
          .catch(errorHandler);
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
        handler() {
          this.powerDetail();
          this.powerDetailList();
        },
        immediate: true
      }
    },
    mounted() {
      this.currencyId = this.$route.query.currencyId;
    }
  };
</script>

<style scoped lang="scss">
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
    color: #303137;
    border-bottom: 3px solid #303137;
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
      width: 86px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #606166;
      background: #f5f5f7;
      border: 1px solid #dddddd;
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
    &.status--1 {
      background-color: #f85453;
    }
  }

  .status-0 {
    color: #ffbd2d;
  }

  .status-1 {
    color: #2db66f;
  }

  .status--1 {
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
    color: #4d87ea;
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
      text-align: right;
    }
    tr td:nth-child(4) {
      width: 113px;
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
      text-align: right;
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

  .hash-summary-content {
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

  .c-content {
    padding-bottom: 30px;
  }
</style>
