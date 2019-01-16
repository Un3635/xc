angular.module('app')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
    })
    .factory('interceptor', function ($injector, $rootScope, $q, $timeout) {
        var interceptor = {
            'request': function (config) {
                config.headers.client = window.GLOBAL.client;
                config.headers.model = window.navigator.userAgent;
                config.headers.deviceid = window.navigator.userAgent;
                config.headers.version = window.GLOBAL.version;
                if (localStorage.token) {
                    config.headers.token = localStorage.token;
                }
                if (config.url.indexOf('templates/') >= 0) {

                } else {
                    if ($rootScope.xhrcount) {
                        $rootScope.xhrcount++;
                    } else {
                        $rootScope.xhrcount = 1;
                        $injector.get('appservice').load()
                    }
                }

                return config;
            },
            'response': function (response) {
                if (response.config.url.indexOf('templates/') >= 0) {
                } else {
                    $rootScope.xhrcount--;
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                }
                if (response.data && response.data.code) {
                    if (response.data.code == 1000) {
                        return response.data.data;
                    } else {
                        if (response.data.code == 1401) {  ///登录失效
                            return $q(function (res, rej) {
                                $injector.get('appservice').warn(response.data.msg, 2000, function () {
                                    localStorage.removeItem("token");
                                    rej()
                                    $injector.get('appservice').login()
                                })
                            })
                        } else if (response.data.code == 1111) {  ///列表空不提示报错
                            return $q(function (res, rej) {
                                rej(response.data)
                            })
                        } else {///其他类型报错
                            return $q(function (res, rej) {
                                if (response.config.url.indexOf('userV2/nonpartyAccredit.open') >= 0 || response.config.url.indexOf('huabi/getCurrencyLog.rrh') >= 0 || response.config.url.indexOf('queryUserIdcard.rrh') >= 0 || response.config.url.indexOf('/bankcard/getBankCardByUser.rrh') >= 0) {
                                    $timeout(function () {
                                        rej(response.data)
                                    })
                                } else {
                                    $injector.get('appservice').warn(response.data.msg, 2000)
                                    rej(response.data)
                                }
                            })
                        }

                    }
                } else {
                    return response;
                }

            },
            'responseError': function (rejection) {
                $rootScope.xhrcount--;
                $injector.get('appservice').warn('网络错误，请稍后重试', 1000, function () {
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                })
                return $q.reject('responseError');
            },
            'requestError': function (rejection) {
                $rootScope.xhrcount--;
                $injector.get('appservice').warn('网络错误，请稍后重试', 1000, function () {
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                })
                return $q.reject('requestError');
            }
        }
        return interceptor;
    })