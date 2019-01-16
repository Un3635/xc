<template>
  <div id="inv_reg_v130" class="inv_reg_v130" v-title="'邀请好友'">
    <img src="../../assets/inv130/btc2.png" alt="" class="inv_reg_v130_img" v-if="$route.query.activityType==1">
    <img src="../../assets/inv130/eth2.png" alt="" class="inv_reg_v130_img" v-if="$route.query.activityType==2">
    <img src="../../assets/inv130/hash2.png" alt="" class="inv_reg_v130_img" v-if="$route.query.activityType==3">
    <div class="inv_reg_v130_title" v-if="$route.query.activityType==1">接受邀请领福利 注册可获更多BTC</div>
    <div class="inv_reg_v130_title" v-if="$route.query.activityType==2">接受邀请领福利 注册可获更多ETH</div>
    <div class="inv_reg_v130_title" v-if="$route.query.activityType==3">接受邀请领福利 注册可获更多算力</div>
    <div class="inv_reg_v130_form">
      <div class="inv_reg_v130_form_item">
        <div class="inv_reg_v130_form_item_label">手机号</div>
        <input type="text" placeholder="你的手机号" v-model="account" maxlength="11">
      </div>
      <div class="inv_reg_v130_form_item">
        <div class="inv_reg_v130_form_item_label">验证码</div>
        <input type="text" placeholder="6位数字验证码" v-model="code" maxlength="6">
        <button @click="getCode" :disabled='time>0' :class="{time:time>0,cansub:account}">{{time==0?'获取验证码':time+'s'}}</button>
      </div>
      <div id="inv_reg_v130_captcha"></div>
    </div>
    <button class="inv_reg_v130_sub" :disabled='!account||!code' @click="sub">立即注册</button>
    <div class="inv_reg_v130_pro">注册即表示您同意
      <a href="/#/protocol/reg">《挖链注册协议》</a>
    </div>
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
        title: "邀请好友",
        desc: " 邀请好友",
        link: window.location.href
      });
    },
    methods: {
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
            "/invite2/register.open",
            {
              account,
              code,
              captchaCode,
              inviteCode: this.$route.query.id,
              activityType: this.$route.query.activityType
            },
            false
          )
          .then(data => {
            this.$router.push("inv_reg_download_v130");
          });
      },
      getCode() {
        if (!is_phone.test(this.account)) {
          Toast("请输入正确的手机号");
          return;
        }
        var { account } = this;
        wy_captcha({
          el: "#inv_reg_v130_captcha"
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

