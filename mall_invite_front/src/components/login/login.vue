<template>
<!-- <div> -->
  <!-- <button @click="loginWrap = true">切换</button> -->
<el-dialog  :visible.sync="loginWrap"  class="login-wrap" width="710px" @closed="closed()">
  <div class="login-wrap">
    <div class="login-box">
      <img v-if="isLoginTag" src="./image/Sign in_bg.png" alt="登录">
      <img v-else-if="!isLoginTag && !isForgotTag" src="./image/register_bg.png" alt="登录">
      <img v-else src="./image/Retrieve_bg.png" alt="登录" :class="{_height: !isBindGoole}">
      <div class="content-wrap">
        <div class="content-box">
          <strong class="title" v-if="isLoginTag">星球会员登录</strong>
          <strong class="title" v-else-if="!isLoginTag && !isForgotTag">星球会员注册</strong>
          <strong class="title" v-else>找回密码</strong>

          <!-- 登录页面 -->
          <el-form class="content-login-form" :model="loginData" :rules="loginRules" ref="loginForm" v-show="isLoginTag && !isForgotTag">
             <el-form-item prop="phoneNum" ref="loginForm_phoneNum">
              <el-input placeholder="请输入注册手机号"  v-model="loginData.phoneNum" class="input-with-select phoneNum-box" maxlength="20">
                <!-- <el-select v-model="loginData.select" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in cities"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; margin-left: 30px; font-size: 13px">{{item.value}}</span>
                  </el-option>
                </el-select> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd" ref="pwd">
              <el-input type="password" v-model="loginData.pwd " class="input-box" placeholder="密码( 8-18位字母与数字 )" maxlength="18"></el-input>
            </el-form-item>
          </el-form>

          <!-- 注册页面 -->
          <el-form class="content-login-form" :model="registerData" :rules="registerRules" ref="registerForm" v-show="!isLoginTag && !isForgotTag">
            <el-form-item prop="phoneNum" ref="registerForm_phoneNum">
              <el-input placeholder="请输入注册手机号"  v-model="registerData.phoneNum" class="input-with-select phoneNum-box" maxlength="20">
                <!-- <el-select v-model="registerData.select" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in cities"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; margin-left: 30px; font-size: 13px">{{item.value}}</span>
                  </el-option>
                </el-select> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="yzPwd">
              <el-input placeholder="请输入验证码" v-model="registerData.yzPwd" class="pwd-box input-box"  maxlength="6">
                <template slot="append">
                  <a href="javascript:;" v-if ="!showTiming" @click.stop="sendRegisterCode('registerForm', registerData.phoneNum, 1)" class="pwd-box_append">{{yzCodeStr}}</a>
                  <a href="javascript:;" v-else class="pwd-box_append timing">{{timing}}s</a>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd" ref="pwd">
                <el-input type="password" v-model="registerData.pwd " class="input-box" placeholder="密码( 8-18位字母与数字 )" maxlength="18"></el-input>
              </el-form-item>
              <el-form-item prop="againPwd">
                <el-input type="password" v-model="registerData.againPwd" class="input-box" placeholder="请再次输入密码" maxlength="18"></el-input>
              </el-form-item>
              <el-form-item  prop="invitedPwd">
                <el-input v-model="registerData.invitedPwd" class="input-box" placeholder="邀请码( 选填 )" maxlength="6"></el-input>
              </el-form-item>
          </el-form>

          <!-- 忘记密码 -->
          <el-form class="content-login-form" :model="forgetData" :rules="forgetRules" ref="forgetForm" v-show="!isLoginTag && isForgotTag">
            <el-form-item prop="phoneNum" ref="forgetForm_phoneNum">
              <el-input placeholder="请输入注册手机号"  v-model="forgetData.phoneNum" class="input-with-select phoneNum-box" maxlength="20">
                <!-- <el-select v-model="forgetData.select" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in cities"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; margin-left: 30px; font-size: 13px">{{item.value}}</span>
                  </el-option>
                </el-select> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="yzPwd">
              <el-input placeholder="请输入验证码" v-model="forgetData.yzPwd" class="pwd-box input-box" maxlength="6">
                <template slot="append">
                  <a href="javascript:;" v-if ="!showTiming" @click.stop="sendRegisterCode('forgetForm', forgetData.phoneNum, 2)" class="pwd-box_append">{{yzCodeStr}}</a>
                  <a href="javascript:;" v-else class="pwd-box_append timing">{{timing}}s</a>
                </template>
              </el-input>
            </el-form-item>
            <!-- :rules="[
                {required: true, message: '请输入正确的谷歌验证码'},
                {type: 'number', message: '请输入正确的谷歌验证码'}
              ]"
             -->
            <!-- <el-form-item prop="gooleYzCode" v-show="isBindGoole" >
              <el-input v-model="forgetData.gooleYzCode"  class="input-box" placeholder="请输入谷歌验证器验证码" maxlength="6"></el-input>
            </el-form-item> -->
            <el-form :model="forgetData_goole" :rules="forgetRules_goole" ref="forgetForm_goole" v-show="isBindGoole">
              <el-form-item prop="gooleYzCode">
                <el-input v-model="forgetData_goole.gooleYzCode"  class="input-box" placeholder="请输入谷歌验证器验证码" maxlength="6"></el-input>
              </el-form-item>
            </el-form>
            <el-form-item prop="pwd" ref="pwd">
              <el-input type="password" v-model="forgetData.pwd " class="input-box" placeholder="密码( 8-18位字母与数字 )" maxlength="18"></el-input>
            </el-form-item>
            <el-form-item prop="againPwd">
              <el-input type="password" v-model="forgetData.againPwd" class="input-box" placeholder="请再次输入密码" maxlength="18"></el-input>
            </el-form-item>
          </el-form>
         
          <!-- 底部 -->
          <div class="_bottom">
           <span class="result-hint">{{resultHint}}</span>
           <button class="login-btn" v-if="isLoginTag"  @click="loginSuccess('loginForm', 0)">登录</button>
           <button class="login-btn" v-else-if="!isLoginTag && !isForgotTag" @click="loginSuccess('registerForm', 1)">立即注册</button>
           <button class="login-btn" v-else @click="loginSuccess('forgetForm', 2)">修改密码</button>
           <div class="hint login-hint" v-if="isLoginTag">
             <span @click="register('loginForm', 'registerForm')">立即注册</span>
             <span @click="forgotPwd('loginForm', 'forgetForm')">忘记密码?</span>
           </div>
           <div class="hint register-hint" v-else>
             <span>已有账号,</span>
             <a href="javascript:;" @click="login('loginForm')">马上登录</a>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</el-dialog>
