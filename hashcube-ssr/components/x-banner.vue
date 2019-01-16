<template>
  <div class="banner">
    <img v-if="bannerList.length===1" :class="{'pointer':firstBanner.hasUrl&& firstBanner.urlAddress}"
         :src="firstBanner.image" @click="go(firstBanner)">
    <div v-swiper="swiperOption" v-if="bannerList.length>1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in bannerList" :key="banner.image">
          <img :src="banner.image" :class="{'pointer':banner.hasUrl&& banner.urlAddress}" @click="go(banner)">
        </div>
      </div>
      <div class="swiper-pagination text-center" slot="pagination"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-banner',
    props: {
      bannerList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      firstBanner() {
        return this.bannerList[0] || {};
      }
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          autoplay: 3000,
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination'
          },
          paginationClickable: true
        }
      };
    },
    methods: {
      go(item) {
        if (item.hasUrl && item.urlAddress) {
          window.open(item.urlAddress);
        }
      }
    }
  };
</script>

<style scoped>

  .banner img {
    width: 100%;
    display: block;
  }

  .pointer {
    cursor: pointer;
  }
</style>
