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