angular.module('app')
    .controller('home', function ($scope, $rootScope, appservice, $state, $ionicSlideBoxDelegate) {
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.changeactive = function (i) {
            $scope.active = i;
            if ($scope.data.feeConfig && $scope.data.feeConfig.length > 0) {
                $scope.threedata = $scope.data.feeConfig.filter(function (i) {
                    return i.group == $scope.data.periodGroup[$scope.active] + "-" + $scope.data.amountGroup[0]
                })[0];
            }


        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/homeV2/index.open', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.changeactive(0);
                    $ionicSlideBoxDelegate.update()
                    $ionicSlideBoxDelegate.enableSlide(true)
                    $ionicSlideBoxDelegate.loop(true)
                    $ionicSlideBoxDelegate.start()
                    if (localStorage.token) {
                        appservice.postdata($rootScope.GLOBAL.coreUrl + '/message/unreadMessage.rrh', {})
                            .then(function (data) {
                                $scope.messageNum = data;
                            })
                    }
                })
        }
        $scope.getdata();

        $scope.goWithTokenwaveloginreg = function (state, statep) {
            appservice.goWithTokenwaveloginreg($scope, state, statep)
        }

        $scope.sub = function () {
            appservice.checktoken()
                .then(function () {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/beforeNewOrder.rrh', {})
                        .then(function (data) {
                            if (data.isOverdue) {
                                appservice.warn('还清后才可以再借款哦', 1000, function () {
                                    $state.go('prerepaymentlist')
                                });
                                return
                            }
                            if (data.isApplication) {
                                appservice.warn('您已经申请过该产品', 1000);
                                return
                            }
                            if (data.mustAuth != "OK") {
                                appservice.warn(data.mustAuth, 1000);
                                return
                            }
                            if (data.infoAuth) {
                                $state.go('autonym', { next: 'rrh2.1channel' })
                                return
                            }
                            if (data.fifteenDays) {
                                appservice.warn(data.rejectMsg, 1000);
                                return
                            }
                            if (data.operatorOverdue) {
                                $state.go('authlistchannel')
                            } else {
                                $state.go('downloadchannel')
                            }

                        }, function () {

                        })
                }, function () {
                })
        }

        $scope.tomessage = function () {
            appservice.goWithTokenwaveloginreg($scope, 'message')
        }
    })
