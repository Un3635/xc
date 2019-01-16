angular.module('app')
    .controller('wechatauth', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        function goSuccess() {
            if ($scope.state == 'wechat_invitation') {
                if (GLOBAL.debug) {
                    window.location.href = '//testm.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                } else {
                    window.location.href = '//app.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                }
            } else if ($scope.state == 'wechat_reg') {
                $state.go('homechannel', {
                    hasaccount: -1
                })
            } else if ($scope.state == 'wechat_repayment') {
                $state.go('prerepaymentlist')
            }
        }
        function goError() {
            var _url = '';
            if (GLOBAL.debug) {
                url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae645be1ce5e2637&redirect_uri=http%3A%2F%2Ftestm.renrenhua.com%2Fwechat%2F%23%2Fwechatauth&response_type=code&scope=snsapi_userinfo&state=' + $scope.state
            } else {
                url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae645be1ce5e2637&redirect_uri=http%3A%2F%2Fapp.renrenhua.com%2Fwechat%2F%23%2Fwechatauth&response_type=code&scope=snsapi_userinfo&state=' + $scope.state
            }
            window.location.href = url
        }
        function goReg() {
            $scope.show = true;
        }

        $scope.code = GetQueryString('code');
        $scope.state = GetQueryString('state');
        $scope._isFromWechatAuthHasReg = true;
        $scope.openid;

        $scope.item = {
            phone: "",
            code: "",
            password: "",
            recommend_id: "",
            channel_id: 10
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
                element: '#captcha1',
                mode: 'popup',
                onReady: function (instance) {
                },
                onVerify: function (err, data) {
                    if (err) {
                        return
                    }
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/sms/sendCode.open', {
                        phone: $scope.item.phone,
                        type: 2,
                        captchaCode: data.validate,
                    }).then(function (data) {
                        $scope._isFromWechatAuthHasReg = data.exist;
                        appservice.warn("短信验证码发送成功", 1000, function () {
                            $scope.djs.start();
                        })
                    }, function (errdata) {
                    })
                }
            }, function onload(instance) {
                instance.popUp();
            }, function onerror(err) {
            })
        }

        $scope.jump = function (type) {
            var url = '';
            if (type == 2) {
                url = '//app.renrenhua.com/rrhprotocolh5/registerProtocol.html';
            } else if (type == 1) {
                url = '//app.renrenhua.com/rrhprotocolh5/creditAuthorizationProtocol.html';
            } else {
                url = '//app.renrenhua.com/rrhprotocolh5/cost.html';
            }
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.init = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/nonpartyAccredit.open', {
                code: $scope.code || '', type: 1
            }).then(function (data) {
                ///已经注册+绑定
                localStorage.token = data.result;
                goSuccess();
            }, function (data) {
                ///未绑定
                if (data.code == 1001) {
                    $scope.openid = data.msg;
                    goReg();
                }
                ///code有问题
                else if (data.code == 1002) {
                    goError();
                }
            })
        }

        $scope.reg = function () {
            if (!$scope._isFromWechatAuthHasReg) {
                if (!$scope.item.password) {
                    appservice.warn('请输入密码', 1000);
                    return;
                }
                if ($scope.item.password.search(/^[a-zA-Z\d]{6,16}$/) == -1) {
                    appservice.warn('密码只能是6-16位的数字或字母', 1000);
                    return
                }
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/nonpartyAccreditRegister.open', {
                openId: $scope.openid,
                mobile: $scope.item.phone,
                code: $scope.item.code,
                password: $scope.item.password || '',
                inviteCode: $scope.item.recommend_id || ''
            }).then(function (data) {
                localStorage.token = data.result;
                goSuccess();
            }, function (errdata) {
            })
        }
        $scope.init()

    })