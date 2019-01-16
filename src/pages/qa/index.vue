<template>
  <div class="page-qa" v-title="'每日答题挑战'">
    <div class="page-qa-card">
      <!-- <img :src="data.head" alt="" class="page-qa-card-head">
      <h1 class="page-qa-card-title">{{data.nickName}}</h1> -->
      <div class="page-qa-card-info">
        <div class="page-qa-card-info-list">
          <div class="page-qa-card-info-list-item">
            <div class="page-qa-card-info-list-item-key">剩余挑战次数</div>
            <div class="page-qa-card-info-list-item-value">
              {{data.answerCount}}
              <span>次</span>
            </div>
          </div>
          <div class="page-qa-card-info-list-item">
            <div class="page-qa-card-info-list-item-key">今日挑战获得挖力</div>
            <div class="page-qa-card-info-list-item-value">{{data.totalWl}}
            </div>
          </div>
        </div>
        <a class="page-qa-card-info-btn pressbtn" :disabled="data.answerCount<=0" @click="goitem">开始答题</a>
      </div>
    </div>
    <div class="page-qa-card-fuhuo">
      <img src="../../assets/qa/resurrenction_card.png" alt="">复活卡x{{data.bullet == 0?0:data.reviveCardCount}}
      <a class="page-qa-card-fuhuo-share" @click="share">分享获取复活卡</a>
    </div>
    <div class="page-qa-card-xinyun" @click="golucky" v-if="total.rewardAnswerCount">
      <div class="num" v-if="total.userAnswerCount<total.rewardAnswerCount">{{total.answerDesc}}</div>
      <div class="num" v-if="total.userAnswerCount>=total.rewardAnswerCount">已获本周抽奖资格</div>
    </div>
    <div class="page-qa-hint">所有奖品和活动皆与设备制作商Apple lnc.无关</div>
    <div class="page-qa-rule" @click="showRule">活动规则</div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import { MessageBox } from "mint-ui";

  export default {
    methods: {
      showRule() {
        this.$app.call("passBy", {
          eventId: "答题详情页-初始页",
          eventLabel: "规则介绍",
          eventInfo: []
        });

        var mint_msgbox_wrapper = document.getElementsByClassName(
          "mint-msgbox-wrapper"
        );
        if (mint_msgbox_wrapper.length > 0) {
          mint_msgbox_wrapper[0].remove();
        }
        var msg = `<p>1、每名用户每天有3次答题机会<br/>
                      2、每轮答题共10道题目，答错题目即视为挑战失败，如使用复活卡可以立即复活继续答题,最后一题不允许使用复活卡 <br/>
                      3、连续答对3道后可以获得挖力，答对题目越多，获得的挖力越多 <br/>
                      4、邀请1位好友成功注册，可获得1张复活卡及50挖力的邀请奖励，获取复活卡数量不设上限 <br/>
                      5、账户中复活卡剩余数为0时，系统将自动赠送1张，此福利每日仅限1次</p>`;
        MessageBox({
          title: "活动规则",
          message: msg,
          showCancelButton: false,
          confirmButtonText: "我知道了"
        });
        setTimeout(() => {
          document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
            "qa-rule-messagebox";
          setTimeout(() => {
            document.getElementsByClassName(
              "mint-msgbox-wrapper"
            )[0].style.opacity =
              "1";
          }, 200);
        }, 100);
      },
      showFHK() {
        var mint_msgbox_wrapper = document.getElementsByClassName(
          "mint-msgbox-wrapper"
        );
        if (mint_msgbox_wrapper.length > 0) {
          mint_msgbox_wrapper[0].remove();
        }

        MessageBox({
          message: `<div class="fhkcontainer">
                      <div class="title">天降福利</div>
                      <div class="fhknum">复活卡1张</div>
                      <div class="warn">复活卡不足时，系统自动赠送一张，每日仅一次</div>
                    </div>
                    `
        });
        setTimeout(() => {
          document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
            "qa-fhk-messagebox";
          this.data.bullet = 1;
          this.data.reviveCardCount = 1;
          setTimeout(() => {
            document.getElementsByClassName(
              "mint-msgbox-wrapper"
            )[0].style.opacity =
              "1";
          }, 200);
        }, 100);
      },
      share() {
        this.$app.call("shareImage", {
          qrcodelink:
            window.location.origin + "/#/qashare?id=" + this.data.inviterId,
          title: "答题详情页-初始页",
          type: "qa"
        });
      },
      goitem() {
        if (this.data.answerCount <= 0) {
          return;
        }
        this.$app.call("passBy", {
          eventId: "答题详情页-初始页",
          eventLabel: "开始答题",
          eventInfo: []
        });

        this.$router.push({
          path: "qaitem",
          query: { inviterId: this.data.inviterId }
        });
      },
      golucky(){
        this.$router.push({path: 'qalucky',});
      }
    },
    mounted() {
      this.$http.post("/answer/main.wl", {}, true).then(res => {
        this.data = res;
        if (this.data.bullet == 0) {
          this.showFHK();
        }
      });
      this.$http.post("/questionReward/getAnswerCount.wl", {}, true).then(res => {
        this.total = res;
      });
    },
    data() {
      return {
        data: {},
        total: {},
      };
    }
  };
</script>
