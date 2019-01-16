<template>
  <div class="order">
    <h2 class="header">我的订单</h2>
    <div class="order-popover">
      <i></i>
      可托管
    </div>
    <ul class="tabs">
      <li :class="{active:selected===tabItem}" v-for="tabItem in tabList"
          @click="selected=tabItem" :key="tabItem.label">
        {{tabItem.label}}
      </li>
    </ul>
    <div class="content">
      <table class="order-table">
        <thead>
        <tr>
          <th>商品详情</th>
          <th>发货时间</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>订单状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody v-if="orderList&&orderList.length>0">
        <tr v-for="order in orderList" :key="order.orderNo">
          <td colspan="7">
            <div class="order-summary-info">
              <dl class="order-summary__list">
                <div class="order-summary__item no">
                  <dt>订单号</dt>
                  <dd>{{order.orderNo}}</dd>
                </div>
                <div class="order-summary__item">
                  <dt>下单时间</dt>
                  <dd>{{order.createTime | date('YYYY-MM-DD HH:mm:ss')}}</dd>
                </div>
                <div class="order-summary__item">
                  <dt>订单金额</dt>
                  <dd>{{order.amount | currency}}元</dd>
                </div>
                <div class="order-summary__item" v-if="order.discountAmount">
                  <dt>已优惠金额:</dt>
                  <dd>{{order.discountAmount|currency}}元</dd>
                </div>
              </dl>
              <a class="right link" target="_blank" :href="order._presellUrl"
                 v-if="selected.status === 1 || selected.status === 3">
                下载预售合同
              </a>
            </div>
            <div class="order-goods-info" v-if="order.orderInfoDetails&&order.orderInfoDetails.length>0">
              <table class="goods-table">
                <tr v-for="(goodsItem,$i) in order.orderInfoDetails" :key="goodsItem.batchGoodsId">
                  <td>
                    <div class="goods-detail">
                      <img :src="goodsItem.imageUrl" :alt="goodsItem.goodsName">
                      <p :title="goodsItem.goodsName">{{goodsItem.goodsName}}</p>
                      <p class="text-grey" :title="goodsItem.goodsSubTitle">{{goodsItem.goodsSubTitle}}</p>
                    </div>
                  </td>
                  <td>{{goodsItem.startSendTime|date('YYYY-MM-DD')}}&nbsp;至&nbsp;{{goodsItem.endSendTime|date('YYYY-MM-DD')}}</td>
                  <td>{{goodsItem.unitPrice | currency}}元</td>
                  <td>
                    <p>{{getCount(goodsItem)}}台</p>
                    <p class="text-grey" v-if="selected.status===1&&selected.type===0&&goodsItem.allowTrust">
                      已托管{{goodsItem.hostingCount}}台</p>
                  </td>
                  <td>{{getCount(goodsItem) * goodsItem.unitPrice | currency}}元</td>
                  <td v-if="$i===0||getRowspan(order)<=1" :rowspan="getRowspan(order)">
                    {{getOrderStatusStr(order)}}
                    <span v-if="order.statusPay===-1&&order._reason">
                      <el-popover class="text-center" placement="bottom" trigger="hover" :content="order._reason">
                        <i slot="reference" class="icon-question">?</i>
                    </el-popover>
                    </span>
                  </td>
                  <td v-if="$i===0||getRowspan(order)<=1" :rowspan="getRowspan(order)">
                    <div v-if="selected.status===0&&order.statusPay===0">
                      <el-button class="btn-operate" type="primary" size="small"
                                 @click="toPay(order)">
                        去付款
                      </el-button>
                      <p class="cancel-order" @click="showCancel(order)">取消订单</p>
                    </div>
                    <el-button v-else-if="selected.status===1&&selected.type===0&&goodsItem.allowTrust"
                               class="btn-operate" type="primary" size="small"
                               @click="toHosting(goodsItem, order)">
                      去托管
                    </el-button>
                    <el-button v-else-if="selected.status===2"
                               class="btn-operate" type="primary" size="small"
                               @click="seeExpress(order)">
                      查看物流
                    </el-button>
                    <a v-else-if="selected.status===3&&selected.type===1" class="link"
                       :href="goodsItem.collUrl" target="_blank">
                      下载托管合同
                    </a>
                    <span v-else>--</span>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <el-pagination
        v-if="orderList&&orderList.length>0"
        class="text-left"
        :page-sizes="[10, 20, 30, 50, 100, 200]"
        :page-size="page.pageSize"
        layout="sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :total="page.total">
      </el-pagination>
      <el-dialog class="custom" title="取消订单" :visible.sync="dialogVisible" width="30%">
        <span>是否要取消订单吗？</span>
        <span slot="footer">
          <el-button @click="dialogVisible = false">否</el-button>
          <el-button type="primary" @click="cancelOrder">是</el-button>
        </span>
      </el-dialog>
      <el-dialog class="custom" title="坐享收益，一键托管" :visible.sync="hostingDialogVisible" width="420px">
        <el-row class="summary">
          <el-col :span="12">
            <h4>{{hostingInfo.maxHostingCount}}</h4>
            <p>可托管台数</p>
          </el-col>
          <el-col :span="12">
            <h4>{{hostingInfo.hostingCount}}</h4>
            <p>已托管</p>
          </el-col>
        </el-row>
        <dl class="hosting-info">
          <div class="hosting-info__item">
            <dt>新增托管</dt>
            <dd>
              <div class="num-box">
                <span @click="sub()">-</span>
                <input type="number" v-model="hostingInfo.num" :min="1" :max="hostingInfo.maxHostingCount"
                       @input="inputNum" title="">
                <span @click="add()">+</span>
              </div>
            </dd>
          </div>
          <div class="hosting-info__item">
            <dt>
              托管参考费用
              <el-popover
                placement="bottom"
                width="250"
                trigger="hover"
                content="托管费用供参考，以矿场托管实际费用为准">
                <i class="icon-question" slot="reference">?</i>
              </el-popover>
            </dt>
            <dd>
              <p>电费 {{ hostingInfo.electricityFee }}元/kW·h</p>
              <p>管理费 {{ hostingInfo.managementFee }}元/天·台</p>
            </dd>
          </div>
          <div class="hosting-info__item">
            <dt>
              开始日期
            </dt>
            <dd>
              <p>{{ hostingInfo.trustStartTime | date('YYYY-MM-DD') }}</p>
            </dd>
          </div>
          <div class="hosting-info__item">
            <dt>付费方式</dt>
            <dd>
              <ul class="pay-method__list">
                <li class="pay-method__item" :class="{'is-active':method.type===hostingInfo.balanceType.type}"
                    v-for="method in methods" :key="method.type" @click="hostingInfo.balanceType=method">
                  {{method.label}}
                </li>
              </ul>
            </dd>
          </div>
          <div class="hosting-info__item method-desc">
            <dd>
              <p>{{hostingInfo.balanceType.desc}}</p>
              <p>当上述扣款都无法完成时，或连续10天每日产出的加密货币不足抵扣时，托管的矿机停止运行。</p>
            </dd>
          </div>
          <div class="hosting-info__item">
            <dt>
              物流费用
              <el-popover
                placement="bottom"
                width="170"
                trigger="hover"
                content="物流费用直接扣除账户余额">
                <i class="icon-question" slot="reference">?</i>
              </el-popover>
            </dt>
            <dd>
              {{ hostingInfo.logisticsFee * hostingInfo.num }}元({{hostingInfo.logisticsFee}}元*{{hostingInfo.num}}台)
            </dd>
          </div>
          <div class="hosting-info__item">
            <dt>
              上架费用
              <el-popover
                placement="bottom"
                width="170"
                trigger="hover"
                content="上架费用直接扣除账户余额">
                <i class="icon-question" slot="reference">?</i>
              </el-popover>
            </dt>
            <dd>
              {{ hostingInfo.shelfFee * hostingInfo.num }}元({{hostingInfo.shelfFee}}元*{{hostingInfo.num}}台)
            </dd>
          </div>
        </dl>
        <div slot="footer">
          <!--<el-checkbox class="rules left" v-model="rulesAgree">-->
          <!--同意 <a target="_blank" href="/trusteeship-agreement">《服务器托管服务协议》</a>-->
          <!--</el-checkbox>-->
          <el-button type="primary" :disabled="!rulesAgree" @click="conHosting">确认托管</el-button>
        </div>
      </el-dialog>
      <el-dialog class="custom" :visible.sync="expressDialogVisible" width="420px">
        <span slot="title">查看物流 <span class="express-summary">此单目前共有{{ logList.length }}个物流单号</span></span>
        <el-collapse class="express-content" v-model="activeNames" @change="handleChange" v-if="logList.length !== 0">
          <el-collapse-item v-for="(item, index) in logList" :key="index">
            <div slot="title">
              <div class="express-no">{{ item.emsName }}&nbsp;&nbsp;&nbsp;{{item.emsNo}}</div>
              <div class="express-date">{{ item.lastTime }}</div>
            </div>
            <ul class="address-info">
              <li v-for="(items, index) in item.data" :key="index">
                <i class="dot"></i>
                <strong v-if="index === 0">最新</strong>
                <div class="detail-info" v-if="index === 0">
                  <p>{{ items.time }}</p>
                  <p style="width: 200px;">{{ items.context }}</p>
                </div>
                <div class="detail-info no-new-info" v-else>
                  <p>{{ items.time }}</p>
                  <p>{{ items.context }}</p>
                </div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
        <div v-else>
          <p class="text-grey text-center">暂无物流订单</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import AppConfig from '../../../config';
  import OrderAPI from '../../../services/order-api';
  import ProductAPI from '../../../services/product-api';
  import errorHandler from '../../../services/error-handler';
  import {BalanceType} from '../../../config/constants';
  import {mapState} from 'vuex';
  import * as debounce from 'lodash.debounce';


  export default {
    data() {
      return {
        tabList: [
          {
            status: 0,
            label: '待支付'
          },
          {
            status: 1,
            label: '待发货',
            type: 0
          },
          {
            status: 1,
            label: '待交割',
            type: 1
          },
          {
            status: 2,
            label: '待收货'
          },
          {
            status: 3,
            label: '已收货',
            type: 0
          },
          {
            status: 3,
            label: '已交割',
            type: 1
          },
          {
            status: -1,
            label: '其他订单'
          }
        ],
        selected: {},
        orderList: [],
        methods: [
          {
            type: BalanceType.BALANCE,
            label: '优先余额付款',
            desc: '优先余额付费，扣款优先级：1、账户余额；2、每日产出的加密货币；3、账户中的加密货币。'
          },
          {
            type: BalanceType.COIN,
            label: '优先以币抵费',
            desc: '优先以币抵费，抵扣优先级：1、每日产出的加密货币；2、账户中的加密货币。'
          }
        ],
        balanceType: BalanceType.BALANCE,
        hostingInfo: {
          total: 0, // 总数量
          hostingCount: 0, // 已托管数量
          electricityFee: 0, // 参考电费
          managementFee: 0, // 参考管理费
          logisticsFee: 0,  // 单台矿机物流费
          trustStartTime: new Date(), // 托管开始时间
          orderNo: '', // 订单号
          batchGoodsId: '',// 批次商品Id
          batchNo: '',//批次号
          num: 1, // 待托管数量,
          maxHostingCount: 1, // 最大可托管数量
          balanceType: {} // 结算类型
        },
        dialogVisible: false,
        hostingDialogVisible: false,
        expressDialogVisible: false,
        rulesAgree: true,
        preCancelOrder: null,
        activeNames: '0',
        logList: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 1
        }
      };
    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      seeExpress(data) {
        this.expressDialogVisible = true;
        OrderAPI.express(data.orderNo)
          .then((res) => {
            this.logList = res;
          })
          .catch(res => errorHandler(res));
      },
      inputNum() {
        debounce(() => {
          if (!/^[1-9]\d{0,2}$/.test(this.hostingInfo.num + '')) {
            this.hostingInfo.num = 1;
          }
          if (this.hostingInfo.num > this.hostingInfo.maxHostingCount) {
            this.hostingInfo.num = this.hostingInfo.maxHostingCount;
          }
        }, 1000)();
      },
      add() {
        this.hostingInfo.num++;
        if (this.hostingInfo.num > this.hostingInfo.maxHostingCount) {
          this.hostingInfo.num = this.hostingInfo.maxHostingCount;
        }
      },
      sub() {
        this.hostingInfo.num--;
        if (this.hostingInfo.num < 1) {
          this.hostingInfo.num = 1;
        }
      },
      toHosting(goodsItem, order) {
        this.hostingInfo.total = goodsItem.batchGoodsCount;
        this.hostingInfo.hostingCount = goodsItem.hostingCount;
        this.hostingInfo.orderNo = order.orderNo;
        this.hostingInfo.batchGoodsId = goodsItem.batchGoodsId;
        this.hostingInfo.batchNo = order.batchNo;
        this.hostingInfo.num = 1; // 初始化待托管数量为1
        this.hostingInfo.maxHostingCount = goodsItem.batchGoodsCount - goodsItem.hostingCount - goodsItem.shipCount;
        // 初始化结算类型为默认的结算类型
        this.hostingInfo.balanceType = this.methods.find(item => item.type === this.balanceType);

        ProductAPI.remoteDetail(goodsItem.batchGoodsId)
          .then(res => {
            this.hostingInfo.electricityFee = res.electricityFee;
            this.hostingInfo.managementFee = res.managementFee;
            this.hostingInfo.logisticsFee = res.trustFreightFree;
            this.hostingInfo.shelfFee = res.putAwayFree;
            this.hostingInfo.trustStartTime = res.trustStartTime;
          });

        this.hostingDialogVisible = true;
      },
      conHosting() {
        const hostingInfo = this.hostingInfo;
        if (hostingInfo.num > hostingInfo.maxHostingCount) {
          return this.$message.warning('托管总数量大于商品总数量');
        }
        if (!/^[1-9]\d{0,2}$/.test(hostingInfo.num + '')) {
          return this.$message.warning('无效的托管数量');
        }
        const data = {
          mallOrderNo: hostingInfo.orderNo,
          mallBatchGoodsId: hostingInfo.batchGoodsId,
          mallBatchNo: hostingInfo.batchNo,
          deliveryCount: hostingInfo.num,
          payWay: hostingInfo.balanceType.type
        };
        OrderAPI.orderTrusteeship(data)
          .then(() => {
            this.hostingDialogVisible = false;
            this.$message({
              message: '托管成功',
              type: 'success'
            });
            this.getOrderList({status: 1, type: 0});
          })
          .catch(errorHandler);
      },
      getCount(goodsItem) {
        const status = this.selected.status;
        const type = this.selected.type || '';
        if ((status === 1 || status === 3) && type === 1) {
          return goodsItem.hostingCount;
        }
        if (status === 1 && (type === 0 || type === '')) {
          return goodsItem.batchGoodsCount - goodsItem.hostingCount - goodsItem.shipCount;
        }
        if (status === 2 && (type === 0 || type === '')) {
          return goodsItem.shipCount;
        }
        return goodsItem.batchGoodsCount - goodsItem.hostingCount;
      },
      getOrderStatusStr(order) {
        const selected = this.selected;
        if (selected.status === 1 || selected.status === 3) {
          return selected.label;
        }
        if (selected.status === 2) {
          return selected.label;
        }
        if (order.stausSend === 2) {
          return '已取消';
        }
        switch (order.statusPay) {
          case 0:
            return '待支付';
          case 1:
            return '支付确认中';
          case 2:
            return '已支付';
          case 3:
            return '已过期';
          case 4:
            return '已取消';
          case 5:
            return '支付确认中';// 二次待确认
          case -1:
            return '已拒绝';
          default:
            return '--';
        }
      },
      getRowspan(order) {
        const selectedStatus = this.selected.status;
        // 订单状态为已过期或者已取消
        const isOrderCancel = order.stausSend === 2 || order.statusPay === 4 || order.statusPay === 3;
        // 待支付，待收货，其他订单跨行显示
        if ([0, -1].indexOf(selectedStatus) > -1 || isOrderCancel) {
          return (order.orderInfoDetails || []).length || 1;
        }
        return 1;
      },
      handleChange(val) {
        console.log(val);
      },
      getOrderList(param) {
        param = Object.assign({}, param, {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        });
        OrderAPI.get(param)
          .then(data => {
            this.page.total = data.count;
            return data.data || [];
          })
          .then(res => {
            this.orderList = [];
            res.forEach(item => {
              item.discountAmount = +item.discountAmount;
              item._reason = '';
              item._presellUrl = AppConfig.apiEndpoint2 + '/api/contract/exportPDF?token=' + this.token + '&orderNo=' + item.orderNo;
              (item.orderInfoDetails || []).forEach(sOrder => {
                sOrder.collUrl = AppConfig.apiEndpoint2 + '/api/contract/exportAgreement?token=' + this.token + '&orderNo=' + item.orderNo + '&batchGoodsId=' + sOrder.batchGoodsId;
              });
              if (item.statusPay === -1) {
                OrderAPI.reason(item.orderNo)
                  .then(res => res.result)
                  .then(res => {
                    item._reason = res;
                  });
              }
            });
            this.orderList = res;
          })
          .catch(errorHandler);
      },
      toPay(order) {
        const _html = `
             <h3>商品总金额：<span style="color: #303137;">${order.amount}元</span></h3>
             <h3>运费：<span style="margin-left: 42px;color: #303137;">0.00元</span></h3>
             <h3>应付总金额：<span style="color:#FD7220">${order.amount}元</span></h3>
        `;

        this.$alert(_html, {
          dangerouslyUseHTMLString: true,
          title: '支付订单',
          center: true,
          confirmButtonText: '去付款'
        })
          .then(() => {
            this.$router.push({
              path: '/pay',
              query: {
                orderNo: order.orderNo
              }
            });
          })
          .catch(err => {
          });
      },
      cancelOrder() {
        this.dialogVisible = false;
        const orderId = this.preCancelOrder.id;
        OrderAPI.cancel(orderId)
          .then(data => data.data || {})
          .then(() => {
            this.getOrderList({status: 0});
            this.$message.success('取消成功');
          })
          .catch(errorHandler);
      },
      showCancel(order) {
        this.preCancelOrder = order;
        this.dialogVisible = true;
      },
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.getOrderList({status: this.selected.status, type: this.selected.type || null});
      },
      handleCurrentChange(page) {
        this.page.currentPage = page;
        this.getOrderList({status: this.selected.status, type: this.selected.type || null});
      }
    },
    watch: {
      selected(val) {
        this.page = {
          currentPage: 1,
          pageSize: 10,
          total: 1
        };
        const status = this.selected.status;
        const type = (!this.selected.type && this.selected.type !== 0) ? null : this.selected.type;

        this.getOrderList({status, type});
      }
    },
    mounted() {
      let selected = this.$route.query.selected;
      this.selected = this.tabList[selected ? selected : 0];
    }
  };
