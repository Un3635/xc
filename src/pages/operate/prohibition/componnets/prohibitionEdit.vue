<template>
    <d2-container>
        <template slot="header"><span></span>禁词编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="禁词：">
                    <span class="text">{{tableData.illegalWord}}</span>
                </el-form-item>
                <el-form-item label="状态：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">生效</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">无效</el-radio>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">取消</el-button>
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
        paramsData:{
          'id':null,
          'illegalWord':null,
          'status':null
        },
        rules: {}
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.wordDetail+vm.id,
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
          obj.illegalWord = _data.illegalWord;
          obj.status = _data.status;
          this.paramsData.status = _data.status;
          this.tableData = obj;
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.wordEdit,
              'application/json',
              vm.paramsData,
              vm.getSubmitSuccessCB
            )
          } else {
            return false;
          }
        });

      },
      getSubmitSuccessCB(vm){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      }
    },
    created(){
      this.paramsData.id = this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>