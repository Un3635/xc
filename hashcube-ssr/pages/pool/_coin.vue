<template>
  <div class="page">
    <div class="page-content">
      <div class="page-content__inner">
        <div class="c-header">
          算立方·{{coin.toUpperCase()}}矿池数据
        </div>
        <section class="sec">
          <h3>矿池数据统计</h3>
          <div class="subhead">
            最近24小时算力矿工情况
          </div>
          <div class="chart-wrapper">
            <e-charts :options="poolOptions" v-if="poolOptions"></e-charts>
            <div v-else class="no-datas">暂无数据</div>
          </div>
        </section>
        <section class="sec">
          <h3>算力数据统计</h3>
          <div class="subhead">
            最近24小时算力网络情况
          </div>
          <div class="chart-wrapper">
            <e-charts :options="slOptions" v-if="slOptions"></e-charts>
            <div v-else>暂无数据</div>
          </div>
        </section>
      </div>
    </div>
    <x-features-powershop/>
  </div>
</template>

<script>
  import XFeaturesPowershop from '../../components/x-features-powershop';
  import ECharts from 'vue-echarts';

  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legendScroll');
  import format from 'date-fns/format';
  import PoolAPI from '../../services/pool-api';

  export default {
    name: 'pool-detail',
    head() {
      return {
        title: (this.$route.params.coin || '').toUpperCase() + '矿池数据-算立方', // set a title
        meta: [ // set meta
          {name: 'keywords', content: ''},
          {name: 'description', content: ''}
        ]
      };
    },
    components: {
      ECharts,
      XFeaturesPowershop
    },
    data() {
      return {
        coin: '',
        poolOptions: null,
        difficultyUnit: '',
        networkhashUnit: '',
        pool_hashUnit: '',
        basepoolOptions: {
          grid: {
            left: 60,
            top: 60,
            right: 60,
            bottom: 60
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: ['#DBDBDB'],
                width: 1
              }
            },
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#9f9f9f'],
                width: 0.3
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
                color: '#FF6666',
                type: 'solid'
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              splitNumber: 20,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#DBDBDB',
                  width: 1
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#9f9f9f'],
                  width: 0.3
                }
              },
              axisLabel: {
                align: 'right',
                color: '#969699',
                formatter: '{value}G'
              },
              axisPointer: {
                label: {
                  show: false
                },
                lineStyle: {
                  color: '#FF6666',
                  type: 'solid'
                }
              }
            },
            {
              type: 'value',
              splitNumber: 20,
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#9f9f9f'],
                  width: 0.5,
                  opacity: 0.1
                }
              },
              axisTick: {show: false},
              axisLine: {
                lineStyle: {
                  color: '#DBDBDB',
                  width: 1
                }
              },
              axisLabel: {
                formatter: `{value}`,
                align: 'left',
                margin: 15,
                color: '#969699'
              },
              axisPointer: {
                label: {
                  show: false
                },
                lineStyle: {
                  color: '#FF6666',
                  type: 'solid'
                }
              }
            }
          ],
          series: [
            {
              type: 'line',
              name: '矿池算力',
              data: [],
              smooth: true,
              sampling: 'average',
              itemStyle: {normal: {color: '#1FC4FF'}},
              areaStyle: {
                normal: {
                  color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(16,146,255,0.30)'
                  }, {
                    offset: 1,
                    color: 'rgba(16,146,255,0.00)'
                  }])
                }
              }
            },
            {
              type: 'line',
              name: '矿工数量',
              smooth: true,
              sampling: 'average',
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {color: '#FFA52C'}}
            }
          ],
          tooltip: {
            padding: 0,
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                show: false
              },
              lineStyle: {
                color: '#FF6666',
                type: 'solid'
              }
            }
          }
        },
        slOptions: {}
      };
    },
    methods: {
      getStatusStatistics24() {
        PoolAPI.getShareStatusStatistics24(this.coin)
          .then(res => res.result || [])
          .then(res => {
            if (res) {
              const xAxisLabel = [];
              const yAxisLft = [];
              const yAxisRight = [];
              res.forEach(item => {
                item.sub_time = item.sub_time * 1000;
                item.sub_time = format(+item.sub_time, 'YYYY-MM-DD HH:mm:ss');
                xAxisLabel.push(item.sub_time);
                this.pool_hashUnit = item.pool_hash.substring(item.pool_hash.length - 1);
                item.pool_hash = item.pool_hash.substring(0, item.pool_hash.length - 1);
                yAxisLft.push(item.pool_hash);
                yAxisRight.push(item.pool_worker);
              });
              this.poolOptions = JSON.parse(JSON.stringify(this.basepoolOptions));
              this.poolOptions.xAxis.data = xAxisLabel;
              this.poolOptions.xAxis.axisLabel.formatter = this.axisLabelFormatter;
              this.poolOptions.yAxis[0].axisLabel.formatter = this.poolOptionsFormatter;
              //this.poolOptions.yAxis.axisLabel.formatter = this.yAxisLabelFormatter;
              this.poolOptions.tooltip.formatter = this.tooltipFormatter;
              this.poolOptions.series[0].name = '矿池算力';
              this.poolOptions.series[1].name = '矿工数量';
              this.poolOptions.series[0].data = yAxisLft;
              this.poolOptions.series[1].data = yAxisRight;
              this.poolOptions.legend = {
                top: 0,
                right: 0,
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 50,
                textStyle: {
                  padding: [0, 0, 0, 20]
                },
                data: [{
                  name: '矿池算力',
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
                  }]
              };
              this.poolOptions.grid = {
                right: 40,
                left: 40,
                bottom: 40,
                top: 55
              };
            }
          });
      },
      poolInterval(number, value) {
        let xAxisObj = xAxisFormat(value, this.poolOptions.lastHour, 3);
        if (xAxisObj) {
          this.poolOptions.lastHour = xAxisObj.lastHour;
          return xAxisObj.curHour;
        }
      },
      poolOptionsFormatter(value) {
        return value + this.pool_hashUnit;
      },
      axisLabelFormatter(value, index) {
        return format(value, 'HH:mm');
      },
      //      yAxisLabelFormatter(value){
      //        return value + this.pool_hashUnit;
      //      },
      tooltipFormatter(params) {
        var result = '';
        let name = params[0].name;
        params.forEach(item => {
          if (item.seriesIndex === 0) {
            item.value = item.value + this.pool_hashUnit;
          }
          result += `
            <p style="width: 187px;height:30px;line-height:20px;background:#303137;opacity: 0.7;padding:5px 12px;"class="clearfix">
              <span style="width: 8px;height: 8px;display:inline-block;background-color:${item.color};border-radius:50%;margin-right:15px;vertical-align:middle;"></span>
              <span style="vertical-align:middle;">${item.seriesName}</span>
              <span style="min-width: 80px;text-align:right;vertical-align:middle;display: inline-block;">${item.value}</span>
            </p>
          `;
        });
        return result + `<p style="background-color: #6C6C71;width: 100%;height: 30px;line-height: 30px;padding-right: 12px;" class="clearfix"><span class="right">${name}</span></p>`;
      },
      getShareStatusStatistics24() {
        PoolAPI.getShareStatusStatistics24(this.coin)
          .then(res => res.result || {})
          .then(res => {
            if (res) {
              let aXisLabel = [];
              let yAxisLft = [];
              let yAxisRight = [];
              res.forEach(item => {
                item.sub_time = item.sub_time * 1000;
                item.sub_time = format(+item.sub_time, 'YYYY-MM-DD HH:mm');
                this.difficultyUnit = item.difficulty.substring(item.difficulty.length - 1);
                item.difficulty = item.difficulty.substring(0, item.difficulty.length - 1);
                this.networkhashUnit = item.networkhash.substring(item.difficulty.length - 1);
                item.networkhash = item.networkhash.substring(0, item.difficulty.length - 1);
                aXisLabel.push(item.sub_time);
                yAxisLft.push(item.networkhash);
                yAxisRight.push(item.difficulty);
              });
              this.slOptions = JSON.parse(JSON.stringify(this.basepoolOptions));
              this.slOptions.tooltip.formatter = this.selOptionFormatter;
              this.slOptions.xAxis.axisLabel.formatter = this.axisLabelFormatter;
              this.slOptions.xAxis.data = aXisLabel;
              this.slOptions.yAxis[0].axisLabel.formatter = this.selOptionsAxisFormatter;
              this.slOptions.yAxis[1].axisLabel.formatter = this.selOptionsAxisFormatterRight;
              this.slOptions.legend = {
                top: 0,
                right: 0,
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 50,
                textStyle: {
                  padding: [0, 0, 0, 20]
                },
                data: [{
                  name: '全网算力',
                  textStyle: {
                    color: '#303137'
                  },
                  icon: 'circle'
                },
                  {
                    name: '网络难度',
                    textStyle: {
                      color: '#303137'
                    },
                    icon: 'circle'
                  }]
              };
              this.slOptions.series[0].name = '全网算力';
              this.slOptions.series[1].name = '网络难度';
              this.slOptions.series[0].data = yAxisLft;
              this.slOptions.series[1].data = yAxisRight;
              this.slOptions.grid = {
                right: 50,
                left: 50,
                bottom: 40,
                top: 55
              };
            }
          });
      },
      selOptionsAxisFormatter(value) {
        return value + this.networkhashUnit;
      },
      selOptionsAxisFormatterRight(value) {
        return value + this.difficultyUnit;
      },
      selOptionFormatter(params) {
        var result = '';
        let name = params[0].name;
        params.forEach(item => {
          if (item.seriesIndex === 0) {
            item.value = item.value + this.networkhashUnit;
          } else if (item.seriesIndex === 1) {
            item.value = item.value + this.difficultyUnit;
          }
          result += `
            <p style="width: 187px;height:30px;line-height:20px;background:#303137;opacity: 0.7;padding:5px 12px;"class="clearfix">
              <span style="width: 8px;height: 8px;display:inline-block;background-color:${item.color};border-radius:50%;margin-right:15px;vertical-align:middle;"></span>
              <span style="vertical-align:middle;">${item.seriesName}</span>
              <span style="min-width: 80px;text-align:right;vertical-align:middle;display: inline-block;">${item.value}</span>
            </p>
          `;
        });
        return result + `<p style="background-color: #6C6C71;width: 100%;height: 30px;line-height: 30px;padding-right: 12px;" class="clearfix"><span class="right">${name}</span></p>`;
      }
    },
    mounted() {
      this.coin = this.$route.params.coin;
      this.getStatusStatistics24();
      this.getShareStatusStatistics24();
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
  }

  .sec {
    padding: 40px;
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0 0 5px 0 #ccc;
    transition: all 0.5s;

    h3 {
      margin-bottom: 10px;
    }
  }

  .subhead {
    position: absolute;
    font-size: 14px;
    color: #969699;
  }

  .legend-label {
    display: inline-block;
    margin-left: 3em;
    color: #303137;

    &:before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: .5em;
    }

    &.light-blue-icon:before {
      background-color: #1fc4ff;
    }
    &.yellow-icon:before {
      background-color: #FFA52C;
    }
    &.green-icon:before {
      background-color: #00E47C;
    }
  }

  .chart-wrapper {
    height: 565px;
    .no-datas {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .echarts {
    width: 100%;
    height: 565px;
  }
</style>
