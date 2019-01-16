<template>
  <div class="order">
    <view-box body-padding-top="46px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">我的订单
      </x-header>
      <div class="no-order" v-if="!orderData||orderData.length===0">
        <img src="../../../assets/images/zanwudingdan_normal@2x.png" alt="">
        <div class="text">暂无订单</div>
      </div>
      <div class="order-table" v-else>
        <div class="order-header">
          <div class="header-wrap">
            <div class="tab-item" v-for="(item,index) in tabList" :class="{'active':selected===item}" @click="selected=item" :key="index">
              {{item.label}}
            </div>
          </div>

        </div>
      </div>
    </view-box>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        orderData: ['asdfads'],
        selected: {},
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
        ]
      };
    },
    mounted() {
      let selected = this.$route.query.selected ? selected : 0;
      this.selected = this.tabList[selected];
    }
  };
</script>

<style lang="scss" scoped>
  .order {

  }

  .order-table {
    width: 100%;
    height: 100%;
  }

  .order-header {
    width: 100%;
    height: 44px;
    .header-wrap {
      width: auto;
      height: 100%;
      list-style-type: none;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .tab-item {
      width: auto;
      height: 100%;
      line-height: 44px;
      font-size: 14px;
      color: #969699;
      padding: 0 12px;
      -webkit-box-flex: 1;
      -webkit-flex: 1 0 auto;
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
    }
    .tab-item.active {
      color: #303137;
    }
  }

  .no-order {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100px;
      position: relative;
      margin: 0 auto;
      margin-top: 30%;
      display: block;
    }
    .text {
      font-size: 16px;
      color: #606166;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>

<style>
  .tab-head {
    list-style-type: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #FF4878;
    padding: 0;
    overflow: auto;
  }

  .tab-head-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1 0 auto;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    color: white;
    padding: 0 5px;
  }
</style>
