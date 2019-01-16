angular.module('app')
    .controller('about', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
    })
angular.module('app')
    .controller('accountlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/account/logPaging.rrh', {
                pageSize: 1000,
                pageNow: 1
            }).then(function (data) {
                $scope.data = data.list;
            })

        }
        $scope.getdata();
    })
angular.module('app')
    .controller('authlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV3/index.rrh', {})
                .then(function (data) {
                    $scope.data = data
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            //只有当芝麻认证完成后才能进行下面的一系列认证
            if ($scope.data.list[0].status != 3) {
                appservice.warn('请先完成芝麻认证', 1000);
            }
            if (i.status == 3 || i.status == 1) {
                appservice.warn(i.note, 1000);
                return
            } else {
                if (i.type == 1) {
                    if (i.url.indexOf('#/auth/3') >= 0) {
                        $state.go('mobileauth');
                    } else {
                        $rootScope.GLOBAL.iframeurl = i.url;
                        $state.go('iframe')
                    }
                }
            }
        }
    })
angular.module('app')
    .controller('authlistchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.cannext = false;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV2/getAuthList.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.cannext = data.result.filter(function (i) {
                        return i.status == '3' || i.status == '1'
                    }).length == 2;
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            if (i.status == 3 || i.status == 1) {
                return
            }
            if (i.authName.indexOf('银行') >= 0) {
                $state.go('bankcardadd')
            }
            else if (i.authName.indexOf('运营商') >= 0) {
                $state.go('mobileauth')
            }
        }

        $scope.sub = function () {
            $state.go('downloadchannel')
        }
    })
angular.module('app')
    .controller('autonym', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.data = {}
        $scope.getdata = function () {
            $scope.data = {}
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/queryUserIdcard.rrh', {
                source: $stateParams.next ? 'newOrder' : ''
            }, false).then(function (data) {
                $scope.data = data;
                $scope.img.hascheck = true;
            }, function () {
                $scope.data = {}
            })
        }
        $scope.img = {
            post: function () {
                if (!$scope.data.realName) {
                    appservice.warn('请输入真实姓名', 1000);
                    return
                }
                if (!$scope.data.idcardNum) {
                    appservice.warn('请输入身份证号', 1000);
                    return
                }
                document.getElementById('cardfile1').click();
            },
            hascheck: false,
            data: {},
            check: function (file) {
                this.hascheck = false;
                this.data = {};
                var that = this;
                appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCard.rrh', file, {
                    side: 'front'
                }).then(function (data) {
                    that.hascheck = true;
                    that.data = data;
                    that.sub();
                }, function () {
                    document.getElementById('cardfile1').value = ""
                })
            },
            sub: function () {
                var that = this;
                appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserIdcard.rrh', {
                    real_name: $scope.data.realName,
                    idcard_num: $scope.data.idcardNum,
                    idcard_front_key: $scope.img.data.img_url,
                    idcard_back_key: '',
                    idcard_hand_key: '',
                    next_stage: $stateParams.next ? $stateParams.next : '-2',
                }).then(function (data) {
                    $scope.getdata();
                }, function () {
                    that.hascheck = false;
                    document.getElementById('cardfile1').value = ""
                    that.data = {}
                })
            }
        }
        $scope.zmop = function () {
            $rootScope.GLOBAL.iframeurl = $scope.data.zmopUrl;
            $state.go('iframe')
        }


        $scope.getdata();
        document.getElementById('cardfile1').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.img.check(file)
            }
        })
    })
angular.module('app')
    .controller('autonymchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        document.getElementById('cardfile11').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.postidcardimgfront(file)
            }
        })
        document.getElementById('cardfile22').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.postidcardimgback(file)
            }
        })

        $scope.postidcardimgfront = function (file) {
            $scope.checkfront = false;
            appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCardYiTu.rrh', file, {
                side: 'front'
            }).then(function (data) {
                $scope.checkfront = true;
                $scope.frontdata = data;
                $scope.showfrontcamera = false;
            }, function () {
                document.getElementById('cardfile11').value = ""
                $scope.checkfront = false;
                $scope.showfrontcamera = true;
                $scope.frontdata = null;
            })
        }
        $scope.postidcardimgback = function (file) {
            $scope.checkback = false;
            appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCardYiTu.rrh', file, {
                side: 'back'
            }).then(function (data) {
                $scope.checkback = true;
                $scope.backdata = data;
                $scope.showbackcamera = false;
            }, function () {
                document.getElementById('cardfile22').value = ""
                $scope.checkback = false;
                $scope.showbackcamera = true;
                $scope.backdata = null;
            })
        }

        $scope.item = {
            name: '',
            id: ''
        }

        $scope.sub = function () {
            if ($scope.user && $scope.user.certification) {
                return
            }
            if (!$scope.item.name) {
                appservice.warn('请输入真实姓名', 1000);
                return
            }
            if (!$scope.item.id) {
                appservice.warn('请输入身份证号', 1000);
                return
            }
            if (!$scope.checkfront) {
                appservice.warn('请上传身份证正面照', 1000);
                return
            }
            if (!$scope.checkback) {
                appservice.warn('请上传身份证反面照', 1000);
                return
            }
            if ($scope.item.name != $scope.frontdata.realName || $scope.item.id != $scope.frontdata.idcardNum) {
                var _warn = '输入的个人信息和图片信息不一致,身份证照片信息识别如下:姓名:' + $scope.frontdata.realName + ',身份证号:' + $scope.frontdata.idcardNum + ',请检查输入或重拍身份证正面';
                appservice.warn(_warn, 3000);
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserIdcard.rrh', {
                real_name: $scope.frontdata.realName,
                idcard_num: $scope.frontdata.idcardNum,
                idcard_front_key: $scope.frontdata.img_url,
                idcard_back_key: $scope.backdata.img_url,
                idcard_hand_key: '',
                next_stage: 'rrh2.1channel',
            }).then(function (data) {
                window.GLOBAL.instep = true;
                appservice.warn('信息提交成功', 1000, function () {
                    $rootScope.GLOBAL.iframeurl = data.result;
                    $state.go('iframe')
                })
            })
        }


        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    $scope.getdata();
                })

        }

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/queryUserIdcard.rrh', {}, false).then(function (data) {
                $scope.item.name = data.realName;
                $scope.item.id = data.idcardNum;

                $scope.checkback = true;
                $scope.backdata = {
                    img_url: data.idcardBackKey,
                    realName: data.realName,
                    idcardNum: data.idcardNum
                };
                $scope.checkfront = true;
                $scope.frontdata = {
                    img_url: data.idcardKey,
                    realName: data.realName,
                    idcardNum: data.idcardNum
                };
            })
        }

        $scope.getuser();
    })
