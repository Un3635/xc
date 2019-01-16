<template>
  <div class="page" @click="selectedItem={}">
    <section class="sec">
      <header class="sec-header">
        <h2>
          <i class="iconfont icon-bit"></i>
          <span>热门币种</span>
        </h2>
      </header>
      <div class="c-row" v-for="(more, index) in detailList" :key="index">
        <ul class="c-list clearfix">
          <li class="c-item" :class="{'is-active':item.id === selectedItem.id}" v-for="(item,i) in more" :key="i">
            <a @click="selectedItem=item;$event.cancelBubble=true">
              <img :src="item.webIcon" :alt="item.name" :title="item.name">
              <h3>{{ item.name }}</h3>
            </a>
          </li>
        </ul>
        <div class="c-detail__wrap" v-if="more.indexOf(selectedItem)>-1">
          <data-dank-detail :child-data="selectedItem.id" />
        </div>
      </div>
    </section>
    <section class="sec">
      <header class="sec-header">
        <h2>
          <i class="iconfont icon-quanbu"></i>
          <span>全部币种</span>
        </h2>
      </header>
      <div class="c-row" v-for="(more, index) in detailList2" :key="index">
        <ul class="c-list clearfix">
          <li class="c-item" :class="{'is-active':item.id === selectedItem.id}" v-for="(item,i) in more" :key="i">
            <a @click="selectedItem=item;$event.cancelBubble=true">
              <img :src="item.webIcon" :alt="item.name" :title="item.name">
              <h3>{{ item.name }}</h3>
            </a>
          </li>
        </ul>
        <div class="c-detail__wrap" v-if="more.indexOf(selectedItem)>-1">
          <data-dank-detail :child-data="selectedItem.id" />
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
  .page {
    padding-top: 30px;
  }

  .sec {
    /*margin-bottom: 30px;*/
  }

  .sec-header {
    max-width: 1180px;
    margin: 0 auto;
    border-bottom: 1px solid #f0f0f0;
  }

  .sec-header h2 {
    display: inline-block;
    padding: 10px;
    font-size: 16px;
    border-bottom: 2px solid #0063ee;
  }

  .sec-header i {
    font-size: 28px;
    font-weight: normal;
  }

  .icon-bit {
    color: #ffaf0a;
  }

  .icon-quanbu {
    color: rgb(178, 41, 255);
  }

  .sec-header span {
    vertical-align: 3px;
  }

  .c-row {
  }

  .c-list {
    max-width: 1150px;
    margin: 0 auto;
  }

  .c-item {
    position: relative;
    float: left;
    width: 14.285%;
    padding: 30px;
    text-align: center;
  }

  .c-item.is-active:after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    border: 10px solid transparent;
    border-bottom-color: #f9f9f9;
  }

  .c-item img {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .c-item h3 {
    font-size: 14px;
    line-height: 30px;
    color: #333;
  }

  .c-detail__wrap {
    background-color: #f9f9f9;
    padding-top: 50px;
    padding-bottom: 50px;
  }
</style>
<script>
  import DataDankDetail from "~/components/data-dank-detail.vue";
  import { getDataBaseCoinHot, getDataBaseCoinNotHot } from "~/service/main-api";
  import util from "~/service/util";

  export default {
    data() {
      return {
        selectedItem: {}
      };
    },
    components: {
      DataDankDetail
    },
    methods: {},
    async asyncData() {
      var data1 = await getDataBaseCoinHot();
      var data2 = await getDataBaseCoinNotHot();
      return {
        detailList: util.splitArr(data1.list, 7),
        detailList2: util.splitArr(data2.list, 7)
      };
    },
    head() {
      return {
        title: "区块链数字货币大全_币种大全-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "区块链数字货币币种大全，提供热门币种简介及排行，基本参数介绍及最新资讯，为您提供全面币种信息。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "数字货币,区块链币种有哪些,数字货币大全,区块链热门币种"
          }
        ]
      };
    }
  };
</script>
