angular.module('app', ['ionic', 'mobiscroll-datetime', 'mobiscroll-image', 'mobiscroll-scroller', 'ngclipboard'])
  .run(function ($rootScope, $ionicHistory, $state) {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
    ///渠道注册跳转过来的///
    if (GetQueryString('token') && location.href.indexOf('homechannel') >= 0) {
      localStorage.token = GetQueryString('token');
    }
    var GLOBAL = {
      userUrl: 'https://www.renrenhua.com/userapi',
      coreUrl: 'https://www.renrenhua.com/coreapi',
      payUrl: 'https://www.renrenhua.com/payapi',
      version: '2.3.0',
      client: 'web',
      iframeurl: "",
      lianlianiframeurl: '//app.renrenhua.com/wechat/lianlianiframe.html',//连连内嵌iframe
      lianliancb: '//app.renrenhua.com/wechat/lianliancb.html',//连连绑卡回调，
      lianliancb1: '//app.renrenhua.com/wechat/lianliancb.html'//连连充值回调
    };


    if (location.href.indexOf('test') >= 0) {
      GLOBAL.debug = true;
      GLOBAL.userUrl = '//testwww.renrenhua.com:8081';
      GLOBAL.coreUrl = '//testwww.renrenhua.com:8085';
      GLOBAL.payUrl = '//www.renrenhua.com/payapi';
      GLOBAL.lianlianiframeurl = '//testm.renrenhua.com/wechat/lianlianiframe.html';//连连内嵌iframe
      GLOBAL.lianliancb = '//testm.renrenhua.com/wechat/lianliancb.html'//连连绑卡回调
      GLOBAL.lianliancb1 = '//testm.renrenhua.com/wechat/lianliancb1.html'//连连充值回调
    }
    $rootScope.GLOBAL = GLOBAL;
    window.GLOBAL = GLOBAL;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if ($rootScope.loginmodal && $rootScope.loginmodal._isShown) {
        $rootScope.loginmodal.remove()
      }
      if ($rootScope.goWithAuthionicPopup) {
        $rootScope.goWithAuthionicPopup.close();
        $rootScope.goWithAuthionicPopup = undefined;
      }
      var mbscfr = document.getElementsByClassName('mbsc-fr');
      if (mbscfr.length > 0) {
        Array.prototype.forEach.call(mbscfr, function (div) {
          div.remove();
        });
      }
    })
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.swipeBackEnabled(false);
  })
angular.module('app')
    .factory('cityservice', function () {
        var cityjson = [
            {
                "t1name": "北京市",
                "t2": [
                    {
                        "t2name": "通州区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "房山区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "昌平区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "顺义区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "怀柔区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大兴区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "密云县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "平谷区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "延庆县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "东城区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "崇文区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "西城区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "朝阳区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "宣武区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "石景山",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "丰台区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "门头沟",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "海淀区",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "上海市",
                "t2": [
                    {
                        "t2name": "普陀区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "闸北区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "虹口区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "杨浦区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "卢湾区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "徐汇区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "长宁区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "静安区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "黄浦区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "金山区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "浦东新区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "嘉定区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "闵行区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "宝山区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南汇区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "青浦区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "松江区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "奉贤区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "崇明县",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "天津市",
                "t2": [
                    {
                        "t2name": "武清区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "河东区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "和平区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "西青区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "津南区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大港区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "东丽区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "塘沽区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "汉沽区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "河北区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "红桥区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "河西区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南开区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "蓟县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "宁河县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "静海县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "宝坻区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "北辰区",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "重庆市",
                "t2": [
                    {
                        "t2name": "开县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "江北区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "沙坪坝区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "九龙坡区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南岸区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "北碚区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "万盛区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "双桥区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "渝北区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "巴南区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "黔江区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "垫江县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "武隆县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "巫山县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "巫溪县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "云阳县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "奉节县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "忠县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "梁平县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "璧山区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "荣昌县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大足区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "铜梁区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "潼南县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "綦江区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "长寿区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "彭水苗族",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "酉阳县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "合川区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "江津区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南川区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "永川区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "丰都县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "城口县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大渡口区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "渝中区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "涪陵区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "万州区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "石柱县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "秀山县",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "浙江省",
                "t2": [
                    {
                        "t2name": "丽水市",
                        "t3": [
                            {
                                "t3name": "莲都区"
                            },
                            {
                                "t3name": "青田县"
                            },
                            {
                                "t3name": "缙云县"
                            },
                            {
                                "t3name": "龙泉市"
                            },
                            {
                                "t3name": "景宁畲族自治县"
                            },
                            {
                                "t3name": "庆元县"
                            },
                            {
                                "t3name": "云和县"
                            },
                            {
                                "t3name": "遂昌县"
                            },
                            {
                                "t3name": "松阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "舟山市",
                        "t3": [
                            {
                                "t3name": "普陀区"
                            },
                            {
                                "t3name": "定海区"
                            },
                            {
                                "t3name": "嵊泗县"
                            },
                            {
                                "t3name": "岱山县"
                            }
                        ]
                    },
                    {
                        "t2name": "宁波市",
                        "t3": [
                            {
                                "t3name": "鄞州区"
                            },
                            {
                                "t3name": "象山县"
                            },
                            {
                                "t3name": "北仑区"
                            },
                            {
                                "t3name": "镇海区"
                            },
                            {
                                "t3name": "慈溪市"
                            },
                            {
                                "t3name": "奉化市"
                            },
                            {
                                "t3name": "宁海县"
                            },
                            {
                                "t3name": "海曙区"
                            },
                            {
                                "t3name": "江东区"
                            },
                            {
                                "t3name": "江北区"
                            },
                            {
                                "t3name": "余姚市"
                            }
                        ]
                    },
                    {
                        "t2name": "衢州市",
                        "t3": [
                            {
                                "t3name": "常山县"
                            },
                            {
                                "t3name": "开化县"
                            },
                            {
                                "t3name": "柯城区"
                            },
                            {
                                "t3name": "衢江区"
                            },
                            {
                                "t3name": "江山市"
                            },
                            {
                                "t3name": "龙游县"
                            }
                        ]
                    },
                    {
                        "t2name": "温州市",
                        "t3": [
                            {
                                "t3name": "鹿城区"
                            },
                            {
                                "t3name": "龙湾区"
                            },
                            {
                                "t3name": "乐清市"
                            },
                            {
                                "t3name": "文成县"
                            },
                            {
                                "t3name": "苍南县"
                            },
                            {
                                "t3name": "瑞安市"
                            },
                            {
                                "t3name": "泰顺县"
                            },
                            {
                                "t3name": "洞头县"
                            },
                            {
                                "t3name": "瓯海区"
                            },
                            {
                                "t3name": "平阳县"
                            },
                            {
                                "t3name": "永嘉县"
                            }
                        ]
                    },
                    {
                        "t2name": "杭州市",
                        "t3": [
                            {
                                "t3name": "萧山区"
                            },
                            {
                                "t3name": "余杭区"
                            },
                            {
                                "t3name": "桐庐县"
                            },
                            {
                                "t3name": "淳安县"
                            },
                            {
                                "t3name": "拱墅区"
                            },
                            {
                                "t3name": "江干区"
                            },
                            {
                                "t3name": "下城区"
                            },
                            {
                                "t3name": "上城区"
                            },
                            {
                                "t3name": "临安市"
                            },
                            {
                                "t3name": "滨江区"
                            },
                            {
                                "t3name": "西湖区"
                            },
                            {
                                "t3name": "建德市"
                            },
                            {
                                "t3name": "富阳市"
                            }
                        ]
                    },
                    {
                        "t2name": "台州市",
                        "t3": [
                            {
                                "t3name": "玉环县"
                            },
                            {
                                "t3name": "路桥区"
                            },
                            {
                                "t3name": "三门县"
                            },
                            {
                                "t3name": "天台县"
                            },
                            {
                                "t3name": "仙居县"
                            },
                            {
                                "t3name": "温岭市"
                            },
                            {
                                "t3name": "黄岩区"
                            },
                            {
                                "t3name": "椒江区"
                            },
                            {
                                "t3name": "临海市"
                            }
                        ]
                    },
                    {
                        "t2name": "嘉兴市",
                        "t3": [
                            {
                                "t3name": "秀城区"
                            },
                            {
                                "t3name": "秀洲区"
                            },
                            {
                                "t3name": "嘉善县"
                            },
                            {
                                "t3name": "海盐县"
                            },
                            {
                                "t3name": "海宁市"
                            },
                            {
                                "t3name": "平湖市"
                            },
                            {
                                "t3name": "桐乡市"
                            }
                        ]
                    },
                    {
                        "t2name": "绍兴市",
                        "t3": [
                            {
                                "t3name": "新昌县"
                            },
                            {
                                "t3name": "绍兴县"
                            },
                            {
                                "t3name": "越城区"
                            },
                            {
                                "t3name": "嵊州市"
                            },
                            {
                                "t3name": "上虞市"
                            },
                            {
                                "t3name": "诸暨市"
                            }
                        ]
                    },
                    {
                        "t2name": "金华市",
                        "t3": [
                            {
                                "t3name": "东阳市"
                            },
                            {
                                "t3name": "永康市"
                            },
                            {
                                "t3name": "兰溪市"
                            },
                            {
                                "t3name": "义乌市"
                            },
                            {
                                "t3name": "浦江县"
                            },
                            {
                                "t3name": "磐安县"
                            },
                            {
                                "t3name": "武义县"
                            },
                            {
                                "t3name": "金东区"
                            },
                            {
                                "t3name": "婺城区"
                            }
                        ]
                    },
                    {
                        "t2name": "湖州市",
                        "t3": [
                            {
                                "t3name": "德清县"
                            },
                            {
                                "t3name": "长兴县"
                            },
                            {
                                "t3name": "安吉县"
                            },
                            {
                                "t3name": "吴兴区"
                            },
                            {
                                "t3name": "南浔区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "广东省",
                "t2": [
                    {
                        "t2name": "珠海市",
                        "t3": [
                            {
                                "t3name": "香洲区"
                            },
                            {
                                "t3name": "斗门区"
                            },
                            {
                                "t3name": "金湾区"
                            }
                        ]
                    },
                    {
                        "t2name": "惠州市",
                        "t3": [
                            {
                                "t3name": "博罗县"
                            },
                            {
                                "t3name": "惠城区"
                            },
                            {
                                "t3name": "龙门县"
                            },
                            {
                                "t3name": "惠东县"
                            },
                            {
                                "t3name": "惠阳区"
                            }
                        ]
                    },
                    {
                        "t2name": "清远市",
                        "t3": [
                            {
                                "t3name": "连山壮族瑶族自治县"
                            },
                            {
                                "t3name": "阳山县"
                            },
                            {
                                "t3name": "佛冈县"
                            },
                            {
                                "t3name": "清城区"
                            },
                            {
                                "t3name": "连南瑶族自治县"
                            },
                            {
                                "t3name": "清新县"
                            },
                            {
                                "t3name": "英德市"
                            },
                            {
                                "t3name": "连州市"
                            }
                        ]
                    },
                    {
                        "t2name": "韶关市",
                        "t3": [
                            {
                                "t3name": "南雄市"
                            },
                            {
                                "t3name": "乐昌市"
                            },
                            {
                                "t3name": "浈江区"
                            },
                            {
                                "t3name": "武江区"
                            },
                            {
                                "t3name": "翁源县"
                            },
                            {
                                "t3name": "仁化县"
                            },
                            {
                                "t3name": "始兴县"
                            },
                            {
                                "t3name": "曲江区"
                            },
                            {
                                "t3name": "新丰县"
                            },
                            {
                                "t3name": "乳源瑶族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "江门市",
                        "t3": [
                            {
                                "t3name": "台山市"
                            },
                            {
                                "t3name": "开平市"
                            },
                            {
                                "t3name": "江海区"
                            },
                            {
                                "t3name": "新会区"
                            },
                            {
                                "t3name": "蓬江区"
                            },
                            {
                                "t3name": "鹤山市"
                            },
                            {
                                "t3name": "恩平市"
                            }
                        ]
                    },
                    {
                        "t2name": "揭阳市",
                        "t3": [
                            {
                                "t3name": "普宁市"
                            },
                            {
                                "t3name": "惠来县"
                            },
                            {
                                "t3name": "榕城区"
                            },
                            {
                                "t3name": "揭东县"
                            },
                            {
                                "t3name": "揭西县"
                            }
                        ]
                    },
                    {
                        "t2name": "云浮市",
                        "t3": [
                            {
                                "t3name": "郁南县"
                            },
                            {
                                "t3name": "云安县"
                            },
                            {
                                "t3name": "云城区"
                            },
                            {
                                "t3name": "新兴县"
                            },
                            {
                                "t3name": "罗定市"
                            }
                        ]
                    },
                    {
                        "t2name": "佛山市",
                        "t3": [
                            {
                                "t3name": "南海区"
                            },
                            {
                                "t3name": "禅城区"
                            },
                            {
                                "t3name": "三水区"
                            },
                            {
                                "t3name": "顺德区"
                            },
                            {
                                "t3name": "高明区"
                            }
                        ]
                    },
                    {
                        "t2name": "广州市",
                        "t3": [
                            {
                                "t3name": "海珠区"
                            },
                            {
                                "t3name": "天河区"
                            },
                            {
                                "t3name": "花都区"
                            },
                            {
                                "t3name": "番禺区"
                            },
                            {
                                "t3name": "黄埔区"
                            },
                            {
                                "t3name": "白云区"
                            },
                            {
                                "t3name": "从化市"
                            },
                            {
                                "t3name": "增城市"
                            },
                            {
                                "t3name": "荔湾区"
                            },
                            {
                                "t3name": "越秀区"
                            },
                            {
                                "t3name": "萝岗区"
                            },
                            {
                                "t3name": "南沙区"
                            }
                        ]
                    },
                    {
                        "t2name": "深圳市",
                        "t3": [
                            {
                                "t3name": "南山区"
                            },
                            {
                                "t3name": "宝安区"
                            },
                            {
                                "t3name": "龙岗区"
                            },
                            {
                                "t3name": "盐田区"
                            },
                            {
                                "t3name": "福田区"
                            },
                            {
                                "t3name": "罗湖区"
                            }
                        ]
                    },
                    {
                        "t2name": "河源市",
                        "t3": [
                            {
                                "t3name": "源城区"
                            },
                            {
                                "t3name": "紫金县"
                            },
                            {
                                "t3name": "龙川县"
                            },
                            {
                                "t3name": "连平县"
                            },
                            {
                                "t3name": "东源县"
                            },
                            {
                                "t3name": "和平县"
                            }
                        ]
                    },
                    {
                        "t2name": "汕头市",
                        "t3": [
                            {
                                "t3name": "龙湖区"
                            },
                            {
                                "t3name": "潮阳区"
                            },
                            {
                                "t3name": "金平区"
                            },
                            {
                                "t3name": "潮南区"
                            },
                            {
                                "t3name": "濠江区"
                            },
                            {
                                "t3name": "南澳县"
                            },
                            {
                                "t3name": "澄海区"
                            }
                        ]
                    },
                    {
                        "t2name": "汕尾市",
                        "t3": [
                            {
                                "t3name": "陆河县"
                            },
                            {
                                "t3name": "陆丰市"
                            },
                            {
                                "t3name": "城区"
                            },
                            {
                                "t3name": "海丰县"
                            }
                        ]
                    },
                    {
                        "t2name": "茂名市",
                        "t3": [
                            {
                                "t3name": "化州市"
                            },
                            {
                                "t3name": "高州市"
                            },
                            {
                                "t3name": "信宜市"
                            },
                            {
                                "t3name": "电白县"
                            },
                            {
                                "t3name": "茂港区"
                            },
                            {
                                "t3name": "茂南区"
                            }
                        ]
                    },
                    {
                        "t2name": "肇庆市",
                        "t3": [
                            {
                                "t3name": "四会市"
                            },
                            {
                                "t3name": "端州区"
                            },
                            {
                                "t3name": "鼎湖区"
                            },
                            {
                                "t3name": "广宁县"
                            },
                            {
                                "t3name": "怀集县"
                            },
                            {
                                "t3name": "封开县"
                            },
                            {
                                "t3name": "德庆县"
                            },
                            {
                                "t3name": "高要市"
                            }
                        ]
                    },
                    {
                        "t2name": "东莞市",
                        "t3": [
                            {
                                "t3name": "厚街"
                            },
                            {
                                "t3name": "樟木头"
                            },
                            {
                                "t3name": "石龙"
                            },
                            {
                                "t3name": "长安"
                            },
                            {
                                "t3name": "虎门"
                            }
                        ]
                    },
                    {
                        "t2name": "湛江市",
                        "t3": [
                            {
                                "t3name": "遂溪县"
                            },
                            {
                                "t3name": "赤坎区"
                            },
                            {
                                "t3name": "霞山区"
                            },
                            {
                                "t3name": "雷州市"
                            },
                            {
                                "t3name": "廉江市"
                            },
                            {
                                "t3name": "徐闻县"
                            },
                            {
                                "t3name": "麻章区"
                            },
                            {
                                "t3name": "吴川市"
                            },
                            {
                                "t3name": "坡头区"
                            }
                        ]
                    },
                    {
                        "t2name": "潮州市",
                        "t3": [
                            {
                                "t3name": "湘桥区"
                            },
                            {
                                "t3name": "潮安县"
                            },
                            {
                                "t3name": "饶平县"
                            }
                        ]
                    },
                    {
                        "t2name": "阳江市",
                        "t3": [
                            {
                                "t3name": "阳春市"
                            },
                            {
                                "t3name": "阳东县"
                            },
                            {
                                "t3name": "阳西县"
                            },
                            {
                                "t3name": "江城区"
                            }
                        ]
                    },
                    {
                        "t2name": "中山市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "梅州市",
                        "t3": [
                            {
                                "t3name": "蕉岭县"
                            },
                            {
                                "t3name": "兴宁市"
                            },
                            {
                                "t3name": "梅县"
                            },
                            {
                                "t3name": "梅江区"
                            },
                            {
                                "t3name": "丰顺县"
                            },
                            {
                                "t3name": "大埔县"
                            },
                            {
                                "t3name": "平远县"
                            },
                            {
                                "t3name": "五华县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "江苏省",
                "t2": [
                    {
                        "t2name": "连云港",
                        "t3": [
                            {
                                "t3name": "连云区"
                            },
                            {
                                "t3name": "新浦区"
                            },
                            {
                                "t3name": "灌云县"
                            },
                            {
                                "t3name": "东海县"
                            },
                            {
                                "t3name": "海州区"
                            },
                            {
                                "t3name": "赣榆县"
                            },
                            {
                                "t3name": "灌南县"
                            }
                        ]
                    },
                    {
                        "t2name": "盐城市",
                        "t3": [
                            {
                                "t3name": "滨海县"
                            },
                            {
                                "t3name": "阜宁县"
                            },
                            {
                                "t3name": "射阳县"
                            },
                            {
                                "t3name": "建湖县"
                            },
                            {
                                "t3name": "亭湖区"
                            },
                            {
                                "t3name": "盐都区"
                            },
                            {
                                "t3name": "响水县"
                            },
                            {
                                "t3name": "东台市"
                            },
                            {
                                "t3name": "大丰市"
                            }
                        ]
                    },
                    {
                        "t2name": "无锡市",
                        "t3": [
                            {
                                "t3name": "江阴市"
                            },
                            {
                                "t3name": "滨湖区"
                            },
                            {
                                "t3name": "惠山区"
                            },
                            {
                                "t3name": "锡山区"
                            },
                            {
                                "t3name": "北塘区"
                            },
                            {
                                "t3name": "南长区"
                            },
                            {
                                "t3name": "崇安区"
                            },
                            {
                                "t3name": "宜兴市"
                            }
                        ]
                    },
                    {
                        "t2name": "宿迁市",
                        "t3": [
                            {
                                "t3name": "泗洪县"
                            },
                            {
                                "t3name": "泗阳县"
                            },
                            {
                                "t3name": "沭阳县"
                            },
                            {
                                "t3name": "宿豫区"
                            },
                            {
                                "t3name": "宿城区"
                            }
                        ]
                    },
                    {
                        "t2name": "扬州市",
                        "t3": [
                            {
                                "t3name": "邗江区"
                            },
                            {
                                "t3name": "广陵区"
                            },
                            {
                                "t3name": "宝应县"
                            },
                            {
                                "t3name": "维扬区"
                            },
                            {
                                "t3name": "高邮市"
                            },
                            {
                                "t3name": "仪征市"
                            },
                            {
                                "t3name": "江都市"
                            }
                        ]
                    },
                    {
                        "t2name": "镇江市",
                        "t3": [
                            {
                                "t3name": "丹徒区"
                            },
                            {
                                "t3name": "润州区"
                            },
                            {
                                "t3name": "句容市"
                            },
                            {
                                "t3name": "丹阳市"
                            },
                            {
                                "t3name": "扬中市"
                            },
                            {
                                "t3name": "京口区"
                            }
                        ]
                    },
                    {
                        "t2name": "南京市",
                        "t3": [
                            {
                                "t3name": "浦口区"
                            },
                            {
                                "t3name": "栖霞区"
                            },
                            {
                                "t3name": "雨花台区"
                            },
                            {
                                "t3name": "江宁区"
                            },
                            {
                                "t3name": "秦淮区"
                            },
                            {
                                "t3name": "建邺区"
                            },
                            {
                                "t3name": "鼓楼区"
                            },
                            {
                                "t3name": "下关区"
                            },
                            {
                                "t3name": "六合区"
                            },
                            {
                                "t3name": "高淳县"
                            },
                            {
                                "t3name": "白下区"
                            },
                            {
                                "t3name": "玄武区"
                            },
                            {
                                "t3name": "溧水县"
                            }
                        ]
                    },
                    {
                        "t2name": "徐州市",
                        "t3": [
                            {
                                "t3name": "鼓楼区"
                            },
                            {
                                "t3name": "邳州市"
                            },
                            {
                                "t3name": "新沂市"
                            },
                            {
                                "t3name": "泉山区"
                            },
                            {
                                "t3name": "贾汪区"
                            },
                            {
                                "t3name": "九里区"
                            },
                            {
                                "t3name": "云龙区"
                            },
                            {
                                "t3name": "睢宁县"
                            },
                            {
                                "t3name": "铜山县"
                            },
                            {
                                "t3name": "沛县"
                            },
                            {
                                "t3name": "丰县"
                            }
                        ]
                    },
                    {
                        "t2name": "泰州市",
                        "t3": [
                            {
                                "t3name": "姜堰市"
                            },
                            {
                                "t3name": "靖江市"
                            },
                            {
                                "t3name": "泰兴市"
                            },
                            {
                                "t3name": "高港区"
                            },
                            {
                                "t3name": "兴化市"
                            },
                            {
                                "t3name": "海陵区"
                            }
                        ]
                    },
                    {
                        "t2name": "南通市",
                        "t3": [
                            {
                                "t3name": "启东市"
                            },
                            {
                                "t3name": "如皋市"
                            },
                            {
                                "t3name": "海安县"
                            },
                            {
                                "t3name": "如东县"
                            },
                            {
                                "t3name": "通州市"
                            },
                            {
                                "t3name": "海门市"
                            },
                            {
                                "t3name": "港闸区"
                            },
                            {
                                "t3name": "崇川区"
                            }
                        ]
                    },
                    {
                        "t2name": "常州市",
                        "t3": [
                            {
                                "t3name": "天宁区"
                            },
                            {
                                "t3name": "钟楼区"
                            },
                            {
                                "t3name": "戚墅堰区"
                            },
                            {
                                "t3name": "新北区"
                            },
                            {
                                "t3name": "武进区"
                            },
                            {
                                "t3name": "溧阳市"
                            },
                            {
                                "t3name": "金坛市"
                            }
                        ]
                    },
                    {
                        "t2name": "淮安市",
                        "t3": [
                            {
                                "t3name": "涟水县"
                            },
                            {
                                "t3name": "清浦区"
                            },
                            {
                                "t3name": "淮阴区"
                            },
                            {
                                "t3name": "楚州区"
                            },
                            {
                                "t3name": "清河区"
                            },
                            {
                                "t3name": "盱眙县"
                            },
                            {
                                "t3name": "洪泽县"
                            },
                            {
                                "t3name": "金湖县"
                            }
                        ]
                    },
                    {
                        "t2name": "苏州市",
                        "t3": [
                            {
                                "t3name": "吴江市"
                            },
                            {
                                "t3name": "平江区"
                            },
                            {
                                "t3name": "金阊区"
                            },
                            {
                                "t3name": "昆山市"
                            },
                            {
                                "t3name": "张家港市"
                            },
                            {
                                "t3name": "太仓市"
                            },
                            {
                                "t3name": "沧浪区"
                            },
                            {
                                "t3name": "吴中区"
                            },
                            {
                                "t3name": "虎丘区"
                            },
                            {
                                "t3name": "常熟市"
                            },
                            {
                                "t3name": "相城区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "山东省",
                "t2": [
                    {
                        "t2name": "淄博市",
                        "t3": [
                            {
                                "t3name": "淄川区"
                            },
                            {
                                "t3name": "博山区"
                            },
                            {
                                "t3name": "张店区"
                            },
                            {
                                "t3name": "周村区"
                            },
                            {
                                "t3name": "临淄区"
                            },
                            {
                                "t3name": "沂源县"
                            },
                            {
                                "t3name": "桓台县"
                            },
                            {
                                "t3name": "高青县"
                            }
                        ]
                    },
                    {
                        "t2name": "烟台市",
                        "t3": [
                            {
                                "t3name": "芝罘区"
                            },
                            {
                                "t3name": "福山区"
                            },
                            {
                                "t3name": "牟平区"
                            },
                            {
                                "t3name": "莱山区"
                            },
                            {
                                "t3name": "招远市"
                            },
                            {
                                "t3name": "蓬莱市"
                            },
                            {
                                "t3name": "莱州市"
                            },
                            {
                                "t3name": "莱阳市"
                            },
                            {
                                "t3name": "海阳市"
                            },
                            {
                                "t3name": "长岛县"
                            },
                            {
                                "t3name": "龙口市"
                            },
                            {
                                "t3name": "栖霞市"
                            }
                        ]
                    },
                    {
                        "t2name": "日照市",
                        "t3": [
                            {
                                "t3name": "莒县"
                            },
                            {
                                "t3name": "五莲县"
                            },
                            {
                                "t3name": "岚山区"
                            },
                            {
                                "t3name": "东港区"
                            }
                        ]
                    },
                    {
                        "t2name": "荷泽市",
                        "t3": [
                            {
                                "t3name": "鄄城县"
                            },
                            {
                                "t3name": "东明县"
                            },
                            {
                                "t3name": "郓城县"
                            },
                            {
                                "t3name": "巨野县"
                            },
                            {
                                "t3name": "成武县"
                            },
                            {
                                "t3name": "单县"
                            },
                            {
                                "t3name": "曹县"
                            },
                            {
                                "t3name": "牡丹区"
                            },
                            {
                                "t3name": "定陶县"
                            }
                        ]
                    },
                    {
                        "t2name": "潍坊市",
                        "t3": [
                            {
                                "t3name": "寒亭区"
                            },
                            {
                                "t3name": "潍城区"
                            },
                            {
                                "t3name": "临朐县"
                            },
                            {
                                "t3name": "昌乐县"
                            },
                            {
                                "t3name": "高密市"
                            },
                            {
                                "t3name": "昌邑市"
                            },
                            {
                                "t3name": "寿光市"
                            },
                            {
                                "t3name": "诸城市"
                            },
                            {
                                "t3name": "安丘市"
                            },
                            {
                                "t3name": "奎文区"
                            },
                            {
                                "t3name": "坊子区"
                            },
                            {
                                "t3name": "青州市"
                            }
                        ]
                    },
                    {
                        "t2name": "济南市",
                        "t3": [
                            {
                                "t3name": "平阴县"
                            },
                            {
                                "t3name": "长清区"
                            },
                            {
                                "t3name": "历下区"
                            },
                            {
                                "t3name": "商河县"
                            },
                            {
                                "t3name": "章丘市"
                            },
                            {
                                "t3name": "历城区"
                            },
                            {
                                "t3name": "天桥区"
                            },
                            {
                                "t3name": "槐荫区"
                            },
                            {
                                "t3name": "市中区"
                            },
                            {
                                "t3name": "济阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "济宁市",
                        "t3": [
                            {
                                "t3name": "梁山县"
                            },
                            {
                                "t3name": "邹城市"
                            },
                            {
                                "t3name": "兖州市"
                            },
                            {
                                "t3name": "泗水县"
                            },
                            {
                                "t3name": "汶上县"
                            },
                            {
                                "t3name": "市中区"
                            },
                            {
                                "t3name": "任城区"
                            },
                            {
                                "t3name": "鱼台县"
                            },
                            {
                                "t3name": "微山县"
                            },
                            {
                                "t3name": "嘉祥县"
                            },
                            {
                                "t3name": "金乡县"
                            },
                            {
                                "t3name": "曲阜市"
                            }
                        ]
                    },
                    {
                        "t2name": "青岛市",
                        "t3": [
                            {
                                "t3name": "李沧区"
                            },
                            {
                                "t3name": "城阳区"
                            },
                            {
                                "t3name": "即墨市"
                            },
                            {
                                "t3name": "胶州市"
                            },
                            {
                                "t3name": "胶南市"
                            },
                            {
                                "t3name": "平度市"
                            },
                            {
                                "t3name": "市南区"
                            },
                            {
                                "t3name": "市北区"
                            },
                            {
                                "t3name": "四方区"
                            },
                            {
                                "t3name": "黄岛区"
                            },
                            {
                                "t3name": "崂山区"
                            },
                            {
                                "t3name": "莱西市"
                            }
                        ]
                    },
                    {
                        "t2name": "临沂市",
                        "t3": [
                            {
                                "t3name": "沂南县"
                            },
                            {
                                "t3name": "河东区"
                            },
                            {
                                "t3name": "罗庄区"
                            },
                            {
                                "t3name": "兰山区"
                            },
                            {
                                "t3name": "蒙阴县"
                            },
                            {
                                "t3name": "临沭县"
                            },
                            {
                                "t3name": "平邑县"
                            },
                            {
                                "t3name": "莒南县"
                            },
                            {
                                "t3name": "苍山县"
                            },
                            {
                                "t3name": "费县"
                            },
                            {
                                "t3name": "郯城县"
                            },
                            {
                                "t3name": "沂水县"
                            }
                        ]
                    },
                    {
                        "t2name": "威海市",
                        "t3": [
                            {
                                "t3name": "荣成市"
                            },
                            {
                                "t3name": "乳山市"
                            },
                            {
                                "t3name": "环翠区"
                            },
                            {
                                "t3name": "文登市"
                            }
                        ]
                    },
                    {
                        "t2name": "莱芜市",
                        "t3": [
                            {
                                "t3name": "钢城区"
                            },
                            {
                                "t3name": "莱城区"
                            }
                        ]
                    },
                    {
                        "t2name": "泰安市",
                        "t3": [
                            {
                                "t3name": "泰山区"
                            },
                            {
                                "t3name": "岱岳区"
                            },
                            {
                                "t3name": "宁阳县"
                            },
                            {
                                "t3name": "东平县"
                            },
                            {
                                "t3name": "新泰市"
                            },
                            {
                                "t3name": "肥城市"
                            }
                        ]
                    },
                    {
                        "t2name": "东营市",
                        "t3": [
                            {
                                "t3name": "东营区"
                            },
                            {
                                "t3name": "河口区"
                            },
                            {
                                "t3name": "垦利县"
                            },
                            {
                                "t3name": "利津县"
                            },
                            {
                                "t3name": "广饶县"
                            }
                        ]
                    },
                    {
                        "t2name": "聊城市",
                        "t3": [
                            {
                                "t3name": "冠县"
                            },
                            {
                                "t3name": "东昌府区"
                            },
                            {
                                "t3name": "高唐县"
                            },
                            {
                                "t3name": "临清市"
                            },
                            {
                                "t3name": "阳谷县"
                            },
                            {
                                "t3name": "莘县"
                            },
                            {
                                "t3name": "茌平县"
                            },
                            {
                                "t3name": "东阿县"
                            }
                        ]
                    },
                    {
                        "t2name": "枣庄市",
                        "t3": [
                            {
                                "t3name": "滕州市"
                            },
                            {
                                "t3name": "市中区"
                            },
                            {
                                "t3name": "台儿庄区"
                            },
                            {
                                "t3name": "山亭区"
                            },
                            {
                                "t3name": "薛城区"
                            },
                            {
                                "t3name": "峄城区"
                            }
                        ]
                    },
                    {
                        "t2name": "滨州市",
                        "t3": [
                            {
                                "t3name": "惠民县"
                            },
                            {
                                "t3name": "阳信县"
                            },
                            {
                                "t3name": "滨城区"
                            },
                            {
                                "t3name": "邹平县"
                            },
                            {
                                "t3name": "博兴县"
                            },
                            {
                                "t3name": "沾化县"
                            },
                            {
                                "t3name": "无棣县"
                            }
                        ]
                    },
                    {
                        "t2name": "德州市",
                        "t3": [
                            {
                                "t3name": "庆云县"
                            },
                            {
                                "t3name": "宁津县"
                            },
                            {
                                "t3name": "齐河县"
                            },
                            {
                                "t3name": "临邑县"
                            },
                            {
                                "t3name": "夏津县"
                            },
                            {
                                "t3name": "平原县"
                            },
                            {
                                "t3name": "乐陵市"
                            },
                            {
                                "t3name": "武城县"
                            },
                            {
                                "t3name": "禹城市"
                            },
                            {
                                "t3name": "德城区"
                            },
                            {
                                "t3name": "陵县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "福建省",
                "t2": [
                    {
                        "t2name": "南平市",
                        "t3": [
                            {
                                "t3name": "松溪县"
                            },
                            {
                                "t3name": "政和县"
                            },
                            {
                                "t3name": "顺昌县"
                            },
                            {
                                "t3name": "光泽县"
                            },
                            {
                                "t3name": "建瓯市"
                            },
                            {
                                "t3name": "建阳市"
                            },
                            {
                                "t3name": "邵武市"
                            },
                            {
                                "t3name": "武夷山市"
                            },
                            {
                                "t3name": "浦城县"
                            },
                            {
                                "t3name": "延平区"
                            }
                        ]
                    },
                    {
                        "t2name": "厦门市",
                        "t3": [
                            {
                                "t3name": "湖里区"
                            },
                            {
                                "t3name": "集美区"
                            },
                            {
                                "t3name": "同安区"
                            },
                            {
                                "t3name": "翔安区"
                            },
                            {
                                "t3name": "思明区"
                            },
                            {
                                "t3name": "海沧区"
                            }
                        ]
                    },
                    {
                        "t2name": "福州市",
                        "t3": [
                            {
                                "t3name": "闽清县"
                            },
                            {
                                "t3name": "罗源县"
                            },
                            {
                                "t3name": "连江县"
                            },
                            {
                                "t3name": "闽侯县"
                            },
                            {
                                "t3name": "晋安区"
                            },
                            {
                                "t3name": "马尾区"
                            },
                            {
                                "t3name": "仓山区"
                            },
                            {
                                "t3name": "台江区"
                            },
                            {
                                "t3name": "鼓楼区"
                            },
                            {
                                "t3name": "平潭县"
                            },
                            {
                                "t3name": "永泰县"
                            },
                            {
                                "t3name": "福清市"
                            },
                            {
                                "t3name": "长乐市"
                            }
                        ]
                    },
                    {
                        "t2name": "宁德市",
                        "t3": [
                            {
                                "t3name": "周宁县"
                            },
                            {
                                "t3name": "屏南县"
                            },
                            {
                                "t3name": "福安市"
                            },
                            {
                                "t3name": "福鼎市"
                            },
                            {
                                "t3name": "蕉城区"
                            },
                            {
                                "t3name": "古田县"
                            },
                            {
                                "t3name": "霞浦县"
                            },
                            {
                                "t3name": "寿宁县"
                            },
                            {
                                "t3name": "柘荣县"
                            }
                        ]
                    },
                    {
                        "t2name": "龙岩市",
                        "t3": [
                            {
                                "t3name": "漳平市"
                            },
                            {
                                "t3name": "新罗区"
                            },
                            {
                                "t3name": "长汀县"
                            },
                            {
                                "t3name": "上杭县"
                            },
                            {
                                "t3name": "永定县"
                            },
                            {
                                "t3name": "连城县"
                            },
                            {
                                "t3name": "武平县"
                            }
                        ]
                    },
                    {
                        "t2name": "莆田市",
                        "t3": [
                            {
                                "t3name": "仙游县"
                            },
                            {
                                "t3name": "城厢区"
                            },
                            {
                                "t3name": "涵江区"
                            },
                            {
                                "t3name": "荔城区"
                            },
                            {
                                "t3name": "秀屿区"
                            }
                        ]
                    },
                    {
                        "t2name": "漳州市",
                        "t3": [
                            {
                                "t3name": "龙文区"
                            },
                            {
                                "t3name": "云霄县"
                            },
                            {
                                "t3name": "东山县"
                            },
                            {
                                "t3name": "长泰县"
                            },
                            {
                                "t3name": "诏安县"
                            },
                            {
                                "t3name": "漳浦县"
                            },
                            {
                                "t3name": "龙海市"
                            },
                            {
                                "t3name": "华安县"
                            },
                            {
                                "t3name": "平和县"
                            },
                            {
                                "t3name": "芗城区"
                            },
                            {
                                "t3name": "南靖县"
                            }
                        ]
                    },
                    {
                        "t2name": "泉州市",
                        "t3": [
                            {
                                "t3name": "安溪县"
                            },
                            {
                                "t3name": "永春县"
                            },
                            {
                                "t3name": "德化县"
                            },
                            {
                                "t3name": "金门县"
                            },
                            {
                                "t3name": "石狮市"
                            },
                            {
                                "t3name": "晋江市"
                            },
                            {
                                "t3name": "南安市"
                            },
                            {
                                "t3name": "鲤城区"
                            },
                            {
                                "t3name": "洛江区"
                            },
                            {
                                "t3name": "丰泽区"
                            },
                            {
                                "t3name": "惠安县"
                            },
                            {
                                "t3name": "泉港区"
                            }
                        ]
                    },
                    {
                        "t2name": "三明市",
                        "t3": [
                            {
                                "t3name": "将乐县"
                            },
                            {
                                "t3name": "沙县"
                            },
                            {
                                "t3name": "建宁县"
                            },
                            {
                                "t3name": "清流县"
                            },
                            {
                                "t3name": "宁化县"
                            },
                            {
                                "t3name": "三元区"
                            },
                            {
                                "t3name": "明溪县"
                            },
                            {
                                "t3name": "梅列区"
                            },
                            {
                                "t3name": "永安市"
                            },
                            {
                                "t3name": "泰宁县"
                            },
                            {
                                "t3name": "大田县"
                            },
                            {
                                "t3name": "尤溪县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "安徽省",
                "t2": [
                    {
                        "t2name": "淮南市",
                        "t3": [
                            {
                                "t3name": "大通区"
                            },
                            {
                                "t3name": "谢家集区"
                            },
                            {
                                "t3name": "田家庵区"
                            },
                            {
                                "t3name": "潘集区"
                            },
                            {
                                "t3name": "八公山区"
                            },
                            {
                                "t3name": "凤台县"
                            }
                        ]
                    },
                    {
                        "t2name": "黄山市",
                        "t3": [
                            {
                                "t3name": "黄山区"
                            },
                            {
                                "t3name": "屯溪区"
                            },
                            {
                                "t3name": "歙县"
                            },
                            {
                                "t3name": "徽州区"
                            },
                            {
                                "t3name": "黟县"
                            },
                            {
                                "t3name": "休宁县"
                            },
                            {
                                "t3name": "祁门县"
                            }
                        ]
                    },
                    {
                        "t2name": "蚌埠市",
                        "t3": [
                            {
                                "t3name": "固镇县"
                            },
                            {
                                "t3name": "龙子湖区"
                            },
                            {
                                "t3name": "蚌山区"
                            },
                            {
                                "t3name": "淮上区"
                            },
                            {
                                "t3name": "禹会区"
                            },
                            {
                                "t3name": "五河县"
                            },
                            {
                                "t3name": "怀远县"
                            }
                        ]
                    },
                    {
                        "t2name": "合肥市",
                        "t3": [
                            {
                                "t3name": "包河区"
                            },
                            {
                                "t3name": "蜀山区"
                            },
                            {
                                "t3name": "庐阳区"
                            },
                            {
                                "t3name": "瑶海区"
                            },
                            {
                                "t3name": "肥西县"
                            },
                            {
                                "t3name": "肥东县"
                            },
                            {
                                "t3name": "长丰县"
                            }
                        ]
                    },
                    {
                        "t2name": "宿州市",
                        "t3": [
                            {
                                "t3name": "灵璧县"
                            },
                            {
                                "t3name": "泗县"
                            },
                            {
                                "t3name": "萧县"
                            },
                            {
                                "t3name": "砀山县"
                            },
                            {
                                "t3name": "埇桥区"
                            }
                        ]
                    },
                    {
                        "t2name": "六安市",
                        "t3": [
                            {
                                "t3name": "金安区"
                            },
                            {
                                "t3name": "裕安区"
                            },
                            {
                                "t3name": "寿县"
                            },
                            {
                                "t3name": "霍山县"
                            },
                            {
                                "t3name": "金寨县"
                            },
                            {
                                "t3name": "舒城县"
                            },
                            {
                                "t3name": "霍邱县"
                            }
                        ]
                    },
                    {
                        "t2name": "池州市",
                        "t3": [
                            {
                                "t3name": "东至县"
                            },
                            {
                                "t3name": "贵池区"
                            },
                            {
                                "t3name": "石台县"
                            },
                            {
                                "t3name": "青阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "芜湖市",
                        "t3": [
                            {
                                "t3name": "弋江区"
                            },
                            {
                                "t3name": "鸠江区"
                            },
                            {
                                "t3name": "镜湖区"
                            },
                            {
                                "t3name": "繁昌县"
                            },
                            {
                                "t3name": "南陵县"
                            },
                            {
                                "t3name": "三山区"
                            },
                            {
                                "t3name": "芜湖县"
                            }
                        ]
                    },
                    {
                        "t2name": "宣城市",
                        "t3": [
                            {
                                "t3name": "宁国市"
                            },
                            {
                                "t3name": "绩溪县"
                            },
                            {
                                "t3name": "旌德县"
                            },
                            {
                                "t3name": "广德县"
                            },
                            {
                                "t3name": "泾县"
                            },
                            {
                                "t3name": "宣州区"
                            },
                            {
                                "t3name": "郎溪县"
                            }
                        ]
                    },
                    {
                        "t2name": "巢湖市",
                        "t3": [
                            {
                                "t3name": "居巢区"
                            },
                            {
                                "t3name": "庐江县"
                            },
                            {
                                "t3name": "无为县"
                            },
                            {
                                "t3name": "含山县"
                            },
                            {
                                "t3name": "和县"
                            }
                        ]
                    },
                    {
                        "t2name": "亳州市",
                        "t3": [
                            {
                                "t3name": "涡阳县"
                            },
                            {
                                "t3name": "谯城区"
                            },
                            {
                                "t3name": "利辛县"
                            },
                            {
                                "t3name": "蒙城县"
                            }
                        ]
                    },
                    {
                        "t2name": "阜阳市",
                        "t3": [
                            {
                                "t3name": "太和县"
                            },
                            {
                                "t3name": "临泉县"
                            },
                            {
                                "t3name": "颍泉区"
                            },
                            {
                                "t3name": "颍东区"
                            },
                            {
                                "t3name": "界首市"
                            },
                            {
                                "t3name": "颍上县"
                            },
                            {
                                "t3name": "阜南县"
                            },
                            {
                                "t3name": "颍州区"
                            }
                        ]
                    },
                    {
                        "t2name": "铜陵市",
                        "t3": [
                            {
                                "t3name": "狮子山区"
                            },
                            {
                                "t3name": "郊区"
                            },
                            {
                                "t3name": "铜官山区"
                            },
                            {
                                "t3name": "铜陵县"
                            }
                        ]
                    },
                    {
                        "t2name": "淮北市",
                        "t3": [
                            {
                                "t3name": "烈山区"
                            },
                            {
                                "t3name": "相山区"
                            },
                            {
                                "t3name": "杜集区"
                            },
                            {
                                "t3name": "濉溪县"
                            }
                        ]
                    },
                    {
                        "t2name": "滁州市",
                        "t3": [
                            {
                                "t3name": "明光市"
                            },
                            {
                                "t3name": "南谯区"
                            },
                            {
                                "t3name": "来安县"
                            },
                            {
                                "t3name": "琅琊区"
                            },
                            {
                                "t3name": "凤阳县"
                            },
                            {
                                "t3name": "天长市"
                            },
                            {
                                "t3name": "全椒县"
                            },
                            {
                                "t3name": "定远县"
                            }
                        ]
                    },
                    {
                        "t2name": "马鞍山市",
                        "t3": [
                            {
                                "t3name": "当涂县"
                            },
                            {
                                "t3name": "雨山区"
                            },
                            {
                                "t3name": "花山区"
                            },
                            {
                                "t3name": "金家庄区"
                            }
                        ]
                    },
                    {
                        "t2name": "安庆市",
                        "t3": [
                            {
                                "t3name": "望江县"
                            },
                            {
                                "t3name": "宿松县"
                            },
                            {
                                "t3name": "桐城市"
                            },
                            {
                                "t3name": "岳西县"
                            },
                            {
                                "t3name": "潜山县"
                            },
                            {
                                "t3name": "太湖县"
                            },
                            {
                                "t3name": "大观区"
                            },
                            {
                                "t3name": "宜秀区"
                            },
                            {
                                "t3name": "怀宁县"
                            },
                            {
                                "t3name": "枞阳县"
                            },
                            {
                                "t3name": "迎江区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "四川省",
                "t2": [
                    {
                        "t2name": "宜宾市",
                        "t3": [
                            {
                                "t3name": "翠屏区"
                            },
                            {
                                "t3name": "宜宾县"
                            },
                            {
                                "t3name": "南溪县"
                            },
                            {
                                "t3name": "屏山县"
                            },
                            {
                                "t3name": "兴文县"
                            },
                            {
                                "t3name": "筠连县"
                            },
                            {
                                "t3name": "珙县"
                            },
                            {
                                "t3name": "高县"
                            },
                            {
                                "t3name": "长宁县"
                            },
                            {
                                "t3name": "江安县"
                            }
                        ]
                    },
                    {
                        "t2name": "巴中市",
                        "t3": [
                            {
                                "t3name": "巴州区"
                            },
                            {
                                "t3name": "南江县"
                            },
                            {
                                "t3name": "通江县"
                            },
                            {
                                "t3name": "平昌县"
                            }
                        ]
                    },
                    {
                        "t2name": "南充市",
                        "t3": [
                            {
                                "t3name": "高坪区"
                            },
                            {
                                "t3name": "顺庆区"
                            },
                            {
                                "t3name": "南部县"
                            },
                            {
                                "t3name": "嘉陵区"
                            },
                            {
                                "t3name": "蓬安县"
                            },
                            {
                                "t3name": "营山县"
                            },
                            {
                                "t3name": "西充县"
                            },
                            {
                                "t3name": "仪陇县"
                            },
                            {
                                "t3name": "阆中市"
                            }
                        ]
                    },
                    {
                        "t2name": "成都市",
                        "t3": [
                            {
                                "t3name": "成华区"
                            },
                            {
                                "t3name": "龙泉驿区"
                            },
                            {
                                "t3name": "金牛区"
                            },
                            {
                                "t3name": "武侯区"
                            },
                            {
                                "t3name": "锦江区"
                            },
                            {
                                "t3name": "青羊区"
                            },
                            {
                                "t3name": "都江堰市"
                            },
                            {
                                "t3name": "温江区"
                            },
                            {
                                "t3name": "邛崃市"
                            },
                            {
                                "t3name": "彭州市"
                            },
                            {
                                "t3name": "新津县"
                            },
                            {
                                "t3name": "郫县"
                            },
                            {
                                "t3name": "青白江区"
                            },
                            {
                                "t3name": "新都区"
                            },
                            {
                                "t3name": "双流县"
                            },
                            {
                                "t3name": "大邑县"
                            },
                            {
                                "t3name": "崇州市"
                            },
                            {
                                "t3name": "蒲江县"
                            },
                            {
                                "t3name": "金堂县"
                            }
                        ]
                    },
                    {
                        "t2name": "凉山彝族",
                        "t3": [
                            {
                                "t3name": "普格县"
                            },
                            {
                                "t3name": "宁南县"
                            },
                            {
                                "t3name": "会东县"
                            },
                            {
                                "t3name": "会理县"
                            },
                            {
                                "t3name": "喜德县"
                            },
                            {
                                "t3name": "金阳县"
                            },
                            {
                                "t3name": "西昌市"
                            },
                            {
                                "t3name": "木里"
                            },
                            {
                                "t3name": "盐源县"
                            },
                            {
                                "t3name": "德昌县"
                            },
                            {
                                "t3name": "越西县"
                            },
                            {
                                "t3name": "布拖县"
                            },
                            {
                                "t3name": "雷波县"
                            },
                            {
                                "t3name": "甘洛县"
                            },
                            {
                                "t3name": "美姑县"
                            },
                            {
                                "t3name": "冕宁县"
                            },
                            {
                                "t3name": "昭觉县"
                            }
                        ]
                    },
                    {
                        "t2name": "眉山市",
                        "t3": [
                            {
                                "t3name": "青神县"
                            },
                            {
                                "t3name": "洪雅县"
                            },
                            {
                                "t3name": "丹棱县"
                            },
                            {
                                "t3name": "仁寿县"
                            },
                            {
                                "t3name": "彭山县"
                            },
                            {
                                "t3name": "东坡区"
                            }
                        ]
                    },
                    {
                        "t2name": "阿坝市",
                        "t3": [
                            {
                                "t3name": "壤塘县"
                            },
                            {
                                "t3name": "马尔康县"
                            },
                            {
                                "t3name": "黑水县"
                            },
                            {
                                "t3name": "小金县"
                            },
                            {
                                "t3name": "金川县"
                            },
                            {
                                "t3name": "理县"
                            },
                            {
                                "t3name": "茂县"
                            },
                            {
                                "t3name": "阿坝县"
                            },
                            {
                                "t3name": "汶川县"
                            },
                            {
                                "t3name": "红原县"
                            },
                            {
                                "t3name": "松潘县"
                            },
                            {
                                "t3name": "九寨沟县"
                            },
                            {
                                "t3name": "若尔盖县"
                            }
                        ]
                    },
                    {
                        "t2name": "乐山市",
                        "t3": [
                            {
                                "t3name": "峨眉山市"
                            },
                            {
                                "t3name": "马边彝族"
                            },
                            {
                                "t3name": "沐川县"
                            },
                            {
                                "t3name": "峨边彝族"
                            },
                            {
                                "t3name": "市中区"
                            },
                            {
                                "t3name": "沙湾区"
                            },
                            {
                                "t3name": "五通桥区"
                            },
                            {
                                "t3name": "金口河区"
                            },
                            {
                                "t3name": "犍为县"
                            },
                            {
                                "t3name": "井研县"
                            },
                            {
                                "t3name": "夹江县"
                            }
                        ]
                    },
                    {
                        "t2name": "绵阳市",
                        "t3": [
                            {
                                "t3name": "盐亭县"
                            },
                            {
                                "t3name": "安县"
                            },
                            {
                                "t3name": "游仙区"
                            },
                            {
                                "t3name": "三台县"
                            },
                            {
                                "t3name": "涪城区"
                            },
                            {
                                "t3name": "北川羌族"
                            },
                            {
                                "t3name": "梓潼县"
                            },
                            {
                                "t3name": "江油市"
                            },
                            {
                                "t3name": "平武县"
                            }
                        ]
                    },
                    {
                        "t2name": "广安市",
                        "t3": [
                            {
                                "t3name": "广安区"
                            },
                            {
                                "t3name": "邻水县"
                            },
                            {
                                "t3name": "华蓥市"
                            },
                            {
                                "t3name": "武胜县"
                            },
                            {
                                "t3name": "岳池县"
                            }
                        ]
                    },
                    {
                        "t2name": "广元市",
                        "t3": [
                            {
                                "t3name": "元坝区"
                            },
                            {
                                "t3name": "市中区"
                            },
                            {
                                "t3name": "旺苍县"
                            },
                            {
                                "t3name": "朝天区"
                            },
                            {
                                "t3name": "苍溪县"
                            },
                            {
                                "t3name": "剑阁县"
                            },
                            {
                                "t3name": "青川县"
                            }
                        ]
                    },
                    {
                        "t2name": "德阳市",
                        "t3": [
                            {
                                "t3name": "广汉市"
                            },
                            {
                                "t3name": "什邡市"
                            },
                            {
                                "t3name": "中江县"
                            },
                            {
                                "t3name": "罗江县"
                            },
                            {
                                "t3name": "绵竹市"
                            },
                            {
                                "t3name": "旌阳区"
                            }
                        ]
                    },
                    {
                        "t2name": "资阳市",
                        "t3": [
                            {
                                "t3name": "安岳县"
                            },
                            {
                                "t3name": "乐至县"
                            },
                            {
                                "t3name": "雁江区"
                            },
                            {
                                "t3name": "简阳市"
                            }
                        ]
                    },
                    {
                        "t2name": "达州市",
                        "t3": [
                            {
                                "t3name": "宣汉县"
                            },
                            {
                                "t3name": "开江县"
                            },
                            {
                                "t3name": "大竹县"
                            },
                            {
                                "t3name": "渠县"
                            },
                            {
                                "t3name": "通川区"
                            },
                            {
                                "t3name": "达县"
                            },
                            {
                                "t3name": "万源市"
                            }
                        ]
                    },
                    {
                        "t2name": "泸州市",
                        "t3": [
                            {
                                "t3name": "古蔺县"
                            },
                            {
                                "t3name": "纳溪区"
                            },
                            {
                                "t3name": "江阳区"
                            },
                            {
                                "t3name": "叙永县"
                            },
                            {
                                "t3name": "合江县"
                            },
                            {
                                "t3name": "泸县"
                            },
                            {
                                "t3name": "龙马潭区"
                            }
                        ]
                    },
                    {
                        "t2name": "自贡市",
                        "t3": [
                            {
                                "t3name": "自流井区"
                            },
                            {
                                "t3name": "贡井区"
                            },
                            {
                                "t3name": "大安区"
                            },
                            {
                                "t3name": "沿滩区"
                            },
                            {
                                "t3name": "荣县"
                            },
                            {
                                "t3name": "富顺县"
                            }
                        ]
                    },
                    {
                        "t2name": "遂宁市",
                        "t3": [
                            {
                                "t3name": "蓬溪县"
                            },
                            {
                                "t3name": "安居区"
                            },
                            {
                                "t3name": "船山区"
                            },
                            {
                                "t3name": "大英县"
                            },
                            {
                                "t3name": "射洪县"
                            }
                        ]
                    },
                    {
                        "t2name": "甘孜藏族",
                        "t3": [
                            {
                                "t3name": "色达县"
                            },
                            {
                                "t3name": "理塘县"
                            },
                            {
                                "t3name": "巴塘县"
                            },
                            {
                                "t3name": "乡城县"
                            },
                            {
                                "t3name": "稻城县"
                            },
                            {
                                "t3name": "得荣县"
                            },
                            {
                                "t3name": "丹巴县"
                            },
                            {
                                "t3name": "九龙县"
                            },
                            {
                                "t3name": "雅江县"
                            },
                            {
                                "t3name": "道孚县"
                            },
                            {
                                "t3name": "炉霍县"
                            },
                            {
                                "t3name": "甘孜县"
                            },
                            {
                                "t3name": "新龙县"
                            },
                            {
                                "t3name": "德格县"
                            },
                            {
                                "t3name": "白玉县"
                            },
                            {
                                "t3name": "石渠县"
                            },
                            {
                                "t3name": "泸定县"
                            },
                            {
                                "t3name": "康定县"
                            }
                        ]
                    },
                    {
                        "t2name": "雅安市",
                        "t3": [
                            {
                                "t3name": "名山县"
                            },
                            {
                                "t3name": "芦山县"
                            },
                            {
                                "t3name": "天全县"
                            },
                            {
                                "t3name": "宝兴县"
                            },
                            {
                                "t3name": "荥经县"
                            },
                            {
                                "t3name": "雨城区"
                            },
                            {
                                "t3name": "石棉县"
                            },
                            {
                                "t3name": "汉源县"
                            }
                        ]
                    },
                    {
                        "t2name": "内江市",
                        "t3": [
                            {
                                "t3name": "隆昌县"
                            },
                            {
                                "t3name": "资中县"
                            },
                            {
                                "t3name": "威远县"
                            },
                            {
                                "t3name": "东兴区"
                            },
                            {
                                "t3name": "市中区"
                            }
                        ]
                    },
                    {
                        "t2name": "攀枝花市",
                        "t3": [
                            {
                                "t3name": "西区"
                            },
                            {
                                "t3name": "仁和区"
                            },
                            {
                                "t3name": "盐边县"
                            },
                            {
                                "t3name": "米易县"
                            },
                            {
                                "t3name": "东区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "湖北省",
                "t2": [
                    {
                        "t2name": "咸宁市",
                        "t3": [
                            {
                                "t3name": "嘉鱼县"
                            },
                            {
                                "t3name": "咸安区"
                            },
                            {
                                "t3name": "崇阳县"
                            },
                            {
                                "t3name": "通城县"
                            },
                            {
                                "t3name": "赤壁市"
                            },
                            {
                                "t3name": "通山县"
                            }
                        ]
                    },
                    {
                        "t2name": "宜昌市",
                        "t3": [
                            {
                                "t3name": "西陵区"
                            },
                            {
                                "t3name": "枝江市"
                            },
                            {
                                "t3name": "当阳市"
                            },
                            {
                                "t3name": "兴山县"
                            },
                            {
                                "t3name": "远安县"
                            },
                            {
                                "t3name": "长阳"
                            },
                            {
                                "t3name": "秭归县"
                            },
                            {
                                "t3name": "点军区"
                            },
                            {
                                "t3name": "伍家岗区"
                            },
                            {
                                "t3name": "夷陵区"
                            },
                            {
                                "t3name": "猇亭区"
                            },
                            {
                                "t3name": "宜都市"
                            },
                            {
                                "t3name": "五峰"
                            }
                        ]
                    },
                    {
                        "t2name": "黄冈市",
                        "t3": [
                            {
                                "t3name": "武穴市"
                            },
                            {
                                "t3name": "黄州区"
                            },
                            {
                                "t3name": "团风县"
                            },
                            {
                                "t3name": "红安县"
                            },
                            {
                                "t3name": "罗田县"
                            },
                            {
                                "t3name": "英山县"
                            },
                            {
                                "t3name": "浠水县"
                            },
                            {
                                "t3name": "麻城市"
                            },
                            {
                                "t3name": "黄梅县"
                            },
                            {
                                "t3name": "蕲春县"
                            }
                        ]
                    },
                    {
                        "t2name": "荆州市",
                        "t3": [
                            {
                                "t3name": "江陵县"
                            },
                            {
                                "t3name": "石首市"
                            },
                            {
                                "t3name": "洪湖市"
                            },
                            {
                                "t3name": "松滋市"
                            },
                            {
                                "t3name": "荆州区"
                            },
                            {
                                "t3name": "沙市区"
                            },
                            {
                                "t3name": "监利县"
                            },
                            {
                                "t3name": "公安县"
                            }
                        ]
                    },
                    {
                        "t2name": "孝感市",
                        "t3": [
                            {
                                "t3name": "应城市"
                            },
                            {
                                "t3name": "云梦县"
                            },
                            {
                                "t3name": "大悟县"
                            },
                            {
                                "t3name": "孝昌县"
                            },
                            {
                                "t3name": "汉川市"
                            },
                            {
                                "t3name": "安陆市"
                            },
                            {
                                "t3name": "孝南区"
                            }
                        ]
                    },
                    {
                        "t2name": "荆门市",
                        "t3": [
                            {
                                "t3name": "京山县"
                            },
                            {
                                "t3name": "沙洋县"
                            },
                            {
                                "t3name": "东宝区"
                            },
                            {
                                "t3name": "掇刀区"
                            },
                            {
                                "t3name": "钟祥市"
                            }
                        ]
                    },
                    {
                        "t2name": "十堰市",
                        "t3": [
                            {
                                "t3name": "丹江口市"
                            },
                            {
                                "t3name": "张湾区"
                            },
                            {
                                "t3name": "郧县"
                            },
                            {
                                "t3name": "茅箭区"
                            },
                            {
                                "t3name": "竹溪县"
                            },
                            {
                                "t3name": "房县"
                            },
                            {
                                "t3name": "郧西县"
                            },
                            {
                                "t3name": "竹山县"
                            }
                        ]
                    },
                    {
                        "t2name": "鄂州市",
                        "t3": [
                            {
                                "t3name": "华容区"
                            },
                            {
                                "t3name": "鄂城区"
                            },
                            {
                                "t3name": "梁子湖区"
                            }
                        ]
                    },
                    {
                        "t2name": "天门市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "潜江市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "恩施土家",
                        "t3": [
                            {
                                "t3name": "来凤县"
                            },
                            {
                                "t3name": "鹤峰县"
                            },
                            {
                                "t3name": "恩施市"
                            },
                            {
                                "t3name": "利川市"
                            },
                            {
                                "t3name": "宣恩县"
                            },
                            {
                                "t3name": "咸丰县"
                            },
                            {
                                "t3name": "建始县"
                            },
                            {
                                "t3name": "巴东县"
                            }
                        ]
                    },
                    {
                        "t2name": "武汉市",
                        "t3": [
                            {
                                "t3name": "蔡甸区"
                            },
                            {
                                "t3name": "汉南区"
                            },
                            {
                                "t3name": "洪山区"
                            },
                            {
                                "t3name": "东西湖区"
                            },
                            {
                                "t3name": "新洲区"
                            },
                            {
                                "t3name": "黄陂区"
                            },
                            {
                                "t3name": "江夏区"
                            },
                            {
                                "t3name": "江岸区"
                            },
                            {
                                "t3name": "江汉区"
                            },
                            {
                                "t3name": "硚口区"
                            },
                            {
                                "t3name": "汉阳区"
                            },
                            {
                                "t3name": "武昌区"
                            },
                            {
                                "t3name": "青山区"
                            }
                        ]
                    },
                    {
                        "t2name": "仙桃市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "神农架林",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "随州市",
                        "t3": [
                            {
                                "t3name": "曾都区"
                            },
                            {
                                "t3name": "广水市"
                            }
                        ]
                    },
                    {
                        "t2name": "黄石市",
                        "t3": [
                            {
                                "t3name": "大冶市"
                            },
                            {
                                "t3name": "阳新县"
                            },
                            {
                                "t3name": "铁山区"
                            },
                            {
                                "t3name": "下陆区"
                            },
                            {
                                "t3name": "西塞山区"
                            },
                            {
                                "t3name": "黄石港区"
                            }
                        ]
                    },
                    {
                        "t2name": "襄樊市",
                        "t3": [
                            {
                                "t3name": "枣阳市"
                            },
                            {
                                "t3name": "老河口市"
                            },
                            {
                                "t3name": "樊城区"
                            },
                            {
                                "t3name": "襄城区"
                            },
                            {
                                "t3name": "南漳县"
                            },
                            {
                                "t3name": "襄阳区"
                            },
                            {
                                "t3name": "保康县"
                            },
                            {
                                "t3name": "谷城县"
                            },
                            {
                                "t3name": "宜城市"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "河北省",
                "t2": [
                    {
                        "t2name": "张家口市",
                        "t3": [
                            {
                                "t3name": "怀来县"
                            },
                            {
                                "t3name": "涿鹿县"
                            },
                            {
                                "t3name": "桥东区"
                            },
                            {
                                "t3name": "万全县"
                            },
                            {
                                "t3name": "宣化区"
                            },
                            {
                                "t3name": "桥西区"
                            },
                            {
                                "t3name": "宣化县"
                            },
                            {
                                "t3name": "下花园区"
                            },
                            {
                                "t3name": "康保县"
                            },
                            {
                                "t3name": "张北县"
                            },
                            {
                                "t3name": "沽源县"
                            },
                            {
                                "t3name": "尚义县"
                            },
                            {
                                "t3name": "怀安县"
                            },
                            {
                                "t3name": "赤城县"
                            },
                            {
                                "t3name": "崇礼县"
                            },
                            {
                                "t3name": "蔚县"
                            },
                            {
                                "t3name": "阳原县"
                            }
                        ]
                    },
                    {
                        "t2name": "邯郸市",
                        "t3": [
                            {
                                "t3name": "成安县"
                            },
                            {
                                "t3name": "大名县"
                            },
                            {
                                "t3name": "邯郸县"
                            },
                            {
                                "t3name": "临漳县"
                            },
                            {
                                "t3name": "复兴区"
                            },
                            {
                                "t3name": "峰峰矿区"
                            },
                            {
                                "t3name": "邯山区"
                            },
                            {
                                "t3name": "丛台区"
                            },
                            {
                                "t3name": "肥乡县"
                            },
                            {
                                "t3name": "魏县"
                            },
                            {
                                "t3name": "永年县"
                            },
                            {
                                "t3name": "鸡泽县"
                            },
                            {
                                "t3name": "涉县"
                            },
                            {
                                "t3name": "磁县"
                            },
                            {
                                "t3name": "邱县"
                            },
                            {
                                "t3name": "曲周县"
                            },
                            {
                                "t3name": "武安市"
                            },
                            {
                                "t3name": "馆陶县"
                            },
                            {
                                "t3name": "广平县"
                            }
                        ]
                    },
                    {
                        "t2name": "邢台市",
                        "t3": [
                            {
                                "t3name": "新河县"
                            },
                            {
                                "t3name": "广宗县"
                            },
                            {
                                "t3name": "清河县"
                            },
                            {
                                "t3name": "桥东区"
                            },
                            {
                                "t3name": "威县"
                            },
                            {
                                "t3name": "临西县"
                            },
                            {
                                "t3name": "平乡县"
                            },
                            {
                                "t3name": "沙河市"
                            },
                            {
                                "t3name": "宁晋县"
                            },
                            {
                                "t3name": "巨鹿县"
                            },
                            {
                                "t3name": "南宫市"
                            },
                            {
                                "t3name": "柏乡县"
                            },
                            {
                                "t3name": "隆尧县"
                            },
                            {
                                "t3name": "任县"
                            },
                            {
                                "t3name": "南和县"
                            },
                            {
                                "t3name": "桥西区"
                            },
                            {
                                "t3name": "邢台县"
                            },
                            {
                                "t3name": "临城县"
                            },
                            {
                                "t3name": "内丘县"
                            }
                        ]
                    },
                    {
                        "t2name": "衡水市",
                        "t3": [
                            {
                                "t3name": "武强县"
                            },
                            {
                                "t3name": "饶阳县"
                            },
                            {
                                "t3name": "故城县"
                            },
                            {
                                "t3name": "安平县"
                            },
                            {
                                "t3name": "枣强县"
                            },
                            {
                                "t3name": "武邑县"
                            },
                            {
                                "t3name": "深州市"
                            },
                            {
                                "t3name": "冀州市"
                            },
                            {
                                "t3name": "阜城县"
                            },
                            {
                                "t3name": "景县"
                            },
                            {
                                "t3name": "桃城区"
                            }
                        ]
                    },
                    {
                        "t2name": "秦皇岛",
                        "t3": [
                            {
                                "t3name": "海港区"
                            },
                            {
                                "t3name": "昌黎县"
                            },
                            {
                                "t3name": "青龙满族自治县"
                            },
                            {
                                "t3name": "北戴河区"
                            },
                            {
                                "t3name": "山海关区"
                            },
                            {
                                "t3name": "卢龙县"
                            },
                            {
                                "t3name": "抚宁县"
                            }
                        ]
                    },
                    {
                        "t2name": "廊坊市",
                        "t3": [
                            {
                                "t3name": "三河市"
                            },
                            {
                                "t3name": "安次区"
                            },
                            {
                                "t3name": "大城县"
                            },
                            {
                                "t3name": "文安县"
                            },
                            {
                                "t3name": "永清县"
                            },
                            {
                                "t3name": "香河县"
                            },
                            {
                                "t3name": "固安县"
                            },
                            {
                                "t3name": "广阳区"
                            },
                            {
                                "t3name": "大厂回族自治县"
                            },
                            {
                                "t3name": "霸州市"
                            }
                        ]
                    },
                    {
                        "t2name": "保定市",
                        "t3": [
                            {
                                "t3name": "涿州市"
                            },
                            {
                                "t3name": "雄县"
                            },
                            {
                                "t3name": "蠡县"
                            },
                            {
                                "t3name": "曲阳县"
                            },
                            {
                                "t3name": "博野县"
                            },
                            {
                                "t3name": "顺平县"
                            },
                            {
                                "t3name": "望都县"
                            },
                            {
                                "t3name": "涞源县"
                            },
                            {
                                "t3name": "易县"
                            },
                            {
                                "t3name": "安新县"
                            },
                            {
                                "t3name": "北市区"
                            },
                            {
                                "t3name": "新市区"
                            },
                            {
                                "t3name": "清苑县"
                            },
                            {
                                "t3name": "涞水县"
                            },
                            {
                                "t3name": "南市区"
                            },
                            {
                                "t3name": "满城县"
                            },
                            {
                                "t3name": "定兴县"
                            },
                            {
                                "t3name": "唐县"
                            },
                            {
                                "t3name": "阜平县"
                            },
                            {
                                "t3name": "徐水县"
                            },
                            {
                                "t3name": "高阳县"
                            },
                            {
                                "t3name": "容城县"
                            },
                            {
                                "t3name": "安国市"
                            },
                            {
                                "t3name": "定州市"
                            },
                            {
                                "t3name": "高碑店市"
                            }
                        ]
                    },
                    {
                        "t2name": "承德市",
                        "t3": [
                            {
                                "t3name": "围场满族蒙古族自治县"
                            },
                            {
                                "t3name": "宽城满族自治县"
                            },
                            {
                                "t3name": "丰宁满族自治县"
                            },
                            {
                                "t3name": "隆化县"
                            },
                            {
                                "t3name": "滦平县"
                            },
                            {
                                "t3name": "平泉县"
                            },
                            {
                                "t3name": "兴隆县"
                            },
                            {
                                "t3name": "承德县"
                            },
                            {
                                "t3name": "鹰手营子矿区"
                            },
                            {
                                "t3name": "双滦区"
                            },
                            {
                                "t3name": "双桥区"
                            }
                        ]
                    },
                    {
                        "t2name": "唐山市",
                        "t3": [
                            {
                                "t3name": "迁安市"
                            },
                            {
                                "t3name": "遵化市"
                            },
                            {
                                "t3name": "唐海县"
                            },
                            {
                                "t3name": "路北区"
                            },
                            {
                                "t3name": "古冶区"
                            },
                            {
                                "t3name": "开平区"
                            },
                            {
                                "t3name": "丰南区"
                            },
                            {
                                "t3name": "丰润区"
                            },
                            {
                                "t3name": "滦县"
                            },
                            {
                                "t3name": "滦南县"
                            },
                            {
                                "t3name": "乐亭县"
                            },
                            {
                                "t3name": "迁西县"
                            },
                            {
                                "t3name": "玉田县"
                            },
                            {
                                "t3name": "路南区"
                            }
                        ]
                    },
                    {
                        "t2name": "沧州市",
                        "t3": [
                            {
                                "t3name": "任丘市"
                            },
                            {
                                "t3name": "黄骅市"
                            },
                            {
                                "t3name": "献县"
                            },
                            {
                                "t3name": "吴桥县"
                            },
                            {
                                "t3name": "河间市"
                            },
                            {
                                "t3name": "肃宁县"
                            },
                            {
                                "t3name": "南皮县"
                            },
                            {
                                "t3name": "泊头市"
                            },
                            {
                                "t3name": "孟村回族自治县"
                            },
                            {
                                "t3name": "青县"
                            },
                            {
                                "t3name": "东光县"
                            },
                            {
                                "t3name": "海兴县"
                            },
                            {
                                "t3name": "盐山县"
                            },
                            {
                                "t3name": "新华区"
                            },
                            {
                                "t3name": "运河区"
                            },
                            {
                                "t3name": "沧县"
                            }
                        ]
                    },
                    {
                        "t2name": "石家庄",
                        "t3": [
                            {
                                "t3name": "藁城市"
                            },
                            {
                                "t3name": "辛集市"
                            },
                            {
                                "t3name": "新乐市"
                            },
                            {
                                "t3name": "晋州市"
                            },
                            {
                                "t3name": "平山县"
                            },
                            {
                                "t3name": "无极县"
                            },
                            {
                                "t3name": "赵县"
                            },
                            {
                                "t3name": "元氏县"
                            },
                            {
                                "t3name": "鹿泉市"
                            },
                            {
                                "t3name": "桥东区"
                            },
                            {
                                "t3name": "长安区"
                            },
                            {
                                "t3name": "新华区"
                            },
                            {
                                "t3name": "桥西区"
                            },
                            {
                                "t3name": "深泽县"
                            },
                            {
                                "t3name": "赞皇县"
                            },
                            {
                                "t3name": "井陉县"
                            },
                            {
                                "t3name": "正定县"
                            },
                            {
                                "t3name": "井陉矿区"
                            },
                            {
                                "t3name": "裕华区"
                            },
                            {
                                "t3name": "灵寿县"
                            },
                            {
                                "t3name": "高邑县"
                            },
                            {
                                "t3name": "栾城县"
                            },
                            {
                                "t3name": "行唐县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "云南省",
                "t2": [
                    {
                        "t2name": "德宏傣族",
                        "t3": [
                            {
                                "t3name": "瑞丽"
                            },
                            {
                                "t3name": "潞西"
                            },
                            {
                                "t3name": "盈江"
                            },
                            {
                                "t3name": "梁河"
                            },
                            {
                                "t3name": "陇川"
                            }
                        ]
                    },
                    {
                        "t2name": "玉溪市",
                        "t3": [
                            {
                                "t3name": "红塔区"
                            },
                            {
                                "t3name": "江川县"
                            },
                            {
                                "t3name": "澄江县"
                            },
                            {
                                "t3name": "通海县"
                            },
                            {
                                "t3name": "华宁县"
                            },
                            {
                                "t3name": "易门县"
                            },
                            {
                                "t3name": "元江"
                            },
                            {
                                "t3name": "新平"
                            },
                            {
                                "t3name": "峨山"
                            }
                        ]
                    },
                    {
                        "t2name": "曲靖市",
                        "t3": [
                            {
                                "t3name": "富源县"
                            },
                            {
                                "t3name": "会泽县"
                            },
                            {
                                "t3name": "沾益县"
                            },
                            {
                                "t3name": "宣威市"
                            },
                            {
                                "t3name": "陆良县"
                            },
                            {
                                "t3name": "马龙县"
                            },
                            {
                                "t3name": "麒麟区"
                            },
                            {
                                "t3name": "罗平县"
                            },
                            {
                                "t3name": "师宗县"
                            }
                        ]
                    },
                    {
                        "t2name": "保山市",
                        "t3": [
                            {
                                "t3name": "腾冲"
                            },
                            {
                                "t3name": "施甸"
                            },
                            {
                                "t3name": "昌宁"
                            },
                            {
                                "t3name": "龙陵"
                            },
                            {
                                "t3name": "隆阳区"
                            }
                        ]
                    },
                    {
                        "t2name": "怒江傈僳",
                        "t3": [
                            {
                                "t3name": "泸水"
                            },
                            {
                                "t3name": "兰坪"
                            },
                            {
                                "t3name": "贡山"
                            },
                            {
                                "t3name": "福贡"
                            }
                        ]
                    },
                    {
                        "t2name": "迪庆藏族",
                        "t3": [
                            {
                                "t3name": "维西"
                            },
                            {
                                "t3name": "德钦"
                            },
                            {
                                "t3name": "香格里拉"
                            }
                        ]
                    },
                    {
                        "t2name": "昭通市",
                        "t3": [
                            {
                                "t3name": "鲁甸"
                            },
                            {
                                "t3name": "昭阳区"
                            },
                            {
                                "t3name": "水富"
                            },
                            {
                                "t3name": "大关"
                            },
                            {
                                "t3name": "永善"
                            },
                            {
                                "t3name": "巧家"
                            },
                            {
                                "t3name": "盐津"
                            },
                            {
                                "t3name": "彝良"
                            },
                            {
                                "t3name": "威信"
                            },
                            {
                                "t3name": "绥江"
                            },
                            {
                                "t3name": "镇雄"
                            }
                        ]
                    },
                    {
                        "t2name": "昆明市",
                        "t3": [
                            {
                                "t3name": "寻甸"
                            },
                            {
                                "t3name": "禄劝"
                            },
                            {
                                "t3name": "嵩明县"
                            },
                            {
                                "t3name": "石林"
                            },
                            {
                                "t3name": "富民县"
                            },
                            {
                                "t3name": "宜良县"
                            },
                            {
                                "t3name": "呈贡县"
                            },
                            {
                                "t3name": "晋宁县"
                            },
                            {
                                "t3name": "西山区"
                            },
                            {
                                "t3name": "东川区"
                            },
                            {
                                "t3name": "盘龙区"
                            },
                            {
                                "t3name": "官渡区"
                            },
                            {
                                "t3name": "五华区"
                            },
                            {
                                "t3name": "安宁市"
                            }
                        ]
                    },
                    {
                        "t2name": "楚雄彝族",
                        "t3": [
                            {
                                "t3name": "武定"
                            },
                            {
                                "t3name": "禄丰"
                            },
                            {
                                "t3name": "沧源"
                            },
                            {
                                "t3name": "双柏"
                            },
                            {
                                "t3name": "楚雄"
                            },
                            {
                                "t3name": "南华"
                            },
                            {
                                "t3name": "牟定"
                            },
                            {
                                "t3name": "大姚"
                            },
                            {
                                "t3name": "姚安"
                            },
                            {
                                "t3name": "元谋"
                            },
                            {
                                "t3name": "永仁"
                            }
                        ]
                    },
                    {
                        "t2name": "文山壮族",
                        "t3": [
                            {
                                "t3name": "广南"
                            },
                            {
                                "t3name": "富宁"
                            },
                            {
                                "t3name": "丘北"
                            },
                            {
                                "t3name": "砚山"
                            },
                            {
                                "t3name": "西畴"
                            },
                            {
                                "t3name": "文山"
                            },
                            {
                                "t3name": "麻栗坡"
                            },
                            {
                                "t3name": "马关"
                            }
                        ]
                    },
                    {
                        "t2name": "西双版纳",
                        "t3": [
                            {
                                "t3name": "景洪"
                            },
                            {
                                "t3name": "勐腊"
                            },
                            {
                                "t3name": "勐海"
                            }
                        ]
                    },
                    {
                        "t2name": "丽江市",
                        "t3": [
                            {
                                "t3name": "古城区"
                            },
                            {
                                "t3name": "宁蒗"
                            },
                            {
                                "t3name": "华坪"
                            },
                            {
                                "t3name": "永胜"
                            },
                            {
                                "t3name": "玉龙"
                            }
                        ]
                    },
                    {
                        "t2name": "红河哈尼",
                        "t3": [
                            {
                                "t3name": "河口"
                            },
                            {
                                "t3name": "绿春县"
                            },
                            {
                                "t3name": "建水"
                            },
                            {
                                "t3name": "石屏"
                            },
                            {
                                "t3name": "蒙自"
                            },
                            {
                                "t3name": "屏边"
                            },
                            {
                                "t3name": "个旧"
                            },
                            {
                                "t3name": "开远"
                            },
                            {
                                "t3name": "元阳"
                            },
                            {
                                "t3name": "红河"
                            },
                            {
                                "t3name": "金平"
                            },
                            {
                                "t3name": "弥勒"
                            },
                            {
                                "t3name": "泸西"
                            }
                        ]
                    },
                    {
                        "t2name": "大理白族",
                        "t3": [
                            {
                                "t3name": "弥渡"
                            },
                            {
                                "t3name": "南涧"
                            },
                            {
                                "t3name": "巍山"
                            },
                            {
                                "t3name": "永平"
                            },
                            {
                                "t3name": "云龙"
                            },
                            {
                                "t3name": "洱源"
                            },
                            {
                                "t3name": "剑川"
                            },
                            {
                                "t3name": "鹤庆"
                            },
                            {
                                "t3name": "漾濞"
                            },
                            {
                                "t3name": "大理"
                            },
                            {
                                "t3name": "宾川"
                            },
                            {
                                "t3name": "祥云"
                            }
                        ]
                    },
                    {
                        "t2name": "临沧市",
                        "t3": [
                            {
                                "t3name": "耿马"
                            },
                            {
                                "t3name": "镇康"
                            },
                            {
                                "t3name": "双江"
                            },
                            {
                                "t3name": "临翔区"
                            },
                            {
                                "t3name": "凤庆"
                            },
                            {
                                "t3name": "云县"
                            },
                            {
                                "t3name": "永德"
                            }
                        ]
                    },
                    {
                        "t2name": "思茅市",
                        "t3": [
                            {
                                "t3name": "镇沅"
                            },
                            {
                                "t3name": "景谷"
                            },
                            {
                                "t3name": "景东"
                            },
                            {
                                "t3name": "墨江"
                            },
                            {
                                "t3name": "普洱"
                            },
                            {
                                "t3name": "翠云"
                            },
                            {
                                "t3name": "江城"
                            },
                            {
                                "t3name": "孟连"
                            },
                            {
                                "t3name": "澜沧"
                            },
                            {
                                "t3name": "西盟"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "黑龙江省",
                "t2": [
                    {
                        "t2name": "鹤岗市",
                        "t3": [
                            {
                                "t3name": "向阳区"
                            },
                            {
                                "t3name": "工农区"
                            },
                            {
                                "t3name": "东山区"
                            },
                            {
                                "t3name": "兴山区"
                            },
                            {
                                "t3name": "南山区"
                            },
                            {
                                "t3name": "兴安区"
                            },
                            {
                                "t3name": "萝北县"
                            },
                            {
                                "t3name": "绥滨县"
                            }
                        ]
                    },
                    {
                        "t2name": "大兴安岭",
                        "t3": [
                            {
                                "t3name": "呼玛县"
                            },
                            {
                                "t3name": "漠河县"
                            },
                            {
                                "t3name": "塔河县"
                            }
                        ]
                    },
                    {
                        "t2name": "大庆市",
                        "t3": [
                            {
                                "t3name": "萨尔图区"
                            },
                            {
                                "t3name": "龙凤区"
                            },
                            {
                                "t3name": "杜尔伯特蒙古族自治县"
                            },
                            {
                                "t3name": "林甸县"
                            },
                            {
                                "t3name": "肇源县"
                            },
                            {
                                "t3name": "肇州县"
                            },
                            {
                                "t3name": "大同区"
                            },
                            {
                                "t3name": "红岗区"
                            },
                            {
                                "t3name": "让胡路区"
                            }
                        ]
                    },
                    {
                        "t2name": "七台河市",
                        "t3": [
                            {
                                "t3name": "勃利县"
                            },
                            {
                                "t3name": "新兴区"
                            },
                            {
                                "t3name": "桃山区"
                            },
                            {
                                "t3name": "茄子河区"
                            }
                        ]
                    },
                    {
                        "t2name": "齐齐哈尔",
                        "t3": [
                            {
                                "t3name": "富裕县"
                            },
                            {
                                "t3name": "克山县"
                            },
                            {
                                "t3name": "铁锋区"
                            },
                            {
                                "t3name": "建华区"
                            },
                            {
                                "t3name": "龙沙区"
                            },
                            {
                                "t3name": "依安县"
                            },
                            {
                                "t3name": "泰来县"
                            },
                            {
                                "t3name": "甘南县"
                            },
                            {
                                "t3name": "昂昂溪区"
                            },
                            {
                                "t3name": "富拉尔基区"
                            },
                            {
                                "t3name": "碾子山区"
                            },
                            {
                                "t3name": "梅里斯达斡尔族区"
                            },
                            {
                                "t3name": "龙江县"
                            },
                            {
                                "t3name": "拜泉县"
                            },
                            {
                                "t3name": "克东县"
                            },
                            {
                                "t3name": "讷河市"
                            }
                        ]
                    },
                    {
                        "t2name": "牡丹江市",
                        "t3": [
                            {
                                "t3name": "东宁县"
                            },
                            {
                                "t3name": "西安区"
                            },
                            {
                                "t3name": "爱民区"
                            },
                            {
                                "t3name": "阳明区"
                            },
                            {
                                "t3name": "宁安市"
                            },
                            {
                                "t3name": "海林市"
                            },
                            {
                                "t3name": "绥芬河市"
                            },
                            {
                                "t3name": "林口县"
                            },
                            {
                                "t3name": "东安区"
                            },
                            {
                                "t3name": "穆棱市"
                            }
                        ]
                    },
                    {
                        "t2name": "黑河市",
                        "t3": [
                            {
                                "t3name": "孙吴县"
                            },
                            {
                                "t3name": "北安市"
                            },
                            {
                                "t3name": "爱辉区"
                            },
                            {
                                "t3name": "逊克县"
                            },
                            {
                                "t3name": "五大连池市"
                            },
                            {
                                "t3name": "嫩江县"
                            }
                        ]
                    },
                    {
                        "t2name": "双鸭山市",
                        "t3": [
                            {
                                "t3name": "集贤县"
                            },
                            {
                                "t3name": "友谊县"
                            },
                            {
                                "t3name": "宝清县"
                            },
                            {
                                "t3name": "饶河县"
                            },
                            {
                                "t3name": "尖山区"
                            },
                            {
                                "t3name": "岭东区"
                            },
                            {
                                "t3name": "四方台区"
                            },
                            {
                                "t3name": "宝山区"
                            }
                        ]
                    },
                    {
                        "t2name": "绥化市",
                        "t3": [
                            {
                                "t3name": "海伦市"
                            },
                            {
                                "t3name": "青冈县"
                            },
                            {
                                "t3name": "庆安县"
                            },
                            {
                                "t3name": "绥棱县"
                            },
                            {
                                "t3name": "明水县"
                            },
                            {
                                "t3name": "肇东市"
                            },
                            {
                                "t3name": "安达市"
                            },
                            {
                                "t3name": "望奎县"
                            },
                            {
                                "t3name": "兰西县"
                            },
                            {
                                "t3name": "北林区"
                            }
                        ]
                    },
                    {
                        "t2name": "伊春市",
                        "t3": [
                            {
                                "t3name": "上甘岭区"
                            },
                            {
                                "t3name": "友好区"
                            },
                            {
                                "t3name": "南岔区"
                            },
                            {
                                "t3name": "伊春区"
                            },
                            {
                                "t3name": "嘉荫县"
                            },
                            {
                                "t3name": "铁力市"
                            },
                            {
                                "t3name": "红星区"
                            },
                            {
                                "t3name": "乌马河区"
                            },
                            {
                                "t3name": "汤旺河区"
                            },
                            {
                                "t3name": "金山屯区"
                            },
                            {
                                "t3name": "五营区"
                            },
                            {
                                "t3name": "新青区"
                            },
                            {
                                "t3name": "美溪区"
                            },
                            {
                                "t3name": "西林区"
                            },
                            {
                                "t3name": "翠峦区"
                            },
                            {
                                "t3name": "带岭区"
                            },
                            {
                                "t3name": "乌伊岭区"
                            }
                        ]
                    },
                    {
                        "t2name": "佳木斯市",
                        "t3": [
                            {
                                "t3name": "桦川县"
                            },
                            {
                                "t3name": "汤原县"
                            },
                            {
                                "t3name": "抚远县"
                            },
                            {
                                "t3name": "同江市"
                            },
                            {
                                "t3name": "富锦市"
                            },
                            {
                                "t3name": "向阳区"
                            },
                            {
                                "t3name": "永红区"
                            },
                            {
                                "t3name": "东风区"
                            },
                            {
                                "t3name": "前进区"
                            },
                            {
                                "t3name": "桦南县"
                            },
                            {
                                "t3name": "郊区"
                            }
                        ]
                    },
                    {
                        "t2name": "哈尔滨市",
                        "t3": [
                            {
                                "t3name": "五常市"
                            },
                            {
                                "t3name": "尚志市"
                            },
                            {
                                "t3name": "双城市"
                            },
                            {
                                "t3name": "阿城市"
                            },
                            {
                                "t3name": "延寿县"
                            },
                            {
                                "t3name": "通河县"
                            },
                            {
                                "t3name": "木兰县"
                            },
                            {
                                "t3name": "依兰县"
                            },
                            {
                                "t3name": "方正县"
                            },
                            {
                                "t3name": "松北区"
                            },
                            {
                                "t3name": "呼兰区"
                            },
                            {
                                "t3name": "动力区"
                            },
                            {
                                "t3name": "平房区"
                            },
                            {
                                "t3name": "道外区"
                            },
                            {
                                "t3name": "香坊区"
                            },
                            {
                                "t3name": "南岗区"
                            },
                            {
                                "t3name": "道里区"
                            },
                            {
                                "t3name": "宾县"
                            },
                            {
                                "t3name": "巴彦县"
                            }
                        ]
                    },
                    {
                        "t2name": "鸡西市",
                        "t3": [
                            {
                                "t3name": "虎林市"
                            },
                            {
                                "t3name": "密山市"
                            },
                            {
                                "t3name": "鸡东县"
                            },
                            {
                                "t3name": "麻山区"
                            },
                            {
                                "t3name": "滴道区"
                            },
                            {
                                "t3name": "恒山区"
                            },
                            {
                                "t3name": "城子河区"
                            },
                            {
                                "t3name": "梨树区"
                            },
                            {
                                "t3name": "鸡冠区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "吉林省",
                "t2": [
                    {
                        "t2name": "松原市",
                        "t3": [
                            {
                                "t3name": "宁江区"
                            },
                            {
                                "t3name": "前郭尔罗斯蒙古族自治县"
                            },
                            {
                                "t3name": "长岭县"
                            },
                            {
                                "t3name": "乾安县"
                            },
                            {
                                "t3name": "扶余县"
                            }
                        ]
                    },
                    {
                        "t2name": "四平市",
                        "t3": [
                            {
                                "t3name": "铁西区"
                            },
                            {
                                "t3name": "双辽市"
                            },
                            {
                                "t3name": "伊通满族自治县"
                            },
                            {
                                "t3name": "公主岭市"
                            },
                            {
                                "t3name": "梨树县"
                            },
                            {
                                "t3name": "铁东区"
                            }
                        ]
                    },
                    {
                        "t2name": "白城市",
                        "t3": [
                            {
                                "t3name": "洮南市"
                            },
                            {
                                "t3name": "大安市"
                            },
                            {
                                "t3name": "洮北区"
                            },
                            {
                                "t3name": "镇赉县"
                            },
                            {
                                "t3name": "通榆县"
                            }
                        ]
                    },
                    {
                        "t2name": "白山市",
                        "t3": [
                            {
                                "t3name": "长白朝鲜族自治县"
                            },
                            {
                                "t3name": "靖宇县"
                            },
                            {
                                "t3name": "抚松县"
                            },
                            {
                                "t3name": "八道江区"
                            },
                            {
                                "t3name": "临江市"
                            },
                            {
                                "t3name": "江源县"
                            }
                        ]
                    },
                    {
                        "t2name": "吉林市",
                        "t3": [
                            {
                                "t3name": "舒兰市"
                            },
                            {
                                "t3name": "桦甸市"
                            },
                            {
                                "t3name": "磐石市"
                            },
                            {
                                "t3name": "丰满区"
                            },
                            {
                                "t3name": "船营区"
                            },
                            {
                                "t3name": "蛟河市"
                            },
                            {
                                "t3name": "永吉县"
                            },
                            {
                                "t3name": "龙潭区"
                            },
                            {
                                "t3name": "昌邑区"
                            }
                        ]
                    },
                    {
                        "t2name": "通化市",
                        "t3": [
                            {
                                "t3name": "集安市"
                            },
                            {
                                "t3name": "梅河口市"
                            },
                            {
                                "t3name": "二道江区"
                            },
                            {
                                "t3name": "辉南县"
                            },
                            {
                                "t3name": "东昌区"
                            },
                            {
                                "t3name": "通化县"
                            },
                            {
                                "t3name": "柳河县"
                            }
                        ]
                    },
                    {
                        "t2name": "长春市",
                        "t3": [
                            {
                                "t3name": "二道区"
                            },
                            {
                                "t3name": "朝阳区"
                            },
                            {
                                "t3name": "双阳区"
                            },
                            {
                                "t3name": "绿园区"
                            },
                            {
                                "t3name": "九台市"
                            },
                            {
                                "t3name": "农安县"
                            },
                            {
                                "t3name": "德惠市"
                            },
                            {
                                "t3name": "榆树市"
                            },
                            {
                                "t3name": "南关区"
                            },
                            {
                                "t3name": "宽城区"
                            }
                        ]
                    },
                    {
                        "t2name": "延边朝鲜",
                        "t3": [
                            {
                                "t3name": "图们市"
                            },
                            {
                                "t3name": "延吉市"
                            },
                            {
                                "t3name": "珲春市"
                            },
                            {
                                "t3name": "敦化市"
                            },
                            {
                                "t3name": "和龙市"
                            },
                            {
                                "t3name": "龙井市"
                            },
                            {
                                "t3name": "安图县"
                            },
                            {
                                "t3name": "汪清县"
                            }
                        ]
                    },
                    {
                        "t2name": "辽源市",
                        "t3": [
                            {
                                "t3name": "龙山区"
                            },
                            {
                                "t3name": "东辽县"
                            },
                            {
                                "t3name": "西安区"
                            },
                            {
                                "t3name": "东丰县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "辽宁省",
                "t2": [
                    {
                        "t2name": "铁岭市",
                        "t3": [
                            {
                                "t3name": "银州区"
                            },
                            {
                                "t3name": "清河区"
                            },
                            {
                                "t3name": "调兵山市"
                            },
                            {
                                "t3name": "昌图县"
                            },
                            {
                                "t3name": "西丰县"
                            },
                            {
                                "t3name": "铁岭县"
                            },
                            {
                                "t3name": "开原市"
                            }
                        ]
                    },
                    {
                        "t2name": "葫芦岛市",
                        "t3": [
                            {
                                "t3name": "建昌县"
                            },
                            {
                                "t3name": "兴城市"
                            },
                            {
                                "t3name": "南票区"
                            },
                            {
                                "t3name": "绥中县"
                            },
                            {
                                "t3name": "连山区"
                            },
                            {
                                "t3name": "龙港区"
                            }
                        ]
                    },
                    {
                        "t2name": "营口市",
                        "t3": [
                            {
                                "t3name": "鲅鱼圈区"
                            },
                            {
                                "t3name": "老边区"
                            },
                            {
                                "t3name": "站前区"
                            },
                            {
                                "t3name": "西市区"
                            },
                            {
                                "t3name": "盖州市"
                            },
                            {
                                "t3name": "大石桥市"
                            }
                        ]
                    },
                    {
                        "t2name": "本溪市",
                        "t3": [
                            {
                                "t3name": "平山区"
                            },
                            {
                                "t3name": "溪湖区"
                            },
                            {
                                "t3name": "明山区"
                            },
                            {
                                "t3name": "桓仁满族自治县"
                            },
                            {
                                "t3name": "南芬区"
                            },
                            {
                                "t3name": "本溪满族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "辽阳市",
                        "t3": [
                            {
                                "t3name": "宏伟区"
                            },
                            {
                                "t3name": "文圣区"
                            },
                            {
                                "t3name": "弓长岭区"
                            },
                            {
                                "t3name": "太子河区"
                            },
                            {
                                "t3name": "白塔区"
                            },
                            {
                                "t3name": "灯塔市"
                            },
                            {
                                "t3name": "辽阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "盘锦市",
                        "t3": [
                            {
                                "t3name": "双台子区"
                            },
                            {
                                "t3name": "兴隆台区"
                            },
                            {
                                "t3name": "大洼县"
                            },
                            {
                                "t3name": "盘山县"
                            }
                        ]
                    },
                    {
                        "t2name": "阜新市",
                        "t3": [
                            {
                                "t3name": "阜新蒙古族自治县"
                            },
                            {
                                "t3name": "细河区"
                            },
                            {
                                "t3name": "彰武县"
                            },
                            {
                                "t3name": "新邱区"
                            },
                            {
                                "t3name": "海州区"
                            },
                            {
                                "t3name": "清河门区"
                            },
                            {
                                "t3name": "太平区"
                            }
                        ]
                    },
                    {
                        "t2name": "朝阳市",
                        "t3": [
                            {
                                "t3name": "喀喇沁左翼蒙古族自治县"
                            },
                            {
                                "t3name": "建平县"
                            },
                            {
                                "t3name": "北票市"
                            },
                            {
                                "t3name": "凌源市"
                            },
                            {
                                "t3name": "朝阳县"
                            },
                            {
                                "t3name": "龙城区"
                            },
                            {
                                "t3name": "双塔区"
                            }
                        ]
                    },
                    {
                        "t2name": "锦州市",
                        "t3": [
                            {
                                "t3name": "凌海市"
                            },
                            {
                                "t3name": "古塔区"
                            },
                            {
                                "t3name": "北镇市"
                            },
                            {
                                "t3name": "黑山县"
                            },
                            {
                                "t3name": "义县"
                            },
                            {
                                "t3name": "太和区"
                            },
                            {
                                "t3name": "凌河区"
                            }
                        ]
                    },
                    {
                        "t2name": "抚顺市",
                        "t3": [
                            {
                                "t3name": "清原满族自治县"
                            },
                            {
                                "t3name": "东洲区"
                            },
                            {
                                "t3name": "新抚区"
                            },
                            {
                                "t3name": "望花区"
                            },
                            {
                                "t3name": "顺城区"
                            },
                            {
                                "t3name": "抚顺县"
                            },
                            {
                                "t3name": "新宾满族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "丹东市",
                        "t3": [
                            {
                                "t3name": "凤城市"
                            },
                            {
                                "t3name": "东港市"
                            },
                            {
                                "t3name": "宽甸满族自治县"
                            },
                            {
                                "t3name": "振安区"
                            },
                            {
                                "t3name": "振兴区"
                            },
                            {
                                "t3name": "元宝区"
                            }
                        ]
                    },
                    {
                        "t2name": "沈阳市",
                        "t3": [
                            {
                                "t3name": "新民市"
                            },
                            {
                                "t3name": "康平县"
                            },
                            {
                                "t3name": "法库县"
                            },
                            {
                                "t3name": "沈河区"
                            },
                            {
                                "t3name": "和平区"
                            },
                            {
                                "t3name": "东陵区"
                            },
                            {
                                "t3name": "新城子区"
                            },
                            {
                                "t3name": "于洪区"
                            },
                            {
                                "t3name": "辽中县"
                            },
                            {
                                "t3name": "大东区"
                            },
                            {
                                "t3name": "皇姑区"
                            },
                            {
                                "t3name": "铁西区"
                            },
                            {
                                "t3name": "苏家屯区"
                            }
                        ]
                    },
                    {
                        "t2name": "鞍山市",
                        "t3": [
                            {
                                "t3name": "铁东区"
                            },
                            {
                                "t3name": "立山区"
                            },
                            {
                                "t3name": "铁西区"
                            },
                            {
                                "t3name": "台安县"
                            },
                            {
                                "t3name": "千山区"
                            },
                            {
                                "t3name": "海城市"
                            },
                            {
                                "t3name": "岫岩满族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "大连市",
                        "t3": [
                            {
                                "t3name": "庄河市"
                            },
                            {
                                "t3name": "瓦房店市"
                            },
                            {
                                "t3name": "普兰店市"
                            },
                            {
                                "t3name": "金州区"
                            },
                            {
                                "t3name": "长海县"
                            },
                            {
                                "t3name": "甘井子区"
                            },
                            {
                                "t3name": "旅顺口区"
                            },
                            {
                                "t3name": "西岗区"
                            },
                            {
                                "t3name": "沙河口区"
                            },
                            {
                                "t3name": "中山区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "海南省",
                "t2": [
                    {
                        "t2name": "保亭县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "澄迈县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南沙群岛",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "陵水黎族",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "中沙群岛",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "屯昌县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "昌江黎族",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "乐东黎族",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "琼海市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "儋州市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "文昌市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "万宁市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "白沙黎族",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "海口市",
                        "t3": [
                            {
                                "t3name": "琼山区"
                            },
                            {
                                "t3name": "龙华区"
                            },
                            {
                                "t3name": "秀英区"
                            },
                            {
                                "t3name": "美兰区"
                            }
                        ]
                    },
                    {
                        "t2name": "三亚市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "五指山市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "琼中县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "东方市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "定安县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "西沙群岛",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "临高县",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "湖南省",
                "t2": [
                    {
                        "t2name": "郴州市",
                        "t3": [
                            {
                                "t3name": "北湖区"
                            },
                            {
                                "t3name": "安仁县"
                            },
                            {
                                "t3name": "资兴市"
                            },
                            {
                                "t3name": "嘉禾县"
                            },
                            {
                                "t3name": "临武县"
                            },
                            {
                                "t3name": "汝城县"
                            },
                            {
                                "t3name": "桂东县"
                            },
                            {
                                "t3name": "苏仙区"
                            },
                            {
                                "t3name": "桂阳县"
                            },
                            {
                                "t3name": "宜章县"
                            },
                            {
                                "t3name": "永兴县"
                            }
                        ]
                    },
                    {
                        "t2name": "岳阳市",
                        "t3": [
                            {
                                "t3name": "君山区"
                            },
                            {
                                "t3name": "云溪区"
                            },
                            {
                                "t3name": "岳阳楼区"
                            },
                            {
                                "t3name": "平江县"
                            },
                            {
                                "t3name": "湘阴县"
                            },
                            {
                                "t3name": "华容县"
                            },
                            {
                                "t3name": "岳阳县"
                            },
                            {
                                "t3name": "临湘市"
                            },
                            {
                                "t3name": "汨罗市"
                            }
                        ]
                    },
                    {
                        "t2name": "怀化市",
                        "t3": [
                            {
                                "t3name": "通道侗族自治县"
                            },
                            {
                                "t3name": "靖州苗族侗族自治县"
                            },
                            {
                                "t3name": "洪江市"
                            },
                            {
                                "t3name": "新晃侗族自治县"
                            },
                            {
                                "t3name": "芷江侗族自治县"
                            },
                            {
                                "t3name": "中方县"
                            },
                            {
                                "t3name": "沅陵县"
                            },
                            {
                                "t3name": "鹤城区"
                            },
                            {
                                "t3name": "会同县"
                            },
                            {
                                "t3name": "麻阳苗族自治县"
                            },
                            {
                                "t3name": "辰溪县"
                            },
                            {
                                "t3name": "溆浦县"
                            }
                        ]
                    },
                    {
                        "t2name": "娄底市",
                        "t3": [
                            {
                                "t3name": "新化县"
                            },
                            {
                                "t3name": "双峰县"
                            },
                            {
                                "t3name": "涟源市"
                            },
                            {
                                "t3name": "冷水江市"
                            },
                            {
                                "t3name": "娄星区"
                            }
                        ]
                    },
                    {
                        "t2name": "张家界市",
                        "t3": [
                            {
                                "t3name": "慈利县"
                            },
                            {
                                "t3name": "武陵源区"
                            },
                            {
                                "t3name": "桑植县"
                            },
                            {
                                "t3name": "永定区"
                            }
                        ]
                    },
                    {
                        "t2name": "益阳市",
                        "t3": [
                            {
                                "t3name": "沅江市"
                            },
                            {
                                "t3name": "资阳区"
                            },
                            {
                                "t3name": "南县"
                            },
                            {
                                "t3name": "赫山区"
                            },
                            {
                                "t3name": "安化县"
                            },
                            {
                                "t3name": "桃江县"
                            }
                        ]
                    },
                    {
                        "t2name": "湘西土家",
                        "t3": [
                            {
                                "t3name": "凤凰县"
                            },
                            {
                                "t3name": "花垣县"
                            },
                            {
                                "t3name": "保靖县"
                            },
                            {
                                "t3name": "古丈县"
                            },
                            {
                                "t3name": "泸溪县"
                            },
                            {
                                "t3name": "吉首市"
                            },
                            {
                                "t3name": "龙山县"
                            },
                            {
                                "t3name": "永顺县"
                            }
                        ]
                    },
                    {
                        "t2name": "常德市",
                        "t3": [
                            {
                                "t3name": "津市市"
                            },
                            {
                                "t3name": "桃源县"
                            },
                            {
                                "t3name": "石门县"
                            },
                            {
                                "t3name": "澧县"
                            },
                            {
                                "t3name": "临澧县"
                            },
                            {
                                "t3name": "安乡县"
                            },
                            {
                                "t3name": "汉寿县"
                            },
                            {
                                "t3name": "武陵区"
                            },
                            {
                                "t3name": "鼎城区"
                            }
                        ]
                    },
                    {
                        "t2name": "湘潭市",
                        "t3": [
                            {
                                "t3name": "岳塘区"
                            },
                            {
                                "t3name": "雨湖区"
                            },
                            {
                                "t3name": "湘乡市"
                            },
                            {
                                "t3name": "湘潭县"
                            },
                            {
                                "t3name": "韶山市"
                            }
                        ]
                    },
                    {
                        "t2name": "永州市",
                        "t3": [
                            {
                                "t3name": "江华瑶族自治县"
                            },
                            {
                                "t3name": "新田县"
                            },
                            {
                                "t3name": "蓝山县"
                            },
                            {
                                "t3name": "宁远县"
                            },
                            {
                                "t3name": "江永县"
                            },
                            {
                                "t3name": "道县"
                            },
                            {
                                "t3name": "双牌县"
                            },
                            {
                                "t3name": "东安县"
                            },
                            {
                                "t3name": "祁阳县"
                            },
                            {
                                "t3name": "冷水滩区"
                            },
                            {
                                "t3name": "零陵区"
                            }
                        ]
                    },
                    {
                        "t2name": "衡阳市",
                        "t3": [
                            {
                                "t3name": "珠晖区"
                            },
                            {
                                "t3name": "祁东县"
                            },
                            {
                                "t3name": "耒阳市"
                            },
                            {
                                "t3name": "衡山县"
                            },
                            {
                                "t3name": "衡东县"
                            },
                            {
                                "t3name": "衡阳县"
                            },
                            {
                                "t3name": "衡南县"
                            },
                            {
                                "t3name": "蒸湘区"
                            },
                            {
                                "t3name": "南岳区"
                            },
                            {
                                "t3name": "石鼓区"
                            },
                            {
                                "t3name": "雁峰区"
                            },
                            {
                                "t3name": "常宁市"
                            }
                        ]
                    },
                    {
                        "t2name": "株洲市",
                        "t3": [
                            {
                                "t3name": "醴陵市"
                            },
                            {
                                "t3name": "炎陵县"
                            },
                            {
                                "t3name": "攸县"
                            },
                            {
                                "t3name": "茶陵县"
                            },
                            {
                                "t3name": "芦淞区"
                            },
                            {
                                "t3name": "石峰区"
                            },
                            {
                                "t3name": "天元区"
                            },
                            {
                                "t3name": "株洲县"
                            },
                            {
                                "t3name": "荷塘区"
                            }
                        ]
                    },
                    {
                        "t2name": "长沙市",
                        "t3": [
                            {
                                "t3name": "长沙县"
                            },
                            {
                                "t3name": "雨花区"
                            },
                            {
                                "t3name": "开福区"
                            },
                            {
                                "t3name": "岳麓区"
                            },
                            {
                                "t3name": "天心区"
                            },
                            {
                                "t3name": "芙蓉区"
                            },
                            {
                                "t3name": "望城县"
                            },
                            {
                                "t3name": "宁乡县"
                            },
                            {
                                "t3name": "浏阳市"
                            }
                        ]
                    },
                    {
                        "t2name": "邵阳市",
                        "t3": [
                            {
                                "t3name": "大祥区"
                            },
                            {
                                "t3name": "北塔区"
                            },
                            {
                                "t3name": "邵东县"
                            },
                            {
                                "t3name": "新邵县"
                            },
                            {
                                "t3name": "邵阳县"
                            },
                            {
                                "t3name": "隆回县"
                            },
                            {
                                "t3name": "洞口县"
                            },
                            {
                                "t3name": "绥宁县"
                            },
                            {
                                "t3name": "新宁县"
                            },
                            {
                                "t3name": "城步苗族自治县"
                            },
                            {
                                "t3name": "武冈市"
                            },
                            {
                                "t3name": "双清区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "河南省",
                "t2": [
                    {
                        "t2name": "南阳市",
                        "t3": [
                            {
                                "t3name": "桐柏县"
                            },
                            {
                                "t3name": "新野县"
                            },
                            {
                                "t3name": "唐河县"
                            },
                            {
                                "t3name": "社旗县"
                            },
                            {
                                "t3name": "邓州市"
                            },
                            {
                                "t3name": "镇平县"
                            },
                            {
                                "t3name": "西峡县"
                            },
                            {
                                "t3name": "淅川县"
                            },
                            {
                                "t3name": "内乡县"
                            },
                            {
                                "t3name": "卧龙区"
                            },
                            {
                                "t3name": "宛城区"
                            },
                            {
                                "t3name": "方城县"
                            },
                            {
                                "t3name": "南召县"
                            }
                        ]
                    },
                    {
                        "t2name": "洛阳市",
                        "t3": [
                            {
                                "t3name": "宜阳县"
                            },
                            {
                                "t3name": "洛宁县"
                            },
                            {
                                "t3name": "嵩县"
                            },
                            {
                                "t3name": "汝阳县"
                            },
                            {
                                "t3name": "老城区"
                            },
                            {
                                "t3name": "廛河回族区"
                            },
                            {
                                "t3name": "洛龙区"
                            },
                            {
                                "t3name": "西工区"
                            },
                            {
                                "t3name": "吉利区"
                            },
                            {
                                "t3name": "涧西区"
                            },
                            {
                                "t3name": "孟津县"
                            },
                            {
                                "t3name": "伊川县"
                            },
                            {
                                "t3name": "偃师市"
                            },
                            {
                                "t3name": "新安县"
                            },
                            {
                                "t3name": "栾川县"
                            }
                        ]
                    },
                    {
                        "t2name": "三门峡市",
                        "t3": [
                            {
                                "t3name": "陕县"
                            },
                            {
                                "t3name": "卢氏县"
                            },
                            {
                                "t3name": "湖滨区"
                            },
                            {
                                "t3name": "渑池县"
                            },
                            {
                                "t3name": "义马市"
                            },
                            {
                                "t3name": "灵宝市"
                            }
                        ]
                    },
                    {
                        "t2name": "商丘市",
                        "t3": [
                            {
                                "t3name": "夏邑县"
                            },
                            {
                                "t3name": "睢阳区"
                            },
                            {
                                "t3name": "民权县"
                            },
                            {
                                "t3name": "睢县"
                            },
                            {
                                "t3name": "宁陵县"
                            },
                            {
                                "t3name": "永城市"
                            },
                            {
                                "t3name": "梁园区"
                            },
                            {
                                "t3name": "柘城县"
                            },
                            {
                                "t3name": "虞城县"
                            }
                        ]
                    },
                    {
                        "t2name": "焦作市",
                        "t3": [
                            {
                                "t3name": "温县"
                            },
                            {
                                "t3name": "武陟县"
                            },
                            {
                                "t3name": "博爱县"
                            },
                            {
                                "t3name": "修武县"
                            },
                            {
                                "t3name": "解放区"
                            },
                            {
                                "t3name": "中站区"
                            },
                            {
                                "t3name": "沁阳市"
                            },
                            {
                                "t3name": "济源市"
                            },
                            {
                                "t3name": "马村区"
                            },
                            {
                                "t3name": "山阳区"
                            },
                            {
                                "t3name": "孟州市"
                            }
                        ]
                    },
                    {
                        "t2name": "开封市",
                        "t3": [
                            {
                                "t3name": "通许县"
                            },
                            {
                                "t3name": "杞县"
                            },
                            {
                                "t3name": "开封县"
                            },
                            {
                                "t3name": "尉氏县"
                            },
                            {
                                "t3name": "兰考县"
                            },
                            {
                                "t3name": "禹王台区"
                            },
                            {
                                "t3name": "金明区"
                            },
                            {
                                "t3name": "龙亭区"
                            },
                            {
                                "t3name": "顺河回族区"
                            },
                            {
                                "t3name": "鼓楼区"
                            }
                        ]
                    },
                    {
                        "t2name": "驻马店市",
                        "t3": [
                            {
                                "t3name": "西平县"
                            },
                            {
                                "t3name": "驿城区"
                            },
                            {
                                "t3name": "平舆县"
                            },
                            {
                                "t3name": "上蔡县"
                            },
                            {
                                "t3name": "确山县"
                            },
                            {
                                "t3name": "正阳县"
                            },
                            {
                                "t3name": "汝南县"
                            },
                            {
                                "t3name": "泌阳县"
                            },
                            {
                                "t3name": "遂平县"
                            },
                            {
                                "t3name": "新蔡县"
                            }
                        ]
                    },
                    {
                        "t2name": "濮阳市",
                        "t3": [
                            {
                                "t3name": "范县"
                            },
                            {
                                "t3name": "台前县"
                            },
                            {
                                "t3name": "濮阳县"
                            },
                            {
                                "t3name": "华龙区"
                            },
                            {
                                "t3name": "南乐县"
                            },
                            {
                                "t3name": "清丰县"
                            }
                        ]
                    },
                    {
                        "t2name": "许昌市",
                        "t3": [
                            {
                                "t3name": "魏都区"
                            },
                            {
                                "t3name": "许昌县"
                            },
                            {
                                "t3name": "鄢陵县"
                            },
                            {
                                "t3name": "襄城县"
                            },
                            {
                                "t3name": "禹州市"
                            },
                            {
                                "t3name": "长葛市"
                            }
                        ]
                    },
                    {
                        "t2name": "安阳市",
                        "t3": [
                            {
                                "t3name": "安阳县"
                            },
                            {
                                "t3name": "汤阴县"
                            },
                            {
                                "t3name": "滑县"
                            },
                            {
                                "t3name": "内黄县"
                            },
                            {
                                "t3name": "文峰区"
                            },
                            {
                                "t3name": "北关区"
                            },
                            {
                                "t3name": "殷都区"
                            },
                            {
                                "t3name": "龙安区"
                            },
                            {
                                "t3name": "林州市"
                            }
                        ]
                    },
                    {
                        "t2name": "信阳市",
                        "t3": [
                            {
                                "t3name": "淮滨县"
                            },
                            {
                                "t3name": "息县"
                            },
                            {
                                "t3name": "商城县"
                            },
                            {
                                "t3name": "新县"
                            },
                            {
                                "t3name": "光山县"
                            },
                            {
                                "t3name": "罗山县"
                            },
                            {
                                "t3name": "平桥区"
                            },
                            {
                                "t3name": "浉河区"
                            },
                            {
                                "t3name": "潢川县"
                            },
                            {
                                "t3name": "固始县"
                            }
                        ]
                    },
                    {
                        "t2name": "漯河市",
                        "t3": [
                            {
                                "t3name": "舞阳县"
                            },
                            {
                                "t3name": "源汇区"
                            },
                            {
                                "t3name": "郾城区"
                            },
                            {
                                "t3name": "召陵区"
                            },
                            {
                                "t3name": "临颍县"
                            }
                        ]
                    },
                    {
                        "t2name": "平顶山市",
                        "t3": [
                            {
                                "t3name": "郏县"
                            },
                            {
                                "t3name": "鲁山县"
                            },
                            {
                                "t3name": "叶县"
                            },
                            {
                                "t3name": "宝丰县"
                            },
                            {
                                "t3name": "湛河区"
                            },
                            {
                                "t3name": "石龙区"
                            },
                            {
                                "t3name": "卫东区"
                            },
                            {
                                "t3name": "新华区"
                            },
                            {
                                "t3name": "汝州市"
                            },
                            {
                                "t3name": "舞钢市"
                            }
                        ]
                    },
                    {
                        "t2name": "郑州市",
                        "t3": [
                            {
                                "t3name": "登封市"
                            },
                            {
                                "t3name": "巩义市"
                            },
                            {
                                "t3name": "中牟县"
                            },
                            {
                                "t3name": "惠济区"
                            },
                            {
                                "t3name": "中原区"
                            },
                            {
                                "t3name": "荥阳市"
                            },
                            {
                                "t3name": "新密市"
                            },
                            {
                                "t3name": "新郑市"
                            },
                            {
                                "t3name": "上街区"
                            },
                            {
                                "t3name": "金水区"
                            },
                            {
                                "t3name": "管城回族区"
                            },
                            {
                                "t3name": "二七区"
                            }
                        ]
                    },
                    {
                        "t2name": "新乡市",
                        "t3": [
                            {
                                "t3name": "封丘县"
                            },
                            {
                                "t3name": "长垣县"
                            },
                            {
                                "t3name": "原阳县"
                            },
                            {
                                "t3name": "延津县"
                            },
                            {
                                "t3name": "获嘉县"
                            },
                            {
                                "t3name": "新乡县"
                            },
                            {
                                "t3name": "卫辉市"
                            },
                            {
                                "t3name": "辉县市"
                            },
                            {
                                "t3name": "卫滨区"
                            },
                            {
                                "t3name": "红旗区"
                            },
                            {
                                "t3name": "牧野区"
                            },
                            {
                                "t3name": "凤泉区"
                            }
                        ]
                    },
                    {
                        "t2name": "鹤壁市",
                        "t3": [
                            {
                                "t3name": "浚县"
                            },
                            {
                                "t3name": "淇滨区"
                            },
                            {
                                "t3name": "鹤山区"
                            },
                            {
                                "t3name": "淇县"
                            },
                            {
                                "t3name": "山城区"
                            }
                        ]
                    },
                    {
                        "t2name": "周口市",
                        "t3": [
                            {
                                "t3name": "沈丘县"
                            },
                            {
                                "t3name": "郸城县"
                            },
                            {
                                "t3name": "西华县"
                            },
                            {
                                "t3name": "商水县"
                            },
                            {
                                "t3name": "川汇区"
                            },
                            {
                                "t3name": "扶沟县"
                            },
                            {
                                "t3name": "鹿邑县"
                            },
                            {
                                "t3name": "淮阳县"
                            },
                            {
                                "t3name": "太康县"
                            },
                            {
                                "t3name": "项城市"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "贵州省",
                "t2": [
                    {
                        "t2name": "毕节地市",
                        "t3": [
                            {
                                "t3name": "毕节市"
                            },
                            {
                                "t3name": "黔西县"
                            },
                            {
                                "t3name": "大方县"
                            },
                            {
                                "t3name": "纳雍县"
                            },
                            {
                                "t3name": "威宁"
                            },
                            {
                                "t3name": "赫章县"
                            },
                            {
                                "t3name": "织金县"
                            },
                            {
                                "t3name": "金沙县"
                            }
                        ]
                    },
                    {
                        "t2name": "黔南布依",
                        "t3": [
                            {
                                "t3name": "惠水县"
                            },
                            {
                                "t3name": "龙里县"
                            },
                            {
                                "t3name": "都匀市"
                            },
                            {
                                "t3name": "荔波县"
                            },
                            {
                                "t3name": "福泉市"
                            },
                            {
                                "t3name": "瓮安县"
                            },
                            {
                                "t3name": "贵定县"
                            },
                            {
                                "t3name": "平塘县"
                            },
                            {
                                "t3name": "独山县"
                            },
                            {
                                "t3name": "长顺县"
                            },
                            {
                                "t3name": "罗甸县"
                            },
                            {
                                "t3name": "三都"
                            }
                        ]
                    },
                    {
                        "t2name": "六盘水市",
                        "t3": [
                            {
                                "t3name": "钟山区"
                            },
                            {
                                "t3name": "水城县"
                            },
                            {
                                "t3name": "六枝特区"
                            },
                            {
                                "t3name": "盘县"
                            }
                        ]
                    },
                    {
                        "t2name": "黔东南苗",
                        "t3": [
                            {
                                "t3name": "岑巩县"
                            },
                            {
                                "t3name": "天柱县"
                            },
                            {
                                "t3name": "锦屏县"
                            },
                            {
                                "t3name": "黎平县"
                            },
                            {
                                "t3name": "台江县"
                            },
                            {
                                "t3name": "剑河县"
                            },
                            {
                                "t3name": "凯里市"
                            },
                            {
                                "t3name": "黄平县"
                            },
                            {
                                "t3name": "施秉县"
                            },
                            {
                                "t3name": "三穗县"
                            },
                            {
                                "t3name": "镇远县"
                            },
                            {
                                "t3name": "丹寨县"
                            },
                            {
                                "t3name": "雷山县"
                            },
                            {
                                "t3name": "从江县"
                            },
                            {
                                "t3name": "麻江县"
                            },
                            {
                                "t3name": "榕江县"
                            }
                        ]
                    },
                    {
                        "t2name": "贵阳市",
                        "t3": [
                            {
                                "t3name": "清镇市"
                            },
                            {
                                "t3name": "小河区"
                            },
                            {
                                "t3name": "开阳县"
                            },
                            {
                                "t3name": "乌当区"
                            },
                            {
                                "t3name": "白云区"
                            },
                            {
                                "t3name": "云岩区"
                            },
                            {
                                "t3name": "花溪区"
                            },
                            {
                                "t3name": "南明区"
                            },
                            {
                                "t3name": "修文县"
                            },
                            {
                                "t3name": "息烽县"
                            }
                        ]
                    },
                    {
                        "t2name": "遵义市",
                        "t3": [
                            {
                                "t3name": "遵义县"
                            },
                            {
                                "t3name": "汇川区"
                            },
                            {
                                "t3name": "红花岗区"
                            },
                            {
                                "t3name": "仁怀市"
                            },
                            {
                                "t3name": "习水县"
                            },
                            {
                                "t3name": "赤水市"
                            },
                            {
                                "t3name": "务川县"
                            },
                            {
                                "t3name": "凤冈县"
                            },
                            {
                                "t3name": "湄潭县"
                            },
                            {
                                "t3name": "余庆县"
                            },
                            {
                                "t3name": "桐梓县"
                            },
                            {
                                "t3name": "绥阳县"
                            },
                            {
                                "t3name": "正安县"
                            },
                            {
                                "t3name": "道真县"
                            }
                        ]
                    },
                    {
                        "t2name": "铜仁地市",
                        "t3": [
                            {
                                "t3name": "印江"
                            },
                            {
                                "t3name": "玉屏"
                            },
                            {
                                "t3name": "江口县"
                            },
                            {
                                "t3name": "铜仁市"
                            },
                            {
                                "t3name": "德江县"
                            },
                            {
                                "t3name": "石阡县"
                            },
                            {
                                "t3name": "思南县"
                            },
                            {
                                "t3name": "万山特区"
                            },
                            {
                                "t3name": "沿河"
                            },
                            {
                                "t3name": "松桃"
                            }
                        ]
                    },
                    {
                        "t2name": "黔西南布",
                        "t3": [
                            {
                                "t3name": "安龙县"
                            },
                            {
                                "t3name": "贞丰县"
                            },
                            {
                                "t3name": "晴隆县"
                            },
                            {
                                "t3name": "册亨县"
                            },
                            {
                                "t3name": "望谟县"
                            },
                            {
                                "t3name": "兴仁县"
                            },
                            {
                                "t3name": "普安县"
                            },
                            {
                                "t3name": "兴义市"
                            }
                        ]
                    },
                    {
                        "t2name": "安顺市",
                        "t3": [
                            {
                                "t3name": "紫云"
                            },
                            {
                                "t3name": "关岭"
                            },
                            {
                                "t3name": "镇宁"
                            },
                            {
                                "t3name": "普定县"
                            },
                            {
                                "t3name": "平坝县"
                            },
                            {
                                "t3name": "西秀区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "江西省",
                "t2": [
                    {
                        "t2name": "南昌市",
                        "t3": [
                            {
                                "t3name": "东湖区"
                            },
                            {
                                "t3name": "西湖区"
                            },
                            {
                                "t3name": "青云谱区"
                            },
                            {
                                "t3name": "湾里区"
                            },
                            {
                                "t3name": "进贤县"
                            },
                            {
                                "t3name": "安义县"
                            },
                            {
                                "t3name": "新建县"
                            },
                            {
                                "t3name": "青山湖区"
                            },
                            {
                                "t3name": "南昌县"
                            }
                        ]
                    },
                    {
                        "t2name": "萍乡市",
                        "t3": [
                            {
                                "t3name": "安源区"
                            },
                            {
                                "t3name": "芦溪县"
                            },
                            {
                                "t3name": "上栗县"
                            },
                            {
                                "t3name": "莲花县"
                            },
                            {
                                "t3name": "湘东区"
                            }
                        ]
                    },
                    {
                        "t2name": "景德镇市",
                        "t3": [
                            {
                                "t3name": "乐平市"
                            },
                            {
                                "t3name": "浮梁县"
                            },
                            {
                                "t3name": "珠山区"
                            },
                            {
                                "t3name": "昌江区"
                            }
                        ]
                    },
                    {
                        "t2name": "吉安市",
                        "t3": [
                            {
                                "t3name": "安福县"
                            },
                            {
                                "t3name": "万安县"
                            },
                            {
                                "t3name": "遂川县"
                            },
                            {
                                "t3name": "泰和县"
                            },
                            {
                                "t3name": "永丰县"
                            },
                            {
                                "t3name": "新干县"
                            },
                            {
                                "t3name": "峡江县"
                            },
                            {
                                "t3name": "吉水县"
                            },
                            {
                                "t3name": "青原区"
                            },
                            {
                                "t3name": "吉安县"
                            },
                            {
                                "t3name": "井冈山市"
                            },
                            {
                                "t3name": "永新县"
                            },
                            {
                                "t3name": "吉州区"
                            }
                        ]
                    },
                    {
                        "t2name": "九江市",
                        "t3": [
                            {
                                "t3name": "彭泽县"
                            },
                            {
                                "t3name": "德安县"
                            },
                            {
                                "t3name": "星子县"
                            },
                            {
                                "t3name": "修水县"
                            },
                            {
                                "t3name": "永修县"
                            },
                            {
                                "t3name": "九江县"
                            },
                            {
                                "t3name": "武宁县"
                            },
                            {
                                "t3name": "庐山区"
                            },
                            {
                                "t3name": "浔阳区"
                            },
                            {
                                "t3name": "湖口县"
                            },
                            {
                                "t3name": "都昌县"
                            },
                            {
                                "t3name": "瑞昌市"
                            }
                        ]
                    },
                    {
                        "t2name": "新余市",
                        "t3": [
                            {
                                "t3name": "分宜县"
                            },
                            {
                                "t3name": "渝水区"
                            }
                        ]
                    },
                    {
                        "t2name": "鹰潭市",
                        "t3": [
                            {
                                "t3name": "贵溪市"
                            },
                            {
                                "t3name": "余江县"
                            },
                            {
                                "t3name": "月湖区"
                            }
                        ]
                    },
                    {
                        "t2name": "抚州市",
                        "t3": [
                            {
                                "t3name": "广昌县"
                            },
                            {
                                "t3name": "南城县"
                            },
                            {
                                "t3name": "临川区"
                            },
                            {
                                "t3name": "南丰县"
                            },
                            {
                                "t3name": "黎川县"
                            },
                            {
                                "t3name": "乐安县"
                            },
                            {
                                "t3name": "崇仁县"
                            },
                            {
                                "t3name": "金溪县"
                            },
                            {
                                "t3name": "宜黄县"
                            },
                            {
                                "t3name": "东乡县"
                            },
                            {
                                "t3name": "资溪县"
                            }
                        ]
                    },
                    {
                        "t2name": "赣州市",
                        "t3": [
                            {
                                "t3name": "章贡区"
                            },
                            {
                                "t3name": "会昌县"
                            },
                            {
                                "t3name": "于都县"
                            },
                            {
                                "t3name": "兴国县"
                            },
                            {
                                "t3name": "宁都县"
                            },
                            {
                                "t3name": "全南县"
                            },
                            {
                                "t3name": "石城县"
                            },
                            {
                                "t3name": "寻乌县"
                            },
                            {
                                "t3name": "安远县"
                            },
                            {
                                "t3name": "崇义县"
                            },
                            {
                                "t3name": "定南县"
                            },
                            {
                                "t3name": "龙南县"
                            },
                            {
                                "t3name": "信丰县"
                            },
                            {
                                "t3name": "赣县"
                            },
                            {
                                "t3name": "上犹县"
                            },
                            {
                                "t3name": "大余县"
                            },
                            {
                                "t3name": "南康市"
                            },
                            {
                                "t3name": "瑞金市"
                            }
                        ]
                    },
                    {
                        "t2name": "上饶市",
                        "t3": [
                            {
                                "t3name": "德兴市"
                            },
                            {
                                "t3name": "婺源县"
                            },
                            {
                                "t3name": "万年县"
                            },
                            {
                                "t3name": "横峰县"
                            },
                            {
                                "t3name": "弋阳县"
                            },
                            {
                                "t3name": "玉山县"
                            },
                            {
                                "t3name": "铅山县"
                            },
                            {
                                "t3name": "上饶县"
                            },
                            {
                                "t3name": "广丰县"
                            },
                            {
                                "t3name": "信州区"
                            },
                            {
                                "t3name": "余干县"
                            },
                            {
                                "t3name": "鄱阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "宜春市",
                        "t3": [
                            {
                                "t3name": "宜丰县"
                            },
                            {
                                "t3name": "靖安县"
                            },
                            {
                                "t3name": "铜鼓县"
                            },
                            {
                                "t3name": "丰城市"
                            },
                            {
                                "t3name": "袁州区"
                            },
                            {
                                "t3name": "奉新县"
                            },
                            {
                                "t3name": "万载县"
                            },
                            {
                                "t3name": "上高县"
                            },
                            {
                                "t3name": "樟树市"
                            },
                            {
                                "t3name": "高安市"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "广西壮族",
                "t2": [
                    {
                        "t2name": "贺州市",
                        "t3": [
                            {
                                "t3name": "昭平县"
                            },
                            {
                                "t3name": "八步区"
                            },
                            {
                                "t3name": "富川瑶族自治县"
                            },
                            {
                                "t3name": "钟山县"
                            }
                        ]
                    },
                    {
                        "t2name": "梧州市",
                        "t3": [
                            {
                                "t3name": "万秀区"
                            },
                            {
                                "t3name": "蝶山区"
                            },
                            {
                                "t3name": "岑溪市"
                            },
                            {
                                "t3name": "苍梧县"
                            },
                            {
                                "t3name": "长洲区"
                            },
                            {
                                "t3name": "蒙山县"
                            },
                            {
                                "t3name": "藤县"
                            }
                        ]
                    },
                    {
                        "t2name": "河池市",
                        "t3": [
                            {
                                "t3name": "南丹县"
                            },
                            {
                                "t3name": "金城江区"
                            },
                            {
                                "t3name": "凤山县"
                            },
                            {
                                "t3name": "天峨县"
                            },
                            {
                                "t3name": "罗城仫佬族自治县"
                            },
                            {
                                "t3name": "东兰县"
                            },
                            {
                                "t3name": "都安瑶族自治县"
                            },
                            {
                                "t3name": "大化瑶族自治县"
                            },
                            {
                                "t3name": "环江毛南族自治县"
                            },
                            {
                                "t3name": "巴马瑶族自治县"
                            },
                            {
                                "t3name": "宜州市"
                            }
                        ]
                    },
                    {
                        "t2name": "百色市",
                        "t3": [
                            {
                                "t3name": "乐业县"
                            },
                            {
                                "t3name": "田林县"
                            },
                            {
                                "t3name": "那坡县"
                            },
                            {
                                "t3name": "凌云县"
                            },
                            {
                                "t3name": "德保县"
                            },
                            {
                                "t3name": "靖西县"
                            },
                            {
                                "t3name": "田东县"
                            },
                            {
                                "t3name": "平果县"
                            },
                            {
                                "t3name": "田阳县"
                            },
                            {
                                "t3name": "右江区"
                            },
                            {
                                "t3name": "西林县"
                            },
                            {
                                "t3name": "隆林各族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "来宾市",
                        "t3": [
                            {
                                "t3name": "忻城县"
                            },
                            {
                                "t3name": "象州县"
                            },
                            {
                                "t3name": "兴宾区"
                            },
                            {
                                "t3name": "武宣县"
                            },
                            {
                                "t3name": "金秀瑶族自治县"
                            },
                            {
                                "t3name": "合山市"
                            }
                        ]
                    },
                    {
                        "t2name": "贵港市",
                        "t3": [
                            {
                                "t3name": "港北区"
                            },
                            {
                                "t3name": "港南区"
                            },
                            {
                                "t3name": "覃塘区"
                            },
                            {
                                "t3name": "桂平市"
                            },
                            {
                                "t3name": "平南县"
                            }
                        ]
                    },
                    {
                        "t2name": "玉林市",
                        "t3": [
                            {
                                "t3name": "北流市"
                            },
                            {
                                "t3name": "兴业县"
                            },
                            {
                                "t3name": "博白县"
                            },
                            {
                                "t3name": "陆川县"
                            },
                            {
                                "t3name": "容县"
                            },
                            {
                                "t3name": "玉州区"
                            }
                        ]
                    },
                    {
                        "t2name": "钦州市",
                        "t3": [
                            {
                                "t3name": "钦北区"
                            },
                            {
                                "t3name": "灵山县"
                            },
                            {
                                "t3name": "浦北县"
                            },
                            {
                                "t3name": "钦南区"
                            }
                        ]
                    },
                    {
                        "t2name": "北海市",
                        "t3": [
                            {
                                "t3name": "海城区"
                            },
                            {
                                "t3name": "铁山港区"
                            },
                            {
                                "t3name": "银海区"
                            },
                            {
                                "t3name": "合浦县"
                            }
                        ]
                    },
                    {
                        "t2name": "柳州市",
                        "t3": [
                            {
                                "t3name": "城中区"
                            },
                            {
                                "t3name": "鱼峰区"
                            },
                            {
                                "t3name": "柳南区"
                            },
                            {
                                "t3name": "柳北区"
                            },
                            {
                                "t3name": "柳江县"
                            },
                            {
                                "t3name": "柳城县"
                            },
                            {
                                "t3name": "鹿寨县"
                            },
                            {
                                "t3name": "融安县"
                            },
                            {
                                "t3name": "融水苗族自治县"
                            },
                            {
                                "t3name": "三江侗族自治县"
                            }
                        ]
                    },
                    {
                        "t2name": "桂林市",
                        "t3": [
                            {
                                "t3name": "灌阳县"
                            },
                            {
                                "t3name": "龙胜各族自治县"
                            },
                            {
                                "t3name": "兴安县"
                            },
                            {
                                "t3name": "永福县"
                            },
                            {
                                "t3name": "荔蒲县"
                            },
                            {
                                "t3name": "恭城瑶族自治县"
                            },
                            {
                                "t3name": "资源县"
                            },
                            {
                                "t3name": "平乐县"
                            },
                            {
                                "t3name": "象山区"
                            },
                            {
                                "t3name": "叠彩区"
                            },
                            {
                                "t3name": "秀峰区"
                            },
                            {
                                "t3name": "临桂县"
                            },
                            {
                                "t3name": "阳朔县"
                            },
                            {
                                "t3name": "雁山区"
                            },
                            {
                                "t3name": "七星区"
                            },
                            {
                                "t3name": "全州县"
                            },
                            {
                                "t3name": "灵川县"
                            }
                        ]
                    },
                    {
                        "t2name": "南宁市",
                        "t3": [
                            {
                                "t3name": "横县"
                            },
                            {
                                "t3name": "宾阳县"
                            },
                            {
                                "t3name": "上林县"
                            },
                            {
                                "t3name": "兴宁区"
                            },
                            {
                                "t3name": "江南区"
                            },
                            {
                                "t3name": "青秀区"
                            },
                            {
                                "t3name": "良庆区"
                            },
                            {
                                "t3name": "西乡塘区"
                            },
                            {
                                "t3name": "武鸣县"
                            },
                            {
                                "t3name": "邕宁区"
                            },
                            {
                                "t3name": "马山县"
                            },
                            {
                                "t3name": "隆安县"
                            }
                        ]
                    },
                    {
                        "t2name": "防城港市",
                        "t3": [
                            {
                                "t3name": "防城区"
                            },
                            {
                                "t3name": "港口区"
                            },
                            {
                                "t3name": "上思县"
                            },
                            {
                                "t3name": "东兴市"
                            }
                        ]
                    },
                    {
                        "t2name": "崇左市",
                        "t3": [
                            {
                                "t3name": "大新县"
                            },
                            {
                                "t3name": "龙州县"
                            },
                            {
                                "t3name": "凭祥市"
                            },
                            {
                                "t3name": "天等县"
                            },
                            {
                                "t3name": "江洲区"
                            },
                            {
                                "t3name": "宁明县"
                            },
                            {
                                "t3name": "扶绥县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "陕西省",
                "t2": [
                    {
                        "t2name": "咸阳市",
                        "t3": [
                            {
                                "t3name": "杨凌区"
                            },
                            {
                                "t3name": "秦都区"
                            },
                            {
                                "t3name": "旬邑县"
                            },
                            {
                                "t3name": "淳化县"
                            },
                            {
                                "t3name": "乾县"
                            },
                            {
                                "t3name": "泾阳县"
                            },
                            {
                                "t3name": "三原县"
                            },
                            {
                                "t3name": "渭城区"
                            },
                            {
                                "t3name": "永寿县"
                            },
                            {
                                "t3name": "礼泉县"
                            },
                            {
                                "t3name": "武功县"
                            },
                            {
                                "t3name": "长武县"
                            },
                            {
                                "t3name": "彬县"
                            },
                            {
                                "t3name": "兴平市"
                            }
                        ]
                    },
                    {
                        "t2name": "铜川市",
                        "t3": [
                            {
                                "t3name": "印台区"
                            },
                            {
                                "t3name": "王益区"
                            },
                            {
                                "t3name": "宜君县"
                            },
                            {
                                "t3name": "耀州区"
                            }
                        ]
                    },
                    {
                        "t2name": "商洛市",
                        "t3": [
                            {
                                "t3name": "山阳县"
                            },
                            {
                                "t3name": "商南县"
                            },
                            {
                                "t3name": "丹凤县"
                            },
                            {
                                "t3name": "洛南县"
                            },
                            {
                                "t3name": "商州区"
                            },
                            {
                                "t3name": "柞水县"
                            },
                            {
                                "t3name": "镇安县"
                            }
                        ]
                    },
                    {
                        "t2name": "榆林市",
                        "t3": [
                            {
                                "t3name": "横山县"
                            },
                            {
                                "t3name": "靖边县"
                            },
                            {
                                "t3name": "定边县"
                            },
                            {
                                "t3name": "绥德县"
                            },
                            {
                                "t3name": "吴堡县"
                            },
                            {
                                "t3name": "榆阳区"
                            },
                            {
                                "t3name": "神木县"
                            },
                            {
                                "t3name": "府谷县"
                            },
                            {
                                "t3name": "米脂县"
                            },
                            {
                                "t3name": "佳县"
                            },
                            {
                                "t3name": "子洲县"
                            },
                            {
                                "t3name": "清涧县"
                            }
                        ]
                    },
                    {
                        "t2name": "渭南市",
                        "t3": [
                            {
                                "t3name": "临渭区"
                            },
                            {
                                "t3name": "华县"
                            },
                            {
                                "t3name": "潼关县"
                            },
                            {
                                "t3name": "大荔县"
                            },
                            {
                                "t3name": "白水县"
                            },
                            {
                                "t3name": "蒲城县"
                            },
                            {
                                "t3name": "韩城市"
                            },
                            {
                                "t3name": "富平县"
                            },
                            {
                                "t3name": "华阴市"
                            },
                            {
                                "t3name": "澄城县"
                            },
                            {
                                "t3name": "合阳县"
                            }
                        ]
                    },
                    {
                        "t2name": "汉中市",
                        "t3": [
                            {
                                "t3name": "略阳县"
                            },
                            {
                                "t3name": "宁强县"
                            },
                            {
                                "t3name": "勉县"
                            },
                            {
                                "t3name": "西乡县"
                            },
                            {
                                "t3name": "洋县"
                            },
                            {
                                "t3name": "城固县"
                            },
                            {
                                "t3name": "南郑县"
                            },
                            {
                                "t3name": "汉台区"
                            },
                            {
                                "t3name": "留坝县"
                            },
                            {
                                "t3name": "镇巴县"
                            },
                            {
                                "t3name": "佛坪县"
                            }
                        ]
                    },
                    {
                        "t2name": "安康市",
                        "t3": [
                            {
                                "t3name": "汉阴县"
                            },
                            {
                                "t3name": "石泉县"
                            },
                            {
                                "t3name": "宁陕县"
                            },
                            {
                                "t3name": "紫阳县"
                            },
                            {
                                "t3name": "白河县"
                            },
                            {
                                "t3name": "旬阳县"
                            },
                            {
                                "t3name": "汉滨区"
                            },
                            {
                                "t3name": "镇坪县"
                            },
                            {
                                "t3name": "岚皋县"
                            },
                            {
                                "t3name": "平利县"
                            }
                        ]
                    },
                    {
                        "t2name": "延安市",
                        "t3": [
                            {
                                "t3name": "延川县"
                            },
                            {
                                "t3name": "延长县"
                            },
                            {
                                "t3name": "黄龙县"
                            },
                            {
                                "t3name": "黄陵县"
                            },
                            {
                                "t3name": "洛川县"
                            },
                            {
                                "t3name": "宜川县"
                            },
                            {
                                "t3name": "甘泉县"
                            },
                            {
                                "t3name": "富县"
                            },
                            {
                                "t3name": "志丹县"
                            },
                            {
                                "t3name": "吴起县"
                            },
                            {
                                "t3name": "子长县"
                            },
                            {
                                "t3name": "安塞县"
                            },
                            {
                                "t3name": "宝塔区"
                            }
                        ]
                    },
                    {
                        "t2name": "宝鸡市",
                        "t3": [
                            {
                                "t3name": "太白县"
                            },
                            {
                                "t3name": "凤县"
                            },
                            {
                                "t3name": "千阳县"
                            },
                            {
                                "t3name": "麟游县"
                            },
                            {
                                "t3name": "陈仓区"
                            },
                            {
                                "t3name": "凤翔县"
                            },
                            {
                                "t3name": "渭滨区"
                            },
                            {
                                "t3name": "金台区"
                            },
                            {
                                "t3name": "眉县"
                            },
                            {
                                "t3name": "陇县"
                            },
                            {
                                "t3name": "岐山县"
                            },
                            {
                                "t3name": "扶风县"
                            }
                        ]
                    },
                    {
                        "t2name": "西安市",
                        "t3": [
                            {
                                "t3name": "高陵县"
                            },
                            {
                                "t3name": "户县"
                            },
                            {
                                "t3name": "长安区"
                            },
                            {
                                "t3name": "临潼区"
                            },
                            {
                                "t3name": "周至县"
                            },
                            {
                                "t3name": "蓝田县"
                            },
                            {
                                "t3name": "雁塔区"
                            },
                            {
                                "t3name": "阎良区"
                            },
                            {
                                "t3name": "碑林区"
                            },
                            {
                                "t3name": "莲湖区"
                            },
                            {
                                "t3name": "灞桥区"
                            },
                            {
                                "t3name": "未央区"
                            },
                            {
                                "t3name": "新城区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "山西省",
                "t2": [
                    {
                        "t2name": "临汾市",
                        "t3": [
                            {
                                "t3name": "吉县"
                            },
                            {
                                "t3name": "霍州市"
                            },
                            {
                                "t3name": "蒲县"
                            },
                            {
                                "t3name": "侯马市"
                            },
                            {
                                "t3name": "尧都区"
                            },
                            {
                                "t3name": "汾西县"
                            },
                            {
                                "t3name": "翼城县"
                            },
                            {
                                "t3name": "隰县"
                            },
                            {
                                "t3name": "永和县"
                            },
                            {
                                "t3name": "乡宁县"
                            },
                            {
                                "t3name": "大宁县"
                            },
                            {
                                "t3name": "浮山县"
                            },
                            {
                                "t3name": "曲沃县"
                            },
                            {
                                "t3name": "古县"
                            },
                            {
                                "t3name": "安泽县"
                            },
                            {
                                "t3name": "襄汾县"
                            },
                            {
                                "t3name": "洪洞县"
                            }
                        ]
                    },
                    {
                        "t2name": "晋中市",
                        "t3": [
                            {
                                "t3name": "榆次区"
                            },
                            {
                                "t3name": "和顺县"
                            },
                            {
                                "t3name": "昔阳县"
                            },
                            {
                                "t3name": "榆社县"
                            },
                            {
                                "t3name": "左权县"
                            },
                            {
                                "t3name": "祁县"
                            },
                            {
                                "t3name": "平遥县"
                            },
                            {
                                "t3name": "寿阳县"
                            },
                            {
                                "t3name": "太谷县"
                            },
                            {
                                "t3name": "灵石县"
                            },
                            {
                                "t3name": "介休市"
                            }
                        ]
                    },
                    {
                        "t2name": "朔州市",
                        "t3": [
                            {
                                "t3name": "怀仁县"
                            },
                            {
                                "t3name": "朔城区"
                            },
                            {
                                "t3name": "右玉县"
                            },
                            {
                                "t3name": "应县"
                            },
                            {
                                "t3name": "山阴县"
                            },
                            {
                                "t3name": "平鲁区"
                            }
                        ]
                    },
                    {
                        "t2name": "运城市",
                        "t3": [
                            {
                                "t3name": "平陆县"
                            },
                            {
                                "t3name": "夏县"
                            },
                            {
                                "t3name": "新绛县"
                            },
                            {
                                "t3name": "稷山县"
                            },
                            {
                                "t3name": "垣曲县"
                            },
                            {
                                "t3name": "绛县"
                            },
                            {
                                "t3name": "临猗县"
                            },
                            {
                                "t3name": "盐湖区"
                            },
                            {
                                "t3name": "闻喜县"
                            },
                            {
                                "t3name": "万荣县"
                            },
                            {
                                "t3name": "芮城县"
                            },
                            {
                                "t3name": "永济市"
                            },
                            {
                                "t3name": "河津市"
                            }
                        ]
                    },
                    {
                        "t2name": "晋城市",
                        "t3": [
                            {
                                "t3name": "沁水县"
                            },
                            {
                                "t3name": "阳城县"
                            },
                            {
                                "t3name": "高平市"
                            },
                            {
                                "t3name": "泽州县"
                            },
                            {
                                "t3name": "陵川县"
                            },
                            {
                                "t3name": "城区"
                            }
                        ]
                    },
                    {
                        "t2name": "阳泉市",
                        "t3": [
                            {
                                "t3name": "城区"
                            },
                            {
                                "t3name": "平定县"
                            },
                            {
                                "t3name": "盂县"
                            },
                            {
                                "t3name": "矿区"
                            },
                            {
                                "t3name": "郊区"
                            }
                        ]
                    },
                    {
                        "t2name": "忻州市",
                        "t3": [
                            {
                                "t3name": "原平市"
                            },
                            {
                                "t3name": "神池县"
                            },
                            {
                                "t3name": "偏关县"
                            },
                            {
                                "t3name": "保德县"
                            },
                            {
                                "t3name": "定襄县"
                            },
                            {
                                "t3name": "五台县"
                            },
                            {
                                "t3name": "代县"
                            },
                            {
                                "t3name": "繁峙县"
                            },
                            {
                                "t3name": "河曲县"
                            },
                            {
                                "t3name": "岢岚县"
                            },
                            {
                                "t3name": "五寨县"
                            },
                            {
                                "t3name": "忻府区"
                            },
                            {
                                "t3name": "宁武县"
                            },
                            {
                                "t3name": "静乐县"
                            }
                        ]
                    },
                    {
                        "t2name": "大同市",
                        "t3": [
                            {
                                "t3name": "大同县"
                            },
                            {
                                "t3name": "新荣区"
                            },
                            {
                                "t3name": "南郊区"
                            },
                            {
                                "t3name": "城区"
                            },
                            {
                                "t3name": "矿区"
                            },
                            {
                                "t3name": "天镇县"
                            },
                            {
                                "t3name": "阳高县"
                            },
                            {
                                "t3name": "灵丘县"
                            },
                            {
                                "t3name": "广灵县"
                            },
                            {
                                "t3name": "左云县"
                            },
                            {
                                "t3name": "浑源县"
                            }
                        ]
                    },
                    {
                        "t2name": "长治市",
                        "t3": [
                            {
                                "t3name": "黎城县"
                            },
                            {
                                "t3name": "壶关县"
                            },
                            {
                                "t3name": "长子县"
                            },
                            {
                                "t3name": "武乡县"
                            },
                            {
                                "t3name": "沁县"
                            },
                            {
                                "t3name": "沁源县"
                            },
                            {
                                "t3name": "潞城市"
                            },
                            {
                                "t3name": "屯留县"
                            },
                            {
                                "t3name": "平顺县"
                            },
                            {
                                "t3name": "长治县"
                            },
                            {
                                "t3name": "襄垣县"
                            },
                            {
                                "t3name": "城区"
                            },
                            {
                                "t3name": "郊区"
                            }
                        ]
                    },
                    {
                        "t2name": "太原市",
                        "t3": [
                            {
                                "t3name": "杏花岭区"
                            },
                            {
                                "t3name": "尖草坪区"
                            },
                            {
                                "t3name": "万柏林区"
                            },
                            {
                                "t3name": "晋源区"
                            },
                            {
                                "t3name": "清徐县"
                            },
                            {
                                "t3name": "阳曲县"
                            },
                            {
                                "t3name": "娄烦县"
                            },
                            {
                                "t3name": "古交市"
                            },
                            {
                                "t3name": "迎泽区"
                            },
                            {
                                "t3name": "小店区"
                            }
                        ]
                    },
                    {
                        "t2name": "吕梁市",
                        "t3": [
                            {
                                "t3name": "石楼县"
                            },
                            {
                                "t3name": "岚县"
                            },
                            {
                                "t3name": "柳林县"
                            },
                            {
                                "t3name": "临县"
                            },
                            {
                                "t3name": "方山县"
                            },
                            {
                                "t3name": "中阳县"
                            },
                            {
                                "t3name": "交口县"
                            },
                            {
                                "t3name": "孝义市"
                            },
                            {
                                "t3name": "汾阳市"
                            },
                            {
                                "t3name": "文水县"
                            },
                            {
                                "t3name": "离石区"
                            },
                            {
                                "t3name": "兴县"
                            },
                            {
                                "t3name": "交城县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "青海省",
                "t2": [
                    {
                        "t2name": "黄南藏族",
                        "t3": [
                            {
                                "t3name": "河南"
                            },
                            {
                                "t3name": "泽库县"
                            },
                            {
                                "t3name": "尖扎县"
                            },
                            {
                                "t3name": "同仁县"
                            }
                        ]
                    },
                    {
                        "t2name": "海东市",
                        "t3": [
                            {
                                "t3name": "乐都县"
                            },
                            {
                                "t3name": "互助"
                            },
                            {
                                "t3name": "平安县"
                            },
                            {
                                "t3name": "民和"
                            },
                            {
                                "t3name": "化隆"
                            },
                            {
                                "t3name": "循化"
                            }
                        ]
                    },
                    {
                        "t2name": "果洛藏族",
                        "t3": [
                            {
                                "t3name": "班玛县"
                            },
                            {
                                "t3name": "甘德县"
                            },
                            {
                                "t3name": "达日县"
                            },
                            {
                                "t3name": "久治县"
                            },
                            {
                                "t3name": "玛沁县"
                            },
                            {
                                "t3name": "玛多县"
                            }
                        ]
                    },
                    {
                        "t2name": "西宁市",
                        "t3": [
                            {
                                "t3name": "湟中县"
                            },
                            {
                                "t3name": "湟源县"
                            },
                            {
                                "t3name": "城北区"
                            },
                            {
                                "t3name": "大通"
                            },
                            {
                                "t3name": "城西区"
                            },
                            {
                                "t3name": "城中区"
                            },
                            {
                                "t3name": "城东区"
                            }
                        ]
                    },
                    {
                        "t2name": "海北藏族",
                        "t3": [
                            {
                                "t3name": "刚察县"
                            },
                            {
                                "t3name": "海晏县"
                            },
                            {
                                "t3name": "祁连县"
                            },
                            {
                                "t3name": "门源"
                            }
                        ]
                    },
                    {
                        "t2name": "玉树藏族",
                        "t3": [
                            {
                                "t3name": "玉树县"
                            },
                            {
                                "t3name": "称多县"
                            },
                            {
                                "t3name": "杂多县"
                            },
                            {
                                "t3name": "囊谦县"
                            },
                            {
                                "t3name": "治多县"
                            },
                            {
                                "t3name": "曲麻莱县"
                            }
                        ]
                    },
                    {
                        "t2name": "海南藏族",
                        "t3": [
                            {
                                "t3name": "贵南县"
                            },
                            {
                                "t3name": "贵德县"
                            },
                            {
                                "t3name": "兴海县"
                            },
                            {
                                "t3name": "同德县"
                            },
                            {
                                "t3name": "共和县"
                            }
                        ]
                    },
                    {
                        "t2name": "海西蒙古",
                        "t3": [
                            {
                                "t3name": "天峻县"
                            },
                            {
                                "t3name": "都兰县"
                            },
                            {
                                "t3name": "格尔木市"
                            },
                            {
                                "t3name": "乌兰县"
                            },
                            {
                                "t3name": "德令哈市"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "宁夏回族",
                "t2": [
                    {
                        "t2name": "石嘴山市",
                        "t3": [
                            {
                                "t3name": "大武口区"
                            },
                            {
                                "t3name": "惠农区"
                            },
                            {
                                "t3name": "平罗县"
                            }
                        ]
                    },
                    {
                        "t2name": "固原市",
                        "t3": [
                            {
                                "t3name": "原州区"
                            },
                            {
                                "t3name": "彭阳县"
                            },
                            {
                                "t3name": "泾源县"
                            },
                            {
                                "t3name": "隆德县"
                            },
                            {
                                "t3name": "西吉县"
                            }
                        ]
                    },
                    {
                        "t2name": "中卫市",
                        "t3": [
                            {
                                "t3name": "海原县"
                            },
                            {
                                "t3name": "中宁县"
                            },
                            {
                                "t3name": "沙坡头区"
                            }
                        ]
                    },
                    {
                        "t2name": "银川市",
                        "t3": [
                            {
                                "t3name": "贺兰县"
                            },
                            {
                                "t3name": "灵武市"
                            },
                            {
                                "t3name": "金凤区"
                            },
                            {
                                "t3name": "永宁县"
                            },
                            {
                                "t3name": "兴庆区"
                            },
                            {
                                "t3name": "西夏区"
                            }
                        ]
                    },
                    {
                        "t2name": "吴忠市",
                        "t3": [
                            {
                                "t3name": "青铜峡市"
                            },
                            {
                                "t3name": "同心县"
                            },
                            {
                                "t3name": "盐池县"
                            },
                            {
                                "t3name": "利通区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "甘肃省",
                "t2": [
                    {
                        "t2name": "兰州市",
                        "t3": [
                            {
                                "t3name": "西固区"
                            },
                            {
                                "t3name": "安宁区"
                            },
                            {
                                "t3name": "城关区"
                            },
                            {
                                "t3name": "七里河区"
                            },
                            {
                                "t3name": "皋兰县"
                            },
                            {
                                "t3name": "榆中县"
                            },
                            {
                                "t3name": "红古区"
                            },
                            {
                                "t3name": "永登县"
                            }
                        ]
                    },
                    {
                        "t2name": "金昌市",
                        "t3": [
                            {
                                "t3name": "金川区"
                            },
                            {
                                "t3name": "永昌县"
                            }
                        ]
                    },
                    {
                        "t2name": "甘南藏族",
                        "t3": [
                            {
                                "t3name": "碌曲县"
                            },
                            {
                                "t3name": "玛曲县"
                            },
                            {
                                "t3name": "夏河县"
                            },
                            {
                                "t3name": "卓尼县"
                            },
                            {
                                "t3name": "临潭县"
                            },
                            {
                                "t3name": "迭部县"
                            },
                            {
                                "t3name": "舟曲县"
                            },
                            {
                                "t3name": "合作市"
                            }
                        ]
                    },
                    {
                        "t2name": "平凉市",
                        "t3": [
                            {
                                "t3name": "静宁县"
                            },
                            {
                                "t3name": "庄浪县"
                            },
                            {
                                "t3name": "崆峒区"
                            },
                            {
                                "t3name": "华亭县"
                            },
                            {
                                "t3name": "崇信县"
                            },
                            {
                                "t3name": "灵台县"
                            },
                            {
                                "t3name": "泾川县"
                            }
                        ]
                    },
                    {
                        "t2name": "嘉峪关市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "天水市",
                        "t3": [
                            {
                                "t3name": "秦安县"
                            },
                            {
                                "t3name": "清水县"
                            },
                            {
                                "t3name": "甘谷县"
                            },
                            {
                                "t3name": "武山县"
                            },
                            {
                                "t3name": "北道区"
                            },
                            {
                                "t3name": "秦城区"
                            },
                            {
                                "t3name": "张家川"
                            }
                        ]
                    },
                    {
                        "t2name": "白银市",
                        "t3": [
                            {
                                "t3name": "景泰县"
                            },
                            {
                                "t3name": "会宁县"
                            },
                            {
                                "t3name": "白银区"
                            },
                            {
                                "t3name": "靖远县"
                            },
                            {
                                "t3name": "平川区"
                            }
                        ]
                    },
                    {
                        "t2name": "武威市",
                        "t3": [
                            {
                                "t3name": "凉州区"
                            },
                            {
                                "t3name": "民勤县"
                            },
                            {
                                "t3name": "古浪县"
                            },
                            {
                                "t3name": "天祝"
                            }
                        ]
                    },
                    {
                        "t2name": "张掖市",
                        "t3": [
                            {
                                "t3name": "肃南裕固族"
                            },
                            {
                                "t3name": "民乐县"
                            },
                            {
                                "t3name": "山丹县"
                            },
                            {
                                "t3name": "高台县"
                            },
                            {
                                "t3name": "临泽县"
                            },
                            {
                                "t3name": "甘州区"
                            }
                        ]
                    },
                    {
                        "t2name": "庆阳市",
                        "t3": [
                            {
                                "t3name": "华池县"
                            },
                            {
                                "t3name": "合水县"
                            },
                            {
                                "t3name": "西峰区"
                            },
                            {
                                "t3name": "宁县"
                            },
                            {
                                "t3name": "正宁县"
                            },
                            {
                                "t3name": "镇原县"
                            },
                            {
                                "t3name": "庆城县"
                            },
                            {
                                "t3name": "环县"
                            }
                        ]
                    },
                    {
                        "t2name": "定西市",
                        "t3": [
                            {
                                "t3name": "安定区"
                            },
                            {
                                "t3name": "陇西县"
                            },
                            {
                                "t3name": "通渭县"
                            },
                            {
                                "t3name": "临洮县"
                            },
                            {
                                "t3name": "渭源县"
                            },
                            {
                                "t3name": "漳县"
                            },
                            {
                                "t3name": "岷县"
                            }
                        ]
                    },
                    {
                        "t2name": "临夏回族",
                        "t3": [
                            {
                                "t3name": "积石山"
                            },
                            {
                                "t3name": "东乡族"
                            },
                            {
                                "t3name": "和政县"
                            },
                            {
                                "t3name": "广河县"
                            },
                            {
                                "t3name": "永靖县"
                            },
                            {
                                "t3name": "康乐县"
                            },
                            {
                                "t3name": "临夏县"
                            },
                            {
                                "t3name": "临夏市"
                            }
                        ]
                    },
                    {
                        "t2name": "酒泉市",
                        "t3": [
                            {
                                "t3name": "敦煌市"
                            },
                            {
                                "t3name": "阿克塞"
                            },
                            {
                                "t3name": "玉门市"
                            },
                            {
                                "t3name": "瓜州县"
                            },
                            {
                                "t3name": "肃北"
                            },
                            {
                                "t3name": "肃州区"
                            },
                            {
                                "t3name": "金塔县"
                            }
                        ]
                    },
                    {
                        "t2name": "陇南市",
                        "t3": [
                            {
                                "t3name": "两当县"
                            },
                            {
                                "t3name": "礼县"
                            },
                            {
                                "t3name": "徽县"
                            },
                            {
                                "t3name": "文县"
                            },
                            {
                                "t3name": "宕昌县"
                            },
                            {
                                "t3name": "康县"
                            },
                            {
                                "t3name": "西和县"
                            },
                            {
                                "t3name": "武都区"
                            },
                            {
                                "t3name": "成县"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "西藏自治",
                "t2": [
                    {
                        "t2name": "阿里地区",
                        "t3": [
                            {
                                "t3name": "普兰"
                            },
                            {
                                "t3name": "措勤"
                            },
                            {
                                "t3name": "改则"
                            },
                            {
                                "t3name": "革吉"
                            },
                            {
                                "t3name": "日土"
                            },
                            {
                                "t3name": "噶尔"
                            },
                            {
                                "t3name": "札达"
                            }
                        ]
                    },
                    {
                        "t2name": "拉萨市",
                        "t3": [
                            {
                                "t3name": "当雄"
                            },
                            {
                                "t3name": "尼木"
                            },
                            {
                                "t3name": "城关区"
                            },
                            {
                                "t3name": "林周"
                            },
                            {
                                "t3name": "达孜"
                            },
                            {
                                "t3name": "墨竹工卡"
                            },
                            {
                                "t3name": "曲水"
                            },
                            {
                                "t3name": "堆龙德庆"
                            }
                        ]
                    },
                    {
                        "t2name": "山南地区",
                        "t3": [
                            {
                                "t3name": "曲松"
                            },
                            {
                                "t3name": "措美"
                            },
                            {
                                "t3name": "洛扎"
                            },
                            {
                                "t3name": "加查"
                            },
                            {
                                "t3name": "扎囊"
                            },
                            {
                                "t3name": "贡嘎"
                            },
                            {
                                "t3name": "桑日"
                            },
                            {
                                "t3name": "琼结"
                            },
                            {
                                "t3name": "浪卡子"
                            },
                            {
                                "t3name": "隆子"
                            },
                            {
                                "t3name": "错那"
                            },
                            {
                                "t3name": "乃东"
                            }
                        ]
                    },
                    {
                        "t2name": "日喀则市",
                        "t3": [
                            {
                                "t3name": "昂仁"
                            },
                            {
                                "t3name": "拉孜"
                            },
                            {
                                "t3name": "萨迦"
                            },
                            {
                                "t3name": "定日"
                            },
                            {
                                "t3name": "江孜"
                            },
                            {
                                "t3name": "南木林"
                            },
                            {
                                "t3name": "日喀则市"
                            },
                            {
                                "t3name": "聂拉木"
                            },
                            {
                                "t3name": "萨嘎"
                            },
                            {
                                "t3name": "亚东"
                            },
                            {
                                "t3name": "吉隆"
                            },
                            {
                                "t3name": "定结"
                            },
                            {
                                "t3name": "仲巴"
                            },
                            {
                                "t3name": "白朗"
                            },
                            {
                                "t3name": "谢通门"
                            },
                            {
                                "t3name": "仁布"
                            },
                            {
                                "t3name": "岗巴"
                            },
                            {
                                "t3name": "康马"
                            }
                        ]
                    },
                    {
                        "t2name": "那曲地区",
                        "t3": [
                            {
                                "t3name": "尼玛"
                            },
                            {
                                "t3name": "那曲"
                            },
                            {
                                "t3name": "比如"
                            },
                            {
                                "t3name": "嘉黎"
                            },
                            {
                                "t3name": "安多"
                            },
                            {
                                "t3name": "聂荣"
                            },
                            {
                                "t3name": "索"
                            },
                            {
                                "t3name": "申扎"
                            },
                            {
                                "t3name": "巴青"
                            },
                            {
                                "t3name": "班戈"
                            }
                        ]
                    },
                    {
                        "t2name": "昌都地区",
                        "t3": [
                            {
                                "t3name": "芒康"
                            },
                            {
                                "t3name": "边坝"
                            },
                            {
                                "t3name": "左贡"
                            },
                            {
                                "t3name": "八宿"
                            },
                            {
                                "t3name": "昌都"
                            },
                            {
                                "t3name": "江达"
                            },
                            {
                                "t3name": "类乌齐"
                            },
                            {
                                "t3name": "贡觉"
                            },
                            {
                                "t3name": "察雅"
                            },
                            {
                                "t3name": "丁青"
                            },
                            {
                                "t3name": "洛隆"
                            }
                        ]
                    },
                    {
                        "t2name": "林芝地区",
                        "t3": [
                            {
                                "t3name": "墨脱"
                            },
                            {
                                "t3name": "米林"
                            },
                            {
                                "t3name": "工布江达"
                            },
                            {
                                "t3name": "林芝"
                            },
                            {
                                "t3name": "波密"
                            },
                            {
                                "t3name": "察隅"
                            },
                            {
                                "t3name": "朗"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "内蒙古自",
                "t2": [
                    {
                        "t2name": "巴彦淖尔",
                        "t3": [
                            {
                                "t3name": "临河区"
                            },
                            {
                                "t3name": "五原县"
                            },
                            {
                                "t3name": "磴口县"
                            },
                            {
                                "t3name": "乌拉特前旗"
                            },
                            {
                                "t3name": "乌拉特中旗"
                            },
                            {
                                "t3name": "乌拉特后旗"
                            },
                            {
                                "t3name": "杭锦后旗"
                            }
                        ]
                    },
                    {
                        "t2name": "锡林郭勒盟",
                        "t3": [
                            {
                                "t3name": "多伦县"
                            },
                            {
                                "t3name": "二连浩特市"
                            },
                            {
                                "t3name": "苏尼特左旗"
                            },
                            {
                                "t3name": "苏尼特右旗"
                            },
                            {
                                "t3name": "锡林浩特市"
                            },
                            {
                                "t3name": "阿巴嘎旗"
                            },
                            {
                                "t3name": "东乌珠穆沁旗"
                            },
                            {
                                "t3name": "西乌珠穆沁旗"
                            },
                            {
                                "t3name": "正蓝旗"
                            },
                            {
                                "t3name": "正镶白旗"
                            },
                            {
                                "t3name": "镶黄旗"
                            },
                            {
                                "t3name": "太仆寺旗"
                            }
                        ]
                    },
                    {
                        "t2name": "兴安盟",
                        "t3": [
                            {
                                "t3name": "科尔沁右翼前旗"
                            },
                            {
                                "t3name": "阿尔山市"
                            },
                            {
                                "t3name": "乌兰浩特市"
                            },
                            {
                                "t3name": "突泉县"
                            },
                            {
                                "t3name": "科尔沁右翼中旗"
                            },
                            {
                                "t3name": "扎赉特旗"
                            }
                        ]
                    },
                    {
                        "t2name": "乌兰察布",
                        "t3": [
                            {
                                "t3name": "化德县"
                            },
                            {
                                "t3name": "商都县"
                            },
                            {
                                "t3name": "四子王旗"
                            },
                            {
                                "t3name": "察哈尔右翼后旗"
                            },
                            {
                                "t3name": "丰镇市"
                            },
                            {
                                "t3name": "凉城县"
                            },
                            {
                                "t3name": "兴和县"
                            },
                            {
                                "t3name": "集宁区"
                            },
                            {
                                "t3name": "卓资县"
                            },
                            {
                                "t3name": "察哈尔右翼中旗"
                            },
                            {
                                "t3name": "察哈尔右翼前旗"
                            }
                        ]
                    },
                    {
                        "t2name": "鄂尔多斯",
                        "t3": [
                            {
                                "t3name": "达拉特旗"
                            },
                            {
                                "t3name": "东胜区"
                            },
                            {
                                "t3name": "乌审旗"
                            },
                            {
                                "t3name": "伊金霍洛旗"
                            },
                            {
                                "t3name": "鄂托克旗"
                            },
                            {
                                "t3name": "杭锦旗"
                            },
                            {
                                "t3name": "准格尔旗"
                            },
                            {
                                "t3name": "鄂托克前旗"
                            }
                        ]
                    },
                    {
                        "t2name": "乌海市",
                        "t3": [
                            {
                                "t3name": "乌达区"
                            },
                            {
                                "t3name": "海南区"
                            },
                            {
                                "t3name": "海勃湾区"
                            }
                        ]
                    },
                    {
                        "t2name": "包头市",
                        "t3": [
                            {
                                "t3name": "达尔罕茂明安联合旗"
                            },
                            {
                                "t3name": "昆都仑区"
                            },
                            {
                                "t3name": "东河区"
                            },
                            {
                                "t3name": "九原区"
                            },
                            {
                                "t3name": "白云矿区"
                            },
                            {
                                "t3name": "固阳县"
                            },
                            {
                                "t3name": "石拐区"
                            },
                            {
                                "t3name": "青山区"
                            },
                            {
                                "t3name": "土默特右旗"
                            }
                        ]
                    },
                    {
                        "t2name": "呼和浩特",
                        "t3": [
                            {
                                "t3name": "清水河县"
                            },
                            {
                                "t3name": "和林格尔县"
                            },
                            {
                                "t3name": "托克托县"
                            },
                            {
                                "t3name": "土默特左旗"
                            },
                            {
                                "t3name": "赛罕区"
                            },
                            {
                                "t3name": "武川县"
                            },
                            {
                                "t3name": "新城区"
                            },
                            {
                                "t3name": "回民区"
                            },
                            {
                                "t3name": "玉泉区"
                            }
                        ]
                    },
                    {
                        "t2name": "呼伦贝尔",
                        "t3": [
                            {
                                "t3name": "根河市"
                            },
                            {
                                "t3name": "新巴尔虎右旗"
                            },
                            {
                                "t3name": "新巴尔虎左旗"
                            },
                            {
                                "t3name": "陈巴尔虎旗"
                            },
                            {
                                "t3name": "鄂温克族自治旗"
                            },
                            {
                                "t3name": "额尔古纳市"
                            },
                            {
                                "t3name": "扎兰屯市"
                            },
                            {
                                "t3name": "牙克石市"
                            },
                            {
                                "t3name": "满洲里市"
                            },
                            {
                                "t3name": "莫力达瓦达斡尔族"
                            },
                            {
                                "t3name": "鄂伦春自治旗"
                            },
                            {
                                "t3name": "海拉尔区"
                            },
                            {
                                "t3name": "阿荣旗"
                            }
                        ]
                    },
                    {
                        "t2name": "通辽市",
                        "t3": [
                            {
                                "t3name": "科尔沁左翼中旗"
                            },
                            {
                                "t3name": "科尔沁区"
                            },
                            {
                                "t3name": "开鲁县"
                            },
                            {
                                "t3name": "科尔沁左翼后旗"
                            },
                            {
                                "t3name": "奈曼旗"
                            },
                            {
                                "t3name": "库伦旗"
                            },
                            {
                                "t3name": "霍林郭勒市"
                            },
                            {
                                "t3name": "扎鲁特旗"
                            }
                        ]
                    },
                    {
                        "t2name": "阿拉善盟",
                        "t3": [
                            {
                                "t3name": "额济纳旗"
                            },
                            {
                                "t3name": "阿拉善右旗"
                            },
                            {
                                "t3name": "阿拉善左旗"
                            }
                        ]
                    },
                    {
                        "t2name": "赤峰市",
                        "t3": [
                            {
                                "t3name": "林西县"
                            },
                            {
                                "t3name": "克什克腾旗"
                            },
                            {
                                "t3name": "翁牛特旗"
                            },
                            {
                                "t3name": "喀喇沁旗"
                            },
                            {
                                "t3name": "松山区"
                            },
                            {
                                "t3name": "阿鲁科尔沁旗"
                            },
                            {
                                "t3name": "巴林左旗"
                            },
                            {
                                "t3name": "巴林右旗"
                            },
                            {
                                "t3name": "宁城县"
                            },
                            {
                                "t3name": "敖汉旗"
                            },
                            {
                                "t3name": "元宝山区"
                            },
                            {
                                "t3name": "红山区"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "新疆维吾",
                "t2": [
                    {
                        "t2name": "伊犁",
                        "t3": [
                            {
                                "t3name": "新源"
                            },
                            {
                                "t3name": "昭苏"
                            },
                            {
                                "t3name": "霍城"
                            },
                            {
                                "t3name": "巩留"
                            },
                            {
                                "t3name": "伊宁"
                            },
                            {
                                "t3name": "察布查尔"
                            },
                            {
                                "t3name": "伊宁市"
                            },
                            {
                                "t3name": "奎屯市"
                            },
                            {
                                "t3name": "尼勒克"
                            },
                            {
                                "t3name": "特克斯"
                            }
                        ]
                    },
                    {
                        "t2name": "克拉玛依",
                        "t3": [
                            {
                                "t3name": "独山子区"
                            },
                            {
                                "t3name": "白碱滩区"
                            },
                            {
                                "t3name": "克拉玛依区"
                            },
                            {
                                "t3name": "乌尔禾区"
                            }
                        ]
                    },
                    {
                        "t2name": "哈密地",
                        "t3": [
                            {
                                "t3name": "巴里坤"
                            },
                            {
                                "t3name": "哈密市"
                            },
                            {
                                "t3name": "伊吾"
                            }
                        ]
                    },
                    {
                        "t2name": "石河子",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "吐鲁番地",
                        "t3": [
                            {
                                "t3name": "托克逊"
                            },
                            {
                                "t3name": "鄯善"
                            },
                            {
                                "t3name": "吐鲁番市"
                            }
                        ]
                    },
                    {
                        "t2name": "阿拉尔",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "阿勒泰地",
                        "t3": [
                            {
                                "t3name": "阿勒泰市"
                            },
                            {
                                "t3name": "布尔津"
                            },
                            {
                                "t3name": "福海"
                            },
                            {
                                "t3name": "哈巴河"
                            },
                            {
                                "t3name": "青河"
                            },
                            {
                                "t3name": "吉木乃"
                            },
                            {
                                "t3name": "富蕴"
                            }
                        ]
                    },
                    {
                        "t2name": "乌鲁木齐",
                        "t3": [
                            {
                                "t3name": "乌鲁木齐"
                            },
                            {
                                "t3name": "天山区"
                            },
                            {
                                "t3name": "沙依巴克区"
                            },
                            {
                                "t3name": "新市区"
                            },
                            {
                                "t3name": "水磨沟区"
                            },
                            {
                                "t3name": "头屯河区"
                            },
                            {
                                "t3name": "达坂城区"
                            },
                            {
                                "t3name": "东山区"
                            }
                        ]
                    },
                    {
                        "t2name": "塔城地",
                        "t3": [
                            {
                                "t3name": "和布克赛尔"
                            },
                            {
                                "t3name": "乌苏市"
                            },
                            {
                                "t3name": "塔城市"
                            },
                            {
                                "t3name": "沙湾"
                            },
                            {
                                "t3name": "额敏"
                            },
                            {
                                "t3name": "裕民"
                            },
                            {
                                "t3name": "托里"
                            }
                        ]
                    },
                    {
                        "t2name": "昌吉",
                        "t3": [
                            {
                                "t3name": "昌吉市"
                            },
                            {
                                "t3name": "呼图壁"
                            },
                            {
                                "t3name": "玛纳斯"
                            },
                            {
                                "t3name": "阜康市"
                            },
                            {
                                "t3name": "米泉市"
                            },
                            {
                                "t3name": "木垒"
                            },
                            {
                                "t3name": "奇台"
                            },
                            {
                                "t3name": "吉木萨尔"
                            }
                        ]
                    },
                    {
                        "t2name": "克孜勒",
                        "t3": [
                            {
                                "t3name": "阿合奇"
                            },
                            {
                                "t3name": "阿克陶"
                            },
                            {
                                "t3name": "阿图什市"
                            },
                            {
                                "t3name": "乌恰"
                            }
                        ]
                    },
                    {
                        "t2name": "图木舒克",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "阿克苏地",
                        "t3": [
                            {
                                "t3name": "乌什"
                            },
                            {
                                "t3name": "拜城"
                            },
                            {
                                "t3name": "柯坪"
                            },
                            {
                                "t3name": "阿瓦提"
                            },
                            {
                                "t3name": "库车"
                            },
                            {
                                "t3name": "温宿"
                            },
                            {
                                "t3name": "新和"
                            },
                            {
                                "t3name": "沙雅"
                            },
                            {
                                "t3name": "阿克苏市"
                            }
                        ]
                    },
                    {
                        "t2name": "五家渠",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "巴音郭楞",
                        "t3": [
                            {
                                "t3name": "博湖"
                            },
                            {
                                "t3name": "尉犁"
                            },
                            {
                                "t3name": "若羌"
                            },
                            {
                                "t3name": "库尔勒市"
                            },
                            {
                                "t3name": "轮台"
                            },
                            {
                                "t3name": "和静"
                            },
                            {
                                "t3name": "和硕"
                            },
                            {
                                "t3name": "且末"
                            },
                            {
                                "t3name": "焉耆"
                            }
                        ]
                    },
                    {
                        "t2name": "和田地",
                        "t3": [
                            {
                                "t3name": "于田"
                            },
                            {
                                "t3name": "民丰"
                            },
                            {
                                "t3name": "策勒"
                            },
                            {
                                "t3name": "洛浦"
                            },
                            {
                                "t3name": "皮山"
                            },
                            {
                                "t3name": "墨玉"
                            },
                            {
                                "t3name": "和田"
                            },
                            {
                                "t3name": "和田市"
                            }
                        ]
                    },
                    {
                        "t2name": "博尔塔拉",
                        "t3": [
                            {
                                "t3name": "精河"
                            },
                            {
                                "t3name": "温泉"
                            },
                            {
                                "t3name": "博乐市"
                            }
                        ]
                    },
                    {
                        "t2name": "喀什地",
                        "t3": [
                            {
                                "t3name": "伽师"
                            },
                            {
                                "t3name": "岳普湖"
                            },
                            {
                                "t3name": "叶城"
                            },
                            {
                                "t3name": "麦盖提"
                            },
                            {
                                "t3name": "疏勒"
                            },
                            {
                                "t3name": "英吉沙"
                            },
                            {
                                "t3name": "泽普"
                            },
                            {
                                "t3name": "莎车"
                            },
                            {
                                "t3name": "塔什库尔干"
                            },
                            {
                                "t3name": "巴楚"
                            },
                            {
                                "t3name": "喀什市"
                            },
                            {
                                "t3name": "疏附"
                            }
                        ]
                    }
                ]
            },
            {
                "t1name": "台湾",
                "t2": [
                    {
                        "t2name": "新竹县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "基隆市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "高雄市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "台北市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "台南市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "嘉义县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "台中市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "宜兰县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "屏东县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "桃园市",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "台东县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "苗栗县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "金门县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "花莲县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "云林县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "连江县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "澎湖岛",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南投县",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "彰化县",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "香港特别行政区",
                "t2": [
                    {
                        "t2name": "油尖旺区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "黄大仙祠",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "深水埗区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "观塘区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "九龙城区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "湾仔区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "葵青区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "离岛区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "中西中西",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "南区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "东区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "荃湾区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "元朗区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "沙田区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "西贡区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "屯门区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大埔区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "北区",
                        "t3": [

                        ]
                    }
                ]
            },
            {
                "t1name": "澳门特别行政区",
                "t2": [
                    {
                        "t2name": "花地玛堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "圣安多尼堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "大堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "望德堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "风顺堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "嘉模堂区",
                        "t3": [

                        ]
                    },
                    {
                        "t2name": "圣方济各堂",
                        "t3": [

                        ]
                    }
                ]
            }
        ]
        var cityservice = {
            data: (function () {
                return cityjson
            }()),
            getp: function () {
                return cityjson.map(function (i) { return i.t1name })
            },
            getc: function (p) {
                if (p) {
                    return cityjson.filter(function (i) { return i.t1name == p })[0].t2.map(function (i) { return i.t2name })
                } else {
                    return cityjson[0].t2.map(function (i) { return i.t2name })
                }

            },
            getr: function (p, c) {
                if (c) {
                    return cityjson.filter(function (i) { return i.t1name == p })[0].t2.filter(function (i) { return i.t2name == c })[0].t3.map(function (i) { return i.t3name })
                } else {
                    return []
                }

            },
            initdata: function (address) {
                if (address) {
                    //这里有坑^_^//
                    // var values = address.split(" ");
                    // return [[
                    //     { data: cityservice.getp() },
                    //     { data: cityservice.getc(values[0]) },
                    //     { data: cityservice.getr(values[0], values[1]) }
                    // ]]
                    return [[
                        { data: cityservice.getp() },
                        { data: cityservice.getc() },
                        { data: cityservice.getr() }
                    ]]
                } else {
                    return [[
                        { data: cityservice.getp() },
                        { data: cityservice.getc() },
                        { data: cityservice.getr() }
                    ]]
                }
            },
            getcchangedata: function (v0, v1) {
                var t2obj = cityjson
                    .filter(function (i) { return i.t1name == v0 })[0].t2
                    .filter(function (i) { return i.t2name == v1 })[0];
                var data = {
                    2: { data: t2obj.t3.map(function (i) { return i.t3name }) }
                }
                return data
            },
            getpchangedata: function (v0) {
                var t2tree = cityjson
                    .filter(function (i) { return i.t1name == v0 })[0].t2;
                var data = {
                    1: {
                        data: t2tree.map(function (ii) { return ii.t2name })
                    },
                    2: {
                        data: t2tree[0].t3.map(function (ii) { return ii.t3name })
                    }
                }
                return data;

            }
        }
        return cityservice;
    })
angular.module('app')
    .controller('about', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
    })
angular.module('app')
    .controller('accountlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/account/logPaging.rrh', {
                pageSize: 1000,
                pageNow: 1
            }).then(function (data) {
                $scope.data = data.list;
            })

        }
        $scope.getdata();
    })
angular.module('app')
    .controller('authlist', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV3/index.rrh', {})
                .then(function (data) {
                    $scope.data = data
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            //只有当芝麻认证完成后才能进行下面的一系列认证
            if ($scope.data.list[0].status != 3) {
                appservice.warn('请先完成芝麻认证', 1000);
            }
            if (i.status == 3 || i.status == 1) {
                appservice.warn(i.note, 1000);
                return
            } else {
                if (i.type == 1) {
                    if (i.url.indexOf('#/auth/3') >= 0) {
                        $state.go('mobileauth');
                    } else {
                        $rootScope.GLOBAL.iframeurl = i.url;
                        $state.go('iframe')
                    }
                }
            }
        }
    })
angular.module('app')
    .controller('authlistchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.cannext = false;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorizationV2/getAuthList.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.cannext = data.result.filter(function (i) {
                        return i.status == '3' || i.status == '1'
                    }).length == 2;
                })
        }
        $scope.getdata();

        $scope.go = function (i) {
            if (i.status == 3 || i.status == 1) {
                return
            }
            if (i.authName.indexOf('银行') >= 0) {
                $state.go('bankcardadd')
            }
            else if (i.authName.indexOf('运营商') >= 0) {
                $state.go('mobileauth')
            }
        }

        $scope.sub = function () {
            $state.go('downloadchannel')
        }
    })
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
angular.module('app')
    .controller('bankcard', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('bankcardadd', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        //如果是提现没绑卡进来的去除一层路由
        if ($rootScope.withdrawTObankcardadd) {
            $ionicHistory.removeBackView();
            $rootScope.withdrawTObankcardadd = false;
        }

        $scope.item = {
            cardno: "",
            phone: "",
        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + "/user/queryUserIdcard.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                        .then(function (data) {
                            $scope.item.phone = data.mobile;
                        })
                })
        }


        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.yzm = {
            data: '',
            getyzm: function () {
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardRequest.rrh", $scope.item)
                    .then(function (data) {
                        appservice.warn('验证码已发送', 1000)
                        $scope.djs.start();
                    }, function () {
                        //$scope.djs.start();
                    })
            }
        }

        $scope.sub = function () {
            if ($scope.paytype == '1') {
                localStorage.lianlianbindcardno = $scope.item.cardno
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getBindCardParams.rrh',
                    {
                        cardno: $scope.item.cardno,
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                    })
                    .then(function (data) {
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + "/pay/bindCardConfirm.rrh", {
                    validatecode: $scope.yzm.data
                }).then(function (data) {
                    $ionicHistory.goBack(-1);
                })
            }
        }

        $scope.supportbank = function () {
            $rootScope.GLOBAL.iframeurl = 'app.renrenhua.com/rrhprotocolh5/bank.html';
            $state.go('iframe')
        }

        $scope.paytype = 1;//0 易宝；1连连支付

        $scope.checkPayType = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                {
                })
                .then(function (data) {
                    $scope.paytype = data.result;
                    $scope.getdata();

                })
        }

        $scope.checkPayType();
    })
angular.module('app')
    .controller('borrowlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/pending.rrh', {
                status: $stateParams.status,
                pageNow: 1,
                pageSize: 30
            }).then(function (data) {
                $scope.data = data;
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('contract', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.goh5contract = function () {
            if (GLOBAL.debug) {
                var url = '//testm.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            } else {
                var url = '//app.renrenhua.com/rrhh5/#/contract/' + localStorage.token + '/'
            }
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        $scope.getdata();

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/getAgreementContent.rrh', {})
                .then(function (data) {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/generateAgreement.rrh', {
                        serialno: $scope.data.serialno
                    }).then(function (data) {
                        $state.go('contractsuc')
                    })
                }, function (data) {
                    if (data.code == 1111) {
                        $state.go('bankcardadd')
                    }
                })
        }
    })
angular.module('app')
    .controller('contractsuc', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
    })
angular.module('app')
    .controller('downloadchannel', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopover) {
        $scope.do = function () {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.android.renrenhua&ckey=CK1352479390142'
        }

        $scope.more = function (e) {
            var template = '<ion-popover-view class="downpop"<ion-content> <img src="img/popup_img.png" alt="" class="img3"><img src="img/close_button.png" alt="" class="close"  ng-click="popover.hide()"></div><div class="line"></div></ion-popover-view </ion-content>';
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.popover.show(e);
        }
        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
    })
angular.module('app')
    .controller('editpwd', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        $scope.imgurl = "img/icon_yingcang.png";
        $scope.inputtype = "password";
        $scope.changeimg = function () {
            if ($scope.imgurl == "img/icon_yingcang.png") {
                $scope.imgurl = "img/icon_xianshi.png"
                $scope.inputtype = "text";
            } else {
                $scope.imgurl = "img/icon_yingcang.png"
                $scope.inputtype = "password";
            }
        }

        $scope.imgurl1 = "img/icon_yingcang.png";
        $scope.inputtype1 = "password";
        $scope.changeimg1 = function () {
            if ($scope.imgurl1 == "img/icon_yingcang.png") {
                $scope.imgurl1 = "img/icon_xianshi.png"
                $scope.inputtype1 = "text";
            } else {
                $scope.imgurl1 = "img/icon_yingcang.png"
                $scope.inputtype1 = "password";
            }
        }
        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.item = {
            phone: "",
            sms_code: "",
            password: "",
            password1: "",
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.item.phone = data.mobile
                })
        }
        $scope.getuser();


        $scope.getcode = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/sendCode.open', {
                phone: $scope.item.phone,
                type: 1,
                captchaCode: "",
            }).then(function (data) {
                appservice.warn("短信验证码发送成功")
                $scope.djs.start();
            })
        }

        $scope.reg = function () {
            if ($scope.item.password != $scope.item.password1) {
                appservice.warn("两次输入密码不一致", 1000)
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/resetPassword.open', $scope.item)
                .then(function (data) {
                    appservice.warn("密码修改成功", 1000, function () {
                        $ionicHistory.goBack(-1);
                    })
                })
        }
    })  
angular.module('app')
    .controller('forgetpwd', function ($scope, appservice, $rootScope, $ionicHistory, $interval) {
        $scope.imgurl = "img/icon_yingcang.png";
        $scope.inputtype = "password";
        $scope.changeimg = function () {
            if ($scope.imgurl == "img/icon_yingcang.png") {
                $scope.imgurl = "img/icon_xianshi.png"
                $scope.inputtype = "text";
            } else {
                $scope.imgurl = "img/icon_yingcang.png"
                $scope.inputtype = "password";
            }
        }

        $scope.imgurl1 = "img/icon_yingcang.png";
        $scope.inputtype1 = "password";
        $scope.changeimg1 = function () {
            if ($scope.imgurl1 == "img/icon_yingcang.png") {
                $scope.imgurl1 = "img/icon_xianshi.png"
                $scope.inputtype1 = "text";
            } else {
                $scope.imgurl1 = "img/icon_yingcang.png"
                $scope.inputtype1 = "password";
            }
        }
        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.item = {
            phone: "",
            sms_code: "",
            password: "",
            password1: "",
        }


        $scope.getcode = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/sendCode.open', {
                phone: $scope.item.phone,
                type: 1,
                captchaCode: "",
            }).then(function (data) {
                appservice.warn("短信验证码发送成功")
                $scope.djs.start();
            })
        }

        $scope.reg = function () {
            if ($scope.item.password != $scope.item.password1) {
                appservice.warn("两次输入密码不一致", 1000)
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/resetPassword.open', $scope.item)
                .then(function (data) {
                    appservice.warn("密码修改成功", 1000, function () {
                        $ionicHistory.goBack(-1);
                    })
                })
        }

        $scope.login = function () {
            appservice.login($scope)
        }
    })
angular.module('app')
    .controller('help', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopup) {
        $scope.goiframe = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.copywarn = function (str) {
            appservice.warn(str, 1000)
        }

        $scope.showqrcode = function () {
            $rootScope.popqrcode = $ionicPopup.show({
                templateUrl: 'templates/popqrcode/index.html',
                cssClass: 'popqrcode'
            });
        }
    })
angular.module('app')
    .controller('home', function ($scope, $rootScope, appservice, $state, $ionicSlideBoxDelegate) {
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.changeactive = function (i) {
            $scope.active = i;
            if ($scope.data.feeConfig && $scope.data.feeConfig.length > 0) {
                $scope.threedata = $scope.data.feeConfig.filter(function (i) {
                    return i.group == $scope.data.periodGroup[$scope.active] + "-" + $scope.data.amountGroup[0]
                })[0];
            }


        }
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/homeV2/index.open', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.changeactive(0);
                    $ionicSlideBoxDelegate.update()
                    $ionicSlideBoxDelegate.enableSlide(true)
                    $ionicSlideBoxDelegate.loop(true)
                    $ionicSlideBoxDelegate.start()
                    if (localStorage.token) {
                        appservice.postdata($rootScope.GLOBAL.coreUrl + '/message/unreadMessage.rrh', {})
                            .then(function (data) {
                                $scope.messageNum = data;
                            })
                    }
                })
        }
        $scope.getdata();

        $scope.goWithTokenwaveloginreg = function (state, statep) {
            appservice.goWithTokenwaveloginreg($scope, state, statep)
        }

        $scope.sub = function () {
            appservice.checktoken()
                .then(function () {
                    appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/beforeNewOrder.rrh', {})
                        .then(function (data) {
                            if (data.isOverdue) {
                                appservice.warn('还清后才可以再借款哦', 1000, function () {
                                    $state.go('prerepaymentlist')
                                });
                                return
                            }
                            if (data.isApplication) {
                                appservice.warn('您已经申请过该产品', 1000);
                                return
                            }
                            if (data.mustAuth != "OK") {
                                appservice.warn(data.mustAuth, 1000);
                                return
                            }
                            if (data.infoAuth) {
                                $state.go('autonym', { next: 'rrh2.1channel' })
                                return
                            }
                            if (data.fifteenDays) {
                                appservice.warn(data.rejectMsg, 1000);
                                return
                            }
                            if (data.operatorOverdue) {
                                $state.go('authlistchannel')
                            } else {
                                $state.go('downloadchannel')
                            }

                        }, function () {

                        })
                }, function () {
                })
        }

        $scope.tomessage = function () {
            appservice.goWithTokenwaveloginreg($scope, 'message')
        }
    })

angular.module('app')
    .controller('homechannel', function ($scope, $rootScope, appservice, $state, $ionicSlideBoxDelegate, $stateParams) {
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
        $scope.changeactive = function (i) {
            $scope.active = i;
            if ($scope.data.feeConfig && $scope.data.feeConfig.length > 0) {
                $scope.threedata = $scope.data.feeConfig.filter(function (i) {
                    return i.group == $scope.data.periodGroup[$scope.active] + "-" + $scope.data.amountGroup[0]
                })[0];
            }
        }
        $scope.getdata = function () {
            if ($stateParams.hasaccount && !localStorage.token && localStorage.loginonce) {
                appservice.login($scope);
            }
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/homeV2/index.open', {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.changeactive(0);
                    $ionicSlideBoxDelegate.update()
                    $ionicSlideBoxDelegate.enableSlide(true)
                    $ionicSlideBoxDelegate.loop(true)
                    $ionicSlideBoxDelegate.start()
                    var _stylevalue = 'background-image: -webkit-gradient(linear, left top, right top, from(#FF9D00), color-stop(' + $scope.data.amountGroup[0] / 3000 * 100 + '%, #EFEFF4));background-image: linear-gradient(to right, #FF9D00 0%, #EFEFF4 ' + $scope.data.amountGroup[0] / 3000 * 100 + '%) ;'
                    eval("var style = {\"#home .product .bd .up .range.rangerule" + $scope.data.amountGroup[0] + " input::-webkit-slider-runnable-track\": _stylevalue}");
                    addStyleSheet(style);
                })
        }
        $scope.getdata();

        $scope.goWithTokenwaveloginreg = function (state, statep) {
            appservice.goWithTokenwaveloginreg($scope, state, statep)
        }

        $scope.sub = function () {
            appservice.checktoken().then(function () {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/authorization/queryVerifyStatus.rrh', { verify_type: 'ZMOP_SCORE' }).then(function (data) {
                    if (data.status != 1 && data.status != 3) {
                        $state.go('autonym', { next: 'rrh2.1channel' })
                    } else {
                        $state.go('downloadchannel')
                    }
                }, function () {
                })
            }, function () {
            })
        }

        $scope.tomessage = function () {
            appservice.goWithTokenwaveloginreg($scope, 'message')
        }
    })

angular.module('app')
    .controller('iframe', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl($rootScope.GLOBAL.iframeurl);
    })
angular.module('app')
    .controller('infobase', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.education = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.maritalStatus = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.cityjson = cityservice.data;

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 0 })
                .then(function (data) {
                    $scope.data = data;
                    var temparr = [
                        [{
                            data: data.education.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    var temparr1 = [
                        [{
                            data: data.maritalStatus.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    $scope.education.wheels = temparr;
                    $scope.maritalStatus.wheels = temparr1;
                    $scope.address = {
                        input: undefined,
                        input1: data.userInfo.address ? data.userInfo.address.split("####")[1] : undefined,
                        showinput: data.userInfo.address ? data.userInfo.address.split("####")[0] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata(data.userInfo.address.split("####")[0]),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }

                    if (data.userInfo.maxDegree && data.userInfo.maxDegree.name) {
                        $scope.education.input = data.userInfo.maxDegree.name;
                    }
                    if (data.userInfo.maritalStatus && data.userInfo.maritalStatus.name) {
                        $scope.maritalStatus.input = data.userInfo.maritalStatus.name;
                    }

                })
        }
        $scope.getdata();


        $scope.sub = function () {
            var item = {};
            if (!$scope.education.input) {
                appservice.warn('请选择最高学历', 1000)
                return
            }
            if (!$scope.maritalStatus.input) {
                appservice.warn('请选择婚姻状况', 1000)
                return
            }

            if (!$scope.address.input && !$scope.address.showinput) {
                appservice.warn('请选择联系地址', 1000)
                return
            } else {
                $scope.address.input = $scope.address.showinput;
            }
            if (!$scope.address.input1) {
                appservice.warn('请输入所在街道、门牌号', 1000)
                return
            }
            if ($scope.data.userInfo.familyPhone) {
                if (!/^0\d{2,3}-?\d{7,8}$/.test($scope.data.userInfo.familyPhone) && !/^1\d{10}$/.test($scope.data.userInfo.familyPhone)) {
                    appservice.warn('家庭电话格式错误', 1000)
                    return
                }
            }
            if (!$scope.data.userInfo.email) {
                appservice.warn('请输入邮箱', 1000)
                return
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.userInfo.email)) {
                appservice.warn('邮箱格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.wx && $scope.data.userInfo.wx.search(/^[a-zA-Z\d_]{5,}$/) == -1) {
                appservice.warn('微信号格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.qq && $scope.data.userInfo.qq.search(/^[1-9]\d{4,13}$/) == -1) {
                appservice.warn('qq号格式错误', 1000)
                return
            }
            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserInfo.rrh',
                {
                    max_degree: $scope.data.education.filter(function (i) { return i.name == $scope.education.input })[0].id,
                    marital_status: $scope.data.maritalStatus.filter(function (i) { return i.name == $scope.maritalStatus.input })[0].id,
                    address: ($scope.address.input + "####" + ($scope.address.input1 || "")),
                    city_id: "",
                    family_phone: $scope.data.userInfo.familyPhone,
                    email: $scope.data.userInfo.email,
                    qq: $scope.data.userInfo.qq,
                    wx: $scope.data.userInfo.wx
                }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);

                })
            })
        }
    })
angular.module('app')
    .controller('infobasechannel', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
        $scope.education = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.maritalStatus = {
            input: undefined,
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            circular: false
        }
        $scope.cityjson = cityservice.data;

        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/getUserInfo.rrh')
                .then(function (data) {
                    $scope.data = data;
                    var temparr = [
                        [{
                            data: data.education.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    var temparr1 = [
                        [{
                            data: data.maritalStatus.map(function (i) {
                                return { value: i.name, display: i.name }
                            })
                        }]
                    ]
                    $scope.education.wheels = temparr;
                    $scope.maritalStatus.wheels = temparr1;

                    $scope.address = {
                        input: undefined,
                        input1: data.userInfo.address ? data.userInfo.address.split("####")[1] : undefined,
                        showinput: data.userInfo.address ? data.userInfo.address.split("####")[0] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata(data.userInfo.address.split("####")[0]),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }

                    if (data.userInfo.maxDegree && data.userInfo.maxDegree.name) {
                        $scope.education.input = data.userInfo.maxDegree.name;
                    }
                    if (data.userInfo.maritalStatus && data.userInfo.maritalStatus.name) {
                        $scope.maritalStatus.input = data.userInfo.maritalStatus.name;
                    }

                    $scope.workingTime = {
                        input: $scope.data.userInfo.workingTime ? $scope.data.userInfo.workingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.status = {
                        input: $scope.data.userInfo.workStatus ? $scope.data.userInfo.workStatus.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workingState.map(function (i) { return i.name }) }]]
                    }
                })
        }
        $scope.getdata();


        $scope.sub = function () {
            var item = {};
            if (!$scope.education.input) {
                appservice.warn('请选择最高学历', 1000)
                return
            }
            if (!$scope.maritalStatus.input) {
                appservice.warn('请选择婚姻状况', 1000)
                return
            }

            if (!$scope.address.input && !$scope.address.showinput) {
                appservice.warn('请选择联系地址', 1000)
                return
            } else {
                $scope.address.input = $scope.address.showinput;
            }
            if (!$scope.address.input1) {
                appservice.warn('请输入所在街道、门牌号', 1000)
                return
            }
            if ($scope.data.userInfo.familyPhone) {
                if ($scope.data.userInfo.familyPhone.length < 10 || $scope.data.userInfo.familyPhone.length > 13) {
                    appservice.warn('家庭电话格式错误', 1000)
                    return
                }
            }
            if (!$scope.data.userInfo.email) {
                appservice.warn('请输入邮箱', 1000)
                return
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.userInfo.email)) {
                appservice.warn('邮箱格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.wx && $scope.data.userInfo.wx.search(/^[a-zA-Z\d_]{5,}$/) == -1) {
                appservice.warn('微信号格式错误', 1000)
                return
            }
            if ($scope.data.userInfo.qq && $scope.data.userInfo.qq.search(/^[1-9]\d{4,13}$/) == -1) {
                appservice.warn('qq号格式错误', 1000)
                return
            }
            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            if (!$scope.workingTime.input) {
                appservice.warn('请输入参加工作的年限', 1000)
                return
            }
            if (!$scope.status.input) {
                appservice.warn('请输入当前工作状态', 1000)
                return
            }

            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/submitUserInfo.rrh',
                {
                    max_degree: $scope.data.education.filter(function (i) { return i.name == $scope.education.input })[0].id,
                    marital_status: $scope.data.maritalStatus.filter(function (i) { return i.name == $scope.maritalStatus.input })[0].id,
                    address: ($scope.address.input + "####" + ($scope.address.input1 || "")),
                    city_id: "",
                    family_phone: $scope.data.userInfo.familyPhone,
                    email: $scope.data.userInfo.email,
                    qq: $scope.data.userInfo.qq,
                    wx: $scope.data.userInfo.wx,
                    working_time: $scope.data.workSeniority.filter(function (i) { return i.name == $scope.workingTime.input })[0].id,
                    work_status: $scope.data.workingState.filter(function (i) { return i.name == $scope.status.input })[0].id,
                }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $state.go('authlistchannel')
                })
            })
        }
    })
angular.module('app')
    .controller('infofamily', function ($scope, $rootScope, appservice, cityservice, $ionicHistory) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 3 })
                .then(function (data) {
                    $scope.data = data;
                    $scope.child = {
                        input: data.childrenNum == 0 ? "无" : data.childrenNum,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", 1, 2, 3] }]]
                    }
                    $scope.house = {
                        input: data.haveHouse == 0 ? "无" : "有",
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", "有"] }]]
                    }
                    $scope.car = {
                        input: data.haveCar == 0 ? "无" : "有",
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: ["无", "有"] }]]
                    }
                })
        }
        $scope.getdata();

        $scope.$watch('car.input', function (newV, oldV) {
            if ($scope.data) {
                if (newV == '无')
                    $scope.data.carNumber = "";
            }
        })

        $scope.sub = function () {
            if ($scope.car.input == "有" && !$scope.data.carNumber) {
                appservice.warn("请输入车牌号", 1000);
                return
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitFamilyInfo.rrh', {
                children_num: $scope.child.input == "无" ? 0 : $scope.child.input,
                have_house: $scope.house.input == "有" ? 1 : 0,
                car_number: $scope.data.carNumber,
                have_car: $scope.car.input == "有" ? 1 : 0
            }
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);
                })
            })
        }
    })
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
angular.module('app')
    .controller('infolinkmanchannel', function ($scope, $rootScope, appservice, cityservice, $ionicHistory, $state) {
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
            if (!$scope.linkman1.input) {
                appservice.warn('请选择联系人1和你的关系', 1000)
                return
            }
            if (!$scope.linkmaninfo1.mobile) {
                appservice.warn('请输入联系人1的手机号', 1000)
                return
            }
            if (!$scope.linkmaninfo2.name) {
                appservice.warn('请输入联系人2的姓名', 1000)
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

            if ($scope.linkmaninfo1.mobile == $scope.linkmaninfo2.mobile) {
                appservice.warn('联系人号码不能相同', 1500);
                return
            }
            if ($scope.linkmaninfo1.name == $scope.linkmaninfo2.name) {
                appservice.warn('不能选择同一联系人', 1500);
                return
            }
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo1.mobile))) {
                appservice.warn('联系人1的联系电话格式错误', 1000)
                return
            }
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.linkmaninfo2.mobile))) {
                appservice.warn('联系人2的联系电话格式错误', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo1.name)) {
                appservice.warn('联系人1的姓名格式错误', 1000)
                return
            }
            if ((/\d+/).test($scope.linkmaninfo2.name)) {
                appservice.warn('联系人2的姓名格式错误', 1000)
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
                    $state.go('authlistchannel')
                })
            })
        }
    })
angular.module('app')
    .controller('infowork', function ($scope, $rootScope, appservice, cityservice, $ionicHistory) {
        $scope.cityjson = cityservice.data;
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/getSelectInfo.rrh', { type: 1 })
                .then(function (data) {
                    $scope.data = data;
                    if (data.userWork) {
                        $scope.userWork = data.userWork;
                    } else {
                        $scope.userWork = {}
                    }

                    $scope.workingTime = {
                        input: $scope.userWork.workingTime ? $scope.userWork.workingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.status = {
                        input: $scope.userWork.status ? $scope.userWork.status.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workingState.map(function (i) { return i.name }) }]]
                    }
                    $scope.currentWorkingTime = {
                        input: $scope.userWork.currentWorkingTime ? $scope.userWork.currentWorkingTime.name : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workSeniority.map(function (i) { return i.name }) }]]
                    }
                    $scope.companyType = {
                        input: $scope.userWork.companyType ? $scope.userWork.companyType : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.companyTypes }]]
                    }
                    $scope.position = {
                        input: $scope.userWork.position ? $scope.userWork.position : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.workPositions }]]
                    }
                    $scope.monthEarning = {
                        input: $scope.userWork.monthEarning ? $scope.userWork.monthEarning : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: [[{ data: data.monthEarnings }]]
                    }
                    $scope.address = {
                        input: undefined,
                        showinput: $scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[0] : undefined,
                        input1: $scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[1] : undefined,
                        theme: 'ios',
                        lang: 'zh',
                        display: 'bottom',
                        circular: false,
                        wheels: cityservice.initdata($scope.userWork.companyAddress ? $scope.userWork.companyAddress.split("####")[0] : undefined),
                        validate: function (obj, instance) {
                            var _index = obj.index;
                            var _values = obj.values;
                            if (_index == 0) {
                                instance.changeWheel(cityservice.getpchangedata(_values[0]));
                                return {
                                    valid: [
                                        _values[0],
                                        cityservice.getpchangedata(_values[0])["1"][0],
                                        cityservice.getpchangedata(_values[0])["2"][0]
                                    ]
                                }
                            } else if (_index == 1) {
                                instance.changeWheel(cityservice.getcchangedata(_values[0], _values[1]));
                                return {
                                    valid: [
                                        _values[0],
                                        _values[1],
                                        cityservice.getcchangedata(_values[0], _values[1])["2"][0]
                                    ]
                                }
                            }
                        },
                        onSet: function (event, inst) {
                            $scope.address.showinput = event.valueText;
                            $scope.$apply()
                        }
                    }
                })
        }
        $scope.getdata();

        $scope.sub = function () {
            if (!$scope.workingTime.input) {
                appservice.warn('请输入参加工作的年限', 1000)
                return
            }
            if (!$scope.status.input) {
                appservice.warn('请输入当前工作状态', 1000)
                return
            }

            if ($scope.address.input1) {
                if ($scope.address.input1.length < 10 || $scope.address.input1.length > 100) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if (!(new RegExp("[\\u4E00-\\u9FFF]+", "g")).test($scope.address.input1)) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
                if ($scope.address.input1.search(".*\\d+.*") == -1) {
                    appservice.warn('所在街道门牌号不正确', 1000)
                    return
                }
            }
            if ($scope.userWork.companyPhone) {
                if ($scope.userWork.companyPhone.length < 10 || $scope.userWork.companyPhone.length > 13) {
                    appservice.warn('现单位电话格式不正确', 1000)
                    return
                }
            }
            var item = {
                working_time: $scope.data.workSeniority.filter(function (i) { return i.name == $scope.workingTime.input })[0].id,
                work_status: $scope.data.workingState.filter(function (i) { return i.name == $scope.status.input })[0].id,
                company_name: $scope.userWork.companyName || "",
                current_working_time: "",
                company_address: "",
                company_phone: $scope.userWork.companyPhone || "",
                company_type: $scope.companyType.input || "",
                work_position: $scope.position.input || "",
                month_earning: $scope.monthEarning.input || "",
                id: $scope.userWork.id || "",
            }

            if ($scope.currentWorkingTime.input) {
                item.current_working_time = $scope.data.workSeniority.filter(function (i) { return i.name == $scope.currentWorkingTime.input })[0].id;
            }
            if ($scope.address.input) {
                item.company_address = $scope.address.input + "####" + ($scope.address.input1 ? $scope.address.input1 : "");
            }

            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/submitUserWork.rrh', item
            ).then(function (data) {
                appservice.warn("信息提交成功", 1000, function () {
                    $ionicHistory.goBack(-1);
                })
            })
        }
    })
angular.module('app')
    .controller('lianlianbankcardaddsuc', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        appservice.postdata($rootScope.GLOBAL.payUrl + '/bankcard/saveBankCard.rrh',
            {
                cardno: localStorage.lianlianbindcardno,
                noAgree: JSON.parse(localStorage.lianlianbindsucdata).agreeno
            })
            .then(function (data) {
                appservice.warn(data.result, 1000, function () {
                    $ionicHistory.goBack(-3);
                })
            })
        //POST /bankcard/saveBankCard.rrh
    })
angular.module('app')
    .controller('message', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/home/msgPaging.rrh', { pageSize: 1000, pageNow: 1 })
                .then(function (data) {
                    $scope.data = data.list;
                })
        }
        $scope.getdata();

    })
angular.module('app')
    .controller('mobileauth', function ($scope, $rootScope, appservice, $ionicHistory, $state, $ionicPopup) {
        $scope.getmobile = function () {
            appservice.getdata($rootScope.GLOBAL.coreUrl + '/authorization/getMobile.rrh', {})
                .then(function (data) {
                    $scope.mobilesecuritydata.account = data.result;
                })
        }
        $scope.mobilesecuritydata = {
            account: '',
            password: '',
            type: 'sms',
            smscode: '',
            imgcode: '',
            imgurl: '',
            inStep2: false
        }
        $scope.next1 = function () {
            if ($scope.mobilesecuritydata.password.length > 8 || $scope.mobilesecuritydata.password.length < 6) {
                appservice.warn('服务密码有误,请重新填写', 2000, function () {
                    $scope.mobilesecuritydata.password = '';
                }, true)
                return
            }
            if (isNaN($scope.mobilesecuritydata.password)) {
                appservice.warn('服务密码有误,请重新填写', 2000, function () {
                    $scope.mobilesecuritydata.password = '';
                }, true)
                return
            }
            appservice.warn('此过程可能耗时稍长，请耐心等待', 2000, function () {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_yys_auth.rrh', {
                    password: $scope.mobilesecuritydata.password
                }).then(function (data) {
                    if (data.code == '105') {
                        appservice.warn(data.message, 2000, function () {
                            $ionicHistory.goBack()
                        }, true)
                    } else if (data.code == '104') {
                        appservice.warn(data.data.guide_message, 2000, function () {
                            dogcode(data)
                        }, true)
                    } else {
                        appservice.warn(data.message, 2000, function () {
                            intoStep1()
                        }, true)
                    }
                })
            }, true)


        }
        $scope.next2 = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_input_sms.rrh', {
                authCode: $scope.mobilesecuritydata[$scope.mobilesecuritydata.type + 'code']
            }
            ).then(function (data) {
                if (data.code == '105') {
                    appservice.warn(data.message, 2000, function () {
                        $ionicHistory.goBack()
                    }, true)
                } else if (data.code == '104') {
                    appservice.warn(data.data.guide_message, 2000, function () {
                        dogcode(data)
                    }, true)
                } else {
                    appservice.warn(data.message, 2000, function () {
                        intoStep1()
                    }, true)
                }
            })
        }
        $scope.codeget = function (type) {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/telecomAuthentication/mx_retry.rrh', {
                codeType: type
            }
            ).then(function (data) {
                if (data && data.data && data.data.inputs && data.data.inputs[0] && data.data.inputs[0].type == 'img') {
                    $scope.mobilesecuritydata.imgurl = 'data:image/png;base64,' + data.data.inputs[0].value
                }
            })
        }
        function dogcode(data) {
            if (data.data.guide_code == '90001') {
                intoStep2('sms');
            } else if (data.data.guide_code == '90002') {
                intoStep2('img');
            } else if (data.data.guide_code == '90006') {
                intoStep1()
            }
            else if (data.data.guide_code == '90007') {
                intoStep2('sms');
            }
            else if (data.data.guide_code == '90021') {
                intoStep1()
            }
            else if (data.data.guide_code == '90009') {
                intoStep1()
            }
            else if (data.data.guide_code == '90022') {
                intoStep1()
            }
            else if (data.data.guide_code == '90012') {
                intoStep1()
            }
            else if (data.data.guide_code == '90023') {
                intoStep1()
            }
            else if (data.data.guide_code == '90024') {
                intoStep1()
            }
            else if (data.data.guide_code == '90025') {
                intoStep1()
            }
            else if (data.data.guide_code == '90005') {
                intoStep1()
            }
            else if (data.data.guide_code == '90004') {
                intoStep1()
            }
            else if (data.data.guide_code == '90026') {
                intoStep1()
            }
            else if (data.data.guide_code == '90027') {
                intoStep1()
            }
            else if (data.data.guide_code == '90028') {
                intoStep2('img')
            }
            else if (data.data.guide_code == '90029') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90007') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90010') {
                intoStep1()
            }
            else if (data.data.guide_code == '90030') {
                intoStep1()
            }
            else if (data.data.guide_code == '90031') {
                intoStep1()
            }
            else if (data.data.guide_code == '90032') {
                intoStep2('sms')
            }
            else if (data.data.guide_code == '90033') {
                intoStep1()
            }
            else if (data.data.guide_code == '90020') {
                intoStep1()
            }
            else if (data.data.guide_code == '90034') {
                intoStep1()
            }
            else if (data.data.guide_code == '90035') {
                intoStep1()
            }
        }
        function intoStep1() {
            $scope.mobilesecuritydata.inStep2 = false;
            $scope.mobilesecuritydata.password = "";
            $state.reload()
        }
        function intoStep2(type) {
            $scope.mobilesecuritydata.smscode = '';
            $scope.mobilesecuritydata.imgcode = '';
            $scope.mobilesecuritydata.imgurl = '';
            $scope.mobilesecuritydata.inStep2 = true;
            $scope.mobilesecuritydata.type = type;
        }
        $scope.pop = function () {
            $ionicPopup.alert({
                title: '运营商服务电话',
                cssClass: 'mobilesecuritypopclass',
                templateUrl: 'templates/popmobilesecurity/index.html',
                okText: '我知道了'
            });
        }
        $scope.buttontext = '提交';
        $scope.getmobile()
    })
angular.module('app')
    .controller('login', function ($scope, $rootScope, appservice, $state, $ionicHistory) {
        $scope.login_data = {
            imgurl: "img/icon_yingcang.png",
            inputtype: "password",
            changeimg: function () {
                if ($scope.login_data.imgurl == "img/icon_yingcang.png") {
                    $scope.login_data.imgurl = "img/icon_xianshi.png"
                    $scope.login_data.inputtype = "text";
                } else {
                    $scope.login_data.imgurl = "img/icon_yingcang.png"
                    $scope.login_data.inputtype = "password";
                }
            },
            data: {
                phone: "",
                password: "",
                device_type: 1
            },
            login: function () {
                console.log(122, $rootScope.GLOBAL.userUrl)
                appservice.postdata($rootScope.GLOBAL.userUrl + '/user/login.open', $scope.login_data.data)
                    .then(function (data) {
                        localStorage.token = data.result;
                        appservice.warn("登录成功", 1000, function () {
                            localStorage.removeItem("loginonce");//从渠道已有帐号来的登录一次
                            $scope.loginmodal.remove();
                            if ($state.is('reg')) {
                                $ionicHistory.goBack(-1);
                            } else {
                                $state.reload()
                            }
                        })
                    }, function () {
                        localStorage.removeItem("token")
                    })
            },
            goreg: function () {
                $scope.loginmodal.remove();
                if (!$state.is('reg')) {
                    $state.go('reg')
                }
            }
        }
    })
angular.module('app')
    .controller('modalticket', function ($scope, $rootScope, appservice, $state, $ionicHistory) {
        $scope.status = 0
        appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/getList.rrh', {
            status: $scope.status
        }).then(function (data) {
            $scope.modaldata = data.result;
        }, function () {
            $scope.modaldata = []
        })
        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];
        $scope.sel = function (i) {
            if ($scope.modal.item == i) {
                $scope.modal.item = null
            } else {
                $scope.modal.item = i;
            }
            $scope.modal.hide();

        }
    })
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
angular.module('app')
    .controller('nginclude', function ($scope, appservice, $rootScope, $ionicHistory, $sce, $interval, $state) {
        $scope.url = $sce.trustAsResourceUrl("http://www.91maidan.com" || $rootScope.GLOBAL.iframeurl);
    })
angular.module('app')
    .controller('opinion', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.sub = function () {
            if (!$scope.data.data) {
                appservice.warn('你还没有填写意见唷~', 1500)
            } else {
                appservice.postdata($rootScope.GLOBAL.coreUrl + '/home/feedback.rrh', {
                    content: $scope.data.data
                }).then(function (data) {
                    appservice.warn(data.result, 1000, function () {
                        $ionicHistory.goBack(-1);
                    })
                })
            }

        }
        $scope.data = {
            data: ""
        }
    })
angular.module('app')
    .controller('order', function ($scope, $rootScope, appservice) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/index.rrh', {})
                .then(function (data) {
                    $scope.data = data;
                })
        }
        if (localStorage.token) {
            $scope.getdata();
        }

        $scope.go = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'borrowlist', { status: status })
        }

        $scope.gotransactionlist = function () {

            appservice.goWithTokenwaveloginreg($scope, 'transactionlist')
        }
        $scope.goprerepaymentlist = function (status) {
            appservice.goWithTokenwaveloginreg($scope, 'prerepaymentlist', { status: status })
        }
    })
angular.module('app')
    .controller('orderdetail', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/orderV2/detail.rrh', {
                id: $stateParams.id
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.paybackPlans[0].daysRemaining >= 0 && $scope.data.paybackPlans[0].daysRemaining <= 2) || $scope.data.paybackPlans[0].overdueDays > 0) {
                    $scope.check = true;
                }
                if ($scope.data.status == 7) {
                    $ionicScrollDelegate.freezeScroll(true);
                    $timeout(function () {
                        document.getElementsByClassName('scroll')[0].style.transform = "";
                    }, 500)
                }
            })
        }


        $scope.repayment = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            var vid = ''
            $rootScope.vid = 0;
            if ($scope.modal && $scope.modal.item && $scope.modal.item.id) {
                vid = $scope.modal.item.id
                $rootScope.vid = vid;
            }
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/orderRepayment.rrh', {
                planIds: $scope.data.paybackPlans[0].id,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    appservice.urlback();
                    // $scope.data.status = 7;
                    // $scope.data.pendingRepayment = 0;
                    // $ionicScrollDelegate.freezeScroll(true);
                    // $timeout(function () {
                    //     document.getElementsByClassName('scroll')[0].style.transform = "";
                    // }, 500)

                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.pendingRepayment - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
        }

        $scope.gocontract = function () {
            $state.go('contract')
        }
        $scope.pdfcontractFee = function () {
            $rootScope.GLOBAL.iframeurl = $scope.data.contractFee;
            $state.go('iframe')
        }

        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }

        $scope.modalyhq = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            if (!$scope.modal) {
                $ionicModal.fromTemplateUrl('templates/modalticket/index.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                })
            } else {
                $scope.modal.show();
            }

        }
        // $scope.modalyhq()
        $scope.getdata();
    })



angular.module('app')
    .controller('poprrhcoinslist', function ($scope, $rootScope, appservice) {

    })
angular.module('app')
    .controller('waveloginreg', function ($scope, $rootScope, appservice) {
        $scope.wavegologin = function () {
            $rootScope.popwaveloginreg.close();
            appservice.login()
        }
    })
angular.module('app')
    .controller('prerepaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $timeout, $ionicModal) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/order/pendingRepayment.rrh', {
                pageNow: 1,
                pageSize: 300,
                date: $stateParams.status || 0,
            }).then(function (data) {
                $scope.data = data;
                if (($scope.data.list[0].daysRemaining >= 0 && $scope.data.list[0].daysRemaining <= 2) || $scope.data.list[0].overdueDays > 0) {
                    $scope.check = true;
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.check = false;
        $scope.getdata();

        $scope.sub = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            var vid = ''
            $rootScope.vid = 0;
            if ($scope.modal && $scope.modal.item && $scope.modal.item.id) {
                vid = $scope.modal.item.id
                $rootScope.vid = vid;
            }

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/orderRepayment.rrh', {
                planIds: $scope.data.list[0].planId,
                vouchersId: vid
            }).then(function (data) {
                appservice.warn('还款成功', 1000, function () {
                    $state.go('orderdetail', { id: $scope.data.list[0].id })
                })
            }, function (data) {
                if (data.msg.indexOf('充值') >= 0) {
                    $timeout(function () {
                        $state.go('recharge', { money: $scope.data.list[0].balance - (vid ? $scope.modal.item.deduction : 0) })
                    }, 2100)
                }
            })
        }
        $scope.modalyhq = function () {
            if (!$scope.check) {
                appservice.warn('请选择要还款的记录', 1000);
                return
            }
            if (!$scope.modal) {
                $ionicModal.fromTemplateUrl('templates/modalticket/index.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                })
            } else {
                $scope.modal.show();
            }
        }
        $scope.changecheck = function () {
            $scope.check = !$scope.check;
        }
    })
angular.module('app')
    .controller('recharge', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $interval) {
        $scope.item = {
            num: ''
        }
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd');
                    })
                })
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    if ($stateParams.money) {
                        $scope.item.num = ($stateParams.money - $scope.user.balanceMoney).toFixed(2);
                    }
                    if ($scope.item.num <= 2) {
                        $scope.item.num = "2.00";
                    }
                })
        }


        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.yzm = {
            data: '',
            getyzm: function () {
                if ($stateParams.money) {
                    if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
                        appservice.warn('金额必须要大于等于还款金额', 1000);
                        return
                    }
                }
                if ($scope.item.num > 1) {
                    appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
                        amount: $scope.item.num
                    }).then(function (data) {
                        appservice.warn('短信验证码已发送', 1000);
                        $scope.djs.start();
                    })
                } else {
                    appservice.warn('充值金额要大于1元', 1000);
                    return
                }
            }
        }
        $scope.paytype = 1;//0 易宝；1连连支付

        $scope.checkPayType = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                {
                })
                .then(function (data) {
                    $scope.paytype = data.result;
                    $scope.getdata();

                })
        }

        $scope.sub = function () {
            // if ($stateParams.money) {
            //     if ($scope.item.num < ($stateParams.money - $scope.user.balanceMoney)) {
            //         appservice.warn('金额必须要大于等于还款金额', 1000);
            //         return
            //     }
            // }
            if (!$rootScope.vid) {
                $rootScope.vid = 0;
            }
            if ($scope.paytype == 1) {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/getPayParams.rrh',
                    {
                        amount: $scope.item.num,
                        payback: 'T',
                        urlReturn: $rootScope.GLOBAL.lianliancb,
                        vouchersId: $rootScope.vid
                    })
                    .then(function (data) {
                        $rootScope.vid = 0;
                        localStorage.lianlianform = data.result;
                        $rootScope.GLOBAL.iframeurl = $rootScope.GLOBAL.lianlianiframeurl;
                        $state.go('iframe')
                    })
            } else {
                appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayConfirm.rrh', {
                    validatecode: $scope.yzm.data,
                    payback: 'T'
                }).then(function (data) {
                    appservice.warn('还款成功', 2000, function () {
                        $state.go('order')
                    })
                    // $state.go('rechargesuc', {
                    //     m1: $scope.item.num,
                    //     m2: $scope.item.num + $scope.user.balanceMoney
                    // })
                }, function (err) {
                    if (err.code == 1001) {

                    } else {
                        $state.go('rechargeerror')
                    }

                })
            }

        }

        $scope.checkPayType()
    })
angular.module('app')
    .controller('rechargeerror', function ($scope, $rootScope, appservice, $ionicHistory, $state) {

    })
angular.module('app')
    .controller('rechargesuc', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.m1 = $stateParams.m1;
        $scope.m2 = $stateParams.m2;
    })
angular.module('app')
    .controller('reg', function ($scope, appservice, $rootScope, $state, $interval) {
        $scope.imgurl = "img/icon_yingcang.png";
        $scope.inputtype = "password";
        $scope.changeimg = function () {
            //<easydebug>
            console.log($scope);
            //<easydebug>
            if ($scope.imgurl == "img/icon_yingcang.png") {
                $scope.imgurl = "img/icon_xianshi.png"
                $scope.inputtype = "text";
            } else {
                $scope.imgurl = "img/icon_yingcang.png"
                $scope.inputtype = "password";
            }
        }

        $scope.item = {
            phone: "",
            code: "",
            password: "",
            recommend_id: ""
        }

        $scope.codeimg = {
            show: false,
            baseurl: '',
            code: "",
            change: function () {
                $scope.codeimg.url = $scope.codeimg.baseurl + '?phone=' + $scope.item.phone + '&t=' + new Date();
            }
        }

        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }
        $scope.getcode = function () {
            initNECaptcha({
                captchaId: 'f054a583d9d54d5bacbd0b223bba8fbf',
                element: '#reg',
                mode: 'popup',
                onReady: function (instance) {
                },
                onVerify: function (err, data) {
                    if (err) {
                        return
                    }

                    appservice.postdata($rootScope.GLOBAL.userUrl + '/sms/sendCode.open', {
                        phone: $scope.item.phone,
                        type: 0,
                        captchaCode: data.validate,
                    }).then(function (data) {
                        appservice.warn("短信验证码发送成功", 1000, function () {
                            $scope.codeimg.show = false;
                            $scope.codeimg.code = "";
                            $scope.djs.start();
                        })
                    }, function (errdata) {
                        if (errdata.msg == '请填写图形验证码!' || errdata.msg == "图形验证码输入不正确！") {
                            if (errdata.msg == '请填写图形验证码!') {
                                $scope.codeimg.show = true;
                                $scope.codeimg.baseurl = errdata.data;
                                $scope.codeimg.change();
                            } else {
                                $scope.codeimg.code = "";
                                $scope.codeimg.change();
                            }

                        } else {
                            $scope.codeimg.show = false;
                        }
                    })
                }
            }, function onload(instance) {
                instance.popUp();
            }, function onerror(err) {
            })
        }

        $scope.reg = function () {
            if ($scope.codeimg.show && !$scope.codeimg.code) {
                appservice.warn('请填写图形验证码', 1000);
                return
            } else {
                if ($scope.item.password.search(/^[a-zA-Z\d]{6,16}$/) == -1) {
                    appservice.warn('密码只能是6-16位的数字或字母', 1000);
                    return
                } else {
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/user/register.open', $scope.item).then(function (data) {
                        appservice.warn("注册成功", 1000, function () {
                            localStorage.token = data.result;
                            $rootScope.firstautonym = true;
                            $state.go('homechannel')
                            //$state.go('homechannel')
                        })
                    })
                }
            }

        }

        $scope.login = function () {
            appservice.login($scope)
        }
        $scope.go = function (url) {
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }
    })
angular.module('app')
    .controller('repaymentlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/monthlyRepayment.rrh', {
                pageNow: 1,
                pageSize: 300
            }).then(function (data) {
                $scope.thismonth = new Date().getFullYear() + "年" + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() + 1)) + "月");
                $scope.data = _.groupBy(data.list, 'mothly')
                for (var i in $scope.data) {
                    $scope.data[i].total = _.reduce($scope.data[i], function (a, b) {
                        return a + b.actualRepaymentAmount;
                    }, 0)
                }
            }, function () {
                $scope.nullbg = true;
            })
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('rrhcoins', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate, $ionicPopover) {
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                })
        }

        $scope.sub = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/withdraw.rrh', {})
                .then(function (data) {
                    appservice.warn(data.result, 5000, function () {
                        $state.reload();
                    })
                })
        }

        $scope.getlist = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/huabi/getCurrencyLog.rrh', {})
                .then(function (data) {
                    $scope.data = data.result;
                    showlist();
                }, function () {
                    showlist();
                })
        }

        function showlist() {
            $ionicPopover.fromTemplateUrl('templates/poprrhcoinslist/index.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
                $scope.popover.show();
            });

        }
        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
        $scope.getuser()
    })
angular.module('app')
    .controller('set', function ($scope, $rootScope, appservice, $ionicHistory, $state) {
        $scope.hastoken = localStorage.token;
        $scope.exit = function () {
            localStorage.removeItem('token');
            $ionicHistory.goBack(-1);
        }
        $scope.login = function () {
            appservice.login($scope);
        }
    })
angular.module('app')
    .controller('ticket', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {
        $scope.getdata = function () {

            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/paging.rrh', {
                pageSize: 1000, pageNow: 1, status: $scope.s
            }).then(function (data) {
                $scope.data = data.list;
            }, function () {
                $scope.data = []
            })

        }

        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];

        $scope.s = 0;
        $scope.changes = function (s) {
            if ($scope.s != s) {
                $scope.s = s;
                $scope.getdata();
                $ionicScrollDelegate.scrollTop(true);
            }
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('tickethis', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {
        $scope.getdata = function () {
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/vouchers/paging.rrh', {
                pageSize: 1000, pageNow: 1, status: $scope.s
            }).then(function (data) {
                $scope.data = data.list;
            }, function () {
                $scope.data = []
            })

        }
        $scope.types = ['app', '新用户专享', '邀请好友', 'H5', '其他'];
        $scope.s = 3;
        $scope.changes = function (s) {
            if ($scope.s != s) {
                $scope.s = s;
                $scope.getdata();
                $ionicScrollDelegate.scrollTop(true);
            }
        }
        $scope.getdata();
    })
angular.module('app')
    .controller('transactionlist', function ($scope, $rootScope, appservice, $ionicHistory, $state, $stateParams, $ionicPopover, $ionicScrollDelegate) {
        $scope.getdata = function (tp) {
            $scope.data = null;
            $scope.nullbg = false;
            $ionicScrollDelegate.scrollTop();
            appservice.postdata($rootScope.GLOBAL.coreUrl + '/repayment/selectTranRec.rrh', {
                tranType: tp || "",
                pageNow: 1,
                pageSize: 200
            }).then(function (data) {
                $scope.thismonth = new Date().getFullYear() + "年" + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() + 1)) + "月");
                $scope.data = _.groupBy(data.list, 'monthAt')
                for (var i in $scope.data) {
                    $scope.data[i].total = _.reduce($scope.data[i], function (a, b) {
                        return a + b.changeMoney * b.logType;
                    }, 0)
                }
                if ($scope.popover) {
                    $scope.popover.hide();
                }
            }, function () {
                $scope.nullbg = true;
                if ($scope.popover) {
                    $scope.popover.hide();
                }
            })
        }
        $scope.getdata();

        $scope.sel = function (e) {
            var arr = [
                { tp: 1, name: '放款' },
                { tp: 2, name: '还款' },
                { tp: 3, name: '充值' },
                { tp: 4, name: '提现' }
            ]
            var html = arr.reduce(function (i, ii) {
                return i + '<div class="transactionlistpopdiv" ng-click="getdata(' + (ii.tp) + ')">' + ii.name + '</div>'
            }, '')
            var template = '<ion-popover-view class="transactionlistpop"<ion-content> ' + html + '</ion-content></ion-popover-view>';
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.popover.show(e);
        }

        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            if ($scope.popover) {
                $scope.popover.hide();
            }
        });
    })
angular.module('app')
    .controller('usephone', function ($state) {
        if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            $state.go('home')
        }
    })
angular.module('app')
    .controller('wechatauth', function ($scope, $rootScope, appservice, $ionicHistory, $state, $interval) {
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        function goSuccess() {
            if ($scope.state == 'wechat_invitation') {
                if (GLOBAL.debug) {
                    window.location.href = '//testm.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                } else {
                    window.location.href = '//app.renrenhua.com/rrhh5/#/invitation/' + localStorage.token
                }
            } else if ($scope.state == 'wechat_reg') {
                $state.go('homechannel', {
                    hasaccount: -1
                })
            } else if ($scope.state == 'wechat_repayment') {
                $state.go('prerepaymentlist')
            }
        }
        function goError() {
            var _url = '';
            if (GLOBAL.debug) {
                url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae645be1ce5e2637&redirect_uri=http%3A%2F%2Ftestm.renrenhua.com%2Fwechat%2F%23%2Fwechatauth&response_type=code&scope=snsapi_userinfo&state=' + $scope.state
            } else {
                url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxae645be1ce5e2637&redirect_uri=http%3A%2F%2Fapp.renrenhua.com%2Fwechat%2F%23%2Fwechatauth&response_type=code&scope=snsapi_userinfo&state=' + $scope.state
            }
            window.location.href = url
        }
        function goReg() {
            $scope.show = true;
        }

        $scope.code = GetQueryString('code');
        $scope.state = GetQueryString('state');
        $scope._isFromWechatAuthHasReg = true;
        $scope.openid;

        $scope.item = {
            phone: "",
            code: "",
            password: "",
            recommend_id: "",
            channel_id: 10
        }

        $scope.djs = {
            time: 0,
            start: function () {
                var that = this;
                that.time = 60;
                that.interval = $interval(function () {
                    that.time--;
                    if (that.time == 0) {
                        $interval.cancel(that.interval)
                    }
                }, 1000)
            }
        }

        $scope.getcode = function () {
            initNECaptcha({
                captchaId: 'f054a583d9d54d5bacbd0b223bba8fbf',
                element: '#captcha1',
                mode: 'popup',
                onReady: function (instance) {
                },
                onVerify: function (err, data) {
                    if (err) {
                        return
                    }
                    appservice.postdata($rootScope.GLOBAL.userUrl + '/sms/sendCode.open', {
                        phone: $scope.item.phone,
                        type: 2,
                        captchaCode: data.validate,
                    }).then(function (data) {
                        $scope._isFromWechatAuthHasReg = data.exist;
                        appservice.warn("短信验证码发送成功", 1000, function () {
                            $scope.djs.start();
                        })
                    }, function (errdata) {
                    })
                }
            }, function onload(instance) {
                instance.popUp();
            }, function onerror(err) {
            })
        }

        $scope.jump = function (type) {
            var url = '';
            if (type == 2) {
                url = '//app.renrenhua.com/rrhprotocolh5/registerProtocol.html';
            } else if (type == 1) {
                url = '//app.renrenhua.com/rrhprotocolh5/creditAuthorizationProtocol.html';
            } else {
                url = '//app.renrenhua.com/rrhprotocolh5/cost.html';
            }
            $rootScope.GLOBAL.iframeurl = url;
            $state.go('iframe')
        }

        $scope.init = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/nonpartyAccredit.open', {
                code: $scope.code || '', type: 1
            }).then(function (data) {
                ///已经注册+绑定
                localStorage.token = data.result;
                goSuccess();
            }, function (data) {
                ///未绑定
                if (data.code == 1001) {
                    $scope.openid = data.msg;
                    goReg();
                }
                ///code有问题
                else if (data.code == 1002) {
                    goError();
                }
            })
        }

        $scope.reg = function () {
            if (!$scope._isFromWechatAuthHasReg) {
                if (!$scope.item.password) {
                    appservice.warn('请输入密码', 1000);
                    return;
                }
                if ($scope.item.password.search(/^[a-zA-Z\d]{6,16}$/) == -1) {
                    appservice.warn('密码只能是6-16位的数字或字母', 1000);
                    return
                }
            }
            appservice.postdata($rootScope.GLOBAL.userUrl + '/userV2/nonpartyAccreditRegister.open', {
                openId: $scope.openid,
                mobile: $scope.item.phone,
                code: $scope.item.code,
                password: $scope.item.password || '',
                inviteCode: $scope.item.recommend_id || ''
            }).then(function (data) {
                localStorage.token = data.result;
                goSuccess();
            }, function (errdata) {
            })
        }
        $scope.init()

    })
angular.module('app')
    .controller('withdraw', function ($scope, $rootScope, appservice, $ionicHistory, $state, $timeout) {
        $scope.getdata = function () {
            appservice.getdata($rootScope.GLOBAL.payUrl + "/bankcard/getBankCardByUser.rrh", {})
                .then(function (data) {
                    $scope.data = data;
                    $scope.getuser()
                }, function () {
                    appservice.warn('尚未绑定银行卡，请先去绑定银行卡', 1000, function () {
                        //$ionicHistory.goBack(-1);
                        $rootScope.withdrawTObankcardadd = true;
                        $state.go('bankcardadd')
                    })
                })
        }
        $scope.item = {
            num: ''
        }
        $scope.getuser = function () {
            appservice.postdata($rootScope.GLOBAL.userUrl + '/user/info.rrh', {})
                .then(function (data) {
                    $scope.user = data;
                    $scope.item.num = data.balanceMoney;
                })
        }

        $scope.getdata()

        // $scope.yzm = {
        //     data: '',
        //     getyzm: function () {
        // if ($scope.item.num > 0.01) {
        //     appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendBindPayRequest.rrh', {
        //         amount: ($scope.item.num).toFixed(2)
        //     }).then(function (data) {
        //         appservice.warn('短信验证码已发送', 1000);
        //     })
        // } else {
        //     appservice.warn('充值金额要大于1元', 1000);
        //     return
        // }
        //     }
        // }


        $scope.sub = function () {
            if ($scope.item.num > 1) {
                appservice.getdata($rootScope.GLOBAL.payUrl + '/pay/getAccessType',
                    {
                    })
                    .then(function (data) {
                        if (data.result == '1') {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/lianlianPay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })

                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        } else {
                            appservice.postdata($rootScope.GLOBAL.payUrl + '/pay/sendRemitRequest.rrh', {
                                amount: ($scope.item.num * 1).toFixed(2),
                                payee_Mobile: $scope.user.mobile
                            }).then(function (data) {
                                appservice.warn(data.result, 1000, function () {
                                    $ionicHistory.goBack(-1);
                                })
                            }, function () {
                                $timeout(function () {
                                    $ionicHistory.goBack(-1);
                                }, 2200)
                                //$ionicHistory.goBack(-1);
                                // $state.go('rechargeerror')
                            })
                        }
                    })


            } else {
                appservice.warn('提现金额要大于1元', 1000);
                return
            }
        }
    })
angular.module('app')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
    })
    .factory('interceptor', function ($injector, $rootScope, $q, $timeout) {
        var interceptor = {
            'request': function (config) {
                config.headers.client = window.GLOBAL.client;
                config.headers.model = window.navigator.userAgent;
                config.headers.deviceid = window.navigator.userAgent;
                config.headers.version = window.GLOBAL.version;
                if (localStorage.token) {
                    config.headers.token = localStorage.token;
                }
                if (config.url.indexOf('templates/') >= 0) {

                } else {
                    if ($rootScope.xhrcount) {
                        $rootScope.xhrcount++;
                    } else {
                        $rootScope.xhrcount = 1;
                        $injector.get('appservice').load()
                    }
                }

                return config;
            },
            'response': function (response) {
                if (response.config.url.indexOf('templates/') >= 0) {
                } else {
                    $rootScope.xhrcount--;
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                }
                if (response.data && response.data.code) {
                    if (response.data.code == 1000) {
                        return response.data.data;
                    } else {
                        if (response.data.code == 1401) {  ///登录失效
                            return $q(function (res, rej) {
                                $injector.get('appservice').warn(response.data.msg, 2000, function () {
                                    localStorage.removeItem("token");
                                    rej()
                                    $injector.get('appservice').login()
                                })
                            })
                        } else if (response.data.code == 1111) {  ///列表空不提示报错
                            return $q(function (res, rej) {
                                rej(response.data)
                            })
                        } else {///其他类型报错
                            return $q(function (res, rej) {
                                if (response.config.url.indexOf('userV2/nonpartyAccredit.open') >= 0 || response.config.url.indexOf('huabi/getCurrencyLog.rrh') >= 0 || response.config.url.indexOf('queryUserIdcard.rrh') >= 0 || response.config.url.indexOf('/bankcard/getBankCardByUser.rrh') >= 0) {
                                    $timeout(function () {
                                        rej(response.data)
                                    })
                                } else {
                                    $injector.get('appservice').warn(response.data.msg, 2000)
                                    rej(response.data)
                                }
                            })
                        }

                    }
                } else {
                    return response;
                }

            },
            'responseError': function (rejection) {
                $rootScope.xhrcount--;
                $injector.get('appservice').warn('网络错误，请稍后重试', 1000, function () {
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                })
                return $q.reject('responseError');
            },
            'requestError': function (rejection) {
                $rootScope.xhrcount--;
                $injector.get('appservice').warn('网络错误，请稍后重试', 1000, function () {
                    if ($rootScope.xhrcount == 0) {
                        $injector.get('appservice').loadhide()
                    }
                })
                return $q.reject('requestError');
            }
        }
        return interceptor;
    })
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
; (function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 600) {
        docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        // docEl.style.fontSize = 20 * (600 / 375) + 'px';
      } else {
        docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
      }

    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//下单进来
function rrhsesame() {
  window.location.href = window.location.href.replace('iframe', 'downloadchannel')
}
///我的认证进来
function rrhsesame2() {
  window.location.href = window.location.href.replace('iframe', 'my')
}
function rrhh5back() {
  window.history.back()
}

function wechatchannelback() {
  window.history.back()
}
function lianlianbind(data) {
  localStorage.lianlianbindsucdata = data.data;
  window.location.href = window.location.href.replace('iframe', 'lianlianbankcardaddsuc')
}

function lianlianbindwarn(data) {
  window.rrhwechatappservice.warn(data.data, 3000, window.rrhwechatappservice.urlback)
}

function lianlianrecharge(data) {
  if (data.data == 'suc') {
    window.rrhwechatappservice.warn('系统处理中', 1000, function () {
      //window.rrhwechatappservice.urlback(-2)
      window.rrhwechatappservice.urlgo('prerepaymentlist', {})
    })
  } else {
    window.rrhwechatappservice.warn('还款失败', 1000, function () {
      // window.rrhwechatappservice.urlback(-2)
      window.rrhwechatappservice.urlgo('prerepaymentlist', {})
    })
  }
}

function receiveMessage(e) {
  var data = e.data;
  if (data == "rrhsesame") {
    rrhsesame();
  } else if (data == 'rrhsesame2') {
    rrhsesame2()
  } else if (data == 'rrhh5back') {
    rrhh5back()
  } else if (data == 'wechatchannelback') {
    wechatchannelback()
  } else if (data && data.type == 'lianlianbind') {
    lianlianbind(data);
  } else if (data && data.type == 'lianlianbindwarn') {
    lianlianbindwarn(data);
  } else if (data && data.type == 'lianlianrecharge') {
    lianlianrecharge(data);
  }
}

if (typeof window.addEventListener != 'undefined') {//使用html5 的postMessage必须处理的 
  window.addEventListener('message', receiveMessage, false);
} else if (typeof window.attachEvent != 'undefined') {
  window.attachEvent('onmessage', receiveMessage);
}

function getScaleImg(e, cb) {
  var file = e.target.files[0];
  var rd = new FileReader();
  var image = new Image();
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  image.onload = function () {
    var w = image.naturalWidth,
      h = image.naturalHeight;
    var max = 2000;//尺寸;
    var maxsize = 1 * 1024 * 1024;//大小M
    var size = 1;//大小倍率
    var scale = 1;
    if (w < max && h < max) {
      canvas.width = w;
      canvas.height = h;
    } else {
      if (w > h) {
        canvas.width = max;
        canvas.height = max / w * h;
        scale = max / w;
      } else {
        canvas.height = max;
        canvas.width = max / h * w;
        scale = max / h;
      }
    }
    ctx.scale(scale, scale)
    ctx.drawImage(image, 0, 0);
    var ctxdata = canvas.toDataURL("image/jpeg", 1);
    if (ctxdata.length > maxsize) {
      size = maxsize / ctxdata.length;
    }
    var data = canvas.toDataURL("image/jpeg", size);
    cb(data);
  }
  rd.readAsDataURL(file);
  rd.onload = function () {
    image.src = rd.result;
  }
}


function addStyleSheet(styles) {//参数是样式表的规则；【可以是字符串，规则对象】
  var styleSheet, styleEle;
  if (document.createStyleSheet) {//IE中，添加样式表
    styleSheet = document.createStyleSheet();
  } else {
    var head = document.getElementsByTagName("head")[0];
    styleEle = document.createElement("style");
    head.appendChild(styleEle);
    var sheets = document.styleSheets;
    styleSheet = sheets[sheets.length - 1];//得到最后的一个样式表【最新添加的一个】
  }
  if (typeof styles == "string") {
    if (styleEle) {
      styleEle.innerHTML = styles;
    } else {
      styleSheet.cssText = styles;
    }
  } else {//这个参数是规则对象
    var i = 0;
    for (selector in styles) {
      var cssTxt = styles[selector];
      if (styleSheet.insertRule) {
        var ruleText = selector + "{" + cssTxt + "}";
        styleSheet.insertRule(ruleText, i++);
      } else if (styleSheet.addRule) {
        styleSheet.addRule(selector, cssTxt, i++);
      }
    }
  }
}
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('templates/about/index.html','<ion-view title="\u5173\u4E8E\u4EBA\u4EBA\u82B1" id="about">\n    <ion-content>\n        <div class="d0">\n            <img src="img/information_icon@3x.png" alt="">\n            <h2>{{GLOBAL.version}}</h2>\n        </div>\n        <div class="d1 rrhback" ng-click="goiframe(\'app.renrenhua.com/rrhprotocolh5/registerProtocol.html\')">\u4EBA\u4EBA\u82B1\u5E73\u53F0\u6CE8\u518C\u4F7F\u7528\u534F\u8BAE</div>\n        <div class="d1 rrhback" ng-click="goiframe(\'app.renrenhua.com/rrhprotocolh5/creditAuthorizationProtocol.html\')">\u5F81\u4FE1\u8C03\u67E5\u6388\u6743\u534F\u8BAE</div>\n        <div class="d1 rrhback" ng-click="goiframe(\'app.renrenhua.com/rrhprotocolh5/cost.html\')">\u5E73\u53F0\u501F\u6B3E\u4EBA\u8D39\u7528\u8868</div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/accountlist/index.html','<ion-view title="\u8D26\u6237\u660E\u7EC6" id="accountlist">\n    <ion-content>\n        <div class="nulldata" ng-if="!data">\n            <img src="img/icon_empty_normal@3x.png" alt="">\n            <h2>\u6682\u65E0\u6570\u636E</h2>\n        </div>\n        <div class="out" ng-repeat="i in data">\n            <div class="in">\n                <div class="up">\n                    {{i.createdAt| date:\'yyyy-MM-dd HH:mm:ss\'}}\n                    <span>{{i.logType==1?\'+\':\'-\'}}{{i.changeMoney|number:2}}\u5143</span>\n                </div>\n                <div class="down">\n                    {{i.note}}\n                    <span>\u4F59\u989D:{{i.afterMoney|number:2}}</span>\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/authlist/index.html','<ion-view title="\u6211\u7684\u8BA4\u8BC1" id="authlist">\n    <ion-content>\n        <div class="warn">\u5B8C\u6210\u8BA4\u8BC1\u8D8A\u591A,\u501F\u6B3E\u6210\u529F\u7387\u8D8A\u9AD8</div>\n        <div class="out rrhback" ng-click="go(i)" ng-repeat="i in data.list" ng-if="i.title!=\'\u4EAC\u4E1C\u8BA4\u8BC1\'&&i.title!=\'\u652F\u4ED8\u5B9D\u8BA4\u8BC1\'&&i.title!=\'\u6DD8\u5B9D\u8BA4\u8BC1\'">\n            <div class="authitem">\n                <img ng-src="{{i.icon}}" alt=""> {{i.title}}\n                <span ng-if="i.status==0" class=\'s0\'>\u672A\u5B8C\u6210</span>\n                <span ng-if="i.status==1" class=\'s1\'>\u8BA4\u8BC1\u4E2D</span>\n                <span ng-if="i.status==2" class=\'s2\'>\u8BA4\u8BC1\u5931\u8D25</span>\n                <span ng-if="i.status==3" class=\'s3\'>\u5DF2\u5B8C\u6210</span>\n                <span ng-if="i.status==4" class=\'s4\'>\u5DF2\u8FC7\u671F</span>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/authlistchannel/index.html','<ion-view title="\u66F4\u591A\u8BA4\u8BC1" id="authlist">\n    <ion-content>\n        <div class="warn">\u5B8C\u6210\u4EE5\u4E0B\u6B65\u9AA4,\u5BA1\u6838\u901A\u8FC7\u540E\u5C31\u53EF\u4EE5\u63D0\u73B0\u4E86</div>\n        <div class="out" ng-class="{\'rrhback\':i.status==2||i.status==0}" ng-click="go(i)" ng-repeat="i in data.result">\n            <div class="authitem">\n                <img ng-src="{{i.icon}}" alt=""> {{i.authName}}\n                <span class=\'suc channelspan\' ng-if="i.authName.indexOf(\'\u94F6\u884C\')>=0&&i.status==3">\u7ED1\u5B9A\u6210\u529F</span>\n                <span class="must channelspan" ng-if="i.authName.indexOf(\'\u94F6\u884C\')>=0&&i.status==0">\u5FC5\u987B\u7ED1\u5B9A</span>\n\n                <span class=\'must channelspan\' ng-if="i.authName.indexOf(\'\u8FD0\u8425\u5546\')>=0&&i.status==0">\u5FC5\u987B\u8BA4\u8BC1</span>\n                <span class=\'in channelspan\' ng-if="i.authName.indexOf(\'\u8FD0\u8425\u5546\')>=0&&i.status==1">\u8BA4\u8BC1\u4E2D</span>\n                <span class=\'fail channelspan\' ng-if="i.authName.indexOf(\'\u8FD0\u8425\u5546\')>=0&&i.status==2">\u8BA4\u8BC1\u5931\u8D25</span>\n                <span class="suc channelspan" ng-if="i.authName.indexOf(\'\u8FD0\u8425\u5546\')>=0&&i.status==3">\u8BA4\u8BC1\u6210\u529F</span>\n            </div>\n        </div>\n        <button class="button sub" ng-click="sub()" ng-disabled="!cannext">\u4E0B\u4E00\u6B65</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/autonym/index.html','<ion-view title="\u829D\u9EBB\u8BA4\u8BC1" id="autonym">\n    <ion-content>\n        <input type="file" class="hideinputfile" id="cardfile1" accept="image/*">\n        <div class="warn">\u8EAB\u4EFD\u8BA4\u8BC1\u4FE1\u606F\u4FDD\u5B58\u540E\u5C06\u65E0\u6CD5\u4FEE\u6539\uFF0C\u8BF7\u52A1\u5FC5\u4FDD\u8BC1\u6B63\u786E</div>\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input cardinput">\n                    <span class="req">* </span>\n                    <span class="input-label">\u59D3\u540D</span>\n                    <input type="text" ng-model="data.realName" ng-disabled="data.status==1" placeholder="\u8BF7\u586B\u5199\u771F\u5B9E\u59D3\u540D">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input cardinput">\n                    <span class="req">* </span>\n                    <span class="input-label">\u8EAB\u4EFD\u8BC1</span>\n                    <input type="text" ng-model="data.idcardNum" ng-disabled="data.status==1" maxlength="18" placeholder="\u8BF7\u586B\u5199\u8EAB\u4EFD\u8BC1\u53F7\u7801">\n                </label>\n            </div>\n            <div class="out">\n                <div class="cardimginput">\n                    <div class="left">\n                        <div class="l1">\n                            <span class="req">*</span>\u8EAB\u4EFD\u8BC1\u6B63\u9762\u7167</div>\n                        <div class="l2">\n                            <span class="notreq">*</span>(\u8BC1\u4EF6\u53F7\u6E05\u6670\u53EF\u89C1)</div>\n                    </div>\n                    <div class="right">\n                        <img src="img/img_succeed@3x.png" alt="" class="suc" ng-if="img.hascheck">\n                        <img ng-src="{{data.idcardKey?data.idcardKey:(img.hascheck?img.data.img_url:\'img/icon_paizhao_normal.png\')}}" alt="" ng-click="img.post()"\n                            ng-disabled="data.status==1" class="cardimg">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="zhima">\n            <img src="img/icon_zhimaxinyong_normal.png" alt="">\n            <h2>\u829D\u9EBB\u4FE1\u7528</h2>\n            <h3>\u6211\u4EEC\u9700\u8981\u60A8\u6388\u6743\u829D\u9EBB\u4FE1\u7528</h3>\n            <h3>\u826F\u597D\u7684\u4FE1\u7528\u8BB0\u5F55\u4F1A\u52A0\u901F\u5BA1\u6838\u548C\u63D0\u9AD8\u989D\u5EA6</h3>\n            <button class="button" ng-click="zmop()" ng-disabled="!data.zmopUrl">\u6388\u6743</button>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/autonymchannel/index.html','<ion-view title="\u5B9E\u540D\u8BA4\u8BC1" id="autonym">\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <!-- <img src="img/step1.png" alt="" class="orderstep"> -->\n        <!--<div class="warn channel">\u8BA9\u6211\u4EEC\u77E5\u9053\u4F60\u662F\u8C01</div>-->\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input cardinput">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u771F\u5B9E\u59D3\u540D</span>\n                    <input type="text" ng-model="item.name" ng-disabled="user&&user.certification">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input cardinput">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u8EAB\u4EFD\u8BC1\u53F7</span>\n                    <input type="text" ng-model="item.id" ng-disabled="user&&user.certification" maxlength="18">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input cardinput">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u4E0A\u4F20\u8EAB\u4EFD\u8BC1\u7167\u7247</span>\n                    <input type="text" ng-disabled="true">\n                </label>\n            </div>\n            <div class="out">\n                <div class="cardimg row row-no-padding row-center">\n                    <div class="col col-50 cardimgtext">\n                        <h2>\u8EAB\u4EFD\u8BC1\u6B63\u9762\u7167</h2>\n                        <h3>(\u8BC1\u4EF6\u53F7\u6E05\u6670\u53EF\u89C1)</h3>\n                    </div>\n                    <div class="col col-50 cardimgimg">\n                        <img ng-src="{{checkfront?frontdata.img_url:\'img/img_sfz_front.png\'}}" alt="" class="img">\n                        <img src="img/suc.png" alt="" class="suc" ng-if="frontdata.img_url">\n                        <img src="img/camera.png" alt="" class="camera" ng-if="showfrontcamera">\n                        <input type="file" class="hideinputfile" id="cardfile11" ng-disabled="user&&user.certification" accept="image/*">\n                    </div>\n                </div>\n            </div>\n            <div class="out">\n                <div class="cardimg row row-no-padding row-center">\n                    <div class="col col-50 cardimgtext">\n                        <h2>\u8EAB\u4EFD\u8BC1\u53CD\u9762\u7167</h2>\n                        <h3>(\u6709\u6548\u671F\u6E05\u6670\u53EF\u89C1)</h3>\n                    </div>\n                    <div class="col col-50 cardimgimg">\n                        <img ng-src="{{checkback?backdata.img_url:\'img/img_sfz_back.png\'}}" alt="" class="img">\n                        <img src="img/suc.png" alt="" class="suc" ng-if="backdata.img_url">\n                        <img src="img/camera.png" alt="" class="camera" ng-if="showbackcamera">\n                        <input type="file" class="hideinputfile" id="cardfile22" ng-disabled="user&&user.certification" accept="image/*">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/bankcard/index.html','<ion-view title="\u6211\u7684\u94F6\u884C\u5361" id="bankcard" hide-nav-bar=\'false\'>\n    <!--<ion-header-bar>\n\n        <button class="button button-light" ui-sref=\'my\'><i class="icon ion-ios-arrow-back"></i> </button>\n\n        <h1 class="title">\u6211\u7684\u94F6\u884C\u5361</h1>\n    </ion-header-bar>-->\n    <ion-content>\n        <button class="button addbt" ui-sref=\'bankcardadd\' ng-if="!data">\u6DFB\u52A0\u6536\u6B3E\u94F6\u884C\u5361</button>\n        <div class="list" ng-if="data">\n            <div class="item item-borderless">\n                <h2>{{data.bankname}} {{data.cardno|hidebankcard}}</h2>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/bankcardadd/index.html','<ion-view title="\u7ED1\u5B9A\u94F6\u884C\u5361" id="bankcardadd">\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="supportbank()">\u652F\u6301\u94F6\u884C</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="warn">\u5C0F\u82B1\u63D0\u793A:\u94F6\u884C\u5361\u5FC5\u987B\u4E3A\u501F\u6B3E\u4EBA\u672C\u4EBA\u6240\u6709</div>\n        <div class="sfz" ng-if="data">\n            <div class="d1">\u6301\u5361\u4EBA\u59D3\u540D:{{data.realName}}</div>\n            <div class="d2">\u8EAB\u4EFD\u8BC1\u53F7\u7801:{{data.idcardNum|hidebankcard}}</div>\n        </div>\n        <div class="rrhlabellist">\n            <div class="out" ng-if="paytype==\'0\'">\n                <label class="item item-input infolabel">\n                    <span class="input-label">\u94F6\u884C\u5361\u9884\u7559\u624B\u673A\u53F7</span>\n                    <input type="text" placeholder="\u8BF7\u8F93\u5165\u94F6\u884C\u5361\u9884\u7559\u624B\u673A\u53F7" ng-model="item.phone"  maxlength="11"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="input-label">\u94F6\u884C\u5361\u53F7</span>\n                    <input type="text" placeholder="\u8BF7\u8F93\u5165\u672C\u4EBA\u7684\u94F6\u884C\u5361\u53F7" ng-model="item.cardno"/>\n                </label>\n            </div>\n            <div class="out" ng-if="paytype==\'0\'">\n                <div class="item infolabel item-input-wrapper">\n                    <span class="input-label yzmlabel">\u77ED\u4FE1\u9A8C\u8BC1\u7801</span>\n                    <input type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" class="yzminput" ng-model="yzm.data" />\n                    <button class="button yzmbt" ng-click="yzm.getyzm()" ng-disabled="!item.phone||!item.cardno||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n                </div>\n            </div>\n        </div>\n        <button ng-if="paytype==\'1\'" class="button addbt" ng-click="sub()" ng-disabled="!item.phone||!item.cardno">\u786E\u5B9A\u7ED1\u5361</button>\n        <button ng-if="paytype==\'0\'" class="button addbt" ng-click="sub()" ng-disabled="!item.phone||!item.cardno||!yzm.data">\u786E\u5B9A\u7ED1\u5361</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/borrowlist/index.html','<ion-view title="\u501F\u6B3E\u5217\u8868" id="borrowlist">\n    <ion-content>\n        <div class="nulldata" ng-if="nullbg">\n            <img src="img/img_2@3x.png" alt="">\n            <h2>\u541B\u5B50\u65E0\u8FD1\u5FE7</h2>\n        </div>\n        <div class="out" ng-repeat="i in data.list" ui-sref=\'orderdetail({id:i.id})\' ng-class="{\'t1\':i.overdueDays>0&&(i.status==6||i.status==8),\'t2\':(i.daysRemaining>=0&&i.daysRemaining<=2)&&(i.status==6||i.status==8)}">\n            <h2> {{i.productName}}</h2>\n            <h3> \u8BA2\u5355\u53F7:{{i.orderNo}}</h3>\n            <h4>\n                <span class="left" ng-if="[3,5].indexOf(i.status)<0">{{i.balance|number:2}}\u5143</span>\n                <span class="right" ng-if="[1,2,4,9].indexOf(i.status)>=0">{{i.updatedAt|date:"yyyy-MM-dd"}}\u7533\u8BF7</span>\n                <span class="right" ng-if="[3,5,10,11].indexOf(i.status)>=0">{{i.updatedAt|date:"yyyy-MM-dd"}}\u9A73\u56DE</span>\n                <span class="right" ng-if="[7].indexOf(i.status)>=0">{{i.updatedAt|date:"yyyy-MM-dd"}}\u8FD8\u6E05</span>\n                <span class="right" ng-if="[6,8].indexOf(i.status)>=0">{{i.updatedAt|date:"yyyy-MM-dd"}}\u653E\u6B3E</span>\n            </h4>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/contract/index.html','<ion-view title="\u5BA1\u6838\u901A\u8FC7" id="contract">\n    <ion-content>\n        <div class="warn">\u60A8\u7684\u501F\u6B3E\u7533\u8BF7\u5DF2\u7ECF\u901A\u8FC7\u4E86\uFF0C\u8BF7\u786E\u8BA4\u4EE5\u4E0B\u4FE1\u606F</div>\n        <div class="out">\n            <div class="in">\n                \u8D37\u6B3E\u91D1\u989D(\u5143)\n                <span>{{data.req_money|number:2}}</span>\n            </div>\n        </div>\n        <div class="out">\n            <div class="in">\n                \u8D37\u6B3E\u671F\u9650\n                <span>{{data.loan_term}}\u5929</span>\n            </div>\n        </div>\n        <div class="out">\n            <div class="in">\n                \u5230\u671F\u5E94\u8FD8(\u5143)\n                <span>{{data.req_money|number:2}}</span>\n            </div>\n        </div>\n        <div class="out">\n            <div class="in">\n                \u670D\u52A1\u8D39(\u5143)\n                <span>{{data.service_cost|number:2}}</span>\n            </div>\n        </div>\n        <div class="out">\n            <div class="in">\n                \u8FD0\u8425\u8D39(\u5143)\n                <span>{{data.month_cost|number:2}}</span>\n            </div>\n        </div>\n        <button class="button sub" ng-click="sub()">\u786E\u5B9A\u501F\u6B3E</button>\n        <div class="gocontract" ng-click="goh5contract()">\u786E\u8BA4\u540C\u610F\u5373\u4EE3\u8868\u540C\u610F\u7B7E\u8BA2 <span>\u300A\u4EBA\u4EBA\u82B1\u501F\u6B3E\u534F\u8BAE\u300B</span></div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/contractsuc/index.html','<ion-view title="\u7B7E\u7EA6\u6210\u529F" id="contractsuc">\n    <ion-content>\n        <img src="img/qianyue_normal-1.png" alt="">\n        <h2>\u606D\u559C\u60A8\uFF0C\u501F\u6B3E\u534F\u8BAE\u7B7E\u8BA2\u6210\u529F\uFF0C\u6211\u4EEC\u4F1A\u572824 \u5C0F\u65F6\u5185\u653E\u6B3E\uFF0C\u653E\u6B3E\u6210\u529F\u540E\u4F1A\u53D1\u9001\u77ED\u4FE1\u7ED9 \u60A8\uFF0C\u5C4A\u65F6\u60A8\u53EF\u4EE5\u5728\u4E2A\u4EBA\u4E2D\u5FC3\u8FDB\u884C\u63D0\u73B0\uFF01</h2>\n        <h3>\u5BA2\u670D\u70ED\u7EBF:400-600-0918</h3>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/downloadchannel/index.html','<ion-view title="\u8BA4\u8BC1\u6210\u529F" id="downloadchannel">\n    <ion-content>\n        <img src="img/download911.png" alt="" class="download" ng-click="do()">\n\n        <!-- <img src="img/pass_img.png" alt="" class="img1">\n        <h2>\u606D\u559C\u60A8\u5DF2\u5B8C\u6210\u8BA4\u8BC1\uFF01</h2>\n        <h3>\u9A6C\u4E0A\u4E0B\u8F7DAPP\uFF0C\u5B8C\u6210\u6D3B\u4F53\u8BA4\u8BC1\u5373\u7533\u8BF7\u6210\u529F\u5566\uFF01</h3>\n        <button class="button bt1" ng-click="do()">\u9A6C\u4E0A\u4E0B\u8F7D\u4EBA\u4EBA\u82B1APP</button>\n        <button class="button bt2" ng-click="more($event)">\u66F4\u591A\u798F\u5229</button>\n        <h4>\u4E0B\u8F7D\u5B89\u88C5\u6210\u529F\u540E\uFF0C\u4E00\u6B65\u5B8C\u6210\u7533\u8BF7\uFF0C\u5BA1\u6838\u901A\u8FC7\u76F4\u63A5\u6253\u6B3E \u5230\u94F6\u884C\u5361!</h4>\n        <img src="img/diagram_img.png" alt="" class="img2"> -->\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/editpwd/index.html','<ion-view title="\u4FEE\u6539\u5BC6\u7801" id="reg">\n    <ion-content>\n        <div class="empty rrhbg"></div>\n        <div class="list">\n            <div class="item item-input rrhbdcolor">\n                <input type="text" placeholder="\u9A8C\u8BC1\u7801" ng-model="item.sms_code">\n                <button class="button  yzmbt" ng-click="getcode()" ng-disabled="!item.phone||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n            </div>\n            <div class="item item-input rrhbdcolor">\n                <input type="{{inputtype}}" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" ng-model="item.password" maxlength="16">\n                <img ng-src="{{imgurl}}" alt="" ng-click="changeimg()">\n            </div>\n            <div class="item item-input rrhbdcolor">\n                <input type="{{inputtype1}}" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801" ng-model="item.password1" maxlength="16">\n                <img ng-src="{{imgurl1}}" alt="" ng-click="changeimg1()">\n            </div>\n        </div>\n        <button class="button regbt forget" ng-click="reg()" ng-disabled="!item.sms_code||!item.password||!item.password1">\u5B8C\u6210</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/forgetpwd/index.html','<ion-view title="\u5FD8\u8BB0\u5BC6\u7801" id="reg">\n    <ion-content>\n        <div class="empty rrhbg"></div>\n        <div class="list">\n            <label class="item item-input bordertopnone rrhbdcolor">\n                <input type="tel" placeholder="\u8BF7\u8F93\u5165\u5E10\u53F7" ng-model="item.phone" maxlength="11">\n            </label>\n            <div class="item item-input rrhbdcolor">\n                <input type="text" placeholder="\u9A8C\u8BC1\u7801" ng-model="item.sms_code">\n                <button class="button  yzmbt" ng-click="getcode()" ng-disabled="!item.phone||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n            </div>\n            <div class="item item-input rrhbdcolor">\n                <input type="{{inputtype}}" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" ng-model="item.password" maxlength="16">\n                <img ng-src="{{imgurl}}" alt="" ng-click="changeimg()">\n            </div>\n            <div class="item item-input rrhbdcolor">\n                <input type="{{inputtype1}}" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801" ng-model="item.password1" maxlength="16">\n                <img ng-src="{{imgurl1}}" alt="" ng-click="changeimg1()">\n            </div>\n        </div>\n        <button class="button regbt forget" ng-click="reg()" ng-disabled="!item.phone||!item.sms_code||!item.password||!item.password1">\u5B8C\u6210</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/help/index.html','<ion-view title="\u5BA2\u670D\u4E0E\u53CD\u9988" id="help">\n    <ion-content>\n        <div class="top">\n            <a href="tel:400-006-0918">\n                <img src="img/ie_phone@3x.png" alt="">\n            </a>\n\n            <div>\n                <h2>\n                    <a href="tel:400-006-0918">400-016-6868</a>\n                </h2>\n                <h3>\u670D\u52A1\u65F6\u95F4:9:00-21:00</h3>\n            </div>\n        </div>\n        <div class="center">\n            <div ng-click="showqrcode()">\n                \u5FAE\u4FE1\u516C\u4F17\u53F7\n                <span>renrenhuacom</span>\n            </div>\n            <div ngclipboard data-clipboard-text=\'help@renrenhua.com\' ng-click="copywarn(\'\u5BA2\u670D\u90AE\u7BB1\u5DF2\u590D\u5236\')">\n                \u5BA2\u670D\u90AE\u7BB1\n                <span>help@renrenhua.com</span>\n            </div>\n        </div>\n        <div class="down">\n            <div class="d1 rrhback" ng-click="goiframe(\'app.renrenhua.com/rrhprotocolh5/help.html\')">\u5E38\u89C1\u95EE\u9898</div>\n            <div class="d1 rrhback" ui-sref=\'opinion\'>\u610F\u89C1\u53CD\u9988</div>\n            <div class="d1 rrhback" ng-click="goiframe(\'app.renrenhua.com/rrhprotocolh5/alipayRepayExplain.html\')">\u4EBA\u4EBA\u82B1\u652F\u4ED8\u5B9D\u8FD8\u6B3E</div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/home/index.html','<ion-view title="\u9996\u9875" id="home" hide-nav-bar=\'true\'>\n    <ion-content class="has-rrhtab" scrollbar-y="false">\n        <img src="img/home_nav_message@3x.png" alt="" class="tomessage" ng-click="tomessage()">\n        <div class="messageNum" ng-if="messageNum"></div>\n        <ion-slide-box does-continue="true" slide-interval="3000" auto-play="true">\n            <ion-slide ng-repeat="i in data.advertisement" ng-click="go(i.linkUrl)">\n                <img ng-src="{{i.imgUrl}}" alt="">\n            </ion-slide>\n        </ion-slide-box>\n        <div class="two">\n            <div class="one o1" ng-click="goWithTokenwaveloginreg(\'borrowlist\',{status:\'1,2,4,9\'})">\u5BA1\u6838\u4E2D\u5FC3</div>\n            <div class="one o2" ng-click="goWithTokenwaveloginreg(\'prerepaymentlist\',{status:\'\'})">\u6211\u8981\u8FD8\u6B3E</div>\n            <div class="line"></div>\n        </div>\n        <div class="product">\n            <div class="hd">\n                <img src="img/icon_yongtu_normal.png" alt="">\n                <span class="s1">\u4EBA\u4EBA\u82B1</span>\n                <span class="s2">\u6781\u901F\u501F\u6B3E</span>\n            </div>\n            <div class="bd">\n                <div class="up">\n                    <div class="money">{{data.amountGroup[0]|number:0}}</div>\n                    <div class="moneytitle">\u501F\u6B3E\u91D1\u989D (\u5143)</div>\n                    <div class="item range">\n                        <input type="range" name="volume" ng-model="data.amountGroup[0]" min="0" max="1000" ng-disabled="true">\n                    </div>\n                </div>\n                <div class="down">\n                    <img src="img/icon_yongtu_normal.png" alt="">\n                    <span class="s1">\u501F\u6B3E\u671F\u9650 (\u5929)</span>\n                    <span class="s2" ng-repeat="i in data.periodGroup">{{i}}\u5929</span>\n                </div>\n            </div>\n            <div class="ft">\n                <button class="button" ng-click="sub()">\u9A6C\u4E0A\u7533\u8BF7</button>\n                <div class="info" ng-click="go(\'app.renrenhua.com/rrhprotocolh5/violate1.html\')">\u600E\u6837\u63D0\u989D?</div>\n            </div>\n        </div>\n    </ion-content>\n    <div class="rrh-tab bar bar-footer row row-no-padding">\n        <div class="col" ui-sref=\'home\' ui-sref>\n            <img ng-src="img/tabhome1.png" alt="">\n            <h2 class="active">\u9996\u9875</h2>\n        </div>\n        <div class="col" ui-sref=\'prerepaymentlist\'>\n            <img ng-src="img/taborder.png" alt="">\n            <h2>\u8FD8\u6B3E</h2>\n        </div>\n        <div class="col" ui-sref=\'my\'>\n            <img ng-src="img/tabmy.png" alt="">\n            <h2>\u6211\u7684</h2>\n        </div>\n    </div>\n</ion-view>');
$templateCache.put('templates/homechannel/index.html','<ion-view title="\u4EBA\u4EBA\u82B1" id="home" hide-nav-bar=\'true\'>\n    <ion-content scrollbar-y="false" style="background:white">\n        <img src="img/home_nav_message@3x.png" alt="" class="tomessage" ng-click="tomessage()">\n        <ion-slide-box does-continue="true" slide-interval="3000" auto-play="true">\n            <ion-slide ng-repeat="i in data.advertisement" ng-click="go(i.linkUrl)">\n                <img ng-src="{{i.imgUrl}}" alt="">\n            </ion-slide>\n        </ion-slide-box>\n        <div class="product">\n            <div class="hd">\n                <img src="img/icon_yongtu_normal.png" alt="">\n                <span class="s1">\u4EBA\u4EBA\u82B1</span>\n                <span class="s2">\u6781\u901F\u501F\u6B3E</span>\n            </div>\n            <div class="bd">\n                <div class="up">\n                    <div class="money">{{data.amountGroup[0]|number:0}}</div>\n                    <div class="moneytitle">\u501F\u6B3E\u91D1\u989D (\u5143)</div>\n                    <div class="rangeminmax">\n                        <span class="s1">0</span>\n                        <span class="s2">3000</span>\n                    </div>\n                    <div class="item range {{\'rangerule\'+data.amountGroup[0]}}">\n                        <input type="range" name="volume" ng-model="data.amountGroup[0]" min="0" max="3000" ng-disabled="true">\n                    </div>\n                </div>\n                <div class="down">\n                    <img src="img/icon_qixian_normal-1.png" alt="">\n                    <span class="s1">\u501F\u6B3E\u671F\u9650</span>\n                    <span class="s2" ng-repeat="i in data.periodGroup">{{i}}\u5929</span>\n                </div>\n            </div>\n            <div class="ft">\n                <button class="button" ng-click="sub()">\u9A6C\u4E0A\u7533\u8BF7</button>\n                <div class="info" ng-click="go(\'app.renrenhua.com/rrhprotocolh5/violate2.html\')">\u600E\u6837\u63D0\u989D?</div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/iframe/index.html','<ion-view title="\u4EBA\u4EBA\u82B1" id="iframe">\n    <ion-content scroll="false">\n        <div style="width: 100%;height: 100%;-webkit-overflow-scrolling: touch; overflow-y: scroll; ">\n            <iframe ng-src="{{url}}" frameborder="0" style="width: 100%;height: 100%;" scrolling="yes" id="rrhiframe "></iframe>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infobase/index.html','<ion-view title="\u57FA\u672C\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="warn">\u4FE1\u606F\u8D8A\u5B8C\u5584,\u501F\u6B3E\u6210\u529F\u7387\u8D8A\u9AD8</div>\n        <div class="list rrhlabellist">\n            <div class="out rrhback">\n                <label class=" item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u6700\u9AD8\u5B66\u5386</span>\n                    <input ng-model="education.input" mobiscroll-scroller="education" type="text" ng-if="education.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u5A5A\u59FB\u72B6\u51B5</span>\n                    <input ng-model="maritalStatus.input" mobiscroll-scroller="maritalStatus" type="text" ng-if="maritalStatus.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel" for="infoaddress">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u5730\u5740</span>\n                    <span class="addresskeng">{{address.showinput}}</span>\n                <!--<input type="text"  ng-model="address.showinput">-->\n                <input ng-model="address.input" mobiscroll-scroller="address" type="text" ng-if="address.wheels" id="infoaddress" style="display:none"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                     <input ng-model="address.input1" type="text" placeholder="\u6240\u5728\u8857\u9053\u3001\u95E8\u724C\u53F7" class="address"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5BB6\u5EAD\u7535\u8BDD</span>\n                    <input type="text"  ng-model="data.userInfo.familyPhone" maxlength="13">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u90AE\u7BB1</span>\n                    <input type="text"  ng-model="data.userInfo.email" maxlength="30">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5FAE\u4FE1\u53F7</span>\n                    <input type="text"  ng-model="data.userInfo.wx"  maxlength="20">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">QQ\u53F7</span>\n                    <input type="tel" ng-model="data.userInfo.qq"  maxlength="14">\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infobasechannel/index.html','<ion-view title="\u57FA\u672C\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <!-- <img src="img/step2.png" alt="" class="orderstep"> -->\n        <!--<div class="warn">\u4FE1\u606F\u8D8A\u5B8C\u5584,\u501F\u6B3E\u6210\u529F\u7387\u8D8A\u9AD8</div>-->\n        <div class="list rrhlabellist">\n            <div class="out rrhback">\n                <label class=" item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u6700\u9AD8\u5B66\u5386</span>\n                    <input ng-model="education.input" mobiscroll-scroller="education" type="text" ng-if="education.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u5A5A\u59FB\u72B6\u51B5</span>\n                    <input ng-model="maritalStatus.input" mobiscroll-scroller="maritalStatus" type="text" ng-if="maritalStatus.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel" for="infoaddress">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u5730\u5740</span>\n                    <span class="addresskeng">{{address.showinput}}</span>\n                <!--<input type="text"  ng-model="address.showinput">-->\n                <input ng-model="address.input" mobiscroll-scroller="address" type="text" ng-if="address.wheels" id="infoaddress" style="display:none"\n                />\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                     <input ng-model="address.input1" type="text" placeholder="\u6240\u5728\u8857\u9053\u3001\u95E8\u724C\u53F7" class="address"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5BB6\u5EAD\u7535\u8BDD</span>\n                    <input type="text"  ng-model="data.userInfo.familyPhone" maxlength="13">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u90AE\u7BB1</span>\n                    <input type="text"  ng-model="data.userInfo.email" maxlength="30">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5FAE\u4FE1\u53F7</span>\n                    <input type="text"  ng-model="data.userInfo.wx"  maxlength="20">\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">QQ\u53F7</span>\n                    <input type="tel" ng-model="data.userInfo.qq" maxlength="14">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u53C2\u52A0\u5DE5\u4F5C\u7684\u5E74\u9650</span>\n                    <input ng-model="workingTime.input" mobiscroll-scroller="workingTime" type="text" ng-if="workingTime.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u5F53\u524D\u5DE5\u4F5C\u72B6\u6001</span>\n                    <input ng-model="status.input" mobiscroll-scroller="status" type="text" ng-if="status.wheels"/>\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infofamily/index.html','<ion-view title="\u5BB6\u5EAD\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="warn">\u5BB6\u5EAD\u4FE1\u606F\u4EC5\u7528\u4E8E\u4FE1\u7528\u8BC4\u4F30,\u6211\u4EEC\u4E0D\u4F1A\u6CC4\u9732\u60A8\u7684\u4FE1\u606F</div>\n        <div class="list rrhlabellist">\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5B50\u5973\u6570\u91CF</span>\n                    <input ng-model="child.input" mobiscroll-scroller="child" type="text" ng-if="child.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u662F\u5426\u6709\u623F</span>\n                    <input ng-model="house.input" mobiscroll-scroller="house" type="text" ng-if="house.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u662F\u5426\u6709\u8F66</span>\n                    <input ng-model="car.input" mobiscroll-scroller="car" type="text" ng-if="car.wheels"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u8F66\u724C\u53F7</span>\n                    <input type="text"  ng-model="data.carNumber" ng-disabled="car.input==\'\u65E0\'">\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infolinkman/index.html','<ion-view title="\u8054\u7CFB\u4EBA\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="warn">\u6B63\u5E38\u8FD8\u6B3E\u65F6,\u6211\u4EEC\u4E0D\u4F1A\u8054\u7CFB\u4E0B\u8FF0\u8054\u7CFB\u4EBA</div>\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u4EBA1</span>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D</span>\n                    <input type="text"  ng-model="linkmaninfo1.name" placeholder="\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D" class="taleft" maxlength="20">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u4E0E\u60A8\u7684\u5173\u7CFB</span>\n                    <input ng-model="linkman1.input" mobiscroll-scroller="linkman1" type="text" placeholder="\u4E0E\u60A8\u7684\u5173\u7CFB" ng-if="linkman1" class="taleft"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label" >\u8054\u7CFB\u7535\u8BDD</span>\n                    <input type="text"  ng-model="linkmaninfo1.mobile" placeholder="\u8054\u7CFB\u7535\u8BDD" class="taleft" maxlength="11">\n                </label>\n            </div>\n        </div>\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u4EBA2</span>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D</span>\n                    <input type="text"  ng-model="linkmaninfo2.name" placeholder="\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D" class="taleft" maxlength="20">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u4E0E\u60A8\u7684\u5173\u7CFB</span>\n                    <input ng-model="linkman2.input" mobiscroll-scroller="linkman2" type="text" placeholder="\u4E0E\u60A8\u7684\u5173\u7CFB" ng-if="linkman2" class="taleft"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u7535\u8BDD</span>\n                    <input type="text"  ng-model="linkmaninfo2.mobile" placeholder="\u8054\u7CFB\u7535\u8BDD" class="taleft" maxlength="11">\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infolinkmanchannel/index.html','<ion-view title="\u8054\u7CFB\u4EBA\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <!-- <img src="img/step3.png" alt="" class="orderstep"> -->\n        <div class="warn channel">\u6B63\u5E38\u8FD8\u6B3E\u65F6,\u6211\u4EEC\u4E0D\u4F1A\u8054\u7CFB\u4E0B\u8FF0\u8054\u7CFB\u4EBA</div>\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u4EBA1</span>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D</span>\n                    <input type="text"  ng-model="linkmaninfo1.name" placeholder="\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D" class="taleft" maxlength="20">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u4E0E\u60A8\u7684\u5173\u7CFB</span>\n                    <input ng-model="linkman1.input" mobiscroll-scroller="linkman1" type="text" placeholder="\u4E0E\u60A8\u7684\u5173\u7CFB" ng-if="linkman1" class="taleft"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label" >\u8054\u7CFB\u7535\u8BDD</span>\n                    <input type="text"  ng-model="linkmaninfo1.mobile" placeholder="\u8054\u7CFB\u7535\u8BDD" class="taleft" maxlength="11">\n                </label>\n            </div>\n        </div>\n        <div class="list rrhlabellist">\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u4EBA2</span>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D</span>\n                    <input type="text"  ng-model="linkmaninfo2.name" placeholder="\u76F4\u7CFB\u4EB2\u5C5E\u59D3\u540D" class="taleft" maxlength="20">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u4E0E\u60A8\u7684\u5173\u7CFB</span>\n                    <input ng-model="linkman2.input" mobiscroll-scroller="linkman2" type="text" placeholder="\u4E0E\u60A8\u7684\u5173\u7CFB" ng-if="linkman2" class="taleft"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req  reqhide">*  </span>\n                    <span class="input-label">\u8054\u7CFB\u7535\u8BDD</span>\n                    <input type="text"  ng-model="linkmaninfo2.mobile" placeholder="\u8054\u7CFB\u7535\u8BDD" class="taleft" maxlength="11">\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/infowork/index.html','<ion-view title="\u5DE5\u4F5C\u4FE1\u606F" class=\'rrhinfo\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="warn">\u4FE1\u606F\u8D8A\u5B8C\u5584,\u501F\u6B3E\u6210\u529F\u7387\u8D8A\u9AD8</div>\n        <div class="list rrhlabellist">\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u53C2\u52A0\u5DE5\u4F5C\u7684\u5E74\u9650</span>\n                    <input ng-model="workingTime.input" mobiscroll-scroller="workingTime" type="text" ng-if="workingTime.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req">*  </span>\n                    <span class="input-label">\u5F53\u524D\u5DE5\u4F5C\u72B6\u6001</span>\n                    <input ng-model="status.input" mobiscroll-scroller="status" type="text" ng-if="status.wheels"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u73B0\u5355\u4F4D\u540D\u79F0</span>\n                    <input type="text"  ng-model="userWork.companyName">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u73B0\u5355\u4F4D\u5DE5\u4F5C\u5E74\u9650</span>\n                    <input ng-model="currentWorkingTime.input" mobiscroll-scroller="currentWorkingTime" type="text" ng-if="currentWorkingTime.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u73B0\u5355\u4F4D\u5730\u5740</span>\n                     <span class="addresskeng">{{address.showinput}}</span>\n                     <input ng-model="address.input" mobiscroll-scroller="address" type="text" ng-if="address.wheels" id="infoaddress" style="display:none"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                     <input ng-model="address.input1" type="text" placeholder="\u6240\u5728\u8857\u9053\u3001\u95E8\u724C\u53F7" class="address"/>\n                </label>\n            </div>\n            <div class="out">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u73B0\u5355\u4F4D\u7535\u8BDD</span>\n                    <input type="text"  ng-model="userWork.companyPhone" maxlength="13">\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5355\u4F4D\u6027\u8D28</span>\n                    <input ng-model="companyType.input" mobiscroll-scroller="companyType" type="text" ng-if="companyType.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u5F53\u524D\u804C\u4E1A</span>\n                    <input ng-model="position.input" mobiscroll-scroller="position" type="text" ng-if="position.wheels"/>\n                </label>\n            </div>\n            <div class="out rrhback">\n                <label class="item item-input infolabel">\n                    <span class="req reqhide">*  </span>\n                    <span class="input-label">\u4E2A\u4EBA\u6708\u6536\u5165</span>\n                    <input ng-model="monthEarning.input" mobiscroll-scroller="monthEarning" type="text" ng-if="monthEarning.wheels"/>\n                </label>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/lianlianbankcardaddsuc/index.html','<ion-view title="\u8FDE\u8FDE\u7ED1\u5361" id="lianlianbankcardaddsuc">\n    <ion-content>\n\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/message/index.html','<ion-view title="\u6D88\u606F" id="message">\n    <ion-content>\n        <div class="messageout" ng-repeat="i in data">\n            <div class="up">\n                {{i.createdAt| date:\'yyyy-MM-dd HH:mm:ss\'}}\n            </div>\n            <div class="down">\n                <h2>{{i.content}}</h2>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/mobileauth/index.html','<ion-view title="\u8FD0\u8425\u5546\u8BA4\u8BC1" id="mobilesecurity">\n    <ion-content>\n        <div class="inputlist">\n            <div class="inputitem">\n                <input type="text" placeholder=\'\u624B\u673A\u53F7\' ng-model="mobilesecuritydata.account" ng-disabled="true">\n            </div>\n            <div class="inputitem">\n                <input type="password" placeholder=\'\u8BF7\u8F93\u5165\u670D\u52A1\u5BC6\u7801\' ng-model="mobilesecuritydata.password" maxlength="8" ng-disabled="mobilesecuritydata.inStep2">\n            </div>\n            <div class="inputitem" ng-if="mobilesecuritydata.inStep2&&mobilesecuritydata.type==\'sms\'">\n                <input type="text" placeholder="\u8BF7\u8F93\u5165\u77ED\u4FE1\u9A8C\u8BC1\u7801" ng-model="mobilesecuritydata.smscode" maxlength="8">\n            </div>\n            <div class="codeitem" ng-if="mobilesecuritydata.inStep2&&mobilesecuritydata.type==\'img\'">\n                <input type="text" placeholder="\u8BF7\u8F93\u5165\u56FE\u5F62\u9A8C\u8BC1\u7801" ng-model="mobilesecuritydata.imgcode">\n                <img ng-src="{{mobilesecuritydata.imgurl}}" alt="" ng-click="codeget(\'img\')" maxlength="8">\n            </div>\n        </div>\n        <button class="nextbt button" ng-click="next1()" ng-if="!mobilesecuritydata.inStep2" ng-disabled="!mobilesecuritydata.password">{{buttontext}}</button>\n        <button class="nextbt button" ng-click="next2()" ng-disabled="!mobilesecuritydata.smscode&&!mobilesecuritydata.imgcode" ng-if="mobilesecuritydata.inStep2">{{buttontext}}</button>\n        <div class="warn">\n            <div class="title">\u6E29\u99A8\u63D0\u793A:</div>\n            <div class="info">\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8FD0\u8425\u5546(\u79FB\u52A8\u3001\u8054\u901A\u3001\u7535\u4FE1)\u670D\u52A1\u5BC6\u7801,\u82E5\u5FD8\u8BB0\u53EF\u901A\u8FC7\u62E8\u6253<span class="red" ng-click="pop()">\u300A\u8FD0\u8425\u5546\u670D\u52A1\u7535\u8BDD\u300B</span>\u6216\u8005\u767B\u9646\u7F51\u4E0A\u8425\u4E1A\u5385\u627E\u56DE\u5BC6\u7801</div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/modallogin/index.html','<ion-modal-view id="login" ng-controller="login">\n    <ion-content>\n        <div class="bgconetnt">\n            <img src="img/denglu_bg.png" alt="" class="bg">\n            <div class="back" ng-click="loginmodal.remove()"></div>\n        </div>\n        <div class="list">\n            <label class="item item-input bordertopnone rrhbdcolor">\n                <img src="img/loginuser.png" alt="" >\n                <input type="tel" placeholder="\u8BF7\u8F93\u5165\u5E10\u53F7" ng-model="login_data.data.phone" maxlength="11">\n            </label>\n            <div class="item item-input rrhbdcolor">\n                <img src="img/loginpwd.png" alt="">\n                <input type="{{login_data.inputtype}}" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" ng-model="login_data.data.password" maxlength="16">\n                <img ng-src="{{login_data.imgurl}}" alt="" ng-click="login_data.changeimg()">\n            </div>\n        </div>\n        <button class="button loginbt" ng-click="login_data.login()" ng-disabled="!login_data.data.phone||!login_data.data.password">\u767B\u5F55</button>\n        <div class="other">\n            <span class="forget" ui-sref=\'forgetpwd\'>\u5FD8\u8BB0\u5BC6\u7801</span>\n            <span class="reg" ng-click="login_data.goreg()">\u7ACB\u5373\u6CE8\u518C>></span>\n        </div>\n    </ion-content>\n</ion-modal-view>');
$templateCache.put('templates/modalticket/index.html','<ion-modal-view id="modalticket" ng-controller="modalticket">\n    <ion-header-bar>\n        <div class="buttons">\n            <button ng-click="modal.hide()" class="button back-button buttons button-light header-item modalticketback"><i class="icon ion-ios-arrow-back"></i>  </button>\n        </div>\n        <h2 class="title light">\u9009\u62E9\u4F18\u60E0\u5238</h2>\n    </ion-header-bar>\n    <ion-content>\n        <div class="nulldata" ng-if="modaldata&&modaldata.length==0">\n            <img src="img/noticket_img@3x.png" alt="">\n            <h2>\u6682\u65E0\u4F18\u60E0\u5238</h2>\n        </div>\n        <div class="cpitem" ng-click="sel(i)" ng-repeat="i in modaldata" ng-class="{\'red\':i.type==\'0\',\'blue\':i.type==\'1\',\'orange\':(i.type!=0&&i.type!=1),\n        \'grey\':s==2,\'greyhis\':s==3}">\n            <div class="left">\n                <h2 class="money orange">\n                    {{i.deduction}}\n                </h2>\n                <div class="type">\n                    {{types[i.source]}}\n                </div>\n            </div>\n            <div class="right">\n                <div class="typename">{{i.type==0?\'\u8FD8\u6B3E\u62B5\u7528\u5238 \':\'\u8FD8\u6B3E\u6298\u6263\u5238\'}}\n                    <!-- <span>\u5238</span> -->\n                </div>\n                <div class="des">{{i.notes}}</div>\n                <div class="date">{{i.begin_time}}-{{i.end_time}}</div>\n            </div>\n            <img ng-src="{{modal.item==i?(\'img/bill_selected@3x.png\'):(\'img/bill_unselected@3x.png\')}}" alt="" class="check">\n\n        </div>\n    </ion-content>\n</ion-modal-view>');
$templateCache.put('templates/my/index.html','<ion-view title="\u6211\u7684" id="my" hide-back-button=\'true\' hide-nav-bar=\'true\'>\n    <ion-content class="has-rrhtab">\n        <input type="file" class="hideinputfile" id="myfile1" capture="camera" accept="image/*">\n        <div class="up">\n            <div class="bg"></div>\n            <div class="contain">\n                <div class="needlogin" ng-if="!user">\n                    <div class="title">\n                        <img src="img/icon_weidenglutishi_normal.png" alt=""> Hi, \u7B49\u4F60\u597D\u4E45\u4E86\uFF01\n                    </div>\n                    <div class="bts">\n                        <button class="button reg" ui-sref=\'reg\'>\u6CE8\u518C</button>\n                        <button class="button login" ng-click="gologin()">\u767B\u5F55</button>\n                    </div>\n                </div>\n                <div class="neednotlogin" ng-if="user">\n                    <div class="info">\n\n                        <img ng-src="{{!user?\'img/weidenglutouxiang_normal.png\':user.headImg}}" alt="" ng-click="trgfile()">\n                        <span class="i1">{{user.certification?user.realName:\'\u672A\u5B9E\u540D\'}}</span>\n                        <span class="i2" ng-if="!user.certification" ui-sref=\'autonym\'>\u5B9E\u540D\u8BA4\u8BC1</span>\n                        <span class="i3">{{user.mobile|hidemobile}}</span>\n                    </div>\n                    <div class="money">\n                        <h2>{{user.balanceMoney|number:2}}</h2>\n                        <h3>\u8D26\u6237\u4F59\u989D(\u5143)</h3>\n                        <button class="button withdraw" ng-click="mygo2(\'withdraw\')">\u63D0\u73B0</button>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n        <div class="mid row row-no-padding row-wrap">\n            <div class="col col-50" ng-click="mygo1(\'authlist\')">\n                <img src="img/icon_woderenzheng_normal.png" alt=""> \u6211\u7684\u8BA4\u8BC1\n            </div>\n            <div class="col col-50" ng-click="mygo(\'borrowlist\')">\n                <img src="img/icon_jekuanjilu_normal.png" alt=""> \u501F\u6B3E\u8BB0\u5F55\n            </div>\n            <div class="col col-50" ng-click="mygo1(\'bankcard\')">\n                <img src="img/icon_wode-yinhangka_normal.png" alt=""> \u6211\u7684\u94F6\u884C\u5361\n            </div>\n            <div class="col col-50" ng-click="wxinvitation()" ng-if="inwx">\n                <img src="img/icon_yaoqinghaoyou_normal.png" alt=""> \u9080\u8BF7\u597D\u53CB\n            </div>\n            <div class="col col-50" ng-click="mygo1(\'ticket\')">\n                <img src="img/icon_youhuiquan_normal.png" alt=""> \u6211\u7684\u4F18\u60E0\u5238\n            </div>\n            <div class="col col-50" ng-click="mygo1(\'rrhcoins\')">\n                <img src="img/icon_wodehuabi_normal.png" alt=""> \u6211\u7684\u82B1\u5E01\n            </div>\n\n        </div>\n        <div class="down">\n            <div class="out rrhback" ui-sref=\'set\'>\n                <div class="in">\u8BBE\u7F6E</div>\n            </div>\n            <div class="out rrhback" ui-sref=\'help\'>\n                <div class="in">\u5E2E\u52A9\u4E2D\u5FC3</div>\n            </div>\n        </div>\n    </ion-content>\n    <div class="rrh-tab bar bar-footer row row-no-padding">\n        <div class="col" ui-sref=\'home\'>\n            <img ng-src="img/tabhome.png" alt="">\n            <h2>\u9996\u9875</h2>\n        </div>\n        <div class="col" ui-sref=\'prerepaymentlist\'>\n            <img ng-src="img/taborder.png" alt="">\n            <h2>\u8FD8\u6B3E</h2>\n        </div>\n        <div class="col" ui-sref=\'my\'>\n            <img ng-src="img/tabmy1.png" alt="">\n            <h2 class="active">\u6211\u7684</h2>\n        </div>\n    </div>\n</ion-view>');
$templateCache.put('templates/nginclude/index.html','<ion-view title="\u4EBA\u4EBA\u82B1" id="nginclude">\n    <ion-content scroll="false">\n        <div ng-include="url"></div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/opinion/index.html','<ion-view title="\u610F\u89C1\u53CD\u9988" id="opinion">\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sub()">\u63D0\u4EA4</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <textarea ng-model="data.data" placeholder="\u4F60\u6709\u4EC0\u4E48\u4E0D\u723D\u7EDF\u7EDF\u544A\u8BC9\u6211\u4EEC"></textarea>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/order/index.html','<ion-view title="\u8BA2\u5355" id="order" hide-back-button=\'true\'>\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="gotransactionlist()">\u8D44\u91D1\u8BB0\u5F55</button>\n    </ion-nav-buttons <ion-content class="has-rrhtab">\n    <ion-content>\n        <div class="row row-no-padding threeup">\n            <div class="col col-33" ng-click="goprerepaymentlist(0)">\n                <img src="img/1242-icon_xianjidai_normal.png" alt="">\n                <h2>\u5168\u90E8\u5F85\u8FD8(\u5143)</h2>\n                <h3>{{data.amount||0.00 | number:2}}</h3>\n            </div>\n            <div class="col col-33" ng-click="goprerepaymentlist(30)">\n                <img src="img/1242-icon_benyuedai_normal.png" alt="">\n                <h2>\u672C\u6708\u5F85\u8FD8(\u5143)</h2>\n                <h3>{{data.currentMonthAmount||0.00 | number:2}}</h3>\n            </div>\n            <div class="col col-33" ng-click="goprerepaymentlist(7)">\n                <img src="img/1242-icon_qitaidai_normal.png" alt="">\n                <h2>\u8FD17\u65E5\u5F85\u8FD8(\u5143)</h2>\n                <h3>{{data.sevenDaysAmount||0.00 | number:2}}</h3>\n            </div>\n        </div>\n        <div class="threecenter">\u501F\u6B3E\u8BB0\u5F55</div>\n        <div class="threedown">\n            <div class="in" ng-repeat="i in data.status" ng-click="go(i.status)">\n                <img ng-src="{{i.icon}}" alt="">\n                <div class="count">{{i.count}}</div>\n                <div class="name">{{i.name}}</div>\n            </div>\n        </div>\n    </ion-content>\n    <div class="rrh-tab bar bar-footer row row-no-padding">\n        <div class="col" ui-sref=\'home\' ui-sref>\n            <img ng-src="img/tabhome.png" alt="">\n            <h2>\u9996\u9875</h2>\n        </div>\n        <div class="col" ui-sref=\'prerepaymentlist\'>\n            <img ng-src="img/taborder1.png" alt="">\n            <h2 class="active">\u8FD8\u6B3E</h2>\n        </div>\n        <div class="col" ui-sref=\'my\'>\n            <img ng-src="img/tabmy.png" alt="">\n            <h2>\u6211\u7684</h2>\n        </div>\n    </div>\n</ion-view>');
$templateCache.put('templates/orderdetail/index.html','<ion-view title="\u501F\u6B3E\u8BE6\u60C5" id="orderdetail">\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="pdfcontractFee()" ng-if="data.status==7||data.status==6||data.status==8">\u501F\u6B3E\u5408\u540C</button>\n    </ion-nav-buttons>\n    <ion-content ng-class="{\'hasctrl\':(data.status==6||data.status==8)}" overflow-scroll="{{scroll}}">\n        <div class="mainlayer">\n            <div class="main">\n                <div class="up">\n                    <div class="upup">\n                        <img src="img/order_detail_icon.png" alt="">\n                        <span class="pname">{{data.productName}}</span>\n                        <span class="time">{{data.date}}</span>\n                    </div>\n                    <div class="updown">\n                        <span class="orderlabel">\u8BA2\u5355\u53F7</span>\n                        <span class="orderno">{{data.orderNo}}</span>\n                        <span class="state s1" ng-if="[1,2,4,9].indexOf(data.status)>=0">\u5BA1\u6838\u4E2D</span>\n                        <span class="state s2" ng-if="[3,5,10,11].indexOf(data.status)>=0">\u88AB\u9A73\u56DE</span>\n                        <span class="state s3" ng-if="[7].indexOf(data.status)>=0">\u5DF2\u8FD8\u6E05</span>\n                        <span class="state s4" ng-if="[6,8].indexOf(data.status)>=0">\u8FD8\u6B3E\u4E2D</span>\n                    </div>\n                </div>\n                <div class="down row row-no-padding">\n                    <div class="col col-33">\n                        <h2>\u8D37\u6B3E\u603B\u989D(\u5143)</h2>\n                        <h3>{{data.reqMoney|number:2}}</h3>\n                    </div>\n                    <div class="col col-33">\n                        <h2>\u7EFC\u5408\u670D\u52A1\u8D39(\u5143)</h2>\n                        <h3>{{data.serversFee|number:2}}</h3>\n                    </div>\n                    <div class="col col-33">\n                        <h2>\u5269\u4F59\u5F85\u8FD8(\u5143)</h2>\n                        <h3>{{data.pendingRepayment|number:2}}</h3>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div class="repayment" ng-if="data.status==6||data.status==8">\n            <div class="title">\n                \u8FD8\u6B3E\u8BA1\u5212 <span>\u5DF2\u8FD8{{data.repayment|number:2}}\u5143,\u5F85\u8FD8{{data.pendingRepayment|number:2}}</span>\n            </div>\n            <div class="repaymentlist">\n                <div class="repaymentitem" ng-repeat="i in data.paybackPlans" ng-click="changecheck()">\n                    <div class="in" ng-class="{\'hasborder\':!(i.overdueDays>0||i.daysRemaining>=0)}">\n                        <img ng-src="{{check?(\'img/icon_duoxuan_pressed.png\'):(\'img/icon_duoxuan_normal.png\')}}" alt="">\n                        <span class="money">{{i.balance|number:2}}\u5143</span>\n                        <span class="time" ng-if="i.daysRemaining>=0">\u5269\u4F59\n                            <span class="day"> {{i.daysRemaining}}</span> \u5929\n                        </span>\n                        <span class="time" ng-if="i.overdueDays>0">\u5DF2\u903E\u671F\n                            <span class="day"> {{i.overdueDays}}</span> \u5929\n                        </span>\n                    </div>\n                    <div class=\'t13\' ng-if="i.overdueDays>0||i.daysRemaining>=0">\u6700\u540E\u8FD8\u6B3E\u65E5:{{i.repaymentTime|date:"yyyy-MM-dd"}}</div>\n                </div>\n            </div>\n        </div>\n\n        <div class="fail" ng-if="[3,5,10].indexOf(data.status)>=0">\n            <div class="steps">\n                <div class="step1 step">\n                    <img src="img/icon_shenghe_normal.png" alt="">\n                    <span class="info1">\u63D0\u4EA4\u8D37\u6B3E\u7533\u8BF7</span>\n                    <span class="time">{{data.orderFlow[0].date|date:"yyyy-MM-dd"}}</span>\n                </div>\n                <div class="step2 step">\n                    <img src="img/icon_sbutongguo_normal.png" alt="">\n                    <span class="info2">\u5BA1\u6838\u672A\u901A\u8FC7</span>\n                    <span class="time">{{data.orderFlow[1].date|date:"yyyy-MM-dd"}}</span>\n                </div>\n            </div>\n            <div class="yj">\u5BA1\u6838\u610F\u89C1:{{data.rejectReason||\'\u6682\u65E0\u5BA1\u6838\u610F\u89C1\'}}</div>\n            <div class="warn">\u66F4\u591A\u8BA4\u8BC1\u4FE1\u606F\u53EF\u63D0\u5347\u5BA1\u6838\u901A\u8FC7\u7387\u54E6~</div>\n            <div class="auth" ui-sref=\'authlist\'>\u8BA4\u8BC1\u4FE1\u606F</div>\n            <button class="button rebt" ui-sref=\'home\'>\u91CD\u65B0\u7533\u8BF7</button>\n        </div>\n\n        <div class="wait" ng-if="[1,2,4,9].indexOf(data.status)>=0">\n            <div class="steps">\n                <div class="step" ng-repeat="i in data.orderFlow">\n                    <img src="img/icon_shenghe_normal.png" alt="" ng-if="i.date">\n                    <span ng-if="!i.date" class="waitimg"></span>\n                    <span class="info1">{{i.stepName}}</span>\n                    <span class="time">{{i.date|date:"yyyy-MM-dd"}}</span>\n                </div>\n            </div>\n            <!--<button class="button qianyuebt" ng-if="data.status==4&&!data.contractFee" ng-click="gocontract()">\u9A6C\u4E0A\u7B7E\u7EA6</button>-->\n        </div>\n\n        <div class="payoff" ng-if="data.status==7">\n            <div class="in">\n                <img src="img/1242-icon_huanqingtishi_normal.png" alt="">\n                <h2>\u8D37\u6B3E\u5DF2\u8FD8\u6E05\uFF0C\u5E0C\u671B\u6211\u4EEC\u80FD\u7EE7\u7EED\u5E2E\u5230\u60A8</h2>\n            </div>\n\n        </div>\n    </ion-content>\n    <div ng-if="data.status==6||data.status==8" ng-class="{\'ctrl\':data.status==6||data.status==8}">\n        <div class="all" ng-click="changecheck()">{{!check?\'\u5168\u9009\':\'\u53D6\u6D88\'}}</div>\n        <div class="money">\n            <h2><span>\u5408\u8BA1:</span>{{check?(data.paybackPlans[0].balance-(modal&&modal.item?modal.item.deduction:0)|number:2):(0|number:2)}}<span>\u5143</span></h2>\n            <h3 ng-click="modalyhq()" ng-if="!(modal&&modal.item)">\u9009\u62E9\u4F18\u60E0\u5238 <img src="img/rrhback.png" alt="" class="yhqcheck"></h3>\n            <h3 ng-if="modal&&modal.item" ng-click="modalyhq()">\u62B5\u7528{{modal.item.deduction}}\u5143 <img src="img/rrhback.png" alt="" class="yhqcheck"></h3>\n\n        </div>\n        <button class="button" ng-click="repayment()">\u9A6C\u4E0A\u8FD8\u6B3E</button>\n\n    </div>\n\n</ion-view>');
$templateCache.put('templates/popmobilesecurity/index.html','<div>\n    <h2>\u79FB\u52A8\u7528\u6237</h2>\n    <h3>\u65B9\u6CD5\u4E00\uFF1A\u624B\u673A\u62E8\u625310086\u8F6C\u4EBA\u5DE5\u670D\u52A1\u67E5\u8BE2</h3>\n    <h3>\u65B9\u6CD5\u4E8C\uFF1A\u767B\u5F5510086.cn\uFF0C\u521D\u59CB\u5BC6\u7801\u672A\u60A8\u624B\u673A\u540E6\u4F4D\uFF0C\u70B9\u201C\u5FD8\u8BB0\u5BC6\u7801\u201D\u91CD\u65B0\u8BBE\u7F6E\u3002</h3>\n</div>\n<div>\n    <h2>\u8054\u901A\u7528\u6237</h2>\n    <h3>\u65B9\u6CD5\u4E00\uFF1A\u624B\u673A\u62E8\u625310010\u8F6C\u4EBA\u5DE5\u670D\u52A1\u67E5\u8BE2</h3>\n    <h3>\u65B9\u6CD5\u4E8C\uFF1A\u767B\u5F55wap.10010.com\uFF0C\u521D\u59CB\u5BC6\u7801\u672A\u60A8\u624B\u673A\u540E6\u4F4D\uFF0C\u70B9\u201C\u5FD8\u8BB0\u5BC6\u7801\u201D\u91CD\u65B0\u8BBE\u7F6E\u3002</h3>\n</div>\n<div>\n    <h2>\u7535\u4FE1\u7528\u6237</h2>\n    <h3>\u65B9\u6CD5\u4E00\uFF1A\u624B\u673A\u62E8\u625310000\u8F6C\u4EBA\u5DE5\u670D\u52A1\u67E5\u8BE2</h3>\n    <h3>\u65B9\u6CD5\u4E8C\uFF1A\u767B\u5F55wapzt.189.cn\uFF0C\u521D\u59CB\u5BC6\u7801\u672A\u60A8\u624B\u673A\u540E6\u4F4D\uFF0C\u70B9\u201C\u5FD8\u8BB0\u5BC6\u7801\u201D\u91CD\u65B0\u8BBE\u7F6E</h3>\n</div>');
$templateCache.put('templates/popqrcode/index.html','<img src="img/img_code@3x.png" alt="">\n<h2>\u4EBA\u4EBA\u82B1\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801</h2>\n<div class="close" ng-click="popqrcode.close()"></div>');
$templateCache.put('templates/poprrhcoinslist/index.html','<div class="poprrhcoinslist" ng-controller="poprrhcoinslist">\n    <div class="title">\u63D0\u73B0\u8BB0\u5F55</div>\n    <div class="poprrhcoinslistlist">\n        <ul>\n            <li ng-repeat="i in data">{{i.createdAt|date:"yyyy\u5E74MM\u6708dd\u65E5"}} {{i.type==-1?\'-\':\'+\'}}{{i.changeMoney}}\u5143 <span>{{i.notes}}</span></li>\n        </ul>\n    </div>\n    <div class="close" ng-click="popover.remove();"></div>\n</div>');
$templateCache.put('templates/popwaveloginreg/index.html','<div class="warnbts" ng-controller="waveloginreg">\n    <div class="warn">\n        <img src="img/xiaohua.png" alt=""> \u5C0F\u82B1\u63D0\u793A\uFF1A\u767B\u5F55\u540E\u624D\u53EF\u4EE5\u7EE7\u7EED\u64CD\u4F5C\u54E6~\n    </div>\n    <div class="bts">\n        <button class="reg" ui-sref=\'reg\' ng-click="popwaveloginreg.close();">\u6CE8\u518C</button>\n        <button class="login" ng-click="wavegologin()">\u767B\u5F55</button>\n    </div>\n</div>');
$templateCache.put('templates/prerepaymentlist/index.html','<ion-view title="\u8FD8\u6B3E" id="prerepaymentlist" hide-back-button=\'true\'>\n    <ion-content>\n        <!-- <ion-content class="has-rrhtab" ng-class="{\'hasctrl\':data&&data.list.length>0}"> -->\n        <div class="nulldata" ng-if="nullbg">\n            <img src="img/img_1@3x.png" alt="">\n            <h2>\u541B\u5B50\u4E24\u6E05,\u6C5F\u6E56\u518D\u89C1</h2>\n        </div>\n        <div class="out rrhback" ng-repeat="i in data.list">\n            <img ng-src="{{check?(\'img/icon_duoxuan_pressed.png\'):(\'img/icon_duoxuan_normal.png\')}}" alt="" ng-click="changecheck()"\n                class="check">\n            <img src="img/rrhback.png" alt="" class="back">\n            <div class="in" ui-sref=\'orderdetail({id:i.id})\'>\n                <h3>[{{i.period}}/{{i.loanPeriods}}]{{i.productName}}\n                    <div class="right" ng-if="i.daysRemaining<=2&&i.daysRemaining>=0">\n                        \u4E34\u8FD1\u8FD8\u6B3E\n                    </div>\n                    <div class="right" ng-if="i.overdueDays>0">\n                        \u5DF2\u903E\u671F\n                    </div>\n                </h3>\n                <h2>\u5F85\u8FD8\u6B3E(\u5143) <span class="money">{{i.balance|number:2}}</span>\n                    <div class="right" ng-if="i.daysRemaining>=0">\u5269\u4F59<span>{{i.daysRemaining}}</span>\u5929</div>\n                    <div class="right" ng-if="i.overdueDays>0">\u5DF2\u903E\u671F<span>{{i.overdueDays}}</span>\u5929</div>\n                </h2>\n            </div>\n        </div>\n    </ion-content>\n    <!-- <div class="ctrl" ng-if="data&&data.list.length>0">\n        <div class="all" ng-click="changecheck()">{{!check?\'\u5168\u9009\':\'\u53D6\u6D88\'}}</div>\n        <div class="money">\n            <h2><span>\u5408\u8BA1:</span>{{check?(data.list[0].balance-(modal&&modal.item?modal.item.deduction:0)|number:2):(0|number:2)}}<span>\u5143</span></h2>\n            <h3 ng-click="modalyhq()" ng-if="!(modal&&modal.item)">\u9009\u62E9\u4F18\u60E0\u5238<img src="img/rrhback.png" alt="" class="yhqcheck"></h3>\n            <h3 ng-if="modal&&modal.item" ng-click="modalyhq()">\u62B5\u7528{{modal.item.deduction}}\u5143 <img src="img/rrhback.png" alt="" class="yhqcheck"></h3>\n        </div>\n        <div class="right"><button class="button" ng-click="sub()">\u9A6C\u4E0A\u8FD8\u6B3E</button></div>\n    </div> -->\n    <!-- <div class="rrh-tab bar bar-footer row row-no-padding">\n        <div class="col" ui-sref=\'home\' ui-sref>\n            <img ng-src="img/tabhome.png" alt="">\n            <h2>\u9996\u9875</h2>\n        </div>\n        <div class="col" ui-sref=\'prerepaymentlist\'>\n            <img ng-src="img/taborder1.png" alt="">\n            <h2 class="active">\u8FD8\u6B3E</h2>\n        </div>\n        <div class="col" ui-sref=\'my\'>\n            <img ng-src="img/tabmy.png" alt="">\n            <h2>\u6211\u7684</h2>\n        </div>\n    </div> -->\n</ion-view>');
$templateCache.put('templates/recharge/index.html','<!--<ion-view title="\u5145\u503C" id="recharge">-->\n<ion-view title="\u8FD8\u6B3E" id="recharge">\n    <ion-content>\n        <div class="up">\n            <div class="bank">\n                <img ng-src="{{data.bankIcon}}" alt="" ng-if="data">\n                <img src="img/ic_bank_card_default.png" alt="" ng-if="!data">\n                <div class="bankname">{{data.bankname}}</div>\n                <div class="bankno" ng-if="!data">\u94F6\u884C</div>\n                <div class="bankno" ng-if="data">\u5C3E\u53F7{{data.cardno.substring(data.cardno.length-4,data.cardno.length)}}</div>\n            </div>\n            <div class="account">\n                <img src="img/mine_account_balance@3x.png" alt="">\n                <div class="accountname">\u8D26\u6237\u4F59\u989D</div>\n                <div class="accountno">{{user.balanceMoney|number:2}}</div>\n            </div>\n        </div>\n        <div class="input">\n            <label class="i1">\n                <span class="yuan">\uFFE5</span>\n                <span class="m1"> {{item.num|number:2}}</span>\n                <!--<input type="number" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D" ng-model="item.num" maxlength="5" rrhmoney ng-disabled="true" />-->\n            </label>\n            <div class="i1" ng-if="paytype==0">\n                <span class="op0">\uFFE5</span>\n                <input type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" ng-model="yzm.data" maxlength="10">\n                <button class="button" ng-click="yzm.getyzm()" ng-disabled="!item.num||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n            </div>\n        </div>\n        <div class="warn2yuan">\u8FD8\u6B3E\u5145\u503C\u91D1\u989D\u5355\u6B21\u4E0D\u5F97\u5C0F\u4E8E2\u5143</div>\n        <button class="button subbt" ng-if="paytype==1" ng-click="sub()" ng-disabled="!item.num">\u7ACB\u5373\u8FD8\u6B3E</button>\n        <button class="button subbt" ng-if="paytype==0" ng-click="sub()" ng-disabled="!item.num||!yzm.data">\u7ACB\u5373\u8FD8\u6B3E</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/rechargeerror/index.html','<ion-view title="\u5145\u503C" id="rechargeerror">\n    <ion-nav-buttons side="right">\n        <button class="button" ui-sref=\'my\'>\u5B8C\u6210</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <img src="img/img_fail@3x.png" alt="">\n        <h2>\u62B1\u6B49\uFF0C\u5145\u503C\u6CA1\u6210\u529F~</h2>\n        <h3>\u60A8\u53EF\u4EE5\u5728\u91CD\u65B0\u5C1D\u8BD5\u4E00\u4E0B\uFF01</h3>\n        <button class="button" ng-click="$ionicGoBack()">\u91CD\u65B0\u5C1D\u8BD5</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/rechargesuc/index.html','<ion-view title="\u5145\u503C" id="rechargesuc">\n    <ion-nav-buttons side="right">\n        <button class="button" ui-sref=\'my\'>\u5B8C\u6210</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <img src="img/img_succeed@3x.png" alt="">\n        <h2>\u5DF2\u6210\u529F\u5145\u503C<span>{{m1}}</span>\u5143</h2>\n        <h2>\u5F53\u524D\u4F59\u989D<span>{{m2}}</span>\u5143</h2>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/reg/index.html','<ion-view title="\u6CE8\u518C" id="reg">\n    <ion-content>\n        <div class="empty rrhbg"></div>\n        <div class="list">\n            <label class="item item-input bordertopnone rrhbdcolor">\n                <span class="input-label">\u624B\u673A\u53F7\u7801</span>\n                <input type="tel" placeholder="(\u672C\u4EBA\u5B9E\u540D\u4E14\u4E3A\u94F6\u884C\u9884\u7559\u624B\u673A\u53F7\u7801)" ng-model="item.phone" maxlength="11">\n            </label>\n            <div class="item item-input rrhbdcolor" ng-if="codeimg.show">\n                <span class="input-label">\u56FE\u5F62\u9A8C\u8BC1\u7801</span>\n                <input type="text" placeholder="\u56FE\u5F62\u9A8C\u8BC1\u7801" ng-model="codeimg.code">\n                <img ng-src=\'{{codeimg.url}}\' alt="" class="codeimg" ng-click="codeimg.change()">\n            </div>\n            <div class="item item-input rrhbdcolor">\n                <span class="input-label">\u9A8C\u8BC1\u7801</span>\n                <input type="text" ng-model="item.code">\n                <button class="button yzmbt" ng-click="getcode()" ng-disabled="!item.phone||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n            </div>\n            <div id="captcha"></div>\n            <div class="item item-input rrhbdcolor">\n                <span class="input-label">\u5BC6\u7801</span>\n                <input type="{{inputtype}}" placeholder="(6-16\u4F4D\u7684\u6570\u5B57\u6216\u5B57\u6BCD)" ng-model="item.password" maxlength="16">\n                <img ng-src="{{imgurl}}" alt="" ng-click="changeimg()">\n            </div>\n            <label class="item item-input rrhbdcolor">\n                <span class="input-label">\u9080\u8BF7\u7801</span>\n                <input type="text" placeholder="(\u975E\u5FC5\u586B)" ng-model="item.recommend_id">\n            </label>\n        </div>\n        <div class="tipstext">\n            <!--<img src="img/register_tips.png" alt=""> -->\n            \u6CE8\u518C\u5373\u540C\u610F\n            <span ng-click="go(\'app.renrenhua.com/rrhprotocolh5/registerProtocol.html\')">\u300A\u6CE8\u518C\u4F7F\u7528\u670D\u52A1\u534F\u8BAE\u300B</span>\u3001\n            <span ng-click="go(\'app.renrenhua.com/rrhprotocolh5/creditAuthorizationProtocol.html\')">\u300A\u5F81\u4FE1\u8C03\u67E5\u6388\u6743\u534F\u8BAE\u300B</span>\u53CA\n            <span ng-click="go(\'app.renrenhua.com/rrhprotocolh5/cost.html\')">\u300A \u5E73\u53F0\u501F\u6B3E\u4EBA\u8D39\u7528\u8868\u300B</span>\n        </div>\n        <button class="button regbt" ng-click="reg()" ng-disabled="!item.phone||!item.code||!item.password">\u7ACB\u5373\u6CE8\u518C</button>\n        <h2 class="hasaccount">\u5DF2\u6709\u5E10\u53F7?</h2>\n        <button class="button loginbt" ng-click="login()">\u9A6C\u4E0A\u767B\u5F55</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/repaymentlist/index.html','<ion-view title="\u8FD8\u6B3E\u5217\u8868" id="repaymentlist">\n    <ion-content>\n        <div class="nulldata" ng-if="nullbg">\n            <img src="img/img_1@3x.png" alt="">\n            <h2>\u541B\u5B50\u4E24\u6E05,\u6C5F\u6E56\u518D\u89C1</h2>\n        </div>\n        <div class="month" ng-repeat="(k,v) in data">\n            <div class="title">{{k==thismonth?"\u672C\u6708":k}}</div>\n            <div class="out">\n                <div class="in" ng-repeat="ii in v">\n                    <h2>\u8FD8\u6B3E <span>-{{ii.actualRepaymentAmount}}\u5143</span></h2>\n                    <h3>{{ii.actualRepaymentTime| date:"yyyy-MM-dd"}} <span>\u6210\u529F</span></h3>\n                </div>\n                <div class="total">\n                    \u5408\u8BA1:{{data[k].total}}\u5143\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/rrhcoins/index.html','<ion-view title="\u6211\u7684\u82B1\u5E01" id="rrhcoins">\n    <ion-content>\n        <img src="img/goldcoin_img@3x.png" alt="" class="coinimg">\n        <div class="coins">\n            {{user.coins}}<span>\u82B1\u5E01</span>\n        </div>\n        <div class="coinsdes">\n            \uFF08\u4EF7\u503C{{user.coins/100}}\u5143\uFF09\n        </div>\n        <button class="sub button" ng-click="sub()">\u63D0\u73B0</button>\n        <div class="coinslist">\n            <span ng-click="getlist()">\u82B1\u5E01\u8BB0\u5F55</span>\n        </div>\n        <div class="info">\n            <div class="title">\u63D0\u73B0\u8BF4\u660E</div>\n            <ul>\n                <li>1\u3001\u6BCF\u5468\u53EF\u7533\u8BF71\u6B21\u63D0\u73B0\uFF0C\u7533\u8BF7\u63D0\u73B0\u540E\u82B1\u5E01\u5C06\u6362\u7B97\u6210\u73B0\u91D1\u6253\u5165\u8D26\u6237\u4F59\u989D</li>\n                <li>2\u3001\u7D2F\u8BA1\u6EE15000\u82B1\u5E01\uFF08\u4EF7\u503C50\u5143\uFF09\u624D\u53EF\u63D0\u73B0\u4E14\u4E3A\u5168\u989D\u63D0\u73B0</li>\n                <li>3\u3001\u5904\u4E8E\u903E\u671F\u72B6\u6001\u7684\u7528\u6237\u9700\u5148\u8FD8\u6B3E\u540E\u624D\u53EF\u63D0\u73B0</li>\n                <li>4\u3001\u903E\u671F\u5929\u6570\u5927\u4E8E\u7B49\u4E8E30\u5929\u7684\u7528\u6237\u5C06\u6C38\u4E45\u65E0\u6CD5\u5C06\u82B1\u5E01\u63D0\u51FA</li>\n            </ul>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/set/index.html','<ion-view title="\u8BBE\u7F6E" id="set">\n    <ion-content>\n        <div class="d1 rrhback" ng-if="hastoken" ui-sref=\'editpwd\'>\u4FEE\u6539\u5BC6\u7801</div>\n        <div class="d1 rrhback" ui-sref=\'about\'>\u5173\u4E8E\u4EBA\u4EBA\u82B1</div>\n        <button class="button" ng-if="hastoken" ng-click="exit()">\u9000\u51FA\u767B\u5F55</button>\n        <button class="button" ng-if="!hastoken" ng-click="login()">\u767B\u5F55</button>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/svg/index.html','<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA35pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MmQ4MTY4MC1jMjY2LWI1NGItYjcwMC1iMmE2Zjk5YzBkOTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REMyRDU5QUYwRUM5MTFFNzhEMEVEQUY5REM5OEEwQzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REMyRDU5QUUwRUM5MTFFNzhEMEVEQUY5REM5OEEwQzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc1RkNFQkJEMjIyMDY4MTE4OEM2RkY1RTkzQTc0MjdFIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OGNlMGI2N2MtZjM0MC0xMWU2LWE4ZTMtOGNkYzE5ZDNjYTA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5Kkn2QAAB5tJREFUeNrsXA1ME2cYfu+upWCAEkc0Iro5E7cZGXHZhi7LJJvTjWXqWDRb/E2FiPg31Igg06mIQvyZQcukjGHQLeqyZc7ogDnHZoy6OUf82Y9xRAdq3IIgKND2enuvtE1prvfX+64l2Ztc7grfffd9z70/z/vefUdxc+aATkLhRgfswW/vFc5v7wrYExcD4f4Zz+RpgYmLAecPIAQAxG/sQAKE9gDBENAwb79GDyisB6CIBIT29EfrZIJecHhAnFoBY9Dozhl1BELoRkR5AHGE6msMGgBqgMgQHhiTR1ucegMSbq2QmhOtVltolbZrilAwArWFIQdIba0XfSMMHDG6x9w3dnmqr4CYRZK/UCqy/Yoh4sDYtCkJhg2bCkbjc0BRKbgl4xYHXV1zYfHiEyH6SqcWgJAHY8qUKJg58y2IisoBmk5TwGo1B0VqogxxMPbtmwYxMSWoBaN1ikCcGPU3yAitZCQnJx4mTKgAhskMg6MNmiwaJE4kI1u3joLhw4+hVjwexuhjVwIIuZxk27bRkJRUj2AkhZmnGIT8CR3EVMj4jfz8wQjGV2EGw/+mU3I0hJypjB1bqch5ulzfQGtrHtTVtUJjo0MP06EFNIaMqdhsFgypbyhTbHoyxMUlEgJDcL40wfqIv994HKKjS1Wptdn8McyaFUPYdAQBIaMdKSkMMs8qPIpVl1dTYyAjYzNhB0sLAcIQuVxe3kpU/YkiLXrB4dgiTg+ZXLBa0wmCwugDyM6dT2NOUiTaxm7fABZLMbDsIVGSGBtrQ3DNBLWk34H2YOTmmiExcT/0lfeCRZEfoLi43H18+fJ7wHG3REwnGVJTdxECxFvA9gGire+wWGIhLe0wTuJJkVb3oaUlG5qb+4rD27e3Y0abA2JVLoZ5F6qrC0hqifaA7NiRAunpjeg3XhJt19OzCtatuxmgVQ1oOjZx5mBcDzU1H0JmZjQpQChN0u3du1NxoFUwZMgZ1Iyxom1Z9ihkZx8Q/N+pU4VoOtclnOwimDHjLFRWzoBRo2gNzYbiK2aMInZqsy30kKZBeHo87se4axgU9ais8znub7hyZQKUlrYFbbNnTxryjwZZ4+K4GwjwYejubkQTbIKSkn9DAMXBA6KsAFRb2x3CBTuhvT0Dli37WbJlVdViMJl2qpkUgvTA92vevGEKznWSo+pCYNy/nykLDF6ysiok+Umw/ISiEnybQj+iDxi8Wre1vQpLlpxWGK2Kobd3FRB8uC3kWSmSUKB9H0COMRFWrGhS1UNWlhU6Oqa4QSUvFCkNcSHpqkd/kQ4LFmRDWdm9kHpbuvQM1NU9gya0DX91DSwNYdmv4ebNp2D+/OnoL85r1u/Bgw/RhDaitj2BwHwgGZojRkMY5k0YMeI4MsrV7gqZ1sKHa4ulFO7eneUuIBHQEO1fVeKrYkbjZhg37ncEZgPMnj1Is77Ly5+H/fuPwdChFzAmvKa1zyMdZeIQmLUwdeovSLZeCLGMYEYmXAkJCd8jEK+Q9CHkX2bjWazZXO8mW2rTgvHjz6I5ziUdFfV8pYFxM8/q6iJFZ+3d+yIMHtyAoD6mFw9R9m4Wx7X7tr6XUhTySOM61JQcmf7iWYiP/9xtevqIy6DYZAJzg8LCREhOToWYmEmo0u/gnRwh2YfJVIY+5SLyi3NB2xQUPIJm9ikemWXeqBsYdc7jdg1/PVRrMnxyx9ukSRN8+VS8oGAaREdvdBeHxSdwHU6eTMOI8UDw/zU1hxDgaZIEkGU/QyZbrpoJ95de7wszJk2dFf/YICOjFCeULUHiKpHJrhAoMcxFUCslAP0NmbAFli//VbM0ww8QI5Coq/LlPr7CJTaIzs7p7kqZV7ZsGQkjR/6ER/HB9cL1I5w+/TYC16klx+Z9Iu1TPRJisWx1q7RYlSo29iNYvTrBZ3LJyTZRMDjuDzh3bqbGYPgwoP3QISNNTXk4iRYRjpKEjHa3+7ioaJlELdYO9+7NA6u1Q/Os3IOB/0t3ZMyGF6v1ZYiLOybqpxyOEjSvlXgULdKGf4ZTRmCErJdC0AF/JCO5ud+h6VRI8JNCUTBcrrOwa9cOQiNk/YmZvw25iIHS0PA+ms41lWd3we3bC+HSJRI3rd+8A6m7kxggfD2jo2OhKk3s6cmHtWv/IjQyZyB1B120ZNIkI4bYf1D1v1V2/1zHIT//E1JUPXC+Qo8fHJoxV69UVLyO4fUL5b4f2ezVq9nQ1kYqI3cIJXdCIYic6cgH4xbcuZMp+kArdFPh5ADibewKIxjN0No6Gdas+ZOgqTiDpf+y1UkX4YvUFy9OxCSxmeBVgs7NIMHeHKDXchDeX3R3F8KiRUcJX0l0YZHUM10WSL632hdFzoPdboUjR76E+no7YTCcUmHfILMT0ACUh6gFfELWgiBcQhp+AcnWCVi/vlUnY5S1Zub/BUQKnGp/qa0NabVjWMHoG7ssoVSs/Vf2gk14xaE0VVBjAt7l5ZG6TNXLM3RbpuoNyfYINSGnZ2yq6L5Bg4uzEaItEbHU3V9b9P4YQiANj5iPIfgPzAsMic9lCPmyiP5cRmCNwQHqPqgipokD8oMqQncRIPgnd8DvmBMAQNdP7vwnwAB1BIEJAW3nmQAAAABJRU5ErkJggg=="\n    alt="" id="rrhimgload">');
$templateCache.put('templates/ticket/index.html','<ion-view title="\u6211\u7684\u4F18\u60E0\u5238" id="ticket">\n    <div class="bar bar-subheader">\n        <div class="row row-no-padding" ng-class="{\'s1\':s==2,\'s2\':s==3,\'s0\':s==0}">\n            <div class="col col-50" ng-class="{\'active\':s==0}" ng-click="changes(0)">\n                \u53EF\u7528\n            </div>\n            <div class="col col-50" ng-class="{\'active\':s==2}" ng-click="changes(2)">\n                \u5DF2\u7528\n            </div>\n            <!-- <div class="col col-33" ng-class="{\'active\':s==3}" ng-click="changes(3)">\n                \u5DF2\u8FC7\u671F\n            </div> -->\n        </div>\n    </div>\n    <ion-content class="has-subheader has-footer">\n        <div class="nulldata" ng-if="data&&data.length==0">\n            <img src="img/noticket_img@3x.png" alt="">\n            <h2>\u6682\u65E0\u4F18\u60E0\u5238</h2>\n        </div>\n        <div class="cpitem" ng-repeat="i in data" ng-class="{\'red\':i.type==\'0\',\'blue\':i.type==\'1\',\'orange\':(i.type!=0&&i.type!=1),\n        \'grey\':s==2,\'greyhis\':s==3}">\n            <div class="left">\n                <h2 class="money">\n                    {{i.deduction}}\n                </h2>\n                <div class="type">\n                    {{types[i.source]}}\n                </div>\n            </div>\n            <div class="right">\n                <div class="typename">{{i.type==0?\'\u8FD8\u6B3E\u62B5\u7528\u5238 \':\'\u8FD8\u6B3E\u6298\u6263\u5238\'}}\n                    <!-- <span>\u5238</span> -->\n                </div>\n                <div class="des">{{i.notes}}</div>\n                <div class="date">{{i.begin_time}}-{{i.end_time}}</div>\n            </div>\n        </div>\n    </ion-content>\n    <div class="bar bar-footer" ui-sref=\'tickethis\'>\n        <div class="in">\u67E5\u770B\u5DF2\u8FC7\u671F\u4F18\u60E0\u5238\n            <img src="img/arrows_icon@3x.png" alt="">\n        </div>\n    </div>\n</ion-view>');
$templateCache.put('templates/tickethis/index.html','<ion-view title="\u5DF2\u8FC7\u671F\u4F18\u60E0\u5238" id="ticket">\n    <ion-content>\n        <div class="nulldata" ng-if="data&&data.length==0">\n            <img src="img/noticket_img@3x.png" alt="">\n            <h2>\u6682\u65E0\u4F18\u60E0\u5238</h2>\n        </div>\n        <div class="cpitem" ng-repeat="i in data" ng-class="{\'grey\':s>=2,\'greyhis\':s==3}">\n            <div class="left">\n                <h2 class="money orange">\n                    {{i.deduction}}\n                </h2>\n                <div class="type">\n                    {{types[i.source]}}\n                </div>\n            </div>\n            <div class="right">\n                <div class="typename">{{i.type==0?\'\u8FD8\u6B3E\u62B5\u7528\u5238 \':\'\u8FD8\u6B3E\u6298\u6263\u5238\'}}\n                    <!-- <span>\u5238</span> -->\n                </div>\n                <div class="des">{{i.notes}}</div>\n                <div class="date">{{i.begin_time}}-{{i.end_time}}</div>\n            </div>\n        </div>\n    </ion-content>\n\n</ion-view>');
$templateCache.put('templates/transactionlist/index.html','<ion-view title="\u4EA4\u6613\u8BB0\u5F55" id="transactionlist">\n    <ion-nav-buttons side="right">\n        <button class="button" ng-click="sel($event)">\u7B5B\u9009</button>\n    </ion-nav-buttons <ion-content class="has-rrhtab">\n    <ion-content>\n        <div class="nulldata" ng-if="nullbg">\n            <img src="img/img_1@3x.png" alt="">\n            <h2>\u541B\u5B50\u4E24\u6E05,\u6C5F\u6E56\u518D\u89C1</h2>\n        </div>\n        <div class="month" ng-repeat="(k,v) in data" ng-if="data">\n            <div class="title">{{k==thismonth?"\u672C\u6708":k}}</div>\n            <div class="out">\n                <div class="in {{\'type\'+ii.tranType}}" ng-repeat="ii in v">\n                    <h2>{{ii.note}} <span>{{ii.logType>0?\'+\':\'-\'}}{{ii.changeMoney|number:2}}\u5143</span></h2>\n                    <h3>{{ii.createdAt| date:"yyyy-MM-dd"}} <span>\u6210\u529F</span></h3>\n                </div>\n                <div class="total">\n                    \u5408\u8BA1:{{data[k].total|number:2}}\u5143\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/usephone/index.html','<ion-view title="\u4EBA\u4EBA\u82B1\u63D0\u793A\u4F60" id="usephone" hide-nav-bar=\'true\'>\n    <ion-content>\n        \u8BF7\u4F7F\u7528\u624B\u673A\u5FAE\u4FE1\u6216\u8005\u624B\u673A\u6D4F\u89C8\u5668\u6253\u5F00\u4EBA\u4EBA\u82B1\u5FAE\u4FE1\u7248\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/wechatauth/index.html','<ion-view title="\u5FAE\u4FE1\u6388\u6743\u7ED1\u5B9A" id="wechatauth" hide-nav-bar=\'true\'>\n    <ion-content>\n        <div class="logo" ng-if="show">\n            <img src="img/icon_weixin_normal.png" alt="" class="limgwx">\n            <img src="img/icon_lianjie_normal.png" alt="" class="limglink">\n            <img src="img/icon_renrenhua_normal.png" alt="" class="limgrrh">\n            <div class="warn">\u8BF7\u7ED1\u4EBA\u4EBA\u82B1\u8D26\u53F7\uFF0C\u4FBF\u4E8E\u4E0B\u6B21\u5FEB\u901F\u767B\u5F55</div>\n        </div>\n        <div class="form" ng-if="show">\n            <div class="finput">\n                <span>\u624B\u673A\u53F7</span>\n                <input type="tel" placeholder="\u8BF7\u8F93\u516511\u4F4D\u624B\u673A\u53F7\u7801" ng-model="item.phone" maxlength="11">\n            </div>\n            <div class="finput">\n                <span>\u624B\u673A\u9A8C\u8BC1\u7801</span>\n                <input class="shot" type="tel" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u9A8C\u8BC1\u7801" ng-model="item.code" maxlength="4">\n                <button class="button code" ng-click="getcode()" ng-disabled="!item.phone||djs.time>0">{{djs.time?(djs.time+\'s\'):\'\u53D1\u9001\u9A8C\u8BC1\u7801\'}}</button>\n            </div>\n            <div id="captcha1"></div>\n            <div class="finput" ng-if="!_isFromWechatAuthHasReg">\n                <span>\u5BC6\u7801</span>\n                <input type="tel" placeholder="\u767B\u5F55\u5BC6\u7801(6-16\u4F4D\u6570\u5B57\u5B57\u6BCD\u7EC4\u5408)" maxlength="16" ng-model="item.password">\n            </div>\n            <div class="finput" ng-if="!_isFromWechatAuthHasReg">\n                <span>\u9080\u8BF7\u7801</span>\n                <input type="tel" placeholder="\u8BF7\u8F93\u5165\u9080\u8BF7\u7801(\u975E\u5FC5\u586B)" ng-model="item.recommend_id" maxlength="9">\n            </div>\n            <div class="info">\n                <img src="img/icon_xuanze_pressed.png" alt=""> \u7ED1\u5B9A\u5373\u540C\u610F\n                <span ng-click="jump(0)">\u300A\u5E73\u53F0\u501F\u6B3E\u4EBA\u8D39\u7528\u8868\u300B</span>\u3001<span ng-click="jump(1)">\u300A\u5F81\u4FE1\u8C03\u67E5\u6388\u6743\u534F\u8BAE\u300B</span>\u53CA<span ng-click="jump(2)">\u300A\u6CE8\u518C\u4F7F\u7528\u670D\u52A1\u534F\u8BAE\u300B</span>\n            </div>\n            <button class="button sub" ng-click="reg()" ng-disabled="!item.phone||!item.code">\u5B8C\u6210\u7ED1\u5B9A</button>\n        </div>\n    </ion-content>\n</ion-view>');
$templateCache.put('templates/withdraw/index.html','<ion-view title="\u63D0\u73B0" id="withdraw">\n    <ion-content>\n        <div class="up">\n            <div class="bank">\n                <img src="img/mine_account_balance@3x.png" alt="">\n\n                <div class="accountname">\u8D26\u6237\u4F59\u989D</div>\n                <div class="accountno">{{user.balanceMoney|number:2}}</div>\n            </div>\n            <div class="account">\n                <img ng-src="{{data.bankIcon}}" alt="" ng-if="data">\n                <img src="img/ic_bank_card_default.png" alt="" ng-if="!data">\n                <div class="bankname">{{data.bankname}}</div>\n                <div class="bankno" ng-if="data">\u5C3E\u53F7{{data.cardno.substring(data.cardno.length-4,data.cardno.length)}}</div>\n                <div class="bankno">\u94F6\u884C</div>\n            </div>\n\n        </div>\n        <div class="input">\n            <label class="i1 bordernone">\n                <span class="m1">\uFFE5{{user.balanceMoney|number:2}}</span>\n           \n                <!--<input type="number" placeholder="\u8BF7\u8F93\u5165\u63D0\u73B0\u91D1\u989D" ng-model="item.num" rrhmoney>-->\n            </label>\n        </div>\n        <button class="button subbt" ng-click="sub()" ng-disabled="!item.num">\u786E\u8BA4\u63D0\u73B0</button>\n    </ion-content>\n</ion-view>');}]);
angular.module('app')
    .factory('appservice', function ($injector, $timeout, $rootScope, $http, $ionicPopup, $ionicModal, $q, $state, $ionicHistory) {
        var _service = {
            warn: function (text, time, callback, boolfiltertext) {
                time = time || 1000;
                text = text ? (text + "") : "";
                if (boolfiltertext) {
                    if (text.indexOf('异常') >= 0 || text.indexOf('错误') >= 0) {
                        text = '系统繁忙,请稍后再试'
                    }
                }
                $injector.get('$ionicLoading').show({
                    template: '<span class="appservicewarn">' + text + '</span>',
                    animation: 'fade-in',
                    duration: time
                })
                $timeout(function () {
                    $injector.get('$ionicLoading').hide().then(function () {
                        if (callback) {
                            callback()
                        }
                    })
                }, time)
            },
            load: function (fn) {
                $injector.get('$ionicLoading').show({
                    //template: '<ion-spinner icon="bubbles"></ion-spinner>',
                    templateUrl: 'templates/svg/index.html',
                    animation: 'fade-in',
                }).then(function () {
                    if (fn) {
                        fn()
                    }
                })
            },
            loadhide: function (fn) {
                $injector.get('$ionicLoading').hide().then(function () {
                    if (fn) {
                        fn()
                    }
                })
            },
            login: function (_scope) {
                if (!$rootScope.loginmodal || $rootScope.loginmodal._isShown == false) {
                    _service.load();
                    $ionicModal.fromTemplateUrl('templates/modallogin/index.html', {
                        scope: _scope || $rootScope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false
                    }).then(function (modal) {
                        _service.loadhide();
                        _scope = _scope || $rootScope;
                        _scope.loginmodal = modal;
                        $rootScope.loginmodal = modal;
                        _scope.loginmodal.show();
                        _scope.$on('$destroy', function () {
                            _scope.loginmodal.remove();
                        });
                    })
                }
            },
            getdata: function (url, data, showwarn) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: data,
                    timeout: 1000 * 100,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                })
            },
            postdata: function (url, data, showwarn) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    timeout: 1000 * 100,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',


                    },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                })
            },
            postimg: function (url, file, data) {
                var fd = new FormData();
                fd.append('file', file)
                for (var i in data) {
                    fd.append(i, data[i])
                }
                return $http({
                    method: 'POST',
                    url: url,
                    data: fd,
                    headers: {
                        'Content-Type': undefined,
                    },
                })
            },
            waveloginreg: function () {
                $rootScope.popwaveloginreg = $ionicPopup.show({
                    templateUrl: 'templates/popwaveloginreg/index.html',
                    cssClass: 'waveloginreg'
                });
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on('click', function (event) {
                    if (event.target.nodeName === 'HTML') {
                        if ($rootScope.popwaveloginreg) {//myPopup即为popup
                            $rootScope.popwaveloginreg.close();
                        }
                    }
                });
            },
            goWithToken: function (scope, state, stateP) {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        $state.go(state, stateP)
                        res()
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            goWithTokenwaveloginreg: function (scope, state, stateP) {
                if (localStorage.token) {
                    $state.go(state, stateP)
                } else {
                    _service.waveloginreg()
                }
            },
            checktoken: function () {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        res()
                    } else {
                        _service.waveloginreg()
                        rej()
                    }
                })
            },
            goWithAuth: function (scope, user, state) {

                return $q(function (res, rej) {
                    if (localStorage.token) {
                        if (user.certification) {
                            $state.go(state)
                            res()
                        } else {
                            $rootScope.goWithAuthionicPopup = $ionicPopup.confirm({
                                title: '请先完成实名认证',
                                cancelText: '暂不认证',
                                okText: '去认证',
                                cssClass: 'ionicPopupgoWithAuth'
                            })
                            $rootScope.goWithAuthionicPopup.then(function (res1) {
                                if (res1) {
                                    $state.go('autonym')
                                    res()
                                } else {
                                    rej()
                                }
                            });
                        }
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            goWithAuth2: function (scope, user, state) {
                return $q(function (res, rej) {
                    if (localStorage.token) {
                        if (user.certification) {
                            $state.go(state)
                            res()
                        } else {
                            $state.go('autonym')
                            res()
                        }
                    } else {
                        _service.login(scope)
                        rej()
                    }
                })
            },
            urlback: function (num) {
                num = num || -1
                $ionicHistory.goBack(num);
            },
            urlgo: function (state, params) {
                $state.go(state, params)
            }
        }
        window.i = $ionicHistory;
        window.rrhwechatappservice = _service;
        return _service;
    })
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                cache: false,
                url: '/home',
                templateUrl: 'templates/home/index.html',
                controller: 'home'
            })
            .state('homechannel', {
                cache: false,
                url: '/homechannel/:hasaccount',
                templateUrl: 'templates/homechannel/index.html',
                controller: 'homechannel'
            })
            .state('order', {
                cache: false,
                url: '/order',
                templateUrl: 'templates/order/index.html',
                controller: 'order',
                resolve: {
                    checklogin: function (appservice, $q) {
                        return $q(function (res, rej) {
                            if (localStorage.token) {
                                res()
                            } else {
                                appservice.waveloginreg()
                                res()
                            }
                        })
                    }
                }
            })
            .state('my', {
                cache: false,
                url: '/my',
                templateUrl: 'templates/my/index.html',
                controller: 'my'
            })
            .state('reg', {
                cache: false,
                url: '/reg',
                templateUrl: 'templates/reg/index.html',
                controller: 'reg'
            })
            .state('forgetpwd', {
                cache: false,
                url: '/forgetpwd',
                templateUrl: 'templates/forgetpwd/index.html',
                controller: 'forgetpwd'
            })
            .state('autonym', {
                cache: false,
                url: '/autonym/:next',
                templateUrl: 'templates/autonym/index.html',
                controller: 'autonym'
            })
            .state('autonymchannel', {
                cache: false,
                url: '/autonymchannel',
                templateUrl: 'templates/autonymchannel/index.html',
                controller: 'autonymchannel'
            })
            .state('infobase', {
                cache: false,
                url: '/infobase',
                templateUrl: 'templates/infobase/index.html',
                controller: 'infobase'
            })
            .state('infobasechannel', {
                cache: false,
                url: '/infobasechannel',
                templateUrl: 'templates/infobasechannel/index.html',
                controller: 'infobasechannel'
            })
            .state('infowork', {
                cache: false,
                url: '/infowork',
                templateUrl: 'templates/infowork/index.html',
                controller: 'infowork'
            })
            .state('infolinkman', {
                cache: false,
                url: '/infolinkman',
                templateUrl: 'templates/infolinkman/index.html',
                controller: 'infolinkman'
            })
            .state('infolinkmanchannel', {
                cache: false,
                url: '/infolinkmanchannel',
                templateUrl: 'templates/infolinkmanchannel/index.html',
                controller: 'infolinkmanchannel'
            })
            .state('infofamily', {
                cache: false,
                url: '/infofamily',
                templateUrl: 'templates/infofamily/index.html',
                controller: 'infofamily'
            })
            .state('iframe', {
                cache: false,
                url: '/iframe',
                templateUrl: 'templates/iframe/index.html',
                controller: 'iframe'
            })
            .state('nginclude', {
                cache: false,
                url: '/nginclude',
                templateUrl: 'templates/nginclude/index.html',
                controller: 'nginclude'
            })
            .state('bankcard', {
                cache: false,
                url: '/bankcard',
                templateUrl: 'templates/bankcard/index.html',
                controller: 'bankcard'
            })
            .state('bankcardadd', {
                cache: false,
                url: '/bankcardadd',
                templateUrl: 'templates/bankcardadd/index.html',
                controller: 'bankcardadd'
            })
            .state('lianlianbankcardaddsuc', {
                cache: false,
                url: '/lianlianbankcardaddsuc',
                templateUrl: 'templates/lianlianbankcardaddsuc/index.html',
                controller: 'lianlianbankcardaddsuc'
            })
            .state('recharge', {
                cache: false,
                url: '/recharge/:money',
                templateUrl: 'templates/recharge/index.html',
                controller: 'recharge'
            })
            .state('withdraw', {
                cache: false,
                url: '/withdraw',
                templateUrl: 'templates/withdraw/index.html',
                controller: 'withdraw'
            })
            .state('rechargeerror', {
                cache: false,
                url: '/rechargeerror',
                templateUrl: 'templates/rechargeerror/index.html',
                controller: 'rechargeerror'
            })
            .state('rechargesuc', {
                cache: false,
                url: '/rechargesuc/:m1/:m2',
                templateUrl: 'templates/rechargesuc/index.html',
                controller: 'rechargesuc'
            })
            .state('set', {
                cache: false,
                url: '/set',
                templateUrl: 'templates/set/index.html',
                controller: 'set'
            })
            .state('about', {
                cache: false,
                url: '/about',
                templateUrl: 'templates/about/index.html',
                controller: 'about'
            })
            .state('editpwd', {
                cache: false,
                url: '/editpwd',
                templateUrl: 'templates/editpwd/index.html',
                controller: 'editpwd'
            })
            .state('help', {
                cache: false,
                url: '/help',
                templateUrl: 'templates/help/index.html',
                controller: 'help'
            })
            .state('opinion', {
                cache: false,
                url: '/opinion',
                templateUrl: 'templates/opinion/index.html',
                controller: 'opinion'
            })
            .state('authlist', {
                cache: false,
                url: '/authlist',
                templateUrl: 'templates/authlist/index.html',
                controller: 'authlist'
            })
            .state('authlistchannel', {
                cache: false,
                url: '/authlistchannel',
                templateUrl: 'templates/authlistchannel/index.html',
                controller: 'authlistchannel'
            })
            .state('mobileauth', {
                cache: false,
                url: '/mobileauth',
                templateUrl: 'templates/mobileauth/index.html',
                controller: 'mobileauth'
            })
            .state('borrowlist', {
                cache: false,
                url: '/borrowlist/:status',
                templateUrl: 'templates/borrowlist/index.html',
                controller: 'borrowlist'
            })
            .state('transactionlist', {
                cache: false,
                url: '/transactionlist',
                templateUrl: 'templates/transactionlist/index.html',
                controller: 'transactionlist'
            })
            .state('repaymentlist', {
                cache: false,
                url: '/repaymentlist',
                templateUrl: 'templates/repaymentlist/index.html',
                controller: 'repaymentlist'
            })
            .state('prerepaymentlist', {
                cache: false,
                url: '/prerepaymentlist/:status',
                templateUrl: 'templates/prerepaymentlist/index.html',
                controller: 'prerepaymentlist',
                resolve: {
                    checklogin: function (appservice, $q) {
                        return $q(function (res, rej) {
                            if (localStorage.token) {
                                res()
                            } else {
                                appservice.waveloginreg()
                                res()
                            }
                        })
                    }
                }
            })
            .state('orderdetail', {
                cache: false,
                url: '/orderdetail/:id',
                templateUrl: 'templates/orderdetail/index.html',
                controller: 'orderdetail'
            })
            .state('contract', {
                cache: false,
                url: '/contract',
                templateUrl: 'templates/contract/index.html',
                controller: 'contract'
            })
            .state('contractsuc', {
                cache: false,
                url: '/contractsuc',
                templateUrl: 'templates/contractsuc/index.html',
                controller: 'contractsuc'
            })
            .state('usephone', {
                cache: false,
                url: '/usephone',
                templateUrl: 'templates/usephone/index.html',
                controller: 'usephone'
            })
            .state('message', {
                cache: false,
                url: '/message',
                templateUrl: 'templates/message/index.html',
                controller: 'message'
            })
            .state('accountlist', {
                cache: false,
                url: '/accountlist',
                templateUrl: 'templates/accountlist/index.html',
                controller: 'accountlist'
            })
            .state('downloadchannel', {
                cache: false,
                url: '/downloadchannel',
                templateUrl: 'templates/downloadchannel/index.html',
                controller: 'downloadchannel'
            })
            .state('ticket', {
                cache: false,
                url: '/ticket',
                templateUrl: 'templates/ticket/index.html',
                controller: 'ticket'
            })
            .state('tickethis', {
                cache: false,
                url: '/tickethis',
                templateUrl: 'templates/tickethis/index.html',
                controller: 'tickethis'
            })
            .state('rrhcoins', {
                cache: false,
                url: '/rrhcoins',
                templateUrl: 'templates/rrhcoins/index.html',
                controller: 'rrhcoins'
            })
            .state('wechatauth', {
                cache: false,
                url: '/wechatauth',
                templateUrl: 'templates/wechatauth/index.html',
                controller: 'wechatauth'
            })
        $urlRouterProvider.otherwise('/home');
        // if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        //     $urlRouterProvider.otherwise('/home');
        // } else {
        //     $urlRouterProvider.otherwise('/usephone');
        // }

    })