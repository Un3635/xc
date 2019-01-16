<template>
  <xueyuan-title-box :header="'热门推荐'">
    <a class="activity-hot-item" v-for="(i,idx) in activityMain.list" :key="idx" :title="i.title" :href='href(i)' target="_blank">
      <img :src="i.logo" :alt="i.title">
      <span class="activity-hot-item-state">{{i.butNote}}</span>
    </a>
  </xueyuan-title-box>
</template>
<script>
  import xueyuanTitleBox from "./xueyuan-title-box";
  export default {
    components: { xueyuanTitleBox },
    props: ["activityMain"],
    methods: {
      href(i) {
        if (i.moduleType == 2) {
          return "/xueyuan/offline/" + i.id;
        } else {
          return "/xueyuan/online/" + i.id;
        }
      }
    }
  };
</script>

<style lang="scss">
  .activity-hot-item {
    margin-bottom: 20px;
    display: block;
    position: relative;
    img {
      width: 100%;
      height: 180px;
      display: block;
      border-radius: 8px;
    }
    &-state {
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      padding: 0 10px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 44px;
      display: inline-block;
      position: absolute;
      bottom: 18px;
      right: 0;
    }
  }
</style>
