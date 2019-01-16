<template>
  <div class="container">
    <div class="cart-container">
      <x-breadcrumb class="breadcrumb"/>
      <el-table :highlight-current-row="false" :data="productList" ref="productTable" class="tb-cart row-hover-disabled"
                @selection-change="handleSelectionChange" header-row-class-name="tb-title">
        <el-table-column type="selection"/>
        <el-table-column label="商品信息" width="350">
          <template slot-scope="scope">
            <div class="product-info">
              <div class="product-img">
                <img :src="scope.row.imageUrl" alt="">
              </div>
              <div class="product-desc">
                <p>{{scope.row.goodsName}}</p>
                <p>{{scope.row.goodsSubTitle}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">
            <div class="send-time">
              <p>{{scope.row.startSendTime | date('YYYY年M月D日')}}</p>
              <p>-</p>
              <p>{{scope.row.endSendTime | date('YYYY年M月D日')}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <div class="num-box">
              <span @click="minus(scope.row)">-</span>
              <input type="number" v-model="scope.row.count" @input="inputCartNum(scope.row)" title="" :min="1">
              <span @click="plus(scope.row)">+</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小计" prop="subTotal" align="right">
          <template slot-scope="scope">
            <p>{{scope.row.subTotal | currency}}元</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p>
              <i class="el-icon-delete remove" @click="remove(scope.row)"></i>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="summary" v-if="productList.length>0">
        <el-checkbox :indeterminate="isIndeterminate" v-model="selectedAll">全选</el-checkbox>
        <el-button class="submit" type="primary" @click="submitOrder">立即下单</el-button>
        <div class="summary-content">
          <span>已选择商品<em>{{cartInfo.totalNumber}}</em>件</span>
          <span>&emsp;商品总金额：<em>{{cartInfo.total | currency}}元</em></span>
        </div>
      </div>
    </div>
    <x-features/>
  </div>
</template>

<script>
  import CartAPI from '../../services/cart-api';
  import {UPDATE_BREADCRUMB, UPDATE_PRE_ORDER, UPDATE_CARTNUMBER} from '../../store/mutation-types';
  import XFeatures from '../../components/x-features';
  import errorHandler from '../../services/error-handler';
  import * as debounce from 'lodash.debounce';
  import OrderAPI from '../../services/order-api';
  import XBreadcrumb from '../../components/x-breadcrumb';

  export default {
    breadcrumb() {
      return {
        label: '购物车',
        parentsList: [
          {path: '/', label: '首页'}
        ]
      };
    },
    components: {
      XBreadcrumb,
      XFeatures
    },
    data() {
      return {
        productList: [],
        cartInfo: {},
        selectedItems: [],
        selectedAll: false,
        isIndeterminate: false,
        from: null
      };
    },
    methods: {
      initPage() {
        const vm = this;
        CartAPI.get()
          .then(res => res || {})
          .then(res => {
            let productList = res.shoppingCartResponseList || [];
            this.cartInfo = res;
            productList.forEach((item) => {
              item._price = item.subTotal / (item.count || 1);
              item._limit = this.getLimitCount(item);
              if (item.check) {
                vm.selectedItems.push(item);
                // 等待页面渲染完成
                setTimeout(() => {
                  vm.$refs.productTable.toggleRowSelection(item, item.check);
                }, 100);
              }
              if (this.from && item.id === +this.from.query.pId) {
                this.updateBreadCrumb(item.goodsName);
              }
            });
            vm.productList = productList;
          })
          .catch(errorHandler);
      },
      getLimitCount(goodsInfo = {}) {
        let min = goodsInfo.buyLimit > -1 ? goodsInfo.buyLimit : 1;
        min = +min;
        let arr = [];
        if (goodsInfo.userLimit > -1) { // 单人限制
          arr.push(+goodsInfo.userLimit);
        }
        if (goodsInfo.orderLimit > -1) { // 单笔限制
          arr.push(+goodsInfo.orderLimit);
        }
        const max = Math.min.apply(null, arr);
        return {min, max};
      },
      plus(item) {
        if (item.count < item._limit.max) {
          item.count++;
        }
        this.updateCart(item);
      },
      minus(item) {
        if (item.count > item._limit.min) {
          item.count--;
        }
        this.updateCart(item);
      },
      updateCart(item) {
        CartAPI.update(item.id, item.count, item.check)
          .then(() => {
            item.subTotal = item._price * item.count;
          })
          .catch(() => {
          });
      },
      inputCartNum(item) {
        debounce(() => {
          if (item.count > item._limit.max) {
            item.count = item._limit.max;
          }
          if (item.count < item._limit.min) {
            item.count = item._limit.min;
          }
          if (!/^[1-9]\d+$/.test(item.count)) {
            item.count = item._limit.min;
          }
          this.updateCart(item);
        }, 1000)();
      },
      remove(item) {
        CartAPI.remove(item.id)
          .then(() => {
            this.$message.success('移除成功');
            const idx = this.productList.findIndex(p => p.id === item.id);
            this.productList.splice(idx, 1);
          })
          .catch(errorHandler);
      },
      handleSelectionChange(val) {
        this.selectedItems = val;
        this.isIndeterminate = !(val.length === 0 || val.length === this.productList.length);
        if (!this.isIndeterminate) {
          this.selectedAll = val.length === this.productList.length;
        }
        debounce(() => {
          this.productList.forEach(item => {
            const isSelected = val.some(selected => selected.id === item.id);
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
          return vm.$alert('未选中任何商品')
            .catch(err => {
            });
        }
        const batchGoodsIds = [];
        const count = [];
        this.selectedItems.forEach(item => {
          if (item.count > item._limit.max) {
            return vm.$alert(`商品${item.goodsName}超过购买限制`)
              .catch(err => {
              });
          }
          if (item.count < item._limit.min) {
            return vm.$alert(`商品${item.goodsName}最低${item._limit.min}台起购`)
              .catch(err => {
              });
          }
          if (!/^[1-9]\d{0,2}$/.test(item.count + '')) {
            item.count = item._limit.min;
          }

          batchGoodsIds.push(item.id);
          count.push(item.count);
        });

        OrderAPI
          .create(batchGoodsIds, count)
          .then(res => {
            this.$store.commit(UPDATE_PRE_ORDER, res);
            this.$router.push({path: '/buy?source=cart'});
          })
          .catch(errorHandler);
      },
      updateBreadCrumb(label) {
        const breadcrumb = {
          label: '购物车',
          parentsList: [
            {path: '/', label: '首页'}
          ]
        };
        if (this.from) {
          breadcrumb.parentsList.push({
            path: this.from.fullPath,
            label: label
          });
        }
        this.$store.commit(UPDATE_BREADCRUMB, breadcrumb);
      }
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
          let selectedTotal = 0;
          let selectedCount = 0;
          let count = 0;
          this.productList.forEach(cartItem => {
            count += cartItem.count;
            if (cartItem.check) {
              selectedCount += +cartItem.count;
              selectedTotal += cartItem.subTotal;
            }
          });
          this.cartInfo.totalNumber = selectedCount;
          this.cartInfo.total = selectedTotal;
          this.$store.commit(UPDATE_CARTNUMBER, count);
        },
        deep: true
      }
    },
    mounted() {
      this.initPage();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from;
      });
    }
  };
</script>

<style scoped lang="scss">
  .tb-cart {
    background: #fff;
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

  .breadcrumb {
    line-height: 36px;
    background-color: #f6f6f6;
  }

  .product-info {
    padding-left: 120px;
    position: relative;
    min-height: 100px;
  }

  .product-img {
    position: absolute;
    border: 1px solid #EDEEF0;
    height: 100px;
    width: 100px;
    line-height: 98px;
    font-size: 0;
    left: 0;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 80%;
      vertical-align: middle;
      display: inline-block;
    }
  }

  .product-desc {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #999;
  }

  .product-desc p:first-child {
    font-weight: bold;
    margin-bottom: 10px;
    color: #303030;
  }

  .send-time {
    text-align: center;
    float: left;
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

  .remove {
    font-size: 18px;
    cursor: pointer;
  }

  .summary {
    margin-top: 20px;
    line-height: 60px;
    background-color: #fff;
    margin-bottom: 80px;
    padding-left: 1em;
    overflow: hidden;
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
</style>
<style lang="scss">
  .tb-title .cell {
    font-weight: bold;
    color: #303030;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }
</style>
