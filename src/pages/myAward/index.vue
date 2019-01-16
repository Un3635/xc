<template>
  <div id="myAward" class="myAward" v-title="'我的奖励'">
    <div class="myAward-s1">
      <div class="myAward-s1-item">
        <div class="myAward-s1-item-v">{{data.inviteCount}}</div>
        <div class="myAward-s1-item-k">成功邀请好友</div>
      </div>
      <div class="myAward-s1-item">
        <div class="myAward-s1-item-v">{{data.sumWl}}</div>
        <div class="myAward-s1-item-k">累计获得挖力</div>
      </div>
    </div>
    <div class="myAward-border"></div>
    <div class="myAward-s2">
      <div class="myAward-s2-title">已获得收益</div>
      <div class="myAward-s2-list">
        <div class="myAward-s2-item">
          <div class="myAward-s2-item-k">BTC</div>
          <div class="myAward-s2-item-V">{{data.btcRewardCount}}</div>
        </div>
        <div class="myAward-s2-item">
          <div class="myAward-s2-item-k">ETH</div>
          <div class="myAward-s2-item-V">{{data.ethRewardCount}}</div>
        </div>
        <div class="myAward-s2-item">
          <div class="myAward-s2-item-k">算力</div>
          <div class="myAward-s2-item-V">{{data.hcRewardCount}}</div>
        </div>
      </div>
      <a class="myAward-s2-btn" @click="go_slf">前往提现</a>
    </div>
    <div class="myAward-border"></div>
    <div class="myAward-s3">
      <div class="myAward-s3-title">我的邀请</div>
      <div class="myAward-s3-list">
        <div class="myAward-s3-item" v-for="i in list">
          <div class="myAward-s3-item-left">
            <img :src="i.head" alt="">
            <div class="myAward-s3-item-user">
              <div class="myAward-s3-item-user-name">{{i.nickName}}</div>
              <div class="myAward-s3-item-user-time">{{i.regDate}}</div>
            </div>
          </div>

          <div class="myAward-s3-item-award">
            <div class="myAward-s3-item-award-des" v-if="i.btcDesc" :class="{hasmargin:i.getWl!='0'}">{{i.btcDesc}}</div>
            <div class="myAward-s3-item-award-des" v-if="i.ethDesc" :class="{hasmargin:i.getWl!='0'}">{{i.ethDesc}}</div>
            <div class="myAward-s3-item-award-des" v-if="i.hcDesc" :class="{hasmargin:i.getWl!='0'}">{{i.hcDesc}}</div>
            <div class="myAward-s3-item-award-num" v-if="i.getWl!='0'">+{{i.getWl}}挖力</div>
          </div>
        </div>

       
      </div>
      <a class="myAward-s3-more" v-if="pageNum<totalPage" @click="loadmore">查看更多</a>
      <a class="myAward-s3-more empty" v-if="pageNum>=totalPage">暂时还没有邀请好友</a>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import config from "../../common/config.js";
  export default {
    data() {
      return { data: {}, list: [], pageNum: 0, pageSize: 10, totalPage: 0 };
    },
    methods: {
      go_slf() {
        var token = localStorage.token;
        token = token.slice(token.indexOf("_") + 1);
        if (config.dev) {
          window.location.href =
            "http://47.97.166.210:3003/i?channel=1&token=" + token;
        } else {
          window.location.href = "https://m.hc.top/i?channel=1&token=" + token;
        }
      },
      loadmore() {
        this.$http
          .post(
            "/invite2/myInviteList.wl",
            { pageNum: ++this.pageNum, pageSize: this.pageSize },
            true
          )
          .then(data => {
            this.list = [...this.list, ...data.data];
            this.totalPage = data.totalPage;
          });
      }
    },
    mounted() {
      this.$http.post("/invite2/myReward.wl", {}, true).then(data => {
        this.data = data;
      });
      this.$http
        .post(
          "/invite2/myInviteList.wl",
          { pageNum: this.pageNum, pageSize: this.pageSize },
          true
        )
        .then(data => {
          this.list = data.data;
          this.totalPage = data.totalPage;
        });
    }
  };
</script>
