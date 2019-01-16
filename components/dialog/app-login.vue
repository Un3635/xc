<template>
  <el-dialog :visible.sync="dialogshow" :width="'400px'" @close="$emit('update:show', false)" :custom-class="'dialog_login'" :before-close="bc" id="dialog_login">
    <div class="dialog_login-body" v-if="type1==0">
      <el-tabs v-model="type2" @tab-click="tabclick">
        <el-tab-pane label="手机号登录" name="0">
          <el-form>
            <el-form-item class="dialog_login-account">
              <div>
                <el-select slot="prepend" placeholder="请选择" v-model="slow.countryNum">
                  <el-option v-for="item in CountryNums" :key="item.id" :value="item.countryNum">
                    {{item.countryNameZh}} {{item.countryNum}}
                  </el-option>
                </el-select>
              </div>
              <div>
                <el-input placeholder="手机号码" v-model="slow.account" :maxlength=11 @focus="err=''"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-input v-model="slow.pwd" @focus="err=''" placeholder="8-18位字母及数字的密码" :type="pwdtype1" :maxlength="18" class="pwd">
                <i slot="suffix" @click="togglepwd1">1</i>
              </el-input>
            </el-form-item>
            <el-form-item class="dialog_login-err" v-if="err">
              <div class="dialog_login-err-content">{{err}}</div>
            </el-form-item>
            <el-form-item class="dialog_login-subbtn">
              <el-button @click="sub" :loading="sub_loading" :disabled="!slow.account||!slow.pwd">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="1">
          <el-form>
            <el-form-item>
              <el-input placeholder="邮箱" v-model="slow.account" @focus="err=''"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="slow.pwd" @focus="err=''" placeholder="8-18位字母及数字的密码" :type="pwdtype2" :maxlength="18" class="pwd">
                <i slot="suffix" @click="togglepwd2">1</i>
              </el-input>
            </el-form-item>
            <el-form-item class="dialog_login-err" v-if="err">
              <div class="dialog_login-err-content">{{err}}</div>
            </el-form-item>
            <el-form-item class="dialog_login-subbtn">
              <el-button @click="sub" :loading="sub_loading" :disabled="!slow.account||!slow.pwd">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="dialog_login-toquick">
        <span @click="type1=1;err=''">手机验证码登录</span>
        <span @click="gofindpwd">忘记密码</span>
        <!-- <a href="/findpwd">忘记密码?</a> -->
      </div>
    </div>
    <div class="dialog_login-body" v-if="type1==1">
      <div class="dialog_login-quicktitle">手机验证码登录</div>
      <el-form>
        <el-form-item class="dialog_login-account">
          <div>
            <el-select slot="prepend" placeholder="请选择" v-model="quick.countryNum">
              <el-option v-for="item in CountryNums" :key="item.id" :value="item.countryNum">
                {{item.countryNameZh}} {{item.countryNum}}
              </el-option>
            </el-select>
          </div>
          <div>
            <el-input placeholder="手机号码" v-model="quick.account" :maxlength=11 @focus="err=''"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dialog_login-code">
          <div>
            <el-input placeholder="6位数字验证码" v-model="quick.code" :maxlength=6 @focus="err=''"></el-input>
          </div>
          <div>
            <el-button @click="getcode" :loading="wy_loading" :disabled="!quick.account||time>0">{{time==0?'发送验证码':time+'s'}}</el-button>
          </div>
        </el-form-item>
        <el-form-item class="dialog_login-err" v-if="err">
          <div class="dialog_login-err-content">{{err}}</div>
        </el-form-item>
        <el-form-item class="dialog_login-subbtn">
          <el-button @click="sub" :loading="sub_loading" :disabled="!quick.code||!quick.account">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="dialog_login-toslow" @click="type1=0;type2=0;err=''">帐号登录</div>
    </div>
    <div class="dialog_login-footer">
      没有帐号?
      <a @click="goreg">注册</a>
    </div>
    <div id="dialog_login_captcha"></div>
  </el-dialog>
