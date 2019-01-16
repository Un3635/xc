<template>
  <div class="appback" @click="closeWindow()" v-if="show"></div>
</template>
<script>
  export default {
    data() {
      return {
        show: this.$app.hockAPP()
      };
    },
    created() {
      this.$app.call("hideBackBar", {}, function() {});
      // this.$app.call("webviewOffset", { offset: 20 }, function() {});
    },
    methods: {
      closeWindow() {
        this.$app.call("closeWindow", {}, function() {});
      }
    }
  };
</script>
<style lang="scss">
  @import "../common/util.scss";
  .appback {
    position: absolute;
    left: p2r(16);
    top: p2r(35);
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg);
    transform-origin: bottom;
    width: p2r(13);
    height: p2r(13);
    z-index: 20;
  }
</style>

