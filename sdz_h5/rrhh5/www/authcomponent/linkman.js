angular.module('apph5').directive('rrhlinkman', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/linkman.html' },

        controller: function ($scope, $http, $timeout) {
            $scope.manchange = function () {
                $scope.binddata.domanwarn = true;
                $timeout(function () {
                    $scope.binddata.domanwarn = false;
                }, 1000)
            }
            $scope.phonechange = function () {
                $scope.binddata.dophonewarn = true;
                $timeout(function () {
                    $scope.binddata.dophonewarn = false;
                }, 1000)

            }
        },
        link: function () {

        }
    }
});