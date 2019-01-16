<template>
  <div class="invite">
    <div class="invitebox">
      <img src="../../assets/images/yaoqingzhuce_bg@2x.png" alt="">
      <div class="option-box">
        <div class="section">
          <input type="number" placeholder="手机号" v-model="loginForm.phone" name="phone"
                 v-validate="'required|phone'"
                 @focus="veeErrors.remove('phone')">
        </div>
        <div class="section two-item">
          <input type="number" placeholder="验证码" v-model="loginForm.code" name="code" v-validate="'required|code'"
                 @focus="veeErrors.remove('code')">
          <div class="send" v-if="!sendCodeDisabled" @click="sendCode">获取验证码</div>
          <div class="send end" v-else>{{sendCodeText}}</div>
        </div>
        <div class="section">
          <input type="text" placeholder="邀请码" v-model="inviteCode">
        </div>
        <div class="reg-btn" @click="signIn">立抢优惠</div>
      </div>
    </div>
    <toast v-model="err.text" type="text" v-if="err.status"></toast>
  </div>
</template>
<script>
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
          areaValue: '+86',
          code: '',
          inviteCode: '',
          codeToken: ''
        },
        sendCodeText: '获取验证码',
        sendCodeDisabled: false,
        loginLoading: false,
        timer: null,
        inviteCode: '',
        showTip: false,
        err: {
          status: false,
          text: ''
        }
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
      this.inviteCode = this.$route.query.inviteCode || '';
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
      signIn() {
        this.$validator.validateAll().then(res => {
          if (res) {
            return Promise.resolve();
          }
          const errMsg = this.veeErrors.items[0].msg;
          return Promise.reject({msg: errMsg});
        }).then(() => {
          let params = Object.assign(this.loginForm, {
            countryNum: this.loginForm.areaValue, inviteCode: this.inviteCode
          });
          return signApi.phoneLogin(params).then(res => {
            this.loginSuccessHandler(res);
          });
        }).catch(err => {
          errorHandler(err, this);
        });
      },
      sendCode() {
        this.$validator.validate('phone')
          .then(res => {
            if (res) {
              return Promise.resolve();
            }
            const errMsg = this.veeErrors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            let params = {
              account: this.loginForm.phone,
              type: VerifyCodeType.LOGIN

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
          });
      },
      loginSuccessHandler(res) {
        this.$store.commit(MutationTypes.LOGIN_IN, res);
        this.$vux.toast.show({
          type: 'text',
          text: '登录成功',
          position: 'middle'
        });
        this.$router.replace('/');
      }
    }
  };
</script>

<style lang="scss" scoped>
  input {
    -webkit-user-modify: read-write-plaintext-only;
  }

  img {
    pointer-events: none;
  }

  .invitebox {
    width: 100%;
    min-height: 100vh;
    background-color: #09102A;
    position: relative;
    > img {
      width: 100%;
      min-width: 100%;
    }
  }

  .reg-btn {
    text-align: center;
    width: 85%;
    height: 50px;
    background: #1092FF;
    border-radius: 50px;
    color: #fff;
    line-height: 50px;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 17px;
  }

  .section {
    width: 85%;
    margin: 0 auto;
    margin-bottom: 15px;
    background: #fff;
    height: 50px;
    border-radius: 5px;
    input {
      width: 100%;
      height: 18px;
      line-height: 18px;
      margin-top: 16px;
      float: left;
      text-indent: 10px;
      font-size: 16px;
    }
  }

  .section.two-item {
    input {
      width: 70%;
      float: left;
    }
    .send {
      width: 30%;
      float: left;
      position: relative;
      text-align: center;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      color: #1092FF;
      &::after {
        display: block;
        content: '';
        width: 1px;
        height: 100%;
        background: #ccc;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .send.end {
      color: #aaa;
    }
  }

  .option-box {
    width: 100%;
    position: absolute;
    top: 50%;
    z-index: 2;
  }
</style>