angular.module('app')
    .controller('bankcard', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('bankcardadd', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        //如果是提现没绑卡进来的去除一层路由
        if ($rootScope.withdrawTObankcardadd) {
            $ionicHistory.removeBackView();
            $rootScope.withdrawTObankcardadd = false;
        }

        $scope.item = {
            cardno: "",
            phone: "",
        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + "/user/queryUserIdcard.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                        .then(function (data) {
                            $scope.item.phone = data.mobile;
                        })
                })
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

        $scope.yzm = {
            data: '',
            getyzm: function () {
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardRequest.rrh", $scope.item)
                    .then(function (data) {
                        appservice.warn('验证码已发送', 1000)
                        $scope.djs.start();
                    }, function () {
                        //$scope.djs.start();
                    })
            }
        }

        $scope.sub = function () {
            if ($scope.paytype == '1') {
                localStorage.lianlianbindcardno = $scope.item.cardno
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getBindCardParams.rrh',
                    {
                        cardno: $scope.item.cardno,
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                    })
                    .then(function (data) {
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardConfirm.rrh", {
                    validatecode: $scope.yzm.data
                }).then(function (data) {
                    $ionicHistory.goBack(-1);
                })
            }
        }

        $scope.supportbank = function () {
            $rootScope.GLOBAL.iframeurl = 'app.renrenhua.com/rrhprotocolh5/bank.html';
            $state.go('iframe')
        }

        $scope.paytype = 1;//0 易宝；1连连支付

        $scope.checkPayType = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                {
                })
                .then(function (data) {
                    $scope.paytype = data.result;
                    $scope.getdata();

                })
        }

        $scope.checkPayType();
    })
angular.module('app')
    .controller('borrowlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/pending.rrh', {
                status: $stateParams.status,
                pageNow: 1,
                pageSize: 30
            }).then(function (data) {
                $scope.data = data;
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('contract', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goh5contract = function () {
            if (GLOBAL.debug) {
                var url = '//testm.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            } else {
                var url = '//app.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            }
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/generateAgreement.rrh', {
                        serialno: $scope.data.serialno
                    }).then(function (data) {
                        $state.go('contractsuc')
                    })
                }, function (data) {
                    if (data.code == 1111) {
                        $state.go('bankcardadd')
                    }
                })
        }
    })
angular.module('app')
    .controller('contractsuc', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
    })
angular.module('app')
    .controller('downloadchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopover) {
        $scope.do = function () {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.android.renrenhua&ckey=CK1352479390142'
        }

        $scope.more = function (e) {
            var template = '<ion-popover-view class="downpop"<ion-content> <img src="img/popup_img.png" alt="" class="img3"><img src="img/close_button.png" alt="" class="close"  ng-click="popover.hide()"></div><div class="line"></div></ion-popover-view </ion-content>';
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.popover.show(e);
        }
        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
    })
angular.module('app')
    .controller('editpwd', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
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
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.item.phone = data.mobile
                })
        }
        $scope.getuser();


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
    })  
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
angular.module('app')
    .controller('help', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopup) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.copywarn = function (str) {
            appservice.warn(str, 1000)
        }

        $scope.showqrcode = function () {
            $rootScope.popqrcode = $ionicPopup.show({
                templateUrl: 'templates/popqrcode/index.html',
                cssClass: 'popqrcode'
            });
        }
    })
angular.module('app')
    .controller('home', function ($scope, $rootScope, appservice, $state, $ionicSlideBoxDelegate) {
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.changeactive = function (i) {
            $scope.active = i;
            if ($scope.data.feeConfig && $scope.data.feeConfig.length > 0) {
                $scope.threedata = $scope.data.feeConfig.filter(function (i) {
                    return i.group == $scope.data.periodGroup[$scope.active] + "-" + $scope.data.amountGroup[0]
                })[0];
            }


        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/homeV2/index.open', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.changeactive(0);
                    $ionicSlideBoxDelegate.update()
                    $ionicSlideBoxDelegate.enableSlide(true)
                    $ionicSlideBoxDelegate.loop(true)
                    $ionicSlideBoxDelegate.start()
                    if (localStorage.token) {
                        appservice.postdata($rootScope.GLOBAL.coreUrl + '/message/unreadMessage.rrh', {})
                            .then(function (data) {
                                $scope.messageNum = data;
                            })
                    }
                })
        }
        $scope.getdata();

        $scope.goWithTokenwaveloginreg = function (state, statep) {
            appservice.goWithTokenwaveloginreg($scope, state, statep)
        }

        $scope.sub = function () {
            appservice.checktoken()
                .then(function () {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/beforeNewOrder.rrh', {})
                        .then(function (data) {
                            if (data.isOverdue) {
                                appservice.warn('还清后才可以再借款哦', 1000, function () {
                                    $state.go('prerepaymentlist')
                                });
                                return
                            }
                            if (data.isApplication) {
                                appservice.warn('您已经申请过该产品', 1000);
                                return
                            }
                            if (data.mustAuth != "OK") {
                                appservice.warn(data.mustAuth, 1000);
                                return
                            }
                            if (data.infoAuth) {
                                $state.go('autonym', { next: 'rrh2.1channel' })
                                return
                            }
                            if (data.fifteenDays) {
                                appservice.warn(data.rejectMsg, 1000);
                                return
                            }
                            if (data.operatorOverdue) {
                                $state.go('authlistchannel')
                            } else {
                                $state.go('downloadchannel')
                            }

                        }, function () {

                        })
                }, function () {
                })
        }

        $scope.tomessage = function () {
            appservice.goWithTokenwaveloginreg($scope, 'message')
        }
    })

