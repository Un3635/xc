<template>
  <div class="page">
    <div class="breadcrumb-bar">
      <x-breadcrumb class="breadcrumb"/>
    </div>
    <div class="miner-product-detail">
      <div class="miner-detail-wrapper">
        <el-row>
          <el-col :span="10">
            <div class="miner-image">
              <span v-if="goodsType === 1" class="by-plan"></span>
              <img :src="get(goodsInfo,`imageUrlList[${selectedImgIndex}]`)" alt="">
            </div>
            <div class="change-image clearfix" v-if="goodsInfo.imageUrlList&&goodsInfo.imageUrlList.length>0">
              <div class="pre-images" @click="preImg">
                <i class="el-icon-arrow-left"></i>
              </div>
              <ul class="image-switch" v-if="goodsInfo.imageUrlList&&goodsInfo.imageUrlList.length>0">
                <li v-for="(img,idx) in get(goodsInfo,'imageUrlList',[])" :key="img" @click="selectedImgIndex=idx">
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
                <div class="act-header">
                  <img v-if="actHeadImg" :src="actHeadImg" alt="">
                </div>
                <div class="shop-content">
                  <div class="shop-item" v-for="act in activityList" :key="act.id">
                    <dt>
                      <svg class="act-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd">
                          <rect fill="#E23434" width="20" height="20" rx="3"></rect>
                          <text font-family="ReeJi-BigRuixain-BlackGBV1.0" font-size="12" font-weight="700" fill="#FFF">
                            <tspan x="4" y="14">{{act.activityType | iconText}}</tspan>
                          </text>
                        </g>
                      </svg>
                      {{act.title}}{{act.activityType === 2 ? '/' + goodsType != 1 ? '台' : '份' : ''}}
                    </dt>
                    <dd>
                      {{act.description}}
                      <el-popover v-if="act.activityType===2&&rewardList" placement="bottom" width="400"
                                  trigger="click">
                        <table class="tb-rule">
                          <tr>
                            <th>矿工等级</th>
                            <th>好友返现</th>
                            <th>您的优惠</th>
                            <th v-if="isShowRemarkCol(rewardList)">备注</th>
                          </tr>
                          <tr v-for="(rule,idx) in rewardList" :key="idx">
                            <td>{{rule.minerGrade}}</td>
                            <td>{{rule.inviterWithdrawal}}元/{{goodsType != 1 ? '台' : '份'}}</td>
                            <td>{{rule.inviteeDiscounts}}元/{{goodsType != 1 ? '台' : '份'}}</td>
                            <td v-if="isShowRemarkCol(rewardList)">{{rule.remark || '-'}}</td>
                          </tr>
                        </table>
                        <span class="shop-discount" slot="reference" @click="getRewardRuleList">奖励规则</span>
                      </el-popover>
                    </dd>
                  </div>
                  <div class="shop-item shop-item-price">
                    <dt v-if="isShowSalePrice">单价:</dt>
                    <dd>
                      <span class="currentPrice" v-if="isShowSalePrice">
                        <span
                          v-if="goodsInfo.status===1">{{goodsInfo.goodSalePrice | currency}}元/{{goodsType != 1 ? '台' : '份'}}</span>
                        <span v-else-if="goodsInfo.status===2">{{goodsInfo.goodSalePrice}}</span>
                        <span v-else>{{goodsInfo.goodSalePrice}}元/{{goodsType != 1 ? '台' : '份'}}</span>
                      </span>
                      <span class="originPrice" v-if="goodsInfo.status!==2&&goodsInfo.goodsPrice">
                        <span>原价：</span>
                        <span
                          v-if="goodsInfo.goodsPrice">{{goodsInfo.goodsPrice | currency}}元/{{goodsType != 1 ? '台' : '份'}}</span>
                      </span>
                    </dd>
                  </div>
                </div>
              </div>
              <div class="deliver">
                <div class="deliver-item">
                  <dt>{{goodsType != 1 ? '发货时间' : '交割日期'}}</dt>
                  <dd>
                    <span
                      v-if="goodsType != 1">{{goodsInfo.startSendTime | date('MM月DD日')}}-{{goodsInfo.endSendTime | date('MM月DD日')}}</span>
                    <span v-else>{{goodsInfo.trustStartTime | date('YYYY-MM-DD')}}</span>
                  </dd>
                </div>
                <div class="deliver-item" v-if="goodsType === 1">
                  <dt>剩余</dt>
                  <dd v-if="goodsInfo.status != 2">{{goodsInfo.surplusNum | currency('', 0)}}份</dd>
                  <dd v-else>0份</dd>
                </div>
                <div class="deliver-item num">
                  <dt>数量</dt>
                  <dd>
                    <el-input-number :min="goodsInfo._limit.min||1" :max="goodsInfo._limit.max" v-model="count"/>
                    <span class="limit">{{goodsType != 1 ? '台' : '份'}}</span>
                    <span class="limit-num">
                      <span v-if="goodsInfo.buyLimit>0">{{goodsInfo.buyLimit}}{{goodsType != 1 ? '台' : '份'}}起购</span>
                      <span v-if="goodsInfo.buyLimit>0&&goodsInfo.orderLimit>0">,</span>
                      <span
                        v-if="goodsInfo.orderLimit>0">每笔限购{{goodsInfo.orderLimit}}{{goodsType != 1 ? '台' : '份'}}</span>
                      <span v-if="(goodsInfo.buyLimit>0||goodsInfo.orderLimit>0)&&goodsInfo.userLimit>0">,</span>
                      <span
                        v-if="goodsInfo.userLimit>0">每人限购{{goodsInfo.userLimit}}{{goodsType != 1 ? '台' : '份'}}</span>
                    </span>
                  </dd>
                </div>
                <div class="deliver-item price" v-if="goodsType != 1">
                  <dt>应付</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1">{{goodsInfo.goodSalePrice * count | currency}}元</span>
                    <span v-else>--</span>
                  </dd>
                </div>
                <div class="deliver-item yh" v-if="isShowDiscount">
                  <dt>优惠</dt>
                  <dd>
                    <span v-if="isLogin">{{discountAmount * count | currency}}元</span>
                    <span v-else><span class="login-in" @click="login">登录</span>后，查看优惠金额</span>
                  </dd>
                </div>
                <div class="deliver-item pay">
                  <dt>实付</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1">{{actualPrice | currency}}元</span>
                    <span v-else>--</span>
                  </dd>
                </div>
              </div>
              <div class="shop-pay">
                <el-button class="btn" type="primary" :class="{'btn-disabled':goodsInfo.status!==1}"
                           :disabled="goodsInfo.status!==1" @click="submitOrder">
                  {{btnText}}
                </el-button>
                <el-button class="btn" :class="{'btn-disabled':goodsInfo.status!==1}" :disabled="goodsInfo.status!==1"
                           type="primary" @click="addToCart" v-if="goodsType != 1">
                  <svg width="15" height="14">
                    <use xlink:href="#cart"></use>
                  </svg>
                  加入购物车
                </el-button>
              </div>
              <div class="shop-cart">
                <nuxt-link class="go-cart" to="/cart">
                  <span class="badge" v-if="cartGoodsCount>0">{{cartGoodsCount}}</span>
                  <svg width="24" height="21">
                    <use xlink:href="#cart"></use>
                  </svg>
                </nuxt-link>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="hash-intro">
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
                <li @click="robotSelectIndex=0" :class="{'active':robotSelectIndex===0}">矿机详情</li>
                <li @click="robotSelectIndex=1" v-if="goodsType != 1" :class="{'active':robotSelectIndex===1}">矿机参数</li>
                <li v-if="goodsType != 1" @click="robotSelectIndex=2" :class="{'active':robotSelectIndex===2}">售后政策</li>
                <li v-if="goodsType == 1" @click="robotSelectIndex=3" :class="{'active':robotSelectIndex===3}">常见问题</li>
              </ul>
            </div>
            <div class="tabs-body">
              <div class="tabs-pane" v-if="robotSelectIndex===0" v-html="goodsInfo.goodsContent"></div>
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
                <h3>矿机不同于消费类电子产品，而是根据顾客需求特殊定制的、用于投资的产品，投资需谨慎。</h3>
                <h3>本产品售后服务政策如下，一旦购买，即视为对本政策的认同。</h3>
                <p>1、无论是否发货，付款后均不能退款、退货；</p>
                <p>2、矿机产品的保修期为自发货之日起180天；</p>
                <p>3、由于市场波动，在您购买后，产品价格可能会随时调整，我们不承担事先通知、价格补偿的义务。</p>
                <h3 class="second">以下情况会使保修失效</h3>
                <p>1、矿机本身被拆卸，私自改动、更换元器件；</p>
                <p>2、雷击，电压浪涌，劣质电源等造成的损坏；</p>
                <p>3、进水、电路板和元器件受潮、出现腐蚀造成的损坏；</p>
                <p>4、电路板存在烧毁痕迹的或者芯片被烧毁的；</p>
                <p>5、超频。</p>
              </div>
              <div v-if="robotSelectIndex===3" class="tabs-pane-question">
                <ul>
                  <li v-for="item in questionList" :key="item.id">
                <span @click="questionIndex===item.id ? questionIndex=-1 : questionIndex=item.id">
                  <i :class="[questionIndex===item.id ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  <span class="">{{item.question}}</span>
                </span>
                    <div v-if="questionIndex===item.id">{{item.answer}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ProductAPI from '../../services/product-api';
  import {
    UPDATE_BREADCRUMB,
    UPDATE_CARTNUMBER,
    UPDATE_PRE_ORDER,
    UPDATE_TRACKER_GOODS_ITEM
  } from '../../store/mutation-types';
  import CartAPI from '../../services/cart-api';
  import errorHandler from '../../services/error-handler';
  import PowerAPI from '../../services/power-api';
  import get from 'lodash.get';
  import dateFilter from '../../utils/filters/date-filter';
  import {mapState, mapGetters} from 'vuex';
  import OrderAPI from '../../services/order-api';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import {ContractProductProblem} from '../../config/constants';

  export default {
    components: {XBreadcrumb},
    head() {
      let product = this.goodsInfo;
      let productName = this.goodsInfo.goodsName;
      return {
        title: `${productName}报价_参数_图片算力功耗-算立方`, // set a title
        meta: [
          {                 // set meta
            hid: 'keywords',
            name: 'keywords',
            content: `${productName}报价多少钱,${productName}参数怎么样,${productName}图片,${productName}算力多少`
          },
          {
            hid: 'description',
            name: 'description',
            content: `算立方出售${productName}是一款${product.computing + product.computingUnit}算力的${product.goodsCategoryName || ''}矿机,该矿机可挖${product.currenyName || ''}。`
          }
        ]
      };
    },
    breadcrumb() {
      return {
        label: '矿机详情',
        parentsList: [
          {
            path: '/product',
            label: '矿机'
          }
        ]
      };
    },
    computed: {
      ...mapState({
        token: 'token'
      }),
      ...mapGetters({
        isLogin: 'login'
      }),
      btnText() {
        const goodsInfo = this.goodsInfo;
        const saleTime = goodsInfo.saleTime || new Date();
        switch (goodsInfo.status) {
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
          default:
            return '暂未开售';
        }
      },
      actHeadImg() {
        let firstImg, secondImg, defaultImg;
        if (this.goodsInfo.goodsPrice) { // 有原价时才显示默认背景
          defaultImg = this.goodsInfo.backGroundImg;
        }
        if (this.activityList) {
          this.activityList.forEach(item => {
            if (item.activityType === 2) { //邀请
              secondImg = item.backGroundImg;
            }
            if (item.activityType === 1) { //满赠
              firstImg = item.backGroundImg;
            }
          });
        }
        return firstImg || secondImg || defaultImg;
      },
      actualPrice() {
        let goodsInfo = this.goodsInfo || {};
        let salePrice = goodsInfo.goodSalePrice || 0;
        let discountAmount = this.discountAmount || 0;
        let count = +this.count;
        if (this.isShowDiscount) {
          return (salePrice - discountAmount) * count;
        } else {
          return salePrice * count;
        }
      },
      isShowSalePrice() {
        let item = this.goodsInfo;
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSalePriceType !== 1;
        } else {
          return item.soldOutPriceType !== 1;
        }
      },
      isShowDiscount() {
        return (this.activityList || []).some(item => item.activityType === 2);
      }
    },
    asyncData({route, error}) {
      const batchGoodsId = route.query.pId;
      if (!batchGoodsId) {
        return error({statusCode: 404, message: 'Page Not Found'});
      }
      return ProductAPI.getGoodsInfo(batchGoodsId)
        .then(res => {
          res._limit = {};
          return {
            goodsInfo: res,
            goodsType: res.goodsType
          };
        })
        .catch(() => {
          error({statusCode: 404, message: 'Page Not Found'});
        });
    },
    data() {
      return {
        goodsInfo: {
          _limit: {}
        },
        summaryList: [],
        sourceTime: '',
        minerParams: [],
        count: 1, // 购买数量
        selectedImgIndex: 0,
        robotSelectIndex: 0,
        activityList: [],
        discountAmount: 0,
        inviteCommissionId: '',  // 邀请奖励id
        rewardList: [],  //奖励列表
        cartGoodsCount: 0,
        questionList: ContractProductProblem,
        questionIndex: ''
      };
    },
    filters: {
      iconText(val) {
        switch (val) {
          case 1:
            return '促';
          case 2:
            return '邀';
          default:
            return '惠';
        }
      }
    },
    methods: {
      get,
      isShowRemarkCol(arr) {
        return arr && arr.some(item => item.remark);
      },
      nextImg() {
        if (this.selectedImgIndex < this.goodsInfo.imageUrlList.length - 1) {
          this.selectedImgIndex++;
        }
      },
      preImg() {
        if (this.selectedImgIndex > 0) {
          this.selectedImgIndex--;
        }
      },
      addToCart() {
        if (this.goodsInfo.status !== 1) {
          return;
        }
        const batchGoodsId = this.goodsInfo.batchGoodsId;
        const {min, max} = this.goodsInfo._limit;
        CartAPI.getItem(batchGoodsId)
          .then(res => {
            const remoteCount = +res;
            let count = +this.count;
            const total = remoteCount + count;
            if (remoteCount > max) {
              return Promise.reject({msg: '您购物车中已存在' + remoteCount + '件该产品'});
            }
            if (remoteCount > 0 && total > max) {
              const errMsg = `您购物车中已存在${remoteCount}件该产品,您还能添加${max - remoteCount}件该产品`;
              return Promise.reject({msg: errMsg});
            }
            if (total > max) {
              return Promise.reject({msg: '购买数量超过限制'});
            }
            return CartAPI.update(batchGoodsId, total);
          })
          .then(() => {
            let html = `
              <div class="clearfix" style="margin-bottom: 20px">
                <svg style="float:left;margin-right:15px" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0c-2.756 0-5.353.52-7.788 1.563-2.436 1.041-4.56 2.467-6.37 4.278-1.812 1.811-3.238 3.935-4.28 6.37C.522 14.648 0 17.245 0 20c0 2.756.52 5.353 1.563 7.788 1.041 2.436 2.467 4.56 4.278 6.37 1.811 1.812 3.935 3.238 6.37 4.28C14.648 39.478 17.245 40 20 40c2.756 0 5.353-.52 7.788-1.563 2.436-1.041 4.56-2.467 6.37-4.278 1.812-1.811 3.238-3.935 4.28-6.37C39.479 25.352 40 22.755 40 20c0-2.756-.52-5.353-1.562-7.788-1.042-2.436-2.468-4.56-4.28-6.37-1.81-1.812-3.934-3.238-6.37-4.28C25.353.522 22.756 0 20 0zm11.154 15.577L16.587 30.144a.922.922 0 0 1-.674.289.922.922 0 0 1-.673-.289l-.288-.288-8.029-8.077a.922.922 0 0 1-.288-.673c0-.257.096-.481.288-.673l1.971-1.971a.922.922 0 0 1 .673-.289c.257 0 .481.096.673.289l5.673 5.72L27.837 12.26a.922.922 0 0 1 .673-.289c.256 0 .48.096.673.289l1.97 1.97a.922.922 0 0 1 .29.674c0 .256-.097.48-.29.673z" fill="#2BB56F" fill-rule="evenodd"></path>
                </svg>
                <p style="color:#303137;line-height: 40px;">成功加入购物车！</p>
              </div>
              `;
            this.loadCartCount();
            return this.$confirm(html, '提示', {
              confirmButtonText: '去结算',
              cancelButtonText: '继续购物',
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
        this.count = +this.count;
        const batchGoodsIds = [this.goodsInfo.batchGoodsId];
        const count = [this.count];
        OrderAPI
          .create(batchGoodsIds, count)
          .then(res => {
            this.$store.commit(UPDATE_PRE_ORDER, res);
            let trackerGoodsItems = [];
            trackerGoodsItems.push({
              skuId: this.goodsInfo.batchGoodsId,
              skuName: this.goodsInfo.goodsName,
              category: '矿机',
              Price: this.actualPrice,
              Quantity: this.count
            });
            this.$store.commit(UPDATE_TRACKER_GOODS_ITEM, trackerGoodsItems);
            if (this.goodsType === 1) {
              this.$router.push({path: '/buy', query: {source: 'contract-product'}});
            } else {
              this.$router.push({path: '/buy'});
            }
          })
          .catch(errorHandler);
      },
      login() {
        const redirectUrl = this.$route.fullPath;
        this.$router.push({
          path: '/sign-in',
          query: {
            redirectUrl
          }
        });
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
      loadDiscountedPrice() {
        const batchGoodsId = this.$route.query.pId;
        ProductAPI.getDiscountedPric(batchGoodsId)
          .then(res => res.result || 0)
          .then(res => {
            this.discountAmount = res;
          })
          .catch(() => {
          });
      },
      loadActivityList() {
        const batchGoodsId = this.$route.query.pId;
        let token = this.isLogin ? this.token : '';
        ProductAPI.getGoodsActivityList(token, batchGoodsId, 1, 1)
          .then(res => res.result || [])
          .then(res => {
            if (res && res.length > 0) {
              res.sort((value, value1) => value.activityType - value1.activityType);
              this.inviteCommissionId = (res.filter(item => item.activityType === 2)[0] || {}).activityId || '';
            }
            this.activityList = res;
          });
      },
      // 点击获取奖励规则
      getRewardRuleList() {
        ProductAPI.getRewardRuleList(this.inviteCommissionId)
          .then(res => res.result)
          .then(res => {
            this.rewardList = res;
          });
      },
      loadGoodParams(goodsId) {
        // 矿机功率，电费
        PowerAPI.getGoodsAttributeList(goodsId, 1)
          .then(res => res.result || [])
          .then(res => {
            res.forEach(item => {
              if (item.mark === 'ATTR_T') {
                this.sourceTime = item.value;
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
            this.summaryList = res.filter(item => item.mark !== 'ATTR_T');
          })
          .catch(() => {
          });
      },
      getProductsParams() {
        const goodsId = this.goodsInfo.goodsId;
        PowerAPI.getGoodsAttributeList(goodsId, 3)
          .then(res => res.result || [])
          .then(res => {
            this.minerParams = res;
          })
          .catch(() => {
          });
      },
      loadCartCount() {
        CartAPI.get()
          .then(res => res || {})
          .then(res => res.totalNumber)
          .then(count => {
            this.$store.commit(UPDATE_CARTNUMBER, count);
            this.cartGoodsCount = count > 99 ? '99+' : count;
          });
      },
      initPage() {
        this.goodsInfo._limit = this.getLimitCount(this.goodsInfo);
        const batchGoodsId = this.$route.query.pId;
        this.count = this.goodsInfo._limit.min;
        this.loadGoodParams(batchGoodsId);
        this.updateBreadcrumb();
      },
      updateBreadcrumb() {
        const breadcrumb = {
          label: this.goodsInfo.goodsName,
          parentsList: [
            {
              path: '/product',
              label: '矿机'
            }
          ]
        };
        if (this.$route.query.source === 'contract-product') {
          breadcrumb.parentsList = [
            {label: '币盈计划', path: '/contract-product'}
          ];
        }
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      }
    },
    watch: {
      isLogin: {
        handler(val) {
          this.loadActivityList();
          if (val) {
            this.loadCartCount();
            this.loadDiscountedPrice();
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
    }
  };
</script>
<style scoped lang="scss">
  .page {
    background: #fafafa;
    padding-bottom: 50px;
  }

  .breadcrumb-bar {
    background: #F8F8F8;
  }

  .breadcrumb {
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
  }

  .miner-product-detail {
    background: #fff;
    .miner-detail-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      padding-top: 50px;
      padding-bottom: 60px;
    }
  }

  .miner-image {
    width: 500px;
    height: 500px;
    background: #F8F8F8;
    border: 1px solid #F5F5F7;
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
    &.active {
      border: 1px solid #303030;
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
    margin: 10px auto 12px;
  }

  .info-shop {
    margin-bottom: 20px;
    .shop-header {
      padding-left: 10px;
      height: 41px;
      line-height: 41px;
      background: #D7282D;
      font-size: 18px;
      color: #FFFFFF;
    }
    .shop-content {
      padding: 20px 0 20px 10px;
      background: #F7F7F7;
    }
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
      font-weight: bold;
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
      text-align: right;
    }
    .currentPrice {
      font-size: 18px;
      color: #FD7220;
    }
    .originPrice {
      font-size: 14px;
      color: #969699;
      text-decoration: line-through;
      margin-left: 25px;
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

  .deliver-item.num {
    height: 40px;
    line-height: 40px;
  }

  .deliver-item .limit {
    font-size: 18px;
    color: #303137;
    font-weight: bold;
    margin: 0 20px;
  }

  .deliver-item .limit-num {
    font-size: 14px;
    color: #969699
  }

  .deliver-item.price dd {
    font-size: 18px;
    color: #303137;
  }

  .deliver-item.yh dd {
    font-size: 18px;
    color: #3C3C3F;
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

  .shop-pay {
    margin-top: 55px;
  }

  .btn {
    width: 172px;
    height: 54px;
    border-radius: 0;
    padding: 0;
    line-height: 54px;
    font-size: 18px;
    color: #fff;
    background: #303137;
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
    top: 400px;
    right: 0;
  }

  .go-cart {
    width: 50px;
    height: 50px;
    background: #000;
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
    padding: 18px 0 20px;
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
    padding: 12px 0 22px;
    font-size: 12px;
    color: #969699;
  }

  .tabs-header {
    height: 60px;
    line-height: 60px;
    /*margin-bottom: 40px;*/
    background: #F8F8F8;
    ul > li {
      float: left;
      width: 132px;
      text-align: center;
      font-size: 18px;
      color: #303137;
      cursor: pointer;
      transition: all 0.5s;
      &.active {
        background: #303030;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .tabs-body {
    padding-top: 40px;
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
    line-height: 50px;
    width: 750px;
    padding-left: 79px;
    margin: auto;

    &:nth-child(2n+1) {
      background-color: #f3f3f3;
    }

    dt, dd {
      display: inline-block;
      font-size: 14px;
      margin: 0;
    }
    dt {
      color: #9b9b9b;
      min-width: 100px;
    }

    dd {
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

  .tabs-pane-question {
    padding-left: 50px;
    padding-top: 40px;
    li {
      margin-bottom: 30px;
    }
    span {
      cursor: pointer;
      &:hover {
        color: #4D87EA;
      }
    }
    i {
      font-size: 10px;
      margin-right: 14px;
    }
    div {
      margin-top: 16px;
      padding: 16px 30px;
      background: #F8F8F8;
      font-size: 14px;
      color: #606166;
      line-height: 21px;
    }
  }
</style>
