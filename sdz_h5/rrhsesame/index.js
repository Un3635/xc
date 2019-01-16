; (function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function closeWindow() {
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        if (rrh && rrh.call) {
            rrh.call('closeWindow', {
            }, function (result) {
            })
        }
    } else {
        window.location.href = 'js://com.renwohua.conch/closeWindow';
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var isSuc = getQueryString('success') == 'true';
var nextStage = getQueryString('nextStage');

function go() {
    clearInterval(mytimer);
    if (!isSuc) {
        //app老版本认证
        if (nextStage == -1) {
            window.location.href = 'rrh://www.renrenhua.com/credit/zmauth?sourceType=newOrderV231';
            setTimeout(function () {
                closeWindow()
            }, 100)
        }
        //app 2.3.0
        else if (nextStage == -3) {
            window.location.href = 'rrh://www.renrenhua.com/credit/myCertification';
        }
        //app 2.3.1 下单
        else if (nextStage == -4) {
            window.location.href = 'rrh://www.renrenhua.com/credit/zmauth?sourceType=newOrderV231';
            setTimeout(function () {
                closeWindow()
            }, 100)
        }
        //web认证
        else if (nextStage == -2) {
            var t = parent;
            if (!t.rrhsesame2) {
                t.postMessage("rrhsesame", '*');
            }
            else {
                t.rrhsesame2();
            }
        }
        //web下单
        else if (nextStage == 'rrh2.1channel') {
            var t = parent;
            if (!t.rrhsesame) {
                t.postMessage("rrhsesame", '*');
            }
            else {
                t.rrhsesame();
            }
        }
        //app老版本下单
        else {
            window.location.href = 'rrh://www.renrenhua.com/credit/zmauth?sourceType=newOrderV231';
            setTimeout(function () {
                closeWindow()
            }, 100)
        }
    } else {
        //app老版本认证
        if (nextStage == -1) {
            closeWindow()
        }
        //app 2.3.0
        else if (nextStage == -3) {
            window.location.href = 'rrh://www.renrenhua.com/credit/myCertification';
        }
        //app 2.3.1 下单
        else if (nextStage == -4) {
            window.location.href = 'rrh://www.renrenhua.com/credit/myCertification';
            setTimeout(function () {
                closeWindow()
            }, 100)
        }
        //web认证
        else if (nextStage == -2) {
            var t = parent;
            if (!t.rrhsesame2) {
                t.postMessage("rrhsesame", '*');
            }
            else {
                t.rrhsesame2();
            }
        }
        //web下单
        else if (nextStage == 'rrh2.1channel') {
            var t = parent;
            if (!t.rrhsesame) {
                t.postMessage("rrhsesame", '*');
            }
            else {
                t.rrhsesame();
            }
        }
        //app老版本下单
        else {
            window.location.href = 'rrh://www.renrenhua.com/credit/personal';
            setTimeout(function () {
                closeWindow()
            }, 100)
        }
    }
}

window.onload = function () {
    if (!isSuc) {
        //window._vds.track("芝麻授信", { "sesameCreditAuthorization ": 0 });
        document.getElementById('err').style.display = 'block';
    } else {
        //window._vds.track("芝麻授信", { "sesameCreditAuthorization ": 1 });
        document.getElementById('suc').style.display = 'block';
    }
}

var time = 3;
setTimeout(function () {
    window.mytimer = setInterval(function () {
        if (time == 1) {

            go()
        } else {
            time--;
            document.getElementById('time').innerHTML = time + '秒后自动跳转至......';
        }
    }, 1000)
}, 1000);