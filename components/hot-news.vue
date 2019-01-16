<template>
  <div class="c-hot-news">
    <div class="c-hot-news-title">{{title}}</div>
    <div class="hotNews">
      <a class="hotNewsItem" v-for="(i,idx) in list" :key="idx" :href="`/news/${i.id}.html`" target="blank">
        <div class="img magicimg"><img :src="i.logo" alt=""></div>
        <div class="hotNewsItemFlag">{{idx+1}}</div>
        <div class="hotNewsItemTitle">{{i.title}}</div>
        <div class="hotNewsItemTime">{{i.pubTime|fromNow}}</div>
      </a>
    </div>
  </div>
</template>
<script>
  import { getNewsRank, getUseranklist } from "../service/main-api";
  export default {
    props: {
      title: {
        type: String,
        default: "热门新闻"
      }
    },
    data() {
      return {
        list: []
      };
    },
    mounted() {
      if (this.title == "热门新闻") {
        getNewsRank().then(res => {
          this.list = res;
        });
      } else {
        getUseranklist().then(res => {
          this.list = res;
        });
      }
    }
  };
</script>

<style lang="scss">
  .c-hot-news {
    &-title {
      font-size: 24px;
      font-weight: 700;
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 20px;
    }
    .hotNews {
      .hotNewsItem {
        position: relative;

        display: inline-block;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 20px;
        &:hover {
          background: #fafafa;
          .hotNewsItemTitle {
            color: #4d87ea !important;
          }
        }
        &:first-of-type {
          border-radius: 6px;
          width: 372px;
          height: 225px;
          .hotNewsItemFlag {
            position: absolute;
            left: 0px;
            top: 0px;
            color: white;
            width: 30px;
            height: 30px;
            font-size: 18px;
            line-height: 30px;
            text-align: center;
            background: #fa322b;
            border-radius: 6px 0 6px 0;
          }
          .img {
            border-radius: 6px;
          }
          img {
            display: block;
            width: 372px;
            height: 225px;
            border-radius: 6px;
          }
          .hotNewsItemTitle {
            position: absolute;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 0;
            line-height: 22px;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 12px 15px;
            background: rgba(0, 0, 0, 0.4);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .hotNewsItemTime {
            display: none;
          }
        }
        &:not(:first-of-type) {
          width: 372px;

          img,
          .img {
            float: left;
            width: 135px;
            height: 82px;
            border-radius: 6px;
          }
          .hotNewsItemTitle {
            position: absolute;
            left: 145px;
            font-size: 14px;

            color: #000000;
            line-height: 20px;
            top: 2px;
            max-height: 40px;
            overflow: hidden;
          }
          .hotNewsItemTime {
            position: absolute;
            font-size: 12px;
            color: #acacac;
            line-height: 15px;
            left: 145px;
            bottom: 1px;
          }
          .hotNewsItemFlag {
            position: absolute;
            left: 0px;
            top: 0px;
            color: white;
            width: 17px;
            height: 17px;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 6px 0 6px 0;
          }
        }
        &:nth-child(2) .hotNewsItemFlag {
          background: #fa8c2b;
        }
        &:nth-child(3) .hotNewsItemFlag {
          background: #2baafa;
        }
      }
    }
  }
</style>
