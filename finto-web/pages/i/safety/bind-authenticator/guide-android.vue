<template>
  <div class="guide-android">
    <h1>Androidユーザのgoogle認証の説明について</h1>
    <h2>Google認証システムをインストールする（Google Authenticator）</h2>
    <section class="download">
      <p>1.Google playアプリをインストールする</p>
      <p>2.Google playを開き、検索ボックスで「Google Authenticator」を入力する</p>
      <p>3.アプリをインストールする</p>
      <img class="app-store" src="../../../../assets/images/my-app.png" alt="App Store">
      <img class="search" src="../../../../assets/images/android_my-app.png" alt="搜索Google Authenticator">
    </section>
    <h2>Google Authenticatorを設定する</h2>
    <section class="setting">
      <div>
        <img src="../../../../assets/images/android_begin.png" alt="开始设置">
        <p>4、ダウンロードしてからアプリを開いて、「設定を開始」クリックする</p>
      </div>
      <div class="setting-right">
        <img src="../../../../assets/images/android_saoma.png" alt="扫描条形码">
        <p>5、「バーコードをスキャン」を選ぶ</p>
      </div>
    </section>
    <h2>Google認証システムを登録する</h2>
    <section class="binding">
      <p>6、「コードをスキャン」を選び、FinToのページ上のQRコードをスキャンする。</p>
      <img class="code box-shadow" src="../../../../assets/images/common_google-authentication.png" alt="扫描二维码，复制密钥">
      <!--<img class="code" src="../../../assets/images/common_google-authentication.png" alt="扫描二维码，复制密钥">-->
      <div class="tip">
        <span class="tip-content">注：一部のandriod携帯ユーザはスキャンできない場合、手動で入力するのを選択してください。FinToのGoogle認証ページで秘密鍵を見つけ（下図のように）、アカウント名に「FinTo」を入力し、「提供されたキー」に見つけた秘密鍵を入力してください。</span>
        <img class="miyao box-shadow" src="../../../../assets/images/common_miyao.png" alt="密钥">
        <img class="input-detail" src="../../../../assets/images/android_secret.png" alt="输入账户详细资料">
      </div>
      <p>7、スキャンした後、６桁の数字が現れる</p>
      <p>8、数字を2階段認証の登録ページに入力し、Google Authenticatorの登録が完了する</p>
      <img class="inputcode box-shadow" src="../../../../assets/images/common_input.png" alt="输入验证码">
      <img class="identify" src="../../../../assets/images/android_identifying-code.png" alt="绑定成功">
    </section>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'GoogleAuthenticatorを登録する_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    breadcrumb() {
      return {
        label: 'GoogleAuthenticatorを登録する',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          },
          {
            path: '/i/safety',
            label: '設定'
          },
          {
            path: '/i/safety/bind-authenticator',
            label: 'Google認証'
          }
        ]
      };
    }
  }
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
    .download p{
      max-width: 432px;
    }
    .setting p{
      max-width: 352px;
    }
    .tip ~ p{
      max-width: 376px;
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
      width: 132px;
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
      width: 800px;
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
        width: 409px;
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
  .box-shadow{
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }
</style>
