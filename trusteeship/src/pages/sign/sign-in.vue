<template>
  <div class="page">
    <div class="page-container">
      <div class="text-right">
        <router-link to="/sign-up" class="link">没有账号，立即注册 &gt;</router-link>
      </div>
      <div class="login-container">
        <div class="figure">
          <img src="../../../static/images/login-logo.png" class="figure-logo">
        </div>
        <div class="x-tabs">
          <div class="x-tabs__header">
            <ul class="x-tabs__nav">
              <li class="x-tabs__item" :class="{active: isPhoneLogin}" @click="isPhoneLogin=true">手机登录</li>
              <li class="x-tabs__item" :class="{active: !isPhoneLogin}" @click="isPhoneLogin=false">邮箱登录</li>
            </ul>
          </div>
          <div class="x-tabs__content">
            <div class="tabs-pane" v-if="isPhoneLogin">
              <!-- 手机验证码登录 -->
              <form class="login-form" v-if="!isPwdLogin">
                <div class="input-group">
                  <el-input placeholder="手机号码" name="phone" v-model="loginForm.phone"
                            data-vv-scope="$phone" v-validate="'required|phone'"
                            @focus="errors.remove('phone','$phone')" key="$phone.phone">
                    <el-select slot="prepend" placeholder="请选择" v-model="countryCode" value="">
                      <el-option v-for="item in cities" :key="item.name" :value="item.code">
                        <span>{{ item.name }}</span>
                        <span class="country-code">{{ item.code }}</span>
                      </el-option>
                    </el-select>
                  </el-input>
                  <p class="error" v-if="errors.has('$phone.phone')">{{errors.first('$phone.phone')}}</p>
                </div>
                <div class="input-group">
                  <x-captcha v-model="loginForm.captcha"/>
                </div>
                <div class="input-group">
                  <el-input class="code-input" placeholder="请输入验证码" name="code"
                            v-model="loginForm.code" data-vv-scope="$phone" v-validate="'required|code'"
                            @focus="errors.remove('code','$phone')" key="$phone.code">
                    <el-button slot="suffix" class="text-secondary" type="text" @click="sendVerifyCode">
                      {{btnText}}
                    </el-button>
                  </el-input>
                  <p class="error" v-if="errors.has('$phone.code')">{{errors.first('$phone.code')}}</p>
                </div>
                <div class="input-group">
                  <el-input placeholder="邀请者邀请码（选填）" v-model="loginForm.inviteCode"></el-input>
                </div>
                <el-button type="primary" class="btn-login" @click="loginByPhone" :disabled="isCodeLoginDisable">
                  登录
                </el-button>
                <el-row class="extra">
                  <el-col :span="12" class="text-left">
                    <span class="text-secondary pointer" @click="isPwdLogin=true">使用密码登录</span>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <router-link to="/sign-back">忘记密码?</router-link>
                  </el-col>
                </el-row>
              </form>
              <!-- 手机密码登录 -->
              <form class="login-form email-login" v-if="isPwdLogin">
                <div class="input-group">
                  <el-input placeholder="手机号码" name="phone" v-model="loginForm.phone"
                            data-vv-scope="$phonePwd" v-validate="'required|phone'"
                            @focus="errors.remove('phone','$phonePwd')" key="$phonePwd.phone">
                    <el-select slot="prepend" placeholder="请选择" v-model="countryCode" value="">
                      <el-option v-for="item in cities" :key="item.name" :value="item.code">
                        <span>{{ item.name }}</span>
                        <span class="country-code">{{ item.code }}</span>
                      </el-option>
                    </el-select>
                  </el-input>
                  <p class="error" v-if="errors.has('$phonePwd.phone')">{{errors.first('$phonePwd.phone')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" class="code-input" placeholder="请输入密码" name="password"
                            v-model="loginForm.password" data-vv-scope="$phonePwd" v-validate="'required|password'"
                            @focus="errors.remove('password','$phonePwd')" key="$phonePwd.password"/>
                  <p class="error" v-if="errors.has('$phonePwd.password')">{{errors.first('$phonePwd.password')}}</p>
                </div>
                <div class="input-group">
                  <x-captcha v-model="loginForm.captcha" :key="'pwdLogin.captcha'"/>
                </div>
                <div class="text-left">
                  <el-checkbox class="remember" v-model="isRememberPwd">记住密码</el-checkbox>
                </div>
                <el-button type="primary" class="btn-login" @click="loginByPwd" :disabled="isPwdLoginDisable">
                  登录
                </el-button>
                <el-row class="extra">
                  <el-col :span="12" class="text-left">
                    <span class="text-secondary pointer" @click="isPwdLogin=false">使用验证码登录</span>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <router-link to="/sign-back">忘记密码?</router-link>
                  </el-col>
                </el-row>
              </form>
            </div>
            <div class="tabs-pane" v-if="!isPhoneLogin">
              <!-- 邮箱登录 -->
              <form class="login-form email-login">
                <div class="input-group">
                  <el-input placeholder="邮箱" name="email" v-model="loginForm.email"
                            data-vv-scope="$email" v-validate="'required|email'"
                            @focus="errors.remove('email','$email')"/>
                  <p class="error" v-if="errors.has('$email.email')">{{errors.first('$email.email')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" name="password" placeholder="密码(8-18位包含字母与数字)" v-model="loginForm.emailPwd"
                            data-vv-scope="$email" v-validate="'required|password'"
                            @focus="errors.remove('password','$email')"/>
                  <p class="error" v-if="errors.has('$email.password')">{{errors.first('$email.password')}}</p>
                </div>
                <div class="input-group">
                  <x-captcha v-model="loginForm.captcha" :key="'emailLogin.captcha'"/>
                </div>
                <div class="text-left">
                  <el-checkbox class="remember" v-model="isRememberPwd">记住密码</el-checkbox>
                </div>
                <el-button type="primary" class="btn-login" @click="emailLogin" :disabled="isEmailLoginDisabled">
                  登录
                </el-button>
                <div class="extra text-right">
                  <router-link to="/sign-back">忘记密码?</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import SignAPI, {VerifyCodeType} from '../../services/sign-api';
  import {LOGIN_IN} from '../../store/mutation-types';
  import errorHandler from '../../services/error-handler';
  import SignMixin from './sign-mixin';
  import {getStore, removeStore, setStore, toPromise} from '../../plugins/utils';
  import XCaptcha from '../../components/x-captcha';

  export default {
    components: {XCaptcha},
    data() {
      return {
        redirectUrl: '',
        isPhoneLogin: true,
        isRememberPwd: false,
        isPwdLogin: false,
        loginForm: {
          phone: '',
          code: '',
          password: '',
          email: '',
          emailPwd: '',
          inviteCode: '',
          captcha: ''
        },
        codeToken: '',
        btnText: '发送验证码',
        timer: null
      };
    },
    computed: {
      isCodeLoginDisable() {
        return !this.loginForm.phone || !this.loginForm.code;
      },
      isPwdLoginDisable() {
        return !this.loginForm.phone || !this.loginForm.password;
      },
      isEmailLoginDisabled() {
        return !this.loginForm.email || !this.loginForm.emailPwd;
      }
    },
    methods: {
      remPwd() {
        if (this.isRememberPwd) {
          setStore('phone', this.loginForm.phone);
          setStore('password', this.loginForm.password);
          setStore('phoneType', true);
        } else {
          removeStore('phone');
          removeStore('password');
          removeStore('phoneType');
        }
      },
      remEmailPwd() {
        if (this.isRememberPwd) {
          setStore('email', this.loginForm.email);
          setStore('emailPwd', this.loginForm.emailPwd);
          setStore('emailType', true);
        } else {
          removeStore('email');
          removeStore('emailPwd');
          removeStore('emailType');
        }
      },
      loadLoginInfo() {
        if (this.isPhoneLogin) {
          if (this.isPwdLogin) {
            this.loginForm.phone = getStore('phone');
            this.loginForm.password = getStore('password');
            this.isRememberPwd = getStore('phoneType') === 'true';
          } else {
            this.loginForm.phone = '';
          }
        } else {
          this.loginForm.email = getStore('email');
          this.loginForm.emailPwd = getStore('emailPwd');
          this.isRememberPwd = getStore('emailType') === 'true';
        }
      },
      sendVerifyCode() {
        if (this.timer) {
          return;
        }
        const phone = this.loginForm.phone;
        this.$validator.validate('phone', phone, '$phone')
          .then(toPromise)
          .then(() => {
            if (!this.loginForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => {
            let data = {
              countryNum: this.countryCode,
              account: phone,
              type: VerifyCodeType.LOGIN,
              validData: this.loginForm.captcha
            };
            return SignAPI.sendCode(data);
          })
          .then(res => {
            this.codeToken = res.result;
            this.$message.success('验证码发送成功');
            this.timer = this.countDown(60)
              .start(t => {
                this.btnText = t + 's';
              });
            this.timer.end(() => {
              this.timer = null;
              this.btnText = '重新发送';
            });
          })
          .catch(errorHandler);
      },
      loginByPhone() {
        const {phone, code, inviteCode} = this.loginForm;
        const {countryCode, codeToken} = this;
        this.$validator.validateAll('$phone')
          .then(toPromise)
          .then(() => {
            if (!this.loginForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => SignAPI.phoneLogin(countryCode, phone, code, inviteCode, codeToken))
          .then(res => this.loginSuccessHandler(res))
          .catch(this.errorHandler);
      },
      loginByPwd() {
        const {phone, password, captcha} = this.loginForm;
        this.$validator.validateAll('$phonePwd')
          .then(toPromise)
          .then(() => {
            if (!captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => SignAPI.pwdLogin(phone, password, captcha))
          .then((res) => {
            this.loginSuccessHandler(res);
            this.remPwd();
          })
          .catch(this.errorHandler);
      },
      emailLogin() {
        if (this.isEmailLoginDisabled) {
          return;
        }
        const {email, emailPwd, captcha} = this.loginForm;
        this.$validator.validateAll('$email')
          .then(toPromise)
          .then(() => {
            if (!captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => SignAPI.pwdLogin(email, emailPwd, captcha))
          .then((res) => {
            this.loginSuccessHandler(res);
            this.remEmailPwd();
          })
          .catch(this.errorHandler);
      },
      loginSuccessHandler(res) {
        this.$store.commit(LOGIN_IN, res);
        this.$message({
          type: 'success',
          duration: 1000,
          message: '登录成功'
        });
        if (this.redirectUrl === this.$route.path) {
          this.$router.replace('/');
        } else {
          this.$router.replace(this.redirectUrl || '/');
        }
      },
      errorHandler(err) {
        if (!err) {
          return;
        }
        if (err.code === '200006') {
          return this.$message.warning(err.msg);
        }
        if (err.code === '000006') {
          return this.$message.warning('请重新获取验证码');
        }
        errorHandler(err);
      }
    },
    mounted() {
      // 登录完成的跳转地址
      this.redirectUrl = this.$route.query.redirectUrl;
    },
    beforeDestroy() {
      this.timer && this.timer.cancel();
    },
    watch: {
      isPhoneLogin: {
        handler() {
          this.loadLoginInfo();
        },
        immediate: true
      },
      isPwdLogin: {
        handler() {
          this.loadLoginInfo();
        }
      }
    },
    mixins: [SignMixin]
  };
</script>

<style scoped lang="scss">
  .page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../../static/images/login-bg.png") no-repeat 0 -5px;
    background-size: 100% 101%;
    text-align: center;
  }

  .page-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 720px;
    height: 535px;
    margin: auto;
  }

  .link {
    font-size: 14px;
    color: #fff;
  }

  .login-container {
    position: relative;
  }

  .x-tabs {
    background-color: #fff;
    padding: 40px;
    height: 515px;
  }

  .x-tabs__header {
    margin-bottom: 30px;
  }

  .x-tabs__content {

  }

  .x-tabs__nav {
    text-align: center;
    font-size: 0;
  }

  .x-tabs__item {
    position: relative;
    display: inline-block;
    font-size: 20px;
    line-height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    color: #3C3C3F;
    cursor: pointer;
    user-select: none;
    vertical-align: top;

    &.active {
      color: #303137;
      font-weight: bold;
    }

    & + .x-tabs__item:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: -1px;
      top: 5px;
      width: 2px;
      height: 20px;
      background-color: #3c3c3f;
    }
  }

  .input-group {
    margin-bottom: 30px;
    position: relative;
  }

  .country-code {
    float: right;
    font-size: 12px
  }

  .btn-login {
    display: block;
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 50px;
  }

  .extra {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #969699;
  }

  .text-secondary {
    color: #a99067;
  }

  .pointer {
    cursor: pointer;
  }

  .login-container {
    position: relative;
    padding-left: 50%;
    margin-top: 10px;
  }

  .figure {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    background: url(../../../static/images/login.png) no-repeat;
    background-size: 100% 100%;
  }

  .figure-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .error {
    position: absolute;
    font-size: 12px;
    line-height: 30px;
    color: #f95453;
  }

  .remember {
    font-size: 12px;
    color: #303137;
  }

  .email-login {
    padding-top: 40px;
  }

  .email-login .btn-login {
    margin-top: 5px;
  }
</style>
