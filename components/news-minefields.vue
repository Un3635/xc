<template>
  <div class="newsminefields">
    <div v-if="!$store.state.userinfo" class="pool" @click="tominefield">
      <div class="pool_top">
        <div class="pool_top_left">今日挖力池</div>
        <div class="pool_top_right">
          <a>挖力场</a>
          <div class="go"></div>
        </div>
      </div>
      <div class="h1">{{toThousands(data.wlPool)}}</div>
      <div class="pool_bottom">
        <div class="pool_bottom_left">预计今日挖力<span>{{data.maxWl}}</span></div>
        <div class="pool_bottom_right">预计今日WT<span>{{data.predictWt}}</span></div>
      </div>
    </div>
    <div v-if="$store.state.userinfo" class="pool" @click="tominefield">
      <div class="pool_top">
        <div class="pool_top_left">今日已得挖力</div>
        <div class="pool_top_right">
          <a>挖力场</a>
          <div class="go"></div>
        </div>
      </div>
      <div class="h1">{{data.todayWl}}</div>
      <div class="pool_bottom">
        <div class="pool_bottom_left">今日WT估算<span>{{data.predictWt}}</span></div>
        <div class="pool_bottom_right">全部WT<span>{{data.wt}}</span></div>
      </div>
    </div>
    <a class="score" href="http://www.bitong.top/market" target="_blank">
      <div class="score_left" v-if="kdata">
        <canvas id="percentCircle" class="percent_circle"></canvas>
        <p>{{kdata.marketScore}}</p>
        <p>诊断得分</p>
        <p>{{kdata.result}}</p>
      </div>
      <div class="score_right" v-if="kdata">
        <h3>大盘强度解读</h3>
        <p>{{kdata.statistics}}</p>
        <p>{{kdata.makeMoneyEffect}}</p>
        <p>{{kdata.weightPerformance}}</p>
        <p>{{kdata.energyChange}}</p>
      </div>
    </a>
  </div>
</template>
<style lang="scss">
  .newsminefields {
    .pool {
      height: 143px;
      background-image: url(../assets/images/142/beijing@2x.png);
      background-size: cover;
      color: #fff;
      border-radius: 4px;
      padding: 16px 14px 19px 21px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 2px 10px #bfbfbf;
      }
      a {
        color: #fff;
      }
      &_top {
        overflow: hidden;
        font-size: 14px;
        &_left {
          float: left;
          opacity: 0.6;
        }
        &_right {
          float: right;
          font-size: 12px;
          a {
            color: #fff;
          }
          .go {
            display: inline-block;
            width: 9px;
            height: 9px;
            border-left: 1px solid #ffffff;
            border-top: 1px solid #ffffff;
            transform: rotate(135deg);
            margin: 0 6px;
          }
        }
      }
      .h1 {
        height: 66px;
        font-size: 36px;
        line-height: 1;
        padding-top: 10px;
        padding-bottom: 20px;
      }
      &_bottom {
        overflow: hidden;
        opacity: 0.7;
        font-size: 12px;
        line-height: 17px;
        margin-top: 12px;
        &_left {
          float: left;
          span {
            margin-left: 13px;
          }
        }
        &_right {
          float: right;
          span {
            margin-left: 13px;
          }
        }
      }
    }
    .score {
      display: block;
      margin-top: 9px;
      margin-bottom: 42px;
      height: 143px;
      width: 372px;
      border: 1px solid #eeeeee;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 2px 10px #bfbfbf;
      }
      &_left {
        float: left;
        width: 148px;
        height: 128px;
        margin: 8px 18px;
        background-image: url(../assets/images/142/Group_10@2x.png);
        background-size: contain;
        text-align: center;
        position: relative;
        &.img {
          background-image: url(../assets/images/142/shuju@3x.png);
        }
        .percent_circle {
          position: absolute;
          left: 7px;
          top: 9px;
        }
        p:nth-child(2) {
          font-size: 32px;
          line-height: 45px;
          color: #1092ff;
          padding-top: 26px;
          height: 71px;
        }
        p:nth-child(3) {
          font-size: 12px;
          color: #000000;
          line-height: 16px;
          font-weight: 700;
          padding-bottom: 6px;
        }
        p:nth-child(4) {
          font-size: 12px;
          color: #999999;
          line-height: 12px;
          transform: scale(0.8);
        }
      }
      &_right {
        float: left;
        margin-left: 14px;
        h3 {
          padding-top: 12px;
          font-size: 14px;
          color: #000000;
          padding-bottom: 19px;
          line-height: 16px;
          margin-left: -14px;
        }
        p {
          font-size: 12px;
          color: #666666;
          padding-bottom: 8px;
          position: relative;
          height: 20px;
          &:after {
            content: "";
            position: absolute;
            left: -13px;
            top: 5px;
            width: 4px;
            height: 4px;
            border-radius: 8px;
          }
          &:nth-child(2)::after {
            background: #8845e4;
          }
          &:nth-child(3)::after {
            background: #2db1e1;
          }
          &:nth-child(4)::after {
            background: #9cdd5f;
          }
          &:nth-child(5)::after {
            background: #e97157;
          }
        }
      }
    }
  }
</style>
<script>
  import loginmodalevent from "../service/loginmodalevent.js";
  import PercentCircle from "../other/percent-circle.js";
  import {
    grailStrength
  } from "../service/kdata.js";
  export default {
    data() {
      return {
        kdata: ""
      };
    },
    props: ["data"],
    methods: {
      gologin() {
        loginmodalevent.$emit("login");
      },
      tominefield() {
        this.$router.push({
          path: "/minefield"
        });
      },
      toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      }
    },
    mounted() {
      grailStrength().then(res => {
        this.kdata = JSON.parse(res.data.data.result);
        this.$nextTick(() => {
          let progress = new PercentCircle("percentCircle", {
            targetPersent: this.kdata.marketScore / this.kdata.max
          });
          progress.execAnimation();
        });
      });
    }
  };
</script>