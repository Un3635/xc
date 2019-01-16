<template>
    <d2-container>
        <template slot="header"><span>账号管理 — 编辑</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="account-edit"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="account-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input :placeholder="ruleForm.userName" v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input :placeholder="ruleForm.phone" v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="如无需修改密码，则此项为空" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input :placeholder="ruleForm.nickname" v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="editRoleName" placeholder="请选择角色">
                        <el-option v-for="item in allRoles" :label="item.displayName+'('+item.name+')'" :value="item.displayName" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提示" prop="hint">
                    <el-input :placeholder="ruleForm.hint" v-model="ruleForm.hint"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input :placeholder="ruleForm.email" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="负责的机构id">
                    <el-input :placeholder="ruleForm.agencyId" v-model="ruleForm.agencyId"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <span>
                        <el-radio v-model="editStatus" label="停用"></el-radio>
                        <el-radio v-model="editStatus" label="启用"></el-radio>
                        <el-radio v-model="editStatus" label="待修改密码"></el-radio>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading">确定</el-button>
                    <el-button @click="getInfo">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  import validators from '@/assets/js/validator.js'
  export default {
    name: "accountEdit",
    data() {
      return {
        editRoleName:'',
        id:'',
        editStatus:'待修改密码',
        ruleForm: {
          email:'',
          headurl: '',
          hint: '',
          nickname: '',
          password: '',
          phone: '',
          roleId:'',
          status: 3,
          userName: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          phone: [
            { validator:validators.checkPhone, trigger: 'change' }
          ],
          password: [
            { validator:validators.checkPwd, trigger: 'change' }
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
        allRoles:[],
        submitLoading: false,
        pageLoading: true
      }
    },
    watch:{
      'editStatus':function(val){
        if(val === '启用'){
          this.ruleForm.status = 1;
        } else if(val === '停用'){
          this.ruleForm.status = 2;
        } else {
          this.ruleForm.status = 3;
        }
      },
      'editRoleName':function(val){
        for(let i=0; i<this.allRoles.length; i++){
          if(val === this.allRoles[i].displayName){
            this.ruleForm.roleId = this.allRoles[i].id;
            return;
          }
        }
      }
    },
    methods: {
      //获取所有角色
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
      //获取账户信息
      getInfo(){
        let vm = this;
        let id = vm.id;
        this.axiosGET(vm, vm.$API.API.accountInfo + id,
          'application/x-www-form-urlencoded',
          {},
          vm.getInfoSuccessCB,
          vm.getErrorCB
        )
      },
      //获取用户信息成功回调
      getInfoSuccessCB(vm,res){
        if(res.data){
          vm.setDefault(res.data)
        }
      },
      //设置表格默认信息
      setDefault(_data){
         this.ruleForm.email = _data.email;
         this.ruleForm.userName = _data.userName;
         this.ruleForm.hint = _data.hint;
         this.ruleForm.nickname = _data.nickname;
         this.ruleForm.phone =  _data.phone;
         this.ruleForm.status = _data.status;
         this.ruleForm.agencyId = _data.agencyId;
         if(_data.status === 1){
           this.editStatus = '启用'
         } else if(_data.status === 2){
           this.editStatus = '停用'
         } else {
           this.editStatus = '待修改密码'
         }
        this.ruleForm.password = '';
        this.ruleForm.roleId = _data.roleId; //设置初始角色名称
        for(let i=0; i<this.allRoles.length; i++){
          if(_data.roleId === this.allRoles[i].id){
            this.editRoleName = this.allRoles[i].displayName
          }
        };
      },
      //提交编辑
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.submitDataAPI();
          } else {
            return false;
          }
        });
      },
      //提交数据接口
      submitDataAPI(){
        let vm = this;
        let id = vm.id;
        vm.$nextTick(() => {
          let token = util.cookies.get('token');
          vm.$axios({
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            },
            url: vm.$API.URL + vm.$API.API.accountEdit+id,
            data: vm.ruleForm
          })
            .then((res) => {
              if(res.code === '3001'){
                vm.$message.error('登录失效，请重新登录')
                util.cookies.remove('token');
                util.cookies.remove('uuid');
                util.cookies.remove('d2adminMenuAside');
                vm.$router.push({
                  name: 'login'
                })
              } else if(res.code === '6105'){
                vm.$message.error('请修改密码')
              } else if (res.code === '1000') {
                vm.submitLoading = true;
                vm.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                setTimeout(function(){
                  vm.$router.replace('/authority/account');
                },300)
              } else {
                vm.$message.error(res.message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      },
    },
    mounted(){
      this.id = this.$route.query.id;
      this.getAllRoles();
      this.getInfo();
    }
  }
</script>

<style scoped lang="scss">
    .account-edit{
        width:100%;
        margin:20px auto;
        text-align:left;
        .account-ruleForm{
            width:500px;
        }
    }
</style>