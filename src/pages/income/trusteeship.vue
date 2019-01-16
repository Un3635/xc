<template>
  <div class="trusteeship">
    <view-box body-padding-top="0px" body-padding-bottom="0" >
      <x-header :left-options="{backText: ''}" slot="header" class="custom-header header">我的托管<div></div></x-header>
      <div class="incomecontent">
        <div class="countcny">
          <div class="incomecounttext h-lh-align" >托管总收益</div>
          <div class="incomecountcue"></div>
          <div class="incomecountmoney h-lh-align">1324.32 <span>CNY</span></div>
        </div>
        <div class="vcincome">
          <div class="vcincometext h-lh-align">BTC 产出</div>
          <div class="vcincomemoney h-lh-align">0.0000000001 <span>BTC</span></div>
        </div>
        <div class="vcincome bod0" id="trusteeshiplist">
          <div class="vcincometext h-lh-align">ETH 产出</div>
          <div class="vcincomemoney h-lh-align">0.0000000001 <span>ETH</span></div>
        </div>
      </div>
      <div class="screen" id="screen" :class="searchBarFixed == true ? 'isFixed' :''">
        <div class="condition">
          <div :class="{'checked':conditionchecked==0}" @click="conditionchecked=0">我的矿机<span :class="{'border-btm':conditionchecked==0}"></span></div>
          <div :class="{'checked':conditionchecked==1}" @click="conditionchecked=1">待交割<span :class="{'border-btm':conditionchecked==1}"></span></div>
          <div :class="{'checked':conditionchecked==2}" @click="conditionchecked=2">合约结束<span class="icon" @click="modalshow"></span><span :class="{'border-btm':conditionchecked==2}"></span></div>
        </div>
        <div class="condition f13 bod0">
          <div :class="{'checked':conditionbchecked==0}" @click="conditionbchecked=0">全部矿机</div>
          <div :class="{'checked':conditionbchecked==1}" @click="conditionbchecked=1">BTC矿机</div>
          <div :class="{'checked':conditionbchecked==2}" @click="conditionbchecked=2">ETC矿机</div>
        </div>
      </div>
      <div class="trusteeshiplist" >
        <div class="listheader">
          <div class="name">托管单 171221123451000010</div>
          <div class="date">托管时间 2018/03/18 21:48:52</div>
        </div>
        <div class="listcontent">
          <div class="contentname">
            <div class="minerimg"></div>
            <div class="minername">雪豹A1 49T</div>
            <div class="minernumber">20<span>台</span></div>
          </div>
          <div class="contentstatus" v-if="conditionchecked==0">
            <div class="statuscell">
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
          <div class="contentstatus" v-if="conditionchecked==1">
            <div class="statuscell">
              <span class="round greenround"></span>
              <span class="statusname">已交割</span>
              <span>20</span>
            </div>
            <div class="statuscell">
              <span class="round redround"></span>
              <span class="statusname">待交割</span>
              <span>0</span>
            </div>
          </div>
          <div class="jiaoge" v-if="conditionchecked==1">
            预计发货<span>2018年3月27日~2018年4月25日</span>
          </div>
          <div class="contentdetail" v-if="conditionchecked!=1">
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
              <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="trusteeshiplist">
        <div class="listheader">
          <div class="name">托管单 171221123451000010</div>
          <div class="date">托管时间 2018/03/18 21:48:52</div>
        </div>
        <div class="listcontent">
          <div class="contentname">
            <div class="minerimgeth"></div>
            <div class="minername">雪豹E3 230M</div>
            <div class="minernumber">20<span>台</span></div>
          </div>
          <div class="contentstatus" v-if="conditionchecked==0">
            <div class="statuscell">
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
          <div class="contentstatus" v-if="conditionchecked==1">
            <div class="statuscell">
              <span class="round greenround"></span>
              <span class="statusname">已交割</span>
              <span>20</span>
            </div>
            <div class="statuscell">
              <span class="round redround"></span>
              <span class="statusname">待交割</span>
              <span>0</span>
            </div>
          </div>
          <div class="jiaoge" v-if="conditionchecked==1">
            预计发货<span>2018年3月27日~2018年4月25日</span>
          </div>
          <div class="contentdetail" v-if="conditionchecked!=1">
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
              <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="trusteeshiplist">
        <div class="listheader">
          <div class="name">托管单 171221123451000010</div>
          <div class="date">托管时间 2018/03/18 21:48:52</div>
        </div>
        <div class="listcontent">
          <div class="contentname">
            <div class="minerimgeth"></div>
            <div class="minername">雪豹E3 230M</div>
            <div class="minernumber">20<span>台</span></div>
          </div>
          <div class="contentstatus" v-if="conditionchecked==0">
            <div class="statuscell">
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
          <div class="contentstatus" v-if="conditionchecked==1">
            <div class="statuscell">
              <span class="round greenround"></span>
              <span class="statusname">已交割</span>
              <span>20</span>
            </div>
            <div class="statuscell">
              <span class="round redround"></span>
              <span class="statusname">待交割</span>
              <span>0</span>
            </div>
          </div>
          <div class="jiaoge" v-if="conditionchecked==1">
            预计发货<span>2018年3月27日~2018年4月25日</span>
          </div>
          <div class="contentdetail" v-if="conditionchecked!=1">
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
              <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="trusteeshiplist" style="margin-bottom: 100px;">
        <div class="listheader">
          <div class="name">托管单 171221123451000010</div>
          <div class="date">托管时间 2018/03/18 21:48:52</div>
        </div>
        <div class="listcontent">
          <div class="contentname">
            <div class="minerimgeth"></div>
            <div class="minername">雪豹E3 230M</div>
            <div class="minernumber">20<span>台</span></div>
          </div>
          <div class="contentstatus" v-if="conditionchecked==0">
            <div class="statuscell">
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
          <div class="contentstatus" v-if="conditionchecked==1">
            <div class="statuscell">
              <span class="round greenround"></span>
              <span class="statusname">已交割</span>
              <span>20</span>
            </div>
            <div class="statuscell">
              <span class="round redround"></span>
              <span class="statusname">待交割</span>
              <span>0</span>
            </div>
          </div>
          <div class="jiaoge" v-if="conditionchecked==1">
            预计发货<span>2018年3月27日~2018年4月25日</span>
          </div>
          <div class="contentdetail" v-if="conditionchecked!=1">
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">产出</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">实际</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="detailleft"><span class="w2t">管理</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
              <div class="detailright"><span class="w2t">耗电</span><span class="w8t">12.0000298111<span class="c96">BTC</span></span></div>
            </div>
            <div class="detailcell">
              <div class="txt-r">1324.32 <span class="c96">CNY</span></div>
              <div class="txt-r ml-20">1324.32<span class="c96">CNY</span></div>
            </div>
          </div>
        </div>
      </div>
    </view-box>
  </div>

