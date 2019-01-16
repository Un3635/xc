<template>
  <div class="page-zixun">
    <zixun-header :channelList='channelList' v-if="!fromLong"></zixun-header>
    <div class="page_tag_nav" v-if="fromLong">
      <a class="page_tag_nav_back" href="javascript:void(0)" @click="back"></a>
      <span>{{channel.name}}</span>
    </div>
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
  .page_tag_nav {
    line-height: p2r(44);
    height: p2r(44);
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    position: relative;

    &_back {
      position: absolute;
      left: p2r(20);
      top: p2r(15);
      width: p2r(14);
      height: p2r(14);
      border-left: 2px solid #000000;
      border-bottom: 2px solid #000000;
      transform: rotate(45deg);
    }
  }
</style>
<script>
  import zixunHeader from "../../components/zixun-header.vue";
  import wlArticleList from "../../components/wl-article-list.vue";
  import {
    getlongTailWordsList,
    seo_channelList,
    getArticlesByChanelId,
    getArticleByWordsId
  } from "../../other/data";

  export default {
    layout: "empty",
    name: "page-zixun-channel",
    components: { zixunHeader, wlArticleList },
    methods: {
      back() {
        this.$router.back(-1);
      },
      loadMore() {
        if (!this.fromLong) {
          this.loading = true;
          getArticlesByChanelId({
            channelId: this.channel.id,
            page: ++this.pageInfo.pageNum,
            rows: 7
          }).then(res => {
            this.articleList = this.articleList.concat(res.list);
            this.pageInfo = { pageNum: res.pageNum, pages: res.pages };
            this.loading = false;
          });
        } else {
          getArticleByWordsId({
            wordsId: this.channel.id,
            page: ++this.pageInfo.pageNum,
            rows: 7
          }).then(res => {
            this.articleList = this.articleList.concat(res.list);
            this.pageInfo = { pageNum: res.pageNum, pages: res.pages };
            this.loading = false;
          });
        }
      }
    },
    async asyncData({ params }) {
      var [channelList, longTailWordsList] = await Promise.all([
        seo_channelList(),
        getlongTailWordsList()
      ]);
      var channel;
      var fromLong = false;
      if (params.channelName.substr(0, 4) == "long") {
        channel = longTailWordsList.filter(
          i => i.namePinyin == params.channelName.slice(4)
        )[0];
        fromLong = true;
      } else {
        channel = channelList.filter(i => i.namePinyin == params.channelName)[0];
      }

      var rows = 7;
      var page = 1;
      if (!fromLong) {
        var articleList = await getArticlesByChanelId({
          channelId: channel.id,
          page,
          rows
        });
      } else {
        var articleList = await getArticleByWordsId({
          wordsId: channel.id,
          page,
          rows
        });
      }
      var loading = false;
      return {
        channelList,
        channel,
        articleList: articleList.list || [],
        pageInfo: { pageNum: articleList.pageNum, pages: articleList.pages },

        longTailWordsList,
        fromLong,
        loading
      };
    },
    head() {
      return {
        title: this.channel.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.channel.description
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.channel.keywords || this.channel.keyword
          }
        ]
      };
    }
  };
</script>