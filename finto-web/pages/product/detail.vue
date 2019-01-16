<template>
  <div class="page">
    <div class="miner-breadcrumb">
      <div class="inner">
        <x-breadcrumb class="x-breadcrumb"/>
      </div>
    </div>
    <div class="miner-product-detail">
      <div class="miner-detail-wrapper">
        <el-row>
          <el-col :span="10">
            <div class="miner-image">
              <img :src="get(goodsInfo,`imageList[${selectedImgIndex}]`)" alt="">
            </div>
            <div class="change-image clearfix" v-if="goodsInfo.imageList&&goodsInfo.imageList.length>0">
              <div class="pre-images" @click="preImg">
                <i class="el-icon-arrow-left"></i>
              </div>
              <ul class="image-switch" v-if="goodsInfo.imageList&&goodsInfo.imageList.length>0">
                <li v-for="(img,idx) in get(goodsInfo,'imageList',[])" :key="img" @click="selectedImgIndex=idx">
                  <div class="image-wrapper" :class="{'active':idx===selectedImgIndex}">
                    <img v-if="img" :src="img" alt=""></div>
                </li>
              </ul>
              <div class="next-images" @click="nextImg">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="detail-content">
              <div class="info-header">{{goodsInfo.goodsName}}</div>
              <div class="info-intro">{{goodsInfo.goodsSubTitle}}</div>
              <div class="info-shop">
                <div class="shop-content">
                  <div class="shop-item shop-item-price">
                    <dt>価格</dt>
                    <dd>
                      <span class="currentPrice">
                        <span v-if="goodsInfo.status===1&&goodsInfo.openSalePriceType">{{goodsInfo.goodSalePrice | currency}}円</span>
                        <span
                          v-else-if="goodsInfo.status!==1&&goodsInfo.goodSalePrice">{{goodsInfo.goodSalePrice|currency}}</span>
                        <span v-else>--</span>
                      </span>
                      <span class="originPrice">
                        <span v-if="goodsInfo.goodsPrice&&goodsInfo.status===1" class="decoration">{{goodsInfo.goodsPrice|currency}}円</span>
                      </span>
                    </dd>
                  </div>
                </div>
              </div>
              <div class="deliver">
                <div class="deliver-item time">
                  <dt>出荷時期</dt>
                  <dd>{{goodsInfo.startSendTime | date('YYYY-MM-DD')}}~{{goodsInfo.endSendTime |
                    date('YYYY-MM-DD')}}
                  </dd>
                </div>
                <div class="deliver-item choose">
                  <dt>サービス選択</dt>
                  <dd>
                    <div class="chooseRadio" @click="serviceType=serviceType===2?'':2" v-if="goodsInfo.putAwayFree">
                      <div class="chooseBtn">
                        <div class="checkedBox" :class="{'active':serviceType===2}"></div>
                      </div>
                      <div class="iconImg tuoguan"></div>
                      <div class="chooseContent">
                        <div class="chooseContentTop">
                          <span :class="{'active':serviceType===2}">マイニングサービスを利用する</span>
                          <el-popover
                            placement="bottom"
                            width="410"
                            trigger="hover">
                            <slot>
                              <div style="color: #303137;padding:8px;">
                                マイニングサービスとは、弊社が提供するマイニング代行サービスです。弊社の１０万台以上の規模のマイニングファームにて、お客様のマイニングマシンを責任を持って保守・管理致します。お客様は日々のマイニング収益をお受取りいただくだけとなり、どなたでも簡単にマイニングをご利用頂けるサービスです。詳しくは、本サイトのマイニングサービス紹介ページ及び利用規約、保守管理委託契約をご確認ください。
                                <br/>
                                <span style="color:#FD7220;display:inline-block;padding-top:15px;">管理費：</span>産出された仮想通貨の１０％～<br/>
                                <span style="color:#FD7220;">電気代：</span>産出された仮想通貨から控除<br/>
                                <p style="padding-left:50px;">１、当日発掘した仮想通貨より</p>
                                <p style="padding-left:50px;">２、お客様アカウント内の仮想通貨残高より</p>
                                サービスの停止：<br/>
                                上記から差し引くことができない場合、或いはマイニングされた仮想通貨が連続して７日間
                                に渡り、１日の電気代を下回った場合。（管理画面よりご確認いただけます。もちろん、上記
                                のケースについては、お客様へのご連絡、ご相談の上、対処させていただきます）。
                              </div>
                            </slot>
                            <i slot="reference" class="iconfont icon-help"></i>
                          </el-popover>
                        </div>
                        <div class="chooseContentBottom">
                          <span>セットアップ費：{{goodsInfo.putAwayFree|currency}}円/台</span>
                        </div>
                      </div>
                    </div>
                    <div class="chooseRadio" @click.stop="serviceType=serviceType===1?'':1"
                         v-if="goodsInfo.freightFree">
                      <div class="chooseBtn">
                        <div class="checkedBox" :class="{'active':serviceType === 1}"></div>
                      </div>
                      <div class="iconImg peisong"></div>
                      <div class="chooseContent">
                        <div class="chooseContentTop">
                          <span :class="{'active':serviceType === 1}">ご指定の場所へ配送</span>
                          <el-popover
                            placement="bottom"
                            width="446"
                            trigger="hover">
                            <slot>
                              <div style="padding:12px;color: #303137;">
                                お客様のご指定の日本国内の住所まで配送いたします。送料は下記の価格に含まれますが、税関などの税金に関してはお客様のご負担とさせて頂いております。商品到着時に運送業者より支払いが求められることがございます点、予めご了承下さい。
                              </div>
                            </slot>
                            <i slot="reference" class="iconfont icon-help"></i>
                          </el-popover>
                        </div>
                        <div class="chooseContentBottom">
                          <span>送料：{{goodsInfo.freightFree|currency}}円/台</span>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
                <div class="deliver-item num">
                  <dt>数量</dt>
                  <dd>
                    <div class="num-box">
                      <span @click="reduce">
                        <svg width="11" height="1">
                          <use xlink:href="#minus"></use>
                        </svg>
                      </span>
                      <input type="number" min="1" v-model="count" @input="inputNum">
                      <span @click="plus">
                        <svg width="11" height="11"><use xlink:href="#add"></use></svg>
                      </span>
                    </div>
                    <span class="limit-num">
                      <span v-if="goodsInfo.buyLimit>0">最低購入:{{goodsInfo.buyLimit}}台</span>
                      <span v-if="goodsInfo.buyLimit>0&&goodsInfo.orderLimit>0">、</span>
                      <span v-if="goodsInfo.orderLimit>0">１回購入上限:{{goodsInfo.orderLimit}}台</span>
                      <span v-if="(goodsInfo.buyLimit>0||goodsInfo.orderLimit>0)&&goodsInfo.userLimit>0">、</span>
                      <span v-if="goodsInfo.userLimit>0">お一人様上限:{{goodsInfo.userLimit}}台</span>
                    </span>
                  </dd>
                </div>
                <div class="deliver-item goodsPrice">
                  <dt>価格</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1" class="goodsPrices">{{actualPrice | currency}}円</span>
                    <span v-else class="goodsPrices">--</span>
                    <span v-if="goodsInfo.status===1&&serviceType===1" class="goodsPricesTip">配送費用を含む</span>
                    <span v-if="goodsInfo.status===1&&serviceType===2" class="goodsPricesTip">委託管理費を含む</span>
                  </dd>
                </div>
              </div>
              <div class="shop-pay">
                <el-button class="shopBtn" type="primary" :class="{'btn-disabled':goodsInfo.status!==1||!serviceType}"
                           :disabled="goodsInfo.status!==1||!serviceType" @click="submitOrder">
                  {{btnText}}
                </el-button>
                <el-button class="carBtn" :class="{'btn-disabled':goodsInfo.status!==1||!serviceType}"
                           :disabled="goodsInfo.status!==1||!serviceType"
                           type="primary" @click="addToCart">
                  <svg width="18" height="16.2">
                    <use xlink:href="#cart"></use>
                  </svg>
                  カートに入れる
                </el-button>
              </div>
              <div class="shop-cart">
                <nuxt-link class="go-cart" to="/cart">
                  <span class="badge" v-if="cartGoodsCount">{{cartGoodsCount}}</span>
                  <svg width="24" height="21">
                    <use xlink:href="#cart"></use>
                  </svg>
                </nuxt-link>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="hash-intro" v-if="serviceType === 2">
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in summaryList" :key="item.mark">
              <div class="summary-item">
                <img :src="item._icon" alt="">
                <p class="intro-text">{{item.key}}</p>
                <p class="intro-num">{{item.value}}</p>
              </div>
            </el-col>
          </el-row>
          <div class="hash-list-tip">{{sourceTime}}</div>
        </div>
        <div class="robot-list">
          <div class="tabs">
            <div class="tabs-header">
              <ul class="clearfix">
                <li @click="robotSelectIndex=0" :class="{'active':robotSelectIndex===0}">機器紹介</li>
                <li @click="robotSelectIndex=1" :class="{'active':robotSelectIndex===1}">スペック</li>
                <li @click="robotSelectIndex=2" :class="{'active':robotSelectIndex===2}">アフターサービス</li>
              </ul>
            </div>
            <div class="tabs-body">
              <div class="tabs-pane imgBox" v-if="robotSelectIndex===0" v-html="goodsInfo.goodsContent"></div>
              <div class="tabs-pane" v-if="robotSelectIndex===1">
                <div class="params">
                  <div class="params-title">{{goodsInfo.goodsName}}</div>
                  <dl>
                    <div class="params-info__item" v-for="param in minerParams" :key="param.name">
                      <dt>{{param.key}}：</dt>
                      <dd>{{param.value}}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="tabs-pane tabs-pane-policy" v-if="robotSelectIndex===2">
                <div v-html="goodsInfo.salePolicy"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-features style="margin-top: 80px;"/>
  </div>
