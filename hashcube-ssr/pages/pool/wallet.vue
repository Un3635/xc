<template>
  <div class="page">
    <div class="page-content">
      <div class="wallet-detail">
        <h2>ETH钱包地址</h2>
        <p class="address-code">{{walletInfor.wallet}}</p>
        <div class="walletList clearfix">
          <div>
            <p>当前算力(10MIN)</p>
            <p class="norColor">{{walletTable.cur_10_min_hashrate}}</p>
          </div>
          <div>
            <p>平均算力(24h)</p>
            <p class="commonColor">{{walletTable.cur_24_hour_hashrate}}</p>
          </div>
          <div>
            <p>历史收入(eth)</p>
            <p class="commonColor">{{walletInfor.all_balance/100000000 | currency}}</p>
          </div>
          <div>
            <p>余额(eth)</p>
            <p class="commonColor">{{walletInfor.balance/100000000 | currency}}</p>
          </div>
          <div>
            <p>打款总额(eth)</p>
            <p class="norColor">{{walletInfor.pay_balance/100000000 | currency}}</p>
          </div>
          <div>
            <p>在线矿机数量</p>
            <p class="greenColor">{{walletTable.online_worker}}/{{walletTable.sum_worker}}</p>
          </div>
        </div>
      </div>
      <div class="wrapper-echart">
        <h3>算力与矿工统计</h3>
        <e-charts :options="poolOptions" v-if="poolOptions"></e-charts>
      </div>
      <div class="wallet-record">
        <div class="record-tabs">
          <el-tabs v-model="activeIndex">
            <el-tab-pane label="算力记录" name="first"></el-tab-pane>
            <el-tab-pane label="转账记录" name="second"></el-tab-pane>
          </el-tabs>
          <el-table v-if="activeIndex==='first'" v-loading="forceLoading" :data="workerList" class="forceTable">
            <el-table-column label="矿工名" width="300px" prop="worker"></el-table-column>
            <el-table-column label="当前算力(10min)" width="300px" prop="cur_hashrate"></el-table-column>
            <el-table-column label="平均算力(24h)" width="300px" prop="avg_hashrate"></el-table-column>
            <el-table-column label="最后交易时间" prop="last_seen">
              <template slot-scope="{row}">
                {{row.last_seen*1000|date('YYYY-MM-DD hh:mm:ss')}}
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="activeIndex==='second'" v-loading="transferLoading" :data="transferTableList"
                    class="forceTable">
            <el-table-column label="转账时间" width="300" prop="pay_time"></el-table-column>
            <el-table-column label="数量" width="200" prop="balance"></el-table-column>
            <el-table-column label="交易地址" prop="txid"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <x-features-powershop/>
  </div>
</template>