angular.module('app')
    .controller('homechannel', function ($scope, $rootScope, appservice, $state, $ionicSlideBoxDelegate, $stateParams) {
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
        $scope.changeactive = function (i) {
            $scope.active = i;
            if ($scope.data.feeConfig && $scope.data.feeConfig.length > 0) {
                $scope.threedata = $scope.data.feeConfig.filter(function (i) {
                    return i.group == $scope.data.periodGroup[$scope.active] + "-" + $scope.data.amountGroup[0]
                })[0];
            }
        }
        $scope.getdata = function () {
            if ($stateParams.hasaccount && !localStorage.token && localStorage.loginonce) {
                appservice.login($scope);
            }
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/homeV2/index.open', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.changeactive(0);
                    $ionicSlideBoxDelegate.update()
                    $ionicSlideBoxDelegate.enableSlide(true)
                    $ionicSlideBoxDelegate.loop(true)
                    $ionicSlideBoxDelegate.start()
                    var _stylevalue = 'background-image: -webkit-gradient(linear, left top, right top, from(#FF9D00), color-stop(' + $scope.data.amountGroup[0] / 3000 * 100 + '%, #EFEFF4));background-image: linear-gradient(to right, #FF9D00 0%, #EFEFF4 ' + $scope.data.amountGroup[0] / 3000 * 100 + '%) ;'
                    eval("var style = {\"#home .product .bd .up .range.rangerule" + $scope.data.amountGroup[0] + " input::-webkit-slider-runnable-track\": _stylevalue}");
                    addStyleSheet(style);
                })
        }
        $scope.getdata();

        $scope.goWithTokenwaveloginreg = function (state, statep) {
            appservice.goWithTokenwaveloginreg($scope, state, statep)
        }

        $scope.sub = function () {
            appservice.checktoken().then(function () {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorization/queryVerifyStatus.rrh', { verify_type: 'ZMOP_SCORE' }).then(function (data) {
                    if (data.status != 1 && data.status != 3) {
                        $state.go('autonym', { next: 'rrh2.1channel' })
                    } else {
                        $state.go('downloadchannel')
                    }
                }, function () {
                })
            }, function () {
            })
        }

        $scope.tomessage = function () {
            appservice.goWithTokenwaveloginreg($scope, 'message')
        }
    })

angular.module('app')
    .controller('iframe', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl($rootScope.GLOBAL.iframeurl);
    })
angular.module('app')
    .controller('infobase', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.education = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.maritalStatus = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.cityjson = cityservice.data;

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 0 })
                .then(function (data) {
                    $scope.data = data;
                    var temparr = [
                        [{
                            data: data.education.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    var temparr1 = [
                        [{
                            data: data.maritalStatus.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    $scope.education.wheels = temparr;
                    $scope.maritalStatus.wheels = temparr1;
                    $scope.address = {
                        input: undefined,
                        input1: data.userInfo.address ? data.userInfo.address.split("####")[1] : undefined,
                        showinput: data.userInfo.address ? data.userInfo.address.split("####")[0] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata(data.userInfo.address.split("####")[0]),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }

                    if (data.userInfo.maxDegree && data.userInfo.maxDegree.name) {
                        $scope.education.input = data.userInfo.maxDegree.name;
                    }
                    if (data.userInfo.maritalStatus && data.userInfo.maritalStatus.name) {
                        $scope.maritalStatus.input = data.userInfo.maritalStatus.name;
                    }

                })
        }
        $scope.getdata();


        $scope.sub = function () {
            var item = {};
            if (!$scope.education.input) {
                appservice.warn('请选择最高学历', 1000)
                return
            }
            if (!$scope.maritalStatus.input) {
                appservice.warn('请选择婚姻状况', 1000)
                return
            }

            if (!$scope.address.input && !$scope.address.showinput) {
                appservice.warn('请选择联系地址', 1000)
                return
            } else {
                $scope.address.input = $scope.address.showinput;
            }
            if (!$scope.address.input1) {
                appservice.warn('请输入所在街道、门牌号', 1000)
                return
            }
            if ($scope.data.userInfo.familyPhone) {
                if (!/^0\d{2,3}-?\d{7,8}$/.test($scope.data.userInfo.familyPhone) && !/^1\d{10}$/.test($scope.data.userInfo.familyPhone)) {
                    appservice.warn('家庭电话格式错误', 1000)
                    return
                }
            }
            if (!$scope.data.userInfo.email) {
                appservice.warn('请输入邮箱', 1000)
                return
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.userInfo.email)) {
                appservice.warn('邮箱格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.wx && $scope.data.userInfo.wx.search(/^[a-zA-Z\d_]{5,}$/) == -1) {
                appservice.warn('微信号格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.qq && $scope.data.userInfo.qq.search(/^[1-9]\d{4,13}$/) == -1) {
                appservice.warn('qq号格式错误', 1000)
                return
            }
            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserInfo.rrh',
                {
                    max_degree: $scope.data.education.filter(function (i) { return i.name == $scope.education.input })[0].id,
                    marital_status: $scope.data.maritalStatus.filter(function (i) { return i.name == $scope.maritalStatus.input })[0].id,
                    address: ($scope.address.input + "####" + ($scope.address.input1 || "")),
                    city_id: "",
                    family_phone: $scope.data.userInfo.familyPhone,
                    email: $scope.data.userInfo.email,
                    qq: $scope.data.userInfo.qq,
                    wx: $scope.data.userInfo.wx
                }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);

                })
            })
        }
    })
