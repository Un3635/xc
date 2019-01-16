angular.module('app')
    .controller('about', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
    })