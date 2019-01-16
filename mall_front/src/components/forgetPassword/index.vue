<template>
  <div class="f-container">
    <h2>{{ headTitle }}</h2>
    <div class="f-content" v-if="resetStatus">
      <ul>
        <li>
          <span class="f-title">手机号</span>
          <input type="text" class="f-input" placeholder="请输入手机号码" v-model="resetList.phone" @focus="resetType()" style="width: 73%">
          <div class="f-error" v-if="errorShow.phone">{{ errorHintList.phone }}</div>
        </li>
        <li>
          <span class="f-title">新密码</span>
          <input type="password" class="f-input" placeholder="请输入6-18位字母及数字" v-model="resetList.password"
                 @focus="resetType()" style="width: 73%">
          <div class="f-error" v-if="errorShow.password">{{ errorHintList.password }}</div>
        </li>
        <li>
          <span class="f-title">确认新密码</span>
          <input type="password" class="f-input" placeholder="请输入6-18位字母及数字" v-model="resetList.confirmPassword"
                 @focus="resetType()" style="width: 73%">
          <div class="f-error" v-if="errorShow.confirmPassword">{{ errorHintList.confirmPassword }}</div>
        </li>
        <li>
          <span class="f-title">短信验证</span>
          <input type="text" class="f-input" style="width: 165px;" placeholder="请输入6位数字验证码"
                 v-model="resetList.verificationCode" @focus="resetType()">
          <button class="f-verify" v-if="sendmsg.status" @click="sendMsg()">发送验证码</button>
          <button class="f-verify" :class="{'verifyActive': !sendmsg.status}" v-else>{{ sendmsg.text }}s后重发</button>
          <div v-show="validate.reg" class="f-verify-img">
            <div id="resetCaptcha"></div>
          </div>
          <div class="f-error" v-if="errorShow.verificationCode">{{ errorHintList.verificationCode }}</div>
        </li>
        <li style="padding: 0">
          <button class="f-resetBtn" @click="resetSubmit()">重置密码</button>
          <div class="f-error" v-if="submitError.show">{{ submitError.text }}</div>
        </li>
      </ul>
    </div>
    <div class="f-content" v-else>
      <div class="f-success-icon">
        <div class="f-success-con">
          <img src="../../assets/images/icon_success_big.png" alt="">
          <h4>密码重置成功</h4>
          <p>请使用新密码进行登录</p>
          <button @click="toLogin()">立即登录</button>
        </div>
      </div>
    </div>
    <transition name="fade" >
      <div class="out" v-if="outing"></div>

    </transition>

  </div>
