<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">图片管理<span style="margin-left:30px;color:#999;">日期段内未复核订单：{{orderCount}}</span></template>
    <route-info @countFromChild="countFromChild" ref="pic"/>
  </d2-container>
</template>

<script>
import RouteInfo from './index.vue'
export default {
  name:'pic',
  components: {
    RouteInfo
  },
  data(){
    return{
      orderCount:0
    }
  },
  methods:{
    countFromChild(params){
      this.orderCount = params;
    }
  },
  watch: {
    $route(to, from) {
      // console.log('pic', from)
      if(from.path === '/audit/person/detail' && Number(from.query.status) === 0 && to.name === 'pic') {
        this.$refs.pic.setData().getData();
      }
      
    }
  }
}
</script>
