<template>
  <xc-card header="热门文章">
    <div class="c-tile-list">
      <div class="c-tile-list__item" v-for="(item,idx) in items" :key="idx">
        <div class="c-block-media">
          <router-link class="c-block-media__media" :to="'/news/'+item.id" v-bind:title="item.title">
            <img class="c-block-media__img" :src="item.logo" :alt="item.title">
            <span class="rank-icon">
              <i class="iconfont icon-label"></i>
              <span class="rank">{{idx+1}}</span>
            </span>
          </router-link>
          <div class="c-block-media__body">
            <router-link class="c-block-media__title" :to="'/news/'+item.id+'.html'" v-if="idx===0">
              {{item.title|truncate(36)}}
            </router-link>
            <router-link class="c-block-media__title" :to="'/news/'+item.id+'.html'" v-if="idx!==0">
              {{item.title|truncate(21)}}
            </router-link>
            <p class="c-block-media__extra">{{item.pubTime|fromNow}}</p>
          </div>
        </div>
      </div>
    </div>
  </xc-card>
</template>
<style scoped>
  .c-block-media {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .c-block-media__media {
    position: relative;
    display: block;
    width: 40%;
    justify-items: center;
    overflow: hidden;
  }

  .c-block-media__body {
    width: 60%;
    padding-left: 0.5rem;
    padding-top: 5px;
  }

  .c-block-media__img {
    display: block;
    width: 100%;
  }

  .c-block-media__title {
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }

  .c-block-media__title:hover,
  .c-block-media__title:focus {
    color: #0063ee;
  }

  .c-block-media__extra {
    color: #999;
    font-size: 12px;
    line-height: 20px;
    margin-top: 8px;
  }

  .rank-icon {
    position: absolute;
    display: inline-block;
    top: -1px;
    left: -2px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    vertical-align: -4px;
    text-align: left;
  }

  .rank-icon .iconfont {
    display: inline-block;
    width: 18px;
    height: 18px;
    color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    font-size: 20px;
  }

  .rank-icon .rank {
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
    color: #fff;
  }

  .c-tile-list__item:first-child .c-block-media {
    flex-direction: column;
  }

  .c-tile-list__item:first-child .c-block-media__extra {
    display: none;
  }

  .c-tile-list__item:first-child .c-block-media__media {
    width: 100%;
  }

  .c-tile-list__item:first-child .c-block-media__body {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    transition: all 0.15s ease;
  }

  .c-tile-list__item:first-child .c-block-media__title {
    display: block;
    padding: 0.5em 1em;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }

  /*.c-tile-list__item:first-child .c-block-media__title:hover,*/
  /*.c-tile-list__item:first-child .c-block-media__title:focus {*/
  /*padding-bottom: .8rem;*/
  /*}*/

  .c-tile-list__item:first-child .rank-icon {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }

  .c-tile-list__item:first-child .rank-icon .iconfont {
    width: 30px;
    height: 30px;
    font-size: 30px;
    line-height: 30px;
  }

  .c-tile-list__item:first-child .rank-icon .rank {
    width: 28px;
    height: 28px;
    font-size: 14px;
    line-height: 24px;
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
</style>
<script>
  import XcCard from "~/components/xc-card.vue";

  export default {
    components: { XcCard },
    name: "hot-article-list",
    props: {
      items: {
        type: Array,
        defalut: []
      }
    },
    data() {
      return {};
    }
  };
</script>
