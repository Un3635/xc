<template>
  <toast v-model="isShow" type="text" :time="2000" position="middle" class="err-toast" width="180px">
      <span class="tip">
          <img src="../../assets/images/icon_cuowu_normal@1.5x.png" alt="">
          <span>{{content}}</span>
      </span>
  </toast>
</template>
<script>
  import {Toast} from 'vux';

  export default {
    data() {
      return {
        isShow: false,
        content: ''
      };
    },
    components: {
      Toast
    },
    methods: {
      show(content) {
        this.content = content;
        this.isShow = true;
      },
      hide() {
        this.isShow = false;
      }
    }
  };
</script>
<style lang="scss">
  .err-toast {
    .weui-toast.weui-toast_text {
      border-radius: 8px;
      padding: 25px 10px 22px;
    }
    .tip {
      display: block;
      text-align: center;
      img {
        width: 55px;
        height: 55px;
        display: block;
        margin: 0 auto 16px;
      }
      span {
        color: #fff;
        font-size: 14px;
        line-height: 1.5em;
      }
    }

  }
</style>
