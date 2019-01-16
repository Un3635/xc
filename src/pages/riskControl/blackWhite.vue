<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">黑白名单</template>
    <route-info ref="blackWhite"/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'blackWhite',
  components: {
    RouteInfo
  },
  watch: {
    $route(to, from) {
      if(from.path === '/riskControl/blackWhite/detail' && to.name === 'blackWhite') {
        this.$refs.blackWhite.setData(to.name).getData(to.name);
      }
    }
  }
}
</script>
