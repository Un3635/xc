<template>
  <div class="hash">
    <header v-if="bannerList.length>0">
      <x-banner :banner-list="bannerList"/>
    </header>
    <div class="category">
      <ul class="category-list">
        <li v-for="item in currencyTypeList" :key="item.id" @click="changeNav(item.currencyName)"
            :class="{'active':item.currencyName===currencyName}">{{item._label}}
        </li>
      </ul>
    </div>
    <div class="hash-container">
      <ul class="shop-mill-list">
        <li class="clearfix" v-for="(item,index) in goodsList" :key="index"
            @click="$router.push('/hash/detail?goodsId='+item.id)">
          <div class="mill-title">
            <span>{{item.gName}}</span>
            <span>{{item.currency}}算力</span>
          </div>
          <div class="mill-tip">
            {{item.gTitle}}
          </div>
          <div class="clearfix mill-detail">
            <div class="left mill-jia">
              <p>
                <span class="mill-price" v-if="isShowSalePrice(item)">
                  {{item.status === 2 ? '' : '￥'}}{{item.salePrice}}<span
                  v-if="item.status!==2">/{{item.computingUnit}}</span>
                </span>
              </p>
              <p>
                <span class="mill-origin" v-if="item.price&&item.status<2">原价：{{item.price}}</span>
                <span v-else>云算力售价</span>
              </p>
            </div>
            <div class="left mill-activity">
              <p v-if="item.goodsActivityList" v-for="(obj,index) in item.goodsActivityList" :key="index">
                <img src="../../assets/images/cu.svg" alt="" v-if="obj.activityType===1">
                <img src="../../assets/images/yao.svg" alt="" v-if="obj.activityType===2">
                <span>{{obj.title}}{{obj.activityType===2?'/'+item.computingUnit:''}}</span>
              </p>
            </div>
            <div class="left mill-calc">
              <p>
                  <span class="mill-percent"
                        :class="{'active':item.percent!=='0.00%'}">
                剩余算力：{{item.surplusCube}} {{item.computingUnit}}
              </span>
              </p>
              <p>
                <span class="mill-process">
                <span class="mill-process-num" :style="{'width':item.percent}"></span>
              </span>
              </p>
            </div>
            <div class="right mill-btn">
              <el-button type="primary" class="btn" @click="$router.push('/hash/detail?goodsId='+item.id)">
                <span v-if="item.status===1">立即购买</span>
                <span v-else-if="item.status===0">{{item.openSaleTime | date('MM月DD日 HH:mm') }}开售</span>
                <span v-else>查看合约</span>
              </el-button>
            </div>
          </div>
          <!--<div class="mill-pay clearfix">-->
          <!--<div class="mill-item first clearfix">-->
          <!--<span class="mill-price">-->
          <!--<span v-if="isShowSalePrice(item)">-->
          <!--<span>￥{{item.salePrice}}</span>/{{item.computingUnit}}-->
          <!--</span>-->
          <!--</span>-->
          <!--<span class="mill-discount">-->
          <!--<span v-if="item.goodsActivityList&&obj.activityType===1"-->
          <!--v-for="obj,index in item.goodsActivityList" :key="index">-->
          <!--<img src="../../assets/images/cu.svg" alt="">-->
          <!--{{obj.title}}-->
          <!--</span>-->
          <!--</span>-->
          <!--<span class="mill-percent"-->
          <!--:class="{'active':item.percent!=='0.00%'}">-->
          <!--剩余算力：{{item.surplusCube}} {{item.computingUnit}}-->
          <!--</span>-->
          <!--</div>-->
          <!--<div class="mill-item second clearfix">-->
          <!--<span class="mill-price origin">-->
          <!--<span v-if="item.price">原价：{{item.price}}</span>-->
          <!--</span>-->
          <!--<span class="mill-discount">-->
          <!--<span v-if="item.goodsActivityList&&obj.activityType===2"-->
          <!--v-for="obj,index in item.goodsActivityList" :key="index">-->
          <!--<img src="../../assets/images/yao.svg" alt="">-->
          <!--{{obj.title}}-->
          <!--</span>-->
          <!--</span>-->
          <!--<span class="mill-process">-->
          <!--<span class="mill-process-num" :style="{'width':item.percent}"></span>-->
          <!--</span>-->
          <!--</div>-->
          <!--<el-button type="primary" class="btn" @click="$router.push('/hash/detail?goodsId='+item.id)">-->
          <!--<span v-if="item.status===1">立即购买</span>-->
          <!--<span v-else-if="item.status===0">{{item.openSaleTime | date('MM月DD日 HH:mm') }}开售</span>-->
          <!--<span v-else>查看合约</span>-->
          <!--</el-button>-->
          <!--</div>-->
          <svg width="85.5px" height="30px" viewbox="0,0,85.5,30" version="1.1" xmlns="http://www.w3.org/2000/svg"
               class="svg-tip">
            <title>common_shopping</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g>
              <g fill="#4D87EA" fill-rule="nonzero" v-if="item.tag===2&&item.status===1">
                <polygon points="0,0 85.5,0 55.5,30 0,30" style="border-top-right-radius: 2px;"></polygon>
              </g>
              <g :fill="item.status | type" fill-rule="nonzero" v-else>
                <polygon points="0,0 85.5,0 55.5,30 0,30" style="border-top-right-radius: 2px;"></polygon>
              </g>
              <text x="10" y="20" style="fill:#fff;font-size:14px" v-if="item.tag===2&&item.status===1">
                新上架
              </text>
              <text x="10" y="20" style="fill:#fff;font-size:14px" v-else>
                {{item.status | text}}
              </text>
            </g>
          </svg>
        </li>
      </ul>
      <div v-if="goodsList.length<1" class="no-data">
        <img src="../../assets/images/compute-contract.png" alt="">
        <p>暂无云算力在售</p>
      </div>
    </div>
    <x-features class="features"/>
  </div>
