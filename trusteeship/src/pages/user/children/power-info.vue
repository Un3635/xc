<template>
  <div class="page">
    <h2 class="header">算力详情</h2>
    <div class="clearfix box-info">
      <div class="left info">
        <h3>基本信息</h3>
        <ul>
          <li>
            <span>算力ID</span>
            <el-popover placement="bottom" width="220" popper-class="powerinfo-id"
                        trigger="hover" :content="powerId">
              <div slot="reference" class="powerid-hover"
                   v-html="powerId.length>12?powerId.slice(0,12)+'...':powerId"></div>
            </el-popover>
          </li>
          <li><span>机器型号</span>{{infoData.machineType||'--'}}</li>
          <li><span>算力数量</span>{{infoData.powerNum || 0}}{{infoData.powerUnit}}</li>
          <li><span>算力费用</span>{{(infoData.totalAmount || 0) | currency}}元</li>
          <li>
            <span>付款方式</span>
            <span>{{infoData.payWay|balanceType}}</span>
            <a class="modify" @click="modifyPayType">修改</a></li>
        </ul>
      </div>
      <div class="left info">
        <h3>运行信息</h3>
        <ul>
          <li>
            <span>购买类型</span>
            <span v-if="infoData.buyType===1">云算力购买</span>
            <span v-if="infoData.buyType===2">算力交易</span>
            <span v-if="infoData.buyType===3">邀请奖励</span>
            <span v-if="infoData.buyType===4">购买奖励</span>
          </li>
          <li>
            <span>购买时间</span>
            <span>{{infoData.createTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
          </li>
          <li>
            <span>交割时间</span>
            <span>{{infoData.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
          </li>
          <li>
            <span>运行时长</span>
            <span>{{infoData.runTime | duration}}</span>
          </li>
          <li>
            <span>当前状态</span>
            <span>{{infoData.runStatus|runningStatus}}</span>
          </li>
        </ul>
      </div>
      <div class="left">
        <h3>收益信息</h3>
        <div class="info-income">
          <div class="clearfix">
            <div class="left income-item">
              <span>产出({{currencyName}})</span>
              <p>{{(infoData.outputB || 0) | cryptocurrency}}</p>
              <p>&nbsp;</p>
              <span>管理({{currencyName}})</span>
              <p>{{(infoData.serviceCharge || 0) | cryptocurrency}}</p>
            </div>
            <div class="left income-item">
              <span>耗电</span>
              <p>{{(infoData.energyCharge || 0) | cryptocurrency}}{{currencyName}}</p>
              <p>{{(infoData.energyChargeRmb||0)|currency}}CNY</p>
              <span>实际({{currencyName}})</span>
              <p class="real">{{(infoData.realityB || 0) | cryptocurrency}}</p>
            </div>
          </div>
          <div class="income-money">
            <span>收益估算 </span>
            <strong>¥ {{(infoData.income || 0) | currency}}</strong>
            <el-popover placement="bottom" width="250" popper-class="custom" trigger="hover" content="收益计算参考当日8点火币网价格">
              <i slot="reference" class="iconfont icon-help"></i>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <h3 class="output">产出明细
      <el-popover placement="bottom-start" popper-class="compute-contract" trigger="hover"
                  content="当该连续10天产出（根据选择的付费方式计算），不足以抵扣电费、管理费时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，云算力合约暂停。在法律允许范围内最终解释权归算立方所有。">
        <i slot="reference" class="iconfont icon-help"></i>
      </el-popover>
    </h3>
    <div class="t-output x-table">
      <div class="t-fixed-row" :class="`is-scrolling-${scrollPosition}`" v-if="tableData.length>0">
        <table>
          <thead>
          <tr :style="{height:rowHeight(0)}">
            <td>时间</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,idx) in tableData" :key="idx">
            <td class="col-id" :style="{height:rowHeight(idx+1)}">{{item.powerDate}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <vue-perfect-scrollbar class="t-content" @ps-scroll-x="scrollHandler">
        <table ref="tableContent">
          <thead>
          <tr>
            <td>时间</td>
            <td>产出币量({{currencyName}})</td>
            <td>耗电费用</td>
            <td>
              管理费用({{currencyName}})
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">今日产出币量的{{infoData.manageFee||0}}%作为管理费</div>
                <i class="iconfont icon-help"></i>
              </el-tooltip>
            </td>
            <td>实际币量({{currencyName}})</td>
            <td>
              {{currencyName}}当日价格(元)
              <el-tooltip class="item" effect="dark" content="收益计算参考当日8点火币网价格" placement="bottom">
                <i class="iconfont icon-help"></i>
              </el-tooltip>
            </td>
            <td>实际收益(元)</td>
            <td>运行时长</td>
            <td>暂停时长</td>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tableData.length < 1">
            <td colspan="9" class="nodata">暂无数据</td>
          </tr>
          <tr v-for="(item,idx) in tableData" :key="idx">
            <td>{{item.powerDate}}</td>
            <td>{{(item.outputB||0) | cryptocurrency}}</td>
            <td>
              <span
                v-if="parseFloat(item.energyCharge)">{{(item.energyCharge||0)| cryptocurrency}}{{currencyName}}</span>
              <span v-else-if="item.energyChargeRmb">{{(item.energyChargeRmb||0)| currency}}CNY</span>
              <span v-else>--</span>
            </td>
            <td>{{(item.serviceCharge||0) | cryptocurrency}}</td>
            <td>{{(item.realityB||0) | cryptocurrency}}</td>
            <td>{{(item.price||0) | currency}}</td>
            <td>{{(item.income||0) | currency}}</td>
            <td>{{(item.workTime||0)|duration}}</td>
            <td>{{(item.maintainTime||0)|duration}}</td>
          </tr>
          </tbody>
        </table>
      </vue-perfect-scrollbar>
    </div>
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
    <x-balance-change-dialog :visible.sync="visible" :type="infoData.payWay" @change="payTypeChange"/>
  </div>
</template>

<script>
  import XBalanceChangeDialog from '../../../components/x-balance-change-dialog';
  import PowerApi from '../../../services/power-api';
  import errorHandler from '../../../services/error-handler';
  import TrusteeshipApi from '../../../services/trusteeship-api';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    data() {
      return {
        currencyName: 'BTC',
        selected: 0,
        currentPage: 1,
        pageSize: 10,
        count: 0,
        tableData: [],
        visible: false,
        powerId: '',
        infoData: {},
        scrollPosition: 'left'
      };
    },
    components: {
      VuePerfectScrollbar,
      XBalanceChangeDialog
    },
    filters: {
      runningStatus(status) {
        switch (status) {
          case 1:
            return '运行中';
          case 2:
            return '已终止';
          case 3:
            return '暂停中';
          default:
            return '--';
        }
      }
    },
    methods: {
      scrollHandler(e) {
        const self = this;
        const maxScrollLeftPosition = e.target.scrollWidth - e.target.offsetWidth - 1;
        const scrollLeft = e.target.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      },
      rowHeight(index) {
        // 获取对应的数据行
        let dataRow = this.$refs.tableContent.getElementsByTagName('tr')[index];
        if (dataRow) {
          // 根据数据行高度渲染固定行的高度
          return dataRow.clientHeight + 'px';
        }
      },
      powerInfo() {
        PowerApi.powerInfo(this.powerId)
          .then(res => {
            this.infoData = res;
          });
      },
      powerInfoList() {
        PowerApi.powerInfoList(this.powerId, this.currentPage, this.pageSize)
          .then(res => {
            let data = res.data;
            if (data.code === '000000') {
              this.count = data.count || 0;
              return data.data || [];
            }
          })
          .then(res => {
            this.tableData = res || [];
          });
      },
      powerPayWay(payWay) {
        const orderType = 2;
        TrusteeshipApi.updatePayWay(this.powerId, orderType, payWay)
          .then(() => {
            this.infoData.payWay = payWay;
          })
          .catch(errorHandler);
      },
      modifyPayType() {
        this.visible = true;
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.powerInfoList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.powerInfoList();
      },
      payTypeChange(payWay) {
        this.powerPayWay(payWay);
      }
    },
    mounted() {
      let powerId = this.$route.query.powerId;
      this.currencyName = this.$route.query.currencyName;
      if (powerId) {
        this.powerId = powerId;
        this.powerInfo();
        this.powerInfoList();
      }
    }
  };
</script>

<style scoped lang="scss">

  .page {
    padding-bottom: 30px;
  }

  .header {
    color: #333;
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
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
      height: 236px;
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
      width: 350px;
      height: 236px;
      padding-top: 30px;
      padding-left: 30px;
      background: #FAFAFA;

      .income-item {
        width: 50%;
        span {
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

  h3 {
    font-size: 16px;
    color: #303137;
    margin-bottom: 10px;
  }

  .output {
    margin-left: 30px;

    .icon-help {
      color: #969699;
      font-weight: normal;
    }
  }

  table {
    /*width: 970px;*/
    table-layout: fixed;
    border-collapse: collapse;
    /*margin-left: 30px;*/
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
    background: #FAFAFA;
  }

  thead td {
    color: #5E5F64;
  }

  tbody tr {
    &:nth-child(n) {
      background: #fff;
    }
    &:nth-child(2n) {
      background: #fafafa;
    }
  }

  td {
    border: 1px solid #f5f5f7;
    padding: 16px;
    word-wrap: break-word;
    word-break: normal;
    color: #606166;
    line-height: 20px;
  }

  tr td:nth-child(1) {
    width: 114px;
  }

  .data-num {
    color: #4D87EA;
  }

  tr td:nth-child(2) {
    width: 135px;
    text-align: right;
  }

  tr td:nth-child(3) {
    width: 157px;
    text-align: right;
  }

  tr td:nth-child(4) {
    width: 160px;
  }

  tr td:nth-child(5) {
    width: 136px;
  }

  tr td:nth-child(6) {
    width: 175px;
    text-align: right;
  }

  tr td:nth-child(7) {
    width: 144px;
    text-align: right;
  }

  tr td:nth-child(8) {
    width: 144px;
  }

  tr td:nth-child(9) {
    width: 144px;
  }

  .icon-help {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: 15px;
    margin-left: 5px;
  }

  .price {
    color: #f38e44;
  }

  .pagination {
    padding-left: 30px;
    margin-top: 20px;
    padding-bottom: 30px;
    text-align: center;
  }

  .t-output {
    width: 970px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .t-fixed-row {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, .12);

    &.is-scrolling-left {
      box-shadow: none;
    }

    table {
      width: 114px;
    }
  }

  .t-content {
    table {
      width: 1056px;
    }
  }
</style>
