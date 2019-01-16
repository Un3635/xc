<template>
  <div class="dialog-modal wallet-dialog-modal">
    <el-dialog
      title="修改钱包地址"
      width="420px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <!--<div class="dialog-modal">-->
      <el-form ref="addrForm" :model="formData" label-width="83px" :rules="rules" >
        <el-form-item label="钱包地址" prop="walletAddr">
          <el-input placeholder="请输入地址" v-model="formData.walletAddr"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="phoneNum" ref="phoneNum">
          <div class="safe-center-inpt">
            <el-input type="text" v-model="formData.phoneNum" maxlength="6"></el-input>
            <div class="lev"></div>
            <span class="text"  @click="sendMesaage('addrForm')" :class="{ban: yzCodeStr.indexOf('s') > -1}">{{yzCodeStr}}</span>
          </div>
        </el-form-item>
        <!-- <el-form label-width="83px" :model="gooleData" ref="gooleForm" class="goole-form" v-show="isGaSecret" :rules="gooleRules">
          <el-form-item label="谷歌验证码" prop="gooleCode">
            <el-input placeholder="请输入谷歌验证码" v-model="gooleData.gooleCode" maxlength="6"></el-input>
          </el-form-item>
        </el-form> -->
      </el-form>
      <!--</div>-->
      <div class="resultHint">{{this.resultHint}}</div>
      <div slot="footer" class="dialog-footer">
        <div class="modal-btn del" @click="dialogVisibleHandle(false)">取消</div>
        <div class="modal-btn sure" @click="bindAddr('addrForm')">确定</div>
      </div>
    </el-dialog>

    <transition name="slide-fade">
      <div class="profile-modal" v-if="isModal">
        <div class="profile-modal-box">
          <div class="profile-modal-box-text">
            <i class="el-notification__icon el-icon-success"></i>
          </div>
          <h1>资料修改成功</h1>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import validators from '../login/rules.js';
  import {getStore} from '../../plugins/utils'
import { mapState } from 'vuex';
  export default {
    name: 'wallet',
    props: {
      cid: '',
    },
    data() {
      return {
        isModal: false,
        formData: {
          walletAddr: '',
          phoneNum: ''
        },
        rules: {
          walletAddr: {validator: validators.checkAdd},
          phoneNum: {validator: validators.checkYzPwd}
        },
        timer: null,
        showTiming: false,
        resultHint: '',
        yzCodeStr: '手机验证码',
        timing: 60
        // isGaSecret: getStore("userInfo") && Boolean(JSON.parse(getStore("userInfo")).isGaSecret)
      }
    },
    computed: {
      ...mapState(['bindAddrTime']),
      dialogVisible:{
        get: function () {
          return this.$store.state.dialogVisible;
        },
        set: function (newValue) {
          this.$store.commit('walletDialogVisible',newValue)
        }
      }
    },
    watch: {
      bindAddrTime: {
        handler(val) {
          if(val === 0) {
            this.yzCodeStr = '手机验证码';
            return;
          }
          this.yzCodeStr = val + 's';
        }
      }
    },
    created(){},
    methods: {
      dialogVisibleHandle(params) {
        this.$store.commit('walletDialogVisible', params);
        this.resultHint = '';
        this.$refs.addrForm.resetFields();
      },
      handleClose(){
        this.dialogVisibleHandle(false);
      },
      bindAddr(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.toBind();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toBind() {
        const param = {
          cid: this.cid,
          walletAddress: this.formData.walletAddr,
          smsCode: this.formData.phoneNum,
          initTimes: new Date().getTime()
          // gaCode: this.gooleData.gooleCode
        }
        // this.$emit('walletAddr', param);
        var vm = this;
        getajaxdata(API.bindCoinWalletAddress, 'POST', param, 'json', (res) => {
          if(Number(res.code) !== 1000){
            vm.resultHint = res.message;
          } else{
            vm.isModal = true;
            setTimeout(() => {
              vm.isModal = false;
              vm.$store.commit('walletDialogVisible', false);
              vm.$emit('changeWalletAddr', this.formData.walletAddr);
              vm.dialogVisibleHandle(false);
            },3000)
          }
        }, this)
      },
      sendMesaage(formName) {
        // 发送验证码
        if(this.yzCodeStr.indexOf('s') > -1) return;
        this.$refs[formName].validateField('walletAddr', (valid) => {
          if(!valid) {
             getajaxdata(API.sendBindCoinAddressCode, 'POST', {initTimes: new Date().getTime()}, 'json', (res) => {
              if(Number(res.code) !== 1000)
              {
                this.resultHint = res.message;
              }
              else{
                this.resultHint  = '';
                if(this.bindAddrTime === 0) {
                  this.$store.commit('bindAddrTime', this.timing);
                }
                if(this.bindAddrTime === this.timing) {
                  this.$store.dispatch('bindAddrTime');
                  this.yzCodeStr = this.bindAddrTime + 's';
                }
              }
            }, this)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .resultHint {
    position: absolute;
    right: 20px;
    bottom: 70px;
    color: #f56c6c;
    padding-bottom: 6px;
  }
  .goole-form{
    margin-top: 22px;
  }
  .code {
    text-align: center;
    width: 80px;
  }
  .text {
    margin-right: 0px !important;
  }
  .ban {
    cursor: not-allowed !important;
    width: 48px;
  }
</style>

