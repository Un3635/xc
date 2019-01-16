<template>
  <div class="qsshare-success" v-title="'测测你的区块链知识'">
    <div class="over">挑战结束</div>
    <div class="overinfo hasv" v-if="$route.query.v>0">
      <div class="o1">恭喜！本次挑战共答对 {{$route.query.num}} 道题</div>
      <div class="o2">获得 {{$route.query.v}} 挖力</div>
    </div>
    <div class="overinfo" v-else>
      <div class="o3">好遗憾！还差一点点就能拿到挖力了！</div>
    </div>
    <div class="info" v-if="$route.query.v>0">
      <div class="i1">完成注册，即可领取本次答题所获挖力</div>
      <div class="i2">去挖链APP答题赚更多挖力，赢WT糖果！</div>
    </div>

    <div class="info" v-else>
      <div class="i1">您今天还有2次答题机会，
      </div>
      <div class="i2">完成注册即可再次答题！</div>
    </div>
    <div class="labels">
      <div class="label">
        <span>手机号</span>
        <input type="text" placeholder="你的手机号" v-model="account" maxlength="11" class="phoneinput">
      </div>
      <div class="label">
        <span>验证码</span>
        <input type="text" placeholder="6位数字验证码" v-model="code" maxlength="6">
        <button @click="getCode" :disabled='time>0' :class="{time:time>0,cansub:account}">{{time==0?'获取验证码':time+'s'}}</button>
      </div>
      <div id="inv_reg_captcha"></div>
    </div>

    <button class="regBt" :disabled='!account||!code' @click="sub">立即注册挖链App</button>
    <div class="pro">注册即表示您同意
      <a href="/#/protocol/reg">《挖链注册协议》</a>
    </div>
  </div>
</template>
<style lang="scss">
  @import "success.scss";
</style>
<script>
  import { Toast } from "mint-ui";
  var is_phone = /^1[3456789]\d{9}$/;
  import wx_share_config from "../../common/wx_share";
  import wy_captcha from "../../common/wx-captcha.js";
  export default {
    data() {
      return {
        err: "",
        account: "",
        code: "",
        time: 0,
        timer: null,
        captchaCode: ""
      };
    },
    created() {
      // wx_share_config({
      //   imgUrl: window.location.origin + "/static/regshare.png",
      //   title: "邀请好友获50挖力",
      //   desc: " 邀请好友获50挖力",
      //   link: window.location.href
      // });
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
            "/invite/register.open",
            {
              account,
              code,
              captchaCode,
              webUserFla: this.$route.query.id,
              inviteCode: this.$route.query.ivid
            },
            false
          )
          .then(data => {
            this.$router.push("qasharedownload");
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
