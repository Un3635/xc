angular.module('app')
    .controller('ticket', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {
        $scope.getdata = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/paging.rrh', {
                pageSize: 1000, pageNow: 1, status: $scope.s
            }).then(function (data) {
                $scope.data = data.list;
            }, function () {
                $scope.data = []
            })

        }

        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];

        $scope.s = 0;
        $scope.changes = function (s) {
            if ($scope.s != s) {
                $scope.s = s;
                $scope.getdata();
                $ionicScrollDelegate.scrollTop(true);
            }
        }
        $scope.getdata();
    })