angular.module('app')
    .controller('iframe', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl($rootScope.GLOBAL.iframeurl);
    })