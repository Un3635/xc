angular.module('app')
    .controller('forgetpwd', function ($scope, appservice, $rootScope, $ionicHistory, $interval) {
        $scope.imgurl = "img/icon_yingcang.png";
        $scope.inputtype = "password";
        $scope.changeimg = function () {
            if ($scope.imgurl == "img/icon_yingcang.png") {
                $scope.imgurl = "img/icon_xianshi.png"
                $scope.inputtype = "text";
            } else {
                $scope.imgurl = "img/icon_yingcang.png"
                $scope.inputtype = "password";
            }
        }

        $scope.imgurl1 = "img/icon_yingcang.png";
        $scope.inputtype1 = "password";
        $scope.changeimg1 = function () {
            if ($scope.imgurl1 == "img/icon_yingcang.png") {
                $scope.imgurl1 = "img/icon_xianshi.png"
                $scope.inputtype1 = "text";
            } else {
                $scope.imgurl1 = "img/icon_yingcang.png"
                $scope.inputtype1 = "password";
            }
        }
        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.item = {
            phone: "",
            sms_code: "",
            password: "",
            password1: "",
        }


        $scope.getcode = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/sendCode.open', {
                phone: $scope.item.phone,
                type: 1,
                captchaCode: "",
            }).then(function (data) {
                appservice.warn("短信验证码发送成功")
                $scope.djs.start();
            })
        }

        $scope.reg = function () {
            if ($scope.item.password != $scope.item.password1) {
                appservice.warn("两次输入密码不一致", 1000)
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/resetPassword.open', $scope.item)
                .then(function (data) {
                    appservice.warn("密码修改成功", 1000, function () {
                        $ionicHistory.goBack(-1);
                    })
                })
        }

        $scope.login = function () {
            appservice.login($scope)
        }
    })