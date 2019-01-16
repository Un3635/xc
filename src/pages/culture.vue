<template>
    <div class="culture">
      <div class="banner"></div>
      <div class="define">
        <div class="tit">
          <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
          <span>{{language === 'cn' ? 'What is martial arts' : 'What is martial arts'}}</span>
          <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
          <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
        </div>
        <div class="txt-box">
          <div class="cont-box">
            <div class="cont">
              <p class="pre-txt" v-html="txtData.preDefine[language]"></p>
              <p class="txt-total" v-html="txtData.total[language]"></p>
              <p class="txt-item" v-html="txtData.item[language][0]"></p>
              <p class="txt-list" v-for="txt,index in txtData.list[language]">
                <span v-html="txt.name" style="font-weight:600;"></span>
                <span v-html="txt.cont"></span>
              </p>
              <p class="txt-item" v-html="txtData.item[language][1]"></p>
            </div>

          </div>
        </div>
      </div>
      <div class="picture">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item,index in picList" :key="index">
            <img :src="item.src" alt="">
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
      <div class="practice">
        <div class="practice-in">
          <div class="p-box">
            <p v-html="txtData.tai[language]"></p>
          </div>
        </div>
      </div>
      <div class="profit">
        <div class="tit">
          <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
          <span>{{language === 'cn' ? 'Benefits of martial arts' : 'Benefits of martial arts'}}</span>
          <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
          <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
        </div>
        <ul class="profit-item">
          <li class="item" v-for="item,index in txtData.benefit[language]">
            <div class="content">
              <div class="left"></div>
              <div class="right">
                <p class="tit" v-html="item.tit"></p>
                <div class="txt">
                  <p v-html="item.txt"></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import TxtData from '../data/culture_data'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "culture",
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
          {src:require('../assets/images/culture/roll-pic1.png')},
          {src:require('../assets/images/culture/roll-pic2.png')}
        ],
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
.culture{
  @include wrap;
  .banner{
    display:none;
    width:100%;
    height:736px;
    background:url("~@/assets/images/culture/ban.jpg") 50% 50% no-repeat;
  }
  .define{
    width:1000px;
    padding-top:120px;
    margin:0 auto;
    .tit{
      @include title;
      .circle{
        top:24px;
        left:550px;
      }
    }
    .txt-box{
      width:970px;
      height:457px;
      padding:20px 15px;
      margin:50px auto 0;
      background:url("~@/assets/images/culture/frame.png") 0 0 no-repeat;
      background-size:1000px 497px;
      text-align:center;
      .cont-box{
        width:970px;
        height:465px;
        margin:0 auto;
        overflow-y:auto;
        .cont{
          width:950px;
          margin:0 auto;
          p{
            font-size:16px;
            color: #898989;
            line-height:36px;
            /*font-weight:200;*/
            text-align:justify;
            -ms-text-justify: inter-ideograph;
            text-justify: inter-ideograph;
            word-break:break-all;
            &.pre-txt{
              padding-bottom:10px;
              color: #858585;
            }
            &.txt-item{
              padding-top:10px;
            }

          }
        }

      }
    }

  }
  .picture{
    position:relative;
    width:1068px;
    margin:150px auto;
  }
  .practice{
    width:100%;
    height:310px;
    background:url("~@/assets/images/culture/taichi.png") 50% 50% no-repeat;
    .practice-in{
      width:1000px;
      margin:0 auto;
      padding-top:50px;
      .p-box{
        width:874px;
        max-height:220px;
        overflow-y:auto;
        p{
          padding-right:70px;
          text-indent:2em;
          text-align:justify;
          text-justify: inter-ideograph;
        }
      }
    }
  }
  .profit{
    width:1000px;
    margin:120px auto 0;
    .tit{
      @include title;
      .circle{
        top:24px;
        left:625px;
      }
    }
    .profit-item{
      width:1000px;
      margin:50px auto 0;
      .item{
        width:940px;
        height:157px;
        padding:30px;
        margin-bottom:25px;
        background:url("~@/assets/images/culture/benefit-frame.png") 50% 50% no-repeat;
        background-size:1000px 217px;
        .content{
          width:100%;
          @include clearfix;
          .left{
            float:left;
            padding-top:18px;
            width:122px;
            height:122px;
            background:url("~@/assets/images/culture/benefit-icon1.png") 50% 100% no-repeat;
            background-size:122px 122px;
          }
          .right{
            float:right;
            width:770px;
            font-size:0;
            .tit{
              padding:10px;
              width:100%;
              text-align:left;
              font-size:18px;
              height:28px;
              line-height:28px;
              font-weight:600;
              color:#130000;
            }
            .txt{
              padding:0 10px;
              height:110px;
              overflow-y:auto;
              p{
                font-size:16px;
                font-weight:200;
                color:#473d3d;
                line-height:26px;
                text-align:justify;
                -ms-text-justify: inter-ideograph;
                text-justify: inter-ideograph;
              }
            }
          }
        }
        &:nth-of-type(2n+2){
          .content{
            .left{
              float:right;
            }
            .right{
              float:left;
              .tit{
                width:750px;
                text-align:right;
              }
            }
          }
        }
        &:hover{
          background:url("~@/assets/images/culture/benefit-frame-active.png") 50% 50% no-repeat;
        }
        &:nth-of-type(2){
          .content{
            .left{
              background:url("~@/assets/images/culture/benefit-icon2.png") 50% 100% no-repeat;
            }
          }
        }
        &:nth-of-type(3){
          .content{
            .left{
              background:url("~@/assets/images/culture/benefit-icon3.png") 50% 100% no-repeat;
            }
          }
        }
        &:nth-of-type(4){
          .content{
            .left{
              background:url("~@/assets/images/culture/benefit-icon4.png") 50% 100% no-repeat;
            }
          }
        }
      }
    }
  }
  .bot-img{
    @include botImg;
  }
}
  @media screen and (max-width: 918px) {
    .culture{
      @include wap-wrap;
      .banner{
        display:none;
        width:12rem;
        height:4.6rem;
        background:url("~@/assets/images/culture/ban.jpg") 50% 50% no-repeat;
        background-size:12rem auto;
      }
      .define{
        width:10rem;
        padding-top:1.2rem;
        margin:0 auto;
        .tit{
          @include wap-title;
          .circle{
            top:0.22rem;
            left:6.1rem;
          }
        }
        .txt-box{
          width:9.7rem;
          height:4.57rem;
          padding:0.2rem 0.15rem;
          margin:0.5rem auto 0;
          background:url("~@/assets/images/culture/frame.png") 0 0 no-repeat;
          background-size:10rem 4.97rem;
          text-align:center;
          .cont-box{
            width:9.7rem;
            height:4.52rem;
            margin:0 auto;
            overflow-y:auto;
            .cont{
              width:9.5rem;
              margin:0 auto;
              p{
                font-size:0.2rem;
                color: #898989;
                line-height:0.36rem;
                font-weight:400;
                text-align:justify;
                -ms-text-justify: inter-ideograph;
                text-justify: inter-ideograph;
                word-break:break-all;
                &.pre-txt{
                  padding-bottom:0.15rem;
                }
              }
            }

          }
        }

      }
      .picture{
        position:relative;
        width:10.68rem;
        margin:1.5rem auto;
      }
      .practice{
        width:12rem;
        height:3.1rem;
        background:url("~@/assets/images/culture/taichi.png") 50% 50% no-repeat;
        background-size:19.2rem 3.1rem;
        .practice-in{
          width:10rem;
          margin:0 auto;
          padding-top:0.45rem;
          .p-box{
            width:8.74rem;
            max-height:2.1rem;
            p{
              padding-right:0.7rem;
            }
          }
        }
      }
      .profit{
        width:10rem;
        margin:1.2rem auto 0;
        .tit{
          @include wap-title;
          .circle{
            top:0.24rem;
            left:6.3rem;
          }
        }
        .profit-item{
          width:10rem;
          margin:0.5rem auto 0;
          .item{
            width:9.4rem;
            height:1.57rem;
            padding:0.3rem;
            margin-bottom:0.25rem;
            background:url("~@/assets/images/culture/benefit-frame.png") 50% 50% no-repeat;
            background-size:10rem 2.17rem;
            .content{
              width:100%;
              @include clearfix;
              .left{
                float:left;
                padding-top:0.18rem;
                width:1.22rem;
                height:1.22rem;
                background:url("~@/assets/images/culture/benefit-icon1.png") 50% 100% no-repeat;
                background-size:1.22rem 1.22rem;
              }
              .right{
                float:right;
                width:7.7rem;
                font-size:0;
                .tit{
                  padding:0.1rem;
                  width:100%;
                  text-align:left;
                  font-size:0.18rem;
                  height:0.28rem;
                  line-height:0.28rem;
                  font-weight:600;
                  color:#130000;
                }
                .txt{
                  padding:0 0.1rem;
                  height:1.1rem;
                  overflow-y:auto;
                  p{
                    font-size:0.16rem;
                    font-weight:200;
                    color:#473d3d;
                    line-height:0.28rem;
                    text-align:justify;
                    -ms-text-justify: inter-ideograph;
                    text-justify: inter-ideograph;
                  }
                }
              }
            }
            &:nth-of-type(2n+2){
              .content{
                .left{
                  float:right;
                }
                .right{
                  float:left;
                  .tit{
                    width:7.5rem;
                    text-align:right;
                  }
                }
              }
            }
            &:hover{
              background:url("~@/assets/images/culture/benefit-frame-active.png") 50% 50% no-repeat;
              background-size:10rem 2.17rem;
            }
            &:nth-of-type(2){
              .content{
                .left{
                  background:url("~@/assets/images/culture/benefit-icon2.png") 50% 100% no-repeat;
                  background-size:1.22rem 1.22rem;
                }
              }
            }
            &:nth-of-type(3){
              .content{
                .left{
                  background:url("~@/assets/images/culture/benefit-icon3.png") 50% 100% no-repeat;
                  background-size:1.22rem 1.22rem;
                }
              }
            }
            &:nth-of-type(4){
              .content{
                .left{
                  background:url("~@/assets/images/culture/benefit-icon4.png") 50% 100% no-repeat;
                  background-size:1.22rem 1.22rem;
                }
              }
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
