<template>
    <d2-container>
        <template slot="header"><span></span>新增禁词<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="禁词：" prop="illegalWord">
                    <el-input v-model="paramsData.illegalWord" placeholder="请填写禁词"></el-input>
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
        paramsData:{
          'id': null,
          'illegalWord':null,
          'status':true
        },
        rules: {
          illegalWord: [
            { required: true, message: '请填写禁词', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.wordEdit,
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
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.getTableData();
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
</style>