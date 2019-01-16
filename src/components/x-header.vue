<template>
  <div class="header">
    <div class="top-bar">
      <div class="bar-inner">
        <div class="logo"></div>
        <div class="school-name">
          <p class="name_en" v-if="language==='en'">Thunder Kungfu Academy</p>
          <p class="name_zh" v-if="language==='en'">尚德精武學院</p>
        </div>
        <div class="tel">
          <div class="tel-logo"></div>
          <div class="num">{{language === "cn" ? '招生服务热线：': 'Recruitment hotline：'}}408-508-9962</div>
        </div>
        <!--<div class="changeLang">
          <span class="china" @click="changeLan('cn')" :class="{'active':language === 'cn'}">{{language === "cn" ? '中文': 'CN'}}</span>
          <span class="china" @click="changeLan('en')" :class="{'active':language === 'en'}">{{language === "cn" ? '英文': 'EN'}}</span>
        </div>-->
      </div>
    </div>
    <div class="nav">
      <ul class="nav-list">
        <li v-for="item,index in navList" :key="index" :class="{'active':$route.path===item.path}" @click="changePage(item)">{{item.lable[language]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navList:[
          {
            index:'/',
            lable:{
              'cn':'首页',
              'en':'Home'
            },
            path:'/'
          },
          {
            index:'introduction',
            lable:{
              'cn':'武馆介绍',
              'en':'Our Mission'
            },
            path:'/introduction'
          },
          {
            index:'culture',
            lable:{
              'cn':'武术文化',
              'en':'Culture'
            },
            path:'/culture'
          },
          {
            index:'lions',
            lable:{
              'cn':'舞狮',
              'en':'Lion Dance'
            },
            path:'/lions'
          },
          {
            index:'courseList',
            lable:{
              'cn':'课程安排',
              'en':'Schedules'
            },
            path:'/courseList'
          },
          {
            index:'moment',
            lable:{
              'cn':'精彩瞬间',
              'en':'Picture Gallery'
            },
            path:'/moment'
          },
          {
            index:'team',
            lable:{
              'cn':'团队介绍',
              'en':'Teachers'
            },
            path:'/team'
          },
          {
            index:'contact',
            lable:{
              'cn':'联系我们',
              'en':'Contact'
            },
            path:'/contact'
          }
        ],
      }
    },
    computed: {
      language(){
        return this.$store.state.isEnglish
      }
    },
    methods:{
      changePage(item){
        this.$router.replace({'path':item.path})
      },
      changeLan(param){
        this.$store.commit("changeLange",param)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 @import '~@/assets/css/public.scss';
 .header{
   width: 100%;
   height: auto;
   min-width: 1200px;
   .top-bar{
     width: 100%;
     height: 94px;
     background-image: url('../assets/images/public/logo_bc.png');
     background-position: center 100%;
     background-size:1920px 94px;
     .bar-inner{
       width: 1200px;
       margin: 0 auto;
       height: 100%;
       @include clearfix;
     }
     .logo{
       float: left;
       width: 63px;
       height: 63px;
       margin-top: 14px;
       background:url('../components/img/logo.png') 50% 50% no-repeat;
       background-size:63px 63px;
     }
     .school-name{
       float: left;
       width: 500px;
       margin-top:26px;
       padding-left:10px;
       height: 50px;
       margin-left: 17px;
       .name_en{
         font-size:23px;
         line-height:25px;
         font-weight:700;
         color:#921000;
       }
       .name_zh{
         font-size:14px;
         line-height:24px;
         color:#3e3a39;
         letter-spacing:8px;
         font-family: DINNeuzeitGroteskLT, Arial;
       }
     }
     .tel{
       float:right;
       height: 94px;
       .tel-logo{
         display:inline-block;
         padding-top:37px;
         width: 23px;
         background:url('../assets/images/public/tel-logo.png') 50% 100% no-repeat;
         background-size:23px auto;
         font-family: Arial;
       }
       .num{
         display:inline-block;
         padding:37px 0 0 8px;
         font-size:16px;
         line-height:23px;
         color: #4a4644;
         font-family: Arial;
       }
     }
     .changeLang{
       float:right;
       margin-top:40px;
       font-size:0;
       .china,.english{
         display:inline-block;
         width:50px;
         text-align:center;
         /*padding:0 10px;*/
         background:#595757;
         font-size:16px;
         line-height:30px;
         color:#fff;
         margin:0;
         cursor:pointer;
         &.active{
           background:#921000;
         }
       }
     }
   }
 }
 .nav{
    width: 100%;
    height: 54px;
    background: url('../assets/images/public/nav_bg.jpg');
    background-size:1920px 54px;
    background-repeat: no-repeat;
    background-position: center center;
    .nav-list{
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      padding-top:2px;
      li{
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        float: left;
        text-align: center;
        cursor: pointer;
        font-family: Arial;
      }
      li.active{
        background: url("../assets/images/public/nav_btn.png");
        background-position: center center;
        background-size:150px 42;
        background-repeat: no-repeat;
      }
    }
  }

 @media screen and (max-width: 918px) {
    .header{
      width: 100%;
      height: auto;
      min-width: 12rem;
      .top-bar{
        width: 100%;
        height: 0.94rem;
        background-image: url('../assets/images/public/logo_bc.png');
        background-position: center 100%;
        background-size:19.2rem 0.94rem;
        .bar-inner{
          width: 10rem;
          margin: 0 auto;
          height: 100%;
          @include clearfix;
        }
        .logo{
          float: left;
          width: 0.63rem;
          height: 0.63rem;
          margin-top: 0.14rem;
          background:url('../components/img/logo.png') 50% 50% no-repeat;
          background-size:0.63rem 0.63rem;
        }
        .school-name{
          float: left;
          width: 4rem;
          margin-top:0.22rem;
          padding-left:0.1rem;
          height: 0.5rem;
          margin-left: 0.17rem;
          .name_en{
            font-size:0.23rem;
            line-height:0.25rem;
            font-weight:700;
            color:#921000;
          }
          .name_zh{
            font-size:0.14rem;
            line-height:0.32rem;
            color:#3e3a39;
            letter-spacing:0.08rem;
          }
        }
        .tel{
          float:right;
          height: 0.94rem;
          max-width: 5rem;
          word-wrap: break-word;
          .tel-logo{
            vertical-align:top;
            display:inline-block;
            padding-top:0.6rem;
            width: 0.3rem;
            background:url('../assets/images/public/tel-logo.png') 50% 100% no-repeat;
            background-size:0.23rem auto;
          }
          .num{
            // max-width: 11.5rem;
            max-width: 3.5rem;
            vertical-align:top;
            display:inline-block;
            padding:0.4rem 0 0 0;
            font-size:0.16rem;
            line-height:0.23rem;
            color: #4a4644;
          }
        }
      }
    }
    .nav{
      width: 100%;
      height: 0.6rem;
      background: url('../assets/images/public/nav_bg.jpg');
      background-size:1920px 0.6rem;
      background-repeat: no-repeat;
      background-position: center center;
      .nav-list{
        width: 12rem;
        height: 0.5rem;
        margin: 0 auto;
        padding-top:0.05rem;
        li{
          width: 1.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.12rem;
          color: #fff;
          float: left;
          font-weight:200;
          text-align: center;
          cursor: pointer;
        }
        li.active{
          background: url("../assets/images/public/nav_btn.png");
          background-position: center center;
          background-size:1.5rem 0.39rem;
          background-repeat: no-repeat;
        }
      }
    }
  }
</style>
