<template>
  <div>
    <!-- v-if="type.indexOf('img')>=0||!loading" -->
    <div class="wl_upload_card" ref="card" v-loading="loading" v-show="type.indexOf('img')>=0||!loading">
      <div class="wl_upload_card_before">
        <el-upload :action="action" :headers="uploadheader" :multiple="true" :limit="1000" :name="'logo'" :show-file-list="false" :on-error='on_error' :on-success='on_success' :before-upload="on_before" :on-progress='on_progress' ref="upload" :http-request="http_request">
          <img src="../../assets/images/142/uploadimg.png" alt="" v-if="!url">
          <img src="../../assets/images/142/editgroup25.png" alt="" v-else>
        </el-upload>
        <template v-if="!url">
          <h2>{{title1}}</h2>
          <h3>{{h3_1}}</h3>
          <h3>{{h3_2}}</h3>
        </template>
        <template v-else>
          <h2>{{title2}}</h2>
        </template>
      </div>
    </div>
    <div class="wl_upload_progress" v-show="!(type.indexOf('img')>=0||!loading)">
      <div class="wl_upload_progress_inner">
        <div class="wl_upload_progress_value" ref="value">{{percent}}%</div>
        <div class="wl_upload_progress_line" ref="line"></div>
        <div class="wl_upload_progress_info">
          当前上传速度：{{progress_speed}}MB/s 预计剩余时间：{{progress_lefttime}}秒 已上传：{{(filesize*percent/100).toFixed(2)}}MB/{{filesize.toFixed(2)}}MB
           <span @click="stop">暂停上传</span>
          <span @click="cancel">取消上传</span>

        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
  .wl_upload_progress {
    background: #fafafa;
    border-radius: 3px;
    width: 800px;
    height: 94px;
    display: flex;
    justify-content: center;
    align-items: center;
    &_inner {
      width: 760px;
    }
    &_line {
      background: #ebebeb;
      border-radius: 3px;
      height: 14px;
      margin-bottom: 8px;
      background-image: linear-gradient(-90deg, #329dff 2%, #00c1ff 100%);
      background-size: 0% 100%;
      background-repeat: no-repeat;
      transition: all 0.5s;
    }
    &_info {
      font-size: 12px;
      color: #888888;
      span {
        float: right;
        font-size: 14px;
        color: #4d87ea;
        cursor: pointer;
      }
    }
    &_value {
      width: 52px;
      height: 26px;
      background: #4e88ea;
      color: white;
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      margin-bottom: 9px;
      border-radius: 2px;
      position: relative;
      transform: translateX(-28px);
      transition: all 0.5s;
      &:after {
        content: "";
        border-top: 6px solid #4e88ea;
        border-left: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid transparent;
        position: absolute;
        left: 21px;
        bottom: -12px;
      }
    }
  }
  .wl_upload_card {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 350px;
    height: 212px;
    background-color: #fafafa;
    border-radius: 3px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 13px;
    }
    h2 {
      font-size: 14px;
      line-height: 20px;
      color: #888888;
    }
    h3 {
      font-size: 12px;
      line-height: 17px;
      color: #cccccc;
      &:first-of-type {
        margin-top: 10px;
      }
    }
    &_before,
    &_after {
      text-align: center;
    }
  }
</style>

