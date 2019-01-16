<template>
  <div class="page-reg">
    <div class="page-reg-white">
      <div class="page-reg-inner">
        <el-tabs v-model="regType" @tab-click="tabclick">
          <el-tab-pane label="手机号注册" name="0">
            <el-form>
              <el-form-item class="page-reg-account">
                <div>
                  <el-select slot="prepend" placeholder="请选择" v-model="formdata.countryNum">
                    <el-option v-for="item in CountryNums" :key="item.id" :value="item.countryNum">
                      {{item.countryNameZh}} {{item.countryNum}}
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-input placeholder="手机号码" v-model="formdata.account" :maxlength=11 @focus="err=''">
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item class="page-reg-code">
                <div>
                  <el-input placeholder="6位数字验证码" v-model="formdata.code" @focus="err=''" :maxlength="6">
                  </el-input>
                </div>
                <div>
                  <el-button @click="getcode" :loading="wy_loading" :disabled="!formdata.account||time>0">{{time==0?'发送验证码':time+'s'}}</el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="8-18位字母及数字密码" v-model="formdata.pwd" @focus="err=''" :type="pwdtype1" :maxlength=18 class="pwd">
                  <i slot="suffix" @click="togglepwd1">1</i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="确认密码" v-model="formdata.pwd1" @focus="err=''" :type="pwdtype2" :maxlength=18 class="pwd">
                  <i slot="suffix" @click="togglepwd2">1</i>
                </el-input>
              </el-form-item>
              <el-form-item class="page-reg-err" v-show="err">
                <div class="page-reg-err-content">{{err}}</div>
              </el-form-item>
              <el-form-item>
                <el-button class="page-reg-regbtn" @click="sub" :loading="sub_loading" :disabled="!formdata.account||!formdata.pwd||!formdata.pwd1||!checked||!formdata.code">注册</el-button>
              </el-form-item>
              <el-form-item class="page-reg-protocol">
                <el-checkbox v-model="checked">我已阅读并接受
                  <a @click="show_previewrticle=true">《挖链平台服务协议》</a>
                </el-checkbox>
              </el-form-item>
            </el-form>
            <div class="page-reg-gologin">
              <div class="page-reg-gologin-up">
                已经帐号?
                <a @click="gologin">登录</a>
              </div>
              <div class="page-reg-gologin-down">同一账号可登录挖链网、TIR、算立方等挖链旗下产品</div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="1">
            <el-form>
              <el-form-item>
                <el-input placeholder="邮箱帐号" v-model="formdata.account" @focus="err=''">
                </el-input>
              </el-form-item>
              <el-form-item class="page-reg-code">
                <div>
                  <el-input placeholder="6位数字验证码" v-model="formdata.code" @focus="err=''" :maxlength="6">
                  </el-input>
                </div>
                <div>
                  <el-button @click="getcode" :loading="wy_loading" :disabled="!formdata.account||time1>0">{{time1==0?'发送验证码':time1+'s'}}</el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="8-18位字母及数字密码" v-model="formdata.pwd" @focus="err=''" :type="pwdtype3" :maxlength=18 class="pwd">
                  <i slot="suffix" @click="togglepwd3">1</i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="确认密码" v-model="formdata.pwd1" @focus="err=''" :type="pwdtype4" :maxlength=18 class="pwd">
                  <i slot="suffix" @click="togglepwd4">1</i>
                </el-input>
              </el-form-item>
              <el-form-item class="page-reg-err" v-show="err">
                <div class="page-reg-err-content">{{err}}</div>
              </el-form-item>
              <el-form-item>
                <el-button class="page-reg-regbtn" @click="sub" :loading="sub_loading" :disabled="!formdata.account||!formdata.pwd||!formdata.pwd1||!checked||!formdata.code">注册</el-button>
              </el-form-item>
              <el-form-item class="page-reg-protocol">
                <el-checkbox v-model="checked">我已阅读并接受
                  <a @click="show_previewrticle=true">《挖链平台服务协议》</a>
                </el-checkbox>
              </el-form-item>
            </el-form>
            <div class="page-reg-gologin">
              <div class="page-reg-gologin-up">
                已经帐号?
                <a @click="gologin">登录</a>
              </div>
              <div class="page-reg-gologin-down">同一账号可登录挖链网、TIR、算立方等挖链旗下产品</div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div id="page-reg-captcha"></div>
        <preview-article :show.sync="show_previewrticle"></preview-article>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getSendCode,
    user_register,
    getCountryNums,
    myAccount
  } from "../mine/js/mineapi";
  import { wy_captcha } from "../../service/wy-captcha.js";
  import regex from "../../service/regex.js";
  import PreviewArticle from "../../components/dialog/protol-service.vue";
  import loginmodalevent from "../../service/loginmodalevent.js";
  import togglepwdtype from "../../mixin/togglepwdtype.js";
  export default {
    components: { PreviewArticle },
    mixins: [togglepwdtype],
    data() {
      return {
        show_previewrticle: false,
        regType: "0",
        time: 0,
        time1: 0,
        checked: false,
        err: "",
        sub_loading: false,
        wy_loading: false,
        CountryNums: [],
        formdata: {
          countryNum: "+86",
          account: "",
          type: "",
          code: "",
          pwd: "",
          pwd1: ""
        }
      };
    },
    mounted() {
      document.getElementsByClassName("g-body")[0].style.backgroundColor =
        "#f9f9f9";
      getCountryNums().then(res => {
        this.CountryNums = res;
      });
    },
    beforeRouteLeave(to, from, next) {
      document.getElementsByClassName("g-body")[0].style.backgroundColor = "";
      next();
    },

    methods: {
      gologin() {
        setTimeout(() => {
          loginmodalevent.$emit("login");
        }, 500);
        this.$router.push(this.$route.query.from);
      },
      tabclick(tab, event) {
        this.checked = false;
        this.err = "";
        this.sub_loading = false;
        this.wy_loading = false;
        this.formdata = {
          countryNum: "+86",
          account: "",
          type: "",
          code: "",
          pwd: "",
          pwd1: ""
        };
      },
      timeStart(type) {
        if (type == 1) {
          var that = this;
          (function timein() {
            if (that.time1 <= 0) {
              that.time1 = 60;
            }
            setTimeout(() => {
              that.time1--;
              if (that.time1 > 0) {
                timein();
              }
            }, 1000);
          })();
        } else {
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
        }
      },
      getcode() {
        if (this.regType == "0") {
          if (!regex.is_phone.test(this.formdata.account)) {
            this.err = "请输入正确的手机号";
            return;
          }
        } else {
          if (!regex.is_email.test(this.formdata.account)) {
            this.err = "请输入正确的邮箱地址";
            return;
          }
        }
        this.wy_loading = true;
        wy_captcha({
          el: "#page-reg-captcha"
        })
          .then(data =>
            getSendCode(
              {
                account: this.formdata.account,
                type: this.regType * 1 + 11,
                captchaCode: data.validate,
                countryNum: this.regType != 0 ? "" : this.formdata.countryNum
              },
              false
            )
          )
          .then(() => this.$message("验证码已发送"))
          .then(() => this.timeStart(this.regType * 1))
          .catch(err => (this.err = err.msg))
          .finally(() => (this.wy_loading = false));
      },
      sub() {
        if (this.regType == "0") {
          if (!regex.is_phone.test(this.formdata.account)) {
            this.err = "请输入正确的手机号";
            return;
          }
        } else {
          if (!regex.is_email.test(this.formdata.account)) {
            this.err = "请输入正确的邮箱地址";
            return;
          }
        }
        if (!regex.is_regpwd.test(this.formdata.pwd)) {
          this.err = "请输入8-18位字母及数字的密码";
          return;
        }
        if (this.formdata.pwd != this.formdata.pwd1) {
          this.err = "2次密码不同";
          return;
        }
        this.sub_loading = true;
        var _data = { ...this.formdata, type: this.regType * 1 + 11 };
        if (this.regType == "1") {
          _data.countryNum = "";
        }
        user_register(_data, false)
          .then(res => {
            this.$message("注册成功");
            setTimeout(() => {
              loginmodalevent.$emit("login");
            }, 500);
            this.$router.push(this.$route.query.from);
          })
          .catch(err => (this.err = err.msg))
          .finally(() => (this.sub_loading = false));
      }
    }
  };
</script>
<style lang="scss">
  @import "index.scss";
</style>
