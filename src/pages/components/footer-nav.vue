<template>
  <tabbar class="footer-bar">
    <!--<tabbar-item link="/" :selected="['/','/shopping-cart'].indexOf(path) != -1">-->
      <!--<div class="icon home" slot="icon"></div>-->
      <!--<span slot="label">首页</span>-->
    <!--</tabbar-item>-->
    <tabbar-item link="/hash" :selected="path == '/hash'">
      <div class="icon calc-force" slot="icon"></div>
      <span slot="label">算力</span>
    </tabbar-item>
    <tabbar-item link="/income" :selected="path == '/income'">
      <div class="icon income" slot="icon"></div>
      <span slot="label">收益</span>
    </tabbar-item>
    <tabbar-item link="/i" :selected="path == '/i'">
      <div class="icon i" slot="icon"></div>
      <span slot="label">我</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
  export default {
    data() {
      return {
        path: this.$route.path
      };
    },
    mounted() {

    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .icon {
    background-position: center;
    background-repeat: no-repeat;
    width: 22px;
    height: 22px;
    &.home {
      background-image: url("../../assets/images/icon_shouye_normal@2x.png");
      background-size: 22px auto;
    }
    &.calc-force {
      background-image: url("../../assets/images/icon_suanli_normal@1.5x.png");
      background-size: 22px auto;
    }
    &.income {
      background-image: url("../../assets/images/icon_shouyi_normal@1.5x.png");
      background-size: 22px auto;
    }
    &.i {
      background-image: url("../../assets/images/icon_wo_normal@1.5x.png");
      background-size: 20px auto;
    }
  }

  .weui-bar__item_on .icon {
    &.home {
      background-image: url("../../assets/images/icon_shouye_pressed@2x.png");
    }
    &.calc-force {
      background-image: url("../../assets/images/icon_suanli_pressed@1.5x.png");
    }
    &.income {
      background-image: url("../../assets/images/icon_shouyi_pressed@1.5x.png");
    }
    &.i {
      background-image: url("../../assets/images/icon_wo_pressed@1.5x.png");
    }
  }
</style>
