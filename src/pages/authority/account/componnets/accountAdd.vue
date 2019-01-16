<template>
    <d2-container>
        <template slot="header"><span>新增账户</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="account-add">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="account-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="（必填项）"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="（必填项）不能少于6位，只能包含字母和数字"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
                        <el-option v-for="item in allRoles" :label="item.displayName+'('+ item.name +')'" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提示" prop="hint">
                    <el-input v-model="ruleForm.hint"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="管理的机构id">
                    <el-input v-model="ruleForm.agencyId"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <span>
                        <el-radio v-model="addStatus" label="停用"></el-radio>
                        <el-radio v-model="addStatus" label="启用"></el-radio>
                        <el-radio v-model="addStatus" label="待修改密码"></el-radio>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import validators from '@/assets/js/validator.js'
  export default {
    name: "accountAdd",
    data() {
      return {
        addStatus:'待修改密码',
        ruleForm: {
          agencyId:'',
          userName: '',
          phone: '',
          password: '',
          nickname: '',
          roleId:'',
          hint:'',
          email:'',
          status: 3
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          phone: [
            { validator:validators.checkPhone, trigger: 'change' }
          ],
          password: [
            { required: true,validator:validators.checkPwd,trigger: 'change' }
          ],
          nickname: [
            { required: false, message: '', trigger: 'change' }
          ],
          roleId: [
            { required: false, message: '请选择一种角色', trigger: 'change' }
          ],
          hint: [
            { required: false, message: '', trigger: 'change' }
          ],
          email: [
            { validator:validators.checkEmail, trigger: 'change' }
          ]
        },
        allRoles:[]
      };
    },
    watch:{
      'addStatus':function(val){
        if(val === '启用'){
          this.ruleForm.status = 1;
        } else if(val === '停用'){
          this.ruleForm.status = 2;
        } else {
          this.ruleForm.status = 3;
        }
      }
    },
    methods: {
      getAllRoles(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.allRoles,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        if(res.data){
          vm.allRoles = res.data;
        }
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.axiosPOST(vm, vm.$API.API.accountAdd,
              'application/json',
              vm.ruleForm,
              vm.getSubmitSuccessCB,
              vm.getErrorCB
            )
          } else {
            // vm.$message.error('提交失败!')
            return false;
          }
        });
      },
      //提交成功回调
      getSubmitSuccessCB(vm,res){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.replace('/authority/account');
        },300 )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      this.getAllRoles();
    }
  }
</script>

<style scoped lang="scss">
.account-add{
    width:100%;
    margin:20px auto;
    text-align:left;
    .account-ruleForm{
        width:500px;
    }
}
</style>