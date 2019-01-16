angular.module('apph5').directive('rrhpopup', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/popup.html' },

        controller: function ($scope, $http, $timeout, $ionicActionSheet) {
            $scope.change = function () {
                var _bts = [];
                $scope.binddata.datas.forEach(function (i) {
                    _bts.push({ text: i.value })
                })
                var hideSheet = $ionicActionSheet.show({
                    buttons: _bts,
                    titleText: $scope.binddata.description,
                    cancelText: '取消',
                    cancel: function () {
                        $scope.binddata.dowarn = true;
                        $timeout(function () {
                            $scope.binddata.dowarn = false;
                        }, 1000)
                    },
                    buttonClicked: function (index) {
                        $scope.binddata.value = $scope.binddata.datas.filter(function (i) {
                            return i.id == index
                        })[0].value;
                        return true;
                    }
                });
            }
        },
        link: function () {

        }
    }
});