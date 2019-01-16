angular.module('app')
    .controller('my', function ($scope, $rootScope, appservice, $state) {
        $scope.gologin = function () {
            appservice.login($scope)
        }
        $scope.getuser = function () {
            $scope.user = null;
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                })
        }

        $scope.trgfile = function () {
            return document.getElementById('myfile1').click();
        }
        $scope.inwx = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
        $scope.wxinvitation = function () {
            if (localStorage.token) {
                var _href = '';
                if (GLOBAL.debug) {
                    _href = '//testm.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                } else {
                    _href = '//app.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                }
                window.location.href = _href;
            } else {
                appservice.login($scope)
            }
        }
        $scope.mygo = function (state) {
            appservice.goWithToken($scope, state)
        }

        $scope.mygo1 = function (state) {
            appservice.goWithAuth($scope, $scope.user, state)
        }
        $scope.mygo2 = function (state) {
            appservice.goWithAuth2($scope, $scope.user, state)
        }


        $scope.postidcardimgfront = function (file) {
            appservice.postimg($rootScope.GLOBAL.userUrl + '/upload/headPortrait.rrh', file).then(function (data) {
                $scope.user.headImg = data.result;
            }, function (data) {

            })
        }
        if (localStorage.token) {
            if ($rootScope.firstautonym) {
                $rootScope.firstautonym = false;
                $state.go('autonym')
            } else {
                $scope.getuser()
            }
        }
        document.getElementById('myfile1').addEventListener('change', function (e) {
            var file = e.target.files[0];
            $scope.postidcardimgfront(file)
        })
    })