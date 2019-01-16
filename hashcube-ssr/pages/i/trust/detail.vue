<template>
  <div class="deposit-detail">
    <h2 class="header">托管详情
      <el-popover v-if="machineInfo.trustStatus===-1"
                  placement="bottom-start"
                  width="310"
                  trigger="hover"
                  content="当账户余额、该加密货币账户或者连续10天收益（根据选择的付费方式计算），不足以抵扣耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束。">
        <span slot="reference" class="extra end">合约结束</span>
      </el-popover>
    </h2>
    <div class="deposit-detail__content">
      <el-row :gutter="20">
        <el-col :span="9">
          <h5>基本信息</h5>
          <div class="info-wrapper">
            <dl>
              <div class="base-info__item">
                <dt>托管单号</dt>
                <dd>{{depositInfo.trustNo}}</dd>
              </div>
              <div class="base-info__item">
                <dt>托管时间</dt>
                <dd>
                  <span v-if="depositInfo.startTrustTime">
                    {{depositInfo.startTrustTime|date('YYYY-M-D HH:mm:ss')}}
                  </span>
                  <span v-else>矿机暂未运行</span>
                </dd>
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
                <dd>
                  {{depositInfo.payWay|balanceType}}
                  <span class="change" @click="balanceDialogVisible=true">修改</span>
                </dd>
              </div>
            </dl>
          </div>
        </el-col>
        <el-col :span="15">
          <h5>产出信息</h5>
          <div class="info-wrapper">
            <table class="output-info">
              <thead>
              <tr>
                <td></td>
                <td>产出({{symbol}})</td>
                <td>耗电</td>
                <td>管理</td>
                <td>实际({{symbol}})</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>昨日</td>
                <td :class="{'negative':yesterday.income<0}">
                  <p>{{(yesterday.outputB||0)|cryptocurrency}}</p>
                  <p>&nbsp;</p>
                </td>
                <td :class="{'negative':yesterday.income<0}">
                  <p>{{(yesterday.energyCharge||0)|cryptocurrency}}&nbsp;{{symbol}}</p>
                  <p>{{(yesterday.energyChargeRmb||0)|currency}}&nbsp;CNY</p>
                </td>
                <td :class="{'negative':yesterday.income<0}">
                  <p>{{(yesterday.serviceCharge||0)|cryptocurrency}}&nbsp;{{symbol}}</p>
                  <p>{{(yesterday.serviceChargeRmb||0)|currency}}&nbsp;CNY</p>
                </td>
                <td :class="{'negative':yesterday.income<0}">
                  <p>{{(yesterday.income||0)|cryptocurrency}}</p>
                  <p>&nbsp;</p>
                </td>
              </tr>
              <tr>
                <td>总量</td>
                <td :class="{'negative':total.outputB<0}">
                  <p>{{(total.outputB||0)|cryptocurrency}}</p>
                  <p>&nbsp;</p>
                </td>
                <td :class="{'negative':total.energyCharge<0}">
                  <p>{{(total.energyCharge||0)|cryptocurrency}}&nbsp;{{symbol}}</p>
                  <p>{{(total.energyChargeRmb||0)|currency}}&nbsp;CNY</p>
                </td>
                <td :class="{'negative':total.serviceCharge<0}">
                  <p>{{(total.serviceCharge||0)|cryptocurrency}}&nbsp;{{symbol}}</p>
                  <p>{{(total.serviceChargeRmb||0)|currency}}&nbsp;CNY</p>
                </td>
                <td :class="{'negative':total.income<0}">
                  <p>{{(total.income||0)|cryptocurrency}}</p>
                  <p>&nbsp;</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-col>
      </el-row>
      <div class="miner-info">
        <div class="miner-info__header">
          <h5>矿机列表</h5>
          <div class="right">
            <span class="status status-1" v-if="machineInfo.trustStatus!==2">运行中<em>{{machineInfo.workSum}}</em></span>
            <span class="status status-2" v-if="machineInfo.trustStatus!==2">维护中<em>{{machineInfo.checkSum}}</em></span>
            <span class="status status-3" v-if="machineInfo.trustStatus===2">合约结束<em>{{machineInfo.endSum}}</em></span>
          </div>
        </div>
        <div class="miner-info__content">
          <el-table :data="minerInfo" border stripe>
            <el-table-column :resizable="false" fixed label="矿机编号" width="110">
              <template slot-scope="scope">
                <nuxt-link class="machine-no" :to="toIncome(scope.row)">
                  {{scope.row.snNo}}
                </nuxt-link>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="当前状态" width="90">
              <template slot-scope="scope">
                <span class="machine-status" :class="'status-'+scope.row.machineStatus">{{scope.row.machineStatus|machine}}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="'产出币量('+ symbol +')'" width="140" prop="outputB">
              <template slot-scope="scope">
                <span>{{scope.row.outputB|cryptocurrency}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" :resizable="false" label="耗电费用" width="170">
              <template slot-scope="scope">
                <p>{{scope.row.energyCharge|cryptocurrency}}<span class="unit">{{symbol}}</span></p>
                <p>{{scope.row.energyChargeRmb|currency}}<span class="unit">CNY</span></p>
              </template>
            </el-table-column>
            <el-table-column align="right" :resizable="false" label="管理费用" width="170">
              <template slot-scope="scope">
                <p>{{scope.row.serviceCharge|cryptocurrency}}<span class="unit">{{symbol}}</span></p>
                <p>{{scope.row.serviceChargeRmb|currency}}<span class="unit">CNY</span></p>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="'实际币量('+ symbol +')'" width="140">
              <template slot-scope="scope">{{scope.row.earning|cryptocurrency}}</template>
            </el-table-column>
            <el-table-column :resizable="false" label="开始运行" width="170">
              <template slot-scope="scope">
                <span>{{scope.row.startTime|date('YYYY-M-D HH:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="运行时长" prop="runTime" width="150">
              <template slot-scope="scope">{{scope.row.runTime|duration}}</template>
            </el-table-column>
            <el-table-column :resizable="false" label="暂停时长" prop="pauseTime" width="150">
              <template slot-scope="scope">{{scope.row.pauseTime|duration}}</template>
            </el-table-column>
          </el-table>
          <el-pagination v-if="minerInfo.length>1"
                         class="text-left"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="pageInfo.page"
                         :page-sizes="[10, 20, 30, 50, 100, 200]"
                         :page-size="pageInfo.size"
                         layout="sizes, prev, pager, next"
                         :total="pageInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <x-balance-change-dialog :visible.sync="balanceDialogVisible"
                             :type="depositInfo.payWay" @change="confirmChange"/>
  </div>
</template>

<script>
  import DepositAPI from '../../../services/deposit-api';
  import errorHandler from '../../../services/error-handler';
  import XBalanceChangeDialog from '../../../components/x-balance-change-dialog';
  import TrusteeshipAPI from '../../../services/trusteeship-api';

  export default {
    breadcrumb() {
      return {
        label: '托管详情',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          },
          {
            path: '/i/trust',
            label: '我的托管'
          }
        ]
      };
    },
    components: {XBalanceChangeDialog},
    data() {
      return {
        tId: '', // 托管单ID
        depositInfo: {
          // trustId: 'AX456XEDSW65',
          // startTrustTime: new Date(),
          // today: {},
          // total: {},
          // machineNo: '',
          // coinType: ''
        },
        symbol: '', // 数字货币符号
        yesterday: {
          energyCharge: 0,
          income: 0,
          outputB: 0,
          serviceCharge: 0
        }, // 昨日产出
        total: {
          energyCharge: 0,
          income: 0,
          outputB: 0,
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
          checkSum: 1,
          data: [],
          trustStatus: 0,  // 2-托管结束
          workSum: 4,
          endSum: 4
        }, // 矿机信息
        balanceDialogVisible: false
      };
    },
    methods: {
      initPage() {
        DepositAPI.detail(this.tId)
          .then(res => {
            this.depositInfo = res;
            this.symbol = res.coinType;
            if (res.today) {
              this.yesterday = res.today;
            }
            if (res.total) {
              this.total = res.total;
            }
          })
          .catch(errorHandler);
        this.loadMachineList();
      },
      loadMachineList() {
        const page = this.pageInfo.page;
        const size = this.pageInfo.size;
        DepositAPI.machineList(this.tId, page, size)
          .then(res => {
            this.machineInfo = res;
            if (res) {
              this.pageInfo.total = res.count;
              this.minerInfo = res.data || [];
            }
          })
          .catch(errorHandler);
      },
      handleSizeChange(size) {
        this.pageInfo.size = size;
        this.loadMachineList();
      },
      handleCurrentChange(page) {
        this.pageInfo.page = page;
        this.loadMachineList();
      },
      toIncome(item) {
        const tId = this.$route.query.tId;
        const mId = item.id;
        return {path: '/i/trust/income', query: {tId, mId}};
      },
      confirmChange(type) {
        const no = this.depositInfo.trustNo;
        TrusteeshipAPI.updatePayWay(no, 1, type)
          .then(() => {
            this.$message.success('修改成功');
            this.initPage();
          })
          .catch(err => errorHandler(err));
      }
    },
    mounted() {
      this.tId = this.$route.query.tId;
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">

  @import "../../../assets/style/variables";

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
    }

    dd {
      color: #303137;
      margin-left: 20px;
    }

  }

  .output-info {
    margin-bottom: 39px;
    width: 100%;
    height: 136px;
    border-collapse: collapse;
    border-spacing: 0;

    thead td, tbody td:first-child {
      font-size: 14px;
      color: #999;
    }
    td {
      padding: 0 0 28px;
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

    tbody td:last-child {
      font-weight: bold;
    }

    .negative {
      color: $danger;
    }
  }

  .miner-info {
    padding-top: 40px;

  }

  .miner-info__header {

    h5 {
      display: inline-block;
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
      background-color: $success;
    }

    &.status-2:before {
      background-color: $danger;
    }

    &.status-3:before {
      background-color: $primary;
    }

    + span {
      margin-left: 2.5em;
    }
  }

  .machine-no {
    color: #4D87EA;
  }

  .machine-status {
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

    &.status-2 {
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

  .miner-info__content {
    padding-top: 10px;

  }

  .unit {
    display: inline-block;
    margin-left: .4em;
  }

  .change {
    color: $info;
    margin-left: 3em;
    cursor: pointer;
  }

</style>
