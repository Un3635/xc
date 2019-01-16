<template>
  <div class="page-qa-suc" v-title="'每日答题挑战'">
    <div class="page-qa-suc-title">挑战结束</div>
    <div class="page-qa-suc-titlesmall" v-if="$route.query.v>0">本次挑战获得</div>
    <div class="page-qa-suc-titlesmall" v-else>很遗憾！本次答题您没有获取挖力</div>
    <template v-if="$route.query.v>0">
      <img src="../../assets/qa/settlement_wali.png" alt="" class="img1">
      <div class="page-qa-suc-wl">
        <span>+{{$route.query.v}}</span>挖力</div>
    </template>
    <template v-else>
      <img class="img2" src="../../assets/qa/settlement_nonewali.png" alt="">
    </template>
    <button class="page-qa-suc-sharebtn" @click="share">分享获取复活卡</button>
    <button class="page-qa-suc-againbtn" @click="again">再次挑战</button>
  </div>
</template>
<style lang="scss">
  @import "success.scss";
</style>
<script>
  export default {
    methods: {
      again() {
        this.$app.call("passBy", {
          eventId: "答题详情页-结果页",
          eventLabel: "再次挑战",
          eventInfo: []
        });
        this.$router.go(-1);
      },
      share() {
        this.$app.call(
          "shareImage",
          {
            qrcodelink:
              window.location.origin +
              "/#/qashare?id=" +
              this.$route.query.inviterId,
            title: "答题详情页-结果页",
            type: "qa"
          },
          function() {}
        );
      }
    }
  };
</script>
