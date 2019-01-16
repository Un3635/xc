<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">钻石流水</template>
    <route-info/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'diamonds',
  components: {
    RouteInfo
  }
}
</script>
