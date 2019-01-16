<template>
  <div id="app">
    <Xheader></Xheader>
    <router-view/>
    <Xfooter></Xfooter>
  </div>
</template>

<script>
  import Xheader from "./components/x-header"
  import Xfooter from "./components/x-footer"

  export default {
    name: 'App',
    components: {
      Xheader,Xfooter
    }
  }
</script>

<style lang="scss">
  @import "assets/css/public.scss";
  @import "common/font/font.css";
</style>
