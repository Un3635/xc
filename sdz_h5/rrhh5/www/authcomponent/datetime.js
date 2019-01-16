angular.module('apph5').directive('rrhdatetime', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/datetime.html' },

        controller: function ($scope, $http, $timeout) {
            var now = new Date(),
                minDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()),
                maxDate = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());

            $scope.settings = {
                theme: 'ios',
                lang: 'zh',
                display: 'bottom',
                min: minDate,
                max: maxDate
            };

        },
        link: function () {

        }
    }
});