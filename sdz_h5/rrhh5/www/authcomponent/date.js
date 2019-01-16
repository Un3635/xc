angular.module('apph5').directive('rrhdate', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/date.html' },

        controller: function ($scope, $http, $timeout) {
            // console.log($scope.binddata.value);
            // var now = new Date(),
            //     max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());

            $scope.settings = {
                theme: 'ios',
                lang: 'zh',
                display: 'bottom',
                // max: max,
            };
        },
        link: function () {

        }
    }
});