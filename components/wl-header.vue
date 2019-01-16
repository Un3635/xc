<template>
  <div class="wl_header">
    <img src="../assets/img/home_walian_logo@3x.png" alt="挖链网" class="wl_header_logo">
    <a :href="i.href" :title="i.name" v-for="(i,idx) in navs" :key="idx" :class="{active:i.active}">{{i.name}}</a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        navs: [
          {
            href: "/",
            name: "首页",
            active: this.$route.fullPath == "/"
          },
          {
            href: "/live",
            name: "闪讯",
            active: this.$route.fullPath == "/live"
          },
          {
            href: "/chain-market",
            name: "大盘指数",
            active:
              this.$route.fullPath == "/chain-market" ||
              this.$route.fullPath == "/chain-index"
          },
          {
            href: "/database",
            name: "资料库",
            active: this.$route.fullPath == "/database"
          }
        ]
      };
    }
  };
</script>

<style lang="scss">
  @import "../other/util.scss";
  .wl_header {
    height: p2r(45);
    padding-left: p2r(10);
    position: relative;
    &::after {
      height: 1px;
      content: "";
      position: absolute;
      left: p2r(10);
      bottom: p2r(1);
      right: 0;
      background-color: #eeeeee;
      transform: scaleY(0.5);
      z-index: 2;
    }
    &_logo {
      height: p2r(18);
      float: left;
      margin-top: p2r(15);
    }
    a {
      font-size: p2r(16);
      color: #98999b;
      float: left;
      margin-left: p2r(24);
      line-height: p2r(45);
      position: relative;
      font-weight: 400;
      &:first-of-type {
        margin-left: p2r(12);
      }
      &.active {
        color: #232426;
        font-weight: 900;
      }
      &.active::after {
        content: "";
        width: p2r(16);
        height: p2r(3);
        background-image: linear-gradient(rgba(77, 135, 235, 1));
        position: absolute;
        left: 50%;
        margin-left: p2r(-8);
        bottom: p2r(0);
        border-radius: p2r(600);
        z-index: 3;
      }
    }
  }
</style>

