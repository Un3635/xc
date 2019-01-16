<template>
  <div class="income">
    <view-box body-padding-top="46px" body-padding-bottom="48px">
      <x-header :left-options="{showBack: false}" slot="header" class="custom-header" v-show="!searchBarFixed">
        <span>云算力收益</span>
        <div class="header-logo" slot="overwrite-left">
          <img src="../../assets/images/dinglan_logo@2x.png" alt="">
        </div>
      </x-header>
      <div class="header-screen" slot="header" v-if="login" v-show="searchBarFixed">
        <div :class="{'checked': screenType==0}" @click="screenClick(0)">
          <span>有效算力</span>
        </div>
        <div :class="{'checked': screenType==1}">
          <span @click="screenClick(1)">合约结束</span>
          <!--<div class="incomecountcue ml-10" @click="tip2=true;"></div>-->
        </div>
      </div>
      <div class="not-login" v-if="!login">
        <img src="../../assets/images/icon_shouyimoren_normal@1.5x.png" alt="">
        <div>登录查看云算力收益</div>
        <x-button @click.stop.prevent.native="goSign" type="primary" class="not-login-btn">
          登录
        </x-button>
      </div>
      <scroller v-if="isRender" v-show="login" height="-94" lock-x @on-pullup-loading="onPullupLoading" ref="scroller"
                class="scroller" @on-scroll="handleScroll" :use-pullup="true" :pullup-config="PullupConfig">
        <div class="inner-scroller">
          <div>
            <div class="incomecontent">
              <div class="countcny">
                <div class="incomecounttext h-lh-align">总收益</div>
                <div class="incomecountcue" @click="tip1=true;"></div>
                <div class="incomecountmoney h-lh-align">{{(totalIncome || 0) | currency}} <span>CNY</span></div>
              </div>
              <div class="vcincome clearfix" v-for="(item,index) in outputList" :key="index">
                <div class="vcincometext h-lh-align left">{{item.currencyName}}算力</div>
                <div class="vcincomemoney h-lh-align right">
                  <span>{{((item.outputB ) || 0) | cryptocurrency}}</span><span>{{item.currencyName}}</span>
                </div>
              </div>
            </div>

            <div class="incomecontent" v-show="status == 1">
              <div class="countcny">
                <div class="incomecounttext h-lh-align">交割概况</div>
              </div>
              <div class="vcincome bod0 clearfix">
                <div class="h-lh-align mytrusteeship left"></div>
                <div class="h-lh-align mytrusteeship left"></div>
                <div class="h-lh-align mytrusteeship left"><span class="round greenround"></span><span
                  class="c606">已交割</span>
                </div>
                <div class="h-lh-align mytrusteeship left"><span class="round orangeround"></span><span
                  class="c606">待交割</span>
                </div>
              </div>
              <div class="vcincome btf4 clearfix" v-for="(item,index) in outputList" :key="index">
                <div class="h-lh-align mytrusteeship c606 currency-name left">
                  {{item.currencyName}}算力
                </div>
                <div class="h-lh-align mytrusteeship c3 left">
                  {{item.availablePower || 0}}<span
                  class="unit">{{item.unit}}</span>
                </div>
                <div class="h-lh-align mytrusteeship c3 left">
                  {{item.penddingPower || 0}}<span
                  class="unit">{{item.unit}}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="height:46px;">
            <div class="screen" v-if="login">
              <div :class="{'checked': screenType==0}" @click="screenClick(0)">
                <span>有效算力</span>
              </div>
              <div :class="{'checked': screenType==1}">
                <span @click="screenClick(1)">合约结束</span>
                <!--<div class="incomecountcue ml-10" @click="tip2=true;"></div>-->
              </div>
            </div>
          </div>
          <div class="trusteeshiplist" v-for="(item,index) in bList" :key="index"
               @click="goDetails(item.orderNo,item.status,item.goodsCount)">
            <div class="listheader" :class="{'lh-25': screenType==1}">
              <div class="name">算力ID {{item.orderNo}}</div>
              <div class="date" v-if="item.status != 0">交割时间 {{item.deliveryCompleteTime | date('YYYY/MM/DD HH:mm:ss')}}
              </div>
              <div class="date" v-if="item.status == 0">购买时间 {{item.createTime | date('YYYY/MM/DD HH:mm:ss')}}</div>
              <div class="date" v-if="item.status == null || item.status == 2">
                结束时间 {{item.endTime | date('YYYY/MM/DD HH:mm:ss')}}
              </div>
            </div>
            <div class="listcontent">
              <div class="contentname clearfix">
                <div class="minerimg left">{{item.currencyName}}算力</div>
                <div class="minername left">
                  <p>{{item.detailVo.machineType || ''}}</p>
                  <span>{{item.goodsCount}}{{item.detailVo.powerUnit}}</span>
                </div>

                <div class="minernumber right">
                  <template v-if="item.status == 1">
                    <span class="round greenround"></span>
                    <span class="statusname">已交割</span>
                  </template>
                  <template v-else-if="item.status == 0">
                    <span class="round orangeround"></span>
                    <span class="statusname">待交割</span>
                  </template>
                  <template v-else-if="item.status == null || item.status == 2">
                    <span class="round grayround"></span>
                    <span class="statusname">合约结束</span>
                  </template>
                </div>
              </div>
              <div class="contentdetail" v-if="item.detailVo">
                <div class="detailcell">
                  <span>产出</span><span>{{(item.detailVo.outputB || 0) | cryptocurrency}}</span><span>{{item.currencyName}}</span><span>实际</span><span>{{(item.detailVo.realityB || 0) | cryptocurrency}}</span><span>{{item.currencyName}}</span>
                </div>
                <div class="detailcell">
                  <span>管理</span><span>{{(item.detailVo.serviceCharge || 0) | cryptocurrency}}</span><span>{{item.currencyName}}</span><span>耗电</span><span>{{(item.detailVo.energyCharge || 0) | cryptocurrency}}</span><span>{{item.currencyName}}</span>
                </div>
                <div class="detailcell">
                  <span></span><span></span><span></span><span></span><span
                  style="text-align: right">{{(item.detailVo.energyChargeRmb || 0) | cryptocurrency}}</span><span>CNY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
      <div v-transfer-dom>
        <alert class="remove-touch" mask-transition="vux-fade" v-model="tip1" content="收益计算参考当日北京时间上午8点火币网价格"
               button-text="我知道了"></alert>
      </div>
      <!--<div v-transfer-dom>-->
        <!--<alert class="remove-touch" v-model="tip2" mask-transition="vux-fade"-->
               <!--content="当该单挖矿总收益或者连续10天收益，不足以抵扣管理费用与耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束"-->
               <!--button-text="我知道了"></alert>-->
      <!--</div>-->
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>
<script>
  import {Alert, TransferDom} from 'vux';
  import PowerAPI from '../../services/power-api';
  import TrusteeshipAPI from '../../services/trusteeship-api';
  import {mapState} from 'vuex';
  import footerNav from '../components/footer-nav.vue';
  import {isClient} from '../../plugins/utils';
  import {PullupConfig} from '../../config/constants';

  export default {
    data() {
      return {
        isRender: false,
        status: 1,
        bList: [],
        screenType: 0,
        searchBarFixed: false,
        pageInfo: {
          currentPage: 0,
          pageSize: 10,
          totalPage: 0
        },
        scrollTop: 0,
        isLoading: false,
        isFirst: true,
        tip1: false,
//        tip2: false,
        currencyTypeList: [{'name': 'BTC', 'id': 1}, {'name': 'ETH', 'id': 2}, {'name': 'DCR', 'id': 3}, {
          'name': 'BTM',
          'id': 4
        }],
        totalIncome: 0,
        outputList: [],
        tabHeight1: 0,
        tabHeight2: 0,
        PullupConfig
      };
    },
    directives: {
      TransferDom
    },
    components: {
      Alert,
      footerNav,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    },
    computed: {
      ...mapState(['login'])
    },
    watch: {
      login: {
        handler(val) {
          if (val) {
            this.getCurrencyType()
              .then(this.initInfo)
              .then(() => {
                this.$nextTick(() => {
                  Array.from(document.querySelectorAll('.incomecontent')).forEach((node, i) => {
                    if (i === 0) {
                      this.tabHeight2 = node.clientHeight;
                    }
                    this.tabHeight1 += node.clientHeight;
                  });
//                 加上margin 30 加上tab高度 46
                  this.tabHeight1 += 76;
//                 加上margin 20 加上tab高度 46
                  this.tabHeight2 += 66;
                });
              })
              .then(this.powerMDetailList);
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.isRender = true;
    },
    methods: {
      getCurrencyType() {
        return TrusteeshipAPI.CurrencyType()
          .then(res => {
            if (res) {
              let resData = JSON.parse(res);
//            防止接口未返回数据，导致下面接口参数错误问题
              if (resData.length !== 0) {
                this.currencyTypeList = resData;
              }
            }
          });
      },
      initInfo() {
        let type = this.currencyTypeList.map(item => item.id).join(',');
        this.$vux.loading.show();
        return PowerAPI.getMColligate(type)
          .then(res => {
            let total = 0;
            this.outputList = res;
            this.outputList.forEach(item => {
              let currencyInfo = this.currencyTypeList.filter(currency => currency.id === item.currencyId);
              item.currencyName = currencyInfo[0].name;
              total += Number(item.income);
            });
            this.totalIncome = total;
          });
      },
      screenClick(typeid) {
        if (this.isLoading) return;
        if (typeid !== this.screenType) {
          this.screenType = typeid;
          this.bList = [];
          if (typeid === 0) {
            this.status = 1;
          } else {
            this.status = 0;
          }
          this.pageInfo = {
            currentPage: 0,
            total: 0,
            pageSize: 5
          };
          this.$refs.scroller.disablePullup();

          this.$nextTick(() => {
            if (this.status === 0) {
              if (this.scrollTop >= this.tabHeight2) {
                this.$refs.scroller.reset({top: this.tabHeight2});
              }
            } else if (this.status === 1) {
              if (this.scrollTop >= this.tabHeight2) {
                this.$refs.scroller.reset({top: this.tabHeight1});
                this.searchBarFixed = true;
              }
            }
            this.powerMDetailList()
              .then(() => {
                if (this.pageInfo.totalPage > this.pageInfo.currentPage) {
                  this.$refs.scroller.enablePullup();
                }
              });
          });
        }
      },
      goSign() {
        this.$parent.goSignIn();
      },
      handleScroll({top}) {
        this.scrollTop = top;
        if (this.status === 0) {
          if (top >= this.tabHeight2) {
            this.searchBarFixed = true;
          } else {
            this.searchBarFixed = false;
          }
        } else if (this.status === 1) {
          if (top >= this.tabHeight1) {
            this.searchBarFixed = true;
          } else {
            this.searchBarFixed = false;
          }
        }
      },
      goDetails(id, status, goodsCount) {
        if (this.screenType === 1) {
          status = 2;
        }
        if (status === 0) {
          // 显示
          this.$vux.alert.show({
            title: '',
            content: '还未交割',
            buttonText: '我知道了',
            maskTransition: 'vux-fade'
          });
        } else {
          this.$router.push({
            path: '/income-detail',
            query: {
              id: id
            }
          });
        }
      },
      powerMDetailList() {
        if (this.isLoading) return;
        this.isLoading = true;
        let currencyIds = this.currencyTypeList.map(item => item.id);
        let isDefault = false;
        for (let i = 0; i < currencyIds.length; i++) {
          if (!currencyIds[i]) {
            isDefault = true;
            break;
          }
        }
        if (isDefault) {
          // 默认值防止接口报错
          currencyIds = [1, 2, 3, 4];
        }
        // 1:购买 2：算力交易 3：邀请奖励 4：买增奖励
        let status = this.status === 0 ? '0' : [this.status, 2, 3, 4].join(',');
        let params = {
          status: status,
          curryencyIds: currencyIds.join(','),
          // goodsId: this.goodsIds.join(','),
          currentPage: ++this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        };
        if (this.pageInfo.currentPage === 1 && !this.isFirst) {
          this.$vux.loading.show();
        }
        return PowerAPI.powerMDetailList(params)
          .then(res => {
            this.isFirst = false;
            this.$vux.loading.hide();
            (res.data || []).forEach(item => {
              if (item.detailVo && item.detailVo.machineType) {
                item.detailVo.machineType = item.detailVo.machineType.replace('矿机', '');
              }
            });
            this.isLoading = false;
            this.bList = this.pageInfo.currentPage === 1 ? res.data : this.bList.concat(res.data);
            this.pageInfo.totalPage = Math.ceil(res.count / this.pageInfo.pageSize);
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
        this.powerMDetailList();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .income {
    background: #F4F4F4;
    .lh-25 {
      line-height: 25px;
    }
    .isFixed {
      position: fixed;
      top: 0;
      border-bottom: 5px solid #F4F4F4;
      z-index: 9999;
      width: 100% !important;;
      margin-top: 0 !important;
    }
    .round {
      display: inline-block;
      height: 6px;
      width: 6px;
      border-radius: 5px;
      margin-right: 3px;
    }
    .greenround {
      background: #2BB56F;
    }
    .redround {
      background: #F95453;
    }
    .grayround {
      background: #CECECE;
    }
    .orangeround {
      background: #FDAA24;
    }
    .incomecountcue {
      background: url("../../assets/images/icon_tishi_normal@2x.png") no-repeat;
      background-size: 16px 16px;
      background-position: center;
      display: inline-block;
      margin-left: 6px;
      height: 40px;
      width: 16px;
      vertical-align: middle;
    }
    .header-logo {
      width: 60px;
      height: 22px;
      img {
        max-width: 100%;
      }
    }
    .c3 {
      color: #303137 !important;
    }
    .c3c {
      color: #3C3C3F !important;
    }
    .c606 {
      color: #606166 !important;
    }
    .bod0 {
      border: 0 !important;
    }
    .btf4 {
      border-bottom: solid 1px #f4f4f4;
    }
    .h-lh-align {
      line-height: 40px;
    }
    .mytrusteeship {
      width: 25%;
      white-space: nowrap;
      font-size: 14px;
      text-align: center;
      height: 41px;
      span {
        vertical-align: middle;
      }
    }
    .currency-name {
      width: 50%;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .incomecontent {
      margin-top: 10px;
      font-size: 15px;
      background: #ffffff;
      .countcny {
        border-bottom: 1px solid #f4f4f4;
        .incomecounttext {
          color: #303137;
          display: inline-block;
          margin-left: 14px;
          vertical-align: middle;
        }
        .incomecountmoney {
          float: right;
          font-size: 14px;
          color: #FD7220;
          text-align: right;
          width: 40%;
          display: inline-block;
          margin-right: 14px;
          vertical-align: middle;
          font-weight: 600;
          span {
            font-size: 12px;
          }
          div {
            background: url("../../assets/images/icon_cengji_normal@2x.png") no-repeat;
            background-size: 5px 10px;
            background-position: center;
            display: inline-block;
            height: 40px;
            width: 16px;
            vertical-align: middle;
          }
        }
      }
      .vcincome {
        margin-left: 38px;
        border-bottom: 1px solid #f4f4f4;
        div:nth-of-type(3) > span, div:nth-of-type(4) > span {
          font-size: 12px;
          color: #969699;
          margin-left: 4px;
        }
        span.unit {
          font-size: 12px;
          color: #969699;
          margin-left: 4px;
        }
        .vcincometext {
          font-size: 14px;
          vertical-align: middle;
          color: #606166;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .vcincomemoney {
          display: inline-block;
          vertical-align: middle;
          float: right;
          font-size: 14px;
          color: #303137;
          margin-right: 14px;
          span:first-child {
            text-align: right;
            margin-right: 12px;
            width: 88px;
          }
          span {
            color: #969699;
            font-size: 12px;
            width: 33px;
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
    .screen {
      margin-top: 10px;
      background: #ffffff;
      div {
        margin-left: 27px;
        display: inline-block;
        line-height: 46px;
        font-size: 14px;
        color: #969699;
      }
      .checked {
        color: #303137;
        font-weight: 600;
      }
      .ml-10 {
        margin-left: 6px !important;
      }
    }
    .trusteeshiplist {
      margin-top: 10px;
      background: #ffffff;
      .listheader {
        padding: 7px 0;
        border-bottom: 1px solid #f4f4f4;
        div {
          color: #303137;
        }
        .name {
          line-height: 20px;
          margin-left: 14px;
          font-size: 14px;
        }
        .date {
          line-height: 20px;
          margin-left: 14px;
          font-size: 12px;
          display: block;
        }
        div:nth-of-type(3) {
          margin-right: 14px;
        }
      }
      .jiaoge {
        margin-left: 14px;
        color: #606166;
        font-size: 13px;
        span {
          margin-left: 10px;
        }
      }
      .listcontent {
        line-height: 40px;
        .contentname {
          position: relative;
          margin: 10px 14px 0;
          .minerimg {
            // background: url("../../assets/images/BTCsuanli_normal@2x.png") no-repeat center;
            // background-size: 92px 29px;
            // height: 40px;
            // width: 92px;
            // vertical-align: middle;
            margin-right: 12px;
            background: #303137;
            border-radius: 50px;
            padding: 7px 12px;
            line-height: 12px;
            font-size: 12px;
            color: #FFFFFF;
            text-align: left;
            // &.BTC {
            //   // background-image: url("../../assets/images/BTCsuanli_normal@2x.png");
            // }
            // &.ETH {
            //   background-image: url("../../assets/images/ETHsuanli_pressed@2x.png");
            // }
            // &.DCR {
            //   background-image: url("../../assets/images/DCRsianlu_normal@2x.png");
            // }
            // &.BTM {
            //   background-image: url("../../assets/images/BTMsuanli_normal@2x.png");
            // }
          }
          .minername {
            overflow: hidden;
            width: calc(100% - 102px - 65px);
            height: 40px;
            line-height: 25px;
            p {
              color: #303137;
              font-size: 15px;
              font-weight: 600;
              max-width: calc(100% - 40px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
            span {
              color: #F08821;
              font-weight: bold;
              max-width: 36px;
              float: left;
              margin-left: 6px;
            }
          }
          .minernumber {
            color: #FDAA24;
            font-size: 18px;
            text-align: right;
            width: 63px;
            height: 40px;
            line-height: 25px;
            span {
              font-size: 12px;
              color: #7f7f7f;
            }
          }
        }
        .contentdetail {
          margin-left: 14px;
          padding-bottom: 4px;
          .detailcell {
            color: #606166;
            font-size: 12px;
            height: 25px !important;
            line-height: 25px !important;
            span {
              line-height: 25px !important;
              width: 25px;
              display: inline-block;
            }
            span:nth-of-type(2) {
              width: 100px;
              font-size: 13px;
              color: #303137;
              text-align: right;
            }
            span:nth-of-type(5) {
              font-size: 13px;
              color: #303137;
              width: 100px;
              text-align: right;
            }
            span:nth-of-type(3) {
              color: #969699;
              font-size: 11px;
              margin-left: 3px;
            }
            span:nth-of-type(4) {
              margin-left: 18px;
            }
            span:nth-of-type(6) {
              color: #969699;
              font-size: 11px;
              margin-left: 3px;
            }
            @media screen and (max-width: 340px) {
              span:nth-of-type(2) {
                width: 85px !important;
              }
              span:nth-of-type(5) {
                width: 85px !important;;
              }
              span:nth-of-type(4) {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .not-login {
      width: 180px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      font-size: 0;
      img {
        width: 60%;
        display: block;
        margin: 0 auto 28px;
      }
      div {
        text-align: center;
        font-size: 16px;
        color: #333333;
        margin-bottom: 18px;
      }
      .not-login-btn {
        width: 100%;
      }
    }

  }

  .header-screen {
    z-index: 2;
    background: #ffffff;
    position: absolute;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    right: 0;
    height: 46px;
    div {
      margin-left: 27px;
      display: inline-block;
      line-height: 46px;
      font-size: 14px;
      color: #969699;
    }
    .checked {
      color: #303137;
      font-weight: 600;
    }
    .ml-10 {
      margin-left: 6px !important;
    }
  }

  .scroller {
    padding-bottom: 10px;
    overflow: hidden;
    z-index: 2;
  }
</style>
