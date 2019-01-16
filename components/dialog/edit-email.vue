
<template>
  <el-dialog title="绑定邮箱" :visible.sync="dialog_email.dialogshow" :width="'400px'" :custom-class="'edit_maill'" :center="true" @close="$emit('update:show', false)" :before-close="bc">
    <div class="activelayer" :class="{actives:dialog_email.in_step2}">


      <el-steps :active="active" align-center>
        <el-step title="验证账户"></el-step>
        <el-step title="绑定邮箱"></el-step>
      </el-steps>

      <el-form ref="form"  class="stateform" v-if="active==1">
        <el-form-item  style="margin-bottom:20px">
          <!-- <el-input v-model="dialog_email.email" :placeholder="phone" class="phone" :disabled="'false'"></el-input> -->
          <span class="phone">{{phone}}</span>
        </el-form-item>
        <el-form-item >
          <el-input class="inputyzm" v-model="dialog_email.phone_code" @focus="dialog_email.err=''" placeholder="短信验证码"></el-input>
          <el-button class="getyzmbt" @click="get_wy_code_email_stp1"  :loading="dialog_email.wy_loading" v-if="time==0">发送验证码</el-button>
          <el-button class="getyzmbtdao" :disabled="time>0" v-if="time>0">{{time}}s</el-button>

        </el-form-item>
        <div class="err" v-show="dialog_email.err">{{dialog_email.err}}</div>
        <el-form-item>
          <el-button class="sub" @click="get_wy_code_email_stp1_sub" :disabled="!dialog_email.phone_code" :loading="dialog_email.sub_loading">下一步</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="form"  class="stateform" v-if="active==2">
        <el-form-item style="margin-bottom:20px">
          <el-input v-model="dialog_email.email" placeholder="邮箱账号" class="emailtop"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="inputyzm" v-model="dialog_email.email_code" @focus="dialog_email.err=''" placeholder="邮箱验证码"></el-input>
          <el-button class="getyzmbt" @click="get_wy_code_email_stp2" :loading="dialog_email.wy_loading" v-if="time2==0">发送验证码</el-button>
        <el-button class="getyzmbtdao" :disabled="time2>0" v-if="time2>0">{{time2}}s</el-button>

        </el-form-item>
        <div class="err" v-show="dialog_email.err">{{dialog_email.err}}</div>
        <el-form-item>
          <el-button class="sub" @click="get_wy_code_email_stp2_sub" :disabled="!dialog_email.email_code||!dialog_email.email" :loading="dialog_email.sub_loading">确定</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div id="captcha_dialog_email"></div>
  </el-dialog>
</template>
<style lang="scss">
.edit_maill{
  .el-dialog__header{
    text-align: left;
    padding-top: 35px;
    padding-left: 33px;
    .el-dialog__title{
      font-size: 20px;
      color: #222222;
      font-weight: 700;
    }
   
  }
  .el-steps{
    width: 230px;
    margin: 0 auto 30px;
    .el-step__head.is-finish{
      color: #ffffff;
      border-color: #4E88EA;
      .el-step__icon.is-text{
        background: #4E88EA
      }
    }
    .el-step__icon-inner{
      font-weight: 100;
    }
    .el-step__title.is-finish{
      color: #222222;
    }
    .el-step__line{
      background-color:#F0F0F0;
    }
    .el-step__title{
      font-size: 14px;
    }
    .el-step__title.is-process{
      color: #ACACAC;
    }
    .el-step__head.is-process{
      
      border-color: #F0F0F0;
      .el-step__icon.is-text{
        background: #F0F0F0;
        .el-step__icon-inner{
          color: #ACACAC;
        }

      }
    }
  }
  .stateform{
    .inputyzm{
      width: 234px;
      height: 40px;
      .el-input__inner{
        background: #F9F9F9;
      }
      
    }
    .getyzmbt{
      width: 100px;
      height: 40px;
      margin-left: 12px;
      padding: 0;
      border-radius: 4px;
      background: #4E88EA;
      border: none;
      color: #FFFFFF;
      
    }
    .getyzmbtdao{
      width: 100px;
      height: 40px;
      margin-left: 12px;
      padding: 0;
      border-radius: 4px;
      background: #A7C4F5;
      border: none;
      color: #FFFFFF;
      &:hover{
        background: #A7C4F5;
        color: #FFFFFF;
      }
    }
    .is-loading{
        background: #A7C4F5;
    }
    .sub{
      width: 100%;
      height: 40px;
      background: #4E88EA;
      color: #FFFFFF;
    }
    .sub.is-disabled{
        background: #A7C4F5;
    }
    .el-button.is-disabled:hover{
      color: #FFFFFF;
    }
    .emailtop{
      width: 100%;
      margin-left: 0;
      .el-input__inner{
        background: #F9F9F9;
      }
    }
    .phone{
      font-size: 16px;
    }
    .err{
    background: rgba(249, 84, 83, .1);
    border: 1px solid #f95453;
    border-radius: 4px;
    font-size: 12px;
    line-height: 17px;
    color: #fa322b;
    padding: 7px 0;
    text-align: center;
        margin-bottom: 22px;
    }
  }
  

}
</style>

