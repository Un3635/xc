<template>
  <div class="shop-street">
    <div class="shop-street-bg">
      <div class="shop-street-bg-content">
        <img src="../../assets/images/ac-group3.png" alt="icon" class="content-head">
        <ul class="explain">
          <li><img src="../../assets/images/ac-ex2.png" alt="限时特惠"></li>
          <li><img src="../../assets/images/ac-ex2.png" alt="第三台半价"></li>
          <li><img src="../../assets/images/ac-ex2.png" alt="活动说明"></li>
        </ul>
        <div class="shop-street-bg-content-detail" v-for="(item,index) in productList" :key="index">
          <div class="tit"><img :src=item.titimg></div>
          <ul>
            <li v-for="(list,i) in item.list" :key="i">
              <div class="left" @click="goDetail(list.url)">
                <img :src=list.img>
                <div class="icon" v-if="list.icon"><img :src=list.icon alt="限量100台"></div>
              </div>
              <div class="right" @click="goDetail(list.url)"><img :src=list.text></div>
            </li>
          </ul>
          <div class="footer-ex">
            <img :src=item.footerimg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'shoppingStreet',
    data() {
      return {
        productList: [
          {
            titimg: require('../../assets/images/ac-preference1.png'),
            footerimg: require('../../assets/images/ac-footer-ex1.png'),
            list: [
              {
                img: require('../../assets/images/ac-cp1.png'),
                text: require('../../assets/images/ac-text1.png'),
                icon: require('../../assets/images/ac-icon.png'),
                url: 'http://www.xiaochong.cn/detail?itemid=0e0eee48-f616-4578-9299-b2ade5f25801&productName=Thinkpad%20X240%2012.5%E8%8B%B1%E5%AF%B8%E4%BE%BF%E6%90%BA%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              },
              {
                img: require('../../assets/images/ac-cp2.png'),
                text: require('../../assets/images/ac-text2.png'),
                icon: require('../../assets/images/ac-icon.png'),
                url: 'http://www.xiaochong.cn/detail?itemid=2782514a-e4ad-4b13-b656-4f3312909682&productName=Thinkpad%20X240%2012.5%E8%8B%B1%E5%AF%B8%E4%BE%BF%E6%90%BA%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              },
              {
                img: require('../../assets/images/ac-cp3.png'),
                text: require('../../assets/images/ac-text3.png'),
                icon: require('../../assets/images/ac-icon.png'),
                url: 'http://www.xiaochong.cn/detail?itemid=4e041e78-546a-4f2f-9d50-c304bc78513c&productName=Thinkpad%20X1%20Carbon%2014%E8%8B%B1%E5%AF%B8%E8%BD%BB%E8%96%84%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              },
              {
                img: require('../../assets/images/ac-cp4.png'),
                text: require('../../assets/images/ac-text4.png'),
                icon: require('../../assets/images/ac-icon.png'),
                url: 'http://www.xiaochong.cn/detail?itemid=086732ae-d793-42f3-8cd1-81b21298df69&productName=Thinkpad%20X1%20Carbon%2014%E8%8B%B1%E5%AF%B8%E8%BD%BB%E8%96%84%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              }
            ]
          },
          {
            titimg: require('../../assets/images/ac-preference2.png'),
            footerimg: require('../../assets/images/ac-footer-ex2.png'),
            list: [
              {
                img: require('../../assets/images/ac-cp5.png'),
                text: require('../../assets/images/ac-text5.png'),
                icon: null,
                url: 'http://www.xiaochong.cn/detail?itemid=fac97202-b5b3-4ea1-9ef1-9d21b446782e&productName=Thinkpad%20T430%20%E6%9E%81%E9%80%9F%E7%89%8814.0%E8%8B%B1%E5%AF%B8%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              },
              {
                img: require('../../assets/images/ac-cp6.png'),
                text: require('../../assets/images/ac-text6.png'),
                icon: null,
                url: 'http://www.xiaochong.cn/detail?itemid=c9fbf6d3-a9a9-4ae5-b1c9-72936de3721e&productName=Thinkpad%20T430%20%E6%9E%81%E9%80%9F%E7%89%8814.0%E8%8B%B1%E5%AF%B8%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              },
              {
                img: require('../../assets/images/ac-cp7.png'),
                text: require('../../assets/images/ac-text7.png'),
                icon: null,
                url: 'http://www.xiaochong.cn/detail?itemid=1b1fbf79-bf39-43dd-92aa-d0f14e950eb6&productName=Thinkpad%20T430%20%E6%9E%81%E9%80%9F%E7%89%8814.0%E8%8B%B1%E5%AF%B8%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91'
              }
            ]
          }
        ]
      }
    },
    methods: {
      goDetail(url){
        window.open(url);
      }
    }
  }
</script>
