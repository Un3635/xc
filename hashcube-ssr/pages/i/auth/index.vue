<template>
  <div class="bind-authenticator">
    <h2 class="header">绑定谷歌验证器</h2>
    <div class="instructions">
      <p>谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。</p>
      <ul>
        <li>
          <header>
            <i class="number">1</i>
            <p>在手机上安装谷歌验证器(Google Authenticator)</p>
          </header>
          <div class="clearfix content">
            <div class="auth-img left">
              <div>
                <img src="../../../assets/images/google-auth.png" alt="">
              </div>
              <span>Authenticator</span>
            </div>
            <div class="left use-info">
              <div class="clearfix">
                <a href="https://itunes.apple.com/cn/app/id388497605?mt=8" target="_blank">
                  <div class="store-icon left">
                    <i class="icon-apple">
                      <svg width="15px" height="19px" viewBox="0 0 15 19" version="1.1"
                           xmlns="http://www.w3.org/2000/svg"
                           xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
                        <title>App Store</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="算立方1.0第一部分" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="11.9安全中心_Google验证" transform="translate(-664.000000, -404.000000)" fill="#FFFFFF">
                            <g id="Group" transform="translate(639.000000, 396.000000)">
                              <path
                                d="M35.2072775,10.9409601 C35.8499421,10.1621283 36.2829287,9.07837167 36.1658052,8 C35.239924,8.03811561 34.1180518,8.61540303 33.4535949,9.3942348 C32.8600123,10.0858691 32.3344431,11.1886975 32.4761356,12.2452488 C33.5081459,12.3269772 34.564613,11.7197077 35.2072775,10.9409601 M37.5273935,17.7867088 C37.5028526,15.4531023 39.4308462,14.3338664 39.5152109,14.2794276 C38.4342029,12.6973072 36.7485337,12.4793835 36.1467334,12.4522062 C34.7117466,12.3079334 33.3474097,13.296359 32.6204084,13.296359 C31.8933791,13.296359 30.7713666,12.4740266 29.5815088,12.4957068 C28.0184323,12.5202477 26.5779763,13.4052647 25.771855,14.8048565 C24.1462341,17.6259725 25.3551917,21.8032078 26.9400326,24.0879007 C27.7134232,25.2070524 28.6365558,26.4623714 29.8483742,26.4188708 C31.013719,26.3725375 31.4548953,25.6645519 32.8654814,25.6645519 C34.2760394,25.6645519 34.6708824,26.4188708 35.9071295,26.3970784 C37.1624485,26.3725375 37.9576315,25.2560221 38.725497,24.1341499 C39.6132626,22.8352181 39.9809282,21.5771786 40,21.5172426 C39.9727105,21.5009193 37.5519345,20.5751503 37.5273935,17.7867088"
                                id="App-Store"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </i>
                    IOS下载
                  </div>
                </a>
                <el-button type="text" class="left" @click="goGuide('ios')">使用说明
                </el-button>
              </div>
              <div class="clearfix">
                <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.google.android.apps.authenticator2"
                   target="_blank">
                  <div class="store-icon left">
                    <i class="icon-google">
                      <svg width="16px" height="20px" viewBox="0 0 16 20" version="1.1"
                           xmlns="http://www.w3.org/2000/svg"
                           xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
                        <title>Android</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="算立方1.0第一部分" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="11.13安全中心_Google验证" transform="translate(-657.000000, -459.000000)" fill="#FFFFFF">
                            <g id="Page-1" transform="translate(657.000000, 459.000000)">
                              <g id="Group-7">
                                <path
                                  d="M10.0000169,4.16744297 C9.7790896,4.16744297 9.60000541,3.98096023 9.60000541,3.75090569 L9.60000541,3.75068037 C9.60000541,3.52062583 9.7790896,3.33414309 10.0000169,3.33414309 C10.2209442,3.33414309 10.4000284,3.52062583 10.4000284,3.75068037 L10.4000284,3.75090569 C10.4000284,3.98096023 10.2209442,4.16744297 10.0000169,4.16744297 Z M5.9999831,4.16744297 C5.77905579,4.16744297 5.5999716,3.98096023 5.5999716,3.75090569 L5.5999716,3.75068037 C5.5999716,3.52062583 5.77905579,3.33414309 5.9999831,3.33414309 C6.2209104,3.33414309 6.39999459,3.52062583 6.39999459,3.75068037 L6.39999459,3.75090569 C6.39999459,3.98096023 6.2209104,4.16744297 5.9999831,4.16744297 Z M10.8239232,1.80090622 L11.8680265,0.713470428 C12.0239577,0.550956389 12.0239577,0.288568039 11.8680265,0.126054 C11.7119601,-0.0364318733 11.4599818,-0.0364318733 11.3040235,0.126054 L10.1199473,1.35510514 C9.4799668,1.0259086 8.76395461,0.834271591 7.99995943,0.834271591 C7.23193411,0.834271591 6.51199997,1.0259086 5.86801636,1.35927362 L4.68004524,0.121885529 C4.52397881,-0.0406285097 4.27200051,-0.0406285097 4.11593409,0.121885529 C3.95997586,0.284371402 3.95997586,0.546787918 4.11593409,0.709273792 L5.16393229,1.80090622 C3.97593412,2.71340706 3.20001082,4.18000472 3.20001082,5.83404275 L12.8000162,5.83404275 C12.8000162,4.17580808 12.0199546,2.70923859 10.8239232,1.80090622 Z M14.7999655,6.66734263 C14.1360205,6.66734263 13.599931,7.22569243 13.599931,7.91729247 L13.599931,13.7503917 C13.599931,14.4419635 14.1360205,15.0003415 14.7999655,15.0003415 C15.4639105,15.0003415 16,14.4419635 16,13.7503917 L16,7.91729247 C16,7.22569243 15.4639105,6.66734263 14.7999655,6.66734263 Z M1.20003449,6.66734263 C0.536008371,6.66734263 0,7.22569243 0,7.91729247 L0,13.7503917 C0,14.4419635 0.536008371,15.0003415 1.20003449,15.0003415 C1.86397946,15.0003415 2.39998783,14.4419635 2.39998783,13.7503917 L2.39998783,7.91729247 C2.39998783,7.22569243 1.86397946,6.66734263 1.20003449,6.66734263 Z M3.20001082,15.0003415 C3.20001082,15.4585635 3.55996436,15.8336132 4.00003381,15.8336132 L4.79994861,15.8336132 L4.79994861,18.7500502 C4.79994861,19.4417629 5.33595698,20 5.9999831,20 C6.66392807,20 7.19993644,19.4417629 7.19993644,18.7500502 L7.19993644,15.8335287 L8.79998242,15.8335287 L8.79998242,18.7500502 C8.79998242,19.4416502 9.33596374,20 10.0000169,20 C10.6639619,20 11.1999432,19.4416502 11.1999432,18.7500502 L11.1999432,15.8335287 L11.9999662,15.8335287 C12.4399274,15.8335287 12.8000162,15.4585635 12.8000162,15.0002288 L12.8000162,6.66734263 L3.20001082,6.66734263 L3.20001082,15.0003415 Z"
                                  id="Android"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </i>
                    安卓下载
                  </div>
                </a>
                <el-button type="text" class="left" @click="goGuide('android')">使用说明
                </el-button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <header>
            <i class="number">2</i>
            <p>使用谷歌验证器扫描下方二维码</p>
          </header>
          <div class="content auth-qrcode">
            <img :src="qrCodeUrl" v-if="qrCodeUrl">
            <div class="reload" v-else>
              <div>
                <!--<svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
                <!--&lt;!&ndash; Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch &ndash;&gt;-->
                <!--<title>refresh</title>-->
                <!--<desc>Created with Sketch.</desc>-->
                <!--<defs></defs>-->
                <!--<g id="算立方1.0第一部分" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
                <!--<g id="11.13安全中心_Google验证" transform="translate(-527.000000, -704.000000)">-->
                <!--<g id="refresh" transform="translate(527.000000, 704.000000)">-->
                <!--<circle id="Oval-4" fill="#FFFFFF" cx="22" cy="22" r="22"></circle>-->
                <!--<path d="M21.7538757,14.7218781 C17.7256628,14.851755 14.5,18.1581384 14.5,22.2179159 C14.5,26.3600515 17.8578644,29.7179159 22,29.7179159 C26.1421356,29.7179159 29.5,26.3600515 29.5,22.2179159 L32,22.2179159 C32,27.7407634 27.5228475,32.2179159 22,32.2179159 C16.4771525,32.2179159 12,27.7407634 12,22.2179159 C12,16.7773456 16.3447483,12.3515458 21.7538757,12.2208855 L21.7538757,10 L27.9596252,13.4476386 L21.7538757,16.8952772 L21.7538757,14.7218781 Z" id="Combined-Shape" fill="#606166" fill-rule="nonzero"></path>-->
                <!--</g>-->
                <!--</g>-->
                <!--</g>-->
                <!--</svg>-->
                <!--<p>二维码已失效，点击刷新</p>-->
                <svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                  <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
                  <title>cuowu</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="算立方1.0第一部分" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="11.13安全中心_Google验证" transform="translate(-527.000000, -686.000000)">
                      <g id="Group-6" transform="translate(454.000000, 646.000000)">
                        <g id="cuowu" transform="translate(73.000000, 40.000000)">
                          <circle id="Oval-4" fill="#CCCDCF" cx="22" cy="22" r="22"></circle>
                          <path
                            d="M22,33 C20.7849736,33 19.8,32.0150264 19.8,30.8 C19.8,29.5849736 20.7849736,28.6 22,28.6 C23.2150264,28.6 24.2,29.5849736 24.2,30.8 C24.2,32.0150264 23.2150264,33 22,33 Z M20.8739763,11 L23.1260237,11 C23.6783084,11 24.1260237,11.4477153 24.1260237,12 C24.1260237,12.0237717 24.125176,12.0475358 24.1234824,12.071247 L23.1663395,25.471247 C23.1289605,25.9945525 22.6935195,26.4 22.1688808,26.4 L21.8311192,26.4 C21.3064805,26.4 20.8710395,25.9945525 20.8336605,25.471247 L19.8765176,12.071247 C19.837169,11.5203658 20.2518481,11.04189 20.8027293,11.0025413 C20.8264406,11.0008476 20.8502047,11 20.8739763,11 Z"
                            id="Combined-Shape" fill="#EDEEF0"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <p class="fail">二维码加载失败，重新加载</p>
                <button @click="initPage">重新加载</button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <header>
            <i class="number">3</i>
            <p>请把下方的秘钥保存到一个安全的地方</p>
          </header>
          <div class="content">
            <div class="secret-key">
              <span class="key">&nbsp;{{secretKey}}&nbsp;</span>
              <el-button type="text" v-clipboard:copy="secretKey" v-clipboard:success="onCopy"
                         :disabled="this.secretKey ==''">复制
              </el-button>
              <el-button type="text" @click="save" :disabled="this.secretKey ==''">保存到本地</el-button>
            </div>
            <p class="tip">如果您需要重置谷歌验证码(如手机丢失、被盗、或更换)却未保存此秘钥，重置流程至少需要<strong>7个工作日。</strong></p>
          </div>
        </li>
        <li>
          <header>
            <i class="number">4</i>
            <p>在下面输入您谷歌验证器中显示的6位数字验证码：</p>
          </header>
          <div class="content clearfix">
            <input maxlength="6" v-model="authCode" class="left auth-code" type="text" placeholder="000000">
            <el-button @click="bindGoogleAuth" :disabled="authCode.length != 6" class="bind-btn left" type="primary"
                       :loading="loading">绑定
            </el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcode';
  import SaveAs from '../../../plugins/fileSaver';
  import UserAPI from '../../../services/user-api';
  import {UPDATE_USER_INFO} from "../../../store/action-types";

  export default {
    breadcrumb() {
      return {
        label: '绑定谷歌验证器',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          },
          {
            path: '/i/safety',
            label: '安全中心'
          }
        ]
      };
    },
    data() {
      return {
        secretKey: '',
        qrCodeUrl: '',
        authCode: '',
        loading: false,
        timer: '',
        isStop: false
      };
    },
    created() {
      this.initPage();
      this.returnTop();
    },
    computed: {},
    watch: {
      authCode(newVal, oldVal) {
        if (newVal == '') return;
        let regx = /^\d+$/g;
        if (!regx.test(newVal)) {
          this.authCode = oldVal;
        }
      }
    },
    methods: {
      stopScrollAnimate() {
        if (!this.isStop) {
          clearInterval(this.timer);
          window.removeEventListener('scroll', this.stopScrollAnimate);
        }
        this.isStop = false;
      },
      returnTop() {
        var vm = this;
        this.timer = setInterval(function () {
          window.addEventListener('scroll', vm.stopScrollAnimate);
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 7);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop == 0) {
            clearInterval(vm.timer);
          }
          vm.isStop = true;
        }, 1);
      },
      initPage() {
        UserAPI.googleAuth()
          .then(res => res || {})
          .then(res => {
            let result = JSON.parse(res.result);
            this.secretKey = result.secret;
            return QRCode.toDataURL(result.qrBarcode);
          })
          .then(url => this.qrCodeUrl = url)
          .catch();
      },
      save() {
        let blob = new Blob([this.secretKey], {type: "text/plain;charset=utf-8"});
        SaveAs(blob, "secret-key.txt");
      },
      onCopy() {
        this.$message({
          title: "成功",
          message: "复制成功",
          type: "success"
        });
      },
      bindGoogleAuth() {
        this.loading = true;
        UserAPI.bindGoogleAuth({secret: this.secretKey, code: this.authCode})
          .then(() => {
            this.loading = false;
            this.$message({
              title: "成功",
              message: "绑定成功",
              type: "success"
            });
            this.$store.dispatch(UPDATE_USER_INFO);
            this.$router.go(-1);
          })
          .catch(error => {
            this.loading = false;
            this.$message({
              type: 'error',
              message: error.msg,
              showClose: true
            });
          });
      },
      goGuide(platform) {
        let url = window.location.origin + this.$router.resolve(platform, null, true).href;
        window.open(url);
      }
    }
  };
