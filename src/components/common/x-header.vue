<template>
  <div>
    <header class="bar bar-nav">
      <span class="icon icon-left icon-header" @click="$emit('back')"></span>
      <h1 class='title-header'>{{title}}</h1>
    </header>
  </div>

</template>
<script>
export default {
  name: "x-header",
  props: {
    title: {
      default: ""
    }
  },
  data() {
    return {
      rData: [{}]
    };
  },
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.title-header {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #232426;
  letter-spacing: 0;
  text-align: center;
  font-weight: 600;
  line-height: 40px;
}

.icon-header {
  float: left;
  font-weight: 600;
  line-height: inherit !important;
  font-size: 21px;
  padding-top: 10px;
}
.bar-nav {
  background: #fff;
}
</style>