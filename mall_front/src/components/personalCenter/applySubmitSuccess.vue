<template>
  <div class="apply_submit_success">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="icon">
        <img src="../../assets/images/icon_tijiao_success.png" alt="">
      </div>
      <div class="icon_des">
        <span>申请提交成功</span>
      </div>
      <div class="des_detail">
        <span>申请已受理，正在审核您提供的资料预计2小时得出免押金额度</span>
      </div>
      <div class="you_can">
        在审核期间，您可以
      </div>
      <div class="el_button">
        <span class="btn_success" @click="selectCommodity">选购商品</span>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    components: {
      plugin_title: plugin_title
    },
    name: 'applySubmitSuccess',
    data(){
      return {
        parentMsg: '申请额度'
      }
    },
    methods:{
      selectCommodity(){
//          this.$router.push('../');
          this.$router.push('./');
//          跳转到首页
      }
    }
  }
</script>

<style scoped lang="scss">
.btn_success{
  height: 36px;
  line-height: 36px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
