<template>
    <div class="page-zixun-map">
        <div class="page-zixun-map-inner clearfix">
            <div class="page-zixun-map-title">频道</div>
            <div class="page-zixun-map-tags">
                <a class="page-zixun-map-tags-tag" href="/" title="首页" target="_blank">首页</a>
                <a class="page-zixun-map-tags-tag" href="/dakashuo" title="大咖说" target="_blank">大咖说</a>
                <a class="page-zixun-map-tags-tag" href="/shiting" title="视听" target="_blank">视听</a>
                <a class="page-zixun-map-tags-tag" href="biquan" title="币圈" target="_blank">币圈</a>
                <a class="page-zixun-map-tags-tag" href="kuangquan" title="矿圈" target="_blank">矿圈</a>
                <a class="page-zixun-map-tags-tag" href="/shendu" title="深度" target="_blank">深度</a>
                <a class="page-zixun-map-tags-tag" href="/video" title="链视听" target="_blank">链视听</a>
                <a class="page-zixun-map-tags-tag" href="/live" title="闪讯" target="_blank">闪讯</a>
                <a class="page-zixun-map-tags-tag" href="/chain-market" title="行情" target="_blank">行情</a>
                <a class="page-zixun-map-tags-tag" href="/chain-index" title="指数" target="_blank">指数</a>
                <a class="page-zixun-map-tags-tag" href="/xueyuan" title="学院" target="_blank">学院</a>
                <a class="page-zixun-map-tags-tag" href="/calculator" title="计算器" target="_blank">计算器</a>

            </div>
            <div class="page-zixun-map-title">相关网站</div>
            <div class="page-zixun-map-links">
                <a href=" http://www.hc.top/" class="page-zixun-map-links-link" title="算立方" target="_blank">算立方</a>
                <a href="http://www.bitong.top/" class="page-zixun-map-links-link" title="T.I.R" target="_blank">T.I.R</a>
                <a href="/zixun" class="page-zixun-map-links-link" title="挖链资讯" target="_blank">挖链资讯</a>
                <a href="/database" class="page-zixun-map-links-link" title="资料库" target="_blank">资料库</a>
                <a href="/guide" class="page-zixun-map-links-link" title="新手上路" target="_blank">新手上路</a>
            </div>
            <div class="page-zixun-map-title">最新文章</div>
            <div class="page-zixun-map-articles">
                <div class="page-zixun-map-articles-article clearfix" v-for="(i,idx) in list" :key="idx">
                    <a class="page-zixun-map-articles-article-title" :href="gohref(i)" :title="i.title">{{i.title}}</a>
                    <div class="page-zixun-map-articles-article-date">{{i.pub_time|fromNow}}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "index.scss";
</style>
<script>
    import { webMapLatestArticles } from "../../service/main-api.js";
    export default {
      methods: {
        gohref(i) {
          if (i.source == 1) {
            return `/news/${i.id}.html`;
          } else {
            return `/zixun/news/${i.id}.html`;
          }
        }
      },
      async asyncData({ params }) {
        var list = await webMapLatestArticles();

        return { list: list };
      },
      head() {
        return {
          title: "网站地图-挖链网"
        };
      }
    };
</script>
