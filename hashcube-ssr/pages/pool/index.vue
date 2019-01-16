<template>
  <div class="page">
    <figure class="page-header">
      <img src="../../assets/images/banner@2x.jpg" alt="">
      <figcaption>
        <h1>
          <img src="../../assets/images/mine pool@2x.png" alt="">
          算立方矿池服务
        </h1>
        <el-input class="search-input" placeholder="输入钱包地址立即查看你的收益" v-model="walletAddress">
          <template slot="append">
            <div class="search-btn" @click="serchWallet(walletAddress)">查看收益</div>
          </template>
        </el-input>
        <p class="tips">{{serchTip}}</p>
      </figcaption>
    </figure>
    <div class="page-content">
      <div class="page-content__inner">
        <table class="tb-pool">
          <thead>
          <tr>
            <th>币种</th>
            <th>接入地址</th>
            <th>矿池算力</th>
            <th>全网总算力</th>
            <th>难度</th>
            <th>总矿工数</th>
            <th>数据更新时间</th>
            <th>出块数据</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in allPollStatus" :key="item.coin">
            <td>{{item.coin.toLocaleUpperCase()}}</td>
            <td>
              <nuxt-link :to="'/pool/'+item.coin">{{item.coin + '.pool.hc.top'+':'+ (port[item.coin]||'')}}</nuxt-link>
            </td>
            <td>{{item.poolhash}}</td>
            <td>{{item.networkhash}}</td>
            <td>{{item.difficulty}}</td>
            <td>{{item.pool_worker}}</td>
            <td>{{item.sub_time * 1000 | date('YYYY-MM-DD HH:mm:ss')}}</td>
            <td>
              <nuxt-link :to="'/pool/block-info?coin='+item.coin">
                <img class="icon-block" src="../../assets/images/icon-block-data.png" alt="">
              </nuxt-link>
            </td>
          </tr>
          </tbody>
        </table>
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
    head: {
      title: '豹池 - 比特币矿池、莱特币、以太坊矿池-算立方', // set a title
      meta: [ // set meta
        {name: 'keywords', content: ''},
        {name: 'description', content: ''}
      ]
    },
    components: {XFeaturesPowershop},
    data() {
      return {
        port: {
          eth: 9574,
          etc: 9572,
          btm: 9570,
          dash: 9571,
          dcr: 9573
        },
        allPollStatus: [],
        walletAddress: '',
        serchTip: ''
      };
    },
    mounted() {
      this.getAllPoolStatus();
    },
    methods: {
      getAllPoolStatus() {
        poolAPI.getShareAllPoolStatus().then(res => {
          res.result.reverse();
          res.result.forEach(item => {
            if (item.difficulty === null) {
              item.difficulty = '暂无';
            }
            if (item.networkhash === null) {
              item.networkhash = '暂无';
            }
          });
          this.allPollStatus = res.result;
        });
      },
      goPollBlock(coin) {
        this.$router.push({
          path: '/pool/block-info',
          query: {
            coin: coin
          }
        });
      },
      serchWallet(address) {
        if (!walletAddress.trim()) {
          this.serchTip = '请填写正确的钱包地址';
          return;
        }
        poolAPI.searchWallet(address)
          .then(res => {
            if (res.result && res.result.length > 0) {
              this.serchTip = '';
              this.$router.push({
                path: '/pool/wallet',
                query: {
                  address,
                  coin: res.result[0].coin
                }
              });
            } else {
              this.serchTip = '暂未发现此地址的相关记录，可稍候再试。';
            }
          })
          .catch(errorHandler);
      }
    }
  };
</script>

<style scoped lang="scss">

  .page-header {
    position: relative;
    margin: 0;
    padding: 0;

    img {
      width: 100%;
      vertical-align: top;
    }

    figcaption {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      text-align: center;
      /*padding-top: 30%;*/
      /*padding-bottom: 30%;*/
    }

    h1 {
      margin-top: 110px;
      font-size: 48px;
      font-weight: normal;
      line-height: 60px;

      img {
        width: 47px;
        margin-right: 40px;
      }
    }

    .search-input {
      margin-top: 58px;
      width: 610px;
      line-height: 50px;
      font-size: 16px;
    }

    .search-btn {
      width: 166px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background-color: #4185F5;
      color: #fff;
      user-select: none;
      cursor: pointer;
    }

    .tips {
      margin-top: 30px;
      font-size: 14px;
    }
  }

  .page-content {
    background-color: #FAFAFA;
    padding-top: 60px;
    padding-bottom: 50px;
  }

  .page-content__inner {
    width: 1200px;
    margin: 0 auto;
  }

  .tb-pool {
    width: 100%;
    border-spacing: 0;

    th, td {
      font-size: 14px;
      line-height: 60px;
      height: 60px;
      padding: 0 20px;

      &:last-child {
        width: 100px;
      }
    }

    th {
      background-color: #f5f5f7;
      font-size: 14px;
      color: #969699;
      text-align: left;
      font-weight: normal;
    }

    td {
      border-bottom: 1px solid #ededf0;
      color: #303137;
      background-color: #fff;

      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        text-align: center;
        cursor: pointer;
      }
    }

    a {
      font-weight: bold;
      color: #4d87ea;
    }

    .icon-block {
      width: 28px;
      vertical-align: middle;
    }
  }

</style>
