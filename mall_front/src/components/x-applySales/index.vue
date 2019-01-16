<template>
  <div>
    <transition name="fade" v-if="isModal">
      <div class="wh_view">
        <div class="wh_box" style="width: 420px;">
          <div class="pop">
            <div class="charge">
              <div class="fl">申请售后</div>
              <div class="fr" @click="cancelApplySellService">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="frm frm_withdraw">
              <div class="icon">
                <span><i class="el-icon-warning" style="color: #F7BA2A;font-size: 40px"></i></span>
              </div>
              <div class="des">
                <div class="des_one">暂不支持线上申请售后服务</div>
                <div class="des_two">请联系您的商务经理或联系客服</div>
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="btn_successT" @click="cancelApplySellService">知道了</span>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'modal',
    props: {
      isModal: Boolean
    },
    methods: {
      cancelApplySellService() {
        this.$emit('close')
      }
    },
  }
</script>
<style scoped lang="scss">
  .wh_view {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .4);
  .wh_box {
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

  .pop {
    padding: 20px 0px 0px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #EEEEEE;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 4px;
  .charge {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
  .fl {
    float: left;
  }
  .fr {
    float: right;
    width: 15px;
    height: 15px;
    cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  }
  }
  .frm {
  //padding-left: 20px;
    padding-right: 20px;
    padding-left: 20px;
    margin-top: 30px;
    position: relative;
  .ipt {
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    margin-left: 18px;
    width: 306px;
    height: 35px;
  }
  .tip {
    position: absolute;
    top: 45px;
    left: 100px;
    font-size: 12px;
    color: #FF4949;
  }
  }
  .frm_withdraw {
  .icon {
    float: left;
  }
  .des {
    float: left;
    margin-left: 15px;
  .des_one {
    font-size: 14px;
    color: #333333;
  }
  .des_two {
    font-size: 14px;
    color: #999999;
    margin-top: 10px;
  }
  }
  }
  .line {
    margin-top: 46px;
    border-top: 1px solid #EEEEEE !important;
  }
  .subm {
    padding-left: 20px;
    padding-right: 20px;
  /*height: 66px;*/
  /*display: block;*/
  span {
    float: right;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  }
  }
  .pop_withdraw {

  }
  }
  }
</style>
