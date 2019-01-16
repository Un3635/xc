angular.module('app')
    .controller('orderdetail', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/detail.rrh', {
                id: $stateParams.id
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.paybackPlans[0].daysRemaining >= 0 && $scope.data.paybackPlans[0].daysRemaining <= 2) || $scope.data.paybackPlans[0].overdueDays > 0) {
                    $scope.check = true;
                }
                if ($scope.data.status == 7) {
                    $ionicScrollDelegate.freezeScroll(true);
                    $timeout(function () {
                        document.getElementsByClassName('scroll')[0].style.transform = "";
                    }, 500)
                }
            })
        }


        $scope.repayment = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            var vid = ''
            $rootScope.vid = 0;
            if ($scope.modal && $scope.modal.item && $scope.modal.item.id) {
                vid = $scope.modal.item.id
                $rootScope.vid = vid;
            }
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/orderRepayment.rrh', {
                planIds: $scope.data.paybackPlans[0].id,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    appservice.urlback();
                    // $scope.data.status = 7;
                    // $scope.data.pendingRepayment = 0;
                    // $ionicScrollDelegate.freezeScroll(true);
                    // $timeout(function () {
                    //     document.getElementsByClassName('scroll')[0].style.transform = "";
                    // }, 500)

                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.pendingRepayment - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
        }

        $scope.gocontract = function () {
            $state.go('contract')
        }
        $scope.pdfcontractFee = function () {
            $rootScope.GLOBAL.iframeurl = $scope.data.contractFee;
            $state.go('iframe')
        }

        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }

        $scope.modalyhq = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            if (!$scope.modal) {
                $ionicModal.fromTemplateUrl('templates/modalticket/index.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                })
            } else {
                $scope.modal.show();
            }

        }
        // $scope.modalyhq()
        $scope.getdata();
    })


