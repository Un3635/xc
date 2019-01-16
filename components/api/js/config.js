var Config = {
    //baseURL: '//47.96.37.107:8091',
    // baseURL: 'http://api.xt.top',
    baseURL: ip,
    smsCode: '/api/v2.0/user/getSmsCode',
    register: '/api/v2.0/user/register',
    verify: '/api/v2.0/user/checkWyCode',
    captchaId: 'dcbd8ebbc2eb46bb814439da5b51f2fc',
    smsCodeType: 10,
    regexp: {
        // mobile: /^1\d{10}$/,
        mobile:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
        code: /^\d{6}$/
    },
    validateConfig: {
        locale: 'zh_CN',
        events: '',
        delay: 500,
        classes: true,
        dictionary: {
            'zh_CN': {
                custom: {
                    mobile: {required: '请输入手机号码', mobile: '手机号码格式不正确'},
                    code: {required: '请输入验证码', code: '验证码格式不正确'},
                }
            }
        }
    },
    ErrorMapping: {
        "0": '成功',
        "5000": '系统异常',
        "5001": '没有更新数据',
        "5002": '没有数据',
        "5003": '客户端需要升级',
        "5004": '重复请求无效',
        "5005": '参数不合法',
        "5006": '验签失败',
        "5007": '验证码错误',
        "5008": '用户不存在',
        "5009": '用户不可用',
        "5011": '用户已存在',
        "5010": '用户没有登录',
        "6010": '验证码请求太频繁,请稍后重试',//短信验证码请求频繁，冻结1分钟
        "6012": '短信验证失败',
        "6013": '短信发送失败',
        "6014": '验证码请求太频繁,请稍后重试',//短信验证码请求超级频繁，冻结5分钟
        "6015": '验证码失效',
        "6016": '密码验证错误',
        "6017": '网易验证失败',
    }
};