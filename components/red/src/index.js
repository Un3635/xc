
// var packetId = '1029970796212125696';
// var packetId = '1033911475451723776';   
// var packetId = '1033978289057693696';
var packetId = null;
var state = -1;
var page = 1;
var pageSize = 5;

var checkFd = function(p, cb1, cb2) {
  // 获取朋友手气
  var p = p || page;
  cb1 && cb1(); 
  query({'parentPacketId': packetId}, function(res) {
    if(res.result) {
      config.fd(res.result, $('#checkFdUl'));
    }
    // if(res.total && res.total > pageSize){
    //  if(getDom('loadtip').css('display') === 'none') $('#loadtip').css({display: 'block'});
    //   setTimeout(function(){
    //     pullLoaded(checkFd, p);
     
    //     cb2 && cb2(res.result);
    //   },0)
    // } else {
    //   $("#loadtip").html('没有更多啦！');
    // }
  });
}
// 判断用户是否领过钱包
var redPacketOver = function(cb, cb2){
  // 查询该手机号是否领过红包, 若成功领过,则直接查看领取金额,并显示其他好友手气
  if(!util.cookie.get(packetId)) {
    cb && cb();
    return;
  }
  query({'parentPacketId': packetId, mobile: util.cookie.get(packetId)}, function (res1) {
    if(res1.result && res1.result[0].status === 2) {
        config.receive(res1.result[0], function() {
        checkFd(1);
      });
      cb2 && cb2();
      setTimeout(function(){
        $('#redPacketSuc').fadeIn('slow');
      }, 0);
    } else {
      cb && cb();
    }
  })
}
var showInit = function() {
   // 1. 获取 状态
  packetId = util.getParam('parentPacketId');
  if(!packetId) {
    YDUI.dialog.toast(lgs.hints[getLg()][2], 'none', 1500);
    return;
  }
  YDUI.dialog.loading.open(lgs.hints[getLg()][0]);
  getPacketInfo(packetId, '', function(res) {
   
    state = res.result.status;
    // 设置头像 昵称 备注
    config.setInfo(res.result);
    // res.result.totalSum;
    // 紅包正常领取的時候，判斷該用戶是否領過紅包
    
    if(state === 1 || state === 2) {

      redPacketOver(function(){
        // 该用户没有领取过红包
        if(state === 2) {
          $('#download').addClass('download-btn2');
        }
        config[state](res.result.coinAbbreviation);
        YDUI.dialog.loading.close();
        // return;
      }, function() {
        YDUI.dialog.loading.close();
      });
      return;
    }
  },function() {
    YDUI.dialog.loading.close();
  })
}

var listen = function() {
  // 领取红包
  $('#receiveBtn').on('click', function() {
    $(util.getDom('redPacket')).css({display: 'none'});
    $("#phonePopup").fadeIn('slow');
  })

  // 验证码 ui
  getYzCode();
  
  // 手机号 - 领取红包
  $('#receiveBtnSuc').on('click', function() {
    check(function(V) {
      if(V) {
        var show = function() {
          $(util.getDom('phonePopup')).css({display: 'none'});
          $('#redPacketSuc').fadeIn('slow');
        }
        // console.log('mobile', V[0]);
        YDUI.dialog.loading.open(lgs.hints[getLg()][0]);
        rob({'parentPacketId': packetId, 'account': V[0], 'checksum': util.getParam('checksum'),'smsCode': V[1]}, function(res) {
          util.cookie.set(packetId,V[0]);
          YDUI.dialog.loading.close();
          if(res.code === '7001' || res.code === '7002' || res.code === '7003') {
            YDUI.dialog.toast(code[res.code][getLg()], 'none', 1500, function() {
              config.received(code[res.code][getLg()]);
              show();
              // 在红包曾经领过的情况下,需要去获取用户信息
              if(res.code === '7002') {
                redPacketOver();
              } else {
                checkFd(1);
              }
            });
            
          } else {
            config.receive(res.result, function() {
              checkFd(1);
            });
            show();
          }
        }, function() {
          YDUI.dialog.loading.close();
        })
      }
    })
  })

  // 晚了，查看手气
  $('#checkFdBtn').on('click', function() {
    $('#redPacket').css({display: 'none'});
    $('#normal').css({display: 'none'});
    // $('#endWrap').fadeIn('slow');
    $('#redPacketSuc').fadeIn('slow');
    $('#checkFdUl1').html('');
    checkFd(1);
  })

   // 下载钱包
  $('#download').on('click', function(){
    window.location.href = "http://m.xt.top/download";
  })
}

window.onload = function() {
  // 显示相对应的功能
  showInit();

  // 各种点击事件的监听
  listen();
  
}
