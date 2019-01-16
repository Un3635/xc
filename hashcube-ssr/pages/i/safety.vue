<template>
  <div class="page">
    <h2 class="page-header">安全中心</h2>
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
            <h3>我的账户</h3>
            <p>
              <span>绑定手机: {{info.moblie?replacePos(info.moblie, '*', '3', '7'):'未绑定'}}</span>
              <el-button v-if="!info.moblie" class="right" size="mini" @click="bindPhoneDialog = true">去绑定</el-button>
            </p>
            <p>
              <span>绑定邮箱: {{info.mailboxAccount?hideEmail(info.mailboxAccount):'未绑定'}}</span>
              <el-button v-if="!info.mailboxAccount" class="right" size="mini" @click="bindEmailDialog = true">去绑定
              </el-button>
            </p>
          </div>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.hasPassword?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>我的密码</h3>
            <p>用于保护帐号信息和登录安全。</p>
          </div>
          <el-button class="right" size="mini" @click="changePasswordDialog = true">
            {{info.hasPassword?'修改密码':'设置密码'}}
          </el-button>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.isBindBankCard?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>我的银行卡</h3>
            <p>银行卡用于快捷支付。</p>
          </div>
          <el-button class="right" size="mini" :type="info.isBindBankCard?'text':'default'"
                     @click="bindBankcardDialog = !info.isBindBankCard">
            {{info.isBindBankCard?'已绑卡':'去绑卡'}}
          </el-button>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.googleKey?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>绑定谷歌验证器(Authenticator)</h3>
            <p>为了您的帐户安全，在进行交易、充值及提现等操作前需要您先开启两步验证。</p>
          </div>
          <el-button class="right" size="mini" :type="info.googleKey?'text':'default'"
                     @click="goBindAuth">
            {{info.googleKey?'已绑定':'去绑定'}}
          </el-button>
        </div>
        <div class="c-tile-list__item" v-for="item in currencyList" :key="item.currencyId">
          <div class="item-thumbnail">
            <i :class="hasAddress(item)?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>{{item.name}}提现地址</h3>
            <p>用于{{item.name}}帐户提现</p>
          </div>
          <el-button class="right" size="mini" type="default"
                     @click="showAddressDialog(item)">
            {{hasAddress(item)?'查看地址':'未设置'}}
          </el-button>
        </div>
        <div class="c-tile-list__item">
          <div class="item-thumbnail">
            <i :class="info.idCard?'el-icon-success':'el-icon-warning'"></i>
          </div>
          <div class="item-inner">
            <h3>实名认证</h3>
            <p>实名认证用于用户安全，建议立即设置</p>
          </div>
          <el-button class="right" size="mini" :type="info.idCard?'text':'default'"
                     @click="realNameAuthDialog=!info.idCard">
            {{info.idCard?'已认证':'去认证'}}
          </el-button>
        </div>
      </div>
    </div>

    <el-dialog :title="info.hasPassword ? '修改密码' : '设置密码'" :visible.sync="changePasswordDialog" custom-class="custom"
               width="420px" @close="$validator.reset();errors.clear('passwordForm')" @open="passwordForm = {}">
      <form class="form-wrap" data-vv-scope="passwordForm" @submit.prevent>
        <label v-if="info.hasPassword">
          <span>旧密码</span>
          <input name="oldPassword" v-validate="'required'" @focus="errors.remove('oldPassword','passwordForm')"
                 v-model="passwordForm.oldPassword" type="password"
                 placeholder="输入旧密码">
          <p class="err-info" v-show="errors.has('passwordForm.oldPassword')">
            {{errors.first('passwordForm.oldPassword')}}</p>
        </label>
        <label>
          <span>新密码</span>
          <input name="password" v-validate="'required|password'" @focus="errors.remove('password','passwordForm')"
                 v-model="passwordForm.newPassword" type="password"
                 placeholder="输入新密码">
          <p class="err-info" v-show="errors.has('passwordForm.password')">{{errors.first('passwordForm.password')}}</p>
        </label>
        <label>
          <span>重复密码</span>
          <input v-validate="{ 'required': true, 'confirmed': passwordForm.newPassword }"
                 @focus="errors.remove('repeatPassword','passwordForm')"
                 name="repeatPassword"
                 v-model="passwordForm.repeatPassword" type="password"
                 placeholder="重复新密码">
          <p class="err-info" v-show="errors.has('passwordForm.repeatPassword')">
            {{errors.first('passwordForm.repeatPassword')}}</p>
        </label>
        <div class="label">
          <span>验证方式</span>
          <el-select v-model="verifyMethod" placeholder="请选择验证方式" class="drop-down-box">
            <el-option v-for="item in modeList" :key="item.value"
                       :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <label class="clearfix">
          <span>验证码</span>
          <input name="code" v-validate="'required|code'" @focus="errors.remove('code','passwordForm')"
                 class="code-ipt left"
                 v-model="passwordForm.code" type="text"
                 :placeholder="`输入${verifyMethod == 0 ? '邮箱': '短信' }中的验证码`" maxlength="6">
          <el-button class="send-code left" type="text"
                     :disabled="sendCodeBtnDisabled1" :loading="sendCodeBtnLoading1"
                     @click="sendCode('password',4,1)">{{sendCodeBtnText1}}
          </el-button>
          <p class="err-info left" v-show="errors.has('passwordForm.code')">{{errors.first('passwordForm.code')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword" :disabled="pwdFormDisabled"
                   :loading="passwordFormBtnLoading">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog width="420px" :title="`添加${currentOperatingItem.name}地址`" custom-class="custom"
               :visible.sync="addressDialogVisible" @close="closeAddressDialogHandler">
      <form @submit.prevent>
        <dl class="form-group input-group">
          <dt>地址</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="address" v-validate="'required'" data-vv-scope="addressForm"
                      :placeholder="`${currentOperatingItem.name}的钱包地址`" v-model="addressInfo.address"
                      @focus="errors.remove('address','addressForm');addressErrMsg=''"/>
            <p class="error" v-if="errors.has('addressForm.address')||addressErrMsg">
              {{errors.first('addressForm.address')||addressErrMsg}}
            </p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>备注</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="remark"
                      v-validate="'required'" :placeholder="`${currentOperatingItem.name}的钱包备注`"
                      v-model="addressInfo.remark" data-vv-scope="addressForm"
                      @focus="errors.remove('remark','addressForm')"/>
            <p class="error" v-if="errors.has('addressForm.remark')">
              {{errors.first('addressForm.remark')}}
            </p>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>验证方式</dt>
          <dd>
            <el-select v-model="verifyMethod" placeholder="请选择验证方式" class="drop-down-box" style="width: 100%;">
              <el-option v-for="item in modeList" :key="item.value"
                         :label="item.label" :value="item.value"/>
            </el-select>
          </dd>
        </dl>
        <dl class="form-group input-group">
          <dt>{{verifyMethod===1?'短信验证':'邮箱验证'}}</dt>
          <dd>
            <el-row :gutter="4">
              <el-col :span="16">
                <el-input class="padding-horizontal-10" :placeholder="verifyMethod===1?'请输入短信验证码':'请输入邮箱验证码'"
                          name="verifyCode" v-validate="'required|code'" v-model="addressInfo.verifyCode"
                          data-vv-scope="addressForm" @focus="errors.remove('verifyCode','addressForm')"/>
              </el-col>
              <el-col :span="8">
                <el-button type="text" size="medium" :disabled="sendCodeBtnDisabled"
                           :loading="sendCodeBtnLoading" @click="sendVerifyCode">
                  {{sendCodeBtnText}}
                </el-button>
              </el-col>
            </el-row>
            <p class="error" v-if="errors.has('addressForm.verifyCode')">{{errors.first('addressForm.verifyCode')}}</p>
          </dd>
        </dl>
        <dl class="form-group input-group" v-if="!currentOperatingItem.address">
          <dt>谷歌验证</dt>
          <dd>
            <el-input class="padding-horizontal-10" name="code"
                      v-validate="'required|code'" placeholder="请输入6位数验证码"
                      v-model="addressInfo.code" data-vv-scope="addressForm"
                      @focus="errors.remove('code','addressForm')"/>
            <p class="error" v-if="errors.has('addressForm.code')">
              {{errors.first('addressForm.code')}}
            </p>
          </dd>
        </dl>
      </form>
      <div slot="footer" v-if="!currentOperatingItem.address">
        <el-button type="primary" @click="addAddress()" :loading="addressFormBtnLoading">提交</el-button>
      </div>
      <div slot="footer" v-else>
        <el-button type="default">返回</el-button>
        <el-button type="primary" @click="safeAddressBefore()">下一步</el-button>
      </div>
    </el-dialog>

    <el-dialog title="绑定邮箱" :visible.sync="bindEmailDialog" width="420px"
               @close="errors.clear('emailBindForm')" custom-class="custom">
      <form class="form-wrap" data-vv-scope="emailBindForm" @submit.prevent>
        <label>
          <span>您的邮箱</span>
          <input v-model="emailInfo.email" type="text" name="email" v-validate="'required|email'"
                 @focus="errors.remove('email','emailBindForm')"
                 placeholder="输入您常用的邮箱账号">
          <p class="err-info" v-show="errors.has('emailBindForm.email')">{{errors.first('emailBindForm.email')}}</p>
        </label>
        <label class="clearfix">
          <span>验证码</span>
          <input name="code" v-validate="'required|code'" @focus="errors.remove('code','emailBindForm')"
                 class="code-ipt left" v-model="emailInfo.code"
                 type="text"
                 placeholder="输入6位数验证码" maxlength="6">
          <el-button :disabled="emailInfo.email == '' || sendCodeBtnDisabled2"
                     @click="sendCode('email',5,2)" class="send-code left"
                     type="text" :loading="sendCodeBtnLoading2">{{sendCodeBtnText2}}
          </el-button>
          <p class="left err-info" v-show="errors.has('emailBindForm.code')">{{errors.first('emailBindForm.code')}}</p>
        </label>
        <label v-if="!info.hasPassword">
          <span>设置密码</span>
          <input v-model="emailInfo.password" type="password" name="password" v-validate="'required|password'"
                 @focus="errors.remove('password','emailBindForm')"
                 placeholder="密码最少8个字符">
          <p class="err-info" v-show="errors.has('emailBindForm.password')">
            {{errors.first('emailBindForm.password')}}</p>
        </label>
        <label v-if="!info.hasPassword">
          <span>重复密码</span>
          <input v-model="emailInfo.repeatPassword" v-validate="{ 'required': true, 'confirmed': emailInfo.password }"
                 @focus="errors.remove('repeatPassword','emailBindForm')"
                 type="password" name="repeatPassword"
                 placeholder="重复输入密码">
          <p class="err-info" v-show="errors.has('emailBindForm.repeatPassword')">
            {{errors.first('emailBindForm.repeatPassword')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bind('email')" :disabled="requiredForm(emailInfo)"
                   :loading="submitBtnLoading">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="绑定手机" :visible.sync="bindPhoneDialog" width="420px"
               @close="errors.clear('phoneBindForm')" custom-class="custom">
      <form class="form-wrap" data-vv-scope="phoneBindForm" @submit.prevent>
        <div class="label">
          <span>您的手机</span>
          <div class="clearfix">
            <el-select class="county-area left" v-model="phoneInfo.area" placeholder="请选择">
              <el-option style="width:190px;" v-for="item in cities"
                         :key="item.name" :label="item.code" :value="item.code">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">{{ item.code }}</span>
              </el-option>
            </el-select>
            <input v-validate="'required|phone'" @focus="errors.remove('phone','phoneBindForm')" name="phone"
                   placeholder="输入您常用的手机号码" v-model="phoneInfo.phoneNumber" class="input-with-phone left">
          </div>
          <p class="err-info left" v-show="errors.has('phoneBindForm.phone')">
            {{errors.first('phoneBindForm.phone')}}</p>
        </div>
        <label class="clearfix">
          <span>验证码</span>
          <input v-validate="'required|code'" class="code-ipt left" v-model="phoneInfo.code"
                 type="text" name="code" @focus="errors.remove('code','phoneBindForm')"
                 placeholder="输入6位数验证码" maxlength="6">
          <el-button :disabled="phoneInfo.phoneNumber == '' || sendCodeBtnDisabled3"
                     @click="sendCode('phone',6,3)"
                     class="send-code left" type="text" :loading="sendCodeBtnLoading3">{{sendCodeBtnText3}}
          </el-button>
          <p class="err-info left" v-show="errors.has('phoneBindForm.code')">{{errors.first('phoneBindForm.code')}}</p>
        </label>
        <label v-if="!info.hasPassword">
          <span>设置密码</span>
          <input v-model="phoneInfo.password" type="password" name="password" v-validate="'required|password'"
                 @focus="errors.remove('password','phoneBindForm')"
                 placeholder="密码最少8个字符">
          <p class="err-info" v-show="errors.has('phoneBindForm.password')">
            {{errors.first('phoneBindForm.password')}}</p>
        </label>
        <label v-if="!info.hasPassword">
          <span>重复密码</span>
          <input v-model="phoneInfo.repeatPassword" v-validate="{ 'required': true, 'confirmed': phoneInfo.password }"
                 @focus="errors.remove('repeatPassword','phoneBindForm')"
                 type="password" name="repeatPassword"
                 placeholder="重复输入密码">
          <p class="err-info" v-show="errors.has('phoneBindForm.repeatPassword')">
            {{errors.first('phoneBindForm.repeatPassword')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bind('phone')" :disabled="requiredForm(phoneInfo)"
                   :loading="submitBtnLoading">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="realNameAuthDialog" width="420px"
               @close="errors.clear('realNameForm')" custom-class="custom">
      <p class="dialog-title" slot="title">
        <strong>实名认证</strong>
        <small>认证成功后，不可修改实名信息</small>
      </p>
      <form class="form-wrap" data-vv-scope="realNameForm" @submit.prevent>
        <label>
          <span>真实姓名</span>
          <input v-validate="'required'" v-model="realNameInfo.name" type="text" name="name"
                 placeholder="输入您的真实姓名" @focus="errors.remove('name','realNameInfo')">
          <p class="err-info" v-show="errors.has('realNameForm.name')">{{errors.first('realNameForm.name')}}</p>
        </label>
        <label>
          <span>身份证</span>
          <input v-validate="'required|idCard'" v-model="realNameInfo.IDCard" type="text" name="idCard"
                 placeholder="输入您的身份证号码" @focus="errors.remove('idCard','realNameForm')" maxlength="18">
          <p class="err-info" v-show="errors.has('realNameForm.idCard')">{{errors.first('realNameForm.idCard')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="realNameAuth" :disabled="requiredForm(realNameInfo)"
                   :loading="realNameAuthBtnLoading">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="bindBankcardDialog" width="420px"
               @close="errors.clear('bankcardForm')" custom-class="custom">
      <p class="dialog-title" slot="title">
        <strong>添加银行卡</strong>
        <small>认证成功后，不可修改银行卡信息</small>
      </p>
      <form class="form-wrap" data-vv-scope="bankcardForm" @submit.prevent>
        <label>
          <span>真实姓名</span>
          <input v-if="!info.userName" v-validate="'required'" v-model="bankcardInfo.name" type="text" name="name"
                 placeholder="请填写您的真实姓名" @focus="errors.remove('name','bankcardForm')"/>
          <p v-if="info.userName" class="has-info">{{info.userName}}</p>
          <p v-if="!info.userName" class="err-info" v-show="errors.has('bankcardForm.name')">
            {{errors.first('bankcardForm.name')}}</p>
        </label>
        <label>
          <span>身份证</span>
          <input v-if="!info.idCard" v-validate="'required|idCard'" v-model="bankcardInfo.IDCard" type="text"
                 name="idCard" placeholder="请填写您的身份证号码"
                 @focus="errors.remove('idCard','bankcardForm')" maxlength="18"/>
          <p v-if="info.idCard" class="has-info">{{info.idCard}}</p>
          <p v-if="!info.idCard" class="err-info" v-show="errors.has('bankcardForm.idCard')">
            {{errors.first('bankcardForm.idCard')}}</p>
        </label>
        <label>
          <span>银行卡号</span>
          <input v-validate="'required|bankcard'" v-model="bankcardInfo.bankcard" type="text" name="bankcard"
                 placeholder="输入卡号会智能识别银行" @focus="errors.remove('bankcard','bankcardForm')"
                 @input="bankcardInputHandler($event)"/>
          <p class="err-info" v-show="errors.has('bankcardForm.bankcard')">{{errors.first('bankcardForm.bankcard')}}</p>
        </label>
        <label>
          <span>预留手机</span>
          <input v-validate="'required|phone'" v-model="bankcardInfo.phone" type="text" name="phone"
                 placeholder="请输入您的银行预留手机号" @focus="errors.remove('phone','bankcardForm')"/>
          <p class="err-info" v-show="errors.has('bankcardForm.phone')">{{errors.first('bankcardForm.phone')}}</p>
        </label>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBindBankcard" :disabled="bankcardInfoDisabled"
                   :loading="bankcardLoading">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="checkAddressDialog" width="420px" custom-class="custom"
               :title="`${currentOperatingItem.name}提现地址`">
      <div class="check-addresslist clearfix" v-for="(item,idx) in currentOperatingItem.addressList" :key="idx">
        <div class="left">地址{{idx+1}}</div>
        <div class="left">
          <h3>{{item.remark}}</h3>
          <p>
            <span class="check-address">{{item.address}}</span>
            <span class="check-copy" v-clipboard:copy="item.address" v-clipboard:success="onCopy">复制</span>
          </p>
        </div>
      </div>
      <div class="check-addressbtn">
        <el-button type="primary" :disabled="isDisabledAddressAdd" @click="checkAddressclick()">
          新增地址
        </el-button>
      </div>
      <div class="check-addresstip">{{checkAddressTip}}</div>
    </el-dialog>
    <el-dialog :visible.sync="safeVertifyDialog" title="安全验证" width="420px" custom-class="custom">
      <form @submit.prevent class="form-wrap" data-vv-scope="safeVertifyForm">
        <div class="label">
          <span>验证方式</span>
          <el-select v-model="verifyMethod" placeholder="请选择验证方式" class="drop-down-box">
            <el-option v-for="item in modeList" :key="item.value"
                       :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <label class="clearfix">
          <span>验证码</span>
          <input name="verifyCode" v-validate="'required|code'" @focus="errors.remove('verifyCode','safeVertifyForm')"
                 class="code-ipt left address"
                 v-model="addressInfo.safecode" type="text"
                 :placeholder="`输入${verifyMethod == 0 ? '邮箱': '短信' }中的验证码`" maxlength="6">
          <el-button class="send-code left address" type="text"
                     :disabled="sendCodeBtnDisabled4" :loading="sendCodeBtnLoading4"
                     @click="sendCode('currency',8,4)">{{sendCodeBtnText4}}
          </el-button>
          <p class="err-info left" v-show="errors.has('safeVertifyForm.verifyCode')">
            {{errors.first('safeVertifyForm.verifyCode')}}</p>
        </label>
        <div class="label">
          <span>谷歌验证</span>
          <el-input class="padding-horizontal-10" name="code"
                    v-validate="'required|code'" placeholder="请输入6位数验证码"
                    v-model="addressInfo.code"
                    @focus="errors.remove('code','safeVertifyForm')"/>
          <p class="error" v-if="errors.has('safeVertifyForm.code')">
            {{errors.first('safeVertifyForm.code')}}
          </p>
        </div>
      </form>
      <div slot="footer">
        <el-button>上一步</el-button>
        <el-button type="primary" @click="addAddress()">提交申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import CommonApi from '../../services/common-api';
  import UserApi from '../../services/user-api';
  import SignApi from '../../services/sign-api';
  import userBankApi from '../../services/userbank-api';
  import AppConfig from '../../config';
  import {SET_USER_INFO} from '../../store/mutation-types';
  import {mapState} from 'vuex';
  import errorHandler from '../../services/error-handler';
  import {toPromise, hideEmail, replacePos} from '../../utils';

  export default {
    breadcrumb() {
      return {
        label: '安全中心',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    computed: {
      ...mapState({info: 'userInfo'}),
      bankcardInfoDisabled() {
        if (this.info.idCard) {
          return this.requiredForm({bankcard: this.bankcardInfo.bankcard, phone: this.bankcardInfo.phone});
        } else {
          return this.requiredForm(this.bankcardInfo);
        }
      },
      pwdFormDisabled() {
        const form = this.passwordForm;
        if (this.info.hasPassword) {
          return !(form.code && form.oldPassword && form.newPassword && form.repeatPassword);
        } else {
          return !(form.code && form.newPassword && form.repeatPassword);
        }
      },
      isDisabledAddressAdd() {
        let addressInfo = this.currentOperatingItem;
        return addressInfo.todayAdded || (addressInfo.addressList || []).length > 5;
      },
      checkAddressTip() {
        let addressInfo = this.currentOperatingItem;
        if (addressInfo.todayAdded) {
          return `今日已添加过${addressInfo.name}地址`;
        } else if (addressInfo.addressList && addressInfo.addressList.length > 5) {
          return '每个币种只能添加五个地址';
        } else {
          return '每日每个币种仅能添加一个地址';
        }
      },
      currencyList() {
        let currencyInfos = JSON.parse(this.info.address || '[]');
        currencyInfos.sort((a, b) => a.currencyId - b.currencyId);
        return currencyInfos;
      }
    },
    data() {
      return {
        replacePos,
        hideEmail,
        addressDialogVisible: false,
        addressFormBtnLoading: false,
        addressInfo: {},
        currentOperatingItem: {},
        changePasswordDialog: false,
        addAddressDialog: false,
        bindEmailDialog: false,
        bindPhoneDialog: false,
        realNameAuthDialog: false,
        checkAddressDialog: false,
        safeVertifyDialog: false,
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: '',
          code: ''
        },
        //验证方式  0:邮箱 1:短信
        verifyMethod: 1,
        emailInfo: {
          code: '',
          email: '',
          repeatPassword: '',
          password: ''
        },
        phoneInfo: {
          phoneNumber: '',
          area: '+86',
          code: '',
          repeatPassword: '',
          password: ''
        },
        realNameInfo: {
          name: '',
          IDCard: ''
        },
        cities: [],
        code: '',
        config: AppConfig,
        codeToken: '',
        //loading
        sendCodeBtnText: '发送验证码',
        sendCodeBtnLoading: false,
        sendCodeBtnDisabled: false,
        bindAddressCodeToken: '',
        sendCodeBtnLoading1: false,
        sendCodeBtnText1: '发送验证码',
        sendCodeBtnDisabled1: false,
        sendCodeBtnLoading2: false,
        sendCodeBtnDisabled2: false,
        sendCodeBtnText2: '发送验证码',
        sendCodeBtnLoading3: false,
        sendCodeBtnDisabled3: false,
        sendCodeBtnText3: '发送验证码',
        sendCodeBtnLoading4: false,
        sendCodeBtnText4: '发送验证码',
        sendCodeBtnDisabled4: false,
        timer1: null,
        timer2: null,
        timer3: null,
        submitBtnLoading: false,
        realNameAuthBtnLoading: false,
        passwordFormBtnLoading: false,
        modeList: [],
        bindBankcardDialog: false,
        bankcardInfo: {
          name: '',
          IDCard: '',
          bankcard: '',
          phone: ''
        },
        bankcardLoading: false,
        addressErrMsg: ''
      };
    },
    methods: {
      hasAddress(item) {
        return item.addressList && item.addressList.length > 0;
      },
      showAddressDialog(item) {
        this.currentOperatingItem = item;
        if (this.hasAddress(item)) {
          return this.checkAddressDialog = true;
        }
        if (!this.info.googleKey) {
          return this.$message({
            type: 'warning',
            message: '还没有绑定谷歌验证器,先去绑定吧。',
            showClose: true
          });
        }
        this.addressDialogVisible = true;
      },
      closeAddressDialogHandler() {
        this.errors.clear('addressForm');
        this.addressErrMsg = '';
        this.sendCodeBtnText = '发送验证码';
      },
      sendVerifyCode() {
        const userInfo = this.info;
        const countryNum = userInfo.countryNum;
        const account = this.verifyMethod === 1 ? userInfo.moblie : userInfo.mailboxAccount;
        this.sendCodeBtnLoading = true;
        this.sendCodeBtnDisabled = true;
        const currencyName = this.currentOperatingItem.name;
        UserApi.smsCode({countryNum, account, type: 9, currencyName})
          .then(res => res || {})
          .then(res => res.result || '')
          .then(codeToken => {
            this.bindAddressCodeToken = codeToken;
            this.$message.success('发送成功');
            this.sendCodeBtnLoading = false;
            let t = 60;
            this.sendCodeBtnText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeBtnText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(error => {
            this.$message.error(error.msg);
            this.sendCodeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeBtnText = '重新发送';
          });
      },
//      hidePhone(str, start, end) {
//        let endStr = str.substr(end);
//        let startStr = str.substring(0, start);
//        return startStr + '*'.repeat(end - start) + endStr;
//      },
//      hideEmail(str, start) {
//        let arr = str.split('@');
//        let startStr = str.substring(0, start);
//        return startStr + '*'.repeat(arr[0].length - start) + '@' + arr[1];
//      },
      requiredForm(obj, isSendCode) {
        for (let key in obj) {
          if (key === 'code' && isSendCode) continue;
          if ((obj[key] || '').trim() === '') {
            return true;
          }
        }
        return false;
      },
      getCountyCode() {
        CommonApi.country()
          .then(data => {
            this.cities = data || [];
          });
      },
      bankcardInputHandler(e) {
        let val = e.target.value;
        this.$nextTick(() => {
          this.bankcardInfo.bankcard =
            val
              .replace(/([\u4E00-\u9FA5]|[A-Za-z])+/g, '')
              .replace(/(\s|[^\d])/g, '')
              .replace(/(\d{4})(?=\d)/g, '$1 ')
              .slice(0, 23);
        });
      },
      getUserInfo() {
        UserApi.userInfo()
          .then(res => res || {})
          .then(res => {
            this.$store.commit(SET_USER_INFO, res);
            this.getModeList(res);
            if (!this.info.hasPassword) {
              this.$set(this.emailInfo, 'password', '');
              this.$set(this.emailInfo, 'repeatPassword', '');
              this.$set(this.phoneInfo, 'password', '');
              this.$set(this.phoneInfo, 'repeatPassword', '');
              this.$delete(this.passwordForm, 'oldPassword');
            } else {
              this.$delete(this.emailInfo, 'password');
              this.$delete(this.emailInfo, 'repeatPassword');
              this.$delete(this.phoneInfo, 'password');
              this.$delete(this.phoneInfo, 'repeatPassword');
              this.$set(this.passwordForm, 'oldPassword', '');
            }
          });
      },
      getModeList(res) {
        this.modeList = [];
        if (res.moblie) {
          this.modeList.push({
            type: '手机验证',
            label: '手机验证   ' + (res.countryNum ? res.countryNum + ' ' : '') + replacePos(res.moblie, '*', 3, 7),
            value: 1
          });
          // this.mode = 1;
        }
        if (res.mailboxAccount) {
          this.modeList.push({
            type: '邮箱验证',
            label: '邮箱验证   ' + hideEmail(res.mailboxAccount),
            value: 0
          });
          // this.mode = 0;
        }
        this.verifyMethod = this.modeList[0].value;

      },
      // showAddAddress(sign) {
      //   if (!this.info.googleKey) {
      //     this.$message({
      //       type: 'warning',
      //       message: '还没有绑定谷歌验证器,先去绑定吧。',
      //       showClose: true
      //     });
      //     return;
      //   }
      //   this.sign = sign;
      //   this[sign + 'AddAddressDialog'] = true;
      // },
      safeAddressBefore() {
        this.$validator.validateAll('addressForm')
          .then(res => {
            if (res) {
              return Promise.resolve(res);
            }
            return Promise.reject(null);
          }).then(() => {
          this.addressDialogVisible = false;
          setTimeout(() => {
            this.safeVertifyDialog = true;
          }, 300);
        }).catch(err => {
          errorHandler(err);
        });
      },
      addAddress() {
        let dataScope;
        if (this.currentOperatingItem.address) {
          dataScope = 'safeVertifyForm';
        } else {
          dataScope = 'addressForm';
        }
        this.$validator.validateAll(dataScope)
          .then(result => {
            if (result) {
              return result;
            }
            return Promise.reject(null);
          })
          .then(() => {
            const {currencyId} = this.currentOperatingItem;
            const {address} = this.addressInfo;
            // 钱包地址检查
            return UserApi.walletAddressCheck(currencyId, address);
          })
          .then(res => {
            if (res === 'true') {
              return res;
            }
            this.addressErrMsg = '您已添加过该地址';
            return Promise.reject(null);
          })
          .then(() => {
            const codeToken = this.bindAddressCodeToken;
            if (codeToken) {
              return codeToken;
            }
            return Promise.reject({msg: '请重新获取验证码'});
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
            this.$message.success('地址新增成功!');
            this.getUserInfo();
          })
          .catch(err => {
            this.addressFormBtnLoading = false;
            errorHandler(err);
          });
      },
      sendCode(msg, type, num) {
        let params = {
          countryNum: '',
          account: '',
          type: type
        }, promise = null;
        if (msg === 'email') {
          promise = this.$validator.validate('emailBindForm.email').then(result => {
            if (result) {
              params.account = this.emailInfo.email;
            } else {
              return Promise.reject();
            }
          });
        } else if (msg === 'currency') {
          let promise = Promise.resolve();
          if (this.verifyMethod === 1) {
            params.countryNum = this.info.countryNum;
            params.account = this.info.moblie;
          } else {
            params.countryNum = '';
            params.account = this.info.mailboxAccount;
          }
        } else if (msg === 'phone') {
          promise = this.$validator.validate('phoneBindForm.phone').then(result => {
            if (result) {
              params.countryNum = this.phoneInfo.area;
              params.account = this.phoneInfo.phoneNumber;
            } else {
              return Promise.reject();
            }
          });
        } else if (msg === 'password') {
          let validataArr = [this.$validator.validate('passwordForm.password'), this.$validator.validate('passwordForm.repeatPassword')];
          if (this.info.hasPassword) {
            validataArr.push(this.$validator.validate('passwordForm.oldPassword'));
          }

          promise = Promise.all(validataArr)
            .then(res => {
              if (res.every(item => item === true)) {
                if (this.verifyMethod === 1) {
                  params.countryNum = this.info.countryNum;
                  params.account = this.info.moblie;
                } else {
                  params.countryNum = '';
                  params.account = this.info.mailboxAccount;
                }
                return Promise.resolve();
              }
              return Promise.reject();
            });
        }
        promise
          .then(() => {
            this['sendCodeBtnLoading' + num] = true;
            this['sendCodeBtnText' + num] = '';
            return UserApi.smsCode(params);
          })
          .then(res => res || {})
          .then(res => res.result || '')
          .then(res => {
            this.$message.success('发送成功');
            this.codeToken = res;
            this['sendCodeBtnLoading' + num] = false;
            this['sendCodeBtnDisabled' + num] = true;
            let t = 60;
            this['sendCodeBtnText' + num] = t + 's';
            this['timer' + num] = setInterval(() => {
              t--;
              this['sendCodeBtnText' + num] = t + 's';
              if (t < 0) {
                this['sendCodeBtnDisabled' + num] = false;
                this['sendCodeBtnText' + num] = '重新发送';
                clearInterval(this['timer' + num]);
              }
            }, 1000);
          })
          .catch(error => {
            errorHandler(error);
            this['sendCodeBtnLoading' + num] = false;
            this['sendCodeBtnDisabled' + num] = false;
            this['sendCodeBtnText' + num] = '重新发送';
          });
      },
      bind(type) {
        this.$validator.validateAll(type + 'BindForm')
          .then(toPromise)
          .then(() => {
            if (this.codeToken == '') {
              this.$alert('缺少codeToken,请稍后重新发送验证码。', '警告', {
                confirmButtonText: '确定',
                type: 'warning'
              });
              return Promise.reject(null);
            }
            this.submitBtnLoading = true;
            let params = type == 'email' ? {
              mobile: this.info.moblie,
              email: this.emailInfo.email,
              password: '',
              code: this.emailInfo.code,
              codeToken: this.codeToken
            } : {
              mobile: this.phoneInfo.phoneNumber,
              email: this.info.mailboxAccount,
              password: '',
              code: this.phoneInfo.code,
              codeToken: this.codeToken
            };
            if (!this.info.hasPassword) {
              params.password = this.emailInfo.password || this.phoneInfo.password;
            }
            UserApi.bindAccount(params)
              .then(() => {
                this.getUserInfo();
                this.$message({
                  type: 'success',
                  message: '绑定成功!',
                  showClose: true
                });
                if (type == 'phone') {
                  this.$store.commit(SET_USER_INFO, {moblie: this.phoneInfo.phoneNumber});
                } else {
                  this.$store.commit(SET_USER_INFO, {mailboxAccount: this.phoneInfo.phoneNumber});
                }
                this.bindEmailDialog = false;
                this.bindPhoneDialog = false;
                this.submitBtnLoading = false;
              })
              .catch(error => {
                if (!error) return;
                this.submitBtnLoading = false;
                this.$message({
                  type: 'error',
                  message: error.msg,
                  showClose: true
                });
              });
          }).catch(() => {
        });
      },
      changePassword() {
        this.$validator.validateAll('passwordForm')
          .then(toPromise)
          .then(() => {
            this.passwordFormBtnLoading = true;
            let params = {
              account: this.info.moblie ? this.info.moblie : this.info.mailboxAccount,
              password: this.passwordForm.oldPassword,
              newPassword: this.passwordForm.newPassword,
              code: this.passwordForm.code,
              codeToken: this.codeToken
            };
            let promise = null;
            if (this.info.hasPassword) {
              promise = UserApi.passwordByOld(params);
            } else {
              promise = SignApi.password(params.account, params.newPassword, params.code, params.codeToken);
            }
            promise.then(() => {
              this.passwordFormBtnLoading = false;
              this.changePasswordDialog = false;
              this.getUserInfo();
              this.$message({
                type: 'success',
                message: '修改密码成功!',
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
      realNameAuth() {
        this.$validator.validateAll('realNameForm')
          .then(toPromise)
          .then(() => {
            this.realNameAuthBtnLoading = true;
            return UserApi.certify({name: this.realNameInfo.name, id: this.realNameInfo.IDCard});
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '实名认证成功!',
              showClose: true
            });
            this.realNameAuthBtnLoading = false;
            this.realNameAuthDialog = false;
            this.getUserInfo();
          })
          .catch(error => {
            this.realNameAuthBtnLoading = false;
            if (!error) return;
            this.$message({
              type: 'error',
              message: error.msg,
              showClose: true
            });
          });
      },
      goBindAuth() {
        if (!this.info.googleKey) {
          this.$router.push('/i/auth');
        }
      },
      goBindBankcard() {
        this.$validator.validateAll('bankcardForm')
          .then(toPromise)
          .then(() => {
            this.bankcardLoading = true;
            let params = {
              mobile: this.bankcardInfo.phone,
              realName: this.bankcardInfo.name || this.info.userName || '',
              cardNo: this.bankcardInfo.IDCard || this.info.idCard || '',
              bankCardNo: this.bankcardInfo.bankcard.split(' ').join('')
            };
            return userBankApi.sendVerifyCode(params);
          })
          .then(() => {
            this.bankcardLoading = false;
            this.bindBankcardDialog = false;
            this.$message({
              type: 'success',
              message: '绑定银行卡成功!',
              showClose: true
            });
            this.getUserInfo();
          })
          .catch(err => {
            this.bankcardLoading = false;
            errorHandler(err);
          });
      },
      onCopy() {
        this.$notify({
          title: '成功',
          message: '复制成功，去分享',
          type: 'success'
        });
      },
      checkAddressclick() {
        this.checkAddressDialog = false;
        setTimeout(() => {
          this.addressDialogVisible = true;
        }, 300);
      }
    },
    created() {
      this.getCountyCode();
      this.getUserInfo();
    },
    beforeDestroy() {
      clearInterval(this.timer1);
      clearInterval(this.timer2);
      clearInterval(this.timer3);
    }
  };
</script>
<style scoped lang="scss">
  @import "../../assets/style/form";

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
    padding-bottom: 20px;
    padding-left: 35px;
    border-bottom: 1px solid #EDEEF0;

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

        p {
          line-height: 32px;
          color: #303137;
        }

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
      }
    }

    button {
      margin-top: 7px;
    }
  }

  .form-wrap {
    .err-info {
      min-height: 20px;
      font-size: 12px;
      color: #f95453;
      line-height: 20px;
      margin-top: -20px;
      position: relative;
      top: 20px;
    }
    .has-info {
      line-height: 36px;
      height: 36px;
      font-size: 14px;
      color: #303137;
    }
    label, .label {
      margin-bottom: 20px;
      display: block;
      position: relative;
      padding-left: 74px;
      .drop-down-box {
        width: 100%;
      }
      > span,
      .drop-tag {
        left: 0;
        top: 0;
        line-height: 36px;
        font-size: 14px;
        color: #303137;
        position: absolute;
      }
      > input {
        height: 36px;
        line-height: 34px;
        border: 1px solid #EDEEF0;
        font-size: 12px;
        padding: 0 10px;
        width: 100%;
        transition: all 0.5s;
        &::-webkit-input-placeholder {
          color: #CCCDCF;
        }
        &:focus,
        &:hover {
          border-color: #ccc;
        }
      }
      .code-ipt {
        width: calc(100% - 84px);
        &.address {
          width: 100%;
        }
      }
      .send-code.address span {
        padding-left: 10px;
        border-left: 1px solid #E3EAF1;
        font-size: 12px;
      }
      .send-code {
        width: 84px;
        min-width: 84px;
        &.address {
          position: absolute;
          right: 15px;
          font-size: 12px;
        }
      }
    }
  }

  .dialog-title {
    strong {
      font-size: 18px;
      color: #303133;
      margin-right: 15px;
      font-weight: normal;
    }
    small {
      font-size: 12px;
      color: #999;
    }
  }

  .checked {
    font-weight: bold;
  }

  .county-area {
    width: 80px;
    position: relative;
    &:focus,
    &:hover {
      z-index: 2;
    }
  }

  .input-with-phone {
    position: relative;
    left: -1px;
    width: calc(100% - 80px);
    height: 36px;
    line-height: 34px;
    border: 1px solid #EDEEF0;
    font-size: 12px;
    padding: 0 10px;
    transition: all 0.5s;
    &::-webkit-input-placeholder {
      color: #CCCDCF;
    }
    &:focus,
    &:hover {
      border-color: #ccc;
    }
  }

  .check-addresslist {
    margin-bottom: 20px;
    div:first-child {
      font-size: 14px;
      color: #606166;
      margin-right: 20px;
    }
    h3 {
      font-size: 14px;
      color: #303137;
    }
    div:last-child {
      p {
        font-size: 12px;
        max-width: 288px;
        word-wrap: break-word;
      }
    }
  }

  .check-addressbtn, .check-addresstip {
    margin-left: 57px;
  }

  .check-addressbtn .el-button {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding: 0;
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
</style>
<style lang="scss">
  .custom-loading-color {
    i {
      color: #4D87EA;
    }
    .el-loading-spinner .el-loading-text {
      color: #4D87EA;
    }
  }

  .county-area {
    .el-input__inner {
      border-radius: 0;
      background: none;
      border-color: #EDEEF0;
      &:focus,
      &:hover {
        z-index: 2;
        border-color: #ccc;
        background: none;
      }
    }
  }

</style>
