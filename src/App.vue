<template>
  <div id="app">
    <x-header :curr-list="curr"/>
    <router-view/>
  </div>
</template>

<script>
  import XHeader from './components/x-header.vue';
  import {mapState} from 'vuex'
  export default {
    name: 'App',
    components: {
      XHeader
    },
    data() {
      return {
        arrList: {
          cn: ['首页', '产品', '联系我们', 'APP下载'],
          en: ['Home', 'Product', 'Contact', 'APP']
        },
        curr: []
      };
    },
    computed: {
      ...mapState(['isEnglish'])
    },
    watch: {
      isEnglish(val) {
        this.curr = this.arrList[val];
      }
    },
    created() {
      this.curr = this.arrList.cn;
    },
  }
</script>

<style lang="sass">
  @import "assets/css/reset.scss";
</style>
