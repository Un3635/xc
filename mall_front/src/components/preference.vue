<template>
  <div class="preference">
    <div class="prefres">
      <div class="top">
        <!--<div class="img">-->
          <!--<img src="../assets/images/free.png">-->
        <!--</div>-->
        <div class="text">
          <img src="../assets/images/t1.png" alt="">
        </div>
      </div>
      <div class="top">
        <!--<div class="img">-->
          <!--&lt;!&ndash;<img src="../assets/images/money.png">&ndash;&gt;-->
        <!--</div>-->
        <div class="text">
          <img src="../assets/images/t3.png" alt="">
        </div>
      </div>
      <div class="top">
        <!--<div class="img">-->
          <!--<img src="../assets/images/icon1.png">-->
        <!--</div>-->
        <div class="text">
          <img src="../assets/images/t2.png" alt="">
        </div>
      </div>

      <div class="tit clear">
        <img src="../assets/images/Layer1.png" alt="">
      </div>
      <div class="imgList mb11">
        <div class="cont" @click="gotoDetail('ec42c7b1-323f-4992-98b3-d3a44d8cb847')">
          <img src="../assets/images/m1.png" alt="">
        </div>
        <div class="cont" @click="gotoDetail('6753b038-790d-4765-ab4a-b8e2e450fc61')">
          <img src="../assets/images/m2.png" alt="">
        </div>
      </div>
      <div class="imgList clear">
        <div class="cont" @click="gotoDetail('4e041e78-546a-4f2f-9d50-c304bc78513c')">
          <img src="../assets/images/m33.png" alt="">
        </div>
        <div class="cont" @click="gotoDetail('fac97202-b5b3-4ea1-9ef1-9d21b446782e')">
          <img src="../assets/images/m4.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'productPage',
    data() {
      return {
        isrc: '/static/images/banner.png',
      }
    },
    computed: {},
    methods:{
      gotoDetail(id) {
        if (!id) {
          return
        }
        this.$router.push({path: '/detail', query: {itemid: id}})
      },
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    },
    watch: {
    },
  }
</script>

<style scoped lang="scss">

</style>

