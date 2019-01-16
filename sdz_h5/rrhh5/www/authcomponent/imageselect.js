angular.module('apph5').directive('rrhimageselect', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/imageselect.html' },

        controller: function ($scope, $http, $timeout) {
            $scope.settings = {
                theme: 'ios',
                lang: 'zh',
                display: 'bottom',
                placeholder: $scope.binddata.description,
                labels: ['Make'],
                enhance: true,
                defaultValue: ['a2']
            };

        },
        link: function () {
        }
    }
});