</template>

<script>
  // import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import XFeatures from '../../components/x-features-powershop';
  import PowerApi from '../../services/power-api';
  import HomeAPI from '../../services/home-api';
  import XBanner from '../../components/x-banner';

  export default {
    head: {
      title: '云算力_云算力购买平台_算立方', // set a title
      meta: [
        {
          hid: 'keywords',// set meta
          name: 'keywords',
          content: '算力出租,算力交易,云算力租赁'
        },
        {
          hid: 'description',
          name: 'description',
          content: '算立方提供性价比最高的算力交易，算力租赁业务，一站式算力租赁首选。'
        }
      ]
    },
    components: {
      XBanner,
      XFeatures
      // swiper,
      // swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    data() {
      return {
        goodsList: [],
        currencyTypeList: [],
        currencyName: '',
        locale: [1, 2, 3],
        goodActivityList: [],
        bannerList: []
      };
    },
    filters: {
      type(value) {
        switch (value) {
          case 0:
          case 3:
            return '#FFBB1A';
          case 1:
            return '#fff';
          default:
            return '#98999B';
        }
      },
      text(value) {
        if (value === 0) {
          return '未开售';
        } else if (value === 2) {
          return '已售罄 ';
        } else if (value === -1) {
          return '已下架';
        } else if (value === 4) {
          return '已结束';
        } else if (value === 3) {
          return '未开售';
        }
      }
    },
    methods: {
      initPage() {
        HomeAPI.bannerList(2)
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            this.bannerList = res;
          });
      },
      isShowSalePrice(item) {
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSaleType !== 1;
        } else {
          return item.soldOutType !== 1;
        }
      },
      getCurrencyList() {
        PowerApi.currencyTypeList()
          .then(res => res.result || [])
          .then(res => {
            res.forEach(item => {
              item._label = item.currencyName + '算力';
            });
            res.unshift({
              currencyId: '',
              currencyName: '',
              _label: '全部算力'
            });
            this.currencyTypeList = res;
          });
      },
      jyGoodsList() {
        PowerApi.jyGoodsList(this.currencyName)
          .then(JSON.parse)
          .then(res => {
            this.goodsList = res;
            res.forEach(item => {
              if (item.goodsActivityList && item.goodsActivityList.length > 0) {
                item.goodsActivityList.sort((a, b) => a.activityType - b.activityType);
              }
            });
          });
      },
      changeNav(currencyName) {
        if (currencyName === '') {
          this.$router.replace('/hash');
        } else {
          this.$router.replace('/hash/' + currencyName);
        }
      }
    },
    mounted() {
      this.currencyName = (this.$route.params.currencyName || '').toUpperCase();
      this.initPage();
      this.getCurrencyList();
      this.jyGoodsList();
    },
    watch: {
      $route(to, from) {
        this.currencyName = (to.params.currencyName || '').toUpperCase();
        this.getCurrencyList();
        this.jyGoodsList();
      }
    }
  };
