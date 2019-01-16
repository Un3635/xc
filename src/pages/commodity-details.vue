<template>
  <div class="momdetails">
    <view-box body-padding-top="46px" body-padding-bottom="48px">
      <x-header :left-options="{backText: ''}" slot="header" class="custom-header home-header">
        <div class="topbar">
          <div :class="{'topbar-checked': topbarOptions === 0}" @click="topbarOptionsClick(0)">商品 <span
            v-if="topbarOptions === 0"></span></div>
          <div :class="{'topbar-checked': topbarOptions === 1}" @click="topbarOptionsClick(1)">详情 <span
            v-if="topbarOptions === 1"></span></div>
          <div :class="{'topbar-checked': topbarOptions === 2}" @click="topbarOptionsClick(2)">参数 <span
            v-if="topbarOptions === 2"></span></div>
        </div>
        <!--<div class="header-img header-rightImg" slot="right">-->
        <!--<img src="../assets/images/share.png" alt="分享">-->
        <!--</div>-->
      </x-header>
      <div v-show="topbarOptions === 0">
        <div class="momImg">
          <img :src="firstSrc" alt="">
        </div>
        <div class="cell"></div>
        <div class="momContent">
          <div class="mainTitle">
            <span v-if="Number(cartsArr.goodsIsNewName) === 1">全新</span>
            <span v-if="Number(cartsArr.goodsIsNewName) === 0">非全新</span>
            {{cartsArr.title}}
          </div>
          <div class="subTitle ellipsis">
            {{cartsArr.subtitle}}
          </div>
          <div class="money">
            <div class="zujin">
              租金<span v-for="sku in newSkuArr" v-if="checkSku == sku.productNo">
                <span v-for="(son,$son) in sku.leaseHolds" v-if="checkLeaseHold===son.goodInstallId">
                  <span>{{son.rent}}</span>
                </span>
              </span>元/月
            </div>
            <div class="yajin">押金
              <span v-for="sku in newSkuArr" v-if="checkSku == sku.productNo">
                {{sku.deposit || 0}}
              </span>元
            </div>
          </div>
          <div class="configureLabel">
            选择配置
          </div>
          <div class="configure">
            <div class="border" :class="{active: checkSku == sku.productNo}" v-for="sku in newSkuArr"
                 @click="changeSku(sku)">{{sku.skuName}}
            </div>
          </div>
          <div class="configureLabel">
            租赁方式
          </div>
          <div class="hire" v-for="(sku,$index) in newSkuArr" v-if="sku.productNo===checkSku">
            <div class="border" v-for="(son,$son) in sku.leaseHolds"
                 :class="{active:son.goodInstallId === checkLeaseHold}"
                 @click="changeNewSku(son)">
              <div><span>{{son.leaseholdTypeValue}}</span></div>
              <div><span>{{son.tenancyTermValue}}个月</span></div>
            </div>
          </div>
          <!--<div class="hireMachine">-->
          <!--租机数量-->
          <!--<div>-->
          <!--<span @click="number>1?number&#45;&#45;:number=1"></span><span>{{number}}</span><span @click="number++"></span>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div v-show="topbarOptions === 1">
        <load-more tip="正在加载" :show-loading="true" background-color="#fbf9fe" v-if="play"></load-more>
        <div class="detailImg" v-html="detailArr" v-else>
        </div>
      </div>
      <div v-show="topbarOptions === 2">
        <div class="parameter"
             v-if="parameterArr.length !== 0 && parameterArr !== 'undefined' && parameterArr !== '' && parameterArr !== null">
          <div class="detailcs-box">
            <div class="detailcs" v-for="par in parameterArr">
              <div class="parameterName">{{par.parameterName}}</div>
              <div class="itemAttributeVos">
                <div class="content" v-for="son in par.itemAttributeVos">
                  <div class="attributeName">{{son.attributeName}}</div>
                  <div class="attributeValue">{{son.attributeValue}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>

<script>
  import FooterNav from './components/footer';
  import {LoadMore} from 'vux';
  import ProductAPI from '../services/product-api';
  // import currency from '../filters/currency';
  export default {
    data() {
      return {
        topbarOptions: 0,
        configureOptions: 0,
        hireOptions: 0,
        number: 1,
        firstSrc: '',
        goodsNo: '',
        cartsArr: [],
        newSkuArr: [],
        checkSku: '',
        checkLeaseHold: '',
        num: 1,
        detailArr: '',
        parameterArr: [],
        leaseholdTypeName: '',
        play: true,
        loadingDetail: true
      };
    },
    methods: {
      topbarOptionsClick(typeId) {
        this.topbarOptions = typeId;
        if (typeId === 1 && this.loadingDetail) {
          this.loadingDetail = false;
          this.getDetailInfo();
        }
      },
      getInfos() {
        this.goodsNo = this.$route.query.id;
        ProductAPI.commodityInfo(this.goodsNo).then(res => {
          this.cartsArr = res;
          this.newSkuArr = this.getNewSkuArr(res.skuInfos, this.cartsArr);
        });
      },
      getDetailInfo() {
        ProductAPI.commodityDetail(this.goodsNo).then(res => {
          this.play = false;
          this.detailArr = res;
        });
      },
      getNewSkuArr(data, res) {
        let arr = {};
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let text = item['productNo'];
          arr[text] = item;
          if (res.defaultInatallment !== null && res.defaultInatallment !== '' && res.defaultInatallment !== 'undefined') {
            for (let j = 0; j < item.leaseHolds.length; j++) {
              let leaseHolds = item.leaseHolds[j];
              if (res.defaultInatallment === leaseHolds.goodInstallId) {
                this.checkSku = item.productNo;
                this.checkLeaseHold = res.defaultInatallment;
                this.firstSrc = item.skuImageUrl;
                this.getParameter(this.checkSku);
              }
            }
          } else {
            if (i === 0) {
              this.checkSku = text;
              this.checkLeaseHold = item['leaseHolds'][0]['goodInstallId'];
              this.firstSrc = res.urls[0];
              this.getParameter(this.checkSku);
            }
          }
        }
        return arr;
      },
      changeSku(sku) {
        this.firstSrc = sku.skuImageUrl;
        this.num = 1;
        this.checkSku = sku.productNo;
        let data = sku.leaseHolds;
        this.checkLeaseHold = data[0].goodInstallId;
        this.getParameter(this.checkSku);
      },
      changeNewSku(son) {
        this.checkLeaseHold = son.goodInstallId;
      },
      getParameter(pId) {
        ProductAPI.commodityParameter(pId).then(res => {
          if (res.data.code === '1000') {
            this.parameterArr = res.data.data;
          }
        });
      }
    },
    activated() {
      this.parameterArr = [];
      this.topbarOptions = 0;
      this.getInfos();
      this.loadingDetail = true;
    },
    components: {
      FooterNav,
      LoadMore
    }
  };
