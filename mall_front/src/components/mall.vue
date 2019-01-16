<template>
  <div class="mall">
    <div class="mall_banner">
      <div class="swiper-container">
        <div class="buttom_wrap">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>

        <div class="swiper-wrapper">
          <!--<div class="swiper-slide pointer">-->
          <!--<div class="img" @click="gotoPreference"-->
          <!--:style="'background:url('+isrc[0]+');background-position: center center;    background-repeat: no-repeat;'">-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-slide pointer">-->
            <!--<div class="img" @click="$router.push('/shoppingStreet')"-->
                 <!--:style="'background:url('+isrc[0]+');background-position: center center;    background-repeat: no-repeat;'">-->
            <!--</div>-->
          <!--</div>-->
          <div class="swiper-slide pointer">
            <div class="img" @click="gotodetail('eeec8138-8ac3-4314-866c-0bc677a1a66e')"
                 :style="'background:url('+isrc[0]+');background-position: center center;    background-repeat: no-repeat;'">
            </div>
          </div>
          <div class="swiper-slide pointer">
            <div class="img" @click="gotodetail('2e2a371f-0df8-4af1-9c10-d5898cc33bd9')"
                 :style="'background:url('+isrc[1]+');background-position: center center;    background-repeat: no-repeat;'">
            </div>
          </div>


        </div>
        <div class="swiper-pagination"></div>


      </div>
    </div>

    <div class="module" ref="test1">

      <div class="module_inner">
        <transition name="fade">

          <div class="hold_menu" v-if="showMenu" ref="holdmenu">
            <div class="hold_menu_inner">
              <div class="menu" v-for="(item,$index) in prodlist" :ref="item.menutab"
                   :class="{'active':item.active}"
                   @click="changeScroll(item)" v-html="item.text"></div>
            </div>

          </div>
        </transition>
        <div class="product_module" v-for="(item,$index) in prodlist">
          <div class="text" :ref="item.menutext">{{item.text}} <span class="more"
                                                                     @click="gotoList(item)" v-if="$index!=='hot'">查看更多 &gt</span>
          </div>
          <div class="item">

            <div v-for="(prod,$son) in item.prods"
                 :class="{'big_product':prod.className==='big','com_product':prod.className!=='big'}"
                 :style="{'margin-right:0px':prod.right}" @click="gotodetail(prod.id)">
              <div class="pord_img" v-if="$index==='hot'" :class="{'active':!hot[$son]}">
                <img :src="hot[$son]" :alt="prod.name" v-cloak v-show="hot[$son]">
              </div>
              <div class="pord_img" v-if="$index==='administration'" :class="{'active':!administration[$son]}">
                <img :src="administration[$son]" :alt="prod.name" v-cloak v-show="administration[$son]">
              </div>
              <div class="pord_img" v-if="$index==='technologicalDevelopment'"
                   :class="{'active':!technologicalDevelopment[$son]}">
                <img :src="technologicalDevelopment[$son]" :alt="prod.name" v-cloak
                     v-show="technologicalDevelopment[$son]">
              </div>
              <div class="pord_img" v-if="$index==='graphicProcessing'" :class="{'active':!graphicProcessing[$son]}">
                <img :src="graphicProcessing[$son]" :alt="prod.name" v-cloak v-show="graphicProcessing[$son]">
              </div>
              <div class="pord_img" v-if="$index==='businessPortable'" :class="{'active':!businessPortable[$son]}">
                <img :src="businessPortable[$son]" :alt="prod.name" v-cloak v-show="businessPortable[$son]">
              </div>
              <div class="pord_img" v-if="$index==='accessories'" :class="{'active':!accessories[$son]}">
                <img :src="accessories[$son]" :alt="prod.name" v-cloak v-cloak v-show="accessories[$son]">
              </div>
              <div class="p_name">{{prod.name}}{{prod.right}}</div>
              <div class="p_desc">{{prod.desc}}</div>
              <div class="p_price">{{prod.price}}元/月</div>
            </div>
          </div>
          <div class="hot_service" v-if="$index==='hot'">
            <div class="hot_cont">
              <div class="img">
                <img src="../assets/images/index_icon_mianyajin.png" alt="">
              </div>
              <div class="text">免押金</div>
            </div>
            <div class="hot_cont">
              <div class="img">
                <img src="../assets/images/index_icon_yitai.png" alt="">
              </div>
              <div class="text">一台起租</div>
            </div>
            <div class="hot_cont">
              <div class="img">
                <img src="../assets/images/index_icon_yue.png" alt="">
              </div>
              <div class="text">按月支付</div>
            </div>
            <div class="hot_cont">
              <div class="img">
                <img src="../assets/images/index_icon_xingjiabi.png" alt="">
              </div>
              <div class="text">高性价比</div>
            </div>
            <div class="hot_cont">
              <div class="img">
                <img src="../assets/images/index_icon_weixiu.png" alt="">
              </div>
              <div class="text">全程维修</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <cus></cus>
  </div>
</template>

