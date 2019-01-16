<template>
  <div class="asset-market">
    <section class="current-assets-info">
      <h2>当前公司资产概况</h2>
      <el-row>
        <el-col :span="6">
          <img src="../../assets/images/fin1_icon.png" alt="">
          <p>您管理的总资产数（个）</p>
          <strong>{{currentCompanyAsset.totalAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin2_icon.png" alt="">
          <p>使用中的资产（个）</p>
          <strong>{{currentCompanyAsset.usedAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin3_icon.png" alt="">
          <p>空闲资产（个）</p>
          <strong>{{currentCompanyAsset.freeAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin4_icon.png" alt="">
          <p>本月新增（个）</p>
          <strong>{{currentCompanyAsset.monthAccount}}</strong>
        </el-col>
      </el-row>
    </section>
    <el-row :gutter="10">
      <el-col :span="12" class="audit">
        <section>
          <header class="clearfix">
            <p class="left">待审核/审批
              <small>共 {{approvalInfo.totalSize}} 条待审批</small>
            </p>
            <span class="right">
              <el-button @click="$router.push('/approvalManage')" type="text" size="small">更多审批></el-button>
            </span>
          </header>
          <div class="audit-table">
            <el-table :data="approvalInfo.approvalList" border stripe style="width: 100%" class="remove-scroll-bar"
                      header-row-class-name="table-header">
              <el-table-column
                align="center"
                prop="applyCompanyName"
                label="申请公司">
                <template slot-scope="scope">
                  <span>{{scope.row.applyCompanyName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="applyReason"
                label="申请原因">
                <template slot-scope="scope">
                  <span>{{scope.row.applyReason}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="applyTime"
                label="申请时间">
                <template slot-scope="scope">
                  <span>{{scope.row.applyTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="55"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="$router.push({path:'/approval',query:{id: scope.row.id}})" size="small"
                             type="text">审批
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
      </el-col>
      <el-col :span="12" class="sub-assets-info">
        <section>
          <header class="clearfix">
            <span class="fl">下属公司资产概况</span>
            <div class="select fl">全部</div>
            <!--<el-select placeholder="全部" disabled></el-select>-->
            <!--<el-cascader-->
              <!--:props="props"-->
              <!--:options="treeOptions"-->
              <!--v-model="childrenCompanyId"-->
              <!--@change="handleChange"-->
              <!--change-on-select-->
              <!--placeholder="全部"-->
              <!--disabled-->
              <!--:show-all-levels="false">-->
            <!--</el-cascader>-->
            <div class="fr">
              <router-link :to="{path:'/underAssetMarket',query:{id:companyId}}">
                <el-button type="text" size="small">下属公司资产列表></el-button>
              </router-link>
            </div>
          </header>
          <el-row>
            <el-col :span="12">
              <img src="../../assets/images/fin1_icon.png" alt="">
              <p>管理的总资产数（个）</p>
              <strong>{{childrentCompanyAsset.totalAccount}}</strong>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/images/fin2_icon.png" alt="">
              <p>使用中的资产（个）</p>
              <strong>{{childrentCompanyAsset.usedAccount}}</strong>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/images/fin3_icon.png" alt="">
              <p>空闲资产（个）</p>
              <strong>{{childrentCompanyAsset.freeAccount}}</strong>
            </el-col>
            <el-col :span="12">
              <img src="../../assets/images/fin4_icon.png" alt="">
              <p>本月新增（个）</p>
              <strong>{{childrentCompanyAsset.monthAccount}}</strong>
            </el-col>
          </el-row>
        </section>
      </el-col>
    </el-row>
    <section class="asset-market_cont">
      <div class="asset-market_cont_tit">
        <span class="curr">当前公司资产列表 &nbsp;&nbsp;&nbsp;</span>
        <span class="text">
  全部资产 <span class="nub">{{outAssetStatistical.totalAsset}}</span>个
          &nbsp;&nbsp;
  闲置资产 <span class="nub">{{outAssetStatistical.freeAsset}}</span>个
          &nbsp;&nbsp;
  闲置率 <span class="nub">{{getUserPercent(outAssetStatistical.freeAsset/outAssetStatistical.totalAsset)}}</span>
                             </span>
        <div class="fr">
          <router-link :to="{path:'/underAssetMarket',query:{id:companyId}}">
            <el-button type="text" size="small">下属公司资产列表></el-button>
          </router-link>
        </div>
      </div>
      <div class="asset-market_cont_search clear">
        <el-form :inline="true" :model="asset" class="demo-form-inline">
          <el-form-item label="资产标签">
            <el-select v-model="asset.labelName" placeholder="请选择">
              <el-option :label="label" :value="label" v-for="label,index in labelList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="资产名称" class="ml-wid">-->
            <!--<el-input v-model="asset.assetName" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item class="ml_right">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetHandler">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="asset-market_cont_tab">
        <el-table ref="table" :data="tableData" border stripe style="width: 100%" header-row-class-name="table-header" class="remove-scroll-bar"
                  @sort-change="sortChange">
          <el-table-column
            align="center"
            prop="assetCategory"
            label="资产分类"
            width="140">
            <template slot-scope="scope">
              <span>{{scope.row.assetCategory}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="assetNameConfig"
            label="资产名称配置">
            <template slot-scope="scope">
              <span>{{scope.row.assetNameConfig}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="assetLabel"
            label="标签">
            <template slot-scope="scope">
              <span>{{scope.row.assetLabel}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="totalNumber"
            sortable="custom"
            width="98"
            label="总资产数">
            <template slot-scope="scope">
              <span>{{scope.row.totalNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="freeNumber"
            sortable="custom"
            label="闲置数量">
            <template slot-scope="scope">
              <span>{{scope.row.freeNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="使用率">
            <template slot-scope="scope">
              <span>{{getUserPercent(scope.row.userdNumber / scope.row.totalNumber)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="lastUpdateTime"
            label="最后操作时间"
            width="140">
            <template slot-scope="scope">
              <span>{{scope.row.lastUpdateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="55"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click="$router.push({path:'assetDetail',query:{companyGoodsInfoId:scope.row.assetId,productNo: scope.row.productNo}})"
                size="small" type="text">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="asset-pagination block">
        <el-pagination
          v-if="tableData.length != 0"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout=" prev, pager, next, sizes,jumper"
          :page-sizes="[10, 100, 200, 300,400]"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize">
        </el-pagination>
      </div>

    </section>
  </div>
</template>
<script>
  import monent from 'moment';

  export default {
    data() {
      return {
        token: '',
        //公司id
        companyId: '',
        //审批信息
        approvalInfo: {
          approvalList: [],
          totalSize: 0
        },
        //子公司资产
        childrentCompanyAsset: {
          totalAccount: 0,
          monthAccount: 0,
          freeAccount: 0,
          usedAccount: 0
        },
        //当前公司资产
        currentCompanyAsset: {
          totalAccount: 0,
          monthAccount: 0,
          freeAccount: 0,
          usedAccount: 0
        },
        childrenCompanyId: [],
        treeOptions: [],
        props: {
          value: 'companyId',
          label: 'companyName'
        },
        sort: {
          //排序名称（total_account:总资产数,used_account:使用中,free_account:闲置数量）
          sortName: '',
          //排序类型（ase:从小到大,desc:从大到小）
          sortType: ''
        },
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        asset: {
          labelName: '',
          assetName: '',
        },
        tableData: [],
        labelList: [],
        outAssetStatistical: {
          freeAsset: 0,
          totalAsset: 0
        }
      };
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.queryCompanyAssetInfo().then(() => {
        this.queryAssetList();
        this.queryCompanyLabel();
      })
    },
    methods: {
      queryCompanyAssetInfo() {
        return this.$http.post('/companyAssetInfo/queryCompanyAssetInfo', {token: this.token}).then(res => {
          if (res.data.code == 1000) {
            this.companyId = res.data.data.companyId;
            this.approvalInfo = res.data.data.approvalInfo || {};
            if(this.approvalInfo.approvalList && this.approvalInfo.approvalList.length > 4){
              this.approvalInfo.approvalList.length = 4;
            }
            this.approvalInfo.approvalList.forEach(item=>{
              if(item.applyTime){
                item.applyTime = item.applyTime.replace('年','-').replace('月','-').replace('日','');
              }
            })
            this.childrentCompanyAsset = res.data.data.childrentCompanyAsset;
            this.currentCompanyAsset = res.data.data.currentCompanyAsset;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
            return Promise.reject();
          }
        })
      },
//      handleChange(value) {
//        this.queryChildrenAsset(value[value.length - 1]);
//      },
      queryAssetList() {
        let params = {
          labelName: this.asset.labelName || '',
//          assetName: this.asset.assetName || '',
          token: this.token,
          companyId: this.companyId,
          queryType: 'self',
          sortName: this.sort.sortName || '',
          sortType: this.sort.sortType || '',
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        };
        this.$http.post('/companyAssetInfo/queryAssetList', params).then(res => {
          if (res.data.code == 1000) {
            this.page.total = res.data.data.totalCount;
            this.tableData = res.data.data.rows;
            this.outAssetStatistical = res.data.data.outAssetStatistical;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        });
      },
      queryCompanyLabel() {
        this.$http.post('/companyAssetInfo/queryCompanyLabel', {
          token: this.token,
          companyId: this.companyId
        }).then(res => {
          if (res.data.code == 1000) {
            this.labelList = res.data.data || [];
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        })
      },
      getUserPercent(num) {
        if (typeof num != 'number' || isNaN(num)) return '0%';
        return Math.floor(num * 100) + '%';
      },
      query() {
        this.queryAssetList();
      },
      resetHandler() {
        this.asset = {
          assetName: '',
          labelName: ''
        };
        this.sort = {
          sortName: '',
          sortType: ''
        };
        this.$refs['table'].clearSort();
        this.queryAssetList();
      },
      sortChange({col, prop, order}) {
        if (!prop || this.tableData.length == 0) return;
        switch (prop) {
          case 'totalNumber':
            this.sort.sortName = 'total_account';
            break;
          case 'freeNumber':
            this.sort.sortName = 'free_account';
            break;
//          default:
//            this.sort.sortName = 'used_account';
        }
        switch (order) {
          case "ascending":
            this.sort.sortType = 'asc';
            break;
          case "descending":
            this.sort.sortType = 'desc';
            break;
        }
        this.queryAssetList();
      },
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.queryAssetList();
      },
      handleCurrentChange(page) {
        this.page.pageSize = page;
        this.queryAssetList();
      }
    },
  }
</script>
<style lang="scss" scoped>
  .asset-market {
    background: #f5f5f5;
    min-height: 100%;
    overflow: hidden;
    section {
      border-radius: 8px;
      background: #fff;
    }
    .audit section, .sub-assets-info section {
      height: 260px;
    }
    .current-assets-info {
      margin-bottom: 10px;
      h2 {
        font-size: 18px;
        color: #000000;
        line-height: 66px;
        padding-left: 15px;
        border-bottom: 1px solid #EEEEEE;
      }
      .el-col {
        position: relative;
        height: 95px;
        box-sizing: border-box;
        padding: 25px 0 20px 80px;
        img {
          position: absolute;
          left: 15px;
          top: 25px;
          width: 50px;
          height: 50px;
        }
        p {
          font-size: 14px;
          color: #000000;
          white-space: nowrap;
        }
        strong {
          font-size: 24px;
          color: #000000;
          font-weight: normal;
          line-height: 50px;
        }
      }
    }
    .audit {
      .el-button.el-button--text {
        font-size: 14px;
        color: #439CFF;
      }
      header {
        line-height: 54px;
        padding: 0 15px;
        p {
          font-size: 18px;
          color: #000000;
        }
        small {
          font-size: 14px;
          color: #999999;
          margin-left: 18px;
        }

      }
      .clearfix:after {
        content: '';
        display: block;
        clear: both;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .audit-table {
        padding: 0 15px;
        span {
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }
    .sub-assets-info {
      header {
        border-bottom: 1px solid #eee;
        padding:0 10px;
        span {
          line-height: 54px;
          font-size: 18px;
          color: #000000;
          margin-right: 10px;
        }
        div.select{
          height: 34px;
          border: 1px solid #d9d9d9;
          color: #cecece;
          width: 150px;
          padding-left: 10px;
          line-height: 34px;
          border-radius: 4px;
          background: #f1f1f1;
          margin-top: 9px;
          font-size: 14px;
        }
        .fr{
          line-height: 57px;
        }
      }
      .el-col {
        position: relative;
        height: 102px;
        padding-left: 87px;
        img {
          position: absolute;
          left: 20px;
          top: 25px;
          width: 50px;
          height: 50px;
        }
        p {
          padding-top: 25px;
          font-size: 14px;
          color: #000000;
          white-space: nowrap;
        }
        strong {
          font-size: 24px;
          color: #000000;
          line-height: 50px;
        }

      }
    }
  }
</style>
<style>
  .asset-pagination {
    float: right;
    margin-top: 38px;
    margin-right: 6px;
  }
</style>
