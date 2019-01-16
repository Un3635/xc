angular.module('apph5')
    .controller('mobilesecurity', function ($scope, $rootScope, appservice, $stateParams, $state, $ionicPopup) {
        $scope.getmobile = function () {
            appservice.getdata($rootScope.GLOBAL.coreUrl + '/authorization/getMobile.rrh', {})
                .then(function (data) {
                    $scope.mobilesecuritydata.account = data.result;
                })
        }
        $scope.mobilesecuritydata = {
            account: '',
            password: '',
            type: 'sms',
            smscode: '',
            imgcode: '',
            imgurl: '',
            inStep2: false
        }

        $scope.next1 = function () {
            if ($scope.mobilesecuritydata.password.length > 8 || $scope.mobilesecuritydata.password.length < 6) {
                appservice.warn('服务密码有误,请重新填写', 2000, function () {
                    $scope.mobilesecuritydata.password = '';
                })
                return
            }
            if (isNaN($scope.mobilesecuritydata.password)) {
                appservice.warn('服务密码有误,请重新填写', 2000, function () {
                    $scope.mobilesecuritydata.password = '';
                })
                return
            }
            appservice.warn('此过程可能耗时稍长，请耐心等待', 2000, function () {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_yys_auth.rrh', {
                    password: $scope.mobilesecuritydata.password
                }
                ).then(function (data) {
                    if (data.code == '105') {
                        appservice.warn(data.message, 2000, function () {
                            var jump = $stateParams.jump || -1;
                            appservice.closejump($stateParams.jump)
                        })
                    } else if (data.code == '104') {
                        appservice.warn(data.data.guide_message, 2000, function () {
                            dogcode(data)
                        })
                    } else {
                        appservice.warn(data.message, 2000, function () {
                            intoStep1()
                        })
                    }
                })
            })


        }
        $scope.next2 = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_input_sms.rrh', {
                authCode: $scope.mobilesecuritydata[$scope.mobilesecuritydata.type + 'code']
            }
            ).then(function (data) {
                if (data.code == '105') {
                    appservice.warn(data.message, 2000, function () {
                        var jump = $stateParams.jump || -1;
                        appservice.closejump($stateParams.jump)
                    })
                } else if (data.code == '104') {
                    appservice.warn(data.data.guide_message, 2000, function () {
                        dogcode(data)
                    })
                } else {
                    appservice.warn(data.message, 2000, function () {
                        intoStep1()
                    })
                }
            })
        }
        $scope.codeget = function (type) {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_retry.rrh', {
                codeType: type
            }
            ).then(function (data) {
                if (data && data.data && data.data.auth_code) {
                    $scope.mobilesecuritydata.imgurl = 'data:image/png;base64,' + data.data.auth_code;
                }
            })
        }
        function dogcode(data) {
            if (data.data.guide_code == '90001') {
                intoStep2('sms');
            } else if (data.data.guide_code == '90002') {
                intoStep2('img', data.data.auth_code);
            } else if (data.data.guide_code == '90006') {
                intoStep1()
            }
            else if (data.data.guide_code == '90007') {
                intoStep2('sms');
            }
            else if (data.data.guide_code == '90021') {
                intoStep1()
            }
            else if (data.data.guide_code == '90009') {
                intoStep1()
            }
            else if (data.data.guide_code == '90022') {
                intoStep1()
            }
            else if (data.data.guide_code == '90012') {
                intoStep1()
            }
            else if (data.data.guide_code == '90023') {
                intoStep1()
            }
            else if (data.data.guide_code == '90024') {
                intoStep1()
            }
            else if (data.data.guide_code == '90025') {
                intoStep1()
            }
            else if (data.data.guide_code == '90005') {
                intoStep1()
            }
            else if (data.data.guide_code == '90004') {
                intoStep1()
            }
            else if (data.data.guide_code == '90026') {
                intoStep1()
            }
            else if (data.data.guide_code == '90027') {
                intoStep1()
            }
            else if (data.data.guide_code == '90028') {
                intoStep2('img', data.data.auth_code);
            }
            else if (data.data.guide_code == '90029') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90007') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90010') {
                intoStep1()
            }
            else if (data.data.guide_code == '90030') {
                intoStep1()
            }
            else if (data.data.guide_code == '90031') {
                intoStep1()
            }
            else if (data.data.guide_code == '90032') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90033') {
                intoStep1()
            }
            else if (data.data.guide_code == '90020') {
                intoStep1()
            }
            else if (data.data.guide_code == '90034') {
                intoStep1()
            }
            else if (data.data.guide_code == '90035') {
                intoStep1()
            }
        }
        function intoStep1() {
            $scope.mobilesecuritydata.inStep2 = false;
            $scope.mobilesecuritydata.password = "";
            $state.reload()
        }
        function intoStep2(type, imgbase64) {
            $scope.mobilesecuritydata.smscode = '';
            $scope.mobilesecuritydata.imgcode = '';
            $scope.mobilesecuritydata.imgurl = '';
            $scope.mobilesecuritydata.inStep2 = true;
            $scope.mobilesecuritydata.type = type;
            if (type == 'img') {
                if (imgbase64) {
                    $scope.mobilesecuritydata.imgurl = 'data:image/png;base64,' + imgbase64;
                } else {
                    $scope.codeget('img')
                }
            }

        }

        $scope.pop = function () {
            $ionicPopup.alert({
                title: '运营商服务电话',
                cssClass: 'mobilesecuritypopclass',
                templateUrl: 'modals/mobilesecurity/pop.html',
                okText: '我知道了'
            });
        }

        $scope.getmobile()
        document.getElementsByTagName('title')[0].innerHTML = '运营商认证';
        $scope.buttontext = $stateParams.jump != -1 ? "下一步" : "认证";
    })