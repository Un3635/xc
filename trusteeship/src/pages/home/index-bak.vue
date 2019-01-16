<template>
  <div class="container">
    <figure>
      <img src="../../../static/images/home-banner-1.jpg" alt="">
      <figcaption>
        <div class="content light" style="padding-top: 100px;">
          <h2>便捷高效的<br/>云算力租赁服务平台</h2>
          <p>即买即挖，无需等待，专业矿场维护，算力稳定</p>
          <p>一次投入，终身合约</p>
        </div>
      </figcaption>
    </figure>
    <figure>
      <img src="../../../static/images/home-banner-2.jpg" alt="">
      <figcaption>
        <div class="content text-right" style="padding-top: 120px;">
          <h2>雪豹矿机A1 49T</h2>
          <p>强大的单机算力，运行稳定，是主流矿机算力(13.5T)的3.63倍</p>
          <el-button class="btn" size="large" @click="$router.push('product')">立即前往</el-button>
        </div>
      </figcaption>
    </figure>
    <figure>
      <img src="../../../static/images/home-banner-3.jpg" alt="">
      <figcaption>
        <div class="content light" style="padding-top: 100px;">
          <h2>一站式托管服务</h2>
          <p>从矿场搭建、电网部署、专人维护、</p>
          <p>矿机分布全球，提高收益，让挖矿更简单</p>
          <el-button class="btn" size="large" @click="$router.push('hosting')">立即前往</el-button>
        </div>
      </figcaption>
    </figure>
    <figure>
      <img src="../../../static/images/home-banner-4.jpg" alt="">
      <figcaption>
        <div class="content text-right" style="padding-top: 100px;">
          <h2>云算力租赁服务</h2>
          <p>低成本投资，按T购买，通过算立方专业矿机群部署</p>
          <p>提供专业云算力维护服务，收益稳定</p>
          <el-button class="btn" size="large" @click="$router.push('hash')">立即前往</el-button>
        </div>
      </figcaption>
    </figure>
    <figure>
      <img src="../../../static/images/home-banner-5.jpg" alt="">
      <figcaption>
        <div class="content light" style="padding-top: 120px">
          <h2>算力交易</h2>
          <p>算立方云算力实时交易市场，灵活买入卖出云算力</p>
          <el-button class="btn" size="large" @click="$router.push('exchange')">立即前往</el-button>
        </div>
      </figcaption>
    </figure>
    <x-features/>
  </div>
</template>

<script>
  import XFeatures from '../../components/x-features';

  export default {
    components: {XFeatures},
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
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  .container {

  }

  figure {
    position: relative;
    margin: 0;
    padding: 0;

    img {
      display: block;
      width: 100%;
    }

  }

  figcaption {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  h2 {
    font-size: 50px;
    line-height: 70px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
  }

  p {
    font-size: 20px;
    line-height: 28px;
  }

  .btn {
    margin-top: 60px;
    min-width: 210px;
    padding-top: 12px;
    padding-bottom: 12px;
    border: 0;
    background-color: #F9CE87;
    color: #4a4444;
    transition: all .2s;

    &:hover, &:focus {
      background-color: #fbc56b;
    }
  }

  .light {
    color: #fff;
  }

</style>
