<template>
  <div class="invite-wrap">
    <x-header title="邀请好友" @back="back" class="invite-header" />
    <a href="javascript:;" @click="tag = !tag" class="rule-hint">活动规则</a>
    <x-pop v-show="tag" @hide="hide">
      <p>1. 邀请好友注册下载觅特，且受邀人在有效期内完成首次充值后，双方均获得额外钻石奖励；</p>
      <p>2. 邀请好友人数无限制，完成有效邀请，即获得钻石奖励，累计不封顶；</p>
      <p>3. 受邀人注册下载觅特，且在注册后的三日内完成首次充值，视为有效邀请。未完成，双方均无奖励；</p>
      <p>4. 完成有效邀请，邀请人可获得奖励为受邀人首充到账钻石数量的5%。活动期间，受邀人实际可获得奖励为首充钻石数量的18%（受邀奖励+首充优惠；</p>
      <p>5. 获得钻石奖励的数量可在【觅特】-【钱包】 -【明细】中进行查看；</p>
      <p>6. 本次活动最终解释权在法律允许的范围内归觅特所有！；</p>
    </x-pop>
    <div class="invite-box">
      <img class="top" src="@/assets/images/invitation/invite_bg.png" alt="" />
      <div class="invite-top">
        <img class="invite-img" src="@/assets/images/invitation/invite_benifit.png" alt="" />
        <div class="invite-rule-wrap">
          <span class="invite-rule">奖励规则：邀请用户注册起三天内有效</span>
        </div>
        <div class="invite-btn-wrap">
          <a class="invite-btn" href="javascript:;" @click="invite()">立即邀请</a>
        </div>
        <img class="invite_title" src="@/assets/images/invitation/invite_title1.png" alt="" />
        <div class="invite_steps">
          <!-- <div class="invite_ovalred"></div> -->
          <img class="invite_ovalred" src="@/assets/images/invitation/invite_ovalred.png" alt="">
          <ul>
            <li class="step">
              <div>
                <div class="step-radius">1</div>
                <div class="step-content">分享meet</div>
              </div>
            </li>
            <li class="border-1px"></li>
            <li class="step">
              <div>
                <div class="step-radius">2</div>
                <div class="step-content">好友完成注册</div>
              </div>
            </li>
            <li class="border-1px"></li>
            <li class="step">
              <div>
                <div class="step-radius">3</div>
                <div class="step-content">好友3日内充值</div>
              </div>
            </li>
            <li class="border-1px"></li>
            <li class="step">
              <div>
                <div class="step-radius">4</div>
                <div class="step-content">获得奖励</div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 我的战绩 -->
        <div class="record-wrap" v-if="result">
          <img class="invite_title2" src="@/assets/images/invitation/invite_title2.png" alt="" />
          <img class="invite_ovapurpul" src="@/assets/images/invitation/invite_ovapurpul.png" alt="">
          <!-- <div class="record-box"> -->
          <div class="record-content">
            <div class="total">{{data.rewardAll || 0}}</div>
            <p class="unit">获得奖励(元)</p>
            <div class="intro">
              <span>{{data.count || 0}}</span>
              <span>{{data.successCount || 0}}</span>
            </div>
            <div class="intro-hint">
              <span>邀请人数</span>
              <span>完成首充人数</span>
            </div>
            <div class="record-btn-wrap">
              <a class="invite-btn" href="javascript:;" @click="$router.push({path: '/inviteRecord', query: {token: $route.query.token}})">查看战绩</a>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import XPop from "@/components/common/x-pop.vue";
import XHeader from "@/components/common/x-header.vue";
import APIS from "@/services/api";

