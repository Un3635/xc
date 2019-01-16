<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <table class="f-c-table">
        <thead>
          <tr>
            <th rowspan="1" colspan="3">新订单发货</th>
            <th>小虫快租提供快递服务</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="5" colspan="1" class="t-td-1">退换机</td>
            <td class="t-td-2" colspan="2">有硬件故障的退租</td>
            <td class="t-td-3">用户负责快递服务，小虫快租报销物流费用</td>
          </tr>
          <tr>
            <td class="t-td-2" colspan="2">有硬件故障的换机</td>
            <td class="t-td-3">用户负责快递服务，小虫快租报销物流费用（往返）</td>
          </tr>
          <tr>
            <td rowspan="3" colspan="1" style="width: 120px;">无故障</td>
            <td>到期退租</td>
            <td class="t-td-3">用户负责快递服务，小虫快租报销物流费用</td>
          </tr>
          <tr>
            <td>未到期退租</td>
            <td class="t-td-3">用户负责快递服务</td>
          </tr>
          <tr>
            <td>未到期换机</td>
            <td class="t-td-3">用户负责快递服务（往返）</td>
          </tr>
          <tr>
            <td class="t-td-1" rowspan="2" colspan="1">维修</td>
            <td class="t-td-2" colspan="2">人为故障</td>
            <td class="t-td-3">用户负责快递服务（往返）</td>
          </tr>
          <tr>
            <td class="t-td-2" colspan="2">非人为故障</td>
            <td class="t-td-3">用户负责快递服务，小虫快租报销物流费用（往返）</td>
          </tr>
        </tbody>
      </table>
      <h2 style="color: #FC5F02;margin-top: 20px;">温馨提示：</h2>
      <p>1、如应由客户承担运费但客户选择到付的，小虫快租先支付运费再联系客户并扣款。</p>
      <p>2、小虫快租报销的用户物流费用 将通过向用户余额充值的方式实现。</p>
      <p>3、小虫快租建议用户使用顺丰、德邦物流等安全物流公司退回，费用凭物流公司发票支付，物流费用报销不超过笔记本30元/台，台式机 50元/台。客</p>
      <p>户委托快递或物流运输公司运输的设备发生物流损坏的由客户自主索赔，小虫快租 提供照片、鉴定报告等证据协助处理。</p>
      <p>4、客户认为是自然故障寄回后，全新机经品牌售后服务站检测、二手机经小虫快租维修服务部检测，为人为故障的，非损扣费标准，全新机以品牌售</p>
      <p>后服务站给出维修费为准、二手机以“小虫快租非损鉴定标准&收费标准”为准，电话与您沟通后，将在客户账单中发起运费扣款、非损费用扣款。</p>
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
        parentMsg: '运费怎么收取'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 30px;
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
      }
      .f-c-table{
        th,td{
          border: 1px solid #DDDDDD;
        }
        th{
          width: 495px;
          height: 50px;
          text-align: center;
          vertical-align: middle;
          font-size: 15px;
          font-weight: bold;
          color: #333333;
        }
        td{
          color: #333333 ;
          font-size: 15px;
          height: 50px;
          padding-left: 30px;
          vertical-align: middle;
        }
        .t-td-1{
          width: 90px;
          height: 50px;
          padding-left: 30px;
          vertical-align: middle;
          font-size: 15px;
          font-weight: bold;
          color: #333333;
        }
        .t-td-2{
          width: 313px;
        }
        .t-td-3{
          width: 435px;
        }
        .t-td-4{
          width: 191px;
        }
      }
    }
  }
</style>
