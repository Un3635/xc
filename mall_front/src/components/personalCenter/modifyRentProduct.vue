<template>
  <div class="modify-rent-product">
    <plugin_title :hasLine="false" :message="parentMsg"></plugin_title>
    <div class="product-list">
      <el-table  :data="goodsList" border stripe style="width: 100%" header-row-class-name="table-header" v-loading="loading" class="remove-scroll-bar">
        <el-table-column
          prop="hasShelve"
          label="提供商品"
          width="145"
          align="center">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.hasShelve">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="goodsTitle"
          label="商品名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="skuName"
          width="200"
          label="商品配置">
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyLableVos"
          label="标签">
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.companyLableIds">
              <el-checkbox style="margin:0 10px 0 0;" v-for="item,index in tagList" :key="index" :label="item.id">{{item.labelName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button @click="submit" :loading="isSubmitLoading" type="primary">提交修改</el-button>
  </div>
</template>
<script>
  import plugin_title from '../plugin_title'

  export default {
    data() {
      return {
        parentMsg:'支持租凭的商品',
        tagList:[],
        goodsList:[],
        loading: true,
        isSubmitLoading: false
      };
    },
    components:{
      plugin_title
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.getLableList().then(()=>{
        this.getGoodsList();
      });
    },
    methods: {
      getLableList(){
        var vm = this;
        var arr = {
          token: this.token
        }
        return this.$http.get('/company/lableList',{params:arr}).then(function (res) {
          if (res.data.code == 1000) {
            vm.tagList = res.data.data
          }
        })
      },
      getGoodsList(){
        this.loading=true;
        this.$http.get('/company/goodsList',{params: {token:this.token}}).then(res=>{
          this.loading=false;
          if(res.data.code == 1000){
            res.data.data.forEach(item=>{
              item.companyLableIds = [];
              item.companyLableVos.forEach(label=>{
                if(label.exist){
                  item.companyLableIds.push(label.id);
                }
              });
            });
            this.goodsList = res.data.data;
          }else{
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        })
      },
      submit(){
        this.isSubmitLoading = true;
        let params = {
            token: this.token,
            modifyVo: []
        };
        this.goodsList.forEach(item=>{
            params.modifyVo.push({
              companyLableIds: item.companyLableIds,
              goodsNo: item.goodsNo,
              productNo: item.productNo,
              hasShelve: item.hasShelve
            });
        });
        this.$http.post('/company/modifyGoods',JSON.stringify(params),{headers:{'Content-Type': 'application/json'},transformRequest:[]}).then(res=>{
          this.isSubmitLoading = false;
          if(res.data.code == 1000){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.$router.back();
          }
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .el-main {
    background: #f5f5f5 !important;
  }
  .modify-rent-product {
    >.el-button{
      margin:0 auto 30px;
      display: block;
    }
    .product-list{
      padding: 10px 30px 40px;
    }
    .el-checkbox + .el-checkbox,.el-radio + .el-radio{
      margin-left: 10px;
    }
  }
</style>
<style lang="scss">
  .loading-color.el-loading-mask {
    .el-icon-loading,.el-loading-text{
      color: #409eff;
    }
  }
  .modify-rent-product .table-header{
    th{
      background: #f1f1f1;
      font-weight: normal;
    }
  }
</style>
