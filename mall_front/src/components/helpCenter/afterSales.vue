<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <p>客户按小虫快租网站机型详情页主图下方标注的“<span style="font-weight: bold">售后服务方式</span>”享受相应售后服务。有如下四类方式：</p>
      <p>（1）小虫快租提供全程整机更换服务，由承租方联系小虫快租售后服务，小虫快租将为客户更换一台同型号整机；</p>
      <p>（2）厂商提供快递换货服务，由承租方直接联系厂商售后服务；</p>
      <p>（3）厂商提供上门服务，由承租方直接联系厂商售后服务；</p>
      <p>（4）承租方到厂商售后服务站送修，由承租方直接联系厂商售后服务。</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    components: {
      plugin_title: plugin_title
    },
    data () {
      return {
        parentMsg: '售后服务'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    min-height: 500px;
    .r-content{
      padding:30px;
      p{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
      }
    }
  }
</style>
