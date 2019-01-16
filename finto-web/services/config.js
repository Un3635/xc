const env = {
  development: {
    debug: true,
    baseURL: 'http://116.62.225.79:8090'

  },
  production: {
    debug: false,
    baseURL: 'PRODUCTION_BASEURL'

  }
};

const config = env[process.env.NODE_ENV];

export const AppConfig = {
  appTag: 1, // 应用标识  1 日文
  baseURL: config.baseURL,
  apiTimeout: 100000,

  pwdLogin: 'api/user/userPwdLogin',
  register: 'api/user/register',
  smsCode: 'api/user/sendValidCode',
  loginCheck: 'api/user/validLogin',
  changePassword: 'api/user/resetPwd',
  userInfo: 'api/user/userInfo',
  passwordByOld: 'api/user/passwordByOld',

  getHashCurrencyList: 'api/currency/getCurrencyList',
  getJyGoodsList: 'api/goods/getJyGoodsList',
  getHashOrderList: 'api/jyOrder/list',
  getJyGoodsInfo: 'api/goods/getJyGoodsInfo',
  hashOrderSubmit: 'api/jyOrder/submit',
  getGoodsTax: 'api/goods/getGoodsTax',

  powerColligate: 'api/power/trust/comprehensiveInfo',
  powerIncomeList: 'api/power/trust/incomeList',
  powerDetail: 'api/power/trust/detail',
  powerDetailList: 'api/power/trust/detailList',
  powerInfo: 'api/power/trust/info',
  powerInfoList: 'api/power/trust/infoList',

  goodsCategory: 'api/goods/getGoodsCategoryList',
  goodsList: 'api/goods/getGoodsList',
  goodsDetail: 'api/goodsDetail/getGoodsInfo',
  goodsAttribute: 'api/goodsDetail/getGoodsAttributeList',
  userRefundList: 'api/userAccount/userRefundList',
  userAccountInfo: 'api/userAccount/userAccountInfo',
  userAccountCurrencyInfo: 'api/userAccount/userAccountCurrencyInfo',
  userAccountCoin: 'api/userAccount/userAccountCoin',
  accountDetail: 'api/userAccount/currencyInfo',
  currencyInfoList: 'api/userAccount/currencyInfoList',
  centerList: 'api/order/myCenter/list',
  getExpressNoList: 'api/order/getExpressNoList',
  cancelOrder: 'api/order/releaseOrder',
  billAmount: 'api/userAccount/waitPayBillTotalMoney',
  billList: 'api/userAccount/waitPayBillList',
  billInfo: 'api/userAccount/billInfo',
  billInfoList: 'api/userAccount/userBillInfo',
  bannerList: 'api/home/getBannerList',
  notice: 'api/home/getNotice',
  recommendGoodsList: 'api/home/getRecommendGoodsList',
  video: 'api/home/getVideo',
  updateStatus: 'api/address/updateStatus',
  updateAddress: 'api/address/updateAddress',
  getCityByCode: 'api/address/getCityByCode',
  saveAddress: 'api/address/saveAddress',
  getAddressList: 'api/address/getAddressList',
  googleAuth: 'api/google/getGoogleAuth',
  bindGoogleAuth: 'api/google/bindGoogleAuth',

  byGoodsId: 'api/cart/byGoodsId',
  delGoods: 'api/cart/delGoods',
  getCartList: 'api/cart/list',
  updateCount: 'api/cart/updateCount',
  submitOrder: 'api/order/submitOrder',
  getOrder: 'api/order/getOrder',
  orderSummary: 'api/order/orderCount',

  prepareSubmitOrder: 'api/order/prepareSubmitOrder',
  addWallet: 'api/securityCenter/addWalletAddress',

  uploadUrl: 'api/securityCenter/updatePic',
  certify: 'api/securityCenter/certification',
  getPicUrl: 'api/securityCenter/getPicUrl',
  certifyInfo: 'api/securityCenter/getUserInfo',

  getPayInfo: 'api/payInfo/toPayInfoCenter',
  payInfoUploadUrl: 'api/payInfo/uploadPic',
  submitPayInfo: 'api/payInfo/submitPayInfo',

  colligate: 'api/trust/getTrustSummarize',
  currencyList: 'api/trust/getUserCurrencyList',
  deliveryList: 'api/trust/waitTrustList',
  tmList: 'api/trust/trustList',
  trustDetail: 'api/trust/getTrustDetail',
  trustMachineList: 'api/trust/getTrustMachineList',
  machineDetail: 'api/trust/getMachineDetail',
  machineRunningDetail: 'api/trust/getMachineRunning',
  machineIncomeDetail: 'api/trust/getMachineIncome',

  myCardInfo: 'api/pay/myCardInfo',
  needValid: 'api/pay/needValid',
  bindingCard: 'api/pay/bindingCard',
  cardPay: 'api/pay/pay',

  regExp: {
    phone: /^\d{11}$/,
    bankcard: /^\d{2,7}$/,
    creditCard: /^\d{14,16}$/,
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/,
    email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    code: /^\d{6}$/,
    zipCode: /^\d{3}$/,
    zipCodeNum: /^\d{4}$/,
    addressPhone: /^\d{10,11}$/
  },
  validateConfig: {
    // inject: false,
    locale: 'jp',
    events: '',
    delay: 500,
    classes: true,
    validity: false,
    dictionary: {
      'jp': {
        custom: {
          name: {required: 'お名前をご入力ください'},
          account: {required: 'ログインアカウント名を入力してください', account: '未登録の携帯電話またはメールアドレスです'},
          regAccount: {required: 'ログインアカウント名を入力してください', account: '有効な携帯電話番号またはメールアドレスを入力してください'},
          bankcard: {required: '口座番号をご入力ください', bankcard: '口座番号は2-7桁の数字となります'},
          creditCard: {required: 'カード番号をご入力ください', creditCard: '14－16桁の数字をご入力ください'},
          bank: {required: '銀行名をご入力ください'},
          subBank: {required: '支店名をご入力ください'},
          phone: {required: '電話番号をご入力ください。(ハイフンなどは必要ありません)', phone: '正しい番号を入力してください'},
          email: {required: 'メールアドレスは必須', email: 'メールアドレスの書式は正しくない'},
          code: {required: 'SMS認証コードをご入力ください', code: '正しい認証コードをご入力ください'},
          password: {required: 'パスワードは必須', password: 'パスワードが正しくありません'},
          regPassword: {required: 'パスワードは必須', password: 'パスワードは８～１８桁の英数字にてご設定ください'},
          detail: {required: '都道府県以降の住所をご入力ください'},
          idCard: {required: 'IDは必須', idCard: 'ID書式は正しくない'},
          address: {required: 'ウォレットアドレスをご入力ください'},
          remark: {required: 'ウォレットの場所をご入力ください（例）BitFlyer'},
          oldPassword: {required: '現在のパスワードをご入力ください'},
          newPassword: {required: '新しいパスワードをご入力ください', password: 'パスワードは８～１８桁の英数字にてご設定ください'},
          confirmPwd: {required: 'もう一度新しいパスワードをご入力ください', confirmed: 'パスワードが一致していません'},
          num: {required: '正しい数を入力してください', decimal: '無効な数字'},
          verifyCode: {required: '認証コードをご入力ください', code: '正しい認証コードをご入力ください'},
          zipCode: {required: '郵便番号をご入力ください', zipCode: '3桁'},
          zipCodeNum: {required: '郵便番号をご入力ください', zipCodeNum: '4桁'},
          addressPhone: {required: '電話番号をご入力ください（ハイフンなどは必要ありません）', addressPhone: '正しい電話番号をご入力ください'},
          googleCode: {required: 'Google認証コードをご入力ください', code: '正しいGoogle認証コードをご入力ください'}
        }
      }
    }
  }
};

