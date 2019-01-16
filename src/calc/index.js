var fun = function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 918-17) {
                docEl.style = '';
                return;
            }
            docEl.style.fontSize = 100 * (clientWidth /1200) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
};
// var windowWidth = $(window).width();
var windowWidth =window.screen.width;
fun(document, window);
console.log("111")




