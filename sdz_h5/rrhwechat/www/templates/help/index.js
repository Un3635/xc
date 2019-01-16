angular.module('app')
    .controller('help', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopup) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.copywarn = function (str) {
            appservice.warn(str, 1000)
        }

        $scope.showqrcode = function () {
            $rootScope.popqrcode = $ionicPopup.show({
                templateUrl: 'templates/popqrcode/index.html',
                cssClass: 'popqrcode'
            });
        }
    })