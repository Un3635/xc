<template>
  <div class="product-page">
    <div class="ad-banner">
      <img src="../assets/images/ad.png">
    </div>
    <div class="sorted clearfix">
      <div class="sorted-content clearfix">
        <div class="pro-select">
          <dl class="clearfix" v-for="(item, item_index) in categoryarr">
            <dt :data-name="item.searchParam">{{item.paramName}}：</dt>
            <div class="dd-list">
              <span v-for="(citem,$cindex) in categoryFilter" v-if="item.searchParam===$cindex">
                 <dd @click="changeFilter($cindex,'不限')" :class="{'active':citem==='不限'}">不限</dd>
                 <dd v-for="(list, list_index) in item.subParams" v-if="item.searchParam==$cindex"
                     @click="changeFilter($cindex,list.detailName)"
                     :class="{'active':citem===list.detailName}">{{list.detailName}}
              </dd>
              </span>
            </div>
          </dl>
          <div class="has-selected">
            <span class="has-selected-txt">当前筛选&nbsp;&gt;</span>
            <div class="filter-tab" v-for="item in categoryFilter">
              <div v-if="item!== '不限'" class="filter-tab-one">
                <span>{{item}}</span>
                <div class="filter-tab-close" @click="delFilter(item)"><img src="../assets/images/icon_close.png">
                </div>
              </div>
            </div>
            <div class="filter-tab" v-if="keyWord!=''">
              <div class="filter-tab-one">
                <span>{{keyWord}}</span>
                <div class="filter-tab-close" @click="delFilter(keyWord)"><img
                  src="../assets/images/icon_close.png">
                </div>
              </div>
            </div>
            <span>共为你找到<b class="has-selected-mark">{{count}}</b>件商品</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sorted-res" v-if="hasProducts">
      <ul class="clearfix">
        <li>
          <div class="sorted-tab">
            <a href="javascript:void(0);" @click="isSortedAction(0)">
              <div :class="{active: isSortedActive === 0}">
                默认排序<span>&uarr;&darr;</span>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="sorted-tab">
            <a href="javascript:void(0);" @click="isSortedAction(1)">
              <div :class="{active: isSortedActive === 1}">
                租金低到高<span>&uarr;</span>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="sorted-tab">
            <a href="javascript:void(0);" @click="isSortedAction(2)">
              <div :class="{active: isSortedActive === 2}">
                租金高到低<span>&darr;</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="products-list">
      <el-row :gutter="20">
        <div v-for="item in productList" v-if="hasProducts">
          <el-col :span="6">
            <router-link :to="{path: '/detail', query: {itemid: item.goodsNo, productName: item.title}}">
              <div class="tab-product">
                <div class="tab-img" v-if="item.imgUrl">
                  <img :src="item.imgUrl">
                </div>
                <div class="tab-img" v-else>
                  <img src="../assets/images/default262.193.png">
                </div>
                <p class="title-p">{{item.title}}</p>
                <p class="subtitle-p">{{item.subtitle}}</p>
                <p class="money-p">￥<span class="money-mark">{{formatRent(item.rent)}}</span>/月</p>
              </div>
            </router-link>
          </el-col>
        </div>
      </el-row>
      <div class="empty" v-if="!hasProducts">
        <div class="img">
          <img src="../assets/images/icon_jilu_kong.png" alt="">
          <span>没有相关的结果哦!</span>
        </div>
      </div>
    </div>
    <div class="service-side">
      <custom_service></custom_service>
    </div>
    <div class="pagination" v-if="hasProducts">
      <!--pagination-->
      <pagination :pageData="pageData" @listenToChild="listenToChild"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import custom_service from "./x-customservice";
  import pagination from "./x-pagination";
  import {bus} from '../assets/js/config'
  import {allMethods} from '../assets/js/config'

  export default {
    name: 'productPage',
    components: {
      custom_service: custom_service,
      pagination: pagination,
    },
    data() {
      return {
        // is_active_list: 0,
        categoryarr: [],
        productList: [],
        hasProducts: false,
        productName: '',
        pageData: {
          total: 0, //总条数
          currentPage: 1, //当前页
          pageSizes: 12, //每页显示条数
        },
        isSortedActive: 0,
        count: 0,//总条数
        sortedBy: 'DESC',//默认降序
        orderBy: 'create_time', //默认创建时间
        categoryFilter: [],//存放用户点击的筛选条件，保持每个type只有一个
        category: '',
        sceneId: '',
        priceRange: '',
        barandId: '',
        goodsIsNew: '',
        leaseholdType: '',
        keyWord: '',
        token: '',
        dictionarie: {}
      }
    },
    computed: {},
    methods: {
      formatRent(val){
        return allMethods.fmoney(val);
      },
      listenToChild() {
        //点击页数，调用接口
        this.getProductList();
      },
      changeFilter(type, name) {
        var query = {}
        for (var i in this.$route.query) {
          if (i === type) {
            if (name !== '不限') {
              var nametext = encodeURI(name)
              query[i] = nametext
            }
          } else {
            query[i] = this.$route.query[i]
          }
        }

        if (!this.$route.query[type] && this.$route.query[type] !== 0 && name != '不限') {
          query[type] = encodeURI(name)
        }
        this.$router.push({path: '/list', query: query})
      },
      isSortedAction(val){
        this.isSortedActive = val;
        this.pageData.currentPage = 1;
        if (val === 0) {
          this.sortedBy = 'DESC';
          this.orderBy = 'create_time';
        } else if (val === 1) {
          this.sortedBy = 'ASC';
          this.orderBy = 'rent';
        } else if (val === 2) {
          this.sortedBy = 'DESC';
          this.orderBy = 'rent';
        }
        this.getProductList();
      },
      getCategory() {
        var vm = this;
        this.$http.get('/search/param').then(function (res) {
          if (Number(res.data.code) === 1000) {
            var data = res.data.data;
            vm.categoryarr = data.infos;
            vm.dictionarie = vm.getDictionarie(vm.categoryarr.slice(0))
            vm.getCategoryFilter()
            vm.getProductList();
          }

        });
      },
      getDictionarie(data){
        var arr = {}
        for (var i = 0; i < data.length; i++) {
          var item = data[i]
          arr[item['searchParam']] = item
          item['subParamsCopy'] = {}
          for (var j = 0; j < item['subParams'].length; j++) {
            var itemson = item['subParams'][j]
            item['subParamsCopy'][itemson['detailName']] = itemson
          }
        }
        return arr
      },
      getCurrentData(){
        var data = {}
        for (var i = 0; i < this.categoryarr.length; i++) {
          data[this.categoryarr[i].searchParam] = '不限'
        }
        return data
      },
      getCategoryFilter(){
        var arr = this.dictionarie
        this.categoryFilter = this.getCurrentData()
        var vuedata = this.$data
        var vuearr = {}
        for (var i in vuedata) {
          vuearr[i] = vuedata[i]
        }
        for (var k in this.categoryFilter) {
          if (vuearr[k]) {
            this.categoryFilter[k] = arr[k]['subParamsCopy'][vuearr[k]]['detailName']
          }
        }

      },
      getProductList(){
        var vm = this;
        var data = {
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          orderBy: this.orderBy,
          asc: this.sortedBy,
          token: this.token
        };
        if(this.priceRange)data.priceRange = this.dictionarie['priceRange']['subParamsCopy'][this.priceRange]['id'];
        if(this.goodsIsNew)data.goodsIsNew = this.dictionarie['goodsIsNew']['subParamsCopy'][this.goodsIsNew]['id'];
        if(this.leaseholdType)data.leaseholdType = this.dictionarie['leaseholdType']['subParamsCopy'][this.leaseholdType]['id'];
        if(this.barandId)data.barandId = this.dictionarie['barandId']['subParamsCopy'][this.barandId]['id'];
        if(this.category)data.category = this.dictionarie['category']['subParamsCopy'][this.category]['id'];
        if(this.sceneId)data.sceneId = this.dictionarie['sceneId']['subParamsCopy'][this.sceneId]['id'];
        if(this.keyWord)data.keyWord = this.keyWord;
        this.$http.post('/search/execute', data).then(function (res) {
          if (Number(res.data.code) === 1000) {
            vm.productList = res.data.data.searchVos;
            var count = res.data.data.count;
            vm.count = count;
            vm.pageData.total = count;
            vm.hasProducts = true;
          } else {
            vm.hasProducts = false;
            vm.count = 0;
          }
        });
      },
      delFilter(item){
        var query = {}
        if (item === this.keyWord) {
          this.keyWord = ''
          bus.$emit('keyword', '')
        }
        for (var i in this.$route.query) {
          if (item !== decodeURI(this.$route.query[i])) {
            query[i] = this.$route.query[i]
          }
        }

//        this.categoryFilter = this.categoryFilter
        this.$router.push({path: '/list', query: query})
      },
      getQuery(){
        if (this.$route.query.category) {
          this.category = decodeURI(this.$route.query.category)
        } else {
          this.category = ''
        }
        if (this.$route.query.sceneId) {
          this.sceneId = decodeURI(this.$route.query.sceneId)
        } else {
          this.sceneId = ''
        }
        if (this.$route.query.priceRange) {
          this.priceRange = decodeURI(this.$route.query.priceRange)
        } else {
          this.priceRange = ''
        }
        if (this.$route.query.barandId) {
          this.barandId = decodeURI(this.$route.query.barandId)
        } else {
          this.barandId = ''
        }
        if (this.$route.query.goodsIsNew) {
          this.goodsIsNew = decodeURI(this.$route.query.goodsIsNew)
        } else {
          this.goodsIsNew = ''
        }
        if (this.$route.query.leaseholdType) {

          this.leaseholdType = decodeURI(this.$route.query.leaseholdType)
        } else {
          this.leaseholdType = ''
        }
        if (this.$route.query.keyWord) {
          this.keyWord = decodeURI(this.$route.query.keyWord)
        }
      }
    },
    watch: {
      $route(){
        //页数默认为1,排序为默认排序
        this.pageData.currentPage = 1;
        this.sortedBy = 'DESC';
        this.orderBy = 'create_time';
        this.isSortedActive = 0;
        this.getQuery();
        this.getProductList();
        this.getCategoryFilter();
      }
    },

    created() {
      this.token = localStorage.getItem('xckz_mall');
      this.getQuery()
      this.getCategory();
    },
  }
