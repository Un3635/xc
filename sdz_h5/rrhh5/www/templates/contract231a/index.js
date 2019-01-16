angular.module('apph5')
    .controller('contract231a', function ($scope, $stateParams, $rootScope, appservice) {
        localStorage.token = $stateParams.token;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV3/getContractFee.rrh', {}
            ).then(function (data) {
                $scope.data = data;
            })

        }
        $scope.companyname = '上海任我花网络科技有限公司'
        $scope.getdata()
    })