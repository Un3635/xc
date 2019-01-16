<template>
  <div>
    <x-header :left-options="{backText: ''}" slot="header" class="custom-header">{{title}}</x-header>
    <div class="invite-wrap">
      <div class="scroll-wrap" v-if="isRender">
        <scroller lock-x height="-46" ref="scrollerBottom"
                  :scroll-bottom-offst="300"
                  :pullup-config="PullupConfig"
                  :use-pullup="true"
                  @on-pullup-loading="onPullupLoading">
          <div class="scroll">
            <div class="figure">
              <img src="../../assets/images/suanli_bg@3x.png" alt="">
              <div class="figcaption">
                <div class="totalNum" v-if="rewardType!==1 && rewardType!==4">总量</div>
                <h2 v-if="rewardType === 4" class="calValue" :class="{'calValue4':rewardType===4}">
                  {{inviteStatus | currency('', 2)}}元</h2>
                <h2 v-else class="calValue" :class="{'calValue2':rewardType===1}">
                  {{inviteStatus | cryptocurrency}}{{rewardType | unit}}</h2>
                <div class="tobeDeliver">
                  <span v-if="rewardType ===4">冻结中 {{tobeDeliver}}元</span>
                  <span v-else-if="rewardType!==1">冻结中 {{tobeDeliver | cryptocurrency}}{{rewardType | unit}}</span>
                  <span v-else>待交割 {{tobeDeliver}}{{rewardType | unit}}</span>
                </div>
              </div>
              <div class="inviteData">
                <flexbox justify="space-between" class="flexbox">
                  <flexbox-item>
                    <div class="itemTop">未奖励(人)</div>
                    <h3 class="itemDown">{{noRewardCount || 0}}</h3>
                  </flexbox-item>
                  <flexbox-item>
                    <div class="itemTop">已奖励(人)</div>
                    <h3 class="itemDown">{{alreadyRewardCount || 0}}</h3>
                  </flexbox-item>
                  <flexbox-item v-if="rewardType===1 || rewardType===4">
                    <div class="itemTop">历史获得({{rewardType | unit}})</div>
                    <h3 class="itemDown">{{totalRewardCount || 0}}</h3>
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
            <div class="reward-detail">
              <div class="reward-calc">
                <div class="reward-tip">请使用PC登录hc.top查看算力产出</div>
                <h4 class="inviteFriend">- 邀请的好友 -</h4>
                <tab v-model="tabelIndex" :line-width="2" custom-bar-width="40px" default-color="#969699"
                     active-color="#303137">
                  <tab-item>未奖励</tab-item>
                  <tab-item>已奖励</tab-item>
                </tab>
              </div>
              <div class="friend-limit" v-show="inviteTip"><img src="../../assets/images/icon_yaoqingtishi_normal.png" alt="算立方">
                {{inviteTip}}
              </div>
              <div v-if="rewardListInfor.length!==0">
                <div class="reward-detail-list" v-show="tabelIndex===0">
                  <div class="rewardListInfor">
                    <x-table :cell-bordered="false" style="background: #fff;" class="inviteTable">
                      <thead>
                      <tr>
                        <th>好友手机号</th>
                        <th>
                          <span v-if="rewardType===1">未奖励数量(T)</span>
                          <span v-else-if="rewardType===2">冻结数量(BTC)</span>
                          <span v-else-if="rewardType===4">注册平台</span>
                          <span v-else>冻结数量(ETH)</span></th>
                        <th>注册时间</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in rewardListInfor" :key="item.id">
                        <td>{{item.moblie}}</td>
                        <td v-if="rewardType===4">{{item.channel}}</td>
                        <td v-else>{{item.rewardCount}}</td>
                        <td v-if="rewardType===4">{{item.createTime | date('YYYY/MM/DD')}}</td>
                        <td v-else>{{item.regDate | date('YYYY-MM-DD')}} {{item.regDate | date('HH:mm:ss')}}</td>
                      </tr>
                      </tbody>
                    </x-table>
                    <!-- <load-more :show-loading="loadingOne" :tip="loadingtextOne"></load-more> -->
                  </div>
                </div>
                <div class="reward-detail-list" v-show="tabelIndex===1">
                  <div class="rewardListInfor">
                    <x-table style="background: #fff;" :cell-bordered="false" class="inviteTable">
                      <thead>
                      <tr>
                        <th>好友手机号</th>
                        <th v-show="rewardType===4">奖励金额(元)</th>
                        <th>
                          <span v-if="rewardType===1">奖励数量(T)</span>
                          <span v-else-if="rewardType===2">奖励数量(BTC)</span>
                          <span v-else-if="rewardType===4">注册平台</span>
                          <span v-else>奖励数量(ETH)</span>
                        </th>
                        <th v-if="rewardType===4">成交时间</th>
                        <th v-else>注册时间</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in rewardListInfor" :key="item.id">
                        <td>{{item.moblie}}</td>
                        <td v-show="rewardType===4">{{item.awardNum}}</td>
                        <td v-if="rewardType===4">{{item.channel}}</td>
                        <td v-else>{{item.rewardCount}}</td>
                        <td v-if="rewardType===4">{{item.createTime | date('YYYY/MM/DD')}}</td>
                        <td v-else>{{item.regDate | date('YYYY-MM-DD')}} {{item.regDate | date('HH:mm:ss')}}</td>
                      </tr>
                      </tbody>
                    </x-table>
                    <!-- <load-more :show-loading="loading" :tip="loadingtext"></load-more> -->
                  </div>
                </div>

              </div>
              <div v-if="rewardListInfor.length===0" class="request-empty">
                <img src="../../assets/images/wuneirong_normal@3x.png" alt="算立方">
                <p>暂无奖励</p>
              </div>
            </div>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
  import {Flexbox, FlexboxItem, XTable, Tab, TabItem, LoadMore} from 'vux';
  import {PullupConfig} from '../../config/constants';
  import UserAPI from '../../services/user-api.js';
  import {isClient} from '../../plugins/utils';
  export default {
    data() {
      return {
        show: true,
        // 奖励状态 0 未奖励 1 已奖励
        rewardStatus: 0,
        pageSize: 10,
        pageNum: 1,
        tabelIndex: 0,
        title: '',
        inviteStatus: '',
        tobeDeliver: '',
        inviteNonTip: '',
        inviteTip: '',
        productNum: '冻结数量(ETH)',
        rewardListInfor: [],
        noRewardCount: '',
        alreadyRewardCount: '',
        totalRewardCount: '',
        loading: false,
        loadingOne: false,
        // scroller组件是否在客户端渲染
        isRender: false,
        //  数据分页总数
        pages: 1,
        rewardType: '',
        currencyId: '',
        computingUnit: '',
        currencyName: '',
        PullupConfig
      };
    },
    filters: {
      unit: function (value) {
        if (value === 4) {
          return '元';
        } else if (value === 1) {
          return 'T';
        } else if (value === 2) {
          return 'BTC';
        } else if (value === 3) {
          return 'ETH';
        }
      }
    },
    watch: {
      tabelIndex(val) {
        this.inviteTabClick(val);
      }
    },
    methods: {
      initReWardType() {
        switch (Number(this.rewardType)) {
          case 1:
            this.title = '有效算力';
            this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
            break;
          case 2:
            this.title = '可用BTC';
            this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
            break;
          case 3:
            this.title = '可用ETH';
            this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
            break;
          case 4:
            this.title = '已返现金额';
            this.inviteTip = '您邀请的好友，还未支付矿机订单的用户';
            break;
        }
        let unit, promise;
        if (Number(this.rewardType) === 1) {
          unit = this.computingUnit;
        } else {
          unit = this.currencyName;
        }
        if (Number(this.rewardType) === 4) {
          // 已返现金额
          promise = new Promise((resolve, reject) => {
            UserAPI.getAwardOrderInfo(2).then((res) => {
              resolve(res);
            });
          });
        } else {
          promise = new Promise((resolve, reject) => {
            UserAPI.getUserEntrustRewardInfo(this.rewardType, unit).then(res => {
              resolve(res);
            });
          });
        }
        promise.then(res => {
          this.noRewardCount = res.noRewardCount || 0;
          this.alreadyRewardCount = res.alreadyRewardCount || 0;
          this.totalRewardCount = res.totalRewardCount || 0;
        });
        if (Number(this.rewardType) === 1) {
          UserAPI.getcomputingIfor(this.computingUnit).then(res => {
            this.tobeDeliver = res.freezenRewardCount === null ? 0 : res.freezenRewardCount;
            this.inviteStatus = res.useRewardCount === null ? 0 : res.useRewardCount;
          });
        } else if (Number(this.rewardType) === 4) {
          UserAPI.balanceInfo().then(res => {
            this.tobeDeliver = res.cashBackFreezeMoney === null ? 0 : res.cashBackFreezeMoney;
            this.inviteStatus = res.alreadyCashBack === null ? 0 : res.alreadyCashBack;
          });
        } else {
          UserAPI.getCurrencyInfor(this.currencyId).then(res => {
            this.tobeDeliver = res.rewardFreezeNumber === null ? 0 : res.rewardFreezeNumber;
            this.inviteStatus = res.totalRewardNumber === null ? 0 : res.totalRewardNumber;
          });
        }
      },
      getUserEntrustRewardList() {
        let unit, promise;
        if (Number(this.rewardType === 4)) {
          // 返现列表
          promise = new Promise((resolve, reject) => {
            UserAPI.getAwardOrderList(this.rewardStatus, this.pageNum, this.pageSize).then(res => {
              resolve(res);
            });
          });
        } else {
          if (Number(this.rewardType) === 1) {
            // 算力列表获取奖励未奖励列表信息时不需要传unit字段
            unit = '';
            // unit = this.computingUnit;
          } else {
            unit = this.currencyName;
          }
          promise = new Promise((resolve, reject) => {
            const param = [this.rewardType, this.rewardStatus, this.pageNum, this.pageSize, unit];
            if (unit === '') {
              param.splice(param.length - 1, param.length);
            }
            UserAPI.getUserEntrustRewardList(...param)
            .then(res => {
              resolve(res);
            });
          });
        }
        promise.then(res => {
          this.pages = res.pages;
          this.rewardListInfor = this.pageNum === 1
            ? res.list
            : this.rewardListInfor.concat(res.list);
          if (this.pages > this.pageNum) {
            this.$refs.scrollerBottom.enablePullup();
          } else {
            this.$refs.scrollerBottom.disablePullup();
          }
          if (this.$refs.scrollerBottom) {
            this.$refs.scrollerBottom.donePullup();
          }
        });
      },
      inviteTabClick(index) {
        if (index === 0) {
          this.tabelIndex = 0;
          this.rewardStatus = 0;
          switch (Number(this.rewardType)) {
            case 1:
              this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
              break;
            case 2:
              this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
              break;
            case 3:
              this.inviteTip = '您邀请的好友中，未在挖链APP中获取30WT的用户';
              break;
            case 4:
              this.inviteTip = '您邀请的好友，还未支付矿机订单的用户';
              break;
          }
        } else if (index === 1) {
          this.tabelIndex = 1;
          this.rewardStatus = 1;
          if (Number(this.rewardType) === 4) {
            this.inviteTip = '';
          } else {
            this.inviteTip = '好友已达成奖励所需的要求';
          }
        }
        // 每次切换tab的时候，重置pageNum, pages的值
        this.pageNum = 1;
        this.pages = 1;
        this.$refs.scrollerBottom.disablePullup();
        this.$nextTick(() => {
          this.getUserEntrustRewardList();
        });
      },
      onPullupLoading() {
        if (this.pages <= this.pageNum) {
          this.$refs.scrollerBottom.disablePullup();
          return;
        } else {
          this.getUserEntrustRewardList();
          this.pageNum++;
        }
      }
    },
    mounted() {
      this.isRender = true;
      this.rewardType = Number(this.$route.query.rewardType) || '';
      this.currencyId = this.$route.query.currencyId || '';
      this.computingUnit = this.$route.query.computingUnit || '';
      this.currencyName = this.$route.query.currencyName || '';
      this.initReWardType();
      this.getUserEntrustRewardList();
    },
    components: {
      Flexbox,
      FlexboxItem,
      XTable,
      Tab,
      TabItem,
      LoadMore,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .figure {
    height: 154px;
    position: relative;
    z-index: 1;
    > img {
      display: block;
      width: 100%;
    }
    .figcaption {
      text-align: center;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .totalNum {
        margin: 20px 0 10px;
        color: #fff;
        font-size: 16px;
      }
      .calValue {
        color: #fff;
        font-size: 32px;
      }
      .tobeDeliver {
        color: #999;
        font-size: 15px;
        margin-top: 15px;
      }
    }
  }

  .inviteData {
    position: absolute;
    bottom: -60px;
    padding: 0 10px;
    width: 100%;
    margin: -17px 0 8px;
    .invite-reward {
      padding: 15px 65px;
    }
    .flexbox {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      z-index: 10;
      text-align: center;
      .itemTop {
        font-size: 13px;
      }
      .itemDown {
        min-height: 22px;
        font-size: 16px;
        color: #303137;
        height: 16px;
        margin-top: 5px;
      }
    }
  }

  .reward-detail {
    margin-top: 60px;
    .reward-tip {
      padding: 0 10px;
      font-size: 12px;
      color: #969699;
    }
    .inviteFriend {
      text-align: center;
      font-size: 16px;
      color: #303137;
      margin: 23px 0 15px;
    }
    .friend-limit {
      display: flex;
      align-items: center;
      height: 40px;
      background: #F4F4F4;
      padding: 0 10px;
      font-size: 13px;
      color: #969699;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      img {
        width: 16px;
        display: block;
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }

  .rewardListInfor {
    .inviteTable {
      thead {
        tr {
          padding: 10px 0;
        }
      }
      tr {
        border-bottom: 1px solid #f4f4f4 !important;
      }
      td:before, .vux-table th:before {
        border-bottom: none;
      }
    }
  }

  .rewardListInfor td {
    color: #303137;
    font-size: 13px;
  }

  .rewardListInfor th {
    color: #606166;
    font-size: 13px;
  }

  .request-down-divider {
    width: 50%;
    margin: 15px auto 0;
    color: #ACACAC;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .request-empty {
    > img {
      display: block;
      width: 60px;
      margin: 54px auto 13px;
    }
    p {
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }

  .invite-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scroll-wrap {
    margin-top: 46px;
  }

  .calValue2, .calValue4 {
    margin-top: 41px;
  }

  .reward-detail .weui-loadmore_line {
    justify-content: center;
  }
</style>
