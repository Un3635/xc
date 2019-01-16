<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">聊天警报</template>
    <route-info/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'alarm',
  components: {
    RouteInfo
  }
}
</script>
