angular.module('app')
    .controller('repaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/monthlyRepayment.rrh', {
                pageNow: 1,
                pageSize: 300
            }).then(function (data) {
                $scope.thismonth = new Date().getFullYear() + "年" + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() + 1)) + "月");
                $scope.data = _.groupBy(data.list, 'mothly')
                for (var i in $scope.data) {
                    $scope.data[i].total = _.reduce($scope.data[i], function (a, b) {
                        return a + b.actualRepaymentAmount;
                    }, 0)
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })