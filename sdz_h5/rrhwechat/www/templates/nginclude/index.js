angular.module('app')
    .controller('nginclude', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl("http://www.91maidan.com" || $rootScope.GLOBAL.iframeurl);
    })