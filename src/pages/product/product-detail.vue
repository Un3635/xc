<template>
  <div class="product-detail">
    <view-box body-padding-top="0" body-padding-bottom="50px">
      <div class="product-banner">
        <header class="clearfix">
          <div class="go-back left" @click="$router.go(-1);">
            <img src="../../assets/images/icon_xiangqingfanhui_presseds@2x.png" alt="">
          </div>
          <div class="share right">
            <img src="../../assets/images/icon_xiangqingfenxiang_normal@2x.png" alt="">
          </div>
        </header>
        <swiper :aspect-ratio="0.8" :show-desc-mask="false" :list="imgList" auto dots-class="custom-bottom"
                dots-position="center"></swiper>
      </div>
      <div class="product-title">
        <h3>雪豹 E3 以太坊矿机 230M</h3>
        <p>商品特色介绍，不超过18个字符</p>
      </div>
      <div class="product-info">
        <group>
          <cell>
            <span slot="title" class="title">发货时间</span>
            <p>3月20日 - 3月31日</p>
          </cell>
          <cell>
            <span slot="title" class="title">预售价</span>
            <p class="price">
              <span>51,450<small>.00元</small></span>
            </p>
          </cell>
          <cell>
            <span slot="title" class="title">数量</span>
            <div class="buy-num clearfix">
              <span class="tip left">单人限购100台</span>
              <inline-x-number :min="0" :max="100" class="left" width="35px" :fillable="true"></inline-x-number>
            </div>
          </cell>
        </group>
      </div>
      <div class="tab-detail">
        <tab :line-width="0" active-color="#303137" default-color="#969699" v-model="tabIndex" :animate="false">
          <tab-item v-for="(item, index) in list" :key="index">{{item}}</tab-item>
        </tab>
        <div class="imgs" v-show="tabIndex==0">
          <img src="../../assets/images/E3xiangqing_bg@2x.png" alt="">
        </div>
        <div class="params" v-show="tabIndex==1">
          <p v-for="(param,index) in paramsList" :key="index">
            <span class="title">{{param.title}}</span>
            {{param.value}}
          </p>
        </div>
        <div class="after-sale" v-show="tabIndex==2">
          <header>矿机不同于消费类电子产品，而是根据顾客需求特殊定制的、用于投资的产品，投资需谨慎。</header>
          <p>本产品售后服务政策如下，一旦购买，即视为对本政策的认同。</p>
          <ol>
            <li>1、无论是否发货，付款后均不能退款、退货；</li>
            <li>2、矿机产品的保修期为自发货之日起180天；</li>
            <li>3、由于市场波动，在您购买后，产品价格可能会随时调整，我们不承担事先通知、价格补偿的义务。</li>
          </ol>
          <p>以下情况会使保修失效</p>
          <ol>
            <li>1、矿机本身被拆卸，私自改动、更换元器件；</li>
            <li>2、雷击，电压浪涌，劣质电源等造成的损坏；</li>
            <li>3、进水、电路板和元器件受潮、出现腐蚀造成的损坏；</li>
            <li>4、电路板存在烧毁痕迹的或者芯片被烧毁的；</li>
            <li>5、超频。</li>
          </ol>
          <p>如果发生了以上情况，我们为您的矿机提供收费维修服务。</p>
        </div>
      </div>
      <footer class="product-detail-footer" slot="bottom">
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="go-home">
              <router-link to="/">
                <img src="../../assets/images/icon_xiangqingshouye_normal@2x.png" alt="">
                <p>首页</p>
              </router-link>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="go-shoppingcart">
              <router-link to="/cart">
                <img src="../../assets/images/icon_xiangqinggouwuche_normal@2x.png" alt="">
                <p>购物车</p>
              </router-link>
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="join-shoppingcart">
              <x-button type="primary" @click.native="joinShoppingCart">加入购物车</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </footer>
    </view-box>
  </div>
