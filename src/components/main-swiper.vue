<template>
  <div class="swiper-con" :class="{forward: activeIndex_ !== 0}">
    <div>
      <swiper :options="swiperOption_h" ref="mSwiper">
        <swiper-slide>
          <home />
          <a-down />
        </swiper-slide>
        <swiper-slide>
          <p-media />
          <a-down />
        </swiper-slide>
        <swiper-slide >
          <cUs />
        </swiper-slide>
      </swiper>
    </div>
    <transition name="fadeIn">
      <div class="contact-pop" @click.self.stop="changeShowPopHandle" @touchmove.stop.prevent="" v-if="showPop">
        <div class="pop-in" v-if="isQqPop">
          <img src="../assets/img/partner/qq_code.png"/>
          <p>{{language === 'cn' ? '官方QQ群：836519064' : 'QQ：836519064'}}</p>
        </div>
        <div class="pop-in" v-if="!isQqPop">
          <img src="../assets/img/partner/wechat_code.png"/>
          <p>{{language === 'cn' ? '微信号：XToken01' : 'Wechat：XToken01'}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import home from './home';
import pMedia from './partner-media';
import cUs from './contact-us';
import aDown from './arrow_down';
import {mapState} from 'vuex'
export default {
  data() {
    let that = this;
    return {
      activeIndex_: 0,
      swiperOption_h: {
        // speed: 300,
        direction : 'vertical',
        height : window.innerHeight,
        on: {
          slideChangeTransitionStart(){
            that.activeIndex_ = this.activeIndex;
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['showPop','isQqPop']),
    swiper() {
      return this.$refs.mSwiper.swiper;
    },
    language() {
      return this.$store.state.isEnglish;
    }
  },
  components: {
    home,
    pMedia,
    cUs,
    aDown
  },
  watch:{
    'activeIndex_':function(val){
      var vm = this;
      this.middleVue.$emit('mSwiperIdx', this.activeIndex_);
      this.$store.commit('changeMoveState',false);
      setTimeout(function(){
        vm.$store.commit('changeMoveState',true);
      },0)
    }
  },
  mounted(){
    this.middleVue.$on('mSwiper', (index) => {
      this.swiper.slideTo(Number(index));
    })
    this.$store.commit('changeMoveState',true);
  },
  methods:{
    changeShowPopHandle(){
      this.$store.commit('changeShowPop',false)
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-con {
  margin-top: 60px;
  &.forward {
    margin-top: 0px;
  }
  .contact-pop{
    z-index:50;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    .pop-in{
      width:180px;
      height:195px;
      background:#fff;
      margin:220px auto 0;
      text-align:center;
      border-radius:5px;
      img{
        width:148px;
        height:148px;
        margin:14px auto 0;
      }
      p{
        vertical-align:top;
        font-size: 12px;
        line-height:21px;
        color: #333333;
        letter-spacing: 0.24px;
      }
    }
    /*&.fadeIn-enter-active, &.fadeIn-leave-active{*/
      /*transition: 0.5s all ease-in-out;*/
    /*}*/
    /*&.fadeIn-enter-to,&.fadeIn-leave{*/
      /*opacity:1;*/
    /*}*/
    /*&.fadeIn-enter,&.fadeIn-leave-to{*/
      /*opacity:0;*/
    /*}*/
  }
}
 @media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  .swiper-con  {
    margin-top: 50px;
    .contact-pop{
      .pop-in {
        margin: 160px auto 0;
      }
    }
  }
}
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
// .scale-in-center {
// 	-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
// 	animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
// }
// @keyframes slide-in-fwd-center {
//   0% {
//     -webkit-transform: translateZ(-1400px);
//     transform: translateZ(-1400px);
//     opacity: 0;
//   }
//   100% {
//     -webkit-transform: translateZ(0);
//             transform: translateZ(0);
//     opacity: 1;
//   }
// }
</style>

