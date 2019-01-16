angular.module('apph5')
    .controller('login', function ($scope, $http, $rootScope, appservice, $ionicLoading) {
        $scope.item = {
            phone: "15221545452" || "18666668888",
            password: "123456"
        }
        $scope.do = function () {
            $http({
                method: 'POST',
                url: $rootScope.GLOBAL.userUrl + '/user' + '/login.open',
                data: $scope.item,
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
                    appservice.warn('登录成功', 1000, function () {
                        $http({
                            method: 'POST',
                            url: $rootScope.GLOBAL.userUrl + '/user' + '/info.rrh',
                            params: {
                            },
                        })
                            .then(function (data) {
                                $rootScope.USER = data.result;
                                $scope.loginmodal.remove()
                            })
                    })
                })
        }

    })