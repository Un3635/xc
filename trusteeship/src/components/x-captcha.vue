<template>
  <div class="wrapper" :class="{'bd':!isReady}" v-loading="!isReady">
    <div id="wy_captcha"></div>
  </div>
</template>

<script>
  export default {
    name: 'x-captcha',
    data() {
      return {
        isReady: false
      };
    },
    methods: {
      initCaptcha() {
        let self = this;
        let _instance;
        initNECaptcha({
          captchaId: 'ce1b9b10b25143628df735343ab9b4b3',
          element: '#wy_captcha',
          mode: 'float',
          width: 'auto',
          onReady: (instance) => {
            _instance = instance;
            self.$emit('input', '');
            self.isReady = true;
          },
          onVerify: (err, data) => {
            if (err) {
              return;
            }
            // this.isVerified = true;
            // _instance.destroy();
            self.$emit('input', data.validate);
          }
        }, (instance) => {
        }, (err) => {
        });
      }
    },
    mounted() {
      this.initCaptcha();
    }
  };
</script>

<style scoped>
  #wy_captcha {
    width: 100%;
    height: 40px;
  }

  .wrapper {
    width: 100%;
    height: 40px;
  }

  .bd {
    border: 1px solid #DEDEE0;
  }

  /*.success {*/
    /*height: 40px;*/
    /*line-height: 40px;*/
  /*}*/
</style>
