angular.module('app')
    .controller('reg', function ($scope, appservice, $rootScope, $state, $interval) {
        $scope.imgurl = "img/icon_yingcang.png";
        $scope.inputtype = "password";
        $scope.changeimg = function () {
            //<easydebug>
            console.log($scope);
            //<easydebug>
            if ($scope.imgurl == "img/icon_yingcang.png") {
                $scope.imgurl = "img/icon_xianshi.png"
                $scope.inputtype = "text";
            } else {
                $scope.imgurl = "img/icon_yingcang.png"
                $scope.inputtype = "password";
            }
        }

        $scope.item = {
            phone: "",
            code: "",
            password: "",
            recommend_id: ""
        }

        $scope.codeimg = {
            show: false,
            baseurl: '',
            code: "",
            change: function () {
                $scope.codeimg.url = $scope.codeimg.baseurl + '?phone=' + $scope.item.phone + '&t=' + new Date();
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
        $scope.getcode = function () {
            initNECaptcha({
                captchaId: 'f054a583d9d54d5bacbd0b223bba8fbf',
                element: '#reg',
                mode: 'popup',
                onReady: function (instance) {
                },
                onVerify: function (err, data) {
                    if (err) {
                        return
                    }

                    appservice.postdata($rootScope.GLOBAL.userUrl + '/sms/sendCode.open', {
                        phone: $scope.item.phone,
                        type: 0,
                        captchaCode: data.validate,
                    }).then(function (data) {
                        appservice.warn("短信验证码发送成功", 1000, function () {
                            $scope.codeimg.show = false;
                            $scope.codeimg.code = "";
                            $scope.djs.start();
                        })
                    }, function (errdata) {
                        if (errdata.msg == '请填写图形验证码!' || errdata.msg == "图形验证码输入不正确！") {
                            if (errdata.msg == '请填写图形验证码!') {
                                $scope.codeimg.show = true;
                                $scope.codeimg.baseurl = errdata.data;
                                $scope.codeimg.change();
                            } else {
                                $scope.codeimg.code = "";
                                $scope.codeimg.change();
                            }

                        } else {
                            $scope.codeimg.show = false;
                        }
                    })
                }
            }, function onload(instance) {
                instance.popUp();
            }, function onerror(err) {
            })
        }

        $scope.reg = function () {
            if ($scope.codeimg.show && !$scope.codeimg.code) {
                appservice.warn('请填写图形验证码', 1000);
                return
            } else {
                if ($scope.item.password.search(/^[a-zA-Z\d]{6,16}$/) == -1) {
                    appservice.warn('密码只能是6-16位的数字或字母', 1000);
                    return
                } else {
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/user/register.open', $scope.item).then(function (data) {
                        appservice.warn("注册成功", 1000, function () {
                            localStorage.token = data.result;
                            $rootScope.firstautonym = true;
                            $state.go('homechannel')
                            //$state.go('homechannel')
                        })
                    })
                }
            }

        }

        $scope.login = function () {
            appservice.login($scope)
        }
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
    })