<template>
  <div class="headerBox">
    <header class="bar bar-nav">
      <span class="icon icon-left iconCus"  @click="$emit('back')"></span>
      <!-- <h1 class='title'>{{title}}</h1> -->
      <div class="buttons-row">
        <a class="tab-link button" :class="{active: clT}" @click="clickTitle(true, 'gemstone')">{{tabs[0]}}</a>
        <a class="tab-link button" :class="{active: !clT}" @click="clickTitle(false, 'diamonds')">{{tabs[1]}}</a>
      </div>
    </header>
  </div>

</template>
<script>
export default {
  name: "x-header",
  data() {
    return {
      clT: true,
      tabs: ['我的宝石', '我的钻石']
    };
  },
  methods: {
    clickTitle(t, str) {
      this.$emit('modifyTitleStr', str);
      this.clT = t;
      this.$store.commit('tabsChangeNames', str);
    }
  },
  mounted() {},
  created() {
    
  }
};
</script>
<style lang="scss" scoped>
.bar {
  &.h1 {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #1a0b10;
    letter-spacing: 0;
    text-align: center;
    line-height: 18px;
  }
}
.title {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #232426;
  letter-spacing: 0;
  text-align: center;
}

.iconCus {
  float: left;
  font-size: 20px;
  font-weight: 600;
}
.bar-nav {
  background: #fff;
}
</style>