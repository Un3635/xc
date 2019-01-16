<template>
  <div class="login-in" @click="showArea = false">
    <view-box body-padding-top="46px" body-padding-bottom="0">
      <x-header :left-options="{backText: ''}" slot="header" class="custom-header">手机快捷登录</x-header>
      <div>
        <div class="logo">
          <img src="../../assets/images/logo@2x.png" alt="">
        </div>
        <div class="login-form">
          <div class="phone vux-1px">
            <div class="area-code vux-1px-r" @click.stop.prevent="showArea = !showArea">
              <span>+{{loginForm.areaValue}}</span>
              <img src="../../assets/images/icon_quhaoxiaoze_normal@2x.png" alt="">
            </div>
            <transition name="fade">
              <div class="area-list" v-show="showArea" v-if="cities.length != 0">
                <ul>
                  <li v-for="(item,index) in cities" :key="index"
                      @click="loginForm.areaValue = item.area_code;">
                    <p class="clearfix">
                      <span class="left">{{item.area_name}}</span>
                      <span class="right">+{{item.area_code}}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </transition>
            <div class="phone-num">
              <input type="tel" placeholder="手机号码" v-model="loginForm.phone" name="phone"
                     v-validate="'required|phone'"
                     @focus="veeErrors.remove('phone')">
            </div>
            <p class="error-info" v-show="veeErrors.has('phone')">{{veeErrors.first('phone')}}</p>
          </div>
          <div class="vcode vux-1px">
            <div class="code">
              <input type="text" placeholder="短信验证码" v-model="loginForm.code" name="code" v-validate="'required|code'"
                     @focus="veeErrors.remove('code')">
            </div>
            <div class="vcode-btn">
              <input type="button" :value="sendCodeText" :disabled="sendCodeDisabled"
                     @click.stop.prevent="sendCodeBtnHandler">
            </div>
            <p class="error-info" v-show="veeErrors.has('code')">{{veeErrors.first('code')}}</p>
          </div>
          <div class="invite-code vux-1px">
            <input type="text" placeholder="邀请码(选填)" v-model="loginForm.inviteCode">
          </div>
          <div class="fast-login-in">
            <x-button @click.stop.prevent.native="signIn" :show-loading="loginLoading" type="primary"
                      :disabled="!loginInDisabled">
              快捷登录
            </x-button>
          </div>
        </div>
      </div>
      <toast v-model="showTip" type="text" :time="1000" position="middle" class="sign-tip-toast" width="180px">
        <span class="sign-tip">
          <img src="../../assets/images/icon_weidenglutishi_normal.png" alt="">
          <span>用户未登录</span>
        </span>
      </toast>
      <div id="captcha"></div>
    </view-box>
  </div>
