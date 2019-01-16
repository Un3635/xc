<template>
  <div class="hot">
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper" v-if="isRender">
        <swiper-slide>
          <img src="../../assets/images/380x750ver1.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../assets/images/380x750ver2.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../assets/images/380x750ver3.png" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="floor">
      <div class="floorItem" v-for="(item,index) in floorItem" :key="index">
        <div class="content">
          <div class="top_content">
            <h3 class="left title">{{item.name}}</h3>
            <span class="right link"><a href="javascript:void(0);"
                                        @click="$emit('changeTab', item.path)">查看更多&gt;</a></span>
          </div>
          <div class="clearfix product-img">
            <div class="left">
              <router-link :to="`detail?id=${item.img.id1}`">
                <x-img :offset="-10" success-class="img-lazy-success" :src="item.img.img1" alt=""
                       container="#vux_view_box_body"></x-img>
              </router-link>
            </div>
            <div class="left">
              <router-link :to="`detail?id=${item.img.id2}`">
                <x-img :offset="-10" success-class="img-lazy-success" :src="item.img.img2" alt=""
                       container="#vux_view_box_body"></x-img>
              </router-link>
              <router-link :to="`detail?id=${item.img.id3}`">
                <x-img :offset="-10" success-class="img-lazy-success" :src="item.img.img3" alt=""
                       container="#vux_view_box_body"></x-img>
              </router-link>
            </div>
          </div>
        </div>
        <!--<div class="bottomImg">-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {XImg} from 'vux';

  export default {
    data() {
      return {
        isRender: false,
        swiperOption: {
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        floorItem: [
          {
            name: '行政办公',
            img: {
              img1: require('../../assets/images/largeImg/administration/xzbg1.png'),
              img2: require('../../assets/images/minImg/administration/xzbg2.png'),
              img3: require('../../assets/images/minImg/administration/xzbg3.png'),
              id1: 'eeec8138-8ac3-4314-866c-0bc677a1a66e',
              id2: '2782514a-e4ad-4b13-b656-4f3312909682',
              id3: '628961bc-0ac6-44ad-af6b-8daef6e3f707'
            },
            path: 'xingZheng'
          },
          {
            name: '技术开发',
            img: {
              img1: require('../../assets/images/largeImg/technologicalDevelopment/jskf1.png'),
              img2: require('../../assets/images/minImg/technologicalDevelopment/jskf2.png'),
              img3: require('../../assets/images/minImg/technologicalDevelopment/jskf3.png'),
              id1: 'b7f9c958-2874-4179-9676-7cbadc233ad5',
              id2: '25a83430-b667-4be6-9109-df3796fb2156',
              id3: 'ec42c7b1-323f-4992-98b3-d3a44d8cb847'
            },
            path: 'jiShu'
          },
          {
            name: '图形处理',
            img: {
              img1: require('../../assets/images/largeImg/graphicProcessing/txcl1.png'),
              img2: require('../../assets/images/minImg/graphicProcessing/txcl2.png'),
              img3: require('../../assets/images/minImg/graphicProcessing/txcl3.png'),
              id1: '07370a39-bfdc-46ec-8b61-5a83e9555dcc',
              id2: '2e2a371f-0df8-4af1-9c10-d5898cc33bd9',
              id3: 'fac97202-b5b3-4ea1-9ef1-9d21b446782e'
            },
            path: 'tuXing'
          },
          {
            name: '商务便携',
            img: {
              img1: require('../../assets/images/largeImg/businessPortable/swbj1.png'),
              img2: require('../../assets/images/minImg/businessPortable/swbj2.png'),
              img3: require('../../assets/images/minImg/businessPortable/swbj3.png'),
              id1: '086732ae-d793-42f3-8cd1-81b21298df69',
              id2: '697b12b8-4290-4050-aa3a-e69c9524e2a4',
              id3: '696c2885-a4b0-4d07-90c5-8f1b9ee54940'
            },
            path: 'bianXie'
          },
          {
            name: '电脑配件',
            img: {
              img1: require('../../assets/images/largeImg/accessories/jqpj1.png'),
              img2: require('../../assets/images/minImg/accessories/jqpj2.png'),
              img3: require('../../assets/images/minImg/accessories/jqpj3.png'),
              id1: '10ef36c6-cbad-4a92-b0c3-ae46e9acb636',
              id2: 'c24ac95b-5121-4f24-8bc4-9a3e2e67c440',
              id3: 'fa1e0507-ef18-4c8f-ac51-49543fa3e806'
            },
            path: 'peiJian'
          }
        ]
      };
    },
    components: {
      XImg
    },
    computed: {
      swiper() {
        if (this.$refs.mySwiper) {
          return this.$refs.mySwiper.swiper;
        }
      }
    },
    activated() {
      this.$nextTick(() => {
        this.swiper.autoplay.start();
      });
    },
    deactivated() {
      this.swiper.autoplay.stop();
    },
    mounted() {
      this.isRender = true;
    }
  };
</script>

<style lang="scss" scoped>
  img {
    display: block;
    width: 100%;
  }

  .banner {
    width: 100%;
    padding-bottom: 3px;
    height: calc(100vw * 190 / 375);
    background: #ececec;
    img {
      max-width: 100%;
      margin: 0 auto;
    }
  }

  .floor {
    width: 100%;
    .floorItem {
      padding-top: 6px;
      .content > .vux-flexbox {
        padding-right: 3px;
      }
    }
  }

  .content {
    width: 100%;
    .product-img {
      width: calc(100% - 3px);
      .left {
        width: 50%;
        &:nth-child(even) {
          position: relative;
          left: 3px;
          a{
            display: block;
          }
          a:first-child {
            margin-bottom: 3px;
          }
        }
      }
    }
    .top_content {
      padding: 8px 11px 8px 8px;
      overflow: hidden;
      .title {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        padding-left: 2px;
        border-left: 2px solid #1E1E51;
        border-radius: 2px;
      }
      .link {
        font-size: 10px;
        line-height: 14px;
        color: #999;
        padding-top: 3px;
      }
    }
  }

  .bottomImg {
    /*margin-top: 7px;*/
    /*height: 120px;*/
  }
</style>
