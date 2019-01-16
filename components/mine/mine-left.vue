<template>
  <div class="mine-left">
    <div class="author">
      <div class="imgs">
        <img :src="$store.state.userinfo.head" alt="" class="nameimg">
        <img src="../../assets/images/qymt.png" title="媒体认证" class="headIdentity" v-if="$store.state.userinfo.identity==3 && $route.name!='mine'">
        <img src="../../assets/images/tyzz.png" title="特约作者" class="headIdentity" v-if="$store.state.userinfo.identity==2 && $route.name!='mine'">
        <div class="imgshow" v-if="$route.name=='mine'" @click="show_edithead=true">
          <img src="../../assets/images/142/camera@2x.png" alt="">
          <p>修改头像</p>
        </div>
      </div>
      <p>{{$store.state.userinfo.nickName}}</p>
    </div>
    <div class="nav">
      <nuxt-link to="/mine/publish" :class="{active:$route.name=='mine-publish'}">
        <span>发布平台</span>
      </nuxt-link>
      <nuxt-link to="/mine/subscription" :class="{active:$route.name=='mine-subscription'}">
        <span>我的订阅</span>
      </nuxt-link>
      <nuxt-link to="/mine/collection" :class="{active:$route.name=='mine-collection'}">
        <span>我的收藏</span>
      </nuxt-link>
      <nuxt-link to="/mine/mynews" :class="{active:$route.name=='mine-mynews'}">
        <span>我的消息</span>
        <span class="dian" v-if="$store.state.newmessage"></span>
      </nuxt-link>
      <nuxt-link to="/mine" :class="{active:$route.name=='mine'}">
        <span>资料设置</span>
      </nuxt-link>
    </div>
    <div class="minedialog" v-if="$store.state.userinfo">
      <edit-head :show.sync="show_edithead"></edit-head>
    </div>
  </div>
</template>
<style lang="scss">
  .mine-left {
    width: 160px;
    height: 490px;
    background-color: white;
    float: left;
    >.author {
      padding-top: 20px;
      padding-bottom: 27px;
      text-align: center;
      cursor: pointer;
      .imgs {
        position: relative;
        height: 70px;
        margin-bottom: 9px;
        .nameimg {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
        .headIdentity {
          width: 16px;
          height: 16px;
          position: absolute;
          left: 96px;
          top: 52px;
        }
        .imgshow {
          position: absolute;
          width: 70px;
          height: 70px;
          left: 45px;
          top: 0;
          background-color: rgba(0, 0, 0, 0.43);
          border-radius: 50%;
          margin-bottom: 9px;
          img {
            width: 22px;
            height: 16px;
            margin-top: 16px;
            display: inline-block;
          }
          p {
            font-size: 12px;
            color: #FFFFFF;
          }
        }
      }
      p {
        font-size: 14px;
        line-height: 30px;
        color: #222222;
        font-weight: 700;
      }
    }
    >.nav {
      text-align: center;
      a {
        display: block;
        line-height: 50px;
        position: relative;
        &.active,
        &:hover {
          background: rgba(85, 129, 233, 0.10);
          font-weight: 700;
        }
        span {
          font-size: 14px;
          color: #333;
        }
        .dian {
          position: absolute;
          left: 108px;
          top: 12px;
          background: #EF3B3B;
          height: 6px;
          width: 6px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
<script>
  import EditHead from "../../components/dialog/edit-head.vue";
  export default {
    components: {
      EditHead,
    },
    data() {
      return {
        show_edithead: false,
        data: this.$store.state.userinfo
      };
    },
    methods: {
      childByValue: function(childValue) {
        this.$message({
          message: childValue,
          customClass: "successful-prompt-message",
          iconClass: "successful-prompt-message-img",
          duration: 1000,
          showClose: true
        });
      }
    }
  }
</script>
