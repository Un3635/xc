<template>
    <div class="page_database">
        <div class="page_database_item">
            <h1 class="page_database_item_title">- 热门货币 -</h1>
            <mt-swipe :auto="7000" class="page_database_item_swipe">
                <mt-swipe-item v-for="(i,idx) in hotdata.list" :key="idx">
                    <div class="page_database_item_list">
                        <a class="page_database_item_list_item" v-for="(ii,iidx) in i" :key="iidx" :href="href(ii)">
                            <img v-lazy="ii.webIcon" alt="">

                            <div class="zh">{{ii.name}}</div>
                            <div class="en">{{ii.nameEn}}</div>

                        </a>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="page_database_line"></div>
        <div class="page_database_item">
            <h1 class="page_database_item_title">- 其他货币 -</h1>
            <div class="page_database_item_list">
                <a class="page_database_item_list_item" v-for="(i,idx) in nothotdata.list" :key="idx" :href="href(i)">
                    <img v-lazy="i.webIcon" alt="">
                    <div class="zh">{{i.name}}</div>
                    <div class="en">{{i.nameEn}}</div>

                </a>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "./index.scss";
</style>
<script>
    import { getDataBaseCoinHot, getDataBaseCoinNotHot } from "../../other/data";
    export default {
      methods: {
        href(i) {
          return "/currency-detail/" + i.nameEn + "/" + i.id;
        }
      },
      async asyncData() {
        var [hotdata, nothotdata] = await Promise.all([
          getDataBaseCoinHot(),
          getDataBaseCoinNotHot()
        ]);
        var _arr = [];
        for (var i = 0, len = hotdata.list.length; i < len; i += 4) {
          _arr.push(hotdata.list.slice(i, i + 4));
        }
        hotdata.list = _arr;
        return {
          hotdata,
          nothotdata
        };
      }
    };
</script>

