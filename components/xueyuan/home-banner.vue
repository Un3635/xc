<template>
  <el-carousel class="c-homebanner" :height='ht'>
    <a :href="item.link" v-for="(item,idx) in bannerList" :key="idx" target="_blank">
      <el-carousel-item>
        <img :src="item.picture" :alt="item.title">
      </el-carousel-item>
    </a>

  </el-carousel>
</template>
<script>
  export default {
    props: ["bannerList"],
    data() {
      return {
        ht: ""
      };
    },
    mounted() {
      this.ht = document.body.clientWidth / 4 + "px";
    }
  };
</script>

<style lang="scss">
  .c-homebanner {
    img {
      height: 100%;
      width: 100%;
    }
    a {
      display: block;
      width: 100%;
      text-align: center;
    }
    .el-carousel__indicators {
      position: absolute;
      left: 50%;
      right: initial;
      bottom: 5%;
      transform: translateX(-50%);
    }
    .el-carousel__indicator {
      button {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
      }

      padding: 0 3px;
      &.is-active {
        button {
          width: 32px;
          height: 8px;
          background: #0063ee;
          border-radius: 100px;
        }
      }
    }
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
  }
</style>
