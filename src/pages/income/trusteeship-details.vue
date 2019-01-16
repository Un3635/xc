<template>
  <div class="trusteeshipdetails">
    <view-box body-padding-top="0px" body-padding-bottom="0">
      <x-header :left-options="{backText: ''}" slot="header" class="custom-header header">托管详情<div></div></x-header>
      <div class="detailsinfo">
        <div class="dateid h-lh-align">
          <div>托管单 <span class="ml-5">14984632727325</span></div>
          <div class="right">托管时间<span class="ml-5">2018-03-18 21:48:52</span></div>
        </div>
        <div class="nameinfo">
          <div class="center">
            <div class="machineinfo">
              <div class="machinename">雪豹A1 49T</div>
              <div class="machineeffect">可挖币种：<span class="c000"></span>BTC、BCH、SBTC、UBTC等</div>
            </div>
            <div class="machineinfo">
              <div class="machinename"><span class="number">50</span><span class="company">台</span></div>
              <div class="machineeffect">付费方式：<span class="c000"></span>优先以币抵费<span class="updatebtn">修改</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="incomesituation">
        <div class="situationheader">
          <div class="lefttext">{{minnertype}}收益状况</div>
          <div class="righttext">0.8210092111 <span>{{minnertype}}</span></div>
        </div>
        <div class="situationcontent">
          <div class="yesterday">
            <div class="yesterdayheader">
              <div class="icon"></div><span>昨日</span>
            </div>
            <div class="contentdetail">
              <div class="detailcell">
                <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
                <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
              </div>
              <div class="detailcell">
                <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
                <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
              </div>
              <div class="detailcell">
                <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
                <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
              </div>
            </div>
          </div>
          <div class="yesterday">
            <div class="yesterdayheader">
              <div class="icon"></div><span>总量</span>
            </div>
            <div class="contentdetail">
              <div class="detailcell">
                <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
                <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
              </div>
              <div class="detailcell">
                <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
                <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">{{minnertype}}</span></span></div>
              </div>
              <div class="detailcell">
                <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
                <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="minnerlist" >
        <div class="minnerlistheader">
          <div class="lefttext">矿机列表</div>
          <div class="incomecountcue" @click="showmodal" v-if="minnerstatus==2"></div>
          <div class="minnerstatus" v-if="minnerstatus==2">合约结束 50</div>
          <div class="righttext"  v-if="minnerstatus!=2">
            <div class="statuscell mr20">
              <span class="round greenround"></span>
              <span class="statusname">运行中</span>
              <span>20</span>
            </div>
            <div class="statuscell">
              <span class="round redround"></span>
              <span class="statusname">维护中</span>
              <span>0</span>
            </div>
          </div>
        </div>

          <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false"  class="minnertable">
            <thead>
            <tr class="bgf4">
              <th>时间</th>
              <th>收支类型</th>
              <th>金额(元)</th>
              <th>名称/备注</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>11天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>11天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>11天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>1天12时5分36秒</td>
            </tr>
            <tr>
              <td>A11524214</td>
              <td>
                <div class="statuscell mr20">
                  <span class="round greenround"></span>
                  <span class="statusname">运行中</span>
                </div>
              </td>
              <td>2.0000298111</td>
              <td>11天12时5分36秒</td>
            </tr>
            </tbody>
          </x-table>
        <load-more :show-loading="false" :tip="'下拉展示更多'" background-color="#fbf9fe" id=""></load-more>


        <!--弹窗-->

      </div>
    </view-box>
  </div>
</template>

