<template>
  <div class="page">
    <div class="page-content">
      <div class="page-content__inner">
        <div class="c-header">
          算立方·{{coin.toLocaleUpperCase()}}矿池数据
        </div>
        <section class="sec">
          <h3>挖出的区块</h3>
          <div class="subhead">
            最近24小时共挖出 <span>{{blockInfo.last_24_total}}</span>个块，其中<span>{{blockInfo.undistributed}}</span>个块尚未分配
            <div class="right">
              <span class="legend-label">今日已挖出：{{blockInfo.last_24_total}}块</span>
              <span class="legend-label">尚未分配：<span class="unaccounted">{{blockInfo.undistributed}}块</span></span>
            </div>
          </div>
          <table class="table-pool">
            <tr>
              <th>高度</th>
              <th>Hash</th>
              <th>发现时间</th>
              <th>块奖励</th>
              <th>难度</th>
              <th>是否分配</th>
            </tr>
            <tr v-for="item in blockInfoList" :key="item.id">
              <td class="poolHeigt">{{item.height}}</td>
              <td :title="item.blockhash">{{item.blockhash|truncate}}</td>
              <td class="direction-time">{{item.time*1000 | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.difficulty}}</td>
              <td :class="item.accounted==='1' ? 'accountActive':'unAccountActive'" class="accountPool">
                <span>{{item.accounted==='1'?'已分配':'未分配'}}</span>
              </td>
            </tr>
          </table>
        </section>
      </div>
    </div>
    <x-features-powershop/>
  </div>
</template>

<script>
  import XFeaturesPowershop from '../../components/x-features-powershop';
  import poolAPI from '../../services/pool-api';
  import errorHandler from '../../services/error-handler';

  export default {
    metaInfo: {
      title: '豹池 - 比特币矿池、莱特币、以太坊矿池-算立方', // set a title
      meta: [ // set meta
        {name: 'keywords', content: ''},
        {name: 'description', content: ''}
      ]
    },
    components: {XFeaturesPowershop},
    data() {
      return {
        coin: '',
        blockInfoList: [],
        blockInfo: {}
      };
    },
    methods: {
      getBlockInfo() {
        poolAPI.getBlockInfo(this.$route.query.coin)
          .then(res => {
            this.blockInfo = res;
            this.blockInfoList = res.data || [];
          })
          .catch(error => {
            errorHandler(error);
          });
      }
    },
    mounted() {
      this.getBlockInfo();
    }
  };
</script>

<style scoped lang="scss">
  .page-content {
    background-color: #fafafa;
    padding-top: 10px;
    padding-bottom: 50px;
  }

  .page-content__inner {
    width: 1200px;
    margin: 0 auto;
  }

  .c-header {
    padding: 25px 40px;
    font-size: 24px;
    line-height: 30px;
    font-weight: bold;
    background-color: #fff;
    color: #303137;
    margin-bottom: 10px;
  }

  .sec {
    background: #fff;
    padding: 40px 40px 30px 40px;
  }

  .table-pool {
    margin-top: 20px;
    border-spacing: 0;
    width: 100%;
    font-size: 14px;
    .poolHeigt {
      font-weight: 600;
    }
    th {
      background-color: #F5F5F7;
      color: #969699;
      text-align: left;
    }
    td {
      font-size: 14px;
      color: #303137;
      border-bottom: 1px solid #EDEEF0;
      &.accountActive {
        color: #2BB56F;
      }
      &.unAccountActive {
        color: #FD7220;
      }
    }
    th, td {
      box-sizing: border-box;
      padding: 0 20px;
      height: 60px;
      &:last-child {
        text-align: center;
        min-width: 100px;
      }
      &.direction-time {
        min-width: 180px;
      }
    }
  }

  .subhead {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #969699;
  }

  .legend-label {
    display: inline-block;
    margin-left: 3em;
    color: #303137;
    font-weight: 600;
  }

  .legend-label .unaccounted {
    color: #FD7220;
  }

  .accountPool {
    color: #FD7220;
  }
</style>
