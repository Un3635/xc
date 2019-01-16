<template>
  <div class="page">
    <h2 class="page-header">我的托管</h2>
    <div class="summary">
      <h3 class="summary-title">综述</h3>
      <div class="summary-content">
        <el-row>
          <el-col :span="6" class="total-info">
            <p>矿机量</p>
            <p>{{colligateData.totalSum}}</p>
            <p v-if="rank!==-1">全网排名：<em>{{rank}}</em></p>
          </el-col>
          <el-col :span="18">
            <x-table header-width="120" default-data="0" :table-data="minerData"
                     :column-style="{textAlign:'center'}"/>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="summary">
      <h3 class="summary-title">总收益</h3>
      <div class="summary-content">
        <no-ssr>
          <x-table :table-data="incomeData" default-data="0.00" :fixed="false"/>
        </no-ssr>
        <el-row class="output-value">
          <el-col :span="12">
            <p class="lb">
              <span>实际产出收益估算</span>
              <el-popover width="200" trigger="hover" placement="bottom">
                <img slot="reference" src="../../../assets/images/weihuzhong_jieshi.svg" alt="">
                <span>收益计算参考当日8点火币网价格</span>
              </el-popover>
            </p>
            <h3>￥{{colligateData.totalIncome}}</h3>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="text" @click="$router.push('account')">
              去账户提现 &gt;
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="summary">
      <ul class="nav">
        <li class="nav-item" :class="{'active':selectedType===''}" @click="selectedType=''">我的矿机</li>
        <li class="nav-item" :class="{'active':selectedType==='2'}" @click="selectedType='2'">待交割</li>
        <li class="nav-item" :class="{'active':selectedType==='-1'}" @click="selectedType='-1'">
          合约结束
          <el-popover popper-class="contract-end" placement="bottom" width="560" trigger="hover"
                      content="当账户余额、该加密货币账户或者连续10天收益（根据选择的付费方式计算），不足以抵扣耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束。">
            <i slot="reference" class="iconfont icon-help end-tips"></i>
          </el-popover>
        </li>
      </ul>
      <ul class="sub-nav">
        <li class="sub-nav-item" :class="{active:item.id===selectedSubItemId}"
            v-for="item in subNavInfo[selectedType].subItems" :key="item.id"
            @click="selectedSubItemId=item.id">
          {{item.label}}
        </li>
      </ul>
      <div class="data-container">
        <el-row :gutter="20" v-if="selectedType!=='2'">
          <el-col :span="12" v-for="item in tmListData" :key="item.trustNo">
            <div class="ts-detail">
              <div class="ts-detail-title">
              <span>
                托管单&nbsp;
                <el-popover placement="bottom" width="180" popper-class="custom-ts text-center"
                            trigger="hover" :content="item.trustNo">
                <span slot="reference">{{item.trustNo | truncate(12)}}</span>
              </el-popover>
              </span>
                <span class="ml-2">托管时间&nbsp;
                  <span v-if="item.createTime">{{item.createTime | date('YYYY年MM月DD日 HH:mm:ss')}}</span>
                  <span v-else>矿机暂未运行</span>
                </span>
                <span class="right text-link" @click="goDetail(item)">托管详情</span>
              </div>
              <div class="ts-detail-content">
                <h5>
                  {{item.machineName}}
                  <span class="right">
                    <img src="../../../assets/images/miner-tag/btc.svg" alt="" v-if="item.currency==='BTC'">
                    <img src="../../../assets/images/miner-tag/eth.svg" alt="" v-if="item.currency==='ETH'">
                    <img src="../../../assets/images/miner-tag/dcr.svg" alt="" v-if="item.currency==='DCR'">
                    <img src="../../../assets/images/miner-tag/dash.svg" alt="" v-if="item.currency==='DASH'">
                    <img src="../../../assets/images/miner-tag/btm.svg" alt="" v-if="item.currency==='BTM'">
                  </span>
                </h5>
                <el-row class="ts-detail-info">
                  <el-col :span="10" class="miner-info">
                    <dl class="sum">
                      <dt>矿机量</dt>
                      <dd><strong>{{item.goodsNum || 0}}</strong></dd>
                    </dl>
                    <dl>
                      <dt class="running">运行中</dt>
                      <dd>{{item.runnigSum || 0}}</dd>
                    </dl>
                    <dl>
                      <dt class="checking">维护中</dt>
                      <dd>{{item.checkSum || 0}}</dd>
                    </dl>
                  </el-col>
                  <el-col :span="14" class="output-info">
                    <dl>
                      <dt>产出币量</dt>
                      <dd>{{item.outputB + item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>电力费用</dt>
                      <dd>{{item.energyCharge + item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>管理费用</dt>
                      <dd>{{item.serviceCharge + item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>实际币量</dt>
                      <dd>{{item.grandTotalEarning + item.currency}}</dd>
                    </dl>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col class="no-data" v-if="tmListData.length<1">暂无数据</el-col>
        </el-row>
        <div v-if="selectedType==='2'">
          <table class="tb-main">
            <thead>
            <tr>
              <th class="text-left">机器型号</th>
              <th>机器类型</th>
              <th>预计发货时间</th>
              <th>待交割数量</th>
              <th>已交割数量</th>
              <th>付费方式</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in deliveryData" :key="item.mallOrderNo">
              <td colspan="6">
                <table class="tb-order-info">
                  <thead>
                  <tr>
                    <th colspan="6" class="text-left">
                      <span>订单号&emsp;<span>{{item.mallOrderNo}}</span></span>&emsp;&emsp;&emsp;
                      <span>下单时间&emsp;<span>{{item.createTime | date('YYYY年MM月DD日 HH:mm:ss')}}</span></span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(miner,idx) in item.data" :key="idx">
                    <td class="text-left">{{miner.machineNo}}</td>
                    <td>{{miner.machineType}}</td>
                    <td>{{miner.sendDate}}</td>
                    <td>{{miner.awiatSum}}台</td>
                    <td>{{miner.alreadySum}}台</td>
                    <td>{{miner.payWay | balanceType}}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr v-if="deliveryData.length<1">
              <td class="no-data" colspan="6">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination"
             v-if="selectedType!=='2'&&tmListData.length>0||selectedType==='2'&&deliveryData.length>0">
          <el-pagination
            popper-class="pagination-select"
            class="text-left"
            :page-sizes="[10, 20, 30, 50, 100, 200]"
            :page-size="page.pageSize"
            layout="sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentPage"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrusteeshipAPI from '../../../services/trusteeship-api';
  // import get from 'lodash.get';
  import XTable from '../../../components/x-table';
  import UserAPI from '../../../services/user-api';
  import cryptocurrency from '../../../utils/filters/cryptocurrency';

  export default {
    breadcrumb() {
      return {
        label: '我的托管',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    components: {XTable},
    data() {
      return {
        colligateData: {},
        tmListData: [],
        deliveryData: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 1
        },
        rank: -1,
        minerData: {},
        incomeData: {},
        subNavInfo: {
          '': {
            subItems: []
          },
          '2': {
            subItems: [
              {label: '全部矿机', id: ''},
              {label: '30天内交割', id: 'in'},
              {label: '30天后交割', id: 'out'}
            ]
          },
          '-1': {
            subItems: []
          }
        },
        selectedType: '', // '' '2' '-1'
        selectedSubItemId: ''
      };
    },
    methods: {
      // getProp: get,
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.loadData();
      },
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.loadData();
      },
      initPage() {
        this.getColligate();
        const subItems = [];
        subItems.push({label: '全部矿机', id: '', name: ''});

        // 根据币种信息初始化子菜单
        UserAPI.getCurrencyListByType(1)
          .then(res => {
            res.forEach(({name, id}) => {
              subItems.push({label: name + '矿机', id, name});
            });
            this.initSubItems(subItems);
          });

        // 初始化排名信息
        TrusteeshipAPI.trustRank()
          .then(res => {
            this.rank = res;
          })
          .catch(() => {
          });
      },
      initSubItems(subItems) {
        const keys = ['', '-1'];
        keys.forEach(key => {
          this.subNavInfo[key].subItems = subItems;
        });
      },
      loadTrustList() {
        this.tmListData = [];
        let type = this.selectedType;
        let currencyId = this.selectedSubItemId;
        TrusteeshipAPI.tmList(type, currencyId, this.page.currentPage, this.page.pageSize)
          .then((res) => {
            this.tmListData = res.data;
            this.page.total = res.count;
          }).catch();
      },
      loadDeliveryList() {
        this.deliveryData = [];
        let filter = this.selectedSubItemId;
        const days = this.selectedSubItemId ? '30' : '';
        TrusteeshipAPI.deliveryList(days, filter, this.page.currentPage, this.page.pageSize)
          .then((res) => {
            this.deliveryData = res.data;
            this.page.total = res.count;
          })
          .catch();
      },
      loadData() {
        if (this.selectedType === '2') { // 是否为待托管
          this.loadDeliveryList();
        } else {
          this.loadTrustList();
        }
      },
      getColligate() {
        TrusteeshipAPI.colligate()
          .then((res) => {
            this.colligateData = res;
            this.initMinerData(res);
            this.initIncomeData(res);
          })
          .catch(() => {
          });
      },
      initIncomeData(data) {
        const incomeData = {
          income: {}
        };
        const cols = [];
        (data.income || []).forEach(item => {
          item.sum = cryptocurrency(item.sum);
          if (item.goodsType === 1) {
            incomeData.income['contract' + item.curryencyName] = item;
            cols.unshift({
              prop: 'contract' + item.curryencyName,
              label: item.curryencyName + '合约产出',
              currencyId: item.curryencyId
            });
          } else {
            incomeData.income[item.curryencyName] = item;
            if (cols.findIndex(i => i.goodsType === 0 ? (i.currencyId === item.curryencyId) === -1 : false)) {
              cols.push({
                prop: item.curryencyName,
                label: item.curryencyName + '产出',
                currencyId: item.curryencyId
              });
            }
          }
        });
        this.incomeData = {
          rows: [{label: '', prop: 'income'}],
          cols: cols,
          data: incomeData
        };
      },
      initMinerData(data) {
        const tableData = {};
        const statusList = ['inCheck', 'inWork', 'aWait'];
        const cols = [];
        statusList.forEach(status => {
          tableData[status] = {};
          (data[status] || []).forEach(item => {
            if (item.goodsType === 1) {
              tableData[status]['contract' + item.curryencyName] = item;
              cols.unshift({
                prop: 'contract' + item.curryencyName,
                label: item.curryencyName + '合约矿机',
                currencyId: item.curryencyId
              });
            } else {
              tableData[status][item.curryencyName] = item;
              if (cols.findIndex(i => i.currencyId === item.curryencyId) === -1) {
                cols.push({
                  prop: item.curryencyName,
                  label: item.curryencyName + '矿机',
                  currencyId: item.curryencyId
                });
              }
            }
          });
        });
//        cols.sort((a, b) => a.currencyId - b.currencyId);
        const rows = [
          {label: '运行中', prop: 'inWork'},
          {label: '维护中', prop: 'inCheck'},
          {label: '待交割', prop: 'aWait'}
        ];
        this.minerData = {
          rows,
          cols,
          data: tableData
        };
        console.info(this.minerData);
      },
      goDetail(item) {
        if (!item.id) {
          return this.$message.error('无效的托管单');
        }
        this.$router.push({
          path: 'detail',
          append: true,
          query: {tId: item.id}
        });
      }
    },
    mounted() {
      this.initPage();
    },
    watch: {
      selectedType: {
        handler(val) {
          const subItemId = (this.subNavInfo[val].subItems[0] || {}).id || '';
          if (this.selectedSubItemId === subItemId) { // 一级菜单变化，二级菜单不变时
            this.page.total = 0;
            this.page.currentPage = 1;
            this.loadData();
          } else {
            this.selectedSubItemId = subItemId;
          }
        },
        immediate: true
      },
      selectedSubItemId: {
        handler() {
          this.page.total = 0;
          this.page.currentPage = 1;
          this.loadData();
        },
        immediate: true
      }
    }
  };
</script>

<style scoped lang="scss">

  .page-header {
    padding-left: 30px;
    height: 64px;
    line-height: 64px;
    font-size: 24px;
    border-bottom: 1px solid #f5f5f7;
    color: #303137;
  }

  .summary {
    padding: 30px;
  }

  .summary + .summary {
    padding-top: 0;
  }

  .output-value {
    padding-top: 20px;
    border-top: 1px dashed #DEDEE0;

    .lb {
      font-size: 14px;
      line-height: 30px;

      img {
        width: 14px;
        position: relative;
        top: 2px;
      }
    }

    button {
      margin-top: 10px;
    }
  }

  .summary-title {
    font-size: 16px;
    line-height: 40px;
    color: #303137;
  }

  .summary-content {
    background-color: #fafafa;
    padding: 30px;
  }

  .total-info {
    height: 152px;
    text-align: center;
    border-right: 1px dashed #ccc;
    font-size: 14px;
    line-height: 30px;
    padding-top: 40px;

    p:nth-child(1) {
      color: #606166;
    }

    p:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
    }

    p:nth-child(3) {
      margin-top: 15px;
    }

    em {
      font-style: normal;
      font-weight: bold;
    }
  }

  .nav {
    height: 38px;
    line-height: 36px;
    font-size: 0;
    border-bottom: 1px solid #f5f5f7;

    .nav-item {
      display: inline-block;
      position: relative;
      margin-left: 60px;
      font-size: 16px;
      font-weight: bold;
      color: #969699;
      transition: color ease .3s;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.active {
        border-bottom: 2px solid #303137;
        color: #303137;
        .end-tips {
          display: inline;
        }
      }

      .end-tips {
        display: none;
        position: absolute;
        top: 0;
        right: -20px;
        color: #969699;
        font-weight: normal;
      }
    }
  }

  .sub-nav {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 0;
    line-height: 20px;

    .sub-nav-item {
      margin-right: 3em;
      display: inline-block;
      min-width: 60px;
      font-size: 14px;
      vertical-align: top;
      transition: all ease .3s;
      color: #969699;
      cursor: pointer;

      &.active {
        font-size: 14px;
        font-weight: bold;
        color: #303137;
      }
    }
  }

  .text-link {
    color: #4d87ea;
    cursor: pointer;
  }

  .ts-detail {
    margin-bottom: 20px;
    border: 1px solid #F5F5F7;
  }

  .ts-detail-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #F5F5F7;
    font-size: 12px;
    color: #969699;
    padding-left: 16px;
    padding-right: 16px;

    .ml-2 {
      margin-left: 2em;
    }
  }

  .ts-detail-content {
    padding-top: 30px;
    padding-bottom: 30px;

    h5 {
      padding-left: 30px;
    }
  }

  .ts-detail-info {
    margin-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .miner-info,
  .output-info {
    dl {
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
    }
    dt, dd {
      display: inline-block;
      font-size: 14px;
      line-height: 19px;
    }
    dt {
      color: #969699;
      &.running,
      &.checking {
        &:before {
          content: '';
          display: inline-block;
          margin-right: 6px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          vertical-align: 2px;
        }
      }

      &.running:before {
        background-color: #2BB56F;
      }

      &.checking:before {
        background-color: #F95453;
      }
    }
    dd {
      margin-left: 20px;
    }
  }

  .miner-info {
    .sum {
      color: #303137;
      padding-top: 10px;
      padding-bottom: 8px;
    }

    strong {
      font-size: 18px;
      line-height: 24px;
      color: #4d87ea;
    }
  }

  .output-info {
    padding-left: 20px;
    border-left: 1px dashed #DEDEE0;
  }

  .tb-main {
    width: 100%;
    border-spacing: 0;

    thead {
      background-color: #FAFAFA;
    }

    & > thead {
      line-height: 55px;
      font-size: 12px;
      color: #303137;
    }

    & > tbody > tr > td {
      padding-top: 20px;
      padding-left: 0;
      padding-right: 0;
    }

    th, td {
      padding: 0 16px;
      font-size: 12px;
      font-weight: normal;
      text-align: center;

      &:nth-child(1) {
        width: 152px;
        text-align: left;
      }
      &:nth-child(2) {
        width: 181px;
      }
      &:nth-child(3) {
        width: 223px;
      }
      &:nth-child(4) {
        width: 110.5px;
      }
      &:nth-child(5) {
        width: 113px;
      }
      &:nth-child(6) {
        width: 180px;
      }
    }
    th {
      border: 1px solid #F5F5F7;
      border-right: none;
      &:last-child {
        border-right: 1px solid #F5F5F7;
      }
    }

    td.no-data {
      text-align: center;
    }
  }

  .tb-order-info {
    border-spacing: 0;

    th {
      color: #969699;
      height: 40px;
      line-height: 40px;
    }

    td {
      color: #303137;
      border: 1px solid #f5f5f7;
      height: 44px;
      line-height: 44px;
      border-top: 0;
      border-right: 0;

      &:last-child {
        border-right: 1px solid #f5f5f7;
      }
    }
  }

  .no-data {
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color: #969699;
  }

  .pagination {
    padding-left: 30px;
  }

</style>
