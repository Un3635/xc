<template>
  <div class="page">
    <div class="page-inner">
      <el-row :gutter="54">
        <el-col :span="17">
          <div class="nav">
            <a href="/">首页</a>
            <a>{{author}}的文章</a>
          </div>
          <span v-if="articleList.length==0">暂无数据</span>
          <article-list :articleList="articleList" :pageInfo="pageInfo" @loadMore="loadMore()" v-if="articleList.length>0"></article-list>
        </el-col>
        <el-col :span="7">
          <section class="sec-bottom">
            <news-rank-list :news="newsList" />
          </section>
          <section>
            <hot-article-list :items="hotArticleList" />
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import NewsRankList from "~/components/news-rank-list";
  import HotArticleList from "~/components/hot-article-list";
  import ArticleList from "~/components/article-list";

  import {
    getNewsRank,
    hotArticleList,
    getAuthorArticle
  } from "~/service/main-api";

  export default {
    components: {
      HotArticleList,
      NewsRankList,
      ArticleList
    },
    methods: {
      loadMore() {
        getAuthorArticle(this.userId, this.rows, ++this.page, this.type).then(
          data => {
            this.articleList = this.articleList.concat(data.list);
            this.pageInfo = data.page;
          }
        );
      }
    },
    async asyncData({ params }) {
      var _data = {
        userId: params.id,
        rows: 10,
        page: 1,
        type: 2,
        clientType: params.clientType
      };
      var data = await Promise.all([
        hotArticleList(),
        getNewsRank(),
        getAuthorArticle(
          _data.userId,
          _data.rows,
          _data.page,
          _data.type,
          _data.clientType
        )
      ]);

      return {
        userId: _data.userId,
        rows: _data.rows,
        page: _data.page,
        type: _data.type,
        hotArticleList: data[0],
        newsList: data[1],
        author: data[2].authorName,
        articleList: data[2].list ? data[2].list : [],
        pageInfo: data[2].page ? data[2].page : []
      };
    }
  };
</script>
<style scoped>
  .page-inner {
    max-width: 70rem;
    margin: 0 auto;
    padding-top: 22px;
    padding-bottom: 10px;
  }

  .nav {
    margin-top: 30px;
    margin-bottom: 26px;
  }
  .nav a {
    font-size: 12px;

    color: #000000;
    letter-spacing: 0;
  }
  .nav a:not(:last-of-type)::after {
    content: ">";
    vertical-align: 1px;
    margin-left: 4px;
  }
  .nav a:first-of-type::before {
    content: "";
    width: 7px;
    height: 7px;
    margin-right: 7px;
    border-radius: 50%;
    background-color: #0063ee;
    display: inline-block;
  }
</style>