export default {
  name: "register",
  data() {
    return {
      data: {},
      tag: false,
      result: false
    };
  },
  methods: {
    hide() {
      this.tag = false;
    },
    invite() {
      // 立即邀请
      // this.$router.push({path: '/inviteRegister', query: {token: this.$route.query.token, user: 'cuser', invitationCode: 'XX2OBQXX'}});
      window.location.href = "android/invite";
    },
    back() {
      // 返回
      window.location.href = "/android/back";
    }
  },
  created() {
    // console.log(this)
    document.title = this.$route.meta.title;
    APIS.getReviewState(this.$route.query.token || "").then(resData => {
      this.result = resData.data.result;
      if (this.result) {
        APIS.myRecordList(this.$route.query.token, 1, 1).then(res => {
          this.data = res.data.result;
        });
      }
      
    });
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log(to);
  //   to.meta.keepAlive = true;
  //   next();
  // },
  components: {
    XPop,
    XHeader
  }
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixin.scss";
.invite-header {
  position: fixed;
  width: 100%;
  z-index: 99;
}
.invite-wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  .rule-hint {
    position: absolute;
    z-index: 9;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: -0.29px;
    top: 40px;
    right: 0px;
    padding: 10px 10px 20px 20px;
    text-decoration: underline;
  }

  .invite-box {
    position: relative;
    margin-top: 40px;
    width: 100%;
    background: #fff4f3;
  }
  .top {
    width: 100%;
  }
  .invite-top {
    // position: absolute;
    width: 100%;
    // top: 65%;
    margin-top: -45%;
    & > img {
      width: 100%;
    }
    .invite-rule-wrap {
      position: absolute;
      width: 100%;
      margin-top: -2rem;
      & > .invite-rule {
        // position: absolute;
        font-family: PingFangSC-Regular;
        font-size: 0.6rem;
        color: rgba(250, 110, 110, 0.44);
        letter-spacing: -0.29px;
        display: inline-block;
        text-align: center;
        width: 100%;
        top: 86%;
      }
    }

    & > .invite-btn-wrap {
      margin-top: 0.5rem;
      width: 100%;
      text-align: center;
      & > .invite-btn {
        // padding: 0.5rem 6rem;
        display: inline-block;
        padding: 0.6rem 0;
        width: 85%;
        @include public-btn;
      }
    }
    .invite_title {
      margin-top: 25px;
    }

    .invite_steps {
      .invite_ovalred {
        width: auto;
        height: 90px;
        float: left;
      }
      & > ul {
        margin-left: 1.7rem;
        padding: 1rem;

        //  overflow: hidden;
        li {
          float: left;
        }
        li > div {
          position: relative;
        }
        li.step {
          font-family: PingFangSC-Regular;
          letter-spacing: 0;

          .step-radius {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1rem;
            height: 1rem;
            background: #fa6e6e;
            border-radius: 50%;

            font-size: 0.8rem;
            color: #ffffff;
          }
          .step-content {
            position: absolute;
            font-family: PingFangSC-Regular;
            font-size: 0.7rem;
            color: #3f3739;
            letter-spacing: 0;
            // text-align: center;
            width: 3.2rem;
            // text-align: left;
            margin-left: -50%;
            margin-top: 0.6rem;
          }
        }
        li.border-1px {
          width: 2.5rem;
          margin-top: 0.5rem;
        }
        // &:before {
        //   display: block;
        //   content:"";
        //    background: url("~@/assets/images/invitation/invite_ovalred.png") no-repeat;
        //     background-size: auto 100%;
        //     height: 90px;
        //   }
      }
    }

    // 我的战绩
    .record-wrap {
      position: relative;
      width: 100%;
      margin-top: 3.8rem;
      // padding-bottom: 4rem;
      .invite_title2 {
        width: 100%;
      }
      .invite_ovapurpul {
        position: absolute;
        right: 0px;
        height: 3rem;
        top: 1.5rem;
      }
      // .record-box {
      //   padding: 0px 1rem;
      // }
      .record-content {
        position: relative;
        // padding: 2rem 1.8rem;
        margin-top: 0.5rem;
        background: url("~@/assets/images/invitation/invite_card.png") no-repeat;
        background-size: 100% auto;
        // min-height: 10.3rem;
        min-height: 206px;
        overflow: hidden;
        .total {
          font-family: DINAlternate-Bold;
          padding: 2rem 1.8rem 0.4rem 1.8rem;
          font-size: 1.6rem;
          color: #3f3739;
          letter-spacing: -0.77px;
          text-align: center;
        }
        .unit {
          font-family: PingFangSC-Regular;
          padding: 0rem 1.8rem;
          // margin-top: 0.4rem;
          font-size: 0.6rem;
          color: #9d9799;
          letter-spacing: -0.29px;
          text-align: center;
        }
        @mixin invit-count {
          position: relative;
          padding: 0.4rem 1.8rem;
          display: flex;
        }
        .intro {
          // margin-top: 0.4rem;

          @include invit-count;
          & > span {
            font-family: DINAlternate-Bold;
            position: relative;
            flex: 1;
            font-size: 1.3rem;
            color: #3f3739;
            letter-spacing: -0.29px;
            text-align: center;
          }
        }
        .intro-hint {
          @include invit-count;
          padding-top: 0px;
          margin-bottom: 1rem;

          & > span {
            flex: 1;
            font-size: 0.6rem;
            // left: 10px;
            display: inline-block;
            color: #9d9799;
            // margin-top: 0.2rem;
            text-align: center;
          }
        }
        .record-btn-wrap {
          margin-top: 1.5rem;
          margin-bottom: 4rem;

          text-align: center;
          & > .invite-btn {
            padding: 0.5rem 4.8rem;
            @include public-btn;
          }
        }
        // &:after {
        //   content: "立即邀请";
        //   text-align: center;
        //   display: block;
        //   padding: 0.5rem;
        //   width: 70%;
        //   @include public-btn;
        //   margin-bottom: 4rem;
        // }
      }
    }
  }
}
</style>

