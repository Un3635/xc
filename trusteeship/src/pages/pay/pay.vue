<template>
  <div class="page">
    <div class="page-container">
      <el-row class="order-info">
        <el-col :span="16">
          <p :class="{'recharge-order':isRecharge}">订单提交成功，请尽快付款，订单号：{{orderInfo.orderNo}}</p>
          <p class="order-tips" v-if="!isRecharge">订单已提交成功，请在24小时内完成付款，否则订单将会过期</p>
        </el-col>
        <el-col :span="8" class="text-right">应付总金额<em class="money">{{orderInfo.amount | currency}}</em>元</el-col>
      </el-row>
      <div class="pay-methods">
        <ul class="pay-methods-list">
          <li :class="itemClassList(PaymentMethods.ACCOUNT_BALANCE)" v-if="!isRecharge"
              @click="choosePayMethod(PaymentMethods.ACCOUNT_BALANCE)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.ACCOUNT_BALANCE"/>
            <img src="../../assets/images/icon/balance.png" alt="">
            <span class="name">账户余额</span>
            <span class="recommend" v-if="PaymentMethods.ACCOUNT_BALANCE===defaultPayMethod">推荐</span>
            <span class="txt">可用余额{{accountBalance|currency}}元</span>
          </li>
          <li :class="itemClassList(PaymentMethods.ALIPAY)"
              @click="choosePayMethod(PaymentMethods.ALIPAY)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.ALIPAY"/>
            <img src="../../assets/images/icon/alipay.png" alt="">
            <span class="name">支付宝</span>
            <span class="recommend" v-if="PaymentMethods.ALIPAY===defaultPayMethod">推荐</span>
          </li>
          <li :class="itemClassList(PaymentMethods.WECHAT)"
              @click="choosePayMethod(PaymentMethods.WECHAT)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.WECHAT"/>
            <img src="../../assets/images/icon/WeChat_pay.svg" alt="">
            <span class="name">微信支付</span>
          </li>
          <li :class="itemClassList(PaymentMethods.QUICK_PAY)"
              @click="choosePayMethod(PaymentMethods.QUICK_PAY)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.QUICK_PAY"/>
            <span v-if="userInfo.isBindBankCard">
              <img :src="bankCardInfo.logo" alt="">
              <span class="name">{{userInfo.bankName}}</span>
              <span class="txt">储蓄卡({{(userInfo.bankCardNo||'').slice(-4)}})</span>
              <span class="txt">单笔限额{{bankCardInfo.singleLimit|currency}}元&nbsp;|&nbsp;每日限额{{bankCardInfo.dailyLimit|currency}}元</span>
            </span>
            <span v-else>
              <img src="../../assets/images/icon/quick-pay.jpg" alt="">
              <span class="name">快捷支付</span>
              <span v-if="!userInfo.isBindBankCard" class="right btn-add"
                    @click="bindCardDialogVisible=true">添加银行卡</span>
            </span>
          </li>
          <li :class="itemClassList(PaymentMethods.INTERNET_BANK)"
              @click="choosePayMethod(PaymentMethods.INTERNET_BANK)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.INTERNET_BANK"/>
            <img src="../../assets/images/icon/e-bank.png" alt="">
            <span class="name">网银支付</span>
            <span class="txt">大额在线支付，实时到账</span>
          </li>
          <li :class="itemClassList(PaymentMethods.TRANSFER)"
              @click="choosePayMethod(PaymentMethods.TRANSFER)">
            <el-checkbox disabled v-model="paymentMethod" :true-label="PaymentMethods.TRANSFER"/>
            <img src="../../assets/images/icon/transfer-accounts.png" alt="">
            <span class="name">对公转账</span>
            <span class="txt">线下转账，延时到账</span>
          </li>
        </ul>
      </div>
      <div class="pay-info">
        <div class="pay-online" v-if="paymentMethod===PaymentMethods.ACCOUNT_BALANCE">
          <el-button type="primary" @click="payBalance">在线支付</el-button>
        </div>
        <div class="pay-online" v-if="paymentMethod===PaymentMethods.QUICK_PAY">
          <el-button v-if="userInfo.isBindBankCard" type="primary" @click="goPayQuickNext">下一步</el-button>
          <el-button v-if="!userInfo.isBindBankCard" type="primary" @click="bindCardDialogVisible=true">下一步</el-button>
        </div>
        <div class="pay-online" v-if="paymentMethod===PaymentMethods.INTERNET_BANK">
          <el-button type="primary" @click="payOnline">在线支付</el-button>
        </div>
        <div class="pay-offline" v-if="paymentMethod===PaymentMethods.TRANSFER">
          <div class="pay-offline__container">
            <ul>
              <li class="step">
                <h4>1. 打款至挖链网指定收款账户</h4>
                <div class="step-content">
                  <dl class="receive-info">
                    <div class="receive-info__item">
                      <dt>开户名称</dt>
                      <dd>上海挖链科技有限公司</dd>
                    </div>
                    <div class="receive-info__item">
                      <dt>开户银行</dt>
                      <dd>平安银行 上海新天地支行</dd>
                    </div>
                    <div class="receive-info__item">
                      <dt>汇款账户</dt>
                      <dd>1500 0091 5738 45</dd>
                    </div>
                    <div class="receive-info__item">
                      <dt>汇款金额</dt>
                      <dd>{{orderInfo.amount | currency}}元</dd>
                    </div>
                  </dl>
                </div>
              </li>
              <li class="step">
                <h4>2. 提交汇款信息</h4>
                <div class="step-content">
                  <dl class="remit-info">
                    <div class="remit-info__item">
                      <dt>汇款人姓名</dt>
                      <dd>
                        <el-input :class="{'invalid':errors.has('$remitInfo.name')}" v-validate="'required'" name="name"
                                  data-vv-scope="$remitInfo"
                                  v-model="remitInfo.name" placeholder="请填写汇款人姓名"
                                  @focus="errors.remove('name','$remitInfo')"/>
                        <p class="error" v-if="errors.has('$remitInfo.name')">{{errors.first('$remitInfo.name')}}</p>
                      </dd>
                    </div>
                    <div class="remit-info__item">
                      <dt>汇款银行账号</dt>
                      <dd>
                        <el-input :class="{'invalid':errors.has('$remitInfo.bankcard')}"
                                  v-validate="'required|bankcard'" data-vv-scope="$remitInfo"
                                  name="bankcard" v-model="remitInfo.account"
                                  @focus="errors.remove('bankcard','$remitInfo')"
                                  placeholder="请填写汇款银行账号" @input="accountInputHandler"/>
                        <p class="error" v-if="errors.has('$remitInfo.bankcard')">
                          {{errors.first('$remitInfo.bankcard')}}</p>
                      </dd>
                    </div>
                    <div class="remit-info__item">
                      <dt>开户银行名称</dt>
                      <dd>
                        <el-input :class="{'invalid':errors.has('$remitInfo.bank')}" v-validate="'required'"
                                  name="bank" data-vv-scope="$remitInfo"
                                  v-model="remitInfo.bank" placeholder="请填写开户银行名称"
                                  @focus="errors.remove('bank','$remitInfo')"/>
                        <p class="error" v-if="errors.has('$remitInfo.bank')">{{errors.first('$remitInfo.bank')}}</p>
                      </dd>
                    </div>
                    <div class="remit-info__item">
                      <dt>汇款金额</dt>
                      <dd>{{orderInfo.amount | currency}}元</dd>
                    </div>
                    <div class="remit-info__item">
                      <dt>汇款时间</dt>
                      <dd>
                        <el-date-picker type="date" v-model="remitInfo.date" placeholder="选择日期"
                                        :picker-options="pickerOptions" :clearable=false :editable="false"/>
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
              <li class="step">
                <h4>3. 提交汇款成功截图（照片）</h4>
                <div class="step-content">
                  <div class="sc-tips">请上传汇款成功页面的截图或照片</div>
                  <el-upload :action="uploadUrl()" list-type="picture-card" :multiple="true" :limit="5"
                             :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload"
                             :on-error="uploadError" :on-success="uploadSuccess" :file-list="fileList" :data=extraData
                             :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <!--<div>支持格式 png、jpg、jpeg 文件大小 小于5MB</div>-->
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </li>
              <li class="step">
                <h4>4. 汇款核实</h4>
                <div class="step-content">
                  提交汇款信息后，您可以在
                  <router-link to="i/order">个人中心-我的订单</router-link>
                  中查看汇款处理进度，若有疑问请拨打咨询热线：400-865-6688
                </div>
              </li>
            </ul>
          </div>
          <div class="pay-submit">
            <p>请谨慎填写打款信息，提交后不可修改</p>
            <el-button type="primary" @click="payCharge">提交打款信息</el-button>
          </div>
        </div>
        <div class="pay-online" v-if="paymentMethod===PaymentMethods.ALIPAY">
          <el-button type="primary" @click="payAlipay">立即支付</el-button>
        </div>
        <div class="pay-online" v-if="paymentMethod===PaymentMethods.WECHAT">
          <el-button type="primary" @click="payWeChat" :loading="wechatPayBtnLoading"
                     :disabled="wechatPayBtnLoading">
            立即支付
          </el-button>
        </div>
      </div>
      <el-dialog width="420px" title="提示" :visible.sync="payDialogVisible">
        <div class="dialog-content">
          <img src="../../assets/images/warning.png" alt="">
          <h5>请您在新打开的页面上完成付款</h5>
          <p>付款完成前请不要关闭此窗口</p>
        </div>
        <div slot="footer">
          <el-button @click="payDialogVisible = false">选择其他付款方式</el-button>
          <el-button type="primary" @click="payOk">已完成付款</el-button>
        </div>
      </el-dialog>
      <el-dialog class="custom" width="420px" title="支付验证" :visible.sync="payValidationDialog">
        <form class="pay-validation" data-vv-scope="$codeForm" @submit.prevent>
          <label>
            <span>预留手机</span>
            <strong>{{quickFormInfo.phone ? quickFormInfo.phone : userInfo.bankMobile}}</strong>
          </label>
          <label class="clearfix">
            <span>验证码</span>
            <input placeholder="请输入短信验证码" class="left code-ipt" v-model="code" v-validate="'required|code'"
                   @focus="errors.remove('code','$codeForm')" name="code"/>
            <el-button :loading="codeBtnLoading" @click="sendCode" :disabled="sendCodeBtnDisabled"
                       class="right send-code" type="text">{{sendCodeText}}
            </el-button>
            <p class="err-info left" v-show="errors.has('$codeForm.code')">{{errors.first('$codeForm.code')}}</p>
          </label>
        </form>
        <div slot="footer">
          <el-button type="primary" @click="quickPayOk" :disabled="code.trim() == ''">确认支付</el-button>
        </div>
      </el-dialog>
      <el-dialog class="custom" width="420px" :visible.sync="bindCardDialogVisible">
        <h4 slot="title">快捷支付<span class="subhead">支付更快捷，一步验证，无需网银！</span></h4>
        <form @submit.prevent>
          <dl class="form-group input-group">
            <dt>真实姓名</dt>
            <dd>
              <el-input class="padding-horizontal-10" placeholder="请填写您的真实姓名" v-model="quickFormInfo.name"
                        data-vv-scope="$payQuick"
                        v-validate="'required'" name="name" @focus="errors.remove('name','$payQuick')"/>
              <p class="error" v-if="errors.has('$payQuick.name')">{{errors.first('$payQuick.name')}}</p>
            </dd>
          </dl>
          <dl class="form-group input-group">
            <dt>身份证号</dt>
            <dd>
              <el-input class="padding-horizontal-10" placeholder="请填写您的身份证号" v-model="quickFormInfo.idCard"
                        data-vv-scope="$payQuick"
                        v-validate="'required|idCard'" name="idCard"
                        @focus="errors.remove('idCard','$payQuick')"/>
              <p class="error" v-if="errors.has('$payQuick.idCard')">{{errors.first('$payQuick.idCard')}}</p>
            </dd>
          </dl>
          <dl class="form-group input-group">
            <dt>银行卡号
              <el-popover trigger="hover" placement="bottom-start" width="320"
                          content="填写以您自己姓名开户的储蓄卡。我们支持全国及各地方主要银行。填写银行卡号后会自动判别，并告知此卡能否开通快捷支付。">
                <i slot="reference" class="iconfont icon-help"></i>
              </el-popover>
            </dt>
            <dd>
              <el-input class="padding-horizontal-10" placeholder="请填写您的银行卡号" v-model="quickFormInfo.bankcard"
                        data-vv-scope="$payQuick"
                        v-validate="'required|bankcard'" name="bankcard"
                        @focus="errors.remove('bankcard','$payQuick')" @input="bankcardInputHandler">
                <img class="prefix" slot="prefix" src="../../assets/images/bankcard.svg" alt="">
              </el-input>
              <p class="error" v-if="errors.has('$payQuick.bankcard')">{{errors.first('$payQuick.bankcard')}}</p>
            </dd>
          </dl>
          <dl class="form-group input-group">
            <dt>预留手机</dt>
            <dd>
              <el-input class="padding-horizontal-10" placeholder="请输入您的银行预留手机号" v-model="quickFormInfo.phone"
                        data-vv-scope="$payQuick"
                        v-validate="'required|phone'" name="phone" @focus="errors.remove('phone','$payQuick')"/>
              <p class="error" v-if="errors.has('$payQuick.phone')">{{errors.first('$payQuick.phone')}}</p>
            </dd>
          </dl>
        </form>
        <div slot="footer">
          <el-button :disabled="payNextDisabled" type="primary" @click="goPayQuickNext">确认绑卡</el-button>
        </div>
      </el-dialog>

      <el-dialog class="custom" width="420px" title="微信支付" :visible.sync="wechatPayDialogVisible">
        <div class="text-center">
          <img :src="wechatPayQrCode" alt="">
          <p>扫描二维码支付订单</p>
        </div>
        <div slot="footer">
          <el-button @click="wechatPayDialogVisible = false">选择其他付款方式</el-button>
          <el-button type="primary" @click="payOk">已完成付款</el-button>
        </div>
      </el-dialog>
    </div>
    <x-features/>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import PayAPI from '../../services/pay-api';
  import AppConfig from '../../config';
  import errorHandler from '../../services/error-handler';
  import OrderAPI from '../../services/order-api';
  import {getBankInfo, removeStore} from '../../plugins/utils';
  import xFeatures from '../../components/x-features';
  import userBankApi from '../../services/userbank-api';
  import {OrderType} from '../../config/constants';
  import AccountAPI from '../../services/account-api';
  import QRCode from 'qrcode';

  const PaymentMethods = {
    ALIPAY: 3, // 支付宝支付
    QUICK_PAY: 0, // 快捷支付&银行卡支付
    INTERNET_BANK: 1, // 网银支付
    TRANSFER: 2, // 对公转账
    WECHAT: 4,// 微信支付
    ACCOUNT_BALANCE: 5 // 账户余额
  };
  export default {
    components: {
      xFeatures
    },
    computed: {
      ...mapState(['token', 'userInfo']),
      payNextDisabled() {
        if (this.userInfo.isBindBankCard) {
          return false;
        }
        if (!!this.userInfo.idCard) {
          return !(this.quickFormInfo.bankcard.trim() !== '' && this.quickFormInfo.phone.trim() !== '');

        } else {
          for (let key in this.quickFormInfo) {
            if (this.quickFormInfo[key].trim() == '') {
              return true;
            }
          }
          return false;
        }
      },
      defaultPayMethod() {
        if (!this.isRecharge && this.accountBalance > this.orderInfo.amount) {
          return PaymentMethods.ACCOUNT_BALANCE;
        } else {
          return PaymentMethods.ALIPAY;
        }
      },
      unsupportedPaymentMethods() {
        const methods = [];
        const amount = +this.orderInfo.amount;
        // 充值及账户余额小于待支付金额时不支持账户余额支付
        if (this.isRecharge || this.accountBalance < amount) {
          methods.push(PaymentMethods.ACCOUNT_BALANCE);
        }

        // 超过用户绑卡的单笔限额不支持快捷支付
        if (this.userInfo.isBindBankCard && this.bankCardInfo && this.bankCardInfo.singleLimit < amount) {
          methods.push(PaymentMethods.QUICK_PAY);
        }

        // 待支付金额超过50000不支持快捷支付
        if (!this.userInfo.isBindBankCard && amount > 50000) {
          methods.push(PaymentMethods.QUICK_PAY);
        }
        return methods;
      }
    },
    data() {
      return {
        PaymentMethods,
        paymentMethod: PaymentMethods.ALIPAY,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },
        remitInfo: {
          orderNo: '',
          name: '',
          account: '',
          bank: '',
          date: new Date()
        },
        imgList: [],
        orderInfo: {
          id: null,
          orderNo: '',
          amount: 0
        },
        dialogVisible: false,
        fileList: [],
        dialogImageUrl: '',
        extraData: {},
        payDialogVisible: false,
        payValidationDialog: false,
        quickFormInfo: {
          name: '',
          idCard: '',
          bankcard: '',
          phone: ''
        },
        bankInfo: {},
        payInfo: {},
        code: '',
        codeBtnLoading: false,
        sendCodeBtnDisabled: false,
        sendCodeText: '重新发送',
        timer: null,
        isRecharge: false,
        bankCardInfo: {},
        isSupportQuickPay: false,
        payNo: '',
        bindCardDialogVisible: false,
        accountBalance: 0,
        wechatPayQrCode: '',
        wechatPayDialogVisible: false,
        wechatPayBtnLoading: false
      };
    },
    methods: {
      initPage() {
        this.isRecharge = Number(this.$route.query.type) === OrderType.RECHARGE;
        const orderNo = this.$route.query.orderNo;
        const amount = this.$route.query.amount;

        // 获取账户余额
        AccountAPI.userMoneyTotal()
          .then(res => res.totalMoney || 0)
          .then(money => {
            money = +money;
            this.accountBalance = money;
          });

        if (!this.isRecharge) {
          OrderAPI.detail(orderNo)
            .then(res => {
              this.orderInfo = res;
            }).catch();
        } else {
          this.orderInfo.orderNo = orderNo;
          this.orderInfo.amount = amount;
        }
      },
      uploadUrl() {
        return AppConfig.apiEndpoint + '/' + AppConfig.uploadUrl;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isImage =
          ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) > -1;
        const isValidSize = file.size / 1024 / 1024 < 5;
        if (!isImage) {
          this.$message.error('上传图片只能是 png jpg jpeg 格式!');
        }
        if (!isValidSize) {
          this.$message.error('转账凭证照片过大，请压缩后再上传!');
        }
        return isImage && isValidSize;
      },
      uploadError() {
        this.$message.error('凭证上传失败，请稍后重试!');
      },
      uploadSuccess(response, file, fileLis) {
        if (response.code === '000000') {
          this.$message({type: 'success', message: '付款凭证已上传!', center: true});
          this.imgList.push(response.data.result);
        }
      },
      handleRemove(file, fileList) {
        this.imgList = this.imgList.filter(img => {
          return img.indexOf(file.response.data.result) < 0;
        });
      },
      bankcardInputHandler(val) {
        this.$nextTick(() => {
          this.quickFormInfo.bankcard =
            val
              .replace(/([\u4E00-\u9FA5]|[A-Za-z])+/g, '')
              .replace(/(\s|[^\d])/g, '')
              .replace(/(\d{4})(?=\d)/g, '$1 ')
              .slice(0, 23);
        });
      },
      accountInputHandler(val) {
        this.$nextTick(() => {
          this.remitInfo.account =
            val
              .replace(/([\u4E00-\u9FA5]|[A-Za-z])+/g, '')
              .replace(/(\s|[^\d])/g, '')
              .replace(/(\d{4})(?=\d)/g, '$1 ')
              .slice(0, 23);
        });
      },
      payCharge() {
        this.$validator.validateAll('$remitInfo')
          .then(res => {
            if (res) {
              return res;
            }
            const errMsg = this.errors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            if (this.imgList.length < 1) {
              return Promise.reject({msg: '请上传付款凭证'});
            }
            return true;
          })
          .then(() => {
            const data = Object.assign({}, this.remitInfo, {
              orderId: this.orderInfo.id || '',
              channel: this.isRecharge ? 1 : 0,
              imgURL: this.imgList.join(','),
              amount: this.orderInfo.amount
            });
            data.account = data.account.split(' ').join('');
            data.date = data.date.toISOString().slice(0, 10);
            return PayAPI.payOffline(data);
          })
          .then(() => this.$alert('支付凭证提交成功', '提示', {
            confirmButtonText: '查看我的' + (this.isRecharge ? '余额' : '订单'),
            showClose: false,
            type: 'success',
            center: true
          }))
          .then(() => {
            if (this.isRecharge) {
              this.$router.replace({path: '/i/account'});
            } else {
              this.$router.replace('i/order');
            }
          })
          .catch(err => {
            if (err === 'cancel') {
              return;
            }
            errorHandler(err);
          });
      },
      payOnline() {
        let tempWindow = window.open();
        this.payDialogVisible = true;
        localStorage.removeItem('is_payed');
        const orderNo = this.orderInfo.orderNo;
        let path = this.isRecharge ? '/i/account' : 'pay-result';
        const callbackUrl =
          location.origin + this.$router.resolve(path).location.path;
        PayAPI.pay(orderNo, callbackUrl, tempWindow);
      },
      _alipay() {
        const orderNo = this.orderInfo.orderNo;
        let path = this.isRecharge ? '/i/account' : 'pay-result';
        const callbackUrl =
          location.origin + this.$router.resolve(path).location.path;
        if (this.isRecharge) {
          return PayAPI.rechargeAlipay(orderNo, callbackUrl);
        }
        return PayAPI.alipay(orderNo, callbackUrl);
      },
      payAlipay() {
        const payLocation = location.origin + this.$router.resolve('pay-temp').location.path;
        const tempWindow = window.open();
        this.payDialogVisible = true;
        this._alipay(tempWindow)
          .then(res => {
            this.payNo = res.orderNo;
            localStorage.setItem('alipay-info', res.url);
            tempWindow.location = payLocation;
          })
          .catch(errorHandler);
      },
      _check(orderNo) {
        const isAlipay = this.paymentMethod === 3;
        if (isAlipay) {
          return PayAPI.alipayResult(this.payNo);
        }
        return PayAPI.check(orderNo);
      },
      payOk() {
        this.payDialogVisible = false;
        const orderNo = this.orderInfo.orderNo;
        this._check(orderNo)
          .then(() => {
            removeStore('is_payed');
            this.$message.success('支付成功');
            if (this.isRecharge) {
              this.$router.replace('/i/account');
            } else {
              this.$router.replace('/i/order');
            }
          })
          .catch(err => {
            this.$message.error(err.msg || '系统错误，请稍后重试');
          });
      },
      payWeChat() {
        this.wechatPayBtnLoading = true;
        const orderNo = this.orderInfo.orderNo;
        PayAPI.wechatPay(orderNo)
          .then(res => QRCode.toDataURL(res.url))
          .then(url => {
            this.wechatPayQrCode = url;
            this.wechatPayBtnLoading = false;
            this.wechatPayDialogVisible = true;
          })
          .catch(() => {
            this.wechatPayBtnLoading = false;
            this.$message.error('调起微信支付失败，请稍后重试或切换其他付款方式');
          });
      },
      payBalance() {
        this.$confirm('此操作将扣除您的账户余额，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return PayAPI.balancePay(this.orderInfo.orderNo);
          })
          .then(res => {
            this.$message.success('支付成功');
            this.$router.replace('/i/order?selected=1');
          })
          .catch((err) => {
            if (err === 'cancel') {
              return;
            }
            errorHandler(err);
          });
      },
      goPayQuickNext() {
        this.$validator.validateAll('$payQuick')
          .then(res => {
            if (res) {
              return this.getBankName();
            } else {
              return Promise.reject();
            }
          })
          .then(() => {
            let params = {
              outOrderId: this.orderInfo.orderNo,
              type: this.isRecharge ? 'C' : 'K',
              token: this.token
            };
            if (!this.userInfo.isBindBankCard) {
              params = Object.assign(params, {
                mobile: this.quickFormInfo.phone,
                bankCode: this.bankInfo.bankCode,
                realName: this.quickFormInfo.name || this.userInfo.userName,
                cardNo: this.quickFormInfo.idCard || this.userInfo.idCard,
                bankCardNo: this.quickFormInfo.bankcard.split(' ').join('')
              });
              return userBankApi.fristPreparePay(JSON.stringify(params));
            } else {
              return userBankApi.preparePay(JSON.stringify(params));
            }
          })
          .then(res => {
            this.payInfo = res;
            let t = 60;
            this.sendCodeText = t + 's';
            this.sendCodeBtnDisabled = true;
            this.timer = setInterval(() => {
              t--;
              this.sendCodeText = t + 's';
              if (t < 0) {
                this.sendCodeBtnDisabled = false;
                this.sendCodeText = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
            this.payValidationDialog = true;
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: '验证码已经发送!'
              });
            }, 500);
          })
          .catch(errorHandler);
      },
      getBankName() {
        if (this.userInfo.isBindBankCard) {
          return Promise.resolve();
        }
        let bankcard = this.quickFormInfo.bankcard.split(' ').join('');
        return userBankApi.queryCardBin(bankcard)
          .then(res => {
            this.bankInfo = res || {};
          }).catch();
      },
      sendCode() {
        this.codeBtnLoading = true;
        this.sendCodeText = '';
        userBankApi.bankSendSms()
          .then(() => {
            this.$message({
              type: 'success',
              message: '发送成功'
            });
            this.codeBtnLoading = false;
            this.sendCodeBtnDisabled = true;
            let t = 60;
            this.sendCodeText = t + 's';
            this.timer = setInterval(() => {
              t--;
              this.sendCodeText = t + 's';
              if (t < 0) {
                this.codeBtnLoading = false;
                this.sendCodeBtnDisabled = false;
                this.sendCodeText = '重新发送';
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(err => {
            this.codeBtnLoading = false;
            this.sendCodeBtnDisabled = false;
            this.sendCodeText = '重新发送';
            errorHandler(err);
          });
      },
      quickPayOk() {
        this.$validator.validateAll('$codeForm')
          .then(res => {
            if (res) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })
          .then(() => {
            let params = {
              'bankCardNo': this.quickFormInfo.bankcard.split(' ').join('') || this.userInfo.bankCardNo,
              'bankCode': this.payInfo.bankCode,
              'bankName': this.payInfo.bankName || this.userInfo.bankName,
              'cardNo': this.quickFormInfo.idCard || this.userInfo.idCard,
              'memberUserId': this.payInfo.memberUserId,
              'outOrderId': this.payInfo.outOrderId,
              'paymentId': this.payInfo.paymentId,
              'realName': this.quickFormInfo.name || this.userInfo.userName,
              'smsCode': this.code,
              'tradeNo': this.payInfo.tradeNo,
              'token': this.token
            };
            return userBankApi.bankPay(JSON.stringify(params));
          })
          .then(res => {
            this.payValidationDialog = false;
            this.$message.success('付款成功！');
            if (this.isRecharge) {
              this.$router.replace({path: '/i/account'});
            } else {
              this.$router.replace({path: '/i/order'});
            }
          })
          .catch(err => {
            errorHandler(err);
          });
      },
      choosePayMethod(method) {
        if (this.unsupportedPaymentMethods.indexOf(method) < 0) {
          this.paymentMethod = method;
        }
      },
      itemClassList(value) {
        const classList = [];
        if (value === this.paymentMethod) {
          classList.push('active');
        }
        if (this.unsupportedPaymentMethods.indexOf(value) > -1) {
          classList.push('disabled');
        }
        return classList;
      }
    },
    watch: {
      token() {
        this.extraData = {token: this.token};
      },
      imgList() {
        const uploader = document.getElementsByClassName('el-upload').item(0);
        if (this.imgList.length >= 5) {
          uploader.style.display = 'none';
        } else {
          uploader.style.display = 'inline-block';
        }
      },
      userInfo: {
        handler(val) {
          if (val) {
            this.bankCardInfo = getBankInfo(val.bankCode) || {};
          }
        },
        immediate: true
      },
      defaultPayMethod() {
        this.paymentMethod = this.defaultPayMethod;
      }
    },
    created() {
      const vm = this;
      window.addEventListener('storage', function (e) {
        if (e.key === 'is_payed' && e.newValue === 'true') {
          vm.payOk();
        }
      });
    },
    mounted() {
      this.extraData = {token: this.token};
      this.initPage();
    },
    destroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "../../style/variables";

  .page {
    background-color: #f6f6f6;
  }

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .order-info {
    margin-top: 20px;
    background-color: #fff;
    padding: 30px 60px;
    font-size: 18px;
    color: #303030;

    .recharge-order {
      margin-top: 14px;
      margin-bottom: 14px;
    }

    .order-tips {
      margin-top: 10px;
      font-size: 14px;
      color: #FDAA24;
    }

    .money {
      font-size: 30px;
      font-weight: bold;
      color: #fd7220;
      font-style: normal;
      margin-left: .2em;
      margin-right: .2em;
    }
  }

  .total-money {
    line-height: 38px;
  }

  .pay-methods {
    line-height: 56px;
  }

  .recommend {
    display: inline-block;
    vertical-align: top;
    background: #fd7220;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    line-height: 14px;
    padding: 5px 6px;
    margin-left: 10px;
  }

  .pay-info,
  .pay-offline {
    margin-top: 20px;
  }

  .step {
    margin-top: 40px;
    &:first-child {
      margin-top: 0;
    }
    h4 {
      font-size: 18px;
      color: #303030;
      font-weight: normal;
      line-height: 24px;
      margin-top: 5px;
      margin-bottom: 25px;
    }
  }

  .step-content {
    margin-bottom: 20px;
    padding-left: 1em;
    font-size: 14px;
    color: #606166;
  }

  .sc-tips {
    margin-bottom: 15px;
  }

  .receive-info {
    width: 50%;
    padding: 24px 27px;
    background-color: #FAFAFA;
  }

  .receive-info__item {
    line-height: 19px;
    margin-bottom: 13px;
    font-size: 14px;
    color: #606166;
    &:last-child {
      margin-bottom: 0;
    }
    dt, dd {
      display: inline-block;
    }
  }

  .remit-info {
    width: 50%;
  }

  .remit-info__item {
    position: relative;
    margin-bottom: 20px;
    padding-left: 8em;

    dt, dd {
      display: block;
      margin: 0;
      line-height: 36px;
    }

    dt {
      position: absolute;
      left: 0;
      top: 0;

      font-size: 14px;
      color: #606166;
      text-align: right;
      min-width: 8em;
    }

    dd {
      position: relative;
      width: 100%;
      padding-left: 20px;
    }

    .error {
      position: absolute;
      line-height: 20px;
      font-size: 12px;
      padding-left: 5px;
      color: $danger;
    }

  }

  .pay-submit {
    padding-left: 60px;
    padding-top: 30px;
    padding-bottom: 50px;

    p {
      margin-bottom: 15px;
      font-size: 14px;
      color: #333;
    }
  }

  .pay-offline__container {
    padding: 30px 60px;
    background-color: #fff;
  }

  .pay-online {
    padding: 10px 60px 200px;
    .btn {
      background: #4d87ea;
      border-radius: 4px;
      font-size: 18px;
      color: #fff;
      padding: 9px 30px;
      line-height: 24px;
      border: 0;
      outline: none;
    }
  }

  .dialog-content {
    position: relative;
    padding-left: 55px;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
    }
    h5,
    p {
      font-size: 14px;
      font-weight: normal;
      line-height: 15px;
    }

    h5 {
      margin-bottom: 10px;
    }

    p {
      color: #999;
    }
  }

  .pay-validation {
    label {
      margin-bottom: 20px;
      display: block;
      position: relative;
      padding-left: 74px;
      strong {
        display: block;
        line-height: 36px;
        font-size: 14px;
        color: #303137;
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
    }
    span {
      left: 0;
      top: 0;
      line-height: 36px;
      font-size: 14px;
      color: #303137;
      position: absolute;
    }
    .code-ipt {
      width: calc(100% - 84px);
    }
    .send-code {
      width: 84px;
      min-width: 84px;
    }
  }

  .err-info {
    min-height: 20px;
    font-size: 12px;
    color: #f95453;
    line-height: 20px;
    margin-top: -20px;
    position: relative;
    top: 20px;
  }

  .pay-methods {
    margin-top: 30px;
    padding: 30px 60px;
    background-color: #fff;
  }

  .pay-methods-list {
    li {
      height: 66px;
      padding: 20px;
      line-height: 26px;
      border-top: 1px solid #EDEEF0;
      cursor: pointer;

      &:last-child {
        border-bottom: 1px solid #EDEEF0;
      }

      &.active {
        background: rgba(65, 133, 245, 0.05);
        border: 2px solid #4185F5;
        padding: 18px 18px 19px;
      }
      &:hover {
        span.name {
          color: #606166;
        }
      }
      &.disabled, &.disabled .name {
        color: rgba(48, 49, 55, 0.30);;
      }
      &.disabled img {
        opacity: .4;
      }
    }

    img {
      height: 100%;
    }

    .name {
      display: inline-block;
      margin-left: 1em;
      margin-right: 6px;
      min-width: 7em;
      font-size: 18px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #303137;
      vertical-align: top;
    }

    .recommend {
      margin-right: 4em;
    }

    .txt {
      display: inline-block;
      vertical-align: top;
      margin-right: 4em;
      font-size: 14px;
    }
  }

  .btn-add {
    margin-top: -3px;
    padding: 0 15px;
    height: 32px;
    line-height: 30px;
    font-size: 14px;
    border: 1px dashed #cccdcf;
    color: #4D87EA;
    cursor: pointer;
  }

  .form-group {
    position: relative;
    padding-left: 80px;
    color: #303137;

    dt, dd {
      display: inline-block;
    }

    dd {
      margin-left: 0;
      padding-left: 10px;
      width: 100%;

      &.line {
        border-bottom: 1px dashed #edeef0;
        vertical-align: 4px;
      }
    }

    dt {
      position: absolute;
      left: 0;
      top: 0;
      width: 80px;
    }

    &.input-group {
      dt {
        line-height: 34px;
      }
      dd {
        padding-left: 0;
      }

      .prefix {
        position: relative;
        left: 5px;
        top: 8px;
        width: 17px;
      }

      .icon-help {
        font-size: 14px;
        color: #969699;
      }
    }
    + .form-group {
      margin-top: 20px;
    }

    .error {
      position: absolute;
      padding-left: 10px;
      font-size: 12px;
      color: #f95453;
    }
  }

  .subhead {
    font-size: 14px;
    color: #969699;
    font-weight: normal;
    margin-left: 2em;
  }
</style>
