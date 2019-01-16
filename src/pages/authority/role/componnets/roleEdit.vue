<template>
    <d2-container>
        <template slot="header"><span>角色管理 — 编辑</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="role-edit">
            <el-card class="box-card account-box-card" shadow="hover">
                <el-form :model="role" :rules="rules" ref="role" label-width="140px" class="account-ruleForm">
                    <el-form-item label="角色名称标志:" prop="name">
                        <el-input :placeholder="role.name" v-model="role.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="displayName">
                        <el-input :placeholder="role.displayName" v-model="role.displayName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="description">
                        <el-input :placeholder="role.description" v-model="role.description"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                    <span>
                        <el-radio v-model="radioStatus" label="停用"></el-radio>
                        <el-radio v-model="radioStatus" label="启用"></el-radio>
                    </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitRoleEdit" :loading="submitLoading">确定</el-button>
                        <el-button type="primary" @click="resetData" plain>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js';
  export default {
    name: "roleEdit",
    data(){
      return {
        radioStatus:'启用',
        id:'',
        role:{
          name:'',
          displayName:'',
          description:'',
          status:1
        },
        rules: {
          name: [
            { required: true, message: '请输入角色标志名称', trigger: 'blur' },
          ],
          displayName: [
            { required: true, message: '请输入角色名称',  trigger: 'blur' }
          ],
          description: [
            { required: false, message: '', trigger: 'blur' }
          ]
        },
        submitLoading:false
      }
    },
    watch:{
      'radioStatus':function(val){
        if(val === '启用'){
          this.role.status = 1
        } else {
          this.role.status = 2
        }
      }
    },
    methods:{
      getRoleEdit(){
        let vm = this;
        this.$nextTick(()=>{
          let id = vm.id;
          let token = util.cookies.get('token');
          vm.$axios({
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': token
            },
            url: vm.$API.URL + vm.$API.API.roleEdit + id,
            data:vm.role
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
              }else if (res.code === '1000') {
                vm.submitLoading = true;
                vm.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                setTimeout(function(){
                  vm.$router.replace('/authority/role');
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
      submitRoleEdit(){
        this.$refs.role.validate((valid) => {
          if (valid) {
            this.getRoleEdit();
          }
        })
      },
      resetData(){
        this.id = this.$route.query.id;
        this.role.displayName = this.$route.query.displayName;
        this.role.name = this.$route.query.name;
        this.role.description = this.$route.query.description;
        this.radioStatus = this.$route.query.status;
      }
    },
    mounted(){
      this.resetData() //重置数据
    }

  }
</script>

<style scoped lang="scss">
    .role-edit{
        margin:30px auto;
        .account-box-card{
            .account-ruleForm{
                width:500px;
                margin:50px 0 50px;
            }
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