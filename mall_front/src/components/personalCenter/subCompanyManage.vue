<template>
  <div class="sub-company-manage">
    <plugin_title :hasLine="false" message="子公司下单管理"></plugin_title>
    <div class="order-manage">
      <el-row>
        <el-col :span="8">
          <el-button :class="{active: audit.approvalProcess == 0}" @click="changeApprovalType(0)">不需要审批</el-button>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <el-button :class="{active: audit.approvalProcess == 1}" @click="changeApprovalType(1)">层层审批</el-button>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button :class="{active: audit.approvalProcess == 2}" @click="changeApprovalType(2)">根节点审批</el-button>
        </el-col>
      </el-row>
      <el-row v-if="audit.approvalProcess != 0">
        <span>根节点订单是否需要审核</span>
        <el-radio-group v-model="audit.reviewFlag">
          <el-radio :label="true">需要</el-radio>
          <el-radio :label="false">不需要</el-radio>
        </el-radio-group>
      </el-row>
      <el-button type="primary" class="primary-btn" @click="amendAuditMethod">修改</el-button>
    </div>
    <plugin_title :hasLine="false" message="商品标签管理" class="clear"></plugin_title>
    <div class="tag-manage">
      <el-tag
        v-for="(tag,ind) in tagList"
        :key="ind"
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.labelName}}
      </el-tag>
      <el-button type="primary" @click="addTags">新增标签</el-button>
      <el-dialog title="添加标签" :visible.sync="addTagsModal" width="400px">
        <el-form ref="form" label-width="80px">
          <!--<el-form-item label="标签ID">-->
            <!--{{tagId}}-->
          <!--</el-form-item>-->
          <el-form-item label="标签名称">
            <el-input placeholder="不超过6个汉字" v-model="tagName" @input="initError"></el-input>
          </el-form-item>
          <div class="error">{{error}}</div>
        </el-form>

        <div class="subTags" slot="footer">
          <el-button type="success" @click="subTags">确定添加</el-button>
          <el-button @click="closeModal">取消</el-button>
        </div>


      </el-dialog>
    </div>
    <div class="btn-groups fr">
      <el-button type="primary" @click="$router.push('/modifyRentProduct')">修改</el-button>
      <el-button type="primary" :disabled="all" @click="upAllGoodsDialog = true">{{all ? '商品已全部提供':'全部提供'}}</el-button>
    </div>
    <plugin_title :hasLine="false" message="支持租赁的商品"></plugin_title>
    <div class="product-list">
      <el-table :data="productList" border stripe style="width: 100%" header-row-class-name="table-header" class="remove-scroll-bar">
        <el-table-column
          align="center"
          prop="goodsTitle"
          label="商品名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="skuName"
          label="商品配置">
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyLableVos"
          width="175px"
          label="标签">
          <template slot-scope="scope">
            <span class="tag" v-for="tag,index in scope.row.companyLableVos" :key="index">{{tag.labelName}}</span>
          </template>
        </el-table-column>
        <!--<div slot="empty" class="supportGoods">-->
          <!--<img src="../../assets/images/Group 3.png" alt="">-->
          <!--<div class="supportGoods-font">全部商品均可租赁</div>-->
        <!--</div>-->
      </el-table>
      <el-pagination
        v-if="productList.length != 0"
        background
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="currentChange">
      </el-pagination>
    </div>
    <el-dialog title="提供全部商品" :visible.sync="upAllGoodsDialog" width="420px" class="custom">
      <p>确认要提供全部商品吗?</p>
      <div slot="footer">
        <el-button @click="upAllGoodsDialog=false">取消</el-button>
        <el-button type="success" @click="upAllGoods">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import plugin_title from '../plugin_title'

  export default {
    data() {
      return {
        token: '',
        tagName: '',
        tagId: '',
        error: '',
        addTagsModal: false,
        tagList: [],
        productList: [],
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        },
        audit: [],
        upAllGoodsDialog: false,
        all: false
      };
    },
    components: {
      plugin_title
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.getAudit();
      this.getLableList();
      this.hasAll();
      this.getCompanyProductList();
    },
    methods: {
      hasAll(){
        this.$http.get('/company/haveAll',{params:{token: this.token}}).then(res=>{
          if(res.data.code == 1000){
            this.all = res.data.data;
          }
        })
      },
      amendAuditMethod() {
        var arr = {
          approval: this.audit.approvalProcess,
          reviewFlag: this.audit.reviewFlag,
          token: this.token,
          initTime: new Date().getTime(),
        };
        var vm = this;
        this.$http.post('/company/changeApproval', arr).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.$message({
              message: '修改成功',
              type: 'success'
            });
            vm.getAudit();

          } else {
            vm.$message({
              message: datas.data.msg,
              type: 'warning'
            });
          }
        })
      },
      getAudit() {
        var vm = this;
        this.$http.get('/company/info', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.audit = datas.data.data
          }
        })
      },
      getLableList() {
        var vm = this;
        var arr = {
          token: this.token,
          initTime: new Date().getTime(),
        }
        this.$http.get('/company/lableList', {params:arr}).then(function (res) {
          if (res.data.code == 1000) {
            vm.tagList = res.data.data;
          }
        })
      },
      initError() {
        this.error = ''
      },
      closeModal() {
        this.addTagsModal = false;
      },
      currentChange(page) {
        this.page.pageNum = page;
        this.getCompanyProductList();
      },
      getCompanyProductList() {
        var vm = this;
        this.$http.get('/company/companyGoods', {
          params: {
            token: this.token,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            initTime: new Date().getTime()
          }
        }).then(function (res) {
          if (res.data.code == 1000 && res.data.data) {
            vm.page.total = res.data.data.count;
            vm.productList = res.data.data.searchVos;
          }
        })
      },
      addTags() {
        this.addTagsModal = true;
        this.tagName = '';
        this.error = '';
        var vm = this;
        this.$http.get('/company/serialId', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (res) {
          if (res.data.code == 1000) {
            vm.tagId = res.data.data
          }
        })
      },
      subTags() {
        if (!this.tagName) {
          this.error = '请先填写标签名称';
          return
        }
        if (this.tagName.length > 6) {
          this.error = '标签名称不超过6个汉字';
          return
        }
        var arr = {
          token: this.token,
          lableId: this.tagId,
          lableName: this.tagName,
          initTime: new Date().getTime(),
        }
        var vm = this;
        this.$http.post('/company/addLable', arr).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.addTagsModal = false;
            vm.$message({
              message: datas.data.msg,
              type: 'success'
            });
            vm.getLableList();
          } else {
            vm.addTagsModal = false;
            vm.$message({
              message: datas.data.msg,
              type: 'warning'
            });
          }
        })

      },
      changeRadio(approval, reviewFlag) {
        var arr = {
          approval: approval,
          reviewFlag: reviewFlag,
          token: this.token,
          initTime: new Date().getTime(),
        };
        var vm = this;
        this.$http.post('/company/changeApproval', arr).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.$message({
              message: '修改成功',
              type: 'success'
            });
            vm.getAudit();

          } else {
            vm.$message({
              message: datas.data.msg,
              type: 'warning'
            });
          }
        })
      },
      changeApprovalType(approval, reviewFlag) {
        this.audit.approvalProcess = approval;
        if (this.audit.approvalProcess == 1 || this.audit.approvalProcess == 2) {
          this.audit.reviewFlag = false;
        }
      },
      handleClose(tag) {

      },
      upAllGoods() {
        this.upAllGoodsDialog = false;
        this.$http.post('/company/upAllGoods', {token: this.token,initTime: new Date().getTime(),}).then(res => {
          if (res.data.code == 1000) {
            this.hasAll();
            this.getCompanyProductList();
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .primary-btn {
    float: right;
    background-color: #6ECC66 !important;
    margin: 15px 0;
  }

  .subTags {
    padding-top: 30px;
    text-align: center;
  }

  .order-manage {
    padding: 20px 150px;
    color: #333;

    .el-button {
      background: none;

      &:focus,
      &:hover {
        background: none;
      }

      &.active {
        border: 1px solid #6ecc66;
        color: #6ecc66;
      }

    }
    .el-row + .el-row {
      margin: 35px 0 20px;

      span {
        margin-right: 70px;
      }

      .el-radio {
        margin-right: 52px;
      }

    }
  }

  .tag-manage {
    padding: 20px 150px;

    .el-tag {
      margin-right: 60px;
      margin-bottom: 10px;
      background: none;
      border-color: #dddddd;
      color: #666666;
      padding: 0 20px;
    }

    .el-button {
      height: 32px;
      padding: 0;
      width: 100px;
      text-align: center;
      font-size: 12px;
      font-weight: normal;
    }

  }

  .product-list {
    padding: 10px 90px 90px;

    .el-table {
      margin-bottom: 12px;
    }

    .el-pagination {
      margin-bottom: 30px;
      text-align: center;
    }
  }

  .btn-groups {
    text-align: right;
    line-height: 64px;
    padding-right: 90px;
    .el-button + .el-button {
      margin-left: 35px;
    }
    .el-button.is-disabled{
      background: #ddd;
      border-color: #ddd;
    }

  }
  .tag {
    display: block;
    float: left;
    padding-right: 10px;
    line-height: 1.4em;
  }

  .error {
    font-size: 12px;
    color: #FF4949;
    margin-top: -17px;
    margin-left: 82px;
    margin-right: 10px;
    margin-bottom: -16px;
  }

</style>
<style lang="scss">
  .sub-company-manage .el-table__empty-block {
    height: 200px;
  }

  .supportGoods-font {
    margin-top: 14px;
    color: #333;
    font-size: 14px;
    font-family: PingFangSC-Regular;
  }

  .sub-company-manage .table-header {

    th {
      background: #f1f1f1;
      font-weight: normal;
    }

  }
</style>
