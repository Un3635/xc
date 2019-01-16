<template>
  <div class="page-home">
    <ristShow></ristShow>
    <div class="page-home-inner">
      <seo-topadvert :list="adv.topAdvert" v-if="adv.topAdvert!=null"></seo-topadvert>
    </div>
    <div class="page-home-inner clearfix">
      <div class="page-home-left">
        <primary-news :news="primaryNewsList" style="margin-bottom:35px" />
        <article-category :channelList="channelList" :selectedChannel="selectedChannel"  @ChannelChange="ChannelChange" @LoadMore='LoadMore' />
      </div>
      <div class="page-home-right">

        <newsMinefields :data="minefieldsdata"></newsMinefields>

        <div style="margin-top:40px" v-if="adv.rightAdvert">
          <thumbnail-ads :items="adv.rightAdvert" />
        </div>
        <div style="margin-top:40px">
          <hot-news></hot-news>
        </div>
        <div>
          <authorRankings></authorRankings>
        </div>
        <div style="margin-top:60px" v-if="adv.rightBarAdvert">
          <adv-full :list="adv.rightBarAdvert"></adv-full>
        </div>

      </div>

    </div>
    <home-parten></home-parten>
    <LanguageChange></LanguageChange>
  </div>
</template>
<style scoped lang="scss">
  .page-home {
    &-left {
      width: 758px;
      float: left;
    }
    &-right {
      width: 372px;
      float: right;
    }
    &-inner {
      width: 1180px;
      margin: 0 auto;
      padding-top: 15px;
      padding-bottom: 10px;
      overflow: hidden;
    }
  }
