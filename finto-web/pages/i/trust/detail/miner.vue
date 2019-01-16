<template>
  <div class="deposit-detail">
    <h2 class="header">機器詳細
      <!--<el-popover v-if="depositInfo.status===-1"-->
                  <!--placement="bottom-start"-->
                  <!--width="310"-->
                  <!--trigger="hover"-->
                  <!--content="当账户余额、该加密货币账户或者连续10天收益（根据选择的付费方式计算），不足以抵扣耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束。">-->
        <!--<span slot="reference" class="extra end">合约结束</span>-->
      <!--</el-popover>-->
    </h2>
    <div class="deposit-detail__content">
      <el-row :gutter="20">
        <el-col :span="8">
          <h5>マイニング機器</h5>
          <div class="info-wrapper">
            <dl>
              <div class="base-info__item">
                <dt>機器ID</dt>
                <dd>{{depositInfo.snNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>委託時間</dt>
                <dd>{{depositInfo.startTrustTime | date('YYYY-M-D HH:mm:ss')}}</dd>
              </div>
              <div class="base-info__item">
                <dt>機械品番</dt>
                <dd>{{depositInfo.machineNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>採掘通貨</dt>
                <dd>{{depositInfo.coinType}}</dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <h5>運営ステータス</h5>
          <div class="info-wrapper running-info">
            <dl>
              <div class="base-info__item">
                <dt>運営開始</dt>
                <dd>{{depositInfo.startTime | date('YYYY-M-D HH:mm:ss')}}</dd>
              </div>
              <div class="base-info__item">
                <dt>運営時間</dt>
                <dd>{{depositInfo.runTime | duration}}</dd>
              </div>
              <div class="base-info__item">
                <dt>停止時間</dt>
                <dd>{{depositInfo.pauseTime | duration}}</dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <h5>収支状況</h5>
          <div class="info-wrapper output">
            <dl>
              <div class="base-info__item">
                <dt>マイニング収益</dt>
                <dd :class="{'negative':depositInfo.output<0}">
                  {{depositInfo.output | cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
              <div class="base-info__item">
                <dt>電気費用</dt>
                <dd :class="{'negative':depositInfo.energyCharge<0}">
                  {{depositInfo.energyCharge | cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
              <div class="base-info__item">
                <dt>管理费用</dt>
                <dd :class="{'negative':depositInfo.serviceCharge<0}">
                  {{depositInfo.serviceCharge | cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
              <div class="base-info__item">
                <dt>実質収益</dt>
                <dd :class="{'negative':depositInfo.earning<0}">
                  {{depositInfo.earning | cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="income-detail__tabs" v-model="activeTab">
      <el-tab-pane label="収益詳細" name="income">
        <el-table :data="incomeInfo" border stripe>
          <el-table-column :resizable="false" fixed label="時間帯" width="110">
            <template slot-scope="scope">
              <span>{{scope.row.tDate}}</span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="持続時間" width="130">
            <template slot-scope="scope">{{scope.row.runTime | duration}}</template>
          </el-table-column>
          <el-table-column :resizable="false" label="一時停止中時間" width="130">
            <template slot-scope="scope">{{scope.row.maintainTime | duration}}</template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'マイニング収益('+depositInfo.coinType+')'" width="130">
            <template slot-scope="scope">
              {{scope.row.output | cryptocurrency}}
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'電気代('+depositInfo.coinType+')'" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.energyCharge | cryptocurrency}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'管理費用('+depositInfo.coinType+')'" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.serviceCharge | cryptocurrency}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'実質収益('+depositInfo.coinType+')'" width="140">
            <template slot-scope="scope">
              {{scope.row.earning | cryptocurrency}}
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="depositInfo.coinType+'同日価格'" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.price}}円</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" label="当日収益(円)" width="110">
            <template slot-scope="scope">
              <span>{{scope.row.income}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="incomeInfo.length !== 0"
          @current-change="incomePageChange"
          :current-page.sync="pageIncome.page"
          :page-size="pageIncome.size"
          layout="prev, pager, next"
          :total="pageIncome.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="運営状態" name="running">
        <el-table :data="runningInfo" border stripe>
          <el-table-column :resizable="false" label="時間帯" width="170">
            <template slot-scope="scope" class="time">
              <p class="text-center time">{{scope.row.end != '至今' ? scope.row.end : '今まで'}}</p>
              <p class="text-center time" v-if="scope.row.end!='至今'">-</p>
              <p class="text-center time">{{scope.row.start}}</p>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="状態" width="150">
            <template slot-scope="scope">
              <span class="status" :class="'status-'+scope.row.status">
                {{scope.row.status | machine}}
                <el-tooltip :content="scope.row.remak" placement="bottom" v-if="scope.row.remak">
                  <i class="iconfont icon-help"></i>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="持続時間" width="150" prop="duration">
            <template slot-scope="scope">
              {{scope.row.duration | duration}}
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'マイニング収益('+depositInfo.coinType+')'" width="125">
            <template slot-scope="scope">{{scope.row.output | cryptocurrency}}</template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'電気代('+depositInfo.coinType+')'" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.energyCharge | cryptocurrency}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'管理費用('+depositInfo.coinType+')'"  width="150">
            <template slot-scope="scope">
              <p>{{scope.row.serviceCharge | cryptocurrency}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :resizable="false" :label="'実質収益('+depositInfo.coinType+')'" width="125">
            <template slot-scope="scope">{{scope.row.earning | cryptocurrency}}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="runningInfo.length!== 0"
          @current-change="runningPageChange"
          :current-page.sync="pageRunning.page"
          :page-size="pageRunning.size"
          layout="prev, pager, next"
          :total="pageRunning.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {isClient} from '../../../../services/utils';
  import errorHandler from '../../../../services/error-handler';
  import {UPDATE_BREADCRUMB} from '../../../../store/mutation-types';
  import TrustApi from '../../../../services/trust-api';

  export default {
    head() {
      return {
        title: '機器詳細_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    breadcrumb() {
      return {
        label: '機器詳細',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/trust',
            label: '委託情報'
          },
          {
            path: '/i/trust/detail?tId=',
            label: '委託详情'
          }
        ]
      };
    },
    data() {
      return {
        depositInfo: {
          snNo: null,
          startTrustTime: null,
          machineNo: null,
          coinType: null,
          startTime: null,
          runTime: null,
          pauseTime: null,
          output: null,
          energyCharge: null,
          serviceCharge: null,
          earning: null
        },
        incomeInfo: [
        ],
        runningInfo: [
        ],
        detailInfo: {
          status: 1
        },
        activeTab: 'income',
        pageIncome: {
          size: 10,
          page: 1,
          total: 0 // 总记录条数
        },
        pageRunning: {
          size: 10,
          page: 1,
          total: 0 // 总记录条数
        }
      };
    },
    methods: {
      initPage() {
        TrustApi.machineDetail(this.$route.query.tId, this.$route.query.mId)
          .then(res => {
            this.depositInfo = res;
          })
          .catch(errorHandler);
      },
      loadRunningInfo() {
        const {page, size} = this.pageRunning;
        TrustApi.runningDetail(this.$route.query.mId, page, size)
          .then(res => res || {})
          .then(res => {
            this.runningInfo = res.data || [];
            this.pageRunning.total = res.count || 0;
          })
          .catch(errorHandler);
      },
      loadIncomeInfo() {
        const {page, size} = this.pageIncome;
        TrustApi.incomeDetail(this.$route.query.mId, page, size)
          .then(res => res || {})
          .then(res => {
            this.incomeInfo = res.data || [];
            this.pageIncome.total = res.count || 0;
          })
          .catch(errorHandler);
      },
      incomePageChange(page) {
        this.pageIncome.page = page;
        this.loadIncomeInfo();
      },
      runningPageChange(page) {
        this.pageRunning.page = page;
        this.loadRunningInfo();
      }
    },
    watch: {
      activeTab: {
        handler(val) {
          if(!isClient)return;
          if (val === 'running') {
            this.loadRunningInfo();
          }
          if (val === 'income') {
            this.loadIncomeInfo();
          }
        },
        immediate: true
      }
    },
    mounted: function () {
      const breadcrumb = {
        label: '機器詳細',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/trust',
            label: '委託情報'
          },
          {
            path: '/i/trust/detail?tId=' + this.$route.query.tId,
            label: '委託详情'
          }
        ]
      };
      this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">

  @import "../../../../assets/style/variables";

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
      background-color: $secondary;
      color: #fff;

    }
  }

  .info-wrapper {
    background-color: #FAFAFA;;
    padding: 30px;
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
      vertical-align: top;
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
      p:nth-child(1) {
        margin-bottom: 5px;
      }
    }

  }

  .income-detail__tabs {
    padding-bottom: 30px;
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

  .status {
    color: $primary;
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
      color: $success;
      &:before {
        background-color: $success;
      }
    }

    &.status-0, &.status-5, &.status-6, &.status-2, &.status-3, &.status-4 {
      color: #fdaa24;
      &:before {
        background-color: #fdaa24;
      }
    }

    &.status-3 {
      color: $primary;
      &:before {
        background-color: $primary;
      }
    }
  }

  .unit {
    display: inline-block;
    margin-left: .4em;
  }

  .el-pagination{
    text-align: center;
  }
  p.time{
    font-size: 14px;
    color: #303137;
    text-align: center;
    line-height: 19px;
  }

</style>
