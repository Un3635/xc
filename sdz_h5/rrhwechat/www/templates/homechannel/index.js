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
