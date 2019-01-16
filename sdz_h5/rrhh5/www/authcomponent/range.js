angular.module('apph5').directive('rrhrange', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/range.html' },

        controller: function ($scope, $http, $timeout) {

        },
        link: function () {

        }
    }
});