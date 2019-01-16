<template>
  <div class="miner-container">
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <section class="minerList">
      <ul class="miner-category clearfix">
        <li v-for="item in categoryList" :key="item.id" :class="{'active':item.id==categoryId}"
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
          <div class="product-img">
            <img :src="item.imageUrl" :alt="item.goodsName"></div>
          <div class="product-detail-container">
            <p class="procuct-name">
              <span>{{item.goodsName}}</span>
              <span>{{item.categoryName}}</span>
            </p>
            <p class="product-detail">{{item.goodsSubTitle}}</p>
            <p class="product-delivery">发货时间：{{item.startSendTime | date('YYYY-MM-DD')}}</p>
            <p class="product-discount">
              <span v-for="(act,index) in item.goodsActivityList" :key="index">
                <img src="../../assets/images/yao.svg" alt="" v-if="act.activityType===2">
                <img src="../../assets/images/cu.svg" alt="" v-if="act.activityType===1">
                <span class="activityTitle">{{act.title}}{{act.activityType===2?'/台':''}}</span>
              </span>
            </p>
            <div class="product-count clearfix">
              <div class="left">

                <p v-if="isShowSalePrice(item)" class="sale-price">
                  <span v-if="item.status===1">¥{{item.goodSalePrice | currency}}</span>
                  <span v-else>{{item.status===2?'':'¥'}}{{item.goodSalePrice}}</span>
                </p>
                <p class="original-cost">
                  <span v-if="item.goodsPrice&&item.status<2"
                        class="decoration">原价：{{item.goodsPrice | currency}}元</span>
                  <span v-else>矿机售价</span>
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
        <p>暂无矿机在售</p>
      </div>
    </section>
    <x-features-powershop/>
  </div>
</template>

<script>
  import ProductAPI from '../../services/product-api';
  import XFeaturesPowershop from '../../components/x-features-powershop';
  import dateFilter from '../../utils/filters/date-filter';
  import HomeAPI from '../../services/home-api';
  import XBanner from '../../components/x-banner';

  export default {
    components: {XBanner, XFeaturesPowershop},
    head: {
      title: '矿机商城_挖矿机设备销售-算立方', // set a title
      meta: [
        {                 // set meta
          hid: 'keywords',
          name: 'keywords',
          content: '比特币矿机,莱特币矿机,矿机商城,阿瓦隆矿机,蚂蚁矿机,宙斯矿机,花园矿机,龙矿矿机,雪豹矿机'
        },
        {
          hid: 'description',
          name: 'description',
          content: '算立方提供性价比最高的比特币等数字货币挖矿机设备销售，一站式挖矿首选。'
        }
      ]
    },
    data() {
      return {
        nav: '',
        categoryId: '',
        type: '',
        pageNum: 1,
        pageSize: 100,
        categoryList: [],
        productList: [],
        bannerList: []
      };
    },
    filters: {
      text(val) {
        switch (val) {
          case 0:
            return '未开售';
          case 1:
            return '出售中';
          case 2:
            return '已售罄';
          case 3:
            return '已结束';
          case -1:
            return '已下架';
        }
      },
      type(value) {
        if (value === 0) {
          return '#98999B';
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
            return '未开售';
          case 1:
            return item.tag === 2 ? '新上架' : '';
          case 2:
            return '已售罄';
          case 3:
            return '已结束';
          case -1:
            return '已下架';
        }
      },
      isShowSalePrice(item) {
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSalePriceType !== 1;
        } else {
          return item.soldOutPriceType !== 1;
        }
      },
      initPage() {
        HomeAPI.bannerList(3)
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.bannerList = res;
          });
      },
      loadProductCategory() {
        ProductAPI.getGoodsCategoryList()
          .then(res => res.result || [])
          .then(res => {
            res.unshift({id: '', categoryName: '全部矿机'});
            this.categoryList = res;
            this.categoryId = this.$route.query.categoryId || (res[0] || {}).id;
          })
          .catch(() => {
          });
      },
      getGoodsList() {
        ProductAPI.getProductsList(this.categoryId, this.pageNum, this.pageSize, 0)
          .then(res => res.list || [])
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
            return dateFilter(saleTime, 'M月DD日HH:mm开售');
          case 1: // 出售中
            return '立即购买';
          case 2: // 已售罄
            return '已售罄';
          case 3: // 已结束
            return '已结束';
          case -1: // 已下架
            return '已下架';
        }
      },
      changeTab(id) {
        this.categoryId = id;
        // this.$route.query.categoryId = id;
        if (id === '') {
          this.$router.replace('/product');
        } else {
          this.$router.replace('/product?categoryId=' + id);
        }
      }
    },
    mounted() {
      this.initPage();
      this.loadProductCategory();
    },
    watch: {
      categoryId: {
        handler() {
          this.getGoodsList();
        },
        immediate: true
      },
      $route(to) {
        this.categoryId = to.query.categoryId || '';
      }
    }
  };
</script>

<style scoped lang="scss">
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
      margin-right: 35px;
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
</style>
