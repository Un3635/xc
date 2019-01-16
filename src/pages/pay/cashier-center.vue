<template>
  <div class="cashier-center">
    <view-box body-padding-top="46px" body-padding-bottom="0px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">收银中心</x-header>
      <div class="order-info">
        <p class="clearfix" v-if="!isRecharge">
        <!--<p class="clearfix order-num">-->
          <span class="left">订单号</span>
          <span class="left">{{orderInfo.orderNo}}</span>
        </p>
        <p class="clearfix order-price">
          <span class="left">支付金额</span>
          <span class="left co">{{orderInfo.amount | currency}}元</span>
        </p>
      </div>
      <div class="pay-methods">
        <div class="alipay" v-if="!isWeChat">
          <div class="pay-item">
            <check-icon @click.native="tabIndex = 1" :value="tabIndex == 1"></check-icon>
            <div class="vux-1px-b" @click="tabIndex = 1">
              <div class="pay-icon left">
                <img src="../../assets/images/icon_zhifubao_normal@2x.png" alt="支付宝">
              </div>
              <span class="pay-name left">支付宝</span>
            </div>
            <div id="alipayForm" style="height:0;overflow: hidden;"></div>
          </div>
        </div>
        <div class="wechat">
          <div class="pay-item">
            <check-icon @click.native="tabIndex = 2" :value="tabIndex == 2"></check-icon>
            <div class="vux-1px-b" @click="tabIndex = 2">
              <div class="pay-icon left">
                <img src="../../assets/images/icon_weixin_normal@2x.png" alt="微信支付">
              </div>
              <span class="pay-name left">微信支付</span>
            </div>
          </div>
        </div>
        <div class="fast-pay">
          <div class="pay-item">
            <check-icon @click.native="tabIndex = 3" :value="tabIndex == 3"></check-icon>
            <div class="vux-1px-b" @click="tabIndex = 3">
              <div class="pay-icon left">
                <img src="../../assets/images/icon_kuaijiezhifu_normal@2x.png" alt="快捷支付">
              </div>
              <span class="pay-name left">快捷支付</span>
            </div>
          </div>
          <div class="pay-content" :class="{'animate': tabIndex == 3}">
            <div class="bind-card-form">
              <template v-if="!userInfo.isBindBankCard">
                <label :style="{'margin-bottom': userInfo.idCard ? '0px': '22px'}">
                  <span class="label">真实姓名</span>
                  <div class="ipt-wrap vux-1px" v-if="!userInfo.idCard">
                    <input type="text" placeholder="您的真实姓名" v-model="quickFormInfo.name" data-vv-scope="$payQuick"
                           v-validate="'required'" name="name" @focus="veeErrors.remove('name','$payQuick')">
                    <p class="error-info" v-if="veeErrors.has('$payQuick.name')">
                      {{veeErrors.first('$payQuick.name')}}</p>
                  </div>
                  <p v-else>{{userInfo.userName}}</p>
                </label>
                <label :style="{'margin-bottom': userInfo.idCard ? '0px': '22px'}">
                  <span class="label">身份证号</span>
                  <div class="ipt-wrap vux-1px" v-if="!userInfo.idCard">
                    <input type="text" placeholder="您的身份证号" v-model="quickFormInfo.idCard" data-vv-scope="$payQuick"
                           v-validate="'required|idCard'" name="idCard"
                           @focus="veeErrors.remove('idCard','$payQuick')">
                    <p class="error-info" v-if="veeErrors.has('$payQuick.idCard')">
                      {{veeErrors.first('$payQuick.idCard')}}</p>
                  </div>
                  <p v-else>{{userInfo.idCard}}</p>
                </label>
              </template>
              <label :style="{'margin-bottom': userInfo.isBindBankCard ? '0px': '22px'}" v-if="userInfo.isBindBankCard">
                <span class="label">银行卡</span>
                <p>{{userInfo.bankName}}</p>
              </label>
              <label :style="{'margin-bottom': userInfo.isBindBankCard ? '0px': '22px'}">
                <span class="label">银行卡号</span>
                <div class="ipt-wrap vux-1px" v-if="!userInfo.isBindBankCard">
                  <input type="text" placeholder="您本人的银行卡号" v-model="quickFormInfo.bankcard" data-vv-scope="$payQuick"
                         v-validate="'required|bankcard'" name="bankcard"
                         @focus="veeErrors.remove('bankcard','$payQuick')"
                         @input="inputHandler($event, 'quickFormInfo','bankcard')">
                  <p class="error-info" v-if="veeErrors.has('$payQuick.bankcard')">
                    {{veeErrors.first('$payQuick.bankcard')}}</p>
                </div>
                <p v-else>{{userInfo.bankCardNo}}</p>
              </label>
              <label :style="{'margin-bottom': userInfo.isBindBankCard  ? '0px': '22px'}">
                <span class="label">预留手机号</span>
                <div class="ipt-wrap vux-1px" v-if="!userInfo.isBindBankCard ">
                  <input type="tel" placeholder="银行预留手机号" v-model="quickFormInfo.phone" data-vv-scope="$payQuick"
                         v-validate="'required|phone'" name="phone" @focus="veeErrors.remove('phone','$payQuick')">
                  <p class="error-info" v-if="veeErrors.has('$payQuick.phone')">
                    {{veeErrors.first('$payQuick.phone')}}</p>
                </div>
                <p v-else>{{userInfo.bankMobile}}</p>
              </label>
              <label v-if="userInfo.isBindBankCard " class="vcode">
                <span class="label">短信验证码</span>
                <div class="ipt-wrap vux-1px">
                  <input type="text" placeholder="短信验证码" v-model="code" v-validate="'required|code'"
                         @focus="veeErrors.remove('code','$codeForm')" name="code">
                  <button v-if="first" @click="firstSendCode">获取验证码</button>
                  <button v-else @click="sendCode" :disabled="sendCodeBtnDisabled">{{sendCodeText}}</button>
                  <p class="error-info" v-show="veeErrors.has('$codeForm.code')">
                    {{veeErrors.first('$codeForm.code')}}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="e-pay">
          <div class="pay-item">
            <check-icon @click.native="tabIndex = 4" :value="tabIndex == 4"></check-icon>
            <div class="vux-1px-b" @click="tabIndex = 4">
              <div class="pay-icon left">
                <img src="../../assets/images/icon_wangyinzhifu_normal@2x.png" alt="网银支付">
              </div>
              <span class="pay-name left">网银支付</span>
              <span class="pay-subtitle left">大额在线支付，实时到账</span>
            </div>
          </div>
          <div class="pay-content" :class="{'animate': tabIndex == 4}">
            <p class="tip">使用网银在线支付，实时到账，无需等待</p>
            <ol>
              <li>
                <span class="num">1</span>
                在电脑上，用浏览器打开算立方网站 www.HC.TOP
              </li>
              <li>
                <span class="num">2</span>
                登录您的算立方账号
              </li>
              <li>
                <span class="num">3</span>
                进入个人中心-我的订单-待支付-去支付
              </li>
              <li>
                <span class="num">4</span>
                选择在线网银支付-去支付
              </li>
              <li>
                <span class="num">5</span>
                在网银页面完成付款，支付成功
              </li>
            </ol>
          </div>
        </div>
        <div class="offline-pay">
          <div class="pay-item">
            <check-icon @click.native="tabIndex = 5" :value="tabIndex == 5"></check-icon>
            <div class="vux-1px-b" @click="tabIndex = 5">
              <div class="pay-icon left">
                <img src="../../assets/images/icon_zhuanzahang_normal@2x.png" alt="对公转账">
              </div>
              <span class="pay-name left">对公转账</span>
              <span class="pay-subtitle left">线下转账，延时到账</span>
            </div>
          </div>
          <div class="pay-content" :class="{'animate': tabIndex == 5}">
            <div>
              <p class="tip">按照步骤一，转账成功后，提交转账信息</p>
              <ol>
                <li>
                  <span class="num">1</span>
                  <h3>打款至挖链网指定收款账号</h3>
                  <p>
                    <span class="label">开户名称</span>
                    上海挖链科技有限公司
                  </p>
                  <p>
                    <span class="label">开户银行</span>
                    平安银行上海新天地支行
                  </p>
                  <p>
                    <span class="label">汇款账户</span>
                    15000091573845
                  </p>
                  <p>
                    <span class="label">汇款金额</span>
                    {{orderInfo.amount | currency}}元
                  </p>
                </li>
                <li>
                  <span class="num">2</span>
                  <h3>提交汇款信息</h3>
                  <div class="ipt-wrap vux-1px">
                    <input type="text" placeholder="汇款姓名/企业" v-validate="'required'" name="name"
                           data-vv-scope="$remitInfo" @focus="veeErrors.remove('name','$remitInfo')"
                           v-model="remitInfo.name">
                  </div>
                  <div class="ipt-wrap vux-1px">
                    <input type="text" placeholder="汇款银行账号" v-validate="'required|bankcard'" data-vv-scope="$remitInfo"
                           name="bankcard" v-model="remitInfo.account"
                           @focus="veeErrors.remove('bankcard','$remitInfo')"
                           @input="inputHandler($event,'remitInfo', 'account')">
                  </div>
                  <div class="ipt-wrap vux-1px">
                    <input type="text" placeholder="开户行名称" v-validate="'required'"
                           name="bank" data-vv-scope="$remitInfo" v-model="remitInfo.bank"
                           @focus="veeErrors.remove('bank','$remitInfo')">
                  </div>
                  <div class="ipt-wrap vux-1px" @click="showTime = true">
                    <p class="date-time" :style="{color:remitInfo.date ? '#303137' : '#CCCDCF' }">
                      {{remitInfo.date || '汇款日期'}}</p>
                  </div>
                </li>
                <li>
                  <span class="num">3</span>
                  <h3>提交汇款成功截图（照片）</h3>
                  <p>请上传汇款成功页面的截图或照片</p>
                  <div class="img-list clearfix">
                    <ul>
                      <li v-for="(img,index) in imgBlobList" :key=" index">
                        <p class="close" @click="removeImg(index)">
                          <x-icon type="ios-close-empty" size="18px"></x-icon>
                        </p>
                        <img :src="img" alt="" @onload="revokeObjectURL(img)">
                      </li>
                      <li>
                        <div class="pic-box">
                          <input type="file" accept="image/png,image/jpeg,image/jpg"
                                 @change="imageUploadingHeader($event)">
                          <div class="add-img">
                            <x-icon type="ios-plus-empty" size="70"></x-icon>
                          </div>
                        </div>
                        <!--<vue-core-image-upload-->
                        <!--v-if="isRender"-->
                        <!--:isXhr="false"-->
                        <!--:max-file-size="2621440"-->
                        <!--:compress="50"-->
                        <!--extensions="png,jpeg,jpg"-->
                        <!--@imagechanged="imageUploadingHeader">-->
                        <!--<div class="pic-box">-->
                        <!--<div class="add-img">-->
                        <!--<x-icon type="ios-plus-empty" size="70"></x-icon>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</vue-core-image-upload>-->
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span class="num">4</span>
                  <h3>汇款核实</h3>
                  <p>提交汇款信息后，您可以在我-账户余额中查看汇款处理进度，若有疑问请拨打咨询热线：400-865-6688</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="pay-btn">
        <div v-show="tabIndex == 1">
          <x-button type="primary" @click.native="alipay">确认支付</x-button>
        </div>
        <div v-show="tabIndex == 2">
          <x-button type="primary" @click.native="wechatPayBtnhandler" :show-loading="wechatBtnLoading">
            确认支付
          </x-button>
          <!--<a v-else :href="mwebUrl">确认支付</a>-->
        </div>
        <div v-show="tabIndex == 3">
          <x-button v-if="!userInfo.isBindBankCard" @click.native="goPayQuickNext"
                    :disabled="payNextDisabled" type="primary">下一步
          </x-button>
          <x-button v-else :disabled="code == ''" @click.native="quickPayOk" type="primary">确认支付
          </x-button>
        </div>
        <div v-show="tabIndex == 4">
          <x-button type="primary" :disabled="true">确认支付</x-button>
        </div>
        <div v-show="tabIndex == 5">
          <x-button :disabled="submitPayDisabled" @click.native="payCharge" type="primary">提交打款信息</x-button>
        </div>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showCodeDialog" class="order-confirm-dialog" :hide-on-blur="true"
                  :dialog-style="{'padding':'17px 20px','height': '245px'}">
          <header>支付验证</header>
          <div class="order-confirm">
            <p class="phone">
              <span>手机号</span>
              <span>{{quickFormInfo.phone ? quickFormInfo.phone : userInfo.bankMobile}}</span>
            </p>
            <div class="vcode vux-1px">
              <div class="code">
                <input type="text" placeholder="短信验证码" v-model="code" v-validate="'required|code'"
                       @focus="veeErrors.remove('code','$codeForm')" name="code">
              </div>
              <div class="vcode-btn">
                <input type="button" :value="sendCodeText" @click="sendCode" :disabled="sendCodeBtnDisabled">
              </div>
              <p class="error-info" v-show="veeErrors.has('$codeForm.code')">{{veeErrors.first('$codeForm.code')}}</p>
            </div>
          </div>
          <footer>
            <x-button :disabled="code.trim() == ''" @click.native="quickPayOk" type="primary">确认提交</x-button>
          </footer>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <popup v-model="showTime">
          <popup-header
            left-text="取消"
            right-text="确定"
            title="请选择汇款日期"
            @on-click-left="showTime = false"
            @on-click-right="selectTime"></popup-header>
          <datetime-view v-model="time" ref="datetime" format="YYYY年MM月DD日"></datetime-view>
        </popup>
      </div>
    </view-box>
  </div>