</script>

<style scoped lang="scss">
  /*@import "../../assets/style/reset.scss";*/
  .hash {
    background: #F5F6F5;
  }

  .features {
    margin-top: 50px;
  }

  .category {
    padding-top: 50px;
    margin: 0px auto 20px;
    padding-bottom: 5px;
    max-width: 1200px;
  }

  .category-list {
    font-size: 0;
    li {
      margin-left: 40px;
      display: inline-block;
      font-size: 20px;
      color: #969699;
      line-height: 30px;
      cursor: pointer;
      transition: color ease .3s;
      text-align: center;
      border-bottom: 3px solid transparent;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: #303137;
        border-bottom-color: #303137;
        font-weight: bold;
      }
    }
  }

  .hash-container {
    width: 1200px;
    margin: 0 auto;
  }

  .shop-mill-list {
    width: 1200px;
    margin: 0 auto;
    li {
      position: relative;
      background-color: #fff;
      padding: 40px;
      margin-bottom: 30px;
      transition: all .2s;
      cursor: pointer;

      &:hover,
      &:focus {
        box-shadow: 0 0 20px 0 #ccc;
      }

      .svg-tip {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  .mill-title {
    font-size: 24px;
    color: #333333;
    > span:first-child {
      font-weight: bold;
      vertical-align: middle;
    }
    > span:last-child {
      display: inline-block;
      border: 1px solid #E0E0E0;
      border-radius: 2px;
      font-size: 14px;
      color: #151515;
      padding: 5px 10px;
      vertical-align: middle;
      margin-left: 20px;
    }
  }

  .mill-pay {
    position: relative;
  }

  .mill-tip {
    font-size: 14px;
    color: #999999;
    margin: 14px 0 32px;
  }

  .mill-detail {
    > div {
      p:first-child {
        margin-bottom: 10px;
      }
    }
    > div.mill-calc {
      p:first-child {
        margin-bottom: 15px;
      }
    }
  }

  .mill-jia {
    min-width: 267px;
  }

  .mill-item > span {
    display: inline-block;
    vertical-align: middle;
  }

  .mill-item.first {
    margin-bottom: 10px;
    height: 39px;
    line-height: 39px;
  }

  .mill-price {
    font-size: 34px;
    color: #FD7220;
    span {
      font-size: 14px;
      color: #000019;
    }
  }

  .mill-origin {
    color: #333;
    font-size: 16px;
    text-decoration: line-through;
  }

  .mill-activity {
    min-width: 275px;
    min-height: 40px;
    padding-top: 10px;
    img, span {
      vertical-align: middle;
    }
    img {
      margin-right: 10px;
    }
  }

  .mill-btn {
    padding-top: 10px;
  }

  .mill-calc {
    padding-top: 10px;
  }

  .mill-discount {
    min-width: 275px;
    font-size: 14px;
    color: #303137;
    img {
      vertical-align: middle;
      margin-right: 14px;
    }
  }

  .mill-pay .btn {
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    right: 0;
    bottom: 10px;
  }

  .mill-percent {
    font-size: 14px;
    color: #969699;
    &.active {
      color: #D5AA6D;
    }
  }

  .mill-process {
    display: inline-block;
    width: 350px;
    height: 10px;
    background: #EAEAEA;
    border-radius: 4px;
    position: relative;
    .mill-process-num {
      position: absolute;
      top: 0;
      display: inline-block;
      border-radius: 4px;
      width: 20%;
      height: 100%;
      background-image: linear-gradient(90deg, #F2D291 0%, #FFE6A1 100%)
    }
  }

  .no-data {
    padding: 200px 0;
    text-align: center;
    color: #969699;
    img {
      width: 120px;
      margin-bottom: 30px;
    }
  }
</style>
