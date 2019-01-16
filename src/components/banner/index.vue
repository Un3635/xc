<template>
  <div>
    交互
  </div>
</template>
<script>
export default {
  name: "banner",
  methods: {
    vod() {
      try {
        // 直接调用 android 本地方法
        window.android.back();

        // 发送消息
        // window.APPmai.get_id(r);
      }catch(e) {
      }

      try {
        // 直接调用 ios 本地方法
        window.webkit.messageHandlers.call.postMessage(_json);
        // 发送消息
        // window.webkit.messageHandlers.APPmodel.postMessage({body:'shareAction'});
      }catch(e) {
      }
    },
    show(json) {
      let data = JSON.parse(json);
      // 中文需要解码
      // decodeURIComponent
    }
  },
  created() {

  //  var u = navigator.userAgent; //获取用户设备
  //  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  //   var _json = {
  //     callname: "XCAnswerCenterController",
  //     callid: "2018",
  //     calldata: "calldata:{'callname': 'XCAnswerCenterController'}"
  //   };
  //   try {
  //     window.webkit.messageHandlers.call.postMessage(_json);
  //   } catch (e) {}
  },
  mounted() {
    window.show = this.show;
  }
};
</script>
<style lang="scss" scoped>
</style>


