<template>
  <div class="page-video" v-if="list">
    <ristShow></ristShow>
    <div class="page-video-inner">
      <div class="page-video-left">
        <div class="page-video-title1">链视听</div>
        <div class="page-video-list">
          <div class="page-video-item" v-for="(i,idx) in list" :key="idx">
            <a :href="`/video/${i.id}.html`" target="blank" :title="i.title" class="magicimg page-video-item-image"> <img :src="i.logoWeb||i.logo" alt="" class="page-video-item-image"></a>
            <div class="page-video-item-content">
              <div class="page-video-item-content-title">
                <a :href="`/video/${i.id}.html`"> {{i.title}}</a>
              </div>
              <div class="page-video-item-content-des">{{i.intro}}</div>
              <div class="page-video-item-content-info">
                <img src="../../assets/images/Group 4@2x.png" alt="" class="page-video-item-content-info-videoimg">
                <span class="page-video-item-content-info-name">{{i.nickName}}</span>
                <span class="page-video-item-content-info-time">{{i.pubTime|fromNow}}</span>
                <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
                  <title>Fill 1</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
                  </g>
                </svg>
                <span class="page-video-item-content-info-num">{{i.totalHotNum}}</span>
                <div class="page-video-item-content-info-tags">
                  <a :href="`/tags/${i.channelId}/${ii.tagId}`" target="blank" v-for="(ii,iidx) in i .tags" :key="iidx">{{ii.tagName}}</a>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-video-load" v-if="load">自动加载中...</div>
      </div>
      <div class="page-video-right">
        <hot-news></hot-news>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import ristShow from "~/components/ristshow";
  function getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  function getScrollHeight() {
    var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  }

  function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
  import { getTagArticle } from "../../service/main-api";
  import hotNews from "../../components/hot-news.vue";
  export default {
    components: { hotNews ,ristShow},
    data() {
      return {
        load: false
      };
    },
    methods: {
      async loadmore() {
        this.load = true;

        var { list, page } = await getTagArticle(32, 5, ++this.page.pageNum);

        this.list = [...this.list, ...list];
        this.page = page;
        this.load = false;
      }
    },
    mounted() {
      var that = this;

      document.addEventListener("scroll", function() {
        if (getScrollTop() + getWindowHeight() + 300 > getScrollHeight()) {
          if (!that.load && that.page.pageNum < that.page.pages) {
            that.loadmore();
          }
        }
      });
    },
    async asyncData(ctx) {
      var { list, page } = await getTagArticle(32, 5, 1);

      return {
        list,
        page
      };
    },
    head() {
      return {
        title: "区块链独家视听专访-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链网链视听频道，聚合了区块链行业峰会、区块链大咖等，对区块链最新新闻及币圈行情进行独家专访报道，让您实时了解区块链最新动态。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "区块链专题,区块链专访,区块链行业解读,数字货币分析"
          }
        ]
      };
    }
  };
</script>
