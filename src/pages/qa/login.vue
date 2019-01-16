<template>
  <div class="page-qa-login" v-title="'每日答题挑战'">
    <img src="../../assets/qa/loading.gif" alt="">
    <div class="time" v-if="time<100">题库准备中…{{time}}%</div>
    <div class="time" v-else>题库准备好啦～</div>
    <button disabled v-if="time<100">开始挑战</button>
    <button @click="login" v-else>开始挑战</button>
  </div>
</template>
<style lang="scss">
  @import "../../common/util.scss";
  .page-qa-login {
    text-align: center;
    padding-top: p2r(50);
    position: relative;
    min-height: 100%;
    background-color: #fbfbfb;
    img {
      width: p2r(200);
      height: p2r(200);
    }
    button {
      width: p2r(200);
      line-height: p2r(49);
      background-image: linear-gradient(-136deg, #4d9eff 0%, #2864ff 100%);
      box-shadow: 0 p2r(2) p2r(10) 0 rgba(77, 135, 234, 0.24);
      border-radius: p2r(100);
      text-align: center;
      color: white;
      font-size: p2r(16);
      position: absolute;
      bottom: p2r(150);
      left: 50%;
      transform: translateX(-50%);
      &[disabled] {
        background: #a4beeb;
        box-shadow: 0 p2r(2) p2r(10) 0 rgba(77, 135, 234, 0.24);
      }
    }
    .time {
      font-size: p2r(16);
      color: #222222;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        time: 0,
        timer: null
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        this.time += 10;
        if (this.time == 100) {
          clearInterval(this.timer);
        }
      }, 100);
    },
    methods: {
      login() {
        var that = this;
        this.$app.call("getUserId", {}, function(token) {
          that.$router.push("qa");
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      next();
    }
  };
</script>
