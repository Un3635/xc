$(function () {

    var commonUrl = 'http://api.fintoken.com';

    //联系我们表格
    var correctName = false;
    var correctEmail = false;
    var correctPhone = false;
    var correctSelect = false; //检查下拉选择框是否为空
    // var re = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
    var re=/@/;
    $('#input-name').keyup(function () {
        if ($(this).val() === '') {
            $('#error-name').css('display', 'block');
            $('#input-name').addClass('error-active');
            correctName = false;
        } else {
            $('#error-name').css('display', 'none');
            $('#input-name').removeClass('error-active');
            correctName = true;
        }
        finalCheck();
    });
    $('#input-phone').keyup(function () {
        if ($(this).val() === '') {
            // $('#error-phone').css('display', 'block');
            $('#input-phone').addClass('error-active');
            correctPhone = false;
        } else {
            // $('#error-phone').css('display', 'none');
            $('#input-phone').removeClass('error-active');
            correctPhone = true;
        }
        finalCheck();
    });
    $('#submit-select').click(function () {
        var selectVal = '';
          if (windowWidth < 918) {
            selectVal = $('#visitedSelect').html();
          } else {
            selectVal = $('#submit-select .dropdown-title .dropdown-value').html();
          }
        if ( selectVal  === '') {
          $('#submit-select .dropdown-title').addClass('error-active');
        } else {
          $('#submit-select .dropdown-title').removeClass('error-active');
        }
       finalCheck();
  });
    $('#visitedSelect').click(function(){
        $('.wap-select').removeClass('error-active');
        finalCheck();
    });
    $('#input-email').keyup(function () {
        if (!re.test($('#input-email').val())) {
            $('#error-email').css('display', 'block');
            $('#input-email').addClass('error-active');
            correctEmail = false;
        } else {
            $('#error-email').css('display', 'none');
            $('#input-email').removeClass('error-active');
            correctEmail = true;
        }
        finalCheck();
    });
    $('#textarea').keyup(function () {
        if ($('#textarea').val() === '') {
            $('#textarea').addClass('error-active');
        } else {
            $('#textarea').removeClass('error-active');
        }
        finalCheck();
    });
    $('#input-agree').click(function () {
        finalCheck();
    });
    $('#submit-btn').click(function () {
      var finalSelectVal2 = '';
      if (windowWidth < 918) {
        finalSelectVal2 = $('#visitedSelect').html();
      } else {
        finalSelectVal2 = $('#submit-select .dropdown-title .dropdown-value').html();
      }
      if(finalSelectVal2 === ''){
        correctSelect = false;
      } else {
        correctSelect = true;
      }
        if (!correctName) {
            $('#error-name').css('display', 'block');
            $('#input-name').addClass('error-active');
        }
        if (!correctEmail) {
            $('#error-email').css('display', 'block');
            $('#input-email').addClass('error-active');
        }
        if (!correctPhone) {
            $('#input-phone').addClass('error-active');
          }
        if (!correctSelect) {
            $('#submit-select .dropdown-title').addClass('error-active');
            $('.wap-select').addClass('error-active');
        }
        if ($('#textarea').val() === '') {
            $('#textarea').addClass('error-active');
        }
        if (correctName && correctEmail && correctPhone && correctSelect && $('#input-agree').is(':checked') && $('#textarea').val() !== '') {
              contactUs();
        }
    });
    $('#submit-pop-close').click(function () {
        $('#submit-pop').fadeOut();
    });

    function finalCheck() {
        var finalSelectVal = '';
        if (windowWidth < 918) {
          finalSelectVal = $('#visitedSelect').html();
        } else {
          finalSelectVal = $('#submit-select .dropdown-title .dropdown-value').html();
        }
        if(finalSelectVal === ''){
          correctSelect = false;
        } else {
          correctSelect = true;
        }
        if (correctName && correctEmail && correctPhone && correctSelect && $('#input-agree').is(':checked') && $('#textarea').val() !== '') {
            $('#submit-btn').removeClass('disable-btn').addClass('active-btn');
        } else {
            $('#submit-btn').removeClass('active-btn').addClass('disable-btn');
        }
    }

    function contactUs() {
        var _type = 0;
        var _typeString = '';
        if (windowWidth < 918) {
            _typeString = $('#visitedSelect').html();
        } else {
            _typeString = $('#submit-select .dropdown-title .dropdown-value').html();
        }
        switch (_typeString) { // 把类型转换成整数
            case 'マイニングマシンについて':
                _type = 1;
                break;
            case 'イベントコラボレーションについて':
                _type = 2;
                break;
            case 'FinToについて':
                _type = 3;
                break;
            case 'FinTo　Cubeについて':
                _type = 4;
                break;
            case 'FinTo　Indexについて':
                _type = 5;
                break;
            case '事業提携などについて':
                _type = 6;
                break;
            case '事業会社情報について':
                _type = 7;
                break;
            case '採用について':
                _type = 8;
                break;
            case 'その他':
                _type = 9;
                break;
            default:
                _type = 0;
        }
        var data = {
            type: _type,
            companyName: $('.company-name').val(),
            departmentName: $('.department-name').val(),
            name: $('#input-name').val(),
            email: $('#input-email').val(),
            phone: $('#input-phone').val(),
            content: $('#textarea').val()
        };
        $.ajax({
            type: 'POST',
            url: commonUrl + '/feedback/contactUs',
            data: data,
            success: function (result) {
                if (result.msg == 'OK' || result.code == '000000') {
                    $('#submit-pop').fadeIn();
                    successCB(data.email);
                }
            },
            error: function (data) {
            }
        });
    };
    function successCB(email) {
        var oFirst = document.body.firstChild;
        var newImg = document.createElement('img');
        newImg.src="https://www.cross-a.net/xa.php?adid=15838&rn=1&u1=" + email;
        newImg.style.width = "1px";
        newImg.style.height = "1px";
        document.body.insertBefore(newImg,oFirst);

      // $.ajax({
      //   type: 'POST',
      //   url: 'https://www.cross-a.net/xa.php?adid=15838&rn=1&u1='+ email,
      //   data: {},
      //   success: function (result) {
      //     if (result.msg == 'OK' || result.code == '000000') {
      //         console.log(result)
      //     }
      //   },
      //   error: function (data) {
      //       console.log(err)
      //   }
      // });
    }

    //职位申请表格提交
    var correctName2 = false;
    var correctEmail2 = false;
    var correctPhone2 = false;
    // var re2 = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
    var re2=/@/;
    // var rePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    $('#input-name2').keyup(function () {
        if ($(this).val() === '') {
            $('#error-name2').css('display', 'block');
            $('#input-name2').addClass('error-active');
            correctName2 = false;
        } else {
            $('#error-name2').css('display', 'none');
            $('#input-name2').removeClass('error-active');
            correctName2 = true;
        }
        finalCheck2();
    });
    $('#input-email2').keyup(function () {
        if (!re2.test($('#input-email2').val())) {
            $('#error-email2').css('display', 'block');
            $('#input-email2').addClass('error-active');
            correctEmail2 = false;
        } else {
            $('#error-email2').css('display', 'none');
            $('#input-email2').removeClass('error-active');
            correctEmail2 = true;
        }
        finalCheck2();
    });
    $('#input-phone2').keyup(function () {
        if ($('#input-phone2').val()==='') {
            $('#input-phone2').addClass('error-active');
            correctPhone2 = false;
        } else {
            $('#input-phone2').removeClass('error-active');
            correctPhone2 = true;
        }
        finalCheck2();
    });
    $('#textarea2').keyup(function () {
        if($('#textarea2').val()===''){
            $('#textarea2').addClass('error-active');
        }else{
            $('#textarea2').removeClass('error-active');
        }
        finalCheck2();
    });
    $('#apply-btn').click(function () {
        if (!correctName2) {
            $('#error-name2').css('display', 'block');
            $('#input-name2').addClass('error-active');
        }
        if (!correctEmail2) {
            $('#error-email2').css('display', 'block');
            $('#input-email2').addClass('error-active');
        }
        if (!correctPhone2) {
            $('#input-phone2').addClass('error-active');
        }
        if ($('#textarea2').val() === '') {
            $('#textarea2').addClass('error-active');
        }
        if (correctName2 && correctEmail2 && correctPhone2 && $.trim($('#textarea2').val()) !== '') {
            applyPosition(); //提交数据
        }
    });
    $('#apply-pop-close').click(function () {
        $('#apply-pop').fadeOut();
    });

    function finalCheck2() {
        if (correctName2 && correctEmail2 && correctPhone2 && $('#textarea2').val() !== '') {
            $('#apply-btn').removeClass('disable-btn').addClass('active-btn');
        } else {
            $('#apply-btn').removeClass('active-btn').addClass('disable-btn');
        }
    }

    function applyPosition() {
        var _hopePosition = '';
        var _age = 18;
        if (windowWidth < 918) {
            _hopePosition = $('#applyPosSelect').html();
            _age = parseInt($('#applyAgeSelect').html());
        } else {
            _hopePosition = $('#pos-select .dropdown-title .dropdown-value').html();
            _age = parseInt($('#age-select .dropdown-title .dropdown-value').html());
        }
        var data2 = {
            hopePosition: _hopePosition,
            userName: $('#input-name2').val(),
            age: _age,
            phone: $('.phone-item2').val(),
            email: $('#input-email2').val(),
            content: $('#textarea2').val()
        };
        $.ajax({
            type: 'POST',
            url: commonUrl + '/feedback/applyPosition',
            data: data2,
            success: function (result) {
                if (result.msg == 'OK' || result.code == '000000') {
                    $('#apply-pop').fadeIn();
                }
            },
            error: function (data) {
            }
        });
    };
});

