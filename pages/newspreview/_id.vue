<template>
  <div class="pagenewspreview" v-if="data">
    <div class="pagenewspreview-inner">
      <div class="pagenewspreview-left">
        <div class="pagenewspreview-title">{{data.title}}</div>
        <div class="pagenewspreview-videoimg" v-if="isvideo"></div>
        <div class="pagenewspreview-content article" v-html="data.content"></div>
      </div>
      <div class="pagenewspreview-right">
        <hot-news></hot-news>
      </div>
    </div>
  </div>
</template>
<style lang="scss" >
  .pagenewspreview {
    &-left {
      width: 758px;
      float: left;
    }
    &-right {
      width: 372px;
      float: right;
    }
    &-inner {
      width: 1180px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 96px;
    }
    &-title {
      font-size: 28px;
      color: #000000;
      line-height: 40px;
      margin-bottom: 10px;
    }
    &-videoimg {
      width: 758px;
      height: 433px;
      background-color: #333333;
    }
  }
</style>

<script>
  import axios from "axios";
  import { articledetail, userVideoInfo } from "../mine/js/mineapi";
  import hotNews from "../../components/hot-news.vue";
  export default {
    components: { hotNews },
    data() {
      return {
        data: null,
        isvideo:false
      };
    },

    mounted() {
      if (window.location.href.indexOf("video") >= 0) {
        userVideoInfo({
          videoId: this.$route.params.id.split(".html")[0]
        }).then(res => {
          this.data = {
            title: res.title,
            content: res.intro
          };
          this.isvideo = true;
        });
      } else {
        articledetail({
          articleId: this.$route.params.id.split(".html")[0]
        }).then(res => {
          this.data = res.articleDetail;
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
