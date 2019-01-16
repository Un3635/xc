<template>
  <div class="tab-wrap">
    <div class="buttons-tab">
      <a :href="'#' + tab.href" v-for="(tab, index) in tabs" :key="index" class="tab-link button" :class="{active: tab.href===tabActiveHref}">
        <span>{{tab.name}}</span>
      </a>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "x-tab",
  props: {
    tabs: {
      default: []
    },
    panelActiveStr: {
      default: ''
    }
  },
  data() {
    return {
      tabActiveHref: '',
      idx: {
        'income': 0,
        'outcome': 1
      }
    };
  },
  watch: {
    $route(to, form) {
      this.tabChange(to);
    },
    panelActiveStr(nv, ov) {
      // console.log(nv, ov)
      // this.tabActiveHref = ov;
    }
  },
  methods: {
    tabChange(r, T) {
      this.tabActiveHref = r.hash.replace("#", "") || 'income';
      if(!T) this.$emit("modifyTabStr", this.idx[this.tabActiveHref]);
    }
  },
  created() {
    // console.log(this.$route);'
    if(this.$route.hash !== '#income') {
      window.location.hash = '#income';
    }
    this.tabChange(this.$route, true);
    // document.getElementById('outcome').className = 'tab active'
  }
};
</script>
<style lang="scss" scoped>
.tab-wrap {
  font-family: PingFangSC-Regular;
  // margin-top: 40px;
  letter-spacing: 0;
  .buttons-tab {
    height: 44px;
    & > a:first-child {
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 15px;
        left: 100%;
        width: 1px;
        height: 15px;
        background: #eaeaea;
      }
    }
    .button {
      height: 44px;
      font-size: 15px;
      color: #9d9799;
      line-height: 44px;
      &.active {
        font-family: PingFangSC-Medium;
        color: #3f3739;
        border-color: transparent;
        & > span {
          // color:red

          &:after {
            content: "";
            display: block;
            width: 65px;
            padding: 0px -40px;
            margin: auto;
            margin-top: -2px;
            text-align: center;
            border-bottom: 2px solid #fa6e6e;

            border-radius: 1.5px;
          }
          // background: #FA6E6E;
          // border-radius: 1.5px;
        }
        // &:after {
        //   content: '';
        //   display: block;
        //   width: 100px;
        //   height: 1px;
        //   background: red;
        // }
      }
    }
  }
}
// .buttons-tab .button.active {
//   width: 60px;
//   height: 3px;
//     z-index: 100;
//     background: #FA6E6E;
//   border-radius: 1.5px;
// }
</style>