</template>
<script>
  import {
    getCountryNums,
    getSendCode,
    telLogin,
    Login,
    myAccount
  } from "../../pages/mine/js/mineapi.js";
  import { wy_captcha } from "../../service/wy-captcha.js";
  import regex from "../../service/regex";
  import togglepwdtype from "../../mixin/togglepwdtype.js";
  export default {
    props: {
      show: {
        type: Boolean
      }
    },
    mixins: [togglepwdtype],
    mounted() {
      getCountryNums().then(res => {
        this.CountryNums = res;
      });
    },
    data() {
      return {
        dialogshow: this.show,
        CountryNums: [],
        err: "",
        time: 0,
        sub_loading: false,
        wy_loading: false,
        quick: {
          countryNum: "+86",
          account: "",
          code: ""
        },
        slow: {
          countryNum: "+86",
          account: "",
          code: "",
          pwd: ""
        },
        type1: "0", //登录方式 0账户 1 快捷
        type2: "0" //账户登录方式,0手机,1邮箱,
      };
    },
    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
        this.dialogshow = false;

        this.err = "";

        this.sub_loading = false;
        this.wy_loading = false;
        this.quick = {
          countryNum: "+86",
          account: "",
          code: ""
        };
        this.slow = {
          countryNum: "+86",
          account: "",
          code: "",
          pwd: ""
        };
        this.type1 = "0"; //登录方式 0账户 1 快捷
        this.type2 = "0"; //账户登录方式,0手机,1邮箱,
      },
      timeStart() {
        var that = this;
        (function timein() {
          if (that.time <= 0) {
            that.time = 60;
          }
          setTimeout(() => {
            that.time--;
            if (that.time > 0) {
              timein();
            }
          }, 1000);
        })();
      },
      getcode() {
        if (!regex.is_phone.test(this.quick.account)) {
          this.err = "请输入正确的手机号";
          return;
        }
        this.wy_loading = true;
        wy_captcha({
          el: "#dialog_login_captcha"
        })
          .then(data =>
            getSendCode(
              {
                captchaCode: data.validate,
                type: 31,
                ...this.quick
              },
              false
            )
          )
          .then(() => this.$message("验证码已发送"))
          .then(() => this.timeStart())
          .catch(err => (this.err = err.msg))
          .finally(() => (this.wy_loading = false));
      },
      sub() {
        if (this.type1 == 1) {
          if (!regex.is_phone.test(this.quick.account)) {
            this.err = "请输入正确的手机号";
            return;
          }
          this.sub_loading = true;
          telLogin(this.quick)
            .then(res => {
              this.$store.commit("SET_TOKEN", res.token);
              myAccount().then(res => {
                this.do_bc();
                  this.$store.commit("SET_USERINFO", res);
                if (this.$route.name == "reg") {
                  this.$router.replace({
                    path: "/"
                  });
                } else {
                  this.$router.replace({
                    path: "/loading",
                    query: {
                      topath: this.$route.fullPath
                    }
                  });
                }
              });
            })
            .catch(err => (this.err = err.msg))
            .finally(() => (this.sub_loading = false));
        } else {
          if (this.type2 == 0) {
            if (!regex.is_phone.test(this.slow.account)) {
              this.err = "请输入正确的手机号";
              return;
            }
          } else {
            if (!regex.is_email.test(this.slow.account)) {
              this.err = "请输入正确的邮箱地址";
              return;
            }
          }
          this.sub_loading = true;
          wy_captcha({ el: "#dialog_login_captcha" })
            .then(data => {
              var type = this.type2 * 1 + 11;
              var captchaCode = data.validate;
              if (this.type2 == 1) {
                var countryNum = "";
              }
              return Login({
                ...this.slow,
                type,
                captchaCode
              });
            })
            .then(res => {
             this.$store.commit("SET_TOKEN", res.token);
              myAccount().then(res => {
                this.$store.commit("SET_USERINFO", res);
                this.do_bc();
                window.gio('setUserId', this.$store.state.token.split("_")[0]);
                if (this.$route.name == "reg") {
                  this.$router.replace({
                    path: "/"
                  });
                } else {
                  this.$router.replace({
                    path: "/loading",
                    query: {
                      topath: this.$route.fullPath
                    }
                  });
                }
              });
            })
            .catch(err => (this.err = err.msg))
            .finally(() => (this.sub_loading = false));
        }
      },
      tabclick() {
        this.quick = {
          countryNum: "+86",
          account: "",
          code: ""
        };

        this.slow = {
          countryNum: "+86",
          account: "",
          code: "",
          pwd: ""
        };

        this.err = "";
      },
      gofindpwd() {
        this.do_bc();
        this.$router.push({
          path: "/findpwd",
          query: { from: this.$route.fullPath }
        });
      },
      goreg() {
        this.do_bc();
        this.$router.push({
          path: "/reg",
          query: { from: this.$route.fullPath }
        });
      }
    },
    watch: {
      show() {
        this.dialogshow = this.show;
      }
    }
  };
