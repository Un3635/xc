<template>
  <div class="page-zixun-header">
    <img src="../assets/img/home_walian_logo@3x.png" alt="挖链网" class="page-zixun-header-logo" @click="gohome">
    <div class="page-zixun-header-wrap">
      <a href="/zixun" :class="{active:isNavActive({namePinyin:''})}">首页</a>
      <a :href="geturl(i)" v-for="(i,idx) in channelList" :key="idx" :class="{active:isNavActive(i)}" v-bind:title="i.name">{{i.name}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["channelList"],
    methods: {
      geturl(channel) {
        return "/zixun/" + channel.namePinyin;
      },
      gohome() {
        window.location.href = "/";
      },
      isNavActive(channel) {
        if (channel.namePinyin == "") {
          if (this.$route.path == "/zixun") {
            return true;
          } else {
            return false;
          }
        } else {
          return this.$route.path == "/zixun/" + channel.namePinyin;
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "../other/util.scss";
  .page-zixun-header {
    height: p2r(45);
    line-height: p2r(45);
    padding-left: p2r(10);
    position: relative;
    overflow-y: hidden;
    &::after {
      height: 1px;
      content: "";
      position: absolute;
      left: p2r(10);
      bottom: 0;
      right: 0;
      background-color: #eeeeee;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    &-logo {
      height: p2r(18);
      float: left;
      margin-top: p2r(15);
    }
    &-wrap {
      height: 120%;
      line-height: p2r(45);
      white-space: nowrap;
      overflow-x: scroll;
      position: relative;
      z-index: 5;
    }
    a {
      font-size: p2r(16);
      color: #98999b;
      display: inline-block;
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
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(77, 135, 235, 1))
        );
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

