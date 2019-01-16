<template>
  <div class="container">
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <div class="msg" v-if="notice">
      <div class="inner">
        <p class="msg-content">
          <span><i class="iconfont icon-warning"></i>お知らせ：{{notice.title}}</span>
          <el-button type="text" class="right" @click="isNoticeDialogVisible=true">詳しくはこちら</el-button>
        </p>
      </div>
    </div>
    <div class="miner-list">
      <div class="inner">
        <div class="miner-item" v-for="list in recommendGoodsList" :key="list.currencyId">
          <div v-if="list.recommendList&&list.recommendList.length>0">
            <h2>{{list.currencyName}}機種</h2>
            <ul>
              <li v-for="item in list.recommendList" :key="item.goodsId">
                <span class="status">
                  <svg v-if="labelText(item)" class="product-label" width="85.5" height="30"
                       xmlns="http://www.w3.org/2000/svg">
                  <path :fill="item.status | type" d="M0 0h85.5l-30 30H0z"></path>
                  <text x="10" y="20" fill="#fff" font-size="14">{{labelText(item)}}</text>
                  </svg>
                  <!--<svg data-v-8f03510a="" width="85.5" height="30" xmlns="http://www.w3.org/2000/svg" class="product-label"><path-->
                  <!--data-v-8f03510a="" fill="#4D87EA" d="M0 0h85.5l-30 30H0z"></path> <text data-v-8f03510a="" x="10" y="20"-->
                  <!--fill="#fff"-->
                  <!--font-size="14">新上架</text></svg>-->
                </span>
                <div class="miner-img">
                  <img :src="item.icon" alt="">
                </div>
                <div class="miner-info">
                  <strong class="title">{{item.goodsName}}</strong>
                  <span class="des">{{item.title}}</span>
                  <p class="params"><i class="icon-output"></i>{{item.computing}}{{item.computingUnit}}</p>
                  <p class="params"><i class="icon-useup"></i>{{item.power}}W</p>
                  <p class="time">出荷時期：
                    <time>{{item.startSendTime | date('YYYY-MM-DD')}}~{{item.endSendTime | date('YYYY-MM-DD')}}</time>
                  </p>
                  <strong class="price">¥{{item.goodSalePrice | currency}}</strong>
                  <del class="old-price" v-if="item.goodPrice">定価：{{item.goodPrice | currency}}円</del>
                  <p v-else class="old-price-tip">マイニング機器価格</p>
                  <el-button class="go-buy-btn" @click="$router.push(`/product/detail?pId=${item.goodsId}`)">
                    {{btnText(item)}}
                  </el-button>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <div class="service-platform">
      <div class="inner">
        <h2>世界クラスのマイニングトータルプラットフォーム</h2>
        <span class="des">仮想通貨の種をまくトータルサポート</span>
        <el-row :gutter="131">
          <el-col :span="8">
            <div class="item">
              <img src="../assets/images/icon_goumai_normal.png" alt="" class="service-img">
              <h3><span>機器販売</span></h3>
              <p class="info">世界的人気を誇る機器、最新モデルや世界最高峰の高収益機器など様々な機器をご提供します。アフターサービスももちろん！</p>
              <el-button class="go-detail-btn" @click="$router.push('/product')">詳細へ</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <img src="../assets/images/icon_tuoguan_normal.png" alt="" class="service-img">
              <h3><span>マイニングサービス</span></h3>
              <p class="info">数十万台規模の巨大マイニングファームで、あなたの代わりにマイニング。費用や収益は管理画面で確認できるから安心して楽しめます！</p>
              <el-button class="go-detail-btn" @click="$router.push('/hosting')">詳細へ</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <img src="../assets/images/icon_yunsuanli_normal.png" alt="" class="service-img">
              <h3><span>クラウドマイニング</span></h3>
              <p class="info">誰でも、簡単に。1万円代からのマイニング！ご購入後はコイン収益を楽しむだけ！日本初のクラウドマイニングサービスです。</p>
              <el-button class="go-detail-btn" @click="$router.push('/hash')">coming soon</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="video">
      <div class="inner" v-if="videoSrc">
        <iframe id="ytplayer" type="text/html" width="1200" height="675"
                :src="`//www.youtube.com/embed/${videoSrc}?autoplay=0&rel=0`"
                frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <x-features style="margin-top: 42px;"/>

    <el-dialog width="420px" :title="(notice||{}).title" custom-class="custom"
               :visible.sync="isNoticeDialogVisible" center>
      <div v-if="notice">{{notice.content}}</div>
    </el-dialog>
  </div>
