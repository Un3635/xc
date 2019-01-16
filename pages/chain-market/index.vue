<template>
    <div class="page-chain-market">
        <!--  v-for="(i,idx) in 20" :key="idx" -->
        <div class="pcm-tab">
            <a href="/chain-market" class="active">挖链大盘</a>
            <a href="/chain-index">挖链指数</a>
        </div>
        <div class="pcm-list">
            <div class="pcm-list-left">
                <div class="pcm-list-item bgleft">币种</div>
                <div class="pcm-list-item" v-for="(i,idx) in list" :key="idx">
                    <span class="zh">{{i.zhName}}</span><br>
                    <span class="en">{{i.enName}}</span>
                </div>
            </div>
            <div class="pcm-list-right">
                <div class="pcm-list-right-row bgright">
                    <div class="pcm-list-item bgright">价格</div>
                    <div class="pcm-list-item bgright">24h成交额</div>
                    <div class="pcm-list-item bgright">24h涨幅</div>
                    <div class="pcm-list-item bgright">市值</div>
                    <div class="pcm-list-item bgright">流通数量</div>
                    <div class="pcm-list-item bgright">发行总量</div>
                </div>
                <div class="pcm-list-right-row" v-for="(i,idx) in list" :key="idx">
                    <div class="pcm-list-item">{{i.coinPrice|currency('$',2)}}</div>
                    <div class="pcm-list-item">{{i.dealAmount|readable}}</div>
                    <div class="pcm-list-item" :class="{'rateUp':isRateUp(i.changeRate),'rateDown':isRateDown(i.changeRate)}">{{i.changeRate}}%</div>
                    <div class="pcm-list-item">{{i.marketValue|currency('$',2)}}亿</div>
                    <div class="pcm-list-item">{{i.turnover|unitWan}}</div>
                    <div class="pcm-list-item">{{i.sumUp|readable(0)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../chain-index/index.scss";
</style>
<script>
    import { getChainMarketList } from "../../other/data";
    export default {
      methods: {
        isRateUp(i) {
          return Number(i) > 0;
        },
        isRateDown(i) {
          return !this.isRateUp(i);
        }
      },
      async asyncData() {
        var list = await getChainMarketList();

        return {
          list
        };
      },
      head() {
        return {
          title: "数字货币行情中心_今天加密货币行情查询-挖链网",
          meta: [
            {
              hid: "description",
              name: "description",
              content:
                "挖链网提供最快捷的数字货币/加密货币行情分析，数据涵盖指数、行情、大盘分析、币圈新闻、货币行情等，让您对币圈的动向实时掌握。"
            },
            {
              hid: "keywords",
              name: "keywords",
              content:
                "数字货币中心,加密货币行情,数字货币行情查询,加密货币实时行情,挖链指数,数字货币指数"
            }
          ]
        };
      }
    };
</script>