<script>
  import {
    getSendCode,
    checkAccount,
    updateEmail
  } from "../../pages/mine/js/mineapi";
  import { wy_captcha } from "../../service/wy-captcha";
  export default {
    props: {
      show: {
        type: Boolean
      },
      phone: {
        type: String
      }
    },
    data() {
      return {
        dialog_email: {
          in_step2: false,
          phone_code: "",
          email_code: "",
          email: "",
          err: "",
          sub_loading: false,
          wy_loading: false,
          dialogshow: this.show,
          
        },
        active: 1,
        time: 0,
        time2: 0,
      };
    },
    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
        this.dialog_email = {
          in_step2: false,
          phone_code: "",
          email_code: "",
          email: "",
          err: "",
          sub_loading: false,
          wy_loading: false,
          dialogshow: false
        };
      },
      timeStart() {
        var that = this;
        (function timein() {
          if (that.time <= 0) {
            that.time = 60;
          }
          setTimeout(() => {
            that.time--;
            if (that.time > 0) {
              timein();
            }
          }, 1000);
        })();
      },
      timeStart2() {
        var that = this;
        (function timein() {
          if (that.time2 <= 0) {
            that.time2 = 60;
          }
          setTimeout(() => {
            that.time2--;
            if (that.time2 > 0) {
              timein();
            }
          }, 1000);
        })();
      },
      get_wy_code_email_stp1() {
        this.dialog_email.wy_loading = true;
        wy_captcha({ el: "#captcha_dialog_email" })
          .then(data => getSendCode({ type: 51, captchaCode: data.validate }))
          .then(() => this.$message("验证码已发送"))
          .then(() => this.timeStart())
          .catch(err => (this.dialog_email.err = err.msg))
          .finally(() => (this.dialog_email.wy_loading = false));
      },
      get_wy_code_email_stp1_sub() {
        this.active = 2;
        this.dialog_email.sub_loading = true;
        checkAccount({ code: this.dialog_email.phone_code })
          .then(res => (this.dialog_email.in_step2 = true,this.activ=2))
          .catch(err => (this.dialog_email.err = err.msg))
          .finally(() => (this.dialog_email.sub_loading = false));
      },
      get_wy_code_email_stp2_sub() {
        this.dialog_email.sub_loading = true;
        updateEmail({
          newEmail: this.dialog_email.email,
          code: this.dialog_email.email_code
        })
          .then(res => {
            this.$store.commit("SET_USERINFO", {
              email: this.dialog_email.email
            });
            this.do_bc();
            this.activ=2
          })
          .catch(err => (this.dialog_email.err = err.msg))
          .finally(() => (this.dialog_email.sub_loading = false));
      },
      get_wy_code_email_stp2() {
        this.dialog_email.wy_loading = true;
        getSendCode({
          type: 52,
          captchaCode: "",
          account: this.dialog_email.email
        })
          .then(() => this.$message("验证码已发送"))
          .then(() => this.timeStart2())
          .catch(err => (this.dialog_email.err = err.msg))
          .finally(() => (this.dialog_email.wy_loading = false));
      }
    },
    watch: {
      show() {
        this.dialog_email.dialogshow = this.show;
      }
    }
  };
</script>