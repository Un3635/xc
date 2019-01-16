<template>
  <div class="guide-android">
    <h1>Android系统用户使用谷歌两步验证指南</h1>
    <h2>下载谷歌验证器“Google Authentication”</h2>
    <section class="download">
      <p>1.手机内下载安装好应用宝。 App Store 。</p>
      <p>2.打开应用宝，在搜索框中输入“谷歌动态口令”。</p>
      <p>3.点击下载。</p>
      <img class="app-store" src="../../../assets/images/my-app.png" alt="App Store">
      <img class="search" src="../../../assets/images/android_my-app.png" alt="搜索Google Authenticator">
    </section>
    <h2>设定谷歌验证器“谷歌动态口令”</h2>
    <section class="setting">
      <div>
        <img src="../../../assets/images/android_begin.png" alt="开始设置">
        <p>4.下载完成后打开，点击”开始”。</p>
      </div>
      <div class="setting-right">
        <img src="../../../assets/images/android_saoma.png" alt="扫描条形码">
        <p>5.选择使用扫描条形码。</p>
      </div>
    </section>
    <h2>绑定谷歌验证器</h2>
    <section class="binding">
      <p>6.点击扫描条形码，对“算立方”页面上的二维码进行扫描。</p>
      <img class="code" src="../../../assets/images/common_Google Authentication.png" alt="扫描二维码，复制密钥">
      <!--<img class="code" src="../../../assets/images/common_google-authentication.png" alt="扫描二维码，复制密钥">-->
      <div class="tip">
        <span class="tip-content">提示：部分安卓手扫描功能暂不能用，大家可以先使用手动输入的方式进行验证，在 算立方 绑定谷歌验证的页面，找到验证密钥，如下图；在账户名称中输入你的算立方账号（你的手机号或邮箱），在你的密钥中输入找到的密钥。</span>
        <img class="miyao" src="../../../assets/images/common_miyao.png" alt="密钥">
        <img class="input-detail" src="../../../assets/images/android_secret.png" alt="输入账户详细资料">
      </div>
      <p>7.扫描后，会自动出现一组 6 位的数字。</p>
      <p>8.将此数字填入二次验证注册页面，即可完成绑定流程。</p>
      <img class="inputcode" src="../../../assets/images/common_input.png" alt="输入验证码">
      <img class="identify" src="../../../assets/images/android_identifying-code.png" alt="绑定成功">
    </section>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .guide-android {
    width: 970px;
    height: 3366px;
    padding-left: 60px;
    padding-top: 70px;
    color: #303137;

    p {
      margin-bottom: 30px;
      font-size: 16px;
      color: #303137;
      letter-spacing: 0.3px;
      text-align: left;
      line-height: 24px;
    }
  }

  h1 {
    font-size: 38px;
    line-height: 48px;
  }

  h2  {
    font-size: 26px;
    line-height: 48px;
    margin-top: 90px;
  }

  section {
    position: relative;
  }

  .download {
    margin-top: 46px;

    .app-store {
      margin-top: 10px;
    }

    .search {
      width: 332px;
      height: 370px;
      position: absolute;
      right: 92px;
      bottom: 0;
    }
  }

  .setting {
    margin-top: 40px;

    .setting-right {
      position: absolute;
      right: 83px;
      top: 0;
    }

    p {
      margin-top: 30px;
    }
  }

  .binding {
    margin-top: 60px;

    .code {
      width: 801px;
      height: 503px;
    }

    .tip {
      height: 371px;
      margin-top: 60px;
      margin-bottom: 105px;
      position: relative;

      .tip-content {
        width: 410px;
        height: 72px;
        font-size: 16px;
        color: #A99067;
        letter-spacing: 0.3px;
        text-align: justify;
        line-height: 24px;
        position: absolute;
        left: 0;
        top: 92px;
      }

      .miyao {
        position: absolute;
        left: 0;
        bottom: 0;
      }

      .input-detail {
        width: 344px;
        height: 371px;
        position: absolute;
        right: 87px;
        top: 0;
      }
    }

    .inputcode {
      width: 410px;
      height: 193px;
      margin-top: 55px;
    }

    .identify {
      width: 332px;
      height: 370px;
      position: absolute;
      right: 94px;
      bottom: 0;
    }
  }
</style>
