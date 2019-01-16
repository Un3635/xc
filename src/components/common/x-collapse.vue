<template>
  <div>
    <!-- <transition-group tag="ul" name="down" class="list-wrap"> -->
    <ul class="list-wrap">
      <li class="item-content" v-for="(item, index) in data" :key="index" :class="{active: index === idx }" :style="{height: index === idx ? liHeight + 'px' : '48px'}">
        <div :ref="'content'+index">
          <div class="item-inner" @click="itemClick(index)">
            <div class="item-title">{{item.questionName}}</div>
            <span class="icon icon-down iconCus" :class="{active: index === idx }"></span>
          </div>
          <div class="_content">
            <!-- :class="{active: index === idx}" -->
            {{item.questionValue}}
          </div>
        </div>
      </li>
    </ul>
    <!-- </transition-group> -->
  </div>
  <!-- <p class="nav-title noKnow">我不知道</p> -->
</template>
<script>
export default {
  name: "collapse",
  data() {
    return {
      idx: -1,
      liHeight: 0
    };
  },
  props: {
    data: {
      default: []
    }
  },
  methods: {
    itemClick(index) {
      if (this.idx === index) {
        this.idx = -1;
        return;
      }
      this.idx = index;
      this.$nextTick(() => {
        let dom = this.$refs["content" + index][0];
        let _h = dom.offsetHeight || dom.clientHeight;
        this.liHeight = _h + 16;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";

.list-wrap {
  font-family: PingFangSC-Regular;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  @include scroll-style;
 
  .item-content {
    position: relative;
    padding: 0px 0.8rem;
    border-bottom: 1px solid #eee;
    height: 48px;
    overflow: hidden;
    transition: height 0.3s ease-out;
    &.active {
      // max-height: 100px;
      transition: height 0.3s ease-in;
      transform-origin: 50% 0;
    }
    .item-inner {
      display: flex;
      padding: 16px 0px;

      & > .item-title {
        flex: 1;
        font-size: 15px;
        color: #3f3739;
        letter-spacing: 0;
        line-height: 16px;
      }
      & > .iconCus {
        color: #dddddd;
        transition: transform 0.3s ease-out;
        font-size: 20px;
        &.active {
          transform: rotate(-180deg);
        }
      }
    }
  }
  ._content {
    position: relative;
    // margin: 15px 0px;
    font-size: 15px;
    color: #9d9799;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 16px;
  }
  // flex: 0 0 100px;
}
</style>

