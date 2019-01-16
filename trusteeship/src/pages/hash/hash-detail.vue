<template>
  <div class="page">
    <div class="hash-breadcrumb">
      <div class="hash-breadcrumb-wrap">
        <app-breadcrumbs/>
      </div>
    </div>
    <div class="hash-content">
      <div class="hash-container">
        <div class="hash-product">
          <el-row>
            <el-col :span="10">
              <div class="hashproductImg"><img :src="goodsInfo.imageUrl" alt=""></div>
            </el-col>
            <el-col :span="14">
              <div class="hash-name">{{goodsInfo.gName}}</div>
              <div class="hash-tip">{{goodsInfo.gTitle}}</div>
              <div class="hash-shop">
                <div class="shop-header"><img v-if="actHeadImg" :src="actHeadImg" alt=""></div>
                <div class="shop-body">
                  <p class="shop-cu" v-for="(item,index) in goodsActivityList"
                     v-if="goodsActivityList&&goodsActivityList.length>0" :key="index">
                    <span>
                      <img src="../../assets/images/cu.svg" alt="" v-if="item.activityType===1">
                      <img src="../../assets/images/yao.svg" alt="" v-if="item.activityType===2">
                      {{item.title}}
                    </span>
                    <span>{{item.description}}</span>
                    <el-popover v-if="item.activityType===2&&rewardList" width="400" trigger="click"
                                class="shop-rule" placement="bottom">
                      <table class="tb-rule">
                        <tr>
                          <th>矿工等级</th>
                          <th>好友返现</th>
                          <th>您的优惠</th>
                          <th v-if="isShowRemarkCol(rewardList)">备注</th>
                        </tr>
                        <tr v-for="(rule,idx) in rewardList" :key="idx">
                          <td>{{rule.minerGrade}}</td>
                          <td>{{rule.inviterWithdrawal}}元/{{goodsInfo.computingUnit}}</td>
                          <td>{{rule.inviteeDiscounts}}元/{{goodsInfo.computingUnit}}</td>
                          <td v-if="isShowRemarkCol(rewardList)">{{rule.remark || '-'}}</td>
                        </tr>
                      </table>
                      <span slot="reference" @click="getRewardRuleList">奖励规则</span>
                    </el-popover>
                  </p>
                  <p class="shop-price">
                    <span class="bold" v-if="isShowSalePrice">单价: </span>
                    <span class="sale-price" v-if="isShowSalePrice">
                      <span v-if="goodsInfo.status===1">
                        {{goodsInfo.salePrice | currency}}元/{{goodsInfo.computingUnit}}
                      </span>
                      <span v-else-if="goodsInfo.status===2">{{goodsInfo.salePrice}}</span>
                      <span v-else>{{goodsInfo.salePrice}}元/{{goodsInfo.computingUnit}}</span>
                    </span>
                    <span class="source-price" v-if="goodsInfo.status!==2&&goodsInfo.price">
                      <span>原价：</span>
                      <span v-if="goodsInfo.price">{{goodsInfo.price | currency}}元/{{goodsInfo.computingUnit}}</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="hash-infor">
                <div class="infor-item">
                  <dt>交割日期</dt>
                  <dd>
                    <span v-if="goodsInfo.deliveryTimeType===0">次日交割</span>
                    <span
                      v-else-if="goodsInfo.deliveryTimeType===1">{{goodsInfo.deliveryTime | date('YYYY-MM-DD')}}</span>
                  </dd>
                </div>
                <div class="infor-item">
                  <dt>剩余</dt>
                  <dd>{{goodsInfo.surplusCube}}{{goodsInfo.computingUnit}}</dd>
                </div>
                <div>
                  <dt>购买</dt>
                  <dd>
                    <div class="num-box">
                      <span @click="reduce" class="reduce">
                        <svg width="11" height="1"><use xlink:href="#minus"></use></svg>
                      </span>
                      <input type="number" v-model="count" @input="inputNum" min="1">
                      <span @click="plus" class="plus">
                         <svg width="11" height="11"><use xlink:href="#add"></use></svg>
                      </span>
                    </div>
                    <span class="pay-compuint">{{goodsInfo.computingUnit}}</span>
                    <span class="pay-limit">
                      <span
                        v-if="goodsInfo.lowestAmount>0">{{goodsInfo.lowestAmount}}{{goodsInfo.computingUnit}}起购</span>
                      <span v-if="goodsInfo.lowestAmount>0&&goodsInfo.singlePenRestrictionType===1">,</span>
                      <span v-if="goodsInfo.singlePenRestriction">
                        每笔限购{{goodsInfo.singlePenRestriction}}{{goodsInfo.computingUnit}}
                      </span>
                      <span
                        v-if="goodsInfo.singleRestrictionType===1&&(goodsInfo.singlePenRestrictionType===1||(goodsInfo.lowestAmount>0&&goodsInfo.singlePenRestrictionType===0))">,</span>
                      <span
                        v-if="goodsInfo.singleRestriction">每人限购{{goodsInfo.singleRestriction}}{{goodsInfo.computingUnit}}</span>
                    </span>
                  </dd>
                </div>
                <div class="infor-item">
                  <dt>应付</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1">{{goodsInfo.salePrice * count | currency}}元</span>
                    <span v-else>--</span>
                  </dd>
                </div>
                <div class="infor-discount" v-if="isShowDiscount">
                  <dt>优惠</dt>
                  <dd v-if="login">{{discount * count | currency}}元</dd>
                  <dd v-else><span @click="goSign">登录</span><span>后，查看优惠金额</span></dd>
                </div>
                <div class="infor-pay">
                  <dt>实付</dt>
                  <dd>
                    <span v-if="goodsInfo.status===1">{{actualPrice | currency}}元</span>
                    <span v-else>--</span>
                  </dd>
                </div>
              </div>
              <div class="hash-pay">
                <el-button class="pay-btn" type="primary" :class="{'btn-disabled':goodsInfo.status!==1}"
                           :disabled="goodsInfo.status!==1" @click="submitOrder">
                  <span v-if="goodsInfo.status===0">{{goodsInfo.openSaleTime | date('MM月DD日 HH:mm')}} 开售</span>
                  <span v-if="goodsInfo.status===1 || goodsInfo.status===3">立即购买</span>
                  <span v-if="goodsInfo.status===2">已售罄</span>
                  <span v-if="goodsInfo.status===4">已结束</span>
                </el-button>
                <div class="account-money clearfix">
                  <span class="money">账户余额</span>
                  <span class="money-num" v-if="login">{{accountBalance | currency}}元</span>
                  <span class="money-num" v-else>--</span>
                  <span class="right" @click="$router.push('/i/account')">充值</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
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
        </div>
        <div class="hash-list">
          <div class="hash-list-tip">{{sourceTime}}</div>
          <ul class="clearfix">
            <li :class="{'active':selectedIndex===0}" @click="selectedIndex=0">算力介绍</li>
            <li :class="{'active':selectedIndex===1}" @click="selectedIndex=1">矿机参数</li>
            <li :class="{'active':selectedIndex===2}" @click="selectedIndex=2">常见问题</li>
            <li :class="{'active':selectedIndex===3}" @click="selectedIndex=3">购买记录</li>
          </ul>
          <div class="hash-list-content">
            <div v-if="selectedIndex===0" v-html="goodsInfo.content"></div>
            <div v-if="selectedIndex===1" class="product-params">
              <div class="product-title">{{goodsInfo.gName}}</div>
              <dl>
                <div v-for="item,index in productParams" :key="index">
                  <dt>{{item.key}}</dt>
                  <dd>{{item.value}}</dd>
                </div>
              </dl>
            </div>
            <div v-if="selectedIndex===2" class="tabs-pane-question">
              <ul>
                <li v-for="item in questionList">
                <span @click="questionIndex===item.id ? questionIndex=-1 : questionIndex=item.id">
                  <i :class="[questionIndex===item.id ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  <span class="">{{item.question}}</span>
                </span>
                  <div v-if="questionIndex===item.id">{{item.answer}}</div>
                </li>
              </ul>
            </div>
            <div v-if="selectedIndex===3" class="tabs-pane-history">
              <table>
                <thead>
                <tr>
                  <th>用户</th>
                  <th>数量({{goodsInfo.computingUnit}})</th>
                  <th>金额(元)</th>
                  <th>购买时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in historyList">
                  <td>{{item.account | phone}}</td>
                  <td>{{item.goodsCount}}</td>
                  <td>{{item.totalAmount}}</td>
                  <td>{{item.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="订单确认" :visible.sync="showDialogBind" custom-class="order-confirm custom"
               width="420px" @close="errors.remove('code')" @open="verifyCode=''">
      <p class="tips">购买须知：虚拟货币受算力难度、币价等多重因素影响。矿机为特殊定制的、用于投资的产品，不退不换。</p>
      <form class="form-wrap" @submit.prevent>
        <dl v-if="!userInfo.googleKey">
          <div class="form-item">
            <dt>验证方式</dt>
            <dd>
              <el-select class="drop-down-box" v-model="type" placeholder="请选择验证方式">
                <el-option v-for="item in typeList" :key="item.value"
                           :label="item.label" :value="item.value" style="width: 100%;">
                </el-option>
              </el-select>
            </dd>
          </div>
          <div class="form-item">
            <dt>
              验证码
            </dt>
            <dd>
              <el-input name="code" v-validate="'required|code'" @focus="errors.remove('code')"
                        class="code-ipt left" v-model="verifyCode" type="text"
                        :placeholder="`输入${type === 0 ? '短信': '邮箱' }中的验证码`">
              </el-input>
              <el-button class="send-code" type="text" :disabled="timer!==60" @click="sendVerifyCode">
                {{sendCodeBtnText}}
              </el-button>
              <p class="error" v-show="errors.has('code')">{{errors.first('code')}}</p>
            </dd>
          </div>
        </dl>
        <div v-else>
          <el-input name="code" v-validate="'required|code'" @focus="errors.remove('code')"
                    v-model="verifyCode" type="text"
                    placeholder="请输入谷歌验证器显示的6位数字">
          </el-input>
          <p class="error" v-show="errors.has('code')">{{errors.first('code')}}</p>
        </div>
      </form>
      <span slot="footer">
        <el-button type="primary" :disabled="!verifyCode" @click="clickBindBtn">
          提交
        </el-button>
    </span>
    </el-dialog>
    <el-dialog class="custom" width="420px" top="30vh" title="提示" :visible.sync="showDialogTip">
      <div class="dialog-content clearfix">
        <img src="../../assets/images/common_reminder.png" alt="" class="leftImg">
        <div class="left">
          <span>{{tipContent}}</span>
          <p v-if="tipType == 2">为了您的交易安全需要先绑定谷歌验证器</p>
        </div>
      </div>
      <div slot="footer">
        <el-button v-if="tipType == 0" @click="showDialogTip = false">取 消</el-button>
        <el-button type="primary" @click="clickTipBtn">{{tipBtnText}}</el-button>
      </div>
    </el-dialog>

    <x-features-powershop/>
  </div>
</template>
<script>
  import ProductAPI from '../../services/product-api';
  import XFeaturesPowershop from '../../components/x-features-powershop';
  import errorHandler from '../../services/error-handler';
  import * as debounce from 'lodash.debounce';
  import PowerApi from '../../services/power-api';
  import AccountApi from '../../services/account-api';
  import UserApi from '../../services/user-api';
  import {mapState} from 'vuex';
  import {CommonProblem} from '../../config/constants';
  import {hideEmail, replacePos} from '../../plugins/utils';

  export default {
    breadcrumb() {
      return {
        label: this.goodsInfo.gName,
        parentsList: [
          {
            path: '/hash',
            label: '云算力'
          }
        ]
      };
    },
    metaInfo() {
      const productName = this.goodsInfo.gName;
      return {
        title: `算力购买-算立方`,
        meta: [
          {
            name: 'keywords',
            content: `${productName}算力交易,${productName}算力出租,${productName}算力租赁`
          },
          {
            name: 'description',
            content: `算立方提供${productName}算力交易,${productName}算力交易成功购买后,交割时间结束后，开始产生挖矿收益。`
          }
        ]
      };
    },
    components: {XFeaturesPowershop},
    computed: {
      ...mapState(['userInfo', 'token', 'login']),
      actHeadImg() {
        let firstImg, secondImg, defaultImg;
        if (this.goodsInfo.price) { // 没有原价不展示默认背景
          defaultImg = this.goodsInfo.backGroundImg;
        }
        if (this.goodsActivityList) {
          this.goodsActivityList.forEach(item => {
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
        let salePrice = goodsInfo.salePrice || 0;
        let discountAmount = this.discount;
        let count = +this.count;
        let actualPrice = 0;
        if (this.isShowDiscount) {
          return (salePrice - discountAmount) * count;
        } else {
          return actualPrice = salePrice * count;
        }
      },
      isShowSalePrice() {
        let item = this.goodsInfo || {};
        if (item.status === 1) {
          return true;
        } else if (item.status === 0) {
          return item.openSaleType !== 1;
        } else {
          return item.soldOutType !== 1;
        }
      },
      isShowDiscount() {
        return (this.goodsActivityList || []).some(item => item.activityType === 2);
      }
    },
    data() {
      return {
        count: '',
        selectedIndex: 0,
        accountBalance: 0,
        type: 0,
        goodsId: '',
        goodsInfo: {},
        detailHtml: '',
        pageNum: 1,
        pageSize: 10,
        historyList: [],
        sourceTime: '',
        summaryList: [],
        questionList: CommonProblem,
        productParams: [],
        questionIndex: -1,
        showDialogBind: false,
        showVerifyCodeTip: false,
        showDialogTip: false,
        typeList: [],
        sendCodeBtnText: '发送验证码',
        verifyCode: '',
        timer: 60,
        tipType: 0,
        tipContent: '',
        tipBtnText: '',
        inviteNum: '',
        rewardList: [],
        goodsActivityList: [],
        discount: '',
        inviteCommissionId: ''
      };
    },
    methods: {
      isShowRemarkCol(arr) {
        return arr && arr.some(item => item.remark);
      },
      jyGoodsInfo() {
        this.goodsId = this.$route.query.goodsId;
        PowerApi.jyGoodsInfo(this.goodsId)
          .then(JSON.parse)
          .then(data => {
            const {min, max} = this.getLimitCount(data);
            this.goodsInfo = data;
            data._minLimit = min;
            data._maxLimit = max;
            this.count = min;
          });
      },
      getLimitCount(goodsInfo = {}) {
        let min = +goodsInfo.lowestAmount;
        let surplusCube = goodsInfo.surplusCube;
        let personLimit, orderLimit, arr = [];
        if (goodsInfo.singlePenRestriction === 1) {
          orderLimit = goodsInfo.singlePenRestriction;
          arr.push(+orderLimit);
        }
        if (goodsInfo.singleRestrictionType === 1) {
          personLimit = goodsInfo.singleRestriction;
          arr.push(+personLimit);
        }
        arr.push(+surplusCube);
        let max = Math.min.apply(null, arr);
        return {min, max};
      },
      // 帐户余额
      getAccountInfo() {
        AccountApi.userMoneyTotal()
          .then(res => {
            this.accountBalance = res.totalMoney || 0;
          })
          .catch(() => {
          });
      },
      //矿机功率，电费
      getGoodsAttributeList() {
        const goodsId = this.$route.query.goodsId;
        PowerApi.getGoodsAttributeList(goodsId, 2)
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
      getGoodsActivityList() {
        const goodsId = this.$route.query.goodsId;
        ProductAPI.getGoodsActivityList(this.token || '', goodsId, 2, 1)
          .then(res => res.result || [])
          .then(res => {
            this.goodsActivityList = res;
            if (this.goodsActivityList && this.goodsActivityList.length > 0) {
              this.goodsActivityList.sort((value1, value2) => value1.activityType - value2.activityType);
              this.inviteCommissionId = this.goodsActivityList.filter(item => item.activityType === 2).length > 0 ? this.goodsActivityList.filter(item => item.activityType === 2)[0].activityId : '';
            }
          });

      },
      // 查询购买记录
      getJyOrderList() {
        const goodsId = this.$route.query.goodsId;
        PowerApi.jyOrderList(goodsId, this.pageNum, this.pageSize)
          .then(JSON.parse)
          .then(res => res.list || [])
          .then(res => {
            this.historyList = res;
          });
      },
      //矿机参数
      getProductParams() {
        const goodsId = this.goodsInfo.shopGoodsId;
        PowerApi.getGoodsAttributeList(goodsId, 3)
          .then(res => {
            this.productParams = res.result;
          });
      },
      //点击显示奖励规则
      getRewardRuleList() {
        ProductAPI.getRewardRuleList(this.inviteCommissionId)
          .then(res => res.result)
          .then(res => {
            this.rewardList = res;
          });

      },
      //获取用户的邀请记录
      getInviteHistory() {
        UserApi.allInviteeInfo(0, this.pageNum, this.pageSize)
          .then(res => {
            this.inviteNum = res.list.length || 0;
          });
      },
      getDiscountedPrice() {
        const goodsId = this.$route.query.goodsId;
        ProductAPI.getDiscountedPric(goodsId, 2)
          .then(res => {
            this.discount = res.result;
          });
      },
      initTypeList() {
        const verifyTypeList = [];
        if (this.userInfo.moblie) {
          const label = '手机验证   ' + (this.userInfo.countryNum || '') + replacePos(this.userInfo.moblie, '*', 3, 7);
          verifyTypeList.push({label, value: 0});
        }
        if (this.userInfo.mailboxAccount) {
          const label = '邮箱验证   ' + hideEmail(this.userInfo.mailboxAccount, 3);
          verifyTypeList.push({label, value: 1});
        }
        this.typeList = verifyTypeList;
        this.type = this.userInfo.moblie ? 0 : 1;
      },
      submitOrder() {
        this.count = +this.count;
        PowerApi.personalPowerLimit(this.goodsId)
          .then(res => {
            return +res;
          })
          .then(res => {
            if (this.goodsInfo.status !== 1) {
              return;
            }
            if (this.count > this.goodsInfo.surplusCube) {
              this.tipContent = '当前剩余算力不足，请重新选择购买数量';
              this.tipBtnText = '关闭';
              this.tipType = 1;
              return this.showDialogTip = true;
            }
            if (this.count < this.goodsInfo._minLimit) {
              this.tipContent = '该算力最低' + this.goodsInfo._minLimit + this.goodsInfo.computingUnit + '起购';
              this.tipBtnText = '关闭';
              this.tipType = 1;
              return this.showDialogTip = true;
            }
            if (res > 0 && this.count > res) {
              this.tipContent = '该商品超过最大购买限制，剩余可购买数量：' + res + this.goodsInfo.computingUnit;
              this.tipBtnText = '关闭';
              this.tipType = 1;
              return this.showDialogTip = true;
            }
            if (this.actualPrice > this.accountBalance) {
              this.tipContent = '您的账户余额不足，请充值！';
              this.tipBtnText = '去充值';
              this.tipType = 0;
              return this.showDialogTip = true;
            }
            this.showDialogBind = true;
            this.showVerifyCodeTip = false;
          });
      },
      sendVerifyCode() {
        debounce(() => {
          const countryNum = this.userInfo.countryNum || '';
          const account = this.type === 0 ? this.userInfo.moblie : this.userInfo.mailboxAccount;
          PowerApi.hashOrderSms(countryNum, account)
            .then(res => res || {})
            .then(res => res.result)
            .then(() => {
              this.$message({
                type: 'success',
                message: '发送成功',
                showClose: true
              });
              const t = setInterval(() => {
                this.timer--;
                this.sendCodeBtnText = this.timer + 's';
                if (this.timer === 0) {
                  this.sendCodeBtnText = '重新发送';
                  this.timer = 60;
                  clearInterval(t);
                }
              }, 1000);
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: error.msg,
                showClose: true
              });
              this.sendCodeBtnText = '重新发送';
            });
        }, 300)();
      },
      clickBindBtn() {
        const goodsId = this.goodsId;
        const count = this.count;
        this.$validator.validateAll()
          .then(res => {
            if (res) return res;
            return Promise.reject(null);
          })
          .then(() => {
            if (this.userInfo.googleKey) {
              return UserApi.verify(this.verifyCode);
            }
            return PowerApi.powerValidCode(this.verifyCode);
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
            this.showDialogBind = false;
            this.getAccountInfo();
            this.jyGoodsInfo();
            this.$alert('购买成功，可在个人中心-我的云算力查看');
          })
          .catch(err => {
            if (!err) {
              return;
            }
            if (err.code === '200004') {
              return this.$alert('超过限购数量');
            }
            errorHandler(err);
          });
      },
      clickTipBtn() {
        switch (this.tipType) {
          case 0:
            return this.$router.push('/i/account');
          case 1:
            return this.showDialogTip = false;
          case 2:
            return this.$router.push('/i/safety/bind-authenticator');
        }
      },
      reduce() {
        if (this.count > this.goodsInfo._minLimit) {
          this.count--;
        }
      },
      plus() {
        if (this.count < this.goodsInfo._maxLimit) {
          this.count++;
        }
      },
      goSign() {
        let url = this.$router.currentRoute.fullPath;
        this.$router.push({
          path: '/sign-in',
          query: {
            redirectUrl: url
          }
        });
      },
      inputNum() {
        debounce(() => {
          this.count = +this.count;
          if (!/^[1-9]\d*$/.test(this.count + '')) {
            this.count = this.goodsInfo._minLimit;
          }
          if (this.count > this.goodsInfo._maxLimit) {
            this.count = this.goodsInfo._maxLimit;
          }
          if (this.count < this.goodsInfo._minLimit) {
            this.count = this.goodsInfo._minLimit;
          }
        }, 1000)();
      }
    },
    mounted() {
      this.jyGoodsInfo();
      this.getGoodsAttributeList();
      this.getGoodsActivityList();
    },
    watch: {
      selectedIndex(val) {
        if (val === 1) {
          this.getProductParams();
        } else if (val === 3) {
          this.getJyOrderList();
        }
      },
      userInfo: {
        handler() {
          this.initTypeList();
        },
        immediate: true,
        deep: true
      },
      login: {
        handler(val) {

          if (val) {
            this.getDiscountedPrice();
            this.getAccountInfo();
            this.getInviteHistory();
          }
        },
        immediate: true
      }
    }
  };
</script>
<style scoped lang="scss">
  .hash-breadcrumb {
    background: #F8F8F8;
  }

  .hash-breadcrumb-wrap {
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
  }

  .hash-content {
    padding: 60px 0 50px;
    border-bottom: 50px solid #f8f8f8;
    .hash-container {
      width: 1200px;
      margin: 0 auto;
    }
  }

  .hash-product {
    margin-bottom: 50px;
    .el-col:last-child {
      padding-left: 80px;
    }
  }

  .hashproductImg {
    width: 500px;
    height: 500px;
    background: #F8F8F8;
    position: relative;
    img {
      width: 80%;
      height: 80%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .hash-name {
    font-size: 24px;
    color: #303137;
    font-weight: bold;
  }

  .hash-tip {
    font-size: 14px;
    color: #D7282D;
    margin: 11px 0 10px;
  }

  .hash-shop {
    margin-bottom: 20px;
  }

  .shop-header {
    /*height: 41px;*/
    /*line-height: 41px;*/
    /*background: #D7282D;*/
    /*font-size: 18px;*/
    /*padding-left: 10px;*/
    /*color: #FFFFFF;*/
    /*letter-spacing: 1.5px;*/
    img {
      display: block;
      width: 100%;
    }
  }

  .hash-shop .shop-body {
    font-size: 14px;
    padding: 20px 26px 20px 10px;
    background: #F4F4F4;
  }

  .shop-body p:last-child {
    margin-top: 0;
  }

  .shop-cu {
    margin-bottom: 15px;
    img, span {
      vertical-align: middle;
    }
    img {
      margin-right: 10px;
    }
    & > span:first-child {
      display: inline-block;
      min-width: 153px;
      font-weight: bold;
    }
  }

  .shop-rule {
    color: #4D87EA;
    margin-left: 30px;
    cursor: pointer;
    padding: 0;
  }

  .shop-price {
    margin-top: 25px;
    padding-left: 30px;
  }

  .sale-price {
    font-size: 18px;
    color: #FD7220;
    margin-right: 25px;
  }

  .bold {
    font-weight: bold;
  }

  .source-price {
    color: #969699;
    text-decoration: line-through;
  }

  .hash-infor {
    > div {
      margin-bottom: 20px;
    }
    > div:last-child {
      margin-bottom: 0;
    }
    dt, dd {
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      user-select: none;
    }
    dt {
      font-size: 14px;
      color: #969699;
      min-width: 86px;
    }
    .infor-item {
      font-size: 18px;
      color: #303137;
      user-select: none;
    }
    .infor-discount dd {
      font-size: 18px;
      color: #969699;
      span:first-child {
        color: #4D87EA;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .infor-pay dd {
      font-size: 24px;
      color: #FD7220;
    }
  }

  .num-box {
    display: inline-block;
    padding-left: 40px;
    padding-right: 40px;
    position: relative;
    border: 1px solid #EFEFEF;
    line-height: 38px;
    span {
      display: inline-block;
      width: 38px;
      height: 38px;
      position: absolute;
      top: 0;
      background: #EFEFEF;
      cursor: pointer;
    }
    .reduce {
      left: 0;
    }
    .plus {
      right: 0;
    }
    input {
      width: 80px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border: none;
      color: #343535;
      font-size: 14px;
      vertical-align: top;
    }
  }

  .reduce svg, .plus svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .pay-compuint {
    font-size: 18px;
    color: #303137;
    margin: 0 20px;
  }

  .pay-limit {
    font-size: 14px;
    color: #969699;
  }

  .hash-pay {
    margin-top: 50px;
    width: 272px;
    .pay-btn {
      width: 100%;
      margin-bottom: 15px;
      height: 54px;
    }
  }

  .pay-btn.btn-disabled {
    background-color: #ddd;
    border-color: #ddd;
  }

  .account-money {
    font-size: 14px;
    .money {
      color: #969699;
    }
    .money-num {
      color: #303137;
    }
    .right {
      color: #4D87EA;
      cursor: pointer;
    }
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

  .hash-list > ul {
    background: #F8F8F8;
    margin-bottom: 40px;
    li {
      font-size: 18px;
      color: #303137;
      width: 132px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      float: left;
      transition: all 0.5s ease;
      cursor: pointer;
      &.active {
        background: #303030;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .hash-list-content {
    padding-bottom: 40px;
    border: 1px solid #E3E3E3;
  }

  .product-params {
    padding: 40px 225px 0;
    margin: 0 auto;
    .product-title {
      font-size: 24px;
      color: #303030;
      text-align: center;
      margin-bottom: 30px;
    }
    dd, dt {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      margin: 0;
    }
    dt {
      color: #9B9B9B;
      min-width: 100px;
    }
    dd {
      color: #000;
      margin-left: 20px;
    }
    dl > div {
      padding-left: 80px;
      font-size: 14px;
    }
    dl > div:nth-of-type(2n-1) {
      background: #F8F8F8;
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

  .tabs-pane-history {
    padding-top: 40px;
    table {
      width: 800px;
      padding-left: 30px;
      color: #303137;
    }
    tr {
      th {
        text-align: left;
        padding-bottom: 30px;
      }
      td {
        font-size: 14px;
        padding: 15px 0;
      }
    }
  }

  .dialog-content {
    line-height: 40px;
    img {
      vertical-align: middle;
      float: left;
    }
    div {
      margin-left: 15px;
      span {
        color: #303137;
      }
      p {
        font-size: 12px;
        color: #969699;
      }
    }
  }

  .input-bind {
    width: 100%;
    height: 36px;
    border: 1px solid #EDEEF0;
    font-size: 14px;
    text-indent: 15px;
  }

  .input-bind + p {
    line-height: 40px;
    padding-left: 16px;
    color: red;
  }

  .form-item {
    margin-bottom: 20px;

    dt, dd {
      display: inline-block;
      margin: 0;
      padding: 0;
    }
    dt {
      width: 60px;
      line-height: 36px;
    }
    dd {
      float: right;
      width: 300px;
    }
  }

  .drop-down-box {
    width: 100%;
  }

  .code-ipt {
    width: 220px;
  }

  .send-code {
    float: right;
    min-width: 70px;
    height: 36px;
  }

  .error {
    color: #f95453;
    font-size: 12px;
    padding-left: 0.4em;
  }

  .rewardTable {
    width: 300px;
  }

  .tb-rule {
    width: 100%;
    line-height: 28px;
    text-align: center;
    border-spacing: 0;
    border-radius: 5px;
    th, td {
      border-right: 0;
      border-top: 0;
      padding: 0;
      border-bottom: 1px solid #f0f0f0;
      height: 34px;
      line-height: 34px;
    }
    tr:last-child td {
      border-bottom: none;
    }
  }

  .tips {
    line-height: 20px;
    font-size: 12px;
    color: #999696;
  }

  .tips + .form-wrap {
    margin-top: 20px;
  }
</style>
