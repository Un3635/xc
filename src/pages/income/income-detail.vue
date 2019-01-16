<template>
  <div class="sldetails">
    <view-box body-padding-top="46px" body-padding-bottom="0">
      <x-header :left-options="{backText: ''}" slot="header" class="custom-header">
        算力详情
        <transition name="vux-fade">
          <div class="dialog" v-show="updatemodalchecked">
            <div class="weui-mask"></div>
            <div class="wrap-dialog">
              <div class="inner-dialog">
                <div class="bd">
                  <div class="titleimg">
                    <img src="../../assets/images/xiugaifangshi_bg@2x.png" alt="">
                  </div>
                  <div class="modal">
                    <div class="pob">
                      <div @click="boxchecked=1">
                        <div :class="{'yuan': boxchecked==1, 'whiteyuan': boxchecked==0}">
                          <span></span>
                        </div>
                        <span>优先余额付费</span>
                      </div>
                      <div>
                        优先余额付费，扣款优先级：1、账户余额；2、每日产出的加密货币；3、账户中的加密货币。都上述扣款都无完成时，或连续10天每日产出的加密货币不足抵扣时，托管的矿机停止运行。
                      </div>
                    </div>
                    <div class="pob" style="margin-top:17px">
                      <div @click="boxchecked=0">
                        <div :class="{'yuan': boxchecked==0, 'whiteyuan': boxchecked==1}">
                          <span></span>
                        </div>
                        <span>优先以币抵费</span>
                      </div>
                      <div>优先以币抵费，抵扣优先级：1、每日产出的加密货币；2、账户中的加密货币。
                        都上述抵扣都无完成时，或连续10天每日产出的加密货币不足抵扣时，托管的矿机停止运行。
                      </div>
                    </div>
                    <div class="updatebtn" @click="updateClick">
                      确认修改
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </x-header>
      <scroller v-if="isRender" height="-46" lock-x @on-pullup-loading="onPullupLoading" ref="scroller"
                class="scroller" :use-pullup="true" :pullup-config="PullupConfig">
        <div style="padding-top: 10px;">
          <div class="slinfo">
            <div class="slinfoheader">
              <div>算力ID {{slinfo.orderNo}}</div>
              <div>购买时间 {{slinfo.createTime | date('YYYY/MM/DD HH:mm:ss')}}</div>
            </div>
            <div class="slinfocontent clearfix">
              <div class="left">
                <span class="left">
                  {{slinfo.name}}
                </span>
                <div class="right">
                  <template v-if="runStatus == 1">
                    <span class="round greenround"></span>
                    <span class="statusname">运行中</span>
                  </template>
                  <template v-else-if="runStatus == 2">
                    <span class="round redround"></span>
                    <span class="statusname">已终止</span>
                  </template>
                  <template v-else-if="runStatus == 3">
                    <span class="round redround"></span>
                    <span class="statusname">暂停中</span>
                  </template>
                  <template v-else-if="status != 2">
                    <span class="round greenround"></span>
                    <span class="statusname">运行中</span>
                  </template>
                  <template v-if="status == 1">
                    <span class="round greenround"></span>
                    <span class="statusname">已交割</span>
                  </template>
                  <template v-if="status == 0">
                    <span class="round redround"></span>
                    <span class="statusname">待交割</span>
                  </template>
                  <template v-if="status == 2">
                    <span class="round grayround"></span>
                    <span class="statusname">合约结束</span>
                  </template>
                </div>
              </div>
              <div class="left">
                <div>算力数量:  <span class="black">{{slinfo.powerNum}}{{slinfo.powerUnit}}</span></div>
                <div>算力费用:  <span class="org">{{(slinfo.totalAmount || 0) | currency}}元</span></div>
                <div class="border-btm"></div>
              </div>
              <div class="right">
                <div>交割时间:  <span>{{slinfo.deliveryCompleteTime | date('YYYY/MM/DD HH:mm:ss')}}</span></div>
                <div>运行时长:  <span>{{slinfo.runTime | duration}}</span></div>
              </div>
              <div class="left">
                付费方式: <span v-if="slinfo.payWay == 0">优先以币抵费</span> <span v-if="slinfo.payWay == 1">优先余额付费</span> <span
                @click="updatemodalchecked=true" style="font-weight: bold">修改</span>
              </div>
            </div>
          </div>
          <div class="incomesituation">
            <div class="situationheader">
              <div class="lefttext">{{type}}收益状况</div>
              <div class="righttext">{{slinfo.income}} <span>CNY</span></div>
            </div>
            <div class="situationcontent">
              <div class="yesterday">
                <div class="yesterdayheader">
                  <div class="icon"></div>
                  <span>总量</span>
                </div>
                <div class="contentdetail">
                  <div class="detailcell">
                    <span>产出</span><span>{{(slinfo.outputB || 0) | cryptocurrency}}</span><span>{{type}}</span><span>实际</span><span>{{(slinfo.realityB || 0) | cryptocurrency}}</span><span>{{type}}</span>
                  </div>
                  <div class="detailcell">
                    <span>管理</span><span>{{(slinfo.serviceCharge || 0) | cryptocurrency}}</span><span>{{type}}</span><span>耗电</span><span>{{(slinfo.energyCharge || 0) | cryptocurrency}}</span><span>{{type}}</span>
                  </div>
                  <div class="detailcell">
                    <span></span><span></span><span></span><span></span><span
                    style="text-align: right">{{(slinfo.energyChargeRmb || 0) | cryptocurrency}}</span><span>CNY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dayincome">
            <div>每日收益</div>
            <div class="box2">
              <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" class="minnertable">
                <thead>
                <tr>
                  <th>日期</th>
                  <th>实际币量({{type}})</th>
                  <th>当日币价<br/>折合收益</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tableData" :key="index">
                  <td>{{item.powerDate}}</td>
                  <td>{{(item.realityB || 0) | cryptocurrency}}</td>
                  <td :class="{'redcolor': item.income< 0}">{{(item.income || 0) | currency}}元</td>
                </tr>
                </tbody>
              </x-table>
              <load-more class="loadmore" v-if="!isLoadingEnd" tip="正在加载"></load-more>
              <div class="no-data" v-else-if="tableData.length == 0">
                <img src="../../assets/images/zanwuneirong@2x.png" alt="">
                暂无内容
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </view-box>
  </div>
