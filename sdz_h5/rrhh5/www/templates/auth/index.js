angular.module('apph5')
    .controller('auth', function ($scope, $rootScope, appservice, $stateParams, $ionicNavBarDelegate) {
        $scope.m = function (n) {
            if (n == 1) {
                $scope.shebaogjjflag = 1;
                appservice.socialsecurity($scope);
            }
            else if (n == 2) {
                $scope.shebaogjjflag = 2;
                appservice.socialsecurity($scope)
            }
            else if (n == 3) {
                appservice.mobilesecurity($scope)
            } else if (n == 4) {
                appservice.studysecurity($scope)
            }
        }
        localStorage.token = $stateParams.token;
        $scope.m($stateParams.type);
    })