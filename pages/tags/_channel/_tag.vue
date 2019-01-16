<template>
  <div class="page">
    <div class="page-inner">
        <div class="page-inner-left">
          <div class="page-inner-nav">
            <a href="/">首页</a>
            <span>></span>
            <a>{{tagName}}</a>
          </div>
          <h3 class="page-inner-xiang">{{tagName}}相关文章</h3>
          <span v-if="articleList.length==0">暂无数据</span>
          <article-list :articleList="articleList" :pageInfo="pageInfo" @loadMore="loadMore()" v-if="articleList.length>0"></article-list>
        </div>
        <div class="page-inner-right">
          <section>
            <thumbnail-ads :items="advlist.rightAdvert" />
          </section>
          <section class="sec-bottom">
            <HotNews></HotNews>
          </section>
          <section>
            <adv-full :list="advlist.rightBarAdvert" class="tagRightBottom"></adv-full>
          </section>
        </div>
    </div>
  </div>
</template>
<script>
  import ArticleList from "~/components/article-list";
  import ThumbnailAds from "../../../components/thumbnail-ads";
  import AdvFull from "~/components/adv-full";
  import HotNews from "~/components/hot-news.vue";
  import {
    adv,
    getTagArticle,
    getNewsRank,
    hotArticleList
  } from "~/service/main-api";
  export default {
    components: {
      ArticleList,
      AdvFull,
      ThumbnailAds,
      HotNews
    },
    methods: {
      loadMore() {
        getTagArticle(this.channelId, this.rows, ++this.page, this.tagId).then(
          data => {
            this.articleList = this.articleList.concat(data.list);
            this.pageInfo = data.page;
          }
        );
      }
    },
    data() {
      return {
        advlist: []
      };
    },
    mounted() {
      adv({
        type: 2
      }).then(res => {
        this.advlist = res;
      });
    },

    head() {
      if (
        this.tagDetail &&
        (this.tagDetail.title ||
          this.tagDetail.keyword ||
          this.tagDetail.description)
      ) {
        return {
          title: this.tagDetail.title,
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.tagDetail.description
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.tagDetail.keyword
            }
          ]
        };
      } else {
        return {};
      }
    },
    async asyncData({ params }) {
      var _data = {
        channelId: params.channel,
        rows: 10,
        page: 1,
        tagId: params.tag
      };
      var data = await Promise.all([
        hotArticleList(),
        getNewsRank(),
        getTagArticle(_data.channelId, _data.rows, _data.page, _data.tagId)
      ]);

      return {
        channelId: _data.channelId,
        rows: _data.rows,
        page: _data.page,
        tagId: _data.tagId,
        tagName: !params.tag
          ? ""
          : data[2].list[0].tags.filter(i => i.tagId == params.tag).length == 0
            ? ""
            : data[2].list[0].tags.filter(i => i.tagId == params.tag)[0].tagName,
        hotArticleList: data[0],
        newsList: data[1],
        articleList: data[2].list ? data[2].list : [],
        pageInfo: data[2].page ? data[2].page : [],
        tagDetail: data[2].tagDetail
      };
    }
  };
</script>
<style lang="scss" scoped>
  .page-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding-top: 22px;
    padding-bottom: 10px;
    overflow: hidden;
    &-left{
      width: 758px;
      float: left;
      margin-right: 50px;
    }
    &-right{
      float: left;
      width: 372px;
    }
    &-nav {
      margin-top: 30px;
      margin-bottom: 26px;
      a {
        font-size: 12px;
        color: #000000;
        &[href] {
          color: #888888;
          &:hover {
            color: #666666;
          }
        }
      }
      span {
        color: #888888;
        margin: 0 5px;
      }
    }

    &-xiang{
      font-size: 24px;
      padding-bottom: 15px;
      border-bottom: 1px solid #EEEEEE;
    }
  }


</style>
