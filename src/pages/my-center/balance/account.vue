<template>
  <div class="account">
    <view-box body-padding-top="46px" body-padding-bottom="0px">
      <x-header :left-options="{backText: ''}" class="custom-header" slot="header">{{getTitle(type)}}
      </x-header>
      <scroller v-if="isRender" lock-x height="-46" ref="scroller" :pullup-config="PullupConfig"
                :use-pullup="true" @on-pullup-loading="onPullupLoading">
        <div class="box2">
          <!--<p v-for="i in bottomCount">placeholder {{i}}</p>-->
          <!--<load-more tip="loading"></load-more>-->
          <div class="account-total" :class="{zhanghuyue: (type === 0), bizhong: (type !== 0)}">
            <div class="total-text">可用({{getUnit(type)}})</div>
            <div class="total_value" v-if="!this.type">{{accountInfo.totalMoney | currency}}</div>
            <div class="total_value" v-else>{{accountInfo.currencyCount | cryptocurrency}}</div>
            <div class="total-btn" v-if="!type" @click="alertPay">充值</div>
            <div class="account-type">
              <flexbox :gutter="0" class="account-flexbox">
                <flexbox-item>
                  <div class="account-num line">
                    <div class="balancetext ">冻结({{getUnit(type)}})</div>
                    <div class="balance" v-if="!type">{{accountInfo.withdrawalFreezeMoney || 0}}</div>
                    <div class="balance" v-else>{{(accountInfo.currencyFreezeNumber || 0) + (accountInfo.rewardFreezeNumber || 0) | cryptocurrency}}</div>
                  </div>
                </flexbox-item>
                <flexbox-item>
                  <div class="account-num">
                    <div class="balancetext ">总额({{getUnit(type)}})</div>
                    <div class="balance" v-if="!type">
                      {{(accountInfo.totalMoney + accountInfo.withdrawalFreezeMoney) || 0 |
                    currency}}
                    </div>
                    <div class="balance" v-else>{{(accountInfo.currencyCount + accountInfo.currencyFreezeNumber) || 0 |
                    cryptocurrency}}
                    </div>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class="textinfo" v-if="type">{{accountInfo.currencyName}} 账户提现，请使用PC登录www.hc.top</div>
          <!--<div class="textinfo" v-if="type==1">BTC 账户提现，请使用PC登录www.hc.top</div>-->
          <!--<div class="textinfo" v-if="type==2">ETH 账户提现，请使用PC登录www.hc.top</div>-->
          <!--<div class="textinfo" v-if="type==3">DCR 账户提现，请使用PC登录www.hc.top</div>-->
          <div class="interspace" v-if="!type"></div>
          <div class="table-desc clearfix">
            <div class="left">
              {{type === 0 ? '现金账户' : getTitle(type)}}明细
              <span class="unit">单位/ {{getUnit(type)}}</span>
            </div>
            <div class="right">
              <div>
                <span class="green" v-if="!type"> {{income | currency}}</span>
                <span class="green" v-else> {{income | cryptocurrency}}</span>
              </div>
              <div>
                <span class="orange" v-if="!type"> {{pay | currency}}</span>
                <span class="orange" v-else>  {{pay | cryptocurrency}}</span>
              </div>
            </div>
            <div class="right">
              <div class="mright">收入 </div>
              <div class="mright">支出 </div>
            </div>
          </div>
          <x-table v-if="loadingTag && tableData.length!==0" :full-bordered="false" :cell-bordered="false" :content-bordered="false"
                   style="background-color:#fff;">
            <thead>
            <tr>
              <th>时间</th>
              <th>收支类型</th>
              <th>
                <span v-if="!type">金额(元)</span>
                <span v-else>数量({{getUnit(type)}})</span>
              </th>
              <th>名称/备注</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                  <span
                    v-if="item.createTime">{{item.createTime | date('YYYY-MM-DD HH:mm:ss').split(' ')[0]}}<br>{{item.createTime | date('YYYY-MM-DD HH:mm:ss').split(' ')[1]}}</span>
                <span v-else>--</span></td>
              <td v-if="!type">
                <span v-if="item.typeOfOperation == 0">收入</span>
                <span v-if="item.typeOfOperation == 1">支出</span>
                <span v-if="item.typeOfOperation == 2">收入<strong class="freeze">(冻结中)</strong></span>
                <span v-if="item.typeOfOperation == 3">支出<strong class="freeze">(冻结中)</strong></span>
              </td>
              <td v-else>
                <span v-if="item.typeOfOperation == 0">收入</span>
                <span v-if="item.typeOfOperation == 1">支出</span>
                <span v-if="item.typeOfOperation == 3">收入<strong class="freeze">(冻结中)</strong></span>
                <span v-if="item.typeOfOperation == 2">支出<strong class="freeze">(冻结中)</strong></span>
              </td>
              <td v-if="!type">
                  <span class="green"
                        v-if="item.typeOfOperation == 0 || item.typeOfOperation == 2">+{{item.totalMoney | currency}}</span>
                <span class="orange"
                      v-if="item.typeOfOperation == 1 || item.typeOfOperation == 3">-{{item.totalMoney | currency}}</span>
              </td>
              <td v-else>
                  <span class="green"
                        v-if="item.typeOfOperation == 0 || item.typeOfOperation == 3">+{{(item.currencyNumber || 0) | cryptocurrency}}</span>
                <span class="orange"
                      v-if="item.typeOfOperation == 1 || item.typeOfOperation == 2">-{{(item.currencyNumber || 0) | cryptocurrency}}</span>
              </td>
              <td v-if="!type">{{item.typeRemark}}</td>
              <td v-else>
                <span>{{getRmarkByType(item.type)}}</span>
              </td>
            </tr>
            </tbody>
          </x-table>
          <!--<load-more :show-loading="loading" :tip="loadtext" background-color="#fbf9fe"></load-more>-->
          <div v-if="loadingTag && tableData.length===0" class="request-empty">
            <img src="../../../assets/images/zanwuneirong@2x.png" alt="算立方">
            <p>暂无内容</p>
          </div>
        </div>
      </scroller>
    </view-box>
    <div v-transfer-dom>
      <confirm v-model="showDialogTopUp"
               title="余额充值"
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
  </div>

