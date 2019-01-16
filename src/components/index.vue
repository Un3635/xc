<template>
  <div class="all-warp">
    <Xheader />
    <Mswiper />
  </div>
  
</template>
<script>
import Xheader from './x-header'
import Mswiper from './main-swiper'
export default {
  watch: {
    '$route'(to, from) {
        // console.log(val);
      document.title = to.meta.title;
    }
  },
  created() {
    const LG = this.$route.path.replace('/', '').toLowerCase();
    if(LG === 'en') {
      this.$store.commit('changeLange', LG);
    }
    document.title = this.$route.meta.title;
  },
  components: {
    Xheader,
    Mswiper
  }
}
</script>
<style lang="scss" scoped>
.all-warp {
  position: relative;
}
</style>

