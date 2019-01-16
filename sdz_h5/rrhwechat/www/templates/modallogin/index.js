angular.module('app')
    .controller('login', function ($scope, $rootScope, appservice, $state, $ionicHistory) {
        $scope.login_data = {
            imgurl: "img/icon_yingcang.png",
            inputtype: "password",
            changeimg: function () {
                if ($scope.login_data.imgurl == "img/icon_yingcang.png") {
                    $scope.login_data.imgurl = "img/icon_xianshi.png"
                    $scope.login_data.inputtype = "text";
                } else {
                    $scope.login_data.imgurl = "img/icon_yingcang.png"
                    $scope.login_data.inputtype = "password";
                }
            },
            data: {
                phone: "",
                password: "",
                device_type: 1
            },
            login: function () {
                appservice.postdata($rootScope.GLOBAL.userUrl + '/user/login.open', $scope.login_data.data)
                    .then(function (data) {
                        localStorage.token = data.result;
                        appservice.warn("登录成功", 1000, function () {
                            localStorage.removeItem("loginonce");//从渠道已有帐号来的登录一次
                            $scope.loginmodal.remove();
                            if ($state.is('reg')) {
                                $ionicHistory.goBack(-1);
                            } else {
                                $state.reload()
                            }
                        })
                    }, function () {
                        localStorage.removeItem("token")
                    })
            },
            goreg: function () {
                $scope.loginmodal.remove();
                if (!$state.is('reg')) {
                    $state.go('reg')
                }
            }
        }
    })