angular.module('app')
    .controller('borrowlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/pending.rrh', {
                status: $stateParams.status,
                pageNow: 1,
                pageSize: 30
            }).then(function (data) {
                $scope.data = data;
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })