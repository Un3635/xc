<template>
  <div class="c-seo-tags">
    <div class="c-seo-tags-title">标签列表
      <a href="/zixun/tag-cloud">更多标签></a>
    </div>
    <div class="c-seo-tags-list">
      <a :href="`/zixun/long${i.namePinyin}`" class="c-seo-tags-list-item" v-bind:title="i.name" v-for="(i,idx) in list" :key="idx">{{i.name}}</a>
    </div>
  </div>
</template>
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
<style lang="scss" >
  .c-seo-tags {
    &-title {
      font-size: 24px;
      color: #333333;
      line-height: 33px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      a {
        font-size: 14px;
        color: #888888;
        float: right;
      }
    }
    &-list {
      padding-top: 16px;
      max-height: 560px;
      overflow: hidden;
      &-item {
        background: #f5f5f5;
        border-radius: 100px;
        line-height: 40px;
        padding: 0 30px;
        font-size: 16px;
        color: #222222;
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 16px;
      }
    }
  }
</style>

