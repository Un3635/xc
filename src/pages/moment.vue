<template>
    <div class="moment">
         <div class="banner"></div>
       <div class="team-pic">
         <div class="tit">
           <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
           <span>{{language === 'cn' ? 'Study in Thunder' : 'Study in Thunder'}}</span>
           <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
           <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
         </div>
         <div class="pic"></div>
       </div>
      <div class="share-pic">
        <div class="center">
          <div class="share-roll-up">
            <swiper :options="swiperOption1">
              <swiper-slide v-for="item,index in picUpList" :key="index">
                <img :src="item.src" alt="">
              </swiper-slide>
            </swiper>
          </div>
          <div class="share-roll-bot">
            <swiper :options="swiperOption2">
              <swiper-slide v-for="item,index in picBotList" :key="index">
                <img :src="item.src" alt="">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class= "row-pic">
        <div class="left">
          <img class="pic" src="~@/assets/images/moment/pic0.png"/>
        </div>
        <div class="right">
          <ul class="list">
            <li class="item" v-for="item in rowList">
              <div class="top-img"></div>
              <p class="p1">Moment</p>
              <p class="p2">Study in Thunder </p>
              <img class="arrow" src="~@/assets/images/moment/arrow.png"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="intro"></div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import TxtData from '../data/moment_data'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "moment",
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return{
        txtData:'',
        swiperOption: {
          autoplay:true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        picUpList:[
          {src:require('../assets/images/moment/roll-up1.png')},
          {src:require('../assets/images/moment/roll-up2.png')}
        ],
        picBotList:[
          {src:require('../assets/images/moment/roll-bot1.png')},
          {src:require('../assets/images/moment/roll-bot2.png')}
        ],
        rowList:[
          {src:require('../assets/images/moment/pic1.png')},
          {src:require('../assets/images/moment/pic2.png')},
          {src:require('../assets/images/moment/pic3.png')},
          {src:require('../assets/images/moment/pic4.png')}
        ],
        swiperOption1: {
          autoplay: true,
          speed: 3000,
          loop:true
        },
        swiperOption2: {
          autoplay: true,
          speed: 3000,
          loop:true
        },
      }
    },
    created(){
      this.txtData = TxtData;
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
  .moment{
    @include wrap;
    .banner{
      display:block;
      width:100%;
      height:380px;
      background:url("~@/assets/images/moment/ban.jpg") 50% 50% no-repeat;
    }
    .team-pic{
      width:1200px;
      margin:100px auto 60px;
      .tit{
        @include title;
        .circle{
          top:22px;
          left:570px;
        }
      }
      .pic{
        margin-top:50px;
        width:1200px;
        height:455px;
        background:url("~@/assets/images/moment/team-pic.png") 50% 50% no-repeat;
      }
    }
    .share-pic{
      margin:120px auto 250px;
      width:100%;
      height:374px;
      background:url("~@/assets/images/moment/share.png") 50% 50% no-repeat;
      background-size:auto 374px;
      .center{
        width:1200px;
        margin:0 auto;
        padding-top:42px;
        font-size:0;
        .share-roll-up{
          width:849px;
          height:152px;
          margin-left:352px;
        }
        .share-roll-bot{
          width:849px;
          height:152px;
          margin-left:69px;
        }
      }
    }
    .row-pic{
      width:1370px;
      margin:0 auto 150px;
      @include clearfix;
      .left{
        float:left;
        width:437px;
        height:363px;
        margin-right:15px;
        background:url("~@/assets/images/moment/row-pic.png");
        background-size:437px 363px;
        .pic{
          width:231px;
          height:348px;
          margin-left:165px;
          margin-top:-70px;
          border:5px solid #fff;
          border-radius:4px;
          &:hover{
            box-shadow: 0 3px 10px rgba(233, 0, 14, 0.26);
          }
        }
      }
      .right{
        height:363px;
        float:left;
        .list{
          @include clearfix;
          .item{
            float:left;
            width:180px;
            height:363px;
            background:#fdfaf3;
            margin:6px;
            transition:0.4s all ease-in;
            .top-img{
              width:100%;
              height:173px;
              background:url("~@/assets/images/moment/pic1.png") 50% 50% no-repeat;
              background-size:auto 173px;
            }
            .p1{
              padding-left:20px;
              padding-top:30px;
            }
            .p2{
              padding-left:20px;
              font-size:16px;
              line-height:24px;
              color:#ccc;
            }
            .arrow{
              display:none;
              width:56px;
              height:12px;
              margin:85px 0 0 20px;
              transition:1s all ease-in;
            }
            &:nth-of-type(2){
              .top-img{
                background:url("~@/assets/images/moment/pic2.png") 50% 50% no-repeat;
                background-size:auto 173px;
              }
            }
            &:nth-of-type(3){
              .top-img{
                background:url("~@/assets/images/moment/pic3.png") 50% 50% no-repeat;
                background-size:auto 173px;
              }
            }
            &:nth-of-type(4){
              .top-img{
                background:url("~@/assets/images/moment/pic4.png") 50% 50% no-repeat;
                background-size:auto 173px;
              }
              .arrow{
                transform:rotateZ(180deg);
              }
            }
            &:hover{
              width:203px;
              box-shadow: 0 0 10px #d6d6d6;
              .arrow{
                display:block;
                transition:1s all ease-in;
              }
            }
          }
        }
      }
    }
    .intro{
      margin-bottom:160px;
      width:100%;
      height:610px;
      background:url("~@/assets/images/moment/thunder-pic2.png") 50% 50% no-repeat;
    }
    .bot-img{
      @include botImg;
    }
  }
  @media screen and (max-width: 918px) {
    .moment{
      @include wap-wrap;
      .banner{
        display:block;
        width:12rem;
        height:4.2rem;
        background:url("~@/assets/images/moment/ban.jpg") 50% 50% no-repeat;
        background-size:auto 4.2rem;
      }
      .team-pic{
        width:12rem;
        margin:1rem auto 0.6rem;
        .tit{
          @include wap-title;
          .circle{
            top:0.22rem;
            left:5.7rem;
          }
        }
        .pic{
          margin-top:0.5rem;
          width:12rem;
          height:4.55rem;
          background:url("~@/assets/images/moment/team-pic.png") 50% 50% no-repeat;
          background-size:10rem;
        }
      }
      .share-pic{
        margin:1.2rem auto 2.5rem;
        width:100%;
        height:3.74rem;
        background:url("~@/assets/images/moment/share.png") 50% 50% no-repeat;
        background-size:auto 3.74rem;
        .center{
          width:12rem;
          margin:0 auto;
          padding-top:0.42rem;
          font-size:0;
          .share-roll-up,
          .share-roll-bot {
            width:8.49rem;
            height:1.52rem;
            margin-left:3.52rem;
            .swiper-slide{
              width:8.49rem;
              height:1.52rem;
              margin:0;
              padding:0;
              img{
                width:8.49rem;
                height:1.52rem;
              }
            }
          }
          .share-roll-bot{
            margin-left:0.69rem;
          }
        }
      }
      .row-pic{
        width:12rem;
        margin:0 auto 1.5rem;
        @include clearfix;
        .left{
          float:left;
          width:4.37rem;
          height:3.63rem;
          margin-right:0.15rem;
          background:url("~@/assets/images/moment/row-pic.png");
          background-size:4.37rem 3.63rem;
          .pic{
            width:2.31rem;
            height:3.48rem;
            margin-left:1.65rem;
            margin-top:-0.7rem;
            border:0.05rem solid #fff;
            border-radius:0.04rem;
            &:hover{
              box-shadow: 0 0.03rem 0.1rem rgba(233, 0, 14, 0.26);
            }
          }
        }
        .right{
          height:3.63rem;
          float:left;
          .list{
            @include clearfix;
            .item{
              float:left;
              width:1.6rem;
              height:3.63rem;
              background:#fdfaf3;
              margin:0.06rem;
              transition:0.4s all ease-in;
              .top-img{
                width:100%;
                height:1.73rem;
                background:url("~@/assets/images/moment/pic1.png") 50% 50% no-repeat;
                background-size:auto 1.73rem;
              }
              .p1{
                padding-left:0.2rem;
                padding-top:0.3rem;
              }
              .p2{
                display:none;
                padding-left:0.2rem;
                font-size:0.16rem;
                line-height:0.24rem;
                color:#ccc;
              }
              .arrow{
                display:none;
                width:0.56rem;
                height:0.12rem;
                margin:0.85rem 0 0 0.2rem;
                transition:1s all ease-in;
              }
              &:nth-of-type(2){
                .top-img{
                  background:url("~@/assets/images/moment/pic2.png") 50% 50% no-repeat;
                  background-size:auto 1.73rem;
                }
              }
              &:nth-of-type(3){
                .top-img{
                  background:url("~@/assets/images/moment/pic3.png") 50% 50% no-repeat;
                  background-size:auto 1.73rem;
                }
              }
              &:nth-of-type(4){
                .top-img{
                  background:url("~@/assets/images/moment/pic4.png") 50% 50% no-repeat;
                  background-size:auto 1.73rem;
                }
                .arrow{
                  transform:rotateZ(180deg);
                }
              }
              &:hover{
                width:2.03rem;
                box-shadow: 0 0 0.1rem #d6d6d6;
                .arrow{
                  display:block;
                  transition:1s all ease-in;
                }
              }
            }
          }
        }
      }
      .intro{
        margin-bottom:1.6rem;
        width:12rem;
        height:6.1rem;
        background:url("~@/assets/images/moment/thunder-pic2.png") 50% 50% no-repeat;
        background-size:19.2rem auto;
      }
      .bot-img{
        @include wap-botImg;
      }
    }
  }
</style>
