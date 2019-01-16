<template>
  <div class="page">
    <h2 class="header">クラウドマイニング</h2>
    <x-perfect-scrollbar>
      <ul class="tabs">
        <li v-for="item in tabList" :class="{active:item===selectedItem}" :key="item.pId" @click="selectedItem=item">
          {{item.name}}マイニング
        </li>
      </ul>
    </x-perfect-scrollbar>

    <div class="clearfix box-detail">
      <div class="left detail-left">
        <div class="left">
          <p>マイニング中</p>
          <strong>{{generalInfo.availablePower || 0}}{{generalInfo.unit}}</strong>
        </div>
        <div class="left">
          <p>スタート待ち</p>
          <strong>{{generalInfo.penddingPower || 0}}{{generalInfo.unit}}</strong>
        </div>
        <span v-if="selectedItem.id"
              @click="$router.push({path:'detail',query:{currencyId:selectedItem.id}, append:true})">マイニング詳細 ></span>
      </div>
      <div class="clearfix right detail-right">
        <div class="left detail-data">
          <div class="left">
            <p>産出({{selectedItem.name}})</p>
            <span>{{(generalInfo.outputB || 0) | cryptocurrency}}</span>
            <p class="top">管理費({{selectedItem.name}})</p>
            <span>{{(generalInfo.serviceCharge || 0) | cryptocurrency}}</span>
          </div>
          <div class="left">
            <p>電気代({{selectedItem.name}})</p>
            <span :class="{red:generalInfo.energyCharge<=0}">{{(generalInfo.energyCharge || 0) | cryptocurrency}}</span>
            <p class="top">コイン収益({{selectedItem.name}})</p>
            <span class="real">{{(generalInfo.grandTotalEarning || 0) | cryptocurrency}}</span>
          </div>
        </div>
        <div class="left detail-income">
          <p>収益予測 </p>
          <strong>¥ {{(generalInfo.income || 0) | currency}}</strong>
          <span>*収益予測は毎日午前8時時点でのBitbankにおける価格を基準とし算出しております。</span>
          <span class="get-cash" @click="$router.push('/i/account')">お引き出しへ ></span>
        </div>
      </div>
    </div>
    <h3 class="output">
      マイリスト
      <!-- <el-popover placement="bottom-start" popper-class="compute-contract" trigger="hover"
                  content="当该连续10天产出（根据选择的付费方式计算），不足以抵扣电费、管理费时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，云算力合约暂停。在法律允许范围内最终解释权归算立方所有。">
        <i slot="reference" class="iconfont icon-help"></i>
      </el-popover> -->
    </h3>
    <div class="t-output x-table">
      <div class="t-fixed-row" :class="`is-scrolling-${scrollPosition}`" v-if="tableData.length>0">
        <table>
          <thead>
          <tr :style="{height:rowHeight(0)}">
            <td class="col-id">クラウドID</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,idx) in tableData" :key="item.orderNo">
            <td class="col-id" :style="{height:rowHeight(idx+1)}">
              <span class="data-num"
                    @click="$router.push({path:'/i/power/info',query:{pId: item.orderNo,currencyId:selectedItem.id,symbol:selectedItem.name}})">{{item.orderNo}} </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <x-perfect-scrollbar class="t-content" @ps-scroll-x="scrollHandler">
        <table ref="tableContent">
          <thead>
          <tr>
            <td class="col-id">クラウドID</td>
            <td class="col-power" v-if="generalInfo.unit">ハッシュ({{generalInfo.unit}})</td>
            <td class="col-status">ステータス</td>
            <td class="col-output">産出コイン({{selectedItem.name}})</td>
            <td class="col-energy">電気代({{selectedItem.name}})</td>
            <td class="col-manage">
              管理费({{selectedItem.name}})
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">当日産出された仮想通貨の１0％ぐらいを管理費として控除させて頂きます。</div>
                <i class="iconfont icon-help"></i>
              </el-tooltip>
            </td>
            <td class="col-actual">実質コイン収益({{selectedItem.name}})</td>
            <td class="col-start">スタート日時</td>
            <td class="col-running">運営時間</td>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tableData.length < 1">
            <td colspan="8" class="nodata">現在表示できるデータはございません</td>
          </tr>
          <tr v-for="item in tableData" :key="item.orderNo">
            <td class="col-id">
              <span class="data-num"
                    @click="$router.push({path:'/i/power/info',query:{pId: item.orderNo,currencyId:selectedItem.id,symbol:selectedItem.name}})">{{item.orderNo}} </span>
            </td>
            <!-- query:{pId: item.orderNo, currencyId, symbol} -->
            <td class="col-power" v-if="generalInfo.unit">{{item.powerNum || 0}}</td>
            <!-- <td class="col-status">
              <span :class="{'text-success':item.status===1,'text-warning':item.status===3}">{{item.status|incomeStatus}}</span>
            </td> -->
            <td :class="'status-'+item.status">
              <i class="icon-point" :class="'status-'+item.status"></i>{{item.status | incomeStatus}}
            </td>
            <td class="col-output">{{(item.outputB || 0) | cryptocurrency}}</td>
            <td class="col-energy">
              <p>{{(item.energyCharge || 0) | cryptocurrency}}</p>
            </td>
            <td class="col-manage">{{(item.serviceCharge || 0) | cryptocurrency}}</td>
            <td class="col-actual">{{(item.realityB || 0) | cryptocurrency}}</td>
            <td class="col-start">{{item.startTime | date('YYYY-MM-DD HH:mm:ss') || '--'}}</td>
            <td class="col-running">{{item.runTime | duration}}</td>
          </tr>
          </tbody>
        </table>
      </x-perfect-scrollbar>
    </div>

    <div class="pagination" v-if="count > 1">
      <el-pagination popper-class="pagination-select" class="text-left" layout="sizes, prev, pager, next"
                     :current-page.sync="currentPage"
                     :page-size="pageSize" :page-sizes="[10, 20, 30, 50, 100, 200]" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import PowerAPI from '../../../services/power-api';
  import UserAPI from '../../../services/user-api';
  import XPerfectScrollbar from '../../../components/x-prefect-scrollbar';

  export default {
    head() {
      return {
        title: 'クラウドマイニング｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    breadcrumb() {
      return {
        label: 'クラウドマイニング',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          }
        ]
      };
    },
    components: {XPerfectScrollbar},
    data() {
      return {
        generalInfo: {},
        currentPage: 1,
        pageSize: 10,
        count: 0,
        tableData: [],
        price: 6500,
        selectedItem: {},
        tabList: [],
        scrollPosition: 'left'
      };
    },
    filters: {
      incomeStatus(status) {
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
      initPage() {
        UserAPI.getCurrencyListByType(0)
          .then(res => res.result || [])
          .then(res => {
            this.tabList = res;
            this.selectedItem = res[0];
          });
      },
      powerColligate() {
        const currencyId = this.selectedItem.id;
        PowerAPI.powerColligate(currencyId)
          .then(res => {
            this.generalInfo = res;
          });
      },
      powerIncomeList() {
        const currencyId = this.selectedItem.id;
        PowerAPI.powerIncomeList(currencyId, this.currentPage, this.pageSize)
          .then(res => res.data)
          .then(res => {
            if (res.code === '000000') {
              this.count = res.count || 0;
              this.tableData = res.data || [];
            }
          });
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.powerIncomeList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.powerIncomeList();
      }
    },
    watch: {
      selectedItem(val) {
        if (val.id) {
          this.powerColligate();
          this.powerIncomeList();
        }
      }
    },
    mounted() {
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">

  .icon-point {
    display: inline-block;
    font-style: normal;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 10px;
    color: #606166;
    background-color: #606166;
    &.status-2 {
      background-color: #606166;
    }
    &.status-1 {
      background-color: #2db66f;
    }
    &.status-3 {
      background-color: #f85453;
    }
  }

  .status-2 {
    color: #606166;
  }

  .status-1 {
    color: #2db66f;
  }

  .status-3 {
    color: #f85453;
  }

  .page {
    padding-bottom: 30px;
  }

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
    white-space: nowrap;
    border-bottom: 1px solid #eee;
    font-size: 0;

    li {
      display: inline-block;
      font-size: 16px;
      color: #969699;
      margin: 0 30px;
      cursor: pointer;
      &.active {
        color: #303137;
        border-bottom: 3px solid #303137;
        font-weight: bold;
      }
    }
  }

  .output .icon-help {
    color: #969699;
    font-weight: normal;
    vertical-align: 0;
  }

  .box-detail {
    padding: 30px;
    font-size: 14px;
  }

  .detail-left {
    width: 330px;
    height: 189px;
    background: #fafafa;
    padding: 36px 30px;

    .left {
      width: 130px;
      p {
        color: #606166;
        margin-bottom: 17px;
      }
      strong {
        font-size: 24px;
        color: #303137;
      }
    }

    span {
      display: block;
      margin-top: 105px;
      color: #2A5CAA;
      letter-spacing: 0.53px;
      cursor: pointer;
    }
  }

  .detail-right {
    width: 620px;
    height: 189px;
    background: #fafafa;
    padding: 30px 0 30px 30px;
    color: #999;

    .detail-data {
      width: 268px;
      height: 100%;

      .left {
        width: 133px;
        line-height: 26px;
        span {
          color: #000019;
        }
        .top {
          margin-top: 28px;
        }
        .real {
          font-weight: bold;
        }
      }
    }

    .detail-income {
      border-left: 1px dashed #ddd;
      width: 319px;
      height: 100%;
      padding-left: 30px;
      position: relative;

      strong {
        display: block;
        margin-top: 17px;
        font-size: 24px;
        color: #303137;
        letter-spacing: -0.3px;
      }
      span {
        display: block;
        margin-top: 12px;
        font-size: 12px;
      }
      .get-cash {
        position: absolute;
        left: 30px;
        bottom: 0;
        font-size: 14px;
        color: #2A5CAA;
        letter-spacing: 0.53px;
        cursor: pointer;
      }
    }
  }

  .block {
    display: block;
  }

  .red {
    color: #f95453 !important;
  }

  h3 {
    margin: 30px 0 10px 30px;
    font-size: 16px;
    color: #303137;
  }

  .nodata {
    height: 60px;
    text-align: center;
    color: #969699;
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 14px;
  }

  tr {
    min-height: 50px;
  }

  thead tr {
    background: #fafafa;
  }

  thead td {
    color: #5e5f64;
  }

  tr:nth-child(n) {
    td {
      background-color: #fff;
    }
  }

  tr:nth-child(2n) {
    td {
      background: #fafafa;
    }
  }

  td {
    border: 1px solid #f5f5f7;
    padding: 16px 10px;
    word-wrap: break-word;
    word-break: normal;
    color: #606166;
    line-height: 20px;

    &.col-id {
      width: 146px;
    }

    &.col-power {
      width: 110px;
    }

    &.col-status {
      width: 115px;
    }

    &.col-output {
      width: 145px;
    }

    &.col-energy {
      width: 150px;
      text-align: right;
    }

    &.col-manage {
      width: 148px;
    }

    &.col-actual {
      width: 124px;
    }

    &.col-start {
      width: 130px;
    }

    &.col-running {
      width: 97px;
    }
  }

  .data-num {
    color: #2A5CAA;
    cursor: pointer;
  }

  .icon-help {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: 15px;
    margin-left: 3px;
    vertical-align: -1px;
  }

  .pagination {
    padding-left: 30px;
    margin-top: 20px;
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
      width: 146px;
    }
  }

  .t-content {
    table {
      width: 1056px;
    }
  }

  .text-success {
    color: #2db66f;
  }

  .text-warning {
    color: #ffbd2d;
  }
</style>

