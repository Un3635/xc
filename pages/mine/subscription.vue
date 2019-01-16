<template>
  <div id="mine_subscription" v-if="$store.state.userinfo">
    <div class="page clearfix">
      <mineLeft></mineLeft>
      <div class="right">
        <div class="subscription_list" v-if="list.length>0">
          <div class="subscription_list_item" v-for="(i,idx) in list" :key="idx"  @mouseleave="mouseoutding()">
            <a :href="'/author/'+i.clientType+'/'+i.userId" target="_blank">
              <img :src="i.head" alt="" class="head">
              <img src="../../assets/images/qymt.png" title="媒体认证" class="headIdentity" v-if="i.identity==3">
              <img src="../../assets/images/tyzz.png" title="特约作者" class="headIdentity" v-if="i.identity==2">
              <span class="author">{{i.nickName}}</span>
            </a>
            <div class="pwarpper">
              <p>{{i.introduce}}</p>
            </div>

            <div class="subscription_list_item-btns" :class="{notfollow:i.follow==0,follow:i.follow==1}">
              <div class="btn0" v-if="i.follow==0" @click.stop="follow(i)">
                <img src="../../assets/images/jiajia.png" alt=""> 订阅
              </div>
              <div :class="mouseding?'btn1':'but'" v-if="i.follow==1">
                <img src="../../assets/images/gougou.png" alt=""> 已订阅
              </div>
              <div :class="mouseding?'btn-1':''" v-if="i.follow==1" @click.stop="follow(i)">取消订阅</div>
            </div>
          </div>
        </div>
        <recommend-author v-if="list.length==0"></recommend-author>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
@import "subscription.scss";
</style>

<script>
import { getFollowList, oprFollow } from "./js/mineapi";
import mineLeft from "../../components/mine/mine-left.vue";
import recommendAuthor from "../../components/recommend-author.vue";
import getuserevent from "../../service/getuserevent.js";
import loginmodalevent from "../../service/loginmodalevent.js";
export default {
  components: { recommendAuthor, mineLeft },
  data() {
    return {
      list: [],
      mouseding: true
    };
  },
  methods: {
                message({
        message,
        title,
        onClose = () => {},
        duration = 2000,
        type = "success"
      }) {
        this.$notify({
          title,
          message,
          type,
          customClass: "messagev142",
          duration,
          onClose
        });
      },
    mouseoutding() {
      this.mouseding = true;
    },
    follow(i) {
      oprFollow({ authorType: i.clientType, authorUserId: i.userId })
      .then(
        res => {
          if (i.follow) {
            i.follow = 0;
            this.$message({
              message: '取消订阅成功',
              customClass: "successful-prompt-message",
              iconClass: "successful-prompt-message-img",
              duration: 1000,
              showClose: true
            });
          } else {
            i.follow = 1;
            this.mouseding = false;
            this.$message({
              message: '订阅成功',
              customClass: "successful-prompt-message",
              iconClass: "successful-prompt-message-img",
              duration: 1000,
              showClose: true
            });
          }
        }
      ) .catch(err=>{
            this.message({
              title:err.msg,
              type:'warning'
            })
          })
    }
  },

  mounted() {
    if (this.isClient) {
      let data = this.$store.state.userinfo ? 1 : 0;
      if (data == 0) {
        this.$router.replace({ path: "/" });
        setTimeout(() => {
          loginmodalevent.$emit("login");
        }, 2000);
      } else {
        getFollowList().then(res => {
          this.list = res.list;
        });
      }
    } else {
      getuserevent.$once("getuser", data => {
        if (data == 0) {
          this.$router.replace({ path: "/" });
          setTimeout(() => {
            loginmodalevent.$emit("login");
          }, 2000);
        } else {
          getFollowList().then(res => {
            this.list = res.list;
          });
        }
      });
    }
  },
  asyncData({ isClient }) {
    return { isClient };
  }
};
</script>

