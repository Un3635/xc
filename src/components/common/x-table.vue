<template>
  <div>
    <el-table style="width: 100%" :data="dataList" highlight-current-row  class="my-table">
      <!-- <slot></slot> -->
      <el-table-column show-overflow-tooltip v-if="item.tIdx" :prop="item.tIdx" :label="item.tName"  :minWidth="item.minWidth || 'auto'" v-for="(item, index) in tHeader" :key="index"></el-table-column>
      <el-table-column v-else><template>--</template></el-table-column>
      <slot></slot>
    </el-table>
    <pagination v-if="tatalCount" :page-num="page" :page-size="pagesize" :total-size="tatalCount" @pageChangeHandle="pageChangeHandle" />
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination";
export default {
  name: "x-table",
  props: {
    tHeader: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    tatalCount: {
      default: 0
    },
    page: {
      default: 1
    },
    pagesize: {
      default: 10
    }
  },
  watch: {
    dataList() {
      // console.log(nv)
    }
  },
  methods: {
    pageChangeHandle(val) {
      this.$emit("pagination", val);
    }
  },
  created() {
    // console.log('x-table')
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
</style>