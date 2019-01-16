<template>
  <div class="trusteeship">
    <div class="header-banner">
      <el-row class="banner-content">
        <el-col :span="10" class="banner-left">
          <div class="banner-txt">算立方矿机托管<br><strong>让挖矿更简单</strong></div>
          <el-button class="banner-btn" @click="$router.replace('/product')">立即购买</el-button>
        </el-col>
        <el-col :span="14" class="banner-right">
          <img class="banner-l" src="../../assets/images/banner-l.png" alt="图标L">
          <img class="banner-kj" src="../../assets/images/banner-kj.png" alt="矿机">
          <img class="banner-eth" src="../../assets/images/banner-eth.png" alt="图标ETH">
          <img class="banner-b" src="../../assets/images/banner-b.png" alt="图标B">
        </el-col>
      </el-row>
    </div>
    <div class="trusteeship-machine">
      <h1>矿机托管</h1>
      <ul class="clearfix">
        <li>
          <img src="../../assets/images/kuangjituoguan_wendingkekao.png" width="141px" height="146px" alt="稳定可靠">
          <h2>稳定可靠</h2>
          <p>矿机购买后，将托管在算立方矿场，由专业人员部署，24小时维护</p>
        </li>
        <li>
          <img src="../../assets/images/kuangjituoguan_feiyongdilian.png" width="136px" height="146px" alt="费用低廉">
          <h2>费用低廉</h2>
          <p>0.65元/kW·H电费，每天每台20元，管理维护费，以币抵费，自动结算</p>
        </li>
        <li>
          <img src="../../assets/images/kuangjituoguan_shishijiankong.png" width="153px" height="153px" alt="实时监控">
          <h2>实时监控</h2>
          <p>实时查看矿机运行情况，T+1查看矿机产出收益</p>
        </li>
        <li>
          <img src="../../assets/images/kuangjituoguan_jiesuangongkai.png" width="143px" height="149px" alt="结算公开">
          <h2>结算公开</h2>
          <p>收益参考当日火币早8点实时价格，扣除电费管理费，即为前一日所得</p>
        </li>
      </ul>
      <div class="to-agreement">
        <nuxt-link class="pointer" to="/rules/trusteeship-agreement" target="_blank">托管服务协议 ></nuxt-link>
      </div>
    </div>
    <div class="process">
      <h1>托管流程</h1>
      <ul>
        <li>
          <img src="../../assets/images/tuoguanliucheng_goumai.png" width="181px" height="183px" alt="购买">
          <p>购买矿机后<br>选择托管服务</p>
        </li>
        <li>
          <img src="../../assets/images/tuoguanliucheng_fahuo.png" width="177px" height="161px" alt="发货">
          <p>等待发货<br>到算立方矿场</p>
        </li>
        <li>
          <img src="../../assets/images/tuoguanliucheng_bushu.png" width="169px" height="168px" alt="部署">
          <p>到达矿场后<br>由专业人员部署矿机</p>
        </li>
        <li>
          <img src="../../assets/images/tuoguanliucheng_shouyi.png" width="170px" height="170px" alt="收益">
          <p>开始挖矿<br>获得收益</p>
        </li>
      </ul>
    </div>
    <div class="realshot">
      <h1>矿场实拍</h1>
      <div>
        <span class="realshot-img1"><img src="../../assets/images/kuangjishipai_img1.png" alt="实拍1"></span>
        <span><img src="../../assets/images/kuangjishipai_img2.png" alt="实拍2"></span>
      </div>
      <div>
        <span><img src="../../assets/images/kuangjishipai_img3.png" alt="实拍3"></span>
        <span><img src="../../assets/images/kuangjishipai_img4.png" alt="实拍4"></span>
        <span><img src="../../assets/images/kuangjishipai_img5.png" alt="实拍5"></span>
      </div>
    </div>
    <x-features/>
  </div>
</template>

<script>
  import XFeatures from "../../components/x-features";

  export default {
    head: {
      title: '矿机托管_数字货币挖矿托管首选-算立方', // set a title
      meta: [
        {
          hid: 'keywords',// set meta
          name: 'keywords',
          content: '矿机托管,比特币矿机托管,矿场部署,比特币矿机托管'
        },
        {
          hid: 'description',
          name: 'description',
          content: '算立方提供性价比最高的矿机托管业务，一站式托管首选。'
        }
      ]
    },
    components: {XFeatures},
    methods: {
      goDetail(item) {
        this.$router.push({path: 'detail', query: {pid: item.id}});
      }
    }
  };
</script>

<style scoped lang="scss">
  .trusteeship {

  }

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
  }

  ul {
    margin: 0 auto;
    margin-top: 87px;
    width: 1200px;
    height: 340px;
    display: flex;
    justify-content: space-between;

    li {
      width: 278px;
      height: 340px;
      padding: 30px;

      img {
        padding: 50px;
        margin-top: 16px;
        width: 170px;
        height: 170px;
      }

      p {
        color: #303137;
        margin-top: 22px;
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
