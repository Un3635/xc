<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <h2 style="margin-bottom: 30px;">1.请您联系400客服：了解退机流程、政策、费用的如下内容</h2>
      <h2>2.请您打包发出设备</h2>
      <p>（1）请使用<span>顺丰寄出</span>（如客户使用其他快递，运送过程安全性由客户负责）</p>
      <p>（2）请在包装箱内放置A4纸，<span>写明如下信息</span>：</p>
      <ul class="r-pay">
        <li>
          <i></i>
          <p>需求：退机 X台</p>
        </li>
        <li>
          <i></i>
          <p>租赁公司名称</p>
        </li>
        <li>
          <i></i>
          <p>收件联系人姓名&电话</p>
        </li>
        <li>
          <i></i>
          <p>退机原因（如有故障，请写故障描述）</p>
        </li>
      </ul>
      <p>（3）打包要求：请您尽量使用小虫快租的包装或原厂包装，如原包装无法使用，则应使用快递公司提供的包装，并且将设备单件用不低于2CM厚的泡沫材料包裹，单件之间应使用包装材料隔开。
      </p>
      <p>（4）关于运费承担说明：</p>
      <table class="pae-table">
        <thead>
          <tr>
            <th>事因</th>
            <th>运费、保价费承担方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>到期正常退租</td>
            <td>小虫快租</td>
          </tr>
          <tr>
            <td>因自然故障退租、换机、维修</td>
            <td>小虫快租</td>
          </tr>
          <tr>
            <td>人为故障退机（往返）</td>
            <td>客户</td>
          </tr>
          <tr>
            <td>未到期非故障退机（往返）</td>
            <td>客户</td>
          </tr>
          <tr>
            <td>退租后补寄配件</td>
            <td>客户</td>
          </tr>
        </tbody>
      </table>
      <ul class="r-pay">
        <li>
          <i></i>
          <p>客户寄回的设备应<span>进行保价</span>，保价金额应为押金金额</p>
        </li>
        <li>
          <i></i>
          <p>由客户承担运费和保价费的情形，应由客户在寄出时支付运费与保价费</p>
        </li>
        <li>
          <i></i>
          <p>由小虫快租承担运费和保价费的情形，客户在寄出时可直接选择到付</p>
        </li>
        <li>
          <i></i>
          <p>退机原因（如有故障，请写故障描述）</p>
        </li>
      </ul>
      <p>（5）小虫快租收件地址：</p>
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
          <p>收货电话：021-39983371</p>
        </li>
      </ul>
      <h2>3.小虫快租签收</h2>
      <p>（1）根据快递公司规定，运输过程中的损坏应由寄件方索赔；</p>
      <p>（2）客户委托快递或物流运输公司运输的设备发生物流损坏的由客户自主索赔，小虫快租提供照片、鉴定报告等证据协助处理；</p>
      <p>（3）设备损坏后根据实际维修费用在客户账单中提出扣款，客户余额支付或充值后支付，索赔成功后将款项直接充值至客户账户。</p>
      <h2>4.小虫快租检测并与您沟通</h2>
      <p>（1）客户认为是自然故障寄回后，全新机经品牌售后服务站检测、二手机经小虫快租维修服务部检测，为人为故障的，非损扣费标准，全新机以品牌售后服务站给出维修费为准、二手机以“小虫快租非损鉴定标准&收费标准”为准，电话与您沟通后，将在客户账单中发起运费扣款、非损费用扣款；</p>
      <p>（2）若客户在小虫快租出据品牌售后服务的非损检测报告（全新机）或小虫快租非损检测报告（二手机）后，拒不支付非损金额&运费，小虫快租有权保持追偿的权利。</p>
      <p>（3）全新机签收后检测标准如下：</p>
      <table class="pae-table-standard">
        <thead>
          <tr>
            <th class="t-td-1">项目</th>
            <th>标准</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="t-td-1">设备序列号</td>
            <td>与订单序列号相同</td>
          </tr>
          <tr>
            <td class="t-td-1">设备外观</td>
            <td class="t-td-2" style="height: 120px;">
              <p>无破损开裂、无划伤、无严重划痕</p>
              <p>（3个月内租赁退换机器划痕条数≤3条，划痕总长度≤10cm；</p>
              <p>3个月以上租赁退换机器划痕条数≤5条，划痕长度≤10cm）</p>
            </td>
          </tr>
          <tr>
            <td class="t-td-1">配件</td>
            <td>齐全、外观无损坏、使用正常</td>
          </tr>
          <tr>
            <td class="t-td-1">硬件</td>
            <td class="t-td-2" style="height: 90px;">
              <p>配置相符、无非品牌官方拆装及维修、</p>
              <p>无进液、内外屏破损、雷击等非正常损坏</p>
            </td>
          </tr>
          <tr>
          </tr>
        </tbody>
      </table>
      <ul class="r-pay">
        <li style="padding: 10px 0">
          <i></i>
          <p>检测有划痕会进行相关扣费，具体金额以划痕程度检测结果为准</p>
        </li>
      </ul>
      <p>（4）二手机签收后检测标准如下：</p>
      <table class="pae-table-standard">
        <thead>
        <tr>
          <th class="t-td-1">项目</th>
          <th class="t-td-3">标准</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="t-td-1">设备序列号</td>
          <td class="t-td-3">与订单序列号相同</td>
        </tr>
        <tr>
          <td class="t-td-1">设备外观</td>
          <td class="t-td-3">
            无破损开裂
          </td>
        </tr>
        <tr>
          <td class="t-td-1">配件</td>
          <td class="t-td-3">齐全、外观无损坏、使用正常</td>
        </tr>
        <tr>
          <td class="t-td-1">硬件</td>
          <td class="t-td-3" style="height: 90px;">
            <p>配置相符、无非品牌官方拆装及维修、</p>
            <p>无进液、内外屏破损、雷击等非正常损坏</p>
          </td>
        </tr>
        <tr>
        </tr>
        </tbody>
      </table>
      <ul class="r-pay">
        <li style="padding: 10px 0">
          <i></i>
          <p>检测有划痕会进行相关扣费，具体金额以划痕程度检测结果为准</p>
        </li>
      </ul>
      <h2>5.小虫快租处理订单</h2>
      <p>退机、换机涉及的相关费用如下：</p>
      <table class="pae-table-standard" style="margin-bottom: 140px;">
        <thead>
        <tr>
          <th class="t-td-1">退机流程</th>
          <th class="t-td-1">机器类型</th>
          <th class="t-td-4">退机原因</th>
          <th class="t-td-5">违约金</th>
          <th class="t-td-1">运费</th>
          <th class="t-td-1">当月租金</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2" colspan="1" class="t-td-title">租完即送</td>
            <td rowspan="2" colspan="1">新机</td>
            <td>非故障退机</td>
            <td class="t-td-5">合约期内全部租金</td>
            <td>用户承担</td>
            <td>正常收取</td>
          </tr>
          <tr>
            <td>有机器故障</td>
            <td colspan="3">
              <div class="t-td-con">
                租完即送不支持故障退机流程，由租赁机器品牌官方售
                后为用户提供维修服务，小虫快租协助完成维修服务，
                用户不愿意维修坚持退机视为“非故障退机”处理。
              </div>
            </td>
          </tr>
          <tr>
            <td rowspan="4" colspan="1" class="t-td-title">固定租期</td>
            <td rowspan="2" colspan="1">新机</td>
            <td>非故障退机</td>
            <td class="t-td-5">合约期内全部租金</td>
            <td>用户承担</td>
            <td>正常收取</td>
          </tr>
        <tr>
          <td>有机器故障</td>
          <td colspan="3">
            <div class="t-td-con">
              固定租期不支持故障退机流程，由租赁机器品牌官方售
              后为用户提供维修服务，小虫快租协助完成维修服务，
              用户不愿意维修坚持退机视为“非故障退机”处理。
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="2" colspan="1">二手设备</td>
          <td>非故障退机</td>
          <td class="t-td-5">合约期内剩余租金50%</td>
          <td>用户承担</td>
          <td>正常收取</td>
        </tr>
        <tr>
          <td>机器有故障</td>
          <td class="t-td-5">合约期内剩余租金30%</td>
          <td>用户承担</td>
          <td>正常收取</td>
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
        parentMsg: '退机、换机流程与费用'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    .r-content{
      padding: 30px;
      span{
        color: #FA7332;
      }
      h2{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: bold;
        line-height: 30px;
      }
      p{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
      }
      .pae-table{
        margin-bottom:20px;
        th, td{
          width: 256px;
          border: 1px solid #DDDDDD;
          height: 50px;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          vertical-align: middle;
        }
        th{
          font-weight: bold;
        }
      }
      .pae-table-standard{
        margin-left: 37px;
        th,td{
          border: 1px solid #DDDDDD;
          height: 50px;
          text-align: left;
          vertical-align: middle;
          font-size: 15px;
          padding-left: 30px;
          .t-td-con{
            width: 390px;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            line-height: 30px;
            margin-left: 30px;
            text-align: left;
          }
        }
        th {
          font-weight: bold;
        }
        .t-td-1{
          width: 135px;
        }
        .t-td-3{
          width: 335.7px;
        }
        .t-td-4{
          width: 136px;
        }
        .t-td-5{
          width: 211px;
        }
        .t-td-title{
          font-weight: bold;
        }
      }
      .r-pay{
        margin-left: 37px;
        li{
          margin-bottom:10px;
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
    }
  }
</style>
