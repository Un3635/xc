<template>
    <div id="coin_detail" v-if="data" v-title="'资料库'">
        <div class="bg">
            <div class="up">
                <img :src="data.logo" lt="" class="logo">
                <div class="name">{{data.zhName}}</div>
                <appback/>
            </div>
            <!-- <div class="down">
                <div class="left">
                    <div class="price">${{data.nowPrice}}</div>
                    <div class="pricetitle">当前币价</div>
                </div>
                <div class="right">
                    <div class="rate">{{data.fluctuate}}%</div>
                    <div class="ratetitle">日涨幅</div>
                </div>
            </div> -->
        </div>

        <div class="intro">
            <div class="introtitle">货币简介</div>
            <div class="introinfo">
                <div class="inner">
                    {{data.introduce}}
                </div>
            </div>
        </div>

        <div class="par">
            <div class="partitle">基础参数</div>
            <div class="parlist">
                <div class="inner">
                    <div class="paritem">
                        <div class="left">中文名字</div>
                        <div class="right">{{data.zhName}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">英文名</div>
                        <div class="right">{{data.fullName}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">英文简称</div>
                        <div class="right">{{data.enName}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">区块时间</div>
                        <div class="right">{{data.blocksTime}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">发布时间</div>
                        <div class="right">{{data.releaseTime|date('YYYY-MM-DD')}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">核心算法</div>
                        <div class="right">{{data.algorithm}}</div>
                    </div>
                    <div class="paritem">
                        <div class="left">货币总量</div>
                        <div class="right">{{data.total}}</div>
                    </div>
                </div>

            </div>
        </div>
        <div class="news" v-if="other&&other.list&&other.list.length>0">
            <div class="newstitle">最新要闻</div>
            <div class="newslist">
                <div class="inner">
                    <div class="newsitem" v-for="(i,index) in other.list" :key="index" @click="go_news_detail(i)">
                        <img :src="i.logo" alt="">
                        <div class="newsitemcontent">
                            <div class="newsitemcontenttitle">{{i.title}}</div>
                            <div class="newsitemcontentintroduce">
                                <div class="recommend" v-if="i.tag">{{i.tag}}</div>
                                <div class="name">{{i.nickName}}</div>
                                <div class="name">•</div>
                                <div class="time">{{i.pubTime|fromNow}}</div>
                                <div class="read">{{i.hot}}</div>
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
    import appback from "../../components/appback";
    export default {
      components: {
        appback
      },
      data() {
        return {
          data: null,
          other: null
        };
      },
      created() {
        this.init();
      },
      methods: {
        go_news_detail(i) {
          this.$router.push({ path: "news_detail", query: { id: i.articleId } });
        },
        init() {
          this.$http
            .post(
              "/dataBank/coinDetail.open",
              {
                enName: this.$route.query.name
              },
              false
            )
            .then(data => {
              data.crawlerCoins.fluctuate = data.fluctuate;
              data.crawlerCoins.nowPrice = data.nowPrice;
              data = data.crawlerCoins;
              if (
                !(
                  data.logo.indexOf("http://") >= 0 ||
                  data.logo.indexOf("https://") >= 0
                )
              ) {
                data.logo = "//" + data.logo;
              }
              this.data = data;
              this.get_coin_news();
            });
        },
        get_coin_news() {
          this.$http
            .post(
              "/article/getArticleByKeywords.open",
              {
                keywords: this.$route.query.name,
                pageSize: 5
              },
              false
            )
            .then(data => {
              this.other = data;
            });
        }
      }
    };
</script>
