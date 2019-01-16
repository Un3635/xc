<template>
  <div class="page">
    <h2 class="header">クラウドマイニング詳細</h2>
    <div class="clearfix box-info">
      <div class="left info">
        <h3>概要</h3>
        <ul>
          <li>
            <span>クラウドID</span>
            <el-popover placement="bottom" width="220" popper-class="powerinfo-id"
                        trigger="hover" :content="powerId">
              <div slot="reference" class="powerid-hover"
                   v-html="powerId.length>12?powerId.slice(0,12)+'...':powerId"></div>
            </el-popover>
          </li>
          <li><span>機器名</span>{{infoData.machineType||'--'}}</li>
          <li><span>ハッシュ</span>{{infoData.powerNum || 0}}{{infoData.powerUnit}}</li>
          <li><span>金額</span>{{(infoData.totalAmount || 0) | currency}} 円</li>
          <!-- <li>
            <span>付款方式</span>
            <span>{{infoData.payWay|balanceType}}</span>
            <a class="modify" @click="modifyPayType">修改</a></li> -->
        </ul>
      </div>
      <div class="left info runningInfo">
        <h3>運営ステータス</h3>
        <ul>
          <li>
            <span>購入種類</span>
            <span v-if="infoData.buyType===1">今すぐ購入</span>
            <span v-if="infoData.buyType===2">買い</span>
            <span v-if="infoData.buyType===3">招待奨励金</span>
            <span v-if="infoData.buyType===4">購入奨励金</span>
          </li>
          <li>
            <span>購入日時</span>
            <span>{{infoData.createTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
          </li>
          <li>
            <span>スタート時間</span>
            <span>{{infoData.deliveryCompleteTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
          </li>
          <li>
            <span>運営時間</span>
            <span>{{infoData.runTime | duration}}</span>
          </li>
          <li>
            <span>ステータス</span>
            <span>{{infoData.runStatus|runningStatus}}</span>
          </li>
        </ul>
      </div>
      <div class="left">
        <h3>収支概要</h3>
        <div class="info-income">
          <div class="clearfix">
            <div class="left income-item">
              <span>産出コイン({{symbol}})</span>
              <p>{{(infoData.outputB || 0) | cryptocurrency}}</p>
              <p>&nbsp;</p>
              <span>管理費({{symbol}})</span>
              <p>{{(infoData.serviceCharge || 0) | cryptocurrency}}</p>
            </div>
            <div class="left income-item">
              <span>電気代({{symbol}})</span>
              <p>{{(infoData.energyCharge || 0) | cryptocurrency}}</p>
              <p>&nbsp;</p>
              <span>実際({{symbol}})</span>
              <p class="real">{{(infoData.realityB || 0) | cryptocurrency}}</p>
            </div>
          </div>
          <div class="income-money">
            <span>収益予測 </span>
            <strong>¥ {{(infoData.income || 0) | currency}}</strong>
            <el-popover placement="bottom" width="250" popper-class="custom" trigger="hover" content="予測収益は毎日午前8時時点でのBitbankにおける価格を基準とし算出しております。">
              <i slot="reference" class="iconfont icon-help"></i>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <h3 class="output">詳細
      <el-popover placement="bottom-start" popper-class="compute-contract" trigger="hover"
                  content="仮想通貨の価格やマイニング難易度の変動などによる要因で、マイニングされる仮想通貨が７日間連続して運営管理費及び電気代に充当される仮想通貨より少なくなった場合、自動的に「一時停止」状態になります。※マイニングされたコインは翌日に表示されます。再始動は未払金の清算後、可能となります。詳しくはマイニング規約をご参照ください。">
        <i slot="reference" class="iconfont icon-help"></i>
      </el-popover>
    </h3>
    <div class="t-output x-table">
      <div class="t-fixed-row" :class="`is-scrolling-${scrollPosition}`" v-if="tableData.length>0">
        <table>
          <thead>
          <tr :style="{height:rowHeight(0)}">
            <td>時間</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,idx) in tableData" :key="idx">
            <td class="col-id" :style="{height:rowHeight(idx+1)}">{{item.powerDate}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <x-perfect-scrollbar class="t-content" @ps-scroll-x="scrollHandler">
        <table ref="tableContent">
          <thead>
          <tr>
            <td>時間</td>
            <td>産出コイン({{symbol}})</td>
            <td>電気代({{symbol}})</td>
            <td>
              管理費({{symbol}})
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">当日産出された仮想通貨の１0％ぐらいを管理費として控除させて頂きます。</div>
                <i class="iconfont icon-help"></i>
              </el-tooltip>
            </td>
            <td>実質コイン収益<br>({{symbol}})</td>
            <td>
              {{symbol}}価格
              <el-tooltip class="item" effect="dark" content="午前8時時点でのBitbankでの価格" placement="bottom">
                <i class="iconfont icon-help"></i>
              </el-tooltip>
            </td>
            <td>予測収益(円）</td>
            <td>マイニング<br>累計時間</td>
            <td>停止累計時間</td>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tableData.length < 1">
            <td colspan="9" class="nodata">現在表示できるデータはございません</td>
          </tr>
          <tr v-for="(item,idx) in tableData" :key="idx">
            <td>{{item.powerDate}}</td>
            <td>{{(item.outputB||0) | cryptocurrency}}</td>
            <td>
              <span
                v-if="parseFloat(item.energyCharge)">{{(item.energyCharge||0)| cryptocurrency}}</span>
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
      </x-perfect-scrollbar>
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
    <!-- <x-balance-change-dialog :visible.sync="visible" :type="infoData.payWay" @change="payTypeChange"/> -->
  </div>
</template>

<script>
  // import XBalanceChangeDialog from '../../../components/x-balance-change-dialog';
  import PowerApi from '../../../services/power-api';
  import errorHandler from '../../../services/error-handler';
  // import TrusteeshipAPI from '../../../services/trusteeship-api';
  import XPerfectScrollbar from '../../../components/x-prefect-scrollbar';
  import {UPDATE_BREADCRUMB} from '../../../store/mutation-types';

  export default {
    head() {
      return {
        title: 'クラウドマイニング｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    breadcrumb() {
      return {
        label: 'クラウドマイニング詳細',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/power',
            label: 'クラウドマイニング'
          },
          {
            path: '/i/power/detail?currencyId=',
            label: 'クラウドマイニング明細'
          }
        ]
      };
    },
    data() {
      return {
        symbol: 'BTC',
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
      XPerfectScrollbar
      // VuePerfectScrollbar,
      // XBalanceChangeDialog
    },
    filters: {
      runningStatus(status) {
        switch (status) {
          case 1:
            return '運営中';
          case 2:
            return '終了';
          case 3:
            return '一時停止中';
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
          .then(res => res.data)
          .then(res => {
            if (res.code === '000000') {
              this.res = res.count || 0;
              this.tableData = res.data || [];
            }
          });
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
      this.powerId = this.$route.query.pId;
      this.symbol = this.$route.query.symbol;
      let currencyId = this.$route.query.currencyId;
      if (this.powerId) {
        this.powerInfo();
        this.powerInfoList();
      };
      const breadcrumb = {
        label: 'クラウドマイニング詳細',
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
      if (currencyId) {
        breadcrumb.parentsList.push({
          path: '/i/power/detail?currencyId=' + currencyId,
          label: 'クラウドマイニング明細'
        });
      }
      this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
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

  .runningInfo {
    span:nth-child(1) {
      width: 100px;
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
    width: 154px;
    // text-align: right;
  }

  tr td:nth-child(3) {
    width: 187px;
    // text-align: right;
  }

  tr td:nth-child(4) {
    width: 155px;
  }

  tr td:nth-child(5) {
    width: 136px;
    text-align: center;
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
    text-align: center;
    width: 144px;
  }

  tr td:nth-child(9) {
    width: 144px;
    text-align: center;
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
