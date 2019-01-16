<template>
  <div class="pull-wrap">
    <transition name="vuxFade">
    <div class="pull-down-page" v-show="isShowPullDown">
      <div v-show="isShowPullDown">
        <div class="close-img" @click.stop="$emit('close')">
          <img src="../assets/img/colse@2x.png">
        </div>
        <slot></slot>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      isShowPullDown: Boolean
    }
  }
</script>
<style lang="scss" scoped>
  .pull-down-page {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 502;
    height: 100vh;
    background: rgba(0, 0, 0, 0.90);
    &.vuxFade-enter-active{
      transition: 0.6s all ease-out;
    }
    &.vuxFade-leave-active{
      transition: 0.3s all ease-out;
    }
    &.vuxFade-enter-to,&.vuxFade-leave{
      opacity:1;
    }
    &.vuxFade-enter,&.vuxFade-leave-to{
      opacity:0;
    }
  }
  .close-img {
    position: absolute;
    top: 10px;
    right: 18px;
    width: 24px;
    height: 24px;
  }
</style>
