<template>
    <div class="lions">
      <div class="banner">
        <div class="banner-top">
          <div class="center">
            <div class="left">
              <p>we offer many different types of performances, from the standard two lion performance to a huge, awe inducing pole routine. </p>
            </div>
            <img class="right" src="~@/assets/images/lions/ban-txt.png"/>
          </div>
        </div>
        <div class="banner-bottom">
          <div class="center">
            <img class="left" src="~@/assets/images/lions/tit2.png"/>
            <div class="right">
              Though it might seem as if lion dances are restricted to Chinese New Year, that isn't true! Lions are said to bring luck wherever they go, which is perfect for weddings, grand openings, or any other special event you can think of. If lions aren't enough, we also have extras like synchronized pop music, dragons, bubble and smoke machines, and many more that can be requested.
            </div>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="center">
          <div class="tit-word">About Lion Dance</div>
          <p class="txt">Lion dance is a form of traditional dance in Chinese culture.  Traditionally, lion dances are performed during
            Chinese New Year in order to bring good fortune, and good harvest for the year to come.
            It may also be performed at important occasions such as business opening events, special celebrations or
            wedding ceremonies, or may be used to honor special guests.</p>
          <p class="txt">Overtime, lion dance has evolved into a performance art combining dance, wushu, and music altogether.
            The elaborate movements require solid stances, powerful jumps, fast and strong footworks,
            which are all foundations in martial arts.  The creativity of the choreography, and the rhythmic and pulsating
            of the live instrumental accompaniment (usually include drums, and cymbals) - all play an important part
            in bringing out the liveliness of the lions, and the vitality of the overall performance.
            It requires massive team work to blend all these skills together and transform into the best lion dance performances.</p>
        </div>
      </div>
      <div class="pic-wall">
        <div class="center">
          <img class="cloud" src="~@/assets/images/lions/cloud3.png"/>
          <div class="title">Our Performances</div>
          <div class="lion-roll">
            <swiper :options="swiperOption">
              <swiper-slide v-for="item,index in picList" :key="index">
                <img :src="item.src" alt="">
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
        </div>
      </div>
      <div class="bg-pic">
        <ul class="item-list">
          <li class="item">
            <div class="content">
              <p class="tit" v-html="txtData.contact[0].title[language]"></p>
              <p class="txt" v-html="txtData.contact[0].txt[language]"></p>
            </div>
            <img class="icon" src="~@/assets/images/lions/contact-icon1.png"/>
          </li>
          <li class="item">
            <div class="content">
              <p class="tit" v-html="txtData.contact[1].title[language]"></p>
              <p class="txt" v-html="txtData.contact[1].txt[language]"></p>
            </div>
            <img class="icon" src="~@/assets/images/lions/contact-icon2.png"/>
          </li>
          <li class="item">
            <div class="content">
              <p class="tit" v-html="txtData.contact[2].title[language]"></p>
              <p class="txt" v-html="txtData.contact[2].txt[language]"></p>
            </div>
            <img class="icon" src="~@/assets/images/lions/contact-icon3.png"/>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import TxtData from '../data/lions_data'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return{
        txtData:'',
        swiperOption: {
          autoplay: true,
          speed: 1000,
          loop:true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        picList:[
          {src:require('../assets/images/lions/roll-pic.png')},
          {src:require('../assets/images/lions/roll-pic.png')},
          {src:require('../assets/images/lions/roll-pic.png')}
        ]
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
  .lions {
     width:100%;
     min-width:1200px;
    .banner{
      width:100%;
      height:calc(100vh - 148px);
      background:url("~@/assets/images/lions/lions-bg.jpg") 50% 0 no-repeat;
      background-attachment: fixed;
      &:before {
        content: ' ';
        position: fixed;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url("~@/assets/images/lions/body-bg.jpg") center 0 no-repeat;
        background-size: cover;
      }
      .banner-top{
        width:100%;
        height:calc(100vh - 148px - 200px);
        background:rgba(0,0,0,0.6);
        .center{
          width:1000px;
          margin:0 auto;
          overflow:hidden;
          @include clearfix;
          .left{
            float:left;
            width:660px;
            height:60px;
            padding:15px 18px;
            margin:350px 50px 0 0;
            border:1px solid rgba(209, 172, 153, 0.75);
            text-align:center;
            &:hover{
              border:1px solid #d1ac99;
            }
            p{
              width:100%;
              font-size:22px;
              font-weight:200;
              color:#fbf8f6;
              line-height:30px;
              text-align: justify;
              text-justify: inter-ideograph;
              &:hover{
                color:#d1ac99;
              }
            }
          }
          .right{
            float:right;
            width:156px;
            height:367px;
            padding-top:100px;
          }
        }
      }
      .banner-bottom{
        width:100%;
        height:200px;
        background: #6d4836;
        .center{
          width:1000px;
          margin:0 auto;
          font-size:0;
          @include clearfix;
          .left{
            float:left;
            width:164px;
            height:205px;
            margin-top:-20px;
          }
          .right{
            float:right;
            width:800px;
            padding-top:50px;
            font-size:18px;
            font-weight:200;
            color:#eee;
            line-height:24px;
            text-align: justify;
            text-justify: inter-ideograph;
          }
        }
      }
    }
    .about{
      width:100%;
      height:600px;
      .center{
        width:1000px;
        margin:180px auto 0;
        font-size:0;
        text-align:center;
        .tit-word{
          width:100%;
          text-align:center;
          font-size:44px;
          font-weight:200;
          color:#fff;
          padding-bottom:20px;
          font-family:DINNeuzeitGroteskLT,Arial;
        }
        .txt{
          padding-top:15px;
          font-size:18px;
          color:#fff;
          line-height:26px;
          text-indent:2em;
          font-weight:200;
          text-align:justify;
          text-justify:inter-ideograph;
        }
      }
    }
    .pic-wall{
      width:100%;
      /*margin-bottom:200px;*/
      height:460px;
      /*background: rgba(41, 29, 15, 0.8);*/
      background: rgba(74, 48, 34, 0.8);
      .center{
        position:relative;
        width:1076px;
        margin:0 auto;
        .cloud{
          position:absolute;
          top:-80px;
          right:-200px;
          width:300px;
        }
        .title{
          width:100%;
          text-align:center;
          font-size:44px;
          color:#fff;
          padding-top:70px;
          font-weight:200;
          font-family:DINNeuzeitGroteskLT,Arial;
        }
        .lion-roll{
          padding-top:50px;
          margin:0 auto;
          width:1076px;
          position:relative;
        }
      }

    }
    .bg-pic{
      width:100%;
      /*height:300px;*/
      background:rgba(0,0,0,0.2);
      .item-list{
        width:1000px;
        padding:180px 0 180px;
        margin:0 auto;
        @include clearfix;
        .item{
          float:left;
          width:306px;
          position: relative;
          margin-right:35px;
          transition:0.3s all ease-in;
          .content{
            margin-top:54px;
            width:308px;
            height:208px;
            border:1px solid rgba(209, 172, 153, 0.75);
            border-radius:8px;
            text-align:center;
            .tit{
              padding:75px 0 17px;
              color: rgba(255, 255, 255, 0.8);
              font-size:20px;
              font-weight:600;
            }
            .txt{
              color: #886e64;
              font-size:17px;
              line-height:24px;
            }
          }
          .icon{
            width:115px;
            height:115px;
            position:absolute;
            top:0;
            left:104px;
          }
          &:last-of-type{
            margin-right:0;
          }
          &:hover{
            .content{
              background:rgba(0,0,0,0.4);
              .tit{
                color:#fff;
              }
              .txt{
                color: #9e8174;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 918px) {
    .lions {
      width:12rem;
      min-width:12rem;
      .banner{
        width:12rem;
        height:auto;
        /*height:calc(100vh - 1.48rem);*/
        background:url("~@/assets/images/lions/lions-bg.jpg") 50% 0 no-repeat;
        background-attachment: fixed;
        background-size:12rem auto;
        overflow:hidden;
        &:before {
          content: ' ';
          position: fixed;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: url("~@/assets/images/lions/body-bg.jpg") center 0 no-repeat;
          background-size: auto 100%;
        }
        .banner-top{
          width:12rem;
          height:auto;
          /*height:calc(100vh - 3.48rem);*/
          background:rgba(0,0,0,0.6);
          .center{
            width:10rem;
            margin:0 auto;
            overflow:hidden;
            @include clearfix;
            .left{
              float:left;
              width:6.6rem;
              height:0.9rem;
              padding:0.15rem 0.18rem;
              margin:2.8rem 0.5rem 1.5rem 0;
              border:1px solid rgba(209, 172, 153, 0.75);
              text-align:center;
              &:hover{
                border:1px solid #d1ac99;
              }
              p{
                width:6.6rem;
                font-size:0.2rem;
                font-weight:200;
                color:#fbf8f6;
                line-height:0.3rem;
                text-align: justify;
                text-justify: inter-ideograph;
                &:hover{
                  color:#d1ac99;
                }
              }
            }
            .right{
              float:right;
              width:1.4rem;
              height:auto;
              padding-top:0.8rem;
            }
          }
        }
        .banner-bottom{
          width:12rem;
          height:2.2rem;
          background: rgb(136, 107, 92);
          .center{
            width:10rem;
            margin:0 auto;
            font-size:0;
            @include clearfix;
            .left{
              float:left;
              width:1.64rem;
              height:2.05rem;
              margin-top:-0.2rem;
            }
            .right{
              float:right;
              width:8rem;
              padding-top:0.4rem;
              font-size:0.16rem;
              font-weight:200;
              color:#d6cfca;
              line-height:0.26rem;
              text-align: justify;
              text-justify: inter-ideograph;
            }
          }
        }
      }
      .about{
        width:12rem;
        height:6rem;
        .center{
          width:10rem;
          margin:1.8rem auto 0;
          font-size:0;
          text-align:center;
          .tit-word{
            width:10rem;
            text-align:center;
            font-size:0.4rem;
            font-weight:200;
            color: #fff;
            padding-bottom:0.2rem;
            font-family:DINNeuzeitGroteskLT,Arial;
          }
          .txt{
            padding-top:0.15rem;
            font-size:0.16rem;
            color: rgb(255, 255, 255);
            line-height:0.26rem;
            text-indent:2em;
            font-weight:200;
            text-align:justify;
            text-justify:inter-ideograph;
          }
        }
      }
      .pic-wall{
        width:12rem;
        /*margin-bottom:2rem;*/
        height:4.6rem;
        background: rgba(41, 29, 15, 0.6);
        .center{
          position:relative;
          width:10.76rem;
          margin:0 auto;
          .cloud{
            position:absolute;
            top:-0.6rem;
            right:-0.2rem;
            width:2.8rem;
          }
          .title{
            width:100%;
            text-align:center;
            font-size:0.4rem;
            color:#fff;
            padding-top:0.7rem;
            font-weight:200;
            font-family:DINNeuzeitGroteskLT,Arial;
          }
          .lion-roll{
            padding-top:0.5rem;
            margin:0 auto;
            width:10.76rem;
            position:relative;
          }
        }

      }
      .bg-pic{
        width:12rem;
        background:rgba(0,0,0,0.2);
        .item-list{
          width:10rem;
          padding:1.8rem 0;
          margin:0 auto;
          @include clearfix;
          .item{
            float:left;
            width:3.06rem;
            position: relative;
            margin-right:0.35rem;
            transition:0.3s all ease-in;
            .content{
              margin-top:0.54rem;
              width:3.08rem;
              height:2.8rem;
              border:0.01rem solid rgba(209, 172, 153, 0.75);
              border-radius:0.08rem;
              text-align:center;
              .tit{
                padding:0.75rem 0 0.17rem;
                color: rgba(255, 255, 255, 0.8);
                font-size:0.2rem;
                font-weight:400;
              }
              .txt{
                display:block;
                width:2.7rem;
                margin:0 auto;
                color: #886e64;
                font-size:0.16rem;
                line-height:0.28rem;
                font-weight:200;
                word-break:break-word;
              }
            }
            .icon{
              width:1.15rem;
              height:1.15rem;
              position:absolute;
              top:0;
              left:1.04rem;
            }
            &:last-of-type{
              margin-right:0;
            }
            &:hover{
              .content{
                background:rgba(0,0,0,0.4);
                .tit{
                  color:#fff;
                }
                .txt{
                  color: #9e8174;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
