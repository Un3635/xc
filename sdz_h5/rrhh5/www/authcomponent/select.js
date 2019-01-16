angular.module('apph5').directive('rrhselect', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/select.html' },

        controller: function ($scope, $http, $timeout) {
            $scope.change = function () {
                $scope.binddata.dowarn = true;
                $timeout(function () {
                    $scope.binddata.dowarn = false;
                }, 1000)
            }
        },
        link: function () {

        }
    }
});