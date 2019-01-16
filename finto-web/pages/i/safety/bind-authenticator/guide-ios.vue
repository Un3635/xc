<template>
  <div class="guide-ios">
    <h1>iosユーザのgoogle認証の説明について</h1>
    <h2>Google認証システムをインストールする（Google Authenticator）</h2>
    <section class="download">
      <p>1.アップストアを開く</p>
      <p>2.検索ボックスにGoogle Authenticatorを入力する</p>
      <p>3.Google Authenticatorが出る</p>
      <p>4.「入手」をクリックする</p>
      <img class="app-store" src="../../../../assets/images/app-store.png" alt="App Store">
      <img class="search" src="../../../../assets/images/ios_app-store.png" alt="搜索Google Authenticator">
    </section>
    <h2>Google Authenticatorを設定する</h2>
    <section class="setting">
      <div>
        <img src="../../../../assets/images/ios__begin.png" alt="开始设置">
        <p>5、ダウンロードしてからアプリを開いて、「設定を開始」クリックする</p>
      </div>
      <div class="setting-right">
        <img src="../../../../assets/images/ios_saoma.png" alt="扫描条形码">
        <p>6、「バーコードをスキャン」を選ぶ</p>
      </div>
    </section>
    <h2>Google認証システムを登録する</h2>
    <section class="binding">
      <p>7、「コードをスキャン」を選び、FinToのページ上のQRコードをスキャンする。</p>
      <img class="code box-shadow" src="../../../../assets/images/common_google-authentication.png" alt="扫描二维码，复制密钥">
      <p>8、スキャンした後、６桁の数字が現れる</p>
      <p style="max-width: 410px">９、数字を2階段認証の登録ページに入力し、Google Authenticatorの登録が完了する</p>
      <img class="box-shadow inputcode" src="../../../../assets/images/common_input.png" alt="输入验证码">
      <img class="identify" src="../../../../assets/images/ios_identifying-code.png" alt="绑定成功">
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
            label: 'my Finto'
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
      width: 800px;
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
