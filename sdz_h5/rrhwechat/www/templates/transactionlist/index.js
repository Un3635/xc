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