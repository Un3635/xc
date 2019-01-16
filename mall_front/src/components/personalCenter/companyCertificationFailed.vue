<template>
  <div>
    <RecompanyCertification v-if="page_status==3" @reAuthSuccess="reAuthSuccess"></RecompanyCertification>
    <companyCertification v-if="page_status==1" @authSuccess="authSuccess"></companyCertification>
    <div class="company_certification_fail" v-if="page_status==2">
      <plugin_title :message="parentMsg"></plugin_title>
      <div class="content" v-if="status==3||status==2">
        <div class="one_line">
          <span class="lab">账号使用者姓名</span>
          <span class="name">{{userName}}</span>
        </div>
        <div class="one_line">
          <span class="lab">公司名称</span>
          <span class="name company">
            <span>{{companyName}}</span>
            <span class="success">
              <img v-if="status==3" src="../../assets/images/status_renzheng_defeated.png" alt="">
              <img v-if="status==2" src="../../assets/images/status_renzheng_success.png" alt="">
            </span>
          </span>
        </div>
        <div class="one_line">
          <span class="lab">公司营业执照</span>
          <span class="name pic">
            <img :src="licenseImg" alt="" v-if="licenseImg">
            <img src="../../assets/images/licenseImg.png" alt="" v-if="!licenseImg">
          </span>
        </div>

        <div class="tip" v-if="status==3">
          <span class="lab"></span>
          <span>{{errorMsg}}</span>
        </div>
        <div class="btn_line" v-if="status==3">
          <span class="lab"></span>
          <span class="btn_successT" @click="reCertification">
             重新认证
           </span>
        </div>
      </div>
      <div class="wh" v-if="this.flag">
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
              <div class="btn_successT" @click="rightNowApply">
                立即申请
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>
      <div class="cont" v-if="status==1">
        <div class="icon">
          <img src="../../assets/images/icon_tijiao_success.png" alt="">
        </div>
        <div class="icon_des">
          <span>申请提交成功</span>
        </div>
        <div class="des_detail">
          <span>申请已受理，正在审核您提供的资料</span>
        </div>
        <div class="goattest">
          <p>在等待审核期间，您可以:</p>
          <div class="btn_successT" @click="rightNowApply">
            申请免押金额度
          </div>
        </div>
      </div>

    </div>
    <pop :obj="obj"></pop>
  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import companyCertification from './companyCertification'
  import RecompanyCertification from './RecompanyCertification'
  import pop from './x-pop'
  import {bus} from '../../assets/js/config'

  export default {
    components: {
      plugin_title: plugin_title,
      companyCertification: companyCertification,
      RecompanyCertification: RecompanyCertification,
      pop: pop
    },
    name: 'companyCertificationFailed',
    data(){
      return {
        authS: 0,
        is_re_auth: 0,
        obj: {
          title: '账号认证',
          content: '',
          is_pop: false
        },
        page_status: '',
        parentMsg: '企业认证',
        token: '',
        companyName: '',
        errorMsg: '',
        flag: false,
        licenseImg: '',
        status: '',
        userName: '',
      }
    },
    methods: {

      reCertification(){
        this.page_status = 3;
      },
      rightNowApply(){
        this.$router.push({path: './freeDeposit'});
      },
      cancelPop(){
        this.flag = false;
      },

      getInfos(){
        var vm = this;
        vm.$http.get('/account/queryAuthInfo', {params: {token: vm.token,initTime: new Date().getTime()}}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.companyName = res.data.companyName;
            vm.errorMsg = res.data.errorMsg;
            vm.flag = res.data.flag;
            vm.licenseImg = res.data.licenseImg;
            vm.status = res.data.status;
            vm.userName = res.data.userName;
          } else if (Number(res.code) !== 7024){
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },

      goToWhere(){
        var obj = {
          token: this.token,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/account/companyAuthLoading', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
//                  1-企业认证提交信息页面，2-查询页面；返回code：1000-成功；5000-系统异常；7024-登录失效；
            if (res.data == 1) {
              vm.page_status = 1;
            } else if (res.data == 2) {
              vm.page_status = 2;
            }
            vm.getInfos();
          } else if (Number(res.code) !== 7024){

            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
      reAuthSuccess(){
        this.is_re_auth = 1;
      },
      authSuccess(){
        this.authS = 1;
      }
    },
    created(){
      var vm = this;
      vm.token = localStorage.getItem('xckz_mall');
      this.goToWhere();
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })
    },
    watch: {
      is_re_auth(){
        this.goToWhere();
      },
      authS(){
        this.goToWhere();
      }
    }
  }
</script>

<style scoped>
.goattest{
  margin-top: 30px;
}
  .goattest p{
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
  }
</style>
