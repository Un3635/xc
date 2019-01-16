<template>
  <div v-if="!data.length" class="noRecord in-out-wrap">
    {{!msg ? `还有没有任何${hints[type[tabsNames][1]]}哦~` : msg}}
  </div>
  <x-pullRefresh ref="outcome" @getData="getData" v-else>
    <ul class="list-block">
      <li class="item-content item-list" v-for="item in data" :key="item.index">
        <div class="item-media"><img :src="getPic(item.type)"></div>
        <div class="item-inner">
          <div class="item-title">
            <p class="type-title">{{getType(item.type)}}</p>
            <p class="nick-name">{{item.receiveUserNickname || '无名氏'}}</p>
            <img class="icon-url" :src="item.gift.iconUrl" v-if="item.gift">
            <p class="git-count" v-if="item.gift">{{item.gift.name}}*{{item.gift.sort}}</p>
            <p class="create-time">{{item.createTime | moment}} {{sourceTypeName[Number(item.sourceType)] || '未知'}}</p>
          </div>
          <div class="item-after userCount" :class="{inCount: type[tabsNames][1] === 0, outCount: type[tabsNames][1] === 1}">{{symbols[item.typeOfOperation]}}{{item.dealNumber}}{{unints[type[tabsNames][1]]}}</div>
        </div>
      </li>
    </ul>
  </x-pullRefresh>
</template>
<script>
import APIS from "../../../services/api";
import XPullRefresh from "../../common/x-pullRefresh";

export default {
  name: "outcome",
  data() {
    return {
      data: [],
      page: 1,
      pagesize: 20,
      hints: ["收入", "支出"],
      unints: ["宝石", "钻"],
      symbols: ["+", "-"],
      first: false,
      msg: "",
      sourceTypeName: ["", "个人主页", "聊天"],
      type: {
        gemstone: [1, 0],
        diamonds: [0, 1]
      }
    };
  },
  props: {
    // type: {
    //   default: []
    // },
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
        this.outcome();
      }
    }
  },
  methods: {
    getType(type) {
      return APIS.getType(type);
    },
    getPic(type) {
      return APIS.getPic(type);
    },
    canvas(data, cb) {
      this.data = data;
      this.$nextTick(() => {
        if (this.first) {
          this.$refs.outcome && this.$refs.outcome.initScroll();
          this.first = false;
        } else {
          this.$refs.outcome && this.$refs.outcome.refreshScroll();
        }
      });
    },
    outcome(__cb) {
      var _tabsName = this.$store.state.tabsChangeNames || this.tabsNames;
      this.$emit(
        "getOutcomeTatalData",
        this.type[_tabsName][1],
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
    getData(p) {
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
      this.outcome(cb);
    }
  },
  created() {
    this.first = true;
    this.isAcitive = true;
    this.outcome();
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

