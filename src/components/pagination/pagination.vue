<template>
    <div class="pagination-box">
        <div class="pagination-tail" v-if="totalSize>0 ">共计 {{totalSize}} 条记录，当前第 {{pageNum}}/{{Math.ceil(totalSize/pageSize)}} 页</div>
        <el-pagination
                class="table-pagination"
                background
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pageSize"
                :total="totalSize"
                v-if="totalSize>pageSize"
                layout="prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: "pagination",
    props:{
      pageNum:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:10
      },
      totalSize:{
        type:Number,
        default:0
      }
    },
    methods:{
      handleCurrentChange(val){
        this.$emit('pageChangeHandle',val)
        // console.log(val)
      }
    },
    mounted(){
      // console.log(this.pageSize)
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
    .pagination-box{
        @include clearfix;
        .table-pagination {
            float:right;
        }
        .pagination-tail{
            float:left;
            color:#888;
            font-size:14px;
        }
    }

</style>