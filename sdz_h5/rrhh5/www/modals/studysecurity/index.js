angular.module('apph5')
    .controller('studysecurity', function ($scope, $rootScope, appservice) {
        document.getElementsByTagName('title')[0].innerHTML = '学信网认证'
        $scope.studysecuritydata = {
            source_type: '',
            chsi_username: '',
            chsi_password: '',
            data_original: ''
        }
        $scope.studysecuritydatapost = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorization/setEducation.rrh', $scope.studysecuritydata)
                .then(function (data) {
                    window._vds.track("学信网认证", { "CHSISubmitSuccess": 1 });
                    appservice.warn(data.result, 1000, function () {
                        // window.location.href = 'js://com.renwohua.conch/closeWindow'
                        appservice.closejump(-1)
                    });
                }, function () {
                    window._vds.track("学信网认证", { "CHSISubmitSuccess": 0 });
                })
        }
        $scope.studysecuritydatasel = [
            { id: 1, name: '学信网密码' }
            // , { id: 2, name: '学信码' }
        ]

        $scope.studysecuritydataseled = $scope.studysecuritydatasel[0];
    })