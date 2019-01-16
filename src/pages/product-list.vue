<template>
  <view-box class="product-list" ref="viewBox" body-padding-top="0px" body-padding-bottom="48px">
    <scroller v-if="isRender" height="-46" lock-x ref="scroller"
              @on-pullup-loading="onPullupLoading"
              :use-pullup="true" :pullup-config="pullupConfig">
      <x-list :title="title" :productList="productList"></x-list>
    </scroller>
    <footer-nav slot="bottom"></footer-nav>
  </view-box>
</template>
<script>
  import XList from './components/x-list.vue';
  import {isClient} from '../plugins/utils';
  import SearchAPI from '../services/search-api';
  import FooterNav from './components/footer.vue';

  export default {
    data() {
      return {
        isRender: false,
        dictionarie: {},
        productList: [],
        title: '全部商品',
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '释放加载更多',
          upContent: '上拉加载更多',
          loadingContent: '<p><i class="weui-loading"></i> 加载中...</p>'
        },
        page: {
          currentPage: 0,
          totalPage: 0,
          pageSize: 10
        }
      };
    },
    components: {
      XList,
      FooterNav,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    },
    mounted() {
      this.isRender = true;
      this.onPullupLoading();
    },
    methods: {
      onPullupLoading() {
        if (this.page.totalPage <= this.page.currentPage && this.page.currentPage !== 0) {
          this.$refs.scroller.disablePullup();
          return;
        }
        this.getProductList();
      },
      getProductList() {
        let params = {
          pageNum: ++this.page.currentPage,
          pageSize: this.page.pageSize
        };
        return SearchAPI.searchExecute(params)
          .then(res => {
            this.page.totalPage = Math.ceil(res.count / this.page.pageSize);
            this.productList = this.page.currentPage === 1 ? res.searchVos : this.productList.concat(res.searchVos);
            if (this.$refs.scroller) {
              this.$refs.scroller.donePullup();
            }
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .product-list {
    padding-bottom: 2px;
    background: #f2f2f2;
  }
</style>
