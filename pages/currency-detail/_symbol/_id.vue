<template>
    <div>
        <div class="page_currency_nav ">
            <a class="page_currency_nav_back" href="/database"></a>
            <img :src="data.webIcon" alt="" class="page_currency_nav_img"> {{data.name}}
        </div>
        <div class="page_currency">
            <div class="page_currency_item">
                <h1 class="page_currency_title">货币简介</h1>
                <div class="page_currency_container">
                    <p v-html="data.intro">
                    </p>
                </div>
            </div>
            <div class="page_currency_item">
                <h1 class="page_currency_title">基础参数</h1>
                <div class="page_currency_container">
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">中文名字</div>
                        <div class="page_currency_container_item_right">{{data.name}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">英文名字</div>
                        <div class="page_currency_container_item_right">{{data.nameEn}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">英文简称</div>
                        <div class="page_currency_container_item_right">{{data.shortName}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">区块时间</div>
                        <div class="page_currency_container_item_right">{{data.blockTime}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">发布时间</div>
                        <div class="page_currency_container_item_right">{{data.releaseTime}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">核心算法</div>
                        <div class="page_currency_container_item_right">{{data.coreAlgorithm}}</div>
                    </div>
                    <div class="page_currency_container_item">
                        <div class="page_currency_container_item_left">货币总量</div>
                        <div class="page_currency_container_item_right">{{data.totalAmount}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss">
    @import "./index.scss";
</style>
<script>
    import { coinDetail } from "../../../other/data";

    export default {
      layout: "empty",

      async asyncData(ctx) {
        var data = await coinDetail({ id: ctx.route.params.id });
        return {
          data
        };
      }
    };
</script>
