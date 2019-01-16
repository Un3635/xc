<template>
  <div class="contact">
    <div class="tit">
      <p>{{language === 'cn' ? '联系我们' : 'CONTACT US'}}</p>
      <div class="line"></div>
    </div>
    <div class="email">E-mail: xtoken@xt.top</div>
    <ul class="method">
      <li @click="showPopHandle(false)"><img src="../assets/img/partner/wechat.png"/></li>
      <li><a href="https://weibo.com/u/6612917086?refer_flag=1001030101_&is_hot=1"><img src="../assets/img/partner/weibo.png"/></a></li>
      <li @click="showPopHandle(true)"><img src="../assets/img/partner/qq.png"/></li>
      <li><a href="https://twitter.com/?lang=en"><img src="../assets/img/partner/twitter.png"/></a></li>
      <li><a href="https://www.facebook.com/oken.xt.5"><img src="../assets/img/partner/facebook.png"/></a></li>
      <li><a href="https://t.me/XTokenwallet"><img src="../assets/img/partner/Telegram.png"/></a></li>
    </ul>
    <div class="lable">
      Copyright © XToken 2018
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    language() {
      return this.$store.state.isEnglish
    }
  },
  methods:{
    showPopHandle(params){
      this.$store.commit('changeShowPop',true);
      this.$store.commit('changeQqPop',params)
    }

  }
}
</script>
<style scoped lang="scss">
  .contact{
    width:100%;
    padding-top:13%; //60
    height:100%;
    .tit{
      width:100%;
      text-align:center;
      margin:0 auto 8.2%; //36
      p{
        padding-bottom:12px;
        color:#fff;
        font-size: 16px;
        letter-spacing: 0.4px;
      }
      .line{
        width:30px;
        height:2px;
        margin:0 auto;
        background: #F7F7F7;
      }
    }
    .email{
      width:100%;
      text-align:center;
      color:#fff;
      font-size: 16px;
      margin-bottom:51px;
    }
    .method{
      width:306px;
      margin:0 auto;
      &::after{
        content:'';
        clear:both;
        width:0;
      }
      li{
        float:left;
        display:inline-block;
        width:60px;
        height:60px;
        margin:15px 21px;
        a{
          width:100%;
          height:100%;
          img{
            width:100%;
            height:100%;
          }
        }
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .lable {
      font-family: PingFangSC-Regular;
      position: absolute;
      bottom: 29px;
      text-align: center;
      width: 100%;
      opacity: 0.6;
      font-size: 9.6px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 14.4px;
    }
  }
</style>
