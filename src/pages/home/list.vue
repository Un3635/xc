<template>
  <scroller class="list scroller" v-if="isRender" height="-126" lock-x ref="scroller"
            @on-pullup-loading="onPullupLoading"
            :use-pullup="true" :pullup-config="pullupConfig">
    <div class="inner-scroller">
      <div class="banner">
        <img :src="bannerList[routerNameArr.indexOf(routerName) % 3]" alt="">
      </div>
      <x-list :title="getTabName()" :productList="productList"></x-list>
    </div>
  </scroller>
</template>

<script>
  import XList from '../components/x-list.vue';
  import SearchAPI from '../../services/search-api';
  import {isClient} from '../../plugins/utils';

  export default {
    data() {
      return {
        isRender: false,
        dictionarie: {},
        productList: [],
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
        },
        bannerList: [
          require('../../assets/images/270x750ver1.jpg'),
          require('../../assets/images/270x750ver2.jpg'),
          require('../../assets/images/270x750ver3.jpg')
        ],
        routerNameArr: ['xingZheng', 'jiShu', 'tuXing', 'bianXie', 'peiJian']
      };
    },
    components: {
      XList,
      Scroller: () => {
        if (isClient) {
          return import('vux/src/components/scroller/index');
        }
      }
    },
    props: {
      routerName: {
        type: String,
        default: 'hot'
      }
    },
    watch: {
      routerName: {
        handler(val) {
          this.initPage();
          this.getProductList()
            .then(() => {
              this.$nextTick(() => {
                this.$refs.scroller.enablePullup();
                this.$refs.scroller.reset({top: 0});
              });
            });
        }
      }
    },
    created() {
      this.getCategory();
    },
    mounted() {
      this.isRender = true;
    },
    methods: {
      getTabName() {
        const nameArr = ['行政办公', '技术开发', '图形处理', '商务便携', '机器配件'];
        return nameArr[this.routerNameArr.indexOf(this.routerName)];
      },
      initPage() {
        this.page = {currentPage: 0, totalPage: 0, pageSize: 10};
      },
      getCategory() {
        SearchAPI.searchParam()
          .then(res => {
            this.dictionarie = this.getDictionarie(res.infos.slice(0));
            this.getProductList();
          });
      },
      getDictionarie(data) {
        let arr = {};
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          arr[item['searchParam']] = item;
          item['subParamsCopy'] = {};
          for (let j = 0; j < item['subParams'].length; j++) {
            let itemson = item['subParams'][j];
            item['subParamsCopy'][itemson['detailName']] = itemson;
          }
        }
        return arr;
      },
      getProductList() {
        let params = {
          pageNum: ++this.page.currentPage,
          pageSize: this.page.pageSize
        };
        params.sceneId = this.dictionarie['sceneId']['subParamsCopy'][this.getTabName(this.routerName)]['id'];
        return SearchAPI.searchExecute(params)
          .then(res => {
            this.page.totalPage = Math.ceil(res.count / this.page.pageSize);
            this.productList = this.page.currentPage === 1 ? res.searchVos : this.productList.concat(res.searchVos);
            if (this.$refs.scroller) {
              this.$refs.scroller.donePullup();
            }
          });
      },
      onPullupLoading() {
        if (this.page.totalPage <= this.page.currentPage) {
          this.$refs.scroller.disablePullup();
          return;
        }
        this.getProductList();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list {
    background: #f2f2f2;
  }

  .banner {
    width: 100%;
    background: #fff;
    img{
      display: block;
      margin:0 auto;
    }
  }
</style>
