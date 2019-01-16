<template>
  <div class="page">
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <div class="msg" v-if="notice">
      <div class="inner">
        <p class="msg-content">
          <span><i class="iconfont icon-warning"></i>网站通知：{{notice.title}}</span>
          <el-button type="text" class="right" @click="isNoticeDialogVisible=true">查看详情</el-button>
        </p>
      </div>
    </div>

    <div class="hash" v-if="recommendHashGoodsList.length>0">
      <div class="inner">
        <div class="hash-swiper" v-swiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide hash-swiper-slide" style="width: 370px;"
                 v-for="(hashGoodsItem,idx) in recommendHashGoodsList" :key="idx">
              <div class="hash-item">
                <div class="hash-item-img-wrap">
                  <img class="hash-item-img" :src="hashGoodsItem.icon" alt="">
                </div>
                <h3 class="headline"><span class="underscore">{{hashGoodsItem.currencyName}}算力</span></h3>
                <p class="subhead">{{hashGoodsItem.gName}}</p>
                <h2 class="price">
                  {{hashGoodsItem.status===2?'':'￥'}}{{hashGoodsItem.price}}
                  <span v-if="hashGoodsItem.status!==2">/{{hashGoodsItem.computingUnit}}</span>
                </h2>
                <p>剩余算力: {{hashGoodsItem.surplusCube}}{{hashGoodsItem.computingUnit}}</p>
                <p>交割时间:
                  <span v-if="hashGoodsItem.deliveryTimeType===0">次日交割</span>
                  <span v-else>{{hashGoodsItem.deliveryTime|date('YYYY-MM-DD')}}</span>
                </p>
                <el-button type="secondary" @click="$router.push('/hash/detail?goodsId='+hashGoodsItem.goodsId)">
                  {{hashGoodsItem.status!==1?'去查看':'去选购'}}
                </el-button>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </div>
      </div>
    </div>

    <div class="service">
      <div class="inner">
        <h2 class="headline">全球TOP云算力服务平台</h2>
        <p class="subhead">一站式挖矿服务</p>
        <el-row :gutter="30" class="items">
          <el-col :span="6">
            <div class="s-item">
              <div class="s-item-img-wrap">
                <img class="s-item-img" src="../assets/images/service-icon-hash.png" alt="">
              </div>
              <h3 class="s-item-headline"><span class="underscore h5">云算力</span></h3>
              <p class="s-item-subhead">把矿场装进口袋，低门槛、高收益，即买即挖，无需等待</p>
              <el-button type="secondary" size="mini" @click="$router.push('/hash')">去选购</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="s-item">
              <div class="s-item-img-wrap">
                <img class="s-item-img" src="../assets/images/service-icon-transfer.png" alt="">
              </div>
              <h3 class="s-item-headline"><span class="underscore h5">算力交易</span></h3>
              <p class="s-item-subhead">算力自由交易，24H委托挂单。云算力交易，即将上线</p>
              <el-button class="is-disabled" type="secondary" size="mini">去交易</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="s-item">
              <div class="s-item-img-wrap">
                <img class="s-item-img" src="../assets/images/service-icon-miner.png" alt="">
              </div>
              <h3 class="s-item-headline"><span class="underscore h5">矿机购买</span></h3>
              <p class="s-item-subhead">热门机型，优选矿机低能耗、高收益，全方位专业售后</p>
              <el-button type="secondary" size="mini" @click="$router.push('/product')">去购买</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="s-item">
              <div class="s-item-img-wrap">
                <img class="s-item-img" src="../assets/images/service-icon-trust.png" alt="">
              </div>
              <h3 class="s-item-headline"><span class="underscore h5">托管服务</span></h3>
              <p class="s-item-subhead">自选矿机，专业运维，费用低廉，收益透明，一站式轻松挖矿</p>
              <el-button type="secondary" size="mini" @click="$router.push('/hosting')">去托管</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="cloud">
      <div class="inner">
        <h2 class="c-headline"><span class="underscore h13">算立方·云算力</span></h2>
        <p class="c-subhead">
          <span>买币不如买算力</span>
          <span>轻松方便躺着赚</span>
          <span>不定期活动买就送</span>
        </p>
        <el-row :gutter="50">
          <el-col :span="4" :offset="idx===0?2:0" v-for="(item,idx) in currencyList" :key="item.currencyId">
            <div class="hash-coins" @click="$router.push('/hash/'+item.currencyName)">
              <div class="h-c-img-wrap">
                <img :src="item.icon" alt="">
              </div>
              <h3 class="h-c-headline">{{item.currencyName}}算力</h3>
              <p class="h-c-subhead">{{item.presentation}}</p>
            </div>
          </el-col>
        </el-row>
        <el-button size="large" type="secondary" @click="$router.push('/hash')">选购云算力</el-button>
      </div>
    </div>

    <div class="pool">
      <div class="inner">
        <el-row class="summary">
          <el-col :span="6">
            <h2>{{deleteLast(poolInfo.networkhash)||'暂无'}}</h2>
            <p>全网算力{{last(poolInfo.networkhash)?`(${last(poolInfo.networkhash)})`:''}}</p>
          </el-col>
          <el-col :span="6">
            <h2>{{deleteLast(poolInfo.poolhash)||'暂无'}}</h2>
            <p>矿池算力{{last(poolInfo.poolhash)?`(${last(poolInfo.poolhash)})`:''}}</p>
          </el-col>
          <el-col :span="6">
            <h2>{{poolInfo.pool_worker||'暂无'}}</h2>
            <p>矿工数量(人)</p>
          </el-col>
          <el-col :span="6">
            <h2>{{last_24_total||'暂无'}}</h2>
            <p>24小时爆块数量</p>
          </el-col>
        </el-row>
        <div class="chart-wrapper">
          <e-charts :options="poolOptions"></e-charts>
        </div>
        <div class="currency-list">
          <div class="prev" @click="prev()">
            <i class="el-icon-arrow-left"></i>
          </div>
          <ul>
            <li class="item" :class="{'active':poolItem.coin===selected}" v-for="poolItem in poolList"
                :key="poolItem.coin" @click="selected=poolItem.coin">
              {{(poolItem.coin||'').toUpperCase()}}
            </li>
          </ul>
          <div class="next" @click="next()"><i class="el-icon-arrow-right"></i></div>
        </div>
        <el-button type="secondary" size="large" @click="$router.push('/pool')">查看矿池服务</el-button>
      </div>
    </div>

    <div class="transfer" v-if="false">
      <div class="inner">
        <el-row :gutter="110">
          <el-col :span="10">
            <h2 class="t-headline"><span class="underscore h13">算力交易</span></h2>
            <p class="t-desc">
              在通过“挖矿”得到比特币的过程中，我们需要找到其相应的解m，而对于任何一个六十四位的哈希值，要找到其解m，都没有固定算法，只能靠计算机随机的hash碰撞，而一个挖矿机每秒钟能做多少次hash碰撞，就是其“算力”的代表，单位写成hash/s,这就是所谓工作量证明机制POW(Proof
              Of Work)。
            </p>
            <el-button type="secondary" size="large" @click="$router.push('/exchange')">去交易所</el-button>
          </el-col>
          <el-col :span="14">
            <ul class="c-media-list">
              <li class="c-media-list__item">
                <div class="c-block-media">
                  <div class="c-block-media__media">
                    <img class="c-block-media__img" src="../assets/images/transfer_icon_ziyoudingjia.png" alt="">
                  </div>
                  <div class="c-block-media__body">
                    <h2 class="c-block-media__headline">自由定价</h2>
                    <p class="c-block-media__excerpt">价格上下不设限，想怎么改怎么改</p>
                  </div>
                </div>
              </li>
              <li class="c-media-list__item">
                <div class="c-block-media">
                  <div class="c-block-media__media">
                    <img class="c-block-media__img" src="../assets/images/transfer_icon_7_24.png" alt="">
                  </div>
                  <div class="c-block-media__body">
                    <h2 class="c-block-media__headline">7 x 24小时交易不间断</h2>
                    <p class="c-block-media__excerpt">海纳百川，精选全球的高品质软件与服务</p>
                  </div>
                </div>
              </li>
              <li class="c-media-list__item">
                <div class="c-block-media">
                  <div class="c-block-media__media">
                    <img class="c-block-media__img" src="../assets/images/transfer_icon_jiaoyi.png" alt="">
                  </div>
                  <div class="c-block-media__body">
                    <h2 class="c-block-media__headline">交易量门槛低</h2>
                    <p class="c-block-media__excerpt">0.01点位算力起售，门槛低，好入门</p>
                  </div>
                </div>
              </li>
              <li class="c-media-list__item">
                <div class="c-block-media">
                  <div class="c-block-media__media">
                    <img class="c-block-media__img" src="../assets/images/transfer_icon_xianshimianfei.png" alt="">
                  </div>
                  <div class="c-block-media__body">
                    <h2 class="c-block-media__headline">限时免费</h2>
                    <p class="c-block-media__excerpt">0手续费交易，没有xx么有。</p>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="miner">
      <div class="inner">
        <h2 class="m-headline"><span class="underscore h13">多种矿机   一站式托管</span></h2>
        <p class="m-subhead">专家级矿场托管，7 × 24 支持与维护，挖矿更简单</p>
        <el-row :gutter="105">
          <el-col :span="8" v-for="recommendGoods in recommendGoodsList" :key="recommendGoods.goodsId">
            <div class="m-card" @click="$router.push('/product/detail?pId='+recommendGoods.goodsId)">
              <div class="m-card__media">
                <img class="m-card__img" :src="recommendGoods.icon" alt="">
              </div>
              <div class="m-card__body">
                <h3 class="m-card__headline">{{recommendGoods.goodsName}}</h3>
                <p class="m-card__meta">
                  <span>额定算力：{{recommendGoods.computing}}{{recommendGoods.computingUnit}}</span>
                  <span class="right">额定功率：{{recommendGoods.power}}W</span>
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-button type="secondary" size="large" @click="$router.push('/product')">查看全部矿机</el-button>
      </div>
    </div>

    <div class="video" v-if="videoSrc">
      <div class="inner">
        <div class="video-wrapper" v-loading="isPlaying&&!isPlayerLoaded">
          <div class="play-btn" v-if="!isPlaying" @click="initVideoPlayer()">
            <img src="../assets/images/Play@2x.png" alt="">
          </div>
          <div class="video-player" v-if="isPlaying" id="youkuplayer" style="width:100%;height: 700px;"></div>
        </div>
      </div>
    </div>

    <x-features-powershop/>

    <div class="footer">
      <el-row class="footer__inner">
        <el-col :span="7">
          <img class="footer-logo" src="../assets/images/footer-logo.png" alt="">
          <p><a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备18000657号-2</a> Copyright © 算立方 版权所有</p>
          <p>上海挖链科技有限公司</p>
          <p>地址：上海市徐汇区云锦路500号绿地汇中心B座12楼</p>
        </el-col>
        <el-col :span="3">
          <h5>挖链产品与服务</h5>
          <p><a class="link" href="/">算立方</a></p>
          <p><a class="link" href="https://walian.cn" target="_blank">挖链网</a></p>
          <p><a class="link" href="http://tir.top" target="_blank">币通指数</a></p>
        </el-col>
        <el-col :span="3">
          <h5>关于算立方</h5>
          <p><a class="link" href="/about-us">算立方简介</a></p>
          <p>商务合作</p>
          <p>bd@walian.cn</p>
        </el-col>
        <el-col :span="4" class="text-center">
          <h5>客服热线</h5>
          <p class="footer-service">400-865-6688</p>
          <p>周一至周五 09:00~18:00</p>
          <p>（仅收市话费）</p>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-row class="text-center">
            <el-col :span="12" v-for="(item,index) in qrCodeList" :key="index">
              <h5>{{item.qrCodeName}}</h5>
              <img class="download-img" :src="item.qrCodeImg" alt="">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <p class="friend-link" v-if="friendsLinks.length>0">友情链接：
        <a class="link" :href="item.linkUrl" v-for="item in friendsLinks" :key="item.linkName" target="_blank">{{item.linkName}}</a>
      </p>
    </div>

    <el-dialog width="420px" :title="(notice||{}).title" custom-class="custom"
               :visible.sync="isNoticeDialogVisible" center>
      <div v-if="notice">{{notice.content}}</div>
    </el-dialog>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts';
  import XFeaturesPowershop from '../components/x-features-powershop';
  import HomeAPI from '../services/home-api';
  import PoolAPI from '../services/pool-api';
  import format from 'date-fns/format';
  import PowerAPI from '../services/power-api';
  import XBanner from '../components/x-banner';
  import {deleteLast, last} from '../utils';
  import CommonAPI from '../services/common-api';

  export default {
    name: 'index',
    metaInfo: {
      title: '算立方-专业的云算力交易、矿机托管、算力租赁平台', // set a title
      meta: [
        {                 // set meta
          name: 'keywords',
          content: '算立方,矿机,云算力,算力,矿池,算力交易出租平台,雪豹矿机官网,矿机销售,矿机托管,挖矿矿场'
        },
        {
          name: 'description',
          content: '算立方是全球先进的云算力租赁服务平台。“工业级矿机”雪豹矿机官方销售网站。算立方提供矿机购买、矿机托管、算力租赁及交易等全方位服务，为矿圈人士打造高效灵活、收益强劲、品质可靠的托管平台，让挖矿更简单、让托管更省心！'
        }
      ]
    },
    components: {XBanner, XFeaturesPowershop, ECharts},
    computed: {
      poolInfo() {
        const selected = this.selected;
        return this.poolList.find(item => item.coin === selected) || {};
      }
    },
    asyncData() {
      let data = {
        qrCodeList: [],
        friendsLinks: []
      };
      let p1 = CommonAPI.qrCodeList()
        .then(res => res.result)
        .then(res => {
          data.qrCodeList = res;
        })
        .catch(() => {
        });
      let p2 = CommonAPI.friendsLinks()
        .then(res => res.result)
        .then(res => {
          data.friendsLinks = res;
        })
        .catch(() => {
        });
      return Promise.all([p1, p2])
        .then(() => data);
    },
    data() {
      return {
        bannerList: [],
        notice: null,
        isNoticeDialogVisible: false,
        recommendGoodsList: [],
        recommendHashGoodsList: [],
        poolList: [],
        currencyList: [],
        selected: '',
        swiperOption: {
          initialSlide: 1,
          centeredSlides: true,
          slidesPerView: 'auto',
          spaceBetween: 30,
          autoplay: 3000,
          loop: true,
          autoplayDisableOnInteraction: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
          // prevEL: '.swiper-button-prev',
          // nextEl: '.swiper-button-next'
        },
        poolOptions: {
          grid: {
            right: 40,
            left: 50,
            bottom: 40,
            top: 55
          },
          tooltip: {
            padding: 0,
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                show: false
              },
              lineStyle: {
                color: '#969699',
                type: 'dashed'
              }
            }

          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: ['#dbdbdb'],
                width: 3
              }
            },
            boundaryGap: 3,
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
              align: 'left',
              formatter: (value) => format(value, 'HH:mm')
            },
            data: []
          },
          yAxis: [
            {
              type: 'value',
              name: '算力',
              nameTextStyle: {
                align: 'left'
              },
              splitNumber: 5,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#DBDBDB',
                  width: 3
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
                color: '#969699'
              }
            }
          ],
          series: [
            {
              type: 'bar',
              name: '矿池算力',
              data: [],
              smooth: true,
              sampling: 'average',
              itemStyle: {normal: {color: 'rgba(255,255,255,0.2)'}},
              barCategoryGap: 0 // 柱状图间距
            }
          ]
        },
        pool_hashUnit: '',
        isPlayerLoaded: false,
        videoSrc: '',
        isPlaying: false,
        last_24_total: 0
      };
    },
    methods: {
      last,
      deleteLast,
      initPage() {
        HomeAPI.bannerList(1)
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.bannerList = res;
          });
        HomeAPI.notice()
          .then(res => {
            if (res) {
              this.notice = res;
            }
          });

        HomeAPI.getRecommendGoodsList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.recommendGoodsList = res;
          });

        HomeAPI.getRecommendHashGoodsList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.recommendHashGoodsList = res;
          });

        HomeAPI.getVideo()
          .then(res => res || {})
          .then(res => {
            this.videoSrc = res.url;
          });

        PoolAPI.getShareAllPoolStatus()
          .then(res => res.result || [])
          .then(res => {
            res.reverse();
            this.poolList = res;
            this.selected = (res[0] || {}).coin;
          });

        PowerAPI.currencyTypeList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.currencyList = res.slice(0, 5);
          });
      },
      poolOptionsFormatter(params) {
        let name = params[0].name;
        let unit = this.pool_hashUnit;
        let htmlArr = [
          '<div class="e-chart__tooltip">'
        ];
        params.forEach(item => {
          let html = `<p class="e-chart__tooltip--item">
                            <i class="icon-point"></i>
                            <span class="meta-key">${item.seriesName}</span>
                            <span class="meta-value">${item.value + unit}</span>
                          </p>
                          `;
          htmlArr.push(html);
        });
        htmlArr.push(`<p class="e-chart__tooltip--item text-right">${name}</p>`);
        htmlArr.push('</div>');
        return htmlArr.join('');
      },
      yAxisLeftFormatter(value) {
        let unit = this.pool_hashUnit;
        return value + unit;
      },
      getStatusStatistics24() {
        PoolAPI.getBlockInfo(this.selected)
          .then(res => res.last_24_total || 0)
          .then(res => {
            this.last_24_total = res;
          })
          .catch(() => {
          });
        PoolAPI.getShareStatusStatistics24(this.selected)
          .then(res => res.result || [])
          .then(res => {
            const xAxisLabel = [];
            const yAxisLft = [];
            res.forEach(item => {
              item.sub_time = format(item.sub_time * 1000, 'YYYY-MM-DD HH:mm:ss');
              xAxisLabel.push(item.sub_time);
              this.pool_hashUnit = item.pool_hash.substr(item.pool_hash.length - 1);
              item.pool_hash = item.pool_hash.substring(0, item.pool_hash.length - 1);
              yAxisLft.push(item.pool_hash);
            });
            this.poolOptions.xAxis.data = xAxisLabel;
            this.poolOptions.series[0].name = '算力';
            this.poolOptions.series[0].data = yAxisLft;
            this.poolOptions.yAxis[0].axisLabel.formatter = this.yAxisLeftFormatter;
            this.poolOptions.tooltip.formatter = this.poolOptionsFormatter;
          });
      },
      prev() {
        let index = this.poolList.findIndex(item => item.coin === this.selected);
        if (index < 0) {
          return;
        }
        index = index > 0 ? index - 1 : this.poolList.length - 1;
        this.selected = this.poolList[index].coin;
      },
      next() {
        let index = this.poolList.findIndex(item => item.coin === this.selected);
        if (index < 0) {
          return;
        }
        index = index < this.poolList.length - 1 ? index + 1 : 0;
        this.selected = this.poolList[index].coin;
      },
      loadYoukuPlayer() {
        const youkuPlayerUrl = '//player.youku.com/jsapi';
        return new Promise((resolve, reject) => {
          const isLoaded =
            document.querySelectorAll(`script[src="${youkuPlayerUrl}"]`).length >
            0;
          if (isLoaded && window.YKU) {
            return resolve(window.YKU);
          }
          let script = document.createElement('script');
          script.src = youkuPlayerUrl;
          document.body.appendChild(script);
          script.onload = () => {
            const timer = setInterval(() => {
              if (window.YKU) {
                clearInterval(timer);
                resolve(window.YKU);
              }
            }, 100);
          };
          script.onerror = () => reject({msg: 'Failed to load youku player'});
        });
      },
      initVideoPlayer() {
        this.isPlaying = true;
        let vid = this.videoSrc;
        if (vid) {
          this.loadYoukuPlayer().then(res => {
            this.isPlayerLoaded = true;
            new YKU.Player('youkuplayer', {
              styleid: '0',
              client_id: '528fa931b3275f72',
              vid: vid,
              newPlayer: true,
              autoplay: true
            });
          });
        }
      }
    },
    mounted() {
      this.initPage();
    },
    watch: {
      selected(val) {
        if (val) {
          this.getStatusStatistics24();
        }
      }
    }
  };
