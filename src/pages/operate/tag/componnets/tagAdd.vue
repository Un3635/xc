<template>
    <d2-container>
        <template slot="header"><span></span>新增标签<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="标签名称：" prop="name">
                    <el-input v-model="paramsData.name" placeholder="请填写标签名称"></el-input>
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
    data() {
      return {
        paramsData:{
          'name':null,
          'partOfSpeech':1,
          'status':true
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
        this.axiosPOST(vm, vm.$API.API.labelEdit,
          'application/json',
          vm.paramsData,
          vm.getSuccessCB
        )
      },
     //成功回调
      getSuccessCB(vm,res){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getTableData();
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
.detail{
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
        .el-form-item{
            &:last-of-type{
                margin-top:50px;
            }
        }
    }
}
</style>