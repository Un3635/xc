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
        <div class="fr readnum">{{article.totalHotNum||0}}人阅读</div>
      </div>

      <div id="youkuplayer" style="width:100%;height:10rem;"></div>
     
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
        <p>声明：挖联网登载此文出于传递更多信息之目的，并不意味赞同其观点或证实其描述，文章内容仅供参考，不构成投资建议。 如涉及作品内容、版权和其它问题，请与本网联系，我们将在第一时间删除内容！
        </p>
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
  import { getVideoById , article_related } from "../../other/data";
  import { Indicator } from 'mint-ui';
  export default {
    layout: "empty",
    name: "video-id",
    components: {
      wlArticle
    },
    data() {
      return {
        isPlayerLoaded: false
      };
    },
    methods: {
      href(datas, _id) {
        return "/tags/" + datas.channelId + "/" + _id;
      },
      loadYoukuPlayer() {
        const youkuPlayerUrl = "//player.youku.com/jsapi";
        return new Promise((resolve, reject) => {
          const isLoaded =
            document.querySelectorAll(`script[src="${youkuPlayerUrl}"]`).length >
            0;
          if (isLoaded && window.YKU) {
            return resolve(window.YKU);
          }
          let script = document.createElement("script");
          script.src = youkuPlayerUrl;
          document.body.appendChild(script);
          script.onload = () => {
            const timer = setInterval(() => {
              if (window.YKU) {
                clearInterval(timer);
                resolve(window.YKU);
              }
            }, 100);
          };
          script.onerror = () => reject({ msg: "Failed to load youku player" });
        });
      },
    },
    mounted() {
      this.loadYoukuPlayer().then(res => {
        this.isPlayerLoaded = true;
        new YKU.Player("youkuplayer", {
          styleid: "0",
          client_id: "528fa931b3275f72",
          vid: this.article.video,
          newPlayer: true,
          autoplay: true
        });
      });
    },

    async asyncData(ctx) {
      var articleId = ctx.route.params.id.split(".html")[0];
      var [data,related] = await Promise.all([
          getVideoById({ id: articleId })
          .then(res => res || {})
          .then(data => {
          data.content = (data.contentWeb || "")
          .replace(data.contentWeb ? /&(?!#?\w+;)/g : /&/g, "&amp;")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
          return {
              data: data
          };          
      }),
          article_related({ id: articleId })
      ]);

      var related = related || [];
      var article = data.data
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