</style>
<script>
  import hotNews from "../components/hot-news.vue";

  import SecondaryNews from "~/components/secondary-news";
  import PrimaryNews from "~/components/primary-news";
  import ArticleCategory from "~/components/article-category";
  import ThumbnailAds from "~/components/thumbnail-ads";
  import NewsRankList from "~/components/news-rank-list";
  import AdvFull from "~/components/adv-full";
  import HomeParten from "~/components/home-parten";
  import LanguageChange from "~/components/language-change";
  import seoTopadvert from "../components/seo/seo-topadvert.vue";
  import newsMinefields from "~/components/news-minefields";
  import authorRankings from "~/components/author-rankings";
  import ristShow from "~/components/ristshow";
  import {
    primaryNews,
    secondaryNews,
    getChannelList,
    getTagArticle,
    thumbAds,
    adv,
    getNewsRank,
    webUserWlCenter,
    webUserWlCenterlong,
    followAuthorMediaList,
    getWebColumnsList
  } from "~/service/main-api";
  import { getFollowList } from "../pages/mine/js/mineapi.js";
  import getuserevent from "../service/getuserevent.js";
  export default {
    components: {
      NewsRankList,
      ThumbnailAds,
      ArticleCategory,

      PrimaryNews,
      SecondaryNews,

      AdvFull,
      HomeParten,
      hotNews,
      LanguageChange,
      seoTopadvert,
      newsMinefields,
      authorRankings,
      ristShow
    },
    data() {
      return {
        primaryNewsList: [],
        secondaryNewsList: [],
        banner: {},
        thumbAdsList: [],
        newsList: [],
        minefieldsdata: [],
        columnsList: []
      };
    },
    methods: {
      init(data) {
        if (data == 1) {
          webUserWlCenterlong().then(res => {
            this.minefieldsdata = res;
          });
        } else {
          webUserWlCenter().then(res => {
            this.minefieldsdata = res;
          });
        }
      },
      async LoadMore() {
        var channel = this.channelList.filter(
          i => i.name == this.selectedChannel.name
        )[0];

        if (this.selectedChannel.name == "订阅") {
          var { mediaList } = await followAuthorMediaList({
            rows: 20,
            page: ++channel.pageInfo.pageNum
          });

          var articleList = mediaList.list.map(i => {
            return {
              channelId: i.channelId,
              clientType: 1,
              head: i.head,
              id: i.mediaId,
              intro: i.intro,
              isAdvert: null,
              logo: i.appPictureUrl,
              logoWeb: i.appPictureUrl,
              mediaUrl: i.mediaUrl,
              nickName: i.nickName,
              pubTime: i.pubTime,
              subTitle: i.subTitle,
              tag: i.tags,
              tags: i.tagList,
              title: i.title,
              totalHotNum: i.playNum
            };
          });

          var pageInfo = {
            pageNum: channel.pageInfo.pageNum,
            pages: mediaList.pages
          };

          this.channelList.forEach(i => {
            if (i.name == this.selectedChannel.name) {
              i.articleList = [...channel.articleList, ...articleList];
              i.pageInfo = pageInfo;
            }
          });
        } else {
          var { list, page } = await getTagArticle(
            channel.id,
            20,
            ++channel.pageInfo.pageNum
          );
          this.channelList.forEach(i => {
            if (i.name == this.selectedChannel.name) {
              // i.articleList = [...channel.articleList, ...list];///这边可能有重复id

              var newlist = list.filter(i =>
                channel.articleList.every(artile => artile.id != i.id)
              );
              i.articleList = [...channel.articleList, ...newlist];
              i.pageInfo = page;
            }
          });
        }
      },
      async ChannelChange(index) {
        this.selectedChannel = this.channelList[index];
        var channel = this.channelList[index];

        if (index == 0) {
          if (this.$store.state.userinfo) {
            if (channel.articleList.length == 0) {
              var { list } = await getFollowList();
              if (list.length > 0) {
                var { mediaList } = await followAuthorMediaList({
                  rows: 20,
                  page: 1
                });
                var articleList = mediaList.list.map(i => {
                  return {
                    channelId: i.channelId,
                    clientType: 1,
                    head: i.head,
                    id: i.mediaId,
                    intro: i.intro,
                    isAdvert: null,
                    logo: i.appPictureUrl,
                    logoWeb: i.appPictureUrl,
                    mediaUrl: i.mediaUrl,
                    nickName: i.nickName,
                    pubTime: i.pubTime,
                    subTitle: i.subTitle,
                    tag: i.tags,
                    tags: i.tagList,
                    title: i.title,
                    totalHotNum: i.playNum
                  };
                });
                var pageInfo = {
                  pageNum: 1,
                  pages: mediaList.pages
                };
                channel.articleList = articleList;
                channel.pageInfo = pageInfo;
              }
              this.channelList[index] = channel;
            }
          }
        } else {
          if (channel.articleList.length == 0) {
            var { list, page } = await getTagArticle(channel.id, 20, 1);
            if (list) {
              channel.articleList = list;
              channel.pageInfo = page;
            }
            if(this.$route.name=='index'&&channel.name=='头条'){
              channel.articleList.splice(4,0,this.columnsList);
            }
            this.channelList[index] = channel;
          }
        }
      }
    },
    mounted() {
      if (this.isClient) {
        let data = this.$store.state.userinfo ? 1 : 0;
        this.init(data);
      } else {
        getuserevent.$once("getuser", data => {
          this.init(data);
        });
      }
    },
    async asyncData({ params, query, isClient,route }) {
    
      var data = await Promise.all([
        primaryNews(),
        secondaryNews(),
        thumbAds(),
        getNewsRank(),
        getChannelList(),
        adv({ type: 1 }),
        getWebColumnsList()
      ]);

      data[4].push({ id: -1, name: "订阅", rank: -1 });
      data[4].sort((a, b) => a.rank - b.rank);

      var selectedChannel = data[4][1];
      if (query.channel) {
        data[4].forEach(i => {
          if (i.namePinyin == query.channel) {
            selectedChannel = i;
          }
        });
      }

      var { list, page } = await getTagArticle(selectedChannel.id);

      data[4] = data[4].map(i => {
        if (i.id == selectedChannel.id) {
          i.articleList = list || [];
          i.pageInfo = page;
        } else {
          i.articleList = [];
          i.pageInfo = {};
        }
        return i;
      });

      var r_data = {
        primaryNewsList: data[0].list,
        secondaryNewsList: data[1].list,
        thumbAdsList: data[2].list,
        newsList: data[3],
        adv: data[5],
        channelList: data[4],
        selectedChannel: selectedChannel,
        columnsList: {
          list:data[6],isColumn:true
        }
      };



      if(route.name=='index'&&r_data.selectedChannel.name=='头条'){
        r_data.selectedChannel.articleList.splice(4,0,r_data.columnsList);
      }

      return { ...r_data, isClient };
    },
    head() {
      return {
        title: "挖链网|挖掘新经济，链接新世界",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链网是聚合区块链、新经济、新技术的综合媒体资讯门户网站，汇聚全球区块链交易机构大数据、以技术为核心，打造出挖链闪讯、挖链学院、数据行情等多个核心板块，为区块链创业者、区块链投资人提供一站式服务体系！"
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "区块链,区块链是什么,比特币,比特币资讯,虚拟货币,数字货币行业大数据,挖链指数,大数据,ai人工智能,云计算技术,新政策,新经济,前沿技术"
          }
        ]
      };
    }
  };
</script>

