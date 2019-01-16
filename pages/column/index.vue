<template>
    <div class="column">
        <div class="column_banner">
            <h3>挖链专栏</h3>
            <p>行业新鲜资讯，专业媒体视频报道，大牛解读币势态，带您全方位了解区块链内容，专为区块链人打造。</p>
        </div>
        <div class="column_margin">
            <div class="column_margin_num">共{{data.length}}个专栏</div>
            <div class="column_margin_content">

                <div class="column_margin_content_list" v-for="(i,index) in data" :key="index">
                    <div class="column_margin_content_list-img"><img :src="i.column.pictureUrl" alt=""></div>
                    <div class="column_margin_content_list-message">
                        <div class="column_margin_content_list-message-title">{{i.column.title}}</div>
                        <div class="column_margin_content_list-message-content">{{i.column.introduce}}</div>
                        <div class="column_margin_content_list-message-num">
                            <div class="column_margin_content_list-message-num-left">共
                                <span>{{i.mediaList.total}}</span>篇文章</div>
                            <div class="column_margin_content_list-message-num-right">
                                <nuxt-link :to="'/column/'+i.column.id">进入专栏 ></nuxt-link>
                            </div>
                        </div>
                        <div class="column_margin_content_list-message-list">
                            <div class="column_margin_content_list-message-list-new" v-for="(ii,index) in i.mediaList.list" :key="index" v-if="ii.title">
                                <nuxt-link :to="'/news/'+ii.mediaId+'.html'" v-if="ii.mediaType==2">{{ii.title}}</nuxt-link>
                                <nuxt-link :to="'/video/'+ii.mediaId+'.html'" v-if="ii.mediaType==3">{{ii.title}}</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "index.scss";
</style>

<script>
    import { getMoreColumn } from "../../service/main-api.js";
    export default {
      async asyncData(){
          var data=await getMoreColumn();
          return {data}
      },
      head() {
        return {
          title: "挖链网|挖掘新经济，链接新世界",
          meta: [
            {
              hid: "description",
              name: "description",
              content:
                "挖链网是专业的区块链媒体资讯门户网站，挖链网汇聚全球区块链交易机构大数据、以技术为核心，打造出挖链指数、挖链闪讯、挖链学院等多个核心板块，挖掘区块链价值，为区块链创业者、区块链投资人提供一站式区块链服务体系！"
            },
            {
              hid: "keywords",
              name: "keywords",
              content: "挖链专栏_挖链网"
            }
          ]
        };
      }
    };
</script>
