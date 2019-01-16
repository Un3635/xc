<template>
  <div class="home">
    <view-box ref="viewBox" body-padding-top="78px" body-padding-bottom="48px">
      <x-header slot="header" :left-options="{showBack: false}" class="custom-header home-header">
        <div class="header-logo" slot="overwrite-left">
          <img src="../assets/images/logo@2x.png" alt="">
        </div>
        <div class="tab">
          <div class="tabItem" v-for="item in nav" :key="item.name" :class="{active: routerName == item.path}"
               @click="changeTab(item.path)">
            {{item.name}}
          </div>
        </div>
      </x-header>
      <router-view :routerName="routerName" :name="routerName" @changeTab="changeTab" />
      <footer-nav slot="bottom"></footer-nav>
    </view-box>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux';
  import FooterNav from './components/footer.vue';

  export default {
    data() {
      return {
        routerName: 'hot',
        nav: [
          {
            name: '热销',
            path: 'hot'
          },
          {
            name: '行政',
            path: 'xingZheng'
          },
          {
            name: '技术开发',
            path: 'jiShu'
          },
          {
            name: '图形处理',
            path: 'tuXing'
          },
          {
            name: '便携',
            path: 'bianXie'
          },
          {
            name: '配件',
            path: 'peiJian'
          }
        ]
      };
    },
    components: {
      Tab,
      TabItem,
      FooterNav
    },
    methods: {
      changeTab(path) {
        if (path === this.routerName) return;
        this.$refs['viewBox'].scrollTo(0);
        this.routerName = path;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .home-header {
    box-shadow: none;
  }

  .header-logo {
    width: 100px;
    position: relative;
    left: -7px;
    top: -6px;
  }

  .tab {
    background: #fff;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 11px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.10);
    .tabItem {
      padding: 5px 0;
      font-size: 14px;
      line-height: 20px;
      color: #999999;
      &.active {
        border-bottom: 2px solid #1E1E51;
        color: #030303;
      }
    }
  }
</style>
