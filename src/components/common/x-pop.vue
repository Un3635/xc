<template>
  <transition name="fade">
    <div class="pop-wrap" v-show="show">
      <div class="pop-box">
        <strong>邀请好友奖励规则</strong>
        <div class="pop-content">
          <slot />
        </div>
        <a href="javascript:;" class="pop-btn" @click="hide">我知道了</a>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "pop",
  data() {
    return {
      show: true
    };
  },
  methods: {
    hide() {
      this.show = false;
      this.$emit("hide");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";

.pop-wrap {
  position: fixed;
  left: 0px;
  top: 0px;
  widows: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 991;
  text-align: center;
}
.pop-box {
  position: relative;
  z-index: 999;
  width: 80%;
  background: #ffffff;
  border-radius: 12px;
  text-align: left;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  margin: auto;
  margin-top: 45%;
  & > strong {
    display: inline-block;
    font-family: PingFangSC-Medium;
    padding: 0.8rem 3.3rem;
    font-size: 0.8rem;
    color: #3f3739;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    font-weight: 700;
  }
  .pop-btn {
    font-family: PingFangSC-Medium;
    font-size: 0.8rem;
    color: #fa6e6e;
    letter-spacing: 0;
    padding: 0.7rem 0px;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
  .pop-content {
    padding: 0.8rem;
    height: 10rem;
    color: #ccc;
    font-size: 0.6rem;
    line-height: 21px;
    overflow: auto;
    @include scroll-style;
  }
}
.fade-enter-active {
  -webkit-animation: slide-in-fwd-center 0.4s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.fade-leave-active {
  -webkit-animation: slide-out-bck-center 0.5s
    cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slide-out-bck-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
}

/**
 * ----------------------------------------
 * animation slide-in-fwd-center
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}

/**
 * ----------------------------------------
 * animation slide-out-bck-center
 * ----------------------------------------
 */
@-webkit-keyframes slide-out-bck-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(-1100px);
    transform: translateZ(-1100px);
    opacity: 0;
  }
}
@keyframes slide-out-bck-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(-1100px);
    transform: translateZ(-1100px);
    opacity: 0;
  }
}
</style>

