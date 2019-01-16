<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <h2>重要提示：</h2>
      <p>客户在收件时务必<span>本人当场验收</span>，如发现包装或设备破损需在快递员在场时马上联系小虫快租客服协助处理，如客户已签收则表示客户已对设备验收无误，<span>建议保留包装纸箱</span>以备退租或换机时使用。</p>
      <p>客户在收货时应首先确认外包装是否完好，如有破损、变形、被污染等可能影响包装内设备质量的问题应向快递送货人员指出并多角度拍照保存；然后打开包装对设备外观和性能进行测试。</p>
      <div class="at-message">
        <div class="message-left">
          <h2>全新机的签收</h2>
          <ul>
            <li>
              <h3>包装外观</h3>
              <p>小虫快租租赁的全新机均为原厂包装（除应客户要求进行配置或其它需要开箱处理的需求外），请首先确认原厂包装的完好</p>
            </li>
            <li>
              <h3>设备外观</h3>
              <p>全新机外观无变形、划痕等损坏及其它使用痕迹，原厂包装膜等完好；根据包装箱内说明确认配件是否齐全</p>
            </li>
            <li>
              <h3>开机测试</h3>
              <p>机器可正常启动进入系统或系统激活界面；屏幕无暗屏、黑屏、花线等现象</p>
            </li>
            <li>
              <h3>序列号确认</h3>
              <p>确认小虫快租设备序列号与订单内的序列号一致</p>
            </li>
          </ul>
        </div>
        <div class="message-left">
          <h2>非全新机的签收</h2>
          <ul class="m-l-list">
            <li>
              <h3>包装外观</h3>
              <p>设备包装可能使用小虫快租包装箱或厂商包装箱，但均会使用小虫快租胶条封口，请验收时除确认包装箱体是否有损坏同时也确认胶条是否有开封的痕迹</p>
            </li>
            <li>
              <h3>配件</h3>
              <p>根据订单商品信息确认电池、电源、键盘、鼠标、连接线等配件齐全</p>
            </li>
            <li>
              <h3>设备外观</h3>
              <p>设备外观无裂痕、无破损、无污染</p>
            </li>
            <li>
              <h3>开机测试</h3>
              <p>机器可正常启动进入系统；无密码；屏幕无暗屏、黑屏、花线等现象</p>
            </li>
            <li>
              <h3>序列号确认</h3>
              <p>确认小虫快租设备序列号与订单内的序列号一致</p>
            </li>
          </ul>
        </div>
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
    data () {
      return {
        parentMsg: '签收注意事项'
      }
    }
  }
</script>

<style scoped lang="scss">
  .r-container{
    background-color: #fff;
    .r-content{
      padding: 30px;
      h2{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
        font-weight: bold;
      }
      p{
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 30px;
        span{
          font-weight: bold;
        }
      }
      .at-message{
        width: 930px;
        height: 600px;
        background: #F5F6F5;
        margin-top: 20px;
        margin-bottom: 120px;
        .message-left{
          width: 400px;
          padding: 30px;
          float: left;
          h2{
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
            font-weight: bold;
            text-align: center;
            margin-bottom:20px;
          }
          ul{
            li{
              margin-bottom: 20px;
              h3{
                font-size: 15px;
                color: #666666;
                letter-spacing: 0;
                font-weight: bold;
                margin-bottom:10px;
              }
              p{
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>
