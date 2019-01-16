angular.module('apph5').directive('rrhimage', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/image.html' },

        controller: function ($scope, $http, $timeout) {

        },
        link: function () {

        }
    }
});