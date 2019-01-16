<template>
  <div class="footer">
    <tabbar class="footer-bar">
      <tabbar-item link="/">
        <div class="icon home" slot="icon"></div>
        <span slot="label" class="first">首页</span>
      </tabbar-item>
      <tabbar-item link="/product-list">
        <div class="icon classify" slot="icon"></div>
        <span slot="label">全部</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  export default {
  };
</script>
<style lang="scss" scoped>
  .footer-bar {
    span {
      color: #333333;
      font-size: 10px;
    }
    .first {
      padding-left: 3px;
    }
    .icon {
      background-position: center;
      background-repeat: no-repeat;
      width: 25px;
      height: 25px;
      &.home {
        background-image: url("../../assets/images/icon_shouye_normal@4x.png");
        background-size: 25px auto;
      }
      &.classify {
        background-image: url("../../assets/images/icon_fenlei_normal@4x.png");
        background-size: 25px auto;
      }
    }

    .weui-bar__item_on .icon {
      &.home {
        background-image: url("../../assets/images/icon_shouye_normal@4x.png");
      }
      &.classify {
        background-image: url("../../assets/images/icon_fenlei_normal@4x.png");
      }
    }
  }
</style>
