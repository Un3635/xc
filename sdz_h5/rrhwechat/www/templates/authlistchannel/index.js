angular.module('app')
    .controller('authlistchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.cannext = false;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV2/getAuthList.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.cannext = data.result.filter(function (i) {
                        return i.status == '3' || i.status == '1'
                    }).length == 2;
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            if (i.status == 3 || i.status == 1) {
                return
            }
            if (i.authName.indexOf('银行') >= 0) {
                $state.go('bankcardadd')
            }
            else if (i.authName.indexOf('运营商') >= 0) {
                $state.go('mobileauth')
            }
        }

        $scope.sub = function () {
            $state.go('downloadchannel')
        }
    })