<template>
    <div>
         <testupload :title1="'点击上传视频'" :h3_1="'建议大小：不超过1.5G'" :h3_2="'支持格式：mp4'" :url.sync="video.fileurl" :type="'mp4'" />
    </div>

</template>

<script>
import testupload from "../components/mine/testupload";
    export default {
      data(){
          return{
              video:{
                  fileurl:''
              }
          }
      },
      components:{testupload},
      methods: {}
    };
</script>

