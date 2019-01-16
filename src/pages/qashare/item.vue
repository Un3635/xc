<template>
  <div class="page-qa-item" v-if="data" v-title="'测测你的区块链知识'">
    <div class="page-qa-item-progress">
      <div class="page-qa-item-progress-item" v-for="(i,idx) in data.topic.answerRule" :key="idx" :class="{active:(idx+1)<data.topic.questionIndex}">
        <div class="page-qa-item-progress-item-up" :class="{op0:i==0}">
          <img src="../../assets/qa/wali_light.png" alt="" v-if="(idx+1)<data.topic.questionIndex">
          <img src="../../assets/qa/wali_gray.png" alt="" v-else>
          <p>
            <span> +{{i}}</span>
          </p>

        </div>
        <div class="page-qa-item-progress-item-down">
          <img src="../../assets/qa/oval_right.png" alt="" v-if="(idx+2)<=data.topic.questionIndex">
        </div>
      </div>
    </div>
    <div class="page-qa-item-time">
      <div class="page-qa-item-time-value">{{time}}</div>
      <progress-bar type="circle" ref="line" :options="options"></progress-bar>
    </div>

    <div class="page-qa-item-q">{{data.topic.questionIndex}}.{{data.topic.questions.question}}</div>
    <div class="page-qa-item-list" :class="{short:isshortsceen}">
      <a class="page-qa-item-list-item pressbtn" v-for="(i,idx) in data.topic.answers" :key="idx" @click="answer(i)" :class={suc:i.suc,err:i.err}>{{i.answer}}</a>
    </div>
  </div>
</template>
<style lang="scss">
  @import "item.scss";
</style>
<script>
  import { MessageBox } from "mint-ui";
  var guhuoka_img = require("../../assets/qa/resurrenction_card.png");

  export default {
    methods: {
      submitAnswer(answer = "0", useFHK = 0) {
        this.$http
          .post(
            "/answer/submit",
            {
              questionsId: this.data.topic.questions.questionsId,
              answerId: answer,
              eviveCard: useFHK,
              webUserFla: this.data.webUserFla
            },
            false
          )
          .then(res => {
            if (res.stopOrContinue == 1) {
              res.topic.answers = res.topic.answers.map(i => {
                i.suc = false;
                i.err = false;
                return i;
              });
              this.data = res;

              this.hasAnawser = false;
              this.startTimer();
            } else {
              this.$router.replace({
                path: "qasharesuccess",
                query: {
                  v: res.totalWl,
                  id: this.data.webUserFla,
                  ivid: this.$route.query.id,
                  num: this.hasSucNum
                }
              });
              ///答完了
            }
          });
      },
      fail() {
        clearInterval(this.timer);
        setTimeout(() => {
          this.$refs.line.stop();
        }, 10);
        this.submitAnswer("0", 0);
      },
      startTimer() {
        this.time = 10;

        setTimeout(() => {
          this.$refs.line.set(0);
          this.$refs.line.animate(1.0);
        }, 10);
        this.timer = setInterval(() => {
          this.time--;

          if (this.time == 0) {
            this.fail();
          }
        }, 1000);
      },
      answer(i) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.$refs.line.stop();
        }, 10);
        if (this.hasAnawser) {
          return;
        }
        if (this.time == 0) {
          return;
        }
        this.hasAnawser = true;
        this.$http
          .post(
            "/answer/isAnswer",
            {
              questionsId: this.data.topic.questions.questionsId,
              answerId: i.answerId
            },
            false
          )
          .then(res => {
            if (res.rightOrWrong) {
              i.suc = true;
              this.hasSucNum = this.data.topic.questionIndex;
              setTimeout(() => {
                this.submitAnswer(i.answerId, 0);
              }, 1000);
            } else {
              i.err = true;
              this.data.topic.answers.forEach(i => {
                if (i.answerId == res.answerId) {
                  i.suc = true;
                }
              });
              setTimeout(() => {
                this.fail();
              }, 1000);
            }
          });
      }
    },
    mounted() {
      this.$http
        .post("/answer/getTopic", { inviterId: this.$route.query.id }, false)
        .then(res => {
          res.topic.answers = res.topic.answers.map(i => {
            i.suc = false;
            i.err = false;
            return i;
          });

          this.data = res;
          this.startTimer();
        });
    },
    data() {
      return {
        data: null,
        timer: null,
        time: 10,
        hasAnawser: false,
        totalWl: "",
        hasSucNum: 0,
        options: {
          color: "#4D87EA",
          strokeWidth: 8,
          trailColor: "#EEEEEE",
          trailWidth: 8,
          duration: 10000
        },
        isshortsceen:
          window.screen.height <
          document.documentElement.clientWidth / 375 * 20 * 22
      };
    },

    beforeRouteLeave(to, from, next) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.$app.call("passBy", {
        eventId: "答题详情页-答题时",
        eventLabel: "返回按钮",
        eventInfo: []
      });
      next();
    }
  };
</script>
