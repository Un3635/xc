<template>
  <div class="c-seo-channel">
    <div class="c-seo-channel-title">
      {{header}}
      <a :href="moreUrl" :title="header" target="_blank">更多频道 ></a>
    </div>
    <div class="c-seo-channel-list">
      <a class="c-seo-channel-item" v-for="(i,idx) in list" :key="idx" target="_blank" v-bind:title="i.title" :href="linkTo(i)">
        {{i.title}}
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      header: {
        type: String,
        default: "新闻排行"
      },
      list: {
        type: Array,
        default: () => []
      },
      moreUrl: {
        type: String,
        default: "/zixun"
      }
    },
    methods: {
      linkTo(article) {
        if (article.isAdvert == 1) {
          return article.staticUrlWeb;
        } else {
          if (article.channelType === 3 || article.channelType === 4) {
            return "/zixun/video/" + article.id + ".html";
          } else {
            return "/zixun/news/" + article.id + ".html";
          }
        }
      }
    }
  };
</script>
<style lang="scss">
  .c-seo-channel {
    float: left;
    height: 380px;
    width: 356px;
    &-title {
      font-size: 24px;
      color: #333333;
      line-height: 33px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f0f0f0;
      a {
        float: right;
        font-size: 14px;
        color: #888888;
        margin-top: 1px;
      }
    }
    &-list {
      padding-top: 12px;
    }
    &-item {
      position: relative;
      display: block;
      padding-left: 14px;
      font-size: 14px;
      color: #000000;
      line-height: 20px;
      margin-bottom: 10px;
      &:hover,
      &:focus {
        color: #487fde;
        &:before {
          background: #487fde;
        }
      }
      &:before {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #000000;
        position: absolute;
        left: 0;
        top: 8px;
      }
    }
  }
</style>


