<template>
  <div id="xueyuan-online">
    <div class="player" id="youkuplayer" v-loading="!isPlayerLoaded"></div>
    <div class="xueyuan-online-down clearfix">
      <div class="xueyuan-online-down-left">
        <xueyuan-title-box :header="'课程介绍'">
          <div class="edit">
            <div class="edittitle">{{detail.tilte}}</div>
            <div class="edithtml" v-html="detail.description"></div>
          </div>
        </xueyuan-title-box> 
      </div>
      <div class="xueyuan-online-down-right">
        <activity-hot :activityMain="activityMain" />
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import activityHot from "../../../components/xueyuan/activity-hot";
  import xueyuanTitleBox from "../../../components/xueyuan/xueyuan-title-box.vue";
  import { xy_activityMain, xy_activityDetail } from "../../../service/main-api";
  export default {
    components: { activityHot, xueyuanTitleBox },
    data() {
      return { isPlayerLoaded: false };
    },
    methods: {
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
      }
    },
    mounted() {
      this.loadYoukuPlayer().then(res => {
        this.isPlayerLoaded = true;
        // eslint-disable-next-line no-undef,no-new
        new YKU.Player("youkuplayer", {
          styleid: "0",
          client_id: "528fa931b3275f72",
          vid: this.detail.webUrl,
          newPlayer: true,
          autoplay: true
        });
      });
    },
    async asyncData(ctx) {
      var [activityMain, { detail }] = await Promise.all([
        xy_activityMain({ moduleType: 1 }),
        xy_activityDetail({ type: 1, activityId: ctx.route.params.id })
      ]);

      return {
        activityMain,
        detail
      };
    },
    head() {
      return {
        title: this.detail.tilte + "_挖链学院",
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


