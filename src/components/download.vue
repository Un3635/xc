<template>
    <div class="download">
        <ul class="software">
          <!--<li class="soft-item soft-left">
            <div class="item-in">
              <img class="icon" src="../assets/img/download/app-icon.png"/>
              <p class="txt" v-html="data.install[language]"></p>
              <div class="button" @click="install">{{language === 'cn' ? '点击安装' : 'Download'}}</div>
            </div>
          </li>-->
          <li class="soft-item soft-left">
            <div class="item-in">
              <h3>{{language === 'cn' ? '安卓版' : 'Android'}}</h3>
              <div class="qrBox">
                  <!-- <span>敬请期待</span> -->
                <img src="../assets/img/download/android-qr.png"/>
              </div>
              <div class="txtBox" v-html="data.qrCode[language]"></div>
            </div>
          </li>
          <li class="soft-item soft-right">
            <div class="item-in">
              <h3>{{language === 'cn' ? 'IOS企业版' : 'IOS'}}</h3>
              <div class="qrBox">
                <img src="../assets/img/download/ios-qr.png"/>
              </div>
              <div class="txtBox" v-html="data.qrCodeIOS[language]"></div>
            </div>
          </li>
        </ul>
      <div class="tutorials">
        <div class="tit-box">
          <p>{{language === 'cn' ? 'IOS企业版安装教程' : 'Installation tutorial for IOS Enterprise'}}</p>
          <div class="line"></div>
        </div>
        <div class="steps">
          <img v-if="language === 'cn'" src="../assets/img/download/tutorials_cn.png"/>
          <img v-else src="../assets/img/download/tutorials_en.png"/>
          <ul>
            <li v-for="item in data.steps">
              <h3>{{item.title}}</h3>
              <p v-html="item[language]"></p>
            </li>
          </ul>
          <div class="tipes" v-html="data.tips[language]"></div>
        </div>
      </div>
      <transition name="fadeIn">
        <div class="download-pop" v-if="showPop">
          <div class="pop-in">
            <div class="txt">{{data.popTxt[language]}}</div>
            <div class="btn" @click="showPop=false">{{language === 'cn' ? '知道了' : 'OK'}}</div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    import Data from '../../static/data.js'
    export default {
      data(){
        return{
          showPop: false,
          data:''
        }
      },
      created(){
        this.data = Data;
      },
      computed: {
        language(){
          return this.$store.state.isEnglish
        }
      },
      watch:{
        "showPop": function(val){ //弹窗出现后禁止页面滚动
          if(val){
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "auto";
          }
        }
      },
      methods:{
        handleScroll() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop > 80) {
            this.$store.commit('changeOpacity', true);
          } else {
            this.$store.commit('changeOpacity', false);
          }
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.bus.$emit('active', 3);
      },
      beforeDestroy(){
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
</script>

<style scoped lang="scss">
  .tipes{
    width: 1200px;
    font-size: 20px;
    color: #FF2D55;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.6;
    margin: 90px auto 0;
  }
.download{
  width:100%;
  min-width:1200px;
  margin-bottom:237px;
  .software{
    width:1200px;
    height:380px;
    margin:0 auto;
    padding:200px 0 170px;
    border-bottom:1px solid #D5DBE8;
    &::after{
      content:'';
      clear:both;
      width:0;
    }
    .soft-item{
      float:left;
      list-style: none;
    }
    .soft-left{
      width: 606px;
      border-right:1px solid #eee;
      text-align:left;
    }
  }
  .soft-item{
    h3{
      width:100%;
      margin:24px 0;
      text-align:center;
      font-size: 26px;
      color: #20A0FF;
      line-height: 32px;
      font-weight:600;
    }
   .item-in{
     width: 482px;
     text-align:center;
     .icon{
       width:92px;
       height:92px;
     }
     .txt{
       font-size:22px;
       padding:64px 0 39px;
       color:#333;
       line-height:32px;
       height:80px;
     }
     .button{
       width:200px;
       height:60px;
       margin:0 auto;
       background: #20A0FF;
       border-radius: 6px;
       font-size: 22px;
       color: #fff;
       letter-spacing: 0.48px;
       text-align: center;
       line-height:60px;
       cursor:pointer;
     }
     .qrBox{
       width:255px;
       height:255px;
       margin:0 auto 46px;
       text-align:center;
       background: #fff;
       border: 1px solid #D4D4D4;
       span{
         font-size:24px;
         line-height:217px;
         text-align:center;
         color:#eee;
         letter-spacing:1px;
       }
     }
     .txtBox{
       width:100%;
       margin:0 auto;
       text-align:center;
       font-size: 18px;
       color: #333;
       line-height: 30px;
     }
   }
  }
  .soft-right{
    .item-in{
      width: 400px;
      margin-left: 112px;
    }
  }
  .tutorials{
    width:100%;
    margin-top:179px;
    text-align:center;
    .tit-box{
      width:100%;
      margin:0 auto;
      text-align:center;
      p{
        font-size: 30px;
        color: #333333;
        letter-spacing: 0.8px;
        line-height:48px;
      }
      .line{
        width:40px;
        height:6px;
        margin:6px auto 0;
        background:#20A0FF;
      }
    }
    .steps{
      width:1200px;
      margin:33px auto;
      img{
        width:100%;
      }
    }
  }
  .steps{
    ul{
      width:100%;
      text-align:left;
      li{
        display:inline-block;
        vertical-align:top;
        list-style:none;
        width:330px;
        text-align:left;
        padding-left:127px;
        &:nth-of-type(2){
          width:320px;
          padding-left:39px;
        }
        &:nth-of-type(3){
          width:339px;
          padding-left:45px;
        }
        h3{
          font-weight:700;
          font-size: 20px;
          color: #333;
          line-height:32px;
          padding-bottom:13px;
        }
        p{
          font-size: 18px;
          color: #999;
          line-height:30px;
        }
      }
    }
  }
  .download-pop{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    .pop-in{
      width:600px;
      background:#fff;
      margin:300px auto 0;
      text-align:center;
      border-radius:9px;
      .txt{
        font-size:16px;
        padding:24px 32px 20px;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      .btn{
        overflow: hidden;
        border-top: 1px solid #EEE;
        font-size: 16px;
        line-height: 48px;
        text-align:center;
        color:#20A0FF;
        cursor:pointer;
      }
    }
    &.fadeIn-enter-active, &.fadeIn-leave-active{
      transition: 0.5s all ease-in-out;
    }
    &.fadeIn-enter-to,&.fadeIn-leave{
      opacity:1;
    }
    &.fadeIn-enter,&.fadeIn-leave-to{
      opacity:0;
    }
  }
}
</style>
