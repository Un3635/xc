angular.module('app')
    .controller('contract', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goh5contract = function () {
            if (GLOBAL.debug) {
                var url = '//testm.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            } else {
                var url = '//app.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            }
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/generateAgreement.rrh', {
                        serialno: $scope.data.serialno
                    }).then(function (data) {
                        $state.go('contractsuc')
                    })
                }, function (data) {
                    if (data.code == 1111) {
                        $state.go('bankcardadd')
                    }
                })
        }
    })