<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">宝石流水</template>
    <route-info/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'gemstone',
  components: {
    RouteInfo
  }
}
</script>
