angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                cache: false,
                url: '/home',
                templateUrl: 'templates/home/index.html',
                controller: 'home'
            })
            .state('homechannel', {
                cache: false,
                url: '/homechannel/:hasaccount',
                templateUrl: 'templates/homechannel/index.html',
                controller: 'homechannel'
            })
            .state('order', {
                cache: false,
                url: '/order',
                templateUrl: 'templates/order/index.html',
                controller: 'order',
                resolve: {
                    checklogin: function (appservice, $q) {
                        return $q(function (res, rej) {
                            if (localStorage.token) {
                                res()
                            } else {
                                appservice.waveloginreg()
                                res()
                            }
                        })
                    }
                }
            })
            .state('my', {
                cache: false,
                url: '/my',
                templateUrl: 'templates/my/index.html',
                controller: 'my'
            })
            .state('reg', {
                cache: false,
                url: '/reg',
                templateUrl: 'templates/reg/index.html',
                controller: 'reg'
            })
            .state('forgetpwd', {
                cache: false,
                url: '/forgetpwd',
                templateUrl: 'templates/forgetpwd/index.html',
                controller: 'forgetpwd'
            })
            .state('autonym', {
                cache: false,
                url: '/autonym/:next',
                templateUrl: 'templates/autonym/index.html',
                controller: 'autonym'
            })
            .state('autonymchannel', {
                cache: false,
                url: '/autonymchannel',
                templateUrl: 'templates/autonymchannel/index.html',
                controller: 'autonymchannel'
            })
            .state('infobase', {
                cache: false,
                url: '/infobase',
                templateUrl: 'templates/infobase/index.html',
                controller: 'infobase'
            })
            .state('infobasechannel', {
                cache: false,
                url: '/infobasechannel',
                templateUrl: 'templates/infobasechannel/index.html',
                controller: 'infobasechannel'
            })
            .state('infowork', {
                cache: false,
                url: '/infowork',
                templateUrl: 'templates/infowork/index.html',
                controller: 'infowork'
            })
            .state('infolinkman', {
                cache: false,
                url: '/infolinkman',
                templateUrl: 'templates/infolinkman/index.html',
                controller: 'infolinkman'
            })
            .state('infolinkmanchannel', {
                cache: false,
                url: '/infolinkmanchannel',
                templateUrl: 'templates/infolinkmanchannel/index.html',
                controller: 'infolinkmanchannel'
            })
            .state('infofamily', {
                cache: false,
                url: '/infofamily',
                templateUrl: 'templates/infofamily/index.html',
                controller: 'infofamily'
            })
            .state('iframe', {
                cache: false,
                url: '/iframe',
                templateUrl: 'templates/iframe/index.html',
                controller: 'iframe'
            })
            .state('nginclude', {
                cache: false,
                url: '/nginclude',
                templateUrl: 'templates/nginclude/index.html',
                controller: 'nginclude'
            })
            .state('bankcard', {
                cache: false,
                url: '/bankcard',
                templateUrl: 'templates/bankcard/index.html',
                controller: 'bankcard'
            })
            .state('bankcardadd', {
                cache: false,
                url: '/bankcardadd',
                templateUrl: 'templates/bankcardadd/index.html',
                controller: 'bankcardadd'
            })
            .state('lianlianbankcardaddsuc', {
                cache: false,
                url: '/lianlianbankcardaddsuc',
                templateUrl: 'templates/lianlianbankcardaddsuc/index.html',
                controller: 'lianlianbankcardaddsuc'
            })
            .state('recharge', {
                cache: false,
                url: '/recharge/:money',
                templateUrl: 'templates/recharge/index.html',
                controller: 'recharge'
            })
            .state('withdraw', {
                cache: false,
                url: '/withdraw',
                templateUrl: 'templates/withdraw/index.html',
                controller: 'withdraw'
            })
            .state('rechargeerror', {
                cache: false,
                url: '/rechargeerror',
                templateUrl: 'templates/rechargeerror/index.html',
                controller: 'rechargeerror'
            })
            .state('rechargesuc', {
                cache: false,
                url: '/rechargesuc/:m1/:m2',
                templateUrl: 'templates/rechargesuc/index.html',
                controller: 'rechargesuc'
            })
            .state('set', {
                cache: false,
                url: '/set',
                templateUrl: 'templates/set/index.html',
                controller: 'set'
            })
            .state('about', {
                cache: false,
                url: '/about',
                templateUrl: 'templates/about/index.html',
                controller: 'about'
            })
            .state('editpwd', {
                cache: false,
                url: '/editpwd',
                templateUrl: 'templates/editpwd/index.html',
                controller: 'editpwd'
            })
            .state('help', {
                cache: false,
                url: '/help',
                templateUrl: 'templates/help/index.html',
                controller: 'help'
            })
            .state('opinion', {
                cache: false,
                url: '/opinion',
                templateUrl: 'templates/opinion/index.html',
                controller: 'opinion'
            })
            .state('authlist', {
                cache: false,
                url: '/authlist',
                templateUrl: 'templates/authlist/index.html',
                controller: 'authlist'
            })
            .state('authlistchannel', {
                cache: false,
                url: '/authlistchannel',
                templateUrl: 'templates/authlistchannel/index.html',
                controller: 'authlistchannel'
            })
            .state('mobileauth', {
                cache: false,
                url: '/mobileauth',
                templateUrl: 'templates/mobileauth/index.html',
                controller: 'mobileauth'
            })
            .state('borrowlist', {
                cache: false,
                url: '/borrowlist/:status',
                templateUrl: 'templates/borrowlist/index.html',
                controller: 'borrowlist'
            })
            .state('transactionlist', {
                cache: false,
                url: '/transactionlist',
                templateUrl: 'templates/transactionlist/index.html',
                controller: 'transactionlist'
            })
            .state('repaymentlist', {
                cache: false,
                url: '/repaymentlist',
                templateUrl: 'templates/repaymentlist/index.html',
                controller: 'repaymentlist'
            })
            .state('prerepaymentlist', {
                cache: false,
                url: '/prerepaymentlist/:status',
                templateUrl: 'templates/prerepaymentlist/index.html',
                controller: 'prerepaymentlist',
                resolve: {
                    checklogin: function (appservice, $q) {
                        return $q(function (res, rej) {
                            if (localStorage.token) {
                                res()
                            } else {
                                appservice.waveloginreg()
                                res()
                            }
                        })
                    }
                }
            })
            .state('orderdetail', {
                cache: false,
                url: '/orderdetail/:id',
                templateUrl: 'templates/orderdetail/index.html',
                controller: 'orderdetail'
            })
            .state('contract', {
                cache: false,
                url: '/contract',
                templateUrl: 'templates/contract/index.html',
                controller: 'contract'
            })
            .state('contractsuc', {
                cache: false,
                url: '/contractsuc',
                templateUrl: 'templates/contractsuc/index.html',
                controller: 'contractsuc'
            })
            .state('usephone', {
                cache: false,
                url: '/usephone',
                templateUrl: 'templates/usephone/index.html',
                controller: 'usephone'
            })
            .state('message', {
                cache: false,
                url: '/message',
                templateUrl: 'templates/message/index.html',
                controller: 'message'
            })
            .state('accountlist', {
                cache: false,
                url: '/accountlist',
                templateUrl: 'templates/accountlist/index.html',
                controller: 'accountlist'
            })
            .state('downloadchannel', {
                cache: false,
                url: '/downloadchannel',
                templateUrl: 'templates/downloadchannel/index.html',
                controller: 'downloadchannel'
            })
            .state('ticket', {
                cache: false,
                url: '/ticket',
                templateUrl: 'templates/ticket/index.html',
                controller: 'ticket'
            })
            .state('tickethis', {
                cache: false,
                url: '/tickethis',
                templateUrl: 'templates/tickethis/index.html',
                controller: 'tickethis'
            })
            .state('rrhcoins', {
                cache: false,
                url: '/rrhcoins',
                templateUrl: 'templates/rrhcoins/index.html',
                controller: 'rrhcoins'
            })
            .state('wechatauth', {
                cache: false,
                url: '/wechatauth',
                templateUrl: 'templates/wechatauth/index.html',
                controller: 'wechatauth'
            })
        $urlRouterProvider.otherwise('/home');
        // if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        //     $urlRouterProvider.otherwise('/home');
        // } else {
        //     $urlRouterProvider.otherwise('/usephone');
        // }

    })