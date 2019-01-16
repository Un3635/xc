<template>
    <div class="course-list">
       <div class="banner"></div>
       <div class="content">
         <div class="tit">
           <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
           <span>Class Schedule</span>
           <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
           <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
         </div>
         <div class="list">
           <div class="tab-tit">
              <div class="title1" :class="{'active':activeIndex === 0}" v-html="txtData.dublin[language]" @click="changeActiveIndex(0)"></div>
              <div class="title2" :class="{'active':activeIndex === 1}" v-html="txtData.fremont[language]" @click="changeActiveIndex(1)"></div>
           </div>
           <div class="tab-pic">
             <img src="~@/assets/images/courseList/Dublin-Schedule.png" v-if="activeIndex === 0"/>
             <img src="~@/assets/images/courseList/Fremont-Schedule.png" v-else/>
           </div>
         </div>
         <!--<div class="tit tit2">
           <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
           <span>Price List</span>
           <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
           <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
         </div>
         <div class="list">
           <div class="tab-pic">
             <img src="~@/assets/images/courseList/price-table.png"/>
           </div>
         </div>
         <img class="deco_cloud deco_cloud_l" src="~@/assets/images/public/cloud_02.png"/>-->
       </div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import TxtData from '../data/courseList_data'
  export default {
    name: "courseList",
    data(){
      return{
        txtData:'',
        activeIndex:0
      }
    },
    created(){
      this.txtData = TxtData;
    },
    computed: {
      language(){
        return this.$store.state.isEnglish
      }
    },
    methods:{
      changeActiveIndex(params){
        this.activeIndex = params;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/css/public.scss';
  .course-list{
    @include wrap;
    .banner{
      display:none;
      width:100%;
      height:939px;
      background:url("~@/assets/images/courseList/ban.jpg") 50% 50% no-repeat;
    }
    .content{
      padding-top:100px;
      position: relative;
      width:1000px;
      text-align:center;
      margin:0 auto;
      font-size:0;
      min-height: calc(100vh - 140px);
      .tit{
        @include title;
        margin:20px auto 0;
        .circle{
          position:absolute;
          top:22px;
          left:460px;
        }
      }
      .tit2{
        margin:130px auto 50px;
        .circle{
          position:absolute;
          top:22px;
          left:496px;
        }
      }
      .list{
        width:1000px;
        margin:0 auto;
        font-size:0;
        .tab-tit{
          position:relative;
          width:542px;
          margin:60px auto 40px;
        }
        .tab-pic{
          display:inline-block;
          vertical-align: top;
          width:1000px;
          margin:0 auto;
          /*height:909px;*/
          img{
            width:100%;
          }
        }
      }
      .deco_cloud{
        position:absolute;
        &.deco_cloud_s{
          top:80px;
          right:-50px;
        }
        &.deco_cloud_l{
          width:200px;
          height:auto;
          bottom:-120px;
          left:-160px;
        }
      }
    }
    .tab-tit{
      .title1{
        position:absolute;
        top:0;
        left:0;
        width:252px; //348
        text-align:center;
        font-size:20px;
        line-height:50px;
        color:#81001a;
        background:url("~@/assets/images/courseList/du.png") 50% 50% no-repeat;
        background-size:252px 50px;
        cursor: pointer;
        transition:0.2s all ease-in;
        span{
          color:#000;
        }
        &.active{
          color:#fff;
          background:url("~@/assets/images/courseList/du_active.png") 50% 50% no-repeat;
          background-size:252px 50px;
          span{
            color:#fff;
          }
        }
      }
      .title2{
        width:290px; //400
        margin-left:245px;
        text-align:center;
        font-size:20px;
        color:#81001a;
        line-height:50px;
        background:url("~@/assets/images/courseList/fre.png") 50% 50% no-repeat;
        background-size:290px 50px;
        cursor: pointer;
        transition:0.2s all ease-in;
        span{
          color:#000;
        }
        &.active{
          color:#fff;
          background:url("~@/assets/images/courseList/fre_active.png") 50% 50% no-repeat;
          background-size:290px 50px;
          span{
            color:#fff;
          }
        }
      }
    }
    .bot-img{
      @include botImg;
    }
  }
  @media screen and (max-width: 918px) {
    .course-list{
      @include wap-wrap;
      .banner{
        display:none;
        width:12rem;
        height:5.87rem;
        background:url("~@/assets/images/courseList/ban.jpg") 50% 50% no-repeat;
        background-size:12rem 5.87rem;
      }
      .content{
        padding-top:1rem;
        position: relative;
        width:10rem;
        text-align:center;
        margin:0 auto;
        .tit{
          @include wap-title;
          margin:0.4rem auto 0.5rem;
          .circle{
            position:absolute;
            top:0.24rem;
            left:4.6rem;
          }
        }
        .tit2{
          margin:1.3rem auto 0.5rem;
          .circle{
            position:absolute;
            top:0.22rem;
            left:5.5rem;
          }
        }
        .list{
          width:10rem;
          margin:0 auto;
          .tab-tit{
            position:relative;
            width:7.48rem;
            margin:0 auto 0.58rem;
          }
          .tab-pic{
            width:10rem;
            margin:0 auto;
            /*height:9.09rem;*/
            img{
              width:100%;
            }
          }
        }
        .deco_cloud{
          position:absolute;
          &.deco_cloud_s{
            top:-1.2rem;
            right:0;
            width:2rem;
            height:2.01rem;
          }
          &.deco_cloud_l{
            bottom:-1.8rem;
            left:-1.5rem;
            width:3rem;
            height:auto;
          }
        }
      }
      .tab-tit{
        .title1{
          position:absolute;
          top:0;
          left:0;
          width:3.48rem;
          text-align:center;
          font-size:0.28rem;
          line-height:0.7rem;
          color:#81001a;
          background:url("~@/assets/images/courseList/du.png") 50% 50% no-repeat;
          background-size:3.48rem 0.7rem;
          cursor: pointer;
          transition:0.2s all ease-in;
          span{
            color:#000;
          }
          &.active{
            color:#fff;
            background:url("~@/assets/images/courseList/du_active.png") 50% 50% no-repeat;
            background-size:3.48rem 0.7rem;
            span{
              color:#fff;
            }
          }
        }
        .title2{
          width:4rem;
          margin-left:3.38rem;
          text-align:center;
          font-size:0.28rem;
          color:#81001a;
          line-height:0.7rem;
          background:url("~@/assets/images/courseList/fre.png") 50% 50% no-repeat;
          background-size:4rem 0.7rem;
          cursor: pointer;
          transition:0.2s all ease-in;
          span{
            color:#000;
          }
          &.active{
            color:#fff;
            background:url("~@/assets/images/courseList/fre_active.png") 50% 50% no-repeat;
            background-size:4rem 0.7rem;
            span{
              color:#fff;
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