export const CommonProblem = [
  {
    id: 1,
    question: 'クラウドマイニングサービスを購入後、どれくらいでコインが得られますか？',
    answer: '各サービスに定められたスタート日より運用開始となります。その日よりコイン収益がございます。第1日目の収益は第2日目にアカウントにアップデートされます。'
  },
  {
    id: 2,
    question: 'クラウドマイニングの収益はどうやって計算されて送られてくるのですか？',
    answer: 'マイニングの稼働時間に応じて報酬を計算するPPS（Pay Per Share)方式を用いています。コイン収益は実際の電気代、管理費を差し引いたコインを毎日お送り致します。'
  },
  {
    id: 3,
    question: '電気代と管理費はどうやって計算されますか？',
    answer: '電気代はご購入頂いたハッシュパワー量に対し、消耗された実際の電力に応じて計算されます。1kw/hの単価は購入ページよりご確認ください。管理費はコイン収益総額に対して、当社の定める一定の割合（20％〜）を頂戴しております。いずれの費用もマイニングされたコインより自動引き落としの形でお支払いを頂いております。'
  },
  {
    id: 4,
    question: '電気代として控除されるコインはいつの時点でのコイン価格で計算されますか？',
    answer: '現在は、日本時間午前8時のBitbank取引所の価格を用いて、計算されます。ネットワークやテクニカルエラー発生時は、日本国内の別の取引所のデータを用いることとなります。'
  },
  {
    id: 5,
    question: 'どうやって溜まったコインを引き出したら良いですか？',
    answer: '先ずはご自身のウォレットを設定して頂きます。（アカウント→設定→ウォレット設定）その上で、アカウントより引き出すコイン種類とコイン枚数を指定します。その枚数より送金手数料が控除された枚数が１〜２営業日以内にご設定頂いたウォレットに届きます。但し、アカウント内のコインが0.1を超えていないと送金する事が出来ません。'
  },
  {
    id: 6,
    question: '購入後のキャンセルはできますでしょうか？',
    answer: '大変恐れ入りますが、ご購入後のキャンセルはご対応しかねます。'
  },
  {
    id: 7,
    question: 'もし運用中に問題が起きたらどうしたら良いですか？',
    answer: 'どのような些細な事でも、「info@finto.jp」へお問い合わせください。弊社サポートチームが速やかにご返信させて頂きます。'
  }
];

export const ErrorMapping = {};

export const BalanceType = {
  COIN: 0, // 以币抵扣
  BALANCE: 1// 余额支付
};
