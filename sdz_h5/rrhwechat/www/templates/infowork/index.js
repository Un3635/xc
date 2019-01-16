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