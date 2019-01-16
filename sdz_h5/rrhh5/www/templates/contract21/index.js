angular.module('apph5')
    .controller('contract21', function ($scope, $stateParams, $rootScope, appservice) {
        localStorage.token = $stateParams.token;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh',
                JSON.parse($stateParams.other)
            )
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata()
    })