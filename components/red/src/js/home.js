var config = {
  1: function(coinAbbreviation) { // 红包正常领取 
    var lng =  lgs.hintTitle[getLg()];
    $('#hint').html(lng[0]+coinAbbreviation+lng[1]);
   
    config.received();
    $(util.getDom("status0")).css({'display': 'block'});
  },
  2: function() { // 红包已经领完了
    config.received();
    $(util.getDom("status1")).css({'display': 'block'});
  },
  3: function() { // 红包已经失效
    config.received();
    $(util.getDom("status2")).css({'display': 'block'});
  },
  setInfo: function(data) {
    $('.nickName').each(function(item, O){
      $(O).html(data.nickName);
    })
    $('.remark').each(function(item, O){
      $(O).html(data.remark || lgs.remark[getLg()]);
    })
    $('.pic').each(function(item, O){
      if(data.headPortrait) {
        $(O).attr({src: data.headPortrait});
      }
    })
  },
  receive: function (data, cb) { // 3 红包已经成功领取
    YDUI.dialog.loading.open('');
    price(function(res) {
      YDUI.dialog.loading.close();
      var lng =  lgs.normal[getLg()];
      $('#getBalance').html(Number(data.totalBalance).toFixed(8) + data.coinAbbreviation);
      var unitPrice = Number(res.result.data[data.coinAbbreviation.toUpperCase()]);
      $('#getRn').html('≈ ¥' + (Number(data.totalBalance) * unitPrice).toFixed(8));
      $('#getContent').html(lng[0]+ data.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') + lng[1]);
      $('#normal').css({'display': 'block'});
      cb && cb();
    })
    
 
 
  },
  received:  function() {
    $(util.getDom("redPacket")).css({'display': 'block'});
  },
  fd: function(data, con) { // 朋友手气
    var lis = [];
    for(var i = 0; i < data.length ; i++) {
      var rd = Math.floor(Math.random() * 10);
      var headPic = data[i].headPortrait || fdPics[rd];
      var li = $('<li>')
      .append(
        $('<div>').addClass('fdPic-wrap').append($('<img>').attr({src: headPic, class: 'fdPic'}))
      )
      .append(
        $('<div>').addClass('left').append(
          $('<div>').addClass('phoneNum').html(data[i].userMobile)
        ).append(
          $('<div>').html(moment(data[i].receiveTime).format("YYYY.MM.DD HH:mm"))
        )
      )
      .append(
        $('<div>').addClass('right').append(
          $('<div>').html('+' + Number(data[i].totalBalance).toFixed(8) +' '+data[i].coinAbbreviation)
        )
      )
      lis.push(li);
    }
    con.prepend(lis);
    $('#checkFdWrap').css({display: 'block'});
  }
}