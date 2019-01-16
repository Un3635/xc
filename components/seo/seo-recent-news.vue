<template>
  <div class="c-seo-recentnews">
    <div class="c-seo-recentnews-title">最新资讯</div>
    <div class="c-seo-recentnews-list">
      <c-article-list :articleList='list' :more=false :fromSeo="true"></c-article-list>
    </div>
  </div>
</template>
<script>
  import cArticleList from "../article/c-article-list";
  export default {
    components: { cArticleList },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  };
</script>
<style lang="scss">
  .c-seo-recentnews {
    &-title {
      font-size: 24px;
      color: #333333;
      line-height: 33px;
      font-weight: bold;
      padding-bottom: 17px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
</style>


