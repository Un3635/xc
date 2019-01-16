angular.module('app')
    .filter("hidemobile", function () {
        return function (input) {
            input += ""
            return input.substring(0, 3) + "****" + input.substring(7, 11)
        }
    })
    .filter("hidebankcard", function () {
        return function (input) {
            input += "";
            var star = ""
            for (var i = 0; i < input.length - 8; i++) {
                star += '*'
            }
            return input.substring(0, 4) + star + input.substring(input.length - 4, input.length)
        }
    })
    ///充值用的
    .directive('rrhmoney', function (appservice, $parse) {
        return {
            scope: {
                model: '=ngModel'
            },
            link: function (scope, element, attrs, ngModel) {
                element.bind('keyup', function (value) {
                    if (isNaN(scope.model)) {
                        scope.model = scope.model.substr(scope.model, scope.model.length - 1);
                        scope.$apply()
                    }
                });
            }
        }
    })