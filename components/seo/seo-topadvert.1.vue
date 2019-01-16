<template>
    <div class="c-seo-topadvert" v-if="list.length>0">
        <el-row v-for="(i,idx) in list" :key="idx" :gutter="10">
            <el-col v-for="(ii,iidx) in i" :key="iidx" :span="8*ii.style">
                <a :href="ii.link" target="_blank" :title="ii.title">
                    <img :src="ii.picture" :alt="ii.title">
                </a>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
      props: {
        list: {
          type: Array,
          default: () => []
        }
      }
    };
</script>
<style lang="scss">
    .c-seo-topadvert {
      margin-bottom: 20px;
      .el-row {
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      a {
        display: block;
      }
      img {
        display: block;
        width: 100%;
        height: 80px;
      }
    }
</style>
