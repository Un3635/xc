<template>
  <div class="asset-market machineD">
    <div class="asset-market_head">
      <div class="asset-market_head_head">
        <div class="asset-market_head_detail">
          资产详情 <span>SN：{{snCode}}</span>
          <el-button type="primary" class="asset-change-user" @click="linkChange(snInfo.lesseeCompanyName)">修改使用者</el-button>
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

      <el-row class="asset-market_head_row asset-market_head_row_3">
        <el-col :span="8">
          <div class="text fl">管理者</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.adminName) <= 24">{{snInfo.adminName}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.adminName" placement="bottom-start">
              <p class="ellipsis">{{snInfo.adminName}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">购置方式</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.purchaseWayStr) <= 24">{{snInfo.purchaseWayStr}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.purchaseWayStr" placement="bottom-start">
              <p class="ellipsis">{{snInfo.purchaseWayStr}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">供应商</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.supplier) <= 24">{{snInfo.supplier}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.supplier" placement="bottom-start">
              <p class="ellipsis">{{snInfo.supplier}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">使用公司</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.usedCompanyName) <= 24">{{snInfo.usedCompanyName}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.usedCompanyName" placement="bottom-start">
              <p class="ellipsis">{{snInfo.usedCompanyName}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">承租公司</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.lesseeCompanyName) <= 24">{{snInfo.lesseeCompanyName}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.lesseeCompanyName" placement="bottom-start">
              <p class="ellipsis">{{snInfo.lesseeCompanyName}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">计量单位</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.unit) <= 24">{{snInfo.unit}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.unit" placement="bottom-start">
              <p class="ellipsis">{{snInfo.unit}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">使用部门</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.companyStaffDepartmentName) <= 24">{{snInfo.companyStaffDepartmentName}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.companyStaffDepartmentName" placement="bottom-start">
              <p class="ellipsis">{{snInfo.companyStaffDepartmentName}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">租凭日期</div>
          <div class="line fl">{{snInfo.rentStartTime | date('YY.MM.DD')}}～{{snInfo.rentEndTime | date('YY.MM.DD')}}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">金额</div>
          <div class="line fl">{{snInfo.price}}元</div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">使用者</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.companyStaffName) <= 24">{{snInfo.companyStaffName}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.companyStaffName" placement="bottom-start">
              <p class="ellipsis">{{snInfo.companyStaffName}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text fl">订单号</div>
          <div class="line fl">
            <p v-if="getLength(snInfo.orderNo) <= 24">{{snInfo.orderNo}}</p>
            <el-tooltip v-else class="item" effect="dark" :content="snInfo.orderNo" placement="bottom-start">
              <p class="ellipsis">{{snInfo.orderNo}}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="text fl">备注</div>
          <div class="line fl">{{snInfo.remark}}</div>
        </el-col>
      </el-row>

      <div class="upload">
        <div class="tit clearfix">
          <span class="fl">资产图片</span>
          <el-upload
            class="upload-demo fr"
            :action="UploadUrl()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-change="handleChange">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </div>
        <div class="show-img" v-if="snInfo.zcImageUrls.length != 0">
          <el-row :gutter="24">
            <el-col :span="8" v-for="pic,index in snInfo.zcImageUrls" :key="index">
              <div class="img-wrap">
                <img :src="pic.imageUrl" class="show-img-images">
              </div>
              <p>上传时间 {{pic.createTime}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="asset-market_cont">
      <div class="asset-market_cont_tit">
        <span class="curr">使用记录 &nbsp;&nbsp;&nbsp;</span>
        <span class="text">使用时长 <span class="nub">{{sumCount}}</span>天&nbsp;&nbsp;闲置时长 <span class="nub">{{freeCount}}</span>天&nbsp;&nbsp;闲置率
          <span class="nub">{{getUserPercent(freeCount / (sumCount+freeCount))}}</span></span>
      </div>
      <div class="asset-market_cont_tab">
        <el-table :data="logList" border stripe style="width: 100%" header-row-class-name="table-header"
                  @sort-change="sortChange">
          <el-table-column
            width="250px"
            align="center"
            prop="id"
            label="记录ID">
          </el-table-column>
          <el-table-column
            align="center"
            style="text-align: left"
            prop="status"
            label="使用方式"
            width="130px">
            <template slot-scope="scope">
              <span class="small-cricle"
                    :class="{'yellow': scope.row.type == 0,'red': scope.row.type==3,'blue': scope.row.type==1,'green': scope.row.type == 2}"></span>
              <span>{{scope.row.type | getTypeText}}—{{scope.row.status | getStatusText}}</span>
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
            width="120px"
            align="center"
            prop="startTime"
            label="开始使用时间">
            <template slot-scope="scope">
              <span>{{scope.row.startTime | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            align="center"
            prop="endTime"
            sortable="custom"
            label="结束使用日期">
            <template slot-scope="scope">
              <span>{{scope.row.endTime | date('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="125px"
            align="center"
            prop="totalTime"
            label="使用总时长(天)">
          </el-table-column>
          <el-table-column
            width="195px"
            align="center"
            prop="remark"
            label="备注">
            <template slot-scope="scope" class="remark">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="asset-pagination block">
        <el-pagination
          v-if="logList.length != 0"
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
              <textarea v-model="remark" class="fl"></textarea>
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
  import {allMethods} from '../../assets/js/config';

  export default {
    name: 'machineD',
    data() {
      return {
        snCode: '',
        productNo: '',
        computedMsg: [],
        tableData: [],
        dialogImageUrl: '',
        assetModificationDialog: false,
        modificationType: 1,
        snInfo: {
          adminName: '',
          purchaseWayStr: '',
          supplier: '',
          usedCompanyName: '',
          lesseeCompanyName: '',
          unit: '',
          companyStaffDepartmentName: '',
          rentStartTime: '',
          rentEndTime: '',
          price: '',
          companyStaffName: '',
          orderNo: '',
          remark: '',
          //附件
          zcImageUrls: []
        },
        logList: [],
        sumCount: 0,
        freeCount: 0,
        page: {
          pageSize: 10,
          currentPage: 0,
          total: 0
        },
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
          no:'',
          remark: ''
        },
        remark: '',
        isShowErr: false,
        errInfo: '使用者不能为空',
        isUse: true
      }
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.snCode = this.$route.query.snCode;
      this.productNo = this.$route.query.productNo;
      this.getComputerdis();
      this.getSnInfo();
      this.getUseLog();
    },
    filters: {
      getTypeText(num) {
        //0 闲置 1使用 2 转移 3维修
        switch (Number(num)) {
          case 0:
            return '闲置';
          case 1:
            return '使用';
          case 2:
            return '转移';
          case 3:
            return '维修';
        }
        return '未知';
      },
      getStatusText(num) {
        //0未开始 1进行中 2已完成
        switch (Number(num)) {
          case 0:
            return '未开始';
          case 1:
            return '进行中';
          case 2:
            return '已完成';
        }
        return '未知';
      }
    },
    methods: {
      UploadUrl() {
        return allMethods.API + '/common/uploadFile';
      },
      handleRemove(file, fileList) {
//        console.log(file, fileList);
      },
      handlePreview(file) {
//        console.log(file);
      },
      handleChange(file, fileList) {

      },
      handleSuccess(res, file, fileList) {
        if(res.code == 1000){
          this.$http.post('/assets/detail/uploadAssetImg',{
            token: this.token,
            snCompanyId: this.$route.query.id,
            imageUrl: res.data.imgUrl
          }).then(res=>{
            if(res.data.code == 1000){
              this.getSnInfo();
            }else{
              this.$message({
                type:'warning',
                message:res.msg
              });
            }
          })
        }else{
          this.$message({
            type:'warning',
            message:res.msg
          });
        }
      },
      //点击修改使用者
      linkChange(name) {
        if(this.logList[0]){
          this.isUse = this.logList[0].type == 1 ;
          if(!this.isUse){
            this.modificationType = 2;
          }else{
            this.modificationType = 1;
          }
        }
        this.formInfo.usedCompanyName = name;
        this.assetModificationDialog = true;
      },
      sortChange({col, prop, order}) {
        if (!prop || this.logList.length == 0) return;
        this.sort.sortName = prop.replace(/[A-Z]/g, '_$&').toLocaleLowerCase();
        switch (order) {
          case "ascending":
            this.sort.sortType = 'asc';
            break;
          case "descending":
            this.sort.sortType = 'desc';
            break;
        }
        this.getUseLog();
      },
      //分类页的跳转
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.getUseLog();
      },
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.getUseLog();
      },
      getUserPercent(num) {
        if (typeof num != 'number' || isNaN(num)) return '0%';
        return Math.floor(num * 100) + '%';
      },
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
      getSnInfo() {
        this.$http.get('/assets/detail/getSnInfo', {
          params: {
            snCode: this.snCode,
            token: this.token,
            t:new Date().getTime()
          }
        }).then(res => {
          if (res.data.code == 1000) {
            this.snInfo = res.data.data;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      getUseLog() {
        var vm = this;
        this.$http.get('/assets/detail/snLogList', {
          params: {
            snCode: this.snCode,
            token: this.token,
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            sortName: this.sort.sortName || '',
            sortType: this.sort.sortType || '',
            t:new Date().getTime()
          }
        }).then(function (res) {
          if (res.data.code == 1000 && res.data.data) {
            vm.sumCount = res.data.data.nowTotalDays;
            vm.page.total = res.data.data.sumCount;
            vm.freeCount = res.data.data.nowFreeDays;
            vm.logList = res.data.data.outZcSnStaffLogVos || [];
          } else {
            vm.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      //更新使用者
      updateSnCompanyStaff(optType) {
        let params = {
          id: this.$route.query.id,
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
            this.getSnInfo();
            this.getUseLog();
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
              }).then(()=>{
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
      getLength(str){
        return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
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
    margin-top: 34px;
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

  .el-row {
    border-bottom: 1px solid #EEEEEE;
  }

  [class*="el-col-"] {
    line-height: 1.3;
  }

  .show-img {

    .el-row {
      border-bottom: none;
      margin-bottom: 44px;
    }
    p{
      font-size: 14px;
      color: #999999;
    }

  }

  .text-left {
    text-align: left;
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

  .asset-change-user {
    float: right;
    margin-right: 36px;
    margin-top: 13px;
  }

  .asset-market_head_detail {
    span {
      margin-left: 40px;
    }
  }

  .asset-market_head_row {
    padding: 26px 59px 6px;
    .text {
      width: 91px;
      text-align: right;
      margin-right: 30px;
      font-size: 16px;
    }
    .line{
      max-width: calc(100% - 121px);
      font-size: 16px;
      color: #333333;
      p{
        font-family: sans-serif !important;
      }
      .ellipsis{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        font-family: sans-serif !important;
      }
    }
    &.asset-market_head_row_3 {
      padding: 30px 10px 14px;
      .text {
        text-align: left;
        margin-right: 15px;
      }
    }
  }

  .machineD .upload {
    min-height: auto;
  }

  .machineD .upload .upload-demo {
    margin-bottom: 0px;
  }

  .machineD .upload .show-img {
    .img-wrap{
      border: 1px solid #EEEEEE;
      border-radius: 4px;
      width: 159px;
      height: 159px;
      margin:0 auto 29px;
      position: relative;
      &:before{
        font-family: element-icons!important;
        content: "\E611";
        position: absolute;
        right: 4px;
        top:4px;
        color: #fff;
        z-index: 2;
      }
      &:after{
        z-index: 1;
        content:'';
        position: absolute;
        right: 0;
        top:0;
        border: 20px solid #6ecc66;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    }
    p{
      font-size: 14px;
      color: #999999;
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
