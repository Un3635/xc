angular.module('apph5')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('init', {
                url: '/init',
                templateUrl: function () { return 'templates/init/index.html' },
                controller: 'init',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/init/index.js']);
                    }]
                }
            })
            .state('auth', {
                url: '/auth/:type/:token/:jump',
                templateUrl: function () { return 'templates/auth/index.html' },
                controller: 'auth',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/auth/index.js']);
                    }]
                }
            })
            .state('contract', {
                url: '/contract/:token',
                templateUrl: function () { return 'templates/contract/index.html' },
                controller: 'contract',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/contract/index.js']);
                    }]
                }
            })
            .state('invitation', {
                url: '/invitation/:token',
                templateUrl: function () { return 'templates/invitation/index.html' },
                controller: 'invitation',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        var _loads = ['templates/invitation/index.js'];
                        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                            _loads.push('http://res.wx.qq.com/open/js/jweixin-1.2.0.js')
                        }
                        return $ocLazyLoad.load(_loads);
                    }]
                }
            })
            .state('contract21', {
                url: '/contract21/:token/:other',
                templateUrl: function () { return 'templates/contract21/index.html' },
                controller: 'contract21',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/contract21/index.js']);
                    }]
                }
            })
            .state('borrowUse', {
                url: '/borrowUse/:token',
                templateUrl: function () { return 'templates/borrowUse/index.html' },
                controller: 'borrowUse',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/borrowUse/index.js']);
                    }]
                }
            })
            .state('contract231b', {
                url: '/contract231b/:token',
                templateUrl: function () { return 'templates/contract231b/index.html' },
                controller: 'contract231b',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/contract231b/index.js']);
                    }]
                }
            })
            .state('contract231a', {
                url: '/contract231a/:token',
                templateUrl: function () { return 'templates/contract231a/index.html' },
                controller: 'contract231a',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/contract231a/index.js']);
                    }]
                }
            })
            .state('mobilesecurityhelp', {
                url: '/mobilesecurityhelp',
                templateUrl: function () { return 'templates/mobilesecurityhelp/index.html' },
                cache: false,
            })
            .state('about231', {
                url: '/about231',
                controller: 'about231',
                templateUrl: function () { return 'templates/about231/index.html' },
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['templates/about231/index.js']);
                    }]
                }
            })
            .state('infocollection', {
                url: '/infocollection',
                templateUrl: function () { return 'templates/infocollection/index.html' },
                controller: 'infocollection',
                cache: false,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'templates/infocollection/index.js',
                            'authcomponent/input.js',
                            'authcomponent/select.js',
                            'authcomponent/linkman.js',
                            'authcomponent/image.js',
                            'authcomponent/popup.js',
                            'authcomponent/range.js',
                            'authcomponent/date.js',
                            'authcomponent/time.js',
                            'authcomponent/datetime.js',
                            'authcomponent/imageselect.js',
                            'authcomponent/commonselect.js'
                        ]);
                    }]
                }
            })
        $urlRouterProvider.otherwise('/init');
    });