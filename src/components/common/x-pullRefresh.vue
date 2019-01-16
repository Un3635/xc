<template>
  <div class="pull-wrapper" :ref="id">
    <div class="bscroll-container">
      <div class="top-tip">{{pulldownMsg}}</div>
      <!-- <div class="alert-hook" :style="{display: alertHook}">{{pulldownMsg}}</div> -->
      <slot></slot>
      <!-- <div class="alert-hook" :style="{display: alertHook}">{{hint}}</div> -->
      <div class="bottom-tip" :class="['typeStyle'+ type]">{{pullupMsg}}</div>
    </div>
    <!-- <div class="alert-hook" :style="{display: alertHook}">{{hint}}</div> -->
  </div>
  <!-- <div class="pull-wrapper">
    <slot />
  </div> -->
</template>

<script>
import BScroll from "better-scroll";
var count = 1;
export default {
  name: "pullRefresh",
  data() {
    return {
      pulldownMsg: "下拉刷新",
      pullupMsg: "加载更多",
      pullTag: "",
      posY: 0
    };
  },
  props: {
    id: {
      default: "wrapper"
    },
    type: {
      default: 1
    }
  },
  methods: {
    loadingStart(str) {
      if (this.pullTag === "refresh") this.pulldownMsg = str || "正在刷新";
      if (this.pullTag === "load") this.pullupMsg = str || "正在加载";
    },
    refresh(str) {
      this.pulldownMsg = str || "刷新成功";
      setTimeout(() => {
        this.scroll.scrollTo(0, 0, 1000);
        this.pulldownMsg = "下拉刷新";
      }, 1000);
    },
    load(str) {
      this.pullupMsg = str || "加载成功";
      setTimeout(() => {
        //  this.scroll.scrollTo(0, 0, 1000);
        this.pullupMsg = "加载更多";
      }, 1000);
    },
    refreshScroll(str) {
      if (this.pullTag === "refresh") this.refresh(str);
      if (this.pullTag === "load") this.load(str);

      this.scroll.refresh();
    },
    initScroll() {
      if (!this.$refs[this.id]) {
        return;
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs[this.id], {
            // 初始化better-scroll
            probeType: 1, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
            click: true, //是否派发click事件
            scrollY: true
          });
        } else {
          this.scroll.refresh();
        }

        // 滑动过程中事件
        this.scroll.on("scroll", pos => {
          //  this.alertHook = "block";
          // console.log( this.pullTag, pos);
          if (pos.y > 40) {
            this.pullTag = "refresh";
            this.pulldownMsg = "释放立即刷新";
          } else if (pos.y < -50) {
            this.pullTag = "load";

            this.pullupMsg = "释放立即加载";
          }
        });
        //滑动结束松开事件
        this.scroll.on("touchEnd", pos => {
          //上拉刷新
          if (pos.y > 40) {
            this.$emit("getData", "down");
          } else if (pos.y < this.scroll.maxScrollY - 50) {
            //下拉加载
            // console.log(pos.y,  this.scroll.maxScrollY,  this.pullTag)
            this.posY = this.scroll.maxScrollY;
            // this.scroll.scrollTo(0, pos.y + 'px');
            this.pullupMsg = "加载中";
            this.$emit("getData", "up");
          }
        });
      });
    }
  },
  mounted() {
    const that = this;
    if (this.id === "wrapper") {
      // this.initScroll();
    }
  }
};
</script>
<style lang="scss" scoped>
.pull-wrapper {
  // width: 100%;
  /* height: 300px; */
  // height: calc(100vh - 90px);
  height: 100%;
  overflow: hidden;
  // position: relative;
}

/* 下拉、上拉提示信息 */
.top-tip,
.bottom-tip {
  // position: relative;
  position: absolute;
  font-size: 14px;
}
.top-tip {
  top: -40px;
  // margin-top: -40px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #555;
}

.bottom-tip {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #777;
  left: 0;
}
.typeStyle1 {
  bottom: -35px;
}
.typeStyle2 {
  top: calc(100vh - 45vh);
  // top: 20px;
}
/* 全局提示信息 */
.alert-hook {
  // display: none;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 12px;
  // background: #eee;
  color: 000;
  color: #5b5d5d;
}
</style>