</template>
<script>
  import {
    Flexbox,
    FlexboxItem,
    XTable,
    LoadMore,
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux';
  import UserApi from '../../../services/user-api';
  import {OrderType, PullupConfig} from '../../../config/constants';
  import {isClient} from '../../../plugins/utils';
  import AccountApi from '../../../services/account-api';

  const accountInfo = [
    {currencyName: '账户余额'},
    {currencyName: 'BTC'},
    {currencyName: 'ETC'},
    {currencyName: 'DCR'},
    {currencyName: 'BTM'}
  ];
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        isRender: false,
        type: '',
        flag: 0,
        pageInfo: {
          totalPage: 0,
          currentPage: 0,
          pageSize: 10
        },
        tableData: [],
        income: '',
        pay: '',
        accountInfo: [],
        showDialogTopUp: false,
        errorHintText: false,
        errorInfo: '充值金额不得小于100元',
        topUpMoney: '',
        pages: '',
        PullupConfig,
        loadingTag: false
      };
    },
    components: {
      Flexbox,
      FlexboxItem,
      XTable,
      LoadMore,
      Confirm,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === '支付结果') {
        next({path: '/i'});
      } else {
        next();
      }
    },
    mounted() {
      this.isRender = true;
      this.type = Number(this.$route.query.type) || 0;
      if (!this.type) {
        // 账户余额
        this.userMoneyDetailByFlag();
        this.getuserMoneyTotal();
      } else {
        this.getAccountDetailByFlag();
        this.getuserAccountCurrencyList();
      }
    },
    methods: {
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
      getuserAccountCurrencyList() {
        AccountApi.userAccountCurrencyList()
          .then(res => res || {})
          .then(res => res.result || [])
          .then(res => {
            if (res.length === 0) this.accountInfo = accountInfo[this.type];
            else {
              res.forEach(item => {
                if (item.currencyId === this.type) {
                  this.accountInfo = item;
                }
              });
            }
          });
      },
      getAccountDetailByFlag() {
        AccountApi.accountDetailByFlag(this.flag, this.type, ++this.pageInfo.currentPage, this.pageInfo.pageSize)
          .then(res => {
            this.loadingTag = true;
            this.handleTypeData(res);
            return Promise.resolve(res.pageData.list || []);
          })
          .then(list => {
            this.tableData = this.tableData.concat(list);
            if (!list.length) {
              this.$refs.scroller.disablePullup();
              return;
            }
            if (this.$refs.scroller) {
              this.$refs.scroller.donePullup();
            }
          });
      },
      handleTypeData(res) {
        this.income = res.incomeTotal || 0;
        this.pay = res.expendTotal || 0;
        this.pageInfo.currentPage = res.pageData.current;
        this.pageInfo.pageSize = res.pageData.size;
        this.pageInfo.totalPage = res.pageData.pages;
      },
      getuserMoneyTotal() {
        AccountApi.userMoneyTotal().then(res => {
          this.accountInfo = res || {};
        });
      },
      handleData(res) {
        this.income = res.incomeTotal || 0;
        this.pay = res.expendTotal || 0;
        this.pageInfo.currentPage = res.pageData.current;
        this.pageInfo.pageSize = res.pageData.size;
        this.pageInfo.totalPage = res.pageData.pages;
      },
      userMoneyDetailByFlag() {
        AccountApi.userMoneyDetailByFlag(this.flag, ++this.pageInfo.currentPage, this.pageInfo.pageSize)
          .then(res => {
            this.loadingTag = true;
            this.handleData(res);
            return Promise.resolve(res.pageData.list || []);
          })
          .then(list => {
            this.tableData = this.tableData.concat(list);
            if (!list.length) {
              this.$refs.scroller.disablePullup();
              return;
            }
            if (this.$refs.scroller) {
              this.$refs.scroller.donePullup();
            }
          });
      },
      onPullupLoading() {
        if (this.pageInfo.totalPage <= this.pageInfo.currentPage) {
          this.$refs.scroller.disablePullup();
          return;
        }
        if (!this.type) {
          this.userMoneyDetailByFlag();
        } else {
          this.getAccountDetailByFlag();
        }
      },
      alertPay() {
        this.showDialogTopUp = true;
      },
      initError() {
        this.errorHintText = false;
        this.errorInfo = '';
      },
      getUnit(type) {
        if (!type) return '元';
        else return this.accountInfo.currencyName;
      },
      getTitle(type) {
        if (type === 0) return '账户余额';
        if (this.accountInfo.currencyName && type) return `${this.accountInfo.currencyName}账户`;
      },
      // 0:邀请好友返现;1:提现;2:购买矿;3购买矿机余额充值;4对公转账;5退还返回;6.算力购买;7.余额充值;8.矿机抵扣费用(电费和服务费);9.算力抵扣费用(电费);10:托管物流费用;11:托管上架费用;12:电费;13:管理费;14:维修费;15:服务费;16:保险费;17:其他
      // 0:托管矿机产出;1:提现;2.算力产出,3奖励
      getRmarkByType(type) {
//        const rmarkList = ['邀请好友返现', '提现', '购买矿', '购买矿机余额充值', '对公转账', '退还返回', '算力购买', '余额充值', '矿机抵扣费用(电费和服务费)', '算力抵扣费用(电费)', '托管物流费用', '托管上架费用', '电费', '管理费', '维修费', '服务费', '保险费', '其他'];
        const rmarkList = ['托管矿机产出', '提现', '算力产出', '奖励'];
        return rmarkList[type];
      }
    }
  };
