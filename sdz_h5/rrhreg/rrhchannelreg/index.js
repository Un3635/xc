var app = angular.module('app', []);
app.run(function ($rootScope) {
    var GLOBAL = {
        debug: false,
        debugServer: 'test',
        userUrl: 'https://www.renrenhua.com/userapi',
        coreUrl: 'https://www.renrenhua.com/coreapi',
        payUrl: 'https://www.renrenhua.com/payapi',
        version: '2.3.0',
        client: 'web',
        iframeurl: "",
        instep: false,//是否处在借款流程中
        instepover: false//是否借款结束
    };
    if (location.href.indexOf('test') >= 0) {
        GLOBAL.debug = true
    }
    if (GLOBAL.debug) {
        if (GLOBAL.debugServer == 'dev') {
            GLOBAL.userUrl = 'http://dev.renrenhua.com/userUrl';
            GLOBAL.coreUrl = 'http://dev.renrenhua.com/coreUrl';
            GLOBAL.payUrl = 'http://dev.renrenhua.com/payUrl';
        } else {
            GLOBAL.userUrl = 'http://testwww.renrenhua.com/userapi';
            GLOBAL.coreUrl = 'http://testwww.renrenhua.com/coreapi';
            GLOBAL.payUrl = 'http://testwww.renrenhua.com/payUrl';
        }
    }
    $rootScope.GLOBAL = GLOBAL;
    window.GLOBAL = GLOBAL;
    $rootScope.showloading = false;
    $rootScope.showwarn = false
    $rootScope.showwarntext = "";

})
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptor');
})
app.factory('appservice', function ($rootScope, $timeout, $http) {
    var _service = {
        postdata: function (url, data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            })
        },
        warn: function (text, time, cb) {
            $rootScope.showwarntext = text;
            $rootScope.showwarn = true;
            $timeout(function () {
                $rootScope.showwarntext = "text";
                $rootScope.showwarn = false;
                if (cb) {
                    cb()
                }
            }, time)
        },
        loading: function () {
            $rootScope.showloading = !$rootScope.showloading;
        }
    }
    return _service;
})
app.factory('interceptor', function ($injector, $rootScope, $q, $timeout) {
    var interceptor = {
        'request': function (config) {
            config.headers.client = window.GLOBAL.client;
            config.headers.model = window.navigator.userAgent;
            config.headers.deviceid = window.navigator.userAgent;
            config.headers.version = window.GLOBAL.version;
            if (localStorage.token) {
                config.headers.token = localStorage.token;
            }
            $injector.get('appservice').loading();
            return config;
        },
        'response': function (response) {
            $injector.get('appservice').loading();
            if (response.data) {
                if (response.data.code == 1000) {
                    return response.data.data;
                } else {
                    return $q(function (res, rej) {
                        $injector.get('appservice').warn(response.data.msg, 2000, function () {
                            rej(response.data)
                        })
                    })
                }
            } else {
                return response
            }

        },
        'responseError': function (rejection) {
            return $q.reject('responseError');
        },
        'requestError': function (rejection) {
            return $q.reject('requestError');
        }
    }
    return interceptor;
})
app.controller('ctrl', function ($scope, appservice, $interval, $rootScope) {
    var _jrtt = {
        '43': 64868092716,
        '54': 66291604640,
        '55': 66291712572,
        '62': 67711305317,
        '63': 67711305317,
        '64': 67711305317,
        '68': 67872041025,
        '69': 67872041025,
        '70': 67872041025,
        '72': 67872041025,
        '73': 67872041025,
        '74': 67872041025,
        '75': 67872041025,
        '76': 67872041025,
        '77': 67872041025,
        '78': 67872041025
    }


    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    var _cid = GetQueryString("channel_id");
    var _gdtclick_id = GetQueryString("click_id") || "";
    if (_cid && _jrtt[_cid]) {
        (function (root) {
            root._tt_config = true;
            var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
            ta.src = document.location.protocol + '//' + 's3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
            ta.onerror = function () {
                var request = new XMLHttpRequest();
                var web_url = window.encodeURIComponent(window.location.href);
                var js_url = ta.src;
                var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=' + _jrtt[_cid];
                request.open('GET', url, true);
                request.send(null);
            }
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
        })(window);
    }

    $scope.getbg = function () {

        appservice.postdata($rootScope.GLOBAL.userUrl + '/channel/getChannelInfo.open', {
            channel_id: GetQueryString("channel_id") || 10
        }).then(function (data) {
            $scope.bgurl = data.imgUrlGuide || 'img/453205-01.png';
            //<easydebug>
            console.log($scope.bgurl);
            //<easydebug>
        })
    }
    $scope.getbg();

    $scope.item = {
        phone: "",
        code: "",
        password: "",
        recommend_id: "",
        channel_id: GetQueryString("channel_id") || 10,
        voucher_id: GetQueryString("cp_id") || 0,
        gdtclick_id: GetQueryString('qz_gdt') || '',
        gdturl: window.location.href,
    }

    $scope.codeimg = {
        show: false,
        baseurl: '',
        code: "",
        change: function () {
            $scope.codeimg.url = $scope.codeimg.baseurl + '?phone=' + $scope.item.phone + '&t=' + new Date();
        }
    }

    $scope.djs = {
        time: 0,
        start: function () {
            var that = this;
            that.time = 60;
            that.interval = $interval(function () {
                that.time--;
                if (that.time == 0) {
                    $interval.cancel(that.interval)
                }
            }, 1000)
        }
    }

    $scope.getcode = function () {
        initNECaptcha({
            captchaId: 'f054a583d9d54d5bacbd0b223bba8fbf',
            element: '#captcha',
            mode: 'popup',
            onReady: function (instance) {
            },
            onVerify: function (err, data) {
                if (err) {
                    return
                }
                appservice.postdata($rootScope.GLOBAL.userUrl + '/sms/sendCode.open', {
                    phone: $scope.item.phone,
                    type: 0,
                    captchaCode: data.validate,
                }).then(function (data) {
                    $scope._isFromWechatAuthHasReg = data.exist;
                    appservice.warn("短信验证码发送成功", 1000, function () {
                        $scope.djs.start();
                    })
                }, function (errdata) {
                })
            }
        }, function onload(instance) {
            instance.popUp();
        }, function onerror(err) {
        })
    }

    $scope.reg = function () {
        if ($scope.item.password.search(/^[a-zA-Z\d]{6,16}$/) == -1) {
            appservice.warn('密码只能是6-16位的数字或字母', 1000);
            return
        }
        appservice.postdata($rootScope.GLOBAL.userUrl + '/user/register.open', $scope.item).then(function (data) {
            appservice.warn("注册成功", 1000, function () {
                localStorage.removeItem('token');
                if (_cid && _jrtt[_cid]) {
                    _taq.push({ convert_id: _jrtt[_cid], event_type: "form" })
                }
                if (GetQueryString("fromrrhchannelcp") == 1) {
                    history.back()
                } else {
                    $scope.go(data.result);
                }
            })
        })
    }

    $scope.jump = function (type) {
        var url = '';
        if (type == 2) {
            url = '//app.renrenhua.com/rrhprotocolh5/registerProtocol.html';
        } else if (type == 1) {
            url = '//app.renrenhua.com/rrhprotocolh5/creditAuthorizationProtocol.html';
        } else {
            url = '//app.renrenhua.com/rrhprotocolh5/cost.html';
        }
        window.location.href = url;
    }

    $scope.go = function (token) {
        var url = '';
        var schema = window.GLOBAL.debug ? 'http://testm.renrenhua.com' : '//app.renrenhua.com'
        if (!token) {
            url = schema + '/wechat/#/homechannel/1';
        } else {
            url = schema + '/wechat/?token=' + token + '#/homechannel/-1'
        }
        window.location.href = url;
    }
})