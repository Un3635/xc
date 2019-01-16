<template>
  <div class="r-container">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="r-content">
      <table class="a-s-table">
        <thead>
          <tr>
            <th>租赁方式</th>
            <th>机器类型</th>
            <th class="t-td-2">退机原因</th>
            <th class="t-td-3">违约金</th>
            <th>运费</th>
            <th>当月租金</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2" colspan="1" class="t-td-1">租完及送</td>
            <td rowspan="2" colspan="1">新机</td>
            <td class="t-td-2">非故障退机</td>
            <td class="t-td-3">合约期内全部租金</td>
            <td>用户承担</td>
            <td>正常收取</td>
          </tr>
          <tr>
            <td class="t-td-2">机器有故障</td>
            <td rowspan="1" colspan="3" class="t-td-4"><div class="content">租完即送不支持故障退机流程，由租赁机器品牌官方售后为用户提供维修服务，小虫快租协助完成维修服务，用户不愿意维修坚持退机时视为“非故障退机”处理</div></td>
          </tr>
          <tr>
            <td rowspan="4" colspan="1" class="t-td-1">固定租期</td>
            <td rowspan="2" colspan="1">新机</td>
            <td class="t-td-2">非故障退机</td>
            <td class="t-td-3">合约期内全部租金</td>
            <td>用户承担</td>
            <td>正常收取</td>
          </tr>
          <tr>
            <td>机器有故障</td>
            <td rowspan="1" colspan="3"><div class="content">固定租期不支持故障退机流程，由租赁机器品牌官方售后为用户提供维修服务，小虫快租协助完成维修服务，用户不愿意维修坚持退机时视为“非故障退机”处理</div></td>
          </tr>
          <tr>
            <td rowspan="2" colspan="1">二手设备</td>
            <td>非故障退机</td>
            <td>合约期内剩余租金50%</td>
            <td>用户承担</td>
            <td>正常收取</td>
          </tr>
          <tr>
            <td>机器有故障</td>
            <td>合约期内剩余租金30%</td>
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
        parentMsg: '提前退租怎么办'
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
        color: #151515;
        letter-spacing: 0;
        line-height: 30px;
      }
      .a-s-table{
        th,td{
          border: 1px solid #DDDDDD;
        }
        th{
          width: 120px;
          height: 50px;
          text-align: center;
          vertical-align: middle;
          font-size: 15px;
          font-weight: bold;
          color: #333333;
        }
        td{
          width: 120px;
          color: #333333 ;
          font-size: 15px;
          height: 50px;
          padding-left: 30px;
          vertical-align: middle;
          .content{
            padding: 15px 30px 15px 0;
          }
        }
        .t-td-1{
          font-weight: bold;
        }
        .t-td-2{
          width: 150px;
        }
        .t-td-3{
          width: 290px;
        }
        .t-td-4{
          width: 534px;
        }
      }
    }
  }
</style>
