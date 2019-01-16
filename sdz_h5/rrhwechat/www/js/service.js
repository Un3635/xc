angular.module('app')
    .factory('appservice', function ($injector, $timeout, $rootScope, $http, $ionicPopup, $ionicModal, $q, $state, $ionicHistory) {
        var _service = {
            warn: function (text, time, callback, boolfiltertext) {
                time = time || 1000;
                text = text ? (text + "") : "";
                if (boolfiltertext) {
                    if (text.indexOf('异常') >= 0 || text.indexOf('错误') >= 0) {
                        text = '系统繁忙,请稍后再试'
                    }
                }
                $injector.get('$ionicLoading').show({
                    template: '<span class="appservicewarn">' + text + '</span>',
                    animation: 'fade-in',
                    duration: time
                })
                $timeout(function () {
                    $injector.get('$ionicLoading').hide().then(function () {
                        if (callback) {
                            callback()
                        }
                    })
                }, time)
            },
            load: function (fn) {
                $injector.get('$ionicLoading').show({
                    //template: '<ion-spinner icon="bubbles"></ion-spinner>',
                    templateUrl: 'templates/svg/index.html',
                    animation: 'fade-in',
                }).then(function () {
                    if (fn) {
                        fn()
                    }
                })
            },
            loadhide: function (fn) {
                $injector.get('$ionicLoading').hide().then(function () {
                    if (fn) {
                        fn()
                    }
                })
            },
            login: function (_scope) {
                if (!$rootScope.loginmodal || $rootScope.loginmodal._isShown == false) {
                    _service.load();
                    $ionicModal.fromTemplateUrl('templates/modallogin/index.html', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _service.loadhide();
                        _scope = _scope || $rootScope;
                        _scope.loginmodal = modal;
                        $rootScope.loginmodal = modal;
                        _scope.loginmodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.loginmodal.remove();
                        });
                    })
                }
            },
            getdata: function (url, data, showwarn) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: data,
                    timeout: 1000 * 100,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
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
            postdata: function (url, data, showwarn) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    timeout: 1000 * 100,
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
            postimg: function (url, file, data) {
                var fd = new FormData();
                fd.append('file', file)
                for (var i in data) {
                    fd.append(i, data[i])
                }
                return $http({
                    method: 'POST',
                    url: url,
                    data: fd,
                    headers: {
                        'Content-Type': undefined,
                    },
                })
            },
            waveloginreg: function () {
                $rootScope.popwaveloginreg = $ionicPopup.show({
                    templateUrl: 'templates/popwaveloginreg/index.html',
                    cssClass: 'waveloginreg'
                });
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on('click', function (event) {
                    if (event.target.nodeName === 'HTML') {
                        if ($rootScope.popwaveloginreg) {//myPopup即为popup
                            $rootScope.popwaveloginreg.close();
                        }
                    }
                });
            },
            goWithToken: function (scope, state, stateP) {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        $state.go(state, stateP)
                        res()
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            goWithTokenwaveloginreg: function (scope, state, stateP) {
                if (localStorage.token) {
                    $state.go(state, stateP)
                } else {
                    _service.waveloginreg()
                }
            },
            checktoken: function () {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        res()
                    } else {
                        _service.waveloginreg()
                        rej()
                    }
                })
            },
            goWithAuth: function (scope, user, state) {

                return $q(function (res, rej) {
                    if (localStorage.token) {
                        if (user.certification) {
                            $state.go(state)
                            res()
                        } else {
                            $rootScope.goWithAuthionicPopup = $ionicPopup.confirm({
                                title: '请先完成实名认证',
                                cancelText: '暂不认证',
                                okText: '去认证',
                                cssClass: 'ionicPopupgoWithAuth'
                            })
                            $rootScope.goWithAuthionicPopup.then(function (res1) {
                                if (res1) {
                                    $state.go('autonym')
                                    res()
                                } else {
                                    rej()
                                }
                            });
                        }
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            goWithAuth2: function (scope, user, state) {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        if (user.certification) {
                            $state.go(state)
                            res()
                        } else {
                            $state.go('autonym')
                            res()
                        }
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            urlback: function (num) {
                num = num || -1
                $ionicHistory.goBack(num);
            },
            urlgo: function (state, params) {
                $state.go(state, params)
            }
        }
        window.i = $ionicHistory;
        window.rrhwechatappservice = _service;
        return _service;
    })