</template>
<script>
  import CommonAPI from '../../services/common-api';
  import {MutationTypes} from '../../store/mutations';
  import signApi, {VerifyCodeType} from '../../services/sign-api';
  import {Toast} from 'vux';
  import {mapState} from 'vuex';
  import errorHandler from '../../services/error-handler';

  export default {
    data() {
      return {
        cities: [],
        showArea: false,
        loginForm: {
          phone: '',
          areaValue: '86',
          code: '',
          inviteCode: '',
          codeToken: ''
        },
        sendCodeText: '获取验证码',
        sendCodeDisabled: false,
        loginLoading: false,
        timer: null,
        redirectUrl: '',
        showTip: false,
        validData: ''
      };
    },
    components: {
      Toast
    },
    computed: {
      ...mapState(['login']),
      loginInDisabled() {
        return !!(this.loginForm.phone && this.loginForm.code);
      }
    },
    mounted() {
      this.redirectUrl = this.$route.query.redirectUrl || '';
      this.getCitys();
    },
    watch: {
      login: {
        handler(val) {
          if (!val && this.$route.query.redirectUrl) {
//            this.showTip = true;
          }
        },
        immediate: true
      }
    },
    methods: {
      getCitys() {
        return CommonAPI.country()
          .then(res => {
            this.cities = res;
          });
      },
      signIn() {
        this.$validator.validateAll().then(res => {
          if (res) {
            return Promise.resolve();
          }
          return Promise.reject(null);
        }).then(() => {
          let params = Object.assign(this.loginForm, {
            countryNum: '+' + this.loginForm.areaValue
          });
          return signApi.phoneLogin(params).then(res => {
            this.loginSuccessHandler(res);
          });
        });
      },
      sendCodeBtnHandler() {
        const _this = this;
        this.$validator.validate('phone')
          .then(res => {
            if (res) {
              return Promise.resolve();
            }
            return Promise.reject(null);
          })
          .then(() => {
            let captchaIns = null;
            window.initNECaptcha({
              captchaId: 'ce1b9b10b25143628df735343ab9b4b3',
              element: '#captcha',
              mode: 'popup',
              width: '280px',
              onVerify(err, data) {
                if (!err) {
                  console.info(data);
                  _this.validData = data.validate;
                  _this.sendCode()
                    .then(() => {
                      captchaIns.destroy();
                    });
                }
              }
            }, (instance) => {
              captchaIns = instance;
              captchaIns && captchaIns.popUp();
            }, (error) => {
              errorHandler({msg: error}, _this);
            });
          });
      },
      sendCode() {
        let params = {
          countryNum: '+' + this.loginForm.areaValue,
          account: this.loginForm.phone,
          type: VerifyCodeType.LOGIN,
          validData: this.validData
        };
        return signApi.sendCode(params)
          .then((res) => {
            this.$vux.toast.show({
              type: 'text',
              text: '发送成功',
              position: 'middle'
            });
            let time = 60;
            this.sendCodeDisabled = true;
            this.sendCodeText = time + 's';
            this.loginForm.codeToken = res.result;
            this.timer = setInterval(() => {
              time--;
              this.sendCodeText = time + 's';
              if (time < 1) {
                this.sendCodeDisabled = false;
                this.sendCodeText = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
          });
      },
      loginSuccessHandler(res) {
        this.$store.commit(MutationTypes.LOGIN_IN, res);
        this.$vux.toast.show({
          type: 'text',
          text: '登录成功',
          position: 'middle'
        });
        if (this.redirectUrl === this.$route.path) {
          this.$router.replace('/');
        } else {
          this.$router.replace(this.redirectUrl || '/');
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .logo {
    padding: 40px 0 36px;
    img {
      display: block;
      margin: 0 auto;
      width: 70px;
      height: 84px;
    }
  }

  .login-form {
    padding: 0 25px;
    > div {
      height: 45px;
      margin-bottom: 22px;
      position: relative;
      border-radius: 2px;
      background: #FAFAFA;
      &.vux-1px {
        &::before, &::after {
          border-radius: 2px;
          border-color: #EDEEF0;
        }
        > div {
          position: relative;
          z-index: 1;
          &.area-list {
            position: absolute;
            background: #fff;
            left: 0;
            right: 0;
            top: 46px;
            z-index: 3;
            max-height: 150px;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            padding: 5px 0;
            border: 1px solid #ececec;
            li {
              line-height: 30px;
              padding: 0 15px;
              &:active {
                background: #ececec;
              }
            }
          }
        }
      }
      input {
        width: 100%;
        height: 30px;
        font-size: 14px;
        background: transparent;
        &::-webkit-input-placeholder {
          color: #CCCDCF;
        }
      }
      &.phone {
        padding-left: 74px;
      }
      &.vcode {
        padding-right: 92px;
        .vcode-btn {
          width: 92px;
          right: 0;
          padding-left: 0;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 28px;
            width: 1px;
            background: #eaeaea;
            top: 7px;
          }
          input[type='button'] {
            width: 100%;
            text-align: center;
            color: #303137;
            font-size: 14px;
            &:disabled {
              color: #969696;
            }
          }
        }
      }
      &.phone .area-code, &.vcode .vcode-btn {
        position: absolute;
        top: 0;
        height: 45px;
        line-height: 45px;
      }
      .area-code {
        width: 74px;
        left: 0;
        padding-left: 15px;
        &::after {
          border-color: #EDEEF0;
        }
        span {
          font-size: 14px;
          color: #303137;
          margin-right: 8px;
        }
        img {
          width: 6px;
          height: 4px;
          vertical-align: middle;
          position: absolute;
          right: 10px;
          top: 21px;
        }
      }
      .phone-num, .code, &.invite-code {
        padding: 0 14px;
        height: 45px;
        padding-top: 8px;
      }
      &.invite-code input {
        position: relative;
        z-index: 1;
      }
      .error-info {
        position: absolute;
        top: 44px;
        left: 0;
        line-height: 23px;
        color: #F95453;
        font-size: 12px;
      }
    }
  }
</style>
<style lang="scss">
  .sign-tip-toast {
    .weui-toast.weui-toast_text {
      border-radius: 8px;
      padding: 25px 0;
    }
    .sign-tip {
      display: block;
      text-align: center;
      img {
        width: 40px;
        height: 28px;
        display: block;
        margin: 0 auto 24px;
      }
      span {
        color: #fff;
        font-size: 16px;
      }
    }

  }
</style>
