<template>
  <div class="record-wrap">
    <x-header title="我的战绩" @back="$router.go(-1)" />
    <x-loading v-show="!loading" type="2" />
    <div class="record-hader" v-if="loading">
      <div class="record-hader-box">
        <div class="intro">
          <p>邀请人数</p>
          <p>{{data.count || 0}}</p>
        </div>
        <div class="intro-hint">
          <p>获得奖励(元)</p>
          <p>{{data.rewardAll || 0}}</p>
        </div>
      </div>
    </div>
    <div class="record-btn-wrap">
      <a class="invite-btn" href="javascript:;" @click="$router.push({path: '/toWithdrawal', query: {token: $route.query.token}})" v-if="Number(data.rewardAll) > 10">前往提现</a>
      <a class="invite-btn blur" href="javascript:;" v-else>满10元提现</a>
    </div>
    <p class="withDrawal-record" @click="$router.push({path: '/inviteWithdrawal', query: {token: $route.query.token}})">提现记录</p>
    <img class="invite_title3" src="@/assets/images/invitation/invite_title3.png" alt="">
    <div v-if="!recordDetailVoList.length" class="withdrawal-no-data">
      还没有邀请记录哦~
    </div>
    <x-pullRefresh ref="inviteRecord" @getData="getPullData" :type=2 v-else>
      <ul class="list-block">
        <li class="item-content item-list" v-for="item in recordDetailVoList" :key="item.index">
          <div class="item-media"><img class="img" :src="item.headImage || ''" alt=""></div>
          <div class="item-inner">
            <div class="item-title">
              <p class="phone">{{item.phone | phone}}</p>
              <p class="time">{{item.regDate | time}}</p>
            </div>
            <div class="item-title">
              <p class="inviteStatus inviteState">{{statusName[Number(item.status)].name}}</p>
              <p class="inviteStatus" :class="[statusName[Number(item.status)].className]">{{statusName[Number(item.status)].content ? statusName[Number(item.status)].content : `￥${item.reward}`}}</p>
            </div>
          </div>
        </li>
      </ul>
    </x-pullRefresh>
  </div>
</template>
<script>
import XHeader from "@/components/common/x-header.vue";
import XLoading from "@/components/common/x-loading.vue";
import XPullRefresh from "@/components/common/x-pullRefresh";
import APIS from "@/services/api";

export default {
  name: "inviteRecord",
  data() {
    return {
      loading: true,
      data: [],
      recordDetailVoList: [],
      page: 1,
      pagesize: 10,
      first: true,
      statusName: [
        {
          name: "邀请中",
          className: "inviteFailure",
          content: "好友尚未充值"
        },
        {
          name: "邀请成功",
          className: "invitePrice"
        },
        {
          name: "邀请失败",
          className: "inviteFailure",
          content: "三天内未充值"
        }
      ]
    };
  },
  methods: {
    getData(cb) {
      APIS.myRecordList(this.$route.query.token, this.page, this.pagesize).then(
        res => {
          cb && cb(res.data.result);
          this.refresh(res.data.result);
        }
      );
    },
    refresh(D) {
      this.data = D;
      this.$nextTick(() => {
        if (this.first) {
          this.recordDetailVoList = this.data.recordDetailVoList;
          this.$refs.inviteRecord && this.$refs.inviteRecord.initScroll();
          this.first = false;
        } else {
          this.$refs.inviteRecord && this.$refs.inviteRecord.refreshScroll();
        }
      });
    },
    getPullData(p) {
      var that = this;
      if (p === "down") this.page = 1;
      if (p === "up") this.page += 1;

      var cb = data => {
        if (that.page === 1) {
          if(that.recordDetailVoList[0].phone !== data.recordDetailVoList[0].phone)
            that.recordDetailVoList = data.recordDetailVoList.concat(
            that.recordDetailVoList
          );
        } else {
          that.recordDetailVoList = that.recordDetailVoList.concat(
            data.recordDetailVoList
          );
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
    XHeader,
    XLoading,
    XPullRefresh
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";
.record-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff4f3;

  .record-hader {
    margin-top: 40px;
    .record-hader-box {
      position: relative;
      display: flex;
      @mixin pos {
        flex: 1;
        text-align: center;
        & > p {
          &:first-child {
            font-family: PingFangSC-Regular;
            font-size: 0.7rem;
            color: #3f3739;
            letter-spacing: -0.34px;
          }
          &:last-child {
            margin-top: 0.4rem;
            font-family: PingFangSC-Semibold;
            font-size: 1.3rem;
            color: #3f3739;
            letter-spacing: -0.63px;
            font-weight: 700;
          }
        }
      }
      .intro {
        position: relative;
        margin-top: 2rem;
        @include pos;
        &:after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0px;
          right: 0px;
          height: 100%;
          border: 1px solid #ddd9db;
        }
      }
      .intro-hint {
        margin-top: 2rem;
        @include pos;
      }
    }
  }

  .withdrawal-no-data {
    margin-top: 4rem;
    width: 100%;
    font-size: 0.6rem;
    color: #9d9799;
    letter-spacing: -0.29px;
    background: #fff4f3;
    // height: auto;
    text-align: center;
  }
  .record-btn-wrap {
    margin-top: 2rem;
    text-align: center;
    .invite-btn {
      padding: 0.5rem 4.8rem;
      @include public-btn;
      &.blur {
        opacity: 0.5;
      }
    }
  }
  .withDrawal-record {
    font-family: PingFangSC-Regular;
    margin-top: 1.3rem;
    font-size: 0.7rem;
    color: #3f3739;
    letter-spacing: -0.34px;
    text-align: center;
  }
  .invite_title3 {
    margin-top: 1.6rem;
    width: 100%;
  }

  .list-block {
    // min-height: calc(100vh - 200px);
    min-height: calc(100vh + 1px);
    margin-top: 0px;
    background: #fff4f3;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;

    .img {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
    }
    .phone {
      font-size: 0.7rem;
      color: #3f3739;
    }
    .time {
      padding-top: 0.3rem;
      font-size: 0.6rem;
      color: #9d9799;
    }
    .inviteStatus {
      font-size: 0.65rem;
      letter-spacing: 0;
      text-align: right;
      &.inviteState {
        padding-bottom: 0.3rem;
        color: #3f3739;
      }
      &.invitePrice {
        color: #fa6e6e;
      }
      &.inviteFailure {
        color: #9d9799;
      }
    }

    .item-after {
      display: inline-block;
    }
  }
}
</style>

