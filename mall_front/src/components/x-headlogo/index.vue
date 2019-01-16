<template>
  <div class="head_logo">

    <div class="search_head" :class="{active: tab==1}">
      <div class="content">
        <div class="fl" v-if="tab==1">
          <div class="logowrap">
             <span class="logo" @click="gotohome">
              <!--<img src="../../assets/images/logo_wenzi_white.png" alt="">-->
              <div class="img"></div>
            </span>
          </div>

          <span class="index" @click="gotoHome">首页</span>
          <span class="allType" @click="gotoProduct">全部机型</span>
        </div>

        <div class="fl" v-if="tab==2">
          <span class="logo_mall" @click="gotohome">
            <!--<img src="../../assets/images/logoT.png" alt="">-->
            <div class="img"></div>
          </span>
          <span class="select" @click="gotohome">
            <!--<img src="../../assets/images/select_icon.png" alt="">-->
          </span>
        </div>


        <div class="fl" v-if="tab==3">
            <span class="logo_cash" @click="gotohome" style="margin-right: 0;">
              <div class="img"></div><!--<img src="../../assets/images/logoT.png" alt="">-->
            </span>
          <span class="vertical_line">

            </span>
          <span class="cash_center" style="font-weight: bold">收银中心</span>

        </div>

        <div class="fl" v-if="tab==4">
            <span class="logo_cash" style="margin-right: 0;" @click="gotohome">
              <div class="img"></div>
              <!--<img src="../../assets/images/logoT.png" alt="">-->
            </span>
          <span class="vertical_line">

            </span>
          <span class="cash_center" style="font-weight: bold">重置密码</span>

        </div>

        <div class="fr" v-if="tab==2||tab==1">
          <div class="search" :class="{active_input:tab==2}">
            <input type="text" v-model="inputSearch" placeholder="免押金租电脑" :class="{active_input:tab==2}"
                   @keydown="loginKeyOption($event)">
            <span :class="{active_search:this.tab==2}" @click="gotoSearch">搜索</span>
          </div>
          <div class="searchType" :class="{active_type:tab==2}">
            <span v-for="(item,index) in searchType" @click="sureComputer(item)">{{item}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tab_box" v-if="tab==2">
      <div class="tab">
        <!--<span class="category">-->
        <!--<span class="pic">-->
        <!--<img src="../../assets/images/index_fenlei.png" alt="">-->
        <!--</span>-->
        <!--<span class="text">-->
        <!--商品分类-->
        <!--</span>-->

        <!--</span>-->


        <span class="category" @click="changeShow">

          <img src="../../assets/images/index_fenlei.png" alt="">

          <span class="text">
            商品分类
          </span>

        </span>

        <span class="first_page" :class="{'checkT':$route.path==='/'}" @click="gotoHome">
              首页
            </span>
        <span class="all_type" :class="{'checkT':$route.path==='/list'}" @click="gotoProduct">
            全部机型
          </span>
        <!--<span class="all_type" :class="{'checkT':$route.path==='/preference'}" @click="gotoPreference">-->
            <!--五一特惠-->
          <!--</span>-->
        <!--<span class="all_type" :class="{'checkT':$route.path==='/shoppingStreet'}" @click="$router.push('/shoppingStreet')">-->
            <!--618租赁节-->
        <!--</span>-->
        <div class="goodsClassify" :class="{'active':show}">
          <div class="goodsClassifywrap">
            <div class="classify_item" v-for="item in mallData">
              <div class="cl_title">{{item.categoryName}}</div>
              <div class="cl_text" v-for="son in item.subCategories" @click="gotoList(son,item.searchParam)">
                {{son.detailName}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>

    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import {bus} from '../../assets/js/config'
  import {allMethods} from '../../assets/js/config'

  export default {
    name: 'head_logo',

    props: {
      message: Object, //定义传值的类型<br>  }
      title: String,
      tab: Number
    },
    data() {
      return {
        show: false,
        mallData: '',
//        tab: 2,//2个人中心头部，1商品头部，3收银头部//重置密码

        inputSearch: '',
        keyWord: '',
        searchType: [
          "T410", "DELL", "Apple", "Thinkpad", "iMac", "MacBook", "latitude", "办公电脑", "便携笔记本"
//          'T420', 'W350', 'DELL', '苹果笔记本', '打印机', 'iPad', '二手', '分期付款', '戴尔台式机'
        ],
      }
    },
    methods: {
      gotohome() {
        if (this.$route.path !== '/') {
          this.$router.push({path: '/'})
        }
      },
      checkToken() {
        var token = localStorage.getItem('xckz_mall')
        this.$http.get('/common/checkToken', {params: {token: token}}).then(function (reg) {
          if (Number(reg.data.code) === 1000) {
            if (!reg.data.data) {
              localStorage.removeItem('xckz_mall')
              localStorage.removeItem('xckz_mall_status')
              localStorage.removeItem('xckz_mall_companyName')
              bus.$emit('updatetitle')
            }
          }
        })

      },
      loginKeyOption(e) {
        if (e.keyCode === 13) {
          this.gotoSearch()
        }
      },
      gotoSearch() {
        if (this.inputSearch === '') {
          this.$router.push({path: '/list'})
        } else {
          var query = {}
          query['keyWord'] = encodeURI(this.inputSearch)
          this.$router.push({path: '/list', query: query})
        }
      },
      changeShow() {
        if (this.$route.path !== '/') {
          this.show = !this.show
        }
      },
      getMallData() {
        var vm = this
        this.$http.get('/home/category').then(function (reg) {
          if (Number(reg.data.code) === 1000) {
            vm.mallData = reg.data.data
          }
        })
      },
      gotoHome() {
        this.$router.push('/')
      },
      gotoProduct() {
        this.$router.push('/list')
      },
      gotoPreference(){
        this.$router.push('/preference')
      },
      sureComputer(item) {
        this.inputSearch = item;
        this.gotoSearch()
      },
      whatLogo() {

      },
      gotoList(son, searchParam) {
        let timestamp = (new Date()).valueOf();
        if (searchParam === 'category') {
          this.$router.push({path: '/list', query: {category: encodeURI(son.detailName), h: timestamp}})
        } else if (searchParam === 'sceneId') {
          this.$router.push({path: '/list', query: {sceneId: encodeURI(son.detailName), h: timestamp}})
        } else if (searchParam === 'priceRange') {
          this.$router.push({path: '/list', query: {priceRange: encodeURI(son.detailName), h: timestamp}})
        }
      },
      updateKeyWord(text) {
        this.inputSearch = text
      }
    },
    watch: {
      $route() {
        if (this.$route.path === '/') {
          this.show = true
        } else {
          this.show = false
        }

        if (!this.$route.query.keyWord) {
          this.inputSearch = ''
        }


      }
    },
    mounted() {
      bus.$on('keyword', this.updateKeyWord)
      this.whatLogo();
      this.getMallData()
      if (this.$route.path === '/') {
        this.show = true
      } else {
        this.show = false

      }
      this.inputSearch = ''
      if (this.$route.query.keyWord) {
        this.inputSearch = decodeURI(this.$route.query.keyWord)
      }

    },
    created() {

      if (localStorage.getItem('xckz_mall')) {
        this.checkToken()
      }
    }
  }
</script>

<style scoped lang="scss">

  .logowrap{
    width: 220px;
    float: left;
    height: 115px;
  }
  .head_logo .search_head .content .fl .logo{
    width: 160px;
    height: 115px;
    line-height: 115px;
    vertical-align: middle;
  }
  .select {
    display: inline-block;
    width: 130px;
    float: left;
    margin-top: 26px;
    height: 52px !important;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('../../assets/images/sl@1x.png');
    background-image: -webkit-image-set(url('../../assets/images/slg@1x.png') 1x, url('../../assets/images/slg@2x.png') 2x, url('../../assets/images/slg@3x.png') 3x);
    background-image: image-set(url('../../assets/images/slg@1x.png') 1x, url('../../assets/images/slg@2x.png') 2x, url('../../assets/images/slg@3x.png') 3x);
    background-size: 100%;
  }

  .logo_mall .img, .logo_cash .img {
    width: 160px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('../../assets/images/logo@1x.png');
    background-image: -webkit-image-set(url('../../assets/images/logo@1x.png') 1x, url('../../assets/images/logo@2x.png') 2x, url('../../assets/images/logo@3x.png') 3x);
    background-image: image-set(url('../../assets/images/logo@1x.png') 1x, url('../../assets/images/logo@2x.png') 2x, url('../../assets/images/logo@3x.png') 3x);
    background-size: 100%;
  }

  .logo .img {

    width: 160px;
    height: 115px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('../../assets/images/logo_w@1x.png');
    background-image: -webkit-image-set(url('../../assets/images/logo_w@1x.png') 1x, url('../../assets/images/logo_w@2x.png') 2x, url('../../assets/images/logo_w@3x.png') 3x);
    background-image: image-set(url('../../assets/images/logo_w@1x.png') 1x, url('../../assets/images/logo_w@2x.png') 2x, url('../../assets/images/logo_w@3x.png') 3x);
    background-size: 100%;
  }

  .category {
    cursor: pointer;
  }

  .checkT {
    color: #6ECC66 !important;
  }

  .goodsClassify {
    overflow: hidden;
    height: 0;
    transition: height .5s ease;
    position: absolute;
    left: 0;
    top: 40px;
    width: 225px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9;
    float: left;
    line-height: 1;
    .goodsClassifywrap {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .classify_item {
      width: 195px;
      height: auto;
      border-bottom: 1px dashed #fff;
      color: #fff;
      padding: 15px;
      .cl_title {
        margin-top: 15px;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
      .cl_text {
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        opacity: .8;
        margin-top: 12px;
        float: left;
        width: auto;
        margin-right: 9px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      &::after {
        display: block;
        content: '';
        clear: both;
      }
    }
    .classify_item:last-child {
      border: none;
    }
  }

  .goodsClassify.active {
    height: 460px;
  }

  .head_logo {
    min-width: 1200px;
  }

  .head_logo .tab_box .tab {
    position: relative;
  }
</style>
