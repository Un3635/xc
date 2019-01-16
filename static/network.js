/**
 * 判断网络状态
 */

function getNetWork() {
  var el = document.body;  
  if (el.addEventListener) {  
    window.addEventListener("online", function () {  
      alert("online");}, true);  
    window.addEventListener("offline", function () {  
      alert("offline");}, true);  
  }  
  else if (el.attachEvent) {  
    window.attachEvent("ononline", function () {  
      alert("online");});  
    window.attachEvent("onoffline", function () {  
      alert("offline");});  
  }  
  else {  
    window.ononline = function () {  
      alert("online");};  
    window.onoffline = function () {  
      alert("offline");};  
  }

}