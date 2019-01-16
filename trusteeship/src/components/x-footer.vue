<template>
  <div class="footer">
    <el-row class="footer__inner">
      <el-col :span="7">
        <img class="footer-logo" src="../assets/images/footer-logo.png" alt="">
        <p>沪ICP备18000657号-2 Copyright © 算立方 版权所有</p>
        <p>上海挖链科技有限公司</p>
        <p>地址：上海市徐汇区云锦路500号绿地汇中心B座12楼</p>
      </el-col>
      <el-col :span="3">
        <h5>挖链产品与服务</h5>
        <p><a class="link" href="/">算立方</a></p>
        <p><a class="link" href="https://walian.cn" target="_blank">挖链网</a></p>
        <p><a class="link" href="http://tir.top" target="_blank">通证指数</a></p>
      </el-col>
      <el-col :span="3">
        <h5>关于算立方</h5>
        <p><a class="link" href="/about-us">算立方简介</a></p>
        <p>商务合作</p>
        <p>bd@walian.cn</p>
      </el-col>
      <el-col :span="4" class="text-center">
        <h5>客服热线</h5>
        <p class="service">400-865-6688</p>
        <p>周一至周五 09:00~18:00</p>
        <p>（仅收市话费）</p>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-row class="text-center">
          <el-col :span="12">
          <h5>算立方社群</h5>
          <img class="download-img" src="../assets/images/wechat-group.png" alt="">
          </el-col>
          <el-col :span="12">
            <h5>算立方公众号</h5>
            <img class="download-img" src="../assets/images/qrcode.jpg" alt="">
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="friend-link" v-if="friendsLinks.length>0">友情链接：
      <a class="link" :href="item.linkUrl" v-for="item in friendsLinks" :key="item.linkName">{{item.linkName}}</a>
    </p>
  </div>
</template>

<script>
  import CommonAPI from '../services/common-api';

  export default {
    name: 'x-footer',
    data() {
      return {
        friendsLinks: []
      };
    },
    mounted() {
      CommonAPI.friendsLinks()
        .then(res => res.result)
        .then(res => {
          this.friendsLinks = res;
        })
        .catch(() => {
        });
    }
  };
</script>

<style scoped lang="scss">
  @import "../style/variables";

  .footer {
    height: 236px;
    background-color: $primary;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .footer__inner, .friend-link {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    position: relative;
    top: -3px;
    width: 160px;
  }

  img {
    vertical-align: top;
  }

  p {
    font-size: 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);

    &:nth-of-type(1) {
      margin-top: 8px;
    }
  }

  .footer-logo + p {
    margin-top: 13px;
  }

  .link {
    font-size: 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);

    &:hover,
    &:focus {
      color: #fff;
    }
  }

  .service {
    margin-top: 3px;
    font-size: 30px;
    color: #fff;
    line-height: 40px;
  }

  h5 {
    color: #fff;
    font-size: 14px;
    line-height: 24px;
  }

  .download-img {
    margin-top: 12px;
    width: 80px;
    height: 80px;
    img {
      object-fit: cover;
    }
  }

  .friend-link {
    .link + .link:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      vertical-align: -1px;
      margin-left: 5px;
      margin-right: 6px;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
