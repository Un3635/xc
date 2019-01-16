angular.module('apph5')
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        $httpProvider.interceptors.push('interceptor');
    })
    .factory('interceptor', function ($injector, $rootScope, $q) {
        var interceptor = {
            'request': function (config) {
                config.headers.client = 'web';
                if (localStorage.token) {
                    config.headers.token = localStorage.token;
                }
                if ($rootScope.xhrcount) {
                    $rootScope.xhrcount++;
                } else {
                    $rootScope.xhrcount = 1;
                    $injector.get('appservice').load()
                }
                return config;
            },
            'requestError': function (rejection) {
                $rootScope.xhrcount--;
                $injector.get('appservice').warn('网络错误，请稍后重试', 1000, function () {
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    } else {

                    }
                })
                return $q.reject('requestError');
            },
            'response': function (response) {
                $rootScope.xhrcount--;
                if ($rootScope.xhrcount == 0) {
                    $injector.get('appservice').loadhide()
                }
                if (response.data && response.data.code) {
                    if (response.data.code == 1000) {
                        return response.data.data;
                    } else {
                        if (response.data.code == 1401) {
                            return $q(function (res, rej) {
                                $injector.get('appservice').warn(response.data.msg, 1000, function () {
                                    rej()
                                    //$injector.get('appservice').login()
                                    window.location.href = 'rrh://www.renrenhua.com/app/login';
                                    setTimeout(function () {
                                        $injector.get('appservice').closejump(-1);
                                        // window.location.href = 'js://com.renwohua.conch/closeWindow';
                                    }, 500);
                                })
                            })
                        } else {
                            return $q(function (res, rej) {
                                //摩羯接口2000提示显示
                                if (response.config.url.indexOf('telecomAuthentication' >= 0)) {

                                    $injector.get('appservice').warn(response.data.msg, 2000, function () {
                                        rej()
                                    })
                                } else {
                                    $injector.get('appservice').warn(response.data.msg, 1500, function () {
                                        rej()
                                    })
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
                    } else {

                    }
                })
                return $q.reject('responseError');
            }
        }
        return interceptor;
    })