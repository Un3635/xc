<template>
  <div class="page">
    <h2 class="header">お取引履歴</h2>
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
        end-placeholder="END">
      </el-date-picker>
      <ul class="selectTime">
        <li class="selectTip" :class="{'active':flag===1}" @click="selectChange(1)">直近1週間</li>
        <li class="selectTip" :class="{'active':flag===2}" @click="selectChange(2)">直近1ヶ月</li>
        <li class="selectTip" :class="{'active':flag===3}" @click="selectChange(3)">直近1年</li>
        <li class="selectTip" :class="{'active':flag===0}" @click="selectChange(0)">全て</li>
      </ul>
    </div>
    <table>
      <thead>
      <tr>
        <td>お支払いID</td>
        <td>支払時間</td>
        <td>支払方法</td>
        <td>支払金額（JPY）</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="tableData.length < 1">
        <td colspan="4" class="nodata">現在表示できるデータはございません</td>
      </tr>
      <tr v-if="tableData.length > 0" v-for="(item,index) in tableData" :key="index">
        <td>
          <nuxt-link :to="'detail?id='+item.userRefundId" append>{{item.payNo}}</nuxt-link>
        </td>
        <td>{{item.createTime|date('YYYY-MM-DD HH:mm:ss')}}</td>
        <td>{{item.payType|payType}}</td>
        <td><span class="warn">-{{item.totalMoney | currency}}</span></td>
      </tr>
      </tbody>
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
  import AccountAPI from '../../../../services/account-api';
  import errorHandler from '../../../../services/error-handler';
  import format from 'date-fns/format';
  import subDays from 'date-fns/sub_days';

  export default {
    head() {
      return {
        title: 'お取引明細_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    breadcrumb() {
      return {
        label: 'お取引履歴',
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
    data() {
      return {
        dateRange: '',
        flag: '',
        tableData: [],
        pageInfo: {
          page: 1,
          size: 10,
          total: 0
        }
      };
    },
    mounted() {
      this.dateRange = [format(subDays(new Date(), 14), 'YYYY-MM-DD'), format(new Date(), 'YYYY-MM-DD')];
      this.initPage();
    },
    filters: {
      payType(value) {
        switch (value) {
          case 1:
            return 'クレジットカード返済';
        }
      }
    },
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
        let startTime = this.dateRange[0] || '';
        let endTime = this.dateRange[1] || '';
        AccountAPI.billList(startTime, endTime, this.flag, page, size)
          .then(res => {
            this.pageInfo.page = res.current;
            this.pageInfo.size = res.size;
            this.pageInfo.total = res.count;
            this.tableData = res.list || [];
          })
          .catch(errorHandler);
      }
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
    padding: 30px 30px 20px;
    position: relative;
    font-size: 14px;
    color: #969699;
  }

  .xc-date-picker {
    width: 250px;
    height: 36px;
    margin-left: 14px;
    margin-right: 30px;
    position: relative;
    top: 2px;
  }

  .selectTime {
    display: inline-block;
    line-height: 36px;
    li {
      display: inline;
      font-size: 14px;
      color: #969699;
      line-height: 19px;
      padding: 0 21px;
      border-left: 1px solid #EDEEF0;
      cursor: pointer;
      &.active {
        font-size: 14px;
        color: #303137;
        font-weight: bold;
      }
    }
    li:first-child {
      padding-left: 0px;
      border: none;
    }
  }

  .table {
    margin-left: 30px;
  }

  table {
    width: 970px;
    table-layout: fixed;
    border-collapse: collapse;
    margin-left: 30px;
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
    background-color: #F5F5F7;
  }

  thead td {
    // color: #969699;
    color: #5E5F64;
    padding: 16px 14px;
  }

  tr:nth-child(2n) {
    background-color: #FAFAFA;
  }

  td {
    border: 1px solid #f5f5f7;
    padding: 26px 14px;
    word-wrap: break-word;
    word-break: normal;
    color: #333;
  }

  tr td:nth-child(1) {
    width: 244px;
  }

  tr td:nth-child(2) {
    width: 304px;
  }

  tr td:nth-child(3) {
    width: 242px;
  }

  tr td:nth-child(4) {
    width: 190px;
    text-align: right;
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
</style>
