angular.module('app')
    .controller('lianlianbankcardaddsuc', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        appservice.postdata($rootScope.GLOBAL.payUrl + '/bankcard/saveBankCard.rrh',
            {
                cardno: localStorage.lianlianbindcardno,
                noAgree: JSON.parse(localStorage.lianlianbindsucdata).agreeno
            })
            .then(function (data) {
                appservice.warn(data.result, 1000, function () {
                    $ionicHistory.goBack(-3);
                })
            })
        //POST /bankcard/saveBankCard.rrh
    })