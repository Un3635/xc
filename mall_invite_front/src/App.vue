<template>
  <div id="app">
   <el-scrollbar class="page-component_scroll">
    <router-view/>
   </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "../static/css/reset.scss";
  #app {
    height: 100%;
    overflow-y: hidden;
  }
  .page-component_scroll {
    height: 100%;
  }
  
</style>
