<template>
  <div>
    <img src="../../../assets/images/exchange/up_gemstone_dis@2x.png" alt="宝石">
    <span>{{gemsNum}}{{unit(0)}}</span>
    <div class="process">
      <span>{{unit(2)}}</span>
      <img src="../../../assets/images/exchange/up_jiantou_dis@3x.png" alt="兑换">
    </div>
    <img src="../../../assets/images/exchange/up_diamonds_dis@2x.png" alt="钻石">
    <span>{{diamondsNum}}{{unit(1)}}</span>
  </div>
</template>
  <script>
export default {
  name: "icon",
  data() {
    return {
      units: {
        exchange: ["宝石", "钻石", "兑换成"],
        withdrawal: ["宝石", "元", "提现"]
      }
    };
  },
  props: {
    gemsNum: {
      default: 0
    },
    diamondsNum: {
      default: 0
    },
    routeName: {
      default: ""
    }
  },
  methods: {
    unit(id) {
      return this.units[this.routeName][id];
    }
  }
};
</script>
  <style lang="scss" scoped>
img {
  width: 22px;
  height: 22px;
  vertical-align: sub;
}
span {
  font-size: 16px;
  color: #3f3739;
  letter-spacing: 0;
  line-height: 16px;
}
.process {
  display: inline;
  margin: 0px 6px;
  & > span {
    font-family: " .AppleSystemUIFont";
    position: absolute;
    width: 50px;
    font-size: 12px;
    color: #fa6e6e;
    line-height: 12px;
    text-align: center;
  }
  & > img {
    width: 54px;
    height: auto;
  }
}
</style>
  