</template>
<script>
  import {UPDATE_PRE_ORDER, UPDATE_CARTNUM, UPDATE_BREADCRUMB} from '../../store/mutation-types';
  import CartAPI from '../../services/cart-api';
  import errorHandler from '../../services/error-handler';
  import * as debounce from 'lodash.debounce';
  import get from 'lodash.get';
  import dateFilter from '../../filters/date-filter';
  import {mapState, mapGetters} from 'vuex';
  import OrderAPI from '../../services/order-api';
  import XFeatures from '../../components/x-features';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import GoodsAPI from '../../services/goods-api';

  export default {
    components: {XBreadcrumb, XFeatures},
    head() {
      let product = this.goodsInfo;
      let productName = this.goodsInfo.goodsName;
      return {
        title: `${productName} -FinTo`,
        meta: [
          {
            name: 'keywords',
            content: `FinTo、Finto Cube、フィント、フィント株式会社、ブロックチェーン、ビットコイン、イーサリアム、仮想通貨、仮想通貨ニュース、リップル、ウォレット、NEM、ライトコイン、LISK、ライトコイン、ICO、ハードフォーク、マイニング、マイニングマシン、仮想通貨分析、仮想通貨　今後、マイニング減少期、マイニングマシン、マイナー、クラウドマイニング、マイニング収益、S9、ビットメイン、アントマイナー、S9i、ZEN、A9、イノシリコン、IBeLink、Antminer、Innosillicon、BTC,ETH、LTC、BTH、節税、節税対策、税金、税金対策、法人税`
          },
          {
            name: 'description',
            content: `ビットメイン社のクラシックモデル「${productName}」（ビットコインマイニング）の販売を行なっております。キャンペーン価格${product.goodSalePrice||0}円！市場でも入手学難しくなっている商品につき、早い者勝ちです。ご購入後、最短数日でマイニングスタート可能です。`
          }
        ]
      };
    },
    breadcrumb() {
      return {
        label: '機器詳細',
        parentsList: [
          {
            path: '/product',
            label: `マイニング機器`
          }
        ]
      };
    },
    computed: {
      ...mapState({
        token: 'token'
      }),
      ...mapGetters({
        isLogin: 'isLogin'
      }),
      btnText() {
        const goodsInfo = this.goodsInfo;
        const saleTime = goodsInfo.startSendTime || new Date();
        switch (goodsInfo.status) {
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
          default:
            return '暂未开售';
        }
      },
      actualPrice() {
        let goodsInfo = this.goodsInfo || {};
        let salePrice = goodsInfo.goodSalePrice || 0;
        let putAwayFree = goodsInfo.putAwayFree || 0;
        let freightFree = goodsInfo.freightFree || 0;
        let count = +this.count;
        if (this.serviceType === 2) {
          return salePrice * count + count * putAwayFree;
        } else if (this.serviceType === 1) {
          return salePrice * count + freightFree * count;
        } else {
          return salePrice * count;
        }
      }
      // isShowSalePrice() {
      //   let item = this.goodsInfo;
      //   if (item.status === 1) {
      //     return true;
      //   } else if (item.status === 0) {
      //     return item.openSalePriceType !== 1;
      //   } else {
      //     return item.soldOutPriceType !== 1;
      //   }
      // }
    },
    asyncData({route}) {
      let data = {
        goodsInfo: {
          imageList: []
        },
        summaryList: [],
        sourceTime: ''
      };
      let p1 = GoodsAPI.goodsAttribute(route.query.pId, 1)
        .then(res => res.result || [])
        .then(res => {
          res.forEach(item => {
            if (item.mark === 'ATTR_T') {
              data.sourceTime = item.value;
            }
            if (item.mark === 'ATTR_O') {
              item._icon = require('../../assets/images/hash-detail/icon-output.svg');
            }
            if (item.mark === 'ATTR_P') {
              item._icon = require('../../assets/images/hash-detail/icon-power.svg');
            }
            if (item.mark === 'ATTR_M') {
              item._icon = require('../../assets/images/hash-detail/icon-management-fee.svg');
            }
            if (item.mark === 'ATTR_E') {
              item._icon = require('../../assets/images/hash-detail/icon-electric-fee.svg');
            }
          });
          return res;
        })
        .then(res => {
          data.summaryList = res.filter(item => item.mark !== 'ATTR_T');
        });
      let p2 = GoodsAPI.detail(route.query.pId)
        .then(res => {
          return data.goodsInfo = res;
        });
      return Promise.all([p1, p2])
        .then(() => {
          return data;
        });
    },
    data() {
      return {
        minerParams: [],
        count: 1, // 购买数量
        selectedImgIndex: 0,
        robotSelectIndex: 0,
        activityList: [],
        discountAmount: 0,
        inviteCommissionId: '',  // 邀请奖励id
        rewardList: [],  //奖励列表
        cartGoodsCount: null,
        serviceType: 2   // 1 发货, 2 托管
      };
    },
    methods: {
      get,
      nextImg() {
        if (this.selectedImgIndex < this.goodsInfo.imageList.length - 1) {
          this.selectedImgIndex++;
        }
      },
      preImg() {
        if (this.selectedImgIndex > 0) {
          this.selectedImgIndex--;
        }
      },
      plus() {
        this.count = +this.count;
        if (this.count < this.goodsInfo._limit.max) {
          this.count++;
        }
      },
      reduce() {
        this.count = +this.count;
        if (this.count > this.goodsInfo._limit.min) {
          this.count--;
        }
      },
      inputNum() {
        const {min, max} = this.goodsInfo._limit;
        debounce(() => {
          let count = +this.count;
          if (!/^[1-9]\d*$/.test(count + '')) {
            count = min;
          }
          if (count > max) {
            count = max;
          }
          if (count < min) {
            count = min;
          }
          this.count = count;
        }, 1000)();
      },
      addToCart() {
        if (this.goodsInfo.status !== 1) {
          return;
        }
        const batchGoodsId = this.$route.query.pId;
        const {min, max} = this.goodsInfo._limit;
        const serviceType = this.serviceType;
        CartAPI.byGoodsId(batchGoodsId, serviceType)
          .then(res => {
            const remoteCount = +res;
            let count = +this.count;
            if (!/^[1-9]\d*$/.test(count + '')) {
              count = min;
            }
            if (count > max) {
              count = max;
            }
            if (count < min) {
              count = min;
            }
            const total = remoteCount + count;
            if (remoteCount > max) {
              return Promise.reject({msg: 'カートに合計' + remoteCount + '点の商品があります'});
            }
            if (remoteCount > 0 && total > max) {
              const errMsg = `カートに入れられる上限数（${remoteCount}点）を超えています`;
              return Promise.reject({msg: errMsg});
            }
            if (total > max) {
              return Promise.reject({msg: '購入数は上限を超えました'});
            }
            return CartAPI.updateCount(batchGoodsId, total, serviceType);
          })
          .then(() => {
            let html = `
              <div class="clearfix" style="margin-bottom: 20px">
                <svg style="float:left;margin-right:15px" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0c-2.756 0-5.353.52-7.788 1.563-2.436 1.041-4.56 2.467-6.37 4.278-1.812 1.811-3.238 3.935-4.28 6.37C.522 14.648 0 17.245 0 20c0 2.756.52 5.353 1.563 7.788 1.041 2.436 2.467 4.56 4.278 6.37 1.811 1.812 3.935 3.238 6.37 4.28C14.648 39.478 17.245 40 20 40c2.756 0 5.353-.52 7.788-1.563 2.436-1.041 4.56-2.467 6.37-4.278 1.812-1.811 3.238-3.935 4.28-6.37C39.479 25.352 40 22.755 40 20c0-2.756-.52-5.353-1.562-7.788-1.042-2.436-2.468-4.56-4.28-6.37-1.81-1.812-3.934-3.238-6.37-4.28C25.353.522 22.756 0 20 0zm11.154 15.577L16.587 30.144a.922.922 0 0 1-.674.289.922.922 0 0 1-.673-.289l-.288-.288-8.029-8.077a.922.922 0 0 1-.288-.673c0-.257.096-.481.288-.673l1.971-1.971a.922.922 0 0 1 .673-.289c.257 0 .481.096.673.289l5.673 5.72L27.837 12.26a.922.922 0 0 1 .673-.289c.256 0 .48.096.673.289l1.97 1.97a.922.922 0 0 1 .29.674c0 .256-.097.48-.29.673z" fill="#2BB56F" fill-rule="evenodd"></path>
                </svg>
                <p style="color:#303137;line-height: 40px;">カートに入りました</p>
              </div>
              `;
            this.loadCartCount();
            return this.$confirm(html, '', {
              confirmButtonText: 'ご注文へ',
              cancelButtonText: '商品選択画面へ戻る',
              dangerouslyUseHTMLString: true
            });
          })
          .then(() => {
            this.$router.push('/cart');
          })
          .catch(err => {
            if (err === 'cancel') {
              return;
            }
            errorHandler(err);
          });
      },
      submitOrder() {
        if (this.goodsInfo.status !== 1) { // 出售中
          return;
        }
        const {min, max} = this.goodsInfo._limit;
        this.count = +this.count;
        if (this.count > max) {
          return this.$alert(`この機器は一人の購入制限があります${max}台`);
        }
        if (!/^[1-9]\d*$/.test(this.count + '')) {
          this.count = min;
        }
        const params = {};
        const serviceType = this.serviceType;
        params.token = this.token;
        const orderGoodsVos = [];
        orderGoodsVos.push({
          batchGoodsId: this.$route.query.pId,
          goodsCount: this.count,
          serviceType: serviceType
        });
        params.orderGoodsVos = orderGoodsVos;
        OrderAPI.create(params)
          .then(res => {
            this.$store.commit(UPDATE_PRE_ORDER, res);
            this.$router.push('/cart/preorder');
          })
          .catch(errorHandler);
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
        if (goodsInfo.surplusNum) { //剩余库存
          arr.push(+goodsInfo.surplusNum);
        }
        const max = Math.min.apply(null, arr);
        return {min, max};
      },
      getProductsParams() {
        const goodsId = this.goodsInfo.goodsId;
        GoodsAPI.goodsAttribute(goodsId, 3)
          .then(res => res.result || [])
          .then(res => {
            this.minerParams = res;
          })
          .catch(() => {
          });
      },
      loadCartCount() {
        CartAPI.getCartList()
          .then(res => res || {})
          .then(res => res.totalNumber)
          .then(count => {
            this.cartGoodsCount = count > 99 ? '99+' : count;
            this.$store.commit(UPDATE_CARTNUM, count);
          });
      },
      initPage() {
//        const batchGoodsId = this.$route.query.pId;
//        this.loadGoodParams(batchGoodsId);
        let res = this.goodsInfo;
        res._limit = this.getLimitCount(res);
        this.count = res._limit.min;
        if (this.goodsInfo.putAwayFree) {
          this.serviceType = 2;
        } else {
          this.serviceType = 1;
        }
      },
      initBreadcrumb() {
        const breadcrumb = {
          label: this.goodsInfo.goodsName + '機器詳細',
          parentsList: [
            {
              path: '/product',
              label: `マイニング機器`
            }
          ]
        };
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      }
    },
    watch: {
      isLogin: {
        handler(val) {
          if (val) {
            this.loadCartCount();
          }
        },
        immediate: true
      },
      robotSelectIndex(val) {
        if (val === 1) {
          this.getProductsParams();
        }
      }
    },
    mounted() {
      this.initPage();
      this.initBreadcrumb();
    }
  };
