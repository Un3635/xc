<template>
  <div class="page" @click="closeDetailPopover">
    <h2 class="header">{{currencyName}}明細</h2>
    <div class="header-date-change">
      日付
      <el-date-picker
        class="xc-date-picker no-radius"
        popper-class="date-picker-range"
        v-model="dateRange"
        @change="dateChange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="~"
        start-placeholder="START"
        end-placeholder="END"
        clearable="clearable">
      </el-date-picker>
      <ul class="selectTime">
        <li class="selectTip" :class="{'active':flag===1}" @click="selectChange(1)">直近1週間</li>
        <li class="selectTip" :class="{'active':flag===2}" @click="selectChange(2)">直近1ヶ月</li>
        <li class="selectTip" :class="{'active':flag===3}" @click="selectChange(3)">直近1年</li>
        <li class="selectTip" :class="{'active':flag===0}" @click="selectChange(0)">全て</li>
      </ul>
      <div class="overview">
        収入<strong class="income">+{{income | cryptocurrency}}{{currencyName}}</strong>
        支出<strong class="pay">-{{pay | cryptocurrency}}{{currencyName}}</strong>
      </div>
    </div>
    <table class="table" id="tbContainer">
      <thead>
      <tr>
        <td>ID</td>
        <td>時間</td>
        <td>内容 | 備考</td>
        <td>収支</td>
        <td>数量({{currencyName}})</td>
        <td>詳細</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="tableData.length < 1">
        <td colspan="6" class="nodata">現在表示できるデータはございません</td>
      </tr>
      <tr v-if="tableData.length > 0" v-for="(item,index) in tableData" :key="index">
        <td>{{item.serialNumber || '--'}}</td>
        <td>{{item.createTime|date('YYYY-MM-DD HH:mm:ss')}}</td>
        <td>{{item.typeRemark}}</td>
        <td>
          <span v-if="item.typeOfOperation === 0">収入</span>
          <span v-if="item.withdrawRefused && item.typeOfOperation === 0">(引出し失敗)</span>
          <span v-if="item.typeOfOperation === 1">支出</span>
          <span v-if="item.typeOfOperation === 2">支出<strong class="freeze">(凍結中)</strong></span>
          <span v-if="item.typeOfOperation === 3">収入<strong class="freeze">(凍結中)</strong></span>
        </td>
        <td>
          <span class="prim" v-if="item.typeOfOperation === 0">+{{(item.currencyNumber||0) | cryptocurrency}}</span>
          <span class="warn" v-if="item.typeOfOperation === 1 || item.typeOfOperation === 2">-{{(item.currencyNumber||0) | cryptocurrency}}</span>
        </td>
        <td @click.stop>
          <span v-if="item.typeOfOperation === 0">--</span>
          <span class="btn-look" @click="showDetail(item,$event)" v-else>
            <span class="btn">確認する</span>
            <!-- <i class="el-icon-arrow-down"
              :class="{'el-icon-arrow-up':selectedItem.userAccountCurrencyDetailId===item.userAccountCurrencyDetailId}"></i> -->
          </span>
        </td>
      </tr>
      </tbody>
      <transition name="el-zoom-in-top" v-if="showDetailPopover">
        <x-account-detail-dialog :top="top" :data-id="selectedItem.userAccountCurrencyDetailId"/>
      </transition>
    </table>
    <div class="pagination">
      <el-pagination
        popper-class="pagination-select"
        class="text-left"
        v-if="pageInfo.total > 0"
        layout="sizes, prev, pager, next"
        :current-page.sync="pageInfo.page"
        :page-size="pageInfo.size"
        :page-sizes="[10, 20, 30, 50, 100, 200]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import XAccountDetailDialog from '../../../components/x-account-detail-dialog';
  import errorHandler from '../../../services/error-handler';
  import AccountAPI from '../../../services/account-api';
  import {UPDATE_BREADCRUMB} from '../../../store/mutation-types';

  export default {
    head() {
      return {
        title: 'お取引明細_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    components: {
      XAccountDetailDialog
    },
    breadcrumb() {
      return {
        label: 'お取btc引明細',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/account',
            label: 'アカウント'
          }
        ]
      };
    },
    computed: {
      currencyName() {
        return this.$route.query.currencyName || '';
      }
    },
    data() {
      return {
        loading: true,
        income: 0,
        pay: 0,
        dateRange: [],
        flag: 0,
        tableData: [],
        showDetailPopover: false,
        top: 0,
        selectedItem: {},
        pageInfo: {
          page: 1,
          size: 10,
          total: 0
        }
      };
    },
    scrollToTop: true,
    methods: {
      initPage() {
        this.getAccountList();
      },
      handleSizeChange(val) {
        this.pageInfo.size = val;
        this.getAccountList();
      },
      handleCurrentChange(val) {
        this.pageInfo.page = val;
        this.getAccountList();
      },
      dateChange(date) {
        // 当用户点击清空时，dateRange会被设置为null
        this.flag = date ? '' : 0;
        this.pageInfo.page = 1;
        this.getAccountList();
      },
      selectChange(val) {
        this.flag = val;
        this.dateRange = [];
        this.pageInfo.page = 1;
        this.getAccountList();
      },
      getAccountList() {
        this.dateRange = this.dateRange || [];
        const {page, size} = this.pageInfo;
        const currencyId = this.$route.query.currencyId;
        let startTime = this.dateRange[0] || '';
        let endTime = this.dateRange[1] || '';
        AccountAPI.currencyInfoList(currencyId, startTime, endTime, this.flag, page, size)
          .then(res => {
            this.handleData(res);
            return res.pageData.list || [];
          })
          .then(list => {
            this.tableData = list;
          })
          .catch(errorHandler);
      },
      handleData(res) {
        this.loading = false;
        this.income = res.incomeTotal || 0;
        this.pay = res.expendTotal || 0;
        this.pageInfo.size = res.pageData.size;
        this.pageInfo.total = res.pageData.count;
        this.pageInfo.page = res.pageData.current;
      },
      showDetail(item, e) {
        let curRect = e.target.getBoundingClientRect();
        let tbRect = document.getElementById('tbContainer').getBoundingClientRect();
        this.top = curRect.top - tbRect.top + curRect.height + 20 + 'px';
        if (this.selectedItem === item) {
          this.selectedItem = {};
          this.showDetailPopover = false;
        } else {
          this.selectedItem = item;
          this.showDetailPopover = true;
        }
      },
      closeDetailPopover() {
        this.selectedItem = {};
        this.showDetailPopover = false;
      },
      initBreadcrumb() {
        const breadcrumb = {
          label: this.currencyName + '明細',
          parentsList: [
            {
              path: '/i',
              label: 'My Finto'
            },
            {
              path: '/i/account',
              label: 'アカウント'
            }
          ]
        };
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      },
    },
    mounted() {
      this.initPage();
      this.initBreadcrumb();
    },
    destroyed() {
      this.showDetailPopover = false;
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
    border-bottom: 1px solid #eee;
  }

  .header-date-change {
    padding: 30px 30px;
    font-size: 14px;
    color: #969699;
  }

  .xc-date-picker {
    width: 240px;
    height: 36px;
    margin-left: 14px;
    margin-right: 30px;
    position: relative;
    top: 2px;
  }

  .xc-select {
    width: 105px;
    height: 36px;
    margin-left: 14px;
  }

  .selectTime {
    display: inline-block;
    line-height: 36px;
  }

  .selectTip {
    display: inline;
    font-size: 14px;
    color: #969699;
    line-height: 19px;
    padding: 0 21px;
    cursor: pointer;
    border-left: 1px solid #EDEEF0;
    &.active {
      font-size: 14px;
      color: #303137;
      font-weight: bold;
    }
  }

  .selectTip:first-child {
    padding-left: 0px;
    border: none;
  }

  .overview {
    min-width: 500px;
    margin-top: 20px;
  }

  .income {
    color: #2bb56f;
    margin-left: 10px;
    margin-right: 30px;
  }

  .pay {
    color: #f95453;
    margin-left: 10px;
  }

  table {
    width: 970px;
    table-layout: fixed;
    border-collapse: collapse;
    margin-left: 30px;
    font-size: 14px;
    position: relative;
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
    background-color: #F5F5F7;
  }

  thead td {
    color: #969699;
  }

  tr:nth-child(2n) {
    background-color: #F5F5F7;
  }

  td {
    border: 1px solid #EDEEF0;
    padding: 16px;
    word-wrap: break-word;
    color: #333;
  }

  tr td:nth-child(1) {
    width: 211.5px;
  }

  tr td:nth-child(2) {
    width: 170px;
  }

  tr td:nth-child(3) {
    width: 201px;
  }

  tr td:nth-child(4) {
    width: 129px;
  }

  tr td:nth-child(5) {
    width: 127px;
    text-align: right;
  }

  tr td:nth-child(6) {
    width: 121.5px;
    text-align: right;
    .btn {
      color: #4D87EA;
    }
  }

  .freeze {
    color: #fdaa24;
  }

  .prim {
    color: #2bb56f;
  }

  .warn {
    color: #f95453;
  }

  .pagination {
    padding-left: 283px;
    margin-top: 20px;
    padding-bottom: 30px;
    text-align: center;
  }

  .btn-look span,
  .btn-look i {
    cursor: pointer;
  }
</style>
