angular.module('app')
    .controller('modalticket', function ($scope, $rootScope, appservice, $state, $ionicHistory) {
        $scope.status = 0
        appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/getList.rrh', {
            status: $scope.status
        }).then(function (data) {
            $scope.modaldata = data.result;
        }, function () {
            $scope.modaldata = []
        })
        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];
        $scope.sel = function (i) {
            if ($scope.modal.item == i) {
                $scope.modal.item = null
            } else {
                $scope.modal.item = i;
            }
            $scope.modal.hide();

        }
    })