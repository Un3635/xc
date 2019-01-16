<template>
  <div class="trusteeship">
    <!--<div class="header-banner">-->
      <!--<el-row class="banner-content">-->
        <!--<el-col :span="10" class="banner-left">-->
          <!--<div class="banner-txt">算立方矿机托管<br><strong>让挖矿更简单</strong></div>-->
          <!--<el-button class="banner-btn" @click="$router.replace('/product')">立即购买</el-button>-->
        <!--</el-col>-->
        <!--<el-col :span="14" class="banner-right">-->
          <!--<img class="banner-l" src="../../assets/images/banner-l.png" alt="图标L">-->
          <!--<img class="banner-kj" src="../../assets/images/banner-kj.png" alt="矿机">-->
          <!--<img class="banner-eth" src="../../assets/images/banner-eth.png" alt="图标ETH">-->
          <!--<img class="banner-b" src="../../assets/images/banner-b.png" alt="图标B">-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <div class="trusteeship-machine">
      <h1>マイニングサービスのメリット</h1>
      <ul class="clearfix">
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/kuangjituoguan_wendingkekao.png" alt="稳定可靠">
          </div>
          <h2>安心・安全な管理</h2>
          <p>24時間365日お客様の機器を専門スタッフが守ります！</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/kuangjituoguan_feiyongdilian.png" alt="费用低廉">
          </div>
          <h2>低コスト</h2>
          <p>イニシャルコストは機器代とセットアップ料のみ！さらにランニングコストは業界最安クラス！</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/kuangjituoguan_shishijiankong.png" alt="实时监控">
          </div>
          <h2 class="lh30">リアルタイム<br/>モニタリング</h2>
          <p>産出されたコインや収益はもちろん、リアルタイムに機器のステータスが確認可能！</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/kuangjituoguan_jiesuangongkai.png" alt="结算公开">
          </div>
          <h2>いつでもお引出し</h2>
          <p>決まった日ではなく、お好きなタイミングで溜まったコインを引き出せます！</p>
        </li>
      </ul>
      <div class="to-agreement">
        <!--<router-link class="pointer" to="trusteeship-agreement" target="_blank">托管服务协议 ></router-link>-->
      </div>
    </div>
    <div class="process">
      <h1>サービスフロー</h1>
      <ul>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/tuoguanliucheng_goumai.png" alt="">
          </div>
          <p>機器のご購入後、委託管理サービスをご選択いただきます</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/tuoguanliucheng_fahuo.png" alt="">
          </div>
          <p>ご購入後FinToのマイニングファームへ配送</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/tuoguanliucheng_bushu.png" alt="">
          </div>
          <p>ファーム到着後、すぐに機器のセットアップ</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/images/tuoguanliucheng_shouyi.png" alt="">
          </div>
          <p>マイニングスタート</p>
        </li>
      </ul>
    </div>
    <div class="realshot">
      <h1>FinToマイニングファーム</h1>
      <div>
        <span class="realshot-img1"><img src="../../assets/images/hosting/1.png" alt="实拍1"></span>
        <span><img src="../../assets/images/hosting/2.png" alt="实拍2"></span>
      </div>
      <div>
        <span><img src="../../assets/images/hosting/3.png" alt="实拍3"></span>
        <span><img src="../../assets/images/hosting/4.png" alt="实拍4"></span>
        <span><img src="../../assets/images/hosting/5.png" alt="实拍5"></span>
      </div>
    </div>
    <x-features/>
  </div>
</template>

