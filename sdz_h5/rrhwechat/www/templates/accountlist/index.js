angular.module('app')
    .controller('accountlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/account/logPaging.rrh', {
                pageSize: 1000,
                pageNow: 1
            }).then(function (data) {
                $scope.data = data.list;
            })

        }
        $scope.getdata();
    })