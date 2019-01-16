<template>
  <div class="calc-force-detail">
    <view-box body-padding-top="0" body-padding-bottom="50px" ref="viewBox">
      <tab :line-width="0" active-color="#303137" default-color="#969699" v-model="tabIndex" :animate="false"
           v-show="isShowFixed" class="tab-header"
           slot="header">
        <tab-item v-for="(item, index) in list" :key="index">{{item}}</tab-item>
      </tab>
      <div class="wrap-box">
        <div ref="topHeight">
          <div class="product-banner">
            <header class="clearfix">
              <div class="go-back left" @click="$router.go(-1)">
                <img src="../../assets/images/icon_xiangqingfanhui_presseds@2x.png" alt="">
              </div>
              <!--<div class="share right">-->
              <!--<img src="../../assets/images/icon_xiangqingfenxiang_normal@2x.png" alt="">-->
              <!--</div>-->
            </header>
            <!--<swiper v-if="goodsInfo.imageUrlList.length != 0" :aspect-ratio="0.8" :show-desc-mask="false"-->
            <!--:list="goodsInfo.imageUrlList" auto-->
            <!--dots-class="custom-bottom" dots-position="center"></swiper>-->
            <swiper :options="swiperOption" ref="mySwiper" v-if="isRender">
              <swiper-slide v-for="(item,index) in goodsInfo.imageUrlList" :key="index">
                <img :src="item" alt="">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="product-title">
            <h3>{{goodsInfo.gName}}</h3>
            <p>{{goodsInfo.gTitle}}</p>
          </div>
          <div class="product-img" v-if="goodsActivityLists.length === 0 && goodsInfo.price">
            <img :src="backGroundImg" alt="">
          </div>
          <div class="product-img" v-else-if="goodsActivityLists.length > 0">
            <img :src="activeBackGroundImg" alt="">
          </div>
          <div class="product-sales" v-if="goodsActivityLists.length > 0">
            <div class="product-cu" v-for="(item, index) in goodsActivityLists" :key="index" v-if="!login">
              <div class="leftImg">
                <img src="../../assets/images/icon_cu_normal@3x.png" alt="满赠" v-if="item.activityType === 1">
                <img src="../../assets/images/icon_yao_normal@3x.png" alt="邀请" v-else-if="item.activityType === 2">
              </div>
              <div class="rightContent">
                <h2>{{item.title}}</h2>
                <p>
                  {{item.description}}
                  <span class="jlButton" @click.stop="jlButton(item.activityId)"
                        v-if="item.activityType === 2"><strong>奖励规则</strong></span>
                </p>
              </div>
            </div>
            <div class="product-cu" v-for="(item, index) in loginGoodsActivityList" :key="index" v-if="login">
              <div class="leftImg">
                <img src="../../assets/images/icon_cu_normal@3x.png" alt="满赠" v-if="item.activityType === 1">
                <img src="../../assets/images/icon_yao_normal@3x.png" alt="邀请" v-else-if="item.activityType === 2">
              </div>
              <div class="rightContent">
                <h2 v-if="item.activityType === 1">{{item.title}}</h2>
                <h2 v-if="item.activityType === 2">{{item.title}}/{{goodsInfo.computingUnit}}</h2>
                <p>
                  {{item.description}}
                  <span class="jlButton" @click.stop="jlButton(item.activityId)"
                        v-if="item.activityType === 2"><strong>奖励规则</strong></span>
                </p>
              </div>
            </div>
          </div>
          <div class="product-price" v-if="goodsInfo.salePrice">
            <span>单价</span>
            <span><strong>{{goodsInfo.salePrice.split('.')[0] || '0'}}</strong></span><strong>.{{goodsInfo.salePrice.split('.')[1] || '0'}}元</strong>
            <span class="goodsPrice" v-if="showYuanPrice && goodsInfo.price"><strong>{{goodsInfo.price}}元</strong></span>
          </div>
          <div class="product-price" v-else>
            <span>单价</span>
            <span class="goodsPrice" v-if="showYuanPrice && goodsInfo.price"><strong>{{goodsInfo.price}}元</strong></span>
          </div>
          <div class="product-info">
            <group class="productInfoCells">
              <cell>
                <span slot="title" class="title">交割日期</span>
                <p class="price" v-if="goodsInfo.deliveryTimeType === 0">次日交割</p>
                <p class="price" v-else-if="goodsInfo.deliveryTimeType === 1">
                  {{goodsInfo.deliveryTime | date('YYYY-MM-DD')}}</p>
              </cell>
              <cell>
                <span slot="title" class="title">剩余</span>
                <p class="price">{{goodsInfo.surplusCube}}{{goodsInfo.computingUnit}}</p>
              </cell>
              <cell class="buyHashRate">
                <span slot="title" class="title">购买</span>
                <div class="buy-num clearfix">
                  <div class="help left">
                    <!-- <img src="../,,/assets/images/icon_tishi_normal@2x.png" alt=""> -->
                  </div>
                  <inline-x-number v-model="count" :min="[2,4].indexOf(goodsInfo.status) == -1 ? 1 : 0"
                                   :max="[2,4].indexOf(goodsInfo.status) == -1 ? goodsInfo.singlePenRestriction-0 : 0"
                                   class="left inlineXNumber"
                                   :fillable="true"
                                   width="45px"></inline-x-number>
                  <span class="left">{{goodsInfo.computingUnit}}</span>
                </div>
              </cell>     
              <cell v-if="goodsInfo.salePrice">
                <span slot="title" class="title">应付</span>
                <p class="price pricecolor" v-if="goodsInfo.salePrice.split('.')[0].indexOf('?') > -1">{{goodsInfo.salePrice}}元</p>
                <p class="price pricecolor" v-else>{{((goodsInfo.salePrice * count).toString().split('.')[0] || '0') | currency('',
                0)}}.{{(goodsInfo.salePrice * count).toString().split('.')[1] || '00'}}元
                </p>
              </cell>
              <cell v-else>
                <span slot="title" class="title">应付</span>
                <p class="price pricecolor" v-if="goodsInfo.price">{{((goodsInfo.price * count).toString().split('.')[0] || '0') | currency('',
                0)}}.{{(goodsInfo.price * count).toString().split('.')[1] || '00'}}元
                </p>
              </cell>
              <cell v-if="showDiscounts">
                <span slot="title" class="title">优惠</span>
                <p class="price" v-if="!login"><span class="loginButton" @click="goSign">登录</span>后，查看优惠金额</p>
                <p class="price" v-else>{{favorablePrice * count || '0'}}元</p>
              </cell>
            </group>
          </div>
          <div class="product-output" v-if="productOutput !== null">
            <img src="../../assets/images/icon_chanchu_normal@3x.png" alt="">
            <p class="title">{{productOutput.key}}</p>
            <p><strong>{{productOutput.value}}</strong></p>
          </div>
          <div class="product-list" v-if="goodsResultList.length !== 0">
            <div class="power" v-for="(item,index) in goodsResultList" :key="index">
              <div class="img">
                <img src="../../assets/images/icon_gonglv_normal@3x.png" alt="功率" v-if="item.mark === 'ATTR_P'">
                <img src="../../assets/images/icon_guanlifei_normal@3x.png" alt="管理费" v-if="item.mark === 'ATTR_M'">
                <img class="dianfeiImg" src="../../assets/images/icon_dianfei_normal@3x.png" alt="电费" v-if="item.mark === 'ATTR_E'">
              </div>
              <p>{{item.key}}</p>
              <p><strong>{{item.value}}</strong></p>
            </div>
          </div>
          <div class="product-text" v-if="productTime !== null">
            *{{productTime.value}}
          </div>
        </div>
        <div class="tab-detail">
          <tab :line-width="0" active-color="#303137" default-color="#969699" v-model="tabIndex" :animate="false">
            <tab-item v-for="(item, index) in list" :key="index">{{item}}</tab-item>
          </tab>
          <div class="imgs tab-detail-list" v-show="tabIndex==0" v-html="detailHtml">
            <!--<img src="../../assets/images/E3xiangqing_bg@2x.png" alt="">-->
          </div>
          <div class="params" v-show="tabIndex==1">
            <p class="sorryParamsTitle" v-if="product.result.length === 0">
              <img class="paramsImg" src="../../assets/images/zanwuneirong@3x.png" alt="">
              <span class="paramsTitle">暂无参数</span>
            </p>
            <div v-for="(param,index) in product.result" :key="index" v-else-if="product.result.length > 0">
              <p class="title">{{param.key}}</p>
              <p>{{param.value}}</p>
            </div>
          </div>
          <div class="questions tab-detail-list" v-show="tabIndex==2">
            <group v-for="(item,index) in questionList" :key="index">
              <cell
                style="font-size: 14px"
                :title="item.question"
                is-link
                :border-intent="false"
                :arrow-direction="questionIndex == item.id ? 'up' : 'down'"
                @click.native="questionIndex==item.id ? questionIndex=-1 : questionIndex=item.id"></cell>
              <p class="slide" :class="questionIndex==item.id ?'animate':''">
                {{item.answer}}
                <span class="wall"></span>
              </p>
            </group>
          </div>
          <div class="records" v-show="tabIndex==3">
            <x-table :cell-bordered="false" :content-bordered="true" rel="xTable" v-if="historyList.length > 0">
              <thead>
              <tr class="border-bottom">
                <th>用户</th>
                <th>数量({{goodsInfo.computingUnit}})</th>
                <th>金额(元)</th>
                <th>购买时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in historyList" :key="item.id">
                <td>{{item.account | phone}}</td>
                <td>{{item.goodsCount}}</td>
                <td>{{item.totalAmount | currency}}</td>
                <td>
                  <time class="time">
                    {{item.createTime | date('YYYY-MM-DD')}}
                    <br>
                    {{item.createTime | date('HH:mm:ss')}}
                  </time>
                </td>
              </tr>
              </tbody>
            </x-table>
            <div class="sorryRecordsTitle" v-else>
              <img class="paramsImg" src="../../assets/images/zanwuneirong@3x.png" alt="">
              <span class="paramsTitle">暂无记录</span>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showDialogTopUp"
                 title="你的账户余额不足，请充值！"
                 :hide-on-blur="true"
                 :close-on-confirm="false"
                 confirm-text="去付款"
                 @on-hide="errorHintText=false"
                 @on-confirm="goPayBtn">
          <div class="prompt">
            <div class="ipt-wrap vux-1px has-unit">
              <input type="text" placeholder="充值金额不得小于100元" v-model="topUpMoney" @focus="initError" name="money">
              <span class="unit">元</span>
              <p class="error-info" v-if="errorHintText">{{errorInfo}}</p>
            </div>
          </div>
        </confirm>
      </div>
      <div v-transfer-dom class="googleVerify">
        <confirm v-model="showDialogGoogle"
                 title="购买确认"
                 :hide-on-blur="true"
                 :close-on-confirm="false"
                 confirm-text="确认购买"
                 @on-hide="clearCode"
                 @on-confirm="goPayOrder">
          <div class="prompt">
            <span class="text">购买须知：虚拟货币受算力难度、币价等多重因素影响。算力为特殊定制的、用于投资的产品，不退不换。</span>
            <div class="ipt-wrap vux-1px">
              <input data-vv-scope="$googleCode" type="text" placeholder="请输入谷歌验证器显示的6位数字" v-validate="'required|code'"
                     name="code" @focus="clearCode" maxlength="6" v-model="verifyCode">
              <p class="error-info" v-show="veeErrors.has('$googleCode.code')">
                {{veeErrors.first('$googleCode.code')}}</p>
            </div>
          </div>
        </confirm>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showjlButton" class="dialog-reward" hide-on-blur mask-transition="vux-fade"
                  :dialog-style="{'height': '265px'}">
          <div class="header">
            <strong>奖励规则</strong>
          </div>
          <x-table :cell-bordered="false" style="background-color:#fff;" :content-bordered="false">
            <thead>
            <tr ref="ruleTitle">
              <th>好友等级</th>
              <th>好友返现</th>
              <th>您的优惠</th>
              <th v-if="showRuleList">备注</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in rewardRuleList" :key="index" ref="ruleBody">
              <td>{{item.minerGrade}}</td>
              <td>{{item.inviterWithdrawal || 0}}元/{{goodsInfo.computingUnit}}</td>
              <td>{{item.inviteeDiscounts || 0}}元/{{goodsInfo.computingUnit}}</td>
              <td v-if="showRuleList">{{item.remark}}</td>
            </tr>
            <tr>
            </tr>
            </tbody>
          </x-table>
        </x-dialog>
      </div>
      <div v-transfer-dom class="phoneVerify">
        <confirm v-model="showDialogPhone"
                 title="购买确认"
                 class="order-confirm-dialog"
                 :hide-on-blur="true"
                 :close-on-confirm="false"
                 confirm-text="确认购买"
                 @on-hide="veeErrors.remove('code','$phoneCode')"
                 @on-confirm="goPayOrder">
          <div class="order-confirm">
            <span class="text">购买须知：虚拟货币受算力难度、币价等多重因素影响。算力为特殊定制的、用于投资的产品，不退不换。</span>
            <p class="phone">
              <span>手机号</span>
              <span>{{userInfo.countryNum}}</span>
              <span>{{userInfo.moblie | phone}}</span>
            </p>
            <div class="vcode vux-1px">
              <div class="code">
                <input type="text" data-vv-scope="$phoneCode" placeholder="短信验证码" name="code"
                       @focus="veeErrors.remove('code','$phoneCode')"
                       maxlength="6" v-model="phoneCode" v-validate="'required|code'">
              </div>
              <div class="vcode-btn">
                <input type="button" :value="sendCodeText" :disabled="sendCodeDisabled" @click="sendCode">
              </div>
              <p class="error-info" v-show="veeErrors.has('$phoneCode.code')">{{veeErrors.first('$phoneCode.code')}}</p>
            </div>
          </div>
        </confirm>
      </div>
      <footer class="detail-footer" slot="bottom">
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="total-price" v-if="[2,4].indexOf(goodsInfo.status) == -1 && goodsInfo.salePrice && goodsInfo.salePrice.split('.')[0].indexOf('?') === -1">
              <span>实付:</span>
              <strong>{{(((goodsInfo.salePrice - favorablePrice) * count).toString().split('.')[0] || '0') | currency('', 0)}}</strong>
              <small>.{{(goodsInfo.salePrice * count).toString().split('.')[1] || '00'}}元</small>
            </div>
          </flexbox-item>
          <flexbox-item :span="5">
            <div class="join-shoppingcart">
              <x-button type="primary" @click.native="submitOrder" :disabled="[1,3].indexOf(goodsInfo.status) == -1"
                        :style="{'font-size': [0].indexOf(goodsInfo.status) != -1 ? '14px' : '16px'}">
                {{getStatusText()}}
              </x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </footer>
    </view-box>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    InlineXNumber,
    XNumber,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    XTable,
    Confirm,
    TransferDom,
    debounce,
    XDialog,
    dateFormat
  } from 'vux';
  import PowerApi from '../../services/power-api';
  // import ProductAPI from '../../services/product-api';
  import AccountApi from '../../services/account-api';
  import UserApi from '../../services/user-api';
  import ActivityApi from '../../services/activity-api';
  import {CommonProblem, OrderType} from '../../config/constants';
  import {mapState} from 'vuex';
  import {MutationTypes} from '../../store/mutations';
  import store from '../../store/index';
  import errorHandler from '../../services/error-handler.js';

  export default {
    title() {
      const product = store.state.calcforce;
      return {
        title: `${product}算力购买-算立方`, // set a title
        description: `算立方提供${product}算力交易,算力交易成功购买后,交割时间结束后，开始产生挖矿收益。`,
        keywords: `${product}算力交易,${product}算力出租,${product}算力租赁`
      };
    },
    data() {
      return {
        isRender: false,
        showDiscounts: false,
        activeBackGroundImg: '',
        questionList: CommonProblem,
        showYuanPrice: false,
        showContent: false,
        showTab: false,
        showjlButton: false,
        list: ['算力介绍', '矿机参数', '常见问题', '购买记录'],
        goodsResultList: [],
        goodsActivityLists: [],
        loginGoodsActivityList: [],
        rewardRuleList: [],
        historyList: [],
        favorablePrice: '',
        tabIndex: 0,
        detailHtml: '',
        shopGoodsId: 0,
        goodsId: '',
        id: '',
        backGroundImg: '',
        productTime: null,
        productOutput: null,
        goodsInfo: {
          price: '',
          imageUrlList: [],
          status: 1,
          salePrice: ''
        },
        product: {
          result: []
        },
        count: '',
        pageNum: 1,
        showRuleList: true,
        pageSize: 20,
        questionIndex: -1,
        tipContent: '',
        tipBtnText: '',
//        是否显示充值dialog
        showDialogTopUp: false,
//        是否显示输入谷歌验证dialog
        showDialogGoogle: false,
//        是否显示输入短信dialog
        showDialogPhone: false,
        accountBalance: 0,
        topUpMoney: '',
        // offsetTop: 0,
        errorHintText: false,
        errorInfo: '充值金额不得小于100元',
        verifyCode: '',
        phoneCode: '',
        sendCodeText: '发送验证码',
        sendCodeDisabled: false,
        timer: null,
        swiperOption: {
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        isShowFixed: false
      };
    },
    components: {
      Group,
      Cell,
      InlineXNumber,
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem,
      XTable,
      Confirm,
      XDialog,
      XNumber
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState(['login', 'userInfo']),
      swiper() {
        if (this.$refs.mySwiper) {
          return this.$refs.mySwiper.swiper;
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$refs['viewBox'].getScrollBody().removeEventListener('scroll', this.scrollHandler);
      if (to.name === '支付结果') {
        next({path: '/calc-force'});
      } else {
        next();
      }
    },
    created() {
      this.goodsId = this.$route.query.id;
      this.jyGoodsInfo();
      this.getGoodsActivityLists();
    },
    mounted() {
      this.isRender = true;
      console.log(this.$refs['viewBox']);
      console.log(this.$refs['viewBox'].getScrollBody());
      this.$refs['viewBox'].getScrollBody().addEventListener('scroll', this.scrollHandler);
    },
    watch: {
      login: {
        handler(val) {
          if (val) {
            this.getAccountInfo();
            this.getDiscountedPrice();
            this.getGoodsActivityList();
          }
        },
        immediate: true
      },
      tabIndex: {
        handler(index) {
          if (index === 0) {
          }
          if (index === 1 && this.goodsInfo.shopGoodsId) {
            this.$vux.loading.show();
            this.getProductParams();
          }
          if (index === 3) {
            this.$vux.loading.show();
            this.getJyOrderList();
          }
        },
        immediate: true
      }
    },
    async asyncData({store, route}) {
      const {id} = route.query;
      await PowerApi.jyGoodsInfo(id, 2)
        .then((res) => {
          store.commit(MutationTypes.UPDATE_CALE_DETAIL, JSON.parse(res).gName);
        });
    },
    methods: {
      judgePrice(item) {
        // openSaleType 1隐藏 2自定义
        // soldOutType 1隐藏 2自定义
        if (Number(item.status) === 0) { // 开售前
          if (item.openSaleType === 1) {
            this.showYuanPrice = false;
          }
        } else if (Number(item.status) === 2) { // 售罄
          if (item.soldOutType === 1) {
            this.showYuanPrice = false;
          }
        }
        this.showYuanPrice = true;
      },
      clearCode() {
        this.veeErrors.remove('code', '$googleCode');
        this.verifyCode = '';
      },
      // 登录前的活动展示
      getGoodsActivityLists() {
        ActivityApi.getGoodsActivityLists(this.$route.query.id, 2, 3)
          .then(res => {
            this.goodsActivityLists = this.sort(res.result);
            this.activeBackGroundImg = this.goodsActivityLists.length > 0 ? this.goodsActivityLists[0].backGroundImg : '';
          })
          .then(() => {
            this.bolList(this.goodsActivityLists);
          });
      },
      // 登录后的活动展示
      getGoodsActivityList() {
        ActivityApi.getGoodsActivityList(this.$route.query.id, 2, 3)
          .then(res => {
            this.loginGoodsActivityList = this.sort(res.result);
          });
      },
      getRewardRuleList(activityId) {
        ActivityApi.getRewardRuleList(activityId)
          .then(res => {
            this.rewardRuleList = this.ruleList(res.result);
            this.showjlButton = true;
          });
      },
      ruleList(list) {
        let n = 0;
        list.forEach(item => {
          if (item.remark === '') {
            item.remark = '-';
            n++;
          }
        });
        if (n === 5) {
          this.showRuleList = false;
        } else {
          this.showRuleList = true;
        }
        return list;
      },
      getDiscountedPrice() {
        ActivityApi.getDiscountedPrice(this.$route.query.id, 2)
          .then(res => {
            this.favorablePrice = res.result;
          });
      },
      getGoodsAttributeList() {
        PowerApi.getGoodsAttributeList(this.id, 2, 1)
          .then(res => {
            if (res) {
              const productList = res.result;
              const arr = [];
              productList.forEach((item, index) => {
                if (item.mark === 'ATTR_T') {
                  this.productTime = productList[index];
                }
                if (item.mark === 'ATTR_O') {
                  this.productOutput = productList[index];
                }
                if (item.mark === 'ATTR_P') {
                  arr.push(productList[index]);
                }
                if (item.mark === 'ATTR_M') {
                  arr.push(productList[index]);
                }
                if (item.mark === 'ATTR_E') {
                  arr.push(productList[index]);
                }
              });
              this.goodsResultList = arr;
            }
          });
      },
      jlButton(activityId) {
        if (this.rewardRuleList.length === 0) {
          this.getRewardRuleList(activityId);
        } else {
          this.showjlButton = true;
        }
      },
      scrollHandler() {
        const height = this.$refs['topHeight'].clientHeight;
        let top = this.$refs['viewBox'].getScrollTop();
        if (top >= height) {
          this.isShowFixed = true;
        } else {
          this.isShowFixed = false;
        }
      },
      goSign() {
        this.$parent.goSignIn();
      },
      jyGoodsInfo() {
        PowerApi.jyGoodsInfo(this.goodsId, 3)
          .then(res => {
            if (res === '{}' || res === 'null') {
              return Promise.reject(null);
            }
            return Promise.resolve(JSON.parse(res));
          })
          .then(data => {
            // 初始化最大及最小购买限制
            const {min, max} = this.getLimitCount(data);
            // if (data.price) {
            //   [data.priceInt, data.priceFloat] = data.price.split('.');
            // } else {
            //   [data.priceInt, data.priceFloat] = ['0', '00'];
            // }
            data._minLimit = Number(min);
            data._maxLimit = Number(max);
            this.goodsInfo = data;
            this.goodsInfo.imageUrlList = this.imgUrlList(data);
            this.count = Number(min);
            this.id = data.id;
            this.backGroundImg = data.backGroundImg;
            this.shopGoodsId = data.shopGoodsId;
            if (data.content !== '{}' && data.content !== 'null') {
              this.detailHtml = data.content;
            }
            if ([2, 4].indexOf(this.goodsInfo.status) !== -1) {
              this.count = 0;
            }
          })
          .then(() => {
            this.getGoodsAttributeList();
            this.judgePrice(this.goodsInfo);
          });
      },
      imgUrlList(data) {
        if (data.imageUrl !== '') {
          data.imageUrlList.unshift(data.imageUrl);
          return data.imageUrlList;
        }
      },
      bolList(list) {
        if (list.length > 0) {
          list.forEach(item => {
            if (item.activityType === 2) {
              this.showDiscounts = true;
              return;
            }
          });
        }
      },
      sort(list) {
        return list.sort((item1, item2) => {
          return Number(item1.activityType) - Number(item2.activityType);
        });
      },
      getLimitCount(goodsInfo = {}) {
        const min = goodsInfo.lowestAmount || 1;
        const stock = goodsInfo.surplusCube;
        let personLimit;
        let orderLimit;
        let arr = [];
        if (goodsInfo.singleRestrictionType === 1) { // 限制
          personLimit = goodsInfo.singleRestriction; // 单人限制
          arr.push(personLimit);
        }
        if (goodsInfo.singlePenRestrictionType === 1) {
          orderLimit = goodsInfo.singlePenRestriction; // 单笔限制
          arr.push(orderLimit);
        }
        arr.push(stock);
        const max = Math.min.apply(null, arr);
        return {min, max};
      },
      getProductParams() {
        PowerApi.getGoodsAttributeList(this.shopGoodsId, 3, 1)
          .then(res => {
            this.$vux.loading.hide();
            this.product = res;
          });
      },
      getJyOrderList() {
        return PowerApi.jyOrderList(this.goodsId, this.pageNum, this.pageSize)
          .then(res => {
            this.$vux.loading.hide();
            let data = JSON.parse(res);
            this.historyList = data.list;
          });
      },
      getAccountInfo() {
        AccountApi.userMoneyTotal()
          .then(res => {
            this.accountBalance = res.totalMoney || 0;
          });
      },
      submitOrder() {
        if (!this.login) {
          return this.$parent.goSignIn();
        }
        PowerApi.personalPowerLimit(this.goodsId)
          .then(res => +res)
          .then(res => {
            if (this.goodsInfo.status !== 1) {
              return;
            }
            if (this.count > this.goodsInfo.surplusCube) {
              this.tipContent = '当前剩余算力不足,<br >请重新选择购买数量';
              this.tipBtnText = '我知道了';
              return this.showTip();
            }
            if (this.count < this.goodsInfo._minLimit) {
              this.tipContent = '该算力最低' + this.goodsInfo._minLimit + this.goodsInfo.computingUnit + '起购';
              this.tipBtnText = '我知道了';
              return this.showTip();
            }
            if (res > 0 && this.count > res) {
              this.tipContent = '该商品超过最大购买限制，剩余可购买数量：' + res + this.goodsInfo.computingUnit;
              this.tipBtnText = '我知道了';
              return this.showTip();
            }
            if (this.count * this.goodsInfo.price > this.accountBalance) {
//              return this.$vux.confirm.show({
//                hideOnBlur: true,
//                confirmText: '去充值',
//                content: '你的账户余额不足，请充值！',
//                onConfirm() {
//                  _this.$router.push({path: '/account'});
//                }
//              });
              this.topUpMoney = '';
              this.showDialogTopUp = true;
              return;
            }
            if (this.userInfo.googleKey) {
              this.verifyCode = '';
              this.showDialogGoogle = true;
            } else {
              this.phoneCode = '';
              this.showDialogPhone = true;
            }
          });
      },
      goPayBtn() {
        if (!/^([0-9]+)$/.test(this.topUpMoney)) {
          this.errorHintText = true;
          this.errorInfo = '请输入正确的金额';
          return;
        }
        if (this.topUpMoney < 100) {
          this.errorHintText = true;
          this.errorInfo = '充值金额不得小于100元';
          return;
        }
        if (this.topUpMoney > 9999999) {
          this.errorHintText = true;
          this.errorInfo = '充值金额过大';
          return;
        }
        UserApi.recharge(this.topUpMoney)
          .then(res => {
            this.showDialogTopUp = false;
            this.$router.push({
              path: '/cashier-center',
              query: {
                order_no: res.orderNo,
                amount: res.amount,
                type: OrderType.RECHARGE,
                redirect_url: this.$router.currentRoute.fullPath
              }
            });
          });
      },
      goPayOrder() {
        const goodsId = this.goodsId;
        const count = this.count;
        const scope = this.userInfo.googleKey ? '$googleCode' : '$phoneCode';
        this.$validator.validateAll(scope)
          .then(res => {
            if (res) {
              return Promise.resolve(res);
            }
            return Promise.reject(null);
          })
          .then(res => {
            if (this.userInfo.googleKey) {
              return UserApi.verify(this.verifyCode);
            }
            return PowerApi.powerValidCode(this.phoneCode);
          })
          .then(res => res.data || res)
          .then(res => res.result)
          .then(res => {
            if (!res) {
              return Promise.reject({msg: '无效的验证码'});
            }
            return PowerApi.jyOrderSubmit(goodsId, count);
          })
          .then(() => {
            if (this.userInfo.googleKey) {
              this.showDialogGoogle = false;
              this.verifyCode = '';
            } else {
              this.showDialogPhone = false;
              this.phoneCode = '';
            }
            this.getAccountInfo();
            this.jyGoodsInfo();
            this.$vux.toast.show({
              type: 'text',
              position: 'middle',
              text: '购买成功，可在【收益】中查看',
              width: '16em'
            });
          })
          .catch(err => {
            errorHandler(err, this);
          });
      },
      sendCode() {
        debounce(() => {
          const countryNum = this.userInfo.countryNum || '';
          const account = this.userInfo.moblie || '';
          PowerApi.hashOrderSms(countryNum, account)
            .then(res => res || {})
            .then(res => res.result)
            .then(() => {
              this.$vux.toast.show({
                type: 'text',
                text: '发送成功',
                position: 'middle'
              });
              let time = 60;
              this.sendCodeDisabled = true;
              this.sendCodeText = time + 's';
              this.timer = setInterval(() => {
                time--;
                this.sendCodeText = time + 's';
                if (time < 1) {
                  this.sendCodeDisabled = false;
                  this.sendCodeText = '重新发送';
                  clearInterval(this.timer);
                }
              }, 1000);
            });
        }, 300)();
      },
      showTip() {
        this.$vux.alert.show({
          content: this.tipContent,
          buttonText: this.tipBtnText,
          hideOnBlur: true
        });
      },
      getStatusText() {
        switch (Number(this.goodsInfo.status)) {
          case 0:
            return dateFormat(this.goodsInfo.openSaleTime, 'MM月DD日HH:mm') + '开售';
          case 1:
          case 3:
            return '立即购买';
          case 2:
            return '已售罄';
          case 4:
            return '已结束';
          default:
            return '加载中...';
        }
      },
      initError() {
        this.errorHintText = false;
        this.errorInfo = '';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .sorryParamsTitle {
    height: 145px;
    text-align: center;
    color: #999;
    width: 100%;
    padding: 30px 0;
    font-size: 14px;
    .paramsImg {
      display: block;
      margin: 0 auto;
      width: 42px;
      margin-bottom: 15px;
    }
    .paramsTitle {
      display: block;
    }
  }

  .sorryRecordsTitle{
    height: 179px;
    text-align: center;
    color: #999;
    width: 100%;
    padding: 30px 0;
    font-size: 14px;
    .paramsImg {
      display: block;
      margin: 15px auto;
      width: 42px;
      margin-bottom: 15px;
    }
    .paramsTitle {
      display: block;
    }
  }

  .calc-force-detail {
    background: #f4f4f4;
  }

  .product-banner {
    position: relative;
    background: #F8F8F8;
    white-space: nowrap;
    font-size: 0;
    height: 284px;
    .swiper-container {
      overflow: hidden;
    }
    .swiper-slide {
      display: inline-block;
      img {
        display: block;
        margin: 35px auto 45px;
        height: 204px;
      }
    }
    header {
      position: absolute;
      padding: 13px 15px;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      img {
        width: 28px;
        height: 28px;
        display: block;
      }
    }
  }

  .product-title {
    padding: 12px 15px;
    background: #fff;
    h3 {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 3px;
    }
    p {
      line-height: 1.5em;
      font-size: 13px;
      color: #969699;
      span {
        color: #4D87EA;
      }
    }
  }

  .product-img {
    width: 100%;
    background: #fff;
    margin-top: 10px;
    img {
      display: block;
      max-width: 100%;
    }
  }

  .product-sales {
    padding: 15px 28px 0 12px;
    background: #fff;
    .product-cu {
      display: flex;
      padding-bottom: 17px;
      .leftImg {
        flex: 0 0 20px;
        height: 20px;
      }
      .rightContent {
        padding: 0 0 0 11px;
        h2 {
          font-size: 15px;
          line-height: 21px;
          color: #333333;
          padding-bottom: 5px;
        }
        p {
          font-size: 13px;
          line-height: 18px;
          color: #666666;
          letter-spacing: 0;
          .jlButton {
            color: #4D87EA;
            padding-left: 15px;
          }
        }
      }
    }
    .product-cu:last-child {
      padding-bottom: 0;
    }
  }

  .product-price {
    padding: 12px 28px 13px 12px;
    background:#fff;
    color: #FD7220;
    margin-bottom: 10px;
    span:first-child {
      color: #606166;
      font-size: 14px;
      line-height: 14px;
    }
    span:nth-child(2) {
      font-size: 20px;
      line-height: 19px;
      padding-left: 14px;
    }
    span.goodsPrice {
      text-decoration: line-through;
      padding-left: 3px;
      font-size: 13px;
      color: #666666;
    }
  }

  .product-info {
    margin-bottom: 10px;
    .title {
      color: #606166;
      font-size: 14px;
    }
    p {
      font-size: 0;
      color: #303137;
      strong, small {
        color: #FD7220;
        font-size: 18px;
        font-weight: bold;
      }
      small {
        font-size: 12px;
      }
      span {
        font-size: 12px;
      }
      .loginButton {
        color: #4D87EA;
        font-size: 14px;
        line-height: 14px;
        padding-right: 2px;
        font-weight: bold;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
        }
      }
      &.price {
        color: #222;
        font-size: 14px;
      }
      &.pricecolor {
        font-size: 14px;
        color: #FD7220;
      }
    }
    .help {
      width: 22px;
      height: 22px;
      margin-top: 3px;
      background-image: url("../../assets/images/icon_tishi_normal@2x.png");
      background-size: 22px;
      display: none;
    }
    .buy-num .left {
      line-height: 28px;
      color: #303137;
      font-size: 14px;
      margin-left: 10px;
      // background: #F5F5F5;
    }
  }

  .product-output {
    width: 100%;
    text-align: center;
    background-image: url("../../assets/images/gerenzhongxin_bg@3x.png");
    background-size: contain;
    padding: 24px 0 21px 0;
    img {
      width: 58px;
    }
    .title {
      font-size: 13px;
      line-height: 14px;
      color: #ffffff;
      padding-top: 13px;
      padding-bottom: 7px;
    }
    p:last-child {
      font-size: 16px;
      color: #FD7220;
      line-height: 14px;
    }
  }

  .product-list {
    background: #fff;
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    padding: 16px 0 22px 0;
    .power {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        line-height: 50px;
        width: 70%;
      }
      .dianfeiImg {
        width: 60%;
      }
      p {
        font-size: 13px;
        line-height: 14px;
        color: #969699;
        padding-top: 5px;
      }
      p:last-child {
        color: #333333;
        padding-top: 8px;
      }
    }
  }

  .product-text {
    padding: 6px 0 12px 16px;
    font-size: 13px;
    color: #999999;
    letter-spacing: 0;
    line-height: 14px;
  }

  .tab-detail {
    .vux-tab-wrap {
      .vux-tab-item {
        background: none;
        &.vux-tab-selected {
          font-weight: bold;
        }
      }
    }
    .tab-detail-list {
      padding-top: 10px;
      /*background: #F5F5F5;*/
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
      margin-top: 10px;
      margin-bottom: 12px;
      div {
        line-height: 1.5em;
        font-size: 14px;
        display: flex;
        &:nth-child(odd) {
          background: #F7F7F7;
        }
        p:first-child {
          color: #969699;
          padding: 14px;
          flex: 0 0 90px;
        }
        p:last-child {
          color: #303137;
          flex: 1;
          padding: 14px 0;
        }
      }
    }
  }

  .questions {
    margin-bottom: 16px;
    .slide {
      font-size: 14px;
      line-height: 1.5em;
      color: #969699;
      padding: 0 15px;
      overflow: hidden;
      max-height: 0;
      -webkit-transition: max-height .5s cubic-bezier(0, 1, 0, 1);
      transition: max-height .5s cubic-bezier(0, 1, 0, 1);
      &.animate {
        max-height: 9999px;
        -webkit-transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      }
    }
    .wall {
      display: block;
      height: 10px;
    }
  }

  .records {
    background: #fff;
    margin-top: 10px;
    margin-bottom: 12px;
    .border-bottom {
      position: relative;
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 40px;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #C7C7C7;
        color: #C7C7C7;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
        width: 100%;
      }
    }
    time.time {
      line-height: 1.5em;
      display: block;
      padding: 6px 0;
    }
  }

  .detail-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 50px;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.10);
    .vux-flexbox-item {
      > div {
        height: 50px;
        &.total-price {
          line-height: 50px;
          padding-left: 18px;
          font-size: 0;
          span {
            font-size: 13px;
            margin-right: 8px;
          }
          strong, small {
            font-size: 18px;
            color: #FD7220;
            font-weight: bold;
          }
          small {
            font-size: 13px;
          }
        }
        button {
          height: 100%;
          width: 100%;
          border-radius: 0;
          padding: 0;
        }
      }
    }
  }

  .prompt {
    span.text {
      color: #666;
      font-size: 12px;
      line-height: 18px;
    }
    .ipt-wrap {
      margin-top: 15px;
      position: relative;
      background: #FAFAFA;
      height: 45px;
      margin-bottom: 22px;
      padding: 13px 12px 0;
      &.has-unit {
        padding-right: 40px;
      }
      &.vux-1px {
        &::before, &::after {
          border-radius: 2px;
          border-color: #EDEEF0;
        }
      }
      span.unit {
        position: absolute;
        line-height: 45px;
        right: 0;
        top: 0;
        padding: 0 12px;
      }
      input {
        position: relative;
        z-index: 2;
        width: 100%;
        font-size: 14px;
        &::-webkit-input-placeholder {
          color: #CCCDCF;
        }
      }
    }
    .error-info {
      position: absolute;
      top: 45px;
      left: 0;
      line-height: 23px;
      color: #F95453;
      font-size: 12px;
    }
  }

  .order-confirm-dialog {
    header {
      font-size: 16px;
      line-height: 26px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .order-confirm {
      span.text {
        color: #666;
        font-size: 12px;
        line-height: 18px;
        text-align: left;
      }
      .error-info {
        position: absolute;
        top: 45px;
        left: 0;
        line-height: 23px;
        color: #F95453;
        font-size: 12px;
      }
      p.phone {
        text-align: left;
        font-size: 16px;
        padding: 18px 0;
        line-height: 1em;
        span {
          margin-right: 8px;
        }
      }
      .vcode {
        position: relative;
        background: #FAFAFA;
        height: 45px;
        margin-bottom: 30px;
        padding-right: 92px;
        &.vux-1px {
          &::before, &::after {
            border-radius: 2px;
            border-color: #EDEEF0;
          }
        }
        input {
          width: 100%;
          font-size: 14px;
          &::-webkit-input-placeholder {
            color: #CCCDCF;
          }
        }
        .code {
          padding: 13px 12px 0;
          position: relative;
          z-index: 1;
        }
        .vcode-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: 92px;
          height: 45px;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 28px;
            width: 1px;
            background: #eaeaea;
            top: 7px;
          }
          input[type="button"] {
            font-size: 14px;
            color: #303137;
            height: 45px;
            &:disabled {
              color: #969696;
            }
          }
        }
      }
    }
  }

  .wrap-box {
    min-height: -webkit-calc(100vh - 49px);
    min-height: calc(100vh - 49px);
  }

  .vux-table {
    &:after {
      display: none;
    }
  }

  .tab-header {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.10);
    .vux-tab-item {
      background: none;
      &.vux-tab-selected {
        font-weight: bold;
      }
    }
  }
