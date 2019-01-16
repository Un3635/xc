<template>
  <div class="company_certification_success">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="one_line">
        <span class="lab">账号使用者姓名</span>
        <span class="name">王二小</span>
      </div>
      <div class="one_line">
        <span class="lab">公司名称</span>
        <span class="name company">
            <span>上海小虫数据科技有限公司</span>
            <span class="success">
              <img src="../../assets/images/status_renzheng_success.png" alt="">
            </span>
          </span>
      </div>
      <div class="one_line">
        <span class="lab">公司营业执照</span>
        <span class="name pic">
            <img src="../../assets/images/save_worry.png" alt="">
          </span>
      </div>
    </div>

    <!--verify_success_pop-->
    <transition name="fade">
      <div class="wh" v-if="verify_success_pop">
        <div class="wh_box">
          <div class="box">
            <div class="title">
              <div class="name">认证成功</div>
              <div class="cancel" @click="cancelPop">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>

            <div class="frm frm_withdraw">
              <div class="icon">
                <span><img src="../../assets/images/icon_success.png" alt=""></span>
              </div>
              <div class="des">
                <div class="des_one">企业认证成功</div>
                <div class="des_two">申请免押金额度，租赁免押金</div>
              </div>
              <div style="clear: both;"></div>
            </div>

            <div class="line">

            </div>
            <div class="sure">
              <div class="btn_successT">
                立即申请
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    components: {
      plugin_title: plugin_title,
    },
    name: 'companyCertificationSuccess',
    data(){
      return {
        parentMsg: '企业认证',
        verify_success_pop: false
      }
    },
    methods: {
      cancelPop(){
        this.verify_success_pop = false;
      }
    }
  }
</script>

<style>

</style>
