<template>
    <d2-container>
        <template slot="header"><span></span>编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="edit"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="标签名称：">
                    <span class="text">{{tableData.name}}</span>
                </el-form-item>
                <el-form-item label="词性：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.partOfSpeech" :label="1">中性</el-radio>
                        <el-radio v-model="paramsData.partOfSpeech" :label="2">褒义</el-radio>
                        <el-radio v-model="paramsData.partOfSpeech" :label="3">贬义</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="状态：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
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
    name: "tagEdit",
    data() {
      return {
        id:'',
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'status':null,
          'partOfSpeech':null,
          'id':null
        },
        rules: {
          name: [
            { required: true, message: '请填写标签名称', trigger: 'blur' },
          ]
        }

      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.labelDetail+vm.id,
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
          obj.name = _data.name;
          this.paramsData.status = _data.status;
           obj.status = _data.status ? '正常' : '禁用';
          this.paramsData.partOfSpeech = _data.partOfSpeech;
          obj.partOfSpeech = _data.partOfSpeech;
           this.tableData = obj;
      },
      //设置表格数据
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.labelEdit,
              'application/json',
              vm.paramsData,
              vm.getSubmitSuccessCB
            )
          } else {
            return false;
          }
        });

      },
      getSubmitSuccessCB(vm,res){
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
.edit{
    margin:30px auto 80px;
    width:100%;
    text-align:left;
    .rule-form{
        .load-tip{
            font-size:14px;
            color:#ccc;
            line-height:36px;
            font-weight:200;
            padding-left:10px;
        }
        .pic{
            width:200px;
            border:5px solid #eee;
        }
        .text{
            font-size:14px;
            color:#222;
            line-height:36px;
            font-weight:200;
        }
        .el-form-item{
            &:last-of-type{
                margin-top:50px;
            }
        }
    }
}
</style>