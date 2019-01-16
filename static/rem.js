(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 375) + "px";
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

(function showbody() {
  setTimeout(function() {
    if (document.getElementsByTagName("body").length > 0) {
      document.getElementsByTagName("body")[0].style.opacity = 1;
    } else {
      showbody();
    }
  }, 200);
})();
