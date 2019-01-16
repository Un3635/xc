<template>
  <div class="partner">
    <div class="tit">
      <p v-if="isEnglish === 'cn'">合作媒体</p>
      <p v-else>COOPERATION</p>
      <div class="line"></div>
    </div>
    <ul class="logo">
      <li><img src="../assets/img/partner/walian.png"/></li>
      <li><img src="../assets/img/partner/bitong.png"/></li>
      <li><img src="../assets/img/partner/fenghuang.png"/></li>
      <li><img src="../assets/img/partner/zaker.png"/></li>
      <li><img src="../assets/img/partner/sina.png"/></li>
      <li><img src="../assets/img/partner/tecent.png"/></li>
      <li><img src="../assets/img/partner/souhu.png"/></li>
      <li><img src="../assets/img/partner/huxiu.png"/></li>
      <li><img src="../assets/img/partner/todayhead.png"/></li>
      <li><img src="../assets/img/partner/wangyi.png"/></li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['isEnglish'])
    }
  }
</script>
<style scoped lang="scss">
  .partner{
    width:100%;
    padding-top:13%;
    height:100%;
    background:#000;
   .tit{
     width:100%;
     text-align:center;
     margin:0 auto 8.2%;
     p{
       padding-bottom: 12px;
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
    .logo{
      width:280px;
      margin:0 auto;
      &::after{
        content:'';
        clear:both;
        width:0;
      }
      li{
        float:left;
        display:inline-block;
        width:120px;
        height:60px;
        margin:6px 10px;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
@media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  .partner {
    .logo {
      li {
        height:50px;
      }
    }
  }
}
</style>
