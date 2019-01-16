<template>
  <div class="page-zixun">
    <zixun-header :channelList='channelList'></zixun-header>
    <div class="page-zixun-list">
      <wl-article-list :list="articleList" @loadMore='loadMore' :pageinfo='pageInfo' :loading='loading' :fromseo="true" />
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../other/util.scss";
  .page-zixun-list {
    padding: p2r(16);
  }
</style>
<script>
  import zixunHeader from "../../components/zixun-header.vue";
  import wlArticleList from "../../components/wl-article-list.vue";
  import {
    seo_channelList,
    getArticlesByChanelId,
    getHomeTdk
  } from "../../other/data";

  export default {
    layout: "empty",
    name: "page-zixun-channel",
    components: { zixunHeader, wlArticleList },
    methods: {
      loadMore() {
        this.loading = true;
        getArticlesByChanelId({
          channelId: "",
          page: ++this.pageInfo.pageNum,
          rows: 7
        }).then(res => {
          this.articleList = this.articleList.concat(res.list);
          this.pageInfo = { pageNum: res.pageNum, pages: res.pages };
          this.loading = false;
        });
      }
    },
    async asyncData({ params }) {
      var [channelList, tdk] = await Promise.all([
        seo_channelList(),
        getHomeTdk()
      ]);

      var rows = 7;
      var page = 1;

      var articleList = await getArticlesByChanelId({
        channelId: "",
        page,
        rows
      });

      var loading = false;
      return {
        channelList,
        articleList: articleList.list || [],
        pageInfo: { pageNum: articleList.pageNum, pages: articleList.pages },
        loading,
        tdk
      };
    },

    head() {
      return {
        title: this.tdk.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.tdk.description
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.tdk.keyword
          }
        ]
      };
    }
  };
</script>