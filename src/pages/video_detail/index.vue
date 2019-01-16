<template>
  <div class="video_detail">
    <video class="mp4" :src="data.videoUrl" v-if="data" controls :poster="data.logoApp"></video>
    <div class="video" v-if="data" v-title="vtitle">
      <div class="title">{{data.title}}{{data.subTitle?'|':''}}{{data.subTitle}}</div>
      <div class="data">
        <img :src="data.head" alt="" class="headerimg">
        <div class="name">{{data.nikeName}}</div>
        <div class="time">{{data.pubTime|fromNow}}</div>
        <div class="read">{{data.playNumStr}}</div>
      </div>
      <div class="edit" v-html="data.content"></div>
    </div>
    <appdownload></appdownload>
  </div>
</template>
<script>
  import appdownload from "../../components/appdownload";
  import wx_share_config from "../../common/wx_share";
  function HTMLDecode(html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace('"content-bottom"', 'class="f1"')
      .replace('"content-source-info"', 'class="f3"')
      .replace('"ad akp-adv"', 'class="f2"')
      .replace(/href/g, "");
  }
  export default {
    components: { appdownload },
    data() {
      return {
        data: null,
        vtitle: null
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.$http
          .post(
            "/video/getVideoDetail.open",
            {
              videoId: this.$route.query.id
            },
            false
          )
          .then(data => {
            data.content = HTMLDecode(data.content);
            this.vtitle = data.title;
            this.data = data;

            wx_share_config({
              imgUrl: this.data.logoApp,
              title: this.data.title,
              desc: this.data.intro,
              link: window.location.href
            });
          })
          .catch(err => {
            this.data = null;
          });
      }
    }
  };
</script>
<style lang="scss">
  @import "index.scss";
</style>