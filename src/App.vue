<template>
  <div id="app">
    <wechat />
    <router-view />
  </div>
</template>

<script>
import Wechat from '@/components/WeChat-browser'
export default {
  name: 'App',
  components: {
     Wechat
  }
}
</script>

<style>
@import 'assets/scss/main.scss';
#app {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  font-family: PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
