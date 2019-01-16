angular.module('app')
    .controller('authlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV3/index.rrh', {})
                .then(function (data) {
                    $scope.data = data
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            //只有当芝麻认证完成后才能进行下面的一系列认证
            if ($scope.data.list[0].status != 3) {
                appservice.warn('请先完成芝麻认证', 1000);
            }
            if (i.status == 3 || i.status == 1) {
                appservice.warn(i.note, 1000);
                return
            } else {
                if (i.type == 1) {
                    if (i.url.indexOf('#/auth/3') >= 0) {
                        $state.go('mobileauth');
                    } else {
                        $rootScope.GLOBAL.iframeurl = i.url;
                        $state.go('iframe')
                    }
                }
            }
        }
    })