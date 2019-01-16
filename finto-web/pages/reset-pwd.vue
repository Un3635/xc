<template>
  <div class="page">
    <div class="page-container" @keyup.enter="!isSubmitDisabled&&updatePwd()">
      <figure>
        <img class="figure-img" src="../assets/images/login/join-bg.png">
        <figcaption>
          <form>
            <h2 class="text-left">パスワードの再設定</h2>
            <div class="input-group">
              <el-input placeholder="メールアドレスまたは携帯電話番号" name="account" v-model="formData.account"
                        v-validate="'required|account'" @focus="errors.remove('account')"/>
              <p class="error" v-if="errors.has('account')">
                {{errors.first('account')}}</p>
            </div>
            <div class="input-group">
              <el-input class="code-input" placeholder="6桁の数字認証コード" name="code"
                        v-model="formData.code" v-validate="'required|code'"
                        @focus="errors.remove('code')">
                <el-button slot="suffix" type="text" @click="sendVerifyCode">
                  {{btnText}}
                </el-button>
              </el-input>
              <p class="error" v-if="errors.has('$phone.code')">{{errors.first('$phone.code')}}</p>
            </div>
            <div class="input-group">
              <el-input type="password" placeholder="パスワード(8-18桁の半角英数字)" name="password"
                        v-model="formData.password" v-validate="'required|password'"
                        @focus="errors.remove('password')"/>
              <p class="error" v-if="errors.has('password')">{{errors.first('password')}}</p>
            </div>
            <div class="input-group">
              <el-input type="password" placeholder="パスワードをもう一度入力してください" name="confirmPwd"
                        v-model="formData.confirmPwd" v-validate="{required:true, confirmed: formData.password }"
                        @focus="errors.remove('confirmPwd')" v-bind:class="{'is-danger': errors.has('confirmPwd')}"/>
              <p class="error" v-if="errors.has('confirmPwd')">{{errors.first('confirmPwd')}}</p>
            </div>
            <div class="text-left agreement">
              <el-checkbox v-model="formData.isAgree"></el-checkbox>
              <nuxt-link class="el-button el-button--text" to="/rules/register" target="_blank">FinToの利用規約に同意する
              </nuxt-link>
            </div>
            <el-button type="primary" class="btn-login" @click="updatePwd" :disabled="isSubmitDisabled">
              パスワードを再設定する
            </el-button>
            <div class="extra text-right">
              <nuxt-link to="/login">ログイン画面へ>></nuxt-link>
            </div>

          </form>
        </figcaption>
      </figure>

    </div>

  </div>
</template>

<script>
  import {CountDown, toPromise} from '../services/utils';
  import errorHandler from '../services/error-handler';
  import UserAPI, {VerifyCodeType} from '../services/user-api';
  import SignAPI from '../services/sign-api';
  import debounce from 'lodash.debounce';

  export default {
    head() {
      return {
        title: 'FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム',
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
    inject: ['$validator'],
    computed: {
      isSubmitDisabled() {
        const {account, password, code, confirmPwd, isAgree} = this.formData;
        return !account || !password || !code || !confirmPwd || !isAgree;
      }
    },
    data() {
      return {
        redirectUrl: '',
        formData: {
          account: '',
          code: '',
          password: '',
          confirmPwd: '',
          codeToken: '',
          isAgree: false
        },
        btnText: '認証コードを送信',
        timer: null
      };
    },
    methods: {
      updatePwd() {
        const {account, password, code, codeToken} = this.formData;
        this.$validator.validateAll()
          .then(toPromise)
          .then(() => SignAPI.password(account, password, code, codeToken))
          .then(res => {
            this.$message.success('パスワードの変更が完了しました');
            this.$router.push('/login');
          })
          .catch(this.errorHandler);
      },
      sendVerifyCode() {
        debounce(() => {
          if (this.timer) {
            return;
          }
          const {account} = this.formData;
          this.$validator.validate('account', account)
            .then(toPromise)
            .then(() => UserAPI.smsCode({account, type: VerifyCodeType.BACK_PWD}))
            .then(res => {
              this.formData.codeToken = res;
              this.$message.success('認証コードの送信に成功しました');
              this.timer = CountDown(60)
                .start(t => {
                  this.btnText = t + 's';
                })
                .end(() => {
                  this.timer = null;
                  this.btnText = '認証コードを送信';
                });
            })
            .catch(errorHandler);
        }, 1000, {leading: true})();
      },
      errorHandler(err) {
        if (!err) {
          return;
        }
        if (err.code === '000006') {
          return this.$message.warning('検証コードを再取得して下さい');
        }
        errorHandler(err);
      }
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
    height: 498px;
    margin: auto;
  }

  figure {
    padding: 0;
    margin: 0;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
  }

  .figure-img {
    float: left;
    width: 308px;
  }

  figcaption {
    float: left;
    width: 412px;
    padding: 40px 40px 30px;
  }

  h2 {
    margin-bottom: 30px;
    line-height: 24px;
    font-size: 20px;
    color: #303137;
  }

  .input-group {
    margin-bottom: 30px;
    position: relative;
  }

  .agreement {
    font-size: 12px;
    color: #303137;
    .el-checkbox {
      margin-right: 6px;
    }
    .el-button {
      font-size: 12px;
      padding: 0;
    }
  }

  .btn-login {
    display: block;
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 6px;
  }

  .extra {
    margin-top: 10px;
    line-height: 20px;
    font-size: 12px;
    color: #2F2F2F;
    a {
      color: #4D87EA;
    }
  }
</style>
