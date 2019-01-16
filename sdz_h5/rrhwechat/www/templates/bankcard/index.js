angular.module('app')
    .controller('bankcard', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();
    })