angular.module('app')
    .controller('infobasechannel', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.education = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.maritalStatus = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.cityjson = cityservice.data;

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/getUserInfo.rrh')
                .then(function (data) {
                    $scope.data = data;
                    var temparr = [
                        [{
                            data: data.education.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    var temparr1 = [
                        [{
                            data: data.maritalStatus.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    $scope.education.wheels = temparr;
                    $scope.maritalStatus.wheels = temparr1;

                    $scope.address = {
                        input: undefined,
                        input1: data.userInfo.address ? data.userInfo.address.split("####")[1] : undefined,
                        showinput: data.userInfo.address ? data.userInfo.address.split("####")[0] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata(data.userInfo.address.split("####")[0]),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }

                    if (data.userInfo.maxDegree && data.userInfo.maxDegree.name) {
                        $scope.education.input = data.userInfo.maxDegree.name;
                    }
                    if (data.userInfo.maritalStatus && data.userInfo.maritalStatus.name) {
                        $scope.maritalStatus.input = data.userInfo.maritalStatus.name;
                    }

                    $scope.workingTime = {
                        input: $scope.data.userInfo.workingTime ? $scope.data.userInfo.workingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.status = {
                        input: $scope.data.userInfo.workStatus ? $scope.data.userInfo.workStatus.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workingState.map(function (i) { return i.name }) }]]
                    }
                })
        }
        $scope.getdata();


        $scope.sub = function () {
            var item = {};
            if (!$scope.education.input) {
                appservice.warn('请选择最高学历', 1000)
                return
            }
            if (!$scope.maritalStatus.input) {
                appservice.warn('请选择婚姻状况', 1000)
                return
            }

            if (!$scope.address.input && !$scope.address.showinput) {
                appservice.warn('请选择联系地址', 1000)
                return
            } else {
                $scope.address.input = $scope.address.showinput;
            }
            if (!$scope.address.input1) {
                appservice.warn('请输入所在街道、门牌号', 1000)
                return
            }
            if ($scope.data.userInfo.familyPhone) {
                if ($scope.data.userInfo.familyPhone.length < 10 || $scope.data.userInfo.familyPhone.length > 13) {
                    appservice.warn('家庭电话格式错误', 1000)
                    return
                }
            }
            if (!$scope.data.userInfo.email) {
                appservice.warn('请输入邮箱', 1000)
                return
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.userInfo.email)) {
                appservice.warn('邮箱格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.wx && $scope.data.userInfo.wx.search(/^[a-zA-Z\d_]{5,}$/) == -1) {
                appservice.warn('微信号格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.qq && $scope.data.userInfo.qq.search(/^[1-9]\d{4,13}$/) == -1) {
                appservice.warn('qq号格式错误', 1000)
                return
            }
            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            if (!$scope.workingTime.input) {
                appservice.warn('请输入参加工作的年限', 1000)
                return
            }
            if (!$scope.status.input) {
                appservice.warn('请输入当前工作状态', 1000)
                return
            }

            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/submitUserInfo.rrh',
                {
                    max_degree: $scope.data.education.filter(function (i) { return i.name == $scope.education.input })[0].id,
                    marital_status: $scope.data.maritalStatus.filter(function (i) { return i.name == $scope.maritalStatus.input })[0].id,
                    address: ($scope.address.input + "####" + ($scope.address.input1 || "")),
                    city_id: "",
                    family_phone: $scope.data.userInfo.familyPhone,
                    email: $scope.data.userInfo.email,
                    qq: $scope.data.userInfo.qq,
                    wx: $scope.data.userInfo.wx,
                    working_time: $scope.data.workSeniority.filter(function (i) { return i.name == $scope.workingTime.input })[0].id,
                    work_status: $scope.data.workingState.filter(function (i) { return i.name == $scope.status.input })[0].id,
                }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $state.go('authlistchannel')
                })
            })
        }
    })
angular.module('app')
    .controller('infofamily', function ($scope, $rootScope, appservice, cityservice, $ionicHistory) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 3 })
                .then(function (data) {
                    $scope.data = data;
                    $scope.child = {
                        input: data.childrenNum == 0 ? "无" : data.childrenNum,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", 1, 2, 3] }]]
                    }
                    $scope.house = {
                        input: data.haveHouse == 0 ? "无" : "有",
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", "有"] }]]
                    }
                    $scope.car = {
                        input: data.haveCar == 0 ? "无" : "有",
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", "有"] }]]
                    }
                })
        }
        $scope.getdata();

        $scope.$watch('car.input', function (newV, oldV) {
            if ($scope.data) {
                if (newV == '无')
                    $scope.data.carNumber = "";
            }
        })

        $scope.sub = function () {
            if ($scope.car.input == "有" && !$scope.data.carNumber) {
                appservice.warn("请输入车牌号", 1000);
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitFamilyInfo.rrh', {
                children_num: $scope.child.input == "无" ? 0 : $scope.child.input,
                have_house: $scope.house.input == "有" ? 1 : 0,
                car_number: $scope.data.carNumber,
                have_car: $scope.car.input == "有" ? 1 : 0
            }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);
                })
            })
        }
    })
