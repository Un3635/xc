<template>
  <div class="page">
    <h2 class="header">{{isPaid?'払金情報':'未払金情報'}}</h2>
    <div class="headerContent">
      <div class="headerContentInner" v-if="isPaid">
        <div class="headerTitle">
          <span>支払ID</span>
          <span>{{billInfo.payNo}}</span>
        </div>
        <div class="headerTitleList">
          <div class="headerList">
            <p>支払済み総額</p>
            <p>{{billInfo.totalMoney|currency}}円</p>
          </div>
          <div class="headerList">
            <p>支払方法</p>
            <p>{{billInfo.payType|payType}}</p>
          </div>
          <div class="headerList">
            <p>支払時間</p>
            <p>{{billInfo.createTime}}</p>
          </div>
        </div>
      </div>
      <div class="headerContentInner" v-if="!isPaid">
        <div class="headerContentInnerCon">
          <p class="title">未払い金額</p>
          <div class="headerContentInnerConDown">
            <p class="costPrcie">{{billAmount|currency}}円</p>
            <el-button type="primary" :disabled="billAmount<=0" class="btn" @click="billPay">お支払い</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="accountDetail">{{isPaid?'払金明細':'未払金明細'}}</div>
    <table>
      <thead>
      <tr>
        <td>追加お支払いID</td>
        <td>時間</td>
        <td>区分</td>
        <td>機器ID</td>
        <td>費用（JPY）</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="billList.length < 1">
        <td colspan="6" class="nodata">表示できるデータはありません</td>
      </tr>
      <tr v-if="billList.length > 0" v-for="(item,index) in billList" :key="index">
        <td>{{item.serialNumber}}</td>
        <td>{{item.createTime|date('YYYY-MM-DD HH:mm:ss') || '--'}}</td>
        <td>{{item.typeRemark}}</td>
        <td>
          <p v-if="item.source===1">機器ID</p>
          <p v-else-if="item.source===2">算力ID</p>
          <p>{{item.correlationSn}}</p>
        </td>
        <td>
          <span class="warn">-{{item.totalMoney | currency}}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- 分页 -->
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
  import AccountAPI, {BillStatus} from '../../../../services/account-api';
  import errorHandler from '../../../../services/error-handler';
  import {UPDATE_BREADCRUMB} from '../../../../store/mutation-types';

  export default {
    head() {
      return {
        title: '勘定内訳_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    breadcrumb() {
      return {
        label: '勘定内訳',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/account',
            label: 'アカウント'
          },
          {
            path: '/i/account/bill',
            label: 'お取引履歴'
          }
        ]
      };
    },
    computed: {
      isPaid() {
        return !!this.$route.query.id;
      }
    },
    filters: {
      payType(value) {
        switch (value) {
          case 1:
            return 'クレジットカード返済';
        }
      }
    },
    data() {
      return {
        billAmount: 0,
        billInfo: {},
        billList: [],
        pageInfo: {
          page: 1,
          size: 10,
          total: 0
        }
      };
    },
    scrollToTop: true,
    methods: {
      handleSizeChange(val) {
        this.pageInfo.size = val;
        this.loadBillList();
      },
      handleCurrentChange(val) {
        this.pageInfo.page = val;
        this.loadBillList();
      },
      getBillList() {
        const {page, size} = this.pageInfo;
        const id = this.$route.query.id;
        if (id) {
          return AccountAPI.billInfoList(id, page, size);
        } else {
          return AccountAPI.getBillListByStatus(BillStatus.UNPAID, page, size);
        }
      },
      loadBillList() {
        this.getBillList()
          .then(res => {
            this.pageInfo.page = res.current;
            this.pageInfo.size = res.size;
            this.pageInfo.total = res.count;
            this.billList = res.list || [];
          })
          .catch(errorHandler);
      },
      getBillInfo() {
        const id = this.$route.query.id;
        AccountAPI.billInfo(id)
          .then(res => {
            this.billInfo = res;
          })
          .catch(errorHandler);
      },
      getBillAmount() {
        AccountAPI.billAmount()
          .then(res => res || {})
          .then(res => res.result || 0)
          .then(res => {
            this.billAmount = res;
          })
          .catch(errorHandler);
      },
      initPage() {
        if (this.isPaid) {
          this.getBillInfo();
        } else {
          this.getBillAmount();
        }
        this.loadBillList();
      },
      initBreadcrumb() {
        const breadcrumb = {
          label: (this.isPaid ? '' : '未') + '払金情報',
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
        if (this.isPaid) {
          breadcrumb.parentsList.push(
            {
              path: '/i/account/bill',
              label: 'お取引履歴'
            });
        };
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      },
      billPay() {
        if (this.billAmount <= 0) {
          return;
        }
        this.$router.push('/pay?amount=' + this.billAmount + '&source=2');
      }
    },
    mounted() {
      this.initPage();
      this.initBreadcrumb();
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

  .headerContent {
    padding: 30px 18px 30px 30px;
    position: relative;
    font-size: 14px;
    color: #969699;
  }

  .headerContentInner {
    padding: 0 30px;
    background: #FAFAFA;
  }

  .headerContentInnerCon {
    padding: 58px 0 57px 0;
    .title {
      font-size: 14px;
      color: #606166;
      padding-bottom: 22px;
      line-height: 19px;
    }
    .costPrcie {
      font-size: 30px;
      color: #FD7220;
      line-height: 38px;
      font-weight: bold;
    }
  }

  .headerContentInnerConDown {
    display: flex;
    justify-content: space-between;
    .btn {
      min-width: 86px;
      padding-bottom: 7px;
      padding-top: 7px;
    }
  }

  .headerTitle {
    border-bottom: 1px dashed #DEDEE0;
    width: 100%;
    padding: 20px 0;
    line-height: 19px;
    font-size: 14px;
    span:first-child {
      color: #606166;
      margin-right: 20px;
    }
    span:last-child {
      color: #303137;
    }
  }

  .headerTitleList {
    display: flex;
    padding: 40px 0;
    // justify-content: space-between;
    p:first-child {
      padding-bottom: 12px;
      font-size: 14px;
      color: #606166;
    }
    p:last-child {
      font-size: 16px;
      color: #303137;
      line-height: 21px;
      font-weight: bold;
    }
  }

  .headerList:nth-child(1) {
    margin-right: 205px;
  }

  .headerList:nth-child(2) {
    margin-right: 205px;
  }

  .accountDetail {
    padding: 0 0 20px 30px;
    font-size: 16px;
    color: #303137;
    line-height: 20px;
    font-weight: bolder;
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
    padding: 15px 14px 15px;
    word-wrap: break-word;
    word-break: normal;
    color: #333;
    vertical-align: top;
  }

  tr td:nth-child(1) {
    width: 196px;
  }

  tr td:nth-child(2) {
    width: 196px;
  }

  tr td:nth-child(3) {
    width: 160px;
  }

  tr td:nth-child(4) {
    width: 272px;
    p:first-child {
      font-size: 14px;
      color: #606166;
      line-height: 19px;
    }
    p:last-child {
      font-size: 14px;
      color: #4185F5;
      line-height: 19px;
    }
  }

  tr td:nth-child(5) {
    width: 156px;
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
