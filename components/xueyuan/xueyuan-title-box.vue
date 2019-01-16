<template>
    <div class="xueyuan-tilte-box">
        <div class="xueyuan-tilte-box-hd">
            <div class="xueyuan-tilte-box-hd-title">{{header}}</div>
        </div>
        <div class="xueyuan-tilte-box-bd">
            <slot/>
        </div>
    </div>
</template>
<style lang="scss">
    .xueyuan-tilte-box {
      &-hd {
        border-bottom: 1px solid #f0f0f0;
        &-title {
          font-size: 24px;
          color: #333333;
          padding-bottom: 14px;
          display: inline-block;
        }
      }
      &-bd {
        padding-top:30px;
      }
    }
</style>
<script>
    export default {
      props: ["header"]
    };
</script>