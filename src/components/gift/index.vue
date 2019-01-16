<template>
  <div class="gift-wrap">
    <div class="gift-wrap-box">
      <div class="bg">
        <img src="../../assets/images/gift/im_luckybag_bg.png" alt="">
      </div>
      <x-loading v-show="!loading" />
      <div class="gift-box" v-show="loading && msg === ''">

        <div class="gift-content">
          <div class="pic">
            <img :src="data.sendHeadUrl" alt="">
          </div>
          <p>{{data.sendNickname}}的礼包</p>
          <p>{{data.remark}}</p>
          <p v-if="receive && status === 2" class="p1">{{data.diamonds}}<small>钻</small></p>
          <p v-if="receive && status === 2" class="p2">已自动转换为宝石存入你的账户</p>

          <div v-if="send && status === 2">
            <p class="overdueTime">对方已领取</p>
            <p class="overdueHint">{{data.diamonds}}钻</p>
          </div>

          <div v-if="send && status === 1">
            <p class="overdueTime">对方未领取</p>
            <p class="overdueHint __overdueHint">{{data.diamonds}}钻</p>
            <p class="p2">礼包超过72小时将自动退回你的钻石账户</p>
          </div>

          <p v-if="receive && status === 3" class="overdueTime">72小时内未领取</p>
          <p v-if="receive && status === 3" class="overdueHint">{{data.diamonds}}钻已退回对方账户</p>
          <p v-if="send && status === 3" class="overdueTime">对方72小时内未领取</p>
          <p v-if="send && status === 3" class="overdueHint">{{data.diamonds}}钻已退回你的钻石账户</p>
        </div>
        <div class="gift-time" v-if="status === 2">领取时间 {{data.createTime | gift}}</div>
      </div>
      <div v-show="loading && msg !== '' " class="hint">
        {{msg}}
      </div>
    </div>
  </div>

</template>
<script>
import XLoading from "../common/x-loading";
import APIS from "../../services/api";

export default {
  name: "gift",
  data() {
    return {
      loading: false,
      data: {},
      status: "",
      msg: "",
      token: "",
      receive: false,
      send: false
    };
  },
  components: {
    XLoading
  },
  methods: {
    gift() {
      return [
        data => {
          // 未领取
          console.log(this.receive, this.send);
          if (this.send) {
            this.loading = true;
            this.data = data;
            return;
          }
          this.axiosMethod("receive", [this.token, this.$route.query.bagId])
            .then(res => {
              if (res.data) {
                this.data = res.data.result;
                this.loading = true;
              } else {
                return res;
              }
            })
            .then(res => {
              if (res) this.msg = res.msg;
            });
        },
        data => {
          // 已领取
          this.data = data;
          this.loading = true;
        },
        data => {
          // 已过期
          this.data = data;
          this.loading = true;
        }
      ];
    },
    sendGift() {
      return [
        data => {
          // 对方未领取
          this.send = true;
          this.data = data;
        }
      ];
    },
    axiosMethod(url, p, cb) {
      APIS[url](...p)
        .then(res => {
          if (res.data) cb && cb(res);
          else return res;
        })
        .then(res => {
          this.loading = true;
          if (!res.data) this.msg = res.msg;
        })
        .catch(res => {
          this.loading = true;
          console.log("接口错误");
        });
    },
    getInfo() {
      this.axiosMethod("info", [this.token, this.$route.query.bagId], res => {
        this.status = Number(res.data.result.status);
        if (!res.data.result.senderFlag) {
          // senderFlag true是发送方， false是接收方
          this.receive = true;
        } else {
          this.send = true;
        }
        this.gift()[Number(this.status) - 1](res.data.result);
      });
    }
  },

  created() {
    document.title = this.$route.meta.title;
    this.loading = false;
    // 地址栏中不传入token 则是发礼包者查详情
    // 若传入则是收礼包者查

    this.token = this.$route.query.token;
    this.getInfo();
  }
};
</script>
<style lang="scss" scoped>
.gift-wrap {
  position: absolute;
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  min-width: 320px;
  .gift-wrap-box {
    position: relative;
    min-height: 100vh;
    background-image: linear-gradient(-135deg, #ff7254 0%, #ff5b8a 100%);
  }
  .hint {
    text-align: center;
    color: #fff;
    font-size: 25px;
  }
  .gift-box {
    width: 100%;
    padding-bottom: 4.3rem;
  }
  .bg {
    width: 18rem;
    margin: auto;
    & > img {
      width: 18rem;
    }
    // background: url('../../assets/images/gift/im_luckybag_bg.png') no-repeat;
  }
  .overdueTime {
    font-size: 24px !important;
    color: #3f3739 !important;
  }
  .overdueHint {
    font-size: 14px !important;
    color: #fa6e6e !important;
    margin-top: 8px;
    padding-bottom: 6.5rem;
    &.__overdueHint {
      padding-bottom: 3.2rem;
    }
  }

  p {
    display: block;
    text-align: center;
    &:nth-of-type(1) {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #3f3739;
      padding-top: 44px;
    }
    &:nth-of-type(2) {
      margin-top: 8px;
      font-size: 14px;
      color: #9d9799;
      line-height: 14px;
    }
    &.p1 {
      font-family: PingFangSC-Medium;
      height: 9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      color: #fa6e6e;
      small {
        font-size: 14px;
        color: #fa6e6e;
        margin-top: 25px;
      }
    }
    &.p2 {
      font-family: PingFangSC-Regular;
      padding-bottom: 32px;
      width: 152px;
      margin: auto;
      line-height: 20px;
      font-size: 14px;
      color: #9d9799;
    }
  }
  .gift-content {
    position: relative;
    margin: -4.2rem 1.2rem 0 1.2rem;
    background: #ffffff;
    box-shadow: 0 2px 24px 0 #dd5961;
    border-radius: 8px;
    .pic {
      position: absolute;
      top: -1.6rem;
      width: 3.2rem;
      height: 3.2rem;
      width: 100%;
      & > img {
        display: block;
        margin: auto;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
      }
    }
  }
  .gift-time {
    font-family: PingFangSC-Regular;
    margin-top: 12px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0;
    text-align: center;
  }
}
</style>

