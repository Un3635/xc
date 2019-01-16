<template>
  <div class="page_channelname">
    <wl-downloadapp/>
    <div class="page_channelname_nav">
      <a class="page_channelname_nav_back" href="javascript:void(0)" @click="back"></a>
      <span> <img src="../assets/img/home_walian_logo@3x.png" class="head_img" alt="">挖链网</span>
    </div>

    <div class="page_channelname_list">
      <wl-article-list :list="list" @loadMore='loadMore' :pageinfo='page' :loading='loading' />
    </div>
  </div>

</template>
<style lang="scss">
  @import "../other/util.scss";
  .page_channelname_nav {
    line-height: p2r(44);
    height: p2r(44);
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    &_img {
      width: p2r(24);
      height: p2r(24);
      font-size: p2r(18);
      color: #000000;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: p2r(6);
    }
    &_back {
      position: absolute;
      left: p2r(20);
      top: p2r(15);
      width: p2r(14);
      height: p2r(14);
      border-left: 2px solid #000000;
      border-bottom: 2px solid #000000;
      transform: rotate(45deg);
    }
    .head_img {
      width: p2r(33);
      height: p2r(18);
      font-size: p2r(18);
      color: #000000;
      vertical-align: middle;
      margin-right: p2r(6);
    }
  }

  .page_channelname_list {
    padding: p2r(16);
  }
</style>


<script>
  import wlDownloadapp from "../components/wl-downloadapp.vue";
  import { getTagArticle, getChannelList } from "../other/data";
  import wlArticleList from "../components/wl-article-list.vue";

  var tdks = [
    {
      name: "头条",
      t: "挖链头条新闻-挖链网",
      d:
        "挖链头条,敏锐洞察区块链全球最新资讯,实时关注区块链行情动态,区块链大事件早知道,尽在挖链头条!",
      k: "区块链资讯,区块链头条,区块链新闻,比特币资讯,数字货币资讯,区块链最新消息"
    },
    {
      name: "大咖说",
      t: "挖链大咖说-挖链网",
      d:
        "挖链大咖说,聚集了区块链行业大咖、区块链专业人士,分析区块链价值、前景以及数字货币的行情走向,带你全方位读懂区块链。",
      k: "区块链大咖,区块链行业大佬,V神,李笑来,区块链专家,区块链大佬"
    },
    {
      name: "视听",
      t: "区块链视听频道-挖链网",
      d:
        "挖链视听,挖链网对区块链大咖的独家专访,以大咖视角分析区块链动态与币圈行情,提供最前沿的专业行情预测与前景分析！",
      k: "区块链专题,区块链专访,区块链行业解读,区块链人物专访,视频专访"
    },
    {
      name: "币圈",
      t: "数字货币最新动态-挖链网",
      d:
        "币圈,提供币圈最新新闻、数字货币最新行情,包括比特币、以太坊、瑞波币等数字货币最新消息。",
      k: "币圈,币圈新闻,币圈最新资讯,数字货币行情,虚拟货币行情"
    },
    {
      name: "区块链",
      t: "全方位解读区块链-挖链网",
      d:
        "区块链频道提供区块链最新资讯、区块链知识讲解、区块链技术及应用探讨等,让人人都能读懂并走进区块链。",
      k:
        "区块链,区块链是什么,区块链资讯,区块链新闻,区块链技术,区块链应用,区块链前景"
    },
    {
      name: "矿圈",
      t: "矿圈新闻早知道-挖链网",
      d:
        "挖链矿圈提供矿圈最新资讯,挖矿市场行情与前景、市场上数字货币挖矿机情况等,让您及时把握矿圈行情。",
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
    layout: "empty",
    components: { wlDownloadapp, wlArticleList },
    methods: {
      back() {
        this.$router.back(-1);
      },
      async loadMore() {
        this.loading = true;
        var list = await getChannelList();
        var channel = list.filter(
          i => i.namePinyin == this.$route.params.channelname
        );
        if (channel.length > 0) {
          var channelid = channel[0].id;
          var channelname = channel[0].name;
        } else {
          var channelid = 26;
        }
        var _data = {
          channelId: channelid,
          rows: 10,
          page: ++this.page.pageNum,
          tagId: null
        };
        var { page, list } = await getTagArticle(_data);
        this.page = page;
        this.list = this.list.concat(list);
        this.loading = false;
      }
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
        page: 1,
        tagId: null
      };
      var loading = false;

      var { page, list, tagDetail } = await getTagArticle(_data);
      return {
        page,
        list,
        tagDetail,
        loading,
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
