<template>
    <div class="team">
       <div class="banner"></div>
       <div class="pic-team"></div>
      <!--<div class="line"></div>-->
      <div class="star">
        <div class="tit">
          <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
          <span>{{language === 'cn' ? '明星教练' : 'Star Coach'}}</span>
          <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
          <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
        </div>
        <div class="list-box">
          <div class="list list01 list-left">
            <div class="teach-roll">
                <swiper :options="swiperOption1">
                  <swiper-slide v-for="item,index in picList[0]" :key="index">
                    <img :src="item.src" alt="">
                  </swiper-slide>
                </swiper>
                <div class="swiper-pagination1" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '高磊' : 'Lei Gao'}}</p>
                <p class="des" v-html="txtData.rollData[0][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list02 list-right">
            <div class="teach-roll">
              <swiper :options="swiperOption2">
                <swiper-slide v-for="item,index in picList[1]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination2" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '赵轲' : 'Ke Zhao'}}</p>
                <p class="des" v-html="txtData.rollData[1][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list03 list-left">
            <div class="teach-roll">
              <swiper :options="swiperOption3">
                <swiper-slide v-for="item,index in picList[2]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination3" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '郑书艺' : 'Shuyi Zheng'}}</p>
                <p class="des" v-html="txtData.rollData[2][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list04 list-right">
            <div class="teach-roll">
              <swiper :options="swiperOption4">
                <swiper-slide v-for="item,index in picList[3]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination4" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '王孩' : 'Hai Wang'}}</p>
                <p class="des" v-html="txtData.rollData[3][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list05 list-left">
            <div class="teach-roll">
              <swiper :options="swiperOption5">
                <swiper-slide v-for="item,index in picList[4]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination5" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '夏志阳' : 'Zhiyang Xia'}}</p>
                <p class="des" v-html="txtData.rollData[4][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list06 list-right">
            <div class="teach-roll">
              <swiper :options="swiperOption6">
                <swiper-slide v-for="item,index in picList[5]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination6" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '刘琼' : 'Qiong Liu'}}</p>
                <p class="des" v-html="txtData.rollData[5][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
          <div class="list list07 list-left">
            <div class="teach-roll">
              <swiper :options="swiperOption7">
                <swiper-slide v-for="item,index in picList[6]" :key="index">
                  <img :src="item.src" alt="">
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination7" slot="pagination"></div>
            </div>
            <div class="item">
              <div class="txt">
                <p class="name">{{language === 'cn' ? '李辉志' : 'Huizhi Li'}}</p>
                <p class="des" v-html="txtData.rollData[6][language]"></p>
                <img class="bot-deco" src="~@/assets/images/team/bot-deco.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import TxtData from '../data/team_data'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "team",
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return {
        txtData:'',
        swiperOption1: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination1'
          }
        },
        swiperOption2: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination2'
          }
        },
        swiperOption3: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination3'
          }
        },
        swiperOption4: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination4'
          }
        },
        swiperOption5: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination5'
          }
        },
        swiperOption6: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination6'
          }
        },
        swiperOption7: {
          autoplay: true,
          speed: 2000,
          loop:true,
          pagination: {
            el: '.swiper-pagination7'
          }
        },
        picList:[
          [
            {src:require('../assets/images/team/teach1.png')},
            {src:require('../assets/images/team/teach2.png')},
            {src:require('../assets/images/team/teach3.png')},
            {src:require('../assets/images/team/teach4.png')},
            {src:require('../assets/images/team/teach5.png')},
            {src:require('../assets/images/team/teach6.png')}
          ],
          [
            {src:require('../assets/images/team/zhaoke1.png')},
            {src:require('../assets/images/team/zhaoke2.png')},
            {src:require('../assets/images/team/zhaoke3.png')},
            {src:require('../assets/images/team/zhaoke4.png')}
          ],
          [
            {src:require('../assets/images/team/zhengshuyi1.png')},
            {src:require('../assets/images/team/zhengshuyi2.png')},
            {src:require('../assets/images/team/zhengshuyi3.png')},
            {src:require('../assets/images/team/zhengshuyi4.png')},
            {src:require('../assets/images/team/zhengshuyi5.png')},
            {src:require('../assets/images/team/zhengshuyi6.png')}
          ],
          [
            {src:require('../assets/images/team/wanghai1.png')},
            {src:require('../assets/images/team/wanghai2.png')},
            {src:require('../assets/images/team/wanghai3.png')},
            {src:require('../assets/images/team/wanghai4.png')},
            {src:require('../assets/images/team/wanghai5.png')},
            {src:require('../assets/images/team/wanghai6.png')},
            {src:require('../assets/images/team/wanghai7.png')},
            {src:require('../assets/images/team/wanghai8.png')}
          ],
          [
            {src:require('../assets/images/team/xiazhiyang1.png')},
            {src:require('../assets/images/team/xiazhiyang2.png')},
            {src:require('../assets/images/team/xiazhiyang3.png')},
            {src:require('../assets/images/team/xiazhiyang4.png')},
            {src:require('../assets/images/team/xiazhiyang5.png')},
            {src:require('../assets/images/team/xiazhiyang6.png')},
            {src:require('../assets/images/team/xiazhiyang7.png')},
            {src:require('../assets/images/team/xiazhiyang8.png')},
            {src:require('../assets/images/team/xiazhiyang9.png')}
          ],
          [
            {src:require('../assets/images/team/liuqiong1.png')},
            {src:require('../assets/images/team/liuqiong2.png')},
            {src:require('../assets/images/team/liuqiong3.png')}
          ],
          [
            {src:require('../assets/images/team/lihuizhi01.png')},
            {src:require('../assets/images/team/lihuizhi02.png')},
            {src:require('../assets/images/team/lihuizhi03.png')},
            {src:require('../assets/images/team/lihuizhi04.png')},
            {src:require('../assets/images/team/lihuizhi05.png')},
            {src:require('../assets/images/team/lihuizhi06.png')},
            {src:require('../assets/images/team/lihuizhi07.png')},
            {src:require('../assets/images/team/lihuizhi08.png')}
          ],

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
  .team{
    @include wrap;
    .banner{
      display:none;
      width:100%;
      height:869px;
      background:url("~@/assets/images/team/ban.jpg") 50% 50% no-repeat;
    }
    .pic-team{
      padding-top:260px;
      width:1200px;
      height:380px;
      margin:0 auto 60px;
      background:url("~@/assets/images/team/pic2.png") 50% 50% no-repeat;
      background-size:100% 380px;
    }
    .line{
      margin-bottom:57px;
      width:100%;
      height:7px;
      background:url("~@/assets/images/team/line.png") 50% 50% no-repeat;
    }
    .star{
      width:1200px;
      margin:0 auto;
      .tit{
        @include title;
        span{
          color:#910e00;
        }
        .circle{
          top:26px;
          left:654px;
        }
      }
      .list-box{
        margin:30px auto 0;
        overflow: hidden;
        .list{
          position:relative;
          width:1200px;
          margin:60px auto 0;
          overflow: hidden;
          .teach-roll{
            position:absolute;
            top:0;
            width:294px;
            height:294px;
            background:#ebe6dd;
            border:4px solid #eee;
            &:hover{
              border:4px solid #a10207;
            }
          }
          .item{
            width:100%;
            .txt{
              width:1090px;
              height:315px;
              background:rgba(224,220,209,0.3);
              margin:77px 0 0 110px;
              .name{
                display:inline-block;
                font-size:31px;
                color:#a10207;
                line-height:50px;
                border-bottom:2px solid #7e5428;
                margin:50px 25px 25px 215px;
              }
              .des{
                font-size:16px;
                line-height:24px;
                color:#706e68;
                height:124px;
                padding:0 25px 0 215px;
                text-align: justify;
                text-justify: inter-ideograph;
                overflow-y: auto;
              }
              .bot-deco{
                width:650px;
                height:14px;
                padding-top:20px;
              }
            }
          }
        }
        .list-left{
          .teach-roll{
            left:0;
          }
          .item{
            .bot-deco{
              padding-left:215px;
            }
          }
        }
        .list-right{
          .teach-roll{
            right:0;
          }
          .item{
            .txt{
              margin:77px 110px 0 0;
              text-align:right;
              .name{
                margin:50px 215px 25px 25px;
              }
              .des{
                padding:0 215px 0 25px;
              }
              .bot-deco{
                padding-right:415px;
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
    .team{
      @include wap-wrap;
      .banner{
        display:none;
        width:100%;
        height:5.43rem;
        background:url("~@/assets/images/team/ban.jpg") 50% 50% no-repeat;
        background-size:100% 5.43rem;
      }
      .pic-team{
        padding-top:3rem;
        width:12rem;
        height:7.59rem;
        margin:0 auto 1.24rem;
        background:url("~@/assets/images/team/pic1.png") 50% 50% no-repeat;
        background-size:100% 7.59rem;
      }
      .line{
        margin:0 auto 0.57rem;
        width:10rem;
        height:0.06rem;
        background:url("~@/assets/images/team/line.png") 50% 50% no-repeat;
      }
      .star{
        width:12rem;
        margin:0 auto;
        .tit{
          @include wap-title;
          span{
            color:#555;
          }
          .circle{
            top:0.25rem;
            left:6.56rem;
          }
        }
        .list-box{
          margin:0.6rem auto 0;
          overflow: hidden;
          .list{
            position:relative;
            width:10rem;
            margin:0.6rem auto 0;
            overflow: hidden;
            .teach-roll{
              position:absolute;
              top:0;
              width:2.94rem;
              height:2.94rem;
              background:#ebe6dd;
              border:0.04rem solid #eee;
              &:hover{
                border:0.04rem solid #a10207;
              }
            }
            .item{
              width:100%;
              .txt{
                width:8.9rem;
                height:3.15rem;
                background:rgba(224,220,209,0.3);
                margin:0.77rem 0 0 1.1rem;
                .name{
                  display:inline-block;
                  font-size:0.31rem;
                  color:#a10207;
                  line-height:0.5rem;
                  border-bottom:0.02rem solid #7e5428;
                  margin:0.5rem 0.25rem 0.25rem 2.15rem;
                }
                .des{
                  font-size:0.16rem;
                  line-height:0.28rem;
                  color:#706e68;
                  height:1.24rem;
                  padding:0 0.25rem 0 2.15rem;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  overflow-y: auto;
                }
                .bot-deco{
                  width:6.5rem;
                  height:0.14rem;
                  padding-top:0.2rem;
                }
              }
            }
          }
          .list-left{
            .teach-roll{
              left:0;
            }
            .item{
              .bot-deco{
                padding-left:2.15rem;
              }
            }
          }
          .list-right{
            .teach-roll{
              right:0;
            }
            .item{
              .txt{
                margin:0.77rem 1.1rem 0 0;
                text-align:right;
                .name{
                  margin:0.5rem 2.15rem 0.25rem 0.25rem;
                }
                .des{
                  padding:0 2.15rem 0 0.25rem;
                }
                .bot-deco{
                  padding-right:2.15rem;
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
