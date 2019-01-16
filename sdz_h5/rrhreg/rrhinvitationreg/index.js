var app = angular.module('app', []);
app.run(function ($rootScope) {
    var GLOBAL = {
        debug: true,
        debugServer: 'test',
        userUrl: 'https://www.renrenhua.com/userapi',
        coreUrl: 'https://www.renrenhua.com/coreapi',
        payUrl: 'https://www.renrenhua.com/payapi',
        version: '2.1',
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
            GLOBAL.payUrl = 'http://testwww.renrenhua.com/payapi';
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
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $scope.item = {
        phone: "",
        code: "",
        password: "",
        recommend_id: GetQueryString("recommend_id") || "",
        channel_id: GetQueryString("channel_id") || 10
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

    $scope.check = true;

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
        } else {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/register.open', $scope.item).then(function (data) {
                appservice.warn("注册成功", 1000, function () {
                    window.location.href = 'download.html'
                })
            })
        }
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

    $scope.go = function () {
        window.location.href = 'download.html'
    }
})