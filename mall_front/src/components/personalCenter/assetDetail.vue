<template>
  <div class="asset-market">
    <div class="asset-market_head">
      <div class="asset-market_head_head">
        <div class="asset-market_head_detail">
          资产详情
        </div>
      </div>
      <el-row class="asset-market_head_row">
        <el-col :span="12" v-for="item,index in computedMsg" :key="index">
          <div class="text fl">{{item.attributeName}}</div>
          <div class="line fl">
            <p v-if="getLength(item.attributeValue) <= 35">{{item.attributeValue}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="item.attributeValue" placement="bottom-start">
              <p class="ellipsis">{{item.attributeValue}}</p>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>


    </div>
    <div class="asset-market_cont">
      <div class="asset-market_cont_tit">
        <span class="curr">资产详单 &nbsp;&nbsp;&nbsp;</span>
        <span class="text">
  全部资产 <span class="nub">{{sumCount}}</span>个
          &nbsp;&nbsp;
  闲置资产 <span class="nub">{{freeCount}}</span>个
          &nbsp;&nbsp;
  闲置率 <span class="nub">{{getUserPercent(freeCount / sumCount)}}</span>
                             </span>

      </div>

      <div class="asset-market_cont_search">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="资产编号">
            <el-input v-model="snCode" placeholder="请输入" class="inpt-wid"></el-input>
          </el-form-item>
          <el-form-item class="ml_right">
            <el-button type="primary" @click="getDetailList">查询</el-button>
            <el-button @click="resetHandler">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="asset-market_cont_tab">
        <el-table :data="outZcSnCompanyVos" border stripe style="width: 100%" header-row-class-name="table-header"
                  @sort-change="sortChange">
          <el-table-column
            width="100px"
            align="center"
            prop="snCode"
            label="资产编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="资产状态"
            width="80px">
            <template slot-scope="scope">
              <span class="small-cricle"
                    :class="{yellow:scope.row.status == 0,blue:scope.row.status == 1,red:scope.row.status == 2}"></span>
              <span>{{scope.row.statusStr}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyStaffName"
            label="使用者"
            width="79px">
            <template slot-scope="scope">
              <span>{{scope.row.companyStaffName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyStaffJobNumber"
            label="工号"
            width="180px">
            <template slot-scope="scope">
              <span>{{scope.row.companyStaffJobNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="127px"
            align="center"
            prop="startTime"
            label="开始使用时间"
            sortable="custom">
            <template slot-scope="scope">
              <span>{{scope.row.startTime | date('YYYY-MM-DD HH:mm')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="125px"
            align="center"
            prop="nowTotalDays"
            label="使用总时长(天)"
            sortable="custom">
            <template slot-scope="scope">
              <span>{{scope.row.nowTotalDays}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="125px"
            align="center"
            prop="nowFreeDays"
            label="闲置总时长(天)"
            sortable="custom">
            <template slot-scope="scope">
              <span>{{scope.row.nowFreeDays}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="81px"
            align="center"
            prop="user"
            label="使用率">
            <template slot-scope="scope">
              <span>{{getUserPercent(scope.row.nowTotalDays / (scope.row.nowTotalDays + scope.row.nowFreeDays))}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endTime"
            label="最后操作时间"
            width="127px">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime | date('YYYY-MM-DD HH:mm')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100px"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text"
                         @click="$router.push({path:'/machineD',query:{snCode: scope.row.snCode,productNo:productNo,id:scope.row.id}})">
                查看
              </el-button>
              <el-button size="small" type="text"
                         @click="linkChange(scope.row.id,scope.row.status == 1,scope.row.usedCompanyName)">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="asset-pagination block">
        <el-pagination
          v-if="outZcSnCompanyVos.length != 0"
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
    <el-dialog title="修改资产使用者" :visible.sync="assetModificationDialog" width="500px" class="custom"
               @close="closeHandler">
      <div class="asset-modification-dialog">
        <el-radio-group v-model="modificationType" class="clearfix">
          <el-radio :disabled="!isUse" class="fl" :label="1">收回此资产</el-radio>
          <el-radio class="fr" :label="2">修改使用者</el-radio>
        </el-radio-group>
        <div v-show="modificationType == 1">
          <form>
            <label class="clearfix">
              <span class="fl" style="text-align: left;">备注</span>
              <textarea class="fl" v-model="remark"></textarea>
            </label>
          </form>
        </div>
        <div v-show="modificationType == 2">
          <form>
            <label class="clearfix">
              <span class="fl">使用企业</span>
              <input v-model="formInfo.usedCompanyName" type="text" class="fl">
            </label>
            <label class="clearfix">
              <span class="fl">使用部门</span>
              <input v-model="formInfo.companyStaffDepartmentName" type="text" class="fl">
            </label>
            <label class="clearfix">
              <span class="fl require">使用者</span>
              <input v-model="formInfo.companyStaffName" type="text" class="fl" @focus="isShowErr=false">
              <p class="err-info" v-show="isShowErr">{{errInfo}}</p>
            </label>
            <label class="clearfix">
              <span class="fl">工号</span>
              <input v-model="formInfo.no" type="text" class="fl">
            </label>
            <label class="clearfix">
              <span class="fl">备注</span>
              <textarea v-model="formInfo.remark" class="fl"></textarea>
            </label>
          </form>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="assetModificationDialog = false">取消</el-button>
        <el-button v-if="modificationType == 1" type="primary" @click="updateSnCompanyStaff(1)">确定收回</el-button>
        <el-button v-if="modificationType == 2" type="primary" @click="updateSnCompanyStaff(2)">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'assetDetail',
    data() {
      return {
        productNo: '',
        snCode: '',
        companyGoodsInfoId: '',
        assetModificationDialog: false,
        modificationType: 1,
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 0
        },
        computedMsg: [],
        outZcSnCompanyVos: [],
        freeCount: 0,
        sumCount: 0,
        sort: {
          sortName: '',
          sortType: ''
        },
        formInfo: {
          //企业
          usedCompanyName: '',
          //部门
          companyStaffDepartmentName: '',
          //使用者
          companyStaffName: '',
          //工号
          no: '',
          remark: ''
        },
        remark: '',
        isShowErr: false,
        errInfo: '使用者不能为空',
        operationId: '',
        isUse: true
      }
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.companyGoodsInfoId = this.$route.query.companyGoodsInfoId;
      this.productNo = this.$route.query.productNo;
      this.getComputerdis();
      this.getDetailList();
    },
    methods: {
      //重置按钮
      resetHandler() {
        this.snCode = ''
        this.getDetailList();
      },
      //分类页的跳转
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.getDetailList();
      },
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.getDetailList();
      },
      //点击修改
      linkChange(id, isUse, name) {
        if (!isUse) {
          this.modificationType = 2;
        } else {
          this.modificationType = 1;
        }
        this.formInfo.usedCompanyName = name;
        this.isUse = isUse;
        this.operationId = id;
        this.assetModificationDialog = true;
      },
      getUserPercent(num) {
        if (typeof num != 'number' || isNaN(num)) return '0%';
        return Math.floor(num * 100) + '%';
      },
      //获取上方的电脑配置
      getComputerdis() {
        var vm = this;
        this.$http.get('/assets/detail/skuInfo', {
          params: {
            productNo: this.productNo,
            token: this.token
          }
        }).then(function (res) {
          if (res.data.code == 1000) {
            let computedMsgArr = [];
            (res.data.data || []).forEach(item => {
              computedMsgArr = [...computedMsgArr, ...item.itemAttributeVos];
            })
            vm.computedMsg = computedMsgArr || [];
          } else {
            vm.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      //获取下方的列表
      getDetailList() {
        var vm = this;
        this.$http.get('/assets/detail/snList', {
          params: {
            snCode: this.snCode || '',
            token: this.token,
            companyGoodsInfoId: this.companyGoodsInfoId,
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            sortName: this.sort.sortName || '',
            sortType: this.sort.sortType || '',
            t: new Date().getTime()
          }
        }).then(function (res) {
          if (res.data.code == 1000) {
            vm.outZcSnCompanyVos = res.data.data.outZcSnCompanyVos || [];
            vm.freeCount = res.data.data.freeCount;
            vm.sumCount = res.data.data.sumCount;
            vm.page.total = res.data.data.sumCount;
          } else {
            vm.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      sortChange({col, prop, order}) {
        if (!prop || this.outZcSnCompanyVos.length == 0) return;
        this.sort.sortName = prop.replace(/[A-Z]/g, '_$&').toLocaleLowerCase();
        switch (order) {
          case "ascending":
            this.sort.sortType = 'asc';
            break;
          case "descending":
            this.sort.sortType = 'desc';
            break;
        }
        this.getDetailList();
      },
      //更新使用者
      updateSnCompanyStaff(optType) {
        let params = {
          id: this.operationId,
          optType: optType,
          token: this.token
        };
        if (optType == 2) {
          if (this.formInfo.companyStaffName.trim() == '') {
            this.isShowErr = true;
            return;
          }
          params = Object.assign(params, {
            usedCompanyName: this.formInfo.usedCompanyName,
            companyStaffDepartmentName: this.formInfo.companyStaffDepartmentName,
            companyStaffName: this.formInfo.companyStaffName,
            companyStaffJobNumber: this.formInfo.no,
            remark: this.formInfo.remark
          })
        } else {
          params.remark = this.remark;
        }
        this.$http.post('/assets/detail/updateSnCompanyStaff', params).then(res => {
          if (res.data.code == 1000) {
            this.formInfo = {
              //企业
              usedCompanyName: '',
              //部门
              companyStaffDepartmentName: '',
              //使用者
              companyStaffName: '',
              //工号
              no: '',
              remark: ''
            };
            this.remark = '';
            this.assetModificationDialog = false;
            this.getDetailList();
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          } else {
            if (res.data.code == 4000) {
              let str = res.data.msg.split('<br />')[1];
              let html = '<div class="warning-box">' +
                '<p style="padding-top:6px;margin-bottom:10px;font-size: 14px;color: #333333;letter-spacing: 0;line-height: 14px;">两次操作时间过短</p>' +
                '<span style="font-size: 14px;color: #999999;letter-spacing: 0;line-height: 14px;">' + str + '</span>' +
                '</div>';
              return this.$confirm(html, '操作失败', {
                confirmButtonText: '好的',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                customClass: 'custom',
                showCancelButton: false,
              }).then(() => {
                this.assetModificationDialog = false;
              });
            }
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      closeHandler() {
        this.isShowErr = false;
        this.formInfo = {
          //企业
          usedCompanyName: '',
          //部门
          companyStaffDepartmentName: '',
          //使用者
          companyStaffName: '',
          remark: ''
        };
        this.remark = '';
        this.modificationType = 1;
      },
      getLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-main {
    background: #f5f5f5;
  }

  .asset-market_head {
    height: auto;
    overflow: hidden;
  }

  .asset-market_cont_tit {
    float: left;
    margin-top: 11px;
    margin-right: 40px;
    line-height: 36px;
  }

  .inpt-wid {
    width: 200px;

    .el-input__inner {
      width: 100%;
    }

  }

  .asset-market_cont_tab {
    width: 100%;
  }

  .asset-market_cont {
    padding-right: 23px;
  }

  .asset-market_cont_search {
    padding-top: 11px;
  }

  .asset-modification-dialog {
    .el-radio-group {
      width: 300px;
      margin: 0 60px 22px;
      display: block;
    }
    label {
      display: block;
      padding: 0 20px 0 10px;
      position: relative;
      .err-info {
        font-size: 12px;
        color: #FF1919;
        position: absolute;
        left: 95px;
        top: 36px;
      }
      span {
        width: 60px;
        margin-right: 20px;
        font-size: 14px;
        color: #333333;
        text-align: right;
        line-height: 36px;
        position: relative;
        &.require:before {
          content: '*';
          color: #FF1919;
        }
      }
      textarea {
        width: 270px;
        height: 150px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        padding: 10px;
        line-height: 1.5em;
      }
      input {
        width: 300px;
        margin-bottom: 20px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        padding: 0 10px;
        line-height: 36px;
        height: 36px;
      }
      & ~ label {
        textarea {
          width: 300px;
        }
      }
    }
  }


</style>
<style>
  .asset-modification-dialog .el-radio-group .el-radio__label {
    font-size: 12px;
  }

  .asset-pagination {
    float: right;
    margin-top: 38px;
    margin-right: 6px;
  }
</style>
