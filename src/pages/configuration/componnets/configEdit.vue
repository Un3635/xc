<template>
    <d2-container>
        <template slot="header">配置中心 - 编辑  <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="config-edit">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px">
                <el-form-item label="名称" prop="key">
                    <el-input :placeholder="ruleForm.key" disabled></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input :placeholder="value" v-model="value"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input :placeholder="ruleForm.remark" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetData">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "userDetail",
    data(){
        return{
          key:'',
          value:'',
          defaultValue: '', //获取内容初始值后保存在此处，后面判断是否改动
          ruleForm: {
            'createTime': null,
            'createUserId': null,
            'key': null,
            'remark': null,
            'updateTime': null,
            'updateUserId': null,
            'value': null
          }
        }
    },
    methods:{
      //获取配置信息
      getConfigInfo(key){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.configDetail,
          'application/x-www-form-urlencoded',
          {key},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        if(res.data){
          vm.defaultValue = vm.value = vm.ruleForm.value = res.data.value;
          vm.ruleForm.remark = res.data.remark;
          vm.ruleForm.key = res.data.key;
        }
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      //提交
      updateConfigInfo(){
        let vm = this;
        this.ruleForm.value = this.value;
        this.axiosPOST(vm, vm.$API.API.configEdit,
          'application/json',
          vm.ruleForm,
          vm.getUpdateSuccessCB,
          vm.getErrorCB
        )
      },
      //提交成功回调
      getUpdateSuccessCB(vm,res){
        vm.$message({
           message: '修改成功！',
           type: 'success'
        });
        setTimeout(()=>{
           vm.$router.replace('/configuration');
        },300)
      },
      //提交按钮
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(vm.value === vm.defaultValue){
              vm.$message('未编辑任何内容');
              setTimeout(()=>{
                vm.$router.go(-1);
              },300)
            } else {
              vm.updateConfigInfo();
            }
          } else {
            vm.$message.error('提交失败!')
            return false;
          }
        });
      },
      //重置按钮
      resetData(){
        this.getConfigInfo(this.key);
      }

    },
    mounted(){
      this.key = this.$route.query.key;
      this.getConfigInfo(this.key);
    }
  }
</script>

<style scoped lang="scss">
    .config-edit{
        width:500px;
        margin:30px 0;
        .account-box-card{
            .detail-item{
                width:100%;
                height:40px;
                margin:20px auto;
                text-align:left;
            }
        }
        .detail-item{
            .tit{
                display:inline-block;
                width:150px;
                text-align:left;
                font-size:15px;
                line-height:40px;
                color:#606266;
                font-weight:600;
            }
            .txt{
                display:inline-block;
                width:300px;
                text-align:left;
                font-size:15px;
                line-height:40px;
                color:#606266;
            }

        }
    }
</style>