<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageData.total"
    :current-page.sync="pageData.currentPage"
    :page-size="pageData.pageSizes"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'pagination',
    props: {
      pageData: Object
    },
    data(){
        return{

        }
    },
    methods:{
      handleCurrentChange(val){
        this.pageData.currentPage=val;
        this.$emit('listenToChild',this.pageData);
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