angular.module('app')
    .controller('infolinkman', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 2 })
                .then(function (data) {
                    $scope.data = data;
                    $scope.linkman1 = {
                        input: (data.userContacts && data.userContacts.length > 0) ? data.userContacts[0].type.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.familyTies.map(function (i) { return i.name }) }]]
                    }
                    $scope.linkman2 = {
                        input: (data.userContacts && data.userContacts.length > 0) ? data.userContacts[1].type.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.familyTies.map(function (i) { return i.name }) }]]
                    }
                    if (data.userContacts.length > 0) {
                        $scope.linkmaninfo1 = data.userContacts[0];
                    } else {
                        $scope.linkmaninfo1 = {

                        }
                    }
                    if (data.userContacts.length > 0) {
                        $scope.linkmaninfo2 = data.userContacts[1];
                    } else {
                        $scope.linkmaninfo2 = {

                        }
                    }

                })
        }
        $scope.getdata();


        $scope.sub = function () {
            if (!$scope.linkmaninfo1.name) {
                appservice.warn('请输入联系人1的姓名', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo1.name)) {
                appservice.warn('联系人1的姓名格式错误', 1000)
                return
            }
            if (!$scope.linkman1.input) {
                appservice.warn('请选择联系人1和你的关系', 1000)
                return
            }
            if (!$scope.linkmaninfo1.mobile) {
                appservice.warn('请输入联系人1的手机号', 1000)
                return
            }
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo1.mobile))) {
                appservice.warn('联系人1的联系电话格式错误', 1000)
                return
            }
            if (!$scope.linkmaninfo2.name) {
                appservice.warn('请输入联系人2的姓名', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo2.name)) {
                appservice.warn('联系人2的姓名格式错误', 1000)
                return
            }
            if ($scope.linkmaninfo1.name == $scope.linkmaninfo2.name) {
                appservice.warn('不能选择同一联系人', 1500);
                return
            }
            if (!$scope.linkman2.input) {
                appservice.warn('请选择联系人2和你的关系', 1000)
                return
            }
            if (!$scope.linkmaninfo2.mobile) {
                appservice.warn('请输入联系人2的手机号', 1000)
                return
            }

            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo2.mobile))) {
                appservice.warn('联系人2的联系电话格式错误', 1000)
                return
            }

            if ($scope.linkmaninfo1.mobile == $scope.linkmaninfo2.mobile) {
                appservice.warn('联系人号码不能相同', 1500);
                return
            }




            var jsonStr = [];
            jsonStr.push({
                id: $scope.linkmaninfo1.id,
                name: $scope.linkmaninfo1.name,
                mobile: $scope.linkmaninfo1.mobile,
                type: $scope.data.familyTies.filter(function (i) { return i.name == $scope.linkman1.input })[0].id
            })
            jsonStr.push({
                id: $scope.linkmaninfo2.id,
                name: $scope.linkmaninfo2.name,
                mobile: $scope.linkmaninfo2.mobile,
                type: $scope.data.familyTies.filter(function (i) { return i.name == $scope.linkman2.input })[0].id
            })

            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserContact.rrh', {
                jsonStr: JSON.stringify(jsonStr)
            }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);
                })
            })
        }
    })
angular.module('app')
    .controller('infolinkmanchannel', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 2 })
                .then(function (data) {
                    $scope.data = data;
                    $scope.linkman1 = {
                        input: (data.userContacts && data.userContacts.length > 0) ? data.userContacts[0].type.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.familyTies.map(function (i) { return i.name }) }]]
                    }
                    $scope.linkman2 = {
                        input: (data.userContacts && data.userContacts.length > 0) ? data.userContacts[1].type.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.familyTies.map(function (i) { return i.name }) }]]
                    }
                    if (data.userContacts.length > 0) {
                        $scope.linkmaninfo1 = data.userContacts[0];
                    } else {
                        $scope.linkmaninfo1 = {

                        }
                    }
                    if (data.userContacts.length > 0) {
                        $scope.linkmaninfo2 = data.userContacts[1];
                    } else {
                        $scope.linkmaninfo2 = {

                        }
                    }

                })
        }
        $scope.getdata();


        $scope.sub = function () {
            if (!$scope.linkmaninfo1.name) {
                appservice.warn('请输入联系人1的姓名', 1000)
                return
            }
            if (!$scope.linkman1.input) {
                appservice.warn('请选择联系人1和你的关系', 1000)
                return
            }
            if (!$scope.linkmaninfo1.mobile) {
                appservice.warn('请输入联系人1的手机号', 1000)
                return
            }
            if (!$scope.linkmaninfo2.name) {
                appservice.warn('请输入联系人2的姓名', 1000)
                return
            }
            if (!$scope.linkman2.input) {
                appservice.warn('请选择联系人2和你的关系', 1000)
                return
            }
            if (!$scope.linkmaninfo2.mobile) {
                appservice.warn('请输入联系人2的手机号', 1000)
                return
            }

            if ($scope.linkmaninfo1.mobile == $scope.linkmaninfo2.mobile) {
                appservice.warn('联系人号码不能相同', 1500);
                return
            }
            if ($scope.linkmaninfo1.name == $scope.linkmaninfo2.name) {
                appservice.warn('不能选择同一联系人', 1500);
                return
            }
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo1.mobile))) {
                appservice.warn('联系人1的联系电话格式错误', 1000)
                return
            }
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo2.mobile))) {
                appservice.warn('联系人2的联系电话格式错误', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo1.name)) {
                appservice.warn('联系人1的姓名格式错误', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo2.name)) {
                appservice.warn('联系人2的姓名格式错误', 1000)
                return
            }
            var jsonStr = [];
            jsonStr.push({
                id: $scope.linkmaninfo1.id,
                name: $scope.linkmaninfo1.name,
                mobile: $scope.linkmaninfo1.mobile,
                type: $scope.data.familyTies.filter(function (i) { return i.name == $scope.linkman1.input })[0].id
            })
            jsonStr.push({
                id: $scope.linkmaninfo2.id,
                name: $scope.linkmaninfo2.name,
                mobile: $scope.linkmaninfo2.mobile,
                type: $scope.data.familyTies.filter(function (i) { return i.name == $scope.linkman2.input })[0].id
            })


            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserContact.rrh', {
                jsonStr: JSON.stringify(jsonStr)
            }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $state.go('authlistchannel')
                })
            })
        }
    })
