<template>
    <div class="course">
       <div class="banner"></div>
       <div class="des">
         <div class="tit">
           <p>{{language === 'cn' ? 'Class Description' : 'Class Description'}}</p>
           <img class="deco" src="~@/assets/images/course/deco.png"/>
         </div>
         <div class="item">
           <div class="item-tit">
             {{language === 'cn' ? 'Children (ages 4-16 years)' : 'Children (ages 4-16 years)'}}
           </div>
           <p v-html="txtData.desTxt1[language]"></p>
         </div>
         <div class="item">
           <div class="item-tit">
             {{language === 'cn' ? 'Teen and Adult Classes' : 'Teen and Adult Classes'}}
           </div>
           <p v-html="txtData.desTxt2[language]"></p>
         </div>
       </div>
      <div class="healing">
        <div class="tit">
          <p>{{language === 'cn' ? 'Martial Arts for Healing' : 'Martial Arts for Healing'}}</p>
          <img class="deco" src="~@/assets/images/course/deco.png"/>
        </div>
        <div class="txt">
          <div class="img-box">
            <img src="~@/assets/images/course/heal.png"/>
          </div>
          <ul class="item-list">
            <li>
              <p class="title" v-html="txtData.healing1Tit[language]"></p>
              <p class="text" v-html="txtData.healing1Txt[language]"></p>
            </li>
            <li>
              <p class="title" v-html="txtData.healing2Tit[language]"></p>
              <p class="text" v-html="txtData.healing2Txt[language]"></p>
            </li>
            <li>
              <p class="title" v-html="txtData.healing3Tit[language]"></p>
              <p class="text" v-html="txtData.healing3Txt[language]"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import TxtData from '../data/course_data'
  export default {
    name: "course",
    data(){
      return{
        txtData:'',
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
  .course {
    @include wrap;
    .banner{
      display:none;
      width:100%;
      height:674px;
      background:url("~@/assets/images/course/ban.jpg") 50% 50% no-repeat;
    }
    .des{
      width:1200px;
      margin:64px auto 0;
      .tit{
        position:relative;
        text-align:center;
        margin-bottom:100px;
        p{
          padding-top:40px;
          font-size:54px;
          line-height:54px;
          color:#130000;
        }
        img{
          position:absolute;
          top:0;
          left:780px;
        }
      }
      .item{
        width:1000px;
        margin:0 auto 100px;
        .item-tit{
          width:441px;
          height:49px;
          text-align:center;
          line-height:49px;
          font-size:26px;
          color:#790000;
          background:url("~@/assets/images/course/tit_deco.png") 0% 50% no-repeat;
        }
        p{
          width:950px;
          padding:30px 0 0 50px;
          font-size:22px;
          line-height:32px;
          color:#6e6e6a;
          text-align: justify;
          text-justify: inter-ideograph;
          word-break:break-all;
        }
      }
    }
    .healing{
      margin-top:190px;
      width:100%;
      background:#eae9e7;
      .tit{
        position:relative;
        width:1200px;
        margin:0 auto;
        padding:50px 0 60px;
        text-align:center;
        p{
          padding-top:40px;
          font-size:54px;
          line-height:54px;
          color:#130000;
        }
        img{
          position:absolute;
          top:50px;
          left:235px;
        }
      }
      .txt{
        width:1200px;
        margin:0 auto;
        @include clearfix;
        .img-box{
          width:480px;
          /*min-height:767px;*/
          float: left;
          vertical-align: middle;
          img{
            width:100%;
            vertical-align: middle;
          }
        }
        .item-list{
          width:600px;
          float: right;
          padding-right:100px;
          li{
            width:540px;
            padding:15px 30px;
            margin-bottom:30px;
            border:2px solid #676767;
            transition: 0.2s all ease-in;
            .title{
              font-size:18px;
              color:#262626;
              font-weight:600;
              padding-bottom:10px;
            }
            .text{
              font-size:18px;
              color:#262626;
              line-height:28px;
              text-align:justify;
              -ms-text-justify: inter-ideograph;
              text-justify: inter-ideograph;
            }
            &:hover{
              background:#ac160a;
              border:2px solid #870a00;
              .title{
                color:#fff;
              }
              .text{
                color:#fff;
              }
            }
          }
        }
      }
    }
    .bot-img{
      @include botImg-gray;
    }
  }
  @media screen and (max-width: 918px) {
    .course {
      @include wap-wrap;
      .banner{
        display:block;
        width:12rem;
        height:4.21rem;
        background:url("~@/assets/images/course/ban.jpg") 50% 50% no-repeat;
        background-size:12rem 4.21rem;
      }
      .des{
        width:12rem;
        margin:0.64rem auto 0;
        .tit{
          position:relative;
          text-align:center;
          margin-bottom:1rem;
          p{
            padding-top:0.4rem;
            font-size:0.54rem;
            line-height:0.54rem;
            color:#130000;
          }
          img{
            position:absolute;
            top:0;
            left:7.8rem;
            width:1rem;
            height:0.87rem;
          }
        }
        .item{
          width:10rem;
          margin:0 auto 1rem;
          .item-tit{
            width:4.41rem;
            height:0.49rem;
            text-align:center;
            line-height:0.49rem;
            font-size:0.26rem;
            color:#790000;
            background:url("~@/assets/images/course/tit_deco.png") 0% 50% no-repeat;
            background-size:4.42rem 0.49rem;
          }
          p{
            width:9.5rem;
            padding:0.3rem 0 0 0.5rem;
            font-size:0.22rem;
            line-height:0.32rem;
            color:#6e6e6a;
            text-align: justify;
            text-justify: inter-ideograph;
            word-break:break-all;
          }
        }
      }
      .healing{
        margin-top:1.9rem;
        width:100%;
        background:#eae9e7;
        .tit{
          position:relative;
          width:12rem;
          margin:0 auto;
          padding:0.5rem 0 0.6rem;
          text-align:center;
          p{
            padding-top:0.4rem;
            font-size:0.54rem;
            line-height:0.54rem;
            color:#130000;
          }
          img{
            position:absolute;
            top:0.5rem;
            left:2.45rem;
            width:1rem;
            height:0.87rem;
          }
        }
        .txt{
          width:12rem;
          margin:0 auto;
          @include clearfix;
          .img-box{
            width:4.8rem;
            /*min-height:767px;*/
            float: left;
            vertical-align: middle;
            img{
              width:100%;
              vertical-align: middle;
            }
          }
          .item-list{
            width:6rem;
            float: right;
            padding-right:1rem;
            li{
              width:5.4rem;
              padding:0.15rem 0.3rem;
              margin-bottom:0.3rem;
              border:0.02rem solid #676767;
              transition: 0.2s all ease-in;
              .title{
                font-size:0.18rem;
                color:#262626;
                font-weight:600;
                padding-bottom:0.1rem;
              }
              .text{
                font-size:0.18rem;
                color:#262626;
                line-height:0.32rem;
                text-align:justify;
                -ms-text-justify: inter-ideograph;
                text-justify: inter-ideograph;
                height:1.5rem;
                overflow-y:auto;
              }
              &:hover{
                background:#ac160a;
                border:0.02rem solid #870a00;
                .title{
                  color:#fff;
                }
                .text{
                  color:#fff;
                }
              }
            }
          }
        }
      }
      .bot-img{
        @include wap-botImg-gray;
      }
    }
  }
</style>