<script>
  import cus from './x-customservice';

  export default {
    name: 'mall',
    data() {
      return {
        scrollTop: 0,
        showMenu: false,
        isrc: [
//          '/static/images/618banner.png',
          '/static/images/1.jpg',
          '/static/images/2.png'
        ],
        prodlist: {
          hot: {
            text: '热销机型',
            menutext: 'menu0',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab0',
            prods: [
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/4G/120G SSD/集显',
                id: 'fac97202-b5b3-4ea1-9ef1-9d21b446782e',
                price: '115',
                img: ''
              },
              {
                name: 'Thinkpad X230',
                desc: '12.5英寸便携笔记本电脑 i5/8GB/120GB SSD/集显',
                id: '4d7001af-eafe-493c-9ebd-b36c07799940',
                price: '120',
                img: '',
                className: ''
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: 'f0533d46-2fcf-4599-b599-740b76f6627b',
                price: '160',
                img: ''
              },
              {
                name: 'ThinkPad X1 Carbon',
                desc: '14.0英寸超级本i5/8G/256G SSD/集显',
                id: '4e041e78-546a-4f2f-9d50-c304bc78513c',
                price: '199',
                img: ''
              },
              {
                name: '全新mini办公台式机',
                desc: '23.8英寸显示器i5/8G/120G SSD+1T/GTX750Ti 2G/23.8寸',
                id: 'c0001d05-9629-4f24-9c7b-ba5866ab5f58',
                price: '199',
                img: ''
              }
            ]
          },
          administration: {
            text: '行政办公',
            menutext: 'menu1',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab1',
            prods: [
              {
                name: '全新 DELL 3050MFF迷你商务机',
                desc: 'G4560T/4G/500G/19.5英寸',
                id: 'eeec8138-8ac3-4314-866c-0bc677a1a66e',
                price: '99',
                img: '',
                className: 'big'
              },
              {
                name: 'Thinkpad X201',
                desc: '12.5英寸便携笔记本电脑i5/4G/320G/集显',
                id: '5825be35-f696-4f90-99f7-ff425fb7eb56',
                price: '65',
                img: ''
              },
              {
                name: 'Thinkpad X220',
                desc: '12.5英寸便携笔记本电脑i5/4G/320G/集显',
                id: '628961bc-0ac6-44ad-af6b-8daef6e3f707',
                price: '75',
                img: ''
              },
              {
                name: 'Thinkpad T410',
                desc: '14.0英寸笔记本电脑i5/4G/320G/集显',
                id: 'dbaf4404-1aab-47e5-83ab-f56e0ce4ca8e',
                price: '80',
                img: ''
              },
              {
                name: 'Thinkpad T420',
                desc: '14.0英寸笔记本电脑i5/4G/120G SSD/集显',
                id: '315c016d-515a-4c12-9ee9-17c8b6735c05',
                price: '105',
                img: ''
              },
              {
                name: 'Thinkpad T430',
                desc: '14.0英寸笔记本电脑i5/4G/120G/集显',
                id: 'fac97202-b5b3-4ea1-9ef1-9d21b446782e',
                price: '115',
                img: ''
              },
              {
                name: '全新mini办公台式机',
                desc: '23.8英寸显示器G3930/4G/120G SSD/23.8寸',
                id: '653e5767-edbe-44ff-b0c4-1bc7c2aa6449',
                price: '130',
                img: ''
              },
              {
                name: '全新Apple MacBook Air',
                desc: 'i5/8G/128G SSD',
                id: '56390324-530f-42c2-90fb-a03ff74bc2d7',
                price: '228',
                img: ''
              },
              {
                name: 'Apple iMac',
                desc: '21.5英寸一体电脑i5/8G/256G SSD',
                id: 'fc03fc1f-5caa-477d-9c92-73654b82c6d0',
                price: '299',
                img: ''
              }
            ]
          },
          technologicalDevelopment: {
            text: '技术开发',
            menutext: 'menu2',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab2',
            prods: [
              {
                name: 'ThinkPad X1 Carbon',
                desc: '14.0英寸超级本i7/8G/256G SSD/集显',
                id: '086732ae-d793-42f3-8cd1-81b21298df69',
                price: '225',
                img: '',
                className: 'big'
              },
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/120G SSD/集显',
                id: 'c9fbf6d3-a9a9-4ae5-b1c9-72936de3721e',
                price: '125',
                img: ''
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/120G SSD/集显',
                id: 'ec42c7b1-323f-4992-98b3-d3a44d8cb847',
                price: '150',
                img: ''
              },
              {
                name: '全新 DELL 3050MFF  E2016H',
                desc: '19.5英寸显示器 i5/8G/1T/集显/19.5英寸',
                id: '0a8531e8-227e-41d4-9a0a-94789baeeb0e',
                price: '158',
                img: ''
              },
              {
                name: '全新 latitude 3480 ',
                desc: '14英寸笔记本电脑i5/8G/256G SSD',
                id: '25a83430-b667-4be6-9109-df3796fb2156',
                price: '178',
                img: ''
              },
              {
                name: '全新 latitude 5480 ',
                desc: '14英寸笔记本电脑i5/8G/500G',
                id: '7f728f6b-0e35-4e3d-805d-788729fbf2a5',
                price: '218',
                img: ''
              },
              {
                name: '全新 DELL 7050MT  P2317',
                desc: ' 23英寸显示器i5/8G/256G SSD',
                id: 'b7f9c958-2874-4179-9676-7cbadc233ad5',
                price: '215',
                img: ''
              },
              {
                name: 'Apple MacBook Pro',
                desc: '13英寸 i5/8G/256G SSD/Retina',
                id: '91abab31-1bf0-40e9-b4a3-8205acb4ed89',
                price: '348',
                img: ''
              },
              {
                name: '全新Apple MacBook Pro',
                desc: '15英寸i7/16G/256G SSD/含Muti-Touch Bar',
                id: '934acbdd-d44c-4edb-8199-8ed23d3bb004',
                price: '699',
                img: ''
              }
            ]
          },
          graphicProcessing: {
            text: '图形处理',
            menutext: 'menu3',
            menutab: 'menutab3',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: '全新mini办公台式机23.8英寸',
                desc: 'i5/8G/120G SSD+1T/GTX750Ti 2G/23.8寸',
                id: 'c0001d05-9629-4f24-9c7b-ba5866ab5f58',
                price: '199',
                img: '',
                className: 'big'
              },
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: '1b1fbf79-bf39-43dd-92aa-d0f14e950eb6',
                price: '135',
                img: ''
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: 'f0533d46-2fcf-4599-b599-740b76f6627b',
                price: '160',
                img: ''
              },

              {
                name: '全新 latitude 3480',
                desc: '14英寸笔记本电脑i5/8G/1T',
                id: '9ff729ba-eafb-4047-962f-23206925d450',
                price: '168',
                img: ''
              },
              {
                name: '全新 DELL 3050MFF P2317',
                desc: '23英寸显示器i5/8G/1T/2G独显',
                id: '13063d52-57f7-4273-a39f-115ca93d38f2',
                price: '195',
                img: ''
              },
              {
                name: '全新 DELL 7050MT P2317',
                desc: '23英寸显示器i5/8G/1T/2G独显',
                id: 'e6364965-f2f2-4c8b-b59f-7d89dcc88fbc',
                price: '228',
                img: ''
              },
              {
                name: '全新 latitude 5480',
                desc: '14英寸笔记本电脑i5/8G/256G SSD',
                id: '07370a39-bfdc-46ec-8b61-5a83e9555dcc',
                price: '238',
                img: ''
              },
              {
                name: '全新iMac',
                desc: '27英寸一体电脑i5/8G/1T/RP570显卡/Retina 5K',
                id: 'b64aa3f1-96a8-4ec6-baf3-4a2b9b935f77',
                price: '479',
                img: ''
              },
              {
                name: 'Apple MacBook Pro',
                desc: '15英寸i7/16G/256G SSD',
                id: '2e2a371f-0df8-4af1-9c10-d5898cc33bd9',
                price: '499',
                img: ''
              }
            ]
          },
          businessPortable: {
            text: '商务便携',
            menutext: 'menu4',
            menutab: 'menutab4',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: 'Thinkpad X201',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: 'f8060d20-7c3c-4240-81b6-bae986fec5d2',
                price: '75',
                img: '',
                className: 'big'
              },
              {
                name: 'Thinkpad X220',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: '414b2c3b-5f41-4d68-8946-a05554cda478',
                price: '85',
                img: ''
              },
              {
                name: 'Thinkpad X230',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: '6753b038-790d-4765-ab4a-b8e2e450fc61',
                price: '110',
                img: ''
              },
              {
                name: 'Thinkpad X240',
                desc: '12.5英寸便携笔记本电脑i5/8g/120g SSD/集显',
                id: '0e0eee48-f616-4578-9299-b2ade5f25801',
                price: '175',
                img: ''
              },
              {
                name: '全新 latitude 5280',
                desc: '12.5英寸商务笔记本电脑i5/8G/256G SSD',
                id: '696c2885-a4b0-4d07-90c5-8f1b9ee54940',
                price: '258',
                img: ''
              },
              {
                name: '全新 latitude 7280',
                desc: '12.5英寸商务笔记本电脑i5/8G/512G SSD',
                id: '697b12b8-4290-4050-aa3a-e69c9524e2a4',
                price: '295',
                img: ''
              },
              {
                name: 'Apple MacBook Air',
                desc: 'i5/8G/128G SSD',
                id: '76e5bd11-1803-4c3a-99aa-c4966349466a',
                price: '198',
                img: ''
              },
              {
                name: 'Apple MacBook Pro ',
                desc: '13英寸 i5/8G/256G SSD/Retina ',
                id: '91abab31-1bf0-40e9-b4a3-8205acb4ed89',
                price: '348',
                img: '/static/images/minImg/businessPortable/Apple_MacBook_Pro_13.png'
              },
              {
                name: '全新Apple MacBook Pro',
                desc: '13英寸i5/8G/256G SSD/Iris640/Retina',
                id: 'bff1606f-b58f-4003-8078-449bf1a26893',
                price: '399',
                img: ''
              }

            ]
          },
          accessories: {
            text: '机器配件',
            menutext: 'menu5',
            menutab: 'menutab5',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: '全新DELL E2016H',
                desc: '19.5英寸显示器',
                id: 'c24ac95b-5121-4f24-8bc4-9a3e2e67c440',
                price: '30',
                img: ''
              },
              {
                name: '全新DELL E2216H',
                desc: '21.5英寸显示器',
                id: 'fa1e0507-ef18-4c8f-ac51-49543fa3e806',
                price: '35',
                img: ''
              },
              {
                name: '全新DELL P2317H',
                desc: '23英寸显示器',
                id: '10ef36c6-cbad-4a92-b0c3-ae46e9acb636',
                price: '45',
                img: ''
              },
              {
                name: '全新DELL',
                desc: 'KB216键盘',
                id: '64ac431c-27bc-4871-b4f5-e19e9540b97a',
                price: '8',
                img: ''
              },
              {
                name: '全新Thinkpad',
                desc: '蓝光鼠标',
                id: '6ce74487-81a5-4833-8268-73ed1e58e930',
                price: '8',
                img: ''
              }
            ]
          }
        },
        timer: '',
        isTop: false,
        hot: ['/static/images/hot/Thinkpad_T430_14.png', '/static/images/hot/X230.jpg', '/static/images/hot/Thinkpad_T440_14.png', '/static/images/hot/X1.jpg', '/static/images/hot/nmgp_172.png'],
        administration: [],
        technologicalDevelopment: [],
        graphicProcessing: [],
        businessPortable: [],
        accessories: []
      };
    },
    methods: {
      gotoPreference() {
        this.$router.push('/preference');
      },
      gotodetail(id) {
        if (!id) {
          return;
        }
        this.$router.push({path: '/detail', query: {itemid: id}});
      },

      gotoList(item) {
        var timestamp = new Date().getTime();
        this.$router.push({path: '/list', query: {sceneId: encodeURI(item.text), h: timestamp}});
      },

      stopScrollAnimate() {
        if (!vm.isTop) {
          clearInterval(vm.timer);
        }
        vm.isTop = false;
      },
      changeScroll(item) {
        clearInterval(this.timer);

        var num = item.scrollheight - window.innerHeight / 2 + 20;

        var vm = this;

        //滚动条滚动时触发

        vm.timer = setInterval(function () {
          //获取滚动条距离顶部高度
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;

          var ispeed = Math.floor((num - osTop) / 7);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

          if (osTop === num || ispeed === 0) {

            clearInterval(vm.timer);

          }
          vm.isTop = true;

        }, 20);


      },
      getMenuOffset() {

        this.prodlist.hot.scrollheight = this.$refs.menu0[0].offsetTop + 712;
        this.prodlist.administration.scrollheight = this.$refs.menu1[0].offsetTop + 712;
        this.prodlist.technologicalDevelopment.scrollheight = this.$refs.menu2[0].offsetTop + 712;
        this.prodlist.graphicProcessing.scrollheight = this.$refs.menu3[0].offsetTop + 712;
        this.prodlist.businessPortable.scrollheight = this.$refs.menu4[0].offsetTop + 712;
        this.prodlist.accessories.scrollheight = this.$refs.menu5[0].offsetTop + 712;
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollTop = scrollTop;
      },
      removeActive() {
        for (var i in this.prodlist) {
          this.prodlist[i].active = false;
        }
      },
      getUrl() {
        var arr = {
          hot: {
            text: '热销机型',
            menutext: 'menu0',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab0',
            prods: [
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/4G/120G SSD/集显',
                id: 'fac97202-b5b3-4ea1-9ef1-9d21b446782e',
                price: '115',
                img: '/static/images/hot/Thinkpad_T430_14.png',
                className: ''
              },
              {
                name: 'Thinkpad X230',
                desc: '12.5英寸便携笔记本电脑 i5/8GB/120GB SSD/集显',
                id: '4d7001af-eafe-493c-9ebd-b36c07799940',
                price: '120',
                img: '/static/images/hot/X230.jpg',
                className: ''
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: 'f0533d46-2fcf-4599-b599-740b76f6627b',
                price: '160',
                img: '/static/images/hot/Thinkpad_T440_14.png'
              },
              {
                name: 'ThinkPad X1 Carbon',
                desc: '14.0英寸超级本i5/8G/256G SSD/集显',
                id: '4e041e78-546a-4f2f-9d50-c304bc78513c',
                price: '199',
                img: '/static/images/hot/X1.jpg'
              },
              {
                name: '全新mini办公台式机',
                desc: '23.8英寸显示器i5/8G/120G SSD+1T/GTX750Ti 2G/23.8寸',
                id: 'c0001d05-9629-4f24-9c7b-ba5866ab5f58',
                price: '199',
                img: '/static/images/hot/nmgp_172.png'
              }
            ]
          },
          administration: {
            text: '行政办公',
            menutext: 'menu1',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab1',
            prods: [
              {
                name: '全新 DELL 3050MFF迷你商务机',
                desc: 'G4560T/4G/500G/19.5英寸',
                id: 'eeec8138-8ac3-4314-866c-0bc677a1a66e',
                price: '99',
                img: '/static/images/largeImg/administration/DELL_3050MFF.png',
                className: 'big'
              },
              {
                name: 'Thinkpad X201',
                desc: '12.5英寸便携笔记本电脑i5/4G/320G/集显',
                id: '5825be35-f696-4f90-99f7-ff425fb7eb56',
                price: '65',
                img: '/static/images/minImg/administration/X201.jpg'
              },
              {
                name: 'Thinkpad X220',
                desc: '12.5英寸便携笔记本电脑i5/4G/320G/集显',
                id: '628961bc-0ac6-44ad-af6b-8daef6e3f707',
                price: '75',
                img: '/static/images/minImg/administration/Thinkpad_X220_12.5.png'
              },
              {
                name: 'Thinkpad T410',
                desc: '14.0英寸笔记本电脑i5/4G/320G/集显',
                id: 'dbaf4404-1aab-47e5-83ab-f56e0ce4ca8e',
                price: '80',
                img: '/static/images/minImg/administration/T410.jpg'
              },
              {
                name: 'Thinkpad T420',
                desc: '14.0英寸笔记本电脑i5/4G/120G SSD/集显',
                id: '315c016d-515a-4c12-9ee9-17c8b6735c05',
                price: '105',
                img: '/static/images/minImg/administration/Thinkpad_T420_14.png'
              },
              {
                name: 'Thinkpad T430',
                desc: '14.0英寸笔记本电脑i5/4G/120G/集显',
                id: 'fac97202-b5b3-4ea1-9ef1-9d21b446782e',
                price: '115',
                img: '/static/images/minImg/administration/Thinkpad_T430_14.png'
              },
              {
                name: '全新mini办公台式机',
                desc: '23.8英寸显示器G3930/4G/120G SSD/23.8寸',
                id: '653e5767-edbe-44ff-b0c4-1bc7c2aa6449',
                price: '130',
                img: '/static/images/minImg/administration/nmgp.png'
              },
              {
                name: '全新Apple MacBook Air',
                desc: 'i5/8G/128G SSD',
                id: '56390324-530f-42c2-90fb-a03ff74bc2d7',
                price: '228',
                img: '/static/images/minImg/administration/Apple_MacBook_Air.png'
              },
              {
                name: 'Apple iMac',
                desc: '21.5英寸一体电脑i5/8G/256G SSD',
                id: 'fc03fc1f-5caa-477d-9c92-73654b82c6d0',
                price: '299',
                img: '/static/images/minImg/administration/Apple_iMac_21.5.png'
              }
            ]
          },
          technologicalDevelopment: {
            text: '技术开发',
            menutext: 'menu2',
            name: '',
            active: false,
            scrollheight: '',
            menutab: 'menutab2',
            prods: [
              {
                name: 'ThinkPad X1 Carbon',
                desc: '14.0英寸超级本i7/8G/256G SSD/集显',
                id: '086732ae-d793-42f3-8cd1-81b21298df69',
                price: '225',
                img: '/static/images/largeImg/technologicalDevelopment/X1.png',
                className: 'big'
              },
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/120G SSD/集显',
                id: 'c9fbf6d3-a9a9-4ae5-b1c9-72936de3721e',
                price: '125',
                img: '/static/images/minImg/technologicalDevelopment/Thinkpad_T430_14.png'
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/120G SSD/集显',
                id: 'ec42c7b1-323f-4992-98b3-d3a44d8cb847',
                price: '150',
                img: '/static/images/minImg/technologicalDevelopment/Thinkpad_T440_14.png'
              },
              {
                name: '全新 DELL 3050MFF  E2016H',
                desc: '19.5英寸显示器 i5/8G/1T/集显/19.5英寸',
                id: '0a8531e8-227e-41d4-9a0a-94789baeeb0e',
                price: '158',
                img: '/static/images/minImg/technologicalDevelopment/3050MFF.png'
              },
              {
                name: '全新 latitude 3480 ',
                desc: '14英寸笔记本电脑i5/8G/256G SSD',
                id: '25a83430-b667-4be6-9109-df3796fb2156',
                price: '178',
                img: '/static/images/minImg/technologicalDevelopment/latitude_3480_14.png'
              },
              {
                name: '全新 latitude 5480 ',
                desc: '14英寸笔记本电脑i5/8G/500G',
                id: '7f728f6b-0e35-4e3d-805d-788729fbf2a5',
                price: '218',
                img: '/static/images/minImg/technologicalDevelopment/latitude_5480_14.png'
              },
              {
                name: '全新 DELL 7050MT  P2317',
                desc: ' 23英寸显示器i5/8G/256G SSD',
                id: 'b7f9c958-2874-4179-9676-7cbadc233ad5',
                price: '215',
                img: '/static/images/minImg/technologicalDevelopment/DELL_7050MT_P2317_23.png'
              },
              {
                name: 'Apple MacBook Pro',
                desc: '13英寸 i5/8G/256G SSD/Retina',
                id: '91abab31-1bf0-40e9-b4a3-8205acb4ed89',
                price: '348',
                img: '/static/images/minImg/technologicalDevelopment/Apple_MacBook_Pro_13.png'
              },
              {
                name: '全新Apple MacBook Pro',
                desc: '15英寸i7/16G/256G SSD/含Muti-Touch Bar',
                id: '934acbdd-d44c-4edb-8199-8ed23d3bb004',
                price: '699',
                img: '/static/images/minImg/technologicalDevelopment/Apple_MacBook_Pro_15.png'
              }
            ]
          },
          graphicProcessing: {
            text: '图形处理',
            menutext: 'menu3',
            menutab: 'menutab3',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: '全新mini办公台式机23.8英寸',
                desc: 'i5/8G/120G SSD+1T/GTX750Ti 2G/23.8寸',
                id: 'c0001d05-9629-4f24-9c7b-ba5866ab5f58',
                price: '199',
                img: '/static/images/minImg/graphicProcessing/nm200.png',
                className: 'big'
              },
              {
                name: 'Thinkpad T430 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: '1b1fbf79-bf39-43dd-92aa-d0f14e950eb6',
                price: '135',
                img: '/static/images/minImg/graphicProcessing/Thinkpad_T430_14.png'
              },
              {
                name: 'Thinkpad T440 极速版',
                desc: '14.0英寸笔记本电脑i5/8G/240G SSD/集显',
                id: 'f0533d46-2fcf-4599-b599-740b76f6627b',
                price: '160',
                img: '/static/images/minImg/graphicProcessing/Thinkpad_T440_14.png'
              },

              {
                name: '全新 latitude 3480',
                desc: '14英寸笔记本电脑i5/8G/1T',
                id: '9ff729ba-eafb-4047-962f-23206925d450',
                price: '168',
                img: '/static/images/minImg/graphicProcessing/latitude_3480_14.png'
              },
              {
                name: '全新 DELL 3050MFF P2317',
                desc: '23英寸显示器i5/8G/1T/2G独显',
                id: '13063d52-57f7-4273-a39f-115ca93d38f2',
                price: '195',
                img: '/static/images/minImg/graphicProcessing/DELL_3050MFF_P2317_23.png'
              },
              {
                name: '全新 DELL 7050MT P2317',
                desc: '23英寸显示器i5/8G/1T/2G独显',
                id: 'e6364965-f2f2-4c8b-b59f-7d89dcc88fbc',
                price: '228',
                img: '/static/images/minImg/graphicProcessing/DELL_7050MT_P2317_23.png'
              },
              {
                name: '全新 latitude 5480',
                desc: '14英寸笔记本电脑i5/8G/256G SSD',
                id: '07370a39-bfdc-46ec-8b61-5a83e9555dcc',
                price: '238',
                img: '/static/images/largeImg/graphicProcessing/latitude-5480-14.png'
              },
              {
                name: '全新iMac',
                desc: '27英寸一体电脑i5/8G/1T/RP570显卡/Retina 5K',
                id: 'b64aa3f1-96a8-4ec6-baf3-4a2b9b935f77',
                price: '479',
                img: '/static/images/minImg/graphicProcessing/Apple_iMac_27.png'
              },
              {
                name: 'Apple MacBook Pro',
                desc: '15英寸i7/16G/256G SSD',
                id: '934acbdd-d44c-4edb-8199-8ed23d3bb004',
                price: '499',
                img: '/static/images/minImg/graphicProcessing/Apple_MacBook_Pro_15.png'
              }
            ]
          },
          businessPortable: {
            text: '商务便携',
            menutext: 'menu4',
            menutab: 'menutab4',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: 'Thinkpad X201',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: 'f8060d20-7c3c-4240-81b6-bae986fec5d2',
                price: '75',
                img: '/static/images/largeImg/businessPortable/X201.png',
                className: 'big'
              },
              {
                name: 'Thinkpad X220',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: '414b2c3b-5f41-4d68-8946-a05554cda478',
                price: '85',
                img: '/static/images/minImg/businessPortable/Thinkpad_X220_12.5.png'
              },
              {
                name: 'Thinkpad X230',
                desc: '12.5英寸便携笔记本电脑i5/4G/120G SSD/集显',
                id: '6753b038-790d-4765-ab4a-b8e2e450fc61',
                price: '110',
                img: '/static/images/minImg/businessPortable/Thinkpad_X230_12.5.png'
              },
              {
                name: 'Thinkpad X240',
                desc: '12.5英寸便携笔记本电脑i5/8g/120g SSD/集显',
                id: '0e0eee48-f616-4578-9299-b2ade5f25801',
                price: '175',
                img: '/static/images/minImg/businessPortable/Thinkpad_X240_12.5.png'
              },
              {
                name: '全新 latitude 5280',
                desc: '12.5英寸商务笔记本电脑i5/8G/256G SSD',
                id: '696c2885-a4b0-4d07-90c5-8f1b9ee54940',
                price: '258',
                img: '/static/images/minImg/businessPortable/latitude_5280_12.5.png'
              },
              {
                name: '全新 latitude 7280',
                desc: '12.5英寸商务笔记本电脑i5/8G/512G SSD',
                id: '697b12b8-4290-4050-aa3a-e69c9524e2a4',
                price: '295',
                img: '/static/images/minImg/businessPortable/latitude_7280_12.5.png'
              },
              {
                name: 'Apple MacBook Air',
                desc: 'i5/8G/128G SSD',
                id: '76e5bd11-1803-4c3a-99aa-c4966349466a',
                price: '198',
                img: '/static/images/minImg/businessPortable/Apple_MacBook_Air.png'
              },
              {
                name: 'Apple MacBook Pro ',
                desc: '13英寸 i5/8G/256G SSD/Retina ',
                id: '91abab31-1bf0-40e9-b4a3-8205acb4ed89',
                price: '348',
                img: '/static/images/minImg/businessPortable/Apple_MacBook_Pro_13.png'
              },
              {
                name: '全新Apple MacBook Pro',
                desc: '13英寸i5/8G/256G SSD/Iris640/Retina',
                id: 'bff1606f-b58f-4003-8078-449bf1a26893',
                price: '399',
                img: '/static/images/minImg/businessPortable/Apple_MacBook_Pro_13.png'
              }

            ]
          },
          accessories: {
            text: '机器配件',
            menutext: 'menu5',
            menutab: 'menutab5',
            name: '',
            active: false,
            scrollheight: '',
            prods: [
              {
                name: '全新DELL E2016H',
                desc: '19.5英寸显示器',
                id: 'c24ac95b-5121-4f24-8bc4-9a3e2e67c440',
                price: '30',
                img: '/static/images/minImg/accessories/DELL_E2016H_19.5英寸显示器.png'
              },
              {
                name: '全新DELL E2216H',
                desc: '21.5英寸显示器',
                id: 'fa1e0507-ef18-4c8f-ac51-49543fa3e806',
                price: '35',
                img: '/static/images/minImg/accessories/DELL_E2216H_21.5英寸显示器.png'
              },
              {
                name: '全新DELL P2317H',
                desc: '23英寸显示器',
                id: '10ef36c6-cbad-4a92-b0c3-ae46e9acb636',
                price: '45',
                img: '/static/images/minImg/accessories/DELL_P2317H_23英寸显示器.png'
              },
              {
                name: '全新DELL',
                desc: 'KB216键盘',
                id: '64ac431c-27bc-4871-b4f5-e19e9540b97a',
                price: '8',
                img: '/static/images/minImg/accessories/DELL_KB216键盘.png'
              },
              {
                name: '全新Thinkpad',
                desc: '蓝光鼠标',
                id: '6ce74487-81a5-4833-8268-73ed1e58e930',
                price: '8',
                img: '/static/images/minImg/accessories/mouse.png'
              }
            ]
          }
        };
        for (var i in arr) {
          var item = arr[i]['prods'];
          for (var j = 0; j < item.length; j++) {
            if (i == 'administration') {
              this.administration[j] = item[j]['img'];
            } else if (i == 'technologicalDevelopment') {
              this.technologicalDevelopment[j] = item[j]['img'];
            } else if (i == 'graphicProcessing') {
              this.graphicProcessing[j] = item[j]['img'];
            } else if (i == 'businessPortable') {
              this.businessPortable[j] = item[j]['img'];
            } else if (i == 'accessories') {
              this.accessories[j] = item[j]['img'];
            }
          }
        }
