import config from '../../config';

const AppConfig = {
  debug: config.debug,       // debug模式
  apiEndpoint: config.apiEndpoint,   // 接口请求地址
  apiTimeout: 20000, // 接口超时时间(单位:ms)
  searchExecute: '/search/execute',
  searchParam: '/search/param',
  commodityInfo: '/item/infos',
  commodityDetail: '/item/detail',
  commodityParameter: '/item/parameter',
  regex: {
    phone: /^1[34578]\d{9}$/,
    nationalPhone: /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
    code: /^\d{6}$/,
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/,
    email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    card: /^(\d{4}\s?){3}((\d{3})|(\d{4})|(\d{4}\s?\d{0,3}))$/,
    bank: /./
  },
  validateConfig: {
    errorBagName: 'veeErrors',
    locale: 'zh_CN',
    events: '',
    delay: 500,
    classes: true,
    dictionary: {
      'zh_CN': {
        custom: {
          name: {required: '姓名为必填项'},
          bankcard: {required: '请输入银行帐号', bankcard: '银行卡号为15-19位数字'},
          bank: {required: '开户行为必填项', bank: '开户行应包含"银行"'},
          phone: {required: '手机号不能为空', phone: '手机号格式不正确'},
          email: {required: '邮箱不能为空', email: '邮箱格式不正确'},
          code: {required: '验证码不能为空', code: '验证码格式不正确'},
          password: {required: '密码不能为空', password: '请输入8-18位字母与数字组合'},
          detail: {required: '请输入详细地址'},
          idCard: {required: '身份证不能为空', idCard: '身份证格式不正确'},
          address: {required: '地址不能为空'},
          remark: {required: '备注不能为空'},
          oldPassword: {required: '旧密码不能为空'},
          confirmPwd: {required: '请确认你的密码', is: '两次密码不一致'},
          num: {required: '请输入正确的数量', decimal: '无效的数字'}
        }
      }
    },
    validity: false
  }
  // ,
  // locales: [
  //   {
  //     lang: 'zh-cn',
  //     flag: require('../../static/images/common_cn.svg'),
  //     name: '简体中文',
  //     link: 'http://47.97.166.210'
  //   },
  //   {
  //     lang: 'en-us',
  //     flag: require('../../static/images/common_en.svg'),
  //     name: 'English',
  //     link: 'http://47.96.37.107:96'
  //   }
  // ]
};

export default AppConfig;
