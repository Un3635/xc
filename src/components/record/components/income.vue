<template>
  <div v-if="!data.length" class="noRecord in-out-wrap">
    {{!msg ? `还有没有任何${hints[type[tabsNames][0]]}哦~` : msg}}
  </div>
  <x-pullRefresh ref="income" @getData="getPullData" v-else>
    <ul class="list-block">
      <li class="item-content item-list" v-for="item in data" :key="item.index">
        <div class="item-media"><img src="../../../assets/images/diamonds/up_gift_dis.png" alt="明细"></div>
        <div class="item-inner">
          <div class="item-title">
            <p class="type-title">金币充值</p>
            <p class="nick-name">[{{getType(item.type)}}]</p>
            <p class="create-time">{{item.createTime | moment}}</p>
          </div>
          <div class="item-after userCount" :class="{inCount: type[tabsNames][0] === 0, outCount: type[tabsNames][0] === 1}">{{symbols[item.typeOfOperation]}}{{item.dealNumber}}{{unints[type[tabsNames][0]]}}</div>
        </div>
      </li>
    </ul>
  </x-pullRefresh>
  <!-- </div> -->
</template>
 <script>
import APIS from "../../../services/api";
import XPullRefresh from "../../common/x-pullRefresh";
import store from "../../../store/index.js";

export default {
  name: "income",
  data() {
    return {
      data: [],
      page: 1,
      pagesize: 20,
      hints: ["收入", "支出"],
      unints: ["钻", "宝石"],
      symbols: ["+", "-"],
      first: false,
      msg: "",
      type: {
        gemstone: [1, 0],
        diamonds: [0, 1]
      }
    };
  },
  props: {
    tabsNames: {
      default: ""
    }
  },
  computed: {
    tabsChangeNames() {
      return this.$store.state.tabsChangeNames;
    }
  },
  watch: {
    tabsChangeNames(nv, ov) {
      this.first = true;
      this.page = 1;
      this.data = [];
      if (nv !== ov) {
        this.income();
      }
    }
  },
  methods: {
    getType(type) {
      return APIS.getType(type);
    },
    canvas(data, cb) {
      this.data = data;

      this.$nextTick(() => {
        if (this.first) {
          this.$refs.income && this.$refs.income.initScroll();
          this.first = false;
        } else {
          this.$refs.income && this.$refs.income.refreshScroll();
        }
      });
    },
    income(__cb) {
      var _tabsName = this.$store.state.tabsChangeNames || this.tabsNames;
      this.$emit(
        "getIncomeTatalData",
        this.type[_tabsName][0],
        this.page,
        this.pagesize,
        data => {
          this.msg = "";

          if (data.msg) {
            this.msg = data.msg;
            return;
          }

          if (__cb) {
            __cb(data, this.canvas);
          } else {
            this.canvas(data);
          }
        }
      );
    },
    getPullData(p) {
      // 获取 兑换记录的数据
      var that = this;
      if (p === "down") this.page = 1;
      if (p === "up") this.page += 1;

      var cb = (data, __canvas) => {
        if (that.page === 1) {
          if (that.data[0].id !== data[0].id)
            that.data = data.concat(that.data);
        } else {
          that.data = that.data.concat(data);
        }
        __canvas(that.data);
      };
      this.income(cb);
    }
  },
  created() {
    this.first = true;
    this.income();
  },
  components: {
    XPullRefresh
  }
};
</script>
<style lang="scss" scoped>
.list-block {
  min-height: calc(100vh + 1px);
}
</style>

  