<template>
  <div class="asset-market">
    <div class="asset-market_head">
      <div class="asset-market_head_head">
        <el-form ref="form">
          <el-form-item label="下属公司的总资产数(个)" style="margin-bottom: 0">
            <!--<el-cascader-->
            <!--:props="props"-->
            <!--:options="treeOptions"-->
            <!--v-model="childrenCompanyId"-->
            <!--@change="handleChange"-->
            <!--change-on-select-->
            <!--:show-all-levels="false">-->
            <!--</el-cascader>-->
            <el-select style="margin-right: 10px;" placeholder="请选择" v-model="select.childrenCompanyId"
                       v-for="select,index in selectList" :key="index"
                       @change="changeHandler(select.childrenCompanyId,index)">
              <el-option
                v-for="item in select.options"
                :key="item.companyName"
                :label="item.companyName"
                :value="item.companyId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="6">
          <img src="../../assets/images/fin1_icon.png" alt="">
          <p>您管理的总资产数（个）</p>
          <strong>{{childrentCompanyAsset.totalAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin2_icon.png" alt="">
          <p>使用中的资产（个）</p>
          <strong>{{childrentCompanyAsset.usedAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin3_icon.png" alt="">
          <p>空闲资产（个）</p>
          <strong>{{childrentCompanyAsset.freeAccount}}</strong>
        </el-col>
        <el-col :span="6">
          <img src="../../assets/images/fin4_icon.png" alt="">
          <p>本月新增（个）</p>
          <strong>{{childrentCompanyAsset.monthAccount}}</strong>
        </el-col>
      </el-row>
      <!--<div class="asset-market_head_asset">-->
      <!--<div class="asset-market_head_asset_list">-->
      <!--<div class="asset-market_head_asset_list_circle">-->
      <!--<img src="../../assets/images/fin1_icon.png" alt="">-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list_text">-->
      <!--<div class="tit">您管理的总资产数(个)</div>-->
      <!--<h1>{{childrentCompanyAsset.totalAccount}}</h1>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list">-->
      <!--<div class="asset-market_head_asset_list_circle">-->
      <!--<img src="../../assets/images/fin2_icon.png" alt="">-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list_text">-->
      <!--<div class="tit">使用中的资产(个)</div>-->
      <!--<h1>{{childrentCompanyAsset.usedAccount}}</h1>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list">-->
      <!--<div class="asset-market_head_asset_list_circle">-->
      <!--<img src="../../assets/images/fin3_icon.png" alt="">-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list_text">-->
      <!--<div class="tit">空闲资产(个)</div>-->
      <!--<h1>{{childrentCompanyAsset.freeAccount}}</h1>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list">-->
      <!--<div class="asset-market_head_asset_list_circle">-->
      <!--<img src="../../assets/images/fin4_icon.png" alt="">-->
      <!--</div>-->
      <!--<div class="asset-market_head_asset_list_text">-->
      <!--<div class="tit">本月新增(个)</div>-->
      <!--<h1>{{childrentCompanyAsset.monthAccount}}</h1>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>

    <div class="asset-market_cont">
      <div class="asset-market_cont_tit">
        <span class="curr">当前公司资产列表 &nbsp;&nbsp;&nbsp;</span>
        <span class="text">
  全部资产 <span class="nub">{{outAssetStatistical.totalAsset}}</span>个
          &nbsp;&nbsp;
  闲置资产 <span class="nub">{{outAssetStatistical.freeAsset}}</span>个
          &nbsp;&nbsp;
  闲置率 <span class="nub">{{getUserPercent(outAssetStatistical.freeAsset / outAssetStatistical.totalAsset)}}</span>
                             </span>
      </div>
      <div class="asset-market_cont_search">
        <el-form :inline="true" :model="asset" class="demo-form-inline">
          <el-form-item label="资产标签">
            <el-select v-model="asset.assetTag" placeholder="请选择">
              <el-option :label="label" :value="label" v-for="label,index in labelList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="资产名称" class="ml-wid">-->
          <!--<el-input v-model="asset.assetName" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item class="ml_right">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button native-type="reset" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="asset-market_cont_tab">
        <el-table ref="table" :data="tableData" border stripe style="width: 100%" header-row-class-name="table-header"
                  class="remove-scroll-bar"
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
            label="闲置数量"
            width="98">
            <template slot-scope="scope">
              <span>{{scope.row.freeNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="88"
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
    </div>
  </div>
</template>
<script>
  import plugin_title from '../plugin_title'

  export default {
    name: 'assetMarket',
    data() {
      return {
        childrentCompanyAsset: {
          totalAccount: 0,
          monthAccount: 0,
          freeAccount: 0,
          usedAccount: 0
        },
        //公司id
        companyId: '',
        token: '',
        asset: {
          assetTag: '',
          assetName: '',
        },
        tableData: [],
        labelList: [],
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
        outAssetStatistical: {
          freeAsset: 0,
          totalAsset: 0
        },
        selectList: [],
        tree: [],
        queryType: 'all'
      }
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.companyId = this.$route.query.id;
      this.queryCompanyList().then(() => {
        this.changeHandler(this.companyId, -1)
      });
      this.queryCompanyLabel();
    },
    methods: {
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
      queryChildrenAsset(id) {
        if (!id) {
          if (this.selectList.length <= 1) {
            id = this.companyId;
          } else {
            id = this.selectList[this.selectList.length - 1].childrenCompanyId || this.selectList[this.selectList.length - 2].childrenCompanyId
          }
        }
        let params = {
          token: this.token,
          companyId: id,
          queryType: this.queryType
        };
        if (params.queryType == '') {
          delete params.queryType
        }
        this.$http.post('./companyAssetInfo/queryChildrenAsset', params).then(res => {
          if (res.data.code == 1000) {
            this.childrentCompanyAsset = res.data.data || {};
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      queryCompanyList() {
        return this.$http.post('/companyAssetInfo/queryCompanyList', {
          companyId: this.companyId,
          token: this.token
        }).then(res => {
          if (res.data.code == 1000) {
            this.tree = res.data.data;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      queryAssetList(id) {
        if (!id) {
          if (this.selectList.length <= 1) {
            id = this.companyId;
          } else {
            id = this.selectList[this.selectList.length - 1].childrenCompanyId || this.selectList[this.selectList.length - 2].childrenCompanyId
          }
        }
        let params = {
          labelName: this.asset.assetTag || '',
          token: this.token,
          companyId: id,
          queryType: this.queryType,
          sortName: this.sort.sortName,
          sortType: this.sort.sortType,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        };
        if (params.queryType == '') {
          delete params.queryType
        }
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
      changeHandler(id, index) {
        if (id == '') {  // 选择全部
          if (index != this.selectList.length - 1) {
            this.selectList.length = index + 1;
          }
          if (this.selectList.length == 1) {
            this.queryType = '';
          } else {
            //更新数据 queryType = all
            this.queryType = 'all';
          }
          this.queryChildrenAsset();
          this.queryAssetList();
          return;
        } else if ((this.selectList[index] && id == this.selectList[index].childrenCompanyId) && (this.selectList[index - 1] && id == this.selectList[index - 1].childrenCompanyId )) {   //选择自己
          //不更新selectList 获取自己的数据（用self）
          if (index != this.selectList.length - 1) {
            this.selectList.length = index + 1;
          }
          //更新数据 queryType = self
          this.queryType = 'self';
          this.queryChildrenAsset(id);
          this.queryAssetList(id);
          return;
        }
        if (index == -1) {
          let childList = this.tree.filter(item => item.parentId == id);
          this.selectList.push({
            childrenCompanyId: '',
            options: [
              {companyId: '', companyName: '全部'},
//              this.tree.find(item=>item.companyId = id),
              ...childList,
            ]
          });
          //更新数据 queryType = ''
          this.queryType = '';
        } else {
          this.selectList.length = index + 1;
          let childList = this.tree.filter(item => item.parentId == id);
          if (childList.length > 0) {
            this.selectList.push({
              childrenCompanyId: '',
              options: [
                {companyId: '', companyName: '全部'},
                this.tree.find(item => item.companyId == id),
                ...childList,
              ]
            })
            //更新数据 queryType = all
            this.queryType = 'all';
          } else {
            //更新数据 queryType = self
            this.queryType = 'self';
          }
        }
        this.queryChildrenAsset(id);
        this.queryAssetList(id);
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
          default:
            this.sort.sortName = 'used_account';
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
      getUserPercent(num) {
        if (typeof num != 'number' || isNaN(num)) return '0%';
        return Math.floor(num * 100) + '%';
      },
      query() {
        this.queryAssetList();
      },
//      handleChange(value) {
//        this.queryChildrenAsset(value[value.length - 1]);
//      },
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.queryAssetList();
      },
      handleCurrentChange(page) {
        this.page.pageSize = page;
        this.queryAssetList();
      },
      reset() {
        this.asset = {
          assetTag: '',
          assetName: '',
        };
        this.sort = {
          sortName: '',
          sortType: ''
        };
        this.$refs['table'].clearSort();
        this.queryAssetList();
      }
    },
    components: {
      plugin_title: plugin_title,
    },
  }
</script>
<style lang="scss" scoped>
  .el-main {
    background: #f5f5f5 !important;
  }

  .asset-market {
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
</style>
<style>
  .asset-pagination {
    float: right;
    margin-top: 38px;
    margin-right: 6px;
  }
</style>

