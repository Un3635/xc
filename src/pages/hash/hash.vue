<template>
  <div class="calc-force">
    <view-box body-padding-top="46px" body-padding-bottom="48px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">
        <header-pull-down :isShow="isShowPullDown" @close="isShowPullDown=!isShowPullDown">
          <group class="link-list">
            <cell-box is-link @click.native="changeNav()"><span>全部算力</span></cell-box>
            <cell-box is-link @click.native="changeNav(currency.currencyName)"
                      v-for="(currency, currencyId) in currencyList" :key="currencyId">
              <span>{{currency.currencyName}}算力</span>
            </cell-box>
            <!-- <cell-box is-link @click.native="changeNav('T')"><span>BTC算力</span></cell-box>
            <cell-box is-link @click.native="changeNav('M')"><span>ETH算力</span></cell-box>
            <cell-box is-link @click.native="changeNav('G')"><span>DCR算力</span></cell-box>
            <cell-box is-link @click.native="changeNav('H')"><span>BTM算力</span></cell-box> -->
          </group>
        </header-pull-down>
        <span>云算力</span>
        <div class="header-logo" slot="overwrite-left">
          <img src="../../assets/images/dinglan_logo@2x.png" alt="">
        </div>
        <div class="header-more" slot="right">
          <img @click="isShowPullDown = !isShowPullDown" src="../../assets/images/icon_jihe_normal@2x.png" alt="">
        </div>
      </x-header>
      <div class="cf-list">
        <load-more v-if="loading" tip="正在加载"></load-more>
        <div v-else-if="!goodsList.length" class="request-empty">
          <img src="../../assets/images/kongzhuangtai_normal@2x.png" alt="算立方">
          <p>暂无数据</p>
        </div>
        <!-- <load-more v-else-if="!goodsList.length" tip="暂无数据" :show-loading="false"></load-more> -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" @click.stop="detail(item.id)">
            <div class="cf-activity-state" :class="getClassByStatus(item)"></div>
            <div class="cf-info">
              <div class="title-wrap">
                <strong class="title">{{item.gName.slice(0,26)}}</strong>
                <div class="sl smallsl vux-1px" v-show="item.currency">{{item.currency}}算力</div>
              </div>
              <div class="activity">
                <p class="content">
                  {{item.gTitle.slice(0,17)|| ''}}
                  <span v-for="(itemActivity,index) in item.goodsActivityList" v-if="item.goodsActivityList && item.goodsActivityList.length != 0"
                        :class="getGoodsActivity(itemActivity.activityType)" :key="index"></span>
                </p>
              </div>
              <div class="remain">剩余<span class="count">{{item.surplusCube | currency('', 2) + ' ' + item.computingUnit}}</span></div>
                <!-- <span class="value">{{item.percent || '0%'}}</span> -->
              <!-- <div class="cf-price">
                <div class="cf-price-sale" v-if="judgePrice(item)">
                  <span class="price" v-if="item.salePrice.split('.')[0].indexOf('?') > -1">{{item.salePrice.split(".")[0]}}</span>
                  <span class="price" v-else>{{item.salePrice.split(".")[0] | currency('', 0)}}</span>
                  <span class="dot">.{{item.salePrice.split(".").length === 2 ? item.salePrice.split(".")[1] : '00'}}元</span>
                  <span class="unit">/{{item.computingUnit}}</span>
                </div>
                <div class="cf-price-old" v-if="item.price">{{item.price ? item.price: ''}}元</div>
              </div>
              <x-button type="primary" class="buy-btn" :class="{weikaishou: !Number(item.status)}">{{getStatus(item)}}</x-button> -->
              <!-- <div class="buy-btn">立即购买</div> -->
              <div class="price-wrap">
                <div class="cf-price left" >
                  <div class="cf-price-sale" v-if="judgePrice(item)">
                    <span class="price" v-if="item.salePrice.split('.')[0].indexOf('?') > -1">{{item.salePrice.split(".")[0]}}</span>
                    <span class="price" v-else>{{item.salePrice.split(".")[0] | currency('', 0)}}</span>
                    <span class="dot">.{{item.salePrice.split(".").length === 2 ? item.salePrice.split(".")[1] : '00'}}元</span>
                    <span class="unit">/{{item.computingUnit}}</span>
                  </div>
                  <div class="cf-price-sale show-shouqin" v-else-if="showSQ(item)"> -- </div>
                </div>
               <x-button type="primary" class="buy-btn" :class="{weikaishou: !Number(item.status)}">{{getStatus(item)}}</x-button>
               <div class="cf-price-old left" v-if="item.price && !showSQ(item)">{{item.price ? item.price: ''}}元</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>
