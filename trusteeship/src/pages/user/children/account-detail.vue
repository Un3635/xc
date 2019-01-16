<template>
  <div class="account-detail" @click="closeDetailPopover">
    <h2 class="header">{{currencyName}}账户明细</h2>
    <div class="header-date-change">
      时间
      <el-date-picker
        class="xc-date-picker no-radius"
        popper-class="date-picker-range"
        v-model="dateRange"
        @change="dateChange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable="clearable">
      </el-date-picker>
      最近
      <el-select class="xc-select no-radius" popper-class="select-recent " size="medium" @change="selectChange"
                 v-model="flag"
                 placeholder="全部" @focus="hidePopover()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="overview">
        收入<strong class="income">+{{income | cryptocurrency}}{{currencyName}}</strong>
        支出<strong class="pay">-{{pay | cryptocurrency}}{{currencyName}}</strong>
      </div>
    </div>
    <table class="table" id="tbContainer">
      <thead>
      <tr>
        <td>流水号</td>
        <td>时间</td>
        <td>名称 | 备注</td>
        <td>收支类型</td>
        <td>数量({{currencyName}})</td>
        <td>详情</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="tableData.length < 1">
        <td colspan="6" class="nodata">暂无数据</td>
      </tr>
      <tr v-if="tableData.length > 0" v-for="(item,index) in tableData" :key="index">
        <td>{{item.serialNumber || '--'}}</td>
        <td>{{item.createTime|date('YYYY-MM-DD HH:mm:ss') || '--'}}</td>
        <td>{{item.typeRemark}}</td>
        <td>
          <span v-if="item.typeOfOperation === 0">收入</span>
          <span v-if="item.typeOfOperation === 1">支出</span>
          <span v-if="item.typeOfOperation === 2">支出<strong class="freeze">(冻结中)</strong></span>
          <span v-if="item.typeOfOperation === 3">收入<strong class="freeze">(冻结中)</strong></span>
        </td>
        <td>
          <span class="prim" v-if="item.typeOfOperation === 0 || item.typeOfOperation === 3">+{{(item.currencyNumber||0) | cryptocurrency}}</span>
          <span class="warn" v-if="item.typeOfOperation === 1 || item.typeOfOperation === 2">-{{(item.currencyNumber||0) | cryptocurrency}}</span>
        </td>
        <td @click.stop>
          <span class="btn-look" @click="showDetail(item,$event)" v-if="item.type == 1">
            <span>查看</span>
            <i class="el-icon-arrow-down" :class="{'el-icon-arrow-up':selectedItem.id===item.id}"></i>
          </span>
          <span v-else>--</span>
        </td>
      </tr>
      </tbody>
      <!-- 详情弹框 -->
      <transition name="el-zoom-in-top">
        <popover-detail v-if="showDetailPopover" :top="top" :data-id="selectedItem.id"/>
      </transition>
    </table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        popper-class="pagination-select"
        class="text-left"
        v-if="pageCount > 0"
        layout="sizes, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50, 100, 200]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import PopoverDetail from './popover-detail.vue';
  import AccountApi from '../../../services/account-api';
  import errorHandler from '../../../services/error-handler';

  export default {
    components: {
      PopoverDetail
    },
    breadcrumb() {
      return {
        label: this.currencyName + '账户明细',
        parentsList: [
          {
            path: '/i/account',
            label: '我的账户'
          },
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    data() {
      return {
        loading: true,
        currencyId: '',
        currencyName: '',
        income: 0,
        pay: 0,
        dateRange: '',
        startTime: '',
        endTime: '',
        options: [
          {value: '0', label: '全部'},
          {value: '1', label: '1周'},
          {value: '2', label: '1月'},
          {value: '3', label: '1年'}
        ],
        flag: '0',
        currentPage: 1,
        pageSize: 10,
        pageSizes: 0,
        pageCount: 0,
        tableData: [],
        showDetailPopover: false,
        top: '',
        recentOperate: 'flag',
        selectedItem: {}
      };
    },
    mounted() {
      let currencyId = this.$route.query.currencyId;
      switch (currencyId) {
        case 1:
          this.currencyName = 'BTC';
          break;
        case 2:
          this.currencyName = 'ETH';
          break;
        case 3:
          this.currencyName = 'DCR';
          break;
        case 4:
          this.currencyName = 'BTM';
      }
      this.currencyId = currencyId;
      this.getAccountDetailByFlag();
    },
    watch: {},
    methods: {
      dateChange(date) {
        this.currentPage = 1;
        this.flag = '0';
        if (date) {
          this.startTime = date[0];
          this.endTime = date[1];
          this.recentOperate = 'date';
          this.getAccountDetailList();
        } else {
          this.recentOperate = 'flag';
          this.getAccountDetailByFlag();
        }
      },
      selectChange(val) {
        this.currentPage = 1;
        this.dateRange = '';
        this.flag = val;
        this.recentOperate = 'flag';
        this.getAccountDetailByFlag();
      },
      hidePopover() {
        this.showDetailPopover = false;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.recentOperate === 'flag' ? this.getAccountDetailByFlag() : this.getAccountDetailList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.recentOperate === 'flag' ? this.getAccountDetailByFlag() : this.getAccountDetailList();
      },
      getAccountDetailByFlag() {
        AccountApi.accountDetailByFlag(this.flag, this.currencyId, this.currentPage, this.pageSize)
          .then(res => {
            this.handleData(res);
            return res.pageData.list || [];
          })
          .then(list => {
            this.tableData = list;
          })
          .catch(errorHandler);
      },
      getAccountDetailList() {
        AccountApi.accountDetailList(this.startTime, this.endTime, this.currencyId, this.currentPage, this.pageSize)
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
        this.currentPage = res.pageData.current;
        this.pageSize = res.pageData.size;
        this.pageCount = res.pageData.count;
        this.pageSizes = res.pageData.pages;
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
      }
    },
    destroyed() {
      this.showDetailPopover = false;
    }
  };
</script>

<style scoped>

  .account-detail {
    min-height: 430px;
  }

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

  .overview {
    position: absolute;
    right: 30px;
    top: 110px;
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
    margin-top: 20px;
    padding-bottom: 30px;
    text-align: center;
    padding-left: 30px;
  }

  .btn-look span,
  .btn-look i {
    cursor: pointer;
  }
</style>