<script>
  import { AppConfig } from "../../service/config.js";
  import { confim } from "../../pages/mine/js/write_messagebox.js";
  import upload from "./upload.js";
  import { checkFileUploadInfo } from "../../pages/mine/js/mineapi.js";
  export default {
    props: {
      title1: {
        type: String
      },
      title2: {
        type: String,
        default: "修改"
      },
      h3_1: {
        type: String
      },
      h3_2: {
        type: String
      },
      //img , mp3, mp3img,mp4,mp4img
      type: {
        type: String,
        default: "img"
      },
      url: {
        type: String
      }
    },
    data() {
      return {
        uploadheader: {
          token: this.$store.state.token
        },
        action: "",
        filesize: 0,
        percent: 0,

        progress_prev_time: 0, //上一次上传速度时的时间戳
        progress_prev_percent: 0, //上一次的上传进度
        progress_speed: 0, //上传速度
        progress_lefttime: 0, //剩余时间,

        loading: false,
        OSSFileName:"",
        partFileNums:[],
      };
    },
    mounted() {
      if (this.type == "img") {
        this.action = AppConfig.apiEndpoint + "/user-article/logoUpload.wl";
      } else if (this.type == "mp3img") {
        this.action = AppConfig.apiEndpoint + "/audio/logoUpload.wl";
      } else if (this.type == "mp3") {
        this.action = AppConfig.apiEndpoint + "/audio/uploadPartAudioFile.wl";
      } else if (this.type == "mp4img") {
        this.action = AppConfig.apiEndpoint + "/webUserVideo/videoLogoUpload.wl";
      } else if (this.type == "mp4") {
        this.action =
          AppConfig.apiEndpoint + "/webUserVideo/uploadPartFile.wl";
      }
    },
    methods: {
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
      on_success(response, file, fileList) {
        console.log("on_success");
        if (response.code == "000000") {
          if (
            this.type == "img" ||
            this.type == "mp3img" ||
            this.type == "mp4img"
          ) {
            this.$refs.card.style.backgroundImage = `url(${URL.createObjectURL(
              file.raw
            )})`;
            this.$emit("update:url", response.data.result);
          } else if (this.type == "mp4") {
            this.$emit("update:url", response.data.result);
          } else if (this.type == "mp3") {
            this.$emit("update:url", response.data.result);
          }
        } else {
          this.message({
            title: response.msg,
            type: "warning"
          });
        }
        this.resetprogress_data();
      },
      on_error() {
        console.log("on_error");
        this.message({
          title: "网络错误",
          type: "warning"
        });

        this.resetprogress_data();
      },
      on_before(file) {
        // return new Promise((res,rej)=>{
        //   setTimeout(() => {
        //     res(123)
        //   }, 5000);
        // })
        console.log("on_before");

        if (
          this.type == "img" ||
          this.type == "mp3img" ||
          this.type == "mp4img"
        ) {
          if (file.type.indexOf("image") == -1) {
            return this.message({
              title: "格式错误",
              type: "warning"
            });
          }
          if (file.size / 1024 > 200) {
            return this.message({
              title: "图片大小不能超过200kb",
              type: "warning"
            });
          }
        } else if (this.type == "mp3") {
          if (file.type.indexOf("mp3") == -1) {
            return this.message({
              title: "格式错误",
              type: "warning"
            });
          }
          if (file.size / 1024 / 1024 > 400) {
            return this.message({
              title: "音频大小不能超过400m",
              type: "warning"
            });
          }
        } else if (this.type == "mp4") {
          if (file.type.indexOf("mp4") == -1) {
            return this.message({
              title: "格式错误",
              type: "warning"
            });
          }
          if (file.size / 1024 / 1024 > 1536) {
            return this.message({
              title: "视频大小不能超过1.5g",
              type: "warning"
            });
          }
        }
        this.filesize = file.size / 1024 / 1024;
        this.loading = true;
        if(this.type=="mp4"||this.type=="mp3")
        return checkFileUploadInfo({
          orignalName:file.name,
          originalFileSize:file.size
        }).then(res=>{
          var {partFileNums,OSSFileName}=res;
          this.partFileNums=partFileNums;
          this.OSSFileName=OSSFileName;
        })
      },
      on_progress(event, file, fileList) {
        if (this.type == "mp4" || this.type == "mp3") {
          this.progress_speed = (
            (event.percent / 100 - this.progress_prev_percent / 100) *
            this.filesize /
            ((Date.now() - this.progress_prev_time) / 1000)
          ).toFixed(2);
          this.progress_lefttime = parseInt(
            (100 - event.percent) / 100 * this.filesize / this.progress_speed
          );
          this.progress_prev_time = Date.now();
          this.progress_prev_percent = event.percent;
          this.percent = (event.percent * 1).toFixed(2);
          this.$refs.line.style.backgroundSize = `${this.percent + "%"} 100%`;
          this.$refs.value.style.marginLeft = `${this.percent + "%"}`;
        }
      },
      cancel() {
        console.log("cancel", this.$refs.upload);
        confim(this.$confirm, "cancelupload").then(() => {
          this.$refs.upload.abort();
          this.resetprogress_data();
        });
      },
      resetprogress_data() {
        this.filesize = 0;
        this.percent = 0;
        this.progress_prev_time = 0;
        this.progress_prev_percent = 0;
        this.progress_speed = 0;
        this.progress_lefttime = 0;
        this.loading = false;
        this.$refs.line.style.backgroundSize = `${this.percent + "%"} 100%`;
        this.$refs.value.style.marginLeft = `${this.percent + "%"}`;
      },
       http_request(option) {
        upload(option,this.OSSFileName,this.partFileNums)
      }
    },
    watch: {
      url(value) {
        console.log("watch url", value);
        if (this.type.indexOf("img" >= 0) && this.url.indexOf("http") >= 0) {
          this.$refs.card.style.backgroundImage = `url(${value})`;
        }
      }
    }
  };
</script>

