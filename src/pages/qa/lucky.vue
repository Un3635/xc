<template>
  <div class="page-qa-lucky" v-title="'答题大抽奖'">
    <div class="page-qa-lucky-head">
      <div class="page-qa-lucky-head-huo" @click="gowinners" v-if="data.showLastWeek">

      </div>
      <div class="page-qa-lucky-head-num">
        <div class="page-qa-lucky-head-num-top">{{data.answerDesc}}</div>
        <div class="page-qa-lucky-head-num-bottom">{{data.howManyDesc}}</div>
      </div>
    </div>
    <div class="prize">
      <div class="prize-content">
        <div class="prize-content-top">
          <p class="prize-content-top-title">本周抽奖倒计时</p>
          <div class="prize-content-top-time">
            <count-down :currentTime="Number(data.nowTime)" :startTime="Number(data.nowTime)" :endTime="Number(data.endTime)" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分'" :secondsTxt="'秒'"></count-down>
          </div>
        </div>
        <div class="prize-content-bottom">
          <div class="prize-content-bottom-img">
            <img :src="data.activityIcon" alt="本期奖品">
          </div>
          <div class="prize-content-bottom-right">
            <p class="title">{{data.activityName}}</p>
            <p class="content">{{data.activityDesc}}</p>
          </div>
        </div>
      </div>
      <div class="bookmark">
        本期奖品
      </div>
    </div>
    <div class="notes">*奖品具体细节以实物为准</div>
    <div class="partake">
      <div class="partake-content">
        <div class="partake-content-prompt">
          <div class="news">
            <div class="con num1">每周答题≥20次自动获得当周的抽奖机会</div>
          </div>
          <div class="img"><img src="../../assets/qa/ct1.png" alt=""></div>
        </div>
        <div class="partake-content-prompt">
          <div class="img"><img src="../../assets/qa/ct2.png" alt=""></div>
          <div class="news">
            <div class="con num2">每周一20:00系统抽取幸运用户</div>
          </div>
        </div>
        <div class="partake-content-prompt">
          <div class="news">
            <div class="con num3">
              <p>关注公众号：</p>
              <div class="btn">
                <span>挖链网</span>

                <button class="tag-read" data-clipboard-text="挖链网" @click="copy">点击复制</button>

              </div>
              <p>查看往期获奖名单及进行奖品兑换</p>
            </div>
          </div>
          <div class="img "><img src="../../assets/qa/ct3.png" alt=""></div>
        </div>
        <div class="partake-content-prompt">
          <div class="img"><img src="../../assets/qa/ct4.png" alt=""></div>
          <div class="news">
            <div class="con num4">中奖结果会在应用程序中通知，工作人员也会主动联系中奖用户</div>
          </div>
        </div>
      </div>
      <div class="bookmark">
        如何参与
      </div>
    </div>
    <div class="notes foot">在法律范围内，活动解释权归挖链网所有</div>
  </div>
</template>
<style lang="scss">
  @import "lucky.scss";
</style>
<script>
  import Clipboard from "clipboard";
  import { Toast } from "mint-ui";
  import CountDown from "../../components/vue2-countdown";
  export default {
    data() {
      return {
        data: ""
      };
    },
    methods: {
      copy() {
        var clipboard = new Clipboard(".tag-read");
        clipboard.on("success", e => {
          // console.log('复制成功')

          if (e.text == "挖链网") {
            Toast("复制成功");
          } else {
            Toast(e.text);
          }
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", e => {
          // 不支持复制
          Toast("该浏览器不支持自动复制");
          // console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy();
        });
      },
      gowinners() {
        this.$router.push({ path: "qawinners" });
      },
      //获取本地本周活动时间
      timedata() {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var oneday = 1000 * 60 * 60 * 24;
        this.myDate = new Date();
        this.oneData = new Date(today - oneday * (today.getDay() - 8));
      }
    },
    components: {
      CountDown
    },
    mounted() {
      this.$http
        .post("/questionReward/getThisWeekActivity.wl", {}, true)
        .then(res => {
          this.data = res;
        });
    }
  };
</script>