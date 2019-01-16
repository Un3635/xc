<template>
  <div class="columnson">
    <div class="columnson_banner"   v-bind:style="{backgroundImage:'url(' + datacolumn.pictureUrl + ')'}">
  
      <h3>{{datacolumn.title}}</h3>
      <p>{{datacolumn.introduce}}</p>
    </div>
    <div class="c-block-tout" v-for="(article,idx) in articleList" :key="idx">
      <a :href="linkTo(article)" target="_blank" class="c-block-tout__media magicimg" v-bind:title="article.title">
        <img :src="article.appPictureUrl" alt="">
      </a>
      <div class="c-block-tout__content">
        <a class="header" :href="linkTo(article)" target="_blank">
          <h3>{{article.title|truncate(90)}}</h3>
          <p class="body">{{article.intro|truncate(135)}}</p>
        </a>
        <div class="footer">
          <div class="footerleft">
            <img src="~/assets/images/Group 4@2x.png" alt="" v-if="article.mediaType == 3 || article.mediaType == 4">
            <span class="footerleftname">{{article.nickName}}</span>
            <span class="footerlefttime">{{article.pubTime|fromNow}}</span>
            <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

              <title>Fill 1</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
              </g>
            </svg>
            <span class="footerleftnum">{{article.playNum}}</span>
          </div>
          <div class="footerright">
            <a :href="`/tags/${article.mediaId}/${ii.tagId}`" target="blank" v-for="(ii,iidx) in article.tagList" :key="iidx" v-if="iidx==0||iidx==1||iidx==2">{{ii.tagName}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more" :class="{'more':pageInfo<pages,'no-more':pageInfo>=pages}">
      <el-button type="text" v-if="pageInfo<pages" @click="loadMore()">加载更多</el-button>
      <span v-if="pageInfo>=pages">没有更多了</span>
    </div>
  </div>
</template>

<style lang="scss">
  .columnson {
    margin: 0 auto;
    width: 1180px;
    &_banner {
      height: 180px;
      background-image: url(../../assets/images/143/pic1@2x.png);
      background-size:100%;
      background-position-y: center;
      background-repeat: no-repeat;
      text-align: center;
      color: #ffffff;
      position: relative;
      h3 {
        padding-top: 50px;
        padding-bottom: 13px;
        font-size: 20px;
        line-height: 30px;
      }
      p {
        font-size: 14px;
        line-height: 20px;
      }
      img{
        position: absolute;
        height: 180px;
        width: 100%;
        left:0;
        top: 0;
      }
    }
    .c-block-tout {
      display: flex;
      transition: all 0.2s ease;
      padding-top: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dotted #dfdfdf;
      &:hover,
      &:focus {
        background: #fafafa;
        .c-block-tout__content .header h3{
          color: #4D87EA;
        }
      }
      &__content {
        flex: 1;
        height: 156px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .header {
          line-height: 30px;
          h3 {
            margin-bottom: 5px;
            font-size: 20px;
            color: #222222;
          }
          &:hover {
            color: #4d87ea;
          }
        }
        .body {
          font-size: 14px;
          color: #888888;
          line-height: 22px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          &right {
            a {
              font-size: 12px;
              color: #487fde;
              margin-left: 20px;
            }
          }
          &left {
            font-size: 12px;
            color: #888888;
            img {
              width: 20px;
              height: 20px;
              margin-right: 20px;
            }
            &name {
              &::after {
                width: 2px;
                height: 12px;
                content: "";
                background-color: #dddddd;
                display: inline-block;
                margin-left: 10px;
                margin-right: 10px;
              }
            }
            svg {
              margin-left: 20px;
            }
            &num {
              margin-left: 4px;
            }
          }
        }
      }
      &__media {
        margin-right: 16px;
        width: 258px;
        height: 156px;
        border-radius: 6px;
        img {
          width: 258px;
          height: 156px;
          border-radius: 6px;
        }
      }
    }
    .load-more {
      line-height: 70px;
      text-align: center;
      font-size: 14px;
    }
    .no-more {
      color: #9e9e9e;
    }
    .more .el-button--text {
      color: #0063ee;
    }
    .more .el-button--text:hover,
    .more .el-button--text:focus {
      font-weight: bold;
    }
  }
</style>
<script>
  import { getWebColumnsDetail } from "../../service/main-api.js";
  export default {
    methods: {
      async loadMore() {
        var {
          mediaList: { list: articleList, pages },
          column: datacolumn
        } = await getWebColumnsDetail({ columnId: this.id, pageNum: ++this.pageInfo });
        this.articleList=[...this.articleList,...articleList];
      },
      linkTo(article) {
        if (article.mediaType == 3 || article.mediaType == 4) {
          return "/video/" + article.mediaId + ".html";
        } else {
          return "/news/" + article.mediaId + ".html";
        }
      }
    },
    async asyncData({ params }) {
      var { id } = params;
      var pageInfo = 1;
      var {
        mediaList: { list: articleList, pages },
        column: datacolumn
      } = await getWebColumnsDetail({ columnId: id, pageNum: pageInfo });
      return {
        id,
        pageInfo,
        articleList,
        pages,
        datacolumn
      };
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