</script>
<style lang="scss" scoped>
  $border-color: #f5f5f7;
  @mixin square($long) {
    width: $long;
    height: $long;
  }

  .header {
    line-height: 64px;
    border-bottom: 1px solid $border-color;
    font-size: 24px;
    color: #303137;
    padding-left: 30px;
  }

  .instructions {
    padding: 0 60px;
    .auth-qrcode {
      width: 164px;
      height: 164px;
      position: relative;
      background: #edeef0;
      img {
        max-width: 100%;
      }
      .reload {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: center;
        div {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }
        p.fail {
          font-size: 12px;
          color: #cccdcf;
          margin: 12px 0;
        }
        button {
          font-size: 12px;
          border: 1px solid #cccdcf;
          border-radius: 2px;
          background: none;
          color: #cccdcf;
          line-height: 20px;
          &:active {
            color: #fff;
            background: #cccdcf;
          }
        }
      }
    }
    > p {
      font-size: 14px;
      color: #303137;
      letter-spacing: 0.78px;
      line-height: 20px;
      padding: 30px 0;
      border-bottom: 1px solid $border-color;
    }
    li {
      padding: 30px 0;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
        padding-bottom: 50px;
      }
      .auth-img {
        margin-right: 55px;
        > div img {
          @include square(130px);
          margin-bottom: 10px;
        }
        span {
          display: block;
          text-align: center;
          color: #606166;
          letter-spacing: 0.78px;
          opacity: 0.9;
        }
      }
      .use-info {
        > div {
          margin-top: 20px;
        }
        .store-icon {
          cursor: pointer;
          padding-left: 25px;
          margin-right: 8px;
          width: 147px;
          height: 35px;
          line-height: 35px;
          background: #4D87EA;
          color: #fff;
          border-radius: 2px;
          letter-spacing: 0.58px;
          i {
            display: inline-block;
            margin-right: 10px;
            position: relative;
            top: 3px;
          }
        }
        button {
          padding: 0;
          line-height: 35px;
          height: 35px;
          font-weight: bold;
        }
      }
      header {
        padding-bottom: 30px;
        p {
          font-size: 14px;
          color: #303137;
          letter-spacing: 0.78px;
          display: inline-block;
          font-weight: bold;
        }
        i {
          @include square(20px);
          text-align: center;
          font-style: normal;
          display: inline-block;
          margin-right: 15px;
          line-height: 20px;
          border-radius: 50%;
          background: #606166;
          color: #FFF;
        }
      }
      .secret-key {
        margin-bottom: 30px;
        button {
          font-size: 20px;
          letter-spacing: 1.5px;
          font-weight: bold;
        }
        .key {
          min-width: 250px;
          font-weight: bold;
          padding: 0 20px;
          display: inline-block;
          background: #EDEEF0;
          border-radius: 2px;
          height: 54px;
          line-height: 54px;
          font-size: 20px;
          color: #303137;
          letter-spacing: 0.13px;
        }
      }
      .tip {
        color: #303137;
        letter-spacing: 0.58px;
        strong {
          color: #e06165;
          font-weight: normal;
        }
      }
      .auth-code {
        margin-right: 18px;
        padding: 0 30px;
        width: 192px;
        height: 68px;
        line-height: 64px;
        border: 2px solid #DEDEE0;
        border-radius: 4px;
        background-color: #F8F8F8;
        color: #999;
        font-size: 38px;
        &::-webkit-input-placeholder {
          color: #DEDEE0;
        }
      }
      .bind-btn {
        width: 100px;
        height: 68px;
        padding: 0;
        line-height: 64px;
        color: #fff;
        background: #4D87EA;
        font-size: 20px;
        letter-spacing: 1px;
        border: 2px solid #fff;
        border-radius: 2px;
        transition: all 0.5s;
        &:active {
          background: #4375CC;
        }
        &:disabled {
          background: #ccc;
        }
      }
    }
  }

</style>
