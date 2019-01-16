<template>
  <el-row :gutter="10">
    <el-col :span="8" :data-idx="idx" v-for="(item,idx) in news" :key="idx">
      <nuxt-link class="c-block-news" :to="'/news/'+item.id+'.html'" target="_blank">
        <figure class="c-figure">
          <img class="c-figure__img" :src="item.logo" alt="">
          <figcaption class="c-figure__caption">
            <p class="c-figure__title">{{item.title}}</p>
          </figcaption>
        </figure>
      </nuxt-link>
    </el-col>
  </el-row>
</template>
<style scoped>
  .el-row {
    margin-bottom: 0;
  }

  .c-block-news {
    display: block;
    text-decoration: none;
    background-color: #fff;
    height: 180px;
    /*box-shadow: 0 0 1px #eae9e9;*/
  }

  .c-figure {
    position: relative;
    height: 100%;
  }

  .c-figure__img {
    display: block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }

  .c-figure__caption {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .c-figure__title {
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }

  .c-figure:hover .c-figure__caption,
  .c-figure:focus .c-figure__caption {
    padding-bottom: 20px;
  }
</style>
<script>
  export default {
    name: "secondary-news",
    props: {
      news: {
        type: Array
      }
    }
  };
</script>
