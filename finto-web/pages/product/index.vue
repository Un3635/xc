<template>
  <div class="miner-container">
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <section class="minerList">
      <ul class="miner-category clearfix">
        <li v-for="item in categoryList" :key="item.id"
            :class="{'active':[$route.query.id].indexOf(item.id+'') != -1 || (!$route.query.id && item.id == '')}"
            @click="changeTab(item.id)">{{item.categoryName}}
        </li>
      </ul>
      <ul class="miner-product-list clearfix">
        <li v-for="(item,idx) in productList" :key="idx"
            @click="$router.push('/product/detail?pId='+item.batchGoodsId)">
          <svg v-if="labelText(item)" class="product-label" width="85.5" height="30" xmlns="http://www.w3.org/2000/svg">
            <path :fill="item.status | type" d="M0 0h85.5l-30 30H0z"></path>
            <text x="10" y="20" fill="#fff" font-size="14">{{labelText(item)}}</text>
          </svg>
          <!-- <div class="product-label" :class="labelText(item)">
          </div> -->
          <div class="product-img">
            <img :src="item.imageUrl" :alt="item.goodsName"></div>
          <div class="product-detail-container">
            <p class="procuct-name">
              <span>{{item.goodsName}}</span>
              <span>{{item.categoryName}}</span>
            </p>
            <p class="product-detail">{{item.goodsSubTitle}}</p>
            <p class="product-delivery">
              出荷時期：{{item.startSendTime | date('YYYY-MM-DD')}}~{{item.endSendTime | date('YYYY-MM-DD')}}</p>
            <p class="product-discount">
              <span v-for="(act,index) in item.goodsActivityList" :key="index">
                <img src="../../assets/images/yao.svg" alt="" v-if="act.activityType===2">
                <img src="../../assets/images/cu.svg" alt="" v-if="act.activityType===1">
                <span class="activityTitle">{{act.title}}</span>
              </span>
            </p>
            <div class="product-count clearfix">
              <div class="left">
                <p class="sale-price">
                  <span v-if="item.status===1&&item.goodSalePrice">{{item.goodSalePrice|currency}}円</span>
                  <span v-else-if="item.status!==1&&item.goodSalePrice">{{item.goodSalePrice|currency}}</span>
                  <span v-else>--</span>
                </p>
                <p class="original-cost">
                  <span v-if="item.goodsPrice&&item.status===1" class="decoration">{{item.goodsPrice|currency}}円</span>
                  <span v-else>機器価格</span>
                </p>
              </div>
              <el-button class="right" type="primary" :class="{'is-disabled':item.status!==0&&item.status!==1}">
                {{btnText(item)}}
              </el-button>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="productList.length<1" class="no-data">
        <img src="../../assets/images/compute-buy.png" alt="">
        <p>申し訳ございません。現在販売している機器はございません。</p>
      </div>
    </section>
    <x-features/>
  </div>
</template>

<script>
  import XFeatures from '../../components/x-features';
  import dateFilter from '../../filters/date-filter';
  import HomeAPI from '../../services/home-api';
  import XBanner from '../../components/x-banner';
  import GoodsAPI from '../../services/goods-api';

  export default {
    head() {
      return {
        title: '国内最大級のマイニングストア｜FinTo Cube',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'FinTo、Finto Cube、フィント、フィント株式会社、ブロックチェーン、ビットコイン、イーサリアム、仮想通貨、仮想通貨ニュース、リップル、ウォレット、NEM、ライトコイン、LISK、ライトコイン、ICO、ハードフォーク、マイニング、マイニングマシン、仮想通貨分析、仮想通貨　今後、マイニング減少期、マイニングマシン、マイナー、クラウドマイニング、マイニング収益、S9、アントマイナー、S9i、ZEN、A9、イノシリコン、IBeLink、Antminer、Innosillicon、BTC,ETH、LTC、BTH、節税、節税対策、税金、税金対策、法人税'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'FinTo Cubeのマイニングストアでは、厳選された世界的マイニングメーカー、高収益実績のあるスーパーマシン、そして様々な仮想通貨用のマイニング機器を安価で取り揃えております。メーカーとのダイレクトラインもあるため、小規模から大規模ロットまで様々なお取引が可能です。マイニング機器の購入ならFintoへ。'
          }
        ]
      };
    },
    components: {XBanner, XFeatures},
    asyncData(context) {
      return GoodsAPI.category()
        .then(res => res.result)
        .then(res => {
          res.unshift({id: '', categoryName: '機器カタログ'});
          return {
            categoryList: res
          };
        });
    },
    data() {
      return {
        categoryId: '',
        productList: [],
        bannerList: [],
        pageInfo: {
          page: 1,
          size: 100
        }
      };
    },
    filters: {
      type(value) {
        if (value === 0) {
          return '#FFBB1A';
        } else if (value === 1) {
          return '#4D87EA';
        } else if (value === 2) {
          return '#98999B';
        } else if (value === 3) {
          return '#98999B';
        }
      }
    },
    methods: {
      labelText(item) {
        switch (item.status) {
          case 0:
            return '未発売';
          case 1:
            return item.tag === 2 ? '新発売' : '';
          case 2: // 已售罄
            return '売り切れ';
          case 3: // 已结束
            return '販売終了';
          case -1: // 已下架
            return '販売中止';
        }
      },
      // isShowSalePrice(item) {
      //   if (item.status === 1) {
      //     return true;
      //   } else if (item.status === 0) {
      //     return item.openSalePriceType !== 1;
      //   } else {
      //     return item.soldOutPriceType !== 1;
      //   }
      // },
      initPage() {
        HomeAPI.bannerList(2)
          .then(res => res.result || [])
          .then(res => {
            this.bannerList = res;
          });
      },
      getGoodsList() {
        const {page, size} = this.pageInfo;
        GoodsAPI.list(this.$route.query.id || '', page, size)
          .then(res => res.data || [])
          .then(res => {
            res.forEach(item => {
              (item.goodsActivityList || []).sort((a, b) => a.activityType - b.activityType);
            });
            return res;
          })
          .then(res => {
            this.productList = res;
          });
      },
      btnText(item) {
        const saleTime = item.saleTime || new Date();
        switch (item.status) {
          case 0: // 待出售
            return dateFilter(saleTime, 'M月DD日HH:mm発売');
          case 1: // 出售中
            return '購入する';
          case 2: // 已售罄
            return '売り切れ';
          case 3: // 已结束
            return '販売終了';
          case -1: // 已下架
            return '販売中止';
        }
      },
      changeTab(id) {
        if (id === '') {
          this.$router.replace('/product');
        } else {
          this.$router.replace('/product?id=' + id);
        }
      }
    },
    mounted() {
      this.initPage();
    },
    watch: {
      $route: {
        handler() {
          this.getGoodsList();
        },
        immediate: true
      }
    }
  };
