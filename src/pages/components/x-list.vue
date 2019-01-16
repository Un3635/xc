<template>
  <div class="list-container">
    <div class="title">{{title}}</div>
    <div class="showContainer clearfix">
      <div class="showItem" v-for="product in productList" :key="product.goodsNo">
        <router-link :to="`detail?id=${product.goodsNo}`">
          <div class="img">
            <!--<img :src="product.imgUrl" alt="">-->
            <x-img :offset="-10" success-class="img-lazy-success" :src="product.imgUrl" alt=""
                   :scroller="$parent"></x-img>
          </div>
          <p class="name ellipsis">{{product.title}}</p>
          <p class="detail ellipsis">{{product.subtitle}}</p>
          <p class="cost">{{product.rent || 0}}元/月</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {XImg} from 'vux';

  export default {
    data() {
      return {};
    },
    components: {
      XImg
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      productList: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .list-container {
    padding: 8px 0 0;
    .title {
      font-size: 14px;
      line-height: 20px;
      color: #1E1E51;
      text-align: center;
      position: relative;
      padding-bottom: 8px;
      &:before {
        content: url("../../assets/images/copyleft.png");
        position: absolute;
        top: -3px;
        left: 50%;
        margin-left: -78px;
      }
      &:after {
        content: url("../../assets/images/copyright.png");
        position: absolute;
        top: -3px;
        margin-left: 9px;
      }
    }
    .showContainer {
      text-align: center;
      width: calc(100% - 5px);
      .showItem {
        float: left;
        width: 50%;
        background: #fff;
        margin-bottom: 5px;
        padding: 0 10px 2px;
        position: relative;
        &:nth-child(even) {
          left: 5px;
        }
        .img {
          height: 120px;
          width: 120px;
          margin: 0 auto 3px;
          img {
            display: block;
          }
        }
        .name {
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          margin-bottom: 2px;
          min-height: 20px;
        }
        .detail {
          font-size: 12px;
          color: #999999;
          line-height: 17px;
          margin-bottom: 1px;
          min-height: 17px;
        }
        .cost {
          font-size: 14px;
          color: #FF2424;
          line-height: 20px;
          min-height: 20px;
        }
      }
    }
  }
</style>
