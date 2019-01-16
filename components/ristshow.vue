<template>
    <div class="page-home-risk" v-show="$store.state.riskshow">
      <div class="page-home-risk-feng">风险提示：</div>
      <div class="page-home-risk-cont">请谨防ICO、变相ICO！挖链网所发资讯，不代表本公司任何投资建议。</div>
      <div class="page-home-risk-btn" @click="riskshowno">知道了</div>
    </div>
</template>
<style lang="scss">
.page-home-risk{
      width: 1180px;
      margin: 0 auto;
      background-color: #fafafa;
      height: 50px;
      font-size: 14px;
      line-height: 50px;
      margin-top: 14px;
      padding-left: 20px;
      padding-right: 20px;
      &-feng{
        color: #e94c4c;
        float: left;
      }
      &-cont{
        color: #666666;
        float: left;
      }
      &-btn{
        color: #ffffff;
        float: right;
        width: 84px;
        height: 30px;
        border-radius: 4px;
        line-height: 30px;
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
        background-color: #4e88ea;
        &:hover{
          background-color: #346ece;
        }
      }
    }
</style>

<script>

export default {
  data () {
    return {
      riskshow:'',
      riskshowtime:true
    }
  },
  methods: {
    riskshowno(){
        this.$store.commit("SHOW_SIGN_UP_RISK", false);
    } 
  },

}
</script>
