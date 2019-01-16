<template>
  <div class="introduction">
    <div class="banner"></div>
    <div class="wap-banner"></div>
    <div class="about">
      <div class="about-in">
        <div class="p-box">
          <p class="txt" v-for="item,index in txtData.intro[language]"><span>{{item.tit}}</span>&nbsp;&nbsp;{{item.txt}}</p>
        </div>
      </div>
    </div>
    <div class="teach">
      <img class="tit" src="~@/assets/images/introduction/tit-img1.png"/>
      <div class="txt" v-for="item,index in txtData.teachList[language]">
        <p class="name" v-html="item.tit"></p>
        <p class="content" v-html="item.txt"></p>
      </div>
    </div>
    <div class="introduction-roll">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item,index in picList" :key="index">
          <img :src="item.src"/>
        </swiper-slide>
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--<div class="swiper-button-next" slot="button-next"></div>-->
      </swiper>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </div>
    <div class="benefit">
      <img class="tit" src="~@/assets/images/introduction/tit-img2.png"/>
      <p class="txt" v-html="txtData.benefit[language]"></p>
      <img class="deco" src="~@/assets/images/introduction/cloud_02.jpg"/>
    </div>
    <img class="intro" src="~@/assets/images/introduction/intro.png"/>
    <div class="form">
      <div class="title">
        <p>KIDS/ADULT BELT FORM LIST</p>
      </div>
      <div class="content">
        <div class="left">
          <div class="up" @click="changeActive(0)">
            <img src="~@/assets/images/introduction/kid-active.png" v-if="activeIndex === 0"/>
            <img src="~@/assets/images/introduction/kid.png" v-else/>
          </div>
          <div class="down" @click="changeActive(1)">
            <img src="~@/assets/images/introduction/adult-active.png" v-if="activeIndex === 1"/>
            <img src="~@/assets/images/introduction/adult.png" v-else/>
          </div>
        </div>
        <div class="right">
          <img src="~@/assets/images/introduction/form-kids.png" v-if="activeIndex === 0"/>
          <img src="~@/assets/images/introduction/form-adult.png" v-if="activeIndex === 1"/>
        </div>
      </div>
    </div>
    <div class="bot-img"></div>
  </div>
</template>

