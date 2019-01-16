<template>
  <el-tabs class="article-container header-mb-0" @tab-click="tabChange" v-model="model">
    <el-tab-pane :label="channel.name" :name="channel.name" v-for="(channel) in channelList" :key="channel.name">
      <template v-if="channel.name=='订阅'&&channel.articleList.length==0">
        <recommend-author style="padding-top: 27px;"></recommend-author>
      </template>
      <template v-else>
        <article-list :articleList="channel.articleList" :pageInfo="channel.pageInfo" @loadMore="loadMore()"></article-list>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<style  lang="scss">
.article-container {
  background-color: #fff;
  .el-tabs__item {
    font-size: 18px;
    color: #666666;
    &.is-active {
      color: #222222;
      font-weight: bold;
    }
  }
}
</style>
<script>
import { getTagArticle, followAuthorMediaList } from "~/service/main-api";
import ArticleList from "~/components/article-list";
import { getFollowList, oprFollow } from "../pages/mine/js/mineapi.js";
import RecommendAuthor from "../components/recommend-author.vue";
export default {
  name: "article-category",
  components: { ArticleList, RecommendAuthor },
  props: {
    channelList: {
      type: Array
    },
    selectedChannel: {
      type: Object
    }
  },
  data() {
    return {
      model: this.selectedChannel.name
    };
  },
  methods: {
    tabChange(tabRef) {
      this.$emit("ChannelChange", tabRef.index);
    },
    loadMore() {
      this.$emit("LoadMore");
    },
    linkTo(article) {
      if (article.channelType === 3 || article.channelType === 4) {
        return "/video/" + article.id + ".html";
      } else {
        return "/news/" + article.id + ".html";
      }
    }
  }
};
</script>
