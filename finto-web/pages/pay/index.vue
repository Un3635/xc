<template>
  <div class="pay">
    <!--<div class="tip" v-if="!isBillPay">ご利用ありがとうございます。ご注文を完了するため、２４時間以内にお支払いの手続をお願い申し上げます。</div>-->
    <div class="order clearfix">
      <p class="left" v-if="orderInfo.orderNo">伝票ID：{{orderInfo.orderNo}}</p>
      <p class="right">
        合計金額<strong>{{orderInfo.amount | currency}}</strong>円
      </p>
    </div>
    <div class="pay-way">
      <ul>
        <li class="clearfix" :class="{'actived': type == PaymentMethods.INTERNET_BANK}"
            @click="type = PaymentMethods.INTERNET_BANK">
          <el-checkbox class="left" v-model="type" :true-label="PaymentMethods.INTERNET_BANK"/>
          <div class="left">
            <img src="../../assets/images/icon/quick-pay.jpg" alt="">
          </div>
          <strong class="left">クレジットカード{{cardNO ? '(' + cardNO + ')' : ''}}</strong>
          <span class="small-tip left">即日決済</span>
          <div class="right">
            <el-button type="text" @click="bindCardDialog=true">{{!isBindCard ? '登録する' : 'クレジットカードの変更'}}</el-button>
          </div>
        </li>
        <li class="clearfix" :class="{'actived': type == PaymentMethods.TRANSFER}"
            @click="type = PaymentMethods.TRANSFER" v-if="source != 2">
          <el-checkbox class="left" v-model="type" :true-label="PaymentMethods.TRANSFER"/>
          <div class="left">
            <img src="../../assets/images/icon/transfer-accounts.png" alt="">
          </div>
          <strong class="left">銀行振込</strong>
          <span class="small-tip left">着金：２〜３営業日</span>
        </li>
      </ul>
    </div>
    <!--<div class="checkstand">-->
    <!--<h2>お支払い方法</h2>-->
    <!--<div class="order-info">-->
    <!--<div class="order-no clearfix" v-if="!isBillPay">-->
    <!--<strong class="left">ご注文ID</strong>-->
    <!--<p class="left">{{orderInfo.orderNo}}</p>-->
    <!--</div>-->
    <!--<div class="order-total clearfix">-->
    <!--<strong class="left">合計金額</strong>-->
    <!--<p class="left"><span class="price">{{orderInfo.amount | currency}}円</span></p>-->
    <!--</div>-->
    <!--<div class="pay-method clearfix">-->
    <!--<strong class="left">支払方法</strong>-->
    <!--<div class="left">-->
    <!--<div class="left pay-item" v-if="!isBillPay" :class="{'is-active': type == 2}" @click="type=2">-->
    <!--<p>銀行振込-->
    <!--&lt;!&ndash;<small>オフラインによる着金確認</small>&ndash;&gt;-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="left pay-item" :class="{'is-active': type == 1}" @click="type=1">-->
    <!--<p>クレジットカード-->
    <!--&lt;!&ndash;<small>即時着金</small>&ndash;&gt;-->
    <!--</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="band-card-pay-detail" v-show="type==1">
      <form class="safe-validate" v-show="isNeedValid && isBindCard">
        <p>セキュリティ認証</p>
        <label class="clearfix">
          <span>{{verifyMethod === 1 ? '携帯番号' : 'メールアドレス'}}</span>
          <p>{{verifyMethod === 1 ? replacePos(userInfo.mobile, '*', 3, 7) : hideEmail(userInfo.mailboxAccount)}}</p>
        </label>
        <label class="clearfix">
          <span>{{verifyMethod === 1 ? 'SMS認証' : 'メール認証'}}</span>
          <el-input placeholder="認証コード" v-model="code" maxlength="6"></el-input>
          <el-button @click="sendCode" type="text" :disabled="sendCodeBtnDisabled">{{sendCodeBtnText}}</el-button>
        </label>
      </form>
      <el-button @click="bankCardPay" :loading="payLoading"
                 :disabled="bankCardPayDisabled" class="submit-btn"
                 type="primary">支払う
      </el-button>
    </div>
    <div class="transfer-accounts-detail" v-show="type==2">
      <div class="steps">
        <ul>
          <li>
            <h3><span class="tag">1</span>銀行振込</h3>
            <div class="account">
              <div class="account-detail">
                <div class="clearfix">
                  <dt class="left">銀行名</dt>
                  <dd class="left">三菱東京UFJ銀行</dd>
                </div>
                <div class="clearfix">
                  <dt class="left">支店名</dt>
                  <dd class="left">恵比寿支店</dd>
                </div>
                <div class="clearfix">
                  <dt class="left">口座名義</dt>
                  <dd class="left">フィント株式会社</dd>
                </div>
                <div class="clearfix">
                  <dt class="left">口座番号</dt>
                  <dd class="left">(普)1222485</dd>
                </div>
              </div>
              <div class="pay-detail">
                <div class="clearfix">
                  <dt class="left">振込金額</dt>
                  <dd class="left">{{orderInfo.amount | currency}}円</dd>
                </div>
                <div class="clearfix remark">
                  <dt class="left co">お振込番号</dt>
                  <dd class="left">
                    <p class="remark-info"><strong>{{orderInfo.orderDesc}}</strong>
                      <el-button type="text" v-clipboard:copy="orderInfo.orderDesc" v-clipboard:success="onCopy">コピー
                      </el-button>
                    </p>
                    <p class="remark-tip">お振込の際に、上記のお振込番号を「振込依頼人名」にご入力ください。</p>
                  </dd>
                </div>
              </div>
            </div>
          </li>
          <li>
            <h3><span class="tag">2</span>お振込人情報</h3>
            <div class="remit-info">
              <div class="clearfix">
                <dt class="left">振込人名義</dt>
                <dd class="left">
                  <el-input v-model="remitInfo.remitName" placeholder="お振込名義のお名前をカタカナでご入力ください。"
                            v-validate="'required'"
                            name="name"
                            data-vv-scope="$remitInfo" @focus="errors.remove('name','$remitInfo')"></el-input>
                  <p class="error" v-if="errors.has('$remitInfo.name')">{{errors.first('$remitInfo.name')}}</p>
                </dd>
              </div>
              <div class="clearfix">
                <dt class="left">銀行名</dt>
                <dd class="left">
                  <el-input v-model="remitInfo.remitBankName" placeholder="銀行名をご入力ください。例）三菱UFJ銀行"
                            name="bank" v-validate="'required'" data-vv-scope="$remitInfo"
                            @focus="errors.remove('bank','$remitInfo')"></el-input>
                  <p class="error" v-if="errors.has('$remitInfo.bank')">{{errors.first('$remitInfo.bank')}}</p>
                </dd>
              </div>
              <div class="clearfix">
                <dt class="left">支店名</dt>
                <dd class="left">
                  <el-input v-model="remitInfo.remitSubbranchName" placeholder="支店名をご入力ください。例）恵比寿支店"
                            name="subBank" v-validate="'required'" data-vv-scope="$remitInfo"
                            @focus="errors.remove('subBank','$remitInfo')"></el-input>
                  <p class="error" v-if="errors.has('$remitInfo.subBank')">{{errors.first('$remitInfo.subBank')}}</p>
                </dd>
              </div>
              <div class="clearfix">
                <dt class="left">口座番号</dt>
                <dd class="left">
                  <el-input v-model="remitInfo.remitBankNo" placeholder="口座番号をご入力ください"
                            name="bankcard" v-validate="'required|bankcard'" data-vv-scope="$remitInfo"
                            @focus="errors.remove('bankcard','$remitInfo')"></el-input>
                  <p class="error" v-if="errors.has('$remitInfo.bankcard')">{{errors.first('$remitInfo.bankcard')}}</p>
                </dd>
              </div>
              <div class="clearfix">
                <dt class="left">お振込金額</dt>
                <dd class="left"><strong class="amount">{{orderInfo.amount | currency}}円</strong></dd>
              </div>
              <div class="clearfix">
                <dt class="left">お振込予定日</dt>
                <dd class="left">
                  <el-date-picker class="date-ipt" type="date" v-model="remitInfo.remitDate"
                                  :picker-options="pickerOptions" :clearable=false :editable="false"/>
                </dd>
              </div>
            </div>
          </li>
          <li>
            <h3><span class="tag">3</span>ご注文状況の確認</h3>
            <div class="step-content">
              ご注文手続きの完了後、
              <nuxt-link to="i/order">My FinTo―注文履歴</nuxt-link>
              より注文状況をご確認頂けます。銀行振込をご選択の場合は、ご提出いただいた情報をもとに順次着金の確認をさせて頂いておりますが、確認までに１〜３営業日程度の時間がかかる場合がございますこと、予めご了承ください。ご不明点や不明瞭な点につきましては、info@finto.jpへお問い合わせ
              ください。
            </div>
          </li>
        </ul>
      </div>
      <div class="submit-btn-wrap">
        <!--<p>ご提出いただいた情報をもとに順次着金の確認をさせて頂いております。本内容は訂正などは出来かねますことご了承下さい。ご入力はお間違いのないように十分にお気をつけください。</p>-->
        <el-button class="submit-btn" type="primary" :loading="submitLoading" @click="submit">購入手続きを完了する</el-button>
      </div>
    </div>
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
        <!--<h3 class="f-title">SMS認証</h3>-->
        <!--<label>-->
        <!--<span>手机号</span>-->
        <!--<p class="has-info">1831709**21</p>-->
        <!--</label>-->
        <!--<label class="clearfix">-->
        <!--<span>SMS認証</span>-->
        <!--<div class="code-ipt">-->
        <!--<input name="verifyCode" v-validate="'required|code'"-->
        <!--@focus="errors.remove('smsCode','bindCardForm')"-->
        <!--v-model="bindCardForm.smsCode" type="text" class="left"-->
        <!--placeholder="６桁のコードをご入力ください" maxlength="6"/>-->
        <!--<el-button class="send-code left" type="text"-->
        <!--:disabled="sendCodeBtnDisabled"-->
        <!--@click="sendCode">{{sendCodeBtnText}}-->
        <!--</el-button>-->
        <!--</div>-->
        <!--<p class="err-info" v-show="errors.has('bindCardForm.smsCode')">-->
        <!--{{errors.first('bindCardForm.smsCode')}}</p>-->
        <!--</label>-->
        <!--<label>-->
        <!--<span style="white-space: nowrap">グーグル認証</span>-->
        <!--<el-input name="googleCode" v-validate="'required|code'"-->
        <!--@focus="errors.remove('googleCode','bindCardForm')"-->
        <!--v-model="bindCardForm.googleCode"-->
        <!--placeholder="６桁のコードをご入力ください"/>-->
        <!--<p class="err-info" v-show="errors.has('bindCardForm.googleCode')">-->
        <!--{{errors.first('bindCardForm.googleCode')}}</p>-->
        <!--</label>-->
      </form>
      <span slot="footer">
            <el-button type="primary" @click="bindCard">{{isBindCard ? '変更する' : '登録する'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {AppConfig} from '../../services/config';
  import payAPI from '../../services/pay-api';
  import userAPI from '../../services/user-api';
  import errorHandler from '../../services/error-handler';
  import {TRACKER_GOODS_ITEM_KEY} from '../../store';
  import {UPDATE_TRACKER_GOODS_ITEM} from '../../store/mutation-types';
  import {replacePos, hideEmail, CountDown} from '../../services/utils';

  const PaymentMethods = {
    INTERNET_BANK: 1, // 信用卡支付
    TRANSFER: 2 // 对公转账
  };

  export default {
    head() {
      return {
        title: 'レジ_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    data() {
      return {
        c: this.$route.query.c || '',
        replacePos,
        hideEmail,
        PaymentMethods,
        // 1:信用卡支付 2: 线下对公转账
        type: 1,
        // 订单类型:  0.矿机  1.算力  2.电费管理费账单
        source: this.$route.query.source || '',
        pickerOptions: {
//          disabledDate(time) {
//            return time.getTime() > Date.now() - 8.64e6;
//          }
        },
        orderNo: '',
        orderInfo: {
          amount: 0,
          // needSend  0. 不需要发货  1.需要发货
          needSend: 1
        },
        remitInfo: {
          remitName: '',
          remitBankNo: '',
          remitBankName: '',
          remitSubbranchName: '',
          remitDate: new Date()
        },
        submitLoading: false,
        bindCardDialog: false,
        sendCodeBtnText: '認証コードを送信',
        sendCodeBtnDisabled: false,
        cardNO: '',
        bindCardForm: {
          name: '',
          bankcard: '',
          year: '',
          month: ''
        },
        isBindCard: false,
        isNeedValid: false,
        yearsList: [],
        monthsList: [],
        // 验证方式  1：短信 2: 邮箱
        verifyMethod: 1,
        code: '',
        codeToken: '',
        timer: null,
        payLoading: false
      };
    },
    mounted() {
      for (let j = 1; j <= 12; j++) {
        this.monthsList.push({label: j + '月', value: j});
      }

      for (let i = new Date().getFullYear(); i <= new Date().getFullYear() + 10; i++) {
        this.yearsList.push({label: i + '年', value: i});
      }

      this.orderNo = this.$route.query.orderNo;
      this.extraData = {token: this.token};
      if (localStorage[TRACKER_GOODS_ITEM_KEY + this.orderNo]) {
        this.$store.commit(UPDATE_TRACKER_GOODS_ITEM, {
          id: this.orderNo,
          items: JSON.parse(localStorage[TRACKER_GOODS_ITEM_KEY + this.orderNo])
        });
      }
      if (this.isBillPay) {
        this.orderInfo.amount = +this.$route.query.amount;
        this.type = 1;
      } else if (this.orderNo) {
        let source = Number(this.source) === 0 ? 1 : 2;
        payAPI.getPayInfo(this.orderNo, source)
          .then(res => {
            this.orderInfo = res;
          })
          .catch(errorHandler);
      }
      this.getBindCardInfo();
    },
    computed: {
      ...mapState(['token', 'trackerGoodsItem', 'userInfo']),
      isBillPay() {
        return !this.$route.query.orderNo;
      },
      bankCardPayDisabled() {
        if (!this.isBindCard) {
          return true;
        }
        if (!this.isNeedValid) {
          return false;
        }
        if (this.code.length !== 6) {
          return true;
        }
        return false;
      }
    },
    watch: {
      token() {
        this.extraData = {token: this.token};
      },
      userInfo: {
        handler(val) {
          this.cardNO = val.bankCardNo ? val.bankCardNo.substr(-4) : '';
          this.verifyMethod = val.mobile ? 1 : 2;
        },
        immediate: true
      }
    },
    methods: {
      getBindCardInfo() {
        payAPI.myCardInfo()
          .then(() => {
            this.isBindCard = true;
            this.getNeedValidInfo();
          })
          .catch(error => {
            if (error.code === '200305') {
              this.isBindCard = false;
            } else if (error.code === '200306') {
              this.isBindCard = true;
              this.getNeedValidInfo();
            }
          });
      },
      getNeedValidInfo() {
        payAPI.needValid(this.c)
          .then(res => res.result)
          .then(res => {
            this.isNeedValid = res === 1;
          });
      },
      onCopy(e) {
        this.$notify({
          message: 'コピーされました',
          type: 'success',
          duration: '1000',
          showClose: false
        });
      },
      submit() {
        this.submitLoading = true;
        this.$validator.validateAll('$remitInfo')
          .then(res => {
            if (res) {
              return res;
            }
            const errMsg = this.errors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            const {id, amount, orderDesc} = this.orderInfo;
            let params = Object.assign({}, this.remitInfo, {
              orderId: id,
              channel: 1,
              remitAmount: amount,
              desc: orderDesc,
              goodsType: Number(this.source) === 0 ? 1 : 2
            });
            let time = params.remitDate;
            let [year, month, day] = [time.getFullYear(), time.getMonth() + 1, time.getDate() < 10 ? '0' + time.getDate() : time.getDate()];
//            params.remitDate = params.remitDate.toISOString().slice(0, 10);
            params.remitDate = `${year}-${month}-${day}`;
            return payAPI.submit(params);
          })
          .then(() => {
            this.payBeforeBP();
            this.submitLoading = false;
            return this.$alert('ご購入のお手続きが完了いたしました。ご利用誠にありがとうございます。', '', {
              confirmButtonText: 'ご注文を確認する',
              showClose: false,
              type: 'success',
              center: false
            });
          })
          .then(() => {
            let source = Number(this.source);
            if (source === 2) {
              this.$router.replace('i/account');
            } else if (source === 0) {
              this.$router.replace('i/order');
            } else if (source === 1) {
              this.$router.replace('i/order?goodsType=2');
            }
          })
          .catch(err => {
            this.submitLoading = false;
            if (err === 'cancel') {
              return;
            }
            errorHandler(err);
          });

      },
      trackOrder() {
        let item = JSON.parse(JSON.stringify(this.trackerGoodsItem));
        item.forEach(i => {
          i.Price = Number(i.Price);
          i.Quantity = Number(i.Quantity);
        });
        this.$tracker.trackOrder({
          orderId: this.orderInfo.orderNo,
          orderTotal: Number(this.orderInfo.amount),
          item
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
            this.getBindCardInfo();
          })
          .catch(error => {
            if (!error) return;
            errorHandler(error);
          });
      },
      sendCode() {
        let params = {
          type: 9,
          account: this.verifyMethod === 1 ? this.userInfo.mobile : this.userInfo.mailboxAccount
        };
        userAPI.smsCode(params)
          .then(res => res || {})
          .then(res => {
            this.$message({
              type: 'success',
              message: '認証コードの送信に成功しました',
              showClose: true
            });
            this.codeToken = res;
            this.sendCodeBtnDisabled = true;
            this.timer = CountDown(60)
              .start(t => {
                this.sendCodeBtnText = t + 's';
              })
              .end(() => {
                this.sendCodeBtnDisabled = false;
                this.sendCodeBtnText = '認証コードを取得';
                clearInterval(this.timer);
              });
          })
          .catch(errorHandler);
      },
      bankCardPay() {
        this.payLoading = true;
        let params = {
          type: Number(this.source),
          orderNo: this.orderNo || '',
          authCode: this.code,
          codeToken: this.codeToken
        };
        payAPI.pay(params)
          .then(res => {
            this.payBeforeBP();
            this.payLoading = false;
            this.$message({
              type: 'success',
              message: '支払が完了しました',
              showClose: true
            });
            let source = Number(this.source);
            if (source === 2) {
              this.$router.replace('i/account');
            } else if (source === 0) {
              this.$router.replace('i/order?selected=' + (this.orderInfo.needSend === 1 ? 1 : 2));
            } else if (source === 1) {
              this.$router.replace('i/order?goodsType=2&selected=' + (this.orderInfo.deliveryTimeType === 1 ? 4 : 1));
            }
          })
          .catch(err => {
            this.payLoading = false;
            errorHandler(err);
          });
      },
      // 埋点
      payBeforeBP() {
        let {mobile, mailboxAccount} = this.userInfo;
        let newImg = document.createElement('img');
        newImg.src = 'https://www.cross-a.net/xa.php?adid=15839&rn=1&u1=' + (mobile ? mobile : mailboxAccount);
        newImg.style.cssText = 'width:1px;height:1px;position:absolute;z-index:-1;';
        document.body.appendChild(newImg);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/style/form-wrap";

  .pay {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
  }

  .tip {
    background: #FFFDEB;
    border: 1px solid #EBCE86;
    line-height: 55px;
    font-size: 18px;
    color: #FDAA24;
    font-weight: bold;
    padding: 0 30px;
    margin-bottom: 20px;
  }

  .checkstand {
    background: #fff;
    margin-bottom: 20px;
    h2 {
      height: 70px;
      line-height: 70px;
      border: 1px solid #eee;
      font-size: 24px;
      color: #303030;
      padding: 0 30px;
    }
  }

  .order {
    height: 124px;
    line-height: 124px;
    padding: 0 60px;
    margin-bottom: 10px;
    background: #fff;
    font-size: 18px;
    color: #303030;
    strong {
      display: inline-block;
      padding: 0 30px 0 10px;
      font-size: 30px;
      color: #FD7220;
      font-weight: normal;
    }
  }

  .pay-way {
    background: #fff;
    padding: 30px 60px 0;
    margin-bottom: 10px;
    li {
      cursor: pointer;
      height: 66px;
      line-height: 66px;
      border: 1px solid #fff;
      padding: 0 20px;
      position: relative;
      &:after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 50px;
        height: 100%;
        z-index: 1;
      }
      &.actived {
        border-color: #4185F5;
        box-shadow: 0 0 5px 0 rgba(65, 133, 245, 0.40);
      }
      img {
        margin: 0 20px;
        width: 26px;
        vertical-align: middle;
        position: relative;
        top: -2px;
      }
      strong {
        font-size: 18px;
        color: #303137;
        letter-spacing: 1px;
        font-weight: normal;
        min-width: 143px;
      }
      .small-tip {
        padding-left: 10px;
        font-size: 14px;
        color: #303137;
        letter-spacing: 0.78px;
      }
    }
  }

  .safe-validate {
    background: #fff;
    padding: 30px 60px;
    color: #303137;
    line-height: 36px;
    label {
      display: block;
      height: 36px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      span {
        width: 100px;
        font-size: 14px;
        float: left;
      }
      .el-input, & > p {
        float: left;
        width: 148px;
        font-size: 14px;
      }
      .el-button {
        float: left;
        padding: 9px;
      }
    }
    > p {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 18px;
    }
  }

  /*.order-info {*/
  /*padding: 20px 30px;*/
  /*font-size: 18px;*/
  /*color: #303137;*/
  /*line-height: 24px;*/
  /*strong {*/
  /*font-size: 18px;*/
  /*color: #303137;*/
  /*width: 152px;*/
  /*}*/
  /*.clearfix {*/
  /*margin-bottom: 20px;*/
  /*&:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/
  /*}*/
  /*.order-total {*/
  /*line-height: 38px;*/
  /*}*/
  /*.price {*/
  /*font-size: 30px;*/
  /*color: #FD7220;*/
  /*line-height: 38px;*/
  /*font-weight: bold;*/
  /*}*/
  /*.pay-method {*/
  /*line-height: 56px;*/
  /*}*/
  /*.pay-item {*/
  /*cursor: pointer;*/
  /*height: 56px;*/
  /*border: 2px solid #eee;*/
  /*margin-right: 30px;*/
  /*padding: 0 30px;*/
  /*position: relative;*/
  /*p {*/
  /*line-height: 52px;*/
  /*}*/
  /*&.is-active {*/
  /*border-color: #4D87EA;*/
  /*&:after {*/
  /*position: absolute;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*content: '';*/
  /*width: 27px;*/
  /*height: 27px;*/
  /*background: url("../../assets/images/selected.png") no-repeat center;*/
  /*}*/
  /*}*/
  /*small {*/
  /*font-size: 14px;*/
  /*color: #969699;*/
  /*}*/
  /*}*/
  /*}*/

  .band-card-pay-detail {
    .submit-btn {
      margin: 30px 0 80px 60px;
      width: 132px;
      height: 42px;
      line-height: 42px;
    }
  }

  .transfer-accounts-detail {
    .submit-btn-wrap {
      padding: 30px 30px 80px;
      p {
        margin-bottom: 15px;
        color: #000000;
      }
    }
  }

  .steps {
    background: #fff;
    padding: 0 30px;
    li {
      h3 {
        font-size: 18px;
        color: #303030;
        padding: 30px 0 0 26px;
        position: relative;
        .tag {
          position: absolute;
          left: 0;
          top: 33px;
          background: #303137;
          border-radius: 1px;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .account {
      background: #fafafa;
      margin-top: 20px;
      width: 496px;
      .account-detail {
        padding: 20px 26px;
        border-bottom: 1px dashed #ddd;
      }
      .pay-detail {
        padding: 20px 26px;
      }
      .clearfix {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
        dt {
          width: 106px;
          font-size: 14px;
          color: #969699;
        }
        dd {
          margin: 0;
          font-size: 14px;
          color: #303137;
          max-width: calc(100% - 106px);
        }
      }
      .remark {
        .co {
          color: #FD7220;
        }
        strong {
          color: #000;
        }
        .el-button {
          padding: 0 0 0 10px;
          border: 0;
          min-width: auto;
          font-weight: bold;
        }
        .remark-info {
          margin-bottom: 8px;
        }
        .remark-tip {
          font-size: 12px;
          color: #969699;
        }
      }
    }
  }

  .remit-info {
    padding-left: 26px;
    margin-top: 20px;
    .clearfix {
      margin-bottom: 20px;
    }
    dt {
      width: 106px;
      font-size: 14px;
      color: #303137;
      line-height: 36px;
    }
    dd {
      margin: 0;
      .el-input {
        width: 364px;
      }
      .date-ipt {
        width: 162px;
      }
    }
    .error {
      position: absolute;
      font-size: 12px;
      line-height: 24px;
      color: #f95453;
    }
    .amount {
      line-height: 36px;
      padding-left: 10px;
    }
  }

  .pay-upload-img {
    margin-top: 8px;
    padding-left: 26px;
    .upload-tip {
      font-size: 14px;
      color: #969699;
      margin-bottom: 20px;
    }
    .picture-card {
      width: 104px;
      height: 104px;
      background: #F1F1F1;
      border: none;
      border-radius: 0;
    }
  }

  .step-content {
    margin-top: 8px;
    padding-left: 26px;
    padding-bottom: 30px;
    color: #969699;
    line-height: 19px;
    a {
      color: #FD7220;
    }
  }

  .submit-btn {
    height: 42px;
    padding: 0 30px;
    border: 0;
    font-size: 18px;
    font-weight: bold;
  }
</style>
<style lang="scss">
  .remit-info .el-input .el-input__inner {
    background: none;
    border-radius: 4px;
    height: 36px;
  }

  .pay-upload-img {
    .el-upload {
      width: 104px;
      height: 104px;
      line-height: 104px;
      border: none;
      border-radius: 0;
      background: #f1f1f1;
    }
    .el-upload-list__item {
      width: 104px;
      height: 104px;
    }
    .el-upload--picture-card i {
      vertical-align: middle;
      font-size: 40px;
      color: #c2c2c2;
    }
  }

  .pay-way {
    .el-checkbox__input {
      .el-checkbox__inner {
        border-radius: 50%;
        width: 18px;
        height: 18px;
        &:hover {
          border-color: #4185F5;
        }
        &:after {
          left: 6px;
          top: 3px;
        }
      }
      &.is-checked .el-checkbox__inner {
        background: #4185F5;
        border-color: #4185F5;
        border-radius: 50%;
      }
    }
  }
</style>
