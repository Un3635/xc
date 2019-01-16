<template>
  <div>
    <nuxt id="seolayout" />
    <wl-footer></wl-footer>
  </div>

</template>
<style lang="scss">
  #seolayout {
    width: 1180px;
    margin: 0 auto;
  }
</style>
<script>
  import wlFooter from "../components/wl-footer";
  export default {
    components: { wlFooter }
  };
</script>
