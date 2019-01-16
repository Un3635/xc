<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/login-logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
            <el-form-item  prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input type="text" v-model="formLogin.code" placeholder="- - - -">
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img class="login-code" :src="loginCodeImgUrl" @click="refreshCodeImg">
                </template>
              </el-input>
            </el-form-item>
            <el-button @click="submit(captchaId)" type="primary" class="button-login" id="loginBtn">登录</el-button>
          </el-form>
          <el-checkbox class="remember-pwd" v-model="pwdChecked">记住密码</el-checkbox>
        </el-card>
      </div>
      <!-- 快速登陆按钮 -->
      <!--<el-button type="info" class="button-help" @click="dialogVisible = true"></el-button>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
require('particles.js')
import util from '@/libs/util.js'
import config from './config/default'
import { mapActions} from 'vuex'
import d2admin from '../../store/modules/d2admin';
export default {
  data () {
    return {
      // 快速选择用户
      // dialogVisible: false,
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loginCodeImgUrl: '',
      pwdChecked: false  //是否记住密码
    }
  },
  mounted () {
    // 初始化例子插件
    particlesJS('login', config);
    //获取页面图形验证码——new
    this.startLogin({
      vm: this
    });

    //记住上次登录的用户名和密码
    if(util.cookies.get('pwdChecked') && util.cookies.get('pwdChecked') === 'true'){
      if(util.cookies.get('uuid') && util.cookies.get('uuid') !== ''){
        this.formLogin.username = util.cookies.get('uuid');
      } else {
        this.formLogin.username = '';
      }
      if(util.cookies.get('password') && util.cookies.get('password') !== ''){
        this.formLogin.password = util.cookies.get('password');
      } else {
        this.formLogin.password = '';
      }
    } else {
      this.formLogin.username = '';
      this.formLogin.password = '';
    }
    util.cookies.set('pwdChecked',false);
  },
  computed:{
    captchaId(){
      return d2admin.state.captchaId;
    },
    codeImgUrl(){
      return d2admin.state.codeImgUrl;
    }
  },
  watch:{
    'codeImgUrl':function(val){
      this.loginCodeImgUrl = val;
      this.formLogin.code = '';
    },
    'formLogin.password':function(val){  //保存此次登录的密码
      util.cookies.set('password',val)
    },
    'pwdChecked':function(val){  //保存记住密码状态
      util.cookies.set('pwdChecked',val)
    }
  },
  methods: {
    ...mapActions([
      'd2adminLogin',
      'startLogin'
    ]),
    /**
     * @description 接收选择一个用户快速登陆的事件
     * @param {Object} user 用户信息
     */
    // handleUserBtnClick (user) {
    //   this.formLogin.username = user.username
    //   this.formLogin.password = user.password
    //   this.submit()
    // },
    /**
     * @description 提交表单
     */

    // 提交登陆信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登陆
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.d2adminLogin({
            vm: this,
            userName: this.formLogin.username,
            password: this.formLogin.password,
            captcha: this.formLogin.code,
            checkId:this.captchaId,
            token:''
          })
        } else {
          // 登陆表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    },
    //刷新验证码图片
    refreshCodeImg(){
      this.startLogin({
        vm: this
      });
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
  .remember-pwd{
    margin:15px 0 7px;
    color:#909399;
    font-size:12px;
    .el-checkbox__inner{
      width:12px;
      height:12px;
      &::after{
        height:5px;
        left:3px;
      }
    }
    .el-checkbox__label{
      font-size:12px;
      padding-left:6px;
    }
  }
</style>
