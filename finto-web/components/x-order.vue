<template>
  <el-table :data="productList" class="order-table row-hover-disabled x-order"
            header-row-class-name="tab-title" :highlight-current-row="false"
            v-if="productList.length>0">
    <el-table-column label="商品情報" width="350px">
      <template slot-scope="scope">
        <div class="product-detail clearfix">
          <div class="left product-img">
            <img :src="scope.row.imageUrl" alt="">
          </div>
          <div class="left product-desc">
            <p>{{scope.row.goodsName}}</p>
          </div>
        </div>
        <div class="product-flow delivery" v-if="hashOrder">
          <img src="../assets/images/icon_peisong_normal@2x.png" alt="" v-if="scope.row.serviceType===1">
          <img src="../assets/images/icon_tuoguan_normal@2x.png" alt="" v-else>
          <span class="interflow">{{scope.row.serviceType===1?'配送料':'セットアップ費'}}
          </span>
          <el-popover width="200" trigger="hover" placement="bottom">
            <img slot="reference" src="../assets/images/weihuzhong_jieshi.svg" alt="">
            <span>{{scope.row.serviceType===1?'ご指定の住所に配送する送料となります。関税などの税金に関する費用はお客様のご負担にてお願い申し上げます。':'マイニングサービスをご希望いただいた場合、メーカーからマイニングファームまでの配送や１台１台の機器の配置、設定、テストなど、マイニングをスタートするに当たり必要な作業をお客様に代わって行っております。これらスタート諸費用をセットアップ費として頂戴しております。'}}</span>
          </el-popover>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="出荷時期" v-if="hashOrder">
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
    <el-table-column label="スタート日" v-else>
      <template slot-scope="scope">
        <div class="product-times">
          <p v-if="scope.row.deliveryTimeType === 2">{{scope.row.deliveryTime | date('YYYY年M月D日')}}</p>
          <p v-if="scope.row.deliveryTimeType === 0">翌日受渡し</p>
          <p v-if="scope.row.deliveryTimeType === 1">即時受渡し</p>
        </div>
      </template>
      <div class="product-flow"></div>
    </el-table-column>
    <el-table-column label="単価" align="right" width="100px">
      <template slot-scope="scope">
        <div class="product-price">{{scope.row.goodsSalePrice|currency}}円</div>
        <div class="product-flow" v-if="hashOrder">{{scope.row.servicePrice|currency}}円</div>
      </template>
    </el-table-column>
    <el-table-column label="数量" width="180px" align="center">
      <template slot-scope="scope">
        <div class="product-num">
          <div class="num-box">
            {{scope.row.count}} {{scope.row.computingUnit}}
          </div>
        </div>
        <div class="product-flow" v-if="hashOrder">{{scope.row.count}}</div>
      </template>
    </el-table-column>
    <el-table-column label="合計" align="center" v-if="hashOrder">
      <template slot-scope="scope">
        <div class="product-money">{{scope.row.smallAmount|currency}}円</div>
        <div class="product-flow last">{{scope.row.serviceSmallAmount|currency}}円</div>
      </template>
    </el-table-column>
    <el-table-column label="小計" align="center" v-else>
      <template slot-scope="scope">
        <div class="product-money">{{scope.row.goodsSalePrice*scope.row.count|currency}}円</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: {
      productList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      hashOrder: {
        type: Boolean,
        default: () => {
          return true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .product-detail {
    margin-left: 30px;
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
    padding-top: 45px;
    font-size: 14px;
    color: #999;
    max-width: 180px;
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

  .product-times {
    min-height: 100px;
    max-width: 100px;
    text-align: center;
    font-size: 14px;
    color: #303030;
    padding-top: 45px;
  }

  .product-times p{
    white-space: nowrap;
  }

  .product-time p{
    white-space: nowrap;
  }

  .product-price {
    min-height: 100px;
    padding-top: 45px;
  }

  .product-num {
    min-height: 100px;
    padding-top: 45px;
  }

  .text-center {
    text-align: center;
  }

  .product-money {
    min-height: 100px;
    padding-top: 46px;
  }

  .product-remove {
    min-height: 100px;
    padding-top: 48px;
  }

  .remove {
    font-size: 18px;
    cursor: pointer;
  }

  .product-flow {
    background: #F8F8F8;
    width: 100%;
    height: 48px;
    font-size: 14px;
    color: #303030;
    line-height: 48px;
    margin-top: 20px;
    >img{
      width:40px;
      vertical-align: middle;
      margin-left:32px;
      margin-right:48px;
    }
    &.last{
      width:80%;
      padding-left:50px;
    }
    &.delivery {
      margin-left: 30px;
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
