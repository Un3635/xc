window.xcwl = {
  callbacks: {}
};
var xcwl = {
  hockAPP: function() {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.call
    ) {
      return true;
    } else if (window.xcwlandroid && window.xcwlandroid.call) {
      return true;
    } else {
      return false;
    }
  },
  call: function(callname, calldata, callback) {
    if (!this.hockAPP()) {
 

      return;
    }
    if (!callname) {
      return;
    }
    if (!calldata) {
      calldata = {};
    }
    if (!callback) {
      callback = function() {};
    }
    var _r = callname + Math.floor(Math.random() * 10000);

    window.xcwl.callbacks[_r] = function(data) {
      if (data.code == 200) {
        callback(data.result);
      } else {
        alert("error" + data.message);
      }
    };
    var _postdata = {
      callname: callname,
      calldata: calldata,
      callid: _r
    };

    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.call
    ) {
      window.webkit.messageHandlers.call.postMessage(_postdata);
    } else if (window.xcwlandroid && window.xcwlandroid.call) {
      _postdata.calldata = JSON.stringify(_postdata.calldata);
      window.xcwlandroid.call(JSON.stringify(_postdata));
    }
  }
};
export default xcwl;
