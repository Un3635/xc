<template>
    <div class="page-chain-market">
        <!--  v-for="(i,idx) in 20" :key="idx" -->
        <div class="pcm-tab">
            <a href="/chain-market">挖链大盘</a>
            <a class="active" href="/chain-index">挖链指数</a>
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
                    <div class="pcm-list-item bgright">挖链指数</div>
                    <div class="pcm-list-item bgright">挖矿指数</div>
                    <div class="pcm-list-item bgright">被操控指数</div>
                    <div class="pcm-list-item bgright">短期投资指数</div>
                </div>
                <div class="pcm-list-right-row" v-for="(i,idx) in list" :key="idx">
                    <div class="pcm-list-item">{{i.chainIndex}}</div>
                    <div class="pcm-list-item">{{i.miningIndex}}</div>
                    <div class="pcm-list-item">{{i.controlIndex}}</div>
                    <div class="pcm-list-item">{{i.investIndex}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "./index.scss";
</style>
<script>
    import { getChainIndexRank } from "../../other/data";
    export default {
      async asyncData() {
        var list = await getChainIndexRank();

        return {
          list
        };
      },
      head() {
        return {
          title: "挖链指数_币圈价格趋势挖矿投资指数_-挖链网",
          meta: [
            {
              hid: "description",
              name: "description",
              content:
                "挖链指数为您提供最新币圈价格趋势,数字货币行情,提供加密数字货币综合评价、数字货币成交量与价格波动风险、为您提供最新的挖矿回报率分析和货币排行榜。"
            },
            {
              hid: "keywords",
              name: "keywords",
              content: "挖链指数,币圈行情,数字加密货币价格趋势"
            }
          ]
        };
      }
    };
</script>