</script>
<style lang="scss" scoped>
  .request-empty {
    & > img {
      display: block;
      width: 42px;
      margin: 54px auto 13px;
    }
    & > p {
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }
  .account {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .accout-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }

  .error-text {
    width: 90%;
    margin: 0 auto;
    font-size: 12px;
    color: #F95453;
    height: 30px;
    text-align: left;
    line-height: 26px;
  }

  .btn-box {
    width: 100%;
    height: 47px;
    border-top: 1px solid #E0E0E0;
    .pay-btn {
      width: 50%;
      float: left;
      font-size: 16px;
      color: #969699;
      text-align: center;
      line-height: 47px;
      position: relative;
    }
    .pay-btn.default::after {
      width: 1px;
      height: 25px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      content: '';
      display: block;
      background: #E0E0E0;
    }
    .pay-btn.primary {
      color: #303137;
    }
  }

  .input-wrap {
    width: 90%;
    margin: 0 auto;
    height: 42px;
    background: #FAFAFA;
    border: 1px solid #EDEEF0;
    border-radius: 2px;
    position: relative;
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    input {
      width: 90%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      float: left;
      margin-top: 10px;
      text-indent: 5px;
    }
    .text {
      font-size: 15px;
      color: #303137;
      line-height: 40px;
      margin-right: 2px;
      position: absolute;
      right: 5px;
    }
  }

  .pay-title {
    font-size: 16px;
    color: #303137;
    line-height: 60px;
    font-weight: 700;
  }

  .pay-content {
    position: fixed;
    display: table;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 9px;
    overflow: hidden;
  }

  .alert-pay {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  thead {
    background: #f4f4f4;
  }

  thead th {
    font-size: 13px;
    color: #606166;
  }

  tbody td {
    font-size: 12px;
    color: #303137;
    line-height: 1.5;
    padding: 10px 0;
  }

  .interspace {
    width: 100%;
    height: 10px;
    background: #f4f4f4;
  }

  .vux-table {
    &::after {
      display: none;
    }
    th:last-child {
      width: 30%;
      font-weight: normal;
    }
    td:first-child, th:first-child {
      padding-left: 15px;
    }
    td:last-child, th:last-child {
      padding-right: 15px;
    }
  }

  th {
    font-weight: normal;
    color: #606166;
  }

  .table-desc {
    width: 100%;
    line-height: 40px;
    padding: 4px 14px;
    background: #fff;
    .vux-table::after {
      display: none;
    }
    .left {
      float: left;
      font-size: 15px;
      color: #303137;
      .unit {
        font-size: 12px;
        color: #969699;
        margin-left: 7px;
      }
    }
    .right {
      width: auto;
      float: right;
      line-height: 20px;
      color: #7f7f7f;
      font-size: 12px;
      .mright {
        margin-right: 4px;
      }
      .green {
        font-size: 11px;
        color: #2BB56F;
      }
      .orange {
        font-size: 11px;
        color: #FD7220;
      }
    }
  }

  .textinfo {
    width: 100%;
    height: 37px;
    line-height: 37px;
    font-size: 13px;
    color: #969699;
    text-indent: 14px;
    background: #f4f4f4;
  }

  .account-flexbox {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .account-num {
    position: relative;
    text-align: center;
    &.line::after {
      content: '';
      background: rgba(255, 255, 255, 0.40);;
      display: block;
      width: 1px;
      height: 24px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .balancetext {
      opacity: 0.6;
      font-size: 14px;
      color: #FFFFFF;
    }
    .balance {
      font-size: 20px;
      color: #FFFFFF;
      margin-top: 5px;
    }

  }

  .green {
    color: #2BB56F;
  }

  .orange {
    color: #FD7220;
  }

  .account-total {
    padding-top: 34px;
    width: 100%;
    height: auto;
    // background: #19202D;
    overflow: hidden;
    text-align: center;
    &.zhanghuyue {
      background: url(../../../assets/images/zhanghuyue_bg@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    &.bizhong {
      background: url(../../../assets/images/bizhong_bg@2x.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .total-text {
    font-size: 16px;
    color: #fff;
  }

  .total_value {
    font-size: 34px;
    color: #fff;
    margin-top: 12px;
    line-height: 34px;
  }

  .total-btn {
    width: 117px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    color: #fff;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 16px;
  }

  .prompt {
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
</style>
