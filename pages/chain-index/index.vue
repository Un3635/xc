<template>
  <div class="page">
    <div class="page-container">
      <el-row :gutter="60">
        <el-col :span="17">
          <el-table class="row-link index" stripe :fit="true" :data="indexData" :default-sort="{prop:'chainIndex',order:'descending'}">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="enName" label="货币名" width="130">
              <template slot-scope="scope">
                <div class="coin-name" @click="selectedRow(scope.row)">
                  <p>{{scope.row.zhName}}</p>
                  <p>{{scope.row.enName}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="chainIndex" label="挖链指数" sortable width="150">
              <template slot-scope="scope">
                <span>{{scope.row.chainIndex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="controlIndex" label="被操控指数" sortable width="150">
              <template slot-scope="scope">
                <span>{{scope.row.controlIndex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="investIndex" label="短期投资指数" sortable width="150">
              <template slot-scope="scope">
                <span>{{scope.row.investIndex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="miningIndex" label="挖矿指数" sortable width="150">
              <template slot-scope="scope">
                <span>{{scope.row.miningIndex}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="7">
          <section>
            <hot-news></hot-news>
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
  .page-container {
    max-width: 1180px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .coin-name {
    line-height: 14px;
    font-weight: normal;
    color: #0063ee;
  }

  .coin-name:hover,
  .coin-name:focus {
    color: #f95453;
    cursor: pointer;
  }
</style>
<script>
  import { getChainIndexRank } from "~/service/main-api";
  import { mapMutations } from "vuex";
  import { CURRENCY_DETAIL_INIT_TYPE } from "~/store/mutation-types";
  import { INDEX_TYPE } from "~/store/constants";
  import hotNews from "../../components/hot-news.vue";

  export default {
    components: { hotNews },
    async asyncData() {
      var indexData = await getChainIndexRank();
      indexData
        .map(i => {
          i.chainIndex *= 1;
          i.controlIndex *= 1;
          i.investIndex *= 1;
          i.miningIndex *= 1;
          return i;
        })
        .sort((a, b) => b.chainIndex - a.chainIndex);
      return {
        indexData: indexData
      };
    },
    mounted() {},
    data() {
      return {
        newsList: null
      };
    },
    methods: {
      ...mapMutations({
        changeDetailType: CURRENCY_DETAIL_INIT_TYPE
      }),
      selectedRow(row) {
        this.changeDetailType(INDEX_TYPE);
        this.$router.push("currency-detail/" + row.enName + "/" + row.fullName);
      }
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
