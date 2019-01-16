<template>
  <div class="arrow_down" :class="{'arrow_down_swiperOne': this.mSwiperIdx === 0}">
    <transition name="sway">
      <img v-if="isMove" src="../assets/img/arrow_down@2x.png" alt=""/>
    </transition>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        mSwiperIdx: 0,
      }
    },
    computed:{
      ...mapState(['isMove'])
    },
    mounted() {
      this.middleVue.$on('mSwiperIdx', (index) => {
        this.mSwiperIdx = index;
      })
    }
}
</script>
<style lang="scss" scoped>
  .arrow_down {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 94%;
    z-index: 99;
    &.arrow_down_swiperOne {
       top: 84%;
    }
    & > img {
      opacity:1;
      width: 12px;
      height: 19px;
      &.sway-enter-active, &.sway-leave-active{
        transition:1.5s all ease-in-out;
      }
      &.sway-enter-to, &.sway-leave{
        opacity:0.7;
      }
      &.sway-enter, &.sway-leave-to{
        opacity:0;
      }
      animation: bounce-down 2s 1s linear 2;
      -webkit-animation:bounce-down 2s 1s linear 2;
      -moz-animation:bounce-down 2s 1s linear 2;
      -o-animation:bounce-down 2s 1s linear 2;
      animation-iteration-count: 2;
      -webkit-animation-iteration-count: 2;
      -moz-animation-iteration-count: 2;
      -o-animation-iteration-count: 2;
      @keyframes bounce-down{
        0% {transform: translateY(0);opacity:0.7;}
        25% {transform: translateY(-8px);opacity:0.5;}
        50% {transform: translateY(0);opacity:0.7;}
        75% {transform: translateY(6px);opacity:1;}
        100% {transform: translateY(0);opacity:0.7;}
      }
      @-moz-keyframes bounce-down{
        0% {transform: translateY(0);opacity:0.7;}
        25% {transform: translateY(-8px);opacity:0.5;}
        50% {transform: translateY(0);opacity:0.7;}
        75% {transform: translateY(6px);opacity:1;}
        100% {transform: translateY(0);opacity:0.7;}
      }
      @-webkit-keyframes  bounce-down{
        0% {-webkit-transform: translateY(0);opacity:0.7;}
        25% {-webkit-transform: translateY(-8px);opacity:0.5;}
        50% {-webkit-transform: translateY(0);opacity:0.7;}
        75% {-webkit-transform: translateY(6px);opacity:1;}
        100% {-webkit-transform: translateY(0);opacity:0.7;}
      }
      @-o-keyframes  bounce-down{
        0% {transform: translateY(0);opacity:0.7;}
        25% {transform: translateY(-8px);opacity:0.5;}
        50% {transform: translateY(0);opacity:0.7;}
        75% {transform: translateY(6px);opacity:1;}
        100% {transform: translateY(0);opacity:0.7;}
      }
    }
  }
@media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  .arrow_down  {
    &.arrow_down_swiperOne {
       top: 82%;
    }
    top: 91%;
  }
}
</style>

