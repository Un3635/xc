<template>
  <div class="deposit-detail">
    <h2 class="header">矿机详情
      <el-popover v-if="depositInfo.status===-1"
                  placement="bottom-start"
                  width="310"
                  trigger="hover"
                  content="当账户余额、该加密货币账户或者连续10天收益（根据选择的付费方式计算），不足以抵扣耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束。">
        <span slot="reference" class="extra end">合约结束</span>
      </el-popover>
    </h2>
    <div class="deposit-detail__content">
      <el-row :gutter="20">
        <el-col :span="8">
          <h5>基本信息</h5>
          <div class="info-wrapper">
            <dl>
              <div class="base-info__item">
                <dt>矿机编号</dt>
                <dd>{{depositInfo.snNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>托管时间</dt>
                <dd>{{depositInfo.startTrustTime|date('YYYY-M-D HH:mm:ss')}}</dd>
              </div>
              <div class="base-info__item">
                <dt>机器型号</dt>
                <dd>{{depositInfo.machineNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>可挖币种</dt>
                <dd>{{depositInfo.coinType}}</dd>
              </div>
              <div class="base-info__item">
                <dt>付款方式</dt>
                <dd>{{depositInfo.payWay|balanceType}}</dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <h5>运行情况</h5>
          <div class="info-wrapper running-info">
            <dl>
              <div class="base-info__item">
                <dt>开始运行</dt>
                <dd>{{depositInfo.startTime|date('YYYY-M-D HH:mm:ss')}}</dd>
              </div>
              <div class="base-info__item">
                <dt>运行时长</dt>
                <dd>{{depositInfo.runTime|duration}}</dd>
              </div>
              <div class="base-info__item">
                <dt>暂停时长</dt>
                <dd>{{depositInfo.pauseTime|duration}}</dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="8">
          <h5>产出信息</h5>
          <div class="info-wrapper output">
            <dl>
              <div class="base-info__item">
                <dt>产出币量</dt>
                <dd :class="{'negative':depositInfo.outputB<0}">
                  {{depositInfo.outputB|cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
              <div class="base-info__item">
                <dt>耗电费用</dt>
                <dd :class="{'negative':depositInfo.energyCharge<0}">
                  <p>{{depositInfo.energyCharge|cryptocurrency}}{{depositInfo.coinType}}</p>
                  <p>{{depositInfo.energyChargeRmb|currency}}CNY</p>
                </dd>
              </div>
              <div class="base-info__item">
                <dt>管理费用</dt>
                <dd :class="{'negative':depositInfo.serviceCharge<0}">
                  <p>{{depositInfo.serviceCharge|cryptocurrency}}{{depositInfo.coinType}}</p>
                  <p>{{depositInfo.serviceChargeRmb|currency}}CNY</p>
                </dd>
              </div>
              <div class="base-info__item">
                <dt>实际产出</dt>
                <dd :class="{'negative':depositInfo.earning<0}">
                  {{depositInfo.earning|cryptocurrency}}{{depositInfo.coinType}}
                </dd>
              </div>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="income-detail__tabs" v-model="activeTab">
      <el-tab-pane label="收益情况" name="income">
        <el-table :data="incomeInfo" border stripe>
          <el-table-column :resizable="false" fixed label="时间" width="110">
            <template slot-scope="scope">
              <span>{{scope.row.tDate}}</span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="运行时长" width="130">
            <template slot-scope="scope">{{scope.row.runTime|duration}}</template>
          </el-table-column>
          <el-table-column :resizable="false" label="维护时长" width="130">
            <template slot-scope="scope">{{scope.row.maintainTime|duration}}</template>
          </el-table-column>
          <el-table-column :resizable="false" :label="'产出币量('+depositInfo.coinType+')'" width="130">
            <template slot-scope="scope">
              {{scope.row.outputB|cryptocurrency}}
            </template>
          </el-table-column>
          <el-table-column align="right" :resizable="false" label="耗电费用" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.energyCharge|cryptocurrency}}<span class="unit">{{depositInfo.coinType}}</span></p>
              <p>{{scope.row.energyChargeRmb|currency}}<span class="unit">CNY</span></p>
            </template>
          </el-table-column>
          <el-table-column align="right" :resizable="false" label="管理费用" width="160">
            <template slot-scope="scope">
              <p>{{scope.row.serviceCharge|cryptocurrency}}<span class="unit">{{depositInfo.coinType}}</span></p>
              <p>{{scope.row.serviceChargeRmb|currency}}<span class="unit">CNY</span></p>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" :label="'实际币量('+depositInfo.coinType+')'" width="140">
            <template slot-scope="scope">
              {{scope.row.earning|cryptocurrency}}
            </template>
          </el-table-column>
          <el-table-column :resizable="false" :label="depositInfo.coinType+'当日价格'" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.price|currency}}元</span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="当日收益(元)" width="110">
            <template slot-scope="scope">
              <span>{{scope.row.income|currency}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="text-left"
          v-if="incomeInfo.length !== 0"
          @size-change="incomeSizeChange"
          @current-change="incomePageChange"
          :current-page.sync="pageIncome.page"
          :page-sizes="[10, 20, 30, 50, 100, 200]"
          :page-size="pageIncome.size"
          layout="sizes, prev, pager, next"
          :total="pageIncome.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="运行情况" name="running">
        <el-table :data="runningInfo" border stripe>
          <el-table-column :resizable="false" label="时间段" width="170">
            <template slot-scope="scope">
              <p class="text-center">{{scope.row.end}}</p>
              <p class="text-center" v-if="scope.row.end!='至今'">至</p>
              <p class="text-center">{{scope.row.start}}</p>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="运行状态">
            <template slot-scope="scope">
              <span class="status" :class="'status-'+scope.row.status">
                {{scope.row.status|machine}}
                <el-tooltip content="矿场停电，修整中" placement="bottom" v-if="scope.row.status===0">
                  <i class="iconfont icon-help"></i>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="持续时长" width="150" prop="duration">
            <template slot-scope="scope">
              {{scope.row.duration|duration}}
            </template>
          </el-table-column>
          <el-table-column :resizable="false" :label="'产出币量('+depositInfo.coinType+')'" width="125">
            <template slot-scope="scope">{{scope.row.outputB|cryptocurrency}}</template>
          </el-table-column>
          <el-table-column align="right" :resizable="false" label="耗电费用" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.energyCharge|cryptocurrency}}<span class="unit">{{depositInfo.coinType}}</span></p>
              <p>{{scope.row.energyChargeRmb|currency}}<span class="unit">CNY</span></p>
            </template>
          </el-table-column>
          <el-table-column align="right" :resizable="false" label="管理费用" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.serviceCharge|cryptocurrency}}<span class="unit">{{depositInfo.coinType}}</span></p>
              <p>{{scope.row.serviceChargeRmb|currency}}<span class="unit">CNY</span></p>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" :label="'实际币量('+depositInfo.coinType+')'" width="125">
            <template slot-scope="scope">{{scope.row.earning|cryptocurrency}}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="text-left"
          v-if="runningInfo.length!== 0"
          @size-change="runningSizeChange"
          @current-change="runningPageChange"
          :current-page.sync="pageRunning.page"
          :page-sizes="[10, 20, 30, 50, 100, 200]"
          :page-size="pageRunning.size"
          layout="sizes, prev, pager, next"
          :total="pageRunning.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DepositAPI from "../../../services/deposit-api";
  import errorHandler from "../../../services/error-handler";
  import * as chunk from 'lodash.chunk';

  export default {
    breadcrumb() {
      return {
        label: '矿机详情',
        parentsList: [
          {
            path: '/i/trusteeship/trusteeship-detail?tId=' + this.tId,
            label: '托管详情'
          },
          {
            path: '/i/trusteeship',
            label: '我的托管'
          },
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      }
    },
    data() {
      return {
        tId: '', // 托管单ID
        mId: '', // 矿机ID
        depositInfo: {
          snNo: null,
          startTrustTime: null,
          machineNo: null,
          coinType: null,
          startTime: null,
          runTime: null,
          pauseTime: null,
          outputB: null,
          energyCharge: null,
          serviceCharge: null,
          earning: null
        },
        incomeInfo: [
          // {
          //   earning: 41.96467866,
          //   energyCharge: 2.8e-7,
          //   income: 2203736.4923255327,
          //   maintainTime: 40786,
          //   outputB: 41.96488,
          //   price: 52514.08,
          //   runTime: 45614,
          //   serviceCharge: 0.00020106,
          //   tDate: "2018-03-24"
          // }
        ],
        runningInfo: [
          // {
          //   duration: 99013,
          //   earning: 0,
          //   end: "至今",
          //   energyCharge: 0,
          //   outputB: 0,
          //   serviceCharge: 0,
          //   start: "2018-03-23 11:19:46",
          //   status: 1,
          // }
        ],
        detailInfo: {
          status: 1
        },
        activeTab: '',
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
        DepositAPI.machineDetail(this.tId, this.mId)
          .then(res => {
            this.depositInfo = res;
          })
          .catch(errorHandler);
      },
      loadRunningInfo() {
        const page = this.pageRunning.page;
        const size = this.pageRunning.size;
        DepositAPI.runningDetail(this.mId)
          .then(res => res || [])
          .then(res => {
            //本地分页
            this.runningInfo = chunk(res, size)[page - 1];
            this.pageRunning.total = res.length;
          });
      },
      loadIncomeInfo() {
        const page = this.pageIncome.page;
        const size = this.pageIncome.size;
        DepositAPI.incomeDetail(this.mId, page, size)
          .then(res => {
            this.incomeInfo = res.data;
            this.pageIncome.total = res.count;
          });
      },
      incomeSizeChange(size) {
        this.pageIncome.size = size;
        this.loadIncomeInfo();
      },
      incomePageChange(page) {
        this.pageIncome.page = page;
        this.loadIncomeInfo();
      },
      runningSizeChange(size) {
        this.pageRunning.size = size;
        this.loadRunningInfo();
      },
      runningPageChange(page) {
        this.pageRunning.page = page;
        this.loadRunningInfo();
      }
    }
    ,
    watch: {
      activeTab(val) {
        if (val === 'running') {
          this.loadRunningInfo();
        }
        if (val === 'income') {
          this.loadIncomeInfo();
        }
      }
    },
    mounted() {
      this.tId = this.$route.query.tId;
      this.mId = this.$route.query.mId;
      this.activeTab = 'income';
      this.initPage();
    }
  }
</script>

<style scoped lang="scss">

  @import "../../../style/variables";

  .deposit-detail {

  }

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

  .running-info {
    padding-bottom: 108px;
  }

  .output {
    padding-bottom: 20px;
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
    }

    dd {
      color: #303137;
      margin-left: 20px;

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

    &.status--1 {
      color: $danger;
      &:before {
        background-color: $danger;
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

</style>
