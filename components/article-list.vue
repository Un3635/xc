<template>
  <div class="articlelist">
    <div class="c-block-tout" v-for="(article,idx) in articleList" :key="idx" v-if="article.isAdvert!=-1">
      <a :href="linkTo(article)" target="_blank" class="c-block-tout__media magicimg" v-bind:title="article.title" v-if="!article.isColumn">
        <img :src="article.logoWeb||article.logo" alt="">
      </a>
      <div class="c-block-tout__columns" v-if="article.isColumn">
        <div class="c-block-tout__columns-title">
          <div class="c-block-tout__columns-title-left">
            <span class="c-block-tout__columns-title-left-wa">挖链专栏</span>
            <span class="c-block-tout__columns-title-left-num">共{{article.list.length}}个专栏</span>
          </div>
          <nuxt-link to="column" target="_blank" class="c-block-tout__columns-title-right">
            查看更多 >
          </nuxt-link>
        </div>
        <div class="c-block-tout__columns-content">
          <nuxt-link :to="'/column/'+i.id" v-for="(i,idx) in article.list" :key="idx" class="c-block-tout__columns-content-list" target="_blank" v-if="idx<3">
            <img :src="i.pictureUrl" alt="">
            <div class="c-block-tout__columns-content-list-title">{{i.title}}</div>
            <div class="c-block-tout__columns-content-list-introd">{{i.introduce}}</div>
          </nuxt-link>
        </div>
      </div>
      <div class="c-block-tout__content" v-else>

        <template v-if="article.isAdvert==1">
          <a class="header" :href="linkTo(article)" target="_blank">
            <h3>{{article.title|truncate(48)}}</h3>
            <p class="body">{{article.intro|truncate(65)}}</p>
          </a>
          <div class="footer">
            <button class="adv_tag">广告</button>
            <i class="el-icon-error adv_close" @click="article.isAdvert=-1"></i>
          </div>
        </template>
        <template v-else>
          <a class="header" :href="linkTo(article)" target="_blank">
            <h3>{{article.title|truncate(48)}}</h3>
            <p class="body">{{article.intro|truncate(65)}}</p>
          </a>
          <div class="footer">
            <div class="footerleft">
              <img src="../assets/images/Group 4@2x.png" alt="" v-if="article.channelType === 3 || article.channelType === 4">
              <template v-if="article.topIs>0">
                <span class="footerlefttop">置顶</span>
                <span class="footerlefttime">{{article.nickName}}</span>
              </template>
              <template v-else>
                <span class="footerleftname">{{article.nickName}}</span>
                <span class="footerlefttime">{{article.pubTime|fromNow}}</span>
              </template>

              <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Fill 1</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
                </g>
              </svg>
              <span class="footerleftnum">{{article.totalHotNum}}</span>
            </div>
            <div class="footerright">
              <a :href="`/tags/${article.channelId}/${ii.tagId}`" target="blank" v-for="(ii,iidx) in article .tags" :key="iidx" v-if="iidx==0||iidx==1||iidx==2">{{ii.tagName}}</a>
            </div>
          </div>
        </template>

      </div>
    </div>
    <div class="load-more" :class="{'more':pageInfo.pageNum<pageInfo.pages,'no-more':pageInfo.pageNum>=pageInfo.pages}" v-if="more">
      <el-button type="text" v-if="pageInfo.pageNum<pageInfo.pages" @click="loadMore()">加载更多</el-button>
      <span v-if="pageInfo.pageNum>=pageInfo.pages">没有更多了</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
          &top {
            border: 1px solid #487fde;
            display: inline-block;
            width: 42px;
            height: 20px;
            color: #487fde;
            text-align: center;
            line-height: 20px;
            border-radius: 4px;
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
      .footer {
        .adv_tag {
          width: 54px;
          height: 21px;
          line-height: 21px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 2px;
          padding: 0;
          font-size: 12px;
          color: #222222;
        }
        .adv_close {
          float: right;
          font-size: 22px;
          cursor: pointer;
          border-radius: 50%;
        }
      }
    }
    &__columns {
      padding-top: 10px;
      padding-bottom: 6px;
      width: 100%;
      &-title {
        overflow: hidden;
        line-height: 28px;
        padding-bottom: 26px;
        &-left {
          float: left;
          &-wa {
            font-size: 20px;
            color: #333333;
            letter-spacing: -0.19px;
          }
          &-num {
            font-size: 16px;
            color: #888888;
            letter-spacing: -0.15px;
            margin-left: 20px;
            
          }
        }
        &-right {
          float: right;
          font-size: 14px;
          color: #888888;
          letter-spacing: -0.13px;
          padding-right: 10px;
        }
      }
      &-content {
        overflow: hidden;
        &-list {
          float: left;
          margin-right: 10px;
          width: 246px;
          height: 174px;
          color: #ffffff;
          border-radius: 8px;
          z-index: 1;
          position: relative;
          overflow: hidden;
          &:hover img{
            -webkit-transform: scale(1.05);
            transform: scale(1.05);
          }
          img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            -webkit-transition: .7s;
            transition: .7s;
            
          }
          &-title {
            z-index: 2;
            margin-top: 60px;
            margin-left: 12px;
            display: inline-block;
            width: 92px;
            height: 29px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 100px;
            font-size: 16px;
            text-align: center;
            line-height: 29px;
          }
          &-introd {
            z-index: 2;
            padding-top: 18px;
            padding-left: 22px;
            padding-right: 22px;
            font-size: 14px;
            line-height: 20px;
          }
          &:last-child {
            margin-right: 0;
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
</style>
<script>
  export default {
    props: {
      articleList: {
        type: Array
      },
      pageInfo: {
        type: Object
      },
      more: {
        type: Boolean,
        default: true
      },
      fromSeo: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      linkTo(article) {
        if (article.isAdvert == 1) {
          // return article.staticUrlWeb;
          return article.mediaUrl;
        } else {
          var link = "";
          if (this.fromSeo) {
            link = "/zixun";
          }
          if (article.channelType === 3 || article.channelType === 4) {
            return link + "/video/" + article.id + ".html";
          } else {
            return link + "/news/" + article.id + ".html";
          }
        }
      },
      loadMore() {
        this.$emit("loadMore");
      }
    }
  };
</script>
