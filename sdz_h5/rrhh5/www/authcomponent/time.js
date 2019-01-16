angular.module('apph5').directive('rrhtime', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/time.html' },

        controller: function ($scope, $http, $timeout) {
            $scope.settings = {
                theme: 'ios',
                lang: 'zh',
                display: 'bottom',
                headerText: false,
                maxWidth: 90
            };
        },
        link: function () {

        }
    }
});