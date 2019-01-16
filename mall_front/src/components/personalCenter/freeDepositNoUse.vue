<template>
  <div class="free_deposit_nouse">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="surplus">
        <div class="one_part">
          <div class="fl">
            <span class="surplus_quota">剩余免押金额度</span>
            <span class="num">3,055,000.00</span>
            <span class="yen">元</span>
          </div>
          <div class="fr">
            <span class="btn_successT" @click="promoteQuota">提升额度</span>
            <span class="btn_start">
              <span class="btn_textT" style="padding-left: 30px;padding-right: 30px;"  @click="selectCommodity">去租机</span>
            </span>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="two_part">
          <span class="total_quota">总额度</span>
          <span class="num">10,000,000.00元</span>
          <span class="used_quota">已经使用额度  </span>
          <span class="num">10,000,000.00元</span>
        </div>
      </div>
      <div class="used_record">
        <span>免押金额度使用记录</span>
      </div>
      <div class="icon_box">
        <div class="icon_kong">
          <img src="../../assets/images/icon_jilu_kong.png" alt="">
        </div>
        <div class="txt">
          <span>您的免押金额度还没有使用，赶紧去租机吧</span>
        </div>
        <div class="btn_success" style="padding-left: 30px;padding-right: 30px;" @click="selectCommodity">
          去租机
        </div>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    name: 'freeDepositNoUse',
    components: {
      plugin_title: plugin_title
    },
    data(){
      return {
        parentMsg: '免押金额度'
      }
    },
  methods:{
    selectCommodity(){
//          跳转到首页
    },
    promoteQuota(){
//        到提升额度页面
    }
  }
  }
</script>

<style scoped lang="scss">

</style>
