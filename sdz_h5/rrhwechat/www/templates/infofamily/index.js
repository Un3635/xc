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