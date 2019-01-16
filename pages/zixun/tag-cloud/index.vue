<template>
    <div class="page-zixun-tagcloud">
        <seo-header :channelList="channelList"></seo-header>
        <div class="page-zixun-tagcloud-inner clearfix">
            <seo-topadvert :list="advlist.topAdvert" v-if="advlist.topAdvert!=null"></seo-topadvert>
            <div class="page-zixun-tagcloud-nav">
                <a href="/zixun">首页</a>
                <span>></span>
                <a>tag云</a>
            </div>
            <div class="page-zixun-tagcloud-left">
                <div class="page-zixun-tagcloud-left-title">tag云</div>
                <div class="page-zixun-tagcloud-left-date">{{Date.now()|date}}</div>
                <div class="page-zixun-tagcloud-left-tags clearfix">
                    <a class="page-zixun-tagcloud-left-tags-tag" v-for="(i,idx) in list" :key="idx" :title="i.title" :href="`/zixun/long${i.namePinyin}`" target="_blank">{{i.name}}</a>
                </div>
                <div class="page-zixun-tagcloud-left-url">本文地址
                    <a href="https://www.walian.cn/zixun/tag-cloud">https://www.walian.cn/zixun/tag-cloud</a>
                </div>
            </div>
            <div class="page-zixun-tagcloud-right">
                <seo-right-advert style="margin-bottom:60px" :item="rightAdvert"></seo-right-advert>
                <seo-rec-article :list="rclist" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "index.scss";
</style>
<script>
    import {
      getlongTailWordsList,
      seo_channelList,
      adv,
      seorecommendArticles,
      seogetAdvert
    } from "../../../service/main-api.js";
    import seoRecArticle from "../../../components/seo/seo-rec-article.vue";
    import seoHeader from "../../../components/seo/seo-header.vue";
    import seoTopadvert from "../../../components/seo/seo-topadvert.vue";
    import seoRightAdvert from "../../../components/seo/seo-rightadvert.vue";
    export default {
      components: { seoRecArticle, seoHeader, seoTopadvert, seoRightAdvert },
      async asyncData(ctx) {
        var [
          list,
          channelList,
          advlist,
          { list: rclist },
          rightAdvert
        ] = await Promise.all([
          getlongTailWordsList(),
          seo_channelList(),
          adv({ type: 1 }),
          seorecommendArticles(),
          seogetAdvert()
        ]);

        return {
          list,
          channelList,
          advlist,
          rclist,
          rightAdvert
        };
      }
    };
</script>
