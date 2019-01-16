<template>
  <div class="custom-service">
    <!--<div>-->
      <!--<router-link to="#">-->
        <!--<img src="../../assets/images/custom_service.png">-->
      <!--</router-link>-->
    <!--</div>-->
    <div class="cart" @click="gotoCart">
      <img src="../../assets/images/cart.png">
      <i class="cart-icon">{{shoppingItems}}</i>
    </div>
    <div class="code" @mouseenter="codeOption(true)" @mouseleave="codeOption(false)">
      <router-link to="#">
        <img src="../../assets/images/qr_code.png">
        <transition name="fade">
          <div class="code-card" v-if="codeimg">
            <img src="../../assets/images/qr_code_normal.jpg">
            <p>关注小虫快租公众号</p>
          </div>
        </transition>
      </router-link>
    </div>
    <div class="pointer" @click="returnTOp">
      <img src="../../assets/images/top.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {bus} from '../../assets/js/config'

  export default {
    name: 'custom_service',
    props: {
    },
    data() {
      return {
        timer: null,
        isStop: true,
        codeimg: false,
        token: '',
        shoppingItems: 0,
      }
    },
    methods: {
      gotoCart(){
        if (!localStorage.getItem('xckz_mall')) {
          bus.$emit('islogin', 'login', '/cart')
        } else {
          this.$router.push({path: '/cart'})
        }
      },
      codeOption(status) {
        this.codeimg = status
      },
      returnTOp() {
        var vm = this
        this.timer = setInterval(function () {
          window.addEventListener('scroll', vm.stopScrollAnimate)
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 7);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop == 0) {
            clearInterval(vm.timer);
          }
          vm.isStop = true
        }, 30);

      },
      stopScrollAnimate() {
        if (!this.isStop) {
          clearInterval(this.timer);
          window.removeEventListener('scroll', this.stopScrollAnimate)
        }
        this.isStop = false
      },
      getShoppingCartItems(){
        if(!localStorage.getItem('xckz_mall')){
          this.shoppingItems = 0;
        }else{
          this.token = localStorage.getItem('xckz_mall');
          var vm = this;
          this.$http.get('/common/cartNum', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (res) {
            var data = res.data;
            if(Number(data.code) === 1000){
              vm.shoppingItems = data.data;
            }else{
              vm.shoppingItems = 0;
            }
          })
        }
      },
    },
    created() {
      this.getShoppingCartItems();
      bus.$on('addshop', this.getShoppingCartItems)
    }
  }
</script>

<style scoped lang="scss">

  .custom-service {
    position: fixed;
    top: 350px;
    right: 5px;
    z-index: 99999;
    .cart {
      position: relative;
      .cart-icon {
        width: auto;
        height: 16px;
        position: absolute;
        top: 5px;
        left: 26px;
        /*right: auto;*/
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        color: #fff;
        background-color: #f10215;
        -moz-border-radius: 7px;
        border-radius: 7px;
        min-width: 12px;
        text-align: center;
      }
    }
    .code {
      position: relative;
      .code-card {
        background: url("../../assets/images/qr_code_card.png");
        width: 250px;
        height: 250px;
        position: absolute;
        top: -2px;
        right: 55px;
        text-align: center;
        p {
          font-size: 18px;
          color: #333333;
          margin-bottom: 9px;
        }
        img {
          width: 186px;
          height: 185px;
          margin: 14px 37px 9px 27px;
        }
      }
    }
    div {
      width: 48px;
      height: 44px;
      background: #333333;
      border-radius: 2px;
      margin-bottom: 2px;
      text-align: center;
      cursor: pointer;
      img {
        width: 22px;
        height: 22px;
        padding-top: 11px;
      }
    }
  }
</style>

