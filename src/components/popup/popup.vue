<template>
    <transition name="pop-fade">
        <div class="pop">
           <div class="pop-content">
               <div class="pop-tit">修改密码</div>
               <el-form  :model='ruleForm' ref="ruleForm" :rules="rules" label-width="95px">
                   <el-form-item label="用户名">
                       <el-input :placeholder="userName" disabled></el-input>
                   </el-form-item>
                   <el-form-item label="旧密码" prop="oldPassword">
                       <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm.oldPassword"></el-input>
                   </el-form-item>
                   <el-form-item label="新密码" prop="newPassword">
                       <el-input type="password" placeholder="(6-18位数字字母混合，不可与旧密码相同）" v-model="ruleForm.newPassword"></el-input>
                   </el-form-item>
                   <el-form-item label="确认新密码" prop="confirmPassword">
                       <el-input type="password" placeholder="请再一次输入新密码" v-model="ruleForm.confirmPassword"></el-input>
                   </el-form-item>
               </el-form>
               <div class="btn-box">
                   <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                   <el-button @click="showPopHandle">取消</el-button>
                   <!--<el-button @click="showPopHandle" v-if="!pwdPopCloseBtnDisabled">取消</el-button>-->
                   <!--<el-button disabled v-else>取消</el-button>-->
               </div>
               <p class="tip" v-if="pwdPopCloseBtnDisabled">* 为保障您的账号安全，需修改密码后方可查看数据</p>
           </div>
        </div>
    </transition>
</template>

<script>
  import util from '@/libs/util.js'
  import { mapActions } from 'vuex'
  import d2admin from "../../store/modules/d2admin";
  export default {
    data(){
      var confirmPwd = (rule,value, callback) =>{
        if (value === this.ruleForm.newPassword) {
          setTimeout(() => {
            callback();
          }, 1000);
        } else {
           callback('密码不一致')
        }
      };
      return {
        userName:'',
        ruleForm:{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true,message: '请输入旧密码',trigger: 'blur'}
          ],
          newPassword: [
            { required: true, message: '请输入新密码',trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true,validator:confirmPwd, message: '两次密码不一致',trigger: 'blur' }
          ]
        },
        pwdPopCloseBtnDisabled:true
      }
    },
    methods:{
      ...mapActions([
        'd2adminLogout'
      ]),
      //修改密码接口
      updatePwd(oldPassword,newPassword){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.upPwd,
          'application/x-www-form-urlencoded',
          {oldPassword, newPassword},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.$message({
          message: '修改密码成功！',
          type: 'success'
        });
        vm.$store.commit('setShowPwdPop',false);
        if(util.cookies.get('pwdPopCloseBtnDisabled')){
          util.cookies.set('pwdPopCloseBtnDisabled',false)
          vm.pwdPopCloseBtnDisabled = false;
        };
        vm.$emit('closePop');
        setTimeout(function(){
          vm.d2adminLogout({
            vm: vm,
            confirm: false
          })
        },400)
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      //提交按钮
      submitForm() {
        let vm = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            vm.updatePwd(vm.ruleForm.oldPassword,vm.ruleForm.newPassword);
          } else {
            return false;
          }
        });
      },
      //取消按钮
      showPopHandle(){
        this.$store.commit('setShowPwdPop',false);
      }
    },
    mounted(){
      this.userName = util.cookies.get('uuid');
      if(util.cookies.get('pwdPopCloseBtnDisabled')){
        this.pwdPopCloseBtnDisabled =  JSON.parse(util.cookies.get('pwdPopCloseBtnDisabled'));
      }
    }
  }
</script>

<style scoped lang="scss">
    .pop{
        z-index:200;
        position: fixed;
        top:0;
        left:0;
        right:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        .pop-content{
            /*margin:200px auto 0;*/
            position:absolute;
            top:50%;
            left:50%;
            width:390px;
            background:#fff;
            border-radius:5px;
            padding:40px 30px 30px;
            transform:translate(-50%,-50%);
            .pop-tit{
                width:100%;
                text-align:center;
                padding-bottom:35px;
                font-size:18px;
                font-weight:800;
                color:#333744;
            }
            .btn-box{
                padding-top:10px;
                width:100%;
                text-align:center;
            }
            .tip {
                padding-top:50px;
                text-align:center;
                font-size:12px;
                color:red;
                font-weight:400;
                letter-spacing: 1px;
            }
        };
        /*外层*/
        &.pop-fade-enter-active{
            transition:all 0.5s  ease-in-out;
        }
       &.pop-fade-leave-active{
            transition:all 0.3s  ease-in;
        }
        &.pop-fade-enter-to,&.pop-fade-leave{
            opacity:1;
        }
        &.pop-fade-leave-to,&.pop-fade-enter{
            opacity:0;
        }
        /*内层*/
        &.pop-fade-enter-active .pop-content{
            transition:all 0.5s  ease-in-out;
        }
        &.pop-fade-enter-to .pop-content{
            top:50%;
        }
       &.pop-fade-enter .pop-content{
            top:45%;
        }
    }
</style>