<template>
  <div class="page-calculator" v-if="somedata">
    <ristShow></ristShow>
    <div class="page-calculator-inner">
      <div class="page-calculator-title">
        <span class="page-calculator-title-coin">{{coin}}计算器</span>
        <el-dropdown @command="changecoin" placement="bottom-end">
          <span class="page-calculator-title-change">切换币种 <img src="../../assets/images/cal2.png" alt=""></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(i,idx) in somedata.coinList" :key="idx" :command="i">{{i}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="page-calculator-cal clearfix">
        <div class="page-calculator-cal-left">
          <div class="page-calculator-cal-left-title clearfix">
            <div class="page-calculator-cal-left-title-input">
              <img src="../../assets/images/cal3.png" alt="">
              <span>输入</span>
            </div>
            <div class="page-calculator-cal-left-title-unit">
              <span class="unitkey">单位</span>
              <el-dropdown @command="changemoneytype" placement="bottom-end">
                <span class="unitvalue">{{moneytype}}
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="CNY-￥">CNY-￥</el-dropdown-item>
                  <el-dropdown-item command="USD-$">USD-$</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="page-calculator-cal-left-body">
            <div class="page-calculator-cal-left-body-list">
              <div class="page-calculator-cal-left-body-item">
                <span>有效算力</span>
                <div>
                  <input v-model="calculateValue" type="text" placeholder="输入算力(必填)" maxlength="10">
                  <el-dropdown @command="changecalculateUnit" placement="bottom-end">
                    <span>{{calculateUnit}}
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="i" v-for="(i,idx) in somedata.unitList" :key="idx">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>矿机功耗</span>
                <div>
                  <input v-model="machinePower" type="text" placeholder="输入矿机功率" maxlength="10">
                  <span>W</span>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>电力成本</span>
                <div>
                  <input v-model="electricCost" type="text" placeholder="输入电价" maxlength="10">
                  <span>{{moneytype[4]}}/KWh</span>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>手续费</span>
                <div>
                  <input v-model="serviceCharge" type="text" placeholder="输入手续费百分比" maxlength="10">
                  <span>%</span>
                </div>
              </div>
            </div>
            <div class="page-calculator-cal-left-body-list">
              <div class="page-calculator-cal-left-body-item">
                <span>全网算力</span>
                <div>
                  <input type="text" v-model="somedata.referenceData.calculationForce.avgForce" readonly>
                  <span>{{somedata.referenceData.calculationForce.unit}}</span>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>区块奖励</span>
                <div>
                  <input type="text" v-model="somedata.referenceData.blockReward" readonly>
                  <span>{{coin}}</span>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>当前难度</span>
                <div>
                  <input type="text" v-model="somedata.referenceData.difficulty.currentDifficulty" readonly>
                  <span>{{somedata.referenceData.difficulty.unit}}</span>
                </div>
              </div>
              <div class="page-calculator-cal-left-body-item">
                <span>当前币价</span>
                <div>
                  <input type="text" v-model="somedata.referenceData.nowPrice.cnyPrice" readonly v-if="moneytype=='CNY-￥'">
                  <input type="text" v-model="somedata.referenceData.nowPrice.usdPrice" readonly v-if="moneytype=='USD-$'">
                  <span v-if="moneytype=='CNY-￥'">¥/{{coin}}</span>
                  <span v-if="moneytype=='USD-$'">$/{{coin}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="page-calculator-cal-left-footer">
            <button class="rstbtn" @click="rst">重置</button>
            <button class="calbtn" @click="cal" :disabled="!calculateValue">计算</button>
          </div>
        </div>
        <div class="page-calculator-cal-right">
          <div class="page-calculator-cal-right-title clearfix">
            <div class="page-calculator-cal-right-title-input clearfix">
              <img src="../../assets/images/cal1.png" alt="">
              <span>预计收益</span>
            </div>
          </div>
          <div class="page-calculator-cal-right-body">
            <div class="page-calculator-cal-right-body-tb">
              <div class="page-calculator-cal-right-body-tb-hd clearfix">
                <div class="page-calculator-cal-right-body-tb-hd-item">周期</div>
                <div class="page-calculator-cal-right-body-tb-hd-item">收益</div>
                <div class="page-calculator-cal-right-body-tb-hd-item">手续费</div>
                <div class="page-calculator-cal-right-body-tb-hd-item">电费</div>
                <div class="page-calculator-cal-right-body-tb-hd-item">净收益</div>
              </div>
              <template v-if="tbdata.length>0">
                <div class="page-calculator-cal-right-body-tb-bd clearfix" v-for="(i,idx) in tbdata" :key="idx">
                  <div class="page-calculator-cal-right-body-tb-bd-item">{{i.period}}<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">{{i.output.currency}}{{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ {{i.output.cny}}
                    </template>
                    <template v-else>
                      ${{i.output.usd}}
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">{{i.serviceCharge.currency}}{{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ {{i.serviceCharge.cny}}
                    </template>
                    <template v-else>
                      ${{i.serviceCharge.usd}}
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">{{i.electricCharge.currency}}{{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ {{i.electricCharge.cny}}
                    </template>
                    <template v-else>
                      ${{i.electricCharge.usd}}
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">{{i.netOutput.currency}}{{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥{{i.netOutput.cny}}
                    </template>
                    <template v-else>
                      ${{i.netOutput.usd}}
                    </template>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="page-calculator-cal-right-body-tb-bd clearfix">
                  <div class="page-calculator-cal-right-body-tb-bd-item">1小时<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                </div>
                <div class="page-calculator-cal-right-body-tb-bd clearfix">
                  <div class="page-calculator-cal-right-body-tb-bd-item">1天<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                </div>
                <div class="page-calculator-cal-right-body-tb-bd clearfix">
                  <div class="page-calculator-cal-right-body-tb-bd-item">7天<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                </div>
                <div class="page-calculator-cal-right-body-tb-bd clearfix">
                  <div class="page-calculator-cal-right-body-tb-bd-item">15天<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                </div>
                <div class="page-calculator-cal-right-body-tb-bd clearfix">
                  <div class="page-calculator-cal-right-body-tb-bd-item">30天<br></div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                  <div class="page-calculator-cal-right-body-tb-bd-item">0.00000000 {{coin}}<br>
                    <template v-if="moneytype=='CNY-￥'">
                      ￥ 0.00
                    </template>
                    <template v-else>
                      $ 0.00
                    </template>
                  </div>
                </div>
              </template>

            </div>
            <div class="page-calculator-cal-right-body-node">
              注：此计算结果仅适用于 PPS 模式下的挖矿。另外挖矿会受矿机实际工作状态、当地电费等因素影响，造成与实际值有误差，计算结果仅供参考。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import {
    calculator_getDefaultData,
    calculator_getEarningsByCoinName
  } from "../../service/main-api.js";
  import ristShow from "~/components/ristshow";
  export default {
    data() {
      return {
        coin: "BTC",
        calculateUnit: "",
        moneytype: "CNY-￥",
        somedata: null,
        calculateValue: "",
        machinePower: "",
        electricCost: "",
        serviceCharge: "",
        timeBucket: 1,
        tbdata: []
      };
    },
    components: { ristShow },
    created() {
      calculator_getDefaultData("BTC").then(somedata => {
        // somedata.referenceData.blockReward = parseInt(
        //   somedata.referenceData.blockReward
        // );
        this.somedata = somedata;
        this.calculateUnit = somedata.defaultUnit;
      });
    },
    methods: {
      rst() {
        this.tbdata = [];
        this.serviceCharge = "";
        this.electricCost = "";
        this.machinePower = "";
        this.calculateValue = "";
        this.calculateUnit = this.somedata.defaultUnit;
        this.moneytype = "CNY-￥";
      },
      cal() {
        if (
          isNaN(this.calculateValue) ||
          isNaN(this.machinePower) ||
          isNaN(this.electricCost) ||
          isNaN(this.serviceCharge)
        ) {
          this.calculateValue = "";
          this.machinePower = "";
          this.electricCost = "";
          this.serviceCharge = "";
          return;
        }
        calculator_getEarningsByCoinName({
          coinName: this.coin,
          calculateUnit: this.calculateUnit,
          calculateValue: this.calculateValue,
          machinePower: this.machinePower,
          electricCost: this.electricCost,
          serviceCharge: this.serviceCharge,
          currency: this.moneytype.substr(0, 3)
        })
          .then(res => {
            this.tbdata = res;
          })
          .catch(err => {
            this.tbdata = [];
          });
      },
      changecoin(coin) {
        this.coin = coin;
        calculator_getDefaultData(coin).then(somedata => {
          // somedata.referenceData.blockReward = parseInt(
          //   somedata.referenceData.blockReward
          // );
          this.somedata = somedata;
          this.calculateUnit = somedata.defaultUnit;
          if (this.tbdata.length > 0 && this.calculateValue) {
            this.cal();
          } else {
            this.tbdata = [];
          }
        });
      },
      changecalculateUnit(calculateUnit) {
        this.calculateUnit = calculateUnit;
      },
      changemoneytype(moneytype) {
        this.moneytype = moneytype;
      }
    },
    head() {
      return {
        title: "挖矿计算器_挖矿收益计算器-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链网挖矿收益计算器，为您精确计算当前难度下比特币、以太坊、莱特币、比特现金实时挖矿收益，方便您查看各币种每日、每周、每月的收益数据和回本时间，让您实时掌握挖矿收益情况。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "挖矿计算器,挖矿收益计算,比特币挖矿计算器,BTC挖矿收益计算,以太坊挖矿计算器,ETH挖矿收益计算,莱特币挖矿计算器,LTC挖矿收益,比特现金挖矿计算器,BCH挖矿收益计算"
          }
        ]
      };
    }
  };
</script>
