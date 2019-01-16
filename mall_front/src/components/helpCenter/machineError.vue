<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <h2>全新机：</h2>
      <p style="margin-bottom: 10px;">由于您的机器是全新机，还在品牌服务商的保修期内，我们为您提供原厂维修服务，您可以自行报修原厂，或者联系我们，由我们为您代报修原厂。</p>
      <p>原厂报修电话、服务网点如下：</p>
      <p>联想：400 100 6000</p>
      <p>全国网点：<a href="http://support1.lenovo.com.cn/lenovo/wsi/station/servicestation/default.aspx?intcmp=GW" target="_blank">http://support1.lenovo.com.cn/lenovo/wsi/station/servicestation/default.aspx?intcmp=GW</a></p>
      <p>戴尔: 400 881 1852       金牌服务热线：座机 8008580614   手机 4008868619</p>
      <p>全国网点：<a href="http://odg.dell-brand.com/China_Dell_CIS/?c=cn&cs=cndhs1&l=zh&s=dhs&~ck=mn" target="_blank">http://odg.dell-brand.com/China_Dell_CIS/?c=cn&cs=cndhs1&l=zh&s=dhs&~ck=mn</a></p>
      <p>苹果：400 666 8800</p>
      <p>全国网点：<a href="https://locate.apple.com/cn/zh/" target="_blank">https://locate.apple.com/cn/zh/</a></p>
      <h2 style="margin-top: 30px;">二手机：</h2>
      <p>二手机由小虫快租提供维修服务，您可以通过拨打我们的 400 836 5566 服务热线进行报修。</p>
      <h2 style="margin-top: 30px;color: #FA5C1E;">温馨提示：</h2>
      <p>为快速解决设备故障和确定设备售后情况，无论是全新机设备还是二手设备，在您报修时必须提供小虫快租设备序列号，以便快速确定您的设备信息。</p>
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
        parentMsg: '机器出故障怎么办'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    min-height: 823px;
    .r-content{
      padding: 30px;
      h2{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
        font-weight:bold;
      }
      p{
        font-size: 14px;
        color: #151515;
        letter-spacing: 0;
        line-height: 30px;
        a{
          font-size: 14px;
          color: #3F3F3F;
          letter-spacing: 0;
          line-height: 30px;
        }
        a:hover{
          color: #6ECC66;
        }
      }
    }
  }
</style>
