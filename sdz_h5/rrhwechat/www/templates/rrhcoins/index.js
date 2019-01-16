angular.module('app')
    .controller('rrhcoins', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate, $ionicPopover) {
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                })
        }

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/withdraw.rrh', {})
                .then(function (data) {
                    appservice.warn(data.result, 5000, function () {
                        $state.reload();
                    })
                })
        }

        $scope.getlist = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/getCurrencyLog.rrh', {})
                .then(function (data) {
                    $scope.data = data.result;
                    showlist();
                }, function () {
                    showlist();
                })
        }

        function showlist() {
            $ionicPopover.fromTemplateUrl('templates/poprrhcoinslist/index.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
                $scope.popover.show();
            });

        }
        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
        $scope.getuser()
    })