//        console.log('hot is', JSON.stringify(this.hot))
//        console.log('administration is', JSON.stringify(this.administration))
//        console.log('technologicalDevelopment is', JSON.stringify(this.technologicalDevelopment))
//        console.log('graphicProcessing is', JSON.stringify(this.graphicProcessing))
//        console.log('businessPortable is', JSON.stringify(this.businessPortable))
//        console.log('accessories is', JSON.stringify(this.accessories))
      }
    },
    created() {
//      console.log('按了按热风')
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('onscroll', this.stopScrollAnimate);
//      console.log('el is', $('.mall'))
    },
    watch: {
      scrollTop(num) {
        if (num > 500) {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }

        var half = window.innerHeight / 2;

        for (var i in this.prodlist) {
          if (num + half > this.prodlist[i].scrollheight) {
            this.removeActive();
            this.prodlist[i].active = true;
          }
        }
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }

      });
      this.getMenuOffset();
//      console.log('el is', $('.mall'))
//      alert(1)
      this.getUrl();

//      this.prodlist = arr

    },
    components: {
      cus: cus
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .more {
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    line-height: 18px;
    display: block;
    float: right;
    height: 18px;
    cursor: pointer;
    margin-top: 2px;
    transition: all ease .3s;
  }

  .more:hover {
    color: #6ECC66;
  }

  .swiper-pagination {
    z-index: 99999
  }

  .buttom_wrap {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .swiper-button-next {
      right: 0px;
      top: 200px;
    }
    .swiper-button-prev {
      left: 225px;
      top: 200px;

    }
  }

  .hold_menu {
    width: 50px;
    height: 100%;
    position: absolute;
    left: -55px;
    .hold_menu_inner {
      position: fixed;
      top: 50%;
      width: 48px;
      height: auto;
      margin-top: -165px;
      border: 1px solid #eeeeee;

    }
    .menu {
      position: relative;
      cursor: pointer;
      width: 32px;
      height: 38px;
      font-size: 14px;
      padding: 8px;
      color: #666666;
      background: #fff;
      text-align: center;
      line-height: 19px;
      transition: all ease .3s;
      &:hover {
        font-size: 14px;
        color: #FFFFFF;
        background: #6ECC66;
      }
    }
    .menu.active {
      font-size: 14px;
      color: #FFFFFF;
      background: #6ECC66;
    }
  }

  .mall_banner .img {
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    height: 460px;

  }

  .mall_banner {
    position: relative;
  }

  .big_product + .com_product + .com_product + .com_product {
    margin-right: 0;
  }

  .product_module:nth-of-type(3) .big_product {
    background: #FFFAEA;
    border: 1px solid #FFFAEA;
  }

  .product_module:nth-of-type(4) .big_product {
    background: #F8FFED;
    border: 1px solid #F8FFED;

  }

  .product_module:nth-of-type(5) .big_product {
    background: #F3FCFF;
    border: 1px solid #F3FCFF;

  }

  .product_module:nth-of-type(6) .big_product {
    background: #F4EDFF;
    border: 1px solid #F4EDFF;
  }

  .product_module .big_product {
    width: 472px;
    height: 315px;
    float: left;
    background: #FFFAEA;
    position: relative;
    margin-right: 10px;
    border: 1px solid #ffffff;
    transition: all .5s ease;
    cursor: pointer;
    margin-bottom: 10px;

    .pord_img {
      width: 200px;
      height: 200px;
      bottom: 20px;
      right: 40px;
      position: absolute;
      &.active {
        background-image: url('../assets/images/normal.png');
      }
      img {
        width: 100%;
        height: 100%;
      }

    }
    &:hover {
      border: 1px solid #6ECC66;
      img {
        opacity: .8;
      }
    }
    .p_name {
      font-size: 22px;
      color: #333333;
      margin-top: 50px;
      margin-left: 30px;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .p_desc {
      font-size: 14px;
      color: #999999;
      margin-top: 10px;
      margin-left: 30px;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .p_price {
      font-size: 22px;
      color: #FC7520;
      margin-top: 20px;
      margin-left: 30px;
      width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
  }

  .hot_service::after {
    display: block;
    content: '';
    clear: both;
  }

  .hot_service .hot_cont {
    width: 232px;
    height: 153px;
    float: left;
    margin-right: 10px;
    .img {
      width: 100%;
      height: 95px;
      position: relative;
      img {
        position: absolute;
        /*top:38px;*/
        left: 0;
        right: 0;
        margin: auto;

      }
    }
    .text {
      font-size: 22px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      margin: 0;
    }
  }

  .hot_service .hot_cont:last-child {
    margin-right: 0;
    background: #F4EDFF;
    img {
      top: 39px;
    }
  }

  .hot_service .hot_cont:nth-of-type(1) {
    background: #FFF4F4;
    img {
      top: 39px;
    }
  }

  .hot_service .hot_cont:nth-of-type(2) {
    background: #FFFAEA;
    img {
      top: 38px;
    }
  }

  .hot_service .hot_cont:nth-of-type(3) {
    background: #F8FFED;
    img {
      top: 36px;
    }
  }

  .hot_service .hot_cont:nth-of-type(4) {
    background: #F3FCFF;
    img {
      top: 38px;
    }
  }

  .hot_product_list::after {
    clear: both;
    display: block;
    content: '';
  }

  .content {
    height: auto;
    padding-bottom: 30px;
  }

  .hot_product, .product_module {
    .item:after {
      display: block;
      content: '';
      clear: both;
    }
    width: 100%;
    height: auto;
    margin: 0 auto;
    /*position: relative;*/
    z-index: 9;
    .text {
      font-size: 22px;
      color: #333333;
      letter-spacing: 0;
      margin-top: 46px;
      margin-bottom: 15px;
      width: 100%;
    }
    .p_name {
      font-weight: 600;
      font-size: 14px;
      color: #333333;
      margin: 0 auto;
      width: 90%;
      margin-top: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .p_desc {
      font-size: 12px;
      color: #999999;
      margin: 0 auto;
      width: 90%;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .p_price {
      font-size: 14px;
      color: #FC7520;
      margin: 0 auto;
      width: 90%;
      letter-spacing: 0;
      margin-top: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      font-weight: 600;
    }
    .prod {
      width: 232px;
      height: 317px;
      margin-right: 10px;
      float: left;
      .pord_img {
        width: 172px;
        height: 172px;
        margin: 30px;
        margin-bottom: 0;
        position: relative;
        &.active {
          background-image: url('../assets/images/normal.png');
        }
        img {
          width: 100%;
          height: 100%;
        }
      }

    }
    .prod:last-child {
      margin-right: 0;
    }
  }

  .module_inner, .hot_product {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    position: relative;
  }

  .module {
    width: 100%;
    height: auto;
    background: #f5f5f5;
    padding-top: 10px;
  }

  .com_product {

    width: 230px;
    height: 315px;
    margin-right: 10px;
    float: left;
    background: #ffffff;
    border: 1px solid #ffffff;
    transition: all ease .5s;
    cursor: pointer;
    margin-bottom: 10px;

    .pord_img {
      width: 172px;
      height: 172px;
      margin: 30px;
      margin-bottom: 0;
      position: relative;
      &.active {
        background-image: url('../assets/images/normal.png');
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:hover {
      border: 1px solid #6ECC66;
      img {
        opacity: .8;
      }
    }
    &:last-child {
      margin-right: 0;
    }
    .p_name {
      font-size: 14px;
      color: #333333;
      margin: 0 auto;
      width: 90%;
      margin-top: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .p_desc {
      font-size: 12px;
      color: #999999;
      margin: 0 auto;
      width: 90%;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .p_price {
      font-size: 14px;
      color: #FC7520;
      margin: 0 auto;
      width: 90%;
      letter-spacing: 0;
      margin-top: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      font-weight: 600;
    }
  }

  .mall {
    width: 100%;
    height: auto;
    background: #fff;

  }

  .mall_banner {
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    height: 460px;
    /*background: url(../assets/images/bc.png);*/
    background-position: center center;
  }

</style>
