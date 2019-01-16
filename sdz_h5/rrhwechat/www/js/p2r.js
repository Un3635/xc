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