</template>

<script>
  import {XTable, LoadMore} from 'vux';
  import PowerAPI from '../../services/power-api';
  import TrusteeshipApi from '../../services/trusteeship-api';
  import {isClient} from '../../plugins/utils';
  import {PullupConfig} from '../../config/constants';

  export default {
    data() {
      return {
        isRender: false,
        status: 0,
        runStatus: 0,
        boxchecked: 1,
        id: 0,
        updatemodalchecked: false,
        slinfo: {
          machineType: '',
          powerUnit: '',
          powerNum: 0
        },
        type: '',
        tableData: [],
        pageInfo: {
          currentPage: 0,
          totalPage: 0,
          pageSize: 10
        },
        PullupConfig,
        isLoadingEnd: false,
        currencyTypeList: [{'name': 'BTC', 'id': 1}, {'name': 'ETH', 'id': 2}, {'name': 'DCR', 'id': 3}, {
          'name': 'BTM',
          'id': 4
        }]
      };
    },
    components: {
      XTable,
      LoadMore,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    },
    mounted() {
      this.isRender = true;
      this.getCurrencyType()
        .then(this.initInfo);
    },
    methods: {
      getCurrencyType() {
        return TrusteeshipApi.CurrencyType()
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
      onPullupLoading() {
        if (this.pageInfo.totalPage <= this.pageInfo.currentPage) {
          this.$refs.scroller.disablePullup();
          return;
        }
        this.tablelist();
      },
      updateClick() {
        TrusteeshipApi.updatePayWay(this.id, 2, this.boxchecked).then(() => {
          this.slinfo.payWay = this.boxchecked;
        });
        this.updatemodalchecked = false;
      },
      initInfo() {
        this.id = this.$route.query.id;
        PowerAPI.powerInfo(this.id)
          .then(val => {
            this.slinfo = val;
            this.status = val.status;
            this.runStatus = val.runStatus;
            this.type = this.currencyTypeList.filter(item => item.id === val.currencyId)[0].name;
            this.slinfo.name = this.slinfo.machineType.replace('矿机', '');
          });
        this.tablelist();
      },
      tablelist() {
        return PowerAPI.powerInfoList(this.id, ++this.pageInfo.currentPage, this.pageInfo.pageSize).then(res => {
          this.isLoadingEnd = true;
          this.tableData = this.pageInfo.currentPage === 1 ? res.data : this.tableData.concat(res.data);
          this.pageInfo.totalPage = Math.ceil(res.count / this.pageInfo.pageSize);
          if (this.$refs.scroller && this.pageInfo.currentPage !== 1) {
            this.$refs.scroller.donePullup();
          }
          if (this.pageInfo.totalPage <= this.pageInfo.currentPage && this.$refs.scroller && this.pageInfo.currentPage !== 1) {
            this.$refs.scroller.disablePullup();
          }
          if (this.pageInfo.currentPage === 1) {
            if (res.data.length === this.pageInfo.pageSize) {
              this.$refs.scroller.enablePullup();
            } else if (res.data.length === 0) {
              this.$refs.scroller.disablePullup();
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sldetails {
    background: #f4f4f4;
    .round {
      display: inline-block;
      height: 6px;
      width: 6px;
      border-radius: 5px;
      margin-right: 3px;
      vertical-align: middle;
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
    .statusname {
      margin-right: 10px;
      vertical-align: middle;
      font-size: 13px;
      font-weight: normal;
      color: #606166;
    }
    .slinfo {
      background: #ffffff;
      color: #303137;
      font-size: 13px;
      .slinfoheader {
        border-bottom: 1px solid #f4f4f4;
        padding: 7px 0;
        div:first-child {
          line-height: 20px;
          font-size: 14px;
          margin-left: 14px;
        }
        div:nth-of-type(2) {
          line-height: 20px;
          margin-left: 14px;
          font-size: 12px;
        }
      }
      .slinfocontent {
        > div:first-child {
          width: 100%;
          font-size: 16px;
          line-height: 40px;
          font-weight: 600;
          padding: 0 14px;
          div {
            text-align: right;
          }
        }
        > div:nth-of-type(2) {
          float: left;
          display: inline-block;
          width: 41%;
          padding-left: 14px;
          font-size: 12px;
          color: #606166;
          position: relative;
          div {
            line-height: 20px;
            .black {
              color: #303137;
              font-size: 13px;
              font-weight: bold;
            }
            .org {
              color: #FD7220;
              font-size: 13px;
              font-weight: bold;
            }
          }
          .border-btm {
            position: absolute;
            display: inline-block;
            line-height: normal;
            right: 0;
            top: 10%;
            height: 80%;
            background: #f4f4f4;
            width: 1px;
          }
        }
        > div:nth-of-type(3) {
          display: inline-block;
          width: 52%;
          min-width: 180px;
          padding-right: 3px;
          float: right;
          font-size: 12px;
          color: #606166;
          div {
            word-break: break-all;
            line-height: 20px;
          }
        }
        > div:nth-of-type(4) {
          height: 40px;
          width: 100%;
          line-height: 40px;
          padding-left: 14px;
          font-size: 13px;
          color: #303137;
          clear: both;
          > span:first-child {
            margin-left: 8px;
            margin-right: 8px;
          }
          > span:last-child {
            color: #4D87EA;
          }
        }
      }
    }
    .incomesituation {
      margin-top: 10px;
      background: #ffffff;
      color: #303137;
      .situationheader {
        padding: 0 14px;
        border-bottom: 1px solid #f4f4f4;
        div {
          font-size: 15px;
          display: inline-block;
          vertical-align: middle;
          line-height: 40px;
        }

        .righttext {
          float: right;
          font-size: 14px;
          font-weight: bold;
          span {
            font-weight: normal;
            color: #969699;
            font-size: 12px;
            margin-left: 3px;
          }
        }
      }
      .situationcontent {
        padding: 0 12px;
        .yesterday {
          padding-top: 5px;
          padding-bottom: 5px;
          .yesterdayheader {
            line-height: 30px;
            height: 30px;
            .icon {
              display: inline-block;
              height: 11px;
              background: #FD7220;
              width: 2px;
              margin-right: 5px;
            }
            span {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
      .contentdetail {
        margin-left: 10px;
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
            margin-left: 5px;
          }
          span:nth-of-type(4) {
            margin-left: 18px;
          }
          span:nth-of-type(6) {
            color: #969699;
            font-size: 11px;
            margin-left: 5px;
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
    .dayincome {
      margin-top: 10px;
      background: #ffffff;
      > div:first-child {
        line-height: 40px;
        font-size: 15px;
        color: #303137;
        margin-left: 14px;
      }
      th {
        font-weight: normal;
        color: #606166;
      }
      .vux-table::after {
        display: none;
      }
      .minnertable {
        /*display: inline-block;*/
        width: 100%;
        .redcolor {
          color: #F95453;
        }
        thead > tr {
          /*padding-left: 3.7%;*/
          /*padding-right: 3.7%;*/
          line-height: normal !important;
          background: #F4F4F4;
          th {
            line-height: normal !important;
            padding: 10px 0;
            font-size: 13px;
          }
          > th:first-child {
            padding-left: 14px;
          }
          > th:last-child {
            padding-right: 14px;
          }
        }
        tbody > tr > td {
          vertical-align: middle;
          font-size: 13px;
        }
        tbody > tr > td:first-child {
          padding-left: 14px;
        }
        tbody > tr > td:nth-of-type(4) {
          padding-right: 14px;
        }
      }
    }
    .weui-mask {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .dialog {
      position: absolute;
      z-index: 5000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      text-align: center;
      height: 100vh;
      min-width: 100vw;
      overflow-y: scroll;
      .wrap-dialog {
        width: 85%;
        max-width: 310px;
        position: relative;
        top: 10%;
        z-index: 1001;
        margin: 0 auto;
        padding-bottom: 60px;
      }
      .inner-dialog {
        width: 100%;
      }
      .bd {
        position: relative;
        /*min-height: 40px;*/
        font-size: 15px;
        line-height: 1.3;
        word-wrap: break-word;
        word-break: break-all;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        .titleimg {
          height: auto;
          width: 100%;
          vertical-align: middle;
          position: relative;
          img {
            display: block;
            position: relative;
            z-index: 2;
          }
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            background: #fff;
            height: 50%;
          }
        }
        .modal {
          background: #ffffff;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          .pob {
            padding: 10px 15px 0px;
            word-break: break-all;
            color: #303137;
            font-size: 15px;
            text-align: left;
            .yuan {
              width: 17px;
              display: inline-block;
              vertical-align: middle;
              height: 17px;
              background: #FEB247;
              border-radius: 10px;
              position: relative;
              margin-right: 7px;
              span {
                width: 5px;
                display: inline-block;
                height: 5px;
                background: #ffffff;
                border-radius: 10px;
                left: 6px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .whiteyuan {
              width: 17px;
              display: inline-block;
              vertical-align: middle;
              height: 17px;
              background: #ffffff;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              position: relative;
              margin-right: 7px;
            }
            > span {
              color: #303137;
              font-size: 15px;
              vertical-align: middle;
            }
            div:nth-of-type(2) {
              margin-top: 10px;
              color: #969699;
              font-size: 13px;
              line-height: 20px;
              white-space: normal;
            }
          }
          .updatebtn {
            line-height: 50px;
            height: 50px;
            border-top: 1px solid #f4f4f4;
            font-size: 16px;
            color: #303137;
            margin-top: 17px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }

  .no-data {
    background: #fff;
    text-align: center;
    padding: 50px;
    color: #969696;
    img {
      display: block;
      width: 42px;
      margin: 0 auto 10px;
    }
  }

  .loadmore {
    margin: 0 auto;
    padding: 1.5em;
  }
</style>
<style>
  .box2 .vux-table.vux-table-no-content-bordered tr:last-child td:before {
    border-bottom: none;
  }
</style>
