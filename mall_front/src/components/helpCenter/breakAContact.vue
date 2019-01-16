<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <ul class="leaseWay">
        <li style="margin-bottom:30px">
          <h3>1.满足以下情况之一的，该承租方将被认定为失信客户：</h3>
          <p>（1）逾期1个月不支付设备租金；</p>
          <p>（2）在租期结束前提前归还设备，但不按协议支付随租随还服务费或违约金；</p>
          <p>（3）归还的设备严重损坏，但拒不按协议偿付维修费用。</p>
        </li>
        <li>
          <h3>2.对于被认定为失信客户的，小虫快租将有权利采取包括但不限于以下的措施：</h3>
          <p>（1）不接受失信客户的服务需求；</p>
          <p>（2）将失信客户公司信息及相应的申请人个人信息在小虫快租网站公布；</p>
          <p>（3）将失信客户公司信息及相应的申请人个人信息在互联网其他网站公布；</p>
          <p>（4）将失信客户公司信息及相应的申请人个人信息提供给第三方机构，包括央行下属征信平台、芝麻信用等征信机构；</p>
          <p>（5）向公安机关报案；</p>
          <p>（6）向法院起诉，并依照相关法律规定，报请将失信客户的身份信息及相关公司信息至中国人民共和国全国法院被执行人信息网公布。</p>
          <ul class="r-pay">
            <li>
              <i></i>
              <p>因小虫快租对失信客户采取的任何措施给失信客户带来的任何损失，均由该承租方自行承担，小虫快租概不负责。</p>
            </li>
            <li>
              <i></i>
              <p>对于任何无法按合约履行的情况，欢迎双方友好协商解决，尽量避免发生信用违约，请致电 400-836-5566。</p>
            </li>
          </ul>
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
        parentMsg: '租赁方式'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    padding-bottom: 100px;
    .r-content{
      .leaseWay{
        padding: 30px;
        .r-pay{
          margin-left: 37px;
          li{
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
        h3{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 30px;
          font-weight: bold;
        }
        li{
          font-size: 14px;
          color: #151515;
          letter-spacing: 0;
          line-height: 30px;
        }
      }
    }
  }
</style>
