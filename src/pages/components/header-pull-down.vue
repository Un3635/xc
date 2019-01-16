<template>
  <div class="pull-down" v-show="isShow">
    <transition name="vux-fade">
      <div v-show="isShow">
        <div class="cover" @click="$emit('close')"></div>
        <div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      isShow: Boolean
    }
  };
</script>
<style lang="scss" scoped>
  .pull-down {
    position: absolute;
    top: 46px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 502;
    .cover {
      position: absolute;
      width: 100%;
      background: rgba(0, 0, 0, 0.50);
      min-height: calc(100vh - 46px);
    }
  }
</style>
