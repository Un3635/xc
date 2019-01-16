<template>
    <div class="xc-card">
        <div class="xc-card__header" v-if="$slots.header || header">
            <slot name="header">
                <div class="xc-card__title" v-if="header">{{ header }}</div>
            </slot>
        </div>
        <div class="xc-card__body" :style="bodyStyle">
            <slot/>
        </div>
    </div>
</template>
<style>
    .xc-card {
      background-color: #fff;
      color: #303133;
      position: relative;
    }

    .xc-card__header {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f5f5f5;
    }

    .xc-card__title {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-weight: bold;
      color: #0063ee;
      border-bottom: 2px solid currentColor;
    }

    .xc-card__body {
      padding-top: 10px;
      padding-bottom: 10px;
    }
</style>
<script>
    export default {
      name: "XcCard",
      props: ["header", "bodyStyle"]
    };
</script>
