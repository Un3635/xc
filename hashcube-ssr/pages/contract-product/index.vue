<template>
  <div class="contract-product">
    <div class="i-item1">
      <div class="inner-banner container">
        <img src="../../assets/images/c-p2/banner@2x.png" alt="">
        <h2 class="p-title w450"><p><span class="l-icon"></span>ETH币盈计划<span class="r-icon"></span></p></h2>
        <div class="plan">
          <div class="clearfix">
            <div class="left">
              <img class="plan-t" src="../../assets/images/c-p2/1@2x.png" alt="">
              <p>那么！1年产币收益您独享，可<span>100%</span>提出实际挖币量</p>
            </div>
            <div class="right">
              <img class="plan-i" src="../../assets/images/c-p2/2@2x.png" alt="">
            </div>
          </div>
          <div class="clearfix">
            <div class="left">
              <img class="plan-i" src="../../assets/images/c-p2/3@2x.png" alt="">
            </div>
            <div class="right">
              <img class="plan-t" src="../../assets/images/c-p2/4@2x.png" alt="">
              <p>别怕！币值不抵购买价，合约结束时可选择返<span>70%</span>购买成本</p>
            </div>
          </div>
        </div>
        <ul class="c-list clearfix">
          <li class="left">
            <div>
              <img src="../../assets/images/c-p2/5@2x.png" alt="">
            </div>
            <strong>无限收益</strong>
            <p>2018年初ETH币价破万<br>未来上涨空间巨大</p>
          </li>
          <li class="left">
            <div>
              <img src="../../assets/images/c-p2/6@2x.png" alt="">
            </div>
            <strong>风险保障</strong>
            <p>合约到期未实现盈利<br>放弃提币，可返70%购买成本</p>
          </li>
          <li class="left">
            <div>
              <img src="../../assets/images/c-p2/7@2x.png" alt="">
            </div>
            <strong>收益透明</strong>
            <p>个人收益实时查询<br>合约产币全程透明</p>
          </li>
          <li class="left">
            <div>
              <img src="../../assets/images/c-p2/8@2x.png" alt="">
            </div>
            <strong>国际平台</strong>
            <p>全流程专业矿机运维<br>算立方一站式矿机服务</p>
          </li>
        </ul>
        <!--<div class="p-info" v-for="(product,index) in productList" :key="index">-->
        <!--<h3 class="line-title">-->
        <!--<p><span class="l-line"></span>剩余份数&nbsp;&nbsp;&nbsp;{{product.surplusNum | currency('', 0)}}份<span-->
        <!--class="r-line"></span></p>-->
        <!--</h3>-->
        <!--<div class="p-detail clearfix">-->
        <!--<div class="p-img left">-->
        <!--<img :src="product.imageUrl" :alt="product.goodsName">-->
        <!--</div>-->
        <!--<div class="p-sale-info left">-->
        <!--<header>-->
        <!--<strong>{{product.goodsName}}</strong>-->
        <!--<p>{{product.goodsSubTitle}}</p>-->
        <!--</header>-->
        <!--<div class="p-info-list">-->
        <!--<ul>-->
        <!--<li class="clearfix" v-if="isShowSalePrice(product)">-->
        <!--<span class="left l-n">单价</span>-->
        <!--<p class="left o-c" v-if="product.status===1">{{product.goodSalePrice | currency}}元</p>-->
        <!--<p class="left o-c" v-else>{{product.goodSalePrice}}元</p>-->
        <!--</li>-->
        <!--<li class="clearfix">-->
        <!--<span class="left l-n">交割日期</span>-->
        <!--<p class="left">{{product.trustStartTime | date('YYYY-MM-DD')}}</p>-->
        <!--</li>-->
        <!--<li class="clearfix">-->
        <!--<span class="left l-n">剩余</span>-->
        <!--<p class="left">{{product.surplusNum | currency('', 0)}}份</p>-->
        <!--</li>-->
        <!--<li class="clearfix select-num">-->
        <!--<span class="left l-n">购买</span>-->
        <!--<div class="left">-->
        <!--<el-input-number :min="product._limit.min||1" :max="product._limit.max" class="c-p-num"-->
        <!--v-model="product.count"/>-->
        <!--<span class="limit">份</span>-->
        <!--<span>-->
        <!--<span class="tip" v-if="product.buyLimit>0">{{product.buyLimit}}份起购</span>-->
        <!--<span class="tip" v-if="product.buyLimit>0&&product.orderLimit>0">,</span>-->
        <!--<span class="tip" v-if="product.orderLimit>0">每笔限购{{product.orderLimit}}份</span>-->
        <!--<span class="tip"-->
        <!--v-if="(product.buyLimit>0||product.orderLimit>0)&&product.userLimit>0">,</span>-->
        <!--<span class="tip" v-if="product.userLimit>0">每人限购{{product.userLimit}}份</span>-->
        <!--</span>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li class="clearfix">-->
        <!--<span class="left l-n">实付</span>-->
        <!--<p class="left price o-c" v-if="product.status === 1">-->
        <!--{{(product.goodSalePrice * product.count) | currency}}元</p>-->
        <!--<p class="left price o-c" v-else>&#45;&#45;</p>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="btn-group">-->
        <!--<button class="buy" :disabled="product.status !== 1" @click="submitOrder(product)">-->
        <!--{{btnText(product)}}-->
        <!--</button>-->
        <!--<button class="go-detail"-->
        <!--@click="$router.push('/product/detail?pId='+product.batchGoodsId+'&source=contract-product')">-->
        <!--查看详情-->
        <!--</button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>

    <div class="p-info" v-for="(product,index) in productList" :key="index">
      <h2 class="p-title w430"><p><span class="l-icon"></span>首批限量1000份<span
        class="r-icon"></span></p></h2>
      <div class="p-detail clearfix">
        <div class="p-img left">
          <span class="by-plan"></span>
          <img :src="product.imageUrl" :alt="product.goodsName">
        </div>
        <div class="p-sale-info left">
          <header>
            <strong>{{product.goodsName}}</strong>
          </header>
          <div class="p-info-list">
            <ul>
              <li class="clearfix" v-if="isShowSalePrice(product)">
                <span class="left l-n">单价</span>
                <p class="left o-c" v-if="product.status===1">{{product.goodSalePrice | currency}}元</p>
                <p class="left o-c" v-else>{{product.goodSalePrice}}元</p>
              </li>
              <li class="clearfix">
                <span class="left l-n">交割日期</span>
                <p class="left">{{product.trustStartTime | date('YYYY-MM-DD')}}</p>
              </li>
              <li class="clearfix">
                <span class="left l-n">剩余</span>
                <p class="left" v-if="product.status != 2">{{product.surplusNum | currency('', 0)}}份</p>
                <p class="left" v-else>0份</p>
              </li>
              <li class="clearfix select-num">
                <span class="left l-n">购买</span>
                <div class="left">
                  <el-input-number :min="product._limit.min||1" :max="product._limit.max" class="c-p-num"
                                   v-model="product.count"/>
                  <span class="limit">份</span>
                  <span>
                        <span class="tip" v-if="product.buyLimit>0">{{product.buyLimit}}份起购</span>
                        <span class="tip" v-if="product.buyLimit>0&&product.orderLimit>0">,</span>
                        <span class="tip" v-if="product.orderLimit>0">每笔限购{{product.orderLimit}}份</span>
                        <span class="tip"
                              v-if="(product.buyLimit>0||product.orderLimit>0)&&product.userLimit>0">,</span>
                        <span class="tip" v-if="product.userLimit>0">每人限购{{product.userLimit}}份</span>
                      </span>
                </div>
              </li>
              <li class="clearfix">
                <span class="left l-n">实付</span>
                <p class="left price o-c" v-if="product.status === 1">
                  {{(product.goodSalePrice * product.count) | currency}}元</p>
                <p class="left price o-c" v-else>--</p>
              </li>
            </ul>
          </div>
          <div class="btn-group">
            <button class="buy" :disabled="product.status !== 1" @click="submitOrder(product)">
              {{btnText(product)}}
            </button>
            <button class="go-detail"
                    @click="$router.push('/product/detail?pId='+product.batchGoodsId+'&source=contract-product')">
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="i-item2">
      <div class="inner-i-item2">
        <h2 class="p-title w310"><p><span class="l-icon"></span>ETH币盈计划 VS 传统矿机购买<span class="r-icon"></span></p></h2>
        <p>签购ETH币盈计划  您将享受到更多保障和服务</p>
        <ul class="clearfix">
          <li class="left">
            <h4 class="i-item2-t">ETH币盈计划</h4>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/20@2x.png" alt="">
              </div>
              <div class="i-t two-line">
                <strong>低风险<br>高收益</strong>
              </div>
              <div class="i-info">
                币价下降无法回本时<br>可选择返 <span class="o-c">70%</span> 购买成本
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/9@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>收益全享</strong>
              </div>
              <div class="i-info">
                产币 <span class="o-c">100%</span> 独享<br>
                无其他额外支出
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/10@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>成本更低</strong>
              </div>
              <div class="i-info">
                同等价位下，包含1年ETH矿机<br>
                +管理费+电费+运维费+场地费
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/11@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>收益透明</strong>
              </div>
              <div class="i-info">
                数字货币地址公开，每日实际<br>
                产币量透明可见
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/12@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>专业运维</strong>
              </div>
              <div class="i-info">
                矿场专业维护，保障7*24小时<br>
                不间断挖矿，更高收益
              </div>
            </div>
          </li>
          <li class="right">
            <h4 class="i-item2-t">传统矿机购买</h4>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/13@2x.png" alt="">
              </div>
              <div class="i-t two-line">
                <strong>高风险<br>低收益</strong>
              </div>
              <div class="i-info">
                币价下降甚至归零<br>导致血本无归
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/14@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>多项收费</strong>
              </div>
              <div class="i-info">
                产币需额外支付电费、托管费、<br>场地费等，收益锐减
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/15@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>成本更高</strong>
              </div>
              <div class="i-info">
                同等价位下，仅可购1台<br>ETH矿机，运行矿机支出更高
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/16@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>收益模糊</strong>
              </div>
              <div class="i-info">
                仅可见个人收益<br>半透明半公开
              </div>
            </div>
            <div class="i-item2-i clearfix">
              <div class="i-icon left">
                <img src="../../assets/images/c-p2/17@2x.png" alt="">
              </div>
              <div class="i-t">
                <strong>自行维护</strong>
              </div>
              <div class="i-info t-line">
                需自行运维，噪音大、费电、<br>
                无场地、无维修，损坏后无法<br>
                保障正常运行
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="i-item3">
      <h2 class="p-title w480"><p><span class="l-icon"></span>预估收益<span class="r-icon"></span></p></h2>
      <div class="line-pic">
        <img src="../../assets/images/c-p2/19@2x.png" alt="">
      </div>
      <div class="pic-tip">注：以上收益均以年产5.3枚ETH计算，计算公式为 <span>收益=5.3*ETH当时币价</span> (计算结果仅供参考，具体收益以实时币价为准）</div>
    </div>

    <!--<div class="i-item4">-->
    <!--<h2 class="p-title w322"><p><span class="l-icon"></span>2018年ETH价格曾突破万元<span class="r-icon"></span></p></h2>-->
    <!--<div class="line-pic">-->
    <!--<img src="../../assets/images/c-p/etcjiage.png" alt="">-->
    <!--</div>-->
    <!--</div>-->

    <div class="i-item5">
      <div class="inner">
        <h2 class="p-title w480"><p><span class="l-icon"></span>矿机合约签购流程<span class="r-icon"></span></p></h2>
        <p class="i-item5-tip">按照步骤签购ETH矿机合约<br>纵享区块链挖矿的无限收益</p>
        <div class="process-list">
          <ul class="clearfix">
            <li>
              <div class="process-img">
                <img src="../../assets/images/c-p2/21@2x.png" alt="">
              </div>
              <p>注册算立方</p>
            </li>
            <li>
              <div class="process-img">
                <img src="../../assets/images/c-p2/22@2x.png" alt="">
              </div>
              <p>签购矿机合约</p>
            </li>
            <li>
              <div class="process-img">
                <img src="../../assets/images/c-p2/23@2x.png" alt="">
              </div>
              <p>完成支付</p>
            </li>
            <li>
              <div class="process-img">
                <img src="../../assets/images/c-p2/24@2x.png" alt="">
              </div>
              <p>等待合约交割</p>
            </li>
            <li>
              <div class="process-img">
                <img src="../../assets/images/c-p2/25@2x.png" alt="">
              </div>
              <p>打开“个人中心”<br>查看收益</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="i-item6">
      <h2 class="p-title w480"><p><span class="l-icon"></span>收益进程<span class="r-icon"></span></p></h2>
      <p class="s-t">点击地址查看进程&nbsp;&nbsp;合约产出全程透明</p>
      <a class="go-address" target="_blank"
         href="https://etherscan.io/address/0xbafdf8faa94af1db6fe5933171009ebd3c3afaa8">
        <span>0xbafdf8faa94af1db6fe5933171009ebd3c3afaa8</span>
      </a>
    </div>

  </div>
</template>
<script>
  import ProductAPI from '../../services/product-api';
  import OrderAPI from '../../services/order-api';
  import dateFilter from '../../utils/filters/date-filter';
  import {mapGetters} from 'vuex';
  import {
    UPDATE_PRE_ORDER,
    UPDATE_TRACKER_GOODS_ITEM
  } from '../../store/mutation-types';
  import errorHandler from '../../services/error-handler';

  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 100,
        productList: []
      };
    },
    mounted() {
      this.getGoodsList();
    },
    computed: {
      ...mapGetters({
        isLogin: 'login'
      })
    },
    methods: {
      isShowSalePrice(item) {
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSalePriceType !== 1;
        } else {
          return item.soldOutPriceType !== 1;
        }
      },
      getLimitCount(goodsInfo = {}) {
        let min = goodsInfo.buyLimit > -1 ? goodsInfo.buyLimit : 1;
        min = +min;
        let arr = [];
        if (goodsInfo.userLimit > -1) { // 单人限制
          arr.push(+goodsInfo.userLimit);
        }
        if (goodsInfo.orderLimit > -1) { // 单笔限制
          arr.push(+goodsInfo.orderLimit);
        }
        const max = Math.min.apply(null, arr);
        return {min, max};
      },
      getGoodsList() {
        ProductAPI.getProductsList('', this.pageNum, this.pageSize, 1)
          .then(res => res.list || [])
          .then(res => {
            res.forEach(item => {
              let limit = this.getLimitCount(item);
              item._limit = limit;
              item.count = limit.min;
            });
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
      submitOrder(goodsInfo) {
        if (goodsInfo.status !== 1) { // 出售中
          return;
        }
        goodsInfo.count = +goodsInfo.count;
        if (isNaN(goodsInfo.count)) {
          return errorHandler({msg: '数量不能为空'});
        }
        const batchGoodsIds = [goodsInfo.batchGoodsId];
        const count = [goodsInfo.count];
        OrderAPI
          .create(batchGoodsIds, count)
          .then(res => {
            this.$store.commit(UPDATE_PRE_ORDER, res);
            let trackerGoodsItems = [];
            trackerGoodsItems.push({
              skuId: goodsInfo.batchGoodsId,
              skuName: goodsInfo.goodsName,
              category: '矿机',
              Price: goodsInfo.goodSalePrice * goodsInfo.count,
              Quantity: goodsInfo.count
            });
            this.$store.commit(UPDATE_TRACKER_GOODS_ITEM, trackerGoodsItems);
            this.$router.push('/buy?source=contract-product');
          })
          .catch(errorHandler);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }

  .contract-product {
    background: #03051E;
  }

  .contract-product h2.p-title {
    font-weight: bold;
    overflow: hidden;
    font-size: 36px;
    color: #FFFFFF;
    text-align: center;
    line-height: 36px;
    height: 36px;
    text-shadow: 0 4px 5px rgba(246, 203, 136, 0.50);
    position: relative;
    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      span {
        position: absolute;
        top: 2px;
        width: 38px;
        height: 32px;
        &:after {
          content: '';
          position: absolute;
          width: 480px;
          opacity: 0.6;
          height: 1px;
          top: 16px;
        }
      }
    }
    &.w450 p {
      .l-icon:after {
        left: -449px;
      }
      span:after {
        width: 450px;
      }
    }
    &.w480 p {
      .l-icon:after {
        left: -479px;
      }
      span:after {
        width: 480px;
      }
    }
    &.w430 p {
      .l-icon:after {
        left: -429px;
      }
      span:after {
        width: 430px;
      }
    }
    &.w310 p {
      .l-icon:after {
        left: -309px;
      }
      span:after {
        width: 310px;
      }
    }
    .l-icon {
      left: -58px;
      background: url("../../assets/images/c-p2/zuo@2x.png") no-repeat center;
      background-size: 100% 100%;
      &:after {
        left: -479px;
        border-image: -webkit-linear-gradient(90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
        border-image: -moz-linear-gradient(90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
        background-image: linear-gradient(90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
      }
    }
    .r-icon {
      right: -58px;
      background: url("../../assets/images/c-p2/you@2x.png") no-repeat center;
      background-size: 100% 100%;
      &:after {
        left: 37px;
        border-image: -webkit-linear-gradient(-90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
        border-image: -moz-linear-gradient(-90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
        background-image: linear-gradient(-90deg, rgba(255, 248, 237, 0), rgba(255, 248, 237, 1));
      }
    }
  }

  .i-item1 {
    background: url("../../assets/images/c-p2/bg@1x.jpg") no-repeat top center;
    background-size: 100% auto;
  }

  .inner-banner {
    color: #18DDFF;
    text-align: center;
    > img {
      width: 770px;
      display: block;
      margin: 0 auto 100px;
    }
    h1 {
      font-size: 40px;
      line-height: 76px;
      margin-bottom: 46px;
    }
    > p {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 105px;
    }
    h2 {
      margin-bottom: 88px;
    }
    .plan {
      width: 940px;
      margin: 0 auto 92px;
      font-size: 0;
      > div {
        margin-bottom: 54px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .right {
        text-align: right;
      }
      .left {
        text-align: left;
      }
      p {
        font-size: 24px;
        color: #FFFFFF;
        line-height: 30px;
        span {
          color: #EDC375;
          font-size: 32px;
        }
      }
      .plan-t {
        margin-top: 44px;
        margin-bottom: 22px;
        width: 316px;
      }
      .plan-i {
        width: 227px;
      }
    }
    .c-list {
      padding-bottom: 103px;
      width: 1122px;
      margin: 0 auto;
      li {
        width: 261px;
        margin-right: 26px;
        padding: 44px 0;
        background: #E0B66B;
        &:last-child {
          margin-right: 0;
        }
        &:first-child > div img {
          width: 60px;
        }
        > div {
          width: 70px;
          height: 70px;
          margin: 0 auto 25px;
          img {
            max-width: 100%;
          }
        }
        strong {
          font-weight: normal;
          font-size: 20px;
          color: #FFFFFF;
          line-height: 20px;
          display: block;
          margin-bottom: 32px;
        }
        p {
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
          line-height: 26px;
        }
      }
    }
  }

  .p-info {
    padding-bottom: 130px;
    h2 {
      margin-bottom: 100px;
    }
  }

  .p-detail {
    width: 1042px;
    margin: 0 auto;
    .p-img {
      width: 450px;
      height: 450px;
      border: 1px solid #DCAF67;
      margin-right: 64px;
      position: relative;
      .by-plan {
        position: absolute;
        width: 100px;
        height: 28px;
        left: 0;
        top: 0;
        background: url("../../assets/images/c-p2/Group_43@2x.png") no-repeat center;
        background-size: 100% 100%;
      }
      img {
        width: 80%;
        max-height: 80%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .p-sale-info {
      width: 526px;
      text-align: left;
      header {
        padding-top: 10px;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        strong {
          font-size: 24px;
          color: #FFFFFF;
          font-weight: normal;
          line-height: 40px;
          margin-bottom: 10px;
          display: block;
        }
        p {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 14px;
        }
      }
      .p-info-list {
        padding-top: 29px;
        margin-bottom: 24px;
        li {
          margin-bottom: 24px;
          &:last-child span {
            line-height: 24px;
          }
        }
        .select-num {
          margin-bottom: 57px;
          height: 40px;
          span.l-n, div {
            line-height: 40px;
          }
          .tip {
            font-size: 14px;
            color: #FFFFFF;
          }
        }
        span.l-n {
          color: #fff;
          opacity: 0.7;
          line-height: 18px;
          font-size: 14px;
          width: 81px;
        }
        p.left {
          font-size: 18px;
          color: #FFFFFF;
          line-height: 18px;
        }
        p.o-c {
          color: #FD7220;
          font-size: 18px;
          line-height: 18px;
          &.price {
            font-size: 24px;
            line-height: 24px;
          }
        }
      }
    }
    .btn-group {
      overflow: hidden;
      button {
        color: #fff;
        font-size: 18px;
        width: 220px;
        height: 54px;
        text-align: center;
        line-height: 54px;
        float: left;
        background: none;
        border: none;
        cursor: pointer;
        &:disabled {
          cursor: no-drop;
        }
      }
      .buy {
        background: #DCAF67;
        margin-right: 20px;
      }
      .go-detail {
        line-height: 52px;
        border: 1px solid #DCAF67;
      }
    }
  }

  .i-item2 {
    padding-bottom: 93px;
    background: url("../../assets/images/c-p2/bg_2@2x.jpg") no-repeat center;
  }

  .inner-i-item2 {
    > p {
      opacity: 0.8;
      font-size: 18px;
      color: #FFFFFF;
      text-align: center;
      line-height: 18px;
      margin-bottom: 100px;
    }
    h2 {
      margin-bottom: 31px;
    }
    ul {
      width: 1180px;
      margin: 0 auto;
    }
    li {
      width: 507px;
      position: relative;
      &:first-child:after {
        content: '';
        position: absolute;
        width: 91px;
        height: 48px;
        background: url("../../assets/images/c-p2/18@2x.png") no-repeat center;
        background-size: 100% 100%;
        top: 297px;
        right: -128px;
      }
      &.left {
        border: 1px solid #DCAF67;
        .i-item2-t {
          background: #DCAF67;
        }
        div.i-item2-i:nth-child(odd) {
          background: rgba(220, 175, 103, 0.15);
        }
      }
      &.right {
        border: 1px solid #3D74F1;
        .i-item2-t {
          background: #3D74F1;
        }
        div.i-item2-i:nth-child(odd) {
          background: rgba(61, 116, 241, 0.1);
        }
      }
      .i-item2-i {
        height: 114px;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.32);
        &:last-child {
          border: none;
        }
      }
      .i-item2-t {
        height: 96px;
        border: none;
        line-height: 96px;
        color: #fff;
        text-align: center;
        font-weight: bold;
        font-size: 32px;
      }
      .i-icon {
        width: 100px;
        font-size: 0;
        position: relative;
        height: 114px;
        overflow: hidden;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 35px;
        }
      }
      .i-t {
        line-height: 114px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: left;
        width: 96px;
        height: 114px;
        overflow: hidden;
        float: left;
        margin-right: 46px;
        &.two-line {
          line-height: 36px;
          padding: 21px 0;
        }
      }
      .i-info {
        white-space: nowrap;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 30px;
        opacity: 0.8;
        padding: 26px 0;
        max-width: 252px;
        height: 114px;
        overflow: hidden;
        span {
          font-size: 24px;
          color: #DCAF67;
        }
        &.t-line {
          padding: 14px 0;
        }
      }
    }
  }

  .i-item3 {
    text-align: center;
    padding-bottom: 80px;
    h2 {
      margin-bottom: 55px;
    }
    .line-pic img {
      width: 1129px;
      margin: 0 auto 28px;
      display: block;
    }
    .pic-tip {
      font-size: 14px;
      color: #FFFFFF;
      line-height: 14px;
      span {
        color: #DCAF67;
      }
    }
  }

  .i-item4 {
    padding: 150px 0;
    h2 {
      margin-bottom: 105px;
    }
    .line-pic img {
      width: 1105px;
      margin: 0 auto 40px;
      display: block;
    }
  }

  .i-item5 {
    background: url("../../assets/images/c-p2/bg_1@2x.jpg") no-repeat center;
    background-size: 100% 100%;
    padding-top: 100px;
  }

  .i-item5 .inner {
    width: 1280px;
    margin: 0 auto;
    .i-item5-tip {
      opacity: 0.8;
      font-size: 18px;
      color: #FFFFFF;
      text-align: center;
      line-height: 30px;
      margin-bottom: 90px;
    }
    h2 {
      margin-bottom: 24px;
    }
    .process-list {
      width: 1200px;
      margin: 0 auto;
      li {
        background: rgba(220, 175, 103, 0.05);
        border: 1px solid #DCAF67;
        width: 176px;
        height: 176px;
        float: left;
        margin-right: 80px;
        text-align: center;
        color: #fff;
        padding-top: 35px;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 32px;
          height: 21px;
          background: url("../../assets/images/c-p2/30@2x.png") no-repeat center;
          background-size: 100% 100%;
          top: 78px;
          right: -56px;
        }
        &:last-child {
          margin: 0;
          &:after {
            display: none;
          }
          .process-img {
            margin-bottom: 20px;
          }
        }
        p {
          font-size: 16px;
          color: #FFFFFF;
          line-height: 20px;
        }
      }
      .process-img {
        width: 60px;
        height: 60px;
        font-size: 0;
        margin: 0 auto;
        line-height: 60px;
        margin-bottom: 30px;
        img {
          max-width: 100%;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }

  .i-item6 {
    padding-top: 113px;
    padding-bottom: 100px;
    h2 {
      margin-bottom: 26px;
    }
    .s-t {
      opacity: 0.8;
      font-size: 18px;
      color: #FFFFFF;
      text-align: center;
      line-height: 18px;
      margin-bottom: 80px;
    }
    .go-address {
      background: rgba(220, 175, 103, 0.8);
      border-radius: 2px;
      width: 1062px;
      padding: 62px 93px 65px 72px;
      margin: 0 auto;
      position: relative;
      display: block;
      &:after {
        position: absolute;
        content: '';
        width: 12px;
        height: 22px;
        background: url("../../assets/images/c-p2/cengji.png") no-repeat center;
        background-size: 100% 100%;
        right: 54px;
        top: 69px;
      }
      span {
        display: block;
        text-align: center;
        color: #fff;
        font-size: 36px;
        line-height: 36px;
      }
    }
  }

  .c-p-num {
    & ~ .limit {
      font-size: 18px;
      color: #FFFFFF;
      margin-right: 14px;
      display: inline-block;
    }
  }
</style>
<style lang="scss">
  .c-p-num.el-input-number {
    width: 153px;
    border: 1px solid #2797E9;
    background: none;
    margin-right: 20px;
    color: #fff;
    .el-input-number__increase, .el-input-number__decrease {
      color: #fff;
      background: none;
      border: none;
      border-right: 1px solid #2797E9;
    }
    .el-input-number__increase {
      border: none;
      border-left: 1px solid #2797E9;
    }
    .el-input__inner {
      border: none;
      background: none;
      color: #fff;
    }
  }
</style>