</style>
<style lang="scss">
  .product-info {
    .productInfoCells {
      .weui-cells:before {
        border-top: 1px solid #fff;
      }
      .weui-cells:after {
        border-bottom: 1px solid #fff;
      }
    }
  }

  .buyHashRate {
    .vux-inline-x-number.inlineXNumber {
      .vux-number-selector {
        height: 32px;
      }
      .vux-number-selector-sub {
        padding: 6px 8px 7px 13px;
      }
      .vux-number-input {
        height: 32px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border-left: 1px solid #F5F5F5;
        border-right: 1px solid #F5F5F5;
      }
      .vux-number-selector-plus {
        padding: 5px 11px;
      }
    }
  } 

  .questions .weui-cells.vux-no-group-title {
    .weui-cell {
      line-height: 28px;
    }
    &::before, &::after {
      border-color: #f4f4f4;
      display: block;
    }
  }

  .phoneVerify, .googleVerify {
    .vux-confirm .weui-dialog {
      text-align: inherit;
    }

    .vux-confirm .weui-dialog__hd {
      text-align: center;
      .weui-dialog__title {
        font-weight: 600;
      }
    }

    .vux-x-dialog .weui-dialog__ft:after {
      display: none;
    }

    .vux-x-dialog .weui-dialog__ft .weui-dialog__btn.weui-dialog__btn_default {
      display: none;
    }

    .vux-x-dialog .weui-dialog__ft .weui-dialog__btn.weui-dialog__btn_primary {
      background: #303137;
      color: #fff;
      text-align: center;
      margin: 0 20px 17px;
    }

    .vux-x-dialog .weui-dialog__ft .weui-dialog__btn.weui-dialog__btn_primary:after {
      display: none;
    }
  }

  .dialog-reward {
    .header {
      font-size: 16px;
      line-height: 16px;
      padding: 23px 0;
    }
    .weui-dialog {
      table.vux-table {
        line-height: 30px;
        font-size: 13px;
        border-color: #fff;
        tr:last-child {
          height: 23px;
          width: 100%;
        }
        th {
          color: #606166;;
        }
        td {
          color: #303137;
        }
      }
    }
  }
</style>
