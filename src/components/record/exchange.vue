<template>
  <div class="exchange-wrap">
    <!-- <x-header :title="title"></x-header> -->
    <div class="exchange-content">
      <div class="noRecord" v-if="!data.length">
        还没有{{routeName === 'withdrawal' ? '提现':'兑换'}}记录哦~
      </div>
      <x-pullRefresh @getData="getData" ref="wrapper" v-else>
        <div class="ul-wrap">
          <ul>
            <li class="exchange-list" v-for="item in data" :key="item.index">
              <div class="exchage-info">
                <div class="list-left">
                  <iconCus :gemsNum="item.consumingGemsNumber" :diamondsNum="item.diamondsNumber" :routeName="routeName" v-if="routeName === 'exchange'" />
                  <iconCus :gemsNum="item.consumingGemsNumber" :diamondsNum="item.money" :routeName="routeName" v-else-if="routeName === 'withdrawal'" />
                </div>
                <p class="list-right" :class="{ising: item.status !== 1}">{{names[routeName].status[item.status]}}</p>
              </div>
              <div v-show="routeName === 'withdrawal'">
                <div class="withdrawalTo">
                  提现到:
                  <span class="addr">{{item.account}}</span>
                </div>
                <div class="withdrawalTo" v-show="routeName === 'withdrawal'">
                  提现到:
                  <span>{{item.userName}}</span>
                </div>
              </div>
              <div class="exchange-time">{{item.createTime | moment}}</div>

            </li>
          </ul>
        </div>

      </x-pullRefresh>
    </div>
  </div>
</template>
<script type="module">
// import XHeader from "../common/x-header";
import IconCus from "./components/icon";
import XPullRefresh from "../common/x-pullRefresh";
import APIS from "../../services/api";

export default {
  name: "exchange",
  data() {
    return {
      title: "",
      names: {
        exchange: {
          name: "兑换记录",
          fn: APIS.exchange,
          status: ["兑换中", "兑换成功", "兑换失败"]
        },
        withdrawal: {
          name: "提现记录",
          fn: APIS.withdrawal,
          status: ["提现中", "提现成功", "提现失败"]
        }
      },
      data: [],
      refresh: "-1",
      page: 1,
      pageSize: 20,
      total: 0,
      routeName: this.$route.name,
      first: false
    };
  },
  components: {
    // XHeader,
    IconCus,
    XPullRefresh
  },
  methods: {
    getData(p) {
      // 获取 兑换记录的数据
      if (p === "down") this.page = 1;
      if (p === "up") this.page += 1;
      this.$refs.wrapper && this.$refs.wrapper.loadingStart();
      this.names[this.routeName]
        .fn(this.$route.query.token, this.page, this.pageSize)
        .then(res => {
          if (this.page === 1) {
            this.data = res.data.result.list;
          } else {
            this.data = this.data.concat(res.data.result.list);
          }
          this.$nextTick(() => {
            if (this.first)
              this.$refs.wrapper && this.$refs.wrapper.initScroll();
            if (!this.first) this.$refs.wrapper.refreshScroll();
            this.first = false;
          });
        })
        .catch(error => {
          console.log(error);
          console.log("接口出错啦");
          this.$refs.wrapper &&
            this.$refs.wrapper.refreshScroll("接口出错啦，请重新刷新");
          // this.refresh = Math.random() + '1' + state;
        });
    }
  },
  mounted() {
    // getNetWork();
    
  },
  created() {
    // console.log(this.$route);
    this.first = true;
    this.routeName = this.$route.name;
    this.title = this.names[this.routeName].name;
    this.getData();
    document.title = this.$route.meta.title;
  }
};
</script>
<style lang="scss" scoped>
.exchange-wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.ul-wrap {
  // height: calc(100vh - 10px);
  // height: 80%;
  font-family: PingFangSC-Regular;
  min-height: calc(100vh + 1px);
}
.exchange-content {
  position: relative;
  // margin-top: 50px;
  letter-spacing: 0;
  height: 100vh;
  overflow: hidden;
  .exchange-list {
    position: relative;
    margin-bottom: 10px;
    padding: 20px 15px;
    background: #ffffff;

    .exchage-info {
      display: flex;
      position: relative;
      /* padding-right: 25px; */
      // margin: 20px 15px;
      // .list-left {
      //   flex: 0 0 275px;
      //   text-align: left;
      // }
      .list-right {
        // 兑换成功
        position: absolute;
        right: 0px;
        top: 22px;
        font-size: 14px;
        color: #6d6668;
        letter-spacing: 0;
        line-height: 14px;
        flex: 1;
        &.ising {
          color: #f08821;
        }
      }
    }
    .withdrawalTo {
      font-size: 14px;
      color: #6d6668;
      text-align: left;
      margin-left: 6px;
      .addr {
        display: inline-block;
        margin: 22px 0px 12px 6px;
      }
      & > span {
        margin-left: 6px;
      }
    }
    .exchange-time {
      text-align: left;
      margin-left: 6px;
      margin-top: 17px;
      font-size: 13px;
      color: #9d9799;
      letter-spacing: 0;
      line-height: 13px;
    }
  }
}
</style>