</script>

<style scoped lang="scss">

  .page {
    overflow: hidden;
  }

  .inner {
    width: 1200px;
    margin: 0 auto;
  }

  .underscore {
    position: relative;
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 11px;
      background: #EFE3BB;
      z-index: -1;
      border-radius: 2px;
    }

    &.h5:after {
      height: 5px;
    }

    &.h13:after {
      height: 13px;
    }

  }

  .msg {
    background-color: #f2f2f2;

    .inner {
      height: 70px;
    }

    .swiper-container {
      height: 70px;
    }

    .msg-content {
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      color: #303137;
    }

    button {
      margin-top: 15px;
      text-align: right;
    }

    .icon-warning {
      font-size: 18px;
      margin-right: .3em;
      vertical-align: -1px;
    }
  }

  .hash {
    padding-top: 80px;
    padding-bottom: 120px;
    background-image: url(../assets/images/home/0101.jpg);

    .hash-swiper {
      &:hover, &:focus {
        .swiper-button-prev,
        .swiper-button-next {
          display: inline-block;
        }
      }
    }

    .hash-swiper-slide {
      width: 370px;
    }

    .swiper-button-prev {
      margin-left: 5px;
    }

    .swiper-button-next {
      margin-right: 5px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 40px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      /*color: #fff;*/
      /*border-radius: 60px;*/
      text-align: center;
      opacity: 1;
      z-index: 2;
      background-color: rgba(0, 0, 0, .1);
      background-size: 30% 30%;
      display: none;

      /*<!--&:before {-->*/
      /*<!--!*position: relative;*!-->*/
      /*<!--margin-top: -15px;-->*/
      /*<!--margin-left: -15px;-->*/
      /*<!--content: '';-->*/
      /*<!--display: inline-block;-->*/
      /*<!--width: 60px;-->*/
      /*<!--height: 60px;-->*/
      /*<!--line-height: 60px;-->*/
      /*<!--border-radius: 50%;-->*/
      /*<!--background-color: rgba(0, 0, 0, .2);-->*/
      /*<!--}-->*/
    }

    .hash-item {
      width: 370px;
      height: 600px;
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 50px 50px 70px;
      text-align: center;
      box-shadow: 0 0 5px 0 #ccc;
      transition: all .2s;
      background: #fff;

      &:focus,
      &:hover,
      &.active {
        box-shadow: 0 0 20px 3px #ccc;
      }

      .hash-item-img-wrap {
        height: 110px;
        line-height: 110px;
      }

      .hash-item-img {
        max-width: 140px;
        max-height: 110px;
      }

      .headline {
        margin-top: 50px;
        font-size: 24px;
        color: #303137;
      }

      .subhead {
        margin-top: 6px;
        font-size: 12px;
        line-height: 14px;
        color: #969699;
      }

      .price {
        margin-top: 30px;
        margin-bottom: 50px;
        font-size: 32px;
        color: #303137;
      }

      p {
        margin-top: 30px;
        font-size: 18px;
        line-height: 21px;
        color: #606166;
      }
      button {
        margin-top: 50px;
      }
    }
  }

  .service {
    padding-top: 100px;
    padding-bottom: 130px;
    /*background-color: rgba(0, 9, 34, 0.80);*/
    background: url(../assets/images/home/bg1.jpg) no-repeat;
    background-size: 100% 100%;

    .headline {
      font-size: 48px;
      line-height: 70px;
      color: #FFF;
      text-align: center;
    }
    .subhead {
      margin-top: 20px;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #FFF;
    }

    .items {
      margin-top: 70px;
    }
    .s-item {
      padding: 60px 40px 70px;
      background-color: #fff;
      text-align: center;
    }

    .s-item-img-wrap {
      display: inline-block;
      width: 64px;
      height: 64px;
      line-height: 64px;
      vertical-align: top;
    }

    .s-item-img {
      width: 64px;
      vertical-align: middle;
      /*height: 64px;*/
    }

    .s-item-headline {
      margin-top: 30px;
      font-size: 18px;
      color: #303137;
    }

    .s-item-subhead {
      margin-top: 10px;
      font-size: 14px;
      line-height: 24px;
      color: #969699;
    }

    button {
      margin-top: 50px;
    }

    .is-disabled {
      background-color: #dedee0;
      color: #fff;
      border-color: #dedee0;
      cursor: default;
    }
  }

  .cloud {
    padding-top: 110px;
    padding-bottom: 190px;
    text-align: center;
    /*background-color: #FAFAFA;*/
    background-image: url(../assets/images/home/bg2.jpg);

    .c-headline {
      font-size: 48px;
      line-height: 70px;
      color: #303137;
      font-weight: bold;
      text-align: center;
    }

    .c-subhead {
      margin-top: 20px;
      margin-bottom: 70px;
      font-size: 20px;
      color: #606166;
      line-height: 30px;
      text-align: center;

      span {
        position: relative;
        padding-left: 2.5em;
        padding-right: 2.5em;
        /*border-right: 2px solid #303137;*/

        &:not(:last-child) {
          &:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 20%;
            right: 0;
            height: 70%;
            width: 2px;
            background-color: #606166;
          }
        }
      }
    }

    .hash-coins {
      text-align: center;
      cursor: pointer;
    }

    .h-c-img-wrap {
      height: 90px;
      line-height: 90px;
      width: auto;

      img {
        max-width: 85px;
        max-height: 90px;
        vertical-align: middle;
      }
    }

    .h-c-headline {
      margin-top: 40px;
      font-size: 16px;
      color: #303137;
    }

    .h-c-subhead {
      margin-top: 14px;
      font-size: 14px;
      line-height: 22px;
      color: #606166;
    }

    button {
      margin-top: 90px;
    }

  }

  .pool {
    background-image: url(../assets/images/home/bg3.jpg);
    text-align: center;
    .inner {
      position: relative;
      top: -100px;
      padding-left: 15px;
      padding-right: 15px;
    }

    .summary {
      padding-top: 50px;
      padding-bottom: 50px;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);

      h2 {
        font-size: 42px;
        line-height: 60px;
        color: #303137;
      }
      p {
        font-size: 18px;
        line-height: 30px;
        color: #969699;
      }
    }

    .chart-wrapper {
      margin-top: 50px;
      /*width: 100%;*/
      height: 500px;
    }

    .echarts {
      width: 100%;
      height: 100%;
    }

    .currency-list {
      margin-top: 20px;
      vertical-align: top;

      .prev,
      .next {
        display: inline-block;
        font-size: 40px;
        color: #fff;
        width: 40px;
        height: 80px;
        line-height: 80px;
        cursor: pointer;
      }

      ul {
        display: inline-block;
        overflow: hidden;
        width: 990px;
        white-space: nowrap;
        vertical-align: top;
      }

      .item {
        display: inline-block;
        margin-left: 20px;
        width: 120px;
        height: 80px;
        line-height: 80px;
        font-size: 30px;
        color: #303137;
        background: #FFF;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.10);
        border-radius: 1px;
        cursor: pointer;
        &.active {
          background-color: #303137;
          color: #fff;
        }
      }
    }

    button {
      margin-top: 40px;
      background-color: transparent;
      border-color: #fff;
    }
  }

  .transfer {
    padding-top: 120px;
    padding-bottom: 120px;
    background-color: #f2f2f2;

    .t-headline {
      font-size: 48px;
      line-height: 64px;
      color: #303137;
    }

    .t-desc {
      margin-top: 35px;
      margin-bottom: 60px;
      font-size: 16px;
      color: #606166;
      line-height: 29px;
    }
  }

  .c-media-list {
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.10);
  }

  .c-media-list__item {
    padding: 0 40px 40px;
    background-color: #fff;

    &:hover,
    &:focus {
      background-color: #000;

      .c-block-media__headline,
      .c-block-media__excerpt {
        color: #fff;
      }

      .c-block-media__body {
        border-top: 0;
      }

      & + .c-media-list__item .c-block-media__body {
        border-top: 0;
      }
    }

    &:first-child .c-block-media__body {
      border-top: 0;
    }
  }

  .c-block-media {
    display: flex;
    transition: all 0.2s ease;
  }

  .c-block-media__media {
    margin-top: 40px;
    margin-right: 50px;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 5px 10px 0 rgba(49, 49, 49, 0.17);
  }

  .c-block-media__img {
    width: 100%;
    height: 100%;
  }

  .c-block-media__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding-top: 40px;
    border-top: 1px solid #ccc;
    user-select: none;

  }

  .c-block-media__headline {
    margin-top: 10px;
    margin-bottom: 13px;
    font-size: 18px;
    line-height: 24px;
    color: #303137;
  }

  .c-block-media__excerpt {
    font-size: 14px;
    line-height: 19px;
    color: #606166;
  }

  .miner {
    text-align: center;
    padding-top: 120px;
    padding-bottom: 290px;
    background: url(../assets/images/home/01.jpg) no-repeat bottom center;

    .m-headline {
      font-size: 48px;
      line-height: 64px;
      color: #303137;
    }

    .m-subhead {
      margin-top: 24px;
      margin-bottom: 95px;
      font-size: 20px;
      color: #606166;
      line-height: 24px;
    }

    .m-card {
      margin-bottom: 60px;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .1);
      transition: box-shadow .2s;
      background-color: #fff;
      cursor: pointer;

      &:hover,
      &:focus {
        box-shadow: 0 4px 19px 5px rgba(0, 0, 0, 0.1);
      }
    }

    .m-card__media {
      height: 230px;
      /*background-color: #b7b7c3;*/
    }

    .m-card__img {
      max-width: 100%;
      max-height: 230px;
    }

    .m-card__body {
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 30px;
    }

    .m-card__headline {
      margin-top: 20px;
      font-size: 18px;
      color: #303137;
      text-align: center;
      line-height: 24px;
    }

    .m-card__meta {
      margin-top: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #303137;
      text-align: left;
    }

    button {
      margin-top: 40px;
    }
  }

  .video {
    background-color: #f2f2f2;
    margin-bottom: -35px;
    position: relative;

    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 80px;
      margin-left: -40px;
      margin-top: -40px;
      cursor: pointer;

      img {
        width: 100%;
        vertical-align: top;
      }
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      top: -195px;
      height: 700px;
      /*background: #B7B7C3;*/
      border-radius: 2px;
      vertical-align: top;
      background: url(../assets/images/home/video-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .video-player {

  }

  .footer {
    height: 236px;
    background-color: #303137;
    padding-top: 40px;
    padding-bottom: 40px;

    .footer__inner, .friend-link {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-logo {
      position: relative;
      top: -3px;
      width: 160px;
    }

    img {
      vertical-align: top;
    }

    p {
      font-size: 12px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);

      &:nth-of-type(1) {
        margin-top: 8px;
      }
    }

    .footer-logo + p {
      margin-top: 13px;
    }

    .link {
      font-size: 12px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);

      &:hover,
      &:focus {
        color: #fff;
      }
    }

    .footer-service {
      margin-top: 3px;
      font-size: 30px;
      color: #fff;
      line-height: 40px;
    }

    h5 {
      color: #fff;
      font-size: 14px;
      line-height: 24px;
    }

    .download-img {
      margin-top: 12px;
      width: 80px;
      height: 80px;
      img {
        object-fit: cover;
      }
    }

    .friend-link {
      .link + .link:before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 10px;
        vertical-align: -1px;
        margin-left: 5px;
        margin-right: 6px;
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
</style>
