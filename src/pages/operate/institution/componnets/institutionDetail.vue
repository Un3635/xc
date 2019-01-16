<template>
    <d2-container>
        <template slot="header"><span></span>查看机构<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form label-width="150px" class="rule-form">
                <el-form-item label="机构名称：">
                    <span class="detail-info">{{tableData.name}}</span>
                </el-form-item>
                <el-form-item label="机构评分：" prop="score">
                    <span class="detail-info">{{tableData.score}}分</span>
                </el-form-item>
                <el-form-item label="签约有效期：">
                    <span class="detail-info">{{tableData.term}}天</span>
                </el-form-item>
                <el-form-item label="平台收益：">
                    <span class="detail-info">{{Math.round((1-tableData.dividedInto)*100)}}%</span>
                </el-form-item>
                <el-form-item label="机构与Ms收益：">
                    <span class="detail-info">{{tableData.dividedInto*100}}%</span>
                </el-form-item>
                <el-form-item label="状态：">
                    <span class="detail-info">{{tableData.status}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  export default {
    data() {
      return {
        id:'',
        tableData:{},
        pageLoading: false,//loading
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.agencyDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
     //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          this.tableData ={};
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
          let obj = {};
          obj.score = _data.score;
          obj.name = _data.name;
          obj.term = _data.term;
          obj.dividedInto = _data.dividedInto;
          switch (_data.status){
            case 0:
              obj.status = "禁用";
              break;
            case 1:
              obj.status = "正常";
              break;
            default:
              obj.status = "-";
          }
          this.tableData = obj;
      }
    },
    created(){
      this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>