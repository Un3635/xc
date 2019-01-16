angular.module('app')
    .controller('waveloginreg', function ($scope, $rootScope, appservice) {
        $scope.wavegologin = function () {
            $rootScope.popwaveloginreg.close();
            appservice.login()
        }
    })