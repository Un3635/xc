<template>
  <div class="container">
    <h2 v-once>{{tagName}}</h2>
    <div class="article-list">
      <section v-for="article in list" :key="article.articleId">
        <nuxt-link :to="{path: '/news/' + article.articleId + '.html'}">
          <h3>{{article.articleTitle}}</h3>
          <time>{{article.createTime | date('YYYY-MM-DD HH:mm')}}</time>
          <article>{{article.digest}}</article>
        </nuxt-link>
      </section>
    </div>
    <div class="el-pagination">
      <a class="btn-prev" :href="pageHref(page.currentPage-1)" v-if="page.currentPage>1">
        上一页
      </a>
      <div class="el-pager">
        <a :href="pageHref(pn)" :class="{'active':page.currentPage===pn}"
           v-for="pn in page.pageList" :key="pn">{{pn}}</a>
      </div>
      <a class="btn-next" :href="pageHref(page.currentPage+1)" v-if="page.currentPage<page.totalPages">
        下一页
      </a>
    </div>
  </div>
</template>
<script>
  import ArticleAPI from '../../services/article-api';
  import {getPageList} from '../../utils';

  export default {
    head() {
      return {
        title: `${this.tagName}_算立方`, // set a title
        meta: [
          {                 // set meta
            hid: 'keywords',
            name: 'keywords',
            content: this.tagName
          },
          {
            hid: 'description',
            name: 'description',
            content: `算立方为您提供${this.tagName}相关的文章`
          }
        ]
      };
    },
    asyncData({route, error}) {
      let data = {
        page: {
          total: 0,
          pageSize: 10,
          totalPages: 1,
          currentPage: +(route.query.pn || 1)
        },
        list: [],
        tagName: ''
      };
      if (!route.params.id) {
        return error({statusCode: 404, message: 'Page Not Found'});
      }
      return ArticleAPI.getList({
        tagId: route.params.id.split('.')[0],
        pageSize: data.page.pageSize,
        pageNum: data.page.currentPage
      })
        .then(res => {
          data.tagName = res.tagName;
          data.page.totalPages = Math.ceil(res.count / data.page.pageSize);
          data.page.pageList = getPageList(data.page.totalPages, data.page.currentPage);
          data.list = res.outArticleVos || [];
          return data;
        })
        .catch(() => {
          error({statusCode: 404, message: 'Page Not Found'});
        });
    },
    methods: {
      pageHref(pn) {
        return this.$router.resolve({query: {pn}}).href;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    padding: 35px 0;
    color: #303137;
    h2 {
      line-height: 64px;
      font-size: 24px;
      letter-spacing: -0.66px;
      border-bottom: 1px solid #EEEEEE;
    }
  }

  .btn-prev,
  .btn-next {
    color: #969699;
    transition: all .2s;

    &:hover,
    &:focus {
      color: #303137;
      border-color: #303137;
    }

    .el-icon {
      line-height: 28px;
    }
  }

  .el-pagination a {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin-left: .5em;
    padding: 0 6px;
    background: transparent;

  }

  .el-pager a.active {
    color: #303137;
    border-color: #303137;
    cursor: default;
  }

  .el-pager a {
    color: #969699;
    font-weight: normal;
  }

  .el-pager a {
    padding: 0 4px;
    background: #fff;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    margin-left: .5em;

    color: #969699;
    transition: all .2s;

    &:hover,
    &:focus {
      color: #303137;
      border-color: #303137;
    }
  }

  .article-list {
    margin-bottom: 20px;
    section {
      background: #fff;
      padding: 30px 10px;
      border-bottom: 1px solid #EEEEEE;
      transition: all 0.5s;
      &:hover {
        background: #FAFAFA;
        h3 {
          color: #4185F5;
        }
      }
    }
    h3 {
      transition: all 0.5s;
      font-size: 20px;
      margin-bottom: 5px;
      line-height: 28px;
    }
    time {
      display: block;
      font-size: 12px;
      line-height: 17px;
      color: #999999;
      margin-bottom: 15px;
    }
    article {
      font-size: 14px;
      color: #606166;
      text-align: justify;
      line-height: 22px;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
</style>