</template>

<script>
  import HomeAPI from '../services/home-api';
  import XBanner from '../components/x-banner';
  import XFeatures from '../components/x-features.vue';
  import dateFilter from '../filters/date-filter';

  export default {
    head() {
      return {
        title: 'FinTo Cube｜国内最大級マイニングプラットフォーム',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'FinTo、Finto Cubeフィント、フィント株式会社、ブロックチェーン、ビットコイン、イーサリアム、仮想通貨、仮想通貨ニュース、リップル、ウォレット、NEM、ライトコイン、LISK、ライトコイン、ICO、ハードフォーク、マイニング、マイニングマシン、仮想通貨分析、仮想通貨　今後、マイニング減少期、マイニングマシン、マイナー、クラウドマイニング、マイニング収益、S9、アントマイナー、S9i、ZEN、A9、イノシリコン、IBeLink、Antminer、Innosillicon、BTC,ETH、LTC、BTH、節税、節税対策、税金、税金対策、法人税'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'FinTo Cubeはマイニング機器の販売からマイニング代行、そしてクラウドマイニングまでを提供する仮想通貨マイニングのトータルプラットフォームです。低コストかつ質の高いサービスを提供することで、仮想通貨マイニングを「どなたでも」「簡単に」できるよう運営しております。マイニングに関することならFinTo Cubeへ！'
          }
        ]
      };
    },
    components: {
      XBanner,
      XFeatures
    },
    asyncData(context) {
      let data = {
        notice: '',
        bannerList: [],
        videoSrc: '',
        recommendGoodsList: []
      };
      let p1 = HomeAPI.bannerList(1)
        .then(res => res || {})
        .then(res => res.result || [])
        .then(res => {
          data.bannerList = res;
        });
      let p2 = HomeAPI.notice()
        .then(res => {
          if (res) {
            data.notice = res;
          }
        });

      let p3 = HomeAPI.getVideo()
        .then(res => res || {})
        .then(res => {
          data.videoSrc = res.url || '';
        });

      let p4 = HomeAPI.getRecommendGoodsList()
        .then(res => res || {})
        .then(res => res.result || [])
        .then(res => {
          data.recommendGoodsList = res;
        });

      return Promise.all([p1, p2, p3, p4])
        .then(res => {
          return data;
        });
    },
    data() {
      return {
        input: '',
        isNoticeDialogVisible: false,
        isPlaying: false,
        isPlayerLoaded: false
      };
    },
    filters: {
      type(value) {
        if (value === 0) {
          return '#FFBB1A';
        } else if (value === 1) {
          return '#4D87EA';
        } else {
          return '#98999B';
        }
      }
    },
    methods: {
      btnText(item) {
        const saleTime = item.startSendTime || new Date();
        switch (item.status) {
          case 0: // 待出售
            return dateFilter(saleTime, 'M月DD日HH:mm発売');
          case 1: // 出售中
            return '購入する';
          default: // 已售罄
            return '詳細を見る';
        }
      },
      labelText(item) {
        switch (item.status) {
          case 0:
            return '未発売';
          case 1:
            return item.tag === 2 ? '新発売' : '';
          default:
            return '売り切れ';
        }
      },
      loadYoukuPlayer() {
        const youkuPlayerUrl = '//player.youku.com/jsapi';
        return new Promise((resolve, reject) => {
          const isLoaded = document.querySelectorAll(`script[src="${youkuPlayerUrl}"]`).length > 0;
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
              autoplay: false
            });
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    background: #f7f7f8;
    overflow: hidden;
  }

  .inner {
    width: 1170px;
    margin: 0 auto;
  }

  .el-button:not(.el-button--text) {
    border: 0;
    border-radius: 2px;
    color: #fff;
    background: #19305C;
    transition: all .2s;
    &:hover {
      background: #284d92;
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

  .miner-list {
    background: #f7f7f8;
    padding-bottom: 50px;
  }

  .miner-item {
    h2 {
      line-height: 116px;
      font-size: 26px;
      color: #303137;
    }
    li {
      background: #fff;
      height: 426px;
      position: relative;
      margin-bottom: 30px;
      padding: 75px 48px 83px 475px;
      transition: all .2s;
      &:hover {
        box-shadow: 0 0 10px 0px #ccc;
      }
      &:last-child {
        margin-bottom: 0;
      }
      svg {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .miner-img {
      position: absolute;
      top: 58px;
      left: 82px;
      text-align: center;
      width: 310px;
      height: 310px;
      line-height: 310px;
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
    .miner-info {
      position: relative;
      .title {
        display: block;
        font-size: 24px;
        color: #333333;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .des {
        display: block;
        font-size: 14px;
        color: #999999;
        margin-bottom: 20px;
        line-height: 19px;
      }
      .params {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #303137;
        margin-bottom: 12px;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          vertical-align: middle;
          &.icon-output {
            background: url("../assets/images/home/icon_suan_normal@2x.png");
            background-size: 100% 100%;
          }
          &.icon-useup {
            background: url("../assets/images/home/icon_wa_normal@2x.png");
            background-size: 100% 100%;
          }
        }
      }
      .time {
        margin: 29px 0 27px 0;
        font-size: 14px;
        color: #666666;
        line-height: 19px;
      }
      .price {
        font-size: 34px;
        color: #FD7220;
        line-height: 1em;
        margin-bottom: 9px;
        display: block;
      }
      .old-price {
        font-size: 14px;
        color: #999999;
        line-height: 19px;
      }
      .old-price-tip {
        font-size: 14px;
        color: #999999;
      }
      .go-buy-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 151px;
        height: 40px;
      }
    }
  }

  .service-platform {
    background: url("../assets/images/home/bg1.jpg") no-repeat center;
    background-size: 100% 100%;
    text-align: center;
    padding: 109px 0 130px 0;
    h2 {
      color: #fff;
      font-size: 48px;
      line-height: 64px;
      margin-bottom: 24px;
    }
    .des {
      color: #fff;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: 1.67px;
      margin-bottom: 77px;
      display: block;
    }
    .el-col .item {
      background: #fff;
      padding: 65px 35px 69px;
      transition: all .2s;
      &:hover {
        transform: translateY(-15px);
      }
      .service-img {
        height: 55px;
        display: inline-block;
        margin-bottom: 37px;
      }
    }
    h3 {
      line-height: 18px;
      font-size: 18px;
      color: #303137;
      margin-bottom: 13px;
      span {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          opacity: 0.8;
          background: #4185F5;
          border-radius: 1px;
          height: 5px;
          width: 100%;
        }
      }
    }
    .info {
      font-size: 14px;
      color: #969699;
      min-height: 72px;
      line-height: 24px;
      margin-bottom: 15px;
    }
    .go-detail-btn {
      height: 28px;
      width: 114px;
      padding: 0;
      line-height: 28px;
    }
  }

  .video {
    position: relative;
    background-image: url(../assets/images/home/bg2.jpg);
    padding: 80px 0;
    /*background: #fff;*/
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
      border-radius: 2px;
      vertical-align: top;
      background: #B7B7C3 url(../assets/images/home/video-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
