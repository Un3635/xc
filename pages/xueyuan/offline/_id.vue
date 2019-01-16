<template>
  <div id="xueyuan-offline">
    <div class="xueyuan-offline-up">
      <img :src="detail.topPicture" :alt="detail.title" class="xueyuan-offline-up-img">
      <div class="xueyuan-offline-up-info">
        <h1 class="title">{{detail.title}}</h1>
        <div class="des"><img src="../../../assets/images/xueyuan/time_icon@2x.png" alt="">{{detail.pubTime|date}}</div>
        <div class="des"><img src="../../../assets/images/xueyuan/Location_icon@2x.png" alt="">{{detail.address}}</div>
        <div class="des"><img src="../../../assets/images/xueyuan/renshu_icon@2x.png" alt="">限额{{detail.number}}</div>
        <a :href="detail.url" class="bmbtn" target="_blank" :class="{over:detail.flag}" v-if="!detail.flag">立即报名</a>
        <a href="javascript:;" class="bmbtn" :class="{over:detail.flag}" v-if="detail.flag">活动已结束</a>
      </div>
    </div>

    <div class="xueyuan-offline-down clearfix">
      <div class="xueyuan-offline-down-left">
        <el-tabs @tab-click='tab_click' v-model="tabindex">
          <el-tab-pane label="活动内容" name="first">
            <div class="edit">
              <div class="edittitle">{{detail.tilte}}</div>
              <div class="edithtml" v-html="detail.description"></div>
            </div>
          </el-tab-pane> 
          <el-tab-pane label="精彩回顾" name="second" v-if="detail.flag&&(detail.reviewContent||detail.play_url)">
            <div class="xueyuan-audio" v-if="detail.sourceType==2">
              <img src="../../../assets/images/xueyuan/play_yinping.png" alt="" class="playstate" v-if="!audio.inplay" @click="audioplay">
              <img src="../../../assets/images/xueyuan/stop_yinping.png" alt="" class="playstate" v-if="audio.inplay" @click="audioplay">
              <span class="timenow">{{audio.nowtime}}</span>
              <span class="percent">
                <div class="ctrl" ref="ctrl"></div>
                <span class="percentnow" ref="percentnow"></span>
              </span>
              <span class="timeall ">{{audio.timeall}}</span>
            </div>
            <div class="xueyuan-video" v-if="detail.sourceType==1" id="youkuplayer" v-loading="!isPlayerLoaded"></div>
            <div class="edit">
              <div class="edittitle">{{detail.tilte}}</div>
              <div class="edithtml" v-html="detail.reviewContent"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="xueyuan-offline-down-right">
        <activity-hot :activityMain="activityMain" />
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<style lang="scss">
#xueyuan-offline{
  .el-tabs__nav-scroll{
    color:#fff;
      .el-tabs__active-bar{
          background: #5581E9;
          border-radius: 100px;
          height:4px;
      }
      .el-tabs__item{
        font-family: 'PingFangSC-Regular';
        font-size: 18px;
        color: #676767;
      }
      .el-tabs__item.is-active{
        font-family: 'PingFangSC-Semibold';
      }
  }
}
</style>

<script>
  function s_to_hs(s) {
    s = parseInt(s);
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h = Math.floor(s / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s = s % 60;
    //将变量转换为字符串
    h += "";
    s += "";
    //如果只有一位数，前面增加一个0
    h = h.length == 1 ? "0" + h : h;
    s = s.length == 1 ? "0" + s : s;
    return h + ":" + s;
  }
  import activityHot from "../../../components/xueyuan/activity-hot";
  import xueyuanTitleBox from "../../../components/xueyuan/xueyuan-title-box.vue";
  import { xy_activityMain, xy_activityDetail } from "../../../service/main-api";
  export default {
    data() {
      return {
        audio: {
          inplay: false,
          instance: null,
          timer: null,
          nowtime: "",
          timeall: ""
        },
        tabindex: "first",
        isPlayerLoaded: false
      };
    },
    components: { activityHot, xueyuanTitleBox },

    methods: {
      tab_click(e) {
        if (
          this.tabindex == "second" &&
          !this.isPlayerLoaded &&
          this.detail.sourceType == 1
        ) {
          this.loadYoukuPlayer().then(res => {
            this.isPlayerLoaded = true;
            // eslint-disable-next-line no-undef,no-new
            new YKU.Player("youkuplayer", {
              styleid: "0",
              client_id: "528fa931b3275f72",
              vid: this.detail.play_url,
              newPlayer: true,
              autoplay: true
            });
          });
        } else if (
          this.tabindex == "second" &&
          !this.audio.instance &&
          this.detail.sourceType == 2
        ) {
          this.audiocreate();
        }
      },
      loadYoukuPlayer() {
        const youkuPlayerUrl = "//player.youku.com/jsapi";
        return new Promise((resolve, reject) => {
          const isLoaded =
            document.querySelectorAll(`script[src="${youkuPlayerUrl}"]`).length >
            0;
          if (isLoaded && window.YKU) {
            return resolve(window.YKU);
          }
          let script = document.createElement("script");
          script.src = youkuPlayerUrl;
          document.body.appendChild(script);
          script.onload = () => {
            const timer = setInterval(() => {
              if (window.YKU) {
                clearInterval(timer);
                resolve(window.YKU);
              }
            }, 100);
          };
          script.onerror = () => reject({ msg: "Failed to load youku player" });
        });
      },
      audioplay() {
        this.audio.inplay = !this.audio.inplay;
        if (this.audio.inplay) {
          if (!this.audio.timer) {
            setInterval(() => {
              this.audio.nowtime = s_to_hs(this.audio.instance.currentTime);

              if (!this.audio.timeall) {
                this.audio.timeall = s_to_hs(this.audio.instance.duration);
              }
              this.$refs.percentnow.style.width =
                this.audio.instance.currentTime /
                  this.audio.instance.duration *
                  100 +
                "%";
              this.$refs.ctrl.style.left =
                this.audio.instance.currentTime /
                  this.audio.instance.duration *
                  100 +
                "%";
            }, 1000);
          }
          this.audio.instance.play();
        } else {
          this.audio.instance.pause();
        }
      },
      audiocreate() {
        var ad = document.createElement("AUDIO");
        ad.src = this.detail.play_url;
        this.audio.instance = ad;
      }
    },
    async asyncData(ctx) {
      var [activityMain, { detail }] = await Promise.all([
        xy_activityMain({ moduleType: 2 }),
        xy_activityDetail({ type: 2, activityId: ctx.route.params.id })
      ]);

      return {
        activityMain,
        detail
      };
    },
    head() {
      return {
        title: this.detail.title + "_挖链学院",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链学院,区块链培训,区块链课程,区块链技术,比特币技术,以太坊技术,区块链 应用"
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "挖链学院是挖链网旗下专注于区块链行业技术分享，行业分析的学习平台"
          }
        ]
      };
    }
  };
</script>



