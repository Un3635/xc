angular.module('apph5')
    .controller('invitation', function ($scope, $stateParams, $rootScope, appservice, $interval) {
        $scope.companyname = '上海任我花网络科技有限公司'
        localStorage.token = $stateParams.token;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/inviteOrder.rrh', {}
            ).then(function (data) {
                $scope.data = data.list || [];
                $scope.invateCode = data.invateCode;
                $scope.earn = data.earn;
                $scope.size = data.size;
                startscroll();
                initWXSDK();
                if ($scope.wxjssdkconfig.inwx) {
                    $scope.wxjssdkconfig.init();
                }
            })
        }

        function initWXSDK() {
            $scope.wxjssdkconfig = {
                inwx: window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
                sharedata: {
                    imgUrl: 'http://oss.renrenhua.com/renrenhua/AppIcon/inviting-bonus.png',
                    title: '推荐你一款借款神器，最快5秒到账',
                    desc: '点击我分享的这条链接就能借，3000元现金秒到账，超好用',
                    link: GLOBAL.debug ? ('http://test.renrenhua.com/rrhinvitationreg/?recommend_id=' + $scope.invateCode) : ('http://app.renrenhua.com/rrhinvitationreg/?recommend_id=' + $scope.invateCode)
                },
                init: function () {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/getShareParam.rrh', {
                        url: encodeURIComponent(location.href.split('#')[0])
                    }
                    ).then(function (data) {
                        wx.config({
                            debug: false,
                            appId: data.appId,
                            timestamp: data.timestamp,
                            nonceStr: data.noncestr,
                            signature: data.signature,
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                        });
                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: $scope.wxjssdkconfig.sharedata.title,
                                link: $scope.wxjssdkconfig.sharedata.link,
                                imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                                success: function () {
                                    $scope.showpoint = false
                                },
                                cancel: function () {
                                    $scope.showpoint = false
                                }
                            });
                            wx.onMenuShareAppMessage({
                                desc: $scope.wxjssdkconfig.sharedata.desc, // 分享描述
                                title: $scope.wxjssdkconfig.sharedata.title,
                                link: $scope.wxjssdkconfig.sharedata.link,
                                imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                                type: 'link', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function () {
                                    $scope.showpoint = false
                                },
                                cancel: function () {
                                    $scope.showpoint = false
                                }
                            });
                            wx.onMenuShareQQ({
                                desc: $scope.wxjssdkconfig.sharedata.desc, // 分享描述
                                title: $scope.wxjssdkconfig.sharedata.title,
                                link: $scope.wxjssdkconfig.sharedata.link,
                                imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                                success: function () {
                                    $scope.showpoint = false
                                },
                                cancel: function () {
                                    $scope.showpoint = false
                                }
                            });

                            wx.onMenuShareWeibo({
                                desc: $scope.wxjssdkconfig.sharedata.desc, // 分享描述
                                title: $scope.wxjssdkconfig.sharedata.title,
                                link: $scope.wxjssdkconfig.sharedata.link,
                                imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                                success: function () {
                                    $scope.showpoint = false
                                },
                                cancel: function () {
                                    $scope.showpoint = false
                                }
                            });
                            wx.onMenuShareQZone({
                                desc: $scope.wxjssdkconfig.sharedata.desc, // 分享描述
                                title: $scope.wxjssdkconfig.sharedata.title,
                                link: $scope.wxjssdkconfig.sharedata.link,
                                imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                                success: function () {
                                    $scope.showpoint = false
                                },
                                cancel: function () {
                                    $scope.showpoint = false
                                }
                            });
                        });
                        wx.error(function (data) {
                            appservice.warn('发生了一点错误' + JSON.stringify(data))
                        });
                    })
                }
            }
        }

        $scope.tab = {
            active: -1,
            changeactive: function (s) {
                if (this.active != s) {
                    this.active = s;
                }
            }
        }

        $scope.showpoint = false
        $scope.changeshowpoint = function () {
            $scope.showpoint = !$scope.showpoint;
        }
        $scope.share = function () {
            if ($scope.wxjssdkconfig.inwx) {
                $scope.showpoint = true
            } else {
                rrh.call('share', {
                    title: $scope.wxjssdkconfig.sharedata.title,
                    link: $scope.wxjssdkconfig.sharedata.link,
                    imgUrl: $scope.wxjssdkconfig.sharedata.imgUrl,
                    desc: $scope.wxjssdkconfig.sharedata.desc
                }, function (result) {
                })
            }
        }

        function startscroll() {
            if ($scope.data.length > 8) {
                $scope.len = $scope.data.length;
                $scope.startindex = -1;
                $scope.top = 0;
                $interval(function () {
                    $scope.top -= 1;
                    $scope.data.push($scope.data[++$scope.startindex])
                    if ($scope.startindex == $scope.len - 1) {
                        $scope.startindex = -1
                    }
                }, 300)
            }
        }
        $scope.getdata();
    })
