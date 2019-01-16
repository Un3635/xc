<template>
    <div class="page_live">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li class="page_live_item" v-for="(i,idx) in list" :key="idx">
                <div class="page_live_item_up">
                    <img src="../../assets/img/shanxun_shijianzhou@3x.png" alt="" class="circleimg">
                    <span class="time">{{i.pubTime|fromNow}}</span>
                    <span class="name">{{i.identityName}}</span>
                    <div class="stars">
                        <img src="../../assets/img/common_shoucang_clicked@3x.png" alt="" v-for="ii in i.star" :key="ii">
                        <img src="../../assets/img/common_shoucang_unclicked@3x.png" alt="" v-for="ii in (5-i.star)" :key="ii">
                    </div>
                </div>
                <div class="page_live_item_down">
                    <h1 class="page_live_item_down_title">{{i.title}}</h1>
                    <div class="page_live_item_down_info">{{i.content}}</div>
                    <div class="page_live_item_down_percent">
                        <div class="page_live_item_down_percent_left" @click="download">
                            <img src="../../assets/img/shanxun_good@3x.png" alt="">
                            <div>利好</div>
                        </div>
                        <div class="page_live_item_down_percent_center">
                            <div class="page_live_item_down_percent_center_up">
                                <template v-if="i.voteGood==0&&i.voteNegative==0">
                                    <span class="page_live_item_down_percent_center_up_left"></span>
                                    <span class="page_live_item_down_percent_center_up_right"></span>
                                </template>

                                <template v-else-if="i.voteGood==0&&i.voteNegative!=0">
                                    <span class="page_live_item_down_percent_center_up_left">0%</span>
                                    <span class="page_live_item_down_percent_center_up_right">100%</span>
                                </template>
                                <template v-else-if="i.voteGood!=0&&i.voteNegative==0">
                                    <span class="page_live_item_down_percent_center_up_left">100%</span>
                                    <span class="page_live_item_down_percent_center_up_right">0%</span>
                                </template>
                                <template v-else>
                                    <span class="page_live_item_down_percent_center_up_left">{{Math.floor(i.voteGood/(i.voteNegative+i.voteGood)*100)}}%</span>
                                    <span class="page_live_item_down_percent_center_up_right">{{Math.floor(i.voteNegative/(i.voteNegative+i.voteGood)*100)}}%</span>
                                </template>
                            </div>
                            <div class="page_live_item_down_percent_center_down">
                                <div class="page_live_item_down_percent_center_down_value" :style="{width:'50%'}" v-if="i.voteGood==0&&i.voteNegative==0"></div>
                                <div class="page_live_item_down_percent_center_down_value" :style="{width:i.voteGood/(i.voteNegative+i.voteGood)*100+'%'}" v-else></div>
                            </div>
                        </div>
                        <div class="page_live_item_down_percent_right" @click="download">
                            <img src="../../assets/img/shanxun_bad@3x.png" alt="">
                            <div class="page_live_item_down_percent_right_down">利空</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <button class="loadmore">加载中....</button>
    </div>
</template>
<style lang="scss">
    @import "./index.scss";
</style>
<script>
    import { get_news_flash } from "../../other/data";
    import { InfiniteScroll } from "mint-ui";
    export default {
      data() {
        return {
          loading: false
        };
      },
      methods: {
        async loadMore() {
          this.loading = true;
          var { list, page } = await get_news_flash({ page: ++this.page.pageNum });
          this.list = this.list.concat(list);
          this.page = page;
          this.loading = false;
        },
        download() {
          this.$router.push("download");
        }
      },
      async asyncData() {
        var page_now = 1;

        var { list, page } = await get_news_flash({ page: page_now });
        return {
          list,
          page,
          page_now
        };
      }
    };
</script>
