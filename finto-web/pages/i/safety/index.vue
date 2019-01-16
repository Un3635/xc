<template>
  <div class="page safety">
    <h2 class="page-header">設定</h2>
    <div class="page-content">
      <div class="c-tile-list">
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.647 8.69v2.178L18 14.914V18H0v-3.086l6.353-3.941V8.691a3.536 3.536 0 0 1-1.059-2.52V3.6C5.294 1.612 6.954 0 9 0c2.047 0 3.706 1.612 3.706 3.6v2.571c0 .981-.404 1.87-1.059 2.52z"
                fill="#A5A5A5" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="item-inner account">
            <h3>アカウント</h3>
            <p>
              <span>アカウント:{{info.mobile ? replacePos(info.mobile, '*', '3', '7') : info.mailboxAccount ? hideEmail(info.mailboxAccount) : ''}}</span>
            </p>
          </div>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.hasPassword?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>パスワード</h3>
          </div>
          <el-button class="right" size="mini" @click="changePasswordDialog = true" style="margin-top: -7px;">
            パスワードを変更する
          </el-button>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="authInfo.authStatus == 2 ?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>本人確認</h3>
            <p>より安全にご利用いただくため、本人確認資料の提出をお願いしています。</p>
          </div>
          <el-button class="right" size="mini" :type="authInfo.authStatus == 2 ?'text':'default'"
                     @click="realNameAuthDialog=!(authInfo.authStatus == 2)">
            {{authInfo.authStatus == 2 ? '認証済み' : '本人確認へ'}}
          </el-button>
        </div>
        <div class="c-tile-list__item" :class="{'has-item': isBindCard}">
          <div class="item-thumbnail">
            <i :class="isBindCard?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>クレジットカード</h3>
            <p>商品の購入や電気代の支払いにご利用できます。</p>
          </div>
          <el-button :disabled="isBindCard" class="right" size="mini" :type="isBindCard?'text':'default'"
                     @click="bindCardDialog = !isBindCard">
            {{isBindCard ? 'カードに関連しました' : 'クレジットカードを登録する'}}
          </el-button>
          <div class="item-inner__item clearfix" v-if="isBindCard" style="margin-left: -35px;">
            <div class="item-inner__item__list__item left">
              <span>{{holderName || 'MASTER'}}</span>
              <p>**** **** **** {{ cardNO || '****'}}</p>
            </div>
            <el-button class="right" size="mini" type="default" @click="bindCardDialog = true">クレジットカードの変更</el-button>
          </div>
        </div>

        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.googleKey?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>Google Authenticatorを設定する</h3>
            <p>二段階認証はパスワードでの確認に加えて、さらにセキュリティコードによる確認を行うことで
              より安全にログインするための仕組みです。</p>
          </div>
          <el-button class="right" size="mini" :type="info.googleKey?'text':'default'"
                     @click="goBindAuth" style="margin-top: 14px;">
            {{info.googleKey ? 'リンク済み' : '設定する'}}
          </el-button>
        </div>
        <div class="c-tile-list__item" v-for="(item, i) in currencyList" :key="item.currencyId"
             :class="{'has-item': hasAddress(item) && addressIsShowMapping[i]}">
          <div class="item-thumbnail">
            <i :class="hasAddress(item)?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>{{item.name}}ウォレットの設定</h3>
            <p>マイニングされた{{item.name}}のご送信先ウォレットをご指定頂けます。</p>
          </div>
          <el-button class="right" size="mini" type="default"
                     @click="showAddressDialog(item, i)">
            {{hasAddress(item) ? (addressIsShowMapping[i] ? 'アドレスリストを閉じる' : 'アドレスを見る' ) : '設定する'}}
          </el-button>
          <div class="address-list" :class="addressIsShowMapping[i] ? 'open' : 'close'"
               v-if="hasAddress(item)">
            <div class="item-inner__item clearfix" v-for="(address,index) in item.addressList" :key="index">
              <div class="item-inner__item__list__item left">
                <span>{{address.remark}}</span>
                <p>{{address.address}}</p>
              </div>
              <el-button class="right text-btn" size="mini" type="text" v-clipboard:copy="address.address"
                         v-clipboard:success="onCopy"
                         :disabled="address.address ==''">コピー
              </el-button>
            </div>
            <div class="add-address" v-if="hasAddress(item) && item.addressList.length < 5">
              <el-button icon="el-icon-plus" type="text" :disabled="isDisabledAddressAdd(item)"
                         @click="checkAddressclick(item, i)">
                新規ウォレット
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="custom" title="パスワード変更" :visible.sync="changePasswordDialog"
               width="420px" @close="errorMsg='';$validator.reset()"
               @open="passwordForm = {}">
      <form class="form-wrap" data-vv-scope="passwordForm" @submit.prevent>
        <label>
          <span class="two-line">現在のパスワード</span>
          <el-input name="oldPassword" v-validate="'required'"
                    @focus="errors.remove('oldPassword','passwordForm')"
                    v-model="passwordForm.oldPassword" type="password"
                    v-bind:class="{'is-danger': errors.has('passwordForm.oldPassword')}"
                    placeholder="現在のパスワードをご入力ください"/>
          <p class="err-info" v-show="errors.has('passwordForm.oldPassword')">
            {{errors.first('passwordForm.oldPassword')}}</p>
        </label>
        <label>
          <span class="two-line">新しいパスワード</span>
          <el-input name="newPassword" v-validate="'required|password'"
                    @focus="errors.remove('newPassword','passwordForm')"
                    v-model="passwordForm.newPassword" :type="showPassword ?'text' : 'password'"
                    v-bind:class="{'is-danger': errors.has('passwordForm.newPassword')}"
                    placeholder="新しいパスワードをご入力ください">
            <template slot="suffix">
              <div class="password-eyes" @click="showPassword = !showPassword">
                <svg v-show="showPassword" class="icon"
                     style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1367">
                  <path
                    d="M512 416a96 96 0 1 0 0 192 96 96 0 0 0 0-192z m511.952 102.064c-0.016-0.448-0.064-0.864-0.096-1.296a8.16 8.16 0 0 0-0.08-0.656c0-0.32-0.064-0.624-0.128-0.928-0.032-0.368-0.064-0.736-0.128-1.088-0.032-0.048-0.032-0.096-0.032-0.144a39.488 39.488 0 0 0-10.704-21.536c-32.672-39.616-71.536-74.88-111.04-107.072-85.088-69.392-182.432-127.424-289.856-150.8-62.112-13.504-124.576-14.064-187.008-2.64-56.784 10.384-111.504 32-162.72 58.784-80.176 41.92-153.392 99.696-217.184 164.48-11.808 11.984-23.552 24.224-34.288 37.248-14.288 17.328-14.288 37.872 0 55.216 32.672 39.616 71.52 74.848 111.04 107.056 85.12 69.392 182.448 127.408 289.888 150.784 62.096 13.504 124.608 14.096 187.008 2.656 56.768-10.4 111.488-32 162.736-58.768 80.176-41.936 153.376-99.696 217.184-164.48 11.792-12 23.536-24.224 34.288-37.248 5.712-5.872 9.456-13.44 10.704-21.568l0.032-0.128a12.592 12.592 0 0 0 0.128-1.088c0.064-0.304 0.096-0.624 0.128-0.928l0.08-0.656 0.096-1.28c0.032-0.656 0.048-1.296 0.048-1.952l-0.096-1.968zM512 704c-106.032 0-192-85.952-192-192s85.952-192 192-192 192 85.968 192 192c0 106.048-85.968 192-192 192z"
                    fill="" p-id="1368"></path>
                </svg>
                <svg v-show="!showPassword" class="icon"
                     style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1516">
                  <path
                    d="M416.704 500.864l121.664-81.104A95.632 95.632 0 0 0 512 416a95.968 95.968 0 0 0-95.296 84.864zM933.12 268.08a23.984 23.984 0 1 0-26.24-40.16v-0.016l-0.288 0.192L74.864 771.92a24 24 0 1 0 26.256 40.16v0.016l0.288-0.192L933.12 268.08zM151.28 677.824L160 672l166.544-111.024c-4.128-15.664-6.544-32-6.544-48.976 0-106.048 85.968-192 192-192 43.872 0 84.192 14.88 116.528 39.648L736 288l8.832-5.52c-42.352-21.072-86.64-37.872-132.928-47.936-62.096-13.504-124.576-14.064-186.992-2.64-56.784 10.384-111.504 32-162.72 58.784-80.176 41.92-153.376 99.696-217.184 164.48-11.808 11.984-23.552 24.224-34.288 37.248-14.288 17.328-14.288 37.872 0 55.216 32.672 39.616 71.52 74.848 111.04 107.056 9.664 7.872 19.536 15.568 29.52 23.136z m872.672-159.76c-0.016-0.448-0.064-0.864-0.096-1.296a8.16 8.16 0 0 0-0.08-0.656c0-0.32-0.064-0.624-0.128-0.928-0.032-0.368-0.064-0.736-0.128-1.088-0.032-0.048-0.032-0.096-0.032-0.144a39.488 39.488 0 0 0-10.704-21.536c-32.672-39.616-71.536-74.88-111.04-107.072a1007.568 1007.568 0 0 0-33.088-25.888l-169.216 111.328c2.928 13.296 4.56 27.056 4.56 41.216 0 106.032-85.968 192-192 192-41.84 0-80.416-13.536-111.952-36.256L272 752l-1.44 1.44c44.8 23.024 91.824 41.296 141.088 52 62.096 13.504 124.608 14.096 187.008 2.656 56.768-10.4 111.488-32 162.736-58.768 80.176-41.936 153.376-99.696 217.184-164.48 11.792-12 23.536-24.224 34.304-37.248 5.696-5.872 9.44-13.456 10.688-21.568l0.032-0.128a12.592 12.592 0 0 0 0.128-1.088c0.064-0.304 0.096-0.624 0.144-0.928l0.064-0.656 0.096-1.28c0.032-0.656 0.048-1.296 0.048-1.952a26.8 26.8 0 0 1-0.128-1.936z m-418.176 14.336l-112.16 73.808a96 96 0 0 0 112.16-73.808z"
                    fill="" p-id="1517"></path>
                </svg>
              </div>
            </template>
          </el-input>
          <p class="err-info" v-show="errors.has('passwordForm.newPassword')">
            {{errors.first('passwordForm.newPassword')}}</p>
        </label>
        <label>
          <span class="two-line">新パスワードの確認</span>
          <el-input v-validate="{'required': true, 'confirmed': passwordForm.newPassword}"
                    @focus="errors.remove('confirmPwd','passwordForm');errorMsg=''"
                    v-bind:class="{'is-danger': errors.has('passwordForm.confirmPwd')}"
                    name="confirmPwd"
                    v-model="passwordForm.repeatPassword" :type="showPassword ?'text' : 'password'"
                    placeholder="新しいパスワードをご入力ください"/>
          <p class="err-info"
             v-show="(!errors.has('passwordForm.newPassword')&&errors.has('passwordForm.confirmPwd'))||errorMsg">
            {{errorMsg || errors.first('passwordForm.confirmPwd')}}</p>
        </label>
        <div class="label">
          <span>{{verifyMethod === 1 ? 'SMS認証' : 'メール認証'}}</span>
          <el-select v-model="verifyMethod" placeholder="検証方法を選択してください" class="drop-down-box">
            <el-option v-for="item in modeList" :key="item.value"
                       :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <label class="clearfix">
          <span>認証コード</span>
          <div class="code-ipt">
            <input name="code" v-validate="'required|code'" @focus="errors.remove('code','passwordForm')"
                   v-model="passwordForm.code" type="text" class="left"
                   v-bind:class="{'is-danger': errors.has('passwordForm.code')}"
                   placeholder="認証コード" maxlength="6"/>
            <el-button class="send-code left" type="text"
                       :disabled="sendCodeBtnDisabled1"
                       @click="sendCode('password', VerifyCodeType.RESET_PWD,1)">{{sendCodeBtnText1}}
            </el-button>
          </div>
          <p class="err-info left" v-show="errors.has('passwordForm.code')">{{errors.first('passwordForm.code')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword" :disabled="pwdFormDisabled"
                   :loading="passwordFormBtnLoading">変更する</el-button>
      </span>
    </el-dialog>
    <!--<el-dialog class="custom" :visible.sync="checkAddressDialog" width="420px"-->
    <!--:title="`${currentOperatingItem.name}送信先ウォレット`">-->
    <!--<div class="check-addresslist clearfix" v-for="(item,idx) in currentOperatingItem.addressList" :key="idx">-->
    <!--<div class="left">-->
    <!--<h3>{{item.remark}}</h3>-->
    <!--<p>-->
    <!--<span class="check-address">{{item.address}}</span>-->
    <!--<span class="check-copy" v-clipboard:copy="item.address" v-clipboard:success="onCopy">コピー</span>-->
    <!--</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="check-addressbtn">-->
    <!--<el-button type="primary" :disabled="isDisabledAddressAdd" @click="checkAddressclick()">-->
    <!--新規ウォレット-->
    <!--</el-button>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div class="check-addresstip">{{checkAddressTip}}</div>&ndash;&gt;-->
    <!--</el-dialog>-->
    <el-dialog width="420px" :title="`${currentOperatingItem.name}ウォレット追加`" custom-class="custom"
               :visible.sync="addressDialogVisible" @close="closeAddressDialogHandler">
      <form @submit.prevent>
        <dl class="form-group input-group">
          <dt>アドレス</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="address" v-validate="'required'" data-vv-scope="addressForm"
                      placeholder="ウォレットアドレスをご入力ください" v-model="addressInfo.address"
                      @focus="errors.remove('address','addressForm');addressErrMsg=''"
                      v-bind:class="{'is-danger': errors.has('addressForm.address')}"/>
            <p class="error" v-if="errors.has('addressForm.address')||addressErrMsg">
              {{errors.first('addressForm.address') || addressErrMsg}}
            </p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>メモ</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="remark"
                      v-validate="'required'" placeholder="ウォレットの場所をご入力ください"
                      v-model="addressInfo.remark" data-vv-scope="addressForm"
                      @focus="errors.remove('remark','addressForm')"
                      v-bind:class="{'is-danger': errors.has('addressForm.remark')}"/>
            <p class="error" v-if="errors.has('addressForm.remark')">
              {{errors.first('addressForm.remark')}}
            </p>
          </dd>
        </dl>
        <p class="form-title el-dialog__title">セキュリティ認証</p>
        <dl class="form-group input-group">
          <dt :class="{'two-line':verifyMethod === 2 }">{{verifyMethod === 1 ? '電話番号' : 'メールアドレス認証'}}</dt>
          <dd class="has-send-code">
            <el-row :gutter="4">
              <el-col :span="14" style="padding: 0 10px;line-height: 34px;color: #606166;">
                <input type="text" :value="verifyMethod === 1 ? info.mobile : info.mailboxAccount" readonly>
              </el-col>
              <el-col :span="10">
                <el-button type="text" :disabled="sendCodeBtnDisabled" @click="sendVerifyCode">
                  {{sendCodeBtnText}}
                </el-button>
              </el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>認証コード</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="verifyCode" v-validate="'required|code'"
                      v-model="addressInfo.verifyCode" placeholder="SMS認証コード"
                      v-bind:class="{'is-danger': errors.has('addressForm.verifyCode')}"
                      data-vv-scope="addressForm" @focus="errors.remove('verifyCode','addressForm')"/>
            <p class="error" v-if="errors.has('addressForm.verifyCode')">{{errors.first('addressForm.verifyCode')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group" v-if="!currentOperatingItem.address">
          <dt>Google認証</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="googleCode"
                      v-bind:class="{'is-danger': errors.has('addressForm.googleCode')}"
                      v-validate="'required|code'" placeholder="数字６桁の認証コード"
                      v-model="addressInfo.code" data-vv-scope="addressForm"
                      @focus="errors.remove('googleCode','addressForm')"/>
            <p class="error" v-if="errors.has('addressForm.googleCode')">
              {{errors.first('addressForm.googleCode')}}
            </p>
          </dd>
        </dl>
      </form>
      <div slot="footer">
        <el-button type="primary" @click="addAddress()" :loading="addressFormBtnLoading">登録する</el-button>
      </div>
    </el-dialog>
    <el-dialog class="custom" :visible.sync="realNameAuthDialog" width="496px" title="本人確認" append-to-body>
      <div class="safety-dialog-content">
        <el-tabs v-model="realNameAuthTab" type="card" :before-leave="tabBeforeLeave">
          <el-tab-pane
            :disabled="!!authInfo.authType && item.i != authInfo.authType"
            v-for="(item, index) in tabList"
            :key="index"
            :label="item.title"
            :name="item.name">
            <div class="safety-tab-content clearfix">
              <div class="example-img">
                <img :src="exampleImgList[item.name + 'Img']" alt="">
              </div>
              <div v-if="!!imgList[0]" class="upload-img">
                <img :src="imgList[0]" alt="">
                <div v-if="[1,3].indexOf(authInfo.authStatus) == -1" class="del" @click="handleRemove"><span>×</span>
                </div>
              </div>
              <el-upload style="margin:0 19px 10px 0;" v-else :action="uploadUrl()" list-type="picture-card"
                         :multiple="true"
                         :before-upload="beforeAvatarUpload" :show-file-list="false"
                         :on-error="uploadError" :on-success="uploadSuccess" :file-list="fileList" :data="extraData">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p class="auth-rmark" :class="{'red': authInfo.authStatus == 3}">{{authInfo.authRemark}}</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="submit-real-name-btn" type="primary" :loading="realNameAuthBtnLoading"
                   :disabled="!(imgList[0] && authInfo.authRemark == '')"
                   @click="submitRealNameAuth">提出する</el-button>
        <el-button type="primary" v-show="[3].indexOf(authInfo.authStatus) != -1"
                   @click="resetUpload">アップロードし直す</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="isBindCard ?  'クレジットカードの変更' : 'クレジットカードの登録'" width="420px" :visible.sync="bindCardDialog"
               class="custom"
               @close="$validator.reset();bindCardForm = {};">
      <form class="form-wrap" data-vv-scope="bindCardForm" @submit.prevent>
        <h3 class="f-title">クレジットカード情報</h3>
        <label>
          <span>カード名義</span>
          <el-input name="name" v-validate="'required'"
                    @focus="errors.remove('name','bindCardForm')"
                    v-model="bindCardForm.name"
                    placeholder="カード名義をご入力ください"/>
          <p class="err-info" v-show="errors.has('bindCardForm.name')">
            {{errors.first('bindCardForm.name')}}</p>
        </label>
        <label>
          <span>カード番号</span>
          <el-input name="creditCard" v-validate="'required|creditCard'"
                    @focus="errors.remove('creditCard','bindCardForm')"
                    v-model="bindCardForm.bankcard"
                    placeholder="カード番号をご入力ください"/>
          <p class="err-info" v-show="errors.has('bindCardForm.creditCard')">
            {{errors.first('bindCardForm.creditCard')}}</p>
        </label>
        <div class="label">
          <span>有効期間</span>
          <el-select class="y-m" v-model="bindCardForm.year" placeholder="年" name="year" v-validate="'required'"
                     @focus="errors.remove('year','bindCardForm');errors.remove('month','bindCardForm')">
            <el-option
              v-for="item in yearsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select class="y-m" v-model="bindCardForm.month" placeholder="月" name="month" v-validate="'required'"
                     @focus="errors.remove('year','bindCardForm');errors.remove('month','bindCardForm')">
            <el-option
              v-for="item in monthsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p class="err-info" v-show="errors.has('bindCardForm.year') || errors.has('bindCardForm.month')">
            有効期間を選択してください</p>
        </div>
      </form>
      <span slot="footer">
            <el-button type="primary" @click="bindCard">{{isBindCard ? '変更する' : '登録する'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UserApi, {VerifyCodeType} from '../../../services/user-api';
  import payAPI from '../../../services/pay-api';
  import {replacePos, hideEmail, CountDown} from '../../../services/utils';
  import {AppConfig} from '../../../services/config';
  import {mapState} from 'vuex';
  import errorHandler from '../../../services/error-handler';
  import {UPDATE_USER_INFO} from '../../../store/action-types';

  const exampleImgList = {
    fImg: require('../../../assets/images/safety/Group 20 Copy 3@2x.png'),
    sImg: require('../../../assets/images/safety/Group80 Copy 3@2x.png'),
    tImg: require('../../../assets/images/safety/Group 20 Copy 4.png')
  };

  export default {
    head() {
      return {
        title: '設定｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    inject: ['$validator'],
    breadcrumb() {
      return {
        label: '設定',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          }
        ]
      };
    },
    computed: {
      ...mapState({info: 'userInfo', token: 'token'}),
      pwdFormDisabled() {
        const {code, oldPassword, newPassword, repeatPassword} = this.passwordForm;
        return !(code && oldPassword && newPassword && repeatPassword);
      },
//      isDisabledAddressAdd() {
//        let addressInfo = this.currentOperatingItem;
//        return addressInfo.todayAdded || (addressInfo.addressList || []).length > 5;
//      },
      currencyList() {
        const addressJsonStr = (this.info || {}).address || '[]';
        let currencyInfos = JSON.parse(addressJsonStr);
        currencyInfos.sort((a, b) => a.currencyId - b.currencyId);
        return currencyInfos;
      }
//      checkAddressTip() {
//        let addressInfo = this.currentOperatingItem;
//        if (addressInfo.todayAdded) {
//          return `今日已添加过${addressInfo.name}地址`;
//        } else if (addressInfo.addressList && addressInfo.addressList.length > 5) {
//          return '每个币种只能添加五个地址';
//        } else {
//          return '每日每个币种仅能添加一个地址';
//        }
//      }
    },
    data() {
      return {
        addressInfo: {},
        addressErrMsg: '',
        changePasswordDialog: false,
        realNameAuthDialog: false,
        checkAddressDialog: false,
        addressDialogVisible: false,
        showPassword: false,
        realNameAuthTab: 'f',
        VerifyCodeType: VerifyCodeType,
        tabList: [
          {title: 'パスポート', name: 'f', i: 1},
          {title: '保険証', name: 's', i: 2},
          {title: '免許証', name: 't', i: 3}
        ],
        fileList: [],
        exampleImgList: exampleImgList,
        imgList: [],
        shortImgList: [],
        // 身份证上传
        fImgShortUrl: '',
        fImgLongUrl: '',
        // 保险证上传
        sImgShortUrl: '',
        sImgLongUrl: '',
        // 免许证上传
        tImgShortUrl: '',
        tImgLongUrl: '',
        extraData: {},
        // currencyList: [],
        currentOperatingItem: {},
        modeList: [],
        //验证方式   1:短信 2:邮箱
        verifyMethod: 1,
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: '',
          code: ''
        },
        addressFormBtnLoading: false,
        sendCodeBtnText: '認証コードを送信',
        sendCodeBtnDisabled: false,
        bindAddressCodeToken: '',
        sendCodeBtnText1: '認証コードを送信',
        sendCodeBtnDisabled1: false,
        timer1: null,
        codeToken: '',
        phoneInfo: {
          phoneNumber: '',
          area: '',
          code: '',
          repeatPassword: '',
          password: ''
        },
        passwordFormBtnLoading: false,
        realNameAuthBtnLoading: false,
        authInfo: {
          /** 认证类型（1-日本护照认证；2-日本保险卡认证；3-日本驾照认证） */
          authType: '',
          authPicUrl: '',
          /** 认证状态 1-未确认 2-已确认 3-审核拒绝 */
          authStatus: '',
          authRemark: ''
        },
        errorMsg: '',
        bindCardForm: {
          name: '',
          bankcard: '',
          year: '',
          month: ''
        },
        isBindCard: false,
        cardNO: '',
        holderName: '',
        yearsList: [],
        monthsList: [],
        bindCardDialog: false,
        addressIsShowMapping: []
      };
    },
    mounted() {
      for (let j = 1; j <= 12; j++) {
        this.monthsList.push({label: j + '月', value: j});
      }

      for (let i = new Date().getFullYear(); i <= new Date().getFullYear() + 10; i++) {
        this.yearsList.push({label: i + '年', value: i});
      }
      this.extraData = {token: this.token};
      this.getCertifyInfo();
      this.getBindCardInfo();
    },
    watch: {
      token() {
        this.extraData = {token: this.token};
      },
      info: {
        handler(val) {
          if (this.addressIsShowMapping.length === 0) {
            let len = JSON.parse((val || {}).address || '[]').length;
            for (let i = 0; i < len; i++) {
              this.addressIsShowMapping.push(false);
            }
          }
          if (val.mobile != '' || val.mailboxAccount != '') {
            this.getModeList(val);
          }
          this.cardNO = (val.bankCardNo || '').substr(-4);
          this.holderName = val.holderName;
        },
        immediate: true
      }
    },
    methods: {
      replacePos,
      hideEmail,
      isDisabledAddressAdd(item) {
        let addressInfo = item;
        return addressInfo.todayAdded || (addressInfo.addressList || []).length > 5;
      },
      getBindCardInfo() {
        payAPI.myCardInfo()
          .then(() => {
            this.isBindCard = true;
          })
          .catch(error => {
            if (error.code === '200305') {
              this.isBindCard = false;
            } else {
              this.isBindCard = true;
            }
          });
      },
      uploadUrl() {
        return AppConfig.baseURL + '/' + AppConfig.uploadUrl;
      },
      beforeAvatarUpload(file) {
        const isImage =
          ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) > -1;
        const isValidSize = file.size / 1024 / 1024 < 5;
        if (!isImage) {
          this.$message.error('ピクチャーはpng jpg jpegに限ります！');
        }
        if (!isValidSize) {
          this.$message.error('ピクチャーは大きすぎるため、圧縮して再アップロードしてください！');
        }
        return isImage && isValidSize;
      },
      uploadError(msg = 'アップロードが失敗しました。少々お待ちして再び試してください！') {
        this.$message.error(msg);
      },
      uploadSuccess(response, file, fileLis) {
        if (response.code === '000000') {
          this.$message({type: 'success', message: 'アップロードが成功しました', center: true});
          this.getPicUrl(response.data.result)
            .then(url => {
              this.imgList = [url];
              this.shortImgList = [response.data.result];
            });
        } else {
          this.uploadError(response.msg);
        }
      },
      handleRemove() {
        this.imgList = [];
        this.shortImgList = [];
      },
      resetUpload() {
        this.authInfo = {
          authType: '',
          authPicUrl: '',
          authStatus: '',
          authRemark: ''
        };
        this.imgList = [];
        this.shortImgList = [];
      },
      showAddressDialog(item, i) {
        this.currentOperatingItem = item;
        (this.currentOperatingItem || {}).i = i;
        if (!this.info.googleKey) {
          return this.$message({
            type: 'warning',
            message: 'Google Authenticatorが設定されていません。',
            showClose: true
          });
        }
        if (this.hasAddress(item)) {
//          return this.checkAddressDialog = true;
          return this.$set(this.addressIsShowMapping, i, !this.addressIsShowMapping[i]);

        }
        this.addressDialogVisible = true;
      },
      getPicUrl(key) {
        return UserApi.getPicUrl(key)
          .then(res => {
            return res.result;
          });
      },
      submitRealNameAuth() {
        let params = {
          authenticationType: 1,
          picUrl: this.shortImgList[0]
        };
        if (this.realNameAuthTab === 's') {
          params.authenticationType = 2;
        } else if (this.realNameAuthTab === 't') {
          params.authenticationType = 3;
        }
        this.realNameAuthBtnLoading = true;
        UserApi.certify(params)
          .then(res => {
            this.realNameAuthBtnLoading = false;
            this.getCertifyInfo();
            this.$message({
              type: 'success',
              message: '提出完了！',
              showClose: true
            });
          })
          .catch(err => {
            this.realNameAuthBtnLoading = false;
            errorHandler(err);
          });
      },
      tabBeforeLeave(an, on) {
        this[`${on}ImgShortUrl`] = this.shortImgList[0];
        this[`${on}ImgLongUrl`] = this.imgList[0];
        this.imgList = [this[`${an}ImgLongUrl`]];
        this.shortImgList = [this[`${an}ImgShortUrl`]];
      },
      goBindAuth() {
        if (!this.info.googleKey) {
          this.$router.push('safety/bind-authenticator');
        }
      },
      hasAddress(item) {
        return item.addressList && item.addressList.length > 0;
      },
      getCertifyInfo() {
        return UserApi.getCertifyInfo()
          .then(res => res || {})
          .then(res => {
            this.authInfo = {
              authType: res.authType,
              authPicUrl: res.authPicUrl,
              authStatus: res.authStatus,
              authRemark: res.authRemark || ''
            };
          })
          .then(() => {
            let {authStatus, authType, authPicUrl, authRemark} = this.authInfo;
            if (!authStatus) {
              return;
            } else if (authStatus == 1) {
              this.realNameAuthTab = authType == 1 ? 'f' : authType == 2 ? 's' : 't';
              this.imgList[0] = authPicUrl;
              this.authInfo.authRemark = '審査中……';
            } else if (authStatus == 3) {
              this.realNameAuthTab = authType == 1 ? 'f' : authType == 2 ? 's' : 't';
              this.imgList[0] = authPicUrl;
              if (!authRemark || authRemark == '') {
                this.authInfo.authRemark = '審査に失敗する';
              }
            }
          });
      },
      getModeList(res) {
        this.modeList = [];
        if (res.mobile) {
          this.modeList.push({
            type: '電話番号認証',
            // label: '電話番号認証   ' + (res.countryNum ? res.countryNum + ' ' : '') + replacePos(res.mobile, '*', 3, 7),
            label: replacePos(res.mobile, '*', 3, 7),
            value: 1
          });
        }
        if (res.mailboxAccount) {
          this.modeList.push({
            type: 'メールアドレス認証',
            label: hideEmail(res.mailboxAccount),
            value: 2
          });
        }
        this.verifyMethod = this.modeList[0].value || '';
      },
      onCopy() {
        this.$notify({
          message: 'コピーされました',
          type: 'success'
        });
      },
      checkAddressclick(item, i) {
        this.currentOperatingItem = item;
        (this.currentOperatingItem || {}).i = i;
        this.addressDialogVisible = true;
//        setTimeout(() => {
//          this.addressDialogVisible = true;
//        }, 300);
      },
      sendCode(msg, type, num) {
        let {mobile, mailboxAccount} = this.info;
        let params = {
          account: this.verifyMethod === 1 ? mobile : mailboxAccount,
          type: type
        };
        let promise;
        if (msg === 'currency') {
          promise = Promise.resolve();
        } else if (msg === 'password') {
          let validataArr = [this.$validator.validate('passwordForm.newPassword'), this.$validator.validate('passwordForm.confirmPwd'), this.$validator.validate('passwordForm.oldPassword')];
          promise = Promise.all(validataArr)
            .then(res => {
              this.errorMsg = this.errors.first('passwordForm.newPassword:required');
              if (res.every(item => item === true)) {
                return Promise.resolve();
              }
              return Promise.reject();
            });
        }
        promise.then(() => {
          UserApi.smsCode(params)
            .then(res => res || {})
            .then(res => {
              this.$message({
                type: 'success',
                message: '認証コードの送信に成功しました',
                showClose: true
              });
              this.codeToken = res;
              this['sendCodeBtnDisabled' + num] = true;
              this['sendCodeBtnText' + num] = 60 + 's';
              this['timer' + num] = CountDown(60)
                .start(t => {
                  this['sendCodeBtnText' + num] = t + 's';
                })
                .end(() => {
                  this['sendCodeBtnDisabled' + num] = false;
                  this['sendCodeBtnText' + num] = '認証コードを取得';
                  clearInterval(this['timer' + num]);
                });
            }).catch(error => {
            this.$message({
              type: 'error',
              message: error.msg,
              showClose: true
            });
            this['sendCodeBtnDisabled' + num] = false;
            this['sendCodeBtnText' + num] = '認証コードを取得';
          });
        }, () => {
        });
      },
      changePassword() {
        this.$validator.validateAll('passwordForm')
          .then(result => {
            if (result) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })
          .then(() => {
            this.passwordFormBtnLoading = true;
            let params = {
              account: this.info.mobile ? this.info.mobile : this.info.mailboxAccount,
              password: this.passwordForm.oldPassword,
              newPassword: this.passwordForm.newPassword,
              code: this.passwordForm.code,
              codeToken: this.codeToken
            };
            UserApi.passwordByOld(params)
              .then(() => {
                this.passwordFormBtnLoading = false;
                this.changePasswordDialog = false;
//                this.getUserInfo();
                this.$store.dispatch(UPDATE_USER_INFO);
                this.$message({
                  type: 'success',
                  message: 'パスワード変更が成功しました！',
                  showClose: true
                });
              })
              .catch(error => {
                if (!error) return;
                this.passwordFormBtnLoading = false;
                this.$message({
                  type: 'error',
                  message: error.msg,
                  showClose: true
                });
              });
          });
      },
      closeAddressDialogHandler() {
        this.errors.clear('addressForm');
        this.addressErrMsg = '';
        this.sendCodeBtnText = '認証コードを取得';
      },
      addAddress() {
        let dataScope = 'addressForm';
        this.$validator.validateAll(dataScope)
          .then(result => {
            if (result) {
              return result;
            }
            return Promise.reject(null);
          })
          .then(() => {
            const codeToken = this.bindAddressCodeToken;
            if (codeToken) {
              return codeToken;
            }
            return Promise.reject({msg: '検証コードを再取得して下さい'});
          })
          .then(codeToken => {
            const {currencyId} = this.currentOperatingItem;
            const {address, remark, code, verifyCode} = this.addressInfo;
            return UserApi.addWallet(currencyId, address, remark, verifyCode, code, codeToken);
          })
          .then(() => {
            this.addressFormBtnLoading = false;
            this.addressDialogVisible = false;
            this.addressInfo = {};
            this.$message.success('ウォレットが登録されました');
//            this.getUserInfo();
            this.$store.dispatch(UPDATE_USER_INFO);
            if (this.currentOperatingItem.i) {
              this.addressIsShowMapping[this.currentOperatingItem.i] = true;
            }
          })
          .catch(err => {
            this.addressFormBtnLoading = false;
            errorHandler(err);
          });
      },
      sendVerifyCode() {
        const userInfo = this.info;
//        const countryNum = userInfo.countryNum || '';
        const account = this.verifyMethod === 1 ? userInfo.mobile : userInfo.mailboxAccount;
        this.sendCodeBtnLoading = true;
        this.sendCodeBtnDisabled = true;
        const currencyName = this.currentOperatingItem.name;
        UserApi.smsCode({account, type: VerifyCodeType.ADD_WITHDRAWAL_ADDRESS, currencyName})
          .then(res => res || {})
          .then(codeToken => {
            this.bindAddressCodeToken = codeToken;
            this.$message.success('認証コードの送信に成功しました');
            this.sendCodeBtnLoading = false;
            let t = 60;
            this.sendCodeBtnText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeBtnText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '認証コードを取得';
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(error => {
            this.$message.error(error.msg);
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeBtnText = '認証コードを取得';
          });
      },
      bindCard() {
        this.$validator.validateAll('bindCardForm')
          .then(result => {
            if (result) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })
          .then(() => {
            let params = {
              holderName: this.bindCardForm.name,
              cardNo: this.bindCardForm.bankcard,
              expireDate: this.bindCardForm.year + '-' + ( this.bindCardForm.month < 10 ? '0' + this.bindCardForm.month : this.bindCardForm.month ),
              update: this.isBindCard ? 1 : 0
            };
            return payAPI.bindingCard(params);
          })
          .then(res => {
            this.$message({
              message: this.isBindCard ? 'クレジットカードの変更に成功しました' : 'クレジットカードの登録に成功しました',
              type: 'success'
            });
            this.bindCardDialog = false;
            this.cardNO = this.bindCardForm.bankcard.substr(-4);
            this.holderName = this.bindCardForm.name;
            this.getBindCardInfo();
          })
          .catch(error => {
            if (!error) return;
            errorHandler(error);
          });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/style/form-wrap";

  .page-header {
    font-size: 24px;
    line-height: 24px;
    padding: 20px 30px;
    border-bottom: 1px solid #F5F5F7;
    color: #303137;
  }

  .page-content {
    padding: 30px;
  }

  .c-tile-list {
    background: #FDFDFD;
    border: 1px solid #EDEEF0;
    padding: 0 30px;
  }

  .c-tile-list__item {
    position: relative;
    padding-top: 30px;
    /*padding-bottom: 20px;*/
    padding-left: 35px;
    border-bottom: 1px solid #EDEEF0;

    &.has-item {
      border: none;
      padding-bottom: 0;
    }
    .item-inner {
      margin-bottom: 20px;
    }
    &:last-child {
      border-bottom: 0;
    }

    .item-thumbnail {
      position: absolute;
      margin-top: -1px;
      left: 0;
      font-size: 18px;

      .el-icon-success {
        color: #67BE2F;
      }
      .el-icon-warning {
        color: #FFB764;
      }
    }

    .item-inner {
      display: inline-block;

      &.account {
        display: block;

        button {
          margin-top: 0;
        }
      }

      h3 {
        font-size: 16px;
        color: #303137;
        letter-spacing: 0.89px;
        line-height: 16px;
        position: relative;
        margin-bottom: 12px;
      }
      p {
        font-size: 14px;
        color: #999;
        letter-spacing: 0.35px;
        line-height: 19px;
        max-width: 620px;
      }
    }

    button {
      margin-top: 7px;
    }
    .el-button--text {
      color: #999;
      &.text-btn {
        color: #2A5CAA;
      }
    }
  }

  .check-addresslist {
    margin-bottom: 20px;
    h3 {
      font-size: 14px;
      color: #303137;
      margin-bottom: 6px;
      line-height: 18px;
    }
    div:last-child {
      p {
        line-height: 16px;
        font-size: 12px;
        max-width: 288px;
        color: #999;
        word-wrap: break-word;
      }
    }
  }

  .check-addressbtn .el-button {
    height: 32px;
    line-height: 32px;
    padding: 0 20px;
    font-size: 14px;
  }

  .check-addresstip {
    margin-top: 6px;
    color: #999999;
  }

  .check-address {
    color: #999999;
    margin-right: 10px;
  }

  .check-copy {
    color: #4D87EA;
    cursor: pointer;
  }

  .safety-tab-content {
    border: 1px solid #e1e1e1;
    border-top: none;
    padding: 30px 0px 10px 20px;
  }

  .password-eyes {
    height: 34px;
    line-height: 34px;
    padding-right: 6px;
  }

  .example-img, .upload-img {
    width: 198px;
    height: 132px;
    background: none;
    margin: 0 19px 10px 0;
    float: left;
    border-radius: 6px;
    border: 1px solid #f3f3f3;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .del {
      position: absolute;
      cursor: pointer;
      right: -20px;
      top: -20px;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, .6);
      color: #fff;
      font-weight: bold;
      transform: rotateZ(45deg);
      line-height: 62px;
      text-align: center;
      span {
        font-style: normal;
        transform: rotateZ(-45deg);
        display: block;
      }
    }
  }

  .auth-rmark {
    width: 198px;
    float: right;
    padding-right: 20px;
    line-height: 1.5em;
    &.red {
      color: #F95453;
    }
  }

  .submit-real-name-btn {
    width: 185px;
  }

  .add-address {
    // margin-left: -35px;
    background: #F5F5F5;
    text-align: center;
    padding: 22px 0;
    border-top: 1px solid #EDEDED;
    .el-button {
      margin: 0;
      color: #2A5CAA;
      &:disabled {
        color: #999;
      }
    }
  }

  .item-inner__item {
    border-bottom: 1px solid #EDEDED;
    // margin: 0 0 0 -35px;
    background: #F5F5F5;
    padding: 30px 25px 30px 35px;
    &:last-of-type {
      border: none;
    }
    button {
      margin-top: 9px;
    }
    .item-inner__item__list__item {
      span {
        font-size: 14px;
        color: #606166;
        letter-spacing: 0.35px;
        line-height: 19px;
        margin-bottom: 12px;
        display: block;
      }
      p {
        font-size: 20px;
        color: #303137;
        letter-spacing: 0.5px;
        line-height: 19px;
        font-family: MicrosoftYaHei;
      }
    }
  }

  .address-list {
    margin-left: -35px;
    overflow: hidden;
    transition: max-height 0.4s;
    &.open {
      max-height: 9999px;
    }
    &.close {
      max-height: 0;
    }
  }

</style>
<style lang="scss">
  .safety .form-wrap {
    .el-input {
      &.is-danger .el-input__inner, &.is-danger .el-input__inner:hover {
        border-color: #F95453;
      }
      .el-input__inner {
        height: 36px;
        border: 1px solid #EDEEF0;
        background: none;
        &:focus,
        &:hover {
          z-index: 2;
          border-color: #ccc;
          background: none;
        }
      }
    }
  }

  .safety-dialog-content {
    .el-tabs__nav-wrap {
      margin-bottom: -2px;
    }
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      width: 100%;
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
      width: 33.333%;
      text-align: center;
      position: relative;
      &.is-active {
        border: 1px solid #e1e1e1;
        border-bottom-color: #fff;
        &:before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #4D87EA;
        }
      }
    }
  }

  .safety-tab-content {
    .el-upload--picture-card {
      width: 198px;
      height: 132px;
      background: none;
    }
    .el-upload-list__item {
      width: 198px;
      height: 132px;
    }
  }
</style>
