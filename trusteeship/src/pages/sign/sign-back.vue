<template>
  <div class="page">
    <div class="page-container">
      <div class="text-right">
        <router-link class="link" to="/sign-in">已有账号，立即登录 &gt;</router-link>
      </div>
      <div class="login-container">
        <div class="figure">
          <img src="../../../static/images/login-logo.png" class="figure-logo">
        </div>
        <div class="x-tabs">
          <div class="x-tabs__header">
            <ul class="x-tabs__nav">
              <li class="x-tabs__item" :class="{active: isPhone}" @click="isPhone=true">手机找回密码</li>
              <li class="x-tabs__item" :class="{active: !isPhone}" @click="isPhone=false">邮箱找回密码</li>
            </ul>
          </div>
          <div class="x-tabs__content">
            <div class="tabs-pane" v-if="isPhone">
              <!-- 手机注册 -->
              <form class="login-form">
                <div class="input-group">
                  <el-input placeholder="手机号码" name="phone" v-model="phoneForm.phone"
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
                  <x-captcha v-model="phoneForm.captcha" :key="'phoneForm.captcha'"/>
                </div>
                <div class="input-group">
                  <el-input class="code-input" placeholder="请输入验证码" name="code"
                            v-model="phoneForm.code" data-vv-scope="$phone" v-validate="'required|code'"
                            @focus="errors.remove('code','$phone')" key="$phone.code">
                    <el-button slot="suffix" class="text-secondary" type="text" @click="sendPhoneCode">
                      {{phoneBtnText}}
                    </el-button>
                  </el-input>
                  <p class="error" v-if="errors.has('$phone.code')">{{errors.first('$phone.code')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" class="code-input" placeholder="密码(8-18位包含字母或数字)" name="password"
                            v-model="phoneForm.password" data-vv-scope="$phone" v-validate="'required|password'"
                            @focus="errors.remove('password','$phone')" key="$phone.password"/>
                  <p class="error" v-if="errors.has('$phone.password')">{{errors.first('$phone.password')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" class="code-input" placeholder="再次输入密码" name="confirmPwd"
                            v-model="phoneForm.confirmPwd" data-vv-scope="$phone"
                            v-validate="{rules:{required:true,is:phoneForm.password}}"
                            @focus="errors.remove('confirmPwd','$phone')" key="$phone.confirmPwd"/>
                  <p class="error" v-if="errors.has('$phone.confirmPwd')">{{errors.first('$phone.confirmPwd')}}</p>
                </div>
                <el-button type="primary" class="btn-login" @click="phonePwd" :disabled="isPhoneConfirmDisabled">
                  确认
                </el-button>
              </form>
            </div>
            <div class="tabs-pane" v-if="!isPhone">
              <!-- 邮箱注册 -->
              <form class="login-form">
                <div class="input-group">
                  <el-input placeholder="邮箱" name="email" v-model="emailForm.email"
                            data-vv-scope="$email" v-validate="'required|email'"
                            @focus="errors.remove('email','$email')"/>
                  <p class="error" v-if="errors.has('$email.email')">{{errors.first('$email.email')}}</p>
                </div>
                <div class="input-group">
                  <x-captcha v-model="emailForm.captcha" :key="'emailForm.captcha'"/>
                </div>
                <div class="input-group">
                  <el-input class="code-input" placeholder="请输入验证码" name="code"
                            v-model="emailForm.code" data-vv-scope="$email" v-validate="'required|code'"
                            @focus="errors.remove('code','$email')" key="$email.code">
                    <el-button slot="suffix" class="text-secondary" type="text" @click="sendEmailCode">
                      {{emailBtnText}}
                    </el-button>
                  </el-input>
                  <p class="error" v-if="errors.has('$email.code')">{{errors.first('$email.code')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" name="password" placeholder="密码(8-18位包含字母与数字)" v-model="emailForm.password"
                            data-vv-scope="$email" v-validate="'required|password'"
                            @focus="errors.remove('password','$email')"/>
                  <p class="error" v-if="errors.has('$email.password')">{{errors.first('$email.password')}}</p>
                </div>
                <div class="input-group">
                  <el-input type="password" class="code-input" placeholder="再次输入密码" name="confirmPwd"
                            v-model="emailForm.confirmPwd" data-vv-scope="$email"
                            v-validate="{rules:{required:true,is:emailForm.password}}"
                            @focus="errors.remove('confirmPwd','$email')" key="$email.password"/>
                  <p class="error" v-if="errors.has('$email.confirmPwd')">{{errors.first('$email.confirmPwd')}}</p>
                </div>
                <el-button type="primary" class="btn-login" @click="emailPwd" :disabled="isEmailConfirmDisabled">
                  确认
                </el-button>
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
  import errorHandler from '../../services/error-handler';
  import {toPromise} from '../../plugins/utils';
  import SignMixin from './sign-mixin';
  import XCaptcha from '../../components/x-captcha';

  export default {
    components: {XCaptcha},
    data() {
      return {
        isPhone: true,
        redirectUrl: '',
        phoneBtnText: '发送验证码',
        emailBtnText: '发送验证码',
        emailForm: {},
        phoneForm: {},
        phoneCodeToken: '',
        emailCodeToken: '',
        phoneTimer: null,
        emailTimer: null
      };
    },
    computed: {
      isEmailConfirmDisabled() {
        return !this.emailForm.email || !this.emailForm.password || !this.emailForm.confirmPwd || !this.emailForm.code;
      },
      isPhoneConfirmDisabled() {
        return !this.phoneForm.phone || !this.phoneForm.password || !this.phoneForm.confirmPwd || !this.phoneForm.code;
      }
    },
    methods: {
      phonePwd() {
        this.$validator.validateAll('$phone')
          .then(toPromise)
          .then(() => {
            if (!this.phoneForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() =>
            SignAPI.password(this.phoneForm.phone, this.phoneForm.password, this.phoneForm.code, this.phoneCodeToken))
          .then(() => {
            this.$message.success('找回密码成功');
            this.$router.push('/sign-in');
          })
          .catch(err => this.errorHandler(err));
      },
      emailPwd() {
        this.$validator.validateAll('$email')
          .then(toPromise)
          .then(() => {
            if (!this.emailForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() =>
            SignAPI.password(this.emailForm.email, this.emailForm.password, this.emailForm.code, this.emailCodeToken))
          .then(() => {
            this.$message.success('找回密码成功');
            this.$router.push('/sign-in');
          })
          .catch(err => this.errorHandler(err));
      },
      sendPhoneCode() {
        if (this.phoneTimer) {
          return;
        }
        this.$validator.validate('phone', this.phoneForm.phone, '$phone')
          .then(toPromise)
          .then(() => {
            if (!this.phoneForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => ({
            countryNum: this.countryCode,
            account: this.phoneForm.phone,
            type: VerifyCodeType.BACK_PWD
          }))
          .then(data => SignAPI.sendCode(data))
          .then(res => {
            this.phoneCodeToken = res.result;
            this.$message.success('验证码发送成功');
            this.phoneTimer = this.countDown(60)
              .start((t) => {
                this.phoneBtnText = t + 's';
              });
            this.phoneTimer.end(() => {
              this.phoneTimer = null;
              this.phoneBtnText = '重新发送';
            });
          })
          .catch(errorHandler);
      },
      sendEmailCode() {
        if (this.emailTimer) {
          return;
        }
        this.$validator.validate('email', this.emailForm.email, '$email')
          .then(toPromise)
          .then(() => {
            if (!this.emailForm.captcha) {
              return Promise.reject({msg: '请先完成安全验证'});
            }
          })
          .then(() => ({
            account: this.emailForm.email,
            type: VerifyCodeType.BACK_PWD
          }))
          .then(data => SignAPI.sendCode(data))
          .then(res => {
            this.emailCodeToken = res.result;
            this.$message.success('验证码发送成功');
            this.emailTimer = this.countDown(60)
              .start((t) => {
                this.emailBtnText = t + 's';
              });
            this.emailTimer.end(() => {
              this.emailTimer = null;
              this.emailBtnText = '重新发送';
            });
          })
          .catch(this.errorHandler);
      },
      errorHandler(err) {
        if (!err) {
          return;
        }
        if (err.code === '000006') {
          return this.$message.warning('请重新获取验证码');
        }
        errorHandler(err);
      }
    },
    mounted() {
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
    height: 590px;
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
    height: 560px;
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

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }

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

  .email-login .btn-login {
    margin-top: 5px;
  }
</style>
