<template>
<transition name="fadeOut">
    <div class="head" :class="{'onlyIcon':mSwiperIdx !== 0}" @touchmove.stop.prevent="">
      <div class="logo">
        <img v-if="mSwiperIdx === 0" src="../assets/img/logo@2x.png">
      </div>
      <div class="pull-down-img">
         <img v-if="mSwiperIdx === 0" src="../assets/img/menu@2x.png" @click.stop="showPullDown()">
        <transition name="fadeOut">
          <img v-if="mSwiperIdx !== 0" src="../assets/img/menu-white@2x.png" @click.stop="showPullDown()">
        </transition>
      </div>
     <h-pullDown :isShowPullDown = "isShowPullDown" @close="showPullDown">
       <ul class="pull-down-ul">
         <li v-for="(item, index) in data" :key="index">
           <span class="list" @click="listCk(index)">{{item}}</span>
         </li>
         <li class="chageLanguage">
           <span @click="changeLange('cn')">中文</span>
           <span>/</span>
           <span @click="changeLange('en')">EN</span>
         </li>
       </ul>
      </h-pullDown>
    </div>
</transition>
</template>

<script>
import hPullDown from './header-pull-down';
export default {
  title: {
    title: '去中心化'
  },
  data () {
    return {
      list: {
        "cn": ["首页", "APP下载", "合作媒体", "联系我们"],
        "en": ["HOME", "APP", "COOPERATION", "CONTACT US"]
      },
      data: [],
      isShowPullDown: false,
      LT: true,
      mSwiperIdx: 0
    }
  },
  methods: {
    showPullDown() {
      this.isShowPullDown = !this.isShowPullDown;
    },
    changeLange(LG) {
      this.$store.commit('changeLange', LG);
      if(LG === 'en') {
        this.$router.push('/EN');
      }
      else {
        this.$router.push('/CN');
      }
      this.data = this.list[LG];
    },
    listCk(index) {

      if(Number(index) !== 1) {
        setTimeout(() => {
          this.showPullDown();
        }, 200)
        this.middleVue.$emit('mSwiper', index === 0 ? index : index -1);
        this.$store.commit('changeShowPop',false); //切换时让弹窗消失
      } else {
        // APP 下载
        // window.open('https://www.cw.pub/app.php/610')
         this.$router.push('/download');
      }
    }
  },
  created() {
    this.data = this.list[this.$store.state.isEnglish];
  },
  mounted() {
    this.middleVue.$on('mSwiperIdx', (index) => {
      this.mSwiperIdx = index;
    })
  },
  components: {
    hPullDown
  }
}
</script>

<style lang="scss" scoped>
  .head {
    position: fixed;
    width: 100%;
    height: 60px;
    top: 0;
    background: #fff;
    padding: 0 14px 0 19px;
    z-index: 99;
    &.onlyIcon{
      background: rgba(0,0,0,0);
      .pull-down-img{
        img{
          &.fadeOut-enter-active, &.fadeOut-leave-active{
            transition: 0.8s all ease-in-out;
          }
          &.fadeOut-enter-to,&.fadeOut-leave{
            opacity:1;
          }
          &.fadeOut-enter,&.fadeOut-leave-to{
            opacity:0.3;
          }
        }
      }
    }
    .logo {
      width: 90px;
      height: 24px;
      float: left;
      line-height: 76px;
      & > img {
        width: 90px;
        height: 24px;
      }
    }
    .pull-down-img{
      float: right;
      width: 24px;
      height: 24px;
      cursor: pointer;
      line-height: 76px;
      & > img {
        width: 24px;
        height: 24px;
      }
    }
    .pull-down-ul {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0.62px;
      text-align: center;
      padding-top: 25%;
      & > li {
        padding-top: 24px;
        padding-bottom: 19px;
        position: relative;
        cursor: pointer;
        & > .list {
          display: inline-block;
          padding: 0px 20px;
        }
        &:last-child {
          margin-top: 14%;
          font-size: 14px;
        }
        &:after {
          content: '';
          display: inline-block;
          width: 26px;
          height: 2px;
          background-color: #212121;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -13px;
        }
      }
      .chageLanguage {
        cursor: pointer;
        & > span {
          &:nth-of-type(2) {
            padding: 0px 6px;
          }
        }
      }
    }
  }

 @media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  .head {
    height: 50px;
    .logo, .pull-down-img {
      line-height: 67px;
    }
  }
}
</style>
