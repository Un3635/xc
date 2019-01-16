angular.module('app')
    .controller('message', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/home/msgPaging.rrh', { pageSize: 1000, pageNow: 1 })
                .then(function (data) {
                    $scope.data = data.list;
                })
        }
        $scope.getdata();

    })