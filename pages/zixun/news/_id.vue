<template>
    <div class="page-zixun-news-detail">
        <div class="head">
            <a class="head_back" href="javascrit:void(0)" @click="back"></a>
            <img src="../../../assets/img/home_walian_logo@3x.png" class="head_img" alt="">挖链网
        </div>
        <div class="page_details">
            <div class="page_details_head">
                {{article.title}}
            </div>
            <div class="page_details_info">
                <span class="text">
                    {{article.nickName}}
                    <span>{{article.pubTime|fromNow}}</span>
                </span>
            </div>
            <div class="page_details_text" v-html="article.content">
            </div>
            <div class="page_details_remark">
                <p>声明：挖联网登载此文出于传递更多信息之目的，并不意味赞同其观点或证实其描述，文章内容仅供参考，不构成投资建议。 如涉及作品内容、版权和其它问题，请与本网联系，我们将在第一时间删除内容！
                </p>
            </div>
            <div class="page_details_tags">
                <ul>
                    <li v-for="(tags,index) in article.longTailWords" :key="index">
                        <a :href="href(tags.namePinyin)">{{tags.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>
<style lang="scss">
    @import "./index.scss";
</style>
<script>
    import wlArticle from "../../../components/wl-article";
    import { seoArticleInfo } from "../../../other/data";

    export default {
      layout: "empty",
      name: "news-id",
      components: {
        wlArticle
      },
      methods: {
        back() {
          this.$router.back(-1);
        },
        href(url) {
          return "/zixun/long" + url;
        }
      },
      async asyncData(ctx) {
        var articleId = ctx.route.params.id.split(".html")[0];

        var [article] = await Promise.all([seoArticleInfo(articleId)]);
        return {
          article
        };
      },
      head() {
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
              content: this.article.keywords
            }
          ]
        };
      }
    };
</script>