<script>
  import TxtData from '../data/instruction_data'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "introduction",
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return{
        txtData:'',
        activeIndex:0,
        swiperOption: {
          autoplay: true,
          speed: 1200,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        picList:[
          {src:require('../assets/images/introduction/roll1.png')},
          {src:require('../assets/images/introduction/roll1.png')},
          {src:require('../assets/images/introduction/roll1.png')}
        ],
      }
    },
    created(){
      this.txtData = TxtData;
    },
    methods:{
      changeActive(param){
        this.activeIndex = param;
      }
    },
    computed: {
      language(){
        return this.$store.state.isEnglish
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/css/public.scss';
  .introduction{
    @include wrap;
    .banner{
      width:100%;
      height:486px;
      background:url("~@/assets/images/introduction/ban.jpg") 50% 50% no-repeat;
    }
    .about{
      width:100%;
      height:533px;
      margin:70px auto 0;
      background: url("~@/assets/images/introduction/about.png") 50% 50% no-repeat;
      background-size:auto 533px;
      .about-in{
        width:1000px;
        margin:0 auto;
        padding-top:140px;
        .p-box{
          width:800px;
          padding:20px 10px 0 0;
          /*max-height:300px;*/
          /*overflow-y:auto;*/
          p{
            padding-top:12px;
            color: #787878;
            text-align:justify;
            text-justify:inter-ideograph;
            span{
              font-weight:600;
              /*color:#7e9da1;*/
              color:#8f1e25;
              font-family: DINNextW01Light;
            }
          }
        }
      }
    }
    .teach,.benefit{
      position: relative;
      width:1000px;
      margin:0 auto;
      text-align:left;
      font-size:0;
      .tit{
        margin:43px 0 35px;
      }
      .txt{
        width:1000px;
        text-indent:2em;
        text-align:justify;
        text-justify: inter-ideograph;
        color:#6c6c6a;
      }
      .deco{
        position:absolute;
      }
    }
    .teach{
      margin-top:10px;
      .deco{
        bottom:0;
        right:-150px;
      }
      .txt{
        text-indent:0;
        padding-bottom:10px;
        .name{
          font-weight:600;
          color:#8f1e25;
          font-family: DINNextW01Light;
        }
        .content{
          width:1000px;
          text-align:justify;
          text-justify: inter-ideograph;
          color:#6c6c6a;
          font-weight:200;
        }
      }
    }
    .benefit{
      text-align:right;
      .deco{
        top:-150px;
        left:-400px;
      }
    }
    .introduction-roll{
      position:relative;
      width:1036px;
      height:185px;
      margin:100px auto 80px;
    }
    .intro{
      display:block;
      width:1000px;
      margin:140px auto 100px;
    }
    .form{
      width:1000px;
      margin:170px auto 0;
      text-align:center;
      font-size:0;
      line-height:0;
      .title{
        width:600px;
        height:55px;
        margin:0 auto 60px;
        background:url("~@/assets/images/introduction/belt-tit.png") 50% 50% no-repeat;
        background-size:600px auto;
        letter-spacing:1px;
        p{
          font-size:38px;
          font-family: DINNeuzeitGroteskLTW01BdCn, Arial;
          font-weight:400;
          color:#921000;
          line-height:55px;
        }
      }
      .content{
        width:100%;
        font-size:0;
        @include clearfix;
        .left{
          float:left;
          width:50px;
          padding-top:7px;
          cursor: pointer;
          .up,.down{
            width:100%;
          }
        }
        .right{
          float:left;
          width:950px;
          height:837px;
          transition: 0.3s all ease-in-out;
          img{
            width:100%;
          }
        }
      }
    }
    .bot-img{
      @include botImg;
    }
  }
  @media screen and (max-width: 918px) {
    .introduction{
      @include wap-wrap;
      .wap-banner{
        width:12rem;
        height:3.52rem;
        background:url("~@/assets/images/introduction/ban3.jpg") 50% 50% no-repeat;
        background-size:12rem 3.52rem;

      }
      .about{
        width:12rem;
        height:5.33rem;
        margin:0.7rem auto 0;
        background: url("~@/assets/images/introduction/about.png") 50% 50% no-repeat;
        background-size:auto 5.33rem;
        .about-in{
          width:10rem;
          margin:0 auto;
          padding-top:1.4rem;
          .p-box{
            width:7.6rem;
            padding:0 0.1rem 0 0;
            max-height:3rem;
            overflow-y:auto;
            p{
              padding-top:0;
              text-align:justify;
              text-justify: inter-ideograph;
              color:#898989;
              span{
                font-weight:600;
                color:#8f1e25;
                font-family: DINNextW01Light;
              }
            }
          }
        }
      }
      .teach,.benefit{
        position: relative;
        width:10rem;
        margin:0 auto;
        text-align:left;
        font-size:0;
        .tit{
          margin:0.4rem auto;
          width:5rem;
          height:1.24rem;
        }
        .txt{
          width:10rem;
          text-align:justify;
          text-justify: inter-ideograph;
          font-size:0.24rem;
          line-height:0.44rem;
          color:#6c6c6a;
          word-break:break-all;
        }
        .deco{
          display:none;
          position:absolute;
        }
      }
      .teach{
        /*margin-top:0.2rem;*/
        .deco{
          bottom:0;
          right:-1.5rem;
        }
        .txt{
          .name{
            font-weight:600;
            font-size:0.22rem;
            text-indent:0;
          }
          .content{
            width:10rem;
            text-align:justify;
            text-justify: inter-ideograph;
            font-size:0.24rem;
            line-height:0.44rem;
            color:#6c6c6a;
            word-break:break-all;
          }
        }
      }
      .benefit{
        text-align:right;
        .deco{
          top:-1.5rem;
          left:-4rem;
        }
      }
      .introduction-roll{
        position:relative;
        width:10.36rem;
        height:1.85rem;
        margin:1.3rem auto 0.8rem;
        .swiper-slide{
          .img{
            width:10.36rem;
          }
        }
      }
      .intro{
        display:block;
        width:10rem;
        margin:1.2rem auto 1.6rem;
      }
      .form{
        width:10rem;
        margin:0 auto;
        text-align:center;
        font-size:0;
        line-height:0;
        .title{
          width:6rem;
          height:0.55rem;
          margin:0 auto 0.5rem;
          background:url("~@/assets/images/introduction/belt-tit.png") 50% 50% no-repeat;
          background-size:6rem auto;
          letter-spacing:1px;
          p{
            font-size:0.38rem;
            font-family: DINNeuzeitGroteskLTW01BdCn, Arial;
            font-weight:400;
            color:#921000;
            line-height:0.55rem;
          }
        }
        .content{
          width:100%;
          font-size:0;
          @include clearfix;
          .left{
            float:left;
            width:0.5rem;
            padding-top:0.08rem;
            cursor: pointer;
            .up,.down{
              width:100%;
              img{
                width:100%;
              }
            }
          }
          .right{
            float:left;
            width:9.5rem;
            height:8.37rem;
            transition: 0.3s all ease-in-out;
            img{
              width:100%;
            }
          }
        }
      }
      .bot-img{
        @include wap-botImg;
      }
    }
  }
</style>
