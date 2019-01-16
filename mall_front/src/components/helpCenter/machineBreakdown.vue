<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <p>1、全新机的维修费用由厂家售后服务站出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会协助代报修原厂。</p>
      <p>2、保内的非全新设备由厂家售后服务站出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会协助代报修原厂。</p>
      <p>3、脱保的非全新设备由小虫快租维修服务部出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会指导您将机器寄回小虫快租进行维修相关事宜，为了不耽误您的使用，小虫快租可以同步为您进行换机处理。小虫快租收到机器后会进行检测，根据检测结果与您沟通维修费用事宜。</p>
      <h2 style="margin-top: 30px;margin-bottom: 10px;">维修鉴定：</h2>
      <table class="m-b-table">
        <tbody>
          <tr>
            <td rowspan="2" colspan="1">故障原因</td>
            <td>人为损坏</td>
            <td class="t-td-1">客户负责承担维修费用</td>
          </tr>
          <tr>
            <td>非人为</td>
            <td class="t-td-1">小虫快租负责免费维修</td>
          </tr>
          <tr>
            <td rowspan="1" colspan="3" style="width:686px;padding: 11px 160px 20px 30px;">
              <div>
                <h2 style="color: #FA5C1E;">温馨提示：</h2>
                <p>1. 维修前会由品牌厂家售后服务站或小虫快租维修服务部提供工单&费用，如客户不认可维修费用可选择自修。</p>
                <p>2. 若客户在小虫快租出据品牌售后服务的非损检测报告（全新机）或小虫快租非损检测报告（二手机）后，拒不支付非</p>
                <p>损金额不愿退回自修的，小虫快租有权发送正式非损通知说明后，直接从客户的账户余额中直接扣除非损费用。</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
        parentMsg: '使用中机器损坏怎么办'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 100px;
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
        color: #333;
        letter-spacing: 0;
        line-height: 30px;
      }
      .m-b-table{
        margin-bottom: 10px;
        td{
          width: 90px;
          height: 50px;
          border: 1px solid #DDDDDD;
          vertical-align: middle;
          padding-left: 30px;
        }
        .t-td-1{
          width: 658px;
        }
      }
    }
  }
</style>
