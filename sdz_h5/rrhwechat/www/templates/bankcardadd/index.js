angular.module('app')
    .controller('bankcardadd', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        //如果是提现没绑卡进来的去除一层路由
        if ($rootScope.withdrawTObankcardadd) {
            $ionicHistory.removeBackView();
            $rootScope.withdrawTObankcardadd = false;
        }

        $scope.item = {
            cardno: "",
            phone: "",
        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + "/user/queryUserIdcard.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                        .then(function (data) {
                            $scope.item.phone = data.mobile;
                        })
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
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardRequest.rrh", $scope.item)
                    .then(function (data) {
                        appservice.warn('验证码已发送', 1000)
                        $scope.djs.start();
                    }, function () {
                        //$scope.djs.start();
                    })
            }
        }

        $scope.sub = function () {
            if ($scope.paytype == '1') {
                localStorage.lianlianbindcardno = $scope.item.cardno
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getBindCardParams.rrh',
                    {
                        cardno: $scope.item.cardno,
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                    })
                    .then(function (data) {
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardConfirm.rrh", {
                    validatecode: $scope.yzm.data
                }).then(function (data) {
                    $ionicHistory.goBack(-1);
                })
            }
        }

        $scope.supportbank = function () {
            $rootScope.GLOBAL.iframeurl = 'app.renrenhua.com/rrhprotocolh5/bank.html';
            $state.go('iframe')
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

        $scope.checkPayType();
    })