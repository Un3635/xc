<template>
  <transition name="fade">
    <div class="prompt-box">
      <span>{{prompt.str}}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: "prompt",
  props: {
    prompt: {
      default: () => {}
    }
  },
  created() {
    setTimeout(() => {
       this.$emit('hide');
    }, this.prompt.time || 2000);
  }
};
</script>
<style lang="scss" scoped>
.prompt-box {
  position: absolute;
  top: 40%;
  z-index: 991;
  width: 100%;
  
  text-align: center;
  & > span {
    display: inline-block;
    text-align: center;
    opacity: 0.9;
    background: #3a3a3a;
    border-radius: 3px;
    margin:0 2rem;
    padding: 0.5rem 2rem;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #ffffff;
    line-height: 1rem;
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

