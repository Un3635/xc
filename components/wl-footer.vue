<template>
  <footer class="wl-footer">
    <div class="wl-footer-inner clearfix">
      <div class="wl-footer-left">
        <div class="wl-footer-left-nav">
          <nuxt-link to="/about-us">关于我们</nuxt-link>
          <nuxt-link to="/about-us">联系我们</nuxt-link>
          <nuxt-link to="/copyright">版权申明</nuxt-link>
          <nuxt-link to="/zixun">挖链资讯</nuxt-link>
          <nuxt-link to="/database">资料库</nuxt-link>
          <nuxt-link to="/guide">新手上路</nuxt-link>
          <nuxt-link to="/map">网站地图</nuxt-link>
        </div>
        <div class="wl-footer-left-copyright">
          <a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备18000657号-1 Copyright © 挖链网 版权所有 </a>
        </div>
        <div class="wl-footer-left-company">上海挖链科技有限公司 联系邮箱 market@walian.cn</div>
        <div class="wl-footer-left-company">地址:上海市徐汇区云锦路500号绿地汇中心B座913室 </div>
        <div class="wl-footer-left-links" v-if=" $route.name=='index'">
          友情链接:
          <a :href="i.url" v-for="(i,idx) in list" :key="idx" class="friendly_link" target="_blank">{{i.name}}</a>
        </div>
      </div>
      <div class="wl-footer-right">
        <div class="wl-footer-right-qrcode">
          <img src="../assets/images/download.png" alt="">
          <p>扫码下载APP</p>
        </div>
        <div class="wl-footer-right-qrcode">
          <img src="../assets/images/wechatqrcode.jpg" alt="">
          <p>扫码关注公众号</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
  .wl-footer {
    background: #292a32;

    &-inner {
      max-width: 1180px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    &-left {
      float: left;
      width: 650px;
      &-nav {
        margin-bottom: 17px;
        a {
          font-size: 14px;
          color: #ffffff;
          margin-right: 30px;
        }
      }
      &-copyright,
      &-company {
        font-size: 12px;
        color: #ffffff;
        line-height: 26px;
        a {
          font-size: 12px;
          color: #ffffff;
        }
      }
      &-links {
        margin-top: 5px;
        font-size: 12px;
        color: #ffffff;
        a {
          font-size: 12px;
          color: #ffffff;
          margin-right: 15px;
          line-height: 26px;
        }
      }
    }
    &-right {
      float: right;
      &-qrcode {
        float: left;
        margin-left: 85px;
        img {
          height: 105px;
          margin-bottom: 16px;
        }
        p {
          font-size: 12px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
</style>
<script>
  import { link_list } from "../service/main-api";
  export default {
    data() {
      return {
        list: []
      };
    },
    mounted() {
      link_list().then(res => (this.list = res));
    }
  };
</script>