</template>

<script>
  import { Alert } from 'vux';
  export default {
    data() {
      return {
        conditionchecked: 0,
        conditionbchecked: 0,
        searchBarFixed: false
      };
    },
    components: {
      Alert
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true);
    },
    methods: {
      modalshow() {
        // 显示
        this.$vux.alert.show({
          title: '',
          content: '当该单挖矿总收益或者连续10天收益，不足以抵扣管理费用与耗电费用时，或不可抗力包括不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因，合约结束',
          buttonText: '我知道了',
          onShow () {
            console.log('Plugin: I\'m showing');
          },
          onHide () {
            console.log('Plugin: I\'m hiding');
          }
        });
      },
      handleScroll() {
        var top = document.querySelector('#screen').getBoundingClientRect().top;
        if (this.searchBarFixed) {
          top = document.querySelector('#trusteeshiplist').getBoundingClientRect().top;
        }
        if (top <= 0) {
          this.searchBarFixed = true;
        } else {
          this.searchBarFixed = false;
        }
        // // 显示
        // this.$vux.alert.show({
        //   title: '',
        //   content: scrollTop,
        //   buttonText: offsetTop,
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
  .trusteeship{
    .isFixed{
      position:fixed;
      top:0;
      z-index:999;
      width: 100% !important;;
      margin-top: 0 !important;
    }
    background: #F4F4F4;
    .header{
      position: relative;
      div{
        background: url("../../assets/images/icon_shouye_pressed@2x.png") no-repeat;
        background-size: 100% auto;
        display: inline-block;
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        height: 18px;
        width: 20px;
      }
    }
    .h-lh-align{
      line-height: 40px;
    }
    .bod0{
      border: 0 !important;
    }
    .incomecontent{
      margin-top:1.5%;
      font-size: 15px;
      background: #ffffff;
      .countcny{
        border-bottom: 1px solid #eaeaea;
        .incomecounttext{
          color: #303137;
          display: inline-block;
          margin-left: 3.7%;
          vertical-align: middle;
        }
        .incomecountcue{
          background: url("../../assets/images/icon_tishi_normal@2x.png") no-repeat;
          background-size: 16px 16px;
          background-position: center;
          display: inline-block;
          margin-left: 1.5%;
          height: 40px;
          width:16px;
          vertical-align: middle;
        }
        .incomecountmoney{
          float: right;
          font-size: 14px;
          color: #FD7220;
          text-align: right;
          width: 40%;
          display: inline-block;
          margin-right: 3.7%;
          vertical-align: middle;
          span{
            font-size: 12px;
          }

        }
      }
      .vcincome{
        margin-left: 12.8%;
        border-bottom: 1px solid #eaeaea;
        .vcincometext{
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
          color: #606166;
        }
        .vcincomemoney{
          display: inline-block;
          vertical-align: middle;
          float: right;
          font-size: 14px;
          color: #303137;
          margin-right: 1.8%;
          span{
            color: #969699;
            font-size: 12px;
          }
        }
      }
    }
    .screen{
      background: #ffffff;
      margin-top: 1.5%;
      .condition{
        border-bottom: 1px solid #EAEAEA;
        line-height: 40px;
        margin: 0 5%;
        div{
          width: 32%;
          text-align: center;
          position: relative;
          display: inline-block;
          color: #969699;
          font-size: 14px;
          .icon{
            display: inline-block;
            background:  url("../../assets/images/icon_tishi_normal@2x.png") no-repeat;
            background-size: 16px 16px;
            background-position: center;
            position: absolute;
            left: 80%;
            height: 40px;
            width:16px;
            vertical-align: middle;
          }
        }
        .border-btm{
          position: absolute;
          display: inline-block;
          bottom: -1px;
          left: 35%;
          width: 30%;
          height: 2px;
          background: #303137;

        }
      }
      .f13{
        font-size: 13px !important;
        div{
          font-weight: normal!important;
        }

      }
      .checked {
        color: #303137 !important;
        font-weight: 600;
      }
    }
    .trusteeshiplist{
      margin-top: 1.5%;
      background: #ffffff;
      .listheader{
        line-height: 40px;
        border-bottom: 1px solid #EAEAEA;
        div{
          display: inline-block;
          color: #303137;
          vertical-align: middle;
          text-align: center;
        }
        .name{
          margin-left: 3.7%;
          font-size: 12px;
        }
        .date{
          margin-right: 3.7%;
          font-size: 11px;
          float: right;
        }
      }
      .jiaoge{
        margin-left: 3.7%;
        color: #606166;
        font-size: 13px;
        span{
          margin-left: 10px;
        }
      }
      .listcontent{
        line-height: 40px;
        .contentname{
          margin-left: 3.7%;
          margin-top: 10px;
          div{
            display: inline-block;
          }
          .minerimg{
            background: url("../../assets/images/BTCkuangji_normal@2x.png") no-repeat;
            background-size: 92px 29px;
            background-position: center;
            height: 40px;
            width:92px;
            vertical-align: middle;
            margin-right: 2.7%;
          }
          .minerimgeth{
            background: url("../../assets/images/ETHkuangji_normal@2x.png") no-repeat;
            background-size: 92px 29px;
            background-position: center;
            height: 40px;
            width:92px;
            vertical-align: middle;
            margin-right: 2.7%;
          }
          .minername{
            color: #303137;
            line-height: 40px;
            font-size: 15px;
            font-weight: 600;
          }
          .minernumber{
            color: #FDAA24;
            font-size: 18px;
            float: right;
            margin-right: 3.7%;
            span{
              font-size: 12px;
              color: #7f7f7f;
              margin-left: 5px;
            }
          }
        }
        .contentstatus{
          margin-left: 3.7%;
          .statuscell{
            color: #606166 ;
            display: inline-block;
            font-size: 13px;
            margin-right: 10.7%;
            .round{
              display: inline-block;
              height: 6px;
              width: 6px;
              border-radius: 5px;
              margin-right: 10px;
            }
            .greenround{
              background: #2BB56F;
            }
            .redround{
              background: #F95453;
            }
            .statusname{
              margin-right:10px;
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
    }

  }
</style>
