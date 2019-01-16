angular.module('app')
    .controller('autonymchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        document.getElementById('cardfile11').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.postidcardimgfront(file)
            }
        })
        document.getElementById('cardfile22').addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                $scope.postidcardimgback(file)
            }
        })

        $scope.postidcardimgfront = function (file) {
            $scope.checkfront = false;
            appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCardYiTu.rrh', file, {
                side: 'front'
            }).then(function (data) {
                $scope.checkfront = true;
                $scope.frontdata = data;
                $scope.showfrontcamera = false;
            }, function () {
                document.getElementById('cardfile11').value = ""
                $scope.checkfront = false;
                $scope.showfrontcamera = true;
                $scope.frontdata = null;
            })
        }
        $scope.postidcardimgback = function (file) {
            $scope.checkback = false;
            appservice.postimg($rootScope.GLOBAL.coreUrl + '/authorization/verifyIdCardYiTu.rrh', file, {
                side: 'back'
            }).then(function (data) {
                $scope.checkback = true;
                $scope.backdata = data;
                $scope.showbackcamera = false;
            }, function () {
                document.getElementById('cardfile22').value = ""
                $scope.checkback = false;
                $scope.showbackcamera = true;
                $scope.backdata = null;
            })
        }

        $scope.item = {
            name: '',
            id: ''
        }

        $scope.sub = function () {
            if ($scope.user && $scope.user.certification) {
                return
            }
            if (!$scope.item.name) {
                appservice.warn('请输入真实姓名', 1000);
                return
            }
            if (!$scope.item.id) {
                appservice.warn('请输入身份证号', 1000);
                return
            }
            if (!$scope.checkfront) {
                appservice.warn('请上传身份证正面照', 1000);
                return
            }
            if (!$scope.checkback) {
                appservice.warn('请上传身份证反面照', 1000);
                return
            }
            if ($scope.item.name != $scope.frontdata.realName || $scope.item.id != $scope.frontdata.idcardNum) {
                var _warn = '输入的个人信息和图片信息不一致,身份证照片信息识别如下:姓名:' + $scope.frontdata.realName + ',身份证号:' + $scope.frontdata.idcardNum + ',请检查输入或重拍身份证正面';
                appservice.warn(_warn, 3000);
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserIdcard.rrh', {
                real_name: $scope.frontdata.realName,
                idcard_num: $scope.frontdata.idcardNum,
                idcard_front_key: $scope.frontdata.img_url,
                idcard_back_key: $scope.backdata.img_url,
                idcard_hand_key: '',
                next_stage: 'rrh2.1channel',
            }).then(function (data) {
                window.GLOBAL.instep = true;
                appservice.warn('信息提交成功', 1000, function () {
                    $rootScope.GLOBAL.iframeurl = data.result;
                    $state.go('iframe')
                })
            })
        }


        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    $scope.getdata();
                })

        }

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/queryUserIdcard.rrh', {}, false).then(function (data) {
                $scope.item.name = data.realName;
                $scope.item.id = data.idcardNum;

                $scope.checkback = true;
                $scope.backdata = {
                    img_url: data.idcardBackKey,
                    realName: data.realName,
                    idcardNum: data.idcardNum
                };
                $scope.checkfront = true;
                $scope.frontdata = {
                    img_url: data.idcardKey,
                    realName: data.realName,
                    idcardNum: data.idcardNum
                };
            })
        }

        $scope.getuser();
    })