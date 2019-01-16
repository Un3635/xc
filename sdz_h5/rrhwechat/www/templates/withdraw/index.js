angular.module('app')
    .controller('withdraw', function ($scope, $rootScope, appservice, $ionicHistory, $state, $timeout) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        //$ionicHistory.goBack(-1);
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd')
                    })
                })
        }
        $scope.item = {
            num: ''
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    $scope.item.num = data.balanceMoney;
                })
        }

        $scope.getdata()

        // $scope.yzm = {
        //     data: '',
        //     getyzm: function () {
        // if ($scope.item.num > 0.01) {
        //     appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
        //         amount: ($scope.item.num).toFixed(2)
        //     }).then(function (data) {
        //         appservice.warn('短信验证码已发送', 1000);
        //     })
        // } else {
        //     appservice.warn('充值金额要大于1元', 1000);
        //     return
        // }
        //     }
        // }


        $scope.sub = function () {
            if ($scope.item.num > 1) {
                appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                    {
                    })
                    .then(function (data) {
                        if (data.result == '1') {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })

                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        } else {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })
                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        }
                    })


            } else {
                appservice.warn('提现金额要大于1元', 1000);
                return
            }
        }
    })