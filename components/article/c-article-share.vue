<template>
  <div class="c-article-share">
    <el-tooltip placement="right" class="c-article-share-wx1" popper-class="pop-c-article-share-wx" hide-after=13123123123>
      <el-button></el-button>
      <div slot="content" class="pop-c-article-share-wx-content">
        <h2>微信扫一扫分享</h2>
        <img :src="qrimg" alt="">
        <h4>微信扫描二维码即可分享该内容</h4>
      </div>
    </el-tooltip>
    <el-tooltip placement="right" class="c-article-share-wx2" popper-class="pop-c-article-share-wx">
      <el-button></el-button>
      <div slot="content" class="pop-c-article-share-wx-content">
        <h2>微信扫一扫分享</h2>
        <img :src="qrimg" alt="">
        <h4>微信扫描二维码即可分享该内容</h4>
      </div>
    </el-tooltip>
    <div class="c-article-share-wb" @click="onwb"></div>
    <div class="c-article-share-qq" @click="onqq"></div>
    <div class="c-article-share-qzone" @click="oncollect" :class="{hasCollect:hasCollect}"></div>
    <div class="c-article-share-comment" @click="oncomment"></div>
  </div>
</template>
<script>
  import qrcode from "qrcode";
  export default {
    props: {
      oncomment: Function,
      oncollect: Function,
      hasCollect: Boolean,
      default: () => {}
    },
    data() {
      return { qrimg: "" };
    },
    mounted() {
      qrcode.toDataURL(location.href, (err, url) => {
        if (!err) {
          this.qrimg = url;
        }
      });
    },
    methods: {
      onqq() {
        var p = {
          url: window.location.href /*获取URL，可加上来自分享到QQ标识，方便统计*/,

          style: "101",
          width: 96,
          height: 24
        };
        var s = [];
        for (var i in p) {
          s.push(i + "=" + encodeURIComponent(p[i] || ""));
        }
        window.open(
          `http://connect.qq.com/widget/shareqq/index.html?${s.join("&")}`
        );
      },
      onwb() {
        function shareToXl(title, url, picurl) {
          var sharesinastring =
            "http://v.t.sina.com.cn/share/share.php?title=" +
            title +
            "&url=" +
            url +
            "&content=utf-8&sourceUrl=" +
            url +
            "&pic=" +
            picurl;
          window.open(
            sharesinastring,
            "newwindow",
            "height=400,width=400,top=100,left=100"
          );
        }
        shareToXl(document.title, location.href, "");
      }
    }
  };
</script>
<style lang="scss">
  .pop-c-article-share-wx {
    padding: 14px 25px !important;
    &.is-dark {
      background-color: white !important;
      box-shadow: 0 2px 12px 6px rgba(0, 0, 0, 0.06) !important;
      border-radius: 4px 4px 4px 4px 0 2px 0 !important;
    }

    &-content {
      text-align: center !important;
      width: 94px !important;
      h2 {
        font-size: 13px !important;
        line-height: 17px !important;
        color: #333333 !important;
      }
      h4 {
        font-size: 12px !important;
        line-height: 15px !important;
        color: #4a4a4a !important;
      }
      img {
        width: 88px !important;
        height: 88px !important;

        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    }
  }
  .c-article-share {
    & > * {
      display: block !important;
      width: 63px !important;
      height: 50px !important;
      background-color: #fafafa !important;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.09) !important;
      background-repeat: no-repeat !important;
      background-size: 32px auto !important;
      background-position: center !important;
      cursor: pointer !important;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 0 !important;
      border-left: 0px solid #f0f0f0 !important;
      border-right: 0px solid #f0f0f0 !important;
      border-top: 0px solid #f0f0f0 !important;
    }
    button {
      margin: 0 !important;
      &:active,
      &:focus,
      &:hover {
        border-color: #f0f0f0;
        background-color: #fafafa;
      }
    }

    &-wx1 {
      background-image: url("../../assets/images/142/pengyouquan@2x.png") !important;
      &:hover {
        background-image: url("../../assets/images/142/pengyquanSelect@2x.png") !important;
      }
    }
    &-wx2 {
      background-image: url("../../assets/images/142/weixin@2x.png") !important;
      &:hover {
        background-image: url("../../assets/images/142/weixinSelect@2x.png") !important;
      }
    }
    &-wb {
      background-image: url("../../assets/images/142/wei'bo@2x.png");
      &:hover {
        background-image: url("../../assets/images/142/weiboSelect@2x.png");
      }
    }
    &-qq {
      background-image: url("../../assets/images/142/qq@2x.png");
      &:hover {
        background-image: url("../../assets/images/142/qqSelect@2x.png");
      }
    }
    &-qzone {
      margin-top: 13px;
      background-image: url("../../assets/images/142/qqkongjian@2x.png");
      &:hover,
      &.hasCollect {
        background-image: url("../../assets/images/142/qqkongjianSelect@2x.png");
      }
    }
    &-comment {
      background-image: url("../../assets/images/142/xiaoxi@2x.png");
      &:hover {
        background-image: url("../../assets/images/142/xioaxiSelect@2x.png");
      }
    }
  }
</style>