</script>
<style scoped lang="scss">
  .page {
    background: #fafafa;
    // padding-bottom: 50px;
  }

  .miner-breadcrumb {
    line-height: 40px;
    background: #f6f6f6;

    .inner {
      width: 1200px;
      margin: 0 auto;
    }

    .x-breadcrumb {
      line-height: 40px;
    }
    /*.miner-breadcrumb-detail {*/
    /**/
    /*}*/
  }

  .miner-product-detail {
    background: #fff;
    .miner-detail-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      padding-top: 50px;
      padding-bottom: 18px;
    }
  }

  .miner-image {
    width: 500px;
    height: 500px;
    line-height: 500px;
    padding: 30px;
    background: #F8F8F8;
    border: 1px solid #F5F5F7;
    position: relative;

    img {
      max-width: 440px;
      max-height: 440px;
      vertical-align: middle;
    }
  }

  .miner-image img, .image-wrapper img {
    width: 80%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .change-image {
    position: relative;
    width: 500px;
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 50px;
    li {
      float: left;
      margin-right: 10px;
    }
  }

  .image-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #EDEEF0;
    padding: 5px;

    &.active {
      border: 1px solid #2A5CAA;
    }

    img {
      max-width: 70px;
      max-height: 70px;
    }
  }

  .pre-images, .next-images {
    position: absolute;
    top: 50%;
    font-size: 32px;
    color: #ccc;
    transform: translateY(-50%);
  }

  .pre-images {
    left: 8px;
  }

  .next-images {
    right: 80px;
  }

  .detail-content {
    position: relative;
    margin-left: 84px;
    height: 630px;
  }

  .info-header {
    font-size: 24px;
    color: #303137;
    font-weight: bold;
  }

  .info-intro {
    font-size: 14px;
    color: #D7282D;
    margin: 10px auto 20px;
  }

  .info-shop {
    margin-bottom: 20px;
    // .shop-header {
    //   padding-left: 10px;
    //   height: 41px;
    //   line-height: 41px;
    //   background: #D7282D;
    //   font-size: 18px;
    //   color: #FFFFFF;
    // }
    // .shop-content {
    // padding: 20px 0 20px 10px;
    // background: #F7F7F7;
    // }
  }

  .act-header {
    img {
      max-height: 80px;
      display: block;
    }
  }

  .shop-content .shop-item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }

    &.discount {
      margin-bottom: 23px;
    }

    dt, dd {
      display: inline-block;
      font-size: 14px;
      vertical-align: middle;
      margin: 0;
    }
    dt {
      min-width: 160px;
      color: #303137;
      // font-weight: bold;
    }

    .act-icon {
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .shop-discount {
    color: #4D87EA;
    margin-left: 30px;
    cursor: pointer;
  }

  .shop-item.shop-item-price {
    margin-bottom: 0;
    dt {
      min-width: 72px;
      font-size: 14px;
      color: #303137;
      letter-spacing: 28px;
      // text-align: right;
    }
    .currentPrice {
      font-size: 14px;
      line-height: 18px;
      color: #FD7220;
      font-weight: bolder;
    }
    .originPrice {
      font-size: 14px;
      color: #969699;
      text-decoration: line-through;
      margin-left: 10px;
    }
  }

  .deliver-item {
    margin-bottom: 20px;
    user-select: none;

    &:last-child {
      margin: 0;
    }
    dt, dd {
      display: inline-block;
      margin: 0;
      vertical-align: middle;
    }
    dt {
      min-width: 86px;
      font-size: 14px;
      color: #969699;
    }
  }

  .deliver-item.time {
    dd {
      font-size: 18px;
      color: #303137;
      letter-spacing: 0;
      line-height: 24px;
    }
  }

  .deliver-item.choose {
    dt, dd {
      display: block;
    }
    dt {
      padding-bottom: 11px;
    }
    dd {
      width: 100%;
    }
    .chooseRadio {
      padding: 30px 0 30px 42px;
      border: 1px solid #EEEEEE;
      margin-bottom: 10px;
      display: flex;
      // align-items: center;
      .chooseBtn {
        width: 14px;
        height: 14px;
        border: 1px solid #EFEFEF;
        border-radius: 50%;
        color: #FD7220;
        margin-right: 30px;
        margin-top: 18px;
        .checkedBox {
          width: 14px;
          height: 14px;
          &.active {
            background-image: url('../../assets/images/xuanze_pressed.png');
            background-size: 14px 14px;
          }
        }
      }
      .iconImg {
        width: 50px;
        height: 50px;
        background: #EFEFEF;
      }
      .iconImg.tuoguan {
        background-image: url('../../assets/images/icon_tuoguan_normal@2x.png');
        background-size: 50px 50px;
      }
      .iconImg.peisong {
        background-image: url('../../assets/images/icon_peisong_normal@2x.png');
        background-size: 50px 50px;
      }
      .chooseContent {
        padding-left: 20px;
        .chooseContentTop {
          color: #969699;
          span:first-child {
            margin-right: 10px;
            font-size: 18px;
            line-height: 24px;
            &.active {
              color: #FD7220;
            }
          }
          .iconfont, .icon-help {
            font-size: 14px;
          }
        }
        .chooseContentBottom {
          padding-top: 8px;
          font-size: 14px;
          color: #969699;
          line-height: 19px;
        }
      }
    }

    .chooseRadio:hover {
      border: 1px solid #FD7220;
    }

    .chooseRadio:last-child {
      margin-bottom: 0px;
    }
  }

  .deliver-item.num {
    height: 38px;
    line-height: 38px;
    dt {
      font-size: 14px;
      color: #969699;
      letter-spacing: 28px;
    }
  }

  .deliver-item .limit {
    font-size: 18px;
    color: #303137;
    font-weight: bold;
    margin: 0 20px;
  }

  .deliver-item .limit-num {
    font-size: 14px;
    color: #969699;
    padding-left: 20px;
  }

  .deliver-item.price dd {
    font-size: 18px;
    color: #303137;
  }

  .deliver-item.yh dd {
    font-size: 18px;
    color: #3C3C3F;
  }

  .deliver-item.goodsPrice {
    dt {
      font-size: 14px;
      color: rgba(26, 27, 30, 0.90);
      letter-spacing: 28px;
      font-weight: bolder;
    }
    dd {
      overflow: hidden;
      .goodsPrices {
        font-size: 28px;
        color: #FD7220;
        line-height: 36px;
        font-weight: bolder;
        display: block;
        float: left;
      }
      .goodsPricesTip {
        font-size: 14px;
        color: #969699;
        line-height: 19px;
        // margin-bottom: 3px;
        margin-left: 20px;
        display: block;
        float: left;
        margin-top: 9px;
      }
    }
  }

  .deliver-item.pay dd {
    font-size: 24px;
    color: #FD7220;
  }

  .deliver-item .login-in {
    color: #4D87EA;
    text-decoration: underline;
    cursor: pointer;
  }

  .num-box {
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 40px;
    height: 40px;
    border: 1px solid #efefef;
    display: inline-block;
  }

  .num-box span {
    position: absolute;
    display: inline-block;
    width: 38px;
    height: 38px;
    background: #EFEFEF;
    top: 0;
    cursor: pointer;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .num-box input {
    width: 75px;
    height: 38px;
    border: none;
    text-align: center;
    vertical-align: top;
  }

  .shop-pay {
    margin-top: 40px;
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: 0;*/
  }

  .carBtn {
    width: 172px;
    height: 54px;
    border-radius: 0;
    padding: 0;
    line-height: 54px;
    font-size: 18px;
    color: #fff;
    background: #2A5CAA;
    font-weight: bolder;
    margin-left: 20px;
  }

  .shopBtn {
    width: 172px;
    height: 54px;
    border-radius: 0;
    padding: 0;
    line-height: 54px;
    font-size: 18px;
    color: #2A5CAA;
    background: #FFF;
    font-weight: bolder;
  }

  .btn-black {
    background-color: transparent;
    border-color: #303030;
    color: #303137;
    transition: all 0.5s;
    &.btn-disabled {
      color: #fff;
    }
  }

  .btn-black:hover {
    color: #fff;
    background: #303137;
  }

  .btn.btn-disabled {
    background-color: #ddd;
    border-color: #ddd;
  }

  .shop-cart {
    position: absolute;
    top: 500px;
    right: 0;
  }

  .go-cart {
    width: 50px;
    height: 50px;
    background: #2A5CAA;
    text-align: center;
    padding-top: 15px;
    cursor: pointer;
    display: inline-block;
    position: relative;

    .badge {
      border-radius: 18px;
      background-color: #EA4D4D;
      color: #fff;
      font-size: 12px;
      padding: 3px 6px 2px;
      position: absolute;
      right: 5px;
      top: 5px;
      vertical-align: middle;
    }
  }

  .hash-intro {
    margin-top: 50px;
  }

  .summary-item {
    padding: 21px 0 23px;
    background: #F8F8F8;
    text-align: center;
    color: #303137;
    line-height: 70px;

    img {
      max-height: 70px;
      max-width: 65px;
      vertical-align: middle;
    }
    .intro-text {
      font-size: 14px;
      margin: 20px 0 10px;
      line-height: 1;
    }
    .intro-num {
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
    }
  }

  .hash-list-tip {
    padding-top: 12px;
    font-size: 12px;
    color: #969699;
  }

  .robot-list {
    padding-top: 50px;
  }

  .tabs-header {
    height: 60px;
    line-height: 60px;
    /*margin-bottom: 40px;*/
    background: #F8F8F8;
    ul > li {
      float: left;
      // width: 132px;
      padding: 0 24px;
      text-align: center;
      font-size: 18px;
      color: #303137;
      cursor: pointer;
      transition: all 0.5s;
      &.active {
        background: #2A5CAA;
        color: #fff;
        // font-weight: bold;
      }
    }
  }

  .tabs-body {
    padding-top: 40px;
    .imgBox {
      max-width: 100%;
      img {
        max-width: 100%;
      }
    }
  }

  .tabs-pane {
    border: 1px solid #e3e3e3;
    img {
      vertical-align: top;
    }
  }

  .tabs-pane-policy {
    padding: 72px 0 70px 106px;
    color: #303030;
    font-size: 20px;
    h3 {
      line-height: 40px;
      &.second {
        margin-top: 40px;
      }
    }
    p {
      line-height: 40px;
    }
  }

  .params {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 80px;
  }

  .params-title {
    font-size: 24px;
    color: #303030;
    margin-top: 40px;
    margin-bottom: 30px;
    text-align: center;
  }

  .params-info__item {
    padding: 17px 0;
    width: 750px;
    padding-left: 79px;
    margin: auto;
    display: flex;

    &:nth-child(2n+1) {
      background-color: #F8F8F8;;
    }

    dt, dd {
      display: inline-block;
      font-size: 14px;
      margin: 0;
    }
    dt {
      color: #9b9b9b;
      // min-width: 100px;
      flex: 0 0 100px;
    }

    dd {
      margin-left: 20px;
      color: #000;
    }
  }

  .tb-rule {
    width: 100%;
    line-height: 28px;
    text-align: center;
    border-spacing: 0;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;

    th, td {
      border: 1px solid #ccc;
      border-right: 0;
      border-top: 0;
      padding: 0;
    }
  }

  .toolTip {
    border: 1px solid #fff;
  }
</style>
