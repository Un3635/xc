
// var packetId = '1029970796212125696';
// var packetId = '1033911475451723776';
var userId = '7a5c6590-2689-4ca5-a9cc-e74656e692a';
var packetId = '1033978289057693696';
var state = -1;
var page = 1;
var pageSize = 5;
var checkFd = function(p, cb1, cb2) {
  // 获取朋友手气
  var p = p || page;
  cb1 && cb1();
  //  token: userId,
  query({'parentPacketId': packetId, token: '', 'pagesize': pageSize, 'page': p}, function(res) {
    if(res.result) {
      config.fd(res.result, $('#checkFdUl'));
    }
    if(res.total && res.total > pageSize){
     if(getDom('loadtip').css('display') === 'none') $('#loadtip').css({display: 'block'});
      setTimeout(function(){
        pullLoaded(checkFd, p);
     
        cb2 && cb2(res.result);
      },0)
    } else {
      $("#loadtip").html('没有更多啦！');
    }
  });
}
var showInit = function() {
   // 1. 获取 状态

  getPacketInfo(packetId, '', function(res) {
    state = res.result.status;
    // res.result.totalSum;
    // 紅包政策的時候，再判斷該用戶是否領過紅包
    if(state === 1) {
      query({'parentPacketId': packetId, token: userId, 'pagesize': pageSize, 'page': page}, function (res) {
        if(res.result[0].status === 2) {
          config.receive(res.result[0]);
          $('#redPacketSuc').fadeIn('slow');
          checkFd(1);
        } else {
          config[state](res.result[0].coinAbbreviation);
          return;
        }
        
      })
      return;
    }
    if(state === 2) {
      $('#download').addClass('download-btn2');
    }
    config[state](res.result.coinAbbreviation);
  })
}

var listen = function() {
  // 领取红包
  $('#receiveBtn').on('click', function() {
    getDom('redPacket').css({display: 'none'});
    // getDom('redPacket').parent().css({display: 'none'});
    // getDom('phonePopup').css({display: 'block'});
    $("#phonePopup").fadeIn('slow');
  })

  // 验证码 ui
  getYzCode();
  
  // 手机号 - 领取红包
  $('#receiveBtnSuc').on('click', function() {
    check(function(V) {
      if(V) {
        var show = function() {
          getDom('phonePopup').css({display: 'none'});
          $('#redPacketSuc').fadeIn('slow');
          // 获取朋友手气
          checkFd(1);
        }
        rob({'parentPacketId': packetId, 'account': V[0], 'smsCode': V[1], 'codeToken': V[2] }, function(res) {
          YDUI.dialog.loading.close();
          if(res.code === '7001' || res.code === '7002') {
            YDUI.dialog.toast(code[res.code], 'none', 1500, function() {
              config.received(code[res.code]);
              show();
            });
            
          } else {
            config.receive(res.result);
            show();
          }
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
    ;
  })
}

window.onload = function() {
  // 显示相对应的功能
  showInit();

  // 各种点击事件的监听
  listen();
  
}
