angular.module('app')
    .controller('order', function ($scope, $rootScope, appservice) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/index.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        if (localStorage.token) {
            $scope.getdata();
        }

        $scope.go = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'borrowlist', { status: status })
        }

        $scope.gotransactionlist = function () {

            appservice.goWithTokenwaveloginreg($scope, 'transactionlist')
        }
        $scope.goprerepaymentlist = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'prerepaymentlist', { status: status })
        }
    })