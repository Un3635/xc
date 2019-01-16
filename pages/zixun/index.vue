<template>
  <div class="page-zixun">
    <seo-header :channelList="channelList" />
    <div class="page-zixun-inner clearfix">
      <seo-topadvert :list="advlist.topAdvert" v-if="advlist.topAdvert!=null"></seo-topadvert>
      <div class="page-zixun-left">
        <seo-recent-news :list="latestArticle.list" class="page-zixun-seo-recent-news" />
        <div class="page-zixun-seo-channel-list clearfix">
          <seo-channel :header="i.channel.name" :moreUrl='i.channel.moreUrl' :list="i.list" v-for="(i,idx) in channelArticleList" :key="idx" />
        </div>
      </div>
      <div class="page-zixun-right">
        <seo-carousel :news='primarynews' class="page-zixun-primarynews" />
        <seo-right-advert class="page-zixun-rightAdvert" :item="rightAdvert"></seo-right-advert>
        <!-- <thumbnail-ads :items="advlist.rightAdvert" class="page-zixun-rightAdvert" /> -->
        <seo-rec-article class="page-zixun-seo-rec-article" :list="rclist" />
        <seo-tags :list="longTailWordsList" class="page-zixun-longTailWordsList" />
      </div>
    </div>
  </div>
</template>
<script>
  import seoChannel from "../../components/seo/seo-channel";
  import seoRecentNews from "../../components/seo/seo-recent-news";
  import seoHeader from "../../components/seo/seo-header.vue";
  import seoTags from "../../components/seo/seo-tags.vue";
  import ThumbnailAds from "../../components/thumbnail-ads";
  import NewsRankList from "../../components/news-rank-list";
  import HotArticleList from "../../components/hot-article-list";
  import seoCarousel from "../../components/seo/seo-carousel";
  import seoRecArticle from "../../components/seo/seo-rec-article.vue";
  import seoTopadvert from "../../components/seo/seo-topadvert.vue";
  import seoRightAdvert from "../../components/seo/seo-rightadvert.vue";
  import {
    seo_channelList,
    seo_latestArticles,
    getArticlesByChanelId,
    getlongTailWordsList,
    adv,
    getNewsRank,
    hotArticleList,
    getHomeTdk,
    seorecommendArticles,
    seogetAdvert
  } from "../../service/main-api";
  export default {
    // layout: "seo",

    components: {
      seoTopadvert,
      seoChannel,
      seoRecentNews,
      seoHeader,
      seoTags,
      ThumbnailAds,
      NewsRankList,
      HotArticleList,
      seoCarousel,
      seoRecArticle,
      seoRightAdvert
    },
    methods: {
      getchannelArticleListMoreUrl(channel) {
        return "/zixun/" + channel.namePinyin;
      }
    },
    async asyncData(ctx) {
      var [
        channelList,
        latestArticle,
        longTailWordsList,
        advlist,
        newsList,
        hotList,
        tdk,
        { list: rclist },
        rightAdvert
      ] = await Promise.all([
        seo_channelList(),
        seo_latestArticles(),
        getlongTailWordsList(),
        adv({ type: 1 }),
        getNewsRank(),
        hotArticleList(),
        getHomeTdk(),
        seorecommendArticles(),
        seogetAdvert()
      ]);

      var Promise_getArticlesByChanelId = [];
      var channelArticleList = await Promise.all(
        channelList.map(i => {
          return getArticlesByChanelId({ channelId: i.id });
        })
      );
      channelArticleList = channelArticleList.map((i, index) => {
        i.channel = channelList[index];
        i.channel.moreUrl = "/zixun/" + i.channel.namePinyin;
        return i;
      });
      var primarynews = [
        {
          link: "/chain-market",
          title: "挖链大盘：每刻跟踪币值动态",
          picture: "/images/seo/banner1_normal.png"
        },
        {
          link: "/chain-index",
          title: "挖链指数：最具参考价值的指数分析",
          picture: "/images/seo/banner2_normal.png"
        },
        {
          link: "http://www.hc.top/",
          title: "挖矿：真正意义的“工业级矿机”",
          picture: "/images/seo/banner3_normal.png"
        },
        {
          link: "/live",
          title: "闪讯：全球资讯实时更新",
          picture: "/images/seo/banner4_normal.png"
        }
      ];

      return {
        channelList,
        latestArticle,
        channelArticleList,
        longTailWordsList,
        advlist,
        newsList,
        primarynews,
        hotList,
        tdk,
        rclist,
        rightAdvert
      };
    },
    head() {
      return {
        title: this.tdk.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.tdk.description
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.tdk.keyword
          }
        ]
      };
    }
  };
</script>

<style lang="scss">
  .page-zixun {
    &-inner {
      max-width: 1180px;
      margin: 0 auto;
      padding-bottom: 96px;
    }
    &-left {
      width: 758px;
      float: left;
    }
    &-right {
      width: 366px;
      float: right;
      padding-top: 51px;
    }
    &-primarynews {
      margin-bottom: 20px;
    }
    &-rightAdvert {
      margin-bottom: 60px;
    }
    &-seo-rec-article {
      margin-bottom: 60px;
    }
    &-longTailWordsList {
    }
    &-seo-channel-list {
      & > div {
        &:nth-last-of-type(even) {
          margin-left: 45px;
        }
      }
    }
    &-seo-recent-news {
      margin-bottom: 36px;
    }
  }
</style>
