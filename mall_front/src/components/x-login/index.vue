<template>
  <div class="pageption">
    <div v-if="!registerProtocol&&!creditProtocol" class="option_inner"
         :class="{'login_content':pageStatus==='login','reg_content':pageStatus==='reg'}">
      <div class="option_wrap">
        <div class="black_shade" v-if="regCode"></div>
        <div class="login_title">
          <div class="close" @click="changePageStatus('home','close')">
            <span></span>
            <span></span>
          </div>
          <div class="login_option opt pointer" :class="{'active':pageStatus==='login'}"
               @click="changePageStatus('login')">登录
          </div>
          <div class="reg_option opt pointer" :class="{'active':pageStatus==='reg'}" @click="changePageStatus('reg')">注册
          </div>

        </div>
        <div class="login_c" v-if="pageStatus==='login'">
          <div class="input_box" :class="{'active':status.phone,'error':error.phone}">
            <div class="text">手机号</div>
            <input type="text" @focus="changeStatus('phone',true)" @blur="changeStatus('phone',false)"
                   v-model="submit.phone" placeholder="请输入手机号码">
            <div class="error_text" v-if="error.phone" v-html="errortext.phone"></div>
          </div>
          <div class="input_box" :class="{'active':status.password,'error':error.password}">
            <div class="text">密码</div>
            <input type="password" @focus="changeStatus('password',true)" @keydown="loginKeyOption($event)"
                   @blur="changeStatus('password',false)"
                   v-model="submit.password" placeholder="请输入6-18位字母及数字">
            <div class="error_text" v-if="error.password" :class="{'error':error.password}"
                 v-html="errortext.password"></div>
          </div>
          <div v-show="validate.login">
            <div id="captcha"></div>
          </div>
          <div class="other_option">
            <span class="pointer" @click="changePageStatus('reg')">注册账号</span>
            <span></span>
            <span class="pointer" @click="resetPsd">忘记密码</span>
          </div>
          <div class="x_btn pointer" @click="loginAccount">登录</div>
          <div class="regErrText" v-html="callError.loginText" v-if="callError.loginStatus"></div>
        </div>
        <div class="reg_c" v-if="pageStatus==='reg'">
          <div class="input_box" :class="{'active':regstatus.phone,'error':regerror.phone}">
            <div class="text">手机号</div>
            <input type="text" @focus="changeregStatus('phone',true)" @blur="changeregStatus('phone',false)"
                   v-model="regsubmit.phone" placeholder="请输入手机号码">
            <div class="error_text" v-if="regerror.phone" v-html="regerrortext.phone"></div>
          </div>
          <div class="input_box msg" :class="{'active':regstatus.captcha,'error':regerror.captcha}">
            <div class="text">验证码
            </div>
            <input type="text" @focus="changeregStatus('captcha',true)" @blur="changeregStatus('captcha',false)"
                   v-model="regsubmit.captcha" placeholder="请输入6位验证码">
            <div class="error_text" v-if="regerror.captcha" v-html="regerrortext.captcha"></div>
            <transition name="fade">
              <div class="sendmsg pointer" v-if="sendmsg.status" @click="sendMsg">发送验证码
                <div v-show="validate.reg">
                  <div id="captcha2"></div>
                </div>
              </div>
              <div class="sendmsg no" v-else>{{sendmsg.text}}s后重发</div>
            </transition>

          </div>
          <div class="input_box" :class="{'active':regstatus.password,'error':regerror.password}">
            <div class="text">密码</div>
            <input type="password" @focus="changeregStatus('password',true)" @blur="changeregStatus('password',false)"
                   v-model="regsubmit.password" placeholder="请输入6-18位字母及数字">
            <div class="error_text" v-if="regerror.password" :class="{'error':regerror.password}"
                 v-html="regerrortext.password"></div>
          </div>

          <div class="input_box" :class="{'active':regstatus.company,'error':regerror.company}">
            <div class="text">公司全称</div>
            <input type="text" @focus="changeregStatus('company',true)" @blur="checkCompany('company',false)"
                   v-model="regsubmit.company" placeholder="请输入您公司的全称">
            <div class="error_text" v-if="regerror.company" :class="{'error':regerror.company}"
                 v-html="regerrortext.company"></div>
          </div>
          <div class="agree_box">
            <transition name="fade">
              <div class="agree_select " v-if="regstatus.agree" @click="agree"><img
                src="../../assets/images/select.png" alt=""></div>
              <div class="agree_select  no" v-else @click="agree"><img src="../../assets/images/noselect.png" alt="">
              </div>
            </transition>
            <div class="text">
              <span>注册即同意</span>
              <span class="green_text pointer" @click="openRegister">《小虫快租服务协议》</span>
              <span class="green_text pointer" @click="creditProtocol=true">《征信调查授权协议》</span>
            </div>
          </div>
          <div class="x_btn pointer" @click="regAccount">注册</div>
          <div class="regErrText" v-html="callError.regText" v-if="callError.regStatus"></div>

        </div>
      </div>
    </div>
    <protocol v-if="registerProtocol" :type="'register'" @listenOption="close"></protocol>
    <protocol v-if="creditProtocol" :type="'credit'" @listenOption="close"></protocol>

  </div>