//PC 端下拉选择
$(function (W) {
    /**
     * 下拉列表
     **/
    function Dropdown(options) {
        options = options || {};
        this.defaultValue = options.defaultValue || '';
        this.selector = options.selector || '';
        this.content = options.content || '';
        this.dataList = options.dataList || [];
        this.callback = options.callback || function () {
        };
        this.init();
    }

    /**
     * 下拉列表显示
     **/
    Dropdown.prototype = {
        hide: function () {
            $('.icons-arrow-down').removeClass('up');
            $('.dropdown-content').removeClass('show');
        },
        show: function (me) {
            $(me).find('.icons-arrow-down').addClass('up');
            $(me).siblings().addClass('show');
        },
        /**
         * 当点除选择框外的东西
         */
        handleMouseOutClick: function () {
            var me = this;
            window.onclick = function (e) {
                e = e || window.event;
                if (!$(e.target).parents('.dropdown').length) {
                    me.hide();
                }
            };
        },
        //选择
        handleSelect: function () {
            var selector = $(this.selector);
            var me = this;
            selector.on('click', '.data-item', function () {
                var currentValue = $(this).html();
                $(this).parents('.dropdown').find('.dropdown-value').html(currentValue);
                $(this).addClass('selected').siblings().removeClass('selected');
                me.hide();
                me.callback(this);
            });
        },
        /**
         * 点击事件
         */
        handleClick: function () {
            var me = this;
            $(this.selector).find('.dropdown-title').off('click').on('click', function (e) {
                e = e || window.event;
                e.preventDefault();
                var dropdown = $('.dropdown-title').not(this).parent();
                dropdown.find('.icons-arrow-down').removeClass('up');
                dropdown.find('.dropdown-content').removeClass('show');
                if ($(this).parents('.dropdown').hasClass('disable')) {
                    return;
                }
                var arrow = $(this).find('.icons-arrow-down');
                var siblings = $(this).siblings();
                if (arrow.hasClass('up')) {
                    me.hide();
                } else {
                    arrow.addClass('up');
                    siblings.addClass('show');
                }
            });
        },
        joinHTML: function () {
            var html = '<ul class="data-list">';
            for (var i = 0; i < this.dataList.length; i++) {
                for (var j in this.dataList[i]) {
                    html += ' <li class="data-item ' +
                        (this.defaultValue === this.dataList[i][j] ? 'selected' : '') +
                        '" key="' + (j !== '   ' ? j : '') + '">' + this.dataList[i][j] + '</li>';
                }
            }
            html += '  </ul>';
            return html;
        },
        /**
         * 有checkbox框
         */
        joinHTMLHaveChecked: function () {
            var html = '<ul class="data-list">';
            for (var i = 0; i < this.dataList.length; i++) {
                for (var j in this.dataList[i]) {
                    html += ' <li class="data-item ' +
                        (this.defaultValue === this.dataList[i][j] ? 'selected' : '') +
                        '" key="' + (j !== '   ' ? j : '') + '"><i class="icons icons-checkbox"></i>' + this.dataList[i][j] + '</li>';
                }
            }
            html += '  </ul>';
            return html;
        },
        /**
         * 创建结构
         */
        createHTML: function () {
            var html = '<div class="dropdown-title"><span class="dropdown-value">'
                + this.defaultValue
                + '</span><i class="icons icons-arrow-down"></i></div>';
            html += '<div class="dropdown-content only-list"><i class="dropdown-triangle"></i>' + this.joinHTML() + '</div>';
            $(this.selector).html(html);
            this.handleClick();
            this.handleSelect();
            this.handleMouseOutClick();
        },
        init: function () {
            this.createHTML();
        }
    };
    W.Dropdown = Dropdown;

}(window));

