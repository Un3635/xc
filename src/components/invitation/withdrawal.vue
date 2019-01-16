<template>
  <div class="invite-withDrawal-wrap">
    <x-header title="提现记录" @back="$router.go(-1)" />
    <div v-if="!list || !list.length" class="noRecord invite-hint">
      你还没有提现过~
    </div>
    <x-pullRefresh ref="inviteWithdrawalbox" @getData="getPullData" v-else>
      <ul class="list-block">
        <!-- <li class="item-content item-list" v-for="item in data" :key="item.index"> -->
        <li class="item-content item-list" v-for="item in list" :key="item.index">
          <!-- <div class="item-media"><img :src="getPic(item.type)"></div> -->
          <div class="item-inner">
            <div class="item-title">
              <p class="title-name">奖励提现</p>
              <p class="time">{{item.aliPayDate | time}}</p>
            </div>
            <div class="item-after price">{{Number(item.status) === 1 ? `￥${item.money}`: statusName[Number(item.status)]}}</div>
          </div>
        </li>
      </ul>
    </x-pullRefresh>
  </div>
</template>
<script>
import APIS from "@/services/api";
import XHeader from "@/components/common/x-header.vue";
import XPullRefresh from "@/components/common/x-pullRefresh";

export default {
  name: "inviteWithdrawal",
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 20,
      first: true,
      statusName: ["提现中", "提现成功", "提现失败"]
    };
  },
  methods: {
    getData(cb) {
      APIS.inviteForwardList(
        this.$route.query.token,
        this.page,
        this.pagesize
      ).then(res => {
        cb && cb(res.data.result.list);
        this.refresh(res.data.result.list);
      });
    },
    refresh(D) {
      this.$nextTick(() => {
        if (this.first) {
          this.list = D;
          this.$refs.inviteWithdrawalbox &&
            this.$refs.inviteWithdrawalbox.initScroll();

          this.first = false;
        } else {
          this.$refs.inviteWithdrawalbox &&
            this.$refs.inviteWithdrawalbox.refreshScroll();
        }
      });
    },
    getPullData(p) {
      var that = this;
      if (p === "down") this.page = 1;
      if (p === "up") this.page += 1;

      var cb = data => {
        if (that.page === 1) {
          if (that.list[0].id !== data[0].id) that.list = data.concat(that.list);
        } else {
          that.list = that.list.concat(data);
        }
      };
      this.getData(cb);
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.getData();
  },
  components: {
    XPullRefresh,
    XHeader
  }
};
</script>
<style lang="scss" scoped>
.invite-withDrawal-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.invite-hint {
  position: absolute;
  font-size: 16px;
  font-weight: 300;
}
.list-block {
  font-family: PingFangSC-Medium;
  background: #ffffff;
  min-height: calc(100vh + 1px);
  letter-spacing: 0;
  padding-top: 2.5rem;
  margin-top: 0px;
  .title-name {
    // padding-top: 0.6rem;

    font-size: 0.8rem;
    color: #3f3739;
  }
  .time {
    font-family: PingFangSC-Regular;
    padding: 0.5rem 0 0.3rem 0;
    font-size: 0.6rem;
    color: #9d9799;
  }
  .price {
    font-size: 0.8rem;
    color: #fa6e6e;
    text-align: right;
  }
}
</style>

