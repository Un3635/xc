<template>
  <div class="c-article-list">
    <div class="c-article" v-for="(i,idx) in articleList" :key="idx">
      <img :src="i.logoWeb||i.logo" alt="" class="c-article-logo" :title="i.title">
      <div class="c-article-content">
        <a class="c-article-content-title" :href="linkTo(i)" :title="i.title" target="_blank">{{i.title}}</a>
        <div class="c-article-content-des">{{i.intro}}</div>
        <div class="c-article-content-info">
          <span class="c-article-content-info-name" v-if="i.nickName">{{i.nickName}}</span>
          <span class="c-article-content-info-time">{{i.pubTime|fromNow}}</span>
          <!-- <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title></title>
            <desc></desc>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
            </g>
          </svg> -->
          <!-- <span class="c-article-content-info-num">12345</span> -->
          <div class="c-article-content-info-tags" v-if="i.tags&&i.tags.length>0">
            <a target="blank" v-for="(ii,iidx) in i.tags" :key="iidx" :href="`/tags/${i.channelId}/${ii.tagId}`">{{ii.tagName}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="c-article-list-load-more" :class="{'more':pageInfo.pageNum<pageInfo.pages,'no-more':pageInfo.pageNum>=pageInfo.pages}" v-if="more">
      <el-button type="text" v-if="pageInfo.pageNum<pageInfo.pages" @click="loadMore()">加载更多</el-button>
      <span v-if="pageInfo.pageNum>=pageInfo.pages">没有更多了</span>
    </div>
  </div>
</template>
<style lang="scss">
  .c-article {
    height: 217px;
    padding-top: 30px;
    position: relative;
    &:hover {
      background: #fafafa;
      .c-article-content-title {
        color: #4d87ea;
      }
    }
    &-logo {
      width: 258px;
      height: 156px;
      border-radius: 8px;
      float: left;
      margin-right: 17px;
    }
    &-content {
      &-title {
        font-size: 20px;
        color: #222222;
        line-height: 30px;
        max-height: 60px;
        overflow: hidden;
        display: block;
        margin-bottom: 5px;
      }
      &-des {
        font-size: 14px;
        color: #888888;
        line-height: 22px;
        max-height: 44px;
        overflow: hidden;
      }
      &-info {
        position: absolute;
        bottom: 30px;
        left: 275px;
        right: 0;
        font-size: 12px;
        color: #888888;
        &-name {
          &::after {
            width: 2px;
            height: 12px;
            content: "";
            background-color: #dddddd;
            margin: 0 10px;
            display: inline-block;
          }
        }
        &-time {
          margin-right: 20px;
        }
        &-num {
          margin-left: 4px;
        }
        &-tags {
          float: right;
          & > a {
            font-size: 12px;
            color: #487fde;
            margin-left: 20px;
          }
        }
      }
    }
  }

  .c-article-list-load-more {
    line-height: 70px;
    text-align: center;
    font-size: 14px;
    &.no-more {
      color: #9e9e9e;
    }
    &.more {
      .el-button--text {
        color: #0063ee;
      }

      .el-button--text:hover,
      .el-button--text:focus {
        font-weight: bold;
      }
    }
  }
</style>

<script>
  export default {
    props: {
      articleList: {
        type: Array,
        default: () => {
          return [];
        }
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
          return article.staticUrlWeb;
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