<script>
  import {Group, CellBox, dateFormat, LoadMore} from 'vux';
  import headerPullDown from '../components/header-pull-down.vue';
  import footerNav from '../components/footer-nav.vue';
  import PowerApi from '../../services/power-api';

  export default {
    title: {
      title: '云算力_云算力购买平台_算立方2',
      description: '算力出租,算力购买,云算力租赁',
      keywords: '算立方提供性价比最高的算力交易，算力租赁业务，一站式算力租赁首选。'
    },
    data() {
      return {
        isShowPullDown: false,
        goodsList: [],
        currencyList: [],
        activityList: [],
        nav: undefined,
        loading: true
      };
    },
    components: {
      Group,
      CellBox,
      headerPullDown,
      footerNav,
      LoadMore
    },
    created() {
      this.getCurrencyList();
      this.jyGoodsList();
    },
    methods: {
      detail(id) {
        this.$router.push({path: '/hash-detail', query: {id: id}});
      },
      getCurrencyList() {
        PowerApi.getCurrencyList().then((res) => {
          this.currencyList = res.result;
        });
      },
      jyGoodsList(currencyName) {
        this.loading = true;
        PowerApi.jyGoodsList(currencyName || '', 3)
          .then(res => {
            let data = JSON.parse(res);
            this.loading = false;
            data.forEach(item => {
              // console.log(item);
              item.openSaleTime = new Date(item.openSaleTime).getTime();
              if (item.deliveryTimeType === 1) { // 定时交割
                item.deliveryTime = new Date(item.deliveryTime).getTime();
              }
              item.timingTime = new Date(item.timingTime).getTime();
              item.updateTime = new Date(item.updateTime).getTime();
            });
            this.goodsList = data;
          })
          .then(() => {
            this.goodsList.map((item) => {
              if (item.goodsActivityList.length > 0) {
                item.goodsActivityList = item.goodsActivityList.sort((item1, item2) => {
                  return Number(item1.activityType) - Number(item2.activityType);
                });
              }
            });
          });
      },
      changeNav(currencyName) {
        if (currencyName !== this.nav) {
          this.goodsList = [];
          this.isShowPullDown = false;
          this.nav = currencyName;
          this.jyGoodsList(currencyName);
        }
      },
      getClassByStatus(item) {
        // 后台配置 tag
        switch (Number(item.status)) {
          case 0:
            return 'weikaishou';
          case 1:
            if (Number(item.tag) === 2) {
              return 'xinshangjia';
            }
            // 出售中
            return '';
          case 3:
            // 其他因素不可购买
            return '';
          case 2:
            // 已告罄
            return 'yishouqing';
          case 4:
            // 已结束
            return 'yijieshu';
          case -1:
            // 已下架
            return '';
          default:
            return '';
        }
      },
      getGoodsActivity(type) {
        // 促 ：1 邀 : 2
        let activities = ['cu', 'yao'];
        return activities[Number(type) - 1];
      },
      getStatus(item) {
        switch (Number(item.status)) {
          case 0:
          // 待出售
            return dateFormat(item.openSaleTime, 'MM月DD日 HH:mm') + '开售';
          case 1:
          // 出售中
            return '立即购买';
          case 3:
          // 其他因素不可购买
            return null;
          case 2:
            // 已告罄
            return '查看合约';
          case 4:
            // 已结束
            return '查看合约';
          default:
            return null;
        }
      },
      judgePrice(item) {
        // openSaleType 1隐藏 2自定义
        // soldOutType 1隐藏 2自定义
        if (!item.salePrice) {
          return false;
        }
        if (Number(item.status) === 0) { // 开售前
          if (item.openSaleType === 1) {
            return false;
          }
        } else if (Number(item.status) === 2) { // 售罄
          // if (item.soldOutType === 1) {
          //   return false;
          // }
          // 此时售罄直接改成 '--'
          return false;
        }
        return true;
      },
      showSQ(item) {
        // 售罄的情况下原价不进行显示
        if (Number(item.status) === 2) {
          return true;
        }
        return false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  img {
    max-width: 100%;
  }

  .header-logo {
    width: 60px;
    height: 22px;
  }

  .header-more {
    width: 40px;
    & > img {
      padding: 0 10px;
    }
  }
  .request-empty {
    margin-top: 50%;
    & > img {
      display: block;
      width: 42px;
      margin: 0px auto 13px;
    }
    & > p {
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }
  .link-list {
    span {
      padding-left: 10px;
      font-size: 15px;
      line-height: 24px;
    }
    .vux-cell-box.weui-cell::before {
      border-color: #f4f4f4;
      background: #f4f4f4;
    }
    .vux-cell-box.weui-cell::after {
      content: '';
      display: block;
      width: 6px;
      height: 11px;
      background-image: url('../../assets/images/icon_cengji_normal@2x.png');
      background-size: 6px 11px;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      margin: auto;
      transform: none;
      border: none;
      background-color: #fff;
    }
  }

  .calc-force {
    position: relative;
    background: #f4f4f4;
    .cf-list {
      a {
        display: block;
      }
      & > ul {
        padding: 10px 12px;
        & > li {
          position: relative;
          margin-bottom: 10px;
          background: #fff;
          border-radius: 3px;
          padding: 16px 12px 12px 18px;
          &:active {
            background: #ECECEC;
          }
        }
      }

    }
    .cf-activity-state {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 36px;
      height: 36px;
      &.weikaishou {
        background: url("../../assets/images/weikaishou_bg@2x.png") no-repeat;
        background-size: 36px 36px;
      }
      &.xinshangjia {
        background: url("../../assets/images/xinshangjia_bg@2x.png") no-repeat;
        background-size: 36px 36px;
      }
      &.yijieshu {
        background: url("../../assets/images/yijieshu_bg@2x.png") no-repeat;
        background-size: 36px 36px;
      }
      &.yishouqing {
        background: url("../../assets/images/yishouqing_bg@2x.png") no-repeat;
        background-size: 36px 36px;
      }
    }
    .cf-info {
      font-family: PingFangSC;
      letter-spacing: 0;
      .title-wrap {
        // position: relative;
        line-height: 1.5em;
        .title {
          font-family: PingFangSC-Medium;
          margin-right: 67px;
          font-size: 16px;
          // line-height: 15px;
          color: #303137;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        div.sl {
          position: absolute;
          // right: 0px;
          // top: 0px;
          right: 7px;
          top: 18px;
          min-width: 65px;
          padding: 5px 6px;
          line-height: 12px;
          font-size: 12px;
          -webkit-transform-origin-x: 0;
          -webkit-transform: scale(0.90);
          text-align: center;
          color: #333333;
          // border: 1px solid #E0E0E0;
          // border-radius: 50px;
          &.smallsl {
            font-size: 10px;
          }
          &.vux-1px:before {
            border-radius: 50px
          }
        }
      }
      .activity, .remain {
        line-height: 12px;
        color: #969699;
      }
      .activity {
        margin-top: 7px;
        .content {
          display: inline-block;
          font-size: 13px;
          line-height: 1.2em;
          // line-height: 12px;
          color: #969699;
          > span {
            width: 17px;
            height: 17px;
            display: inline-block;
            // vertical-align: top;
            vertical-align: middle;
            margin-left: 5px;
          }
        }
        .yao {
          background: url("../../assets/images/icon_yao_normal@2x.png") no-repeat;
          background-size: 17px 17px;
        }
        .cu {
          background: url("../../assets/images/icon_cu_normal@2x.png") no-repeat;
          background-size: 17px 17px;
        }
      }
      .remain {
        // margin-top: 19px;
        margin-top: 13px;
        font-size: 14px;
        .count {
          margin-left: 6px;
          line-height: 13px;
          color: #333333;
        }
      }
      .price-wrap {
        position: relative;
        margin-top: 14px;
        overflow: hidden;
      }
      .cf-price {
        font-family: PingFangSC-Medium;
        font-size: 0px;
        padding-top: 2px;
        .cf-price-sale {
          display: inline-block;
          margin-right: 8px;
          & > span {
            display: inline-block;
          }
          .price {
            font-size: 20px;
            color: #FD7220;
            height: 20px;
            line-height: 20px;
          }
          .dot {
            font-size: 12px;
          }
          .unit, .dot {
            font-size: 12px;
            color: #333333;
          }
          .dot {
            color: #FD7220;
          }
          .unit {
            vertical-align: bottom;
          }
          &.show-shouqin {
            color: #FD7220;
            font-size: 20px;
          }
        }
      }
      .cf-price-old {
        font-family: PingFangSC;
        display: inline-block;
        line-height: 13px;
        font-size: 13px;
        color: #666666;
        letter-spacing: 0;
        text-decoration: line-through;
        padding-top: 8px;
      }
      .buy-btn {
        font-family: PingFangSC;
        // position: absolute;
        // right: 12px;
        // bottom: 14px;
        padding: 8px 12px;
        font-size: 13px;
        line-height: 14px;
        text-align: center;
        color: #FFFFFF;
        border-radius: 4px;
        width: auto;
        float: right;
        &.weikaishou {
          font-size: 12px;
        }
      }
    }
  }
</style>
