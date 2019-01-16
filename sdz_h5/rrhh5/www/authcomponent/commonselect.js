angular.module('apph5').directive('rrhcommonselect', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        scope: {
            binddata: '=binddata'
        },
        templateUrl: function () { return 'authcomponent/commonselect.html' },

        controller: function ($scope, $http, $timeout) {
            $scope.settings = {
                theme: 'ios',
                lang: 'zh',
                display: 'bottom',
                showLabel: true,
                width: 150,
                wheels: [
                    [
                        {
                            circular: false,
                            data: $scope.binddata.datas,
                            label: $scope.binddata.name,
                        }
                    ]
                ]
            };
        },
        link: function () {
            console.log(arguments);
        }
    }
});