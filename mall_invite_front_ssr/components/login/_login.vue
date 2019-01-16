<template>
  <div class="login-wrap mask-layer">
    <div class="login-box">
      <img v-if="isLoginTag" src="./image/Sign in_bg.png" alt="登录">
      <img v-else-if="!isLoginTag && !isForgotTag" src="./image/register_bg.png" alt="登录">
      <img v-else src="./image/Retrieve_bg.png" alt="登录">
      <div class="content-wrap">
        <div class="content-box">
          <strong class="title" v-if="isLoginTag">星球会员登录</strong>
          <strong class="title" v-else-if="!isLoginTag && !isForgotTag">星球会员注册</strong>
          <strong class="title" v-else>找回密码</strong>
          <el-form class="content-login-form" :model="loginData" :rules="rules" ref="loginForm">
            <el-form-item prop="phoneNum" ref="phoneNum">
              <el-input placeholder="请输入注册手机号"  v-model="loginData.phoneNum" class="input-with-select phoneNum-box" maxlength="20">
                <el-select v-model="loginData.select" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in cities"
                             :key="item.index"
                             :label="item.value"
                             :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; margin-left: 30px; font-size: 13px">{{item.value}}</span>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="yzPwd">
              <el-input placeholder="请输入验证码" v-model="loginData.yzPwd" class="pwd-box input-box"  maxlength="6">
                <template slot="append"><a href="javascript:;">发送验证码</a></template>
              </el-input>
            </el-form-item>
            <div class="register-box" v-show="!isLoginTag">
              <el-form-item prop="gooleYzCode" v-show="isBindGoole">
                <el-input v-model="loginData.gooleYzCode"  class="input-box" placeholder="请输入谷歌验证器验证码"></el-input>
              </el-form-item>
              <el-form-item prop="pwd" ref="pwd">
                <el-input type="password" v-model="loginData.pwd " class="input-box" placeholder="密码( 8-18位字母与数字 )" maxlength="18"></el-input>
              </el-form-item>
              <el-form-item prop="againPwd">
                <el-input type="password" v-model="loginData.againPwd" class="input-box" placeholder="请再次输入密码" maxlength="18"></el-input>
              </el-form-item>
              <el-form-item v-show="!isForgotTag" prop="invitedPwd">
                <el-input v-model="loginData.invitedPwd" v-show="!isForgotTag" class="input-box" placeholder="邀请码( 选填 )" maxlength="6"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <button class="login-btn" v-if="isLoginTag" @click="loginSuccess('loginForm', 0)">登陆</button>
          <button class="login-btn" v-else-if="!isLoginTag && !isForgotTag" @click="loginSuccess('loginForm', 1)">立即注册</button>
          <button class="login-btn" v-else @click="loginSuccess('loginForm', 2)">修改密码</button>
          <div class="hint login-hint" v-if="isLoginTag">
            <span @click="register('loginForm')">立即注册</span>
            <span @click="forgotPwd('loginForm')">忘记密码?</span>
          </div>
          <div class="hint register-hint" v-else>
            <span @click="register">已有账号,</span>
            <a href="javascript:;" @click="login('loginForm')">马上登录</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
//  import {Input, Select, Option, Button} from 'element-ui'
  import validators from './rules.js'
  export default {
    data() {
      return {
        isLoginTag: true,   // 是否登录
        isForgotTag: false, // 是否忘记密码
        isBindGoole: false, // 是否绑定谷歌验证器 false 无    true 有
        cities: [
          {
            value: '+86',
            label: '中国'
          },
          {
            value: '+45',
            label: '丹麦'
          },
          {
            value: '+33',
            label: '法国'
          }
        ],
        loginData: {
          select: '+86',
          phoneNum: '',
          yzPwd: '',
          pwd: '',
          againPwd: '',
          invitedPwd: '',
          gooleYzCode: ''
        },
        rules: {
          phoneNum: { validator: validators.checkPhone },
          yzPwd: { validator: validators.checkYzPwd },
          pwd: { validator: validators.checkPwd },
          againPwd: { validator:  (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.loginData.pwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
          },
          gooleYzCode: { validator: validators.checkYzPwd }
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.loginData.select = '+86';
        this.$nextTick(() => {
          this.$refs['phoneNum'].clearValidate();
        })

      },
      register(formName) {
        this.isLoginTag = false;
        this.resetForm(formName);
      },
      login(formName) {
        this.isLoginTag = true;
        if(this.isForgotTag)
        {
          this.isForgotTag = false;
        }
        this.resetForm(formName);
      },
      forgotPwd(formName) {
        this.register(formName);
        this.isForgotTag = true;
        // 判断是否绑定谷歌验证器 若没有绑定
        this.isBindGoole = true;
      },
      loginSuccess(formName, type){
        // console.log(type)
        this.$refs[formName].validate((valid) => {
          if (valid)
          {
            console.log('登录成功')
          }
          else
          {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg_color: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);
  .login-wrap {
    color: #ffffff;
  a:active{
    color: #4D2EEA;
  }
  .login-box {
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  & > img {
        width: 232px;
        float: left;
        height: auto;
      }

  .content-wrap {
    width: 478px;
  // height: 359px;
    float: left;
    background: #ffffff;
  .content-box {
    width: 300px;
    margin: 0px auto;
  .title {
    display: inline-block;
    width: 100%;
    margin-top: 46px;
    font-size: 20px;
    color: #2F2F2F;
    letter-spacing: 0;
    line-height: 20px;
    text-align: center;
    font-weight: 700;
  }
  .content-login-form {
    margin-top: 35px;
  .input-box {
    margin-top: 3px;
  }
  }

  .login-btn {
    margin-top: 30px;
    width: 100%;
    height: 43px;
    text-align: center;
    border: 0px;
    background: $bg_color;
    box-shadow: 0 4px 10px 0 rgba(77,46,234,0.30);
    font-size: 16px;
    color: #FFFFFF;
  }
  .hint {
    position: relative;
    margin-top: 16px;
    margin-bottom: 44px;
    font-size: 12px;
    color: #2F2F2F;
    letter-spacing: 0;
    text-align: left;
    height: 14px;
    line-height: 14px;
    overflow: hidden;
  &.login-hint {
  & > span {
        display: inline-block;
        cursor: pointer;
  &:first-child {
     float: left;
   }
  &:last-child {
     float: right;
   }
  }
  }
  &.register-hint {
     float: right;
   }
  }
  }
  }
  }

  }
  input::-webkit-input-placeholder {
    font-size: 14px;
    color: #CCCCCC;
    line-height: 14px;
  }
</style>
