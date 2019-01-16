<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">平台规则</template>
    <el-tabs type="border-card" @tab-click="handleClick">
      <!-- <keep-alive></keep-alive> -->
      <el-tab-pane :label="tab.title" v-for="(tab, index) in tabs" :key="index">
        <x-table :tHeader="config.tHeader" :dataList="config.data" :page="config.page" :pagesize="pagesize" :tatalCount="config.tatalCount" @pagination="pagination" />
      </el-tab-pane>

    </el-tabs>
  </d2-container>
</template>
<script>
import config from "./config/config-platform.js";
import XTable from "@/components/common/x-table";
export default {
  name: "platform",
  data() {
    return {
      tabs: config,
      config: "",
      pagesize: 10,
      idx: 0
    };
  },
  methods: {
    setData(idx) {
      this.config = config[idx];
      return this;
    },
    getData(page) {
      if (page && page === this.config.page && this.config.data.length) return;
      if(page) this.config.page = page;
      this.axiosGET(
        this,
        this.$API.API[this.config.list],
        "application/x-www-form-urlencoded",
        {
          pageNum: this.config.page,
          pageSize: this.pagesize,
          type: this.config.type
        },
        (o, res) => {
          this.data = res.data;
          this.config.tatalCount = res.count;

          this.config.data = this.data;
        }
      );
      return this;
    },
    handleClick(tab, event) {
      this.setData(Number(tab.index)).getData(this.config.page);
    },
    pagination(page) {
      // this.page = page;
      this.getData(page);
    }
  },
  created() {
    this.setData(0).getData(1);
  },
  components: {
    XTable
  }
};
</script>
<style lang="scss" scoped>
</style>

