var rrh = {
    version: '1.0',
    callbacks: {},
    call: function (callname, calldata, callback) {
        if (!callname) {
            return
        }
        if (!calldata) {
            calldata = {}
        }
        if (!callback) {
            callback = function () {
            }
        }
        var _r = callname + Math.floor(Math.random() * 10000)
        this.callbacks[_r] = function (data) {
            if (data.code == 200) {
                callback(data.result);
            } else {
                alert('error' + data.message)
            }
        };
        var _postdata = {
            callname: callname,
            calldata: calldata,
            callid: _r,
        }

        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.call) {
            window.webkit.messageHandlers.call.postMessage(_postdata);
        } else if (window.rrhandroid && window.rrhandroid.call) {
            _postdata.calldata = JSON.stringify(_postdata.calldata);
            window.rrhandroid.call(JSON.stringify(_postdata));
        }
    }
}