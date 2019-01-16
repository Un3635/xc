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
                        <span v-if="!showTiming" class="text"  @click="sendMesaage('addrForm')">{{yzCodeStr}}</span>
                        <span v-else class="text code">{{timing}}s</span>
                    </div>
                </el-form-item>
                <el-form label-width="83px" :model="gooleData" ref="gooleForm" class="goole-form" v-show="isGaSecret" :rules="gooleRules">
                  <el-form-item label="谷歌验证码" prop="gooleCode">
                      <el-input placeholder="请输入谷歌验证码" v-model="gooleData.gooleCode" maxlength="6"></el-input>
                  </el-form-item>
                </el-form>
            </el-form>
            <!--</div>-->
            <div class="resultHint">{{this.resultHint}}</div>
            <div slot="footer" class="dialog-footer">
                <div class="modal-btn del" @click="dialogVisibleHandle(false)">取消</div>
                <div class="modal-btn sure" @click="bindAddr('addrForm')">确定</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import validators from '../login/rules.js'
export default {
  name: 'wallet',
  props: {
    cid: '',
  },
  data() {
   return {
     formData: {
      walletAddr: '',
      phoneNum: ''
     },
     gooleData: {
      gooleCode: ''
     },
     rules: {
       walletAddr: {validator: validators.checkAdd},
       phoneNum: {validator: validators.checkYzPwd}
     },
     gooleRules: {
       gooleCode: {validator: validators.checkGoog}
     },
     timer: null,
     showTiming: false,
     resultHint: '',
     yzCodeStr: '手机验证码',
     timing: 60,
     isGaSecret: localStorage.getItem("userInfo") && Boolean(JSON.parse(localStorage.getItem("userInfo")).isGaSecret)
   }
  },
  computed: {
    dialogVisible:{
      get: function () {
        return this.$store.state.dialogVisible;
      },
      set: function (newValue) {
        this.$store.commit('walletDialogVisible',newValue)
      }
    }
  },
  created(){},
  methods: {
    dialogVisibleHandle(params) {
      this.$store.commit('walletDialogVisible', params);
      // this.$emit("changeResultHint", '');
      this.resultHint = '';
      this.$refs.addrForm.resetFields();
      if(this.isGaSecret) {
        this.$refs.gooleForm.resetFields();
      }
      this.resetYzCode('手机验证码');
    },
    handleClose(){
      this.dialogVisibleHandle(false);
    },
    bindAddr(formName) {
      this.$refs[formName].validate((valid) => {
        if(this.isGaSecret)
        {
           this.$refs.gooleForm.validate((validGoole) => {
             if(valid && validGoole) {
                this.toBind();
             } else {
                console.log('error submit!!');
                return false;
            }
          })
        }
        else
        {
          if(valid) {
              this.toBind();
          } else {
            console.log('error submit!!');
            return false;
          }
        }
        
       
      });
    },
    toBind() {
      const param = {
        cid: this.cid,
        walletAddress: this.formData.walletAddr,
        smsCode: this.formData.phoneNum,
        gaCode: this.gooleData.gooleCode
      }
      // this.$emit('walletAddr', param);
      getajaxdata(API.bindCoinWalletAddress, 'POST', param, 'json', (res) => {
        if(Number(res.code) !== 1000){
          this.resultHint = res.message;
        }
        else{
          this.$store.commit('walletDialogVisible', false);
          this.$emit('changeWalletAddr', this.formData.walletAddr);
          this.dialogVisibleHandle(false);
        }
      }, this)
    },
    sendMesaage(formName) {
      // 发送验证码
     getajaxdata(API.sendBindCoinAddressCode, 'POST', {}, 'json', (res) => {
        if(Number(res.code) !== 1000)
        {
          this.resultHint = res.message;
          this.resetYzCode();
        }
        else{
          this.timer = setInterval(() => {
            if (this.timing === 0) {
               this.resetYzCode();
            } else {
              this.timing -= 1;
            }
          },1000)
          this.showTiming = true;
        }
      })
    },
    resetYzCode(str) {
      clearInterval(this.timer);
      this.showTiming = false;
      this.yzCodeStr = str || "重新发送";
      this.timing = 60;
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
}
.goole-form{
  margin-top: 22px;
}
.code {
  text-align: center;
  width: 80px;
}
</style>

