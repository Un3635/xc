angular.module('app')
    .controller('recharge', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $interval) {
        $scope.item = {
            num: ''
        }
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd');
                    })
                })
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    if ($stateParams.money) {
                        $scope.item.num = ($stateParams.money - $scope.user.balanceMoney).toFixed(2);
                    }
                    if ($scope.item.num <= 2) {
                        $scope.item.num = "2.00";
                    }
                })
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

        $scope.yzm = {
            data: '',
            getyzm: function () {
                if ($stateParams.money) {
                    if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
                        appservice.warn('金额必须要大于等于还款金额', 1000);
                        return
                    }
                }
                if ($scope.item.num > 1) {
                    appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
                        amount: $scope.item.num
                    }).then(function (data) {
                        appservice.warn('短信验证码已发送', 1000);
                        $scope.djs.start();
                    })
                } else {
                    appservice.warn('充值金额要大于1元', 1000);
                    return
                }
            }
        }
        $scope.paytype = 1;//0 易宝；1连连支付

        $scope.checkPayType = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                {
                })
                .then(function (data) {
                    $scope.paytype = data.result;
                    $scope.getdata();

                })
        }

        $scope.sub = function () {
            // if ($stateParams.money) {
            //     if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
            //         appservice.warn('金额必须要大于等于还款金额', 1000);
            //         return
            //     }
            // }
            if (!$rootScope.vid) {
                $rootScope.vid = 0;
            }
            if ($scope.paytype == 1) {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getPayParams.rrh',
                    {
                        amount: $scope.item.num,
                        payback: 'T',
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                        vouchersId: $rootScope.vid
                    })
                    .then(function (data) {
                        $rootScope.vid = 0;
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayConfirm.rrh', {
                    validatecode: $scope.yzm.data,
                    payback: 'T'
                }).then(function (data) {
                    appservice.warn('还款成功', 2000, function () {
                        $state.go('order')
                    })
                    // $state.go('rechargesuc', {
                    //     m1: $scope.item.num,
                    //     m2: $scope.item.num + $scope.user.balanceMoney
                    // })
                }, function (err) {
                    if (err.code == 1001) {

                    } else {
                        $state.go('rechargeerror')
                    }

                })
            }

        }

        $scope.checkPayType()
    })