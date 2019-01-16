<template>
  <div class="page">
    <ristShow></ristShow>
    <div class="page-inner">
      <el-table class="row-link" stripe :data="cryptoCurrencyInfos" :default-sort="{prop: 'marketValue', order: 'descending'}">
        <el-table-column type="index" :index="indexMethod" label="序号" width="80" />
        <el-table-column prop="enName" label="币种" width="120">
          <template slot-scope="scope">
            <div class="coin-name" @click="selectedRow(scope.row)">
              <span><img class="coin-icon" :src="scope.row.coinLogo" alt=""></span>
              <span>{{ scope.row.enName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="marketValue" label="市值" sortable width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.marketValue|currency('$',2) }}亿</span>
          </template>
        </el-table-column>
        <el-table-column prop="coinPrice" label="价格" sortable width="140">
          <template slot-scope="scope">
            <span>{{scope.row.coinPrice|currency('$',2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="turnover" label="流通数量" sortable width="160">
          <template slot-scope="scope">
            <span>{{scope.row.turnover|unitWan}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealAmount" label="24小时成交额" sortable width="160">
          <template slot-scope="scope">
            <span>{{scope.row.dealAmount|readable}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeRate" label="24小时涨幅" sortable width="180">
          <template slot-scope="scope">
            <span :class="{'rateUp':isRateUp(scope),'rateDown':isRateDown(scope)}">
              {{changeRateFormatter(scope.row.changeRate)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="sumUp" label="发行总量" sortable width="180">
          <template slot-scope="scope">
            <span>{{scope.row.sumUp|readable(0)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
  .page-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding-top: 38px;
    padding-bottom: 30px;
  }

  .coin-icon {
    display: inline-block;
    vertical-align: -3px;
    width: 15px;
  }

  .coin-name {
    font-weight: normal;
    color: #0063ee;
  }

  .coin-name:hover,
  .coin-name:focus {
    color: #f95453;
    cursor: pointer;
  }

  .coin-name span {
    vertical-align: middle;
  }
</style>
<script>
  import { getChainMarketList } from "~/service/main-api";
  import { mapMutations } from "vuex";
  import { CURRENCY_DETAIL_INIT_TYPE } from "~/store/mutation-types";
  import { MARKET_TYPE } from "~/store/constants";
  import ristShow from "~/components/ristshow";

  export default {
    data() {
      return {
        cryptoCurrencyInfos: []
      };
    },
    components: { ristShow },
    methods: {
      ...mapMutations({
        changeDetailType: CURRENCY_DETAIL_INIT_TYPE
      }),
      initPage() {
        getChainMarketList()
          .then(res => {
            res.forEach(item => {
              item.coinPrice = +item.coinPrice;
              item.dealAmount = +item.dealAmount;
              item.marketValue = +item.marketValue;
              item.turnover = +item.turnover;
              item.changeRate = +item.changeRate;
              item.sumUp = +item.sumUp;
              if (item.coinLogo.indexOf("http") < 0) {
                item.coinLogo = "//" + item.coinLogo;
              }
            });
            return res;
          })
          .then(res => {
            res = res.sort((a, b) => b.marketValue - a.marketValue);
            this.cryptoCurrencyInfos = res;
          });
      },
      selectedRow(row) {
        this.changeDetailType(MARKET_TYPE);
        this.$router.push("currency-detail/" + row.enName + "/" + row.fullName);
      },
      indexMethod(index) {
        return index + 1;
      },
      changeRateFormatter(changeRate) {
        if (!changeRate) return "";
        if (Number(changeRate) > 0) {
          return "+" + changeRate + "%";
        } else {
          return changeRate + "%";
        }
      },
      isRateUp(scope) {
        return Number(scope.row.changeRate) > 0;
      },
      isRateDown(scope) {
        return !this.isRateUp(scope);
      }
    },
    mounted() {
      this.initPage();
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
