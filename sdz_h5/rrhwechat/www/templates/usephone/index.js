angular.module('app')
    .controller('usephone', function ($state) {
        if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            $state.go('home')
        }
    })