angular.module('app')
    .controller('infowork', function ($scope, $rootScope, appservice, cityservice, $ionicHistory) {
        $scope.cityjson = cityservice.data;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 1 })
                .then(function (data) {
                    $scope.data = data;
                    if (data.userWork) {
                        $scope.userWork = data.userWork;
                    } else {
                        $scope.userWork = {}
                    }

                    $scope.workingTime = {
                        input: $scope.userWork.workingTime ? $scope.userWork.workingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.status = {
                        input: $scope.userWork.status ? $scope.userWork.status.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workingState.map(function (i) { return i.name }) }]]
                    }
                    $scope.currentWorkingTime = {
                        input: $scope.userWork.currentWorkingTime ? $scope.userWork.currentWorkingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.companyType = {
                        input: $scope.userWork.companyType ? $scope.userWork.companyType : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.companyTypes }]]
                    }
                    $scope.position = {
                        input: $scope.userWork.position ? $scope.userWork.position : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workPositions }]]
                    }
                    $scope.monthEarning = {
                        input: $scope.userWork.monthEarning ? $scope.userWork.monthEarning : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.monthEarnings }]]
                    }
                    $scope.address = {
                        input: undefined,
                        showinput: $scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[0] : undefined,
                        input1: $scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[1] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata($scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[0] : undefined),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }
                })
        }
        $scope.getdata();

        $scope.sub = function () {
            if (!$scope.workingTime.input) {
                appservice.warn('请输入参加工作的年限', 1000)
                return
            }
            if (!$scope.status.input) {
                appservice.warn('请输入当前工作状态', 1000)
                return
            }

            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            if ($scope.userWork.companyPhone) {
                if ($scope.userWork.companyPhone.length < 10 || $scope.userWork.companyPhone.length > 13) {
                    appservice.warn('现单位电话格式不正确', 1000)
                    return
                }
            }
            var item = {
                working_time: $scope.data.workSeniority.filter(function (i) { return i.name == $scope.workingTime.input })[0].id,
                work_status: $scope.data.workingState.filter(function (i) { return i.name == $scope.status.input })[0].id,
                company_name: $scope.userWork.companyName || "",
                current_working_time: "",
                company_address: "",
                company_phone: $scope.userWork.companyPhone || "",
                company_type: $scope.companyType.input || "",
                work_position: $scope.position.input || "",
                month_earning: $scope.monthEarning.input || "",
                id: $scope.userWork.id || "",
            }

            if ($scope.currentWorkingTime.input) {
                item.current_working_time = $scope.data.workSeniority.filter(function (i) { return i.name == $scope.currentWorkingTime.input })[0].id;
            }
            if ($scope.address.input) {
                item.company_address = $scope.address.input + "####" + ($scope.address.input1 ? $scope.address.input1 : "");
            }

            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserWork.rrh', item
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);
                })
            })
        }
    })
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
angular.module('app')
    .controller('message', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/home/msgPaging.rrh', { pageSize: 1000, pageNow: 1 })
                .then(function (data) {
                    $scope.data = data.list;
                })
        }
        $scope.getdata();

    })
angular.module('app')
    .controller('mobileauth', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopup) {
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
                }, true)
                return
            }
            if (isNaN($scope.mobilesecuritydata.password)) {
                appservice.warn('服务密码有误,请重新填写', 2000, function () {
                    $scope.mobilesecuritydata.password = '';
                }, true)
                return
            }
            appservice.warn('此过程可能耗时稍长，请耐心等待', 2000, function () {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_yys_auth.rrh', {
                    password: $scope.mobilesecuritydata.password
                }).then(function (data) {
                    if (data.code == '105') {
                        appservice.warn(data.message, 2000, function () {
                            $ionicHistory.goBack()
                        }, true)
                    } else if (data.code == '104') {
                        appservice.warn(data.data.guide_message, 2000, function () {
                            dogcode(data)
                        }, true)
                    } else {
                        appservice.warn(data.message, 2000, function () {
                            intoStep1()
                        }, true)
                    }
                })
            }, true)


        }
        $scope.next2 = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_input_sms.rrh', {
                authCode: $scope.mobilesecuritydata[$scope.mobilesecuritydata.type + 'code']
            }
            ).then(function (data) {
                if (data.code == '105') {
                    appservice.warn(data.message, 2000, function () {
                        $ionicHistory.goBack()
                    }, true)
                } else if (data.code == '104') {
                    appservice.warn(data.data.guide_message, 2000, function () {
                        dogcode(data)
                    }, true)
                } else {
                    appservice.warn(data.message, 2000, function () {
                        intoStep1()
                    }, true)
                }
            })
        }
        $scope.codeget = function (type) {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_retry.rrh', {
                codeType: type
            }
            ).then(function (data) {
                if (data && data.data && data.data.inputs && data.data.inputs[0] && data.data.inputs[0].type == 'img') {
                    $scope.mobilesecuritydata.imgurl = 'data:image/png;base64,' + data.data.inputs[0].value
                }
            })
        }
        function dogcode(data) {
            if (data.data.guide_code == '90001') {
                intoStep2('sms');
            } else if (data.data.guide_code == '90002') {
                intoStep2('img');
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
                intoStep2('img')
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
        function intoStep2(type) {
            $scope.mobilesecuritydata.smscode = '';
            $scope.mobilesecuritydata.imgcode = '';
            $scope.mobilesecuritydata.imgurl = '';
            $scope.mobilesecuritydata.inStep2 = true;
            $scope.mobilesecuritydata.type = type;
        }
        $scope.pop = function () {
            $ionicPopup.alert({
                title: '运营商服务电话',
                cssClass: 'mobilesecuritypopclass',
                templateUrl: 'templates/popmobilesecurity/index.html',
                okText: '我知道了'
            });
        }
        $scope.buttontext = '提交';
        $scope.getmobile()
    })
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
angular.module('app')
    .controller('modalticket', function ($scope, $rootScope, appservice, $state, $ionicHistory) {
        $scope.status = 0
        appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/getList.rrh', {
            status: $scope.status
        }).then(function (data) {
            $scope.modaldata = data.result;
        }, function () {
            $scope.modaldata = []
        })
        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];
        $scope.sel = function (i) {
            if ($scope.modal.item == i) {
                $scope.modal.item = null
            } else {
                $scope.modal.item = i;
            }
            $scope.modal.hide();

        }
    })
