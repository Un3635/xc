angular.module('app')
    .controller('prerepaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/pendingRepayment.rrh', {
                pageNow: 1,
                pageSize: 300,
                date: $stateParams.status || 0,
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.list[0].daysRemaining >= 0 && $scope.data.list[0].daysRemaining <= 2) || $scope.data.list[0].overdueDays > 0) {
                    $scope.check = true;
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.check = false;
        $scope.getdata();

        $scope.sub = function () {
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
                planIds: $scope.data.list[0].planId,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    $state.go('orderdetail', { id: $scope.data.list[0].id })
                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.list[0].balance - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
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
        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }
    })