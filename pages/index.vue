<template>
  <div id="page_home">
    <div class="banner">
      <mt-swipe>
        <mt-swipe-item v-for="(ban,index) in banList" :key="index">
          <a :href="ban.link">
            <img :src="ban.picture">
            <div class="explain-text">
              <p>{{ban.title}}</p>
            </div>
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="contaner">
      <wl-article-list :list="list" @loadMore='loadMore' :pageinfo='page' :loading='loading' />
    </div>

  </div>
</template>
<script>
  import wlArticleList from "../components/wl-article-list";
  import { getArticleItem, getBannerByType } from "../other/data";

  export default {
    name: "chain-index",
    data() {
      return {};
    },
    components: {
      wlArticleList
    },
    methods: {
      href(ban) {
        return "/news/" + ban.articleId + ".html";
      },
      loadMore() {
        this.loading = true;
        getArticleItem({
          channelId: 26,
          rows: 10,
          page: ++this.page.pageNum
        }).then(({ list, page }) => {
          this.list = this.list.concat(list);
          this.page = page;
          this.loading = false;
        });
      }
    },
    async asyncData() {
      var loading = false;
      var [{ list, page }, { list: banList }] = await Promise.all([
        getArticleItem({
          channelId: 26,
          rows: 10,
          page: 1
        }),
        getBannerByType()
      ]);

      return {
        banList,
        list,
        page,
        loading
      };
    }
  };
</script>
<style lang="scss">
  @import "./index.scss";
</style>