angular.module('app')
    .controller('my', function ($scope, $rootScope, appservice, $state) {
        $scope.gologin = function () {
            appservice.login($scope)
        }
        $scope.getuser = function () {
            $scope.user = null;
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                })
        }

        $scope.trgfile = function () {
            return document.getElementById('myfile1').click();
        }
        $scope.inwx = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
        $scope.wxinvitation = function () {
            if (localStorage.token) {
                var _href = '';
                if (GLOBAL.debug) {
                    _href = '//testm.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                } else {
                    _href = '//app.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                }
                window.location.href = _href;
            } else {
                appservice.login($scope)
            }
        }
        $scope.mygo = function (state) {
            appservice.goWithToken($scope, state)
        }

        $scope.mygo1 = function (state) {
            appservice.goWithAuth($scope, $scope.user, state)
        }
        $scope.mygo2 = function (state) {
            appservice.goWithAuth2($scope, $scope.user, state)
        }


        $scope.postidcardimgfront = function (file) {
            appservice.postimg($rootScope.GLOBAL.userUrl + '/upload/headPortrait.rrh', file).then(function (data) {
                $scope.user.headImg = data.result;
            }, function (data) {

            })
        }
        if (localStorage.token) {
            if ($rootScope.firstautonym) {
                $rootScope.firstautonym = false;
                $state.go('autonym')
            } else {
                $scope.getuser()
            }
        }
        document.getElementById('myfile1').addEventListener('change', function (e) {
            var file = e.target.files[0];
            $scope.postidcardimgfront(file)
        })
    })
angular.module('app')
    .controller('nginclude', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl("http://www.91maidan.com" || $rootScope.GLOBAL.iframeurl);
    })
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
angular.module('app')
    .controller('order', function ($scope, $rootScope, appservice) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/index.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        if (localStorage.token) {
            $scope.getdata();
        }

        $scope.go = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'borrowlist', { status: status })
        }

        $scope.gotransactionlist = function () {

            appservice.goWithTokenwaveloginreg($scope, 'transactionlist')
        }
        $scope.goprerepaymentlist = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'prerepaymentlist', { status: status })
        }
    })
angular.module('app')
    .controller('orderdetail', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/detail.rrh', {
                id: $stateParams.id
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.paybackPlans[0].daysRemaining >= 0 && $scope.data.paybackPlans[0].daysRemaining <= 2) || $scope.data.paybackPlans[0].overdueDays > 0) {
                    $scope.check = true;
                }
                if ($scope.data.status == 7) {
                    $ionicScrollDelegate.freezeScroll(true);
                    $timeout(function () {
                        document.getElementsByClassName('scroll')[0].style.transform = "";
                    }, 500)
                }
            })
        }


        $scope.repayment = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            var vid = ''
            $rootScope.vid = 0;
            if ($scope.modal && $scope.modal.item && $scope.modal.item.id) {
                vid = $scope.modal.item.id
                $rootScope.vid = vid;
            }
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/orderRepayment.rrh', {
                planIds: $scope.data.paybackPlans[0].id,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    appservice.urlback();
                    // $scope.data.status = 7;
                    // $scope.data.pendingRepayment = 0;
                    // $ionicScrollDelegate.freezeScroll(true);
                    // $timeout(function () {
                    //     document.getElementsByClassName('scroll')[0].style.transform = "";
                    // }, 500)

                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.pendingRepayment - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
        }

        $scope.gocontract = function () {
            $state.go('contract')
        }
        $scope.pdfcontractFee = function () {
            $rootScope.GLOBAL.iframeurl = $scope.data.contractFee;
            $state.go('iframe')
        }

        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }

        $scope.modalyhq = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            if (!$scope.modal) {
                $ionicModal.fromTemplateUrl('templates/modalticket/index.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                })
            } else {
                $scope.modal.show();
            }

        }
        // $scope.modalyhq()
        $scope.getdata();
    })



angular.module('app')
    .controller('poprrhcoinslist', function ($scope, $rootScope, appservice) {

    })
angular.module('app')
    .controller('waveloginreg', function ($scope, $rootScope, appservice) {
        $scope.wavegologin = function () {
            $rootScope.popwaveloginreg.close();
            appservice.login()
        }
    })
angular.module('app')
    .controller('prerepaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/pendingRepayment.rrh', {
                pageNow: 1,
                pageSize: 300,
                date: $stateParams.status || 0,
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.list[0].daysRemaining >= 0 && $scope.data.list[0].daysRemaining <= 2) || $scope.data.list[0].overdueDays > 0) {
                    $scope.check = true;
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.check = false;
        $scope.getdata();

        $scope.sub = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            var vid = ''
            $rootScope.vid = 0;
            if ($scope.modal && $scope.modal.item && $scope.modal.item.id) {
                vid = $scope.modal.item.id
                $rootScope.vid = vid;
            }

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/orderRepayment.rrh', {
                planIds: $scope.data.list[0].planId,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    $state.go('orderdetail', { id: $scope.data.list[0].id })
                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.list[0].balance - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
        }
        $scope.modalyhq = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            if (!$scope.modal) {
                $ionicModal.fromTemplateUrl('templates/modalticket/index.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                })
            } else {
                $scope.modal.show();
            }
        }
        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }
    })
angular.module('app')
    .controller('recharge', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $interval) {
        $scope.item = {
            num: ''
        }
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd');
                    })
                })
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    if ($stateParams.money) {
                        $scope.item.num = ($stateParams.money - $scope.user.balanceMoney).toFixed(2);
                    }
                    if ($scope.item.num <= 2) {
                        $scope.item.num = "2.00";
                    }
                })
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

        $scope.yzm = {
            data: '',
            getyzm: function () {
                if ($stateParams.money) {
                    if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
                        appservice.warn('金额必须要大于等于还款金额', 1000);
                        return
                    }
                }
                if ($scope.item.num > 1) {
                    appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
                        amount: $scope.item.num
                    }).then(function (data) {
                        appservice.warn('短信验证码已发送', 1000);
                        $scope.djs.start();
                    })
                } else {
                    appservice.warn('充值金额要大于1元', 1000);
                    return
                }
            }
        }
        $scope.paytype = 1;//0 易宝；1连连支付

        $scope.checkPayType = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                {
                })
                .then(function (data) {
                    $scope.paytype = data.result;
                    $scope.getdata();

                })
        }

        $scope.sub = function () {
            // if ($stateParams.money) {
            //     if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
            //         appservice.warn('金额必须要大于等于还款金额', 1000);
            //         return
            //     }
            // }
            if (!$rootScope.vid) {
                $rootScope.vid = 0;
            }
            if ($scope.paytype == 1) {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getPayParams.rrh',
                    {
                        amount: $scope.item.num,
                        payback: 'T',
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                        vouchersId: $rootScope.vid
                    })
                    .then(function (data) {
                        $rootScope.vid = 0;
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayConfirm.rrh', {
                    validatecode: $scope.yzm.data,
                    payback: 'T'
                }).then(function (data) {
                    appservice.warn('还款成功', 2000, function () {
                        $state.go('order')
                    })
                    // $state.go('rechargesuc', {
                    //     m1: $scope.item.num,
                    //     m2: $scope.item.num + $scope.user.balanceMoney
                    // })
                }, function (err) {
                    if (err.code == 1001) {

                    } else {
                        $state.go('rechargeerror')
                    }

                })
            }

        }

        $scope.checkPayType()
    })
