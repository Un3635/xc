<template>
  <div class="contaner">
    <div class="head">
      <a class="head_back" href="/"></a>
      <img src="../../assets/img/home_walian_logo@3x.png" class="head_img" alt="">挖链网
    </div>
    <div class="page_details">
      <div class="page_details_head">
        {{article.title}}
      </div>
      <div class="page_details_info">
        <div class="fl" v-if="!article.authorHead" v-cloak>
          <img :src=article.head alt="">{{article.author}}
          <span class="author">{{article.author}}</span>
        </div>
        <div class="fl" v-else>
          <img :src=article.authorHead alt="">
          <span class="author">{{article.author}}</span>
        </div>
        <span class="text">
          {{article.nickName}}
          <span>{{article.pubTime|fromNow}}</span>
        </span>
        <div class="fr readnum">{{article.hot+article.vhot}}人阅读</div>
      </div>

      <!-- <img :src=article.logo alt="" class="page_details_img"> -->
      <div class="page_details_text" v-html="article.content">
      </div>
      <div class="page_details_remark">
        <p v-if="article.sourceAuthor">
          <span class="left">原作者</span>
          <span class="right">{{article.sourceAuthor}}</span>
        </p>
        <p v-if="article.sourceTitle">
          <span class="left">原标题</span>
          <span class="right">{{article.sourceTitle}}</span>
        </p>
        <p v-if="article.sourceName">
          <span class="left">文本来源</span>
          <span class="right">{{article.sourceName}}</span>
        </p>
        <!-- <p>{{article.pubType}}
        </p> -->
        <p>{{Number(article.pubType) === 0 ? adminIdContent : Number(article.pubType) === 1 ? userIdContent : article.declareContent}}</p>
      </div>
      <div class="page_details_tags">
        <ul>
          <li v-for="(tags,index) in article.tags" :key="index">
            <a :href="href(article,tags.tagId)">{{tags.tagName}}</a>
          </li>
        </ul>
      </div>
      <div class="page_details_recom" v-if="related.length>0">
        <div class="page_details_recom_head">
          推荐文章
          <span></span>
        </div>
        <div class="articles">
          <wl-article v-for="(i,idx) in related" :key="idx" :item="i" />
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss">
  @import "./index.scss";
</style>
<script>
  import wlArticle from "../../components/wl-article";
  import { getNewsById, article_related } from "../../other/data";

  export default {
    layout: "empty",
    name: "news-id",
    data() {
      return {
         adminIdContent: '挖链网登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述，图片及文章内容版权归原作者所有。文章内容仅供参考，不构成投资建议，投资者据此操作，风险自担。',
         userIdContent: '本文由入驻挖链网的作者发布，观点仅代表作者个人，不代表挖链网的观点和立场。如稿件因图片及文章版权问题导致侵权行为，一切法律后果由投稿人负责。'
      }
    },
    components: {
      wlArticle
    },
    methods: {
      href(datas, _id) {
        return "/tags/" + datas.channelId + "/" + _id;
      }
    },
    async asyncData(ctx) {
      var articleId = ctx.route.params.id.split(".html")[0];

      var [article, related] = await Promise.all([
        getNewsById({ id: articleId }),
        article_related({ id: articleId })
      ]);

      var related = related || [];
      // console.log(article);
      return {
        article,
        related
      };
    },

    head() {
      if (this.article.title) {
        return {
          title: this.article.title,
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.article.intro
            },
            {
              hid: "keywords",
              name: "keywords",
              content: !this.article.tags
                ? this.article.intro
                : this.article.tags.map(i => i.tagName).join(",")
            }
          ]
        };
      }
    }
  };
</script>
