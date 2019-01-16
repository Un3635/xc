<template>
  <div class="title-box">
    <div class="title-txt">{{title}}</div>
    <slot />
  </div>

</template>
<script>
export default {
  name: "box",
  props: {
    title: {
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/public-class.scss";
.title-box {
  border: 1px solid #eee;
  margin: 20px auto 30px;
  padding: 25px 5px 20px 5px;
  position: relative;
  .title-txt {
    position: absolute;
    top: -13px;
    left: 15px;
    font-size: 16px;
    background: #fff;
    padding: 5px 10px;
  }
}
</style>

