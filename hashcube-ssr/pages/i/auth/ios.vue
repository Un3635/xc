<template>
  <div class="guide-ios">
    <h1>iOS系统用户使用谷歌两步验证指南</h1>
    <h2>下载谷歌验证器“Google Authentication”</h2>
    <section class="download">
      <p>1.打开苹果手机中的 App Store 。</p>
      <p>2.在搜索框输入“Google Authentication”。</p>
      <p>3.会搜索到 Google Authenticator 。</p>
      <p>4.点击获取。</p>
      <img class="app-store" src="../../../assets/images/app-store.png" alt="App Store">
      <img class="search" src="../../../assets/images/ios_app-store.png" alt="搜索Google Authenticator">
    </section>
    <h2>设定谷歌验证器“Google Authentication”</h2>
    <section class="setting">
      <div>
        <img src="../../../assets/images/ios__begin.png" alt="开始设置">
        <p>5.下载完成后打开，点击下面的”开始设定”。</p>
      </div>
      <div class="setting-right">
        <img src="../../../assets/images/ios_saoma.png" alt="扫描条形码">
        <p>6.选择使用扫描条形码。</p>
      </div>
    </section>
    <h2>绑定谷歌验证器</h2>
    <section class="binding">
      <p>7.点击扫描条形码，对“算立方”页面上的二维码进行扫描。</p>
      <img class="code" src="../../../assets/images/common_google-authentication.png" alt="扫描二维码，复制密钥">
      <p>8.扫描后，会自动出现一组 6 位的数字。</p>
      <p>9.将此数字填入二次验证注册页面，即可完成绑定流程。</p>
      <img class="inputcode" src="../../../assets/images/common_input.png" alt="输入验证码">
      <img class="identify" src="../../../assets/images/ios_identifying-code.png" alt="绑定成功">
    </section>
  </div>
</template>

<script>
  export default {
    breadcrumb() {
      return {
        label: 'ios绑定指南',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          },
          {
            path: '/i/safety',
            label: '安全中心'
          },
          {
            path: '/i/auth',
            label: '绑定谷歌验证器'
          }
        ]
      };
    }
  };
</script>

<style scoped lang="scss">
  .guide-ios {
    width: 970px;
    height: 2918px;
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

  h2 {
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
      left: 418px;
      top: 0;

      img {
        margin-left: 48px;
      }
    }

    p {
      margin-top: 30px;
    }
  }

  .binding {
    margin-top: 60px;

    .code {
      margin-bottom: 88px;
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
