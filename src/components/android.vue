<template>
  <div class="android-wrap">
    <div class="content">
      <div>
        <img src="../assets/img/android/logo.png" class="imgLogo">
      </div>
      <div class="icon">
        <img src="../assets/img/android/android_icon@3x.png">
        <span>XToken</span>
      </div>
      <div class="intro">
        <p>2.0.1 - 29.1MB</p>
        <p>更新于：2018-09-26  21:09:00</p>
      </div>
      <button class="down" @click="down">下载安装</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    down() {
      // window.open('http://api.xt.top/apk/xtoken_lastest.apk');
      // window.open('http://m.xt.top/apk/xtoken_lastest.apk');
      // window.open('http://m.xt.top/apk/xtoken_lastest.apk');
      // window.open('https://xtoken.oss-cn-hongkong.aliyuncs.com/xtoken/1040634045861462016.apk?Expires=1852301466&OSSAccessKeyId=LTAIlQ1L6DaY5Sdo&Signature=a2zku93pcSFmbtCq%2Bc8sW%2Fz1bYQ%3D');
      window.open('https://xtoken.oss-cn-hongkong.aliyuncs.com/xtoken/1044928903547715584.apk?Expires=1853325440&OSSAccessKeyId=LTAIlQ1L6DaY5Sdo&Signature=V2DHBPodxobbbKXWEaQkalHWrNo%3D');

    }
  }
}
</script>
<style lang="scss" scoped>
.android-wrap {
  font-family: PingFangSC-Regular;
  height: 100%;
  background: #ffffff;
  .content {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .imgLogo {
    // margin-top: 92px;
    width: 126px;
    height: 126px;
  }
  .icon {
    padding: 36px 0px 32px 0px;
    border-bottom: 1px solid #E6E6E6;
    & > img {
      width: 22px;
      height: 26px;
    }
    & > span {
      font-size: 24px;
      color: #505558;
      letter-spacing: -0.41px;
    }
  }
  .intro {
    margin: 27px 0px 37px 0px;
    font-size: 14px;
    color: #B9BDBC;
    letter-spacing: 0;
  }
  .down {
    padding: 12px 67px;
    font-size: 16px;
    color: #FFFFFF;
    text-align: left;
    background: #28B7A2;
    border-radius: 100px;
  }
}

</style>

