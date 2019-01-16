<template>
  <div id="mylevel" v-if="data" v-title="'我的等级'">
    <div class="up" :style="upstyle">
      <img :src="'./static/mylevel/lv'+data.lv+'.png'" alt="">
      <h2>{{data.currentLevel.name}}</h2>
      <div class="percent">
        <div class="percentup">
          <div class="percentupvalue" :style="percentstyle">
          </div>
        </div>
        <div class="percentdown">
          <span>挖力值:{{data.currentLevel.wl}}</span>
          <span v-if="data.currentLevel.wl>=data.currentLevel.maxWl">已经升级到满级了</span>
          <span v-else>升级还需{{data.currentLevel.nextLevel}}挖力值</span>
        </div>
      </div>
    </div>

    <div class="down">
      <div class="downtitle">等级介绍</div>
      <div class="downlist">
        <div class="downth">
          <div class="downthitem">等级头衔</div>
          <div class="downthitem">等级勋章</div>
          <div class="downthitem wordright">所需挖力</div>
        </div>
        <div class="downtd" v-for="(i,idx) in data.list" :key="idx">
          <div class="downthitem">{{i.name}}</div>
          <div class="downthitem"><img :src="'./static/mylevel/lv'+i.id+'.png'" alt=""></div>
          <div class="downthitem wordright">{{i.wlStart}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  export default {
    data() {
      return { data: null };
    },
    mounted() {
      this.$http.post("/integral/wlLevel.wl", {}, true).then(data => {
        data.lv =
          ["挖链小白", "挖链达人", "挖链精英", "挖链大牛", "挖链领袖"].indexOf(
            data.currentLevel.name
          ) + 1;

        this.percentstyle = {
          width: data.currentLevel.percentage * 100 + "%"
        };

        function getUpBgColor(lv) {
          switch (lv) {
            case 1:
              return "#475263";
              break;
            case 2:
              return "#705a39";
              break;
            case 3:
              return "#5e4c40";
              break;
            case 4:
              return "#387c7e";
              break;
            case 5:
              return "#53411d";
              break;
            default:
              break;
          }
        }

        this.upstyle = {
          backgroundColor: getUpBgColor(data.lv)
        };
        this.data = data;
        var wlz = "";
        if (this.data.currentLevel.wl >= 0 && this.data.currentLevel.wl <= 100) {
          wlz = "0-100";
        } else if (
          this.data.currentLevel.wl >= 101 &&
          this.data.currentLevel.wl <= 300
        ) {
          wlz = "101-300";
        } else if (
          this.data.currentLevel.wl >= 301 &&
          this.data.currentLevel.wl <= 600
        ) {
          wlz = "301-600";
        } else if (
          this.data.currentLevel.wl >= 601 &&
          this.data.currentLevel.wl <= 900
        ) {
          wlz = "601-900";
        } else if (
          this.data.currentLevel.wl >= 901 &&
          this.data.currentLevel.wl <= 1500
        ) {
          wlz = "901-1500";
        } else if (
          this.data.currentLevel.wl >= 1501 &&
          this.data.currentLevel.wl <= 2500
        ) {
          wlz = "1501-2500";
        } else if (
          this.data.currentLevel.wl >= 2501 &&
          this.data.currentLevel.wl <= 4000
        ) {
          wlz = "2501-4000";
        } else if (
          this.data.currentLevel.wl >= 4001 &&
          this.data.currentLevel.wl <= 5000
        ) {
          wlz = "4001-5000";
        } else if (
          this.data.currentLevel.wl >= 5000 &&
          this.data.currentLevel.wl <= 15000
        ) {
          wlz = "5001-15000";
        }

        // this.$app.call("passBy", {
        //   eventId: "个人中心-等级标签",
        //   eventLabel: "",
        //   eventInfo: [
        //     {
        //       key: "挖力值",
        //       value: wlz
        //     }
        //   ]
        // });
      });
    }
  };
</script>
