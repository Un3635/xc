angular.module('apph5')
    .controller('infocollection', function ($scope, $rootScope, $ionicScrollDelegate) {
        $scope.data = {
            title: '工作信息',
            warn: '信息越完善，借款成功率越高',
            component: [
                {
                    component: 'select',
                    name: '工作地址', value: '', description: '请填写家庭地区', type: 'wordarea', datas: [
                        { id: 1, value: '上海' },
                        { id: 2, value: '北京' },
                        { id: 3, value: '广东' },
                        { id: 4, value: '内幕古' },
                        { id: 5, value: '宁夏' },
                    ],
                    sort: 1, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'input',
                    name: '年龄', value: '', description: '请填写年龄', type: 'parentsarea', datas: [],
                    sort: 3, require: false, warn: '该项不符合规则'
                },
                {
                    component: 'range',
                    name: '收入', value: '', description: '请填写年龄', type: 'moneyrange', datas: [],
                    sort: 3, require: false, warn: '该项不符合规则'
                },
                {
                    component: 'linkman',
                    name: '', phone: '', phonedescription: '请填写联系人', phonewarn: '提示', man: '', mandescription: '请填写联系人', manwarn: '另外个提示', type: 'linkman', datas: [],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'image',
                    name: '支付宝认证', value: '', image: 'img/adam.jpg', description: '支付宝认证描述', type: 'alipayimage', datas: [],
                    sort: 3, require: false, warn: ''
                }
                ,
                {
                    component: 'popup',
                    name: '性别', value: '', description: '请填写性别', type: 'sexpopup', datas: [
                        { id: 0, value: '男' },
                        { id: 1, value: '女' },
                        { id: 2, value: '男女' },
                        { id: 3, value: '未知' },
                    ],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'date',
                    name: '出生日期', description: '请填写日期', type: 'borndate', datas: [],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'time',
                    name: '出生时间', description: '请填写日期', type: 'borntime', datas: [],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'datetime',
                    name: '出生日期时间', description: '请填写日期', type: 'borndatetime', datas: [],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'imageselect',
                    name: '图片选择', value: '', description: '请填写日期', type: 'someimageselect', datas: [
                        { name: 'a1', img: 'img/adam.jpg', p: 'a1' },
                        { name: 'a2', img: 'img/adam.jpg', p: 'a2' },
                        { name: 'a3', img: 'img/adam.jpg', p: 'a3' },
                        { name: 'a4', img: 'img/adam.jpg', p: 'a4' },
                    ],
                    sort: 3, require: true, warn: '该项不符合规则'
                },
                {
                    component: 'commonselect',
                    name: '通用选择', description: '请填写日期', type: 'somecommonselect', datas: [
                        { display: 'a1', value: 'a11' },
                        { display: 'a2', value: 'a22' },
                        { display: 'a3', value: 'a33' },
                        { display: 'a4', value: 'a44' },
                        { display: 'a5', value: 'a55' },
                    ],
                    sort: 3, require: true, warn: '该项不符合规则'
                }

            ]
        }

        $scope.show = function () {
            console.log($scope.data);
        }
    })