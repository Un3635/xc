<template>
  <div class="inRentDetail">
    <section class="current-assets-info">
      <plugin_title :message="parentMsg" :hasLine="true"></plugin_title>
      <el-row class="asset-market_head_row">
        <el-col :span="12" v-for="(item,index) in facilityList" :key="index">
          <div class="text fl">{{item.attributeName}}</div>
          <div class="line fl">
            <p v-if="getLength(item.attributeValue) <= 35">{{item.attributeValue}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="item.attributeValue" placement="bottom-start">
              <p class="ellipsis">{{item.attributeValue}}</p>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </section>

    <section class="asset-market_cont">
      <div class="asset-market_cont_search clear">
        <div class="inRent-tit">
          <h1>机器详单</h1>
          <span class="normal">机器数量<span class="bold">{{pageData.total}}</span>台</span>
        </div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="机器SN编号：" class="ml-wid">
            <el-input v-model="snCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="ml_right">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetInfos">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="asset-market_cont_tab">
        <el-table ref="table" :data="tableData" border stripe style="width: 100%" header-row-class-name="table-header"
                  class="remove-scroll-bar"
                  @sort-change="sortChange" :default-sort="{prop: 'rentSumTime', order: 'descending'}">
          <el-table-column
            align="center"
            prop="snCode"
            label="机器SN编号">
            <template slot-scope="scope">
              <span>{{scope.row.snCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="status "
            label="机器状态">
            <template slot-scope="scope">
              <span>{{scope.row.statusTex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="leaseholdTypeValue"
            label="租赁方式">
            <template slot-scope="scope">
              <span>{{scope.row.leaseholdTypeValue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="130px"
            prop="rentBeginTime"
            label="起租时间">
            <template slot-scope="scope">
              <span>{{scope.row.rentBeginTime|date('YYYY-MM-DD HH:mm')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="130px"
            align="center"
            prop="rentSumTime"
            sortable="custom"
            label="已租赁时长(天)">
            <template slot-scope="scope">
              <span>{{scope.row.rentSumTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="rentResidueTime"
            sortable="custom"
            width="120px"
            label="剩余时长(天)">
            <template slot-scope="scope">
              <span>{{scope.row.rentResidueTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            props="orderChildNo"
            align="center"
            width="164px"
            label="子订单号">
            <template slot-scope="scope">
              <span>{{scope.row.orderChildNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <!--<el-button-->
              <!--@click="$router.push({path:'assetDetail',query:{companyGoodsInfoId:scope.row.assetId,productNo: scope.row.productNo}})"-->
              <!--size="small" type="text">售后申请-->
              <!--</el-button>-->
              <span class="my-blue" @click="openModal">售后申请</span>
            </template>
          </el-table-column>
        </el-table>

        <!--无相关结果-->
        <div class="page">
          <pagination v-if="tableData.length>0" :pageData="pageData" @listenToChild="listenToChild"></pagination>
          <div class="icon_box" v-if="noRecord">
            <div class="icon_kong">
              <img src="../../assets/images/icon_jilu_kong.png" alt="">
            </div>
            <div class="txt">
              <span>没有相关的结果哦！</span>
            </div>
          </div>
        </div>
      </div>

    </section>
    <apply-sales :is-modal="isShow" @close="isShow=!isShow"></apply-sales>

  </div>
</template>
<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title';
  import pagination from '../x-pagination';
  import applySales from '../x-applySales';

  export default {
    name: 'facilityManager',
    data() {
      return {
        parentMsg: '设备详情',
        sortType: 2,
        pageData: {
          total: 0,
          currentPage: 1,
          pageSizes: 10
        },
        isShow: false,
        facilityList: [],
        tableData: [],
        snCode: '',
        token: '',
        productNo: '',
        noRecord: false,
      }
    },
    components: {
      plugin_title: plugin_title,
      pagination: pagination,
      applySales: applySales
    },
    methods: {
      openModal() {
        this.isShow = true;
      },
      sortChange({col, prop, order}) {
        if (!prop || this.tableData.length == 0) return;
        if (prop === 'rentSumTime') {
          order === 'ascending' ? this.sortType = 1 : this.sortType = 2;
        } else if (prop === 'rentResidueTime') {
          order === 'ascending' ? this.sortType = 3 : this.sortType = 4;
        }
        this.getRentDetail();
      },
      listenToChild() {
        this.getRentDetail();
      },
      resetInfos() {
        this.snCode = '';
        this.$refs['table'].clearSort();
        this.pageData.currentPage = 1;
        this.pageData.pageSizes = 10;
        this.getRentDetail();
      },
      query() {
        this.getRentDetail();
      },
      getLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
      },
      getSkuInfo() {
        var vm = this;
        this.$http.get('/assets/detail/skuInfo', {params: {token: this.token, productNo: this.productNo}})
          .then(res => {
            if (res.data.code == 1000) {
              let arr = [];
              (res.data.data || []).forEach(item => {
                arr = [...arr, ...item.itemAttributeVos]
              });
              vm.facilityList = arr || [];
            } else {
              vm.$message({
                type: 'warning',
                message: res.data.msg
              });
            }
          })
      },
      getRentDetail() {
        var arr = {
          token: this.token,
          productNo: this.productNo,
          currentPage: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          searchSn: this.snCode,
          sortType: this.sortType
        };
        var vm = this;
        this.$http.post('/rentInfo/rentDetail', arr)
          .then(res => {
            if (res.data.code == 1000) {
              vm.pageData.total = res.data.data.sumCount;
              vm.tableData = res.data.data.rentInfoSns;
            }
          })
      }
    },
    mounted(){
      this.token = localStorage.getItem('xckz_mall');
      this.productNo = this.$route.params.productNo;
      this.getSkuInfo();
      this.getRentDetail()
    }
  }
</script>
<style scoped lang="scss">
  .asset-pagination {
    text-align: right;
    margin-top: 41px;
  }

  .page {
    text-align: right;
    margin-top: 40px;
  }

  .asset-market_head_row {
    min-width: 990px;
  }
  .my-blue{
    font-size: 12px;
    color: #3975F7;
    cursor: pointer;
  }
</style>
