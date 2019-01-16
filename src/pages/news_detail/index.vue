<template>
  <div id="news_detail"  v-title="vtitle">
    <template v-if="data&&data.article">
      <div class="title">{{data.article.title}}</div>
      <div class="data">
        <img :src="data.article.head" alt="" class="headerimg">
        <div class="name">{{data.article.nickName}}</div>
        <div class="time">{{data.article.pubTime|fromNow}}</div>
        <div class="read">{{data.article.hot}}</div>
      </div>
      <div class="editContent">
        <div :class="showc" v-html="data.article.content"></div>
        <div class="showalllayer" v-if="hidesome&&!inapp" @click="showClick()">
          <div class="showall">点击查看全文 <img src="../../assets/fenxiang_xiala@3x.png" alt=""></div>
        </div>
        <div class="openapplayer" v-if="hidesome&&!inapp">
          <div class="openapp" @click="download()">打开挖链App，阅读体验更佳</div>
        </div>

        <div class="from_authorlist" v-if="data.article.sourceAuthor || data.article.sourceTitle || data.article.sourcePlatform">
          <div class="from_authorlist_item" v-if="data.article.sourceAuthor">
            <div class="from_authorlist_item_k">原作者</div>
            <div class="from_authorlist_item_v">{{data.article.sourceAuthor}}</div>
          </div>
          <div class="from_authorlist_item" v-if="data.article.sourceTitle">
            <div class="from_authorlist_item_k">原标题</div>
            <div class="from_authorlist_item_v">{{data.article.sourceTitle}}</div>
          </div>
          <div class="from_authorlist_item" v-if="data.article.sourcePlatform">
            <div class="from_authorlist_item_k">本文来源</div>
            <div class="from_authorlist_item_v">{{data.article.sourcePlatform}}</div>
          </div>

        </div>
      </div>
    </template>
    <template v-if="data&&!data.article">
      <div id="news_detail_404">
        <img src="../../assets/wenzhang_icon_kong.png" alt="">
        <p>文章找不到了，去看看其他推荐吧~~</p>
      </div>
    </template>
    <div class="other" v-if="other&&other.list&&other.list.length>0">
      <div class="othertitle">相关</div>
      <div class="newslist">
        <div class="inner">
          <div class="newsitem" v-for="(i,index) in other.list" :key="index" @click="go_news_detail(i)">
            <img :src="i.logo" alt="">
            <div class="newsitemcontent">
              <div class="newsitemcontenttitle">{{i.title}}</div>
              <div class="newsitemcontentintroduce">
                <div class="recommend" v-if="i.tag">{{i.tag}}</div>
                <div class="time">{{i.pubTime|fromNow}}</div>
                <div class="name">•</div>
                <div class="name">{{i.nickName}}</div>
                <div class="read">{{i.hot}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appdownload v-if="!hidesome&&!inapp"></appdownload>
  </div>

</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import appdownload from "../../components/appdownload";
  import { Toast } from "mint-ui";
  import wx_share_config from "../../common/wx_share";
  function HTMLDecode(html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace('"content-bottom"', 'class="f1"')
      .replace('"content-source-info"', 'class="f3"')
      .replace('"ad akp-adv"', 'class="f2"')
      .replace(/href/g, "")
      .replace(/<style(([\s\S])*?)<\/style>/g, "")
      .replace(/<meta(([\s\S])*?)<\/meta>/g, "");
  }
  export default {
    name: "newsdetail",
    components: { appdownload },
    data() {
      return {
        data: null,
        other: null,
        vtitle: "",
        hidesome: true,
        inapp: this.$app.hockAPP(),
        showc: "edit hidden"
      };
    },
    created() {
      this.init();
    },
    mounted() {
      if (this.inapp) {
        this.showc = "edit";
      }
    },
    watch: {
      $route: function() {
        this.init();
      }
    },

    methods: {
      download() {
        var in_weibo =
          window.navigator.userAgent.toUpperCase().indexOf("WEIBO") >= 0;
        var in_android =
          window.navigator.userAgent.toUpperCase().indexOf("ANDROID") >= 0;
        if (in_weibo) {
          if (in_android) {
            window.location.href =
              "http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl";
          } else {
            window.location.href = "http://static.h5.walian.cn/appdownload/";
          }
        } else {
          window.location.href =
            "http://a.app.qq.com/o/simple.jsp?pkgname=com.xiaochong.xcwl";
        }
      },
      showClick() {
        (this.hidesome = !this.hidesome), (this.showc = "edit");
      },
      go_news_detail(i) {
        this.$router.push({
          path: "news_detail",
          query: { id: i.articleId, h5Type: i.h5Type }
        });
      },
      init() {
        var h5Type = this.$route.query.h5Type;
        if (h5Type && h5Type == 1) {
          this.vtitle = "朝闻8点半";
        } else {
          this.vtitle = "挖链资讯";
        }
        this.$http
          .post(
            "/article/detail.open",
            {
              articleId: this.$route.query.id,
              type: this.$route.query.h5Type
            },
            false
          )
          .then(data => {
            data.article.content = HTMLDecode(data.article.content);
           
            this.data = data;
          })
          .catch(err => {
            this.vtitle = "挖链资讯";
            this.data = {};
          })
          .finally(() => {
             this.getother();
            // this.init_app_share();
            this.init_wx_share();
          });
      },
      init_wx_share() {
       
        if (this.data.article) {
          wx_share_config({
            imgUrl: this.data.article.logo,
            title: this.data.article.title,
            desc: this.data.article.intro,
            link: window.location.href
          });
        } else {
        
          wx_share_config({
            imgUrl: '',
            title: '挖链资讯',
            desc: '点击查看新闻详情',
            link: window.location.href
          });
        }
      },
      getother() {
        this.$http
          .post(
            "/article/getRelatedArticle.open",
            {
              articleId: this.$route.query.id,
              type: this.$route.query.h5Type
            },
            false
          )
          .then(data => {
            if (data && data.list && data.list.length > 0) {
            }
            this.other = data;
          });
      },
      init_app_share() {
        this.$app.call("showBackBar", {}, function() {});
        var _div = document.createElement("div");
        _div.innerHTML = this.data.article.content;
        if (this.$route.query.h5Type && this.$route.query.h5Type == 1) {
          this.$app.call(
            "navTitles",
            {
              navTitles: [
                {
                  type: 2, //share
                  articleid: this.$route.query.id,
                  articletype: 1,
                  sharedata: {
                    title: this.data.article.title,
                    des: _div.innerText,
                    img: this.data.article.head,
                    url: encodeURIComponent(
                      window.location.href + "&i=" + Math.random()
                    )
                  }
                }
              ]
            },
            function(result) {}
          );
        } else {
          this.$app.call(
            "navTitles",
            {
              navTitles: [
                {
                  type: 1, //collect
                  articleid: this.$route.query.id,
                  articletype: 1
                },
                {
                  type: 2, //share
                  articleid: this.$route.query.id,
                  articletype: 1,
                  sharedata: {
                    title: this.data.article.title,
                    des: _div.innerText,
                    img: this.data.article.logo,
                    url: encodeURIComponent(window.location.href)
                  }
                }
              ]
            },
            function(result) {}
          );
        }
      }
    }
  };
</script>
