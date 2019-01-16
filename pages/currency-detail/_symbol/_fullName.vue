<template>
  <div class="page">
    <div class="page-inner">
      <section class="sec-top">
        <el-row :gutter="80">
          <el-col :span="12" class="por">
            <el-tabs v-model="category" type="border-card">
              <el-tab-pane label="实时价格" name="price">
                <e-charts :options="livePriceOptions" />
              </el-tab-pane>
              <el-tab-pane label="综合指数" name="index">
                <el-popover placement="bottom-start" width="400" trigger="hover">
                  <dl class="chain-index-desc">
                    <dt>挖链指数:</dt>
                    <dd>挖链指数根据数字货币14项综合参数打出，分数越高，数字货币投资价值越高</dd>
                    <dt>挖矿指数:</dt>
                    <dd>挖矿指数根据矿机购买价格、算力、收益情况进行计算。分数越高，挖矿收益越高。</dd>
                    <dt>被操控指数</dt>
                    <dd>被操控指数是根据TOP10交易所交易量，与全球矿工地址持有数字货币指数得出。分数越高，被操控的可能性越大</dd>
                    <dt>短期投资指数</dt>
                    <dd>根据24小时成交额排名+30天币价变化对比值+24小时币价对比值。分数越高，短期投资收益越高。</dd>
                  </dl>
                  <span class="chain-index-title" slot="reference">什么是挖链指数？</span>
                </el-popover>
                <el-row class="chain-index-detail">
                  <el-col :span="6">
                    <h4 class="blue">{{chainIndexDetail.chainIndex}}</h4>
                    <p>挖链指数</p>
                  </el-col>
                  <el-col :span="6">
                    <h4 class="light-blue">{{chainIndexDetail.investIndex}}</h4>
                    <p>短期投资指数</p>
                  </el-col>
                  <el-col :span="6">
                    <h4 class="yellow">{{chainIndexDetail.miningIndex}}</h4>
                    <p>挖矿指数</p>
                  </el-col>
                  <el-col :span="6">
                    <h4 class="green">{{chainIndexDetail.controlIndex}}</h4>
                    <p>被操控指数</p>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="综合评价" name="rate">
                <div class="overall-rate">
                  <e-charts auto-resize :options="overallOptions" />
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="line-right"></div>
          </el-col>
          <el-col :span="12">
            <el-row class="currency-info" :gutter="20">
              <el-col :span="4">
                <img :src="coinInfo.webIcon" alt="">
              </el-col>
              <el-col :span="20">
                <h3 class="c-i-name">{{coinInfo.name}}
                  <span>{{coinInfo.shortName}}</span>
                </h3>
                <p class="c-i-price">当前价格
                  <em>{{coinMarketInfo.cnyPrice}}</em>
                </p>
                <el-row class="c-i-row">
                  <el-col :span="12">
                    挖链指数:
                    <em class="red">{{chainIndexDetail.chainIndex}}</em>
                  </el-col>
                  <el-col :span="12">
                    最新市值:
                    <span>{{coinMarketInfo.marketValue}}</span>
                  </el-col>
                </el-row>
                <el-row class="c-i-row">
                  <el-col :span="12">
                    涨幅(24H):
                    <em :class="{'rateUp':coinMarketInfo.flag>0,'rateDown':coinMarketInfo.flag<0}">
                      {{(coinMarketInfo.flag>0?'+':'-')+coinMarketInfo.range+'%'}}
                    </em>
                  </el-col>
                  <el-col :span="12">
                    近七日涨跌幅:
                    <span :class="{'rateUp':coinMarketInfo.sevenRange>0,'rateDown':coinMarketInfo.sevenRange<0}">
                      {{(coinMarketInfo.sevenRange>0?'+':'')+coinMarketInfo.sevenRange+'%'}}
                    </span>
                  </el-col>
                </el-row>
                <el-row class="c-i-row">
                  <el-col :span="12">
                    成交量(24H):
                    <em>{{coinMarketInfo.volume}}</em>
                  </el-col>
                  <el-col :span="12">
                    成交额(24H):
                    <span>{{coinMarketInfo.marketValue}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </section>
      <section class="sec-bottom">
        <el-row :gutter="54">
          <el-col :span="17">
            <el-tabs v-model="tabSecondaryActive">
              <!-- 交易所行情tab start -->
              <el-tab-pane label="交易所行情" name="market">
                <div v-if="tabSecondaryActive==='market'">
                  <el-table :fit="true" stripe :data="marketInfos">
                    <el-table-column prop="marketName" label="交易所" width="100" />
                    <el-table-column prop="newestTransactionPrice" label="最新成交价" width="120">
                      <template slot-scope="scope">
                        ${{scope.row.newestTransactionPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="h24ChangeRate" label="24H变化" width="120">
                      <template slot-scope="scope">
                        <div class="change-rate" :class="{rateUp:scope.row.h24ChangeRate>0,rateDown:scope.row.h24ChangeRate<0}">
                          {{ scope.row.h24ChangeRate +'%'}}
                          <i class="caret"></i>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="h24PriceMax" label="24H最高" width="120">
                      <template slot-scope="scope">
                        <span>${{scope.row.h24PriceMax}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="h24PriceMin" label="24H最低" width="120">
                      <template slot-scope="scope">
                        <span>${{scope.row.h24PriceMin}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="h24TransactionAmout" label="24H成交量" width="120" />
                    <el-table-column label="价格趋势(7d)">
                      <template slot-scope="scope">
                        <peity type="line" v-if="scope.row.svg" :options="initPeityOption(scope.row.svg)" :data="scope.row.svg" />
                        <peity type="line" v-if="!scope.row.svg" :options="initPeityOption(scope.row.svg)" :data="'0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <!-- 交易所行情tab end -->
              <!-- 挖链指数tab start -->
              <el-tab-pane label="挖链指数" name="index">
                <el-card class="graph-card">
                  <div slot="header">
                    <span>综合指数</span>
                    <el-popover ref="popover" placement="bottom-end" width="400" trigger="hover">
                      <dl class="chain-index-desc">
                        <dt>挖链指数:</dt>
                        <dd>挖链指数根据数字货币14项综合参数打出，分数越高，数字货币投资价值越高</dd>
                        <dt>挖矿指数:</dt>
                        <dd>挖矿指数根据矿机购买价格、算力、收益情况进行计算。分数越高，挖矿收益越高。</dd>
                        <dt>被操控指数</dt>
                        <dd>被操控指数是根据TOP10交易所交易量，与全球矿工地址持有数字货币指数得出。分数越高，被操控的可能性越大</dd>
                        <dt>短期投资指数</dt>
                        <dd>根据24小时成交额排名+30天币价变化对比值+24小时币价对比值。分数越高，短期投资收益越高。</dd>
                      </dl>
                      <span class="chain-index-title right" slot="reference">什么是挖链指数？</span>
                    </el-popover>
                  </div>
                  <el-row :gutter="10">
                    <el-col :span="6" class="index-desc-item">
                      <el-row class="index__content">
                        <el-col :span="8">
                          <span class="index-icon">
                            <i class="iconfont icon-zhishu blue"></i>
                          </span>
                        </el-col>
                        <el-col :span="16">
                          <p>挖链指数</p>
                          <h5>{{chainIndexDetail.chainIndex}}</h5>
                          <p class="rank-info">当前排名第
                            <em>{{chainIndexDetail.ranking}}</em>位</p>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="6" class="index-desc-item">
                      <el-row class="index__content">
                        <el-col :span="8">
                          <span class="index-icon">
                            <i class="iconfont icon-touzi light-blue"></i>
                          </span>
                        </el-col>
                        <el-col :span="16">
                          <p>短期投资指数</p>
                          <h5>{{chainIndexDetail.investIndex}}</h5>
                          <p class="rank-info">当前排名第
                            <em>{{chainIndexDetail.ranking}}</em>位</p>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="6" class="index-desc-item">
                      <el-row class="index__content">
                        <el-col :span="8">
                          <span class="index-icon">
                            <i class="iconfont icon-wakuang yellow"></i>
                          </span>
                        </el-col>
                        <el-col :span="16">
                          <p>挖矿指数</p>
                          <h5>{{chainIndexDetail.miningIndex}}</h5>
                          <p class="rank-info">当前排名第
                            <em>{{chainIndexDetail.ranking}}</em>位</p>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="6" class="index-desc-item">
                      <el-row class="index__content">
                        <el-col :span="8">
                          <span class="index-icon">
                            <i class="iconfont icon-caokong green"></i>
                          </span>
                        </el-col>
                        <el-col :span="16">
                          <p>被操控指数</p>
                          <h5>{{chainIndexDetail.controlIndex}}</h5>
                          <p class="rank-info">当前排名第
                            <em>{{chainIndexDetail.ranking}}</em>位</p>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card class="graph-card" header="综合指数波动">
                  <div class="chart-container">
                    <div class="chart__header">
                      <el-row class="chart__toolbar">
                        <el-col class="chart__title" :span="5">近三周数据</el-col>
                        <el-col :span="3">指数:
                          <em class="blue">{{chainIndexDetail.chainIndex}}</em>
                        </el-col>
                        <el-col :span="3">短期:
                          <em class="light-blue">{{chainIndexDetail.investIndex}}</em>
                        </el-col>
                        <el-col :span="3">矿指:
                          <em class="yellow">{{chainIndexDetail.miningIndex}}</em>
                        </el-col>
                        <el-col :span="3">操控:
                          <em class="green">{{chainIndexDetail.controlIndex}}</em>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="chart__body">
                      <e-charts auto-resize :options="indexChangeOptions" />
                    </div>
                  </div>
                </el-card>
                <el-card class="graph-card" header="货币综合评价">
                  <div class="overall-rate-chart">
                    <e-charts :options="overallOptions2" />
                  </div>
                </el-card>
                <el-card class="graph-card" header="关键数据分析">
                  <div class="chart-container">
                    <div class="chart__header">
                      <el-row>
                        <el-col class="chart__title" :span="5">成交量与价格波动分析</el-col>
                        <el-col :span="13">&nbsp;</el-col>
                        <el-col :span="3" class="text-right">
                          <span class="chart_volume_label"></span>成交量
                        </el-col>
                        <el-col :span="3" class="text-right">
                          <span class="chart_price_label"></span>价格
                        </el-col>
                      </el-row>
                    </div>
                    <div class="chart__body">
                      <e-charts auto-resize :options="priceChangeOptions" />
                    </div>
                  </div>
                  <div class="chart-container" v-if="hasMiningData">
                    <div class="chart__header">
                      <div class="chart__title">
                        挖矿回报率分析
                      </div>
                    </div>
                    <div class="chart__body">
                      <e-charts auto-resize :options="miningOptions" />
                    </div>
                  </div>
                  <div class="chart-container" v-if="hasRatioData">
                    <div class="chart__header">
                      <div class="chart__title">
                        TOP1000拥有币占比
                      </div>
                    </div>
                    <div class="chart__body">
                      <e-charts auto-resize :options="ratioOptions" />
                    </div>
                  </div>
                </el-card>
              </el-tab-pane>
              <!-- 挖链指数tab end -->
              <!-- 货币档案tab start -->
              <el-tab-pane label="货币档案" name="currency">
                <el-card class="graph-card" header="货币概述">
                  <div class="chart-container">
                    <dl class="el-row summary">
                      <div class="el-col el-col-8">
                        <dt>中文名</dt>
                        <dd>{{coinInfo.name}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>英文名</dt>
                        <dd>{{coinInfo.nameEn}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>英文简称</dt>
                        <dd>{{coinInfo.shortName}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>开发者</dt>
                        <dd>{{coinInfo.originator}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>区块时间</dt>
                        <dd>{{coinInfo.blockTime}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>发布日期</dt>
                        <dd>{{coinInfo.releaseTime|date('YYYY-MM-DD')}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>核心算法</dt>
                        <dd>{{coinInfo.coreAlgorithm}}</dd>
                      </div>
                      <div class="el-col el-col-8">
                        <dt>货币总量</dt>
                        <dd>{{coinInfo.totalAmount}}</dd>
                      </div>
                    </dl>
                  </div>
                </el-card>
                <el-card class="graph-card" header="货币概括">
                  <div class="chart-container">
                    <div class="intro" v-html="coinInfo.intro"></div>
                  </div>
                </el-card>
              </el-tab-pane>
              <!-- 货币档案tab end -->
            </el-tabs>
          </el-col>
          <el-col :span="7">
            <section>
              <hot-news></hot-news>
            </section>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>
<style scoped>
  .page-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .sec-top {
    border-bottom: 1px solid #e0e0e0;
  }

  .sec-bottom {
    margin-top: 20px;
  }

  .chain-index-desc {
    padding-left: 5px;
    padding-right: 5px;
  }

  .chain-index-desc dt:first-child {
    margin-top: 0;
  }

  .chain-index-desc dt {
    margin-top: 10px;
    font-size: 14px;
    line-height: 30px;
    font-weight: 500;
    color: #000;
  }

  .chain-index-desc dd {
    color: #505050;
    font-size: 12px;
    line-height: 20px;
  }

  .chain-index-title {
    font-size: 14px;
    line-height: 20px;
    color: #0063ee;
    cursor: pointer;
  }

  .chain-index-detail {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .chain-index-detail h4 {
    font-size: 26px;
    line-height: 46px;
  }

  .chain-index-detail p {
    font-size: 14px;
    line-height: 24px;
    color: #999;
  }

  .sec-top .el-tab-pane {
    height: 260px;
  }

  .overall-rate {
    width: 80%;
    height: 240px;
    margin: 0 auto;
  }

  .sec-top .echarts {
    width: 520px;
    height: 260px;
    margin: 0 auto;
  }

  .currency-info {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .c-i-name {
    font-size: 28px;
    color: #333;
    line-height: 50px;
  }

  .c-i-name span {
    font-size: 14px;
    margin-left: 15px;
  }

  .c-i-price {
    font-size: 14px;
    color: #222;
    line-height: 24px;
    margin-bottom: 30px;
  }

  .c-i-price em {
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    color: #f95453;
  }

  .c-i-row {
    font-size: 14px;
    color: #505050;
    line-height: 30px;
  }

  .c-i-row em {
    font-style: normal;
    font-weight: bold;
  }

  .index-icon {
    display: inline-block;
    margin-left: 4px;
    vertical-align: top;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #eee;
    text-align: center;
    line-height: 40px;
  }

  .index-desc-item {
    padding: 10px;
  }

  .index-desc-item:nth-child(1) .index__content {
    border-color: #4d87ea;
  }

  .index-desc-item:nth-child(2) .index__content {
    border-color: #4dadea;
  }

  .index-desc-item:nth-child(3) .index__content {
    border-color: #fdaa24;
  }

  .index-desc-item:nth-child(4) .index__content {
    border-color: #3dc28c;
  }

  .index-desc-item .iconfont {
    font-size: 24px;
  }

  .index__content {
    padding: 10px;
    border: 1px solid #ccc;
    line-height: 20px;
    font-size: 12px;
    color: #222;
  }

  .index__content h5 {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
  }

  .rank-info {
    color: #7f7f7f;
  }

  .rank-info em {
    font-style: normal;
    margin-left: 1px;
    margin-right: 1px;
    color: #f85353;
  }

  .chart-container {
    /*padding-left: .5em;*/
    /*padding-right: .5em;*/
  }

  .chart__header {
    padding: 0.5em;
    font-size: 14px;
    color: #999;
  }

  .chart__toolbar {
    padding-left: 2.5em;
    padding-right: 2.5em;
  }

  .chart__title {
    color: #333;
  }

  .text-right {
    text-align: right;
  }

  .chart__body {
    width: 100%;
  }

  .chart__header em {
    font-style: normal;
  }

  .blue {
    color: #4d87ea;
  }

  .light-blue {
    color: #4dadea;
  }

  .yellow {
    color: #fdaa24;
  }

  .green {
    color: #3dc28c;
  }

  .red {
    color: #f95453;
  }

  .overall-rate-chart {
    width: 100%;
  }

  .sec-bottom .echarts {
    width: 833px;
  }

  .summary {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  .summary dt,
  .summary dd {
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    color: #222;
  }

  .summary div {
    font-size: 0;
  }

  .summary dt {
    width: 5em;
  }

  .intro {
    padding-left: 0.5em;
    padding-right: 0.5em;
    font-size: 14px;
    line-height: 24px;
    color: #222;
  }

  .chart_volume_label,
  .chart_price_label {
    display: inline-block;
    width: 0.8em;
    height: 0.8em;
    margin-right: 3px;
    vertical-align: -1px;
  }

  .chart_volume_label {
    background-color: #4d87ea;
  }

  .chart_price_label {
    background-color: #f95453;
  }

  .sec-bottom {
    margin-top: 30px;
  }

  .por {
    position: relative;
  }

  .line-right {
    position: absolute;
    right: -15px;
    top: 20%;
    width: 1px;
    height: 60%;
    background-color: #eee;
  }

  .caret {
    border: 3px solid transparent;
    display: inline-block;
  }

  .rateUp .caret {
    border-bottom-color: #f95453;
    border-bottom-width: 5px;
    vertical-align: 2px;
  }

  .rateDown .caret {
    border-top-color: #3dc28c;
    border-top-width: 5px;
    vertical-align: -1px;
  }

  .change-rate {
    text-align: right;
    padding-right: 2.4em;
  }
</style>
<script>
  import ECharts from "vue-echarts";
  // import "echarts/lib/chart/line";
  // import "echarts/lib/chart/radar";
  // import "echarts/lib/component/tooltip";
  import NewsRankList from "~/components/news-rank-list";
  import hotNews from "../../../components/hot-news.vue";

  import moment from "moment";
  import {
    getNewsByCoinId,
    getNewsRank,
    coinIndexDetail,
    coinMarketInfo,
    historyMarketInfo,
    crawlerCoinDetail
  } from "~/service/main-api";
  import Peity from "vue-peity";

  import { INDEX_TYPE, MARKET_TYPE } from "~/store/constants";



  export default {
    components: {
      NewsRankList,
      ECharts,
      Peity,
      hotNews
    },
    data() {
      return {
        coinId: "",
        fullName: "",
        symbol: "BTC",
        category: "price",
        tabSecondaryActive: "market",
        coinInfo: {},
        coinMarketInfo: {},
        chainIndexDetail: {},
        marketInfos: [],
        peityOptions: {
          width: 80,
          height: 20,
          fill: "none",
          strokeWidth: 1.2,
          stroke: "#0063ee"
        },
        livePriceOptions: {
          color: ["#538BF8"],
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              let result = "";
              params.forEach((item, idx) => {
                if (
                  idx === 0 ||
                  (idx > 0 && item.axisIndex !== params[idx - 1].axisIndex)
                ) {
                  result += item.axisValueLabel + "<br/>";
                }
                result += `${item.seriesName}: $${item.value}<br/>`;
              });
              return result;
            },
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "8%",
            top: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            alignWithLabel: true,
            data: [],
            splitNumber: 5,
            axisLabel: {
              color: "#999",
              interval: function(index, value) {
                const hours = moment(value).hours();
                return hours % 12 == 0;
              },
              formatter: function(value) {
                if (value) {
                  return moment(value).format("HH:mm");
                } else {
                  return "";
                }
              }
            },
            axisLine: {
              lineStyle: {
                color: "#c7c8cb"
              }
            }
          },
          yAxis: {
            type: "value",
            minInterval: 0.0001,
            scale: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#eee"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#999",
              formatter: "${value}"
            },
            axisPointer: {
              label: {
                formatter: "${value}"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#eee"
              }
            }
          },
          series: {
            name: "价格",
            type: "line",
            smooth: true, // 平滑显示
            areaStyle: {
              normal: {
                color: "rgba(65,133,255,0.1)"
              }
            },
            data: []
          }
        },
        overallOptions: {
          color: ["#538BF8"],
          tooltip: {
            trigger: "axis",
            position: function(pos, params, dom, rect, size) {
              let obj = {};
              if (pos[1] < size.viewSize[1] / 2) {
                obj.top = pos[1] + 10;
              } else {
                obj.bottom = size.viewSize[1] - pos[1];
              }
              obj[["left", "right"][+(pos[1] > size.viewSize[0] / 2)]] =
                pos[0] + 10;
              return obj;
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          radar: {
            indicator: [
              { text: "价格震荡", max: 100, color: "#333" },
              { text: "换手率", max: 100, color: "#333" },
              { text: "流通率", max: 100, color: "#333" },
              { text: "交易平台数量", max: 100, color: "#333" },
              { text: "挖矿回报", max: 100, color: "#333" },
              { text: "总市值", max: 100, color: "#333" }
            ],
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#eee"
              }
            },
            splitArea: {
              areaStyle: {
                color: "#fff"
              }
            },
            radius: 80,
            center: ["30%", "50%"]
          },
          series: [
            {
              type: "radar",
              tooltip: {
                trigger: "item"
              },
              areaStyle: {
                normal: {
                  color: "#68B8FF"
                }
              },
              data: [
                {
                  value: [],
                  name: "综合评价"
                }
              ]
            }
          ]
        },
        overallOptions2: {
          color: ["#538BF8"],
          tooltip: {
            trigger: "axis",
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          radar: [
            {
              indicator: [
                { text: "价格震荡", max: 100, color: "#333" },
                { text: "换手率", max: 100, color: "#333" },
                { text: "流通率", max: 100, color: "#333" },
                { text: "交易平台数量", max: 100, color: "#333" },
                { text: "挖矿回报", max: 100, color: "#333" },
                { text: "总市值", max: 100, color: "#333" }
              ],
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "#eee"
                }
              },
              splitArea: {
                areaStyle: {
                  color: "#fff"
                }
              },
              radius: 120,
              center: ["50%", "50%"]
            }
          ],
          series: [
            {
              type: "radar",
              tooltip: {
                trigger: "item"
              },
              areaStyle: {
                normal: {
                  color: "#68B8FF"
                }
              },
              data: [
                {
                  value: [],
                  name: "综合评价"
                }
              ]
            }
          ]
        },
        indexChangeOptions: {
          color: ["#4D87EA", "#4DADEA", "#FDAA24", "#3DC28C"],
          grid: {
            top: "3%",
            bottom: "8%",
            left: "5%",
            right: "3%"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
            formatter: function(params) {
              let result = "";
              params.forEach((item, idx) => {
                if (
                  idx === 0 ||
                  (idx > 0 && item.axisIndex !== params[idx - 1].axisIndex)
                ) {
                  result += item.axisValueLabel + "<br/>";
                }
                result += `${item.seriesName}: ${item.value}<br/>`;
              });
              return result;
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [],
              axisLine: {
                lineStyle: {
                  color: "#c7c8cb"
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: "#999",
                interval: function(index, value) {
                  return moment(value).format("HH:mm") === "00:00";
                },
                formatter: function(value) {
                  return moment(value).format("MM/DD");
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#999"
              },
              splitLine: {
                lineStyle: {
                  color: "#eee"
                }
              }
            }
          ],
          series: [
            {
              name: "指数",
              type: "line",
              data: []
            },
            {
              name: "短期",
              type: "line",
              data: []
            },
            {
              name: "矿指",
              type: "line",
              data: []
            },
            {
              name: "操控",
              type: "line",
              data: []
            }
          ]
        },
        priceChangeOptions: {
          color: ["#4D87EA", "#F95453"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
            formatter: function(params) {
              let result = "";
              params.forEach((item, idx) => {
                if (
                  idx === 0 ||
                  (idx > 0 && item.axisIndex !== params[idx - 1].axisIndex)
                ) {
                  result += item.axisValueLabel + "<br/>";
                }
                if (item.seriesName === "价格") {
                  result += `${item.seriesName}: $${item.value}<br/>`;
                } else {
                  result += `${item.seriesName}: ${item.value}<br/>`;
                }
              });
              return result;
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false, // 坐标轴两侧不留白
              axisTick: {
                show: false
                // alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: "#c7c8cb"
                }
              },
              axisLabel: {
                color: "#999"
              },
              data: []
            }
          ],
          yAxis: [
            {
              type: "value",
              // 该处空格用于解决标签不靠左
              name: "单位/个            ",
              nameTextStyle: {
                color: "#999"
              },
              position: "left",
              axisLine: {
                show: false
              },
              axisLabel: {
                color: "#999",
                formatter: function(value) {
                  const intVal = parseInt(value);
                  let unit = "";
                  let val = intVal;
                  if (intVal >= 1e4) {
                    unit = "万";
                    val = intVal / 10000;
                  }
                  if (intVal >= 1e8) {
                    unit = "亿";
                    val = intVal / 1e8;
                  }
                  if (intVal >= 1e12) {
                    unit = "万亿";
                    val = intVal / 1e12;
                  }
                  return val + unit + "+";
                }
              },
              scale: true,
              minInterval: 100,
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "#eee"
                }
              }
            },
            {
              type: "value",
              position: "right",
              // min: 'dataMin',
              // max: 'dataMax',
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: "${value}"
                }
              },
              scale: true,
              minInterval: 100,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#999"
                }
              },
              axisLabel: {
                formatter: "$ {value}"
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "成交量",
              type: "line",
              yAxisIndex: 0,
              data: []
            },
            {
              name: "价格",
              type: "line",
              yAxisIndex: 1,
              data: []
            }
          ]
        },
        hasMiningData: false,
        miningOptions: {
          color: ["#4D87EA"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            formatter: function(params) {
              let result = "";
              params.forEach((item, idx) => {
                if (
                  idx === 0 ||
                  (idx > 0 && item.axisIndex !== params[idx - 1].axisIndex)
                ) {
                  result += item.axisValueLabel + "<br/>";
                }
                result += `${item.seriesName}: ${item.value}%<br/>`;
              });
              return result;
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "6%",
            top: "6%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#c7c8cb"
                }
              },
              data: [],
              axisLabel: {
                color: "#999",
                interval: function(index, value) {
                  return moment(value).format("HH:mm") === "00:00";
                },
                formatter: function(value) {
                  return moment(value).format("MM/DD");
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              scale: true,
              minInterval: 10,
              axisTick: {
                show: false
              },
              axisPointer: {
                label: {
                  formatter: "{value}%"
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "#eee"
                }
              },
              axisLabel: {
                color: "#999",
                formatter: "{value}%"
              }
            }
          ],
          series: [
            {
              name: "回报率",
              type: "line",
              smooth: true, // 平滑显示
              areaStyle: {
                normal: {
                  color: "rgba(65,133,255,0.1)"
                }
              },
              data: []
            }
          ]
        },
        hasRatioData: false,
        ratioOptions: {
          color: ["#4D87EA"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            formatter: function(params) {
              let result = "";
              params.forEach((item, idx) => {
                if (
                  idx === 0 ||
                  (idx > 0 && item.axisIndex !== params[idx - 1].axisIndex)
                ) {
                  result += item.axisValueLabel + "<br/>";
                }
                result += `${item.seriesName}: ${item.value}%<br/>`;
              });
              return result;
            },
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            padding: [10, 15, 10, 15],
            extraCssText:
              "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);border-radius:0;"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "6%",
            top: "6%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#c7c8cb"
                }
              },
              axisLabel: {
                // show: true,
                color: "#999",
                interval: function(index, value) {
                  return moment(value).format("HH:mm") === "00:01";
                },
                formatter: function(value) {
                  return moment(value).format("MM/DD");
                }
              },
              data: []
            }
          ],
          yAxis: [
            {
              type: "value",
              // min: 'dataMin',
              // max: 'dataMax',
              scale: true,
              minInterval: 0.2,
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#999"
                }
              },
              axisLabel: {
                formatter: "{value}%"
              },
              axisPointer: {
                label: {
                  formatter: "{value}%"
                }
              },
              splitLine: {
                lineStyle: {
                  color: "#eee"
                }
              }
            }
          ],
          series: [
            {
              name: "占比",
              type: "line",
              smooth: true, // 平滑显示
              areaStyle: {
                normal: {
                  color: "rgba(65,133,255,0.1)"
                }
              },
              data: []
            }
          ]
        }
      };
    },
    methods: {
      initCoinInfo() {
        crawlerCoinDetail(this.fullName).then(res => {
          this.coinId = res.id;
          this.coinInfo = res;
        });
      },
      initLivePrice() {
        const vm = this;
        if (this.symbol == "BCX" || this.symbol == "BTG") {
          var symbol = this.symbol + "btc";
        } else {
          var symbol = this.symbol + "usdt";
        }
        historyMarketInfo(symbol.toLowerCase(), "30min", "48").then(data => {
          let xAxisLabel = [];
          let values = [];
          data.sort(function(a, b) {
            return a.id - b.id;
          });
          data.forEach(item => {
            xAxisLabel.push(moment(item.id * 1000).format("YYYY/MM/DD HH:mm:ss"));
            values.push(item.close.toFixed(2));
          });

          this.livePriceOptions.xAxis.data = xAxisLabel;
          this.livePriceOptions.series.data = values;

          setTimeout(() => vm.initLivePrice(), 60 * 1000);
        });
      },
      initCoinIndex() {
        const vm = this;
        coinIndexDetail(this.symbol).then(res => {
          const coinIndexInfos = res;
          this.chainIndexDetail = coinIndexInfos.indexScoreCard;
          const overallRate = coinIndexInfos.overallMerit || {};
          const overallRateValues = [
            Number(overallRate["priceShocks"]) * 100,
            Number(overallRate["turnoverRate"]) * 100,
            Number(overallRate["flowRate"]) * 100,
            Number(overallRate["exchangeSum"]) * 100,
            Number(overallRate["miningReturns"]) * 100,
            Number(overallRate["totalMarket"]) * 100
          ];
          this.overallOptions.series[0].data[0].value = overallRateValues;
          this.overallOptions2.series[0].data[0].value = overallRateValues;
          // 成交量与价格
          const priceVolumeData = coinIndexInfos.priceAnalysis || [];
          const category = [];
          const volumes = [];
          const price = [];
          // priceVolumeData.sort((a, b) => moment(a.date).diff(moment(b.date)));
          priceVolumeData.forEach(item => {
            category.push(item.date);
            volumes.push(item.volume);
            price.push(item.price);
          });
          // this.priceChangeOptions.yAxis[0].min = util.min(volumes);
          // this.priceChangeOptions.yAxis[0].max = util.max(volumes);
          // this.priceChangeOptions.yAxis[1].min = util.min(price);
          // this.priceChangeOptions.yAxis[1].max = util.max(price);
          this.priceChangeOptions.xAxis[0].data = category;
          this.priceChangeOptions.series[0].data = volumes;
          this.priceChangeOptions.series[1].data = price;

          const mining = coinIndexInfos.mining || [];
          const miningCategory = [];
          const miningData = [];
          mining.forEach(item => {
            miningCategory.push(moment(item.date).format("YYYY-MM-DD HH:mm"));
            miningData.push(item.rate);
          });
          vm.hasMiningData = miningData.length > 0;
          this.miningOptions.xAxis[0].data = miningCategory;
          this.miningOptions.series[0].data = miningData;

          const indexChange = coinIndexInfos.sevenDaysIndexScoreCard || [];
          const indexChangeCategory = [];
          const indexChangeData = [[], [], [], []];
          indexChange.sort((a, b) =>
            moment(a.indexTime).diff(moment(b.indexTime))
          );
          indexChange.forEach(item => {
            indexChangeCategory.push(
              moment(item.indexTime).format("YYYY/MM/DD HH:mm")
            );
            indexChangeData[0].push(item.chainIndex);
            indexChangeData[1].push(item.investIndex);
            indexChangeData[2].push(item.miningIndex);
            indexChangeData[3].push(item.controlIndex);
          });
          this.indexChangeOptions.xAxis[0].data = indexChangeCategory;
          this.indexChangeOptions.series[0].data = indexChangeData[0];
          this.indexChangeOptions.series[1].data = indexChangeData[1];
          this.indexChangeOptions.series[2].data = indexChangeData[2];
          this.indexChangeOptions.series[3].data = indexChangeData[3];

          const ratio = coinIndexInfos.rich || [];
          const ratioCategory = [];
          const ratioData = [];

          ratio.forEach(item => {
            if (item.date) {
              ratioCategory.push(moment(item.date).format("YYYY/MM/DD HH:MM"));
              ratioData.push(item.rate);
            }
          });

          vm.hasRatioData = ratioData.length > 0;

          this.ratioOptions.xAxis[0].data = ratioCategory;
          this.ratioOptions.series[0].data = ratioData;
        });
      },
      initCoinMarketInfo() {
        coinMarketInfo(this.symbol).then(res => {
          res.markets.forEach(item => {
            item.__peityOptions = this.initPeityOption(this.svg);
            // setTimeout(function () {
            //   item.__show = true;
            // }, 1000);
          });
          this.marketInfos = res.markets;
          this.coinMarketInfo = res.coinIndex;
          this.coinMarketInfo.range = parseFloat(this.coinMarketInfo.range);
          this.coinMarketInfo.sevenRange = parseFloat(
            this.coinMarketInfo.sevenRange
          );
        });
      },

      initPeityOption(data = "") {
        const arr = data.split(",");
        const max = Math.max.apply(null, arr);
        const min = Math.min.apply(null, arr);
        return Object.assign({}, this.peityOptions, { max, min });
      },
      registerEventNextHalfHour(time) {
        // const vm = this;
        // const nextIsHalf = moment(time).minutes() < 30;
        // const nextTime = moment(time)
        //   .add(nextIsHalf ? 0 : 1, 'hour')
        //   .minute(nextIsHalf ? 30 : 0)
        //   .second(0);
        // setTimeout(function () {
        //   vm.initLivePrice();
        //   // setInterval(vm.initLivePrice, 30 * 60 * 1000);
        // }, nextTime.toDate());
      }
    },

    mounted() {
      const type = this.$store.state.initCurrencyDetailType;
      if (type === MARKET_TYPE) {
        this.category = "price";
        this.tabSecondaryActive = "market";
      }
      if (type === INDEX_TYPE) {
        this.category = "index";
        this.tabSecondaryActive = "index";
      }
      this.symbol = this.$route.params.symbol || "BTC";
      this.fullName = this.$route.params.fullName || "bitcoin";
      this.initCoinInfo();
      this.initLivePrice();
      this.initCoinIndex();
      this.initCoinMarketInfo();
    },
    head() {
      return {
        title:
          this.$route.params.symbol + "-实时价格行情_挖矿分析_交易趋势-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content: `挖链网为您提供最${this.$route.params.symbol}价格趋势,${
              this.$route.params.symbol
            }行情,提供${this.$route.params.symbol}综合评价、${
              this.$route.params.symbol
            }成交量与${this.$route.params.symbol}价格波动风险、为您提供最新的${
              this.$route.params.symbol
            }挖矿回报率分析和货币排行榜`
          },
          {
            hid: "keywords",
            name: "keywords",
            content: `${this.$route.params.symbol}行情,${
              this.$route.params.symbol
            }趋势,${this.$route.params.symbol}综合分析`
          }
        ]
      };
    }
  };
</script>
