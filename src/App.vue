<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    line-height: 1;
    box-sizing: border-box;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }

  html,
  body,
  #app {
    height: 100%;
  }
  body {
    font-family: "STHeiti", "Microsoft YaHei", Helvetica, Arial, sans-serif;
  }
  ul {
    list-style: none;
  }
  .pressbtn {
    position: relative;
    cursor: pointer;
    &:active {
      &:after,
      &:focus {
        pointer-events: none;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba($color: #000000, $alpha: 0.1);
        position: absolute;
        z-index: 2;
        border-radius: 100px;
      }
    }
  }
  .mint-msgbox-wrapper {
    opacity: 0;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    z-index: 5000 !important; //有坑
  }
</style>
