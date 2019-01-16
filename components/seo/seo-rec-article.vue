<template>
  <div class="c-seorecarticlercArticle">
    <div class="c-seorecarticlercArticle-title">
      推荐文章
    </div>
    <div class="c-seorecarticlercArticle-list">
      <a class="c-seorecarticlercArticle-item" v-for="(i,idx) in list" :key="idx" :href="`/zixun/news/${i.id}.html`" :title="i.title" target="_blank">
        <div class="c-seorecarticlercArticle-item-title">{{i.title}}</div>
        <div class="c-seorecarticlercArticle-item-date">{{i.put_time|fromNow}}</div>
      </a>
    </div>
  </div>
</template>
<style lang="scss">
  .c-seorecarticlercArticle {
    &-title {
      font-size: 24px;
      color: #333333;
      line-height: 33px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      font-weight: bolder;
      margin-bottom: 16px;
    }
    &-list {
    }
    &-item {
      margin-bottom: 15px;
      position: relative;
      padding-left: 9px;
      display: block;
      &:hover {
        div:first-of-type {
          color: #487fde;
        }
        &::before {
          background: #487fde;
        }
      }
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #222222;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 9px;
      }
      &-title {
        font-size: 14px;
        color: #222222;
        line-height: 22px;
        max-height: 44px;
        overflow: hidden;
        margin-bottom: 7px;
      }
      &-date {
        font-size: 12px;
        color: #999999;
        line-height: 15px;
      }
    }
  }
</style>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  };
</script>