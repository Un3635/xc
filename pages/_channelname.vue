<template>
  <div class="page">
    <div class="page-inner">
      <el-row :gutter="24">
        <el-col :span="16">
          <div class="page-inner-nav">
            <a href="/">首页</a>
            <span>></span>
            <a>{{channelname}}</a>
          </div>
          <h3 class="page-inner-xiang">{{channelname}}相关文章</h3>
          <span v-if="articleList.length==0">暂无数据</span>
          <article-list :articleList="articleList" :pageInfo="pageInfo" @loadMore="loadMore()" v-if="articleList.length>0"></article-list>
        </el-col>
        <el-col :span="7">
          <section>
            <thumbnail-ads :items="advlist.rightAdvert" />
          </section>
          <section class="sec-bottom">
            <HotNews></HotNews>
          </section>
          <section>
            <adv-full :list="advlist.rightBarAdvert" class="tagRightBottom"></adv-full>
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ArticleList from "~/components/article-list";
import ThumbnailAds from "~/components/thumbnail-ads";
import AdvFull from "~/components/adv-full";
import HotNews from "~/components/hot-news.vue";
import {
  adv,
  getTagArticle,
  getNewsRank,
  hotArticleList,
  getChannelList
} from "~/service/main-api";

var tdks = [
  {
    name: "头条",
    t: "挖链头条新闻-挖链网",
    d:
      "挖链头条，敏锐洞察区块链全球最新资讯，实时关注区块链行情动态,区块链大事件早知道，尽在挖链头条!",
    k: "区块链资讯,区块链头条,区块链新闻,比特币资讯,数字货币资讯,区块链最新消息"
  },
  {
    name: "大咖说",
    t: "挖链大咖说-挖链网",
    d:
      "挖链大咖说，聚集了区块链行业大咖、区块链专业人士，分析区块链价值、前景以及数字货币的行情走向，带你全方位读懂区块链。",
    k: "区块链大咖,区块链行业大佬,V神,李笑来,区块链专家,区块链大佬"
  },
  {
    name: "视听",
    t: "区块链视听频道-挖链网",
    d:
      "挖链视听，挖链网对区块链大咖的独家专访，以大咖视角分析区块链动态与币圈行情，提供最前沿的专业行情预测与前景分析！",
    k: "区块链专题,区块链专访,区块链行业解读,区块链人物专访,视频专访"
  },
  {
    name: "币圈",
    t: "数字货币最新动态-挖链网",
    d:
      "币圈，提供币圈最新新闻、数字货币最新行情，包括比特币、以太坊、瑞波币等数字货币最新消息。",
    k: "币圈,币圈新闻,币圈最新资讯,数字货币行情,虚拟货币行情"
  },
  {
    name: "区块链",
    t: "全方位解读区块链-挖链网",
    d:
      "区块链频道提供区块链最新资讯、区块链知识讲解、区块链技术及应用探讨等，让人人都能读懂并走进区块链。",
    k:
      "区块链,区块链是什么,区块链资讯,区块链新闻,区块链技术,区块链应用,区块链前景"
  },
  {
    name: "矿圈",
    t: "矿圈新闻早知道-挖链网",
    d:
      "挖链矿圈提供矿圈最新资讯，挖矿市场行情与前景、市场上数字货币挖矿机情况等，让您及时把握矿圈行情。",
    k: "比特币挖矿机最新消息,挖矿市场行情,挖矿前景,矿机消息,矿机价格"
  },
  {
    name: "深度",
    t: "深度解读区块链-挖链网",
    d: "挖链深度分析区块链最新行情、投资价值、未来走向等区块链相关消息。",
    k: "深度分析,区块链深度解读,深度解释区块链,数字货币深度分析"
  }
];
export default {
  components: {
    ArticleList,
    AdvFull,
    ThumbnailAds,
    HotNews
  },
  methods: {
    loadMore() {
      getTagArticle(this.channelId, this.rows, ++this.page).then(data => {
        this.articleList = this.articleList.concat(data.list);
        this.pageInfo = data.page;
      });
    }
  },
  data() {
    return {
      advlist: []
    };
  },
  mounted() {
    adv({
      type: 2
    }).then(res => {
      this.advlist = res;
    });
  },

  async asyncData({ params }) {
    var list = await getChannelList();
    var channel = list.filter(i => i.namePinyin == params.channelname);
    if (channel.length > 0) {
      var channelid = channel[0].id;
      var channelname = channel[0].name;
    } else {
      var channelid = 26;
    }

    var _data = {
      channelId: channelid,
      rows: 10,
      page: 1
    };
    var data = await Promise.all([
      hotArticleList(),
      getNewsRank(),
      getTagArticle(_data.channelId, _data.rows, _data.page)
    ]);

    return {
      channelId: _data.channelId,
      rows: _data.rows,
      page: _data.page,
      hotArticleList: data[0],
      newsList: data[1],
      articleList: data[2].list ? data[2].list : [],
      pageInfo: data[2].page ? data[2].page : [],
      channelname,
      channel: channel[0]
    };
  },
  head() {
    var tdk = tdks.filter(i => i.name == this.channel.name);
    if (tdk.length > 0) {
      tdk = tdk[0];
      return {
        title: tdk.t,
        meta: [
          {
            hid: "description",
            name: "description",
            content: tdk.d
          },
          {
            hid: "keywords",
            name: "keywords",
            content: tdk.k
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .page-inner {
    width: 1180px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 10px;
    &-nav {
      margin-bottom: 26px;
      a {
        font-size: 12px;
        color: #000000;
        &[href] {
          color: #888888;
          &:hover {
            color: #666666;
          }
        }
      }
      span {
        color: #888888;
        margin: 0 5px;
      }
    }
    &-xiang{
      font-size: 24px;
      padding-bottom: 15px;
      border-bottom: 1px solid #EEEEEE;
    }
  }

  
</style>
