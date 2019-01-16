<template>
  <div class="container">
    <div class="cart-container" ref="container">
      <x-breadcrumb class="breadcrumb"/>
      <el-table :highlight-current-row="false" :data="productList" ref="productTable" class="tb-cart row-hover-disabled"
                @selection-change="handleSelectionChange" header-row-class-name="tb-title">
        <el-table-column type="selection" width="60px"/>
        <el-table-column label="商品情報" width="350px">
          <template slot-scope="scope">
            <div class="product-detail clearfix">
              <div class="left product-img">
                <img :src="scope.row.imageUrl" alt="">
              </div>
              <div class="left product-desc">
                <p>{{scope.row.goodsName}}</p>
                <p>{{scope.row.goodsSubTitle}}</p>
              </div>
            </div>
            <div class="product-flow">
              <img src="../../assets/images/icon_peisong_normal@2x.png" alt="" v-if="scope.row.buyType===1">
              <img src="../../assets/images/icon_tuoguan_normal@2x.png" alt="" v-else>
              <span class="interflow">{{scope.row.buyType===1?'配送料':'セットアップ費'}}</span>
              <el-popover width="200" trigger="hover" placement="bottom">
                <img slot="reference" src="../../assets/images/weihuzhong_jieshi.svg" alt="">
                <span>{{scope.row.buyType===1?'ご指定の住所に配送する送料となります。関税などの税金に関する費用はお客様のご負担にてお願い申し上げます。':'マイニングサービスをご希望いただいた場合、メーカーからマイニングファームまでの配送や１台１台の機器の配置、設定、テストなど、マイニングをスタートするに当たり必要な作業をお客様に代わって行っております。これらスタート諸費用をセットアップ費として頂戴しております。'}}</span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出荷時期">
          <template slot-scope="scope">
            <div class="product-time">
              <p>{{scope.row.startSendTime | date('YYYY年M月D日')}}</p>
              <p>-</p>
              <p>{{scope.row.endSendTime | date('YYYY年M月D日')}}</p>
            </div>
            <div class="product-flow"></div>
          </template>
          <div class="product-flow"></div>
        </el-table-column>
        <el-table-column label="単価" align="center">
          <template slot-scope="scope">
            <div class="product-price">{{scope.row.goodsUnitSalePrice|currency}}円</div>
            <div class="product-flow">{{scope.row.goodsUnitServicePrice|currency}}円</div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180px" align="center">
          <template slot-scope="scope">
            <div class="product-num">
              <div class="num-box">
                <span @click="minus(scope.row)">-</span>
                <input type="number" v-model="scope.row.count" @input="inputCartNum(scope.row)" :min="1">
                <span @click="plus(scope.row)">+</span>
              </div>
            </div>
            <div class="product-flow number">{{scope.row.count}}</div>
          </template>
        </el-table-column>
        <el-table-column label="合計" align="center">
          <template slot-scope="scope">
            <div class="product-money">{{scope.row.goodsSalePrice|currency}}円</div>
            <div class="product-flow">{{scope.row.goodsServicePrice|currency}}円</div>
          </template>
        </el-table-column>
        <el-table-column label="" align="center">
          <template slot-scope="scope">
            <p class="product-remove">
              <i class="el-icon-delete remove" @click="removeBefore(scope.row)"></i>
            </p>
            <div class="product-flow operation"></div>
          </template>
        </el-table-column>
      </el-table>
     <div style="height:60px;margin-top: 20px;margin-bottom: 80px;">
       <div class="summary summary-all" v-if="productList.length>0" :class="{'fixed':fixed==true}">
       <el-checkbox :indeterminate="isIndeterminate" v-model="selectedAll">すべて選択</el-checkbox>
       <el-button class="submit" type="primary" @click="submitOrder">ご購入へ</el-button>
       <div class="summary-content">
         <span>合計<em>{{cartInfo.totalNumber}}</em>点</span>
         <span>合計金額：<em>{{cartInfo.total|currency}}円</em></span>
       </div>
     </div>
     </div>
    </div>
    <x-features/>
    <el-dialog title="削除" width="420px" :visible.sync="removeDialog" class="custom">
      <span class="remove-infor">この商品を削除しますか</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="removeDialog = false">いいえ</el-button>
            <el-button type="primary" @click="remove">はい</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import XFeatures from '../../components/x-features';
  import CartAPI from '../../services/cart-api';
  import OrderAPI from '../../services/order-api';
  import errorHandler from '../../services/error-handler';
  import * as debounce from 'lodash.debounce';
  import XBreadcrumb from '../../components/x-breadcrumb';
  import {UPDATE_PRE_ORDER, UPDATE_CARTNUM} from '../../store/mutation-types';
  import {mapState} from 'vuex';

  export default {
    head() {
      return {
        title: 'カート_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    components: {
      XBreadcrumb,
      XFeatures
    },
    breadcrumb() {
      return {
        label: 'カート',
        parentsList: [
          {
            path: '/',
            label: 'マシン '
          }
        ]
      };
    },
    computed: {
      ...mapState(['token'])
    },
    data() {
      return {
        cartNum: null,
        productList: [],
        removeDialog: false,
        removeParams: {
          removeId: '',
          buyType: ''
        },
        cartInfo: {},
        // detailImgBaseUrl: '../../../static/images/products/',
        selectedItems: [],
        selectedAll: false,
        isIndeterminate: false,
        fixed:false,
      };
    },
    mounted() {
      window.addEventListener("scroll",this.scrollHandler)
      this.initPge();
    },
    methods: {
      initPge() {
        const vm = this;
        CartAPI.getCartList()
          .then(res => res || {})
          .then(res => {
            let productList = res.shoppingCartResponseList || [];
            this.cartInfo = res;
            productList.forEach(item => {
              item._limit = this.getLimitCount(item);
              item.subTotal = (item.goodsServicePrice || 0) + (item.goodsSalePrice || 0);
              if (item.check) {
                vm.selectedItems.push(item);
                // 等待页面渲染完成
                setTimeout(() => {
                  vm.$refs.productTable.toggleRowSelection(item, item.check);
                }, 100);
              }
            });
            this.isFixed();
            vm.productList = productList;
          })
          .catch(errorHandler);
      },
      isFixed(){
        const bodyHeight = document.body.offsetHeight;
        setTimeout(()=>{
          const tableHeight = this.$refs.productTable.$el.offsetHeight;
          if(bodyHeight- 80- 36<=tableHeight){
            this.fixed=true;
          }else{
            this.fixed=false;
          }
        },100)
      },
      scrollHandler(){
          const bodyHeight = document.body.offsetHeight;
          const scrollTop = document.documentElement.scrollTop || document.documentElement.scrollTop;
          const tableHeight = this.$refs.productTable.$el.offsetHeight;
          if(bodyHeight+scrollTop <=tableHeight+116+80){
            this.fixed = true;
          }else{
            this.fixed = false;
          }
      },
      getLimitCount(goodInfo = {}) {
        let min = goodInfo.buyLimit > -1 ? goodInfo.buyLimit : 1;
        min = +min;
        const arr = [];
        if (goodInfo.userlimit > -1) {
          arr.push(goodInfo.userlimit);
        }
        if (goodInfo.orderLimit > -1) {
          arr.push(goodInfo.orderLimit);
        }
        const max = Math.min.apply(null, arr);
        return {min, max};
      },
      removeBefore(item) {
        this.removeDialog = true;
        this.removeParams.removeId = item.id;
        this.removeParams.buyType=item.buyType;
      },
      remove() {
        const {buyType, removeId} = this.removeParams;
        CartAPI.delGoods(removeId, buyType).then(() => {
          this.$message.success('削除しました');
          const idx = this.productList.findIndex((item) => item.id === this.removeParams.removeId&&item.buyType=== this.removeParams.buyType);
          this.productList.splice(idx, 1);
          this.isFixed();
          this.updateTotal();
          this.removeDialog = false;
        }).catch(errorHandler)
      },
      updateTotal(){
        let total = 0;
        this.productList.forEach(item=>{
          total+= Number(item.count);
        });
        this.$store.commit(UPDATE_CARTNUM,total);
      },
      inputCartNum(item) {
        debounce(() => {
          if (item.count > item._limit.max) {
            item.count = item._limit.max;
          }
          if (item.count < item._limit.min) {

            item.count = item._limit.min;
          }
          this.updateCart(item);
          this.updateTotal();
        }, 1000)();
      },
      minus(item) {
        if (item.count > item._limit.min) {
          item.count--;
          this.updateCart(item);
          this.updateTotal()
        }
      },
      plus(item) {
        if (item.count < item._limit.max) {
          item.count++;
          this.updateCart(item);
          this.updateTotal()
        }
      },
      updateCart(item) {
        CartAPI.updateCount(item.id, item.count, item.buyType)
          .then(() => {
            item.goodsSalePrice = item.count * item.goodsUnitSalePrice;
            item.goodsServicePrice = item.count * item.goodsUnitServicePrice;
            item.subTotal = item.goodsServicePrice + item.goodsSalePrice;
          })
          .catch(() => {

          });
      },
      handleSelectionChange(val) {
        this.selectedItems = val;
        this.isIndeterminate = val.length > 0 && val.length !== this.productList.length;
        if (!this.isIndeterminate) {
          this.selectedAll = val.length === this.productList.length;
        }
        debounce(() => {
          this.productList.forEach(item => {
            const isSelected = val.some(selected => selected.id === item.id && selected.buyType === item.buyType);
            if (item.check !== isSelected) {
              item.check = isSelected;
              this.updateCart(item);
            }
          });
        }, 500)();
      },
      submitOrder() {
        const vm = this;
        if (vm.selectedItems.length < 1) {
          return vm.$alert('商品を選んでません')
            .catch(err => {
            });
        }
        const params = {};
        params.token = this.token;
        const orderGoodsVos = [];
        this.selectedItems.forEach(item => {
          if (item.count > item._limit.max) {
            return vm.$alert(`${item.goodsName}購入上限を超えました`)
              .catch(err => {
              });
          }
          if (item.count < item._limit.min) {
            return vm.$alert(`${item.goodsName}購入最低限${item._limit.min}`)
              .catch(err => {
              });
          }
          orderGoodsVos.push({
            'batchGoodsId': item.id,
            'goodsCount': item.count,
            'serviceType': item.buyType
          });
        });
        params.orderGoodsVos = orderGoodsVos;
        OrderAPI.create(params).then(res => {
          this.$store.commit(UPDATE_PRE_ORDER, res);
          this.$router.push({
            path: '/cart/preorder?source=cart'
          });
        }).catch(errorHandler);
      }
    },
    destroyed(){
        window.removeEventListener("scroll",this.scrollHandler)
    },
    watch: {
      selectedAll(val) {
        if (val) {
          this.productList.forEach(item => {
            this.$refs.productTable.toggleRowSelection(item, true);
          });
        } else {
          this.$refs.productTable.clearSelection();
        }

      },
      productList: {
        handler() {
          let total = 0;
          let count = 0;
          this.productList.forEach(item => {
            if (item.check) {
              total += item.subTotal;
              count += +item.count;
            }
          });
          this.cartInfo.totalNumber = count;
          this.cartInfo.total = total;
        },
        deep: true
      },
    }
  };
</script>

<style scoped lang="scss">
  .tb-cart {
    background: #fff;
    height:100%;
  }

  .container {
    height: 100%;
    background-color: #f6f6f6;
  }

  .cart-container {
    max-width: 1200px;
    margin: 0 auto 60px;
    min-height: calc(100vh - 160px - 188px - 114px - 60px);
  }

  .product-detail {
    position: relative;
    min-height: 100px;
    padding-right: 20px;
    .product-img {
      width: 100px;
      height: 100px;
      text-align: center;
      border: 1px solid #EDEEF0;
      margin-right: 20px;
      padding-top: 20px;
    }
    .product-img img {
      width: 100%;
      max-height: 80%;
      vertical-align: middle;
    }
  }

  .product-desc {
    height: 100px;
    padding-top: 25px;
    font-size: 14px;
    color: #999;
    max-width: 190px;
  }

  .product-desc p:first-child {
    font-weight: bold;
    color: #303030;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
  }

  .product-desc p:last-child {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 17px;
  }

  .product-time {
    min-height: 100px;
    max-width: 100px;
    text-align: center;
    font-size: 14px;
    color: #303030;
    padding-top: 27px;
  }

  .product-time p {
    white-space: nowrap;
  }

  .product-price {
    min-height: 100px;
    padding-top: 45px;
    color: #303030;
    & + .product-flow{
      color: #303030;
    }
  }

  .product-num {
    min-height: 100px;
    padding-top: 38px;
  }

  .num-box {
    position: relative;
    display: inline-block;
    margin-right: 1em;
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

  .text-center {
    text-align: center;
  }

  .product-money {
    min-height: 100px;
    padding-top: 46px;
    color: #303030;
    & + .product-flow{
      color: #343535;
    }
  }

  .product-remove {
    min-height: 100px;
    padding-top: 48px;
  }

  .remove {
    font-size: 18px;
    cursor: pointer;
  }

  .summary {
    width:1200px;
    line-height: 60px;
    background-color: #fff;
    padding-left: 1em;
    overflow: hidden;
  }
  .summary.fixed{
    position: fixed;
    bottom:0;
    z-index: 999;
  }
  .summary-content {
    float: right;
    padding-left: 2em;
    padding-right: 2em;
    font-size: 14px;
  }

  .summary-content em {
    font-style: normal;
    color: #fc5f02;
    margin-left: 3px;
    margin-right: 3px;
  }

  .summary-content span:last-child {
    margin-left: 2em;
  }

  .submit {
    box-sizing: border-box;
    float: right;
    height: 100%;
    padding: 0 3em;
    border-radius: 0;
    line-height: 60px;
    border: 0;
    font-size: 18px;
  }

  .product-flow {
    background: #F8F8F8;
    width: 100%;
    height: 48px;
    line-height: 48px;
    margin-top: 20px;
    &.number{
      padding-left:80px;
      color: #343535;
    }
    &.operation{
      width:70%;
    }
    > img {
      width: 40px;
      vertical-align: middle;
      margin: 0 48px 0 32px;
    }
    .interflow {
      vertical-align: middle;
      margin-right: 10px;
      color: #303137;
    }
    .el-popover__reference {
      vertical-align: middle;
    }
  }

  .remove-infor {
    font-size: 14px;
    color: #333333;
  }
</style>
<style lang="scss" scoped>
  .tb-title .cell {
    font-weight: bold;
    color: #303030;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }

  .el-table__row .cell {
    padding: 0;
  }
</style>

