<template>
  <div class="page">
    <h2 class="page-header">委託情報</h2>
    <div class="summary">
      <h3 class="summary-title">概要</h3>
      <div class="summary-content">
        <el-row>
          <el-col :span="6" class="total-info">
            <p>機器台数</p>
            <p>{{colligateData.totalSum}}</p>
          </el-col>
          <el-col :span="18">
            <x-table header-width="120" default-data="0" :table-data="minerData"
                     :column-style="{textAlign:'center'}"/>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="summary">
      <h3 class="summary-title">総収益</h3>
      <div class="summary-content">
        <x-table :table-data="incomeData" default-data="0.00" :fixed="false"/>
        <el-row class="output-value">
          <el-col :span="16">
            <div class="lb">
              予測収益
              <el-popover width="200" trigger="hover" placement="bottom" content="予測収益は毎日午前8時時点でのBitbankにおける価格を基準とし算出しております。">
                <i slot="reference" class="iconfont icon-help"></i>
              </el-popover>
            </div>
            <h3>{{colligateData.totalIncome}}円</h3>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="text" @click="$router.replace('/i/account')">
              お引き出しへ
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="summary">
      <ul class="nav">
        <li class="nav-item" :class="{'active':selectedType===''}" @click="selectedType=''">機器</li>
        <li class="nav-item" :class="{'active':selectedType==='2'}" @click="selectedType='2'">準備中</li>
        <li class="nav-item" :class="{'active':selectedType==='-1'}" @click="selectedType='-1'">
          契約終了
          <el-popover popper-class="contract-end" placement="bottom" width="560" trigger="hover"
                      content="マイニングサービスの契約期間は2年間となります。契約終了後については、新規でマイニング機器をご購入頂き、再度マイニングサービスをご利用ください。詳しい内容はウェブサイト内の売買・保守管理契約をご参照ください。">
            <i slot="reference" class="iconfont icon-help end-tips"></i>
          </el-popover>
        </li>
      </ul>
      <ul class="sub-nav" v-show="selectedType != 2">
        <li class="sub-nav-item" :class="{active:item.id===selectedSubItemId}"
            v-for="(item,index) in subNavInfo[selectedType].subItems" :key="index"
            @click="selectedSubItemId=item.id">
          {{item.label}}
        </li>
      </ul>
      <div class="data-container" :style="{'padding-top': selectedType == 2 ? '20px' : 0}">
        <el-row :gutter="20" v-if="selectedType!=='2'">
          <el-col :span="12" v-for="item in tmListData" :key="item.trustNo">
            <div class="ts-detail">
              <div class="ts-detail-title">
              <span>
                委託番号&nbsp;
                <el-popover placement="bottom" popper-class="custom-ts text-center color-303137"
                            trigger="hover" :content="'委託番号 '+ item.trustNo">
                <span slot="reference">{{item.trustNo | truncate(12)}}</span>
              </el-popover>
              </span>
                <span class="ml-2">{{!item.finishStatus ? '委託時間' : '終了時間'}}&nbsp;
                  <span v-if="item.trusteeshipTime">{{item.trusteeshipTime | date('YYYY-MM-DD HH:mm:ss')}}</span>
                  <span v-else>運営スタートしておりません</span>
                </span>
                <span class="right text-link" @click="goDetail(item)">詳細</span>
              </div>
              <div class="ts-detail-content">
                <h5>
                  {{item.machineName}}
                </h5>
                <el-row class="ts-detail-info">
                  <el-col :span="10" class="miner-info">
                    <dl class="sum">
                      <dt>{{item.currency}}機器</dt>
                      <dd><strong>{{item.trustCount || 0}}</strong></dd>
                    </dl>
                    <dl>
                      <dt class="running">運営中</dt>
                      <dd>{{item.runningSum || 0}}</dd>
                    </dl>
                    <dl>
                      <dt class="checking">一時停止中</dt>
                      <dd>{{item.suspendSum || 0}}</dd>
                    </dl>
                    <dl>
                      <dt class="ending">終了</dt>
                      <dd>{{item.terminationSum || 0}}</dd>
                    </dl>
                  </el-col>
                  <el-col :span="14" class="output-info">
                    <dl>
                      <dt>マイニング収益</dt>
                      <dd>{{item.outputB || 0}}{{item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>電気代</dt>
                      <dd>{{item.energyCharge || 0}}{{item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>管理費用</dt>
                      <dd>{{item.serviceCharge || 0}}{{item.currency}}</dd>
                    </dl>
                    <dl>
                      <dt>実質収益</dt>
                      <dd>{{item.grandTotalEarning || 0}}{{item.currency}}</dd>
                    </dl>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col class="no-data" v-if="tmListData.length<1">表示できるデータはありません</el-col>
        </el-row>
        <div v-if="selectedType==='2'">
          <table class="tb-main">
            <thead>
            <tr>
              <th class="text-left">商品</th>
              <th>機種</th>
              <th>出荷予定日</th>
              <th>準備中の台数</th>
              <th>マイニング中の台数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in deliveryData" :key="item.mallOrderNo">
              <td colspan="6">
                <table class="tb-order-info">
                  <thead>
                  <tr>
                    <th colspan="6" class="text-left">
                      <span>注文ID&emsp;<span>{{item.mallOrderNo}}</span></span>&emsp;&emsp;&emsp;
                      <span>注文時間&emsp;<span>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</span></span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="miner in item.data" :key="miner.machineNo">
                    <td class="text-left">
                      <p style="line-height: 1.5em">{{miner.machineNo}}</p>
                    </td>
                    <td>{{miner.machineType}}</td>
                    <td>
                      {{miner.startSendTime | date('YYYY-MM-DD')}} ~ {{miner.endSendTime | date('YYYY-MM-DD')}}
                    </td>
                    <td>{{miner.awiatSum}}台</td>
                    <td>{{miner.alreadySum}}台</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr v-if="deliveryData.length<1">
              <td class="no-data" colspan="6">表示できるデータはありません</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination"
             v-if="selectedType!=='2'&&tmListData.length>0||selectedType==='2'&&deliveryData.length>0">
          <el-pagination
            popper-class="pagination-select"
            :page-size="page.pageSize"
            layout="prev, pager, next"
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
  import TrustAPI from '../../../services/trust-api';
  import XTable from '../../../components/x-table';
  import UserAPI from '../../../services/user-api';
  import cryptocurrency from '../../../filters/cryptocurrency';
  import {isClient} from '../../../services/utils';

  export default {
    head() {
      return {
        title: '委託情報｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    name: 'trust',
    breadcrumb() {
      return {
        label: '委託情報',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
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
        minerData: {},
        incomeData: {},
        subNavInfo: {
          '': {
            subItems: []
          },
          '2': {
            subItems: [
//              {label: '全部機種', id: ''},
//              {label: '30日以内受渡', id: 'in'},
//              {label: '30日以後受渡', id: 'out'}
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
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.loadData();
      },
      initPage() {
        this.getColligate();
        const subItems = [];
        subItems.push({label: '全機種', id: '', name: ''});

        // 根据币种信息初始化子菜单
        UserAPI.getCurrencyListByType(1)
          .then(res => res.result || [])
          .then(res => {
            res.forEach(({name, id}) => {
              subItems.push({label: name + 'マイニング機器', id, name});
            });
            this.initSubItems(subItems);
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
        let type = this.getType(this.selectedType);
        let currencyId = this.selectedSubItemId;
        TrustAPI.TmList(type, currencyId, this.page.currentPage, this.page.pageSize)
          .then((res) => {
            this.tmListData = res.data || [];
            this.page.total = res.count;
          }).catch();
      },
      getType(selectType) {
        switch (Number(selectType)) {
          case 0:
            return '';
          case 1:
            return 3;
          case -1:
            return 5;
        }
      },
      loadDeliveryList() {
        this.deliveryData = [];
        let filter = this.selectedSubItemId;
        const days = this.selectedSubItemId ? '30' : '';
        TrustAPI.DeliveryList(days, filter, this.page.currentPage, this.page.pageSize)
          .then((res) => {
            this.deliveryData = res.data || [];
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
        TrustAPI.Colligate()
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
          incomeData.income[item.currencyName] = item;
          if (cols.findIndex(i => i.currencyId === item.currencyId) === -1) {
            cols.push({
              prop: item.currencyName,
              label: item.currencyName + '収益',
              currencyId: item.currencyId
            });
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
        const statusList = ['inCheck', 'inWork', 'aWait','inEnd'];
        const cols = [];
        statusList.forEach(status => {
          tableData[status] = {};
          (data[status] || []).forEach(item => {
            tableData[status][item.currencyName] = item;
            if (cols.findIndex(i => i.currencyId === item.currencyId) === -1) {
              cols.push({
                prop: item.currencyName,
                label: item.currencyName + '機種',
                currencyId: item.currencyId
              });
            }
          });
        });
//        cols.sort((a, b) => a.currencyId - b.currencyId);
        const rows = [
          {label: '運営中', prop: 'inWork'},
          {label: '一時停止中', prop: 'inCheck'},
          {label: '未受渡', prop: 'aWait'},
          {label:'終了',prop:'inEnd'}
        ];
        this.minerData = {
          rows,
          cols,
          data: tableData
        };
      },
      goDetail(item) {
        if (!item.id) {
          return this.$message.error('無効な委託書');
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
            if (isClient) this.loadData();
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
          if (isClient) this.loadData();
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

      .iconfont {
        font-size: 14px;
        color: #969699;
      }
    }

    .tip {
      padding-top: 10px;
      font-size: 14px;
      color: #606166;
    }

    button {
      margin-top: 60px;
      padding: 0;
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
    height: 190px;
    text-align: center;
    border-right: 1px dashed #ccc;
    font-size: 14px;
    line-height: 30px;
    padding-top: 59px;

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
    line-height: 24px;

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
    background: #fafafa;
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
      &.checking,
      &.ending {
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
        background-color: #FFA614;
      }

      &.ending{
        width: 53px;
      }

      &.ending:before {
        background-color: #969699;
      }
    }
    dd {
      margin-left: 20px;
    }
  }

  .miner-info {
    .sum {
      color: #303137;
      /*padding-top: 10px;*/
      /*padding-bottom: 8px;*/
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
    width: 100%;
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
    text-align: center;
  }

</style>
<style>
  .color-303137{
    color: #303137;
  }
</style>
