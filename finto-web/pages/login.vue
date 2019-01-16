<template>
  <div class="page">
    <div class="page-container" @keyup.enter="!isLoginDisable&&login()">
      <figure>
        <img class="figure-img" src="../assets/images/login/login-bg.png">
        <figcaption>
          <form>
            <h2 class="text-left">FinToへようこそ</h2>
            <div class="input-group">
              <el-input placeholder="メールアドレスまたは携帯電話番号" name="account" v-model="loginInfo.account"
                        v-validate="'required|account'" @focus="errors.remove('account')"
                        v-bind:class="{'is-danger': errors.has('account')}"/>
              <p class="error" v-if="errors.has('account')">
                {{errors.first('account')}}</p>
            </div>
            <div class="input-group">
              <el-input type="password" placeholder="8-18桁半角英数字" name="password"
                        v-model="loginInfo.password" v-validate="'required|password'"
                        @focus="errors.remove('password')" v-bind:class="{'is-danger': errors.has('password')}"/>
              <p class="error" v-if="errors.has('password')">{{errors.first('password')}}</p>
            </div>
            <el-button type="primary" class="btn-login" @click="login" :disabled="isLoginDisable">
              ログイン
            </el-button>
            <el-row class="extra">
              <el-col :span="12" class="text-left">
                <nuxt-link to="/join">新規登録</nuxt-link>
              </el-col>
              <el-col :span="12" class="text-right">
                <nuxt-link to="/reset-pwd">パスワードを忘れた場合</nuxt-link>
              </el-col>
            </el-row>
          </form>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  import {toPromise} from '../services/utils';
  import errorHandler from '../services/error-handler';
  import {LOGIN_IN} from '../store/mutation-types';
  import SignAPI from '../services/sign-api';
  import AccountAPI from '../services/account-api';

  export default {
    head() {
      return {
        title: 'ログイン_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'FinTo,クラウドマイニング賃貸プラットフォーム,Bitfily  Miner公式サイト,マイニング機器販売,マイニング機器委託、マイニングファーム'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'FinToは低コストと高ハッシュのマイニング機器委託、販売、クラウドマイニング賃貸を提供する。安全で安定したマイニングファームの保守管理で仮想通貨の愛用者に機械委託の便利を提供する。ワンストップ仮想通貨マイニング委託の最良の選択。'
          }
        ]
      };
    },
    layout: 'full',
    computed: {
      isLoginDisable() {
        return !this.loginInfo.account || !this.loginInfo.password;
      }
    },
    data() {
      return {
        redirectUrl: '',
        billAmount: '',
        loginInfo: {
          account: '',
          password: ''
        }
      };
    },
    methods: {
      login() {
        const {account, password} = this.loginInfo;
        this.$validator.validateAll()
          .then(toPromise)
          .then(() => SignAPI.pwdLogin(account, password))
          .then((res) => {
            this.loginSuccessHandler(res);
          })
          .catch(this.errorHandler);
      },
      loginSuccessHandler(res) {
        this.$store.commit(LOGIN_IN, res);
        this.$message({
          type: 'success',
          duration: 1000,
          message: 'ログインに成功しました'
        });
        if (this.redirectUrl === this.$route.path) {
          this.$router.replace('/');
        } else {
          this.$router.replace(this.redirectUrl || '/');
        }
        AccountAPI.userAccountInfo()
          .then(res => {
            this.billAmount = res.totalMoney || 0;
            if (this.billAmount > 0 && !res.notifyStatus) {
              this.showBillAmountWarning();
            }
          })
      },
      showBillAmountWarning() {
        const html = `
          <div class="tip-info">
            <p style="font-size: 14px;color: #303137;padding-bottom: 20px;">残高はー${this.billAmount}円となりますのでお引き出しは承りかねます。まずはリチャージしてください！</p>
            <span style="height:1px;background:#F5F5F7;display:block;"></span>
          </div>
        `;
        this.$confirm(html, '', {
          dangerouslyUseHTMLString: true,
          cancelButtonText: '後で',
          confirmButtonText: 'お支払へ',
          closeOnClickModal: true
        })
          .then(() => {
            this.$router.push('/i/account/bill/detail');
          })
          .catch(() => {
          });
      },
      errorHandler(err) {
        if (!err) {
          return;
        }
        if (err.code === '200006') {
          return this.$message.warning(err.msg);
        }
        if (err.code === '000006') {
          return this.$message.warning('検証コードを再取得して下さい');
        }
        errorHandler(err);
      }
    },
    mounted() {
      // 登录完成的跳转地址
      this.redirectUrl = this.$route.query.redirectUrl;
    }
  };
</script>

<style scoped lang="scss">
  .page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(../assets/images/login/bg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }

  .page-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 720px;
    height: 372px;
    margin: auto;
  }

  figure {
    background: #fff;
    padding: 0;
    margin: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .figure-img {
    float: left;
    width: 308px;
  }

  figcaption {
    float: left;
    width: 412px;
    padding: 40px;
  }

  h2 {
    margin-bottom: 30px;
    line-height: 28px;
    font-size: 20px;
    color: #303137;
  }

  .input-group {
    margin-bottom: 30px;
    position: relative;
  }

  .btn-login {
    display: block;
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 50px;
  }

  .extra {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #969699;
    a {
      color: #333;
    }
  }
</style>
