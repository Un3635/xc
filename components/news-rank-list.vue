<template>
  <xc-card :header="header">
    <ul class="c-tile-list">
      <li class="c-tile-list__item" v-for="(item,idx) in news" :key="idx">
        <div class="c-block-rank">
          <div class="c-block-rank__icon">
            <span class="rank-icon">
              <i class="iconfont icon-label"></i>
              <span class="rank">{{idx+1}}</span>
            </span>
          </div>
          <div class="c-block-rank__title">
            <a :href="gethref(item)" class="c-block-rank__link" target="_blank">{{item.title}}</a>
            <!-- <router-link class="c-block-rank__link" :to="'/news/'+item.id+'.html'">{{item.title}}</router-link> -->
          </div>
        </div>
      </li>
    </ul>
  </xc-card>
</template>
<style scoped>
  .c-tile-list__item {
    margin-bottom: 14px;
  }

  .c-block-rank {
    display: flex;
    /*line-height: 1.5;*/
  }

  .c-block-rank__icon {
    flex: 1;
    min-width: 1.4rem;
    max-width: 1.4rem;
    text-align: center;
  }

  .rank-icon {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    vertical-align: -3px;
  }

  .c-block-rank__icon .iconfont {
    display: inline-block;
    width: 18px;
    height: 18px;
    color: #fff;
    z-index: 2;
    font-size: 18px;
  }

  .c-block-rank__icon .rank {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 16px;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    vertical-align: top;
    color: #999;
  }

  .c-tile-list__item:nth-child(1) .rank-icon .iconfont {
    color: #fa322b;
  }

  .c-tile-list__item:nth-child(2) .rank-icon .iconfont {
    color: #fa8c2b;
  }

  .c-tile-list__item:nth-child(3) .rank-icon .iconfont {
    color: #2baafa;
  }

  .c-tile-list__item:nth-child(-n + 3) .rank-icon .rank {
    color: #fff;
  }

  .c-block-rank__title {
    flex: 1;
    padding-left: 5px;
  }

  .c-block-rank__link {
    color: #333;
    font-size: 14px;
    line-height: 22px;
  }

  .c-block-rank__link:hover,
  .c-block-rank__link:focus {
    color: #0063ee;
  }
</style>
<script>
  /* eslint-disable quotes */

  import XcCard from "~/components/xc-card.vue";

  export default {
    components: { XcCard },
    name: "news-rank-list",
    methods: {
      gethref(item) {
        if (this.fromSeo) {
          return "/zixun/news/" + item.id + ".html";
        } else {
          return "/news/" + item.id + ".html";
        }
      }
    },
    props: {
      header: {
        type: String,
        default: "新闻排行"
      },
      news: {
        type: Array
      },
      fromSeo: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    }
  };
</script>
