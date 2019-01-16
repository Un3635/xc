<template>
    <div class="c-seo-topadvert" v-if="list.length>0">
      <!-- <el-row v-for="(i,idx) in list" :key="idx" :gutter="10">
            <el-col v-for="(ii,iidx) in i" :key="iidx" :span="8*ii.style">
                <a :href="ii.link" target="_blank" :title="ii.title">
                    <img :src="ii.picture" :alt="ii.title">
                </a>
            </el-col>
        </el-row> -->
        <div v-for="(i,idx) in list" :key="idx" class="seoimgs">
          <div v-for="(ii,iidx) in i" :key="iidx" :style="{width:seoTopadvert(i,ii.style)}">
                <a :href="ii.link" target="_blank" :title="ii.title">
                    <img :src="ii.picture" :alt="ii.title">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      props: {
        list: {
          type: Array,
          default: () => []
        }
      },
      methods:{
        seoTopadvert(item,sty){
          if (item.length==3) {
            return "388px"
          } else if (sty==1) {
            return "372px"
          } else if(sty==2){
            return "800px"
          } else{
            return "1180px"
          }
        }
      }
    };
</script>
<style lang="scss">
    .c-seo-topadvert {
      margin-bottom: 20px;
      // .el-row {
      //   
      //   &:last-of-type {
      //     margin-bottom: 0;
      //   }
      // }
      .seoimgs{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
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
