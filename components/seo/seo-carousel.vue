<template>
  <el-carousel height="208px">
    <el-carousel-item v-for="(item,idx) in news" :key="idx">
      <a :href="item.link" class="c-block-tout" target="_blank" :title="item.title">
        <img class="c-block-tout__img" :src="item.picture" :alt="item.title">
        <h3 class="c-block-tout__headline">{{item.title}}</h3>
      </a>
    </el-carousel-item>
  </el-carousel>
</template>
<style scoped>
  .c-block-tout {
    position: relative;
    display: block;
    overflow: hidden;
    height: 208px;
  }

  .c-block-tout__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .c-block-tout__headline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 11px 19px;
    font-size: 14px;
    transition: all 0.2s ease;
  }
</style>
<script>
  export default {
    props: ["news"]
  };
</script>
