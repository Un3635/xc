<template>
  <div class="page-seo-news">
    <seo-header :channelList="channelList" />
    <div class="page-seo-news-inner clearfix">
      <seo-topadvert :list="advlist.topAdvert" v-if="advlist.topAdvert!=null"></seo-topadvert>
      <div class="page-seo-news-nav">
        <a href="/zixun">首页</a>
        <span>></span>
        <a :href="channel.href">{{channel.name}}</a>
        <span>></span>
        <a>正文</a>
      </div>
      <div class="page-seo-news-left">
        <div class="page-seo-news-left-title">{{data.title}}</div>
        <div class="page-seo-news-left-info">
          <!-- <span class="page-seo-news-left-info-name">{{data.author}}</span> -->
          <span class="page-seo-news-left-info-time"> {{data.pubTime|date}}</span>
          <!-- <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title></title>
            <desc></desc>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
            </g>
          </svg> -->
          <!-- <span class="page-seo-news-left-info-num">{{data.hot+data.vhot}}</span> -->
        </div>
        <div class="page-seo-news-left-content article" v-html="data.content"> </div>
        <div class="page-seo-news-left-tags">
          <a class="page-seo-news-left-tags-item" :href="`/zixun/long${i.namePinyin}`" v-bind:title="i.name" v-for="(i,idx) in data.longTailWords" :key="idx" target="_blank">{{i.name}}</a>
        </div>

        <div class="page-seo-news-left-contentinfo">
          <div class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">本文地址</div>
            <div class="v">
              <a :href="`https://www.walian.cn/zixun/news/${data.id}.html`" target="_blank">https://www.walian.cn/zixun/news/{{data.id}}.html</a>
            </div>
          </div>
          <div class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">本文移动端地址</div>
            <div class="v">
              <a :href="`https://wap.walian.cn/zixun/news/${data.id}.html`" target="_blank">https://wap.walian.cn/zixun/news/{{data.id}}.html</a>
            </div>
          </div>
          <div v-if="data.sourceAuthor" class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">原作者</div>
            <div class="v">{{data.sourceAuthor}}</div>
          </div>
          <div v-if="data.sourceTitle" class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">原标题</div>
            <div class="v">{{data.sourceTitle}}</div>
          </div>
          <div v-if="data.source" class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">本文来源</div>
            <div class="v">{{data.source}}</div>
          </div>
          <div class="page-seo-news-left-contentinfo-item clearfix">
            <div class="k">声明</div>
            <div class="v">挖链网登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考，不构成投资建议。投资者据此操作，风险自担。</div>
          </div>
        </div>
      </div>
      <div class="page-seo-news-right">
        <seo-right-advert style="margin-bottom:60px" :item="rightAdvert"></seo-right-advert>
        <div class="page-seo-news-right-rcArticle">
          <div class="page-seo-news-right-rcArticle-title">
            频道推荐
          </div>
          <div class="page-seo-news-right-rcArticle-list">
            <a class="page-seo-news-right-rcArticle-item" v-for="(i,idx) in data.recommend" :key="idx" :href="`/zixun/news/${i.id}.html`" :title="i.title" target="_blank">
              <div class="page-seo-news-right-rcArticle-item-title">{{i.title}}</div>
              <div class="page-seo-news-right-rcArticle-item-date">{{i.pubTime|fromNow}}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .page-seo-news {
    &-inner {
      max-width: 1180px;
      margin: 0 auto;
      padding-bottom: 96px;
    }
    &-left {
      width: 758px;
      float: left;
      &-title {
        font-size: 28px;
        color: #000000;
        line-height: 40px;
        margin-bottom: 10px;
      }
      &-info {
        font-size: 12px;
        color: #888888;
        line-height: 17px;
        &-name {
          &::after {
            width: 2px;
            height: 12px;
            content: "";
            background-color: #dddddd;
            margin: 0 10px;
            display: inline-block;
          }
        }
        &-time {
          margin-right: 20px;
        }
        &-num {
          margin-left: 4px;
        }
      }
      &-tags {
        margin-bottom: 60px;
        &-item {
          background: #f5f5f5;
          border-radius: 100px;
          padding: 0 30px;
          font-size: 16px;
          color: #222222;
          line-height: 40px;
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
      &-contentinfo {
        border: 1px solid #eeeeee;
        border-radius: 8px;
        padding: 20px;
        &-item {
          margin-bottom: 10px;
          .k {
            width: 66px;
            font-size: 12px;
            color: #888888;
            float: left;
            line-height: 17px;
          }
          .v {
            width: 645px;
            float: left;
            line-height: 17px;
            color: #222222;
            font-size: 12px;
          }
        }
      }
    }
    &-right {
      width: 366px;
      float: right;
      &-rcArticle {
        &-title {
          font-size: 24px;
          color: #333333;
          line-height: 33px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
          font-weight: bolder;
          margin-bottom: 16px;
        }
        &-list {
        }
        &-item {
          margin-bottom: 15px;
          position: relative;
          padding-left: 9px;
          display: block;
          &:hover {
            .page-seo-news-right-rcArticle-item-title {
              color: #487fde;
            }
            &::before {
              background: #487fde;
            }
          }
          &::before {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #222222;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 9px;
          }
          &-title {
            font-size: 14px;
            color: #222222;
            line-height: 22px;
            max-height: 44px;
            overflow: hidden;
            margin-bottom: 7px;
          }
          &-date {
            font-size: 12px;
            color: #999999;
            line-height: 15px;
          }
        }
      }
    }
    &-nav {
      margin-bottom: 30px;
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
<script>
  import {
    seoArticleInfo,
    seo_channelList,
    adv,
    seogetAdvert,
    getNextOrPreArticle
  } from "~/service/main-api";

  import seoHeader from "~/components/seo/seo-header.vue";
  import seoTopadvert from "~/components/seo/seo-topadvert.vue";
  import seoRightAdvert from "~/components/seo/seo-rightadvert.vue";
  export default {
    components: { seoHeader, seoTopadvert, seoRightAdvert },

    async asyncData(ctx) {
      var [channelList, data, advlist, rightAdvert] = await Promise.all([
        seo_channelList(),
        seoArticleInfo(ctx.route.params.id.split(".html")[0]),
        adv({ type: 1 }),
        seogetAdvert()
      ]);

      var channel = channelList.filter(i => i.id == data.channelId);
      if (channel.length > 0) {
        channel = channel[0];
        channel.href = "/zixun/" + channel.namePinyin;
      } else {
        channel = {};
      }
      data.content = (data.content || "")
        .replace(data.content ? /&(?!#?\w+;)/g : /&/g, "&amp;")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      data.recommend = data.recommend || [];

      return {
        channelList,
        data,
        channel,
        advlist,
        rightAdvert
      };
    },
    head() {
      return {
        title: this.data.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.data.intro
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.data.keywords
          }
        ]
      };
    }
  };
</script>
