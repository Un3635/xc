<template>
  <div class="register-wrap">
    <img v-if="user === 'cuser'" src="@/assets/images/invitation/invite_cbg.png" alt="">
    <img v-if="user === 'buser'" src="@/assets/images/invitation/invite_bbg.png" alt="">
    <!-- <img src="@/assets/images/invitation/invite_cbg.png" alt=""> -->
    <div class="list-block" v-if="status === 'register'">
      <div class="item-content">
        <ul>
          <li>
            <div class="item-inner">
              <div class="item-title label">手机号</div>
              <div class="item-input">
                <input type="text" placeholder="请输入手机号" v-model="phone" v-validate="'required|phone'" name="phone">
                <!-- <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span> -->
              </div>
            </div>
          </li>
          <li>
            <div class="item-inner">
              <div class="item-title label">验证码</div>
              <div class="item-input ">
                <input type="text" class="yzCode" placeholder="请输入验证码" v-model="yzcode" v-validate="'required|yzcode'" name="yzcode">
                <span class="yzCodeStr" @click="getYzCode" :class="{active: phone!='' && !errors.has('phone'), yzCodeing: yzCodeTag}">{{yzCodeStr}}</span>
              </div>
            </div>
          </li>
        </ul>

      </div>
      <div class="register-btn-wrap">
        <a class="register-btn" href="javascript:;" @click="register" :class="{active: yzcode!='' && !errors.has('yzcode') && phone!='' && !errors.has('phone')}">立即注册</a>
      </div>
      <p class="agreement">注册即表示您同意
        <a href="javascript:;">《觅特注册协议》</a>
      </p>
    </div>
    <div v-else-if="status === 'register-ok'" class="register-ok">
      <p class="p1">注册成功</p>
      <p class="p2">马上下载meet体验不一样的世界</p>
      <div class="img-wrap">
        <!-- <transition name="fade"> -->
        <img src="@/assets/images/invitation/invite_download.png" alt="">
        <!-- </transition> -->
      </div>
      <div class="register-btn-wrap">
        <a class="register-btn" href="javascript:;" @click="register">立即下载</a>
      </div>
    </div>
    <x-prompt :prompt="prompt" v-if="show" @hide="hide"></x-prompt>
  </div>
</template>
<script>
import XPrompt from "@/components/common/x-prompt.vue";
import APIS from "@/services/api";

export default {
  name: "inviteRegister",
  data() {
    return {
      user: "",
      show: false,
      phone: "",
      yzcode: "",
      yzCodeStr: "获取验证码",
      prompt: {
        str: ""
      },
      timer: null,
      yzCodeTag: false,
      status: "register",
      fn: null,
    };
  },
  methods: {
    hide() {
      this.show = false;
      setTimeout(() => {
        this.fn && this.fn()
      },0);
    },
    showPrompt(msg) {
      this.show = true;
      this.prompt.str = msg;
    },
    register() {
      APIS.register(
        this.$route.query.token,
        this.$route.query.invitationCode,
        this.phone,
        this.yzcode,
        this.user === 'cuser' ? 0 : 1
      )
        .then(res => {
          if (!res.data) return res;
          this.showPrompt("注册成功");
          return res;
        })
        .then(res => {
          console.log(res, res.data);
          if (!res.data) this.showPrompt(res.msg);
          this.fn = () => {
            // 账号成功和已注册成功跳转
            if (res.code === "100123" || res.data.code === "000000") {
              this.status = "register-ok";
            }
          };
        })
        .catch(() => this.showPrompt('系统异常'));
    },
    getYzCode() {
      // 获取验证码
      if (this.phone === "") return false;
      this.$validator.validate("phone").then(result => {
        if (!result) return false;
        else {
          // 获取验证码
          APIS.gainSms(this.$route.query.token, this.phone)
            .then(res => {
              console.log(res);
              if (res.data) {
                let timeCount = 60;
                this.yzCodeTag = true;
                this.yzCodeStr = `${timeCount}s`;
                this.timer = setInterval(() => {
                  timeCount -= 1;
                  if (timeCount === 0) {
                    clearInterval(this.timer);
                    this.yzCodeTag = false;
                    this.yzCodeStr = "获取验证码";
                    return false;
                  }
                  this.yzCodeStr = `${timeCount}s`;
                }, 1000);
              } else {
                return res;
              }
            })
            .then(res => {
              if (res) this.showPrompt(res.msg);
            })
            .catch(() => this.showPrompt('系统异常'));
        }
      });
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.user = this.$route.query.user;
  },
  components: {
    XPrompt
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";
.register-wrap {
  & > img {
    width: 100%;
  }
  .list-block {
    margin-top: 2.2rem;
    ul {
      width: 100%;
    }
    .yzCode {
      width: 60%;
      float: left;
    }
    .yzCodeStr {
      font-family: PingFangSC-Medium;
      position: relative;
      font-size: 0.8rem;
      color: #f5b8b8;
      letter-spacing: -0.39px;
      text-align: center;
      line-height: 2.15rem;
      padding: 0.5rem;
      &.active {
        color: #fa6e6e;
      }
      &.yzCodeing {
        color: #9d9799;
      }
      &:before {
        content: "";
        position: absolute;
        display: block;
        height: 0.6rem;
        border: 1px solid #edeced;
        left: -1.2rem;
        top: 33%;
      }
    }
    .register-btn-wrap {
      margin-top: 3rem;
      text-align: center;
      .register-btn {
        padding: 0.5rem 4.8rem;
        @include public-btn;
        opacity: 0.5;
        &.active {
          opacity: 1;
        }
      }
    }
    .agreement {
      text-align: center;
      font-family: PingFangSC-Regular;
      margin: 1.5rem 0px 2.4rem 0px;
      font-size: 0.6rem;
      color: #666666;
      letter-spacing: 1px;
      display: inline-block;
      width: 100%;
      & > a {
        color: #fa6e6e;
      }
    }
  }
  .register-ok {
    .p1 {
      padding-top: 1.5rem;
      padding-bottom: 0.8rem;
      font-family: PingFangSC-Medium;
      font-size: 0.8rem;
      color: #3f3739;
      letter-spacing: 0;
      text-align: center;
      font-weight: 700;
    }
    .p2 {
      font-family: PingFangSC-Regular;
      font-size: 0.7rem;
      color: #3f3739;
      letter-spacing: 0;
      text-align: center;
    }
    .img-wrap {
      padding: 2.7rem 2.2rem;
      width: 100%;
      text-align: center;
      & > img {
        animation: bounce-down 5s infinite;
        -webkit-animation: bounce-down 5s infinite;
        animation-direction: alternate;
        -webkit-animation-direction: alternate; /* Safari 和 Chrome */
      }
    }
    .register-btn-wrap {
      text-align: center;
      padding-bottom: 4rem;
      .register-btn {
        padding: 0.5rem 6.5rem;
        @include public-btn;
      }
    }
  }
}
@keyframes bounce-down {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(0);
  }
}
@-moz-keyframes bounce-down {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(0);
  }
}
@-webkit-keyframes bounce-down {
  0% {
    -webkit-transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-8px);
  }
  50% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(6px);
  }
  100% {
    -webkit-transform: translateY(0);
  }
}
@-o-keyframes bounce-down {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

