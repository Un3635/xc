<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">附加值管理</template>
    <route-info ref="additional"/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'additional',
  components: {
    RouteInfo
  },
  watch: {
    $route(to, from) {
      if(from.path === '/riskControl/additional/add' && to.name === 'additional') {
        this.$refs.additional.setData(to.name).getData(to.name);
      }
    }
  }
}
</script>
