<template>
  <div class="my_order">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="tab">
        <span class="tab_sp" v-for="(item,index) in tab">
           <span class="sp_t" :class="{active:index==is_active}" @click="tabToggle(item,index)">{{item}}</span>
        </span>
        <span class="sp_r" @click="$router.push('/applyOrder')">查看我的申请></span>
      </div>
      <div class="active_line">
      </div>
      <div class="main">
        <table>
          <tr style="line-height: 55px">
            <td width="189">商品</td>
            <td width="140">金额</td>
            <td width="140">支付详情</td>
            <td width="140">订单详情</td>
            <td width="139">起租</td>
            <td width="84">订单状态</td>
            <td width="86">操作</td>
          </tr>
        </table>

        <div class="order_all" v-for="item in tableData">
          <!--<div class="space_all" v-if="item.orderPayStatus!=3">-->

          <!--</div>-->
          <div class="main_order td_title">
            <span class="name">订单号</span>
            <span class="num num_one" style="margin-right: 43px;">{{item.orderNo}}</span>
            <span class="name">下单时间</span>
            <span class="num"> {{item.createTime}} </span>
            <span class="name">订单金额 </span>
            <span class="num">{{item.orderTotalPrice}}元</span>
          </div>

          <div class="child_orders" v-if="item.orderPayStatus==3" v-for="child in item.childOrderList">
            <table>
              <tbody>
              <tr>
                <td colspan="7" class="child_order td_title td_title_children">
                  <span class="name">子订单号</span>
                  <span class="num num_one" style="margin-left: -1px;">{{child.childOrderNo}}</span>
                  <span class="name">订单金额 </span>
                  <span class="num">{{child.orderTotalPrice}}元</span>
                </td>
              </tr>
              <tr class="goods">
                <td width="189">
                  <div class="pics">
                  <span class="pic">
                    <img :src=child.goodsImgUrl alt="" v-if="child.goodsImgUrl">
                    <img src="../../assets/images/licenseImg.png" alt="" v-if="!child.goodsImgUrl">
                  </span>
                  </div>
                  <div class="des">
                    <div class="des_name">{{child.orderGoodsName}}</div>
                    <el-tooltip placement="bottom">
                      <div slot="content">{{child.orderSkuName}}</div>
                      <div class="des_sku">{{child.orderSkuName}}</div>
                    </el-tooltip>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">单台月租金</span>
                    <span>{{child.orderMonthPrice }}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span class="lease_money">单台押金</span>
                    <span>{{child.orderGoodsDeposit}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span>{{child.orderRentTypeName}}</span>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">支付押金</span>
                    <span>{{child.orderDeposit}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span>首付{{child.orderPeriodCount}}个月租金</span>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">订单数量</span>
                    <span>{{child.orderGoodsCount}}</span>
                  </div>
                  <div>
                    <span class="lease_money">账单金额</span>
                    <span>{{child.orderActualTotalPrice}}</span>
                    <span>元</span>
                  </div>
                </td>
                <td class="goods_money" width="139">
                  <!--<div>-->
                  <!--&lt;!&ndash;<span class="lease_money">起租日期</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;<span>{{child.beRentTime}}</span>&ndash;&gt;-->
                  <!--</div>-->
                  <div>
                    <span class="lease_money">租期</span>
                    <span>{{child.orderLease}}</span>
                    <span>个月</span>
                  </div>
                </td>
                <td class="goods_money pay_fail" width="84">
                  <div>
                    <span v-if="child.orderStatus==1">待审核</span>
                    <span v-if="child.orderStatus==2">待发货</span>
                    <span v-if="child.orderStatus==3">待收货</span>
                    <span v-if="child.orderStatus==4">租赁中</span>
                    <span v-if="child.orderStatus==5">已取消</span>
                    <span v-if="child.orderStatus==6">待退回</span>
                    <span v-if="child.orderStatus==7">已退回</span>
                    <span v-if="child.orderStatus==8">待确认</span>
                    <span v-if="child.orderStatus==9">租赁完成</span>
                    <span v-if="child.orderStatus==10">已关闭</span>
                  </div>
                  <div style="margin-top: 25px;" class="fail_reason">
                    <span>{{item.failReason}}</span>
                  </div>
                </td>
                <td class="go_btn" width="86">
                  <div v-if="child.orderStatus==2||child.orderStatus==3" class="view_logis"
                       @click="viewLogistics(child.childOrderNo)">
                    <span>查看物流</span>
                  </div>
                  <div v-if="child.orderStatus==4" class="btn_success apply_service" @click="applySellService">
                    <span>申请售后</span>
                  </div>
                  <div v-if="child.orderStatus==4|| child.orderStatus==9" class="view_S"
                       @click="viewSNCode(child.childOrderNo,child.orderGoodsName,child.orderSkuName,child.goodsImgUrl,child.orderGoodsCount)">
                    <span>查看SN码</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div v-if="item.orderPayStatus==1||item.orderPayStatus==2||item.orderPayStatus==4||item.orderPayStatus==5"
               class="child_orders_merge" v-for="(child,index) in item.childOrderList">
            <table>
              <tbody>
              <tr>
                <td colspan="7" class="child_order td_title td_title_children">
                  <span class="name">子订单号</span>
                  <span class="num num_one" style="margin-left: -1px;">{{child.childOrderNo}}</span>
                  <span class="name">订单金额 </span>
                  <span class="num">{{child.orderTotalPrice}}元</span>
                </td>
              </tr>
              <tr class="goods">
                <td width="189">
                  <div class="pics">
                  <span class="pic">
                    <img :src=child.goodsImgUrl alt="" v-if="child.goodsImgUrl">
                    <img src="../../assets/images/licenseImg.png" alt="" v-if="!child.goodsImgUrl">
                  </span>
                  </div>
                  <div class="des">
                    <div class="des_name">{{child.orderGoodsName}}</div>
                    <el-tooltip placement="bottom">
                      <div slot="content">{{child.orderSkuName}}</div>
                      <div class="des_sku">{{child.orderSkuName}}</div>
                    </el-tooltip>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">单台月租金</span>
                    <span>{{child.orderMonthPrice }}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span class="lease_money">单台押金</span>
                    <span>{{child.orderGoodsDeposit}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span>{{child.orderRentTypeName}}</span>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">支付押金</span>
                    <span>{{child.orderDeposit}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span>首付{{child.orderPeriodCount}}个月租金</span>
                  </div>
                </td>
                <td class="goods_money" width="140">
                  <div>
                    <span class="lease_money">订单数量</span>
                    <span>{{child.orderGoodsCount}}</span>
                  </div>
                  <div>
                    <span class="lease_money">账单金额</span>
                    <span>{{child.orderActualTotalPrice}}</span>
                    <span>元</span>
                  </div>
                </td>
                <td class="goods_money" width="139">
                  <!--<div>-->
                  <!--&lt;!&ndash;<span class="lease_money">起租日期</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;<span>{{child.beRentTime}}</span>&ndash;&gt;-->
                  <!--</div>-->
                  <div>
                    <span class="lease_money">租期</span>
                    <span>{{child.orderLease}}</span>
                    <span>个月</span>
                  </div>
                </td>
                <td class="goods_money pay_fail" width="84" :class="'ant'+index">
                  <div>
                    <span v-if="item.orderPayStatus == 1 && item.approvalStatus !=1">待支付</span>
                    <span v-if="item.orderPayStatus == 2">支付确认中</span>
                    <span v-if="item.orderPayStatus == 3">支付成功</span>
                    <span v-if="item.orderPayStatus == 4">支付失败</span>
                    <span v-if="item.orderPayStatus == 5">已取消</span>
                    <span v-if="item.orderPayStatus == 1 && item.approvalStatus == 1">待审核</span>

                  </div>
                  <div style="margin-top: 25px;" class="fail_reason">
                    <span>{{item.failReason}}</span>
                  </div>
                </td>
                <td class="go_btn" width="86" :class="'ant'+index">
                  <!--item.approvalStatus === null || item.approvalStatus == 0||item.approvalStatus ==2  去付款-->
                  <div
                    v-if="(item.orderPayStatus == 1||item.orderPayStatus == 2|| item.orderPayStatus == 4) &&item.approvalStatus !=1"
                    class="btn_success" style="padding-left: 12px;padding-right: 12px;" @click="goToPay(item.orderNo)">
                    <span>去付款</span>
                  </div>
                  <div v-if="item.orderPayStatus == 1 || item.orderPayStatus == 5">
                    <div v-if="item.approvalStatus == 1 || item.approvalStatus == 3" class="cancel_order"
                         @click="$router.push({path:'/lookApproval',query:{orderNo:item.orderNo}})">
                      <span style="color:#6ECC66;">查看审核</span>
                    </div>
                  </div>

                  <!--item.approvalStatus === null || item.approvalStatus == 0||item.approvalStatus ==2  去付款-->
                  <div v-if="(item.orderPayStatus == 1||item.orderPayStatus == 4) && item.approvalStatus !=1"
                       class="cancel_order" @click="cancelOrder(item.orderNo)">
                    <span>取消订单</span>
                  </div>
                  <div v-if="item.orderPayStatus == 5" class="cancel_order" @click="cancelOrder(item.orderNo)">
                    <span></span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="page">
          <pagination :pageData="pageData" v-if="!noRecord" @listenToChild="listenToChild"></pagination>
          <div class="icon_box" v-if="noRecord">
            <div class="icon_kong">
              <img src="../../assets/images/icon_jilu_kong.png" alt="">
            </div>
            <div class="txt">
              <span>没有相关的结果哦！</span>
            </div>
          </div>
          <!--<div class="no_record" v-if="noRecord">暂无记录</div>-->
        </div>
      </div>
    </div>

    <!--弹框-->
    <apply-sales :is-modal="apply_sell_service" @close="apply_sell_service=!apply_sell_service"></apply-sales>
    <transition name="fade">
      <div class="wh" v-if="go_to_pay">
        <div class="wh_box">
          <div class="pop">
            <div class="title" style="height: 20px;">
              <div class="name">去付款</div>
              <div class="cancel" @click="cancelGoToPay">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="width: 380px;margin: 0 auto;background:#FAFAFA;margin-top: 20px;padding-bottom: 20px;">
              <div class="content">
                <div class="first_line">
                  <span class="c_name">应付总金额</span>
                  <span>¥{{orderTotalPrice}}</span>
                </div>
                <div class="first_line">
                  <span class="c_name">首付租金</span>
                  <span>¥{{rentAmount}}</span>
                </div>
                <div class="first_line">
                  <span class="c_name">机器押金</span>
                  <span>¥{{orderTotalDeposit}}</span>
                </div>
                <div class="first_line">
                  <div class="fl">
                    <span class="c_name">企业免押金额度</span>
                    <span style="position: relative">¥{{orderFreeDeposit}}
                  <span style="position: absolute;left: -10px;top: -3px;font-size: 20px">-</span>
                 </span>
                  </div>
                  <div class="fr">
                    <span v-if="flag==0" @click="openQuota">开通额度</span>
                    <span v-if="flag==1">开通中</span>
                    <span v-if="flag!=0&&flag!=1" @click="promoteQuota">提升额度</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="also" style="margin-top: 20px;">
              <div class="fl">还需支付金额</div>
              <div class="fr">¥{{orderActualTotalPrice}}</div>
            </div>
            <div style="clear: both;"></div>
            <div class="line">

            </div>
            <div class="sure">
              <div class="btn_successT" @click="surePay">
                确认付款
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="wh" v-if="cancel_order">
        <div class="wh_box">
          <div class="pop">
            <div class="title">
              <div class="name">取消订单</div>
              <div class="cancel" @click="cancelCancelOrder">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both;"></div>
            <div class="question">
              确认要取消订单吗？
            </div>


            <div class="line">

            </div>
            <div class="sure">
              <div class="btn_successT" @click="cancelCancelOrder">
                不取消
              </div>
              <!--<div class="btn_textT" @click="sureCloseOrder">-->
              <!--确认取消-->
              <!--</div>-->
              <el-button :loading="loading" @click="sureCloseOrder"
                         style="float: right;margin-top: 15px;margin-right: 15px;height: 36px;line-height: 10px">
                确认取消
              </el-button>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="wh view_place" v-if="view_logistics">
        <div class="wh_box">
          <div class="view">
            <div class="cancel" @click="cancelViewLogistics">
              <img src="../../assets/images/icon_close.png" alt="">
            </div>
            <div class="title">
              <span class="title_t">查看物流</span>
              <span class="title_d" v-if="code_error">此单目前共有<span v-if="logistics_count">{{logistics_count}}</span><span
                v-if="!logistics_count">0</span>个物流单号</span>
            </div>
            <!--<div v-if="logistics_arr.length==0" style="font-size: 20px;color: #CCCCCC;text-align: center;margin-top: 100px;">暂无记录</div>-->
            <div v-loading="loading_logistics">
              <div class="icon_box" v-if="logistics_arr.length==0">
                <div class="icon_kong">
                  <img src="../../assets/images/icon_jilu_kong.png" alt="">
                </div>
                <div class="txt">
                  <span>没有相关的结果哦！</span>
                </div>
              </div>

              <div style="margin-top: 20px;">
                <div v-if="logistics_arr.length!=0" v-for="(item,index) in logistics_arr">
                  <div class="box" style="margin-top: 0;">
                    <div class="sk">
                      <div class="fl">
                        <span>{{item.emsName}}</span>
                        <span class="code">{{item.emsNo}}</span>
                      </div>
                      <div class="fr">
                        <span>{{item.lastTime}}</span>
                        <span class="arrow" @click="toggleLogistics(item,index)">
                   <img src="../../assets/images/logistics_bottom.png" class="img_a" :class="'img'+index+'a'" alt="">
                   <img src="../../assets/images/icon_select_xiala_up.png" class="img_b" :class="'img'+index+'b'"
                        alt="">
                  </span>
                      </div>
                    </div>
                  </div>
                  <div class="detail" v-if="item.data" :class="'detail_logistics'+index">
                    <div class="line">
                    </div>
                    <div class="des">
                      <div class="fl">
                        <div v-for="(child,indexT) in item.data" class="dot_Box">

                          <span class="green_dot" v-if="indexT==0"></span>

                          <span class="newest" v-if="indexT==0">最新</span>
                          <div class="dot_green"></div>
                          <!--此处需遍历-->
                          <div class="dot_small_box" v-if="indexT!=0">
                            <div class="line_vertical"></div>
                            <div class="grey_dot">
                              <div class="dot_line" :class="'dot_line'+index+indexT" v-if="indexT!=item.data.length-1">

                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                      <div class="flr">
                        <!--此处需遍历-->
                        <div class="times" v-for="(child,index) in item.data">
                          <div class="time">
                            <span>{{child.time}}</span>
                          </div>
                          <div class="des_t">
                            <span>{{child.context}}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="icon_box" style="display: none;" :class="'detail_logistics'+index"
                       v-if="item.data===null||item.data.length==0">
                    <div class="icon_kong" style="margin-top: 0;margin-bottom: 20px;">
                      <img src="../../assets/images/icon_jilu_kong.png" alt="">
                    </div>
                    <div class="txt">
                      <span>没有相关的结果哦！</span>
                    </div>
                  </div>
                  <div style="clear: both;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="view_sn" v-if="view_sn_code">
        <div class="wh_box">
          <div class="pop">
            <div class="cancel" @click="cancelViewSNCode">
              <img src="../../assets/images/icon_close.png" alt="">
            </div>
            <div class="tt">
              <span>查看SN码</span>
            </div>
            <div v-loading="loading_SN">
              <div class="box">
                <div class="fl" style="margin-bottom: 20px;">
                  <div class="pic">
                  <span>
                    <img :src="sn_good_img" alt="" v-if="sn_good_img">
                    <img src="../../assets/images/licenseImg.png" alt="" v-if="!sn_good_img">
                  </span>
                  </div>
                  <div class="des">
                    <div class="one_l">
                      {{sn_good_name}}
                    </div>
                    <div class="two_l">
                      {{sn_good_sku}}
                    </div>
                  </div>
                </div>
                <div class="fr">
                  <span>{{sn_good_count}}台</span>
                </div>
              </div>
              <div style="clear: both;"></div>
              <div class="codes">
                <div class="one_line" v-for="item in sn_data_arr" style="text-align: center;">
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">{{item.a}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple-light">{{item.b}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">{{item.c}}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>
    <pop :obj="obj"></pop>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import pagination from '../x-pagination'
  import pop from './x-pop'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import applySales from '../x-applySales';
  export default {
    components: {
      ElButton,
      plugin_title: plugin_title,
      pagination: pagination,
      pop: pop,
      applySales: applySales
    },
    name: 'myOrder',
    data(){
      return {
        loading_logistics: false,
        loading_SN: false,
        loading: false,
        code_error: true,
        obj: {
          title: '我的订单',
          content: '',
          is_pop: false
        },
        noRecord: false,
        arrow_to: true,
        logistics_count: '',
        logistics_arr: [],
        child_logistic_order_id: '',
        child_sn_id: '',
        cancel_order_id: '',
        pay_order_id: '',
        flag: '',
        orderActualTotalPrice: '',
        orderFreeDeposit: '',
        rentAmount: '',
        orderTotalDeposit: '',
        orderTotalPrice: '',
        order_status: 1,
        tableData: [],
        pageData: {
          total: 1,
          currentPage: 1,
          pageSizes: 5
        },
        token: '',

//        toggle_arrow:true,
        black_tip: '完整提示',
        parentMsg: '我的订单',
        activeName: 'second',
        tab: [
          '待支付', '待发货', '待收货', '租赁中', '租赁完成', '全部订单'
        ],
        is_active: 0,
        go_to_pay: false,
        cancel_order: false,
        view_logistics: false,
        apply_sell_service: false,
        view_sn_code: false,
        sn_good_name: '',
        sn_good_sku: '',
        sn_good_img: '',
        sn_good_count: '',
        sn_data_arr: []
      }
    },
    methods: {
      goToApproval(orderNo){
        this.$router.push({path: './approval', query: {orderNo: orderNo}});
      },
      openQuota(){
//          开通额度
        this.$router.push('./freeDeposit');
      },
      promoteQuota(){
//          提升额度
//        this.$router.push('./promoteQuota');
        this.$router.push({path: './freeDeposit', query: {to: 'promoteQuota'}});
      },
      listenToChild(){
        var vm = this;

        this.getMyOrder();
      },
      goToPay(orderNo){
        this.pay_order_id = orderNo;
        this.go_to_pay = true;
        var vm = this;
        var obj = {
          orderNo: orderNo,
          token: vm.token,
          initTime: new Date().getTime()
        }
        this.$http.get('/myorder/payBeforeInfos', {params: obj}).then(function (data) {

          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.orderActualTotalPrice = res.data.orderActualTotalPrice;
            vm.orderFreeDeposit = res.data.orderFreeDeposit;
            vm.orderTotalDeposit = res.data.orderTotalDeposit;
            vm.orderTotalPrice = res.data.orderTotalPrice;
            vm.rentAmount = res.data.rentAmount;
            vm.flag = res.data.flag;
          } else if (Number(res.code) !== 7024) {
//            vm.$alert(res.msg, '我的订单', {
//              confirmButtonText: '我知道了',
//              type: 'warning'
//            })
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
      cancelGoToPay(){
        this.go_to_pay = false;
      },
      surePay(){
        this.go_to_pay = false;
        this.$router.push({path: '../pay', query: {type: 'orderPay', id: this.pay_order_id}});
      },
      cancelOrder(orderId){
        this.cancel_order = true;
        this.cancel_order_id = orderId;
      },
      cancelCancelOrder(){

        this.cancel_order = false;
      },
      sureCloseOrder(){
        var vm = this;
        vm.loading = true;
        var obj = {
          orderNo: vm.cancel_order_id,
          token: vm.token,
          initTime: new Date().getTime()
        }
        this.$http.get('/myorder/cancel', {params: obj}).then(function (data) {
          vm.loading = false;
          if (Number(data.data.code) === 1000) {

            vm.cancel_order = false;
//              location.href=location.href;
            vm.getMyOrder();
          } else if (Number(data.data.code) !== 7024) {

            vm.obj.is_pop = true;
            vm.obj.content = res.msg;

          }
        })
      },
      viewLogistics(childId){
        this.view_logistics = true;
//        this.toggle_arrow = true;//重置向上向下箭头
        $('.detail').css('display', 'none')//重置下面部分不显示
        var vm = this;
        vm.loading_logistics = true;
        vm.child_logistic_order_id = childId;
        var obj = {
          childOrderNo: vm.child_logistic_order_id,
          token: vm.token,
          initTime: new Date().getTime()
        }
        this.$http.get('/myorder/express', {params: obj}).then(function (data) {
          vm.loading_logistics = false;
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.code_error = true;
            vm.logistics_count = res.data.expressCount;
            vm.logistics_arr = res.data.data;

            for (var i = 0; i < vm.logistics_arr.length; i++) {
              if (vm.logistics_arr[i].data) {
                var ll = vm.logistics_arr[i].data.length - 1;
                $('.dot_line' + i + ll).css('background', '#FFFFFF');
              }
            }
          } else if (Number(res.code) === 3001) {
            vm.code_error = false;
            vm.logistics_arr = [];
          } else {
            vm.code_error = false;
            vm.logistics_arr = [];
          }
        })
      },
      cancelViewLogistics(){
        this.view_logistics = false;
      },
      toggleLogistics(item, index){
        $('.detail_logistics' + index).slideToggle();
        $('.img' + index + 'a').toggle();
        $('.img' + index + 'b').toggle();
        this.arrow_to = !this.arrow_to;
      },
      applySellService(){
        this.apply_sell_service = true;
      },
      cancelApplySellService(){
        this.apply_sell_service = false;
      },
      viewSNCode(childOrderNo, a, b, c, d){
        this.sn_good_name = a;
        this.sn_good_sku = b;
        this.sn_good_img = c;
        this.sn_good_count = d;
        this.child_sn_id = childOrderNo;
        var vm = this;
        vm.loading_SN = true;
        var obj = {
          childOrderNo: vm.child_sn_id,
//          childOrderNo:'18010918343000008100',
          token: vm.token,
          initTime: new Date().getTime()
        }
        this.$http.get('/myorder/sn', {params: obj}).then(function (data) {
          vm.loading_SN = false;
          if (Number(data.data.code) === 1000) {
            vm.view_sn_code = true;
            var SN_arr = data.data.data;
            var lg = Math.ceil(SN_arr.length / 3);
            var arr = [];
            for (var i = 0; i < lg; i++) {
              var obj = {
                a: '',
                b: '',
                c: ''
              }
              obj.a = SN_arr[i * 3 + 0];
              obj.b = SN_arr[i * 3 + 1];
              obj.c = SN_arr[i * 3 + 2];
              arr.push(obj);
            }
            vm.sn_data_arr = arr;
          } else{
            vm.obj.is_pop = true;
            vm.obj.content = data.data.msg;
          }
        })
      },
      cancelViewSNCode(){
        this.view_sn_code = false;
      },
      tabToggle(item, index){
//        待支付-1，待发货-2，待收货-3，租赁中-4 ，租赁完成-9
        if (index == 0) {
          this.order_status = 1;
        }
        if (index == 1) {
          this.order_status = 2;
        }
        if (index == 2) {
          this.order_status = 3;
        }
        if (index == 3) {
          this.order_status = 4;
        }
        if (index == 4) {
          this.order_status = 9;
        }
        if (index == 5) {
          this.order_status = "";
        }
        this.is_active = index;
        var wd = 100;
        var wa = wd * index + 'px';

        var wa = 100 * (this.is_active) + 'px';

        if (wa == '400px') {
          $('.active_line').animate({left: '412px'});
        } else if (wa == '500px') {
          $('.active_line').animate({left: '515px'});
        } else {
          $('.active_line').animate({left: wa});
        }
//        $('.active_line').animate({left: wa});
        this.getMyOrder();
      },
      getMyOrder(){
//        待支付-1，待发货-2，待收货-3，租赁中-4 ，租赁完成-9
        var obj = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          status: this.order_status,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/myorder/infos', {params: obj}).then(function (data) {
          var res = data.data;

          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;
            vm.tableData = res.data.searchVos;
//主订单：1.待支付2.支付确认中3.支付成功4.支付失败
//            child_orders_merge 合并
            for (var i = 0; i < vm.tableData.length; i++) {
//                allMethods.fmoney
              vm.tableData[i].orderTotalPrice = allMethods.fmoney(vm.tableData[i].orderTotalPrice, 2);
              for (var k = 0; k < vm.tableData[i].childOrderList.length; k++) {
                vm.tableData[i].childOrderList[k].orderTotalPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderTotalPrice, 2);
                vm.tableData[i].childOrderList[k].orderMonthPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderMonthPrice, 2);
                vm.tableData[i].childOrderList[k].orderGoodsDeposit = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderGoodsDeposit, 2);
                vm.tableData[i].childOrderList[k].orderDeposit = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderDeposit, 2);
                vm.tableData[i].childOrderList[k].orderTotalPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderTotalPrice, 2);
                vm.tableData[i].childOrderList[k].orderActualTotalPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderActualTotalPrice, 2);
              }
            }
            if (res.data.searchVos.length == 0) {
              vm.noRecord = true;
            } else {
              vm.noRecord = false;
            }
//            if (res.data.searchVos.orderPayStatus != 3) {
//              setTimeout(function () {
//                for (var i = 0; i < vm.tableData.length; i++) {
//
//                  var child_num = vm.tableData[i].childOrderList.length;
//
//                  var child_num_s = child_num - 1;
//                  for (var k = 0; k < child_num; k++) {
//
//                    $('.ant' + k).css('border-top', 'none');
//                    $('.ant' + k).css('border-bottom', 'none');
//                    if (k != 0) {
//                      $('.ant' + k).html('');
//                    }
//                  }
////                  $('.ant'+child_num).css('border-bottom','1px solid #EEEEEE');
//                }
//              }, 1)
//            }
          } else if (Number(res.code) === 3001) {
            vm.noRecord = true;
          } else if (Number(res.code) !== 7024) {
//            vm.$alert(res.msg, '我的订单', {
//              confirmButtonText: '我知道了',
//              type: 'warning'
//            })
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      if (this.$route.query.from == 'freeDepositUsed') {
//          展示全部订单
        this.order_status = "";
        this.is_active = 5;
      }
      if (this.$route.query.from == 'accountinfo') {
//          展示全部订单
        this.order_status = 4;
        this.is_active = 3;
      }
      if (this.$route.query.from == 'pay') {
//          展示全部订单
        this.order_status = 2;
        this.is_active = 1;
      }
      this.getMyOrder()
      var vm = this;
      bus.$on('error', function () {
        vm.obj.is_pop = false;
        vm.view_logistics = false;
        vm.cancel_order = false;
        vm.view_sn_code = false;
      })

    },
    mounted(){
//  初始化位置
      var wa = 100 * (this.is_active) + 'px';
      if (wa == '400px') {
        $('.active_line').animate({left: '412px'});
      } else if (wa == '500px') {
        $('.active_line').animate({left: '515px'});
      } else {
        $('.active_line').animate({left: wa});
      }
    }
  }
</script>

<style scoped lang="scss">
  .no_record {
    font-size: 20px;
    color: #CCCCCC;
    text-align: center;
    margin-top: 20px;
  }

  .my_order .view_place .wh_box {
    top: 52%;
  }

  .my_order .view_place .wh_box .view {
    height: 580px;
    min-width: 620px;
  }

  .my_order .view_place .wh_box .view .detail .des .flr .times .des_t {
    width: 470px;
  }

  .sp_r {
    float: right;
    font-size: 12px;
    color: #3975F7;
    margin-right: 30px;
    cursor: pointer;
  }

</style>
