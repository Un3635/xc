<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/main.scss";
@import "./assets/scss//reset-sm";
@import "./assets/scss/agreement.scss";
@import "./common/font/font.css";
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: #f7f7f7;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
