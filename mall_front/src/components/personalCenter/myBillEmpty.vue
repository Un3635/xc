<template>
  <div class="my_bill_empty">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="icon_box">
      <div class="icon_kong">
        <img src="../../assets/images/icon_jilu_kong.png" alt="">
      </div>
      <div class="txt">
        <span>您还没有账单，赶紧去租机吧</span>
      </div>
      <div class="btn_success" style="padding-left: 30px;padding-right: 30px;" @click="goToIndex">
        去租机
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'

  export default {
    components: {
      plugin_title: plugin_title
    },
    name: 'myBillEmpty',
    data(){
      return {
        parentMsg:'我的账单'
      }
    },
    methods:{
      goToIndex(){
//          跳到首页
      }
    }
  }
</script>

<style>

</style>
