<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">机构收益</template>
    <route-info ref="agency"/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'agency',
  components: {
    RouteInfo
  },
  watch: {
    $route(to, from) {
      //  console.log('person',from)
      if(from.path === '/financial/agency/detail' && Number(from.query.status) === 1 && to.name === 'agency') {
        this.$refs.agency.setData(to.name).getData(to.name);
      }
    }
  }
}
</script>