<script>
  import XFeaturesPowershop from '../../components/x-features-powershop';
  import ECharts from 'vue-echarts/components/ECharts';
  import PoolAPI from '../../services/pool-api';
  import format from 'date-fns/format';
  import {getHashFormatter} from '../../utils';

  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legendScroll');


  export default {
    name: 'wallet-address',
    head: {
      title: '豹池 - 比特币矿池、莱特币、以太坊矿池-算立方', // set a title
      meta: [ // set meta
        {name: 'keywords', content: ''},
        {name: 'description', content: ''}
      ]
    },
    components: {XFeaturesPowershop, ECharts},
    data() {
      return {
        coin: '',
        walletAddress: '',
        walletInfor: '',
        online_status: 'ALL',    //'ALL','ONLINE_STATUS','OFFLINE_STATUS'分别对应所有、在线、掉线
        skip: '1',
        workerList: [],
        avg_hashrateList: [],
        walletTable: {
          online_worker: '',
          sum_worker: '',
          cur_24_hour_hashrate: '',
          cur_10_min_hashrate: '',
          offline_worker: ''
        },
        poolOptions: null,
        basepoolOptions: {
          legend: {
            top: 0,
            right: 30,
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 50,
            data: [
              {
                name: '当前算力',
                textStyle: {
                  color: '#303137'
                },
                icon: 'circle'
              },
              {
                name: '平均算力',
                textStyle: {
                  color: '#303137'
                },
                icon: 'circle'
              },
              {
                name: '矿工数量',
                textStyle: {
                  color: '#303137'
                },
                icon: 'circle'
              }
            ]
          },
          grid: {
            left: 64,
            top: 60,
            right: 46,
            bottom: 25
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#9F9F9F',
                width: 1
              }
            },
            boundaryGap: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#9F9F9F'],
                width: 0.5
              }
            },
            axisTick: {show: false},
            axisLabel: {
              color: '#969699',
              margin: 9,
              align: 'left'
            },
            data: [],
            axisPointer: {
              label: {
                show: false
              },
              lineStyle: {
                color: '#FF6161'
              }
            }

          },
          yAxis: [
            {
              type: 'value',
              scale: true,
              splitNumber: 20,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#FCFCFC'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#9F9F9F',
                  width: 1
                }
              },
              axisLabel: {
                margin: 14
              }
            },
            {
              type: 'value',
              scale: true,
              splitNumber: 20,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#9F9F9F',
                  width: 1
                }
              },
              axisLabel: {
                margin: 14
              }
            }
          ],
          series: [
            {
              type: 'line',
              name: '当前算力',
              data: [],
              smooth: true,
              sampling: 'average',
              symbol: 'circle',
              yAxisIndex: 0,
              itemStyle: {normal: {color: '#3DC28C'}},
              areaStyle: {
                normal: {
                  color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(239,250,246,0.30)'
                  }, {
                    offset: 1,
                    color: 'rgba(242,251,247,0.00)'
                  }])
                }
              }
            },
            {
              type: 'line',
              name: '平均算力',
              symbol: 'circle',
              smooth: true,
              sampling: 'average',
              data: [],
              areaStyle: {
                normal: {
                  color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(31,196,255,0.30)'
                  }, {
                    offset: 1,
                    color: 'rgba(31,196,255,0.00)'
                  }])
                }
              },
              itemStyle: {normal: {color: '#1FC4FF'}}
            },
            {
              type: 'line',
              name: '矿工数量',
              symbol: 'circle',
              smooth: true,
              sampling: 'average',
              itemStyle: {normal: {color: '#FFA52C'}},
              yAxisIndex: 1,
              interval: 1
            }
          ],
          tooltip: {
            padding: 0,
            trigger: 'axis',
            backgroundColor: 'rgba(48,49,55,0.7)',
            axisPointer: {
              type: 'cross',
              label: {
                show: false
              },
              crossStyle: {
                color: '#FF6161',
                type: 'solid'
              }
            }
          }
        },
        activeIndex: 'first',
        transferLoading: false,
        forceLoading: false,
        transferTableList: [],
        formatter: (val) => val
      };
    },
    watch: {
      activeIndex: function (value) {
        if (value === 'first') {
          this.getCurrentWorker();
        } else {
          this.getPersonTransfer();
        }
      }
    },
    mounted() {
      this.walletAddress = this.$route.query.address;
      this.coin = this.$route.query.coin;
      this.getMinerInfo();
      this.getCurrentWorker();
      this.getMinerDot24Hour();
    },
    methods: {
      getMinerInfo() {
        PoolAPI.getMinerInfo(this.coin, this.walletAddress)
          .then(res => res.result || [])
          .then(res => {
            this.walletInfor = res[0].account;
          });
      },
      getCurrentWorker() {
        PoolAPI.getCurrentWorker(this.coin, this.walletAddress, this.online_status, this.skip)
          .then(res => res.result)
          .then(res => {
            this.walletTable = {
              online_worker: res[0].online_worker,
              sum_worker: res[0].sum_worker,
              cur_24_hour_hashrate: res[0].cur_24_hour_hashrate,
              cur_10_min_hashrate: res[0].cur_10_min_hashrate,
              offline_worker: res[0].cur_10_min_hashrate
            };
            this.workerList = res[0].worker;
          });
      },
      poolOptionsFormatter(params) {
        var result = '';
        let name = params[0].name;
        params.forEach(item => {
          let value;
          if (item.seriesName !== '矿工数量') {
            value = this.formatter(item.value);
          } else {
            value = item.value;
          }
          result += `
            <p style="width: 187px;height:30px;line-height:20px;background:#303137;opacity: 0.7;padding:5px 12px;" class="clearfix">
              <span style="width: 8px;height: 8px;display:inline-block;background-color:${item.color};border-radius:50%;margin-right:15px;vertical-align:middle;"></span>
              <span style="vertical-align:middle;">${item.seriesName}</span>
              <span style="min-width: 80px;text-align:right;vertical-align:middle;display: inline-block;">${value}</span>
            </p>
          `;
        });
        return result + `<p style="background-color: #6C6C71;width: 100%;height: 30px;line-height: 30px;padding-right: 12px;" class="clearfix"><span class="right">${name}</span></p>`;
      },
      getMinerDot24Hour() {
        PoolAPI.getMinerDot24Hour(this.coin, this.walletAddress)
          .then(res => res.result[0] || {})
          .then(res => res.dot_24)
          .then(res => {
            let axisLabelList = [];
            let avg_hashrateList = [];
            let cur_hashrateList = [];
            let workerList = [];
            let yAxisMin;
            res.forEach(item => {
              item.sub_time = item.sub_time * 1000;
              axisLabelList.push(format(item.sub_time, 'YYYY-MM-DD HH:mm'));
              avg_hashrateList.push(item.avg_hashrate);
              cur_hashrateList.push(item.sum_hashrate);
              workerList.push(item.workers);
              if (!yAxisMin) {
                yAxisMin = item.sum_hashrate;
              } else {
                yAxisMin = item.sum_hashrate < yAxisMin ? item.sum_hashrate : yAxisMin;
              }
            });
            yAxisMin = yAxisMin || 1;
            const formatter = getHashFormatter(yAxisMin);
            this.formatter = formatter;
            this.poolOptions = JSON.parse(JSON.stringify(this.basepoolOptions));
            this.poolOptions.grid = {
              left: 70,
              right: 50,
              bottom: 30,
              top: 60
            };
            this.poolOptions.series[0].data = cur_hashrateList;
            this.poolOptions.series[1].data = avg_hashrateList;
            this.poolOptions.series[2].data = workerList;
            this.poolOptions.xAxis.data = axisLabelList;
            this.poolOptions.xAxis.axisLabel.formatter = this.xAxisFormatter;
            this.poolOptions.yAxis[0].axisLabel.formatter = formatter;
            this.poolOptions.tooltip.formatter = this.poolOptionsFormatter;
          });
      },
      xAxisFormatter(value) {
        return format(value, 'HH:mm');
      },
      getPersonTransfer() {
        PoolAPI.getPersonTransfer(this.coin, this.walletAddress)
          .then(res => res.result)
          .then(res => {
            this.transferTableList = res;
            this.transferTableList.forEach(item => {
              item.pay_time = format(+item.pay_time, 'YYYY-MM-DD HH:mm');
              item.balance = item.balance / 100000000;
            });
          });
      }
    }
  };