angular.module('app')
    .controller('rechargeerror', function ($scope, $rootScope, appservice, $ionicHistory, $state) {

    })
angular.module('app')
    .controller('rechargesuc', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.m1 = $stateParams.m1;
        $scope.m2 = $stateParams.m2;
    })
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
angular.module('app')
    .controller('repaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/monthlyRepayment.rrh', {
                pageNow: 1,
                pageSize: 300
            }).then(function (data) {
                $scope.thismonth = new Date().getFullYear() + "年" + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() + 1)) + "月");
                $scope.data = _.groupBy(data.list, 'mothly')
                for (var i in $scope.data) {
                    $scope.data[i].total = _.reduce($scope.data[i], function (a, b) {
                        return a + b.actualRepaymentAmount;
                    }, 0)
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('rrhcoins', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate, $ionicPopover) {
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                })
        }

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/withdraw.rrh', {})
                .then(function (data) {
                    appservice.warn(data.result, 5000, function () {
                        $state.reload();
                    })
                })
        }

        $scope.getlist = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/getCurrencyLog.rrh', {})
                .then(function (data) {
                    $scope.data = data.result;
                    showlist();
                }, function () {
                    showlist();
                })
        }

        function showlist() {
            $ionicPopover.fromTemplateUrl('templates/poprrhcoinslist/index.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
                $scope.popover.show();
            });

        }
        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
        $scope.getuser()
    })
angular.module('app')
    .controller('set', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.hastoken = localStorage.token;
        $scope.exit = function () {
            localStorage.removeItem('token');
            $ionicHistory.goBack(-1);
        }
        $scope.login = function () {
            appservice.login($scope);
        }
    })
angular.module('app')
    .controller('ticket', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {
        $scope.getdata = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/paging.rrh', {
                pageSize: 1000, pageNow: 1, status: $scope.s
            }).then(function (data) {
                $scope.data = data.list;
            }, function () {
                $scope.data = []
            })

        }

        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];

        $scope.s = 0;
        $scope.changes = function (s) {
            if ($scope.s != s) {
                $scope.s = s;
                $scope.getdata();
                $ionicScrollDelegate.scrollTop(true);
            }
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('tickethis', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/paging.rrh', {
                pageSize: 1000, pageNow: 1, status: $scope.s
            }).then(function (data) {
                $scope.data = data.list;
            }, function () {
                $scope.data = []
            })

        }
        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];
        $scope.s = 3;
        $scope.changes = function (s) {
            if ($scope.s != s) {
                $scope.s = s;
                $scope.getdata();
                $ionicScrollDelegate.scrollTop(true);
            }
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('transactionlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicPopover, $ionicScrollDelegate) {
        $scope.getdata = function (tp) {
            $scope.data = null;
            $scope.nullbg = false;
            $ionicScrollDelegate.scrollTop();
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/selectTranRec.rrh', {
                tranType: tp || "",
                pageNow: 1,
                pageSize: 200
            }).then(function (data) {
                $scope.thismonth = new Date().getFullYear() + "年" + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() + 1)) + "月");
                $scope.data = _.groupBy(data.list, 'monthAt')
                for (var i in $scope.data) {
                    $scope.data[i].total = _.reduce($scope.data[i], function (a, b) {
                        return a + b.changeMoney * b.logType;
                    }, 0)
                }
                if ($scope.popover) {
                    $scope.popover.hide();
                }
            }, function () {
                $scope.nullbg = true;
                if ($scope.popover) {
                    $scope.popover.hide();
                }
            })
        }
        $scope.getdata();

        $scope.sel = function (e) {
            var arr = [
                { tp: 1, name: '放款' },
                { tp: 2, name: '还款' },
                { tp: 3, name: '充值' },
                { tp: 4, name: '提现' }
            ]
            var html = arr.reduce(function (i, ii) {
                return i + '<div class="transactionlistpopdiv" ng-click="getdata(' + (ii.tp) + ')">' + ii.name + '</div>'
            }, '')
            var template = '<ion-popover-view class="transactionlistpop"<ion-content> ' + html + '</ion-content></ion-popover-view>';
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.popover.show(e);
        }

        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
    })
angular.module('app')
    .controller('usephone', function ($state) {
        if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            $state.go('home')
        }
    })
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
angular.module('app')
    .controller('withdraw', function ($scope, $rootScope, appservice, $ionicHistory, $state, $timeout) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        //$ionicHistory.goBack(-1);
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd')
                    })
                })
        }
        $scope.item = {
            num: ''
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    $scope.item.num = data.balanceMoney;
                })
        }

        $scope.getdata()

        // $scope.yzm = {
        //     data: '',
        //     getyzm: function () {
        // if ($scope.item.num > 0.01) {
        //     appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
        //         amount: ($scope.item.num).toFixed(2)
        //     }).then(function (data) {
        //         appservice.warn('短信验证码已发送', 1000);
        //     })
        // } else {
        //     appservice.warn('充值金额要大于1元', 1000);
        //     return
        // }
        //     }
        // }


        $scope.sub = function () {
            if ($scope.item.num > 1) {
                appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                    {
                    })
                    .then(function (data) {
                        if (data.result == '1') {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })

                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        } else {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })
                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        }
                    })


            } else {
                appservice.warn('提现金额要大于1元', 1000);
                return
            }
        }
    })