</script>
<style lang="scss">
  #dialog_login {
    .dialog_login {
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 50px 32px 0 32px;
      }
      &-body {
        margin-bottom: 70px;
      }
      &-footer {
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        color: #505050;
        background: #f9f9f9;
        margin: 0 -32px;
        a {
          color: #4f89eb;
        }
      }
      &-quicktitle {
        font-size: 20px;
        color: #222222;
        line-height: 28px;
        margin-bottom: 40px;
        font-weight: bolder;
      }
      &-account {
        .el-form-item__content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          & > div:first-of-type {
            width: 70px;
            margin-right: 12px;
            .el-input__inner {
              padding: 0 15px 0 0;
              text-align: center;
            }
          }
          & > div:last-of-type {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
        }
      }
      &-code {
        .el-form-item__content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          & > div:first-of-type {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
          & > div:last-of-type {
            width: 90px;
            margin-left: 12px;
            button {
              padding: 0;
              text-align: center;
              height: 100%;
              width: 100%;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
      }
      &-subbtn {
        margin-top: 40px;
        button {
          width: 100%;
        }
      }
      &-err {
        margin-bottom: 15px;
        margin-top: -7px;
        &-content {
          background: rgba(249, 84, 83, 0.1);
          border: 1px solid #f95453;
          border-radius: 4px;
          font-size: 12px;
          line-height: 17px;
          color: #fa322b;
          padding: 7px 0;
          text-align: center;
        }
        & + .dialog_login-subbtn {
          margin-top: 0;
        }
      }
      &-toslow {
        margin-top: -6px;
        font-size: 13px;
        color: #888888;
        line-height: 18px;
        cursor: pointer;
      }
      &-toquick {
        margin-top: -6px;
        font-size: 13px;
        color: #888888;
        line-height: 18px;
        cursor: pointer;
        span:last-of-type {
          float: right;
        }
      }

      //pwd
      .pwd {
        input[type="password"] + .el-input__suffix {
          width: 15px;
          background-image: url("../../assets/images/142/yingchang_hdzw@3x.png");
          background-repeat: no-repeat;
          background-size: 15px auto;
          background-position: center;
          cursor: pointer;
          display: block;
          i {
            color: transparent;
          }
        }
        input[type="text"] + .el-input__suffix {
          width: 15px;
          background-image: url("../../assets/images/142/xianshi_denglu@3x.png");
          background-repeat: no-repeat;
          background-size: 15px auto;
          background-position: center;
          cursor: pointer;
          display: block;
          i {
            color: transparent;
          }
        }
      }

      // 通用的
      .el-input__inner {
        background: #f9f9f9;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        color: #222222;
        &:focus {
          background: #ffffff;
        }
      }
      .el-button {
        background: rgba(77, 135, 234, 0.99);
        border-radius: 4px;
        font-size: 16px;
        color: #ffffff;
        &.is-disabled,
        &.is-disabled:focus,
        &.is-disabled:hover {
          background: #a7c4f5;
          color: #ffffff;
        }
        &:hover {
          background: #346ece;
        }
      }
      .el-tabs {
        .el-tabs__header {
          margin-bottom: 44px;
        }
        .el-tabs__nav {
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .el-tabs__item {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: center; // padding: 0;
          height: 45px;
          font-size: 20px;
          color: #acacac;
          &.is-active {
            color: #4f89eb;
          }
        }
        .el-tabs__active-bar {
          width: 167.5px !important;
          height: 3px;
          background: #4f89eb;
          border-radius: 100px;
        }
      }
    }
  }
</style>

