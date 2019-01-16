<template>
  <div class="container clearfix news-page">
    <div class="news left">
      <header>
        <h2>{{articleInfo.title}}</h2>
        <time>{{articleInfo.createTime | date('YYYY-MM-DD HH:mm')}}</time>
      </header>
      <article class="article-content" v-html="articleInfo.content"></article>
      <footer>
        <ul class="key-words clearfix">
          <li v-for="item in articleInfo.keyWords" :key="item.id">
            <nuxt-link :to="{path: '/tag/'+item.id + '.html'}">
              {{item.name}}
            </nuxt-link>
          </li>
        </ul>
        <dl class="origin-info clearfix">
          <dt>声明</dt>
          <dd>算立方登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考，不构成投资建议。投资者据此操作，风险自担。</dd>
        </dl>
      </footer>
    </div>
    <div class="right hot-product" v-if="type == 1"
         @click="$router.push('/product/detail?pId='+productInfo.batchGoodsId)">
      <svg v-if="labelText(productInfo)" class="product-label" width="85.5" height="30"
           xmlns="http://www.w3.org/2000/svg">
        <path :fill="productInfo.status | type" d="M0 0h85.5l-30 30H0z"></path>
        <text x="10" y="20" fill="#fff" font-size="14">{{labelText(productInfo)}}</text>
      </svg>
      <!--<svg class="product-label" width="85.5" height="30" xmlns="http://www.w3.org/2000/svg">-->
      <!--<path fill="#4D87EA" d="M0 0h85.5l-30 30H0z"></path>-->
      <!--<text x="10" y="20" fill="#fff" font-size="14">新上架</text>-->
      <!--</svg>-->
      <div class="product-img">
        <img :src="productInfo.imageUrl" :alt="productInfo.goodsName" :title="productInfo.goodsName">
      </div>
      <div class="product-info">
        <p class="product-name">
          <strong>{{productInfo.goodsName}}</strong>
          <span class="pro-tag" v-if="productInfo.categoryName">{{productInfo.categoryName}}</span>
        </p>
        <p class="product-detail">{{productInfo.goodsSubTitle}}</p>
        <div class="product-discount clearfix" v-if="productInfo.goodsActivityList">
          <ul>
            <li v-for="(act,index) in productInfo.goodsActivityList" :key="index">
              <i>{{act.activityType === 2 ? '邀' : '促'}}</i>{{act.title}}
            </li>
          </ul>
        </div>
        <div class="clearfix product-price">
          <div class="left">
            <p class="price" v-if="isShowSalePrice(productInfo)">
              <!--<strong>¥2000.00</strong>/T-->
              <strong v-if="productInfo.status===1">¥{{productInfo.goodSalePrice | currency}}</strong>
              <strong v-else>{{productInfo.status === 2 ? '' : '¥'}}{{productInfo.goodSalePrice}}</strong>
            </p>
            <del class="old-price" v-if="productInfo.goodsPrice">原价：{{productInfo.goodsPrice | currency}}元</del>
            <p class="old-price" v-else>矿机售价</p>
          </div>
          <div class="right">
            <el-button type="primary" :class="{'is-disabled':productInfo.status!==0&&productInfo.status!==1}">
              {{btnText(productInfo)}}
            </el-button>
            <p>发货时间：{{productInfo.startSendTime | date('YYYY-MM-DD')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right hot-product" v-else @click="$router.push('/hash/detail?goodsId='+productInfo.id)">
      <svg width="85.5px" height="30px" viewbox="0,0,85.5,30" version="1.1" xmlns="http://www.w3.org/2000/svg"
           class="product-label">
        <title>common_shopping</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g>
          <g fill="#4D87EA" fill-rule="nonzero" v-if="productInfo.tag===2&&productInfo.status===1">
            <polygon points="0,0 85.5,0 55.5,30 0,30" style="border-top-right-radius: 2px;"></polygon>
          </g>
          <g :fill="productInfo.status | type2" fill-rule="nonzero" v-else>
            <polygon points="0,0 85.5,0 55.5,30 0,30" style="border-top-right-radius: 2px;"></polygon>
          </g>
          <text x="10" y="20" style="fill:#fff;font-size:14px" v-if="productInfo.tag===2&&productInfo.status===1">
            新上架
          </text>
          <text x="10" y="20" style="fill:#fff;font-size:14px" v-else>
            {{productInfo.status | text2}}
          </text>
        </g>
      </svg>
      <!--<svg class="product-label" width="85.5" height="30" xmlns="http://www.w3.org/2000/svg">-->
      <!--<path fill="#4D87EA" d="M0 0h85.5l-30 30H0z"></path>-->
      <!--<text x="10" y="20" fill="#fff" font-size="14">新上架</text>-->
      <!--</svg>-->
      <div class="product-info">
        <p class="product-name">
          <strong>{{productInfo.gName}}</strong>
          <span class="pro-tag">{{productInfo.currency}}算力</span>
        </p>
        <p class="product-detail">{{productInfo.gTitle}}</p>
        <div class="product-discount clearfix" v-if="productInfo.goodsActivityList">
          <ul>
            <li v-for="(act,index) in productInfo.goodsActivityList" :key="index">
              <i>{{act.activityType === 2 ? '邀' : '促'}}</i>{{act.title}}
            </li>
          </ul>
        </div>
        <div class="product-progress">
          <div class="progress"><span :style="{'width':productInfo.percent}"></span></div>
          <p>剩余算力：{{productInfo.surplusCube}} {{productInfo.computingUnit}}</p>
        </div>
        <div class="clearfix product-price">
          <div class="left">
            <p class="price" v-if="isShowSalePrice2(productInfo)">
              <strong>{{productInfo.status === 2 ? '' : '￥'}}{{productInfo.salePrice}}</strong>
              <span v-if="productInfo.status!==2">/{{productInfo.computingUnit}}</span>
            </p>
            <del class="old-price" v-if="productInfo.price">原价：{{productInfo.price}}元</del>
            <p class="old-price" v-else>云算力售价</p>
          </div>
          <div class="right">
            <el-button type="primary">
              <span v-if="productInfo.status===1">立即购买</span>
              <span v-else-if="productInfo.status===0">{{productInfo.openSaleTime | date('MM月DD日 HH:mm') }}开售</span>
              <span v-else>查看合约</span>
            </el-button>
            <!--<p>发货时间：2018-05-26</p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ArticleAPI from '../../services/article-api';
  import dateFilter from '../../utils/filters/date-filter';

  export default {
    head() {
      let keywords = [];
      (this.articleInfo.keyWords || []).forEach(word => {
        keywords.push(word.keyWords);
      });
      return {
        title: this.articleInfo.title, // set a title
        meta: [
          {                 // set meta
            hid: 'keywords',
            name: 'keywords',
            content: keywords.join()
          },
          {
            hid: 'description',
            name: 'description',
            content: this.articleInfo.digest
          }
        ]
      };
    },
    asyncData({route, error}) {
      let data = {
        articleInfo: {},
        productInfo: {},
        //（1-矿机;2-算力）
        type: 0
      };
      if (!route.params.id) {
        return error({statusCode: 404, message: 'Page Not Found'});
      }
      return ArticleAPI.getInfo(route.params.id.split('.')[0])
        .then(res => {
          data.articleInfo = res;
          return ArticleAPI.getGoodsInfo(res.type);
        })
        .then(res => {
          data.type = res.flag;
          (res.goodsActivityList || []).sort((a, b) => a.activityType - b.activityType);
          data.productInfo = res;
          return data;
        })
        .catch(() => {
          error({statusCode: 404, message: 'Page Not Found'});
        });
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
      text2(value) {
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
      },
      type2(value) {
        switch (value) {
          case 0:
          case 3:
            return '#FFBB1A';
          case 1:
            return '#fff';
          default:
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
      isShowSalePrice2(item) {
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSaleType !== 1;
        } else {
          return item.soldOutType !== 1;
        }
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
      }
    }
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    padding: 50px 0 80px;
    color: #303137;
  }

  .news {
    width: 758px;
    header {
      margin-bottom: 30px;
      h2 {
        font-size: 28px;
        line-height: 40px;
      }
      time {
        font-size: 12px;
        color: #999999;
      }
    }
    article {
      margin-bottom: 60px;
      img {
        max-width: 100%;
      }
    }
  }

  .hot-product {
    width: 392px;
    cursor: pointer;
    /*min-height: 390px;*/
    background: #FFFFFF;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
    position: relative;
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.24);
    }
  }

  .key-words li > a {
    margin-right: 20px;
    float: left;
    border: 1px solid #DDDDDD;
    border-radius: 100px;
    text-align: center;
    line-height: 40px;
    padding: 0 30px;
    margin-bottom: 60px;
  }

  .origin-info {
    background: #FAFAFA;
    padding: 20px 30px;

    dt {
      width: 71px;
      float: left;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: #999999;
      letter-spacing: -0.18px;
    }
    dd {
      float: left;
      width: calc(100% - 71px);
      padding: 0;
      margin: 0 0 10px;
      font-size: 14px;
      color: #303137;
      letter-spacing: -0.18px;
      line-height: 20px;
    }
  }

  .product-label {
    position: absolute;
    left: 0;
    top: 0;
  }

  .product-img img {
    width: 100%;
    display: block;
  }

  .product-info {
    padding: 45px 20px 30px;
    .product-name {
      font-size: 24px;
      line-height: 32px;
      color: #333333;
      margin-bottom: 10px;
      .pro-tag {
        display: inline-block;
        border: 1px solid #E0E0E0;
        border-radius: 2px;
        margin-left: 10px;
        font-size: 14px;
        color: #151515;
        letter-spacing: 0.1px;
        padding: 0 15px;
        height: 27px;
        line-height: 25px;
        vertical-align: text-bottom;
      }
    }
    .product-detail {
      font-size: 14px;
      color: #606166;
      line-height: 19px;
      margin-bottom: 20px;
    }
    .product-discount {
      font-size: 14px;
      color: #606166;
      margin-bottom: 30px;
      li {
        float: left;
        margin-left: 20px;
        line-height: 16px;
        &:first-child {
          margin-left: 0;
        }
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #FFDFE0;
          border: 1px solid #D7282D;
          border-radius: 2px;
          font-size: 12px;
          text-align: center;
          line-height: 14px;
          font-style: normal;
          color: #D7282D;
          margin-right: 6px;
          vertical-align: bottom;
        }
      }
    }
    .product-progress {
      margin-bottom: 38px;
      .progress {
        background: #EAEAEA;
        border-radius: 100px;
        height: 10px;
        margin-bottom: 6px;
        overflow: hidden;
        span {
          width: 50%;
          height: 100%;
          display: block;
          background: #D5AA6D;
        }
      }
      p {
        font-size: 14px;
        color: #D5AA6D;
        line-height: 19px;
      }
    }
    .product-price {
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
        .el-button {
          margin-bottom: 6px;
        }
        p {
          font-size: 12px;
          color: #999999;
          line-height: 14px;
        }
      }
      .price {
        line-height: 40px;
        height: 40px;
        color: #333;
        font-size: 14px;
        margin-bottom: 6px;
        strong {
          font-size: 28px;
          color: #FD7220;
        }
      }
      .old-price {
        font-size: 12px;
        color: #999999;
        line-height: 14px;
        display: block;
      }
    }
  }

</style>
<style>
  .news-page .article-content img {
    max-width: 100%;
  }
  .news-page .article-content{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #303137;
    letter-spacing: 0;
    line-height: 28px;
  }
</style>
