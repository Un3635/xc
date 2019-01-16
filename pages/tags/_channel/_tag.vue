<template>
  <div class="page_tag">
    <wl-downloadapp/>
    <div class="page_tag_nav">
      <a class="page_tag_nav_back" href="javascript:void(0)" @click="back"></a>
      <span> <img src="../../../assets/img/home_walian_logo@3x.png" class="head_img" alt="">挖链网</span>
    </div>
    <div class="page_tag_list">
      <wl-article-list :list="list" @loadMore='loadMore' :pageinfo='page' :loading='loading' />
    </div>
  </div>

</template>
<style lang="scss">
  @import "./index.scss";
</style>

<script>
  import wlDownloadapp from "../../../components/wl-downloadapp.vue";
  import { getTagArticle } from "../../../other/data";
  import wlArticleList from "../../../components/wl-article-list.vue";

  export default {
    layout: "empty",
    components: { wlDownloadapp, wlArticleList },
    methods: {
      back() {
        this.$router.back(-1);
      },
      async loadMore() {
        this.loading = true;
        var _data = {
          channelId: this.$route.params.channel,
          rows: 10,
          page: ++this.page.pageNum,
          tagId: this.$route.params.tag
        };
        var { page, list } = await getTagArticle(_data);
        this.page = page;
        this.list = this.list.concat(list);
        this.loading = false;
      }
    },

    head() {
      if (
        this.tagDetail &&
        (this.tagDetail.title ||
          this.tagDetail.keyword ||
          this.tagDetail.description)
      ) {
        return {
          title: this.tagDetail.title,
          meta: [
            {
              hid: "description",
              name: "description",
              content: this.tagDetail.description
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.tagDetail.keyword
            }
          ]
        };
      } else {
        return {};
      }
    },

    async asyncData({ params }) {
      var _data = {
        channelId: params.channel,
        rows: 10,
        page: 1,
        tagId: params.tag
      };
      var loading = false;

      var { page, list, tagDetail } = await getTagArticle(_data);
      return {
        page,
        list,
        tagDetail,
        loading
      };
    }
  };
</script>
