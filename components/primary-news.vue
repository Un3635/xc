<template>
  <el-carousel height="296px" id="broadcast">
    <el-carousel-item v-for="(item,idx) in news" :key="idx">
      <a :href="item.link" class="c-block-tout magicimg" target="_blank" :title="item.title">
        <img class="c-block-tout__img" :src="item.picture" :alt="item.title">
        <h3 class="c-block-tout__headline">{{item.title}}</h3>
      </a>
    </el-carousel-item> 
  </el-carousel>
</template>
<style lang="scss">
#broadcast{
  .el-carousel__arrow{
    background: rgba(0,0,0,0.70);
    border-radius: 4px;
    width: 30px;
    height: 48px;
    
    font-size: 20px;
    &:hover{
      color: #366DF0;
    }
  }
  .el-carousel__button{
    border-radius: 3px;
  }
}
</style>

<style scoped>
  .c-block-tout {
    position: relative;
    display: block;
    overflow: hidden;
    height: 296px;
  }

  .c-block-tout__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  .c-block-tout__headline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 0.8em 4rem 0.8em 0.8em;
    font-size: 18px;
    transition: all 0.2s ease;
    border-radius: 0 0 8px 8px;
  }

  /*.c-block-tout:hover .c-block-tout__headline,*/
  /*.c-block-tout:focus .c-block-tout__headline {*/
  /*padding-bottom: 2rem;*/
  /*}*/
</style>
<script>
  export default {
    name: "primary-news",
    props: {
      news: {
        type: Array
      }
    },
    data() {
      return {};
    }
  };
</script>