</script>

<style scoped lang="scss">
  .product-page {
    margin: 10px auto;
    width: 1200px;
    font-size: 14px;

    .ad-banner img {
      width: 1200px;
    }

    .sorted {
      width: 100%;
      background: #fff;
      margin-top: 10px;
    }

    .sorted-content {
      margin-top: 24px;
      margin-bottom: 31px;
      margin-left: 20px;
      display: inline-block;
    }

    .sorted-left {
      li {
        width: 70px;
        text-align: right;
        font-weight: bold;
        color: #686868;
        &:not(:first-child) {
          margin-top: 28px;
          margin-right: 16px;
        }
      }
    }

    .sorted-right {
      width: 1000px;
      height: 100%;
      li {
        a {
          margin-right: 36px;
          color: #666666;
        }
        &:not(:first-child) {
          margin-top: 28px;
        }
        &:last-child span {
          margin-right: 0px;
          color: #6ECC66;
        }
      }
    }

    .sorted-res {
      height: 63px;
      ul {
        margin-left: 20px;
        li {
          float: left;
          font-size: 16px;
          line-height: 21px;
          text-align: center;
          .sorted-tab {
            margin-right: 70px;
            margin-top: 19px;
            a {
              color: #333333;
            }
          }
          span {
            display: inline-block;
            width: 19px;
            height: 19px;
            margin-left: 3px;
          }
        }
      }
    }

    .products-list {
      .empty {
        width: 100%;
        height: 300px;
        .img {
          width: 286px;
          height: 100px;
          text-align: center;
          margin: 76px auto 0;
          img {
            display: block;
            width: 77px;
            height: 56px;
            margin: 0 auto 0;
          }
          span {
            display: block;
            font-size: 14px;
            color: #999999;
            margin-top: 26px;
          }
        }
      }
      .tab-product {
        width: 286px;
        text-align: center;
        background: #fff;
        margin-bottom: 30px;
        transition: 100ms ease all;
        border:1px solid #FFFFFF;
        &:hover {
          box-shadow: 2px 5px 20px #BFBFBF;
          border:1px solid #6ECC66;
          img{
            opacity:.8;
          }
        }
        .money-p {
          display: inline-block;
          margin-bottom: 14px;
          color:#999999;
        }
        .tab-img{
          width: 262px;
          height: 193px;
          margin: 27px 12px 0px;
          /*background: url('../assets/images/default262.193.png');*/
          text-align:center;
          overflow: hidden;
          img {
            /*width:100%;*/
            height:100%;
          }
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left:18px;
          margin-right:18px;
          font-size: 14px;
        }
        .title-p{
          color: #333333;
          margin-bottom: 5px;
          line-height:19px;
        }
        .subtitle-p{
          color:#999999;
          line-height:19px;
          margin-bottom: 13px;
        }
        .money-mark {
          font-size: 20px;
          color: #f5675d;
          line-height: 19px;
        }
      }
    }

    .pagination {
      height: 40px;
      text-align: center;
    }

    .clearfix:after {
      clear: both;
      display: block;
      content: "";
      height: 0;
      line-height: 0;
      visibility: hidden;
    }

    .clearfix {
      zoom: 1;
    }

    .active {
      color: #6ECC66;
    }

    .pro-select {
      line-height: 46px;
      font-size: 14px;
      .dd-list {
        width: 1035px;
        padding-left: 70px;
      }
      dl {
        color: #666;
        line-height: 46px;
        dt {
          display: inline-block;
          float: left;
          width: 79px;
          text-align: right;
          font-weight: bold;
          color: #686868;
          line-height: 46px;
        }
        dd {
          float: left;
          padding: 0 18px;
          cursor: pointer;
          line-height: 46px;
          margin-left: 0;
        }
        /*dd.active {*/
        /*color: #8FC31F;*/
        /*}*/
      }
      .has-selected {
        .has-selected-txt {
          font-weight: bold;
          color: #686868;
          display: inline-block;
          width: 79px;
          text-align: right;
        }
        .has-selected-mark {
          color: #6ECC66;
          line-height: 19px;
        }
        .filter-tab {
          display: inline-block;
          .filter-tab-one {
            height: 21px;
            background: #6ECC66;
            font-size: 14px;
            color: #FFFFFF;
            margin-right: 12px;
            padding-left: 7px;
            padding-right: 7px;
            text-align: center;
            line-height: 21px;
            .filter-tab-close {
              display: inline-block;
              margin-left: 6px;
              cursor: pointer;
              img {
                width: 10px;
                height: 10px;
              }
            }
          }

        }
      }

    }

  }

</style>