</template>
<script>
  import {allMethods} from '../../assets/js/config'
  import protocol from '../x-protocol'
  import {bus} from '../../assets/js/config';

  export default {
    name: 'pageption',
    data () {
      return {
        regCode: false,
        registerProtocol: false,
        creditProtocol: false,
        timer: '',
        optionStatus: {
          login: false,
          reg: false
        },
        sendmsg: {
          status: true,
          text: 60
        },
        errortext: {
          phone: '手机号码格式错误',
          password: '请输入6-18位字母及数字'
        },
        status: {
          phone: false,
          password: false
        },
        error: {
          phone: false,
          password: false
        },
        submit: {
          phone: '',
          password: ''
        },
        regerrortext: {
          phone: '手机号码格式错误',
          password: '请输入6-18位字母及数字',
          captcha: '短信验证码不允许为空',
          company: ''
        },
        regstatus: {
          phone: false,
          password: false,
          captcha: false,
          company: false,
          agree: true
        },
        regerror: {
          phone: false,
          password: false,
          captcha: false,
          company: false,
          companyAdvance: true
        },
        regsubmit: {
          phone: '',
          password: '',
          captcha: '',
          company: ''
        },
        validate: {
          reg: false,
          login: false,
          loginValidate: ''
        },
        callError: {
          loginStatus: false,
          regStatus: false,
          loginText: '',
          regText: '',
        }
      }
    },
    props: {
      pageStatus: String,
      memory: String
    },
    components: {
      protocol: protocol
    },
    methods: {
      loginKeyOption(e){
        if (e.keyCode === 13) {
          this.changeStatus('password', false)
          this.loginAccount()
        }
      },
      resetPsd(){
        this.$router.push({path: '/resetPassword'})
        this.$emit('listenToChild', 'home')
      },
      close(){
        this.registerProtocol = false;
        this.creditProtocol = false;
      },
      openRegister(){
        this.registerProtocol = true
      },
      agree () {
        this.regstatus.agree = !this.regstatus.agree
        this.resetAllError()
      },
      resetAllError(){
        this.callError.regStatus = false
      },
      sendMsg () {
        var vm = this;
        if (!this.regsubmit.phone) {
          this.regerror.phone = true;
          this.regerrortext.phone = '手机号码不允许为空'
          return
        }
        if (this.regerror.phone) {
          return
        }

        this.validate.reg = true;

        if (allMethods.phoneReg.test(this.regsubmit.phone)) {
          vm.regCode = true

          initNECaptcha({
            captchaId: 'fd7d9c65701c4b33a0a73740591119b3',
            element: '#captcha2',
            mode: 'embed',
            width: 320,
            onVerify: function (err, data) {
              if (!err) {
                vm.validate.reg = false

                vm.$http.post('/user/sendSms', {phone: vm.regsubmit.phone, validate: data.validate, sendType: 1})
                  .then(function (reg) {
                    // todo验证码发送失败
                    vm.regCode = false
                    var data = reg.data;
                    if (Number(data.code) === 1000) {
                      vm.sendmsg.status = false
                      vm.timer = setInterval(function () {
                        if (vm.sendmsg.text === 1 || vm.sendmsg.text < 1) {
                          clearInterval(vm.timer)
                          vm.sendmsg.status = true
                          vm.sendmsg.text = 60
                        }
                        vm.sendmsg.text--
                      }, 1000)
                    } else if (Number(data.code) === 2006) {  //请输入正确格式的手机号
                      vm.regerror.phone = true;
                      vm.regerrortext.phone = '请输入正确格式的手机号'
                    } else if (Number(data.code) === 2022) {  //该手机号已注册
                      vm.regerror.phone = true;
                      vm.regerrortext.phone = '该手机号已注册'
                    } else {

                    }


                  })
              }
            }
          })
        } else {
          this.regerror.phone = true;
          this.regerrortext.phone = '手机号码格式错误'
        }

      },
      checkRegInput(){
        if (!this.regsubmit.phone) {

          this.regerror.phone = true;
          this.regerrortext.phone = '手机号码不允许为空'
          return false
        }

        if (!allMethods.phoneReg.test(this.regsubmit.phone)) {

          this.regerror.phone = true;
          this.regerrortext.phone = '手机号码格式错误'
          return false
        }

        if (!this.regsubmit.captcha && !allMethods.captchaReg.test(this.regsubmit.captcha)) {
          this.regerror.captcha = true;
          this.regerrortext.captcha = '验证码输入有误'
          return false
        }

        if (!this.regsubmit.password) {
          this.regerror.password = true;
          this.regerrortext.password = '密码不允许为空'
          return false
        }

        if (!allMethods.passwordReg.test(this.regsubmit.password)) {
          this.regerror.password = true;
          this.regerrortext.password = '密码需为6-18位且同时包含字母数字'
          return false
        }


        if (!this.regsubmit.company) {
          this.regerror.company = true;
          this.regerrortext.company = '公司全称不允许为空'
          return false
        }

        if (!allMethods.ChineseReg.test(this.regsubmit.company)) {
          this.regerror.company = true;
          this.regerrortext.company = '公司全称输入有误'
          return false
        }

        if (!this.regerror.companyAdvance) {
          this.regerror.company = true;
          return false
        }

        if (!this.regstatus.agree) {
          //todo 未同意
          this.callError.regStatus = true;
          this.callError.regText = '未同意《小虫快租服务协议》';

          return false
        }
        return true
      },
      regAccount () {
        var status = this.checkRegInput()
        var vm = this

        if (status) {
          var arr = {
            phone: this.regsubmit.phone,
            captcha: this.regsubmit.captcha,
            password: this.regsubmit.password,
            company: this.regsubmit.company
          }

          this.$http.post('/user/register', arr).then(function (reg) {


            var data = reg.data

            if (Number(data.code) === 1000) {
              localStorage.setItem('xckz_mall', data.data.token)
              localStorage.setItem('xckz_mall_status', data.data.flag)
              localStorage.setItem('xckz_mall_companyName', data.data.companyName)
              vm.$emit('listenOption', 'reg')

            } else if (Number(data.code) === 2004) {
              var msg = JSON.parse(data.msg)
              if (msg['phone']) {
                vm.regerror.phone = true;
                vm.regerrortext.phone = msg['phone']
              }
              if (msg['password']) {
                vm.regerror.password = true;
                vm.regerrortext.password = msg['password']
              }
              if (msg['captcha']) {
                vm.regerror.captcha = true;
                vm.regerrortext.captcha = msg['captcha']
              }
              if (msg['company']) {
                vm.regerror.company = true;
                vm.regerrortext.company = msg['company']
              }

            } else if (Number(data.code) === 2008) {
              vm.regerror.captcha = true;
              vm.regerrortext.captcha = data.msg
            } else if (Number(data.code) === 2009) {
              vm.regerror.captcha = true;
              vm.regerrortext.captcha = data.msg
            } else if (Number(data.code) === 4001) {
              this.callError.regStatus = true;
              this.callError.regText = data.msg
            } else if (Number(data.code) === 2028) {
              this.callError.regStatus = true;
              this.callError.regText = data.msg
            } else {
              this.callError.regStatus = true;
              this.callError.regText = data.msg
            }
          })
        }
      },
      checkCompany(text, status){
        if (status) {
          this.regerror[text] = false
        }
        this.regstatus[text] = status
        var vm = this
        if (allMethods.ChineseReg.test(this.regsubmit.company)) {
          this.$http.post('common/judgeCompany', {companyName: this.regsubmit.company}).then(function (data) {
            data = data.data
            if (Number(data.code) === 1000) {
              if (data.data) {//公司名称已注册
                vm.regerror.companyAdvance = false
                vm.regerrortext.company = '公司名称已注册'
              } else {//可以注册
                vm.regerror.companyAdvance = true
                vm.regerrortext.company = ''
              }
            } else if (Number(data.code) === 2012) {//  公司名称不正确
              vm.regerror.companyAdvance = false
              vm.regerrortext.company = data.msg
            } else {
              vm.regerror.companyAdvance = false
              vm.regerrortext.company = data.msg
            }
          })
        }


      },
      changeregStatus (text, status) {
        if (status) {
          this.regerror[text] = false
          this.callError.regStatus = false
        }
        this.regstatus[text] = status
      },
      changeStatus (text, status) {
        if (status) {
          this.error[text] = false
          this.callError.loginStatus = false
        }
        this.status[text] = status
      },
      changePageStatus (text, option) {
        this.initSubmit()
        if (this.memory === 'returnHome' && option && option === 'close') {
          this.$router.push({path: '/'})
        }
        if (text === this.pageStatus) {
          return
        }
        this.$emit('listenToChild', text)
      },
      loginAccount () {
        var status = this.checkInput()
        if (status) {
          var arr = {
            phone: this.submit.phone,
            password: this.submit.password,
            validate: this.validate.loginValidate
          }
          var vm = this

          this.$http.post('/user/login', arr).then(function (reg) {
            var data = reg.data;

            if (Number(data.code) === 2028 || Number(data.code) === 2018) {
              vm.validate.login = true
              vm.callError.loginText = data.msg
              vm.callError.loginStatus = true
              initNECaptcha({
                captchaId: 'fd7d9c65701c4b33a0a73740591119b3',
                element: '#captcha',
                mode: 'float',
                width: 320,
                onVerify: function (err, data) {
                  if (!err) {
                    vm.validate.login = false
                    vm.validate.loginValidate = data.validate
                    vm.loginAccount()
                  }
                }
              })
            } else if (Number(data.code) === 1000) {
//              vm.callError.loginText = data.msg
//              vm.callError.loginStatus = true

              localStorage.setItem('xckz_mall', data.data.token)
              localStorage.setItem('xckz_mall_status', data.data.flag)
              localStorage.setItem('xckz_mall_companyName', data.data.companyName)
              vm.$emit('listenOption', 'login')
              bus.$emit('addshop', '')
            } else {
              vm.callError.loginStatus = true
              vm.callError.loginText = data.msg
            }

          })
        }
      },
      checkInput () {
        var phone = this.submit.phone
        var password = this.submit.password
        var phoneReg = allMethods.phoneReg
        var passwordReg = allMethods.passwordReg

        if (!phone) {
          this.errortext.phone = '手机不允许为空'
          this.error.phone = true
          return false
        }
        if (!password) {
          this.errortext.password = '密码不允许为空'
          this.error.password = true
          return false
        }

        if (!phoneReg.test(phone)) {
          this.errortext.phone = '手机号码格式错误'
          this.error.phone = true
          return false
        }

        if (!passwordReg.test(password)) {
          this.errortext.password = '请输入6-18位字母及数字'
          this.error.password = true
          return false
        }
        return true
      },
      initSubmit(){
        this.submit.phone = ''
        this.submit.password = ''
        this.regsubmit.phone = ''

        this.regsubmit.password = ''
        this.regsubmit.captcha = ''
        this.regsubmit.company = ''
        this.regstatus.agree = true
      }
    },
    created () {
      this.initSubmit()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .black_shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .35);
    z-index: 2;
  }

  .option_wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #captcha {
    margin-top: 10px;
    position: relative;
    top: 20px;
    .yidun {
      width: 354px;
    }
  }

  #captcha2 {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    width: 320px;
    height: 215px;
  }

  .agree_box {
    width: 400px;
    height: 64px;
    line-height: 64px;
    font-size: 14px;
    color: #4B4B4B;
    margin-left: 80px;
    .agree_select {
      width: 13px;
      height: 13px;
      float: left;
      margin-right: 13px;
      position: relative;
      margin-top: 25px;
      cursor: pointer;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      float: left;
    }
  }

  .x_btn {
    background: #6ECC66;
    border-radius: 4px;
    text-align: center;
    width: 354px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    color: #fff;
    font-size: 18px;
  }

  .other_option {
    width: 137px;
    height: 19px;
    margin: 0 auto;
    margin-top: 45px;
    margin-bottom: 27px;
    position: relative;
    span:first-child {
      display: block;
      float: left;
      color: #333333;
      font-size: 14px;
      line-height: 19px;
    }
    span:nth-of-type(2) {
      background: #FFDBDB;
      width: 1px;
      height: 15px;
      display: block;
      position: absolute;
      left: 68px;
      top: 2px;
    }
    span:last-child {
      line-height: 19px;
      display: block;
      float: right;
      color: #333333;
      font-size: 14px;
    }
  }

  .input_box {
    width: 354px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
    .text {
      width: 78px;
      height: 100%;
      font-size: 14px;
      color: #333333;
      float: left;
      line-height: 40px;
      padding-left: 16px;
    }
    input {
      width: 250px;
      height: 38px;
      border: none;
      line-height: 38px;
      float: left;
      color: #333333;
    }
    .error_text {
      font-size: 12px;
      position: absolute;
      top: 46px;
      color: #FF4949;
      left: 0;
    }
  }

  .sendmsg {
    width: 96px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background: #6ECC66;
    color: #ffffff;
    border-radius: 4px;
    position: absolute;
    left: 260px;
    cursor: pointer;
  }

  .sendmsg.no {
    width: 96px;
    height: 40px;
    background: #D4D4D4;
    color: #ffffff;
    border-radius: 4px;
  }

  .input_box.msg {
    width: 251px;
    margin-left: 79.5px;
    input {
      width: 150px;
    }
  }

  .input_box:hover {
    border: 1px solid #dddddd;
  }

  .input_box.active {
    border: 1px solid #6ECC66;
  }

  .input_box.error {
    border: 1px solid #FF4949;
  }

  .pageption {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .35);
    display: table;
  }

  .option_inner {
    width: 515px;
    height: 450px;
    background: #fff;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    /*border: 1px solid #D9D9D9;*/
  }

  .option_inner.reg_content {
    height: 552px;
  }

  .login_title {
    width: 100%;
    height: 90px;
    line-height: 90px;
    position: relative;

    .opt {
      width: 50%;
      height: 51px;
      font-size: 24px;
      line-height: 38px;
      color: #999999;
      border-bottom: 1px solid #fff;
      transition: border ease .5s, color ease .5s;
      position: absolute;
      bottom: 0;
      text-align: center;
    }
    .opt.active {
      color: #6ECC66;
      border-bottom: 1px solid #6ECC66;
    }
    .login_option {
      left: 0;
    }
    .reg_option {
      left: 50%;

    }
  }

  .close {
    width: 18px;
    height: 18px;
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    position: relative;
    cursor: pointer;

    span {
      width: 20px;
      height: 1px;
      display: block;
      position: absolute;
      display: block;
      background: rgba(0, 0, 0, .35);
      top: 8.5px;
    }

    span:first-child {
      transform: rotate(45deg);
    }
    span:last-child {
      transform: rotate(-45deg);
    }
  }

  .regErrText {
    width: 354px;
    margin: 0 auto;
    color: #FF4949;
    font-size: 12px;
    margin-top: 6px;
  }
</style>
