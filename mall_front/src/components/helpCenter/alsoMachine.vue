<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <p>小虫快租将免费通过快递或物流将客户所订机器快递上门。</p>
      <table class="a-table">
        <tbody>
          <tr>
            <td rowspan="2" colspan="1" class="a-td-1"><div>退机流程</div></td>
            <td class="a-td-2">合约期满退机</td>
            <td class="a-td-3">用户负责快递服务，小虫快租报销物流费用</td>
          </tr>
          <tr>
            <td class="a-td-2">提前退组退机</td>
            <td class="a-td-3">用户负责快递服务</td>
          </tr>
          <tr>
            <td rowspan="2" colspan="1" class="a-td-1"><div>换机流程</div></td>
            <td class="a-td-2">维修换机</td>
            <td class="a-td-3">参考维修流程</td>
          </tr>
          <tr>
            <td class="a-td-2">更换订单</td>
            <td class="a-td-3">用户负责快递服务（往返）</td>
          </tr>
          <tr>
            <td rowspan="3" colspan="1" class="a-td-1"><div>维修流程</div></td>
            <td class="a-td-2">正常硬件故障</td>
            <td class="a-td-3">用户负责快递服务，小虫快租报销物流费用（往返）</td>
          </tr>
          <tr>
            <td class="a-td-2">人为故障</td>
            <td class="a-td-3">用户负责快递服务（往返）</td>
          </tr>
          <tr>
            <td class="a-td-2">软件故障</td>
            <td class="a-td-3">用户负责快递服务（往返）</td>
          </tr>
        </tbody>
      </table>
      <ul class="r-pay">
        <li>
          <i></i>
          <p>应由客户承担运费时，客户需在寄出时支付运费，如果客户选择到付，小虫快租先支付运费再联系客户并扣款。</p>
        </li>
        <li>
          <i></i>
          <p>小虫快租建议用户使用顺丰、德邦物流等安全物流公司退回，费用凭物流公司发票支付，物流费用报销不超过笔记本30元/台，台式机 50元/台。</p>
        </li>
        <li>
          <i style="border: 0 none"></i>
          <p>客户委托快递或物流运输公司运输的设备发生物流损坏的由客户自主索赔，小虫快租提供照片、鉴定报告等证据协助处理</p>
        </li>
      </ul>
      <h2 class="a-contact">联系方式：</h2>
      <ul class="r-pay">
        <li>
          <i></i>
          <p>还机地址：上海市徐汇区云锦路500号绿地汇·中心B座913室</p>
        </li>
        <li>
          <i></i>
          <p>收货人：小虫快租</p>
        </li>
        <li>
          <i></i>
          <p>收货电话：021-39983371（仅限快递拨打）</p>
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
        parentMsg: '取还机'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 120px;
    .r-content{
      padding: 30px;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 30px;
      .a-contact{
        color: #333333;
        letter-spacing: 0;
        line-height: 15px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom:10px;
      }
      .r-pay{
        li{
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
      .a-table{
        margin-top: 20px;
        margin-bottom: 10px;
        tr{
          td{
            border: 1px solid #DDDDDD;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            margin: 0;
            padding: 0 30px;
          }
          .a-td-1{
            width: 90px;
            height: 100px;
            font-weight: bold;
            text-align: center;
            vertical-align:middle;
          }
          .a-td-2{
            width: 120px;
            height: 50px;
            line-height: 50px;
          }
          .a-td-3{
            width: 375px;
            height: 50px;
            line-height: 50px;
          }
        }
      }
    }
  }
</style>