<script>
  import XFeatures from '../../components/x-features';
  import HomeAPI from '../../services/home-api';
  import XBanner from '../../components/x-banner';

  export default {
    head() {
      return {
        title: 'FinTo Cube｜ワンストップのトータルマイニングサービス',
        meta: [
          {hid: 'keywords', name: 'keywords', content: 'FinTo、Finto Cube、フィント、フィント株式会社、ブロックチェーン、ビットコイン、イーサリアム、仮想通貨、仮想通貨ニュース、リップル、ウォレット、NEM、ライトコイン、LISK、ライトコイン、ICO、ハードフォーク、マイニング、マイニングマシン、仮想通貨分析、仮想通貨　今後、マイニング減少期、マイニングマシン、マイナー、クラウドマイニング、マイニング収益、S9、アントマイナー、S9i、ZEN、A9、イノシリコン、IBeLink、Antminer、Innosillicon、BTC,ETH、LTC、BTH委託,マイニングファーム運営,BTC機器委託、節税、節税対策、税金、税金対策、法人税'},
          {
            hid: 'description',
            name: 'description',
            content: 'FinTo Cubeマイニングサービスは低コストと高水準のワンストップマイニング代行サービスです。数十万大規模のマイニングファーム にてお客様の大切なマイニング機器を保守・運営・管理サービスを提供いたします。お客様は弊社からマイニング機器のご購入をしていただくだけで、毎日仮想通貨の収益を楽しんで頂けるワンストップサービスです。マイニングサービスならFinTo Cubeへ！'
          }
        ]
      };
    },
    data() {
      return {};
    },
    asyncData(){
      return HomeAPI.bannerList(3)
        .then(res => res || {})
        .then(res => res.result || [])
        .then(res => {
          return {
            bannerList: res
          };
        });
    },
    components: {
      XFeatures,
      XBanner
    }
  };
</script>

<style scoped lang="scss">
  .header-banner {
    width: 100%;
    height: 700px;
    background: url("../../assets/images/banner-bg.png") no-repeat;

    .banner-content {
      width: 1200px;
      margin: 0 auto;

      .banner-right {
        position: relative;

        .banner-l {
          position: absolute;
          top: 112px;
          right: 400px;
        }

        .banner-kj {
          position: absolute;
          top: 180px;
          right: 30px;
        }

        .banner-eth {
          position: absolute;
          top: 580px;
          right: 530px;
        }

        .banner-b {
          position: absolute;
          top: 480px;
          right: 35px;
        }
      }
    }
  }

  .banner-txt {
    font-size: 47px;
    color: #ffe6a1;
    line-height: 80px;
    margin-top: 115px;
  }

  strong {
    font-size: 56px;
    font-weight: bold;
  }

  .banner-btn {
    width: 174px;
    height: 53px;
    font-size: 24px;
    background: #ffe8a0;
    margin-top: 60px;
  }

  h1 {
    font-size: 38px;
    text-align: center;
  }

  .trusteeship-machine {
    width: 100%;
    height: 700px;
    padding-top: 50px;
    background: #e8f4ff;
    text-align: center;

    li {
      background: #fff;
    }

    .to-agreement {
      margin-top: 80px;
    }

    .pointer {
      cursor: pointer;
    }

    h2 {
      height: 60px;
      line-height: 60px;
      &.lh30 {
        line-height: 30px;
      }
    }
  }

  .img-wrap {
    height: 130px;
    line-height: 130px;
    img {
      vertical-align: middle;
    }
  }

  ul {
    margin: 87px auto 0;
    width: 1200px;
    height: 340px;
    display: flex;
    justify-content: space-between;

    li {
      width: 278px;
      height: 340px;
      padding: 30px;

      p {
        color: #303137;
        margin-top: 10px;
      }
    }
  }

  .process {
    width: 100%;
    height: 625px;
    padding-top: 110px;
    background: url("../../assets/images/tuoguanliucheng_bg.jpg") no-repeat;

    h1 {
      color: #fff;
    }

    li {
      text-align: center;
    }

    p {
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
  }

  .realshot {
    width: 100%;
    height: 1350px;
    padding-top: 95px;
    background: #ecf6fe;

    div {
      width: 1200px;
      height: 450px;
      margin: 0 auto;
      margin-top: 70px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      span {
        width: 380px;
        height: 450px;
        display: inline-block;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 0;
        }
      }

      .realshot-img1 {
        width: 790px;
      }
    }
  }
</style>
