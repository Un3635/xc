<template>
  <div class="freeDQ">


    <applyQuota v-if="status==3" @applySuccess="applySuccess"></applyQuota>

    <applySubmitSuccess v-if="status==4"></applySubmitSuccess>

    <freeDepositUsed v-if="status==5" @proQuota="proQuota"></freeDepositUsed>

    <promoteQuota v-if="status==7"></promoteQuota>

    <div class="free_deposit" v-if="status==1">

      <plugin_title :message="parentMsg"></plugin_title>
      <div class="content">
        <div class="text">
          <span>
            免押金额度是小虫快租为优质企业客户提供的信用额度
          </span>
        </div>
        <div class="grey_text">
          <span>
            获得额度后，每月只需支付租金，即可享用所选设备。提交简单的申请资料即有机会获得免押金额度，信用越好，免押金额度更高。
          </span>
        </div>
        <span class="btn_successT" @click="goToCompanyVerify">申请免押金额度</span>
      </div>
    </div>
    <plugin_title :message="parentMsg" v-if="status==6"></plugin_title>
    <div class="cont" v-if="status==6">
      <div class="icon">
        <img src="../../assets/images/icon_tijiao_success.png" alt="">
      </div>
      <div class="icon_des">
        <span>申请提交成功</span>
      </div>
      <div class="des_detail">
        <span>申请已受理，正在审核您提供的资料</span>
      </div>
    </div>
    <pop :obj="obj"></pop>
  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'

  import applyQuota from './applyQuota'
  import applySubmitSuccess from './applySubmitSuccess'
  import freeDepositUsed from './freeDepositUsed'
  import promoteQuota from './promoteQuota'
  import pop from './x-pop'
  import {bus} from '../../assets/js/config'
  export default {
    name: 'freeDeposit',
    components: {
      plugin_title: plugin_title,
//        companyCertificationFailed:companyCertificationFailed,
      applyQuota: applyQuota,
      applySubmitSuccess: applySubmitSuccess,
      freeDepositUsed: freeDepositUsed,
      promoteQuota: promoteQuota,
      pop: pop
    },

    data(){
      return {

        applyS: 0,
        proQt: 0,
        obj: {
          title: '免押金额度',
          content: '',
          is_pop: false
        },
        status: '',
        parentMsg: '免押金额度',
        token: '',

      }
    },
    methods: {
      submitAuthS(){
        this.subAuthS = 1;
      },
      goToCompanyVerify(){
//            跳转到中间态企业认证
        this.$router.push({path: './companyCertificationFailed',query: {t: 'deposit'}});
      },
      goWhere(){

        var obj = {
          token: this.token,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/deposit/depositLoading', {params: obj}).then(function (data) {

          var res = data.data;
          if (Number(res.code) === 1000) {
            if (res.data == 1) {
              vm.status = 1;
            } else if (res.data == 2) {
              vm.$router.push('./companyCertificationFailed');
            } else if (res.data == 3) {
              vm.status = 3;
            } else if (res.data == 4) {
              vm.status = 4;
            } else if (res.data == 5) {
              vm.status = 5;
            }else if (res.data == 6) {
              vm.status = 6;
            }
          } else if (Number(res.code) !== 7024){

            vm.obj.is_pop = true;
            vm.obj.content = res.msg;

          }
        })


      },
      proQuota(){
        this.proQt = 1;
//          this.goWhere();
      },
      applySuccess(){
        this.applyS = 1;
        this.goWhere();
      }

    },
    watch: {
      $route (val) {
      },
      proQt(){
        this.status = 7;
//          this.goWhere();
      },
      applyS(){
//            this.status=4;

        this.goWhere();
      },
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      var toWhere = this.$route.query.to;
//      console.log(toWhere);
//      console.log(2222222222);
//      console.log(toWhere == 'promoteQuota');
      if (toWhere == 'promoteQuota') {
        this.status = 7;
      } else if (toWhere == 'applySubmitSuccess') {
        this.status = 4;
      } else {

        this.goWhere();
      }
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })

    },
  }
</script>

<style scoped lang="scss">
  .btn_success {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .cont{
    width: 990px;
    background-color: #fff;
    text-align: center;
    padding-top: 140px;
    padding-bottom: 215px;
    .icon {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .icon_des {
      font-size: 18px;
      color: #333333;
      margin-top: 20px;
    }
    .des_detail {
      font-size: 14px;
      color: #999999;
      width: 230px;
      margin: 0 auto;
      margin-top: 8px;
    }
    .you_can {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
    }
    .el_button {
      margin-top: 10px;
    }
  }
</style>
