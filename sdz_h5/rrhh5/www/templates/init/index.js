angular.module('apph5')
    .controller('init', function ($scope, $http, $rootScope, appservice, $ionicLoading) {
        $scope.do = function () {
            $http({
                method: 'POST',
                url: $rootScope.GLOBAL.userUrl + '/user' + '/login.open',
                data: {
                    phone: "18666668888",
                    password: "123456"
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            })
                .then(function (data) {
                    localStorage.token = data.result;
                    appservice.warn('登录成功', 1000)
                })
        }
        $scope.do1 = function () {
            $http({
                method: 'POST',
                url: $rootScope.GLOBAL.userUrl + '/user' + '/info.rrh',
                params: {
                },
            })
                .then(function (data) {

                })
        }

        $scope.do2 = function () {
            appservice.load();
        }

        $scope.do3 = function () {
            appservice.login($scope)
        }
        $scope.do4 = function () {
            if (localStorage.token) {
                localStorage.removeItem('token')
                $rootScope.USER = null;
                appservice.warn('已清楚', 1000)
            } else {
                appservice.warn('还没登录', 1000)
            }
        }
    })