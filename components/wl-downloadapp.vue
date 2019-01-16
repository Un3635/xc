<template>
  <div class="wl_downloadapp" v-if="$store.state.downloadapp_show">

    <img src="../assets/img/banner_close@3x.png" class="wl_downloadapp_close" @click="$store.commit('downloadapp_hide')">
    <a href="/download" class="wl_downloadapp_btn" title="下载app">下载app</a>
  </div>
</template>
<style lang="scss">
  @import "../other/util.scss";
  .wl_downloadapp {
    height: p2r(52);
    background-image: url("../assets/img/banner@3x.png");
    background-repeat: no-repeat;
    background-size: cover;
    left: 0;
    width: 100%;
    top: 0;
    position: fixed;
    z-index: 1000;
    &_btn {
      width: p2r(78);
      height: p2r(30);
      line-height: p2r(30);
      float: right;
      font-size: p2r(14);
      color: #4d87ea;
      margin-top: p2r(11);
      background: #ffffff;
      text-align: center;
      margin-right: p2r(16);
      border-radius: p2r(4);
      font-weight: 600;
    }
    &_close {
      width: p2r(20);
      height: p2r(20);
      margin-top: p2r(16);
      margin-left: p2r(16);
    }
  }
</style>
