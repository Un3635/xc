<template>
  <div class="general">
    <div class="page-title">
      <p class="txt">账户概况</p>
    </div>
    <ul class="general-list">
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">用户信息</span>
        </div>
        <ul class="item-info">
          <li class="info-li">
            <p><span class="p-tit">用户名</span> <span class="text-color">{{outUserInfo.username}}</span><br/>
              <span class="p-tit">手机号</span> <span class="text-color">{{outUserInfo.phoneNo | phone}}</span></p>
          </li>
          <li class="line-li">
            <div class="line-mid"></div>
          </li>
          <li class="info-li">
            <p>
              <!-- <span class="p-tit">谷歌验证器</span>
              <span class="p-default text-color2" v-if="isGaSecret == 1">已绑定</span>
              <span class="p-default text-color" style="cursor:pointer;" v-if="isGaSecret == 0" @click="gotoVerify">未绑定</span>
              <br/> -->
              <span class="p-tit">用户等级</span> <span class="text-color">{{outUserInfo.userLevel}}</span>
              <br/>
              <span class="p-tit">钱包地址</span>
              <span class="currency" @click="turnToAdd">
                  <span class="p-currency">BTC</span>
                  <span class="p-currency">DCR</span>
                  <span class="p-currency p-last-currency">ETH</span>
                  <span class="p-arrow"
                        v-if="outUserInfo.walletAddressList && outUserInfo.walletAddressList.length > 0">
                          <i class="el-icon-arrow-right"></i></span>
              </span>
            </p>
          </li>
          <li class="line-li">
            <div class="line-mid"></div>
          </li>
          <li class="info-li">
            <p>
              <span class="p-tit">注册时间</span> <span class="text-color">{{outUserInfo.registTime | date('YYYY-MM-DD')}}</span><br/>
            </p>
          </li>
        </ul>
      </li>
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">我的账户</span>
          <div class="recharge">
            <span @click="rechargeNow">立即充值</span>
            <span @click="$router.push('/p-center/account')">提币</span>
          </div>
        </div>
        <div class="item-account">
          <div class="item-left">
            <div class="left-wrap">
              <ul class="carousel carousel-account">
                <li class="carousel-item"
                    v-for="(item,index) in outMyAccountVo.outCoinInfoVos"
                    :key="index"
                    v-show="item.holdingAmount || item.preFrozen">
                  <p class="p1">{{item.coinName}}</p>
                  <h3 :title="item.holdingAmount">{{item.holdingAmount}}</h3>
                  <p class="freeze" :title="item.preFrozen">预挖冻结 {{item.preFrozen}}</p>
                </li>
                <li class="nodatas-account"
                    v-if="outMyAccountVo.outCoinInfoVos && outMyAccountVo.outCoinInfoVos.length == 0">
                  暂无收益
                </li>
              </ul>
            </div>
            <div class="arrow-left"
                 v-if="outMyAccountVo.outCoinInfoVos&&outMyAccountVo.outCoinInfoVos.length>3"
                 @click="moveRight('.carousel-account',outMyAccountVo.outCoinInfoVos.length,3)">
            </div>
            <div class="arrow-right"
                 v-if="outMyAccountVo.outCoinInfoVos&&outMyAccountVo.outCoinInfoVos.length>3"
                 @click="moveLeft('.carousel-account',outMyAccountVo.outCoinInfoVos.length,3)">
            </div>
          </div>
          <div class="item-right">
            <p class="p1">我的总资产（元）</p>
            <p class="p2" :title="totalAmount">{{totalAmount}}</p>
          </div>
        </div>
      </li>
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">我的收益</span>
        </div>
        <div class="item-account">
          <div class="item-left item-left2">
            <div class="left-wrap">
              <ul class="carousel carousel-income">
                <li class="carousel-item"
                    v-for="(item,index) in outMyIncomeVo.outCoinInfoVos"
                    :key="index"
                    v-show="item.holdingAmount || item.preFrozen">
                  <p class="p1">{{item.coinName}}</p>
                  <h3 :title="item.holdingAmount">{{item.holdingAmount}}</h3>
                  <!--<p class="freeze">预挖冻结 {{tem.preFrozen}}</p>-->
                </li>
                <li class="nodatas-income"
                    v-if="outMyAccountVo.outCoinInfoVos && outMyAccountVo.outCoinInfoVos.length == 0">
                 暂无收益
                </li>
              </ul>
            </div>
            <div class="arrow-left"
                 v-if="outMyIncomeVo.outCoinInfoVos && outMyIncomeVo.outCoinInfoVos.length > 4"
                 @click="moveRight('.carousel-income',outMyIncomeVo.outCoinInfoVos.length,4)"></div>
            <div class="arrow-right"
                 v-if="outMyIncomeVo.outCoinInfoVos && outMyIncomeVo.outCoinInfoVos.length > 4"
                 @click="moveLeft('.carousel-income',outMyIncomeVo.outCoinInfoVos.length,4)"></div>
          </div>
          <!--<div class="item-right">
              <p class="p1">总收益（元）</p>
              <p class="p2">{{outMyIncomeVo.totalRevenue}}</p>
          </div>-->
        </div>
      </li>
      <!--云算力收益详情-->
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">云算力收益详情</span>
        </div>
        <div class="item-detail">
          <div class="detail-table">
            <el-table :data="cloudOutRevenueDetailsList" style="width: 100%" class="detail common-table">
              <el-table-column fixed label="日期" min-width="130">
                <template slot-scope="scope">
                  {{scope.row.date | date('YYYY-MM-DD')}}
                </template>
              </el-table-column>
              <el-table-column v-if="incomeCoinList&&incomeCoinList.length>0"
                               :label="item.coinName"
                               v-for="(item,index) in incomeCoinList"
                               :key="index"
                               min-width="126px">
                <template slot-scope="scope">
                  <span v-if="scope.row.incomeList[index]">{{scope.row.incomeList[index].income}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="more" v-if="cloudOutRevenueDetailsList && cloudOutRevenueDetailsList.length >2">
            <p @click="$router.push('/p-center/hashCloud')">查看更多</p>
          </div>
        </div>
      </li>
      <!--量化收益详情-->
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">量化收益详情</span>
          <div class="question"><i class="el-icon-question"></i></div>
          <span class="question-tip">虚拟币转入账户次日后，获取的量化投资收益</span>
        </div>
        <div class="item-detail">
          <div class="detail-table">
            <el-table :data="quantificateOutRevenueDetailsList" style="width: 100%"
                      class="detail common-table">
              <el-table-column fixed prop="date" label="日期" min-width="135">
                <template slot-scope="scope">
                  {{scope.row.date | date('YYYY-MM-DD')}}
                </template>
              </el-table-column>
              <el-table-column v-if="quantizationIncomeCoinList&&quantizationIncomeCoinList.length>0"
                               :label="item.coinName"
                               v-for="(item,index) in quantizationIncomeCoinList"
                               :key="index"
                               min-width="126px">
                <template slot-scope="scope">
                  <span v-if="scope.row.incomeList[index]">{{scope.row.incomeList[index].income}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="more" v-if="quantificateOutRevenueDetailsList && quantificateOutRevenueDetailsList.length > 2" ><p @click="$router.push('/p-center/income')">查看更多</p></div>

        </div>
      </li>
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">推广收益</span>
        </div>
        <ul class="item-promote">
          <li class="item-li">
            <div class="left">推广链接</div>
            <div class="right">
              <p class="link">{{outSpreadIncome.spreadLink}}</p>
              <p class="txt">任何通过该链接注册的用户，产生投资行为后均有部分金额进入您的收益</p>
              <span class="copy-btn"
                    v-clipboard:copy="outSpreadIncome.spreadLink"
                    v-clipboard:success="doCopy">复制</span>
            </div>
          </li>
          <li class="item-li">
            <div class="left">邀请码</div>
            <div class="right">
              <p class="txt">{{outSpreadIncome.inviteCode}}</p>
              <span class="copy-btn"
                    v-clipboard:copy="outSpreadIncome.inviteCode"
                    v-clipboard:success="doCopy">复制</span>
            </div>
          </li>
        </ul>
      </li>
      <li class="general-item">
        <div class="tit">
          <img src="../../assets/image/centerImage/Title_normal.png">
          <span class="txt">推广奖励记录</span>
        </div>
        <div class="item-detail">
          <div class="detail-table">
            <el-table :data="outSpreadRewardList" style="width: 100%" class="detail common-table">
              <el-table-column prop="invitees" label="被邀请人"></el-table-column>
              <el-table-column prop="inviteeLevel" label="被邀请人级别"></el-table-column>
              <el-table-column prop="orderProduct" label="订单产品"></el-table-column>
              <el-table-column label="奖励日期">
                <template slot-scope="scope">
                  {{scope.row.rewardDate | date('YYYY-MM-DD')}}
                </template>
              </el-table-column>
              <el-table-column prop="rebate" label="返佣"></el-table-column>
            </el-table>
          </div>
          <div class="more" v-if="outSpreadRewardList && outSpreadRewardList.length>2"><p @click="$router.push('/p-center/invite')">查看更多</p></div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    breadcrumb() {
      return {
        label: '账户概况',
        pList: [
          {
            path: '',
            label: '个人中心'
          }
        ]
      }
    },
    data() {
      return {
        moveOnOff: true,
        isGaSecret: '0',//0未绑定 1已绑定
        tableData: [],
        totalAmount: 0,
        accountOverviewData: {},
        outUserInfo: {},
        outMyAccountVo: {},
        outMyIncomeVo: {},
        outSpreadIncomeVo: {},
        outSpreadIncome: {},
        //云算力收益详情
        cloudOutRevenueDetailsList: [],
        incomeCoinList: [],
        //量化收益详情
        quantizationIncomeCoinList: [], //量化收益接口获取的数据
        quantificateOutRevenueDetailsList: [], //账户概况接口获取的数据
        //推广奖励记录
        outSpreadRewardList: [],
        cid: '',

      };
    },
    methods: {
      gotoProfile() {
        this.$router.push({path: '/p-center/profile', query: {active: 'getMoney'}})
      },
      gotoVerify() {
        this.$router.push({path: '/p-center/verify', query: {page: 'general'}})
      },
      moveLeft(name, len, limit) {
        if ($(name).position().left > (limit - len) * 170 && this.moveOnOff) {
          this.moveOnOff = false;
          let that = this;
          $(name).stop().animate({left: $(name).position().left - 170}, 600, function () {
            that.moveOnOff = true;
          });
        }
      },
      moveRight(name, len, limit) {
        if ($(name).position().left < 0 && this.moveOnOff) {
          this.moveOnOff = false;
          let that = this;
          $(name).stop().animate({left: $(name).position().left + 170}, 600, function () {
            that.moveOnOff = true;
          });
        }
      },
      doCopy() {
        this.$message({
            message: '复制成功',
            type: 'success'
          });
      },
      rechargeNow() {
        this.$alert('暂时仅支持线下充值<br/>请添加客服微信：17195439140', '立即充值', {
          iconClass: '',
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        }).then(() => {
        }, () => {
        });
      },
      //账户概况数据
      getAccountData() {
        var vm = this;
        getajaxdata(API.accountOverviewInfo, 'POST', {initTimes: new Date().getTime()}, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.outUserInfo = res.data.outUserInfo;
            vm.outUserInfo.username = vm.outUserInfo.username ? vm.outUserInfo.username : '-';
            vm.outUserInfo.userLevel = vm.outUserInfo.userLevel ? vm.outUserInfo.userLevel : '-';
            vm.outUserInfo.walletAddressList = vm.outUserInfo.walletAddressList.length > 0 ? vm.outUserInfo.walletAddressList : [{coinName: '-'}];

            vm.outMyAccountVo = res.data.outMyAccount;
            vm.outMyIncomeVo = res.data.outMyIncome;
            vm.outSpreadIncome = res.data.outSpreadIncome;
            vm.outSpreadRewardList = res.data.outSpreadRewardList;
            for (let i = 0; i < vm.outSpreadRewardList.length; i++) {
              if(!vm.outSpreadRewardList[i].inviteeLevel || vm.outSpreadRewardList[i].inviteeLevel == 'null') {
                vm.outSpreadRewardList[i].inviteeLevel = '-';
              } else {
                vm.outSpreadRewardList[i].inviteeLevel = res.data.outSpreadRewardList[i].inviteeLevel;
              }
            }
            vm.accountOverviewData = res.data;
            vm.cloudOutRevenueDetailsList = res.data.cloudOutRevenueDetailsList;//云算力收益详情数据
            vm.quantificateOutRevenueDetailsList = res.data.quantificateOutRevenueDetailsList; //量化收益详情数据
            vm.totalAmount =res.data.outMyAccount.totalAssets;
            vm.getQuantizationData();
            vm.getComputingGainData();
          }
        }, this);
      },
      //云算力收益详情表格数据
      getComputingGainData() {
        var vm = this;
        let _params = {
          page_num: 1,
          page_size: 3,
          initTimes: new Date().getTime()
        };
        getajaxdata(API.getComputingGain, 'POST', _params, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.revenueDetailsVoList = res.data.revenueDetailsVoList;
            vm.incomeCoinList = res.data.incomeCoinList;
            // console.log(res);
            // vm.initTableData(vm.revenueDetailsVoList, vm.incomeCoinList);
            vm.initTableData(vm.cloudOutRevenueDetailsList, vm.incomeCoinList);
          }
        }, this);
      },
      initTableData(tab, list) {
        list.sort(function (a, b) {
          if (a.coinName < b.coinName) {
            return -1;
          }
          if (a.coinName > b.coinName) {
            return 1;
          }
          return 0;
        });
        for (var i = 0; i < list.length; i++) {
          this.filterData(list[i], tab);
        }
        this.$nextTick(function () {
          // this.revenueDetailsVoList = tab;
          this.cloudOutRevenueDetailsList = tab.reverse().slice(0,3);
          this.incomeCoinList = list;
        });
      },
      filterData(item, tab) {
        var obj = {
          'coinName': item.coinName,
          'income': '-'
        };
        for (var j = 0; j < tab.length; j++) {
          if (JSON.stringify(tab[j].incomeList).indexOf(item.coinName) < 0) {
            tab[j].incomeList.push(obj);
          }
          tab[j].incomeList.sort(function (a, b) {
            if (a.coinName < b.coinName) {
              return -1;
            }
            if (a.coinName > b.coinName) {
              return 1;
            }
            return 0;
          });
        }
        return tab;
      },
      //量化收益详情表格数据
      getQuantizationData() {
        var vm = this;
        let _params = {
          coinId: '',
          page_num: 1,
          page_size: 3,
          initTimes: new Date().getTime()
        };
        getajaxdata(API.getQuantizationDetail, 'GET', _params, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.quantizationIncomeCoinList = res.data.incomeCoinList;
            if (vm.quantificateOutRevenueDetailsList && vm.quantizationIncomeCoinList) {
              vm.initTableData2(vm.quantificateOutRevenueDetailsList, vm.quantizationIncomeCoinList);
            }
          }
        }, this);
      },
      initTableData2(tab, list) {
        list.sort(function (a, b) {
          if (a.coinName < b.coinName) {
            return -1;
          }
          if (a.coinName > b.coinName) {
            return 1;
          }
          return 0;
        });
        for (var i = 0; i < list.length; i++) {
          this.filterData2(list[i], tab);
        }
        this.$nextTick(function () {
          this.quantificateOutRevenueDetailsList = tab.reverse().slice(0,3);
          this.quantizationIncomeCoinList = list;
        });
      },
      filterData2(item, tab) {
        var obj = {
          'coinName': item.coinName,
          'income': '-'
        };
        for (var j = 0; j < tab.length; j++) {
          if (JSON.stringify(tab[j].incomeList).indexOf(item.coinName) < 0) {
            tab[j].incomeList.push(obj);
          }
          tab[j].incomeList.sort(function (a, b) {
            if (a.coinName < b.coinName) {
              return -1;
            }
            if (a.coinName > b.coinName) {
              return 1;
            }
            return 0;
          });
        }
        return tab;
      },
      turnToAdd(){
          this.$router.push({path: '/p-center/profile',query: {active: 'getMoney'}})
      }
    },
    mounted() {
      if (localStorage.getItem('userInfo')) {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.isGaSecret = Boolean(userInfo.isGaSecret) ? '1' : '0';
      }
      this.getAccountData();
      this.getComputingGainData();
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/css/public.scss";

  .general {
  @include center-page-title;
  .general-list {
    padding: 30px 30px 0;
  .general-item {
    width: 100%;
    margin: 0 auto 33px;
  }
  }
  .general-item {
  .tit {
  @include center-item-tit;
  }
  .item-info {
    border: 1px solid #F0F0F0;
    border-radius: 2px;
    padding: 8px 0;
  @include clearfix;
  .info-li {
    float: left;
    list-style: none;
    width: 272px;
    text-align: center;
  }
  .line-li {
    float: left;
    width: 1px;
    height: 32px;
    margin-top: 15px;
  .line-mid {
    display: inline-block;
    width: 1px;
    height: 32px;
    background: #EDEDED;
  }
  }
  }
  .info-li {
  p {
    padding-left: 80px;
    text-align: justify;
    text-justify: inter-ideograph;
  &:first-of-type {
     padding-left: 43px;
   }
  .p-tit {
     padding-right: 18px;
     color: #5F5F5F;
     font-size: 14px;
     text-align: left;
     line-height: 30px;
   }
  .currency{
    cursor: pointer;
    font-size: 14px;
  }
  .p-currency {
     color: #2F2F2F;
     padding-right:8px;
   }
   .text-color{
     font-size: 14px;
     color: #2F2F2F;
    }
  .text-color2{
    font-size: 14px;
    color: #9B9B9B;
   }
  }
  .item-reward {
    border: 1px solid #F0F0F0;
    border-radius: 2px;

  .more {
    width: 100%;
    height: 54px;
    border: 1px solid #F0F0F0;
    text-align: center;

  p {
    font-size: 14px;
    color: #4D2EEA;
    line-height: 54px;
    cursor: pointer;
  }

  }
  }
  }
  .item-left {
    float: left;
    position: relative;
    width: 588px;
    margin: 24px 58px 24px 0;
    height: 100px;
  .left-wrap {
    position: relative;
    width: 100%;
    height: 100px;
    overflow: hidden;
  .carousel {
    position: absolute;
    top: 0;
    left: 0;
    display: inline;
    height: 100px;
    white-space: nowrap;

  .carousel-item {
    display: inline-block;
    vertical-align: top;
    width: 126px;
    height: 68px;
    padding: 16px 18px;
    margin-right: 8px;
    text-align: left;
    background-image: linear-gradient(-180deg, #F5F6FA 0%, rgba(251, 251, 253, 0.60) 100%);

  .p1 {
    font-size: 14px;
    color: #2F2F2F;
    text-align: left;
    line-height: 16px;
  }

  h3 {
    padding-top: 9px;
    font-size: 16px;
    color: #2F2F2F;
    text-align: left;
    line-height: 20px;
    font-weight: 800;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .freeze {
    padding-top: 7px;
    font-size: 12px;
    line-height: 16px;
    color: #9B9B9B;
    text-align: left;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis
  }

  }

  }
  .nodatas-account {
    width: 588px;
    height: 100px;
    text-align: center;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 100px;
  }
  .nodatas-income {
    width: 812px;
    height: 100px;
    text-align: center;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 100px;
  }
  }
  .arrow-left, .arrow-right {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
  &.p-default {
     color: #9B9B9B;
   }
  }
  }
  .item-account {
    border: 1px solid #F0F0F0;
    border-radius: 2px;
    padding: 24px 20px;
  @include clearfix;
  }
  .item-detail {
    border: 1px solid #F0F0F0;
    border-radius: 2px;

  .more {
    width: 100%;
    height: 54px;
    text-align: center;
    border-top: 1px solid #EDEDED;

  p {
    font-size: 14px;
    color: #4D2EEA;
    line-height: 54px;
    cursor: pointer;
  }

  }
  }
  .item-promote {
    padding: 24px 30px;
    border: 1px solid #F0F0F0;
    border-radius: 4px;

  .item-li {
    width: 100%;
  @include clearfix;

  &:last-of-type {
     padding-top: 32px;
   }

  }
  }
  .item-reward {
    border: 1px solid #F0F0F0;
    border-radius: 2px;
  .more {
    width: 100%;
    height: 54px;
    border: 1px solid #F0F0F0;
    text-align: center;

  p {
    font-size: 14px;
    color: #4D2EEA;
    line-height: 54px;
    cursor: pointer;
  }

  }
  }
  .item-left {
    float: left;
    position: relative;
    width: 588px;
    margin: 24px 58px;
    height: 100px;

  .left-wrap {
    position: relative;
    width: 100%;
    height: 100px;
    overflow: hidden;

  .carousel {
    position: absolute;
    top: 0;
    left: 0;
    display: inline;
    height: 100px;
    white-space: nowrap;

  .carousel-item {
    display: inline-block;
    vertical-align: top;
    width: 126px;
    height: 68px;
    padding: 16px 18px;
    margin-right: 8px;
    text-align: left;
    background-image: linear-gradient(-180deg, #F5F6FA 0%, rgba(251, 251, 253, 0.60) 100%);

  .p1 {
    font-size: 14px;
    color: #2F2F2F;
    text-align: left;
    line-height: 16px;
  }

  h3 {
    padding-top: 9px;
    font-size: 18px;
    color: #2F2F2F;
    text-align: left;
    line-height: 20px;
    font-weight: 800;
  }

  .freeze {
    padding-top: 7px;
    font-size: 12px;
    line-height: 16px;
    color: #9B9B9B;
    text-align: left;
  }

  }

  }
  .nodatas-account {
    width: 588px;
    height: 100px;
    text-align: center;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 100px;
  }

  .nodatas-income {
    width: 812px;
    height: 100px;
    text-align: center;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 100px;
  }

  }
  .arrow-left, .arrow-right {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }

  .arrow-left {
    position: absolute;
    top: 38px;
    right: -54px;
    background: url('../../assets/image/centerImage/left-Button_normal.png') 50% 50% no-repeat;
    background-size: 28px 28px;

  &:hover {
     background: url('../../assets/image/centerImage/left-Button_pressed.png') 50% 50% no-repeat;
     background-size: 28px 28px;
   }

  }
  .arrow-right {
    position: absolute;
    top: 38px;
    right: -99px;
    background: url('../../assets/image/centerImage/right-Button_normal.png') 50% 50% no-repeat;
    background-size: 28px 28px;

  &:hover {
     background: url('../../assets/image/centerImage/right-Button_pressed.png') 50% 50% no-repeat;
     background-size: 28px 28px;
   }

  }
  }
  .item-left2 {
    width: 812px !important;
  }
  .item-right {
    float: right;
    width: 184px;
    padding-left: 32px;
    height: 76px;
    margin-top: 36px;
    border-left: 1px solid #EDEDED;
    text-align: center;
  .p1 {
    font-size: 14px;
    padding-top: 8px;
    color: #666;
    text-align: left;
  }

  .p2 {
    max-width:184px;
    font-size: 24px;
    padding-top: 14px;
    color: #E94C4C;
    text-align: left;
    line-height: 30px;
    font-weight: 800;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  }
  .item-li {
  .left {
    float: left;
    width: 56px;
    padding: 0 24px 12px 0;
    font-size: 14px;
    color: #5F5F5F;
    text-align: left;
    line-height: 24px;
  }
  .right {
    float: left;
    width: 733px;
  @include clearfix;
  .link {
    display: inline-block;
    width: 733px;
    margin-bottom: 13px;
    font-size: 14px;
    line-height: 19px;
    color: #4D2EEA;
    text-align: justify;
    text-justify: inter-word;
    word-break: break-all;
  }
  .txt {
    float: left;
    display: inline-block;
    /*padding-top:13px;*/
    font-size: 14px;
    line-height: 24px;
    color: #2F2F2F;
  }
  .copy-btn {
    float: left;
    display: inline-block;
    width: 67px;
    height: 24px;
    font-size: 12px;
    margin-left: 20px;
    color: #FFF;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    background-image: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);
    box-shadow: 0 4px 10px 0 rgba(77, 46, 234, 0.30);
  }
  }
  }
  }
</style>
