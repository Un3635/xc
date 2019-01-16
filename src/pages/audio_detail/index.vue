<template>
  <div class="audio_detail">
    <div ref="blurbg" class="blurbg"></div>
    <div class="audiotitle" v-if="data" v-title="vtitle">
      <img src="../../assets/guanyu_logo@3x.png" alt="">
      <span class="left">挖链</span>
      <span class="right">{{data.pubTime|fromNow}}·{{data.author}}</span>
    </div>
    <div class="mp3">
      <div class="mp3player" ref="mp3player">
        <img src="../../assets/common_pause_black@3x.png" alt="" v-show="inplay" @click="play()">
        <img src="../../assets/common_play_black_big@3x.png" alt="" v-show="!inplay" @click="play()">
      </div>
      <div class="mp3title">{{vtitle}}</div>
      <div class="mp3state" ref="mp3state" v-if="data" @click="changetime($event)">
        <img src="../../assets/radio_oval.png" alt="" class="radioimg" @touchmove="touchmove($event)" ref="radioimg" :style="radioimgstyle">
        <div class="activestate" ref="activestate"></div>
        <span class="left">{{nowstime|secondToDate}}</span>
        <span class="right">{{alltime|secondToDate}}</span>
      </div>
    </div>
    <!-- <div class="audiocontent" v-if="data">{{data.content}}</div> -->
    <appdownload></appdownload>
  </div>
</template>
<script>
  import appdownload from "../../components/appdownload";
  import wx_share_config from "../../common/wx_share";
  function HTMLDecode(html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace('"content-bottom"', 'class="f1"')
      .replace('"content-source-info"', 'class="f3"')
      .replace('"ad akp-adv"', 'class="f2"')
      .replace(/href/g, "");
  }
  export default {
    components: { appdownload },
    data() {
      return {
        data: null,
        vtitle: null,
        inplay: false,
        audio: null,
        timer: null,
        nowstime: 0,
        alltime: 0,
        leftmax: 0,
        padall:0,
        pecentall:0,
        radioimgstyle: {
          left: 0
        }
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      touchmove(e) {
        var pecent =
          (e.touches[0].clientX - this.padall) / this.pecentall * 100 + "%";


        this.radioimgstyle = {
          left: pecent
        };

        this.audio.currentTime =
           (e.touches[0].clientX - this.padall) / this.pecentall * this.alltime;

        this.$refs.activestate.style.width = pecent;
      },
      play() {
        this.inplay = !this.inplay;
        if (this.inplay) {
          this.audio.play();
          if (!this.timer) {
            setInterval(() => {
              this.nowstime = this.audio.currentTime;
              this.$refs.activestate.style.width =
                this.nowstime / this.alltime * 100 + "%";
              this.radioimgstyle = {
                left: this.nowstime / this.alltime *this.leftmax+'px'
              };
              if (this.nowstime >= this.alltime * 1) {
                this.inplay = false;
              }
            }, 1000 / 16);
          }
        } else {
          this.audio.pause();
        }
      },
      changetime(e) {
        this.audio.currentTime =
          (e.clientX-this.padall) / this.pecentall * this.alltime;
        this.$refs.activestate.style.width =
        (e.clientX-this.padall) / this.pecentall  * 100 + "%";
        this.radioimgstyle = {
          left:  (e.clientX-this.padall) / this.pecentall  * 100 + "%"
        };
      },
      init() {
        this.$http
          .post(
            "/audio/detail.open?",
            {
              audioId: this.$route.query.id
            },
            false
          )
          .then(data => {
            data = data.article;
            data.content = HTMLDecode(data.content);

            this.vtitle = data.title;
            this.data = data;
            this.alltime = data.duration;

            this.$nextTick(() => {
              this.$refs.blurbg.style.backgroundImage =
                "url(" + data.playPictureUrl + ")";
              this.$refs.mp3player.style.backgroundImage =
                "url(" + data.playPictureUrl + ")";
                this.padall=(document.body.clientWidth- window
                  .getComputedStyle(
                    document.getElementsByClassName("mp3state")[0]
                  )
                  .width.split("px")[0] *
                  1)/2;

                  this.pecentall=  window
                  .getComputedStyle(
                    document.getElementsByClassName("mp3state")[0]
                  )
                  .width.split("px")[0] *
                  1;
              this.leftmax =
                window
                  .getComputedStyle(
                    document.getElementsByClassName("mp3state")[0]
                  )
                  .width.split("px")[0] *
                  1 -
                window
                  .getComputedStyle(
                    document.getElementsByClassName("radioimg")[0]
                  )
                  .width.split("px")[0] *
                  1;
            });

            this.audio = document.createElement("AUDIO");
            this.audio.src = data.audioUrl;

            wx_share_config({
              imgUrl: this.data.playPictureUrl,
              title: this.data.title,
              desc: this.data.content,
              link: window.location.href
            });
          })
          .catch(err => {
            this.data = null;
          });
      }
    }
  };
</script>
<style lang="scss">
  @import "index.scss";
</style>