</script>

<style scoped lang="scss">
  /*@import "../../assets/style/variables";*/
  /*@import "../../assets/style/custom-element-ui";*/

  .page {
    background-color: #fafafa;
    padding-top: 10px;
  }

  .page-content {
    width: 1200px;
    margin: 0 auto;
  }

  .wallet-detail {
    background: #fff;
    padding: 46px 36px 40px 40px;
    margin-bottom: 10px;
    h2 {
      color: #303137;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .address-code {
      font-size: 22px;
      color: #4185F5;
      padding-bottom: 30px;
      border-bottom: 1px solid #EDEEF0;
    }
  }

  .walletList {
    margin-top: 40px;
  }

  .walletList > div {
    float: left;
    padding: 0 50px 0 40px;
    text-align: center;
    border-right: 1px solid #EDEEF0;
    &:first-child {
      padding-left: 0;
      text-align: left;
    }
    &:last-child {
      border-right: none;
    }
    p:first-child {
      font-size: 14px;
      color: #969699;
    }
    p:last-child {
      font-size: 24px;
      font-weight: 600;
      margin-top: 9px;
    }
  }

  .norColor {
    color: #FD7220;
  }

  .greenColor {
    color: #3DC28C;
  }

  .commonColor {
    color: #606166;
  }

  .wrapper-echart {
    padding: 40px;
    background: #fff;
    height: 650px;
  }

  .wallet-record {
    background: #fff;
    margin: 10px 0 12px;
    padding: 33px 35px 41px 40px;
  }

  .echarts {
    width: 100%;
    height: 565px;
  }

  .forceTable {
    width: 100%;
  }
</style>
