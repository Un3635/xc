angular.module('apph5')
    .controller('contract', function ($scope, $stateParams, $rootScope, appservice) {
        localStorage.token = $stateParams.token;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {}
            ).then(function (data) {
                $scope.data = data;
            })

        }
        $scope.getdata()
    })