</script>

<style scoped lang="scss">
  .el-button:not(.el-button--text) {
    border: 0;
    padding-top: 11px;
    padding-bottom: 11px;
    border-radius: 2px;
    color: #fff;
    background: #19305C;
    transition: all .2s;
    &:hover {
      background: #284d92;
    }
  }

  .miner-container {
    background: #fafafa;
    width: 100%;
  }

  .minerList {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
  }

  .miner-category li {
    float: left;
    height: 31px;
    color: #969699;
    font-size: 20px;
    margin-right: 40px;
    cursor: pointer;
    transition: color ease .3s;
    &.active {
      color: #303137;
      border-bottom: 3px solid #303137;
      padding-bottom: 5px;
      font-weight: bold;
    }
  }

  .miner-product-list {
    margin-top: 30px;
    li {
      width: 570px;
      overflow: auto;
      position: relative;
      margin-right: 60px;
      background: #fff;
      float: left;
      margin-bottom: 60px;
      cursor: pointer;
      transition: all .2s;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover,
      &:focus {
        box-shadow: 0 0 10px 0px #ccc;
      }
    }
  }

  .product-label {
    position: absolute;
    top: 0;
    left: 0;
    // width: 86px;
    // height: 30px;
    // &.weikaishou {
    //     background: url("../../assets/images/weikaishou_normal.png") no-repeat;
    //     background-size: 86px 30px;
    // }
    // &.xinshangjia {
    //   background: url("../../assets/images/xinshangjia_bg@2x.png") no-repeat;
    //   background-size: 36px 36px;
    // }
    // &.yijieshu {
    //   background: url("../../assets/images/yijieshu_bg@2x.png") no-repeat;
    //   background-size: 36px 36px;
    // }
    // &.yishouqing {
    //   background: url("../../assets/images/yishouqin_normal.png") no-repeat;
    //   background-size: 86px 30px;
    // }
  }

  .product-img {
    text-align: center;
    img {
      display: block;
      width: 570px;
      height: 397px;
      vertical-align: middle;
    }
  }

  .procuct-name {
    margin-top: 25px;
    line-height: 31px;
    span:first-child {
      font-size: 24px;
      color: #333333;
      font-weight: bold;
      margin-right: 20px;
      vertical-align: middle;
    }
    span:last-child {
      font-size: 14px;
      color: #151515;
      border: 1px solid #E0E0E0;
      border-radius: 2px;
      padding: 5px 10px;
      vertical-align: middle;
    }
  }

  .product-detail-container {
    padding: 0 40px 38px;
  }

  .product-detail {
    margin: 10px 0 15px;
  }

  .product-detail, .product-delivery {
    margin-bottom: 10px;
    font-size: 14px;
    color: #999;
  }

  .product-discount {
    min-height: 20px;
    span.activityTitle {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
    span:first-child {
      margin-right: 40px;
    }
    font-size: 14px;
    color: #303137;
    font-weight: bold;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .product-count {
    margin-top: 30px;
  }

  .product-count .left {
    p:first-child:last-child {
      line-height: 45px;
    }

    .sale-price {
      font-size: 24px;
      color: #FD7220;
    }
    .original-cost {
      font-size: 14px;
      color: #999999;
    }
    .decoration {
      text-decoration: line-through;
    }
  }

  .product-count button {
    margin-top: 5px;
    min-width: 164px;
    &.is-disabled {
      cursor: pointer;
      background: #969699;
      &:hover {
        background: #999999;
      }
    }
  }

  .no-data {
    text-align: center;
    color: #969699;
    padding: 200px 0;
    img {
      width: 120px;
      margin-bottom: 30px;
    }
  }

  #priceWei {
    font-size: 14px;
    color: #FD7220;
    padding-left: 3px;
  }

</style>
