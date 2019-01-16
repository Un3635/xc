<template>
  <div class="my_order">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="tab">
        <span class="tab_sp" v-for="(item,index) in tab">
           <span class="sp_t" :class="{active:index==is_active}" @click="tabToggle(item,index)">{{item}}</span>
        </span>
      </div>
      <div class="active_line">
      </div>
      <div class="main">
        <table>
          <tr style="line-height: 55px">
            <td width="189">商品</td>
            <td width="140">商品金额</td>
            <td width="140">支付详情</td>
            <td width="140">订单详情</td>
            <td width="139">租期</td>
            <td width="84">审核状态</td>
            <td width="86">操作</td>
          </tr>
        </table>
        <div class="order_all" v-for="item in tableData">
          <div class="main_order td_title">
            <span class="name">订单号</span>
            <span class="num num_one" style="margin-right: 43px;">{{item.orderNo}}</span>
            <span class="name">下单时间</span>
            <span class="num"> {{item.createTime}} </span>
            <span class="name">订单金额 </span>
            <span class="num">{{item.orderTotalPrice}}元</span>
          </div>
          <div class="child_orders" v-for="child in item.childOrderList">
            <table>
              <tbody>
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
                    <span v-if="item.approvalStatus ==0||item.approvalStatus === null">不需要审批</span>
                    <span v-if="item.approvalStatus ==1">待审批</span>
                    <span v-if="item.approvalStatus ==2">审批通过</span>
                    <span v-if="item.approvalStatus ==3">审批拒绝</span>
                  </div>
                  <div style="margin-top: 25px;" class="fail_reason">
                    <span>{{item.failReason}}</span>
                  </div>
                </td>
                <td class="go_btn" width="86">
                  <div class="lookAudit" @click="$router.push({path:'/lookApproval',query:{id:item.approvalId}})">查看审核</div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--无相关结果-->
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
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import pagination from '../x-pagination'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  export default {
    components: {
      plugin_title: plugin_title,
      pagination: pagination,
    },
    name: 'applyOrder',
    data(){
      return {
        noRecord: false,
        order_status: -1,
        tableData: [],
        pageData: {
          total: 1,
          currentPage: 1,
          pageSizes: 5
        },
        token: '',
        parentMsg: '我的申请',
        tab: [
          '待审批', '审批通过', '审批拒绝', '全部审批'
        ],
        is_active: 3,
      }
    },
    methods: {
      listenToChild(){
        this.getMyOrder();
      },
      tabToggle(item, index){
//         -1全部需要审批的订单 0:不需要审批;1:待审批;2:通过审批;3.拒绝审批
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
          this.order_status = -1;
        }
        this.is_active = index;
        var wd = 100;
        var wa = wd * index + 'px';
        if (this.is_active == 0) {
          var wa = 100 * (this.is_active) + 'px';
          $('.active_line').animate({left: wa});
        } else {
          var wa = 100 * (this.is_active) + 6 + 'px';
          $('.active_line').animate({left: wa});
        }
        this.getMyOrder();
      },
      getMyOrder(){
        //0:待审核 1:通过 2:拒绝
        var obj = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          approvalStatus: this.order_status,
          initTime: new Date().getTime()
        };
        var vm = this;
        this.$http.get('myorder/infos', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;
            vm.tableData = res.data.searchVos;
//主订单：1.待支付2.支付确认中3.支付成功4.支付失败
//            child_orders_merge 合并
            for (var i = 0; i < vm.tableData.length; i++) {
              vm.tableData[i].orderTotalPrice = allMethods.fmoney(vm.tableData[i].orderTotalPrice, 2);
              for (var k = 0; k < vm.tableData[i].childOrderList.length; k++) {
//                vm.tableData[i].childOrderList[k].orderTotalPrice=allMethods.fmoney(vm.tableData[i].childOrderList[k].orderTotalPrice,2);
                vm.tableData[i].childOrderList[k].orderMonthPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderMonthPrice, 2);
                vm.tableData[i].childOrderList[k].orderGoodsDeposit = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderGoodsDeposit, 2);
                vm.tableData[i].childOrderList[k].orderDeposit = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderDeposit, 2);
                vm.tableData[i].childOrderList[k].orderActualTotalPrice = allMethods.fmoney(vm.tableData[i].childOrderList[k].orderActualTotalPrice, 2);
              }
            }
            if (res.data.searchVos.length == 0) {
              vm.noRecord = true;
            } else {
              vm.noRecord = false;
            }
          } else if (Number(res.code) === 3000) {
            vm.noRecord = true;
          }
        })
      },
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      this.getMyOrder();
    },
    mounted(){
//  初始化位置
      var wa = 100 * (this.is_active) + 15 + 'px';
      $('.active_line').animate({left: wa});
    }
  }
</script>

<style scoped lang="scss">
  .lookAudit {
    font-size: 12px;
    color: #3975F7;
    cursor: pointer;
  }

  .main_order {
    border-bottom: none !important;
  }
</style>