</template>
<script>
  import {Swiper, Group, Cell, InlineXNumber, Tab, TabItem, Flexbox, FlexboxItem} from 'vux';

  export default {
    data() {
      return {
        paramsList: [
          {
            title: '矿机算法',
            value: 'SHA-256 (BTC/BCH/SBTC/UBTC)'
          },
          {
            title: '额定算力',
            value: '49 TH/s ± 5% (max performance)'
          },
          {
            title: '墙上功耗',
            value: 'variable, 6.4 KW (max)'
          },
          {
            title: '电源效率',
            value: 'variable, form 0.101 to 0.133 J/GH'
          },
          {
            title: '额定电压',
            value: '48v - 57.6v'
          },
          {
            title: '芯片数量',
            value: '576 片 BF16BTC'
          },
          {
            title: '算力板数量',
            value: '6 片 Hash 板'
          },
          {
            title: '裸机尺寸',
            value: '599*483*270mm'
          },
          {
            title: '包装尺寸',
            value: '780*625*450mm'
          },
          {
            title: '冷却',
            value: '6×12038 风扇'
          },
          {
            title: '操作环境',
            value: '-10℃ to 40℃ (5-95% RH)'
          },
          {
            title: '存储环境',
            value: '15℃ to 35℃ (35-75% RH)'
          },
          {
            title: '网络链接',
            value: '以太网'
          }
        ],
        imgList: [
          {img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'},
          {img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'},
          {img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'}
        ],
        list: ['矿机详情', '矿机参数', '售后政策'],
        tabIndex: 0
      };
    },
    components: {
      Swiper,
      Group,
      Cell,
      InlineXNumber,
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem
    },
    mounted() {

    },
    methods: {
      joinShoppingCart() {
        this.$vux.toast.text('已添加到购物车', 'middle');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .product-detail {
    background: #f4f4f4;
  }

  .product-banner {
    position: relative;
    background: #F8F8F8;
    header {
      position: absolute;
      padding: 13px 15px;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      img {
        width: 28px;
        height: 28px;
        display: block;
      }
    }
  }

  .product-title {
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
    h3 {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 3px;
    }
    p {
      line-height: 1.5em;
      font-size: 12px;
      color: #969699;
    }
  }

  .product-info {
    margin-bottom: 10px;
    .title {
      color: #606166;
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: #303137;
      &.price {
        color: #FD7220;
        span {
          font-size: 18px;
          line-height: 18px;
        }
        small {
          font-size: 12px;
        }
      }
    }
    .tip {
      color: #969699;
      font-size: 12px;
      line-height: 28px;
      margin-right: 10px;
    }
  }

  .tab-detail {
    margin-bottom: 10px;
    .vux-tab-wrap {
      margin-bottom: 10px;
      .vux-tab-item {
        background: none;
      }
    }
    .imgs {
      img {
        width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
    .params {
      background: #fff;
      padding: 17px 12px;
      p {
        position: relative;
        line-height: 1.5em;
        color: #303137;
        font-size: 14px;
        padding: 10px 14px 10px 97px;
        word-break: break-all;
        &:nth-child(odd) {
          background: #F7F7F7;
        }
        span {
          position: absolute;
          color: #969699;
          left: 10px;
          top: 10px;
        }
      }
    }
    .after-sale {
      background: #fff;
      padding: 18px;
      line-height: 20px;
      header, p {
        font-size: 14px;
        color: #303137;
        margin-bottom: 3px;
      }
      header {
        margin-bottom: 12px;
      }
      ol {
        margin-bottom: 24px;
      }
      li {
        color: #606166;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }

  .product-detail-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 50px;
    .vux-flexbox-item {
      box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.10);
      > div {
        height: 50px;
        &.go-home, &.go-shoppingcart {
          text-align: center;
          a {
            display: block;
            padding-top: 7px;
          }
          img {
            width: 22px;
            height: 22px;
            display: block;
            margin: 0 auto;
          }
          p {
            text-align: center;
            color: #999999;
            font-size: 10px;
            line-height: 1.8;
          }
        }
        button {
          height: 100%;
          width: 100%;
          border-radius: 0;
        }
      }
    }
  }
</style>
<style lang="scss">
  .product-detail .weui-cells.vux-no-group-title {
    &:before, &:after {
      display: none;
    }
  }
</style>
