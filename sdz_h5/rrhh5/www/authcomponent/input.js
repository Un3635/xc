angular.module('apph5').directive('rrhinput', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/input.html' },

        controller: function ($scope, $http, $timeout) {

            $scope.change = function () {
                if ($scope.binddata.value > 100) {
                    $scope.binddata.dowarn = true;
                    $timeout(function () {
                        $scope.binddata.dowarn = false;
                    }, 1000)
                }
            }
        },
        link: function () {

        }
    }
});