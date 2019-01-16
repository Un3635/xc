angular.module('app')
    .controller('opinion', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.sub = function () {
            if (!$scope.data.data) {
                appservice.warn('你还没有填写意见唷~', 1500)
            } else {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/home/feedback.rrh', {
                    content: $scope.data.data
                }).then(function (data) {
                    appservice.warn(data.result, 1000, function () {
                        $ionicHistory.goBack(-1);
                    })
                })
            }

        }
        $scope.data = {
            data: ""
        }
    })