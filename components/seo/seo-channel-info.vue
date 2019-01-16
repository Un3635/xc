<template>
  <div class="c-seo-channel-info">
    <img :src="channel.picture" alt="" class="c-seo-channel-info-img">
    <h2 class="c-seo-channel-info-name">{{channel.name}}</h2>
    <p class="c-seo-channel-info-des">{{channel.intro}}</p>
  </div>
</template>
<script>
  export default {
    props: ["channel"]
  };
</script>
<style lang="scss">
  .c-seo-channel-info {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 20px 20px 27px 20px;
    &-img {
      width: 100%;
      display: block;
      margin-bottom: 30px;
    }
    &-name {
      font-size: 20px;
      color: #000000;
      line-height: 30px;
      margin-bottom: 15px;
    }
    &-des {
      font-size: 14px;
      color: #000000;
      line-height: 22px;
    }
  }
</style>