<!-- </div> -->

</template>
<script>
import {Input, Select, Option, Button} from 'element-ui'
import validators from './rules.js'
import {mapState} from 'vuex'
let FORM_NAME = '';
export default {
  data() {
    return {
      isLoginTag: true,   // 是否登录
      isForgotTag: false, // 是否忘记密码
      isBindGoole: false, // 是否绑定谷歌验证器 false 无    true 有
      timing: 60,
      showTiming: false,
      timer: null,
      resultHint: '',
      yzCodeStr: '发送验证码',
      // cities: [
      //   {
      //     value: '+86',
      //     label: '中国'
      //   },
      //   {
      //     value: '+45',
      //     label: '丹麦'
      //   },
      //   {
      //     value: '+33',
      //     label: '法国'
      //   }
      // ],
      loginData: {
        select: '+86',
        phoneNum: '',
        pwd: '',
      },
      registerData: {
        select: '+86',
        phoneNum: '',
        yzPwd: '',
        pwd: '',
        againPwd: '',
        invitedPwd: ''
      },
      forgetData: {
        select: '+86',
        phoneNum: '',
        yzPwd: '',
        pwd: '',
        againPwd: ''
      },
      forgetData_goole: {
        gooleYzCode: ''
      },

      loginRules: {
        phoneNum: { validator: validators.checkPhone },
        pwd: { validator: validators.checkPwd },
      },
      registerRules: {
        phoneNum: { validator: validators.checkPhone },
        yzPwd: { validator: validators.checkYzPwd },
        pwd: { validator: validators.checkPwd },
        againPwd: { validator:  (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.registerData.pwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
        }
      },
      forgetRules: {
        phoneNum: { validator: validators.checkPhone },
        yzPwd: { validator: validators.checkYzPwd },
        pwd: { validator: validators.checkPwd },
        againPwd: { validator:  (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.forgetData.pwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
        }
      },
      forgetRules_goole: {
        gooleYzCode: { validator: validators.checkGooleYzCode },
      },
      loginWrap: false
    }
  },
  computed: {
    ...mapState(['showLoginPage', 'safeCenterTologin'])
  },
  watch: {
    showLoginPage: {
      handler(val) {
        this.loginWrap = val;
        if(val)
        {
          this.safeCenterTologinJudge()
        }
      }
    }
  },
  created() {
    FORM_NAME = 'loginForm';
    
  },
  methods: {
    safeCenterTologinJudge(){
      if(this.$store.state.safeCenterTologin)
      {
        // 此时是找回密码的页面
        this.isLoginTag = false;
        this.isForgotTag = true;
        this.isBindGoole = Boolean(JSON.parse(localStorage.getItem('userInfo')).isGaSecret);
      }
    },
    init() {
      if(this.isBindGoole) {
         this.$refs['forgetForm_goole'].resetFields();
      }
      this.isLoginTag = true;
      this.isForgotTag = false;
      this.isBindGoole = false;
      this.resetForm(FORM_NAME);
    },
    resetForm(formName) {
      this.timer && clearInterval(this.timer);
      this.showTiming = false;
      this.timing = 60;
      this.yzCodeStr = '发送验证码';
      this.resultHint = '';

      this.$refs[formName].resetFields();
      this.loginData.select = '+86';
      // this.$nextTick(() => {
      //     this.$refs[formName+'_phoneNum'].clearValidate();
      // })
      
    },
    register(formName1, formName2) {
      this.isLoginTag = false;
      FORM_NAME = formName2;
      this.resetForm(formName1);
    },
    login(formName) {
      this.isLoginTag = true;
      if(this.isForgotTag)
      {
        this.isForgotTag = false;
        if(this.isBindGoole)
        {
           this.$refs['forgetForm_goole'].resetFields();
           this.isBindGoole = false;
        }
      }
      this.resetForm(FORM_NAME);
    },
    forgotPwd(formName1, formName2) {
      this.register(formName1);
      FORM_NAME = formName2;
      this.isForgotTag = true;
    },
    resetYzCode() {
        clearInterval(this.timer);
        this.showTiming = false;
        this.timing = 60;
        this.yzCodeStr = '重新发送';
    },
    sendRegisterCode(formName,phone,type) {
      const token = '';
      const APIS = [API.sendRegisterCode, API.sendForgetPwdCode];
      this.$refs[formName].validateField('phoneNum', (valid) => {
        if (!valid)
        {
          this.timer = setInterval(() => {
            if (this.timing === 0)
            {
             this.resetYzCode();
            }
            else
            {
              this.timing -= 1;
            }
          }, 1000);
          this.showTiming= true;
          // type: 1 -> 注册  2 -> 忘记密码
          getajaxdata(APIS[Number(type)-1], 'POST', {phone: phone}, 'JSON', (res) =>{
            if(Number(res.code) !== 1000) {
              this.resultHint = res.message;
              setTimeout(() => {
                this.resetYzCode();
              },800)
            }else{
              this.resultHint ="";
            }
          })

          // 忘记密码的时候，还需要去检测是否有谷歌验证
          if(type === 2)
          {
            this.checkPhoneIsBindGa();
          }
        }
      })
    },
    checkPhoneIsBindGa() {
      getajaxdata(API.checkPhoneIsBindGa, 'POST', {mobile_no: this.forgetData.phoneNum}, 'json', (res) => {
          if(res.data)
          {
            this.isBindGoole = true;
          }
      })
    },
    loginSuccess(formName, type){
      // type: 0->登录 1->注册 2->忘记密码
      this.$refs[formName].validate((valid) => {
        if(type === 2 && this.isBindGoole) {
           this.$refs['forgetForm_goole'].validate((validGoole) => {
             if(valid && validGoole) {
              this.toLoginSuccess(formName, type);
             } else {
                console.log('error submit!!');
                return false;
              }
           })
        } else {
          if (valid)
          {
            this.toLoginSuccess(formName, type);
          }
          else
          {
            console.log('error submit!!');
            return false;
          }
        }
      })
    },
    toLoginSuccess(formName, type){
      const APIS = [API.login, API.register, API.forgetPwd];
      const OBJ = [this.loginData, this.registerData, this.forgetData];
      const obj = OBJ[Number(type)];
        // type: 0->登录 1->注册 2->忘记密码
      let param = {
        mobile_no: obj.phoneNum,
        mobile_kaptcha: obj.yzPwd
      }
      switch (Number(type)) {
        case 0:
          //改成验证码，此段代码可以去掉 
          param = {
            mobile_no: obj.phoneNum,
            pwd: obj.pwd
          }
          break;
        case 1: 
          param['pwd'] = obj.pwd;
          param['invite_code'] = obj.invitedPwd;
          break;
        case 2: // 忘记密码分为两种情况 [绑定谷歌验证器， 未绑定谷歌验证器]
          param['new_pwd'] = obj.pwd;
          if(this.isBindGoole)
          {
            param['gaCode'] = this.forgetData_goole.gooleYzCode;
          }
          break;
      }
      getajaxdata(APIS[type], 'POST', param, 'JSON', (res, refreshParam) => { 
        if(Number(res.code) === 1000)
        {
          if (type === 0) {
            // 将token 保存在本地
            setDataToLocal('loan_token', res.data.token);
            token = res.data.token;
            // 将登录弹窗隐藏
            this.$store.commit('SHOW_LOGIN_PAGE', false);
            // this.loginWrap = false;
            const userInfo = {
              userName: res.data.userName || '',
              phone: res.data.phone,
              isGaSecret: res.data.isGaSecret
            }
            setDataToLocal('userInfo', JSON.stringify(userInfo));
            this.$store.commit('userNameStore', res.data.userName || res.data.phone);

            if(refreshParam){
              // for(let j = 0; j < refreshParam.length; j++)
              // {
              //   let _param_ = refreshParam[j];
              //   getajaxdata(_param_.url, _param_.method, _param_.data, _param_.datatype, _param_.callback, _param_.obj);
              // }
              this.$router.push('/');
            }
          }
          else 
          {
            // 注册和修改密码之后，都要进行重新再登录
            this.init();
          }
        }
        else
        {
          this.resultHint = res.message;
          this.resetYzCode();
        }
      }, 'LOGIN')
    },
    closed() {
      if(refreshParam) {
        localStorage.clear();
        this.$router.replace('/');
        this.$store.commit('userNameStore', null);
        refreshParam = false;
      }
      this.init();
      this.$store.commit('SHOW_LOGIN_PAGE', false);
      if(this.$store.state.safeCenterTologin) {
         this.$store.commit('safeCenterTologin', false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg_color: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);

.login-wrap {
  font-family: MicrosoftYaHei;
  color: #ffffff;
  a:active{
    color: #4D2EEA;
  }
  .login-box {
    display: flex;
    & > img {
      width: 232px;
      float: left;
      height: auto;
      &._height {
        height: 505px;
      }
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
          font-family: MicrosoftYaHei-Bold;
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
          .pwd-box {
            .pwd-box_append {
              width: 60px;
              display: inline-block;
              text-align: center;
            }
            .timing {
              color: #cccccc;
            }
          }
        }
        ._bottom {
          position: relative;
          overflow: hidden;
          padding-top: 25px;
          margin-bottom: 46px;
        }
        .result-hint {
          position: absolute;
          color: #f56c6c;
          font-size: 12px;
          line-height: 1;
          top: 6px;
        }
        .login-btn {
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
