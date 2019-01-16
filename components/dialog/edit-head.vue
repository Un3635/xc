
<template>
  <el-dialog title="修改头像" :visible.sync="dialog_head.dialogshow" :width="'400px'" :custom-class="'edit_headerimg edit'" :center="true" @close="$emit('update:show', false)" :before-close="bc">

    <el-form ref="form">
      <el-form-item>
        <!-- <el-upload :action="dialog_head.action" :headers="dialog_head.uploadheader" :multiple="false" ref='uploadhead' :on-remove="dialog_head_disabledno" :on-change="dialog_head_disabled2" :before-remove="dialog_head_disabled2" :limit="1" :name="'file'" :auto-upload="false" :show-file-list="true" :file-list='dialog_head.filelist' :on-error='dialog_head_error' :disabled="dialog_head.disabled" :on-progress='dialog_head_disabled' :on-success='dialog_head_success' list-type="picture">
          <el-button class="uploadheader">上传头像</el-button>
        </el-upload> -->

        <el-upload :action="dialog_head.action" :headers="dialog_head.uploadheader" ref="uploadhead" :multiple="false"  :on-remove="dialog_head_disabledno" :on-change="dialog_head_disabled2" :before-remove="dialog_head_disabled2" :limit="1000" :name="'file'" :auto-upload="false" :show-file-list="false" :file-list='dialog_head.filelist' :on-error='dialog_head_error' :disabled="dialog_head.disabled" :on-progress='dialog_head_disabled' :on-success='dialog_head_success'>
          <div class="edit_header_upload" ref="uploadheadimg" :class="{has:dialog_head.logo_preview}">
            <!-- <el-button :loading="uploadloading" round icon="el-icon-plus"></el-button> -->
            <img src="../../assets/images/142/uploadimg.png" alt="" >
            <div class="zhe" v-if="dialog_head.logo_preview"></div>
            <h2 v-if="!dialog_head.logo_preview">点击添加图片</h2>
            <h2 v-if="dialog_head.logo_preview">修改封面</h2>
            <h3 v-if="!dialog_head.logo_preview">建议尺寸：250PX * 140PX 支持格式：jpg、png、jpeg</h3>
          </div>
        </el-upload>


      </el-form-item>
      <div class="err">{{dialog_head.err}}</div>
      <el-form-item>
        <el-button class="sub" @click="dialog_head_sub" :loading="dialog_head.sub_loading" :disabled="dialog_head.disabled2">修改头像</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
.edit_headerimg.edit{
  .el-dialog__header{
    text-align:left;
    border: none;
    padding: 35px 33px 15px 33px;
        line-height: 1;
    .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
        font-weight: 700;
    }
  }
  .el-form-item__content{
    .sub{
      width:336px;
      line-height: 40px;
      height: 40px;
      background-color: #409EFF;
      margin-left: 5px;
    }
   .sub.is-disabled {
        background-color: #A7C4F5;
    }
  }
  .edit_header_upload {
    background: #fafafa;
    border-radius: 3px;
    width: 350px;
    height: 193px;
    background-size: 100%;
    position: relative;
    z-index: 10;
    .zhe{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;left: 0;
          opacity: .5;
    background: #000;
    z-index: -1;
    }
    &.has {
      background-size: 100% 100%;
      h2,
      h3 {
        color: white;
      }
      img {
        margin-top: 70px;
      }
    }
    img {
      width: 40px;
      height: 40px;
      margin-top: 47px;
    }
    h2 {
      font-size: 14px;
      color: #888888;
      line-height: 20px;
      margin-top: 13px;
    }
    h3 {
      font-size: 12px;
      color: #cccccc;
      line-height: 17px;
      margin-top: 10px;
      width: 178px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

<script>
  import { AppConfig } from "../../service/config";
  export default {
    props: {
      show: {
        type: Boolean
      }
    },
    data() {
      return {
        dialog_head: {
          uploadheader: {
            token: this.$store.state.token
          },
          filelist: [],
          err: "",
          sub_loading: false,
          dialogshow: this.show,
          action: AppConfig.apiEndpoint + "/user/updateHead.wl",
          disabled:false,
          disabled2:true,
          logo_preview: "",
        }
      };
    },

    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
       
        this.$refs.uploadheadimg.style.backgroundImage = 'none';
        this.dialog_head = {
          uploadheader: {
            token: this.$store.state.token
          },
          filelist: [],
          err: "",
          sub_loading: false,
          dialogshow: false,
          action: AppConfig.apiEndpoint + "/user/updateHead.wl",
          disabled:false,
          disabled2:true,
          logo_preview: "",
        };
      },
      message({
        message,
        title,
        onClose = () => {},
        duration = 2000,
        type = "success"
      }) {
        this.$notify({
          title,
          message,
          type,
          customClass: "messagev142",
          duration,
          onClose
        });
      },
      dialog_head_sub() {
        this.dialog_head.sub_loading = true;
        this.$refs.uploadhead.submit();
      },
      dialog_head_disabled2(file, fileList){
        if (!(file.raw.type == "image/png" || file.raw.type == "image/jpeg" || file.raw.type == "image/jpg")) {
          return this.message({
            title: "格式错误",
            type: "warning"
          });
        }
        if(file.status == "ready"){
          this.dialog_head.logo_preview = file.url
          this.$refs.uploadheadimg.style.backgroundImage = `url(${
            this.dialog_head.logo_preview
          })`;
          this.dialog_head.disabled2 = false;
          this.dialog_head.filelist = fileList.slice(-1);
        }
        if(file.status == "success"){
          this.$refs.uploadheadimg.style.backgroundImage = 'none'
        }
      },
      dialog_head_disabledno(file, fileList){
        this.dialog_head.disabled2 = true;
      },
      //上传时禁用状态
      dialog_head_disabled(event, file, fileList){
        this.dialog_head.disabled = true;
      },
      dialog_head_success(response, file, fileList) {
        
        this.dialog_head.disabled = false
        if (response.code == "000000") {

          this.$store.commit("SET_USERINFO", {
            head: URL.createObjectURL(file.raw)
          });
          this.do_bc();

          

        } else {
          this.dialog_head.err = response.msg;
        }
      },
      dialog_head_error(err, file, fileList) {
        this.dialog_head.sub_loading = false;
        this.dialog_head.err = "网络错误";
      }
    },
    watch: {
      show() {
        this.dialog_head.dialogshow = this.show;
      }
    }
  };
</script>