<template>
  <div class="wrap" v-if="isRouterAlive">
    <span>请点击右上角使用浏览器打开</span>
  </div>
</template>
<script>
export default {
  props: {
    isWeChat: false
  },
  data() {
   return {
      isRouterAlive: false
   }
  },
  watch: {
    '$route'(to, from) {
        // if(to.name !==  from.name) {
        //   this.cn = !this.cn;
        //   this.isRouterAlive = false;
        //   setTimeout(() => {
        //     this.isRouterAlive = true;
        //   })
        // }
    }
  },
  created(){
    this.isRouterAlive = weChatBrowser();
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 45px;
  font-size: 12px;
  color: #fff;
  background: #32b2a7;
  z-index: -999;
  border-radius: 10px;
  animation: bounce-down 4s linear;
  -webkit-animation:bounce-down 4s linear;
  -moz-animation:bounce-down 4s linear;
  -o-animation:bounce-down 4s linear; 
  opacity:0;
  @keyframes bounce-down{
    0% {transform: translateX(0);opacity:0.7;  z-index: 9999;}
    25% {transform: translateX(-8px);opacity:0.5;}
    50% {transform: translateX(0);opacity:0.7;}
    75% {transform: translateX(6px);opacity:1;}
    100% {transform: translateX(0);opacity:0;}
   
  }
  @-moz-keyframes bounce-down{
     0% {transform: translateX(0);opacity:0.7;z-index: 9999}
    25% {transform: translateX(-8px);opacity:0.5;}
    50% {transform: translateX(0);opacity:0.7;}
    75% {transform: translateX(6px);opacity:1;}
    100% {transform: translateX(0);opacity:0;}
  }
  @-webkit-keyframes  bounce-down{
     0% {transform: translateX(0);opacity:0.7;z-index: 9999}
    25% {transform: translateX(-8px);opacity:0.5;}
    50% {transform: translateX(0);opacity:0.7;}
    75% {transform: translateX(6px);opacity:1;}
    100% {transform: translateX(0);opacity:0;}
  }
  @-o-keyframes  bounce-down{
     0% {transform: translateX(0);opacity:0.7;}
    25% {transform: translateX(-8px);opacity:0.5;}
    50% {transform: translateX(0);opacity:0.7;}
    75% {transform: translateX(6px);opacity:1;}
    100% {transform: translateX(0);opacity:0;z-index: -999}
  }
  & > span {
    padding: 6px 3px;
    display: inline-block;
  }
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-width: 0 7px 13px;
    border-style: solid;
    border-color: transparent transparent #32b2a7;
    position: relative;
    margin-top: -59px;
    margin-left: 75px;
  }
}

</style>

