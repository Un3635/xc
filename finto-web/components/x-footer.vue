<template>
  <div class="footer">
    <div class="footer__inner">
      <el-row>
        <el-col :span="8">
          <img class="footer-logo" src="../assets/images/fintocube_45.png" alt="">
          <p>フィント株式会社</p>
          <p>所在地：東京都千代田区丸の内1-11-1 <span style="display:block">パシフィックセンチュリープレイス丸の内8F</span></p>
          <p><a href="http://www.finto.co.jp" target="_blank">Web:http://www.finto.co.jp</a></p>
        </el-col>
        <el-col :span="6">
          <p class="rightBox1">各種ポリシーなど</p>
          <a class="rightBox1 hrefBox" href="http://www.finto.co.jp/protocol.html" target="_blank">個人情報保護方針</a>
          <p class="rightBox1">
            <nuxt-link to="/rules/business" target="_blank">特定商取引法に基づく表記</nuxt-link>
          </p>
        </el-col>
        <el-col :span="6">
          <p class="rightBox2">各種規約</p>
          <p class="rightBox2">
            <nuxt-link to="/cart/presale-productcontract" target="_blank">マイニング規約</nuxt-link>
          </p>
          <p class="rightBox2">
            <nuxt-link to="/cart/presale-hashcontract" target="_blank">クラウドマイニング利用規約</nuxt-link>
          </p>
          <p class="rightBox2">
            <nuxt-link to="/rules/register" target="_blank">アカウント規約</nuxt-link>
          </p>
        </el-col>
        <el-col :span="4">
          <p class="rightBox3">SNS</p>
          <p class="rightBox3">
            <a href="https://www.facebook.com/homepage.finto.japan/" target="_blank">
              <img src="../assets/images/footer/facebook@2x.png" alt="Facebook" class="imgFacebook">
              Facebook
            </a>
          </p>
          <p class="rightBox3">
            <a href="https://twitter.com/JapanFinto" target="_blank">
              <img src="../assets/images/footer/twiter@2x.png" alt="Twitter" class="imgTwitter">
              Twitter
            </a>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-footer',
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">

  .footer {
    height: 263px;
    background-color: #102243;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .footer__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    position: relative;
    top: -3px;
    width: 160px;
    margin-left: -25px;
  }

  // img {
  //   vertical-align: top;
  // }

  p {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.34px;
    color: #858E9B;
    margin-bottom: 20px;

    &:nth-of-type(1) {
      margin-top: 8px;
      font-weight: bolder;
      color: #D1D3D7;
    }
  }

  .hrefBox {
    display: block;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.34px;
    color: #858E9B;
    margin-bottom: 20px;
  }

  .rightBox1 {
    padding-left: 40px;
  }

  .rightBox2 {
    padding-left: 80px;
  }

  .rightBox3 {
    padding-left: 80px;
  }

  .footer-logo + p {
    margin-top: 13px;
  }

  .link {
    font-size: 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);

    &:hover,
    &:focus {
      color: #fff;
    }
  }

  .service {
    margin-top: 3px;
    font-size: 30px;
    color: #fff;
    line-height: 40px;
  }

  h5 {
    color: #fff;
    font-size: 14px;
    line-height: 24px;
  }

  .download-img {
    margin-top: 12px;
    width: 80px;
    height: 80px;
    img {
      object-fit: cover;
    }
  }

  .friend-link {
    .link + .link:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      vertical-align: -1px;
      margin-left: 5px;
      margin-right: 6px;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  .imgFacebook, .imgTwitter {
    width: 14px;
    height: 14px;
    vertical-align: text-bottom;
    margin-right: 8px;
  }
</style>
