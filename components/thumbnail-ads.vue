<template>
  <div class="thumbnail-ads">
    <div v-swiper:topSwiper="galleryTopOptions">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,idx) in items" :key="idx">
          <a :href="item.link" target="_blank">
            <img :src="item.picture" :alt="item.title">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <el-row class="thumbs" :gutter="10">
      <el-col class="thumb" :class="{'active':idx===activeIndex}" :span="6" v-for="(item,idx) in items" :key="idx">
        <img :src="item.picture" @click="slideTo(idx)" :alt="item.title">
      </el-col>
    </el-row>
  </div>
</template>
 <style scoped>
  .thumbnail-ads {
    overflow: hidden;
  }

  .thumbnail-ads .thumbs {
    margin-top: 10px;
  }
  .thumbnail-ads .thumbs img {
    border-radius: 4px;
  }
  .thumbnail-ads .swiper-container img {
    border-radius: 8px;
  }
  .thumbnail-ads .thumb {
    opacity: 0.4;
  }

  .thumbnail-ads .thumb.active {
    opacity: 1;
  }
</style>
 <script>
  export default {
    name: "thumbnail-ads",
    props: {
      items: {
        type: Array,
        default: () => [],
        required: true
      }
    },
    data() {
      return {
        galleryTopOptions: {
          autoplay: {
            delay: 2500,
            //用户操作swiper后，不禁止autoplay
            disableOnInteraction: false
          }
        },
        activeIndex: 0
      };
    },
    methods: {
      slideTo(idx) {
        this.topSwiper.slideTo(idx);
      }
    },
    mounted() {
      const vm = this;
      this.activeIndex = this.topSwiper.activeIndex;
      this.topSwiper.on("slideChangeTransitionEnd", function() {
        vm.activeIndex = vm.topSwiper.activeIndex;
      });
    }
  };
</script>
