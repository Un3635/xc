<template>
  <div class="banner">
    <img v-if="bannerList.length===1" :class="{'pointer':firstBanner.hasUrl&& firstBanner.urlAddress}"
         :src="firstBanner.image" @click="go(firstBanner)">
    <div v-swiper:mySwiper="swiperOption" v-if="isRender && bannerList.length>1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in bannerList" :key="banner.image">
          <img :src="banner.image" :class="{'pointer':banner.hasUrl&& banner.urlAddress}" @click="go(banner)">
        </div>
      </div>
      <div class="swiper-pagination text-center"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-banner',
    props: {
      bannerList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    computed: {
      firstBanner() {
        return this.bannerList[0] || {};
      }
    },
    data() {
      return {
        isRender: false,
        swiperOption: {
          loop: true,
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          },
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      };
    },
    methods: {
      go(item) {
        if (item.hasUrl && item.urlAddress) {
          window.open(item.urlAddress);
        }
      }
    },
    mounted() {
      this.isRender = true;
    }
  };
</script>
<style lang="scss">
  @import 'swiper/dist/css/swiper.min.css';

  .swiper-pagination.swiper-pagination-bullets {
    .swiper-pagination-bullet {
      background: #929292;
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background: #35363C;
    }
  }
</style>
<style scoped lang="scss">
  .banner img {
    width: 100%;
    display: block;
  }

  .pointer {
    cursor: pointer;
  }
</style>