<script>
  import DepositAPI from '../../services/deposit-api';
  import {Alert, Flexbox, FlexboxItem, Divider, XTable, LoadMore} from 'vux';
  export default {
    data() {
      return {
        tId: 0,
        minnertype: 'BTC',
        minnerstatus: 2,
        conditionchecked: 0,
        conditionbchecked: 0
      };
    },
    components: {
      Alert,
      Flexbox,
      FlexboxItem,
      Divider,
      XTable,
      LoadMore
    },
    mounted() {},
    methods: {
      initPage() {
        DepositAPI.detail(this.tId)
          .then(res => {
            this.depositInfo = res;
            this.symbol = res.coinType;
            if (res.today) {
              this.yesterday = res.today;
            }
            if (res.total) {
              this.total = res.total;
            }
          }).catch();
        this.loadMachineList();
      },
      loadMachineList() {
        const page = this.pageInfo.page;
        const size = this.pageInfo.size;
        DepositAPI.machineList(this.tId, page, size)
          .then(res => {
            this.machineInfo = res;
            if (res) {
              this.pageInfo.total = res.count;
              this.minerInfo = res.data || [];
            }
          }).catch();
      },
      showmodal() {
      // <div class="modal">
      //     <div class="titleimg">
      //
      //     </div>
      //     </div>
        var html = '<div class="modal"><div class="titleimg"></div></div>';// 弹窗HTML代码
        this.$vux.confirm.show({
          title: '',
          content: html
        });
        // // 显示
        // this.$vux.alert.show({
        //   title: '',
        //   content: '当该单挖矿总收益或者连续10天收益，不足以抵扣管理费用与耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束',
        //   buttonText: '我知道了',
        //   onShow () {
        //     console.log('Plugin: I\'m showing');
        //   },
        //   onHide () {
        //     console.log('Plugin: I\'m hiding');
        //   }
        // });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .trusteeshipdetails{
    .lefttext{
      font-size: 15px;
    }
    .statuscell{
      color: #606166 ;
      display: inline-block;
      font-size: 13px;
      .round{
        display: inline-block;
        height: 6px;
        width: 6px;
        border-radius: 5px;
        margin-right: 5px;
      }
      .greenround{
        background: #2BB56F;
      }
      .redround{
        background: #F95453;
      }
      .statusname{
        margin-right:5px;
      }
      span{
        vertical-align: middle;
      }
    }
    .header{
      position: relative;
      div{
        height: 18px;
        width: 20px;
      }
    }
    background: #F4F4F4;
    .detailsinfo{
      padding-left:3.7%;
      padding-right: 3.7%;
      background: #ffffff;
      margin-top: 1.5%;
      .h-lh-align{
        line-height: 40px;
      }
      .ml-5{
        margin-left: 5px;
      }
      .dateid{
        height: 40px;
        line-height: 40px;
        div{
          display: inline-block;
        }
      }
      .nameinfo{
        position: relative;
        padding-left:3.7%;
        padding-right: 3.7%;
        width: 100%;
        height: 75px;
        .center{
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          .machineinfo{
            div{
              display: inline-block;
            }
            .machinename{
              font-weight: 600;
              width: 80px;
              text-align: center;
              font-size: 15px;
              color: #303137;
              margin-right:14px;
              .number{
                color: #FDAA24;
                font-size: 20px;
              }
              .company{
                margin-left: 3px;
                color: #969699;
                font-size: 12px;
              }
            }
            .machineeffect{
              font-size: 13px;
              color: #606166;
              .updatebtn{
                margin-left: 5px;
                color: #4D87EA;
              }
              .c000{
                color: #000019;
              }
            }
          }
        }
      }
    }
    .incomesituation{
      margin-top: 1.5%;
      background: #ffffff;
      color: #303137;
      .situationheader{
        padding-left: 3.7%;
        padding-right: 3.7%;
        border-bottom:1px solid #eaeaea;
        div{
          display: inline-block;
          vertical-align: middle;
          line-height: 40px;
        }

        .righttext{
          float: right;
          font-size: 14px;
          span{
            color: #969699;
            font-size: 12px;
            margin-left: 3px;
          }
        }
      }
      .situationcontent{
        padding-left: 3.7%;
        padding-right: 3.7%;
        .yesterday{
          height: 110px;
          border-bottom: 1px solid #f4f4f4;
          .yesterdayheader{
            line-height: 30px;
            height: 30px;
            .icon{
              display: inline-block;
              height: 11px;
              background: #FD7220;
              width: 2px;
              margin-right: 10px;
            }
            span{
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
      .contentdetail{
        margin-left: 3.7%;
        .detailcell{
          .w2t{
            width: 20%;
            display: inline-block;
          }
          .w8t{
            width: 80%;
            display: inline-block;
            text-align: right;
          }
          height: 25px;
          color: #606166;
          font-size: 13px;
          div{
            display: inline-block;
          }
          line-height: 25px;
          .detailleft{
            width: 40%;
          }
          .detailright{
            margin-left:20px;
            width: 40%;
          }
          .ml-20{
            margin-left: 20px;
          }
          .c96{
            color: #969699;
            font-size: 11px;
            margin-left: 2px !important;
          }
          .txt-r{
            text-align: right;
            width: 40%;
            line-height: 20px!important;
            height: 20px!important;
          }
        }
      }
    }
    .minnerlist{
      color: #303137;
      background: #ffffff;
      margin-top: 1.5%;
      .minnerlistheader{
        padding-left: 3.7%;
        padding-right: 3.7%;
        div{
          display: inline-block;
          vertical-align: middle;
          line-height: 40px;
        }
        .righttext{
          float: right;
          .mr20{
            margin-right: 20px;
          }
        }
        .incomecountcue{
          background: url("../../assets/images/icon_tishi_normal@2x.png") no-repeat;
          background-size: 16px 16px;
          background-position: center;
          display: inline-block;
          margin-left: 1.5%;
          margin-left: 5px;
          height: 40px;
          width:16px;
          vertical-align: middle;
        }
        .minnerstatus{
          color: #7F7F7F;
          font-size: 12px;

        }
      }

        .minnertable{
          thead>tr{
            height: 35px;
            line-height: 35px;
            th{
              border-spacing:10px;
              font-size: 13px;
              width: 25%;
            }
            th:nth-of-type(2){
              width: 20% !important;
            }
            th:last-child{
              width: 30% !important;
            }
          }
          tbody>tr{
            height: 35px;
            line-height: 35px;
            td{
              border-spacing:10px;
              font-size: 12px;
              width: 25%;
              text-align: center;
            }
            td:nth-of-type(2){
              width: 20% !important;
            }
            td:last-child{
              width: 30% !important;
            }
          }
          .bgf4{
            background: #F4F4F4 ;
          }
        }
    }
  }
  .modal{
    background: #ffffff;
    .titleimg{
      background: url("../../assets/images/xiugaifangshi_bg@2x.png") no-repeat;
      background-size: 310px 190px;
      background-position: center;
      display: inline-block;
      height: 190px;
      width:310px;
      vertical-align: middle;

    }
  }
</style>
