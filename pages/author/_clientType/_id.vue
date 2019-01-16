<template>
  <div class="page-author" v-if="data">
    <div class="page-author-inner">
      <div class="page-author-up">
        <img :src="data.author.head" alt="" class="page-author-up-header">
        <img src="../../../assets/images/qymt.png" title="媒体认证" class="page-author-up-headerIdentity" v-if="data.author.identity==3">
        <img src="../../../assets/images/tyzz.png" title="特约作者" class="page-author-up-headerIdentity" v-if="data.author.identity==2">
        <div class="page-author-up-detail">
          <div class="page-author-up-detail-name" :class="{nodes:!data.author.introduce}">{{data.author.authorName}}</div>
          <div class="page-author-up-detail-des">{{data.author.introduce}}</div>
        </div>
        
        <div class="page-author-up-btns" :class="{notfollow:follow==0,follow:follow==1}">
          <div class="btn0" v-if="follow==0" @click.stop="sub">
            <img src="../../../assets/images/jiajia.png" alt=""> 订阅
          </div>
          <div class="btn1" v-if="follow==1" @click.stop="sub">
            <img src="../../../assets/images/gougou.png" alt=""> 已订阅
          </div>
          <div class="btn-1" @click.stop="sub">取消订阅</div>
        </div>

        <div class="page-author-up-num">
          <div class="page-author-up-num-item">
            <div class="page-author-up-num-item-up">{{data.author.articleTotalNum}}</div>
            <div class="page-author-up-num-item-down">文章数</div>
          </div>
          <!-- <div class="page-author-up-num-item">
            <div class="page-author-up-num-item-up">{{data.author.articleTotalReadNum|readable(1)}}</div>
            <div class="page-author-up-num-item-down">总阅读</div>
          </div> -->
          <div class="page-author-up-num-item">
            <div class="page-author-up-num-item-up">{{data.author.followNum|readable(1)}}</div>
            <div class="page-author-up-num-item-down">订阅量</div>
          </div>
        </div>

      </div>
      <div class="page-author-list">
        <div class="page-author-list-item" v-for="(i,idx) in data.mediaList.list" :key="idx">
          <a class="page-author-list-item-image" :title="i.title" :href="getnewsurl(i)" target="blank"><img :src="i.appPictureUrl" alt="" class="page-author-list-item-image"></a>

          <div class="page-author-list-item-content">
            <div class="page-author-list-item-content-title">
              <a :href="getnewsurl(i)" :title="i.title"> {{i.title}}</a>
            </div>
            <div class="page-author-list-item-content-des">
              {{i.intro}}
            </div>
            <div class="page-author-list-item-content-info">
              <span class="page-author-list-item-content-info-name">{{data.author.authorName}}</span>
              <span class="page-author-list-item-content-info-time">{{i.pubTime|fromNow}}</span>
              <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
                <title>Fill 1</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
                </g>
              </svg>
              <span class="page-author-list-item-content-info-num">{{i.playNum}}</span>
              <div class="page-author-list-item-content-info-tags">
                <a :href="`/tags/${i.channelId}/${ii.tagId}`" target="blank" v-for="(ii,iidx) in i.tagList" :key="iidx">{{ii.tagName}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-author-load" v-if="load">自动加载中...</div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  function getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  function getScrollHeight() {
    var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  }

  function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  import { authorMediaList, ckAuthorFollow } from "../../../service/main-api";
  import { oprFollow } from "../../mine/js/mineapi.js";
  import loginmodalevent from "../../../service/loginmodalevent.js";
  import getuserevent from "../../../service/getuserevent.js";

  export default {
    data() {
      return {
        load: false,
        follow: 0
      };
    },
    methods: {
            message({
        message,
        title,
        onClose = () => {},
        duration = 2000,
        type = "success"
      }) {
        this.$notify({
          title,
          message,
          type,
          customClass: "messagev142",
          duration,
          onClose
        });
      },
      sub() {
        if (this.$store.state.userinfo) {
          oprFollow({
            authorType: this.clientType,
            authorUserId: this.userId
          }).then(res => {
            if (this.follow == 0) {
              this.follow = 1;
              this.data.author.followNum++;
              this.$message({
                message: '订阅成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
            } else if (this.follow == 1) {
              this.follow = 0;
              this.data.author.followNum--;
              this.$message({
                message: '取消订阅成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
            }
          })
          .catch(err=>{
            this.message({
              title:err.msg,
              type:'warning'
            })
          })
        } else {
          loginmodalevent.$emit("login");
        }
      },
      getnewsurl(i) {
        if (i.mediaType == "2") {
          return `/news/${i.mediaId}.html`;
        } else {
          return `/video/${i.mediaId}.html`;
        }
      },
      async loadmore() {
        this.load = true;
        var { mediaList } = await authorMediaList({
          page: ++this.data.mediaList.pageNum,
          clientType: this.clientType,
          userId: this.userId
        });
        this.data.mediaList.list = [
          ...this.data.mediaList.list,
          ...mediaList.list
        ];
        this.load = false;
      }
    },
    mounted() {
      var that = this;

      document.addEventListener("scroll", function() {
        if (getScrollTop() + getWindowHeight() + 300 > getScrollHeight()) {
          if (
            !that.load &&
            that.data.mediaList.pages > that.data.mediaList.pageNum
          ) {
            that.loadmore();
          }
        }
      });

      if (this.isClient) {
       
        let data = this.$store.state.userinfo ? 1 : 0;
        if (data == 1) {
          var authorType = this.clientType;
          var authorUserId = this.userId;
          var mediaType = "";
          var mediaId = "";
          ckAuthorFollow({ authorType, authorUserId, mediaType, mediaId }).then(
            res => {
              this.follow = res.follow;
            }
          );
        }
      } else {
       
        getuserevent.$once("getuser", data => {
          if (data == 1) {
            var authorType = this.clientType;
            var authorUserId = this.userId;
            var mediaType = "";
            var mediaId = "";
            ckAuthorFollow({ authorType, authorUserId, mediaType, mediaId }).then(
              res => {
                this.follow = res.follow;
              }
            );
          }
        });
      }
    },
    async asyncData(ctx) {
      var { clientType, id: userId } = ctx.route.params;
      var page = 1;
      var data = await authorMediaList({
        page,
        clientType,
        userId
      });

      return { data, page, userId, clientType, isClient: ctx.isClient };
    },
    head() {
      return {
        title: `${this.data.author.authorName}专栏_挖链专栏`,
        meta: [
          {
            hid: "description",
            name: "description",
            content: `${
              this.data.author.authorName
            }与挖链网进行内容合作,挖链网是专业的区块链媒体资讯门户网站，挖链网汇聚全球区块链交易机构大数据、以技术为核心，打造出挖链指数、挖链闪讯、挖链学院等多个核心板块，挖掘区块链价值，为区块链创业者、区块链投资人提供一站式区块链服务体系！`
          },
          {
            hid: "keywords",
            name: "keywords",
            content: `${this.data.author.authorName},${
              this.data.author.authorName
            }专栏,${this.data.author.authorName}主页,${
              this.data.author.authorName
            }博客`
          }
        ]
      };
    }
  };
</script>
