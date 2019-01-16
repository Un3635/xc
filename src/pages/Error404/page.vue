<template>
  <div class="page-404">
    <!--<p class="page-404_title">page not found</p>-->
    <!--<el-button class="d2-mt" @click="$router.replace({ path: '/' })">-->
      <!--返回首页-->
    <!--</el-button>-->
    <basic-not-found/>
  </div>
</template>


<script>
    import BasicNotFound from "./components/NotFound/BasicNotFound";
    export default {
        components: {BasicNotFound}
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page-404 {
  /*background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;*/
  /*background-blend-mode: multiply,multiply;*/
  height: 100%;
  width:100%;
  display:flex;
  display: -webkit-flex; /* Safari */
  align-content: center;
  justify-content: center;
  background:#fff;
}
</style>
