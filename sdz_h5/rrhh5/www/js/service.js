angular.module('apph5')
    .factory('appservice', function ($injector, $timeout, $rootScope, $http) {
        var _service = {
            warn: function (text, time, callback) {
                time = time || 1000;
                if (text.indexOf('异常') >= 0) {
                    text = '系统繁忙,请稍后再试'
                }
                $injector.get('$ionicLoading').show({
                    template: '<span class="appservicewarn">' + text + '</span>',
                    animation: 'fade-in',
                    duration: time || 1000
                })
                $timeout(function () {
                    $injector.get('$ionicLoading').hide().then(function () {
                        if (callback) {
                            callback()
                        }
                    })
                }, time + 100)
            },
            load: function (fn) {
                if (fn) {
                    $injector.get('$ionicLoading').show({
                        template: '<ion-spinner icon="bubbles"></ion-spinner>',
                        animation: 'fade-in'
                    }).then(function () {
                        fn()
                    })
                } else {
                    $injector.get('$ionicLoading').show({
                        template: '<ion-spinner icon="bubbles"></ion-spinner>',
                        animation: 'fade-in'
                    })
                }

            },
            loadhide: function (fn) {
                if (fn) {
                    $injector.get('$ionicLoading').hide().then(function () {
                        fn()
                    })
                } else {
                    $injector.get('$ionicLoading').hide();
                }
            },
            login: function (_scope) {
                _service.load();
                $injector.get('$ocLazyLoad').load('modals/login/index.js').then(function () {
                    _service.loadhide();
                    $injector.get('$ionicModal').fromTemplateUrl('modals/login/index.html', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _scope = _scope || $rootScope;
                        _scope.loginmodal = modal;
                        _scope.loginmodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.loginmodal.remove();
                        });
                    })
                })
            },
            socialsecurity: function (_scope) {
                _service.load();
                $injector.get('$ocLazyLoad').load('modals/socialsecurity/index.js').then(function () {
                    _service.loadhide();
                    $injector.get('$ionicModal').fromTemplateUrl('modals/socialsecurity/index.html', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _scope = _scope || $rootScope;
                        _scope.socialsecuritymodal = modal;
                        _scope.socialsecuritymodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.socialsecuritymodal.remove();
                        });
                    })
                })
            },
            mobilesecurity: function (_scope) {
                _service.load();
                $injector.get('$ocLazyLoad').load('modals/mobilesecurity/index.js?v=710').then(function () {
                    _service.loadhide();
                    $injector.get('$ionicModal').fromTemplateUrl('modals/mobilesecurity/index.html?v=710', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _scope = _scope || $rootScope;
                        _scope.mobilesecuritymodal = modal;
                        _scope.mobilesecuritymodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.mobilesecuritymodal.remove();
                        });
                    })
                })
            },
            studysecurity: function (_scope) {
                _service.load();
                $injector.get('$ocLazyLoad').load('modals/studysecurity/index.js?v=520').then(function () {
                    _service.loadhide();
                    $injector.get('$ionicModal').fromTemplateUrl('modals/studysecurity/index.html', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _scope = _scope || $rootScope;
                        _scope.studysecuritymodal = modal;
                        _scope.studysecuritymodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.studysecuritymodal.remove();
                        });
                    })
                })
            },
            getdata: function (url, data, isget) {
                return $http({
                    method: 'GET',
                    url: url,
                    data: data,
                    timeout: 1000 * 100,
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                })
            },
            postdata: function (url, data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    timeout: 1000 * 100,
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                })
            },
            closejump: function (jump) {
                if (jump == -1) {
                    if (ionic.Platform.isAndroid()) {
                        if (rrh && rrh.call) {
                            rrh.call('closeWindow', {
                            }, function (result) {
                            })
                        }
                    } else {
                        window.location.href = 'js://com.renwohua.conch/closeWindow';
                    }
                    setTimeout(function () {
                        var t = parent;
                        if (!t.rrhh5back) {
                            t.postMessage("rrhh5back", '*');
                        }
                        else {
                            t.rrhh5back();
                        }
                    }, 1000)
                } else if (jump == 'htrz') {
                    window.location.href = 'rrh://www.renrenhua.com/credit/liveness';
                } else if (jump == 'wechatchannelback') {
                    var t = parent;
                    if (!t.wechatchannelback) {
                        t.postMessage("wechatchannelback", '*');
                    }
                    else {
                        t.wechatchannelback();
                    }
                }
            }
        }
        return _service;
    })