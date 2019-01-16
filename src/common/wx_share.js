import $http from './http'
function share_config(_sharedata) {
 
    $http
        .post(
            "/wechat/getShareParam.open",
            {
                url: location.href.split("#")[0]
            },
            false
        )
        .then(data => {
            var sharedata = {
                imgUrl: _sharedata.imgUrl,
                title: _sharedata.title,
                desc: _sharedata.desc,
                link: _sharedata.link
            };
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone"
                ]
            });
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: sharedata.title,
                    link: sharedata.link,
                    imgUrl: sharedata.imgUrl
                });
                wx.onMenuShareAppMessage({
                    desc: sharedata.desc, // 分享描述
                    title: sharedata.title,
                    link: sharedata.link,
                    imgUrl: sharedata.imgUrl,
                    type: "link", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "" // 如果type是music或video，则要提供数据链接，默认为空
                });
                wx.onMenuShareQQ({
                    desc: sharedata.desc, // 分享描述
                    title: sharedata.title,
                    link: sharedata.link,
                    imgUrl: sharedata.imgUrl
                });

                wx.onMenuShareWeibo({
                    desc: sharedata.desc, // 分享描述
                    title: sharedata.title,
                    link: sharedata.link,
                    imgUrl: sharedata.imgUrl
                });
                wx.onMenuShareQZone({
                    desc: sharedata.desc, // 分享描述
                    title: sharedata.title,
                    link: sharedata.link,
                    imgUrl: sharedata.imgUrl
                });
            });
        });
}
export default share_config