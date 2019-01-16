angular.module('app')
    .controller('rechargesuc', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.m1 = $stateParams.m1;
        $scope.m2 = $stateParams.m2;
    })