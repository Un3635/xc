angular.module('app')
    .controller('set', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.hastoken = localStorage.token;
        $scope.exit = function () {
            localStorage.removeItem('token');
            $ionicHistory.goBack(-1);
        }
        $scope.login = function () {
            appservice.login($scope);
        }
    })