<template>
  <div class="c-rec-author">
    <div class="c-rec-author-banner clearfix">
      <img src="../assets/images/emptyhomebox.png" alt="">
      <p>向您推荐这些热门作者，量身<br>定制专属精彩内容~</p>
    </div>
    <div class="c-rec-author-title">
      热门作者
      <div class="c-rec-author-change" @click="change">换一批 <img src="../assets/images/Groupx.png" alt=""></div>
    </div>
    <div class="c-rec-author-list clearfix">
      <div class="c-rec-author-item" v-for="(i,idx) in list" :key="idx" @click="goauthorurl(i)"  @mouseleave="mouseoutding()">

        <img :src="i.head" alt="" class="c-rec-author-head">
        <img src="../assets/images/qymt.png" title="媒体认证" class="c-rec-author-headIdentity" v-if="i.identity==3">
        <img src="../assets/images/tyzz.png" title="特约作者" class="c-rec-author-headIdentity" v-if="i.identity==2">
        <div class="c-rec-author-content">
          <div class="c-rec-author-content-name">{{i.nickName}}</div>
          <div class="c-rec-author-content-des">{{i.introduce||''}}</div>
          <div class="c-rec-author-content-info">
            <img src="../assets/images/AK-MN.png" alt=""> {{i.followNum}}人订阅
          </div>
          <div class="c-rec-author-content-btns" :class="{notfollow:i.follow==0,follow:i.follow==1}">
            <div class="btn0" v-if="i.follow==0" @click.stop="follow(i)"> 
              <img src="../assets/images/jiajia.png" alt=""> 订阅
            </div>
            <div :class="mouseding?'btn1':'but'" v-if="i.follow==1" @click.stop>
              <img src="../assets/images/gougou.png" alt=""> 已订阅
            </div>
            <div :class="mouseding?'btn-1':''" v-if="i.follow==1" @click.stop="follow(i)">取消订阅</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getRecommendList, getRecommendList1 } from "../service/main-api.js";
  import { oprFollow } from "../pages/mine/js/mineapi.js";
  import loginmodalevent from "../service/loginmodalevent.js";
  export default {
    data() {
      return {
        list: [],
        mouseding: true
      };
    },
    mounted() {
      if (this.$store.state.userinfo) {
        getRecommendList().then(res => {
          this.list = res;
        });
      } else {
        getRecommendList1().then(res => {
          this.list = res;
        });
      }
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
      goauthorurl(i) {
        this.$router.push("/author/" + i.clientType + "/" + i.userId);
      },
      change() {
        this.list = [];
        if (this.$store.state.userinfo) {
          getRecommendList().then(res => {
            this.list = res;
          });
        } else {
          getRecommendList1().then(res => {
            this.list = res;
          });
        }
      },
      follow(i) {
        if (!this.$store.state.userinfo) {
          return loginmodalevent.$emit("login");
        }

        oprFollow({ authorType: i.clientType, authorUserId: i.userId })
        .then(
          res => {
            if (i.follow == 0) {
              i.follow = 1;
              i.followNum++;
              this.mouseding = false;
              this.$message({
                message: '订阅成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
            } else if (i.follow == 1) {
              i.follow = 0;
              i.followNum--;
              this.$message({
                message: '取消订阅成功',
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
    }
  };
</script>

<style lang="scss">
  .c-rec-author {
    width: 758px;
    margin: 0 auto;
    &-banner {
      font-size: 0;
      width: 355px;
      margin: 35px auto 57px auto;
      img {
        width: 150px;
        float: left;
      }
      p {
        font-size: 15px;
        color: #666666;
        line-height: 21px;
        overflow: hidden;
        padding-top: 35px;
        float: left;
      }
    }
    &-title {
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      font-weight: 500;
    }
    &-change {
      float: right;
      font-size: 14px;
      color: #888888;
      line-height: 20px;
      cursor: pointer;
      img {
        cursor: pointer;
        width: 19px;
      }
    }
    &-list {
      padding: 30px 10px;
    }
    &-item {
      position: relative;
      cursor: pointer;
      width: 240px;
      height: 260px;

      float: left;
      margin-right: 9px;
      margin-bottom: 30px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &:hover {
        .c-rec-author-content {
          background: #ffffff;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.17);
          border-radius: 4px;
        }
      }
    }
    &-content {
      height: 220px;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      margin-top: 40px;
      padding: 57px 18px 0 18px;

      &-name {
        text-align: center;
        font-size: 20px;
        color: #222222;
        font-weight: bolder;
        line-height: 30px;
        margin-bottom: 16px;
        -webkit-transition: color 0.5s;
        transition: color 0.5s;
        cursor: pointer;
        &:hover {
          color: #4d87ea;
        }
      }
      &-des {
        font-size: 14px;
        color: #888888;
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
        max-height: 44px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &-info {
        position: absolute;
        bottom: 18px;
        left: 18px;
        right: 18px;

        font-size: 12px;
        color: #888888;
        img {
          width: 13px;
          margin-right: 4px;
        }
      }

      &-btns {
        position: absolute;
        right: 18px;
        bottom: 16px;
        cursor: pointer;
        width: 108px;
        opacity: 0;
        -webkit-transition: opacity 0.5s;
        transition: opacity 0.5s;
        & > div {
          display: none;
          line-height: 36px;
          text-align: center;
          font-size: 16px;
          border-radius: 44px;
          margin-left: auto;
        }
        .btn0 {
          background: rgba(77, 135, 234, 0.99);
          color: white;
          width: 92px;
          &:hover {
            background: #366df0;
          }
          img {
            width: 14px;
            vertical-align: -1px;
          }
        }
        .btn1,.but {
          background: #f5f5f5;
          color: #4d87ea;
          width: 108px;
          display: block;
          img {
            width: 13px;
            vertical-align: -1px;
          }
        }
        .btn-1 {
          background: #f5f5f5;
          color: #dd524d;
          width: 108px;
        }
        &.notfollow {
          opacity: 1;
          .btn0 {
            display: block;
          }
        }
        &.follow {
          opacity: 1;
          .btn1 {
            display: block;
          }
          &:hover {
            .btn-1 {
              display: block;
            }
            .btn1 {
              display: none;
            }
          }
        }
      }

      button {
        position: absolute;
        right: 18px;
        bottom: 16px;
        width: 92px;
        line-height: 30px;
        text-align: center;
        background: rgba(77, 135, 234, 0.99);
        border-radius: 18px;
        font-size: 16px;
        color: #ffffff;
        border: none;
        cursor: pointer;
        background-repeat: no-repeat;
        background-image: url("../assets/images/jiajia.png");
        background-size: 14px auto;
        background-position: 14px center;
        padding-left: 18px;
        &.cancel {
          color: #f95453;
          background: #f5f5f5;
          width: 99px;
          padding: 0;
        }
        &.has {
          width: 99px;
          background: #f5f5f5;
          background-image: url("../assets/images/gougou.png");
          color: #4d87ea;
          background-repeat: no-repeat;
          background-size: 14px auto;
          background-position: 15px 13px;
          padding-left: 22px;
        }
      }
    }
    &-head {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      left: 50%;
      top: 0;
      margin-left: -40px;
    }
    &-headIdentity {
      width: 19px;
      height: 19px;
      position: absolute;
      left: 139px;
      top: 58px;
    }
  }
</style>