</template>
<script>
  import {bus} from '../../assets/js/config'
  import {allMethods} from '../../assets/js/config'
  import {sendResetPassword} from '../../service/forget-password-api'
  export default {
    data () {
      return {
        outing: false,
        resetStatus: true,
        headTitle: '重置密码',
        resetList: {
          phone: '',
          password: '',
          confirmPassword: '',
          verificationCode: ''
        },
        sendmsg: {
          status: true,
          text: 60
        },
        errorHintList: {
          phone: '',
          password: '',
          confirmPassword: '',
          verificationCode: ''
        },
        validate: {
          reg: false
        },
        errorShow: {
          phone: false,
          password: false,
          confirmPassword: false,
          verificationCode: false
        },
        submitError: {
          text: '',
          show: false
        }
      }
    },
    methods: {
      toLogin () {
        bus.$emit('islogin', 'login', '/');
      },
      resetType () {
        this.errorShow.phone = false;
        this.errorShow.password = false;
        this.errorShow.confirmPassword = false;
        this.errorShow.verificationCode = false;
        this.submitError.show = false;
      },
      sendMsg () {
        if (this.resetList.phone === '') {
          this.errorHintList.phone = '手机号不能为空'
          this.errorShow.phone = true
          return
        }else if (!allMethods.phoneReg.test(this.resetList.phone)) {
          this.errorHintList.phone = '手机号码格式错误'
          this.errorShow.phone = true
          return
        } else if (this.resetList.password === '') {
          this.errorHintList.password = '密码不能为空'
          this.errorShow.password = true
          return false
        } else if (!allMethods.passwordReg.test(this.resetList.password)) {
          this.errorHintList.password = '密码格式不正确'
          this.errorShow.password = true
          return
        } else if (this.resetList.confirmPassword === '') {
          this.errorHintList.confirmPassword = '密码不能为空'
          this.errorShow.confirmPassword = true
          return
        } else if (this.resetList.confirmPassword !== this.resetList.password) {
          this.errorHintList.confirmPassword = '两次密码输入不一致'
          this.errorShow.confirmPassword = true
          return
        }
        this.validate.reg = true;
        let vm = this;
        if (allMethods.phoneReg.test(this.resetList.phone)) {
          vm.outing = true
          initNECaptcha({
            captchaId: 'fd7d9c65701c4b33a0a73740591119b3',
            element: '#resetCaptcha',
            mode: 'embed',
            width: 320,
            onVerify: function (err, data) {
              if (!err) {
                vm.validate.reg = false
                vm.outing = false
                vm.$http.post('/user/sendSms', {phone: vm.resetList.phone, validate: data.validate, sendType: 2})
                  .then(function (reg) {
                    // todo验证码发送失败
                    data = reg.data;

                    if (data.code == 1000) {
                      vm.sendmsg.status = false
                      vm.timer = setInterval(function () {
                        if (vm.sendmsg.text === 1 || vm.sendmsg.text < 1) {
                          clearInterval(vm.timer)
                          vm.sendmsg.status = true
                          vm.sendmsg.text = 60
                        }
                        vm.sendmsg.text--
                      }, 1000)
                    } else {
                      vm.submitError.show = true;
                      vm.submitError.text = data.msg;
                    }
                  })
              }
            }
          })
        } else {
          this.errorShow.phone = true;
          this.errorHintList.phone = '手机号码格式错误'
        }
      },
      resetSubmit () {
        this.resetType();
        if (this.resetList.verificationCode === '') {
          this.errorHintList.verificationCode = '验证码不能为空'
          this.errorShow.verificationCode = true
          return
        } else if (!allMethods.captchaReg.test(this.resetList.verificationCode)) {
          this.errorHintList.verificationCode = '验证码输入有误'
          this.errorShow.verificationCode = true
          return
        }
        sendResetPassword(this.resetList.phone, this.resetList.password, this.resetList.verificationCode)
          .then((res) => {
            if (Number(res.data.code) === 1000) {
              this.resetStatus = false;
              this.headTitle = '密码找回成功';
            } else {
              try{
                let obj = eval('(' + res.data.msg + ')');
                this.errorHintList.verificationCode = JSON.parse(res.data.msg).phone
              }
              catch(e){
                this.errorHintList.verificationCode = res.data.msg
              }
              this.errorShow.verificationCode = true
            }
          })
      }
    },
    watch: {
      href (val) {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .out {
    display: block;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  #resetCaptcha {
    display: block;
    z-index: 9999;
    width: 320px;
    height: 215px;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    margin:auto;
    right: 0;
  }

  .f-container {
    width: 651px;
    height: 536px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 60px;
    background: #FFFFFF;
    border: 1px solid #DFDFDF;
    border-radius: 8px;
    h2 {
      font-family: MicrosoftYaHei-Bold;
      font-size: 24px;
      font-weight: bold;
      color: #70CC52;
      text-align: center;
      padding: 30px 0;
      border-bottom: 4px solid #70CC52;
    }
    .f-content {
      width: 100%;
      ul {
        width: 411px;
        margin: 0 auto;
        li {
          width: 100%;
          height: 40px;
          position: relative;
          margin-top: 30px;
          .f-input {
            width: 100%;
            position: absolute;
            left: 0;
            border: 1px solid #DDDDDD;
            border-radius: 4px;
            padding-left: 100px;
            height: 36px;
          }
          .f-input:focus {
            border: 1px solid #70CC52;
          }
          .f-title {
            position: absolute;
            left: 10px;
            top: 13px;
            z-index: 99;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #333333;
          }
          .f-verify {
            position: absolute;
            top: 0;
            right: 9px;
            width: 127px;
            height: 40px;
            background: #70CC52;
            border-radius: 4px;
            border: 0 none;
            color: #fff;
            cursor: pointer;
            outline: none;
          }
          .f-resetBtn {
            width: 98%;
            height: 40px;
            background: #70CC52;
            border: 0 none;
            outline: none;
            color: #fff;
            cursor: pointer;
            font-family: STHeitiSC-Medium;
            font-size: 18px;
            border-radius: 4px;
          }
          .f-error {
            position: absolute;
            left: 3px;
            top: 46px;
            color: #FF4949;
            z-index: 100;
            font-size: 12px;
          }
          .verifyActive {
            background: #D4D4D4;
          }
          .f-verify-img {
            position: absolute;
            top: -50px;
            right: -400px;
          }
        }
      }
      .f-success-icon {
        width: 100%;
        height: 100%;
        .f-success-con {
          width: 140px;
          margin: 0 auto;
          margin-top: 105px;
          button{
            cursor: pointer;
          }
          img {
            margin-left: 30px;
          }
          h4 {
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            color: #333333;
            text-align: center;
            font-weight: bold;
            padding: 20px 0 10px 0;
          }
          p {
            font-size: 14px;
            color: #999;
          }
          button {
            width: 103px;
            height: 36px;
            background: #70CC52;
            border-radius: 4px;
            border: 0 none;
            outline: none;
            margin: 50px 0 0 18px;
            font-size: 18px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
