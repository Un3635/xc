<template>
  <div class="writer">
    <div class="writer-carousel" v-if="authorLists.length">
      <div class="writer-carousel-title">热门作者</div>
      <div class="writer-carousel-author">
        <el-carousel height="230px" arrow="never" indicator-position="outside" :interval='5000'>
          <el-carousel-item v-for="(i,idx) in authorLists" :key="idx">
            <div class="authorlist" v-for="(ii,iidx) in i" :key="iidx">
              <div class="authorlist-img">
                <img :src="ii.head" alt="">
              </div>
              <div class="authorlist-name">
                <span>{{ii.nickName}}</span>
                <img src="../../assets/images/143/dengji-bl1@2x.png" title="媒体认证" class="headIdentity" v-if="ii.identity==3">
                <img src="../../assets/images/143/dengji-or1@2x.png" title="特约作者" class="headIdentity" v-if="ii.identity==2">
              </div>
              <p>{{ii.totalFollow}}人订阅</p>
              <div class="authorlist-intord">
                <div class="authorlist-intord-top">
                  <div class="authorlist-intord-top-content">{{ii.introduce?ii.introduce:"火星来的孩子还没有个人简介..."}}</div>
                </div>
                <div class="authorlist-intord-bottom">
                  <el-button type="primary" round @click="goauthorurl(ii)">作者主页</el-button>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="writer-authors" v-if="authorCount>100">
      <div class="writer-authors-margin">
        <div class="writer-authors-left">
          <img src="../../assets/images/143/zuojia@2x.png" alt="">
          <span>当前入驻作家共{{authorCount}}位</span>
        </div>
        <nuxt-link to="/writer/authors" target="_blank" class="writer-authors-right">
          查看全部作者>
        </nuxt-link>
      </div>
    </div>
    <div class="writer-news">
      <div class="writer-news-left">
        <div class="writer-news-left-title">
          作者专区
        </div>
        <article-list :articleList="articleList.list" :pageInfo="pageInfo" @loadMore="loadMore()" v-if="articleList.list.length>0"></article-list>
      </div>
      <div class="writer-news-right">
        <div class="writer-news-right-more">
          <el-button type="primary" @click="topaper">了解更多</el-button>
        </div>
        <div class="writer-news-right-author" v-if="mendedAuthorList.length">
          <div class="author-rankings">
            <div class="author-rankings-title">
              <div class="author-rankings-title-left">新人推荐</div>
            </div>
            <div class="author-rankings-item">
              <nuxt-link :to="'/author/'+i.clientType+'/'+i.userId" class="author-rankings-item-list" v-for="(i,int) in mendedAuthorList" :key="int">
                <div class="author-rankings-item-list-img">
                  <img :src="i.head" alt="">
                  <div class="author-rankings-item-list-img-num">{{int+1}}</div>
                </div>
                <div class="author-rankings-item-list-content">
                  <h3>{{i.nickName}}</h3>
                  <p>{{i.introduce?i.introduce:"火星来的孩子还没有个人简介..."}}</p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div style="margin-top:60px">
          <hot-news title="热门文章"></hot-news>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "index.scss";
</style>

<script>
import hotNews from "../../components/hot-news.vue";
import ArticleList from "~/components/article-list";
import {
  getHotAuthorList,
  totalAuthorCount,
  newestArticleList,
  recommendedAuthorList
} from "../../service/main-api.js";
export default {
  components: {
    hotNews,
    ArticleList
  },
  data() {
    return {
      pageNum: 1,
      pageInfo: null
    };
  },
  methods: {
    topaper() {
      this.$router.push({
        path: "/paper"
      });
    },
    async loadMore() {
      newestArticleList(++this.pageNum).then(data => {
        var newlist = data.list.filter(i =>
          this.articleList.list.every(artile => artile.id != i.id),
        );
        this.articleList.list = [...this.articleList.list, ...newlist];
        this.pageInfo = data.page;
      }); 
    },
    goauthorurl(i) {
      this.$router.push("/author/" + i.clientType + "/" + i.userId);
    }
  },

  async asyncData() {
    var authorLists = [];
    var [
      authorList,
      authorCount,
      articleList,
      mendedAuthorList
    ] = await Promise.all([
      getHotAuthorList(),
      totalAuthorCount(),
      newestArticleList(1),
      recommendedAuthorList()
    ]);
    var pageInfo = articleList.page;
    if (authorList) {
      for (var i = 0, len = authorList.length; i < len; i += 6) {
        authorLists.push(authorList.slice(i, i + 6));
      }
    }
    if(!authorList){
      authorList=[];
    }
    if(!mendedAuthorList){
      mendedAuthorList=[]
    }
    return {
      authorLists,
      authorCount,
      articleList,
      mendedAuthorList,
      pageInfo
    };
  },
  head() {
    return {
      title: "挖链号_区块链和币圈最新最快最优质的人物精彩观点_挖链网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "挖链号聚合了区块链和币圈最新、最快、最优质的内容与人群，捕获了行业领先人物的精彩观点，热点文章"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "挖链专栏,区块链专栏,比特币专栏,以太坊专栏,挖链号"
        }
      ]
    };
  }
};
</script>
