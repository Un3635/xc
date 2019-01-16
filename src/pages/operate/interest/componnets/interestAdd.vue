<template>
    <d2-container>
        <template slot="header"><span></span>新增兴趣<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="兴趣名称：" prop="name">
                    <el-input v-model="paramsData.name" placeholder="请填写兴趣名称"></el-input>
                </el-form-item>
                <el-form-item label="排序："  required>
                    <el-input-number class="item-number" v-model="paramsData.sort" controls-position="right" :min="0" :max="127"></el-input-number>
                </el-form-item>
                <el-form-item label="首页展示：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.homeShow" :label="true">显示</el-radio>
                        <el-radio v-model="paramsData.homeShow" :label="false">不显示</el-radio>
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
          'sort': 0,
          'homeShow':true,
          'status':true
        },
        rules: {
          name: [
            { required: true, message: '请填写兴趣名称', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.interestEdit,
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