<template>
  <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    <!-- <template slot="header" style="font-size:18px;font-weight:800;">{{config.title[$route.name]}}</template> -->
    <filterList :filterItem="filterItem" @filterDataHandle="filterDataHandle" @resetDataHandle="resetDataHandle">
      <!--<span style="margin-right: 500px">日期段内未复核订单：{{unReviewedOrderCount}}</span>-->
    </filterList>
    <x-table :tHeader="config.tHeader" :dataList="data" :tatalCount="tatalCount" @pagination="pagination" :page="page" :pagesize="pagesize">
      <el-table-column label="操作" min-width="80">
        <template slot-scope="scope">
          <p style="color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">{{opStr(scope.row)}}</p>
        </template>
      </el-table-column>
    </x-table>
    <!-- <el-button type="primary" @click="handleDetail">主要按钮</el-button>
      <pagination  :page-num="page" :page-size="pagesize" :total-size="30" /> -->

  </div>
</template>
<script>
import XTable from "@/components/common/x-table";
import filterList from "@/components/filter/filterList";
import config from "./config";
// import Pagination from "@/components/pagination/pagination";

export default {
  name: "person",
  data() {
    return {
      pageLoading: true,
      filterItem: {
        timeFilter: true
      },
      page: 1,
      pagesize: 10,
      config: null,
      data: [],
      tatalCount: 0,
      // unReviewedOrderCount: 0,
      filterData: {}
    };
  },
  methods: {
    resetData() {
      this.filterData = {};
      this.page = 1;
      this.pagesize = 10;
      return this;
    },
    setData() {
      this.config =
        this.$route.name === "person" ? config.person : config.other;
      return this;
    },
    getData() {
      this.pageLoading = true;
      this.axiosGET(
        this,
        this.$API.API[this.config.list[this.$route.name]],
        "application/x-www-form-urlencoded",
        Object.assign(
          {
            pageNum: this.page,
            pageSize: this.pagesize
          },
          this.filterData
        ),
        (o, res) => {
          this.pageLoading = false;
          this.data = res.data.dataList;
          this.tatalCount = res.count;
          // this.unReviewedOrderCount = res.data.unReviewedOrderCount;
          this.$emit("countFromChild", res.data.unReviewedOrderCount);
          this.data.forEach(item => {
            Object.assign(item, {
              statusName: config[this.$route.name + "StatusName"][item.status],
              typeName: item.type > -1 ? this.config.typeName[item.type] : ""
            });
          });
        }
      );
      return this;
    },
    filterDataHandle(filterData) {
      this.resetData();
      this.filterData = {
        startTime: filterData.searchTime[0],
        endTime: filterData.searchTime[1]
      };
      this.getData();
    },
    resetDataHandle() {
      this.resetData().getData();
    },
    opStr(o) {
      // 只有正常异常的情况,才可以复核
      if (this.$store.state.d2admin.authorityBtnState)
        return this.config.ops[o.status] || "查看";
      else return this.config.ops[o.status] ? "" : "查看";
    },
    pagination(page, pagesize) {
      this.page = page;
      this.getData();
    },
    handleDetail(index, row) {
      this.$router.push({
        path: "/audit/person/detail",
        query: {
          id: row.id,
          status: this.config.ops[row.status] ? 0 : 1, // 当是查看的时候 status 是1 , 审核的时候 status 是0
          type: this.$route.name
        }
      });
    }
  },
  created() {
    this.$store.commit("getAuthorityBtnState", this.$route.path);
    this.setData().getData();
  },
  components: {
    XTable,
    filterList
    // Pagination
  }
};
</script>
<style lang="scss" scoped>
</style>

