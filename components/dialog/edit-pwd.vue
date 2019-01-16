
<template>
  <el-dialog title="修改密码" :visible.sync="dialog_editpwd.dialogshow" :width="'400px'" :custom-class="'dialog_amia'" :center="true" @close="$emit('update:show', false)" :before-close="bc">

    <el-form ref="form" >
      <el-form-item>
        <span class="phone">{{phone}}</span>
      </el-form-item>
      <el-form-item >
        <el-input class="inputyzm" v-model="dialog_editpwd.code" @focus="dialog_editpwd.err=''" :maxlength=10 placeholder="6位数字验证码"></el-input>
        <el-button class="getyzmbt" @click="get_wy_code" :loading="dialog_editpwd.wy_loading" :maxlength=18 :minlength=6  v-if="time==0">发送验证码</el-button>
        <el-button class="getyzmbtdao"  :maxlength=18 :minlength=6 :disabled="time>0" v-if="time>0">{{time}}s</el-button>
      </el-form-item>
      <el-form-item >
        <el-input v-model="dialog_editpwd.pwd" @focus="dialog_editpwd.err=''" type="password" placeholder="8-18位字母及数字的密码"></el-input>
      </el-form-item>
      <div class="err" v-show="dialog_editpwd.err">{{dialog_editpwd.err}}</div>
      <el-form-item>
        <el-button class="sub" :disabled="!dialog_editpwd.code||!dialog_editpwd.pwd" :loading="dialog_editpwd.sub_loading" @click="update_pwd">修改密码</el-button>
      </el-form-item>

    </el-form>
    <div id="captcha"></div>
  </el-dialog>
</template>
<style lang="scss">
.dialog_amia{
  .el-dialog__header{
    text-align:left;
    padding-top: 35px;
    padding-left: 33px;
    border: none;
    .el-dialog__title{
      font-size: 20px;
      color: #222222;
      font-weight: 700;
    }
  }
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
    .sub{
      width: 100%;
      height: 40px;
      background: #4E88EA;
      color: #FFFFFF;
    }
    .sub.is-disabled{
        background: #A7C4F5;
        color: #ffffff;
        border: none;
    }
    .sub.el-button:hover{
       background: #4E88EA;
      color: #FFFFFF;
      border: none;
    }
    .el-button.is-disabled:hover{
      color: #FFFFFF;
      background: #4e88ea;
    }
    .el-button:hover{
      color: #fff;
      border-color: #4e88ea;
      background-color: #4e88ea;
    }
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        color: #ffffff;
        cursor: not-allowed;
        background-image: none;
        background-color: #A7C4F5;
        border-color: #A7C4F5;
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
      margin-top: 22px;
      margin-bottom: 22px;
    }
}
</style>

<script>
  import { getSendCode, updatePwd } from "../../pages/mine/js/mineapi";
  import { wy_captcha } from "../../service/wy-captcha";
  import regex from "../../service/regex";
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
        time: 0,
        dialog_editpwd: {
          code: "",
          pwd: "",
          err: "",
          sub_loading: false,
          wy_loading: false,
          dialogshow: this.show
        }
      };
    },
    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
        this.dialog_editpwd = {
          code: "",
          pwd: "",
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
      get_wy_code() {
        this.dialog_editpwd.wy_loading = true;
        wy_captcha({ el: "#captcha" })
          .then(data => getSendCode({ type: 41, captchaCode: data.validate }))
          .then(() => this.$message("验证码已发送"))
          .then(() => this.timeStart())
          .catch(err => (this.dialog_editpwd.err = err.msg))
          .finally(() => (this.dialog_editpwd.wy_loading = false));
      },
      update_pwd() {
      
        if (!regex.is_regpwd.test(this.dialog_editpwd.pwd)) {
          this.dialog_editpwd.err = "请输入8-18位字母及数字的密码";
          return;
        }
        this.dialog_editpwd.sub_loading = true;
        updatePwd({
          code: this.dialog_editpwd.code,
          pwd: this.dialog_editpwd.pwd
        })
          .then(res => {
              this.$message({ 
                message: '密码修改成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
             this.$store.commit("CLEAR_TOKEN");
              this.$router.replace({
                  path: "/"
              });
            this.do_bc();
          })
          .catch(err => {
            this.dialog_editpwd.err = err.msg;
          })
          .finally(() => (this.dialog_editpwd.sub_loading = false));
      }
    },
    watch: {
      show() {
        this.dialog_editpwd.dialogshow = this.show;
      }
    }
  };
</script>