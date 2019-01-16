<template>
  <div class="page">
    <h2 class="header">委託内容</h2>
    <div class="deposit-detail__content">
      <el-row :gutter="20">
        <el-col :span="9">
          <h5>サービス概要</h5>
          <div class="info-wrapper">
            <dl>
              <div class="base-info__item">
                <dt>委託ID</dt>
                <dd>{{depositInfo.trustNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>委託時間</dt>
                <dd>
                  <span v-if="depositInfo.trustTime">
                    {{depositInfo.trustTime | date('YYYY-M-D HH:mm:ss')}}
                  </span>
                  <span v-else>運営スタートしておりません</span>
                </dd>
              </div>
              <div class="base-info__item">
                <dt>商品名</dt>
                <dd>{{depositInfo.machineNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>消耗電力</dt>
                <dd>{{depositInfo.power || 0}}W</dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="9">
          <h5>費用概要</h5>
          <div class="info-wrapper">
            <dl style="padding-bottom: 78px;">
              <div class="base-info__item">
                <dt>電気代</dt>
                <dd>{{(depositInfo.electricityFee || 0) | currency}}円/KW·h</dd>
              </div>
              <div class="base-info__item">
                <dt>管理費</dt>
                <dd>産出されたコインの{{(depositInfo.managementFee || 0) | currency}}%</dd>
              </div>
            </dl>
          </div>
        </el-col>
      </el-row>
      <div class="income-info">
        <h5>收益情報</h5>
        <div class="info-wrapper">
          <table class="output-info">
            <thead>
            <tr>
              <td></td>
              <td>マイニング収益</td>
              <td>管理費</td>
              <td>電気代</td>
              <td>実質収益</td>
            </tr>
            </thead>
            <tbody>
            <tr style="height: 10px"></tr>
            <tr>
              <td>昨日</td>
              <td :class="{'negative':yesterday.output<0}">
                {{(yesterday.output || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':yesterday.manageCharge<0}">
                {{(yesterday.manageCharge || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':yesterday.energyCharge<0}">
                {{(yesterday.energyCharge || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':yesterday.actualIncome<0}">
                {{(yesterday.actualIncome || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
            </tr>
            <tr>
              <td>トータル</td>
              <td :class="{'negative':total.output<0}">
                {{(total.output || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':total.manageCharge<0}">
                {{(total.manageCharge || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':total.energyCharge<0}">
                {{(total.energyCharge || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
              <td :class="{'negative':total.actualIncome<0}">
                {{(total.actualIncome || 0) | cryptocurrency}}&nbsp;{{symbol}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="miner-info">
        <div class="miner-info__header">
          <h5>リスト</h5>
          <span>
            <span class="status status-3" v-if="machineInfo.trustStatus===5">契約終了<em>（{{machineInfo.terminationNum}}台）</em></span>
            <span v-else>
               <span class="status status-1">運営中<em>（{{machineInfo.workNum}}台）</em></span>
               <span class="status status-2">一時停止中<em>({{machineInfo.checkNum}}台）</em></span>
               <span class="status status-3">契約終了<em>（{{machineInfo.terminationNum}}台）</em></span>
            </span>
           </span>
        </div>
        <div class="miner-info__content">
          <el-table :data="minerInfo" border stripe>
            <el-table-column :resizable="false" fixed label="番号" width="115">
              <template slot-scope="scope">
                <nuxt-link class="machine-no" :to="toIncome(scope.row)">
                  {{scope.row.snNo}}
                </nuxt-link>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="ステータス" width="150" align="center">
              <template slot-scope="scope">
                <span class="machine-status clearfix"
                      :class="'status-'+scope.row.machineStatus">{{scope.row.machineStatus | machine}}
                <el-tooltip :content="scope.row.remark" placement="bottom" v-if="scope.row.remark">
                  <i class="iconfont icon-help"></i>
                </el-tooltip>
              </span>
              </template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" :label="'マイニング収益('+ symbol +')'" width="140" prop="output">
              <template slot-scope="scope">
                <span>{{scope.row.output | cryptocurrency}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" :label="'管理費用('+ symbol +')'" width="170">
              <template slot-scope="scope">{{scope.row.serviceCharge | cryptocurrency}}</template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" :label="'電気代('+ symbol +')'" width="170">
              <template slot-scope="scope">{{scope.row.energyCharge | cryptocurrency}}</template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" :label="'実質収益('+ symbol +')'" width="140">
              <template slot-scope="scope">{{scope.row.earning | cryptocurrency}}</template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" label="運営開始" width="175">
              <template slot-scope="scope">
                <span>{{scope.row.startTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :resizable="false" label="運営時間" prop="runTime" width="170">
              <template slot-scope="scope">{{scope.row.runTime | duration}}</template>
            </el-table-column>
            <!--<el-table-column align="center" :resizable="false" label="暂停时长" prop="pauseTime" width="170">-->
            <!--<template slot-scope="scope">{{scope.row.pauseTime | duration}}</template>-->
            <!--</el-table-column>-->
          </el-table>
          <el-pagination v-if="minerInfo.length>1"
                         @current-change="handleCurrentChange"
                         :current-page.sync="pageInfo.page"
                         :page-size="pageInfo.size"
                         layout="prev, pager, next"
                         :total="pageInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import errorHandler from '../../../../services/error-handler';
  import TrustApi from '../../../../services/trust-api';

  export default {
    head() {
      return {
        title: '委託内容_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    breadcrumb() {
      return {
        label: '委託内容',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/trust',
            label: '委託情報'
          }
        ]
      };
    },
    data() {
      return {
        tId: '', // 托管单ID
        depositInfo: {
          electricityFee: 0,
          managementFee: 0
        },
        symbol: '', // 数字货币符号
        yesterday: {
          energyCharge: 0,
          income: 0,
          output: 0,
          serviceCharge: 0
        }, // 昨日产出
        total: {
          energyCharge: 0,
          income: 0,
          output: 0,
          serviceCharge: 0
        }, // 总产出
        minerInfo: [
          // {
          //   id:1,
          //   snNo: "snNo1",
          //   machineStatus: 0,
          //   earning: 0,
          //   energyCharge: 0,
          //   outputB: 0,
          //   pauseTime: 0,
          //   runTime: 116,
          //   serviceCharge: 14.715,
          //   startTime: 1521171206000
          // }
        ],
        pageInfo: {
          page: 1,
          size: 10,
          total: 0
        },
        machineInfo: {
          checkNum: 0,
          data: [],
          trustStatus: 0,  // 5-托管结束
          workNum: 0,
          endNum: 0
        } // 矿机信息
      };
    },
    methods: {
      initPage() {
        TrustApi.getDepositDetail(this.tId)
          .then(res => {
            this.depositInfo = res;
            this.symbol = res.currencyName;
            if (res.todayIncome) {
              this.yesterday = res.todayIncome;
            }
            if (res.totalIncome) {
              this.total = res.totalIncome;
            }
          })
          .catch(errorHandler);
        this.loadMachineList();
      },
      loadMachineList() {
        const page = this.pageInfo.page;
        const size = this.pageInfo.size;
        TrustApi.getDepositMachineList(this.tId, page, size)
          .then(res => {
            this.machineInfo = res;
            if (res) {
              this.pageInfo.total = res.count;
              this.minerInfo = res.data || [];
            }
          })
          .catch(errorHandler);
      },
      handleCurrentChange(page) {
        this.pageInfo.page = page;
        this.loadMachineList();
      },
      toIncome(item) {
        const tId = this.$route.query.tId;
        const mId = item.id;
        return {path: 'miner', query: {tId, mId}, append: true};
      }
    },
    mounted() {
      this.tId = this.$route.query.tId;
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">

  .deposit-detail__content {
    padding: 20px 30px;
  }

  .header {
    font-size: 24px;
    color: #303137;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
    border-bottom: 1px solid #f5f5f7;
  }

  .extra {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    vertical-align: bottom;
    font-weight: normal;
    padding: 0 3px;
    cursor: pointer;

    &.end {
      background-color: #a99067;
      color: #fff;

    }
  }

  .income-info {
    margin-top: 10px;
  }

  .info-wrapper {
    background-color: #FAFAFA;;
    padding: 30px;
    padding-bottom: 18px;
    margin-top: 10px;
  }

  .base-info__item {
    font-size: 0;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    dt, dd {
      display: inline-block;
      font-size: 14px;
      line-height: 19px;
    }

    dt {
      color: #999;
      min-width: 4em;
      vertical-align: top;
    }

    dd {
      color: #303137;
      margin-left: 20px;
      max-width: calc(100% - 76px);
      word-wrap: break-word;
    }

  }

  .output-info {
    /*margin-bottom: 39px;*/
    width: 100%;
    height: 118px;
    border-collapse: collapse;
    border-spacing: 0;
    td {
      padding: 0;
    }

    thead {
      /*line-height: 30px;*/
      line-height: 20px;
      border-bottom: 1px dashed #DEDEE0;
      td {
        padding-bottom: 10px;
      }
    }

    thead td, tbody td:first-child {
      font-size: 14px;
      color: #999;
      font-weight: normal;
    }
    td {
      /*padding: 0 0 28px;*/
      width: 22%;
      font-size: 14px;
      color: #303137;

      &:first-child {
        width: 12%;
      }
    }
    tbody tr:last-child td {
      padding-bottom: 0;
    }

    tbody td {
      font-weight: bold;
    }

    .negative {
      color: #f95453;
    }
  }

  .miner-info {
    padding-top: 40px;

  }

  .miner-info__header {

    h5 {
      display: inline-block;
      margin-right: 2em;
    }

    em {
      font-weight: bold;
      font-style: normal;
      padding-left: 5px;
      padding-right: 5px;
    }

  }

  .status {
    display: inline-block;
    font-size: 14px;
    color: #606166;
    line-height: 22px;
    em {
      font-size: 14px;
      color: #969699;
      font-style: normal;
      font-weight: normal;
    }

    &:before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: .5em;
      vertical-align: 3px;
    }

    &.status-1:before {
      background-color: #2bb56f;
    }

    &.status-2:before {
      background-color: #FFA614;
    }

    &.status-3:before {
      background-color: #303137;
    }

    + span {
      margin-left: 2.5em;
    }
  }

  .machine-no {
    color: #4D87EA;
  }

  .machine-status {
    color: #303137;
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: 2px;
    }

    &.status-1 {
      color: #2bb56f;
      &:before {
        background-color: #2bb56f;
      }
    }

    &.status-0, &.status-5, &.status-6, &.status-2, &.status-3, &.status-4 {
      color: #fdaa24;
      &:before {
        background-color: #fdaa24;
      }
    }

    &.status-3 {
      color: #303137;
      &:before {
        background-color: #303137;
      }
    }
  }

  .miner-info__content {
    padding-top: 10px;

  }

  .unit {
    display: inline-block;
    margin-left: .4em;
  }

  .change {
    color: #4d87ea;
    margin-left: 3em;
    cursor: pointer;
  }

  .el-pagination {
    text-align: center;
    padding-top: 10px;
  }

  .icon-help {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-left: 2px;
    color: #969699;
    font-size: 15px;
    vertical-align: -1px;
  }
</style>

