<template>
    <d2-container>
        <template slot="header"><span>新增角色</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="role-edit">
            <el-card class="box-card account-box-card" shadow="hover">
                <!--<div class="detail-item">
                    <span class="tit">角色名称标志:</span>
                    <span class="txt">
                        <el-input placeholder="（唯一）" v-model="role.name" clearable id="role-sign"></el-input>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="tit">角色名称:</span>
                    <span class="txt">
                        <el-input placeholder="" v-model="role.displayName" clearable id="role-name"></el-input>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="tit">备注:</span>
                    <span class="txt">
                         <el-input placeholder="" v-model="role.description" clearable id="role-remark"></el-input>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="tit">状态:</span>
                    <span>
                        <el-radio v-model="radioStatus" label="1">启用</el-radio>
                        <el-radio v-model="radioStatus" label="2">停用</el-radio>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="tit"></span>
                    <span>
                        <el-button type="primary" @click="addRole">确定</el-button>
                        <el-button type="primary" @click="resetForm" plain>重置</el-button>
                    </span>
                </div>-->
                <el-form :model="role" :rules="rules" ref="role" label-width="140px" class="account-ruleForm">
                    <el-form-item label="角色名称标志:" prop="name">
                        <el-input placeholder="(唯一)" v-model="role.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="displayName">
                        <el-input placeholder="" v-model="role.displayName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="description">
                        <el-input placeholder="" v-model="role.description"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                    <span>
                        <el-radio v-model="radioStatus" label="1">启用</el-radio>
                        <el-radio v-model="radioStatus" label="2">停用</el-radio>
                    </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addRole" :loading="submitLoading">确定</el-button>
                        <el-button type="primary" @click="resetForm" plain>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "roleEdit",
    data(){
      return {
        radioStatus:'1',
        role:{
          displayName:'',
          name:'',
          description:'',
          status: null
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
        submitLoading: false
      }
    },
    methods:{
      addRole(){
        if(this.role.displayName !== '' && this.role.name !== '') {
          let vm = this;
          this.axiosPOST(vm, vm.$API.API.roleAdd,
            'application/json',
            vm.role,
            vm.getSuccessCB,
            vm.getErrorCB
          )
        } else {
          this.$message.error('请填写角色名称和角色标志')
        }
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.role.name = '';
        vm.role.displayName = '';
        vm.role.description = '';
        vm.radioStatus='1';
        vm.submitLoading = true;
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.replace('/authority/role');
        },300 )
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      resetForm(){
        this.role.name = '';
        this.role.displayName = '';
        this.role.description = '';
        this.radioStatus='1';
      }
    },
    watch:{
      'radioStatus':function(val){
        this.role.status = parseInt(val);
      }
    },
    mounted(){
      this.role.status = parseInt(this.radioStatus);
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