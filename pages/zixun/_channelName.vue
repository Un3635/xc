<template>
  <div class="page-zixun-channel">
    <seo-header :channelList="channelList"></seo-header>
    <div class="page-zixun-channel-inner clearfix">
      <seo-topadvert :list="advlist.topAdvert" v-if="advlist.topAdvert!=null"></seo-topadvert>
      <div class="page-zixun-channel-nav">
        <a href="/zixun">首页</a>
        <span>></span>
        <a>{{channel.name}}</a>
      </div>
      <div class="page-zixun-channel-left">
        <c-article-list :articleList="articleList" :pageInfo="pageInfo" v-if="articleList.length>0" :fromSeo="true" :more="false" />
        <div class="page-zixun-channel-left-pages">
          <a :href="pageurl(page-1)" class="page-zixun-channel-left-pages_prev" v-if="page>1">上一页</a>
          <a :href="pageurl(i)" v-for="i in pageInfo.pages" :key="i" :class="{active:i==page}">{{i}}</a>
          <a :href="pageurl(page+1)" class="page-zixun-channel-left-pages_next" v-if="page<pageInfo.pages">下一页</a>
        </div>
      </div>
      <div class="page-zixun-channel-right">
        <seo-channel-info :channel="channel" v-if="!fromLong" class="page-zixun-channel-right-seo-channel-info" />
        <seo-right-advert class="page-zixun-rightAdvert" :item="rightAdvert" style="margin-bottom:60px"></seo-right-advert>
        <!-- <thumbnail-ads :items="advlist.rightAdvert" v-if="advlist.rightAdvert.length>0" class="page-zixun-channel-right-thumbnail-ads" /> -->
        <seo-tags :list="longTailWordsList" />
      </div>
    </div>
  </div>
</template>
<script>
  import seoHeader from "../../components/seo/seo-header.vue";
  import seoChannelInfo from "../../components/seo/seo-channel-info.vue";
  import ThumbnailAds from "../../components/thumbnail-ads";
  import seoTags from "../../components/seo/seo-tags.vue";
  import cArticleList from "../../components/article/c-article-list.vue";
  import seoTopadvert from "../../components/seo/seo-topadvert.vue";
  import seoRightAdvert from "../../components/seo/seo-rightadvert.vue";
  import {
    adv,
    getlongTailWordsList,
    seo_channelList,
    getArticlesByChanelId,
    getArticleByWordsId,
    seogetAdvert
  } from "~/service/main-api";
  export default {
    components: {
      seoTopadvert,
      seoHeader,
      seoChannelInfo,
      cArticleList,
      seoTags,
      ThumbnailAds,
      seoRightAdvert
    },
    methods:{
      pageurl(i){
        if(i==1){
          return      `/zixun/${this.fromLong?'long':''}${this.channel.namePinyin}`
        }else{
          return      `/zixun/${this.fromLong?'long':''}${this.channel.namePinyin}-${i}.html`
        }
      }
    },

    data() {
      return {};
    },
    async asyncData({ params }) {
      var [
        channelList,
        advlist,
        longTailWordsList,
        rightAdvert
      ] = await Promise.all([
        seo_channelList(),
        adv({ type: 1 }),
        getlongTailWordsList(),
        seogetAdvert()
      ]);
      var channel;
      var fromLong = false;
      var rows = 15;
      var page = 1;

      var paramschannelName = params.channelName;
      if (paramschannelName.indexOf(".html") >= 0) {
        paramschannelName = paramschannelName.split("-")[0];
        page = params.channelName.split("-")[1].split(".html")[0] * 1;
      }

      if (paramschannelName.substr(0, 4) == "long") {
        channel = longTailWordsList.filter(
          i => i.namePinyin == paramschannelName.slice(4)
        )[0];
        fromLong = true;
      } else {
        channel = channelList.filter(i => i.namePinyin == paramschannelName)[0];
      }

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

      return {
        channelList,
        channel,
        articleList: articleList.list || [],
        pageInfo: { pageNum: articleList.pageNum, pages: articleList.pages },
        rows,
        page,
        advlist,
        longTailWordsList,
        fromLong,
        rightAdvert
      };
    },
    head() {
      return {
        title: this.page>1?this.channel.title + "-第" + this.page + "页":this.channel.title,
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
<style lang="scss">
  .page-zixun-channel {
    &-inner {
      max-width: 1180px;
      margin: 0 auto;
      padding-bottom: 96px;
    }
    &-left {
      width: 758px;
      float: left;
      &-pages {
        margin-top: 20px;
        text-align: center;
        a {
          font-size: 16px;
          color: #487fde;
          margin: 0 10px;
          &.active {
            color: #222222;
          }
        }
      }
    }
    &-right {
      width: 366px;
      float: right;
      &-seo-channel-info {
        margin-bottom: 60px;
      }
      &-thumbnail-ads {
        margin-bottom: 60px;
      }
    }
    &-nav {
      margin-bottom: 23px;
      a:not(:last-of-type) {
        font-size: 12px;
        color: #888888;
        line-height: 17px;
      }
      span {
        color: #888888;
        line-height: 17px;
        margin: 0 2px;
      }
      a:last-of-type {
        font-size: 12px;
        color: #151515;
        line-height: 17px;
      }
    }
  }
</style>