</script>

<style scoped lang="scss">

  .order {
    position: relative;
    min-height: 430px;
  }

  .order-popover {
    width: 42px;
    height: 20px;
    background: #303137;
    position: absolute;
    top: 50px;
    left: 155px;
    font-size: 5px;
    line-height: 20px;
    text-align: center;
    color: #fff;
  }

  .order-popover i {
    display: block;
    border-top: 5px solid #303137;
    border-right: 5px solid #fff;
    border-bottom: 1px solid #fff;
    border-left: 5px solid #fff;
    background: #303137;
    position: absolute;
    bottom: -6px;
    left: 5px;
    font-size: 12px;
  }

  .header {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
  }

  .tabs {
    height: 43px;
    line-height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #eee;

    li {
      float: left;
      margin: 0 30px;
      font-size: 14px;
      color: #999;
      cursor: pointer;

      &.active {
        color: #303137;
        border-bottom: 3px solid #303137;
        font-weight: bold;
      }
    }
  }

  .content {
    padding: 20px 30px;
  }

  .sub-tabs {
    margin-top: 20px;
    padding-left: 30px;
    padding-right: 30px;

    li {
      display: inline-block;
      margin-left: 2em;
      font-size: 14px;
      color: #999;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.active {
        color: #303137;
        font-weight: bold;
      }
    }
  }

  .order-table {
    border-spacing: 0;
    font-size: 12px;
    > thead th {
      height: 55px;
      color: #333;
      border: 1px solid #eee;
      background-color: #fafafa;
      font-weight: normal;
      + th {
        border-left: 0;
      }
    }
    th, td {
      &:nth-child(1) {
        width: 209px;
      }
      &:nth-child(2) {
        width: 195px;
      }
      &:nth-child(3) {
        width: 125px;
      }
      &:nth-child(4) {
        width: 90px;
      }
      &:nth-child(5) {
        width: 146px;
      }
      &:nth-child(6) {
        width: 105px;
      }
      &:nth-child(7) {
        width: 98px;
      }
    }
    > tbody > tr > td {
      padding-top: 20px;
    }
  }

  .order-summary-info {
    background-color: #fafafa;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px solid #eee;
    border-bottom: 0;

    .link {
      display: inline-block;
      line-height: 50px;
    }
  }

  .order-summary__list {
    display: inline-block;
  }

  .order-summary__item {
    display: inline-block;
    margin-left: 1em;

    &:first-child {
      margin-left: 0;
    }

    &.no {
      min-width: 230px;
    }

    dt, dd {
      display: inline-block;
      margin: 0;
      font-size: 12px;
      line-height: 50px;
    }
    dt {
      color: #999;
    }
    dd {
      margin-left: .5em;
    }
  }

  .goods-table {
    border-spacing: 0;

    td {
      padding: 10px;
      border: 1px solid #eee;
      border-top-width: 0;
      line-height: 20px;
      height: 80px;
      vertical-align: middle;
      text-align: center;
      + td {
        border-left: 0;
      }
    }

    tr:first-child td {
      border-top-width: 1px;
    }
  }

  .goods-detail {
    position: relative;
    padding-left: 50px;
    width: 187px;
    text-align: left;
    img {
      position: absolute;
      left: 0;
      width: 40px;
      height: 40px;
    }
    p {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .text-grey {
    color: #969699;
  }

  .link {
    color: #4D87EA;
    cursor: pointer;
  }

  .summary {
    margin-top: -10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    text-align: center;

    h4 {
      font-size: 18px;
      color: #303137;
    }

    p {
      font-size: 12px;
      color: #969699;
    }
  }

  .hosting-info {
    margin-bottom: -10px;
  }

  .hosting-info__item {
    position: relative;
    margin-top: 20px;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #303137;

    dt, dd {
      display: inline-block;
      margin: 0;
    }

    dt {
      position: absolute;
      top: 50%;
      font-size: 14px;
      line-height: 30px;
      color: #969699;
      margin-top: -15px;
    }

    dd {
      float: right;
      text-align: right;
    }

    &.method-desc {
      /*margin-top: 10px;*/

      dd {
        display: block;
        padding: 10px 16px;
        font-size: 12px;
        line-height: 18px;
        background-color: #fafafa;
        color: #606166;
        text-align: left;
      }
    }

  }

  .rules {
    line-height: 40px;

    a {
      color: #4d87ea;
    }
  }

  .pay-method__list {
    height: 39px;
    margin-left: 30px;
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .pay-method__item {
    position: relative;
    display: inline-block;
    margin-left: 1em;
    vertical-align: top;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 25px;
    border: 1px solid #eee;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &.is-active {
      border-color: #4d87ea;

      &:after {
        content: "";
        position: absolute;
        right: -1px;
        bottom: -1px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../../../assets/images/selected.png) no-repeat;
        background-size: cover;
      }
    }
  }

  .icon-question {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #969699;
    color: #969699;
    text-align: center;
    line-height: 14px;
    font-style: normal;
    /*margin-left: 10px;*/
    font-size: 12px;
    cursor: pointer;
  }

  .express-summary {
    font-size: 12px;
    font-weight: normal;
  }

  .express-content {
    margin-top: -10px;
  }

  .express-no {
    display: inline-block;
    font-size: 14px;
    color: #303137;
  }

  .express-date {
    float: right;
    margin-right: 10px;
    font-size: 12px;
    color: #969699;
  }

  .address-info {
    width: 100%;
  }

  .address-info li {
    padding: 20px 20px 0 20px;
    overflow: hidden;
  }

  .address-info strong {
    float: left;
    margin-top: 10px;
    width: 32px;
    height: 18px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    background: #303137;
    border-radius: 2px;
    font-weight: normal;
  }

  .address-info .detail-info {
    float: left;
    margin-left: 10px;
  }

  .address-info .no-new-info {
    float: left;
    margin-left: 42px;
  }

  .address-info .detail-info p:nth-child(1) {
    font-size: 12px;
    color: #969699;
    letter-spacing: 0;
    line-height: 18px;
  }

  .address-info .detail-info p:nth-child(2) {
    width: 270px;
    color: #303137;
  }

  .address-info .not-the-latest {
    margin-left: 42px;
  }

  .address-info .dot {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #303137;
    float: left;
    margin-top: 15px;
    margin-right: 10px;
  }

  .address-info .no-new-dot {
    background: #DEDEE0;
  }

  .btn-operate {
    border-radius: 0;
    min-width: 66px;
    padding: 5px 15px;
    font-size: 12px;
  }

  .num-box {
    float: right;
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 40px;
    border: 1px solid #efefef;
  }

  .num-box span {
    position: absolute;
    font-size: 24px;
    color: #969699;
    top: 0;
    text-align: center;
    width: 40px;
    background-color: #efefef;
    cursor: pointer;
  }

  .num-box span:first-child {
    left: 0;
  }

  .num-box span:last-child {
    right: 0;
  }

  .num-box input {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border: none;
    padding: 0;
    vertical-align: top;
    text-align: center;
  }

  .cancel-order {
    margin-top: 10px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    color: #999;
  }

</style>