</template>
<script>
  import {
    Tab,
    TabItem,
    XDialog,
    TransferDom,
    DatetimeView,
    PopupHeader,
    Popup,
    CheckIcon,
    debounce,
    dateFormat
  } from 'vux';
  import {mapState} from 'vuex';
  import PayAPI from '../../services/pay-api';
  import UserBankApi from '../../services/userbank-api';
  import {OrderType, EnvType} from '../../config/constants';
  import OrderAPI from '../../services/order-api';
  import WeChatAPI from '../../services/wechat-api';
  import {ActionsTypes} from '../../store/actions';
  import {isWeChat, getStore, setStore, removeStore} from '../../plugins/utils';
  import errorHandler from '../../services/error-handler';

  const WECHAT_PAY_INFO = 'wechat_pay_info';

  export default {
    data() {
      return {
        isRender: false,
        first: true,
        tabIndex: 1,
        showCodeDialog: false,
        isGoPay: false,
        isPaySuccess: true,
//        是否充值
        isRecharge: false,
        orderInfo: {
          id: null,
          orderNo: '',
          amount: 0
        },
        quickFormInfo: {
          name: '',
          idCard: '',
          bankcard: '',
          phone: ''
        },
        bankInfo: {},
        payInfo: {},
        code: '',
        sendCodeText: '重新发送',
        sendCodeBtnDisabled: false,
        timer: null,
        remitInfo: {
          orderNo: '',
          name: '',
          account: '',
          bank: '',
          date: ''
        },
        showTime: false,
        time: dateFormat(new Date(), 'YYYY-MM-DD'),
        imgList: [],
        imgBlobList: [],
        getObjectURL(file) {
          let url = null;
          if (window.createObjectURL !== undefined) {
            url = window.createObjectURL(file);
          } else if (window.URL !== undefined) {
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL !== undefined) {
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        },
        revokeObjectURL(objUrl) {
          if (window.revokeObjectURL !== undefined) {
            window.revokeObjectURL(objUrl);
          } else if (window.URL !== undefined) {
            window.URL.revokeObjectURL(objUrl);
          } else if (window.webkitURL !== undefined) {
            window.webkitURL.revokeObjectURL(objUrl);
          }
        },
        objUrl: '',
        isWeChat: false,
        isConfig: false,
        wechatBtnLoading: false,
        mwebUrl: ''
      };
    },
    components: {
      Tab,
      TabItem,
      XDialog,
      DatetimeView,
      Popup,
      PopupHeader,
      CheckIcon
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState(['token', 'userInfo', 'login']),
      payNextDisabled() {
        if (this.userInfo.isBindBankCard) {
          return false;
        }
        if (this.userInfo.idCard) {
          return !(this.quickFormInfo.bankcard.trim() !== '' && this.quickFormInfo.phone.trim() !== '');
        } else {
          for (let key in this.quickFormInfo) {
            if (this.quickFormInfo[key].trim() === '') {
              return true;
            }
          }
          return false;
        }
      },
      submitPayDisabled() {
        return !(this.remitInfo.name !== '' && this.remitInfo.account !== '' && this.remitInfo.bank !== '' && this.remitInfo.date !== '');
      }
    },
    beforeRouteLeave(to, from, next) {
      removeStore(WECHAT_PAY_INFO);
      next();
    },
    created() {
      this.isRecharge = Number(this.$route.query.type) === OrderType.RECHARGE;
      const orderNo = this.$route.query.order_no;
      const amount = this.$route.query.amount;
      if (!this.isRecharge) {
        OrderAPI.detail(orderNo)
          .then(res => {
            this.orderInfo = res;
          });
      } else {
        this.orderInfo.orderNo = orderNo;
        this.orderInfo.amount = amount;
      }
    },
    watch: {
      login: {
        handler(val) {
          if (val) {
            this.$store.dispatch(ActionsTypes.UPDATE_USER_INFO);
          }
        },
        immediate: true
      }
    },
    mounted() {
      const _this = this;
      this.isRender = true;
      this.isWeChat = isWeChat;
      if (this.isWeChat) {
        this.tabIndex = 2;
      }
      let wechatPayInfo = JSON.parse(getStore(WECHAT_PAY_INFO) || '[]');
      for (let i = 0; i < wechatPayInfo.length; i++) {
        if (wechatPayInfo[i].orderNo === this.$route.query.order_no) {
          if (wechatPayInfo[i].isPay === true) {
            // show完成支付dialog
            this.$vux.confirm.show({
              title: '提示',
              content: '请确认微信支付是否完成?',
              confirmText: '已完成支付',
              cancelText: '重新支付',
              hideOnBlur: false,
              onConfirm() {
                _this.$router.replace({
                  path: 'pay-result',
                  query: {
                    amount: _this.orderInfo.amount,
                    orderNo: _this.orderInfo.orderNo,
                    redirectUrl: _this.$route.query.redirect_url || '',
                    type: _this.$route.query.type
                  }
                });
              },
              onCancel() {
                wechatPayInfo[i].isPay = false;
                setStore(WECHAT_PAY_INFO, wechatPayInfo);
              }
            });
          }
          break;
        }
      }
    },
    methods: {
      removeImg(index) {
        this.imgList.splice(index, 1);
        this.imgBlobList.splice(index, 1);
      },
      imageUploadingHeader(e) {
        let fileData = e.target.files[0];
        let fileSize = fileData.size / 1024;
        if (fileSize > 10000) {
          e.target.value = '';
          return this.errToast.show('图片不能大于10M');
        }
        this.$vux.loading.show();
        this.objUrl = this.getObjectURL(fileData);
        this.uploadFile(fileData)
          .then(() => {
            e.target.value = '';
          });
      },
      uploadFile(data) {
        let formData = new window.FormData();
        formData.append('file', data);
        formData.append('token', this.token);
        return PayAPI.uploadImg(formData)
          .then(res => {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: 'success',
              text: '付款凭证已上传',
              position: 'middle',
              width: '9em'
            });
            this.imgList.unshift(res.result);
            this.imgBlobList.unshift(this.objUrl);
            this.objUrl = '';
          })
          .catch(() => {
            this.objUrl = '';
          });
      },
      payCharge() {
        this.$validator.validateAll('$remitInfo')
          .then(res => {
            if (res) {
              return res;
            }
            const errMsg = this.veeErrors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            if (this.imgList.length < 1) {
              return Promise.reject({msg: '请上传付款凭证'});
            }
            return Promise.resolve();
          })
          .then(() => {
            const data = Object.assign({}, this.remitInfo, {
              orderId: this.orderInfo.id || '',
              channel: this.isRecharge ? 1 : 2,
              imgURL: this.imgList.join(','),
              amount: this.orderInfo.amount
            });
            data.account = data.account.split(' ').join('');
            data.date = new Date(...data.date.split('-')).toISOString().slice(0, 10);
            return PayAPI.payOffline(data);
          })
          .then(() => {
            const _this = this;
            this.$vux.confirm.show({
              title: '提示',
              content: '支付凭证提交成功',
              confirmText: '查看我的' + (this.isRecharge ? '余额' : '订单'),
              hideOnBlur: true,
              onConfirm() {
                if (_this.isRecharge) {
                  _this.$router.replace({path: '/account'});
                } else {
//              _this.$router.replace('i/order');
                }
              }
            });
          })
          .catch(err => {
            errorHandler(err, this);
          });
      },
      getBankName() {
        if (this.userInfo.isBindBankCard) {
          return Promise.resolve();
        }
        let bankcard = this.quickFormInfo.bankcard.split(' ').join('');
        return UserBankApi.queryCardBin(bankcard)
          .then(res => {
            this.bankInfo = res || {};
          });
      },
      firstSendCode() {
        debounce(() => {
          let params = {
            outOrderId: this.orderInfo.orderNo,
            type: 'C',
            token: this.token
          };
          UserBankApi.preparePay(JSON.stringify(params))
            .then(res => {
              this.payInfo = res;
              this.startTiming();
              this.first = false;
              setTimeout(() => {
                this.$vux.toast.show({
                  type: 'text',
                  text: '发送成功',
                  position: 'middle'
                });
              }, 500);
            });
        }, 300)();
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
              type: 'C',
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
              return UserBankApi.fristPreparePay(JSON.stringify(params));
            } else {
              return UserBankApi.preparePay(JSON.stringify(params));
            }
          })
          .then(res => {
            this.payInfo = res;
            this.showCodeDialog = true;
            this.startTiming();
            setTimeout(() => {
              this.$vux.toast.show({
                type: 'text',
                text: '验证码已经发送',
                position: 'middle'
              });
            }, 500);
          });
      },
      sendCode() {
        debounce(() => {
          UserBankApi.bankSendSms()
            .then(() => {
              this.$vux.toast.show({
                type: 'text',
                text: '发送成功',
                position: 'middle'
              });
              this.startTiming();
            })
            .catch(() => {
              this.sendCodeBtnDisabled = false;
              this.sendCodeText = '重新发送';
            });
        }, 300)();
      },
      quickPayOk() {
        this.$validator.validateAll('$codeForm')
          .then(res => {
            if (res) {
              return Promise.resolve();
            }
            return Promise.reject(null);
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
            return UserBankApi.bankPay(JSON.stringify(params));
          })
          .then(res => {
            this.showCodeDialog = false;
            this.$vux.toast.show({
              type: 'text',
              text: '充值成功',
              position: 'middle'
            });
            this.$router.replace({path: '/account'});
          });
      },
      submitOrder() {
        this.showCodeDialog = false;
      },
      inputHandler(e, a, p) {
        let val = e.target.value;
        this.$nextTick(() => {
          this[a][p] =
            val
              .replace(/([\u4E00-\u9FA5]|[A-Za-z])+/g, '')
              .replace(/(\s|[^\d])/g, '')
              .replace(/(\d{4})(?=\d)/g, '$1 ')
              .slice(0, 23);
        });
      },
      selectTime() {
        this.remitInfo.date = this.time;
        this.showTime = false;
      },
      startTiming() {
        if (this.timer) {
          clearInterval(this.timer);
        }
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
      },
      alipay() {
        if (this.isRecharge) {
          let returnURl = window.location.origin + this.$router.resolve({
            path: 'pay-result',
            query: {
              amount: this.orderInfo.amount,
              orderNo: this.orderInfo.orderNo,
              redirectUrl: this.$route.query.redirect_url || '',
              type: this.$route.query.type
            }
          }).href;
          let params = {
            orderNo: this.orderInfo.orderNo,
            type: EnvType,
            returnURl: returnURl
          };
          PayAPI.rechargeAlipay(params)
            .then(res => {
              document.getElementById('alipayForm').innerHTML = res.url;
              let from = document.querySelector('#alipayForm form');
              from.submit();
            });
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: '暂时只支持余额充值!',
            position: 'middle'
          });
        }
      },
      wechatPayBtnhandler() {
        this.wechatBtnLoading = true;
        // 不是微信客服端, h5微信pay, 是微信客服端，先配置，在调用
        if (!isWeChat) {
          this.wechatPay();
        } else {
          if (this.isConfig) {
            this.$wechat.ready(this.wechatPay);
          } else {
            let url = window.location.origin + window.decodeURIComponent(this.$route.fullPath);
            WeChatAPI.getPayConfigParams(url)
              .then(res => {
                this.isConfig = true;
                this.wechatConfig(res);
              });
          }
        }
      },
      wechatConfig(res) {
//        const _this = this;
        this.$wechat.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ['checkJsApi', 'chooseWXPay'] // 必填，需要使用的JS接口列表
        });
        this.$wechat.ready(() => {
          this.$wechat.checkJsApi({
            jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//              let checkResult = JSON.parse(res.checkResult);
//              if (!checkResult.chooseWXPay) {
//                _this.errToast.show('chooseWXPay接口不支持');
//              }
            }
          });
          this.wechatPay();
        });
      },
      wechatPay() {
        const _this = this;
        let params = {
          type: 'WECHAT',
          orderNo: this.orderInfo.orderNo
        };
        if (isWeChat) {
          let wxInfo = JSON.parse(getStore('wx_info') || '{}');
          if (wxInfo.openid) {
            params.type = EnvType;
            params.openId = wxInfo.openid;
          } else {
            return this.errToast.show('缺少openid，请改用其他方式支付或者重新授权。');
          }
        }
        PayAPI.weChatPay(params)
          .then(data => {
            this.wechatBtnLoading = false;
            let res = JSON.parse(data.url);
            if (!isWeChat) {
              let rUri = window.encodeURIComponent(window.location.href);
              let mwebUrl = res.mweb_url + '&redirect_url=' + rUri;
              let wechatPayInfo = JSON.parse(getStore(WECHAT_PAY_INFO) || '[]');
              let hasOrder = false;
              for (let i = 0; i < wechatPayInfo.length; i++) {
                if (wechatPayInfo[i].orderNo === this.$route.query.order_no) {
                  hasOrder = true;
                  wechatPayInfo[i].isPay = true;
                  break;
                }
              }
              if (!hasOrder) {
                wechatPayInfo.push({
                  isPay: true,
                  orderNo: this.orderInfo.orderNo
                });
              }
              setStore(WECHAT_PAY_INFO, wechatPayInfo);
              window.location.href = mwebUrl;
            } else {
              this.$wechat.chooseWXPay({
                timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.paySign, // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                  if (res.errMsg === 'chooseWXPay:ok') {
                    // 支付成功
                    _this.$router.replace({
                      path: 'pay-result',
                      query: {
                        amount: _this.orderInfo.amount,
                        orderNo: _this.orderInfo.orderNo,
                        redirectUrl: _this.$route.query.redirect_url || '',
                        type: _this.$route.query.type
                      }
                    });
                  } else {
                    _this.errToast.show(res.errMsg);
                  }
                },
                cancel: function (res) {
                  // 支付取消
                  _this.$vux.toast.show({
                    type: 'text',
                    width: '6em',
                    text: '支付取消',
                    position: 'middle'
                  });
                }
              });
            }
          })
          .catch(() => {
            this.wechatBtnLoading = false;
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .cashier-center {
    background: #f4f4f4;
  }

  .vux-1px {
    &::before, &::after {
      border-radius: 2px;
      border-color: #EDEEF0;
    }
    .date-time {
      line-height: 20px;
      height: 20px;
    }
  }

  .order-confirm-dialog {
    header {
      font-size: 16px;
      line-height: 26px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .order-confirm {
      .error-info {
        position: absolute;
        top: 45px;
        left: 0;
        line-height: 23px;
        color: #F95453;
        font-size: 12px;
      }
      p.phone {
        text-align: left;
        font-size: 14px;
        padding: 18px 0;
        line-height: 1em;
      }
      .vcode {
        position: relative;
        background: #fff;
        height: 45px;
        margin-bottom: 30px;
        padding-right: 92px;
        input {
          width: 100%;
          font-size: 14px;
          &::-webkit-input-placeholder {
            color: #CCCDCF;
          }
        }
        .code {
          padding: 13px 12px 0;
          position: relative;
          z-index: 1;
        }
        .vcode-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: 92px;
          height: 45px;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 28px;
            width: 1px;
            background: #eaeaea;
            top: 7px;
          }
          input[type="button"] {
            font-size: 14px;
            color: #303137;
            height: 45px;
            &:disabled {
              color: #969696;
            }
          }
        }
      }
    }
  }

  .order-info {
    background: #fff;
    padding: 18px 20px;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 10px;
    .order-num {
      margin-bottom: 14px;
    }
    .order-price .co {
      font-size: 18px;
      color: #FD7220;
      font-weight: bold;
    }
    .left:first-child {
      width: 87px;
    }
  }

  .pay-methods {
    .pay-item {
      background: #fff;
      padding-left: 46px;
      position: relative;
      .vux-check-icon {
        position: absolute;
        left: 7px;
        top: 12px;
      }
      .vux-1px-b {
        height: 48px;
        line-height: 48px;
      }
      .pay-icon {
        height: 100%;
        display: block;
        margin: 0 12px 0 6px;
        width: 28px;
        img {
          width: 100%;
          height: auto;
          vertical-align: middle;
        }
      }
      .pay-name {
        margin-right: 10px;
      }
      .pay-subtitle {
        color: #969699;
        font-size: 12px;
      }
    }
  }

  .pay-content {
    overflow: hidden;
    max-height: 0;
    -webkit-transition: max-height .5s cubic-bezier(0, 1, 0, 1);
    transition: max-height .5s cubic-bezier(0, 1, 0, 1);
    &.animate {
      max-height: 9999px;
      -webkit-transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    }
  }

  .tip {
    font-size: 12px;
    margin: 16px 0;
  }

  .num {
    width: 20px;
    height: 20px;
    background: #303137;
    border-radius: 50%;
    color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    margin-right: 10px;
    position: absolute;
    left: 0;
  }

  .e-pay {
    .pay-content {
      padding: 0 15px;
      li {
        position: relative;
        padding-left: 28px;
        line-height: 20px;
        margin-bottom: 18px;
        word-break: break-all;
      }
    }
  }

  .bind-card-form {
    padding: 20px 20px 0;
    label {
      display: block;
      position: relative;
      height: 42px;
      line-height: 42px;
      margin-bottom: 22px;
      padding-left: 94px;
      &.vcode {
        .ipt-wrap {
          padding-right: 105px;
          button {
            position: absolute;
            right: 0;
            top: 0;
            height: 42px;
            z-index: 2;
            font-size: 14px;
            width: 93px;
            &::before {
              content: '';
              height: 28px;
              width: 1px;
              background: #EAEAEA;
              position: absolute;
              left: 0;
              top: 7px;
            }
            &:disabled {
              color: #969696;
            }
          }
        }
      }
      p {
        line-height: 42px;
      }
      span.label {
        position: absolute;
        left: 0;
        top: 0;
        width: 94px;
        color: #606166;
        font-size: 15px;
      }
      .ipt-wrap {
        width: 100%;
        padding: 11px 12px 0;
        background: #fff;
        height: 42px;
        input {
          display: block;
          width: 100%;
          position: relative;
          z-index: 1;
          font-size: 14px;
          &::-webkit-input-placeholder {
            color: #CCCDCF;
          }
        }
        .error-info {
          position: absolute;
          top: 42px;
          left: 0;
          line-height: 23px;
          color: #F95453;
          font-size: 12px;
        }
      }
    }
  }

  .offline-pay .pay-content {
    > div {
      padding: 0px 23px 0 15px;
      h3 {
        font-size: 15px;
        color: #333;
        line-height: 20px;
        margin-bottom: 11px;
        font-weight: normal;
      }
      li {
        position: relative;
        padding-left: 28px;
        margin-bottom: 15px;
        .ipt-wrap {
          width: 100%;
          padding: 11px 12px 0;
          background: #fff;
          height: 42px;
          margin-bottom: 10px;
          input {
            display: block;
            width: 100%;
            position: relative;
            z-index: 1;
            font-size: 14px;
            &::-webkit-input-placeholder {
              color: #CCCDCF;
            }
          }
        }
        p {
          font-size: 13px;
          color: #606166;
          line-height: 24px;
          .label {
            margin-right: 10px;
          }
        }
      }
    }
    div.img-list {
      padding-top: 10px;
      font-size: 0;
      .close {
        color: #fff;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.60);
        line-height: 16px;
        text-align: center;
        position: absolute;
        top: 5px;
        right: 5px;
        svg {
          fill: #fff;
          position: relative;
          left: -1px;
          top: -1px;
        }
      }
      li {
        padding: 0;
        float: left;
        overflow: hidden;
        position: relative;
        margin-bottom: 6px;
        margin-right: 6px;
        width: 75px;
        height: 75px;
        border-radius: 4px;
        &:last-child {
          border: 1px solid #DEDEDE;
          overflow: hidden;
        }
        img {
          width: 100%;
          min-height: 100%;
        }
      }
      .pic-box {
        position: relative;
        input {
          -webkit-appearance: none;
          opacity: 0;
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border: none;
          background: none;
        }
        .add-img {
          width: 75px;
          height: 75px;
          background: #fff;
          text-align: center;
          line-height: 75px;
          svg {
            vertical-align: middle;
            fill: #c2c2c2;
          }
        }
      }
    }
  }

  .pay-btn {
    padding: 29px 20px;
  }
</style>
<style lang="scss">
  .pay-item .vux-1px-b:after{
    border-color: #eaeaea;
    color: #eaeaea;
  }

</style>
