<template>
  <div class="article-list">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li>
        <wl-article v-for="(i,idx) in list" :key="idx" :item="i" :fromseo="fromseo" />
      </li>
    </ul>

    <button class="loadmore" v-if="pageinfo.pageNum != pageinfo.pages">加载中...</button>
  </div>
</template>
<script>
  import wlArticle from "../components/wl-article";
  import { InfiniteScroll } from "mint-ui";
  import { getArticleItem } from "../other/data";

  export default {
    components: {
      wlArticle
    },
    props: ["list", "pageinfo", "loading", "fromseo"],
    methods: {
      loadMore() {
        if (this.pageinfo.pageNum != this.pageinfo.pages) {
          this.$emit("loadMore");
        }
      }
    }
  };
</script>
