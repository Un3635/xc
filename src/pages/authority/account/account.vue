<template>
  <d2-container>
    <template slot="header">账号管理</template>
    <route-info/>
  </d2-container>
</template>

<script>
import RouteInfo from './componnets/RouteInfo';
export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  name: 'account',
  components: {
    RouteInfo
  },
  methods:{

  }
}
</script>
