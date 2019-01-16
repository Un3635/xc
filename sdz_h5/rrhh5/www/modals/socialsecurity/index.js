angular.module('apph5')
    .controller('socialsecurity', function ($scope, $rootScope, appservice) {
        $scope.shebaogjjflag1 = $scope.shebaogjjflag == 1 ? '社保' : '公积金'
        document.getElementsByTagName('title')[0].innerHTML = $scope.shebaogjjflag == 1 ? '社保认证' : '公积金认证'
        $scope.shebaodata = (function () {
            if ($scope.shebaogjjflag == 1) {
                return JSON.parse('[{"id":"0","name":"请选择社保地区"},{"id":"110000","name":"北京"},{"id":"210100","name":"沈阳"},{"id":"210200","name":"大连"},{"id":"320100","name":"南京"},{"id":"320200","name":"无锡"},{"id":"320508","name":"苏州园区"},{"id":"330100","name":"杭州"},{"id":"330200","name":"宁波"},{"id":"330300","name":"温州"},{"id":"330400","name":"嘉兴"},{"id":"330782","name":"义乌"},{"id":"350000","name":"福建省直"},{"id":"350100","name":"福州"},{"id":"350600","name":"漳州"},{"id":"350900","name":"宁德"},{"id":"370100","name":"济南"},{"id":"370300","name":"淄博"},{"id":"430700","name":"常德"},{"id":"440300","name":"深圳"},{"id":"440600","name":"佛山"},{"id":"441900","name":"东莞"},{"id":"442000","name":"中山"},{"id":"460100","name":"海口"},{"id":"510100","name":"成都"},{"id":"510700","name":"绵阳"},{"id":"320400","name":"常州"},{"id":"331002","name":"台州"},{"id":"440400","name":"珠海"},{"id":"441800","name":"清远"},{"id":"510500","name":"泸州"},{"id":"511500","name":"宜宾"},{"id":"371600","name":"滨州"},{"id":"120000","name":"天津"},{"id":"310000","name":"上海"},{"id":"320500","name":"苏州"},{"id":"330700","name":"金华"},{"id":"331082","name":"临海"},{"id":"350200","name":"厦门"},{"id":"370200","name":"青岛"},{"id":"440100","name":"广州"},{"id":"500000","name":"重庆"},{"id":"440700","name":"江门"},{"id":"340800","name":"安庆"},{"id":"341800","name":"宣城"},{"id":"341000","name":"黄山"},{"id":"340100","name":"合肥"},{"id":"341700","name":"池州"}]')
            } else {
                return JSON.parse('[{"id":"0","name":"请选择公积金地区"},{"id":"130000","name":"河北省直"},{"id":"150100","name":"呼和浩特"},{"id":"210200","name":"大连市"},{"id":"220000","name":"吉林省直"},{"id":"310000","name":"上海市"},{"id":"320100","name":"南京市"},{"id":"330200","name":"宁波市"},{"id":"340000","name":"安徽省直"},{"id":"340100","name":"合肥市"},{"id":"350000","name":"福建省直"},{"id":"360100","name":"南昌市"},{"id":"410300","name":"洛阳"},{"id":"440100","name":"广州"},{"id":"441200","name":"肇庆市"},{"id":"510100","name":"成都"},{"id":"520100","name":"贵阳"},{"id":"532900","name":"云南大理"},{"id":"130500","name":"邢台"},{"id":"130900","name":"沧州"},{"id":"140800","name":"运城"},{"id":"210400","name":"抚顺"},{"id":"211100","name":"盘锦"},{"id":"220100","name":"长春"},{"id":"220500","name":"通化"},{"id":"230600","name":"大庆"},{"id":"330000","name":"浙江省直"},{"id":"330100","name":"杭州"},{"id":"330122","name":"浙江桐庐"},{"id":"330211","name":"镇海"},{"id":"330226","name":"宁海"},{"id":"350300","name":"莆田"},{"id":"360900","name":"宜春"},{"id":"370400","name":"枣庄"},{"id":"410000","name":"河南"},{"id":"410100","name":"郑州"},{"id":"410622","name":"河南鹤壁"},{"id":"420800","name":"湖北荆门"},{"id":"420900","name":"湖北孝感"},{"id":"430000","name":"湖南省直"},{"id":"430200","name":"株洲"},{"id":"430500","name":"邵阳"},{"id":"510300","name":"自贡"},{"id":"510900","name":"遂宁"},{"id":"511100","name":"乐山"},{"id":"511300","name":"南充"},{"id":"450300","name":"桂林"},{"id":"450500","name":"广西北海"},{"id":"522400","name":"毕节"},{"id":"522800","name":"黔东南"},{"id":"530700","name":"云南丽江"},{"id":"610500","name":"渭南"},{"id":"611000","name":"陕西商洛"},{"id":"640100","name":"银川"},{"id":"320400","name":"常州"},{"id":"320500","name":"苏州"},{"id":"330700","name":"金华"},{"id":"440300","name":"深圳"},{"id":"331002","name":"台州"},{"id":"110000","name":"北京"},{"id":"440700","name":"江门"},{"id":"511500","name":"宜宾"},{"id":"320000","name":"江苏省直"},{"id":"620100","name":"兰州"},{"id":"421200","name":"咸宁"},{"id":"370300","name":"淄博"},{"id":"421200","name":"咸宁"},{"id":"371600","name":"山东滨州"},{"id":"460000","name":"海南省直"},{"id":"247100","name":"安徽池州"},{"id":"340500","name":"马鞍山"},{"id":"341300","name":"宿州"},{"id":"341800","name":"宣城"},{"id":"341200","name":"阜阳"},{"id":"340600","name":"淮北"},{"id":"340800","name":"安庆"},{"id":"340400","name":"淮南"},{"id":"341000","name":"黄山"},{"id":"341100","name":"滁州"},{"id":"341600","name":"毫州"},{"id":"340200","name":"芜湖"}]')
            }
        }())

        $scope.shebao = {
            init: function () {
                $scope.shebao.value = $scope.shebao.data[0];
            },
            data: $scope.shebaodata,
            change: function () {
                $scope.data.loginFields = [];
                $scope.data.activeloginFields = {};
                $scope.yzm.yzm2 = '';
                if ($scope.shebao.value.id == 0) {
                    return
                }
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorization/queryVerifyLoginInfo.rrh', { channel_type: $scope.shebaogjjflag == 1 ? 'SHE_BAO' : 'GJJ', channel_code: $scope.shebao.value.id })
                    .then(function (data) {
                        $scope.data.loginFields = data.loginFields;
                        $scope.data.loginFields[0].active = true;
                        $scope.data.activeloginFields = $scope.data.loginFields.filter(function (i) { return i.active == true })[0];
                        $scope.yzm.yzm2 = data.authCode;
                    })
            }
        }
        $scope.shebao.init();


        $scope.yzm = {
            yzm1: 'data:image/png;base64,',
            yzm2: '',
            value: '',
            get: function () {
                $scope.yzm.yzm2 = '';
                appservice.getdata($rootScope.GLOBAL.coreUrl + '/authorization/queryAuthCode.rrh', {})
                    .then(function (data) {
                        $scope.yzm.yzm2 = data.result;
                    })
            }
        }

        $scope.data = {
            user_name: '',
            user_pass: '',
            activeloginFields: '',
            loginFields: '',
            sub: function () {
                if (!$scope.yzm.value && $scope.data.activeloginFields.captcha == 'true') { appservice.warn('请填写验证码', 1000); return }
                $scope.data.user_name = document.getElementsByClassName('user_name')[0].value;
                $scope.data.user_pass = document.getElementsByClassName('user_pass')[0].value;
                if (!$scope.data.user_pass) {
                    appservice.warn('请填写用户密码', 1000); return
                }
                if (!$scope.data.user_name) {
                    appservice.warn('请填写用户名', 1000); return
                }
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorization/submitVerifyInfo.rrh',
                    {
                        user_name: $scope.data.user_name,
                        user_pass: $scope.data.user_pass,
                        auth_code: $scope.yzm.value,
                        login_type: $scope.data.activeloginFields.value
                    })
                    .then(function (data) {
                        if ($scope.shebaogjjflag == 1) {
                            window._vds.track("社保认证", { "SISubmitSuccess": 1 });
                        } else {
                            window._vds.track("公积金认证", { "accumulationFundSubmitSuccess": 1 });
                        }

                        appservice.warn(data.result, 1000, function () {
                            appservice.closejump(-1)
                        });
                    }, function () {
                        if ($scope.shebaogjjflag == 1) {
                            window._vds.track("社保认证", { "SISubmitSuccess": 0 });
                        } else {
                            window._vds.track("公积金认证", { "accumulationFundSubmitSuccess": 0 });
                        }
                    })
            },
            changeactive: function (i) {
                if (!i.active) {
                    $scope.data.activeloginFields.active = false;
                    i.active = true;
                    $scope.data.activeloginFields = $scope.data.loginFields.filter(function (i) { return i.active == true })[0];
                }
            }
        }
    })