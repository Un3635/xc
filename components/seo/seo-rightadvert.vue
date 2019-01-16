<template>
    <a class="c-seo-rightadver" v-if="item&&item.pictureUrl">
        <img :src="item.pictureUrl" alt="" :title="item.title">
    </a>
</template>
<script>
    export default {
      props: ["item"]
    };
</script>
<style lang="scss">
    .c-seo-rightadver {
      display: block;
      img {
        display: block;
        width: 100%;
      }
    }
</style>
