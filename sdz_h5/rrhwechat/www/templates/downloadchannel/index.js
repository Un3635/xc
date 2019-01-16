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