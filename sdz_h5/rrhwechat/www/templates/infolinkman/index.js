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