</script>

<style lang="scss" scoped>
  .momdetails {
  }

  .home-header {
    /*box-shadow: none;*/
  }

  .topbar {
    div {
      font-size: 16px;
      position: relative;
      display: inline-block;
      width: 30%;
      color: #666666;
      text-align: center;
      span {
        position: absolute;
        bottom: 6px;
        background: #1E1E51;
        width: 40%;
        left: 30%;
        height: 2px;
      }
    }
    div:first-child {
      float: left;
    }
    div:last-child {
      float: right;
    }
    .topbar-checked {
      color: #1E1E51;
    }
  }

  .hireMachine {
    color: #666666;
    font-size: 14px;
    margin-top: 11px;
    margin-bottom: 60px;
    div {
      display: inline-block;
      margin-left: 74px;
      > span:first-child {
        height: 20px;
        width: 20px;
        display: inline-block;
        background: url("../assets/images/numberjian.png");
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: 5px;
      }
      > span:nth-of-type(2) {
        font-size: 12px;
        color: #666666;
      }
      > span:last-child {
        height: 20px;
        width: 20px;
        display: inline-block;
        background: url("../assets/images/numberadd.png");
        background-size: 100% 100%;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }

  .header-img {
    height: 20px;
    width: 20px;
  }

  .momImg {
    width: 100%;
    text-align: center;
    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    & ~ .cell {
      height: 5px;
      background: #f2f2f2;
      display: block;
    }
  }

  .momContent {
    padding: 10px;
    .mainTitle {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      span {
        background: #1E1E51;
        color: #ffffff;
        border-radius: 8px;
        padding: 1px 10px;
        vertical-align: middle;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .subTitle {
      color: #FF2727;
      font-size: 12px;
      margin-top: 3px;
    }
    .money {
      color: #666666;
      margin-top: 6px;
      font-size: 14px;
      div {
        display: inline-block;
        span {
          margin-left: 6px;
          margin-right: 3px;
        }
      }
      div:first-child > span {
        color: #FF2727;
        font-size: 16px;
      }
      div:last-child {
        float: right;
      }
    }
    .configureLabel {
      color: #666666;
      font-size: 14px;
      margin-top: 13px;
    }

    .configure {
      font-size: 14px;
      margin-top: 11px;
      display: flex;
      flex-wrap: wrap;
      .border {
        padding: 2px 9px;
        text-align: center;
        margin-right: 14px;
        margin-bottom: 10px;
        color: #666666;
        border: 1px solid #666666;
        border-radius: 8px;
        &.active {
          border-color: #1E1E51 !important;
          color: #1E1E51 !important;
        }
      }
    }

  }

  .hire {
    margin-top: 11px;
    flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    .border {
      padding: 5px 10px;
      margin-right: 28px;
      margin-bottom: 10px;
      color: #979797;
      border: 1px solid #979797;
      border-radius: 8px;
      text-align: center;
      &.active {
        border-color: #1E1E51 !important;
        color: #1E1E51 !important;
      }
    }
  }

  .detailImg {
    width: 100%;
    text-align: center;
    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

  .parameter {
    padding: 14px 8px 0 7px;
  }

  .detailcs-box {
    border: 1px solid #E2E2E2;
    width: 100%;
  }

  .detailcs {
    border-bottom: 1px solid #E2E2E2;
    display: flex;
    &:last-child {
      border: none;
    }
    .parameterName {
      color: #666;
      flex: 0 0 90px;
      padding: 7px 19px;
      font-size: 14px;
      line-height: 20px;
      font-weight: bolder;
    }
    .itemAttributeVos {
      flex: 1;
    }
    .content {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      display: flex;
      .attributeName {
        flex: 0 0 90px;
        padding: 7px;
      }
      .attributeValue {
        flex: 1 1 auto;
        padding: 7px;
      }
    }
  }
</style>
