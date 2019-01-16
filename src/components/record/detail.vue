<template>
  <div class="diamonds-wrap">
    <!-- <x-header v-if="user!=='buser'" title="明细"></x-header> -->
    <x-headerBox v-if="user==='buser'" @modifyTitleStr="modifyTitleStr" @back="back"></x-headerBox>
    <x-tab :tabs="tabs" @modifyTabStr="modifyTabStr" :panelActiveStr="panelActiveStr" :class="{user: user==='buser'}"></x-tab>
    <div class="tabs diamonds-content" :class="{buserContent: user === 'buser', cuserContent: user === 'cuser'}">
      <keep-alive>
        <income class="tab" ref="incomeBox" :class="{active: panelActiveStr === 'income'}" :tabsNames="tabsNames" @getIncomeTatalData="getIncomeTatalData" v-if="panelActiveStr === 'income'" />
        <outcome class="tab" ref="outcomeBox" :class="{active: panelActiveStr === 'outcome'}" :tabsNames="tabsNames" @getOutcomeTatalData="getOutcomeTatalData" v-else />
      </keep-alive>
    </div>
  </div>
</template>
<script>
// import XHeader from "../common/x-header";
import XHeaderBox from "../common/x-header.box";
import XTab from "../common/x-tab";
import outcome from "./components/outcome";
import income from "./components/income";
import APIS from "../../services/api";

export default {
  name: "diamonds",
  data() {
    return {
      tabs: [
        {
          href: "income",
          name: "收入"
        },
        {
          href: "outcome",
          name: "支出"
        }
      ],
      data: 10,
      // tabActiveStr: "", // tab income or outcome
      panelActiveStr: "", // panel income or outcome
      tabsNames: "gemstone", // 我的宝石 or 我的钻石
      tabsNamesfn: {
        gemstone: {
          idx: [1, 0],
          fn: APIS.gemDetail
        },
        diamonds: {
          idx: [0, 1],
          fn: APIS.diamondDetail
        }
      },
      user: "",
      token: ""
    };
  },
  components: {
    // XHeader,
    XTab,
    outcome,
    income,
    XHeaderBox
  },
  methods: {
    back() {
      window.location.href = "/android/back";
    },
    modifyTabStr(msg) {
      // 切换 <收入> <支付> 的方法
      this.panelActiveStr = this.tabs[
        this.tabsNamesfn[this.tabsNames].idx[msg]
      ].href;
      // console.log("this.panelActiveStr", this.panelActiveStr);
    },
    modifyTitleStr(msg) {
      // 切换 <我的宝石> <我的钻石> 的方法
      this.tabsNames = msg;
      this.panelActiveStr = this.tabs[
        this.tabsNamesfn[this.tabsNames].idx[0]
      ].href;
      // 点击title时，强制刷新组件

      window.location.hash = "#income";
      // console.log(
      //   "this.panelActiveStr---",
      //   this.panelActiveStr,
      //   this.tabsNames
      // );
    },
    getIncomeTatalData(type, page, pagesize, cb) {
      this.getTatalData(type, page, pagesize, cb);
    },
    getOutcomeTatalData(type, page, pagesize, cb) {
      this.getTatalData(type, page, pagesize, cb);
    },
    getTatalData(type, page, pagesize, cb) {
      this.tabsNamesfn[this.tabsNames]
        .fn(this.token, type, page, pagesize)
        .then(res => {
          if (res.data) cb && cb(res.data.result.list);
          else return res;
        })
        .then(res => {
          if (res) cb && cb(res);
        })
        .catch(error => {
          console.log("接口出错啦");
        });
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.user = this.$route.query.user;
    this.tabsNames = this.user === "cuser" ? "diamonds" : "gemstone";
    this.panelActiveStr = this.user === "cuser" ? "income" : "outcome";
    // console.log('panelActiveStr', this.panelActiveStr)
    this.token = this.$route.query.token || "";
    // if(this.user === 'buser') {
    //    this.$store.commit('tabsNames', 'gemstone');
    // }
  }
};
</script>
<style lang="scss" scoped>
.diamonds-wrap {
  // position: absolute;
  // left: 0px;
  // top: 0px;
  // width: 100%;
  // height: 100%;
  .diamonds-content {
    position: relative;
    margin-top: 10px;
    letter-spacing: 0;
    &.buserContent {
      height: calc(100vh - 94px);
    }
    &.cuserContent {
      height: calc(100vh - 54px);
    }
  }
  .user {
    margin-top: 40px;
  }
}
</style>
  