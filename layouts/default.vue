<template>
  <div id="app">
    <wlHeader></wlHeader>
    <main class="g-body">
      <nuxt/>
      <div class="scroll-top" v-if="isShowScrollTop" @click="backToTop">
        <i class="iconfont icon-top"></i>
        <span>返回顶部</span>
      </div>
    </main>
    <wl-footer></wl-footer>

  </div>
</template>
<script>
  import wlFooter from "../components/wl-footer";
  import wlHeader from "../components/wl-header";
  import { myAccount, logout } from "../pages/mine/js/mineapi";

  import {
    getMarketInfo,
    userRamkings,
    refreshnewsflash
  } from "../service/main-api";
  import getuserevent from "../service/getuserevent.js";
  import livenoticeevent from "../service/livenoticeevent.js";
  export default {
    components: { wlFooter, wlHeader },
    data() {
      return {
        show_applogin: false,
        show_appreg: false,
        show_appfindpwd: false,
        activeIndex: "",
        audio: null,
        isShowScrollTop: false
      };
    },
    methods: {
      getScrollTop() {
        let scrollPos;
        if (window.pageYOffset) {
          scrollPos = window.pageYOffset;
        } else if (document.compatMode && document.compatMode !== "BackCompat") {
          scrollPos = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollPos = document.body.scrollTop;
        }
        return scrollPos;
      },
      backToTop() {
        const speed = 0.1;
        let scrollTop = this.getScrollTop();
        const timer = setInterval(function() {
          scrollTop -= Math.abs(scrollTop * speed);
          if (scrollTop <= 1) {
            scrollTop = 0;
            clearInterval(timer);
          }
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
        }, 20);
      },
      scrollTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      _getUserinfo(cb) {
        myAccount()
          .then(res => {
            this.$store.commit("USERINFO", res);
            if (cb) {
              cb();
            }
          })
          .catch(err => {});
      },
      audionotice() {
        if (!this.audio) {
          this.audio = document.createElement("AUDIO");
          this.audio.src = "/audio/live.mp3";
        }
        this.audio.play();
      },
      desktopnotice(data) {
        var vm=this;
        function notice() {
          var notification = new Notification(data.title + data.identitySign, {
            body: data.content,
            icon: data.head
          });
          notification.onclick = () => {
            notification.close();
           vm.$router.push({
             path:'/live'
           })
          };
          setTimeout(() => {
            notification.close();
          }, 5000);
        }

        if (!("Notification" in window)) {
          return;
        } else if (Notification.permission === "granted") {
          // 检查用户是否同意接受通知
          // If it's okay let's create a notification
          notice();
        } else if (Notification.permission !== "denied") {
          // 否则我们需要向用户获取权限
          Notification.requestPermission(function(permission) {
            // 如果用户同意，就可以向他们发送通知
            if (permission === "granted") {
              notice();
            }
          });
        }
      }
    },
    mounted() {
      if (this.$store.state.userinfo) {
        window.gio('setUserId', this.$store.state.token.split("_")[0]);
        getuserevent.$emit("getuser", 1);
        userRamkings().then(res => {
          this.$store.commit("HAS_MESSAGE", res);
        });
      } else {
        getuserevent.$emit("getuser", 0);
      }

      if (localStorage.getItem("livenotice1") == "true") {
        this.$store.commit("LIVENOTIVE_TOGGLE", { type: 1, value: true });
      }
      if (localStorage.getItem("livenotice2") == "true") {
        this.$store.commit("LIVENOTIVE_TOGGLE", { type: 2, value: true });
      }

      setInterval(() => {
        if (this.$store.state.livenotice1 || this.$store.state.livenotice2) {

          refreshnewsflash().then(data => {
            if (data && data.list && data.list.length > 0) {
              if (this.$route.name == "live") {
                if (this.$store.state.livenotice1) {
                  this.audionotice();
                }
                livenoticeevent.$emit('new',data.list)
              } else {

                if (this.$store.state.livenotice1) {
                  this.audionotice();
                }
                if (this.$store.state.livenotice2) {
                  this.desktopnotice(data.list[0]);
                }
              }
            } else {

            }
          });
        } else {

        }
      }, 30000);

      const vm = this;
      window.onscroll = function() {
        vm.isShowScrollTop = vm.getScrollTop() > 400;
      };
    },
    watch: {
      $route(to) {
        if (this.$store.state.userinfo) {
          getuserevent.$emit("getuser", 1);
          userRamkings().then(res => {
            this.$store.commit("HAS_MESSAGE", res);
          });
        } else {
          getuserevent.$emit("getuser", 0);
        }
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "opensans", "PingFang SC", "Lantinghei SC", "Helvetica Neue",
      Helvetica, Arial, "Microsoft YaHei", "\\5FAE\8F6F\96C5\9ED1",
      "STHeitiSC-Light", "simsun", "\\5B8B\4F53", "WenQuanYi Zen Hei",
      "WenQuanYi Micro Hei", "sans-serif";
    display: flex;
    flex-direction: column;
    min-width: 1180px;
    min-height: 100vh;
  }
  .scroll-top {
    position: fixed;
    bottom: 100px;
    right: 100px;
    width: 60px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 100;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 3px;
    cursor: pointer;
    color: #fff;
    overflow: hidden;
  }

  .scroll-top i {
    font-size: 26px;
  }

  .scroll-top i,
  .scroll-top span {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .scroll-top i {
    line-height: 40px;
    transition: margin-top 0.2s;
  }

  .scroll-top:hover i,
  .scroll-top:focus i {
    margin-top: -60px;
  }

  .scroll-top:hover span,
  .scroll-top:focus span {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .g-body {
    padding-top: 70px;
    min-height: 100%;
    flex-grow: 1;
  }
  @import "../components/dialog/index.scss";
</style>


