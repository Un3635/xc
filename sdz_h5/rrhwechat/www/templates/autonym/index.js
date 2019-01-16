angular.module('app')
    .controller('autonym', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.data = {}
        $scope.getdata = function () {
            $scope.data = {}
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/queryUserIdcard.rrh', {
                source: $stateParams.next ? 'newOrder' : ''
            }, false).then(function (data) {
                $scope.data = data;
                $scope.img.hascheck = true;
            }, function () {
                $scope.data = {}
            })
        }
        $scope.img = {
            post: function () {
                if (!$scope.data.realName) {
                    appservice.warn('请输入真实姓名', 1000);
                    return
                }
                if (!$scope.data.idcardNum) {
                    appservice.warn('请输入身份证号', 1000);
                    return
                }
                document.getElementById('cardfile1').click();
            },
            hascheck: false,
            data: {},
            check: function (file) {
                this.hascheck = false;
                this.data = {};
                var that = this;
                appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCard.rrh', file, {
                    side: 'front'
                }).then(function (data) {
                    that.hascheck = true;
                    that.data = data;
                    that.sub();
                }, function () {
                    document.getElementById('cardfile1').value = ""
                })
            },
            sub: function () {
                var that = this;
                appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserIdcard.rrh', {
                    real_name: $scope.data.realName,
                    idcard_num: $scope.data.idcardNum,
                    idcard_front_key: $scope.img.data.img_url,
                    idcard_back_key: '',
                    idcard_hand_key: '',
                    next_stage: $stateParams.next ? $stateParams.next : '-2',
                }).then(function (data) {
                    $scope.getdata();
                }, function () {
                    that.hascheck = false;
                    document.getElementById('cardfile1').value = ""
                    that.data = {}
                })
            }
        }
        $scope.zmop = function () {
            $rootScope.GLOBAL.iframeurl = $scope.data.zmopUrl;
            $state.go('iframe')
        }


        $scope.getdata();
        document.getElementById('cardfile1').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.img.check(file)
            }
        })
    })