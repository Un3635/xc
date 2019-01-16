<template>
  <div id="inv" v-title="'邀请好友'" v-if="data">
    <div class="invRule" @click="showRule">活动规则</div>
    <div class="invBannerinfo0" v-if="data.toDayInviteCount==0">
      <img src="../../assets/qa/invite_sy_woman@3x.png" alt="">
      <div class="l1">今天你还未有好友</div>
      <div class="l2">加入挖链大陆哦</div>
    </div>
    <div class="invBannerinfo1" v-if="data.toDayInviteCount>0">
      <div class="l1">今天已有</div>
      <div class="l2">
        <span>{{data.toDayInviteCount}}</span>位</div>
      <div class="l3">好友加入挖链大陆</div>
    </div>

    <div class="invtitle">一键邀请好友，每日150挖力等你来拿！</div>
    <div class="invBtn" @click="share">立即邀请</div>

    <div class="invNum">
      <div class="invNumItem">
        <div class="invNumItemTitle">成功邀请</div>
        <div class="invNumItemValue">
          {{data.inviteCount}}
          <span>人</span>
        </div>
      </div>
      <div class="invNumItem">
        <div class="invNumItemTitle">累积获得挖力</div>
        <div class="invNumItemValue">
          {{data.sumValue}}
        </div>
      </div>
    </div>
    <div class="invList">

      <div class="invListItem" v-for="(i,idx) in data.list.list" :key="idx">
        <div class="invListItemLeft">
          <img :src="i.userHead" alt="">
          <div class="invListItemLeftInfo">
            <div class="phone">{{i.account}}</div>
            <div class="time">{{i.regTime|fromNow}}</div>
          </div>
        </div>
        <div class="invListItemRight" :class="{suc:i.wlValue==0}">
          {{i.remark}}
        </div>
      </div>
      <p class="invListMore" v-if="data.list.hasNextPage" @click="loadmore">查看更多</p>
    </div>
    <div class="invFt">- 挖力可以转化WT得丰厚礼品 -</div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import { MessageBox } from "mint-ui";
  export default {
    data() {
      return {
        inapp: this.$app.hockAPP(),
        data: null
      };
    },
    created() {
      this.getData(1, 10);
    },
    methods: {
      loadmore() {
        this.$http
          .post(
            "/invite/inviteList.wl",
            {
              pageNum: 2,
              pageSize: 9999
            },
            true
          )
          .then(data => {
            this.data.list.list = { ...this.data.list.list, ...data.list.list };
            this.data.list.hasNextPage = false;
          });
      },
      getData(pageNum, pageSize) {
        this.$http
          .post(
            "/invite/inviteList.wl",
            {
              pageNum,
              pageSize
            },
            true
          )
          .then(data => {
            this.data = data;
          });
      },
      showRule() {
        // this.$app.call("version", {}, function(version) {
        //   alert(version);
        // });

        // this.$app.call("passBy", {
        //   eventId: "邀请好友详情页",
        //   eventLabel: "活动规则",
        //   eventInfo: []
        // });

        var mint_msgbox_wrapper = document.getElementsByClassName(
          "mint-msgbox-wrapper"
        );

        if (mint_msgbox_wrapper.length > 0) {
          mint_msgbox_wrapper[0].remove();
        }
        var msg = `<p>1.邀请好友注册挖链app，邀请人可获得50挖力奖励<br>
                                                                                                                        2.每名注册用户，每日最多只可获3次邀请奖励<br>
                                                                                                                        3.本活动最终解释权在法律允许的范围内归挖链网所有</p>`;
        MessageBox({
          title: "邀请好友奖励规则",
          message: msg,
          showCancelButton: false,
          confirmButtonText: "我知道了"
        });
        setTimeout(() => {
          document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
            "inv-messagebox";
          setTimeout(() => {
            document.getElementsByClassName(
              "mint-msgbox-wrapper"
            )[0].style.opacity =
              "1";
          }, 200);
        }, 100);
      },
      share() {
        this.$app.call(
          "shareImage",
          {
            qrcodelink: this.data.inviteUrl
          },
          function() {}
        );
      }
    }
  };
</script>
