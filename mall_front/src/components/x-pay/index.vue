<template>
  <div class="pay">
    <transition name="fade">
      <div class="pay wh recharge_pop" v-if="status.popChange">
        <div class="wh_box">
          <div class="pop">
            <div class="charge">
              <div class="fl">充值</div>
              <div class="fr" @click="cancelCharge">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="frm">
              <span>充值金额</span>
              <input type="text" @focus="chargeFocus" class="ipt" @keyup="amount(ipt_value)" v-model.trim="ipt_value"
                     placeholder="请输入您要充值的金额">
              <span class="tip">{{charge_tip}}</span>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="btn_successT" @click="goToPay">去付款</span>
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
    name: 'pay',
    data() {
      return{
        ipt_value: '',
        charge_tip: ''
      }
    },
    props: {
      status: Object
    },
    methods: {
      amount (val) {
        var regStrs = [
          ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
          ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
          ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
          ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
        ];
        for (var i = 0; i < regStrs.length; i++) {
          var reg = new RegExp(regStrs[i][0]);
          this.ipt_value = val.replace(reg, regStrs[i][1]);
        }
        ;
        var vm = this;
        this.checkChage = false;
        if (vm.ipt_value == '') {
          $('.ipt').css('border-color', '#FF4949')
          this.charge_tip = "请输入您要充值的金额"
        } else if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(vm.ipt_value)) {
          $('.ipt').css('border-color', '#FF4949')
          this.charge_tip = "请输入正确的金额"
        } else if (vm.ipt_value == '0.00') {
          this.charge_tip = "请输入正确的金额";
        } else if (Number(vm.ipt_value) < 1) {
          this.charge_tip = "请输入金额不少于1";
        } else {
          $('.ipt').css('border-color', '#6ECC66');
          this.charge_tip = '';
          this.checkChage = true;
        }
      },
      cancelCharge(){
        this.status.popChange = false;
      },
      chargeFocus(){
        $('.ipt').css('border-color', '#6ECC66');
      },
      goToPay(){
        var vm = this;
        if (vm.ipt_value == '') {
          $('.ipt').css('border-color', '#FF4949');
          this.charge_tip = "请输入您要充值的金额"
        } else if (vm.checkChage) {
          vm.status.popChange = false;
          this.$router.push({path: '../pay', query: {chargeAmount: vm.ipt_value, type: 'charge'}});
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .wh {
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
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
    position: relative;

  span {
    font-size: 14px;
    color: #333333;
  }

  .ipt {
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    margin-left: 18px;
    width: 306px;
    height: 35px;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  &::-webkit-input-placeholder {
     font-size: 14px;
     color: #CCCCCC;
   }

  &:hover {
     border: 1px solid #DDDDDD;
   }

  &:active {
     border: 1px solid #6ECC66;
   }

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
  }
  }
</style>
