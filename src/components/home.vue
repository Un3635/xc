<template>
  <div class="main-wrap">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in data" :key="index">
        <!-- <img src="../assets/img/main-swiper/pic_1@2x.png" class="img"> -->
        <img :src="item.imgUrl" class="img" >
        <div class="content" data-swiper-parallax="-400" data-swiper-parallax-opacity="0.2" data-swiper-parallax-duration="800">
          <h1 class="title" >{{item[language].title}}</h1>
          <div class="hr" v-show="isShow(index)"></div>
          <span class="detail">{{item[language].detail}}</span>
          <button class="btn" v-show="index === 0" @click="downLoad()">{{language === 'cn' ? '下载' : 'Download'}}</button>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>
<script>
import homeData from '../../static/home.js'
import home from '../../static/home.js';
export default {
  data() {
    return {
      data: '',
      swiperOption: {
        initialSlide:0,
        parallax: true,
        // autoplay:true,
        direction : 'horizontal',
        // height : window.innerHeight,
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        },
        on: {
          slideChangeTransitionEnd: function(){},
        }
      }
    }
  },
  computed: {
    language: {
      get() {
        return this.$store.state.isEnglish;
      }
    }
  },
  methods: {
    isShow(index) {
      if(this.$store.state.isEnglish === 'en' && index !== 0) {
        return false;
      } else {
        return true;
      }
    },
    downLoad() {
      // 下载
      // window.open('https://www.cw.pub/app.php/610');
      this.$router.push('/download');
    }
  },
  created() {
    this.data = homeData.data;
  }
}
</script>
<style lang="scss" scoped>
.img {
  width: 100%;
}
.main-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.content{
  position: relative;
  width: 100%;
  // height: calc(100vh - 310px);
  padding: 27px 27px 0px 29px;
  margin-top: -6px;
  text-align: left;
  overflow: auto;
  .title {
    font-family: PingFangSC-Semibold;
    margin-bottom: 14px;
    font-size: 22px;
    color: #F7F7F7;
    letter-spacing: 0;
  }
  .hr{
    width: 30px;
    height: 2px;
    margin-bottom: 29px;
    background: #F7F7F7;
  }
  .detail{
    font-family: PingFangSC-Light;
    display: inline-block;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 100;
  }
  .btn {
    position: absolute;
    right: 32px;
    top: 26px;
    font-family: PingFangSC-Regular;
    padding: 6px 17px;
    background: #20A0FF;
    border-radius: 4px;
    border: 1px solid #20A0FF;
    font-size: 16px;
    color: #F7F7F7;
    letter-spacing: 0;
    cursor: pointer;
    &.en {
      right: 21px;
      padding: 6px 8px;
    }
  }
}
.swiper-pagination {
    position: absolute;
    width: 100%;
    top: 76%;
    padding-left: 29px;
}
 @media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  .content  {
    padding: 20px 27px 0px 29px;
    .title {
      font-size: 18px;
      margin-bottom: 12px;
    }
    .hr {
      margin-bottom: 18px;
    }
    .detail {
      font-size: 12px;
    }
    .btn {
       padding: 3px 15px;
    }
  }
  .swiper-pagination {
    top: 76%;
  }
}
</style>


