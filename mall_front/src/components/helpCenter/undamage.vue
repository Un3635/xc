<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <p>（1）全新机的维修费用由厂家售后服务站出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会协助代报修原厂。</p>
      <p>（2）保内的非全新设备由厂家售后服务站出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会协助代报修原厂。</p>
      <p>（3）脱保的非全新设备由小虫快租维修服务部出具故障现象、故障成因、维修费用的工单作为维修费的凭证；小虫快租客服人员受理您的信息后，会指导您将机器寄回小虫快租进行维修相关事宜，为了不耽误您的使用，小虫快租可以同步为您进行换机处理。小虫快租收到机器后会进行检测，根据检测结果与您沟通维修费用事宜。</p>
      <ul class="r-pay">
        <li>
          <i></i>
          <p>具体维修价格以品牌授权服务站维修标准或小虫快租维修服务部收费标准为准。</p>
        </li>
        <table class="u-table">
          <tbody>
            <tr>
              <td rowspan="2" colspan="1">维修鉴定</td>
              <td rowspan="2" colspan="1">故障成因</td>
              <td>人为损坏</td>
              <td class="t-td-1">用户负责承担维修服务</td>
            </tr>
            <tr>
              <td>非人为损坏</td>
              <td class="t-td-1">小虫快租负责免费维修</td>
            </tr>
          </tbody>
        </table>
        <li>
          <i></i>
          <p>维修前会由品牌厂家售后服务站或小虫快租维修服务部提供工单&费用，如用户不认可维修费用可选择自修。</p>
        </li>
        <li>
          <i></i>
          <p>若客户在小虫快租出具品牌售后服务的非损检测报告（全新机）或小虫快租非损检测报告（二手机）后，拒不支付非损金额不愿退回自修的，</p>
        </li>
        <li>
          <i style="border: 0 none"></i>
          <p>小虫快租有权发送正式非损通知说明后，直接从客户余额中直接扣除非损费用。</p>
        </li>
      </ul>
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
        parentMsg: '租金缴付'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 100px;
    .r-content{
      padding:30px;
      .r-pay{
        .u-table{
          margin-top: 30px;
          td{
            width: 120px;
            height:50px;
            border: 1px solid #DDDDDD;
            text-align: center;
            vertical-align: middle;
          }
          .t-td-1{
            width: 210px;
          }
        }
        li{
          padding: 10px 0;
          span{
            color: #FF0002;
          }
          i{
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            border: 1px solid #333333;
          }
          p{
            display: inline-block;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 15px;
          }
        }
      }
      p{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
      }
    }
  }
</style>
