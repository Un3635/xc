<template>
  <div class="page-qa-item" v-if="data" v-title="'每日答题挑战'">
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
              eviveCard: useFHK
            },
            true
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
                path: "qasuccess",
                query: { v: res.totalWl, inviterId: this.$route.query.inviterId }
              });

              ///答完了
            }
          });
      },
      fail(isTimeout) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.$refs.line.stop();
        }, 10);
        var mint_msgbox_wrapper = document.getElementsByClassName(
          "mint-msgbox-wrapper"
        );
        if (mint_msgbox_wrapper.length > 0) {
          mint_msgbox_wrapper[0].remove();
        }
        ///这里要对超时答题情况做处理
        if (isTimeout) {
          this.$http
            .post(
              "/answer/isAnswer",
              {
                questionsId: this.data.topic.questions.questionsId,
                answerId: 0
              },
              true
            )
            .then(res => {
              this.reviveCardCount = res.reviveCardCount;
              
              this.data.topic.answers.forEach(i => {
                if (i.answerId == res.answerId) {
                  i.suc = true;
                }
              });
              if (
                this.reviveCardCount == 0 ||
                this.data.topic.questionIndex == 10
              ) {
                this.submitAnswer("0", 0);
              } else {
                setTimeout(() => {
                  if(this.$route.path != "/qaitem"){return}
                  MessageBox({
                    cancelButtonText: "放弃挑战",
                    cancelButtonClass: "exitbtn",
                    confirmButtonText: "复活",
                    confirmButtonClass: "fuhuobtn",
                    closeOnClickModal: false,
                    message: ` <div class="title">挑战失败</div> <div class="fuhuotitle">使用复活卡后可以继续答题</div><div class="fuhuo"><img src="${guhuoka_img}" alt=""/>${
                      this.reviveCardCount
                    }</div>`,
                    showConfirmButton: true
                  })
                    .then(res => {
                      if (res == "cancel") {
                        this.submitAnswer("0", 0);
                      } else {
                        this.reviveCardCount--;
                        this.submitAnswer("0", 1);
                      }
                    })
                    .catch(err => {});
                  setTimeout(() => {
                    document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
                      "qa-messagebox";
                    setTimeout(() => {
                      document.getElementsByClassName(
                        "mint-msgbox-wrapper"
                      )[0].style.opacity =
                        "1";
                    }, 200);
                  }, 100);
                }, 1000);
              }
            });
        } else {
          if (this.reviveCardCount == 0 || this.data.topic.questionIndex == 10) {
            this.submitAnswer("0", 0);
          } else {
            if(this.$route.path != "/qaitem"){return}
            MessageBox({
              cancelButtonText: "放弃挑战",
              cancelButtonClass: "exitbtn",
              confirmButtonText: "复活",
              confirmButtonClass: "fuhuobtn",
              closeOnClickModal: false,
              message: ` <div class="title">挑战失败</div> <div class="fuhuotitle">使用复活卡后可以继续答题</div><div class="fuhuo"><img src="${guhuoka_img}" alt=""/>${
                this.reviveCardCount
              }</div>`,
              showConfirmButton: true
            })
              .then(res => {
                if (res == "cancel") {
                  this.submitAnswer("0", 0);
                } else {
                  this.reviveCardCount--;
                  this.submitAnswer("0", 1);
                }
              })
              .catch(err => {});
            setTimeout(() => {
              document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
                "qa-messagebox";
              setTimeout(() => {
                document.getElementsByClassName(
                  "mint-msgbox-wrapper"
                )[0].style.opacity =
                  "1";
              }, 200);
            }, 100);
          }
        }
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
            this.fail(true);
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
            true
          )
          .then(res => {
            if (res.rightOrWrong) {
              i.suc = true;
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
              this.reviveCardCount = res.reviveCardCount;
              setTimeout(() => {
                this.fail();
              }, 1000);
            }
          });
      },
      circle() {}
    },
    mounted() {
      this.$http.post("/answer/getTopic", {}, true).then(res => {
        res.topic.answers = res.topic.answers.map(i => {
          i.suc = false;
          i.err = false;
          return i;
        });
        this.isshortsceen =
          window.screen.height <
          document.documentElement.clientWidth / 375 * 20 * 20;
        this.reviveCardCount = res.reviveCardCount;
        this.data = res;
        this.startTimer();
      });
    },
    data() {
      return {
        data: null,
        timer: null,
        time: 10,
        reviveCardCount: 0,
        hasAnawser: false,
        totalWl: "",
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
      MessageBox.close(false)
      next();
    }
  };
</script>
