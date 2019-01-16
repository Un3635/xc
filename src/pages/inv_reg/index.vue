<template>
  <div id="inv_reg" v-title="'邀请好友'">
    <div class="labels">
      <div class="label">
        <span>手机号</span>
        <input type="text" placeholder="你的手机号" v-model="account" maxlength="11" class="phoneinput">
        <button style="opacity: 0;">获取验证码</button>
      </div>
      <div class="label">
        <span>验证码</span>
        <input type="text" placeholder="6位数字验证码" v-model="code" maxlength="6">
        <button @click="getCode" :disabled='time>0' :class="{time:time>0,cansub:account}">{{time==0?'获取验证码':time+'s'}}</button>
      </div>
      <div id="inv_reg_captcha"></div>
    </div>
    <div class="err">{{err}}</div>

    <button class="regBt" :disabled='!account||!code' @click="sub">立即注册</button>
    <div class="pro">注册即表示您同意
      <a href="/#/protocol/reg">《挖链注册协议》</a>
    </div>
    <!-- <div class="success" v-if="successshow">
    </div>
    <div class="success_inner" v-if="successshow">
      <img src="../../assets/h5_chenggong.png" alt="" class="success_inner_img">
      <div class="success_inner_title">注册成功</div>
      <a class="success_inner_btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl">下载App领取挖力</a>
      <img src="../../assets/h5_close.png" alt="" class="success_inner_close" @click="closesuccess">
    </div> -->
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import { Toast } from "mint-ui";
  var is_phone = /^1[3456789]\d{9}$/;
  import wx_share_config from "../../common/wx_share";
  import wy_captcha from "../../common/wx-captcha.js";
  export default {
    data() {
      return {
        // successshow: false,
        err: "",
        account: "",
        code: "",
        time: 0,
        timer: null,
        captchaCode: ""
      };
    },
    created() {
      wx_share_config({
        imgUrl: window.location.origin + "/static/regshare.png",
        title: "邀请好友获50挖力",
        desc: " 邀请好友获50挖力",
        link: window.location.href
      });
    },
    methods: {
      // closesuccess() {
      //   clearTimeout(this.timer);
      //   this.successshow = false;
      //   this.err = "";
      //   this.account = "";
      //   this.code = "";
      //   this.time = 0;
      // },
      timeStart() {
        var that = this;
        (function timein() {
          if (that.time <= 0) {
            that.time = 60;
          }
          that.timer = setTimeout(() => {
            that.time--;
            if (that.time > 0) {
              timein();
            }
          }, 1000);
        })();
      },
      sub() {
        if (!is_phone.test(this.account)) {
          Toast("请输入正确的手机号");
          return;
        }
        var { account, code, captchaCode } = this;
        this.$http
          .post(
            "/invite/register.open",
            {
              account,
              code,
              captchaCode,
              inviteCode: this.$route.query.id
            },
            false
          )
          .then(data => {
            this.$router.push("inv_reg_download");
          });
      },
      getCode() {
        if (!is_phone.test(this.account)) {
          Toast("请输入正确的手机号");
          return;
        }
        var { account } = this;
        wy_captcha({
          el: "#inv_reg_captcha"
        })
          .then(captchaCode => {
            this.captchaCode = captchaCode;
            this.$http
              .post(
                "/invite/getAuthCode.open",
                {
                  account,
                  captchaCode
                },
                false
              )
              .then(data => {
                Toast("已发送");
                this.timeStart();
              });
          })
          .catch(err => {
            Toast(err);
          });
      }
    }
  };
</script>
