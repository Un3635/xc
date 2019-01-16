<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <ul class="leaseWay">
        <li>
          <h3>1.租完即送：</h3>
          <p>（1）租赁期满，设备归客户所有。</p>
          <p>（2）租期未满退还，也须按订单约定交纳全部租金。</p>
        </li>
        <li>
          <h3>1.固定租期：</h3>
          <p>（1）客户须租赁期满才能退还。</p>
          <p>（2）租期未满退还，小虫快租收取未缴纳租金的30%~50%作为违约金。</p>
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
    padding-bottom: 195px;
    .r-content{
      .leaseWay{
        padding: 30px;
        h3{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 30px;
          font-weight: bold;
        }
        li{
          margin-bottom:30px;
          font-size: 14px;
          color: #151515;
          letter-spacing: 0;
          line-height: 30px;
        }
      }
    }
  }
</style>