//其他
$(function () {
    //联系我们页 职位选择按钮
    var posData = [
        {
            'tit': 'コーポレート職',
            'image': './img/icon/emplo_detail1_1x.png',
            'position':[
                {
                    'title':'法務',
                    'desc':'会社として遵守しなければならないコンプライアンスやガバナンスを統制・管理し、リスクコントロールを行います。訴訟や紛争の対応、法的問題の検証も行います。特許や商標、知的財産権の申請・管理も行います。'
                },
                {
                    'title':'総務',
                    'desc':'会社全般のコントロールを行います。社内イベントやワークフローの構築や修正、オフィスの維持管理などを幅広く行います。また、突発的な特殊業務も担います。株主総会や取締役会の運営、各種会議体の運営と管理も行います。'
                },
                {
                    'title':'経理',
                    'desc':'日次・月次・年次の決算業務から日々の起票まで一連の業務を担います。また、税務対応等も行います。高精度でスピーディーな数値管理が求められます。'
                },
                {
                    'title':'財務',
                    'desc':'会社の短期・中期・長期戦略を鑑みた視点から資金繰りを行います。金融機関との融資の折衝を主担当として行います。　'
                },
                {
                    'title':'人事·労務',
                    'desc':'主に、新卒採用と中途採用の業務を行います。様々な媒体やＳＮＳを駆使して必要な人材を必要な人数確保していく事が求められます。また、社員の役職管理や給与計算業務等も行います。入退社の管理も含まれます。　'
                },
                {
                    'title':'ＰＲ広報',
                    'desc':'プレスリリースの資料作成やメディアとのリレーションの構築、取材の調整等を行います。ＰＲイベント企画運営やコラボレーション企画等も手掛けて頂きます。また、社内広報業務も担います。'
                }
            ]
        },
        {
            'tit': 'エンジニア職',
            'image': './img/icon/emplo_detail2_1x.png',
            'position':[
                {
                    'title':'ＷＥＢエンジニア',
                    'desc':'オウンドメディアの運用・管理を行います。また、ＵＩ・ＵＸの修正や改修を行います。'
                },
                {
                    'title':'金融関連エンジニア',
                    'desc':'ブロックチェーンを活用した新たな金融サービスの模索・開発を行います。'
                },
                {
                    'title':'グラフィックエンジニア',
                    'desc':'オウンドメディアやホームページ、ＳＮＳなどのデザインや配色・キャッチコピーの制作等を行います。'
                }
            ]
        },
        {
            'tit': 'セールス·マーケティング職',
            'image': './img/icon/emplo_detail3_1x.png',
            'position':[
                {
                    'title':'コンサルティングセールス',
                    'desc':'仮想通貨やブロックチェーンの認知度向上、及び販売・運用に関わるコンサルティングを含めた提案を法人・個人へ行います。また、セミナーの開催なども行い、より広くマスにアクションを取って頂きます。'
                },
                {
                    'title':'ＷＥＢマーケティングディレクター',
                    'desc':'ディレクターとして、ＷＥＢマーケティングのディレクションを行います。最大限コストパフォーマンスが発揮されるように、媒体の選別などの意思決定を担います。また、ＵＩやＵＸにも関与し、ＣＶＲ向上に向けたあらゆる施策にて管理統制をして頂きます。'
                },
                {
                    'title':'ＷＥＢマーケティングアシスタント',
                    'desc':'ＷＥＢマーケティングディレクターのアシスタントとして、コスト管理やＵＩＵＸの微調整、ＡＢテスト等の管理と運用等を行って頂きます。数値管理から実際にデザインに関わるところまで広い分野の業務をして頂きます。'
                }
            ]
        }
    ];

    $('.emplo-item').click(function () {
        var index=$(this).parent('.emplo-list').parent('.emplo').index()-2;
        localStorage.setItem('imgUrl', JSON.stringify(posData[index].image));
        localStorage.setItem('imgTit', JSON.stringify(posData[index].tit));
        var pos=posData[index].position[$(this).index()];
        localStorage.setItem('posName', JSON.stringify(pos.title));
        localStorage.setItem('posDesc', JSON.stringify(pos.desc));
    });
    var urlItem=localStorage.getItem('imgUrl');
    var titItem=localStorage.getItem('imgTit');
    var nameItem=localStorage.getItem('posName');
    var descItem=localStorage.getItem('posDesc');
    if(urlItem && titItem && nameItem &&  descItem){
        $('#emplo-img').attr('src', JSON.parse(urlItem));
        $('#emplo-name').html(JSON.parse(titItem));
        $('#emplo-subtit').html(JSON.parse(nameItem));
        $('#emplo-desc').html(JSON.parse(descItem));
        $('#crumbs-position-pos').html(JSON.parse(nameItem));
    }
    //职位申请页按钮底部按钮
    $('#position-btn').click(function(){
        window.location.href = 'apply.html';
    })
    $('#crumbs-position').html(JSON.parse(nameItem));
});
