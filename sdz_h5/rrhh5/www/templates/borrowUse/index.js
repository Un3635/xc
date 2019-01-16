angular.module('apph5')
    .controller('borrowUse', function ($scope, $stateParams, $rootScope, appservice) {
        localStorage.token = $stateParams.token;
        $scope.checklist1 = [
            { name: '日常消费' },
            { name: '教育培训' },
            { name: '短期周转' },
        ]
        $scope.checklist2 = [
            { name: '旅游' },
            { name: '租房' },
            { name: '家装' },
            { name: '婚庆' }
        ]

        $scope.check = function (i) {
            $scope.checklist1.forEach(function (ii) {
                ii.check = false;
            })
            $scope.checklist2.forEach(function (iii) {
                iii.check = false;
            })
            i.check = !i.check;
            $scope.postdata.usage_type = i.name;
        }

        $scope.postdata = {
            company_name: '',
            usage_type: '',
            company_address: ''
        }

        $scope.post = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV3/updateUserWork.rrh', $scope.postdata
            ).then(function (data) {
                appservice.warn('提交成功', 2000, function () {
                    appservice.closejump(-1);
                })
            })
        }
    })